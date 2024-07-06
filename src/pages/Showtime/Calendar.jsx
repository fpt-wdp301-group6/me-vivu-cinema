import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import useSWR from 'swr';
import { fetcher } from '~/config/api';
function Calendar({ room }) {
    const { data: showtimes } = useSWR(`/showtimes/${room}/listbyroom`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    let movies = [];
    if (showtimes) {
        movies = showtimes.data?.map(showtime => ({
            title: showtime.movieId.title,
            start: showtime.startAt.split('.')[0],
            end: showtime.endAt.split('.')[0]
        }))

    }
    return <FullCalendar plugins={[timeGridPlugin]} initialView="timeGridWeek" weekends={true} events={movies} />;
}

export default Calendar;