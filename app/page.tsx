"use client";
import React, { useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/banner";

export default function Home() {
  return (
    <div
      className="bg-[rgb(39,39,39)] text-white h-screen snap-mandatory
    snap-y overflow-scroll z-0 overflow-y-scroll overflow-x-hidden scrollbar
     scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]"
    >
      <Head>
        <title>DataLogViewer</title>
      </Head>

      <section id="navbar" className="snap-start">
        <Banner />
      </section>

      <section id="landing" className="py-20 bg-[rgb(22,22,22)] snap-start">
        <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
          <div className="relative">
            <h2 className="w-full text-3xl font-bold text-center sm:text-4xl md:text-5xl">
              {" "}
              Level Up Your Tuning
            </h2>
            <p className="w-full py-8 mx-auto -mt-2 text-lg text-center text-gray-400 intro sm:max-w-3xl">
              Add some nice touches to your interface with our latest designs,
              components, and templates. We've crafted a beautiful user
              experience that your visitors will love.{" "}
            </p>
            <div className="mt-8 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
              <input
                id="email"
                type="text"
                className="rounded-md border border-transparent bg-white/20 px-4 py-2 text-white placeholder-white backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 sm:mx-2"
                placeholder="Email Address"
              />

              <button className="transform rounded-md bg-[#F7AB0A] px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200 hover:bg-[#8b640f] focus:bg-[#8b640f] focus:outline-none sm:mx-2">
                <Link href="/chart"> Get Started!</Link>
              </button>
            </div>
          </div>
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
              <Image
                className="rounded-lg shadow-xl"
                src="https://cdn.discordapp.com/attachments/705799653848776784/1087115427412451480/image.png"
                alt=""
                height={500}
                width={500}
              />
            </div>
            <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
              <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">
                Drag-n-drop design
              </p>
              <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">
                Design Made Easy
              </h3>
              <p className="mt-5 text-lg text-gray-400 text md:text-left">
                Crafting your user experience has never been easier, with our
                intuitive drag'n drop interface you will be creating beatiful
                designs in no time.
              </p>
            </div>
          </div>
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
              <Image
                className="rounded-lg shadow-xl"
                src="https://cdn.discordapp.com/attachments/705799653848776784/1087114689760198787/image.png"
                alt=""
                height={500}
                width={500}
              />
            </div>
            <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pl-16">
              <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">
                know your data
              </p>
              <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">
                Optimized For Conversions
              </h3>
              <p className="mt-5 text-lg text-gray-400 text md:text-left">
                Backed by data, these templates have been crafted for ultimate
                optimization. Now, converting your visitors into customers is
                easier than ever before.
              </p>
            </div>
          </div>
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
              <Image
                className="rounded-lg shadow-xl"
                src="https://cdn.discordapp.com/attachments/705799653848776784/1087115447398301836/image.png"
                alt=""
                height={500}
                width={500}
              />
            </div>
            <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
              <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">
                Easy to customize
              </p>
              <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">
                Make It Your Own
              </h3>
              <p className="mt-5 text-lg text-gray-400 text md:text-left">
                All templates and components are fully customizable. You can use
                these templates to tell your personal story and convey your
                message.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
