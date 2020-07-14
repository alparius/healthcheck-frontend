
export const convertDateToString = date => {
    if (typeof date === 'string') {
        date = new Date(date)
    }
    var d = new Date(date.getTime());
    d.setHours(d.getHours() + 2)
    let index = d.toISOString().indexOf('.')
    return d.toISOString().replace('T', ' ').slice(0, index)
}

export const mapActivityToSchedulerEvent = (activity, city, hospitals) => {
    let hospital = hospitals.find(h => h.id === activity.hospitalId)
    let hospitalName = hospital ? hospital.name : ''
    return {
        Id: activity.id,
        Subject: activity.title,
        Description: activity.description,
        City: city || 'Cluj-Napoca',
        Category: activity.category || 'Spitalizare',
        Location: hospitalName,
        EventType: activity.status || 'Accepted',
        IsAllDay: false,
        StartTime: new Date(activity.startDateAndTime),
        EndTime: new Date(activity.endDateAndTime)
    }
}

export const mapSchedulerEventToActivity = (event, hospitals) => {
    let hospital = hospitals.find(h => h.name === event.Location)
    let hospitalId = hospital ? hospital.id : hospitals[0].id
    return {
        id: event.Id,
        title: event.Subject,
        description: event.Description || '',
        category: event.Category || 'Spitalizare',
        hospitalId: hospitalId,
        status: event.EventType || 'Accepted',
        startDateAndTime: convertDateToString(event.StartTime),
        endDateAndTime: convertDateToString(event.EndTime)
    }
}

export const mapActivitesForScheduler = (activities, city, hospitals) => {
    return activities.map(activity => mapActivityToSchedulerEvent(activity, city, hospitals))
}