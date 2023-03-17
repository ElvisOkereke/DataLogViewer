"use client";
import Banner from "@/components/banner";
import Head from "next/head";
import React from "react";
import { useSearchParams } from "next/navigation";

type Props = {};

function page({}: Props) {
  return (
    <div
      className="bg-[rgb(36,36,36)] text-white h-screen snap-mandatory
  snap-y overflow-scroll z-0 overflow-y-scroll overflow-x-hidden scrollbar
   scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]'"
    >
      <Head>
        <title>DataLogViewer</title>
      </Head>

      <Banner />

      <section id="chart" className="snap-start"></section>
    </div>
  );
}

export default page;
