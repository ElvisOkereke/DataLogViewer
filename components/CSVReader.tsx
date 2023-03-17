import React, { useMemo, useRef } from "react";
import { useCSVReader } from "react-papaparse";
import LogBuilder from "./LogBuilder";
import { motion } from "framer-motion";
import Link from "next/link";
import ChartBuilder from "./ChartBuilder";

type Props = {};

var fields: string[] = [];
var data: any[] = [];

function Transpose(matrix: any) {
  if (matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < i; j++) {
        const tmp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = tmp;
      }
    }
  }
  //matrix.splice(n, matrix.length - n);

  return matrix;
}

function shift(matrix: any, n: number) {
  if (matrix) {
    for (let j = 0; j < n; j++) {
      if (matrix[j][0] != undefined) matrix[j].shift();
    }
  }
  //matrix.splice(n, matrix.length - n);

  return matrix;
}

function CSVReader({}: Props) {
  const { CSVReader } = useCSVReader();

  return (
    <div>
      <CSVReader
        onUploadAccepted={(results: any) => {
          fields = results.data[0];
          console.log(fields);
          data = Transpose(results.data);
          data = shift(data, fields.length);
          console.log(data);
        }}
        parseOptions={{ header: true }}
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
          </>
        )}
      </CSVReader>

      <ChartBuilder rows={data} labels={fields} />
    </div>
  );
}

export default CSVReader;
