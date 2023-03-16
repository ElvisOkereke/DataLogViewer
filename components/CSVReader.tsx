import React, { useMemo, useRef } from "react";
import { useCSVReader } from "react-papaparse";
import LogBuilder from "./LogBuilder";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

var labels: any = [];
var data: any = [];

function Transpose(matrix: any, n: any) {
  if (matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < i; j++) {
        const tmp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = tmp;
      }
    }
  }
  matrix.splice(n, matrix.length - n);

  return matrix;
}

function CSVReader({}: Props) {
  const { CSVReader } = useCSVReader();
  const [data, setData] = React.useState<any>([]);
  const [meta, setMeta] = React.useState<any>([]);

  return (
    <div>
      <CSVReader
        onUploadAccepted={(results: any) => {
          setMeta(results.meta.fields);
          setData(Transpose(results.data, meta.fields.length));
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
                <Link
                  href={{
                    pathname: "/chart",
                    query: { columns: data, parameters: labels },
                  }}
                >
                  Browse file
                </Link>
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
    </div>
  );
}

export default CSVReader;
