"use client";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import Chart, { ChartTypeRegistry, Plugin, Point } from "chart.js/auto";
// Import this if you're using date-fns for date handling

// Define a custom type for extending the Chart object
interface CustomChart<
  TType extends keyof ChartTypeRegistry = keyof ChartTypeRegistry,
  TData = unknown,
  TLabel = any
> extends Chart<TType, TData, TLabel> {
  lastPosition?: { x: number; y: number };
  panningEnabled?: boolean;
  zoom(options: { amount: number }): void;
  pan(options: { deltaX: number; deltaY: number }): void;
}

const page: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<CustomChart<"line"> | null>(null); // Use CustomChart type here
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (data.length === 0) return;

    const ctx = chartContainer.current!.getContext("2d")!;
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((_, index) => index),
        datasets: Object.keys(data[0]).map((parameter) => ({
          label: parameter,
          data: data.map((point) => parseFloat(point[parameter])),
          borderColor: getRandomColor(),
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderWidth: 1,
        })),
      },
      options: {
        interaction: {
          mode: "index",
          axis: "xy",
          intersect: false,
        },
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
            type: "linear",
            position: "left",
          },
        },
      },
    }) as CustomChart<"line">;

    chartInstance.current.zoom = function (options: { amount: number }) {
      // Implement zoom functionality here
      chartContainer.current!.addEventListener("wheel", handleWheel);
    };

    chartInstance.current.pan = function (options: {
      deltaX: number;
      deltaY: number;
    }) {
      // Implement pan functionality here
      chartContainer.current!.addEventListener("mousedown", handleMouseDown);
      chartContainer.current!.addEventListener("mouseup", handleMouseUp);
      chartContainer.current!.addEventListener("mousemove", handleMouseMove);
    };

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartContainer.current!.removeEventListener("mousedown", handleMouseDown);
      chartContainer.current!.removeEventListener("mouseup", handleMouseUp);
      chartContainer.current!.removeEventListener("mousemove", handleMouseMove);
      chartContainer.current!.removeEventListener("wheel", handleWheel);
    };
  }, [data]);

  const handleMouseDown = (event: MouseEvent) => {
    if (event.button === 1 || event.button === 2) {
      event.preventDefault();
      if (chartInstance.current) {
        chartInstance.current!.panningEnabled = true;
        chartInstance.current!.lastPosition = {
          x: event.clientX,
          y: event.clientY,
        };
      }
    }
  };

  const handleMouseUp = () => {
    if (chartInstance.current) {
      chartInstance.current!.panningEnabled = false;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (chartInstance.current && chartInstance.current.panningEnabled) {
      const dx = event.clientX - (chartInstance.current!.lastPosition!.x ?? 0);
      const dy = event.clientY - (chartInstance.current!.lastPosition!.y ?? 0);
      chartInstance.current!.pan({ deltaX: -dx, deltaY: -dy });
      chartInstance.current!.lastPosition = {
        x: event.clientX,
        y: event.clientY,
      };
    }
  };

  const handleWheel = (event: WheelEvent) => {
    if (chartInstance.current) {
      const delta = Math.sign(event.deltaY) * 0.1;
      chartInstance.current!.zoom({ amount: delta });
    }
  };

  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target!.result as string;
        const parsedData = Papa.parse(text, { header: true });
        setData(parsedData.data);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <canvas ref={chartContainer} />
    </div>
  );
};

export default page;
