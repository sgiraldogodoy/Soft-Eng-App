import React from "react";
import { X } from "lucide-react";
import PieChartSR from "./PieChartSR.tsx";
import FilterBarChartSR from "./FilterBarChartSR.tsx";

interface StatisticsCardProps {
  selected: boolean;
  close?: () => void;
  typeStatistics: string;
}

export default function StatisticsCard({
  selected,
  close,
  typeStatistics,
}: StatisticsCardProps) {
  return (
    <div
      className={`${selected ? "pr-4" : "pr-2"} pl-4 pt-2 pb-2 w-full h-full overflow-auto relative`}
    >
      <div className="bg-white/90 w-full h-full flex flex-col items-center rounded-xl overflow-auto">
        <h1>{typeStatistics}</h1>
        {typeStatistics.includes("Pie") && <PieChartSR selected={selected} />}
        {typeStatistics.includes("Bar") && (
          <FilterBarChartSR selected={selected} />
        )}
      </div>
      {selected && close && (
        <div className="absolute top-2 right-4">
          <button onClick={close}>
            <X />
          </button>
        </div>
      )}
    </div>
  );
}
