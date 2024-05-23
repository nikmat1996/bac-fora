import EventsList from '@/components/EventsList'
import { getEvents } from '../_actions'


const Delete = async () => {

  const { events, error } = await getEvents()

  return (
    <div className='py-10 px-3'>
      {!!error && <p className='py-10 px-20'>{error.message}</p>}
      <EventsList events={events} />
    </div>
  )
}

export default Delete


