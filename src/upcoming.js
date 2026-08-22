import './style.css'
import { getUpcomingEvents } from './google'

async function loadUpcoming() {

    const events = await getUpcomingEvents()
    const upcoming = events.slice(0, 3)

    document.querySelector('#app').innerHTML = `
<div class="home-upcoming">

<h1>UPCOMING EVENTS</h1>

<p class="subtitle">
See what's happening around Cleveland!
</p>

<div class="big-dots"></div>

${upcoming.map((event, index) => {

   let start

if (event.allDay) {
    const [year, month, day] = event.start.split('-').map(Number)
    start = new Date(year, month - 1, day)
} else {
    start = new Date(event.start)
}

let date

if (event.allDay && event.end) {

    const [sy, sm, sd] = event.start.split('-').map(Number)
    const [ey, em, ed] = event.end.split('-').map(Number)

    const startDate = new Date(sy, sm - 1, sd)

    // Google all-day end dates are exclusive
    const endDate = new Date(ey, em - 1, ed - 1)

    const sameDay =
        startDate.getTime() === endDate.getTime()

    const sameMonth =
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getFullYear() === endDate.getFullYear()

    if (sameDay) {

        date = startDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
        })

    } else if (sameMonth) {

        date = `${startDate.toLocaleDateString('en-US', {
            month: 'long'
        })} ${startDate.getDate()}–${endDate.getDate()}`

    } else {

        date = `${startDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })} – ${endDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })}`

    }

} else {

    date = start.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
    })

}

const time = event.allDay
    ? ''
    : start.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
        })

    return `
<p class="event-block">

<strong>${date}</strong><br>

${event.title}

${time ? `<br>${time}` : ''}

</p>

${index < upcoming.length - 1
    ? '<div class="small-dots"></div>'
    : ''
}
`

}).join('')}

<p class="calendar-wrapper">
<a
class="calendar-link"
href="https://clevelandpta.membershiptoolkit.com/2026_2027calendar">
View Full Calendar →
</a>
</p>

</div>
`
}

loadUpcoming()