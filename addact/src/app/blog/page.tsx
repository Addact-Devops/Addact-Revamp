import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/graphql/queries/getAllBlog";

export default async function BlogListPage() {
    const blogs = await getAllBlogs();
    console.log("blogs", JSON.stringify(blogs, null, 2));
    return (
        <main className='max-w-6xl mx-auto p-6'>
            <h1 className='text-4xl font-bold mb-8'>Latest Blogs</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {blogs.map((blog: any) => (
                    <Link key={blog.Slug} href={`/blog${blog.Slug}`}>
                        <div className='border rounded-lg p-4 hover:shadow-md transition'>
                            {/* {blog.BlogBanner?.[0]?.BannerImage?.url && (
                                <Image
                                    src={blog.BlogBanner[0].BannerImage}
                                    alt={blog.BlogBanner[0].BannerImage.alternativeText || "Banner"}
                                    width={500}
                                    height={300}
                                    className='rounded-md w-full h-48 object-cover'
                                />
                            )} */}
                            <h2 className='text-xl font-semibold mt-4'>
                                {blog.HeadingSection?.[0]?.PageTitle || "Untitled"}
                            </h2>
                            <p className='text-gray-600 text-sm'>
                                {blog.BlogBanner?.[0]?.BannerDescription || "No description"}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
