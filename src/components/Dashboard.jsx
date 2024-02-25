import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCallEntries } from '../Redux/actions/stats';
import { BarChart, DoughnutChart, LineChart, PieChart } from './Chart';
import { IoIosMenu } from 'react-icons/io';

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

  const CampaignHandler = (id) => {
    if (id === 'None') {
      setCampaignId('');
    } else {
      setCampaignId(id);
    }
  };

  const handleChangeStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const change = ({ startDate, endDate }) => {
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
        let normaldate = entry.createdAt.split('T')[0];
        normaldate = new Date(normaldate);
        normaldate.setHours(0, 0, 0, 0);
        if (normaldate.toString() === day.toString()) {
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
        if (entry.category === categories[i]) {
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
        if (entry.status === status[i]) {
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
      var calls = 0;
      callEntry.forEach((entry) => {
        let normaldate = entry.createdAt.split('T')[0];
        normaldate = new Date(normaldate);
        normaldate.setHours(0, 0, 0, 0);
        if (normaldate.toString() === day.toString()) {
          calls += 1;
        }
      });
      day = months[day.getMonth()] + ' ' + day.getDate();
      temp.push({ day, calls });
    }
    setTotalCallsPerDay(temp);
  };

  const { callEntry } = useSelector((state) => state.callEntry);

  useEffect(() => {
    dispatch(getCallEntries({ campaignId, startDate, endDate }));
  }, [dispatch, campaignId, startDate, endDate]);

  useEffect(() => {
    change({ campaignId, startDate, endDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callEntry]);

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeSidebar);
    return () => {
      document.removeEventListener('mousedown', closeSidebar);
    };
  }, [closeSidebar]);

  const handleSidebarClose = () => {
    setIsOpen(false);
  };

  const DropdownMenu = ({ children }) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const toggleMenu = () => {
      setIsOpenDrawer(!isOpenDrawer);
    };

    return (
      <div className='relative inline-block text-left'>
        <DropdownMenuTrigger onClick={toggleMenu} isOpenDrawer={isOpenDrawer}>
          Campaign Id
        </DropdownMenuTrigger>
        {isOpenDrawer && <DropdownMenuContent>{children}</DropdownMenuContent>}
      </div>
    );
  };

  const DropdownMenuTrigger = ({ children, onClick, isOpenDrawer }) => {
    return (
      <button
        className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ${
          isOpenDrawer ? 'bg-purple-700' : ''
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  const DropdownMenuContent = ({ children }) => {
    return (
      <div className='absolute z-10 w-48 py-2 mt-2 bg-white border border-gray-300 rounded shadow-lg'>
        {children}
      </div>
    );
  };

  const DropdownMenuItem = ({ children, onClick }) => {
    return (
      <button
        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      <div className='flex flex-row'>
        <div className='relative'>
          {!isOpen && (
            <button
              onClick={toggleSidebar}
              className='text-3xl m-2 rounded-lg border-2'
            >
              <IoIosMenu />
            </button>
          )}
          {isOpen && (
            <button
              onClick={handleSidebarClose}
              className='text-3xl m-2 rounded-lg border-2'
            >
              <IoIosMenu />
            </button>
          )}

          {/* Sidebar */}
          {isOpen && (
            <div
              ref={sidebarRef}
              className='min-w-48 p-8 border-r-2 border-t-2 sticky left-0 top-0 h-screen bg-white'
            >
              <DropdownMenu>
                {campaignIds.map((id, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => CampaignHandler(id)}
                  >
                    {id}
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
              <div className='mt-10'>
                <label className='block text-gray-700 font-bold mb-2'>
                  From
                </label>
                <input
                  type='date'
                  onChange={handleChangeStartDate}
                  className='border border-gray-300 rounded px-2 py-1'
                />
                <label className='block text-gray-700 font-bold mb-2'>To</label>
                <input
                  type='date'
                  onChange={handleChangeEndDate}
                  className='border border-gray-300 rounded px-2 py-1'
                />
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col w-full mr-80'>
          <div className='flex flex-col md:flex-row p-4 md:p-8 w-full'>
            <div className='p-4 md:p-8 pb-16 mx-2 md:w-3/5 border flex flex-col border-gray-300 rounded-lg bg-white shadow-lg'>
              <h2 className='text-xl text-gray-800 font-bold mb-4'>
                Minutes Per Day
              </h2>
              <div className='w-full h-80 md:h-96'>
                <BarChart
                  dataArray={totalMinutesPerDay.map((item) => item.minutes)}
                  startDate={startDate}
                  endDate={endDate}
                  months={months}
                />
              </div>
            </div>
            <div className='p-4 md:p-8 mx-2 md:w-2/5 border border-gray-300 rounded-lg bg-white shadow-lg'>
              <h2 className='text-xl font-bold mb-4'>Status</h2>
              <DoughnutChart
                StatusData={totalCallsPerStatus.map((item) => item.calls)}
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row p-4 md:p-8 w-full'>
            <div className='p-4 md:p-8 mx-2 md:w-2/3 border border-gray-300 rounded-lg bg-white shadow-lg'>
              <h2 className='text-xl font-bold mb-4'>Calls Graph</h2>
              <LineChart
                dataArray={totalCallsPerDay.map((item) => item.calls)}
                startDate={startDate}
                endDate={endDate}
                months={months}
              />
            </div>
            <div className='p-4 md:p-8 mx-2 md:w-1/3 border border-gray-300 rounded-lg bg-white shadow-lg'>
              <h2 className='text-xl font-bold mb-4'>Category</h2>
              <PieChart
                StatusData={totalCallsPerCategory.map((item) => item.calls)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
