import React from "react";
import dynamic from "next/dynamic";

const DynamicPlot = dynamic(() => import("react-plotly.js").then((module) => module.default), {
  ssr: false,
  loading: () => <>Loading...</>,
});

export default function Chart() {
  const data = [
    {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      mode: "lines",
    },
  ];
  const layout = { title: "Chart Title" };

  return <DynamicPlot data={data} layout={layout} />;
}