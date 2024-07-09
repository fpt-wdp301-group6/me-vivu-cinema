import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { toast } from 'react-toastify';

function Calendar({ showtimes, room, onSelect, onEventClick }) {
    let movies = [];
    if (showtimes) {
        movies = showtimes.data?.map((showtime) => ({
            title: showtime.movieId.title,
            start: showtime.startAt,
            end: showtime.endAt,
            showtime: showtime,
        }));
    }

    return (
        <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            weekends={true}
            events={movies}
            selectable
            select={(e) => {
                if (room) {
                    onSelect(e.start);
                } else {
                    toast.warning('Vui lòng chọn rạp và phòng chiếu trước!');
                }
            }}
            eventClick={(e) => {
                onEventClick(e.event.extendedProps.showtime);
            }}
        />
    );
}

export default Calendar;
