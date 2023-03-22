"use client";
import Banner from "@/components/banner";
import Head from "next/head";
import React, { useState, useRef } from "react";
import Papa from "papaparse";
import Image from "next/image";
import { BsGrid } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import { ImCheckboxUnchecked } from "react-icons/im";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from "recharts";
import { FullWidth } from "ag-grid-community/dist/lib/components/framework/componentTypes";

type Props = {};

//const windowSize = useRef([window.innerWidth, window.innerHeight]);
//Width: {windowSize.current[0]}
//Height: {windowSize.current[1]}

const productList = (data: any) => {
  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    Object.keys(obj).forEach((key) => {
      var replacedKey = key.trim().toUpperCase().replaceAll(" ", "_");
      if (key !== replacedKey) {
        obj[replacedKey] = obj[key];
        delete obj[key];
      }
    });
  }
};

const resize = () => {};

const drawChart = (fields: any) => {
  //for (let i = 0; i < fields.length; i++) {
  // console.log(fields[i].trim().toUpperCase().replaceAll(" ", "_"));
  // return<Line type="monotone" dataKey={fields[i].trim().toUpperCase().replaceAll(" ", "_")} stroke="#ffc658"/>;
  // } DOESNT WORK BECAUSE OF THE RETURN STOPS THE LOOP

  let colors = [
    "#ffc658",
    "#82ca9d",
    "#8884d8",
    "#ff0000",
    "#00ff00",
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
    "#008080",
    "#e6beff",
    "#9a6324",
    "#800000",
    "#aaffc3",
    "#808000",
    "#ffd8b1",
    "#000075",
  ];

  return fields.map((field: string, id: number) => {
    return (
      <Line
        activeDot={{ r: 4 }}
        type="linear"
        dataKey={field.trim().toUpperCase().replaceAll(" ", "_")}
        stroke={colors[id]}
        strokeWidth={3}
      />
    );
  });
};

function page({}: Props) {
  const [data, setData] = useState<any>([]);
  const [fields, setFields] = useState<any>([]);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result: any) => {
        setFields(result.meta.fields);
        productList(result.data);
        setData(result.data);
      },
    });
  };
  return (
    <div
      className=" mx-auto grid max-w-full grid-cols-12 gap-4 bg-[rgb(36,36,36)] h-screen space-y-10 p-5 
                  snap-mandatory snap-y overflow-scroll z-0 overflow-y-scroll overflow-x-hidden scrollbar
                 scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]"
    >
      <section
        id="uploader"
        className="snap-start p-5 header col-span-12 rounded-lg border border-gray-300 bg-gray-800"
      >
        <form className="">
          <div className="flex space-x-5 shrink-0">
            <Image
              className="h-20 w-20 shadow-md object-cover rounded-full"
              src="https://cdn.discordapp.com/attachments/705799653848776784/1082842903518388224/LVBT_Logo.jpg"
              alt="photo"
              height={500}
              width={500}
            />

            <label className="">
              <span className="sr-only">Choose File</span>
              <input
                type="file"
                className="block w-full text-sm text-gray-500 
                        file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                        file:text-sm file:font-semibold file:bg-blue-50 file:text-[#f58231]
                      hover:file:bg-blue-100"
                onChange={handleFileUpload}
              />
            </label>
            <button
              type="button"
              className="inline-flex text-white bg-gradient-to-r
             from-[#f58231] to-[#F7AB0A] hover:bg-gradient-to-l focus:outline-none
              focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-2xl
               text-sm px-5 py-2.5 text-center mr-2"
            >
              <ImCheckboxUnchecked className=" h-10 w-10 mt-2 mr-2" />
              <div className="text-xl font-mono font-bold pt-4">
                Single Chart
              </div>
            </button>
            <button
              type="button"
              className="inline-flex text-white bg-gradient-to-r
             from-[#f58231] to-[#F7AB0A] hover:bg-gradient-to-l focus:outline-none
              focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-2xl
               text-sm px-5 py-2.5 text-center mr-2"
            >
              <CiGrid2H className=" h-10 w-10 mt-2 mr-2" />
              <div className="text-xl font-mono font-bold pt-4">
                Double Chart
              </div>
            </button>
            <button
              type="button"
              className="inline-flex text-white bg-gradient-to-r
             from-[#f58231] to-[#F7AB0A] hover:bg-gradient-to-l focus:outline-none
              focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-2xl
               text-sm px-5 py-2.5 text-center mr-2"
            >
              <BsGrid className=" h-10 w-10 mt-2 mr-2" />
              <div className="text-xl font-mono font-bold pt-4">Quad Chart</div>
            </button>
          </div>
        </form>
      </section>

      <section
        id="main"
        className="snap-center col-span-12 rounded-lg border border-gray-500 p-32"
      >
        <div className="w-[2000px] h-[1100px]">
          <ResponsiveContainer>
            <LineChart
              width={1500}
              height={1000}
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={fields[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              {drawChart(fields)}
              <Brush height={30} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default page;
