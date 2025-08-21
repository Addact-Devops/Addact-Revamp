import ExcelJS from "exceljs";
import { gql, request } from "graphql-request";

const GRAPHQL_ENDPOINT = "https://uatcms.addact.net:9443/graphql";
const SITE_BASE_URL = "https://addact.net/blogs"; // Adjust your base URL if needed

const GET_ALL_BLOGS = gql`
    query AddactBlogs($page: Int, $pageSize: Int) {
        addactBlogs(pagination: { page: $page, pageSize: $pageSize }) {
            Slug
            documentId
            BlogBanner {
                ... on ComponentBlogHeroBannerBlogHeroBanner {
                    BannerTitle
                    PublishDate
                    author {
                        Author {
                            AuthorName
                        }
                    }
                    blogcategory {
                        Category {
                            CategoryTitle
                        }
                    }
                }
            }
        }
    }
`;

async function fetchAllBlogs(): Promise<any[]> {
    const pageSize = 100;
    let page = 1;
    let allBlogs: any[] = [];

    interface GraphQLResponse {
        addactBlogs: {
            Slug: string;
            documentId: string;
            BlogBanner?: {
                BannerTitle?: string;
                PublishDate?: string;
                author?: {
                    Author?: {
                        AuthorName?: string;
                    };
                };
                blogcategory?: {
                    Category?: {
                        CategoryTitle?: string;
                    };
                };
            }[];
        }[];
    }

    while (true) {
        const response = await request<GraphQLResponse>(GRAPHQL_ENDPOINT, GET_ALL_BLOGS, {
            page,
            pageSize,
        });

        const blogs = response?.addactBlogs || [];
        allBlogs.push(...blogs);

        if (blogs.length < pageSize) break;
        page++;
    }

    return allBlogs;
}

async function exportToExcel() {
    const blogs = await fetchAllBlogs();

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("All Blogs");

    sheet.columns = [
        { header: "URL", key: "url", width: 50 },
        { header: "Blog Title", key: "title", width: 40 },
        { header: "Author", key: "author", width: 25 },
        { header: "Publish Date", key: "publishDate", width: 20 },
        { header: "Category", key: "category", width: 25 },
    ];

    blogs.forEach((blog) => {
        const banner = blog.BlogBanner?.[0];
        const slug = blog.Slug || "no-slug";
        const fullUrl = `${SITE_BASE_URL}${slug}`;

        sheet.addRow({
            url: fullUrl,
            title: banner?.BannerTitle || "Untitled",
            author: banner?.author?.Author?.AuthorName || "N/A",
            publishDate: banner?.PublishDate || "N/A",
            category: banner?.blogcategory?.Category?.CategoryTitle || "N/A",
        });
    });

    await workbook.xlsx.writeFile("AllBlogs.xlsx");
    console.log("✅ Exported successfully to AllBlogs.xlsx");
}

exportToExcel().catch((err) => {
    console.error("❌ Failed to export blogs:", err.message);
});
