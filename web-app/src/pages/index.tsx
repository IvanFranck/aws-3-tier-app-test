import axiosInstance from "@/lib/axios";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function Home() {
  const [serverResponse, setServerResponse] = useState("")

  async function handleServerCall() {
    axiosInstance.get('').then(resp => {
      if (resp && resp.data) {
        setServerResponse(resp.data)
      }
    })
  }
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h1 className="text-3xl font-semibold">Welcome to my web app</h1>
        <div className="flex gap-4 items-center flex-col justify-center w-full">

          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            rel="noopener noreferrer"
            onClick={handleServerCall}
          >
            Call the server
          </button>
          <p>{serverResponse}</p>
        </div>
      </main>

    </div>
  );
}
