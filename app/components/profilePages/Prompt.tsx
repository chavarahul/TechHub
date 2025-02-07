'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../user/UserData'
import { poppin } from '@/app/constants'
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

// Define the expected structure for prompts
interface PromptData {
  id: string;
  prompt: string;
  output: string[];
}

const Prompt = () => {
  const userData = useUser();
  const id = userData?.id || '';
  const [data, setData] = useState<PromptData[]>([]); // Explicitly set state type

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get(`/api/dbprompt/${id}`);
        setData(response.data.createPrompt);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };
    fetchPrompts();
  }, [id]);

  const deletePrompt = async (promptId: string) => {
    try {
      await axios.delete(`/api/dbprompt/${promptId}`, {
        data: { userId: id }, // Send userId in request body
      });
      toast.success('Prompt deleted successfully');
      setData((prevData) => prevData.filter((prompt) => prompt.id !== promptId)); // Remove deleted prompt from UI
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast.error( 'Failed to delete prompt');
    }
  };

  return (
    <div>
      {data?.map((t, index) => (
        <div key={t.id} className='border border-red-400 p-4 mt-5 mb-4 rounded-[10px] glasser flex justify-between items-center'>
          <div>
            <p className={`${poppin.className} leading-8`}>
              <span style={{ color: 'rgb(1, 235, 252,0.8)' }}>Prompt</span> : {t.prompt}
            </p>
            <div>
              <span style={{ color: 'rgb(1, 235, 252,0.8)' }}>Solution</span>
              {t.output?.map((n, i) => (
                <p key={i} className={`${poppin.className} leading-8`}>{i + 1}) {n}</p>
              ))}
            </div>
          </div>
          <button onClick={() => deletePrompt(t.id)} className="text-red-500 absolute top-4 right-2 hover:text-red-700">
            <DeleteIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Prompt;
