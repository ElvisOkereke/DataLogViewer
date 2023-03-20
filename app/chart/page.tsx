"use client";
import Banner from "@/components/banner";
import Head from "next/head";
import React, { useState } from "react";
import Papa from "papaparse";
import Image from "next/image";
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
      className="bg-[rgb(36,36,36)] text-white h-screen snap-mandatory
    snap-y overflow-scroll z-0 overflow-y-scroll overflow-x-hidden scrollbar
     scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A] "
    >
      <form className="flex items-center space-x-6">
        <div className="shrink-0">
          <Image
            className="h-20 w-20 shadow-md object-cover rounded-full"
            src="https://cdn.discordapp.com/attachments/705799653848776784/1082842903518388224/LVBT_Logo.jpg"
            alt="photo"
            height={500}
            width={500}
          />
        </div>
        <label className="block">
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
      </form>
      <div className="">
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
      </div>
    </div>
  );
}

export default page;
