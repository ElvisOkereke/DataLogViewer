import React, { useEffect, useMemo, useRef } from "react";
import { useCSVReader } from "react-papaparse";
import LogBuilder from "./LogBuilder";
import { motion } from "framer-motion";
import Link from "next/link";
import ChartBuilder from "./ChartBuilder";

type Props = {};

var d: any[] = [];
var fields: string[] = [];

function CSVReader({}: Props) {
  const { CSVReader } = useCSVReader();

  return (
    <div>
      <CSVReader
        onUploadAccepted={(results: any) => {
          d = results.data;
          fields = results.data[0];
          console.log(results);
          console.log(fields);
        }}
        parseOptions={{
          header: true,
          dynamicTyping: true,
          preview: 0,
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }: any) => (
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.2,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.7, 1],
                scale: 1,
              }}
              transition={{
                duration: 1,
              }}
              className="flex item-center justify-center space-x-20"
            >
              <button
                className="inline-flex items-center px-4 py-2 bg-indigo-500
              hover:bg-indigo-600 text-white text-sm font-medium rounded-md"
                type="button"
                {...getRootProps()}
              >
                Browse file
              </button>
              <div>{acceptedFile && acceptedFile.name}</div>
              <button
                {...getRemoveFileProps()}
                className="inline-flex items-center px-4
             py-2 bg-red-600 hover:bg-red-700 text-white text-sm 
             font-medium rounded-md"
              >
                Remove
              </button>
            </motion.div>
            <ProgressBar />
            <ChartBuilder rows={d} labels={fields} />;
          </>
        )}
      </CSVReader>
    </div>
  );
}

export default CSVReader;
