import React from 'react';
import { Space_Mono } from 'next/font/google';

const space_mono = Space_Mono(
    {
        weight:'400',
        subsets:['latin']
    }
)

const Hero = () => {
  return (
    <div
      className={`${space_mono.className} w-full h-full mt-72 flex justify-center items-center text-5xl tracking-widest text-black font-bold`}
    >
      Coming <span className="text-green-600 ml-8">Soon....</span>
    </div>
  );
};

export default Hero;
