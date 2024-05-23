import Image from 'next/image'
import subsribe from '../assets/gifs/subsribe.gif'
import React from 'react'
import EmailForm from './EmailForm'

const subscriptionText = {
    h3: "Subscribe to get information, latest news and other interesting offers about Build a champ"
}

const Subscribe = () => {
  return (
    <section className='py-12 pt-12 md:pt-32 ' id='subscribe'>
      <div className=' md:py-20  relative px-5'>
        <div className='absolute inset-0 md:bg-violet-200 md:opacity-20 -z-10'></div>
        <div className='flex justify-center gap-5'>
          <Image alt='mail gif' src={subsribe} className='hidden md:block w-[105px] h-[105px] -translate-y-5'unoptimized/>
          <h3 className='text-xl/normal  font-semibold text-center  pb-[30px] md:pb-[74px] md:text-[33px] md:leading-[54px] max-w-[859px]'>{subscriptionText.h3}</h3>
        </div>

        <EmailForm />
      </div>
    </section>
  )
}

export default Subscribe
