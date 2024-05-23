"use client";

import { useState } from "react";
import { Logo } from "../components";
import { callCreateShortLInk } from "./actions";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const generateShortUrl = async () => {
    // try {
    //   console.log(url);
    //   const response = await fetch("/api/url-shortener", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
    //     },
    //     body: JSON.stringify({ link: url }),
    //   });
    //   const data = await response.json();
    //   setShortUrl(data.shortUrl);
    // } catch (error) {
    //   console.error(error);
    // }

    // Call server action

    const shortUrl = await callCreateShortLInk(url);
    setShortUrl(`${window.location.origin}/${shortUrl}` as string);
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between px-24 pt-24 h-screen overflow-hidden'>
      <section className='container mt-[100px] bg-[#313434] text-white h-[900px] overflow-hidden rounded-t-lg py-4'>
        <div className='container-wrapper flex flex-col gap-28 h-screen py-10'>
          <h1 className='text-5xl font-extrabold text-center'>Short - It</h1>
          <div className='content flex flex-col items-center justify-center gap-3'>
            <Logo />
            <h2 className='text-2xl font-bold'>
              The simplest URL shortener you were waiting for
            </h2>
            <div className='link flex items-center justify-center w-full gap-5'>
              <input
                type='text'
                value={url}
                className='bg-black outline-none rounded-lg text-xl w-3/4 p-3 border border-gray-500'
                placeholder='Paste your URL here...'
                onChange={(e) => setUrl(e.target.value)}
              />

              <button
                className='bg-black p-3 border rounded-lg border-gray-500'
                onClick={() => generateShortUrl()}
              >
                Generate
              </button>
            </div>
            <div className='result flex items-center justify-center w-full gap-5'>
              <input
                type='text'
                value={shortUrl}
                className='bg-black outline-none rounded-lg text-xl p-3 border border-gray-500 w-3/4'
                placeholder='Result'
                readOnly
              />

              <button
                className='bg-black p-3 border rounded-lg border-gray-500'
                onClick={async () => {
                  await navigator.clipboard.writeText(shortUrl);
                }}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
