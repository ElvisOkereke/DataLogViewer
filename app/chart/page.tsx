"use client";
import Banner from "@/components/banner";
import Head from "next/head";
import React, { useState } from "react";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from "recharts";

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

  return fields.map((field: string, id: number) => {
    return (
      <Line
        type="monotone"
        dataKey={field.trim().toUpperCase().replaceAll(" ", "_")}
        stroke="#ffc658"
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
    <div>
      <input type="file" onChange={handleFileUpload} />

      <LineChart
        width={1500}
        height={1200}
        data={data}
        margin={{
          top: 5,
          right: 30,
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
        <Brush />
      </LineChart>
    </div>
  );
}

export default page;
