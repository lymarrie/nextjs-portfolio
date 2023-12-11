import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from 'app/components/mdx';
import Balancer from 'react-wrap-balancer';
import client from "../../../utils/contentful";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import hiroshiNagai from '../../../public/hiroshi-nagai-3.png';


export const dynamic = 'force-static';

export async function generateStaticParams() {
  const entries = await client.getEntries({
    content_type: "project",
  });

  // console.log(entries.items[0])

  return entries.items.map((item) => ({
    params: {
      slug: item.fields.slug
    },
  }));
}

async function getProject({ params }) {
  try {
    const slug = params.slug;

    // Find the entry where the slug matches
    const entry = (await client.getEntries({
    content_type: "project",
    "fields.slug": slug,
    })).items[0];

    return entry?.fields || null;
  } catch (error) {
    console.error("Error fetching project:", error);
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

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
  const entry = (await client.getEntries({
    content_type: "project",
    "fields.slug": params.slug,
    })).items[0];
  if (!entry) {
    return;
  };

  return {
    title: String(entry.fields.name),
    description: String(entry.fields.description),
    metadataBase: new URL("https://lucmarrie.com"),
    openGraph: {
      title: String(entry.fields.name),
      description: String(entry.fields.description),
      type: 'article',
      url: `https://lucmarrie.com/projects/${params.slug}`,
      images: [
        {
          url: "https://www.lucmarrie.com/hiroshi-nagai-5.png",
        },
      ],
    },
  };
}

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

export default async function Project({ params }) {
  const project = await getProject({ params });
  if (!project) {
    notFound();
  }

  return (
    <section>
      <h1 className="font-semibold tracking-tighter max-w-[650px]">
        <Balancer>{JSON.stringify(project.name)}</Balancer>
      </h1>
      <MarkdownRenderer content={project.markdown} />
    </section>
  );
}
