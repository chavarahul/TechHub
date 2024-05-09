'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
  const { data } = useSession();
  const [img, setImg] = useState<File | null>(null);
  const name: string | undefined|null = data?.user?.email;
  const id: string | undefined = data?.user?.id;

  const handleImage = async (e: FormEvent) => {
    e.preventDefault();
    if (!img || !id) {
      toast.error("Image or user ID not available");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageData = reader.result as string; // Convert image data to string
      console.log(id);
      const formData = new FormData();
      formData.append('image', imageData); // Pass image data string
      formData.append('name', name || "");
      formData.append('id', id);
      
      try {
        const res = await axios.post('/api/profiler', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    };
    reader.readAsDataURL(img); // Read image file as data URL
  };
  return (
    <>
      <form method='post'>
        <input type="text" value={name || ""} disabled />
        <input type="file" className='' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setImg(e.target.files ? e.target.files[0] : null) }} />
        <button onClick={handleImage}>Submit</button>
      </form>
    </>
  );
};

export default Page;
