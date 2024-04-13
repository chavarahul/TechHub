'use client'
import { poppin } from '@/app/constants';
import { useState } from 'react';

const SideBar = ({ onSelectSection }:any) => {
  const [selectedSection, setSelectedSection] = useState('');

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
    onSelectSection(section);
  };

  return (
    <div className=' w-[20%] h-[95%] ml-4 flex-colm borders rounded-lg'>
      <div className="h-[7%] w-full flex-center">
        <h6 className={`${poppin.className} font-medium text-lg`}>AI Catalog</h6>
      </div>
      <div className="w-full h-[70%]">
        <div className='h-[10%] flex items-center justify-start borders' onClick={() => handleSelectSection('AI Chat & Assistant')}>
          <p className={`${poppin.className} font-medium text-md ml-16 cursor-pointer`}>AI Chat & Assistant</p>
        </div>
        <div className='h-[10%] flex items-center justify-start borders' onClick={() => handleSelectSection('Text to Image')}>
          <p className={`${poppin.className} font-medium text-md ml-16 cursor-pointer`}>Text to Image</p>
        </div>
        <div className='h-[10%] flex items-center justify-start borders' onClick={() => handleSelectSection('Image to text')}>
          <p className={`${poppin.className} font-medium text-md ml-16 cursor-pointer`}>Image to text</p>
        </div>
        <div className='h-[10%] flex items-center justify-start borders' onClick={() => handleSelectSection('Blackbox')}>
          <p className={`${poppin.className} font-medium text-md ml-16 cursor-pointer`}>Blackbox</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
