'use client'
import React, { useEffect, useState } from 'react'
import { poppin } from '../constants'
import AICompiler from '../components/AICompiler'
import gsap from 'gsap'
import Transition from '../components/effects/Transition'
const Page = () => {
  const [langs, setLangs] = useState('')
  useEffect(() => {
    const item = localStorage.getItem('lang');
    if (item) {
      setLangs(item)
    }
  }, [])
  const home = gsap.timeline()
  return (
    <>
      <Transition timeline={home} />
      <section className=' h-screen relative w-full'>
        <div className=" h-[20%] flex-colm">
          <h3 className={`${poppin.className} text-2xl font-medium`}>
            {langs === 'en' && "Compiler Enhanced with "}
            {langs === 'ja' && "コンパイラの強化"}
            {langs === 'es' && "Compilador mejorado con "}
            {langs === 'tr' && "Derleyici ile Geliştirilmiş "}
            {langs === 'fr' && "Compilateur amélioré avec "}

            <span className=' textColorBg shadow'>
              {langs === 'en' && "AI Fusion"}
              {langs === 'ja' && "AIフュージョン"}
              {langs === 'es' && "Fusión de IA"}
              {langs === 'tr' && "Yapay Zeka Füzyonu"}
              {langs === 'fr' && "Fusion de l’IA"}
            </span>
          </h3>
          <p className={`${poppin.className} text-lg text-center px-40 leading-10`}>
            {langs === 'en' && "The AI-powered compiler provides clear and concise code explanations, aiding developers in comprehending complex concepts and fostering learning through interactive exploration of code explanations."}
            {langs === 'ja' && "AI搭載のコンパイラは、明確で簡潔なコード説明を提供し、開発者が複雑な概念を理解し、コード説明をインタラクティブに探索することで学習を促進するのに役立ちます。"}
            {langs === 'es' && "El compilador impulsado por IA proporciona explicaciones de código claras y concisas, lo que ayuda a los desarrolladores a comprender conceptos complejos y fomenta el aprendizaje a través de la exploración interactiva de explicaciones de código."}
            {langs === 'tr' && "Yapay zeka destekli derleyici, açık ve özlü kod açıklamaları sağlayarak geliştiricilerin karmaşık kavramları anlamalarına ve kod açıklamalarının etkileşimli keşfi yoluyla öğrenmeyi teşvik etmelerine yardımcı olur."}
            {langs === 'fr' && "Le compilateur alimenté par l’IA fournit des explications de code claires et concises, aidant les développeurs à comprendre des concepts complexes et favorisant l’apprentissage grâce à l’exploration interactive des explications de code."}

          </p>
        </div>
        <div className=" h-[50%] relative w-full flex-center mt-16">
          <div className="w-[30%]  h-full flex flex-col justify-between relative">
            <div className="w-full  h-[15%] flex-center">
              {langs === 'en' && "Integrated Code Editor"}
              {langs === 'ja' && "統合されたコードエディタ"}
              {langs === 'es' && "Editor de código integrado"}
              {langs === 'tr' && "Entegre Kod Editörü"}
              {langs === 'fr' && "Éditeur de code intégré"}
            </div>
            <div className="w-full  h-[15%] flex items-center justify-between relative">
              <p>
                {langs === 'en' && "AI Debugging"}
                {langs === 'ja' && "AIデバッグ"}
                {langs === 'es' && "Depuración de IA"}
                {langs === 'tr' && "AI Hata Ayıklama"}
                {langs === 'fr' && "Débogage de l’IA"}
              </p>
              <p>
                {langs === 'en' && "AI Explanation"}
                {langs === 'ja' && "AIによる説明"}
                {langs === 'es' && "Explicación de la IA"}
                {langs === 'tr' && "AI Açıklaması"}
                {langs === 'fr' && "Explication de l’IA"}
              </p>
            </div>
            <div className="border textColorBg  shadow absolute h-[75%] top-12 left-[9.7rem] rotate-[30deg]"></div>
            <div className="border textColorBg  shadow absolute h-[75%] top-12 right-[9.7rem] rotate-[-30deg]"></div>
            <div className="border textColorBg  shadow absolute w-[35%] top-[13rem]  left-[9.3rem]"></div>
          </div>
          <div className="w-[20%]  h-full flex flex-col justify-between relative">
            <div className="w-full  h-[15%] flex-center">
              {langs === 'en' && "Code Execution"}
              {langs === 'ja' && "コードの実行"}
              {langs === 'es' && "Ejecución de código"}
              {langs === 'tr' && "Kod Yürütme"}
              {langs === 'fr' && "Exécution de code"}
            </div>
            <div className="w-full  h-[15%] flex-center">
              {langs === 'en' && "Speech Interaction"}
              {langs === 'ja' && "音声インタラクション"}
              {langs === 'es' && "Interacción de voz"}
              {langs === 'tr' && "Konuşma Etkileşimi"}
              {langs === 'fr' && "Interaction vocale"}
            </div>
            <div className="absolute border  shadow top-16 left-36 h-[65%]"></div>
          </div>
        </div>
      </section>
      <AICompiler />
    </>
  )
}

export default Page