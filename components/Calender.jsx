'use client'

import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import rightArrow from '@/assets/icons/rightArrow.svg'
import leftArrow from '@/assets/icons/leftArrow.svg'
import badminton from '@/assets/icons/badminton.png'
import football from '@/assets/icons/football.png'
import tableTennis from '@/assets/icons/tableTennis.png'
import swimming from '@/assets/icons/swimming.png'
import athletics from '@/assets/icons/athletics.svg'
import tennis from '@/assets/icons/tennis.svg'
import cricket from '@/assets/icons/cricket.svg'
import modalImg from '@/assets/images/modalImg.png'

import {
  addMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  startOfMonth,
  startOfToday
} from 'date-fns'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import Link from 'next/link'

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7'
]


const Calender = props => {
  
  const localEvent = {
    data: [
      {
        address: "1st Street, 2nd Road",
        age9_12: false,
        age12_15:true,
        age15_18:true,
        age18_30:false,
        age30_:false,
        category:"Single's and Double's",
        date: "2024-05-22T18:30:00.000Z",
        gender:"female",
        id:1,
        phone:"+91 7558033622",
        price:900,
        sport:"badminton",
        time:"00:00",
        url:"https://i.pinimg.com/736x/0e/9e/d7/0e9ed7a401e6559716d613fa35a374df.jpg",
      }
    ],
  }
  const { sports, ageRange, gender } = props
  let startToday = startOfToday()
  const [today, setToday] = useState(startToday);
  let [count, setCount] = useState(0)
  const [events, setEvents] = useState([]);
  const [modalEvent, setModalEvent] = useState("");
  const [showModal, setShowModal] = useState(false);

  
  
  
  // let count = 0;

  // console.log(sports, ageRange, gender)
  let months = eachMonthOfInterval({
    start: today,
    end: addMonths(today, 2)
  })

  const firstDaySelectedMonth = startOfMonth(months[count])

  let days = eachDayOfInterval({
    start: firstDaySelectedMonth,
    end: endOfMonth(firstDaySelectedMonth)
  })

  // console.log(days)

  const handleChangeMonth = delta => {
    setCount(init => {
      if (delta === -1 && init === 0) return init
      if (delta === 1 && init === months.length - 1) return init
      return init + delta
    })
  }

  const getData = async () => {
    try {
      const response = await fetch('/api/events', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
      
      throw error; 
    }
  };

  // const getData = async () => {
  //   return localEvent
  // }

  useEffect(() => {
    
    getData()
      .then(res => {
        console.log('Res:', res);
        // res.data.forEach(event => {
        //   if(event.date in eventsObj) {
        //     // console.log("running", typeof event.date)
        //     // console.log("running", typeof days[0])
        //     // console.log(eventsObj)
        //     eventsObj[event.date].push(event)
        //   }
        //   else eventsObj[event.date] = [event]
        // })
        setEvents(res.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
      setToday(new Date().toISOString())

  }, []);

  const handleSportClick = (event) => {
    console.log(event)
    setModalEvent(event)
    setShowModal(true)
  }
  const eventsObj = {}

  events.length && events.filter(item => {

    if(!gender || item.gender === "Boys and Girls" || item.gender === "both") {
      return true
    }
    if(item.gender === "male" && gender === "Boys") return true
    if(item.gender === "female" && gender === "Girls") return true
    return item.gender === gender

  }).filter(item => {

    if(!sports){
      return true
    }
    return item.sport === sports

  }).filter(item => {

    if(!ageRange) return true
    return item[ageRange]

  })
  .forEach(event => {
    if(event.date in eventsObj) {
      // console.log("running", typeof event.date)
      // console.log("running", typeof days[0])
      // console.log(eventsObj)
      eventsObj[event.date].push(event)
    }
    else eventsObj[event.date] = [event]
  })

  // console.log("modalEvent", modalEvent)

  return (
    <section className='mx-auto w-full max-w-[1139px] px-5 pb-16 pt-2.5 md:pt-9 xl:px-0'>
      <div className='flex items-center justify-center gap-3 pb-3 md:pb-5'>
        <button
          className=' m-0 h-4 w-4 cursor-pointer select-none rounded-full border-0 p-0 disabled:cursor-default disabled:opacity-70 md:h-9 md:w-9'
          disabled={count === 0}
          onClick={() => handleChangeMonth(-1)}
        >
          <div className='sr-only'>previous month</div>
          <Image
            src={leftArrow}
            alt='left icon'
            className='aspect-square w-4 rounded-full md:h-9 md:w-9'
          />
        </button>
        <h2 className='select-none text-xs/normal font-bold uppercase md:text-[25px] md:leading-[38px]'>
          {format(months[count], 'MMMM	yyyy')}
        </h2>
        <button
          className='m-0 h-4 w-4 cursor-pointer select-none rounded-full border-0 p-0 disabled:cursor-default disabled:opacity-70 md:h-9 md:w-9'
          disabled={count === months.length - 1}
          onClick={() => handleChangeMonth(1)}
        >
          <div className='sr-only'>next month</div>
          <Image
            src={rightArrow}
            alt='left icon'
            className='h-4 w-4 rounded-full md:h-9 md:w-9'
          />
        </button>
      </div>
      <div className=''>
        <div className='grid grid-cols-7 text-center text-xs leading-6 '>
          <div className='bg-[#FCA76B] py-1.5 text-center text-[6.5px] font-bold leading-[10px] md:py-3 md:text-[17px] md:leading-[36px]'>
            SUNDAY
          </div>
          <div className='bg-[#97E1E2] py-1.5 text-center text-[6.5px] font-bold leading-[10px] md:py-3 md:text-[17px] md:leading-[36px]'>
            MONDAY
          </div>
          <div className='bg-[#97E1E2] py-1.5 text-center text-[6.5px] font-bold leading-[10px] md:py-3 md:text-[17px] md:leading-[36px]'>
            TUESDAY
          </div>
          <div className='bg-[#97E1E2] py-1.5 text-center text-[6.5px] font-bold leading-[10px] md:py-3 md:text-[17px] md:leading-[36px]'>
            WEDNESDAY
          </div>
          <div className='bg-[#97E1E2] py-1.5 text-center text-[6.5px] font-bold leading-[10px] md:py-3 md:text-[17px] md:leading-[36px]'>
            THURSDAY
          </div>
          <div className='bg-[#97E1E2] py-1.5 text-center text-[6.5px] font-bold leading-[10px] md:py-3 md:text-[17px] md:leading-[36px]'>
            FRIDAY
          </div>
          <div className='bg-[#FCA76B] py-1.5 text-center text-[6.5px] font-bold leading-[10px] md:py-3 md:text-[17px] md:leading-[36px]'>
            SATURDAY
          </div>
        </div>
        <div className='grid grid-cols-7  gap-0.5 bg-white p-0.5 text-sm md:gap-1.5 md:p-1.5'>
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={twMerge(
                dayIdx === 0 && colStartClasses[getDay(day)],
                'h-10 bg-zinc-100 font-bold md:h-[103px]'
              )}
            >
              <div
                className={twMerge(
                  isSameDay(day, today) && 'text-[#FCA76B]',
                  'text-center text-[6.5px] leading-[10px] md:text-[17px] md:leading-[24px] '
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
              </div>
              <div className='p-0.5 sm:p-1 mt-1  grid grid-cols-2  gap-0.5'>
                {eventsObj[new Date(day).toISOString()] && eventsObj[new Date(day).toISOString()].map(event => 
                  <SportSlip key={event.id} sport={event.sport} event={event} onClick={() => handleSportClick(event)}/>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal} >
        <DialogContent className="rounded-none max-w-4xl p-0 ">
          <div className='grid grid-cols-2 '>
            <div className='p-1'>
              <Image src={modalEvent.url} alt='sport image' className='w-full object-cover h-full' unoptimized quality={100} width={100} height={100}/>
            </div>
            <div className='py-3 sm:py-6 px-1 sm:px-3 md:px-5 lg:px-7 flex flex-col gap-2 sm:gap-3 md:gap-6 '>
              <DialogHeader className={"font-bold text-[#080809] text-left  text-[12px] sm:text-[15px] md:text-2xl leading-tight capitalize"}>{modalEvent.sport} Tournament </DialogHeader>

              {/* date and time */}
              <div className="w-full   text-[#84829a]">
                <div className="w-full flex gap-x-2 items-center">
                  <p className="font-semibold text-left text-[10px] sm:text-[15px] md:text-xl text-[#84829a]">{modalEvent.date ? format(modalEvent.date, "do LLL yyyy"): "Date NA"}</p>
                  <svg
                    width="1"
                    height="16"
                    viewBox="0 0 1 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                    preserveAspectRatio="none"
                  >
                    <line x1="0.5" x2="0.5" y2="16" stroke="#84829A"></line>
                  </svg>
                  <p className="text-left text-[10px] sm:text-[15px] md:text-xl font-semibold ">{modalEvent.time}</p>
                </div>
              </div>

              <p className="w-full leading-none text-left text-[15px] text-[#84829a] space-x-1 sm:space-x-2 ">
                <span className="font-semibold text-left text-[10px] sm:text-[15px] md:text-xl ">Gender:</span>
                <span className=" text-left text-[10px] sm:text-[15px] md:text-xl ">{modalEvent.gender === "both" ? "Boys and Girls": modalEvent.gender === "male" ? "Boys" : modalEvent.gender === "female" ? "Girls": modalEvent.gender}</span>
              </p>

              <div className='flex flex-col'>
                <p className="text-left text-[10px] sm:text-[15px] md:text-xl text-[#84829a] space-x-1 sm:space-x-2">
                  <span className=" font-semibold text-left text-[10px] sm:text-[15px] md:text-xl ">Category:</span>
                  <span className="text-left text-[10px] sm:text-[15px] md:text-xl font-medium ">{modalEvent.category} </span>
                </p>
                {/* <p className="text-left text-[10px] sm:text-[15px] md:text-xl text-[#84829a]"> ({modalEvent.age9_12 && "U-12,"} {modalEvent.age12_15 && "U-15,"} {modalEvent.age15_18 && "U-18,"} {modalEvent.age18_30 && "18 - 30,"} {modalEvent.age30_ && "A-30,"})</p> */}
              </div>

              <p className="text-left text-[10px] sm:text-[15px] md:text-xl text-[#84829a]">
                <span className="text-left text-[10px] sm:text-[15px] md:text-xl font-semibold  ">Entry Fee:</span>
                <span className="text-left text-[10px] sm:text-[15px] md:text-xl font-medium  "> </span>
                <span className="text-left text-[10px] sm:text-[15px] md:text-xl  ">{Number(modalEvent.price) == modalEvent.price ? `Rs ${modalEvent.price}`: modalEvent.price}</span>
              </p>

              <div className='flex gap-1 sm:gap-2 md:gap-3'>
                <svg
                  width="11"
                  height="16"
                  viewBox="0 0 11 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 h-3 mt-0.5 sm:w-3 sm:h-5"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M5.49978 7.57536C6.61717 7.57536 7.52299 6.66954 7.52299 5.55215C7.52299 4.43475 6.61717 3.52893 5.49978 3.52893C4.38239 3.52893 3.47656 4.43475 3.47656 5.55215C3.47656 6.66954 4.38239 7.57536 5.49978 7.57536Z"
                    stroke="#84829A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M9.54643 7.57545C8.02902 11.1161 5.5 15.1625 5.5 15.1625C5.5 15.1625 2.97098 11.1161 1.45357 7.57545C-0.0638427 4.03482 2.46518 1 5.5 1C8.53482 1 11.0638 4.03482 9.54643 7.57545Z"
                    stroke="#84829A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <p className="w-full text-xs font-light text-left text-[#84829a]">
                  <span className="w-full text-left text-[10px] sm:text-[15px] md:text-lg font-light text-[#84829a]">
                    {/* {modalEvent.address} */}
                    {modalEvent.address?.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                    {modalEvent.locationUrl && <Link className='text-base text-blue-500' href={modalEvent.locationUrl} target="_blank">https://maps.app.google</Link> }
                  </span>

                  <br />
                  
                  {/* <span className="text-left text-[10px] sm:text-[15px] md:text-xl font-light text-[#84829a]">https://maps.app.com</span> */}
                </p>
              </div>
              

              <div className="w-full flex flex-row-reverse justify-end gap-1 sm:gap-2 md:gap-3 items-center">
                <p className="text-left text-[10px] sm:text-[15px] md:text-xl font-light  text-[#84829a]">
                {modalEvent.phone}
                </p>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 h-2 sm:w-3 sm:h-3"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M11.4223 8.06756L8.59567 6.80094L8.58787 6.79734C8.44112 6.73458 8.28105 6.70939 8.12212 6.72406C7.9632 6.73873 7.81044 6.79279 7.67766 6.88135C7.66203 6.89167 7.647 6.90289 7.63266 6.91495L6.17225 8.15996C5.24704 7.71055 4.29184 6.76254 3.84243 5.84934L5.08924 4.36672C5.10124 4.35172 5.11264 4.33672 5.12344 4.32052C5.2101 4.1881 5.26268 4.03631 5.27649 3.87866C5.29031 3.72101 5.26494 3.56239 5.20264 3.41691V3.40971L3.93243 0.578284C3.85008 0.388241 3.70847 0.22993 3.52874 0.126983C3.34902 0.024036 3.14082 -0.018025 2.93523 0.00707865C2.1222 0.114064 1.37592 0.513345 0.835771 1.13035C0.29562 1.74735 -0.00146457 2.53988 5.42922e-06 3.35991C5.42922e-06 8.12396 3.87603 12 8.64007 12C9.4601 12.0015 10.2526 11.7044 10.8696 11.1642C11.4866 10.6241 11.8859 9.87779 11.9929 9.06477C12.018 8.85924 11.9761 8.65109 11.8732 8.47138C11.7704 8.29166 11.6122 8.15001 11.4223 8.06756ZM8.64007 11.04C6.60387 11.0378 4.65171 10.2279 3.2119 8.78809C1.7721 7.34828 0.962236 5.39611 0.960012 3.35991C0.957755 2.774 1.16884 2.2073 1.55386 1.76564C1.93887 1.32398 2.47148 1.03757 3.05223 0.959888C3.05199 0.962282 3.05199 0.964694 3.05223 0.967088L4.31224 3.78712L3.07203 5.27153C3.05944 5.28601 3.048 5.30146 3.03783 5.31773C2.94754 5.45628 2.89457 5.61581 2.88405 5.78085C2.87354 5.94589 2.90584 6.11085 2.97783 6.25974C3.52143 7.37155 4.64164 8.48336 5.76545 9.02637C5.91543 9.09768 6.08134 9.12886 6.24698 9.11687C6.41261 9.10488 6.57231 9.05013 6.71045 8.95796C6.72586 8.94759 6.74068 8.93637 6.75485 8.92437L8.21346 7.67995L11.0335 8.94296H11.0401C10.9634 9.52453 10.6774 10.0582 10.2356 10.4442C9.79389 10.8302 9.22667 11.042 8.64007 11.04Z"
                    fill="#84829A"
                  ></path>
                </svg>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Calender

const SportSlip = ({sport, onClick, event}) => {

  const icons = {
    badminton: badminton,
    football: football,
    tableTennis,
    swimming,
    athletics,
    tennis,
    cricket
  }
  return (
    <div className='flex gap-x-0.5 lg:gap-x-1 cursor-pointer items-center' onClick={onClick}>
      <Image src={icons[sport] || icons.tennis} alt='sport icon' className='w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5'/>
      <p className='capitalize text-black text-[3px] sm:text-[4px] md:text-[5px] lg:text-[7px] xl:text-[8px] font-light'>{sport}</p>
    </div>
  )
}
