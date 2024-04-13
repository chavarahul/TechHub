import { NextFont } from 'next/dist/compiled/@next/font'
import { Noto_Sans } from 'next/font/google'
import { Pacifico, Poppins ,Roboto ,Rubik_Vinyl,Della_Respira ,Rubik_Iso, Rubik_Burned} from 'next/font/google'
//Font Section
export const pacifico : NextFont = Pacifico({ subsets: ['latin'], weight: '400' })
export const poppin : NextFont = Poppins({ subsets: ['latin'], weight: ['100','200','300','400', '500', '300', '600'] })
export const roboto : NextFont  = Roboto({subsets:['latin'],weight:['100','300','400','700','900']})
export const rubik : NextFont = Rubik_Iso({subsets:['latin'],weight:['400']})
export const rburned : NextFont  = Rubik_Burned({subsets:['latin'],weight:['400']})
export const vinyl : NextFont = Rubik_Vinyl({subsets:['latin'],weight:['400']})
export const della : NextFont = Della_Respira({subsets:['latin'],weight:['400']})
export const noto : NextFont = Noto_Sans({subsets:['latin'],weight:['100','200']})