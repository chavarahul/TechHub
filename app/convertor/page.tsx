'use client'
import React, { useEffect, useRef, useState } from 'react'
import { poppin } from '../constants'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const Page = () => {
  const documenterRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')
  const [edit, setEdit] = useState<string>('')
  const [langs, setLangs] = useState('')
  useEffect(() => {
    if (documenterRef.current) {
      documenterRef.current.innerHTML = content;
    }
  }, [content])

  const handlePaste = async () => {
    const res = await navigator.clipboard.readText();
    const resp = await axios.post('/api/copy', { rest: res });
    setEdit(resp.data.newUser.data)
  };

  useEffect(() => {
    const item = localStorage.getItem('lang');
    if (item) {
      setLangs(item)
    }
  }, [])
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
              <p className={`${poppin.className} text-2xl font-bold textColorBg`}>
                {langs === 'en' && "Copy Text and Images for PDF"}
                {langs === 'ja' && "PDFのテキストと画像をコピーする"}
                {langs === 'es' && "Copiar texto e imágenes para PDF"}
                {langs === 'tr' && "PDF için Metin ve Görüntüleri Kopyalayın"}
                {langs === 'fr' && "Copier du texte et des images pour PDF"}
              </p>
            </div>
            <div className="h-[30%] w-full flex items-center leading-[40px]">
              <p className={`${poppin.className} text-lg leading-[40px]`}>
                {langs === 'en' && "This section contains text and images suitable for inclusion in a single document, facilitating seamless conversion into PDF format."}
                {langs === 'ja' && "このセクションには、1 つのドキュメントに含めるのに適したテキストと画像が含まれているため、PDF 形式へのシームレスな変換が容易になります。"}
                {langs === 'es' && "Esta sección contiene texto e imágenes adecuados para su inclusión en un solo documento, lo que facilita la conversión sin problemas al formato PDF."}
                {langs === 'tr' && "Bu bölüm, tek bir belgeye dahil edilmeye uygun metin ve resimler içerir ve sorunsuz bir şekilde PDF formatına dönüştürmeyi kolaylaştırır."}
                {langs === 'fr' && "Cette section contient du texte et des images pouvant être inclus dans un seul document, ce qui facilite la conversion au format PDF."}
              </p>
            </div>
            <div className="w-full h-[20%] flex items-end">
              <button className="confirm" onClick={convertPdf}>
                {langs === 'en' && "Convert to pdf"}
                {langs === 'ja' && "PDFに変換"}
                {langs === 'es' && "Convertir a pdf"}
                {langs === 'tr' && "PDF'ye dönüştür"}
                {langs === 'fr' && "Convertir en pdf"}
              </button>
              <button className='confirm' onClick={handlePaste}>
                {langs === 'en' && "Paste"}
                {langs === 'ja' && "PDFに変換"}
                {langs === 'es' && "Convertir a pdf"}
                {langs === 'tr' && "PDF'ye dönüştür"}
                {langs === 'fr' && "Convertir en pdf"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%] relative h-full flex-center">
        <div className="documenter w-full h-full borders" ref={documenterRef} contentEditable={true} >
        {edit}
        </div>
      </div>
    </section>
  )
}

export default Page