import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';
import AnimateOnScroll from 'app/components/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {
  return (
    <section className="" style={{minHeight:"50vh"}}>
      <AnimateOnScroll>
        <h1 className="block font-semibold mb-8 tracking-tighter white-text-shadow">Blog</h1>
        <div className="space-y-3">
          {allBlogs
              .sort((a, b) => {
                if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                  return -1;
                }
                return 1;
              })
              .map((post) => (
                  <div>
                    <a 
                      key={post.slug}
                      className="link"
                      href={`/${post.slug}`}
                    >
                      {post.title}
                    </a>
                    <p>{post.summary}</p>
                  </div>
              ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}

