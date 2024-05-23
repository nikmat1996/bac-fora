"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from '@/components/ui/table'
  import { Button } from '@/components/ui/button'
  import DeleteModal from '@/components/DeleteModal'
  import { format } from 'date-fns'
import { useState } from 'react'

const EventsList = ({events}) => {

    const [selectedEve, setSelectedEve] = useState({});
    const [isModalActive, setIsModalActive] = useState(false);
  
    const handleClick = (clickedEve) => {
      console.log("clicked")
      setSelectedEve(clickedEve)
      setIsModalActive(true)
    }
  
    return (
      <Table className="max-w-[800px] mx-auto ">
        {/* <TableCaption>Events</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Sport</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className=''>Amount</TableHead>
            <TableHead className=''>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events?.length > 0 &&
            events.map(eve => (
              <TableRow key={eve.id}>
                <TableCell className='font-medium capitalize'>{eve.sport}</TableCell>
                <TableCell>{format(eve.date, "do LLL yyyy")}</TableCell>
                <TableCell className=''>{eve.price}</TableCell>
                <TableCell className=''><Button onClick={() => handleClick(eve)}>Delete</Button></TableCell>
  
              </TableRow>
            ))}
        </TableBody>
        <DeleteModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} eve={selectedEve}/>
      </Table>
    )
  }

  export default EventsList