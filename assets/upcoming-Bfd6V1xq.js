import{r as e}from"./google-NiJ7mJ0b.js";async function t(){let t=(await e()).slice(0,3);document.querySelector(`#app`).innerHTML=`

<div class="home-upcoming">

    <h1>UPCOMING EVENTS</h1>

    <p class="subtitle">
        See what's happening around Cleveland!
    </p>

    <div class="dots"></div>

    ${t.map(e=>{let t=new Date(e.start),n=t.toLocaleDateString(`en-US`,{month:`long`,day:`numeric`}),r=e.allDay?``:t.toLocaleTimeString(`en-US`,{hour:`numeric`,minute:`2-digit`});return`

            <div class="event">

                <strong>${n}</strong>

                <div>${e.title}</div>

                ${r?`<div>${r}</div>`:``}

            </div>

            <div class="dots small"></div>

        `}).join(``)}

    <a
        class="calendar-link"
        href="https://clevelandpta.membershiptoolkit.com/2026_2027calendar"
    >
        View Full Calendar →
    </a>

</div>

`}t();