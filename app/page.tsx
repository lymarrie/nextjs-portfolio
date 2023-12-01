import Image from 'next/image';
import { allBlogs } from 'contentlayer/generated';
import Link from 'next/link';

const quoteText = "Some people want it to happen, some wish it would happen, others make it happen.";
const quoteAuthor = "Michael Jordan 🏀";

export default function Page() {
  return (
    <section className="space-y-12">
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
      <div className="quote-mobile sm:px-10">
        <p className="block sm:hidden"><em>"{quoteText}"</em> - <strong>{quoteAuthor}</strong></p>
      </div>
      <div>
        <h2 className="font-semibold mb-8 tracking-tighter">Biography</h2>
        <div className="space-y-3 ">
          <p>I'm a product manager at <a href="https://www.yext.com/" className="link" target="_blank">Yext</a>, based out of  🗽 New York City.</p>
          <p>At Yext, I oversee product development for <a href="https://www.yext.com/platform/pages" className="link" target="_blank">Pages</a>: a full-stack development framework for enterprise web applications.</p>
          <p>Outside of work, I'm a freelance frontend developer, photographer 📸, and soccer hooligan.</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold mb-8 tracking-tighter">Blog</h2>
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
                  href={`${post.slug}`}
                >
                  {post.title}
                </a>
                <p>{post.summary}</p>
              </div>
          ))}
        </div>
      </div>
      <div>
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
      </div>
    </section>
  );
}
