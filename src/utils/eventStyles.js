export function getEventStyle(title) {

    title = title.toLowerCase()

    // 🟨 Holidays / No School
    if (
        title.includes('no school') ||
        title.includes('break') ||
        title.includes('labor day') ||
        title.includes('memorial') ||
        title.includes('veteran') ||
        title.includes('lincoln') ||
        title.includes('martin luther') ||
        title.includes('president') ||
        title.includes('admissions day') ||
        title.includes('parent teacher')
    ) {
        return {
            icon: '🏖️',
            color: '#F6BF26'
        }
    }

    // 🟥 PTA Meetings
    if (
        title.includes('meeting') ||
        title.includes('association') ||
        title.includes('room rep')
    ) {
        return {
            icon: '🤝',
            color: '#D50000'
        }
    }

    // 🩵 Fundraisers
    if (
        title.includes('book fair') ||
        title.includes("see's") ||
        title.includes('spirit wear') ||
        title.includes('apex') ||
        title.includes('penny wars') ||
        title.includes('baskin') ||
        title.includes('D4D') ||
        title.includes('chuck e')
    ) {
        return {
            icon: '💰',
            color: '#31BCD3'
        }
    }

    // 🟦 Everything else (PTA & School Events)
    return {
        icon: '🎉',
        color: '#375EA2'
    }

}