import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export const GET = async (req, res) => {

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  try {
    console.log('testing get')
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
    const monthAfterNext = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      1
    )

    // console.log(today, nextMonth, monthAfterNext)

    const events = await prisma.sportevent.findMany({
      where: {
        OR: [
          { date: { gte: today, lt: nextMonth } },
          { date: { gte: nextMonth, lt: monthAfterNext } },
          { date: { gte: monthAfterNext } }
        ]
      }
    })

    // const events = await prisma.sportevent.findMany()

    console.log(events)
    return new Response(JSON.stringify({ success: true, data: events }))

    // return new Response(convertedImageBuffer.toString("base64"));
  } catch (error) {
    console.error('Error during image conversion:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
