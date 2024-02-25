import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export let DoughnutChart = ({ StatusData = [] }) => {
  const data = {
    labels: ['scheduled', 'in-progress', 'completed'],
    datasets: [
      {
        label: 'Calls',
        data: StatusData,
        borderColor: ['rgb(62,12,171)', 'rgb(214,43,129)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'],
        borderWidth: 1,
      },
    ],
  };
  console.log(data);
  return <Doughnut data={data} />;
};

export let PieChart = ({ StatusData = [] }) => {
  const colors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(220, 20, 60, 0.8)',
    'rgba(0, 128, 128, 0.8)',
    'rgba(255, 140, 0, 0.8)',
    'rgba(46, 139, 87, 0.8)',
    'rgba(70, 130, 180, 0.8)',
    'rgba(255, 215, 0, 0.8)',
    'rgba(128, 0, 128, 0.8)',
    'rgba(176, 224, 230, 0.8)',
    'rgba(210, 105, 30, 0.8)',
    'rgba(0, 0, 128, 0.8)',
    'rgba(128, 128, 0, 0.8)',
    'rgba(106, 90, 205, 0.8)',
    'rgba(255, 99, 71, 0.8)',
    'rgba(0, 255, 255, 0.8)',
  ];
  const category = ['Category 1', 'Category 2', 'Category 3'];
  const data = {
    labels: category,
    datasets: [
      {
        label: 'Calls',
        data: StatusData,
        borderColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(0, 128, 128, 0.8)',
          'rgba(255, 140, 0, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };
  console.log(data);
  return <Pie data={data} />;
};

export const LineChart = ({ dataArray = [], startDate, endDate, months }) => {
  const options = {
    response: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Calls per day',
      },
    },
  };
  const labels = [];
  let diff = new Date(endDate) - new Date(startDate);
  diff = Math.floor(diff / (1000 * 60 * 60 * 24));
  for (let i = 0; i < diff + 1; i++) {
    let day = new Date(new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000);
    day = months[day.getMonth()] + ' ' + day.getDate();
    labels.push(day);
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Calls',
        data: dataArray,
        borderColor: 'rgba(107,70,193,0.5)',
        backgroundColor: '#6b46c1',
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export const BarChart = ({ dataArray = [], startDate, endDate, months }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Minutes per day',
      },
    },
  };
  const labels = [];
  let diff = new Date(endDate) - new Date(startDate);
  diff = Math.floor(diff / (1000 * 60 * 60 * 24));
  for (let i = 0; i < diff + 1; i++) {
    let day = new Date(new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000);
    day = months[day.getMonth()] + ' ' + day.getDate();
    labels.push(day);
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Minutes',
        data: dataArray,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
