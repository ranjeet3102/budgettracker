"use client";
import { Button } from './ui/button';
import Image from "next/image";
import { useEffect, useRef } from 'react';
import Link from 'next/link'


const HeroSection = () => {

  const imageRef = useRef();

  useEffect(() => {
     const imageElement = imageRef.current;

     const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100; 

      if(scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      }
      else{
        imageElement.classList.remove("scrolled");
      }
     };
     window.addEventListener("scroll", handleScroll)

     return () => window.removeEventListener("scroll", handleScroll);
  },[])

  return (
    <div className='pb-20 px-4'>
     <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-8xl lg:text-[100px] pb-6 gradient font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text">
            Manage Your Money with <br/> Smart Intelligence!
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
{/*      
            An AI-powered financial assistant that helps you track,
             analyze, and optimize your spending with real-time insights. */}

             $martSpend helps students stay on budget using AI. From smart tracking to personalized advice — manage your money smarter in minutes.
        </p>
        <div>

        <Link href="/dashboard">
        <Button size="lg" className="px-8" >Get Started</Button>
        </Link>
     </div>
     <div className="hero-image-wrapper">
        <div ref={imageRef} className="hero-image">
            <Image src="/Banner.png" width={1200} height={720}  
            alt="Banner Image" 
            className='rounded-lg shadow-2xl border mx-auto'
            priority/>
        </div>
     </div>
    </div>

   </div>
  )
}

export default HeroSection

