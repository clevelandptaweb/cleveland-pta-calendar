import { getEventStyle } from '../utils/eventStyles'

export function createEventCard(event, index) {

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

    // Google Calendar all-day end dates are exclusive,
    // so subtract one day.
    const endDate = new Date(ey, em - 1, ed - 1)

    const sameMonth =
        startDate.getMonth() === endDate.getMonth()

    if (startDate.getTime() === endDate.getTime()) {

        date = startDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
        })

    } else if (sameMonth) {

        date =
            `${startDate.toLocaleDateString('en-US', {
                month: 'long'
            })} ${startDate.getDate()}–${endDate.getDate()}`

    } else {

        date =
            `${startDate.toLocaleDateString('en-US', {
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
    ? 'All Day'
    : start.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

    const style = getEventStyle(event.title)

    const description = event.extendedProps.description
        ? event.extendedProps.description.substring(0, 120)
        : ''

    return `
        <div
            class="event-card"
            data-index="${index}"
            style="border-top:6px solid ${style.color};"
        >

            <div class="event-icon">
                ${style.icon}
            </div>

            <div class="event-info">

                <h3>${event.title}</h3>

                <p class="event-date">
                    <strong>${date}</strong> • ${time}
                </p>

                <p class="event-card-description">
                    ${description}
                </p>

            </div>

        </div>
    `
}