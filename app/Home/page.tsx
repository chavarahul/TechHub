'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Transition from '../components/effects/Transition'
import gsap from 'gsap'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { poppin } from '../constants'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import toast from 'react-hot-toast'
import annyang from 'annyang';
import Loader from '../components/common/Loader'
import Chats from '../components/pages/Chats'
import TextImage from '../components/TextImage'
import Image from 'next/image'
import Imager from '@/public/ai.png'
import Imager1 from '@/public/mul.png'
import Imager2 from '@/public/text.png'
import Imager3 from '@/public/ier.webp'
import { useUser } from '../components/user/UserData'
import { userType } from '../constants/type'
const Page = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [data, setData] = useState<string[]>([])
  const [pass, setPass] = useState(true)
  const [box, setBox] = useState<boolean>(true)
  const [selectSection, setSelectSection] = useState<string>('')
  const [textAi, setTextAi] = useState<string>('')
  const [selectedAi, setSelectedAi] = useState<string[]>([])
  const [checker, setChecker] = useState<boolean>(false)
  const [submit, setSubmit] = useState<boolean>(false)
  const [langs, setLangs] = useState('')
  const UserData : userType| null = useUser()
  const id = UserData?.id || '';
  const handlePage = async (e: any) => {
    console.log('Prompt:', prompt);
    setPass(false)
    setBox(false)
    e.preventDefault()
    console.log(prompt)
    const res = await axios.post('/api/prompt', { prompts: prompt, lang: langs })
    console.log(res)
    console.log(res?.data)
    let resp = res.data.text.replace(/\*/g, '');
    const formattedData: any = resp
      .split(/\d+\.\s+/)
      .filter(Boolean)
      .map((item: string) => item.trim().replace(/\./g, '.\n'));
    setPass(true)
    setData(formattedData)
   
  }
  useEffect(() => {
    console.log('Data changed:', data);
    if(prompt!== ''){
      dbPrompt();
    }
  }, [data]);
  const dbPrompt = async() =>{
    console.log(data)
    const res = await axios.post('/api/dbprompt',{prompt,data,id})
    console.log(res.data)
  }
  const copyContent = (prompt: string) => {
    navigator.clipboard.writeText(prompt).then(() =>
      toast.success("Text Copied")
    ).catch(() => (
      toast.error("Not Copied")
    ))
  }
  useEffect(() => {
    const item = localStorage.getItem('lang');
    if (item) {
      setLangs(item)
    }
  }, [])
  const home = gsap.timeline()
  const Dummy = [
    { title: langs === 'en' ? 'Make a night picture sticking a moon picture that looks like it\'s glowing in the sky.' : langs === 'ja' ? '空に光っているように見える月の絵を貼り付けて、夜の絵を作ります。' : langs === 'es' ? 'Haz una foto nocturna pegando una imagen de la luna que parezca que brilla en el cielo.' : langs === 'tr' ? 'Gökyüzünde parlıyormuş gibi görünen bir ay resmi yapıştırarak bir gece resmi yapın.' : langs === 'fr' ? 'Faites une photo de nuit en collant une image de la lune qui semble briller dans le ciel.' : '' },
    { title: langs === 'en' ? 'Enhance your cooking blog with mouth-watering food photography and engaging recipe tutorials' : langs === 'ja' ? '食欲をそそる料理の写真と魅力的なレシピチュートリアルで料理ブログを強化しましょう' : langs === 'es' ? 'Mejora tu blog de cocina con deliciosas fotografías de comida y atractivos tutoriales de recetas' : langs === 'tr' ? 'Yemek blogunuzu ağız sulandıran yemek fotoğrafçılığı ve ilgi çekici tarif eğitimleriyle geliştirin' : langs === 'fr' ? 'Améliorez votre blog de cuisine avec des photographies culinaires alléchantes et des tutoriels de recettes attrayants' : '' },
    { title: langs === 'en' ? 'Elevate your travel blog with stunning landscape images and captivating travel diaries' : langs === 'ja' ? '見事な風景画像と魅惑的な旅行日記で旅行ブログを盛り上げましょう。' : langs === 'es' ? 'Eleva tu blog de viajes con impresionantes imágenes de paisajes y cautivadores diarios de viaje.' : langs === 'tr' ? 'Eleva tu blog de viajes con impresionantes imágenes de paisajes y cautivadores diarios de viaje.' : langs === 'fr' ? 'Améliorez votre blog de voyage avec de superbes images de paysages et des carnets de voyage captivants.' : '' },
    { title: langs === 'en' ? 'Transform your websites homepage with a vibrant color palette and an eye-catching logo design' : langs === 'ja' ? '鮮やかなカラーパレットと人目を引くロゴデザインでウェブサイトのホームページを変身させましょう' : langs === 'es' ? 'Transforme la página de inicio de su sitio web con una paleta de colores vibrantes y un diseño de logotipo llamativo.' : langs === 'tr' ? 'Canlı bir renk paleti ve göz alıcı bir logo tasarımıyla web sitenizin ana sayfasını dönüştürün.' : langs === 'fr' ? 'Transformez la page d’accueil de votre site Web avec une palette de couleurs vives et un logo accrocheur' : '' },
  ];

  const Features = [
    { title: langs === 'en' ? 'Users have access to unlimited AI chat for solving doubts and queries.' : langs === 'ja' ? 'ユーザーは、疑問や疑問を解決するための無制限のAIチャットにアクセスできます。' : langs === 'es' ? 'Las usuarias tienen acceso ilimitado a un chat de IA para resolver dudas y consultas.' : langs === 'tr' ? 'Kullanıcılar, şüpheleri ve sorguları çözmek için sınırsız AI sohbetine erişebilir.' : langs === 'fr' ? 'Les utilisateurs ont accès à un chat IA illimité pour résoudre les doutes et les questions.' : '', img: Imager },
    { title: langs === 'en' ? 'Users can utilize multiple AI systems simultaneously for resolving various queries and tasks' : langs === 'ja' ? 'ユーザーは、複数のAIシステムを同時に利用して、さまざまなクエリやタスクを解決できます' : langs === 'es' ? 'Los usuarios pueden utilizar varios sistemas de IA simultáneamente para resolver diversas consultas y tareas' : langs === 'tr' ? 'Kullanıcılar, çeşitli sorguları ve görevleri çözmek için aynı anda birden fazla AI sistemini kullanabilir' : langs === 'fr' ? 'Les utilisateurs peuvent utiliser plusieurs systèmes d’IA simultanément pour résoudre diverses requêtes et tâches' : '', img: Imager1 },
    { title: langs === 'en' ? 'users can also convert text to images seamlessly.' : langs === 'ja' ? 'ユーザーは、テキストをシームレスに画像に変換することもできます。' : langs === 'es' ? 'Los usuarios también pueden convertir texto en imágenes sin problemas.' : langs === 'tr' ? 'Kullanıcılar ayrıca metni sorunsuz bir şekilde görüntülere dönüştürebilir.' : langs === 'fr' ? 'Les utilisateurs peuvent également convertir du texte en images de manière transparente.' : '', img: Imager2 },
    { title: langs === 'en' ? 'Users can convert images to text data effortlessly' : langs === 'ja' ? 'ユーザーは画像をテキストデータに簡単に変換できます' : langs === 'es' ? 'Los usuarios pueden convertir imágenes en datos de texto sin esfuerzo' : langs === 'tr' ? 'Kullanıcılar görüntüleri zahmetsizce metin verilerine dönüştürebilir' : langs === 'fr' ? 'Les utilisateurs peuvent convertir des images en données textuelles sans effort' : '', img: Imager3 }
  ];

  const handleDummyData = (prompts: string, e: any) => {
    setPrompt(prompts);
    setBox(false)
  }
  const getText = async () => {
    const text = await navigator.clipboard.readText()
    setTextAi(text)

  }
  const select = [
    { name: "AI Chat" }, { name: "Text to Image" }
  ]


  const handleAiSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const aiName = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedAi([...selectedAi, aiName]);
    } else {
      setSelectedAi(prevSelectedAi => prevSelectedAi.filter(ai => ai !== aiName));
    }
  };

  const startPrompt = () =>{
    
  }
  const endPrompt = () =>{
    
  }
  // useEffect(()=>{
  //   annyang.addCommands({
  //     'start prompt' : () => startPrompt(),
  //     'end prompt' :() => endPrompt(),
  //   })
  //   annyang.start()
  //   return  () => {
  //     annyang.abort()
  //   }
  // },[])

  return (
    <>
      <Transition timeline={home} />
      <section className=' h-screen w-full relative'>
        <div className=" h-[20%] flex-colm">
          <h3 className={`${poppin.className} text-2xl font-medium`}>
            {langs === 'en' && "Empower Your AI with"}
            {langs === 'ja' && "AIに力を与える"}
            {langs === 'es' && "Potencie su IA con"}
            {langs === 'tr' && "Yapay Zekanızı Güçlendirin"}
            {langs === 'fr' && "Renforcez votre IA ave"}
            <span className=' textColorBg shadow'>
              {langs === 'en' && "Customized Prompts"}
              {langs === 'es' && "Avisos personalizados"}
              {langs === 'fr' && "Invites personnalisées"}
              {langs === 'ja' && "カスタマイズされたプロンプト"}
              {langs === 'tr' && "Özelleştirilmiş İstemler"}
            </span>
          </h3>
          <p className={`${poppin.className} text-lg w-[80%] text-center leading-8`}>
            {langs === 'en' && "Our tool tailors prompts from your text, boosting performance across tasks. Say goodbye to generic inputs and welcome precise prompting."}
            {langs === 'ja' && "当社のツールは、テキストからプロンプトを調整し、タスク全体のパフォーマンスを向上させます。一般的な入力に別れを告げ、正確なプロンプトを歓迎します。"}
            {langs === 'es' && "Nuestra herramienta adapta las indicaciones a partir de su texto, lo que aumenta el rendimiento en todas las tareas. Diga adiós a las entradas genéricas y dé la bienvenida a las indicaciones precisas"}
            {langs === 'tr' && "Aracımız, metninizdeki istemleri uyarlayarak görevler arasında performansı artırır. Genel girdilere elveda deyin ve kesin yönlendirmeleri memnuniyetle karşılayın."}
            {langs === 'fr' && "Notre outil personnalise les invites à partir de votre texte, améliorant ainsi les performances de toutes les tâches. Dites adieu aux entrées génériques et accueillez les invites précises"}
          </p>
        </div>
        <form className="w-full h-[20%] flex-center" method="post" onSubmit={handlePage}>
          <div className="relative rounded-lg w-[30%] overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:-z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
            <input
              placeholder="Enter your prompt"
              className={`relative pr-20 bg-transparent ring-0 outline-none border border-neutral-500 text-white placeholder-white text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500 ${poppin.className}`}
              type="text"
              value={prompt}
              onChange={(e) => {
                console.log('Input value:', e.target.value);
                setPrompt(e.target.value);
              }}
            />
            <button type="submit" className="absolute right-4 top-1 text-2xl text-white cursor-pointer">
              <ArrowForwardIcon style={{ fontSize: '1.7rem !important' }} />
            </button>
          </div>
        </form>
        <div className=" min-h-[50%] flex flex-wrap items-center justify-evenly">
          {
            pass ? (
              data.map((prompt, index) => (
                <div key={index} className={`border border-rose-300 relative h-[10em] w-[20%] rounded-[15px] p-3 Scroller overflow-y-scroll ${poppin.className} leading-7`}>
                  {prompt}
                  <div className="absolute bottom-2.5 rounded-[10px] right-3 bg-purple-300 w-[30px] h-[30px]  flex-center" onClick={() => copyContent(prompt)}>
                    <ContentCopyIcon className=' text-base text-gray-900 cursor-pointer ' />
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )
          }
          {
            box &&
            <div className=" w-[90%] min-h-[015em] flex items-center justify-evenly ">
              {
                Dummy?.map((t: any, index: number) => (
                  <div className="border cursor-pointer  border-rose-300 w-[20%] rounded-lg h-[9em] p-3 leading-7" key={index} onClick={(e: any) => { handleDummyData(t.title, e) }}>
                    <p className={`${poppin.className}`}>{
                      t ? t.title : ''
                    }
                    </p>
                  </div>
                ))
              }
            </div>
          }
        </div>
      </section>
      <section className=' w-full h-[125vh] mb-5'>
        <div className=" w-full relative h-[28%] flex-colm ">
          <h3 className={`${poppin.className} text-[1.32rem] font-medium`}>
            {langs === 'en' && "Empowering"}
            {langs === 'ja' && "権限 委譲"}
            {langs === 'es' && "Empoderamiento"}
            {langs === 'tr' && "Güçlendir -ici"}
            {langs === 'fr' && "Autonomisation"}
            <span className=' textColorBg shadow'>
              {langs === 'en' && "AI Fusion"}
              {langs === 'ja' && "AIフュージョン"}
              {langs === 'es' && "Fusión de IA"}
              {langs === 'tr' && "Yapay Zeka Füzyonu"}
              {langs === 'fr' && "Fusion de l’IA"}
            </span>
            {langs === 'en' && "with  Harnessing the Collective Power of AI Integration"}
            {langs === 'ja' && "AI統合の集合的な力を活用する"}
            {langs === 'es' && "con el aprovechamiento del poder colectivo de la integración de la IA"}
            {langs === 'tr' && "Yapay Zeka Entegrasyonunun Kolektif Gücünden Yararlanma ile"}
            {langs === 'fr' && "avec Exploiter la puissance collective de l’intégration de l’IA"}
          </h3>
          <p className={`${poppin.className} w-[75%] text-lg text-center leading-[40px]`}>
            {langs === 'en' && "Empowering AI fusion combines diverse AI technologies to enhance performance, enabling smarter solutions. This integration fosters innovation,driving growth in the digital era."}
            {langs === 'ja' && "AI フュージョンを強化することで、さまざまな AI テクノロジーを組み合わせてパフォーマンスを強化し、よりスマートなソリューションを実現します。この統合によりイノベーションが促進され、デジタル時代の成長を推進します。"}
            {langs === 'es' && "La potenciación de la fusión de IA combina diversas tecnologías de IA para mejorar el rendimiento y permitir soluciones más inteligentes. Esta integración fomenta la innovación, impulsando el crecimiento en la era digital."}
            {langs === 'tr' && "Güçlendirici yapay zeka füzyonu, performansı artırmak için çeşitli yapay zeka teknolojilerini birleştirerek daha akıllı çözümlere olanak tanır. Bu entegrasyon yeniliği teşvik ederek dijital çağda büyümeyi teşvik ediyor."}
            {langs === 'fr' && "L'Empowering AI fusion combine diverses technologies d'IA pour améliorer les performances et permettre des solutions plus intelligentes. Cette intégration favorise l'innovation et stimule la croissance à l'ère numérique."}
          </p>
        </div>
        <div className="flex w-full h-[75%] relative">
          {/* <SideBar onSelectSection={handleSection} /> */}
          <div className='h-[95%] w-full rounded-lg  ml-2 p-4'>
            <p className={`${poppin.className} font-bold w-full h-[10%]  flex-center mt-5 text-center`}>
              {langs === 'en' && "Unlocking AI Diversity: Multiple Technologies, One Line."}
              {langs === 'ja' && "AIの多様性を解き放つ:複数のテクノロジーを1つのラインで。"}
              {langs === 'es' && "Desbloqueando la diversidad de la IA: múltiples tecnologías, una línea."}
              {langs === 'tr' && "Yapay Zeka Çeşitliliğinin Kilidini Açmak: Birden Fazla Teknoloji, Tek Bir Hat."}
              {langs === 'fr' && "Libérer la diversité de l’IA : plusieurs technologies, une seule ligne."}
            </p>
            <div className=" h-[80%] w-full relative flex-center ">
              <div className={` h-full w-[60%]  leading-8 ${poppin.className} grid grid-cols-2  items-center justify-around  text-center text-md `}>

                {
                  Features?.map((t: any, index: number) => (
                    <div className="flex-colm w-[90%] rounded-lg h-[11em]  py-1  " key={index}>
                      <div className=" w-full h-[50%] flex-center">
                        <div className="w-[20%] rounded-[5px]  h-full glass shadow p-1 flex-center border border-violet-400">
                          <Image src={t.img} alt="Image" className={`${index >= 2 ? 'w-[75%] h-[80%]' : 'w-full h-full'} ${index == 3 && 'w-[65%] h-[70%]'}`} />
                        </div>
                      </div>
                      <div className=" cursor-pointer w-full h-full  p-3 leading-7 justify-evenly" onClick={(e: any) => { handleDummyData(t.title, e) }}>
                        <p className={`${poppin.className} mt-3`}>{t.title}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-[50vh] mb-10 ">
        <div className=" w-full relative h-[45%] flex-colm">
          <h3 className={`${poppin.className} text-[1.32rem] font-medium`}>
            {langs === 'en' && "Enabling Seamless Interaction, Integrating User Input with"}
            {langs === 'ja' && "シームレスなインタラクションの実現、ユーザー入力の統合"}
            {langs === 'es' && "Permitir una interacción fluida, integrando la entrada del usuario con"}
            {langs === 'tr' && "Kesintisiz Etkileşimi Etkinleştirme, Kullanıcı Girişini Entegre Etme"}
            {langs === 'fr' && "Permettre une interaction transparente, l’intégration des entrées de l’utilisateur avec"}
            <span className='textColorBg shadow'>
              {langs === 'en' && "AI Selection"}
              {langs === 'ja' && "AIセレクション"}
              {langs === 'es' && "Selección de IA"}
              {langs === 'tr' && "Yapay Zeka Seçimi"}
              {langs === 'fr' && "Sélection de l’IA"}
            </span></h3>
          <p className={`${poppin.className} text-lg text-center w-[75%] leading-[40px]`}>
            {langs === 'en' && "AI Selection"}
            {langs === 'ja' && "選択したAIにプロンプトを簡単に送信して、カスタマイズされた応答を実現します。効率性、精度、ユーザー中心のエンゲージメントを促進し、領域を超えたAIの有用性を増幅します。"}
            {langs === 'es' && "Dirija sin esfuerzo las indicaciones a la IA seleccionada para obtener respuestas personalizadas. Fomenta la eficiencia, la precisión y el compromiso centrado en el usuario,Dirija sin esfuerzo las indicaciones a la IA seleccionada para obtener respuestas personalizadas. Fomenta la eficiencia, la precisión y el compromiso centrado en el usuario,"}
            {langs === 'tr' && "Özel yanıtlar için istemleri zahmetsizce seçilen yapay zekaya yönlendirin. Verimliliği, hassasiyeti ve kullanıcı merkezli katılımı teşvik eder,"}
            {langs === 'fr' && "Diriger sans effort les invitations vers l’IA sélectionnée pour obtenir des réponses sur mesure  Favoriser lefficacité, la précision et lengagement centré sur lutilisateur, en amplifiant lutilité de lIA dans tous les domaines."}
          </p>
        </div>
        <div className="w-full h-[55%] flex items-center justify-evenly">
          <div className="item-hints mt-5 ">
            <div className="hint " data-position={4} onClick={getText}>
              <span className="hint-radius" />
              <span className="hint-dot">
                {langs === 'en' && "Click"}
                {langs === 'ja' && "クリック"}
                {langs === 'es' && "Haga"}
                {langs === 'tr' && "İstemi "}
                {langs === 'fr' && "Cliquez"}
              </span>
              <div className="hint-content do--split-children">
                <p>
                  {langs === 'en' && "Click to paste the prompt"}
                  {langs === 'ja' && "クリックしてプロンプトを貼り付けます"}
                  {langs === 'es' && "Haga clic para pegar el mensaje"}
                  {langs === 'tr' && "İstemi yapıştırmak için tıklayın"}
                  {langs === 'fr' && "Cliquez pour coller l'invite"}
                </p>
              </div>
            </div>
          </div>
          <form className="w-[30%] h-[20%] flex-center  z-[999999] mt-5" method="post" onSubmit={handlePage}>
            <div className="relative rounded-lg w-[80%] overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:-z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
              <input
                placeholder="Enter your prompt or copy"
                className={`relative pr-20 bg-transparent ring-0 outline-none border border-neutral-500 text-white placeholder-white text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500 ${poppin.className}`}
                type="text"
                value={textAi}
                onChange={(e) => { setTextAi(e.target.value) }}
              />
            </div>
          </form>
          <form className="w-[20%] borders h-[20%] z-[999999] cursor-pointer mt-5 Checker relative flex-bet rounded-md px-4" >
            <div className={`${poppin.className} text-lg`} onClick={() => { setChecker(!checker) }}>
              {langs === 'en' && "Select the  Ai"}
              {langs === 'ja' && "Aiを選択します"}
              {langs === 'es' && "Seleccione la IA"}
              {langs === 'tr' && "Yapay zekayı seçin+"}
              {langs === 'fr' && "Sélectionnez l’Ai"}
            </div>
            <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => { setChecker(!checker) }} />
            {
              checker && <div className='absolute w-full h-[200px] top-20 left-0'>
                {
                  select?.map((t: any, ind: number) => (
                    <div className="w-full px-4 h-[20%] relative flex items-center" key={ind}>
                      <label className="container">
                        <input type="checkbox"
                          value={t.name}
                          onChange={handleAiSelection}
                          checked={selectedAi.includes(t.name)}
                        />
                        <svg viewBox="0 0 64 64" height="1.3em" width="1.3em">
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            className="path"
                          />
                        </svg>
                      </label>
                      <p className={`${poppin.className}`}>{t.name}</p>
                    </div>
                  ))
                }
              </div>
            }
          </form>
          <button className="confirm mt-5" onClick={() => { setSubmit(true); setTimeout(() => setSubmit(false), 0); }}>
            {langs === 'en' && "Submit"}
            {langs === 'ja' && "提出する"}
            {langs === 'es' && "Entregar"}
            {langs === 'tr' && "Göndermek"}
            {langs === 'fr' && "Soumettre"}
          </button>
        </div>
      </div>
      <Chats texter={submit && selectedAi.includes('AI Chat') ? textAi : ''} />
      <TextImage texter={submit && selectedAi.includes('Text to Image') ? textAi : ''} />
      {/* <ImageText /> */}
    </>
  )
}

export default Page