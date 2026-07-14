import { getUpcomingEvents, getAllEvents } from '../google'
import { createEventCard } from './EventCard'
import { showEvent } from '../popup'

export async function loadUpcoming() {

    const upcomingEvents = await getUpcomingEvents()
    const allEvents = await getAllEvents()

    let filteredEvents = [...upcomingEvents]

    const container = document.getElementById('upcomingEvents')
    const search = document.getElementById('eventSearch')
    const toggleButton = document.getElementById('toggleUpcoming')

let showingAll = false

    function renderCards(events) {

        container.innerHTML = ''

        if (events.length === 0) {

            container.innerHTML = `
                <div class="no-results">
                    <h3>No events found</h3>
                    <p>Try a different search.</p>
                </div>
            `

            return
        }

        events.forEach((event, index) => {

            container.insertAdjacentHTML(
                'beforeend',
                createEventCard(event, index)
            )

        })

        container.querySelectorAll('.event-card').forEach(card => {

            card.addEventListener('click', () => {

                const event = events[Number(card.dataset.index)]

                showEvent({
                    title: event.title,
                    start: new Date(event.start),
                    extendedProps: event.extendedProps
                })

            })

        })

    }

    renderCards(filteredEvents)
    toggleButton.addEventListener('click', () => {

    showingAll = !showingAll

    if (showingAll) {

        filteredEvents = [...allEvents]

        toggleButton.textContent = 'Show Fewer Events ↑'

    } else {

        filteredEvents = [...upcomingEvents]

        toggleButton.textContent = 'View All Upcoming Events →'

    }

    search.value = ''

    renderCards(filteredEvents)

})

    search.addEventListener('input', () => {

        const text = search.value.trim().toLowerCase()

        if (text === '') {

            filteredEvents = [...upcomingEvents]

        } else {

            filteredEvents = allEvents.filter(event => {

                return (
                    event.title.toLowerCase().includes(text) ||
                    event.extendedProps.description.toLowerCase().includes(text) ||
                    event.extendedProps.location.toLowerCase().includes(text)
                )

            })

        }

        renderCards(filteredEvents)

    })

}