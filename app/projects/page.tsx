import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function ProjectsPage() {
  return (
    <section className="space-y-10">
      <h1 className="block font-semibold mb-8 tracking-tighter white-text-shadow">Projects</h1>
      <div className="text-xl">
        <p>🚧 Currently under construction. 🚧</p>
      </div>
    </section>
  );
}
