import './style.css'

import { createCalendar } from './calendar'
import { showEvent } from './popup'
import { loadUpcoming } from './components/UpcomingEvents'

document.querySelector('#app').innerHTML = `
<div class="page">

  <header class="hero">
      <h1>Cleveland PTA & School Calendar</h1>
      <p>
          Stay up to date with PTA meetings, family events,
          fundraisers and important school dates.
      </p>
  </header>

 <section class="coming-up">

 <div class="section-header">

    <h2>Coming Up</h2>

    <div class="header-actions">

        <input
            id="eventSearch"
            class="event-search"
            type="text"
            placeholder="🔍 Search events..."
        />      

    </div>

</div>

      <div class="event-cards" id="upcomingEvents">

          <div class="event-card">
              <div class="event-icon">🩵</div>

              <div class="event-info">
                  <h3>Loading...</h3>
                  <p>Fetching upcoming events...</p>
              </div>
              
          </div>
      </div>
      <div class="view-all-wrapper">
    <button id="toggleUpcoming" class="view-all-btn">
        View All Upcoming Events →
    </button>
</div>

  </section>

  <section class="calendar-card">
      <div id="calendar"></div>
  </section>

</div>
`

createCalendar(showEvent)
loadUpcoming()
function resizeParent() {

    if (window.parent === window) return

    const height = document.documentElement.scrollHeight

    window.parent.postMessage(
        {
            type: 'resize-calendar',
            height
        },
        '*'
    )

}

// Initial resize
window.addEventListener('load', resizeParent)

// Resize if browser changes
window.addEventListener('resize', resizeParent)

// Give FullCalendar time to finish rendering
setTimeout(resizeParent, 300)
setTimeout(resizeParent, 800)
setTimeout(resizeParent, 1500)