import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from 'app/components/AnimateOnScroll';
import CategoryTag from 'app/components/CategoryTag';
import client from "../../utils/contentful";
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Photography',
  description: "Photos I've taken over the years; film and digital.",
  openGraph: {
    images: 'https://lucmarrie.com/hiroshi-nagai-4.png'
  }
};

async function getPhotos() {
  try {

    return;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}


export default async function PhotographyPage() {
  const blogPosts = await getPhotos();
  return (
    <section className="" style={{minHeight:"40vh"}}>
      <AnimateOnScroll>
        <h1 className="block font-semibold mb-8 tracking-tighter white-text-shadow">Photography</h1>
        <div className="space-y-10">
          {photos.map((photo) => (
            <div className="">
                <Image
                    src={photo.url}
                    width={500}
                    height={500}
                    alt={photo.alt}
                />
                <p>{String(photo.description)}</p>
            </div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}

