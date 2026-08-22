import { getEventStyle } from './utils/eventStyles'

export function showEvent(event) {

    const oldModal = document.querySelector('.event-modal-overlay')

    if (oldModal) oldModal.remove()

    const overlay = document.createElement('div')
    overlay.className = 'event-modal-overlay'

    // Format the date
    let startDate = ''

    if (event.start) {

        if (event.allDay && event.end) {

            const endDate = new Date(event.end)
            endDate.setDate(endDate.getDate() - 1)

            const sameDay =
                event.start.toDateString() === endDate.toDateString()

            if (sameDay) {

                startDate = event.start.toLocaleDateString([], {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })

            } else {

                startDate =
                    `${event.start.toLocaleDateString([], {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })} – ${endDate.toLocaleDateString([], {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}`

            }

        } else {

            startDate = event.start.toLocaleDateString([], {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })

        }

    }

    // Format the time
    let startTime = ''

    if (event.start) {

        startTime = event.allDay
            ? 'All Day'
            : event.start.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit'
            })

    }

    const location = event.extendedProps.location || ''

    const description = (
        event.extendedProps.description ||
        '<em>No additional information available.</em>'
    ).replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank">$1</a>'
    )

    const style = getEventStyle(event.title)

    overlay.innerHTML = `
        <div class="event-modal">

            <button class="event-close" aria-label="Close">
                ✕
            </button>

            <div
                class="event-banner"
                style="background:${style.color};"
            ></div>

            <div class="event-header">

                <h2>${event.title}</h2>

            </div>

            <div class="event-meta">

                <div class="meta-row">

                    <span class="meta-icon">📅</span>

                    <span>${startDate}</span>

                </div>

                <div class="meta-row">

                    <span class="meta-icon">🕒</span>

                    <span>${startTime}</span>

                </div>

                ${
                    location
                        ? `
                <div class="meta-row">

                    <span class="meta-icon">📍</span>

                    <span>${location}</span>

                </div>
                `
                        : ''
                }

            </div>

            <div class="event-description">

                ${description}

            </div>

        </div>
    `

    document.body.appendChild(overlay)

    requestAnimationFrame(() => {
        overlay.classList.add('show')
    })

    overlay.querySelector('.event-close')
        .addEventListener('click', closeModal)

    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal()
    })

    function esc(e) {
        if (e.key === 'Escape') {
            closeModal()
        }
    }

    document.addEventListener('keydown', esc)

    function closeModal() {
        overlay.classList.remove('show')

        setTimeout(() => {
            overlay.remove()
        }, 200)

        document.removeEventListener('keydown', esc)
    }

}