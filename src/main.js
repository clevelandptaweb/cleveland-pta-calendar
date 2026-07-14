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
