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
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'both', label: 'Male and Female' }
]

const Dashboard = () => {
  const [date, setDate] = useState()
  const [value, onChange] = useState('10:00')
  const [age9_12, setAge9_12] = useState(false)
  const [age12_15, setAge12_15] = useState(false)
  const [age15_18, setAge15_18] = useState(false)
  const [age18_30, setAge18_30] = useState(false)
  const [age30_, setAge30_] = useState(false)

  const { toast } = useToast()

  const submitAction = async formData => {
    formData.set('date', date)
    formData.set('age9_12', age9_12)
    formData.set('age12_15', age12_15)
    formData.set('age15_18', age15_18)
    formData.set('age18_30', age18_30)
    formData.set('age30_', age30_)
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

        <div className='flex w-full max-w-[400px] items-center justify-evenly space-x-2'>
          <div>
            <Checkbox id='9-12' name="test" checked={age9_12} onClick={() => setAge9_12(x => !x)}/>
            <label
              name="9-12"
              htmlFor='9-12'
              className='text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              9 - 12
            </label>
          </div>
          <div>
            <Checkbox id='12-15' name="12-15" checked={age12_15} onClick={() => setAge12_15(x => !x)}/>
            <label
              name="12-15"
              htmlFor='12-15'
              className='text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              12 - 15
            </label>
          </div>
          <div>
            <Checkbox id='15-18' checked={age15_18} onClick={() => setAge15_18(x => !x)}/>
            <label
              name="15-18"
              htmlFor='15-18'
              className='text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              15 - 18
            </label>
          </div>
          <div>
            <Checkbox id='18-30' checked={age18_30} onClick={() => setAge18_30(x => !x)}/>
            <label
              name="18-30"
              htmlFor='18-30'
              className='text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              18 - 30
            </label>
          </div>
          <div>
            <Checkbox id='30-' checked={age30_} onClick={() => setAge30_(x => !x)}/>
            <label
              name="30-"
              htmlFor='30-'
              className='text-sm font-medium text-[#64748B] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
              30 Above
            </label>
          </div>
        </div>

        <Input
          type='number'
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
