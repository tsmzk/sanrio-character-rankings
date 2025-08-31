import {
  CategoryScale,
  type ChartData,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useRef } from "react";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartContainerProps {
  chartData: ChartData<"line">;
  chartOptions: ChartOptions<"line">;
  height: number;
  className?: string;
}

export function ChartContainer({
  chartData,
  chartOptions,
  height,
  className = "",
}: ChartContainerProps) {
  const chartRef = useRef<ChartJS<"line">>(null);

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ${className}`}
      style={{ height }}
    >
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
}
