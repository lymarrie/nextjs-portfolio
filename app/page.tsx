import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from './components/AnimateOnScroll';
import Ingredients from './components/Ingredients';
import CategoryTag from './components/CategoryTag';
import client from "../utils/contentful";

const quoteText = "Some people want it to happen, some wish it would happen, others make it happen.";
const quoteAuthor = "Michael Jordan 🏀";

async function getEntries() {
  try {
    const entries = await client.getEntries({
      order: ["-sys.createdAt"],
    });

    const projects:any = [];
    const blogPosts:any = [];

    entries.items.forEach((item) => {
      const fields = item.fields;
      if (item.sys.contentType.sys.id === 'project') {
        projects.push(fields);
      } else if (item.sys.contentType.sys.id === 'blogPost') {
        blogPosts.push(fields);
      }
    });

    return { projects, blogPosts };
  } catch (error) {
    console.error("Error fetching entries:", error);
    return { projects: [], blogPosts: [] };
  }
}


export default async function Page() {
  const { projects, blogPosts } = await getEntries();
  return (
    <main className="space-y-28">
      <section className="">
        <AnimateOnScroll>
          <div>
            <h1 className="block font-semibold mb-8 tracking-tighter ">Luc Yuki Marrie</h1>
            <div className="flex justify-center">
              <div className="quote">
                <p className="hidden sm:block pr-4"><em>"{quoteText}"</em> - <strong>{quoteAuthor}</strong></p>
              </div>
              <Image
                src="/luc-space-pic.JPG"
                className="rounded-full white-shadow"
                width={300}
                height={300}
                alt="Luc's Profile Pic"
              />
            </div>
          </div>
          <div className="quote-mobile pt-20 sm:px-10">
            <p className="block sm:hidden"><em>"{quoteText}"</em> - <strong>{quoteAuthor}</strong></p>
          </div>
        </AnimateOnScroll>
      </section>
      <section>
        <AnimateOnScroll hiddenClass="space-y-12 fadeFromLeft-hidden" showClass="fadeFromLeft-show">
          <h2 className="font-semibold mb-8 tracking-tighter">Biography</h2>
          <div className="space-y-3 ">
            <p>I'm a product manager at <a href="https://www.yext.com/" className="link" target="_blank">Yext</a>, based out of  🗽 New York City.</p>
            <p>At Yext, I oversee product development for <a href="https://www.yext.com/platform/pages" className="link" target="_blank">Pages</a>: a full-stack development framework for enterprise web applications.</p>
            <p>Outside of work, I'm a freelance frontend developer, photographer 📸, and soccer hooligan.</p>
          </div>
        </AnimateOnScroll>
      </section>
      <section>
        <AnimateOnScroll hiddenClass="space-y-12 fadeFromLeft-hidden" showClass="fadeFromLeft-show">
          <h2 className="font-semibold mb-8 tracking-tighter">Projects</h2>
          <div className="space-y-10">
            {projects.map((project) => (
                <div className="space-y-3">
                  <div className="space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
                    <Link href={`/projects/${project.slug}`} className="link">
                      {String(project.name)}
                    </Link>
                    <CategoryTag className="" category={project.category}></CategoryTag>
                  </div>
                  <p>{String(project.description)}</p>
                  <Ingredients ingredients={project.ingredients} />
                </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>
      <section>
        <AnimateOnScroll hiddenClass="space-y-12 fadeFromLeft-hidden" showClass="fadeFromLeft-show">
          <h2 className="font-semibold mb-8 tracking-tighter">Blog</h2>
          <div className="space-y-3">
            {blogPosts.map((post) => (
                <div className="">
                  <div className="space-y-2 md:flex md:flex-row md:space-x-2 md:space-y-0">
                    <Link href={`/projects/${post.slug}`} className="link">
                      {String(post.name)}
                    </Link>
                    <CategoryTag className="" category={post.category}></CategoryTag>
                  </div>
                  <p>{String(post.description)}</p>
                </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>
      <section>
        <AnimateOnScroll hiddenClass="space-y-12 fadeFromLeft-hidden" showClass="fadeFromLeft-show">
          <h2 className="font-semibold mb-8 tracking-tighter">Education</h2>
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <img
                  className="h-16 w-16"
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Colby_College_seal.svg/1200px-Colby_College_seal.svg.png"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold">Colby College</h4>
                <div className="mt-1">
                  <ul className="pl-1 text-sm">
                    <li><strong>Majors: </strong>Computer Science, Math</li>
                    <li><strong>Minor: </strong>Japanese</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
      </section>
    </main>
  );
}
