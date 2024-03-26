import { Logo } from "../../components";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <section className='container mt-[100px] bg-[#313434] text-white h-full rounded-lg py-4'>
        <div className='container-wrapper flex flex-col gap-28  py-10'>
          <h1 className='text-5xl font-extrabold text-center'>Short - It</h1>
          <div className='content flex flex-col items-center justify-center gap-3'>
            <Logo />
            <h2 className='text-2xl font-bold'>
              The simplest URL shortner you were waiting for
            </h2>
            <div className='link flex items-center justify-center gap-5'>
              <input
                type='text'
                className='bg-black outline-none rounded-lg text-xl w-[300px] p-3 border border-gray-500'
                placeholder='Paste your URL here...'
              />

              <button className='bg-black p-3 border rounded-lg border-gray-500'>
                reset
              </button>
            </div>
            <div className='result flex items-center justify-center gap-5'>
              <input
                type='text'
                className='bg-black outline-none rounded-lg text-xl w-[300px] p-3 border border-gray-500'
                placeholder='Result'
                readOnly
              />

              <button className='bg-black p-3 border rounded-lg border-gray-500'>
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
