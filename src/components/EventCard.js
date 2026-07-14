import { getEventStyle } from '../utils/eventStyles'

export function createEventCard(event, index) {

    const start = new Date(event.start)

    const date = start.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
    })

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
                    <strong>${date}</strong><br>
                    ${time}
                </p>

                <p class="event-card-description">
                    ${description}
                </p>

            </div>

        </div>
    `
}