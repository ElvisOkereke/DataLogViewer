"use client";
import CSVReader from "@/components/CSVReader";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/banner";
import ChartBuilder from "@/components/ChartBuilder";
import { useSearchParams } from "next/navigation";

export function chartLoader() {
  console.log("loading chart!");
  var searchParams = useSearchParams();
  console.log(searchParams.get("result"));
  var res = searchParams.get("result");
  var labels = searchParams.get("labels");
  <ChartBuilder data={res} labels={labels} />;
}

export default function Home() {
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

      <section id="graph" className="snap-start">
        <CSVReader />
      </section>
    </div>
  );
}
