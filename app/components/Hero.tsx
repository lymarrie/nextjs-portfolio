"use client"
import React, { ReactNode } from 'react';
import { Fade } from "react-awesome-reveal";
import ScrollEffect from './ScrollEffect';
import Image from 'next/image';

interface HeroProps {
    children: ReactNode;
}


const Hero = () => {
    
    const quoteText = "Some people want it to happen, some wish it would happen, others make it happen.";
    const quoteAuthor = "Michael Jordan 🏀";

    return (
            <section className="">
                    <div className="container z-10">
                        <ScrollEffect effect="fade" cascade={true} duration={600} triggerOnce={true}>
                            <h1 className="block font-semibold mb-8 tracking-tighter drop-shadow-[0_5px_3px_rgba(0,0,0,1)]">Luc Yuki Marrie</h1>
                            <div className="flex justify-center">
                                {/* <ScrollEffect effect="reveal" cascade={true} duration={600} damping={0.5}> */}
                                {/* <Fade cascade={true} duration> */}
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
                                {/* </Fade> */}
                                {/* </ScrollEffect> */}
                            </div>
                        </ScrollEffect>
                    </div>

                    <div className="quote-mobile pt-20 sm:px-10">
                        <ScrollEffect effect="reveal" cascade={true} duration={500} damping={0.5} delay={500} triggerOnce={true}>
                            <p className="block font-semibold tracking-wide leading-loose drop-shadow-[0_5px_3px_rgba(0,0,0,1)] sm:hidden"><em>"{quoteText}"</em> - <strong>{quoteAuthor}</strong></p>
                        </ScrollEffect>
                    </div>
            </section>
    );
}

export default Hero;
