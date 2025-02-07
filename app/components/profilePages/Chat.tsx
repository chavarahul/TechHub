'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../user/UserData'
import { poppin } from '@/app/constants'
import PreLoader from '../common/PreLoader'
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon
import toast from 'react-hot-toast';

const Chat = () => {
  const userData = useUser();
  const id = userData?.id || '';
  const [data, setData] = useState<any[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    setSuccess(false);
    try {
      const response = await axios.get(`/api/dbChat/${id}`);
      setData(response.data.createPrompt);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching chat data:', error);
      toast.error('Failed to load chats');
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      await axios.delete(`/api/dbChat/${chatId}`, {
        data: { userId: id }, 
      });
      toast.success('Chat deleted successfully');
      setData((prevData) => prevData.filter((chat) => chat.id !== chatId));
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error( 'Failed to delete chat');
    }
  };
  

  return (
    <>
      {success ? (
        data.length > 0 ? (
          data.map((t, index) => (
            <div key={index} className='mb-4 mt-5 p-4 glasser flex justify-between items-center'>
              <div>
                <p className={`${poppin.className} mb-3 leading-8`}>
                  <span style={{ color: 'rgb(1, 235, 252,0.8)' }}>Prompt</span> : {t.prompt}
                </p>
                <div>
                  {t.data?.map((n: any, i: number) => (
                    <p key={i} className={`${poppin.className} leading-8`}>
                      <span style={{ color: 'rgb(1, 235, 252,0.8)' }}>Solution</span> : {n}
                    </p>
                  ))}
                </div>
              </div>
              <button onClick={() => deleteChat(t.id)} className="ml-4 absolute top-4 right-2 text-red-500 hover:text-red-700">
                <DeleteIcon />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No chats available.</p>
        )
      ) : (
        <PreLoader />
      )}
    </>
  );
};

export default Chat;
