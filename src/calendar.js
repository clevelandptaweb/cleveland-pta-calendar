import { API_KEY } from './config/calendarConfig'
import { getCalendarEvents } from './google'

import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

export function createCalendar(showEvent) {

    const isMobile = window.innerWidth < 768

    const calendar = new Calendar(document.getElementById('calendar'), {

        plugins: [
            dayGridPlugin,
            interactionPlugin,
            listPlugin
        ],

        initialView: isMobile
            ? 'listMonth'
            : 'dayGridMonth',

        headerToolbar: {

            left: 'prev',

            center: 'title',

            right: isMobile
                ? 'next'
                : 'today next'

        },

        buttonText: {

            today: 'Today'

        },

        height: 'auto',

        eventClick(info) {

            info.jsEvent.preventDefault()

            showEvent(info.event)

        },

        events: async (fetchInfo, successCallback, failureCallback) => {

            try {

                const events = await getCalendarEvents(
                    fetchInfo.startStr,
                    fetchInfo.endStr
                )

                successCallback(events)

            } catch (err) {

                console.error(err)

                failureCallback(err)

            }

        },

        googleCalendarApiKey: API_KEY

    })

    calendar.render()

    return calendar

}