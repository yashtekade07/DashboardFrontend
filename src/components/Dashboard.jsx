import React from 'react';
import { Nav } from './Nav';
import { Inbox, File, Send, ArchiveX, Trash2, Archive } from 'lucide-react';
import {
  Bar,
  BarChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const Dashboard = () => {
  let { stats, message, error, loading } = useSelector((state) => state.stat);
  stats = stats.map((item) => ({
    ...item,
    createdAt: format(new Date(item.createdAt), 'dd/MM'), // Format to dd/MM (day and month)
  }));
  const categoryData = stats.reduce((acc, curr) => {
    curr.category.forEach((cat) => {
      const existingCat = acc.find((item) => item.name === cat.name);
      if (existingCat) {
        existingCat.calls += cat.calls;
        existingCat.minutes += cat.minutes;
      } else {
        acc.push({ name: cat.name, calls: cat.calls });
      }
    });
    return acc;
  }, []);

  const statusData = stats.reduce((acc, curr) => {
    curr.status.forEach((stat) => {
      const existingStat = acc.find((item) => item.name === stat.name);
      if (existingStat) {
        existingStat.calls += stat.calls;
        existingStat.minutes += stat.minutes;
      } else {
        acc.push({ name: stat.name, calls: stat.calls });
      }
    });
    return acc;
  }, []);

  return (
    <>
      <div className='flex flex-row justify-between'>
        <Nav />
        <ResponsiveContainer width='100%' height={350}>
          <BarChart data={stats}>
            <XAxis
              dataKey={`createdAt`}
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar
              dataKey='minutes'
              fill='currentColor'
              radius={[4, 4, 0, 0]}
              className='fill-primary'
            />
          </BarChart>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey='calls'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={100}
              fill='currentColor'
              label={({ name, calls }) => `${name}: ${calls}`}
            />
          </PieChart>
          <PieChart width={700} height={700}>
            <Tooltip />
            <Pie
              data={statusData}
              dataKey='calls'
              outerRadius={100}
              innerRadius={70}
              fill='currentColor'
              label={({ name, calls }) => `${name}: ${calls}`}
            />
          </PieChart>
          <LineChart
            width={730}
            height={250}
            data={stats}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='createdAt' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='calls' stroke='#000' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;
