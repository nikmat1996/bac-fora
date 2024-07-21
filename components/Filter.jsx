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
      { value: 'male', label: 'Boys' },
      { value: 'female', label: 'Girls' },
      { value: 'both', label: 'Both' }, // Added 'both' option
    ]
  },
  ageRange: {
    label: 'Age',
    options: [
      { value: 'ageLessThan7', label: 'Less than 7' },
      { value: 'age7', label: '7' },
      { value: 'age8', label: '8' },
      { value: 'age9', label: '9' },
      { value: 'age10', label: '10' },
      { value: 'age11', label: '11' },
      { value: 'age12', label: '12' },
      { value: 'age13', label: '13' },
      { value: 'age14', label: '14' },
      { value: 'age15', label: '15' },
      { value: 'age16', label: '16' },
      { value: 'age17', label: '17' },
      { value: 'ageGreaterThan18', label: 'Above 18' },
    ]
  },
  sports: {
    label: 'Sports',
    options: [
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
