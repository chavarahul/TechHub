'use client'
import { poppin } from '@/app/constants'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PreLoader from '../common/PreLoader'

const Chats = (props: any) => {
    const { texter } = props
    const [langs, setLangs] = useState<string>('')
    const [prompt, setPrompt] = useState<string>('')
    const [box, setBox] = useState<boolean>(true)
    const [datas, setDatas] = useState([])
    const [load, setLoad] = useState(false)
    const handleData = (pro: string) => {
        setPrompt(pro);
        setBox(false);
    };

    useEffect(() => {
        if (texter !== '' && texter) {
            setPrompt(texter)
            // const syntheticEvent = { preventDefault: () => {} };
            handleSubmit(texter)
        }
    }, [texter])

    const data = [
        { title: langs === 'en' ? "A peaceful sunset over a calm lake" : langs === 'ja' ? "穏やかな湖に沈む穏やかな夕日" : langs === 'es' ? "Una puesta de sol tranquila sobre un lago en calma" : langs === 'tr' ? "Sakin bir göl üzerinde huzurlu bir gün batımı" : langs === 'fr' ? "Un coucher de soleil paisible sur un lac calme" : "" },
        { title: langs === 'en' ? "A cozy cabin nestled in a snowy forest" : langs === 'ja' ? "雪の森に佇む居心地の良い山小屋" : langs === 'es' ? "Una acogedora cabaña enclavada en un bosque nevado" : langs === 'tr' ? "Karlı bir ormanın içinde yer alan rahat bir kulübe" : langs === 'fr' ? "Une cabane confortable nichée dans une forêt enneigée" : "" },
        { title: langs === 'en' ? "A bustling city skyline at night" : langs === 'ja' ? "夜の賑やかな街のスカイライン" : langs === 'es' ? "Un bullicioso horizonte de la ciudad por la noche" : langs === 'tr' ? "Geceleri hareketli bir şehir silüeti" : langs === 'fr' ? "Une ligne d’horizon animée de la ville la nuit" : "" },
        { title: langs === 'en' ? "A serene beach with palm trees swaying in the breeze" : langs === 'ja' ? "ヤシの木が風に揺れる穏やかなビーチ" : langs === 'es' ? "Una playa serena con palmeras mecidas por la brisa" : langs === 'tr' ? "Esintiyle sallanan palmiye ağaçlarıyla dolu sakin bir plaj" : langs === 'fr' ? "Une plage sereine avec des palmiers qui se balancent dans la brise" : "" }
    ];

    const handlePage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        handleSubmit(prompt);
    };
    useEffect(() => {
        const item = localStorage.getItem('lang');
        if (item) {
            setLangs(item)
        }
    }, [])
    const handleSubmit = async (texts: string) => {
        console.log(prompt);
        setBox(false);
        setLoad(true)
        try {
            const res = await axios.post('/api/ai', { prompts: texts, lang: langs });
            console.log(res.data.text);
            let resp = res.data.text.replace(/\*/g, '');
            const formattedData: any = resp
                .split(/\d+\.\s+/)
                .filter(Boolean)
                .map((item: string) => item.trim().replace(/\./g, '.\n'));
            setDatas(formattedData)
            setLoad(false)
        } catch (error) {
            console.error('Error fetching images:', error);

        }
    };
    return (
        <section className=' w-full min-h-screen mb-10 '>
            <div className=" w-full relative min-h-[7rem] flex-colm">
                <h3 className={`${poppin.className} text-[1.32rem] textColorBg font-extrabold`}>
                    {langs === 'en' && "AI Assistant"}
                    {langs === 'ja' && "AIアシスタント"}
                    {langs === 'es' && "Asistente de IAs"}
                    {langs === 'tr' && "Yapay Zeka Asistanı"}
                    {langs === 'fr' && "Assistante IA"}
                </h3>
                <p className={`${poppin.className} text-lg text-center leading-[10px]`}>
                    {langs === 'en' && "Please specify the nature of your query to facilitate AI-generated responses"},
                    {langs === 'ja' && "AIが生成した応答を容易にするために、クエリの性質を指定してください"},
                    {langs === 'es' && "Especifique la naturaleza de su consulta para facilitar las respuestas generadas por IA"},
                    {langs === 'tr' && "Yapay zeka tarafından oluşturulan yanıtları kolaylaştırmak için lütfen sorgunuzun niteliğini belirtin"},
                    {langs === 'fr' && "Veuillez préciser la nature de votre requête pour faciliter les réponses générées par l’IA"}
                </p>
            </div>
            <div className="relative w-full flex-center mt-4">
                <form className="relative rounded-lg w-[30%] overflow-hidden flex " onSubmit={handlePage}>
                    <input
                        placeholder="Enter your prompt"
                        className={`relative pr-20 bg-transparent ring-0 outline-none border border-gray-300 text-white placeholder-white text-sm rounded-lg placeholder-opacity-60 block w-full p-2.5 ${poppin.className}`}
                        type="text"
                        value={prompt}
                        onChange={(e) => {
                            setPrompt(e.target.value);
                        }}
                    />
                    <button type='submit' className={`${poppin.className} absolute right-0 h-full w-[20%] bg-white text-black top-0 font-bold`}>
                        {langs === 'en' && "Submit"}
                        {langs === 'ja' && "提出する"}
                        {langs === 'es' && "Entregar"}
                        {langs === 'tr' && "Göndermek"}
                        {langs === 'fr' && "Soumettre"}
                    </button>
                </form>
            </div>
            {
                (box && datas.length <= 0) &&
                <div className="min-h-[34%] flex justify-center items-center mt-20 ">
                    <div className="grid grid-cols-2 gap-4 w-[70%]  h-full">
                        {
                            data?.map((t, ind: number) => (
                                <div className="h-[5em] w-[90%] border rounded-xl pt-2 pl-2 text-center cursor-pointer" key={ind} onClick={() => { handleData(t.title) }}>
                                    <p className={`${poppin.className}`}>{t.title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
            {load && <PreLoader />}
            {
                (datas.length >= 1 && !box && !load) &&
                <div className={` mt-10 min-h-[50%] flex-center border`}>
                    <div className=" w-[80%]  h-full overflow-y-scroll Scroller  rounded-xl p-3">
                        <p className={`${poppin.className} leading-10 `}>{datas}</p>
                    </div>
                </div>
            }
        </section>
    )
}

export default Chats