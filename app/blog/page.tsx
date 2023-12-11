import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from 'app/components/AnimateOnScroll';
import client from "../../utils/contentful";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
  openGraph: {
    images: 'https://lucmarrie.com/hiroshi-nagai-4.png'
  }
};

async function getBlogPosts() {
  try {
    const entries = await client.getEntries({
      content_type: "blogPost",
      order: ["-sys.createdAt"],
    });

    return entries.items.map((item) => item.fields);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}


export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  return (
    <section className="" style={{minHeight:"40vh"}}>
      <AnimateOnScroll>
        <h1 className="block font-semibold mb-8 tracking-tighter white-text-shadow">Blog</h1>
        <div className="space-y-3">
          {blogPosts.map((post) => (
            <div>
              <Link href={`/blog/${post.slug}`} className="link">
                {String(post.name)}
              </Link>
              <p>{String(post.description)}</p>
            </div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}

