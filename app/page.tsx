import Image from 'next/image'

export default function Page() {
  return (
    <section className="space-y-10">
      <div className="flex ">
        <h1 className="font-semibold text-4xl mb-8 tracking-tighter">Luc Yuki Marrie</h1>
        <Image
          src="/luc-space-pic.JPG"
          className="rounded-full"
          width={300}
          height={300}
          alt="Luc's Profile Pic"
        />
      </div>
      <div>
        <h2 className="font-semibold text-2xl mb-8 tracking-tighter">Who Am I?</h2>
        <div className="space-y-3">
          <p>Great question... let's start with the basics:</p>
          <p>My name's Luc! Currently, I live in 🗽New York City; but I grew up in Connecticut, and lived in Japan before that.</p>
          <p>Professionally, I work as a <strong>product manager</strong> at a technology company called <a href="https://www.yext.com/" className="prose prose-a text-blue-300 font-bold hover:underline">Yext</a>. I've spent most of my career overseeing Yext's website development product, <a href="https://www.yext.com/platform/pages" className="prose prose-a text-blue-300 font-bold hover:underline">"Pages"</a>, which is a full-stack development framework.</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-2xl mb-8 tracking-tighter">Education</h2>
          <div>
            Colby College
          </div>
      </div>
    </section>
  );
}
