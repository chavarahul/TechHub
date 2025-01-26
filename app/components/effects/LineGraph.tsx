import { userType } from '@/app/constants/type';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUser } from '../user/UserData';
import { poppin } from '@/app/constants';

const LineGraph = () => {
  const userData: userType | null = useUser();
  const username = userData?.username || '';
  const userId = userData?.id || '';
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await axios.get(`/api/social/${userId}`);
      setData(res?.data.createPrompt);
    };
    fetcher();
  }, [userId]);

  return (
    <div className="">
      {
        data?.length >0 &&
        data?.map((t: any, ind: number) => (
          <div className="" key={ind}>
            <p className={`${poppin.className}`}>{ind+1}{"  "}{t.messages}</p>
          </div>
        ))
      }
    </div>
  );
};

export default LineGraph;
