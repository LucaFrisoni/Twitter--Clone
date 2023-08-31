import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  data: any;
  xTitle: string;
}

const LineChart = ({ data, xTitle }: LineChartProps) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Likes",
        data: data.values,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192,0.5)",
        tension: 0.5,
        pointRadius: 5,
      },
    ],
  };
  if (xTitle == "Weeks") {
    chartData.labels = [1, 2, 3, 4, 5];
  }
  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Configura el paso de la escala
        },
        title: {
          display: true,
          text: "Likes",
        },
      },
      x: {
        title: {
          display: true,
          text: xTitle,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
