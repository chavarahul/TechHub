'use client'
import React, { useEffect, useRef, useState } from 'react'
import { poppin } from '../constants'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const Page = () => {
  const documenterRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')
  const [edit, setEdit] = useState<string[]>([])

  useEffect(() => {
    if (documenterRef.current) {
      documenterRef.current.innerHTML = content;
    }
  }, [content])

  useEffect(() => {
    const paste = async () => {
      const res = await navigator.clipboard.readText();
      if (res.trim() !== '') {
        // await axios.post('/api/copy', { rest: res });
      }
    };

    paste();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get('/api/copy');
      // setEdit(response.data.daat.map((item: any) => item.data.join('')));
    };

    fetchData();
  }, []);



  const convertPdf = () => {
    const documenter = documenterRef.current;
    if (documenter) {
      // Add a brief delay to allow content rendering
      setTimeout(() => {
        html2canvas(documenter).then((canvas: any) => {
          const imgData = canvas.toDataURL('image/png');
          const pdfWidth = 210;
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          const pdf = new jsPDF('p', 'mm', 'a4');
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('document.pdf');
        });
      }, 500); // Adjust the delay time as needed
    }
  }

  return (
    <section className='h-screen w-full relative flex-all'>
      <div className="w-1/2 h-full flex items-end justify-end">
        <div className="w-[97%] h-full flex-center">
          <div className="h-[50%] w-full relative flex-center flex-col -mt-40">
            <div className="h-[20%] w-full flex items-center">
              <p className={`${poppin.className} text-2xl font-bold textColorBg`}>Copy Text and Images for PDF</p>
            </div>
            <div className="h-[30%] w-full flex items-center leading-[40px]">
              <p className={`${poppin.className} text-lg leading-[40px]`}>
                This section contains text and images suitable for inclusion in a single document, facilitating seamless conversion into PDF format.
              </p>
            </div>
            <div className="w-full h-[20%] flex items-end">
              <button className="confirm" onClick={convertPdf}>
                Convert to pdf
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%] relative h-full flex-center">
        <div className="documenter w-full h-full borders" ref={documenterRef} contentEditable={true} >
        {edit.map((text, index) => (
            <div key={index} className='borders'>{text}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page