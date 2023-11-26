'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NavItem({
  path,
  name,
}: {
  path: string;
  name: string;
}) {
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  } else if (pathname.includes('/projects/')) {
    pathname = '/projects';
  }
  const isActive = path === pathname;

  return (
    <Link
      key={path}
      href={path}
      className={clsx(
        'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle',
        {
          'text-neutral-500': !isActive,
        }
      )}
    >
      <span className="relative py-1 px-2">
        {name}
        {path === pathname ? (
          <motion.div
            className="absolute h-[2px] top-7 mx-2 inset-0 bg-neutral-200 dark:bg-neutral-200 z-[-1] dark:bg-white"
            layoutId="sidebar"
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 30,
            }}
          />
        ) : null}
      </span>
    </Link>
  );
}
