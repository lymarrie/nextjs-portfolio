import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from 'app/components/AnimateOnScroll';
import client from "../../utils/contentful";

export const metadata: Metadata = {
  title: 'Project',
  description: 'Explore my current projects in computer science, web development, and data science.',
  openGraph: {
    images: 'https://lucmarrie.com/hiroshi-nagai-1.png'
  }
};

async function getProjects() {
    try {
      const entries = await client.getEntries({
        content_type: "project",
        order: ["-sys.createdAt"],
      });
  
      return entries.items.map((item) => item.fields);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }


export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <section className="" style={{minHeight:"40vh"}}>
      <AnimateOnScroll>
        <h1 className="block font-semibold mb-8 tracking-tighter white-text-shadow">Projects</h1>
        <div className="space-y-3">
        {projects.map((project) => (
          <div>
            <Link href={`/projects/${project.slug}`} className="link">
              {String(project.name)}
            </Link>
            <p>{String(project.description)}</p>
          </div>
        ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}

