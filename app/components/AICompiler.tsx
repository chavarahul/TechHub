'use client'
import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import axios from 'axios';
import { poppin } from '../constants';

const AICompiler = () => {
    const [code, setCode] = useState<string>("");
    const [lang, setLang] = useState<string>('C');
    const [debug, setDebug] = useState([]);
    const [run, setRun] = useState([]);
    const [explain, setExplain] = useState('');
    const [final, setFinal] = useState('');
    const [speech, setSpeech] = useState<any>(null);
    const [langs, setLangs] = useState('en')
    useEffect(() => {
        const item = localStorage.getItem('lang');
        if (item) {
            setLangs(item)
        }
    }, [])
    const handleChange = (editor: any, data: any, value: any) => {
        console.log(code)
        setCode(value);
        handleDeBug();
    };

    const handleDeBug = async () => {
        const res = await axios.post('/api/debug', { check: code, langs: lang });

        console.log(res.data);
        let resp = res.data.text.replace(/\*/g, '');
        const formattedData: any = resp
            .split(/\d+\.\s+/)
            .filter(Boolean)
            .map((item: string) => item.trim().replace(/\./g, '.\n'));
        const kaa = await axios.post('http://127.0.0.1:5000/translate', { trans: formattedData, lang: langs })
        setDebug(kaa.data.translated_text);
    };

    const handleTest = async (e: any) => {
        e.preventDefault();
        console.log('yutgbyvbgyh' + lang);
        const res = await axios.post('/api/test', { check: code, langs: lang });
        console.log(res.data);
        const output = await axios.post('/api/translate', { trans: res, lang: langs })
        setRun(output.data.text);
    };

    const handleExplain = async () => {
        const res = await axios.post('/api/explain', { check: code, langs: lang });
        console.log(res.data);
        let resp = res.data.text.replace(/\*/g, '');
        const formattedData: any = resp
            .split(/\d+\.\s+/)
            .filter(Boolean)
            .map((item: string) => item.trim().replace(/\./g, '.\n'));
        const explanation = await axios.post('/api/translate', { trans: res, lang: langs })
        setExplain(explanation.data.result);
    };

    const handleFinal = async () => {
        const res = await axios.post('/api/final', { check: explain });
        console.log(res.data);
        setFinal(res.data.text);
        if ('speechSynthesis' in window) {
            const speechSynthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(final);
            utterance.lang = langs
            speechSynthesis.speak(utterance);
        }
        else {
            console.error('Speech synthesis is not supported');
        }
    };

    return (
        <section className='w-full min-h-[160vh] h-[160vh]  mb-10'>
            <div className="h-[45%]  w-full relative flex">
                <div className="w-[70%]  h-full relative overflow-hidden p-4">
                    <CodeMirror
                        value={code}
                        onBeforeChange={handleChange}
                        options={{
                            mode: `${lang}`, // Set the language mode
                            theme: "material", // Set the CodeMirror theme
                            lineNumbers: true,
                            // Show line numbers
                        }}
                    />
                </div>
                <div className="w-[30%] h-full ">
                    <div className="h-[15%] w-full  flex-center">

                        <div className="relative group rounded-lg w-64 bg-gray-50 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9]">
                            <svg
                                y={0}
                                xmlns="http://www.w3.org/2000/svg"
                                x={0}
                                width={100}
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid meet"
                                height={100}
                                className="w-8 h-8 absolute right-0 -rotate-45 stroke-pink-300 top-1.5 group-hover:rotate-0 duration-300"
                            >
                                <path
                                    strokeWidth={4}
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    fill="none"
                                    d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                                    className="svg-stroke-primary"
                                />
                            </svg>
                            <select
                                className="appearance-none hover:placeholder-shown:bg-emerald-500 relative text-pink-400 bg-transparent ring-0 outline-none border border-neutral-500  placeholder-violet-700 text-sm font-bold rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
                                onChange={(e) => { setLang(e.target.value); console.log(lang) }}
                            >
                                <option>C</option>
                                <option>Java</option>
                                <option>Python</option>
                                <option>JavaScipt</option>
                            </select>
                        </div>

                    </div>
                    <div className=" w-full h-[85%] flex-center">
                        <div className="borders bg-white w-[90%] h-[90%] rounded-lg p-3 overflow-y-scroll Scroller">
                            <p className={`${poppin.className} leading-8 text-black`}>{debug}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" h-[10%] flex-center w-full relative">
                <div className=" w-1/2 h-full  flex-all">
                    <button className="confirm" onClick={handleTest}> RUN CODE
                    </button>
                    <button className="confirm " onClick={handleExplain}> EXPLAIN
                    </button>
                    <button className="confirm " onClick={handleFinal}> Speech
                    </button>
                    {langs}
                </div>
            </div>
            <div className="h-[25%]  flex-all mt-10">
                <div className="w-[30%] h-full p-2 bg-white relative borders rounded-lg overflow-y-scroll Scroller leading-8 text-black">
                    <p className={`${poppin.className}`}>Output{""}:{" "}{run}</p>
                </div>
                <div className="w-[30%] h-full p-2 bg-white relative borders  rounded-lg overflow-y-scroll Scroller leading-8 text-black">
                    <p className={`${poppin.className}`}>Explanation{""}:{" "}{explain}</p>
                </div>
            </div>
        </section>
    )
}

export default AICompiler;
