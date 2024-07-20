"use client"

import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from './ui/button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


const data = {
  gender: {
    label: 'Gender',
    options: [
      // { value: 'none', label: 'Gender' },
      { value: 'Boys', label: 'Boys' },
      { value: 'Girls', label: 'Girls' },
    ]
  },
  ageRange: {
    label: 'Age',
    options: [
      // { value: 'none', label: 'All' },
      { value: 'age9_12', label: '9 - 12' },
      { value: 'age12_15', label: '12 - 15' },
      { value: 'age15_18', label: '15 - 18' },
      { value: 'age18_30', label: '18 - 30' },
      { value: 'age30_', label: 'Above 30' },
    ]
  },
  sports: {
    label: 'Sports',
    options: [
      // { value: 'none', label: 'All' },
      { value: 'football', label: 'Football' },
      { value: 'badminton', label: 'Badminton' },
      { value: 'basketball', label: 'Basketball' },
      { value: 'cricket', label: 'Cricket' },
      { value: 'tennis', label: 'Tennis' },
      { value: 'swimming', label: 'Swimming' },
      { value: 'athletics', label: 'Athletics' },
      { value: 'tableTennis', label: 'Table Tennis' },
    ]
  }
}

const Filter = () => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // console.log("handleSubmit", formData)
    // console.log(formData.get("gender"))
    const params = new URLSearchParams(searchParams);

    formData.forEach((value, key) => {
      // console.log(value, key)
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <section className='pb-5'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-y-[30px] xl:flex-row gap-x-[43px] justify-center'>
        <div className='flex gap-[15px] md:gap-[43px]'>
          <CustomSelect data={data.gender}  name={"gender"} defaultValue={searchParams.get('gender')?.toString()}/>
          <CustomSelect data={data.ageRange}  name={"ageRange"} defaultValue={searchParams.get('ageRange')?.toString()}/>
          <CustomSelect data={data.sports}  name={"sports"} defaultValue={searchParams.get('sports')?.toString()}/>
        </div>
        <Button type={"submit"} className="bg-[#FD8642] px-[65px] py-2.5 leading-normal h-max  md:text-lg hover:bg-[#FD8642] hover:opacity-75">Search</Button>
      </form>
    </section>
  )
}

export default Filter


export function CustomSelect({ data: { label, options }, ...props }) {
  
  return (
    <Select {...props} >
      <SelectTrigger  className='w-[98px] py-2.5 leading-normal h-max text-xs md:text-lg text-gray-800 text-opacity-50 md:w-52'>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup className='text-gray-800 text-opacity-50 '>
          {options.map(option => (
            <SelectItem className="text-xs md:text-base cursor-pointer"  value={option.value} key={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
