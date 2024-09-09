import localFont from "next/font/local";
import Navbar from "./Components/Navbar";
import "./globals.css";
import Footer from "./Components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Smart_Classroom",
  description: "Study and Maintain your study schedule more efficiently with Smart Classroom",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-y-hidden`}
      >
        <div className="relative h-full flex flex-col">
          <Navbar/>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
          <div className="w-full">
            <Footer/>
          </div>
        </div>
      </body>
    </html>
  );
}
