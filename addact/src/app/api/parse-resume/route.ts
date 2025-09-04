import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth";

export const runtime = "nodejs"; // force Node.js runtime

// ---- Types ----
interface ResumeFields {
    fullName: string;
    email: string;
    phone: string;
    yearsOfExperience: string;
    city: string;
    linkedin: string;
}

interface ApiResponse {
    provider: "gemini";
    extracted: ResumeFields;
}

// ---- POST handler ----
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const extracted = await handleGemini(file);

        const jsonResponse: ApiResponse = { provider: "gemini", extracted };
        return NextResponse.json(jsonResponse);
    } catch (err) {
        console.error("❌ Resume parse error:", err);
        return NextResponse.json(
            {
                error: "Resume parsing failed",
                details: (err as Error).message,
            },
            { status: 500 }
        );
    }
}

// ---- Gemini ----
async function handleGemini(file: File): Promise<ResumeFields> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
        "Extract fullName, email, phone, yearsOfExperience, city, linkedin. Return ONLY valid JSON, no explanations, no markdown.";

    let inputText: string | null = null;
    const buffer = Buffer.from(await file.arrayBuffer());

    if (file.type === "application/pdf") {
        // ✅ PDF supported directly
        const result = await model.generateContent([
            { text: prompt },
            {
                inlineData: {
                    data: buffer.toString("base64"),
                    mimeType: file.type,
                },
            },
        ]);

        let text = result.response.text().trim();
        if (text.startsWith("```")) {
            text = text.replace(/```json|```/g, "").trim();
        }
        return JSON.parse(text) as ResumeFields;
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        // ✅ DOCX → Extract text with mammoth
        const { value } = await mammoth.extractRawText({ buffer });
        inputText = value;
    } else if (file.type.startsWith("text/")) {
        // ✅ Plain text
        inputText = buffer.toString("utf-8");
    } else {
        throw new Error(`Unsupported file type: ${file.type}`);
    }

    // For DOCX/TXT → send text directly
    const result = await model.generateContent([prompt, inputText ?? ""]);
    let text = result.response.text().trim();

    if (text.startsWith("```")) {
        text = text.replace(/```json|```/g, "").trim();
    }

    return JSON.parse(text) as ResumeFields;
}
