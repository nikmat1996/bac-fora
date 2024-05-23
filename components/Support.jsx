import support_img from '../assets/images/support_img.png'
import support from '../assets/gifs/support.gif'
import support_bg from '../assets/bg_images/support_bg.png'
import Image from 'next/image'

const supportText = {
    h2: "A Champion needs a champion support system",
    p: "At Build A Champ, we bring together parents, schools, and sports communities to create a robust support network for young athletes. This comprehensive system ensures that every participant is motivated, supported, and engaged throughout their sporting journey, from initial interest to achieving their personal best."
}

const Support = () => {
  return (
    <section className='relative px-5' id='support'>
      <div className='absolute inset-0  -z-10'>
        <Image alt='bg image' src={support_bg} className='w-full h-full' />
      </div>
      <div className='flex flex-col items-center w-full max-w-[1139px] mx-auto md:flex-row  py-12 lg:py-0 gap-x-20'>
        <Image alt='kids hug' src={support_img} className='hidden lg:block  self-center w-full scale-125 -translate-y-16 max-w-[400px]'/>
        <div className='w-full lg:max-w-[646px] text-white'>
            <div className='flex flex-col sm:flex-row-reverse  justify-center  '>
                <Image alt='medal gif' src={support} className='w-[43px] h-[43px] md:w-[93px] md:h-[93px]' unoptimized/>
                <h2 className='text-2xl/9  font-bold  pb-4 md:pb-7 md:text-[40px] md:leading-normal '>{supportText.h2}</h2>
            </div>
            <p className='text-[15px] leading-5 md:text-xl/10  mx-auto md:mx-0'>{supportText.p}</p>
        </div>
      </div>
      
    </section>
  )
}

export default Support
