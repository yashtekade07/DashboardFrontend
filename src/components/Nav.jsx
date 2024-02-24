// import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from '@/components/ui/label';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from './ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { getCallEntries, getStats } from '@/Redux/actions/stats.js';

export function Nav() {
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
        <Label htmlFor='email'>From</Label>
        <Input type={'date'} />
        <Label htmlFor='email'>To</Label>
        <Input type={'date'} />
      </div>
    </div>
  );
}
