export const convertDateToString = (date) => {
    if (typeof date === "string") {
        date = new Date(date);
    }
    var d = new Date(date.getTime());
    console.log(d);
    d.setHours(d.getHours() + 3);
    let index = d.toISOString().indexOf(".");
    console.log(d.toISOString().replace("T", " ").slice(0, index));
    return d.toISOString().replace("T", " ").slice(0, index);
};

export const mapActivityToSchedulerEvent = (activity, city, hospitals) => {
    return {
        Id: activity.id,
        Subject: activity.title,
        Description: activity.description,
        City: city || "Cluj-Napoca",
        Category: activity.category || "Other",
        Location: "Cluj-Napoca",
        EventType: activity.status || "Accepted",
        IsAllDay: false,
        StartTime: new Date(activity.startDateAndTime),
        EndTime: new Date(activity.endDateAndTime)
    };
};

export const mapSchedulerEventToActivity = (event, hospitals) => {
    return {
        id: event.Id,
        title: event.Subject,
        description: event.Description || "",
        category: event.Category || "Other",
        hospitalId: 1,
        status: event.EventType || "Accepted",
        startDateAndTime: convertDateToString(event.StartTime),
        endDateAndTime: convertDateToString(event.EndTime)
    };
};

export const mapActivitesForScheduler = (activities, city, hospitals) => {
    return activities.map((activity) => mapActivityToSchedulerEvent(activity, city, hospitals));
};
