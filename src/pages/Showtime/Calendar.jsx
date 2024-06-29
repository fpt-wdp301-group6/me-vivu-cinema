import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { movies } from './mockdata';
export default function Calendar() {
    return <FullCalendar plugins={[timeGridPlugin]} initialView="timeGridWeek" weekends={true} events={movies} />;
}
