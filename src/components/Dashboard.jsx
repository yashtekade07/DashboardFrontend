import React from 'react';
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
  Label,
} from 'recharts';
import { Label as ShadLabel } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { getCallEntries } from '@/Redux/actions/stats';

const Dashboard = () => {
  const campaignIds = Array.from(
    { length: 20 },
    (_, index) => `campaign_${index + 1}`
  );
  const dispatch = useDispatch();
  const { callEntry } = useSelector((state) => state.callEntry);
  const CampaignHandler = (e) => {
    dispatch(getCallEntries({ campaignId: e.target.innerText }));
  };
  return (
    <>
      <div className='flex flex-row justify-between'>
        <div className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>Campaign Id</DropdownMenuTrigger>
              <DropdownMenuContent
                className={'flex flex-col flex-wrap overflow-auto'}
              >
                {campaignIds.map((id) => (
                  <DropdownMenuItem key={id} onClick={CampaignHandler}>
                    {id}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <ShadLabel htmlFor='email'>From</ShadLabel>
            <Input type={'date'} />
            <ShadLabel htmlFor='email'>To</ShadLabel>
            <Input type={'date'} />
          </div>
        </div>
        <ResponsiveContainer width='100%' height={350}>
          <BarChart data={callEntry}>
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
