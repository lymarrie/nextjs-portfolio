import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from './components/AnimateOnScroll';
import Hero from './components/Hero';
import Ingredients from './components/Ingredients';
import CategoryTag from './components/CategoryTag';
import client from "../utils/contentful";
import ScrollEffect from './components/ScrollEffect';

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
    <main className="">
     <video
        id="backgroundVideo"
        className="hidden md:block absolute top-0 left-0 object-cover w-full h-full z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/moon.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Image
        src="/stars-background.jpeg"
        className='absolute top-0 left-0 object-cover w-full h-full z-0 md:hidden'
        width={500}
        height={500}
        priority={true}
        alt="Space static background."
      >
      </Image>
      <div className="space-y-28">
        <ScrollEffect effect="reveal" cascade={true} duration={1000} damping={0.2} triggerOnce={true}>
          <section className="">
            <div className="container z-10">
              <ScrollEffect effect="reveal" cascade={true} duration={1000} triggerOnce={true}>
                <h1 className="block font-semibold mb-8 tracking-tighter drop-shadow-[0_5px_3px_rgba(0,0,0,1)]">Luc Yuki Marrie</h1>
                <div className="flex justify-center">
                  <div className="quote">
                      <p className="hidden font-semibold tracking-wide leading-loose drop-shadow-[0_3px_2px_rgba(0,0,0,1)] sm:block pr-4 "><em>"{quoteText}"</em> - <strong>{quoteAuthor}</strong></p>
                  </div>
                  <Image
                      src="/luc-space-pic.JPG"
                      className="rounded-full white-shadow z-10"
                      width={300}
                      height={300}
                      priority={true}
                      alt="Luc's Profile Pic"
                  />
                </div>
              </ScrollEffect>
            </div>
            <div className="quote-mobile pt-20 sm:px-10">
              <ScrollEffect effect="reveal" cascade={true} duration={1000} delay={500} triggerOnce={true}>
                  <p className="block font-semibold tracking-wide leading-loose drop-shadow-[0_5px_3px_rgba(0,0,0,1)] sm:hidden"><em>"{quoteText}"</em> - <strong>{quoteAuthor}</strong></p>
              </ScrollEffect>
            </div>
          </section>
          <section>
            <ScrollEffect effect="reveal" cascade={true} duration={1000} triggerOnce={true} >
              <h2 className="font-semibold mb-8 tracking-tighter">Biography</h2>
              <div className="space-y-5">
                {/* <ScrollEffect effect="reveal" cascade={true} duration={1000} damping={0.3} triggerOnce={true}> */}
                  <p>I'm a product manager at <a href="https://www.yext.com/" className="link" target="_blank">Yext</a>, based out of  🗽 New York City.</p>
                  <p>At Yext, I oversee product development for <a href="https://www.yext.com/platform/pages" className="link" target="_blank">Pages</a>: a full-stack development framework for enterprise web applications.</p>
                  <p>Outside of work, I'm a freelance frontend developer, photographer 📸, and soccer hooligan.</p>
                {/* /</ScrollEffect> */}
              </div>
            </ScrollEffect>
          </section>
          <section>
            <ScrollEffect effect="reveal" cascade={true} duration={1000} triggerOnce={true}>
              <h2 className="font-semibold mb-8 tracking-tighter">Projects</h2>
              <div className="space-y-10">
                {/* <ScrollEffect effect="reveal" cascade={true} duration={1000} damping={0.3} triggerOnce={true}> */}
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
                {/* </ScrollEffect> */}
              </div>
            </ScrollEffect>
          </section>
          <section>
            <ScrollEffect effect="reveal" cascade={true} duration={1000} triggerOnce={true}>
              <h2 className="font-semibold mb-8 tracking-tighter">Blog</h2>
              <div className="space-y-10">
                {/* <ScrollEffect effect="reveal" cascade={true} duration={1000} damping={0.3} triggerOnce={true}> */}
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
                {/* </ScrollEffect> */}
              </div>
              </ScrollEffect>
          </section>
          <section className="">
            <ScrollEffect effect="reveal" cascade={true} duration={1000} triggerOnce={true}>
              <h2 className="font-semibold mb-8 tracking-tighter">Education</h2>
                <div className="flex items-center">
                  <ScrollEffect effect="reveal" cascade={true} duration={800} damping={0.4} triggerOnce={true}>
                    <div className="mr-4 flex-shrink-0">
                      <Image 
                        src="/colby-college.png"
                        width={100}
                        height={100}
                        alt="Colby College Seal"
                        loading="lazy"
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
                  </ScrollEffect>
                </div>
              </ScrollEffect>
          </section>
      </ScrollEffect>
      </div>
    </main>
  );
}
