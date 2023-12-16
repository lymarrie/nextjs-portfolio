import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from 'app/components/AnimateOnScroll';
import CategoryTag from 'app/components/CategoryTag';
import Ingredients from 'app/components/Ingredients';
import client from "../../utils/contentful";

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my current projects in computer science, web development, and data science.',
  openGraph: {
    images: 'https://lucmarrie.com/hiroshi-nagai-1.jpeg'
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
        <div className="space-y-10">
        {projects.map((project) => (
          <div className="space-y-3">
            <div className="space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
              <Link href={`/projects/${project.slug}`} className="link">
                {String(project.name)}
              </Link>
              <CategoryTag className="" category={project.category}></CategoryTag>
            </div>
            <p className="text-gray-300">{String(project.description)}</p>
            <Ingredients ingredients={project.ingredients} />
          </div>
        ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}

