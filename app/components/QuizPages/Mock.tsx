'use client';

import { poppin } from '@/app/constants';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormData, TestType } from '@/app/constants/type';
import { quizContest } from '../context/QuizContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Mock = ({ test, prompt, option }: TestType) => {
  const [questions, setQuestions] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [level, setLevel] = useState('');
  const { setQuizData }: any = useContext(quizContest);
  const mainContent = useRef<HTMLDivElement | null>(null)
  const [scroller, setScroller] = useState<boolean>(false)
  const router = useRouter();
  const visibleRef = useRef<HTMLDivElement | null>(null);
  const [seenContainer, setSeenContainer] = useState<boolean>(true);

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (value === '' || (/^\d{1,3}$/.test(value) && Number(value) >= 1 && Number(value) <= 999)) {
      setState(value);
    }
  };

  const handleLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (/^\d{0,1}$/.test(val) && Number(val) >= 0 && Number(val) <= 2)) {
      setLevel(val);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: FormData) => {
    if (!formData.level || !formData.prompt || !formData.questions || !formData.type) {
      toast.error('Invalid details');
      return;
    }
    if (test === 'Topic' || test === 'Upload') {
      handleGenerateContent(e);
      return;
    }
    try {
      const res = await axios.post(
        'http://127.0.0.1:5000/mock',
        {
          type: formData.type,
          questions: formData.questions,
          level: formData.level,
          prompt: formData.prompt,
        },
        { headers: { 'Content-Type': 'application/json' } }
      ).finally(() => {
        setQuestions('');
        setTotalMarks('')
        setLevel('')
      }).catch((err) => {
        console.log(err)
      })
      setQuizData({ questions, totalMarks, level, data: res?.data });
      toast.success("Test Started");
      router.push(`/Test/${option}`)
      console.log(res?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = { type: test, questions, level, prompt };
    handleSubmit(e, formData);
  };

  const handleScrollUp = () => {
    if (mainContent.current) {
      mainContent.current.scrollBy({ top: -250, behavior: "smooth" })
    }
  }

  const handleScrollDown = () => {
    if (mainContent.current) {
      mainContent.current.scrollBy({ top: 250, behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (mainContent.current) {
      if (mainContent.current.scrollHeight > mainContent.current.clientHeight) {
        setScroller(true)
      }
    }
  }, [])

  useEffect(() => {
    if (seenContainer && visibleRef.current) {
      visibleRef.current.scrollBy({ top: visibleRef.current.clientHeight * 0.4, behavior: "smooth" });
    }
  }, [seenContainer]);

  const handleGenerateContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const res = await axios.post('/',prompt);
    // console.log(res?.data);

    // if(res?.status === 200){
    toast.success("Content Generated");
    setSeenContainer(true);
    // if(visibleRef.current){
    //    visibleRef.current.scrollBy({top:600,behavior:"smooth"})
    // }
    // }

  }
  return (
    <>
      <form className='w-full h-full relative' autoComplete='on' onSubmit={formSubmitHandler} method='post'>
        <div className='w-full h-[10%] flex-center mt-16'>
          <p className={`${poppin.className} text-md`}>Customize the format of your questions according to your preferences</p>
        </div>
        <div className='w-full h-[10%] relative flex-all mt-16'>
          <div className='flex w-[20%] flex-center relative'>
            <p className={`${poppin.className} text-md mr-2`}>Number Of Questions:</p>
            <input
              type='text'
              className='inputs'
              value={questions}
              onChange={(e) => handleNumberChange(e, setQuestions)}
              required
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
          <div className='flex w-[20%] flex-center relative'>
            <p className={`${poppin.className} text-md mr-2`}>Total Marks:</p>
            <input
              type='text'
              className='inputs'
              value={totalMarks}
              onChange={(e) => handleNumberChange(e, setTotalMarks)}
              required
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
        </div>
        <div className='flex-center h-[15%] w-full py-10 mt-5 mb-1'>
          <p className={`${poppin.className} text-md mr-2`}>Levels of Medium ({" "}Easy - 0 | Medium - 1 | Hard - 2 {" "}) {" "}:{" "}</p>
          <input
            type='text'
            inputMode='numeric'
            required
            max={1}
            value={level}
            pattern='[0-2]'
            onChange={handleLevel}
            className='ml-5 w-20 bg-transparent border-b-2 outline-none flex-center px-1 pl-8'
          />
        </div>
        <div className='flex-center h-[15%] w-full mt-5 relative'>
          <button className={`confirm ${poppin.className}`} type='submit'>
            Generate {`${test === 'Content' ? 'Quiz' : 'Content'}`}
          </button>
          <button onClick={() => { localStorage.removeItem('option'); localStorage.removeItem('input') }}>ddd</button>
        </div>
      </form>
      <section className={` w-full min-h-screen h-screen  flex-center pb-20 ${!seenContainer && 'ScrollVisibleCon'}`} ref={visibleRef}>
        <div className="w-[95%]  h-full relative">
          <div className="w-full h-[10%]  relative"></div>
          {
            seenContainer && <div className="w-full relative h-[10%]  flex-center mb-5">
              <p className={`${poppin.className} text-3xl capitalize textColorBg font-bold`}>{prompt}</p>
            </div>
          }
          <div className=" Contentbox h-[70%] w-full relative flex-all">
            {(scroller && seenContainer) && <div className="h-full w-[5%] relative flex-center">
              <div className="rounded-full p-2 flex-center bg-white cursor-pointer z-[999]" onClick={handleScrollUp}>
                <KeyboardArrowUpIcon style={{ color: "black", fontSize: '15px' }} />
              </div>
            </div>}
            <div className={`MainContent ${scroller ? 'w-[80%]' : "w-full"}   h-full relative flex-center`} >
              <p className={`${poppin.className} text-left w-full h-full relative  leading-10 overflow-hidden Scroller`} ref={mainContent}>
                svsfvdg Lorem ipsum dolor sit,Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque doloribus dignissimos earum vero adipisci assumenda, quae quod dolorem iure quo saepe deleniti dolores at repellendus dolorum tempore? Unde eum commodi debitis, quidem fugit reprehenderit quisquam? Reprehenderit quae minima rerum veritatis rem tempora. Autem, vel eos quia aliquid sapiente libero magni, sint vitae nobis quae tempora soluta eius velit architecto non veritatis id cupiditate maiores minus alias placeat possimus. Quod magnam qui, aliquid, unde doloremque quasi officiis quae earum ex exercitationem tenetur molestias reprehenderit? Natus ipsam aliquid veniam libero dolores cumque ratione ab fugiat modi atque, praesentium officiis beatae distinctio animi corrupti ducimus accusantium quidem rem iste ex quo pariatur voluptates! Quam debitis deleniti enim. Ab quibusdam ipsa unde ullam perspiciatis? Quisquam sint architecto, amet ipsum magnam natus velit quod tenetur rerum nemo adipisci corrupti cupiditate dolores numquam perferendis! Maxime, voluptas necessitatibus! Voluptates, ratione accusamus! Libero commodi architecto, reprehenderit deleniti molestias, aliquid quod amet iste quam est iusto officiis dolores reiciendis minima magni non illum quia, fugiat nobis sit blanditiis corrupti? Dignissimos repellat nostrum vitae commodi quae molestias ab ullam minus laudantium. Officiis esse odio ad dicta vero quos reiciendis exercitationem labore, quia similique, minima veniam obcaecati nulla dolorem error atque possimus qui! Eius cupiditate laudantium nisi alias consequatur qui dolore deleniti odit saepe! Quas deserunt consequatur suscipit eligendi dolorum, illum similique corporis fugit sapiente inventore dignissimos perspiciatis, minima vel dicta est distinctio quae alias, vero aperiam debitis? Dolorum mollitia praesentium hic animi quisquam magni maiores esse ipsum, autem totam ab recusandae doloribus, sequi architecto harum. Vel, cupiditate quibusdam perspiciatis eligendi, dicta iure unde beatae nemo sed recusandae delectus odio, aperiam rem deleniti est nam illo harum. Deleniti suscipit ipsa facilis aperiam harum labore ratione, mollitia non vitae provident beatae nemo blanditiis dicta inventore officiis autem earum laborum. Harum consequuntur modi quisquam sed vel. Commodi, ratione natus! Totam omnis recusandae ad aspernatur quas nemo repellat sed, rerum cupiditate debitis aut libero eveniet veniam ipsum modi dicta, commodi voluptatibus, dolores minima! Molestias cupiditate, voluptatibus doloremque cumque explicabo ipsa voluptate ad velit adipisci ea, soluta repellendus nisi vel eum dicta unde doloribus praesentium tenetur perferendis quia aperiam maxime laudantium? Ut est reiciendis quae laudantium fuga? Illo fugit praesentium recusandae est alias quo ipsa, blanditiis dolores quae odio eveniet, animi commodi deleniti soluta inventore ex maxime dolorem? Tenetur, quaerat harum. Quisquam deserunt consequatur sint aut, voluptas a ut molestiae officiis vero quaerat fugit quidem.
              </p>
            </div>
            {(scroller && seenContainer) && <div className="h-full w-[5%] relative flex-center">
              <div className="rounded-full p-2 flex-center bg-white cursor-pointer z-[999]" onClick={handleScrollDown} >
                <KeyboardArrowDownIcon style={{ color: "black", fontSize: '15px' }} />
              </div>
            </div>}
          </div>
          <div className="h-[10%] w-full  flex-center mt-7 pb-10">
            <button className="glitchbutton">
              Generate More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Mock;



// There are many ai’s which helps us to increase your productivity but it is limited to  only the user who know English and making non-English users as barrier to use ai’s ..the users who can understand English and can use ai’s but they don’t know how to use ai’s to increase their productivity , and nowadays most of the developers use ai’s to auto complete their code in compilers  by ai’s making them decreasing their logical building capabilities . user  
