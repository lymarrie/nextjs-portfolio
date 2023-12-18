import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from 'app/components/AnimateOnScroll';
import ScrollEffect from 'app/components/ScrollEffect';
import CategoryTag from 'app/components/CategoryTag';
import Ingredients from 'app/components/Ingredients';
import client from "../../utils/contentful";
import { Fade } from "react-awesome-reveal";

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
          <ScrollEffect effect="reveal" cascade={true} duration={1000} damping={0.2}>
            {projects.map((project) => (
              <div className="space-y-3">
                {/* <ScrollEffect effect="fade" cascade={true} duration={700}> */}
                  <div className="space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
                    <Link href={`/projects/${project.slug}`} className="link">
                      {String(project.name)}
                    </Link>
                    <CategoryTag className="" category={project.category}></CategoryTag>
                  </div>
                  <p className="text-gray-300">{String(project.description)}</p>
                  <Ingredients ingredients={project.ingredients} />
                {/* </ScrollEffect> */}
              </div>
            ))}
          </ScrollEffect>
        </div>
      </AnimateOnScroll>
    </section>
  );
}

