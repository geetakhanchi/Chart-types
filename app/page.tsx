"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./components/Chart"), { ssr: false });

export default function Home() {
  return (
    <div style={{ margin: "10px", paddingTop: "10px" }}>
      <h2>Chart Dashboard</h2>
      <Chart />
    </div>
  );
}
