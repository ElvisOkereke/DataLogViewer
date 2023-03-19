import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function shift(matrix: any, n: number) {
  if (matrix) {
    for (let j = 0; j < n; j++) {
      if (matrix[j][0] != undefined) matrix[j].shift();
    }
  }
  //matrix.splice(n, matrix.length - n);

  return matrix;
}
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

  return matrix;
}

type Props = {
  rows: any[];
  labels: string[];
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
      },
      zoom: {
        pinch: {
          enabled: true, // Enable pinch zooming
        },
        wheel: {
          enabled: true, // Enable wheel zooming
        },
        mode: "x",
      },
    },
  },
};

function ChartBuilder({ rows, labels }: Props) {
  const label = rows[0];

  const data = {
    label,
    datasets: [
      {
        label: labels[1],
        data: labels[1],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: labels[2],
        data: rows[2],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="flex">
      <Line options={options} data={data} />
    </div>
  );
}

export default ChartBuilder;
