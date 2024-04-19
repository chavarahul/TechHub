'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import tech2 from '@/public/tech2.png';
import { poppin } from '@/app/constants';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import gsap from 'gsap';
import { Power4 } from 'gsap';
import LanguageIcon from '@mui/icons-material/Language';


const Navbar = () => {
    const router = useRouter();
    const [users, setUsers] = useState<boolean>(false);
    const { data: session } = useSession();
    const [box, setBox] = useState<boolean>(false);
    const [lang, setLang] = useState('');
    const [langs, setLangs] = useState('');
    const [gloabls, setGlobals] = useState(false)

    useEffect(() => {
        session ? setUsers(true) : setUsers(false);
    }, [session]);
    useEffect(() => {
        const item = localStorage.getItem('lang');
        if (item) {
            setLangs(item)
        }
    }, [])
    const handleMenu = () => {
        setBox(false);
        console.log(box);
    };

    useEffect(() => {
        const t1 = gsap.timeline();
        t1.to('.Toppr', {
            y: 0,
            ease: Power4.easeOut,
            duration: 1.5,
            delay: 0.04,
        }).to('.Siders', {
            x: 0,
            ease: Power4.easeOut,
            duration: 1,
            stagger: 0.6,
        });
    });

    const data = [
        { title: langs === 'en' ? 'Home' : langs === 'ja' ? '家' : langs === 'es' ? 'Hogar' : langs === 'tr' ? 'Ev' : langs === 'fr' ? 'Domicile' : '' },
        { title: langs === 'en' ? 'Compiler' : langs === 'ja' ? 'コンパイラ' : langs === 'es' ? 'Compilador' : langs === 'tr' ? 'Derleyici' : langs === 'fr' ? 'Compilatrice' : '' },
        { title: langs === 'en' ? 'Converter' : langs === 'ja' ? 'コンバータ' : langs === 'es' ? 'Convertidora' : langs === 'tr' ? 'Dönüştürücü' : langs === 'fr' ? 'Convertisseur' : '' },
    ];

    const select = [
        { title: "english", abbr: 'en' },
        { title: 'France', abbr: 'fr' },
        { title: 'Spain', abbr: 'es' },
        { title: 'Japanese', abbr: 'ja' },
        { title: 'Turkey', abbr: 'tr' },
    ];

    const handleLanguageSelect = (selectedLang: string) => {
        setLang(selectedLang);
        const selectedAbbr = select.find(item => item.title === selectedLang)?.abbr;
        if (selectedAbbr) {
            localStorage.setItem('lang', selectedAbbr);
        }
    };

    const handleLanguageSelects = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedLang = event.target.value;
        setLang(selectedLang);
        const selectedAbbr = select.find(item => item.title === selectedLang)?.abbr;
        if (selectedAbbr) {
            localStorage.setItem('lang', selectedAbbr);
        }
        router.refresh()
    };

    return (
        <>
            <div className="relative h-[12vh] flex flex-center">
                <div className="w-full  h-full flex-bet px-10">
                    <div className=" w-[7%]  h-full flex-center">
                        <Image src={tech2} alt="Logo" />
                    </div>
                    <div className="w-1/6 h-full flex-all  relative">
                        {users ? (
                            <>
                                <p className={` capitalize font-medium -mr-4 ${poppin.className}`}>menu</p>
                                <div className=" w-[20%] h-[40%] z-10 cursor-pointer flex flex-col justify-evenly items-end" onClick={() => { setBox(true) }}>
                                    <div className="w-full h-[1.5px] bg-white rounded-lg"></div>
                                    <div className="w-[70%] h-[1.5px] bg-white rounded-lg"></div>
                                    <div className="w-[30%] h-[1.5px] bg-white rounded-lg"></div>
                                </div>
                            </>
                        ) : (
                            <button className="confirm" onClick={() => { router.push('/Login') }}> LOGIN </button>
                        )}
                        <div className=" w-[80px] h-[50px] flex-center cursor-pointer" onClick={()=>{setGlobals(!gloabls)}}>
                            <LanguageIcon style={{ fontSize: '30px' }} className="spin" />
                        </div >
                        {
                            gloabls && <div className="absolute top-20 left-10  w-[220px] bg-[#2a2f3f]  h-[13rem]  rounded-lg z-[999999]">
                                {select?.map((t: any, ind: number) => (
                                    <div className="w-full px-4 h-[23%] relative flex items-center " key={ind}>
                                        <label className="container">
                                            <input type="checkbox"
                                                value={t.title}
                                                onChange={handleLanguageSelects}
                                                checked={lang === t.title}
                                            />
                                            <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                                                <path
                                                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                                    pathLength="575.0541381835938"
                                                    className="path"
                                                />
                                            </svg>
                                        </label>
                                        <p className={`${poppin.className} font-medium`} onClick={() => handleLanguageSelect(t.title)}>{t.title}</p>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>

                </div>
            </div>
            {box &&
                <section className='bg-[#090909] w-screen h-screen z-[999999] fixed top-0 left-0 Toppr' style={{ transform: "translateY(-140vh)" }}>
                    <div className=" w-full h-[10%] flex-bet relative">
                        <div className=" w-[10%] h-full absolute right-0 top-0 flex-center" onClick={() => { setBox(false) }}>
                            <CloseIcon className='cursor-pointer' />
                        </div>
                    </div>
                    <div className="h-[90%] w-full relative flex">
                        <div className="w-[40%] h-full  flex items-end justify-end">
                            <div className="w-[70%] h-full relative overflow-hidden  flex-colm">
                                <div className="w-full h-[50%]  relative overflow-hidden flex items-start flex-col justify-evenly">
                                    {data?.map((t: any, ind: number) => (
                                        <Link className="button Siders" data-text="Awesome" key={ind} href={t.hrefs} style={{ transform: "translateX(-200px)" }} onClick={handleMenu}>
                                            <span className="actual-text">&nbsp;{t.title}&nbsp;</span>
                                            <span aria-hidden="true" className="hover-text">&nbsp;{t.title}&nbsp;</span>
                                        </Link>
                                    ))}
                                </div>
                                <div className="w-full h-[10%]  relative overflow-hidden cursor-pointer" onClick={() => { signOut() }}>
                                    <p className={`${poppin.className} text-4xl Siders letters font-medium`} style={{ transform: "translateX(-160px)" }} >SignOut</p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-[40%] h-full relative">
                            <div className=" w-full h-[90%] relative -mt-10">
                                {/* <Image src={tech2} alt='Logo' className='w-full h-full'/> */}
                            </div>
                        </div>
                    </div>
                </section>}
        </>
    )
}

export default Navbar;
