import { CALENDAR_ID, API_KEY } from './config/calendarConfig'
import { getEventStyle } from './utils/eventStyles'

function normalizeEvent(event) {

    const style = getEventStyle(event.summary)

    return {

        id: event.id,

        title: event.summary,

        start: event.start.dateTime || event.start.date,

        end: event.end.dateTime || event.end.date,

        allDay: !!event.start.date,

        backgroundColor: style.color,

        borderColor: style.color,

        extendedProps: {
            description: event.description || '',
            location: event.location || ''
        }

    }

}

export async function getUpcomingEvents() {

    const now = new Date().toISOString()

    const url =
`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${now}&maxResults=3`

    const response = await fetch(url)
    const data = await response.json()

    return data.items.map(normalizeEvent)

}

export async function getCalendarEvents(start, end) {

    const url =
`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${start}&timeMax=${end}`

    const response = await fetch(url)
    const data = await response.json()

    return data.items.map(normalizeEvent)

}

export async function getAllEvents() {

    const now = new Date()

    const start = new Date(
        now.getFullYear() - 1,
        0,
        1
    ).toISOString()

    const end = new Date(
        now.getFullYear() + 2,
        11,
        31,
        23,
        59,
        59
    ).toISOString()

    return getCalendarEvents(start, end)

}