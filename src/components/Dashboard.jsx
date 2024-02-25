import React, { useEffect, useState } from 'react';
import { Inbox, File, Send, ArchiveX, Trash2, Archive } from 'lucide-react';
import { ResponsiveContainer } from 'recharts';
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
import { BarChart, DoughnutChart, LineChart, PieChart } from './Chart';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
const Dashboard = () => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  );
  const [campaignId, setCampaignId] = useState();
  const [totalCallsPerDay, setTotalCallsPerDay] = useState([]);
  const [totalMinutesPerDay, setTotalMinutesPerDay] = useState([]);
  const [totalCallsPerCategory, setTotalCallsPerCategory] = useState([]);
  const [totalCallsPerStatus, setTotalCallsPerStatus] = useState([]);
  const campaignIds = Array.from(
    { length: 20 },
    (_, index) => `campaign_${index + 1}`
  );
  campaignIds.unshift('None');
  const dispatch = useDispatch();
  const CampaignHandler = (e) => {
    if (e.target.innerText == 'None') {
      setCampaignId('');
    } else {
      setCampaignId(e.target.innerText);
    }
  };
  const handleChangeStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const handleChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };
  const change = ({ startDate, endDate }) => {
    // Calculate the difference in milliseconds
    let temp = [];
    let diff = new Date(endDate) - new Date(startDate);
    diff = Math.floor(diff / (1000 * 60 * 60 * 24));
    for (let i = 0; i < diff + 1; i++) {
      let day = new Date(
        new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000
      );
      day.setHours(0, 0, 0, 0);
      let minutes = 0;
      callEntry.forEach((entry) => {
        let checkDate = new Date(entry.createdAt);
        checkDate.setHours(0, 0, 0, 0);
        if (checkDate.toString() == day.toString()) {
          minutes += entry.duration;
        }
      });
      day = months[day.getMonth()] + ' ' + day.getDate();
      temp.push({ day, minutes });
    }
    setTotalMinutesPerDay(temp);

    temp = [];
    const categories = ['category1', 'category2', 'category3'];
    for (let i = 0; i < categories.length; i++) {
      let calls = 0;
      callEntry.forEach((entry) => {
        if (entry.category == categories[i]) {
          calls += 1;
        }
      });
      const key = categories[i];
      temp.push({ key, calls });
    }
    setTotalCallsPerCategory(temp);

    temp = [];
    const status = ['scheduled', 'in-progress', 'completed'];
    for (let i = 0; i < status.length; i++) {
      let calls = 0;
      callEntry.forEach((entry) => {
        if (entry.status == status[i]) {
          calls += 1;
        }
      });
      const key = status[i];
      temp.push({ key, calls });
    }
    setTotalCallsPerStatus(temp);

    temp = [];
    for (let i = 0; i < diff + 1; i++) {
      let day = new Date(
        new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000
      );
      day.setHours(0, 0, 0, 0);
      let calls = 0;
      callEntry.forEach((entry) => {
        let checkDate = new Date(entry.createdAt);
        checkDate.setHours(0, 0, 0, 0);
        if (checkDate.toString() == day.toString()) {
          calls += 1;
        }
      });
      day = months[day.getMonth()] + ' ' + day.getDate();
      temp.push({ day, calls });
      setTotalCallsPerDay(temp);
    }
  };
  const { callEntry } = useSelector((state) => state.callEntry);
  useEffect(() => {
    dispatch(getCallEntries({ campaignId, startDate, endDate }));
  }, [dispatch, campaignId, startDate, endDate]);

  useEffect(() => {
    change({ campaignId, startDate, endDate });
    totalMinutesPerDay;
  }, [callEntry]);

  return (
    <>
      <div
        className='flex flex-row justify-between'
        style={{
          boxSizing: 'border-box',
          paddingTop: '12px',
          marginTop: '10px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <div className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 relative'>
          <ColorModeSwitcher />
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
            <Input type={'date'} onChange={handleChangeStartDate} />
            <ShadLabel htmlFor='email'>To</ShadLabel>
            <Input type={'date'} onChange={handleChangeEndDate} />
          </div>
        </div>
        <div className='relative'>
          <ResponsiveContainer width='100%' height={350}>
            <div className='flex flex-row '>
              <div
                className='m-0 sm:m-12 rounded-lg p-0 sm:p-8 mt-4 sm:mt-16 shadow object-contain'
                style={{ boxShadow: '-1px 0px 10px rgba(107, 70, 193, 0.5)' }}
              >
                <h2 className='text-center text-md mb-4'>Minutes Per Day</h2>
                <BarChart
                  dataArray={totalMinutesPerDay.map((item) => item.minutes)}
                  startDate={startDate}
                  endDate={endDate}
                  months={months}
                />
              </div>
              <div
                className='m-0 sm:m-12 rounded-lg p-0 sm:p-8 mt-4 sm:mt-16 shadow'
                style={{ boxShadow: '-1px 0px 10px rgba(107, 70, 193, 0.5)' }}
              >
                <h2 className='text-center text-md mb-4'>Status</h2>
                <DoughnutChart
                  StatusData={totalCallsPerStatus.map((item) => item.calls)}
                />
              </div>
              <div
                className='m-0 sm:m-12 rounded-lg p-0 sm:p-8 mt-4 sm:mt-16 shadow'
                style={{ boxShadow: '-1px 0px 10px rgba(107, 70, 193, 0.5)' }}
              >
                <h2 className='text-center text-md mb-4'>Category</h2>
                <PieChart
                  StatusData={totalCallsPerCategory.map((item) => item.calls)}
                />
              </div>
            </div>
            <div
              className='m-0 sm:m-12 rounded-lg p-0 sm:p-8 mt-4 sm:mt-16 shadow w-1/2'
              style={{ boxShadow: '-1px 0px 10px rgba(107, 70, 193, 0.5)' }}
            >
              <h2 className='text-center sm:text-left text-md pt-8 sm:pt-0 ml-0 sm:ml-16'>
                Calls Graph
              </h2>
              <LineChart
                dataArray={totalCallsPerDay.map((item) => item.calls)}
                startDate={startDate}
                endDate={endDate}
                months={months}
              />
            </div>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
