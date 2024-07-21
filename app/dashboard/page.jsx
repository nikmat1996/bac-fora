'use client'

import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import React, { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import dynamic from 'next/dynamic'
import { addEvent } from '../_actions'
import { useToast } from '@/components/ui/use-toast'

const TimePicker = dynamic(() => import('react-time-picker'), { ssr: false })

const sports = [
  { value: 'football', label: 'Football' },
  { value: 'badminton', label: 'Badminton' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'cricket', label: 'Cricket' },
  { value: 'tennis', label: 'Tennis' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'athletics', label: 'Athletics' },
  { value: 'tableTennis', label: 'Table Tennis' }
]

const genderOpt = [
  { value: 'male', label: 'Boys' },
  { value: 'female', label: 'Girls' },
  { value: 'both', label: 'Boys and Girls' }
]

const Dashboard = () => {
  const [date, setDate] = useState()
  const [value, onChange] = useState('10:00')
  const [ageLessThan7, setAgeLessThan7] = useState(false)
  const [age7, setAge7] = useState(false)
  const [age8, setAge8] = useState(false)
  const [age9, setAge9] = useState(false)
  const [age10, setAge10] = useState(false)
  const [age11, setAge11] = useState(false)
  const [age12, setAge12] = useState(false)
  const [age13, setAge13] = useState(false)
  const [age14, setAge14] = useState(false)
  const [age15, setAge15] = useState(false)
  const [age16, setAge16] = useState(false)
  const [age17, setAge17] = useState(false)
  const [ageGreaterThan18, setAgeGreaterThan18] = useState(false)

  const { toast } = useToast()

  const submitAction = async formData => {
    formData.set('date', date)
    formData.set('ageLessThan7', ageLessThan7)
    formData.set('age7', age7)
    formData.set('age8', age8)
    formData.set('age9', age9)
    formData.set('age10', age10)
    formData.set('age11', age11)
    formData.set('age12', age12)
    formData.set('age13', age13)
    formData.set('age14', age14)
    formData.set('age15', age15)
    formData.set('age16', age16)
    formData.set('age17', age17)
    formData.set('ageGreaterThan18', ageGreaterThan18)
    const res = await addEvent(formData)
    if (res.success) {
      toast({
        title: 'Success! ',
        description: 'Event Added.'
      })
      return
    }

    if (res.error) {
      toast({
        title: 'Failed! ',
        description: res.error.message
      })
    }
  }

  return (
    <section className='mx-auto max-w-4xl border-x-2 py-10'>
      <form
        action={submitAction}
        className='flex flex-col items-center gap-y-10 px-2'
      >
        <h2>ADD EVENT</h2>

        <Select name='sport'>
          <SelectTrigger className='w-full max-w-[400px] text-sm text-muted-foreground'>
            <SelectValue placeholder='Select Sport' />
          </SelectTrigger>
          <SelectContent>
            {sports.map(sport => (
              <SelectItem key={sport.value} value={sport.value}>
                {sport.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild name='date'>
            <Button
              variant={'outline'}
              className={cn(
                'w-full max-w-[400px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' name='date'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={val => {
                setDate(val)
              }}
              initialFocus
              name='date'
            />
          </PopoverContent>
        </Popover>

        <TimePicker
          onChange={onChange}
          value={value}
          className={'w-full max-w-[400px] rounded-lg'}
        />

        <Select name='gender'>
          <SelectTrigger className='w-full max-w-[400px] text-sm text-muted-foreground'>
            <SelectValue placeholder='Select Gender' />
          </SelectTrigger>
          <SelectContent>
            {genderOpt.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type='text'
          name={'category'}
          placeholder='Category'
          className='w-full max-w-[400px]'
        />

        <div className='flex flex-wrap w-full max-w-[400px] items-center gap-x-4 gap-y-3'>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='less-than-7' name="less-than-7" checked={ageLessThan7} onClick={() => setAgeLessThan7(x => !x)}/>
            <label
              name="less-than-7"
              htmlFor='less-than-7'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              Less than 7
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-7' name="age-7" checked={age7} onClick={() => setAge7(x => !x)}/>
            <label
              name="age-7"
              htmlFor='age-7'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              7
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-8' name="age-8" checked={age8} onClick={() => setAge8(x => !x)}/>
            <label
              name="age-8"
              htmlFor='age-8'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              8
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-9' name="age-9" checked={age9} onClick={() => setAge9(x => !x)}/>
            <label
              name="age-9"
              htmlFor='age-9'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              9
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-10' name="age-10" checked={age10} onClick={() => setAge10(x => !x)}/>
            <label
              name="age-10"
              htmlFor='age-10'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              10
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-11' name="age-11" checked={age11} onClick={() => setAge11(x => !x)}/>
            <label
              name="age-11"
              htmlFor='age-11'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              11
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
          <Checkbox id='age-12' name="age-12" checked={age12} onClick={() => setAge12(x => !x)}/>
            <label
              name="age-12"
              htmlFor='age-12'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              12
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-13' name="age-13" checked={age13} onClick={() => setAge13(x => !x)}/>
            <label
              name="age-13"
              htmlFor='age-13'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              13
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-14' name="age-14" checked={age14} onClick={() => setAge14(x => !x)}/>
            <label
              name="age-14"
              htmlFor='age-14'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              14
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-15' name="age-15" checked={age15} onClick={() => setAge15(x => !x)}/>
            <label
              name="age-15"
              htmlFor='age-15'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              15
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-16' name="age-16" checked={age16} onClick={() => setAge16(x => !x)}/>
            <label
              name="age-16"
              htmlFor='age-16'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              16
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='age-17' name="age-17" checked={age17} onClick={() => setAge17(x => !x)}/>
            <label
              name="age-17"
              htmlFor='age-17'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              17
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <Checkbox id='greater-than-18' name="greater-than-18" checked={ageGreaterThan18} onClick={() => setAgeGreaterThan18(x => !x)}/>
            <label
              name="greater-than-18"
              htmlFor='greater-than-18'
              className='cursor-pointer text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              Greater than 18
            </label>
          </div>
        </div>

        <Input
          type='text'
          name={'price'}
          placeholder='Price'
          className='w-full max-w-[400px]'
        />
        <textarea
          type='textarea'
          name={'address'}
          placeholder='Address'
          className='w-full max-w-[400px] rounded-lg border p-2 text-sm placeholder-[#64748B] focus-within:outline-black '
        />
        <Input
          type='tel'
          name={'phone'}
          placeholder='Phone'
          className='w-full max-w-[400px]'
        />

        <Input
          type='text'
          name={'url'}
          placeholder='Image url'
          className='w-full max-w-[400px]'
        />

         <Input
          type='text'
          name={'locationUrl'}
          placeholder='Google Maps link'
          className='w-full max-w-[400px]'
        />

        <Input
          type='password'
          name={'password'}
          placeholder='PIN'
          className='w-full max-w-[400px]'
        />

        <SubmitButton />
      </form>
    </section>
  )
}

export default Dashboard

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' className='px-20'>
      {pending ? 'Adding..' : 'Add'}
    </Button>
  )
}