import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import client from "../../../utils/contentful";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';


export const dynamic = 'force-static';

const MarkdownRenderer = ({ content }) => {
    return (
        <>
          <article className="prose prose-quoteless prose-neutral prose-invert">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const {children, className, node, ...rest} = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={materialDark}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {content}
              </ReactMarkdown>
          </article>
        </>
    );
};

export async function generateStaticParams() {
    const entries = await client.getEntries({
      content_type: "blogPost",
    });

    // console.log(entries.items[0])

    return entries.items.map((item) => ({
      params: {
        slug: item.fields.slug
      },
    }));
  }

async function getBlogPost({ params }) {
try {
    const slug = params.slug;

    // Find the entry where the slug matches
    const entry = (await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    })).items[0];

    return entry?.fields || null;
} catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
}
}

function formatDate(date: string) {
  const currentDate = new Date();
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${fullDate} (${formattedDate})`;
}

// export async function generateMetadata({
//     params,
//   }): Promise<Metadata | undefined> {
//     const post = allBlogs.find((post) => post.slug === params.slug);
//     if (!post) {
//       return;
//     }
  
//     const {
//       title,
//       publishedAt: publishedTime,
//       summary: description,
//       image,
//       slug,
//     } = post;
//     const ogImage = image
//       ? `https://lucmarrie.com/${image}`
//       : `https://lucmarrie.com/og?title=${title}`;
  
//     return {
//       title,
//       description,
//       openGraph: {
//         title,
//         description,
//         type: 'article',
//         publishedTime,
//         url: `https://lucmarrie.com/blog/${slug}`,
//         images: [
//           {
//             url: ogImage,
//           },
//         ],
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title,
//         description,
//         images: [ogImage],
//       },
//     };
//   }

export default async function BlogPost({ params }) {

    // const entries = await client.getEntries({
    //     content_type: "blogPost",
    // });    
    
    // console.log(params);
    // const post = getBlogPost({params});
    // const post = entries.find((post) => post.slug === `blog/${params.slug}`);

    const post = await getBlogPost({ params });
    // console.log(blogPost);
//   const post = allBlogs.find((post) => post.slug === `blog/${params.slug}`);

  if (!post) {
    notFound();
  }

  return (
    <section>
      {/* <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      ></script> */}
      <h1 className="font-semibold tracking-tighter max-w-[650px]">
        <Balancer>{JSON.stringify(post.name)}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        {/* <p className="text-sm text-neutral-400 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p> */}
      </div>
      <MarkdownRenderer content={post.markdown} />
    </section>
  );
}
