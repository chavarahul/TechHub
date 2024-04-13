import React from 'react';
import Provider from "./components/user/Provider";
import Verify from "./components/user/Verfiy";
import LayoutProvider from "./components/common/LayoutProvider";
import Snipping from "./components/Snipping";
import SmoothScroll from "./components/effects/SmoothScroll";
import Toast from './components/effects/Toast'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tech Synergy",
  description: "Learn to use Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Your head content here */}
      </head>
      <body className={inter.className}>
        <Provider >
          <Verify>
            {/* <SmoothScroll> */}
              <LayoutProvider>
                <Snipping>
                  <Toast />
                  {children}
                </Snipping>
              </LayoutProvider>
            {/* </SmoothScroll> */}
          </Verify>
        </Provider>
      </body>
    </html>
  );
}
