import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import {
  AgChartThemeOverrides,
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
} from "ag-grid-community";

type Props = {
  rows: any[];
  labels: string[];
};

function ChartBuilder({ rows, labels }: Props) {
  <GridExample />;

  return <div className="flex"></div>;
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>();
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);
  const chartThemes = useMemo<string[]>(() => {
    return ["ag-pastel", "ag-vivid"];
  }, []);
  const popupParent = useMemo<HTMLElement | null>(() => {
    return document.body;
  }, []);
  const chartThemeOverrides = useMemo<AgChartThemeOverrides>(() => {
    return {
      common: {
        legend: {
          position: "bottom",
        },
        axes: {
          number: {
            title: {
              enabled: true,
            },
          },
        },
      },
      column: {
        series: {
          strokeWidth: 2,
          fillOpacity: 0.8,
        },
      },
      line: {
        series: {
          strokeWidth: 5,
          strokeOpacity: 0.8,
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    gridRef.current!.api.createRangeChart({
      chartType: "customCombo",
      cellRange: {
        columns: ["month", "rain", "pressure", "temp"],
      },
      seriesChartTypes: [
        { colId: "rain", chartType: "groupedColumn", secondaryAxis: false },
        { colId: "pressure", chartType: "line", secondaryAxis: true },
        { colId: "temp", chartType: "line", secondaryAxis: true },
      ],
      aggFunc: "sum",
      suppressChartRanges: true,
      chartContainer: document.querySelector("#myChart") as any,
    });
  }, []);
};

export default ChartBuilder;
