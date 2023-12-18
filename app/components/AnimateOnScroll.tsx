"use client"
import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimateOnScrollProps {
    children: ReactNode;
    hiddenClass?: string;
    showClass?: string;
  }

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
    children,
    hiddenClass = 'fadeIn-hidden',
    showClass = 'fadeIn-show',
  }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.4,
    triggerOnce: true
  });

  const styling = inView ? showClass : '';

  return (
    <div ref={ref} className={`${hiddenClass} ${styling}`}>
      {children}
    </div>
  );
}

export default AnimateOnScroll;
