import React from "react";
import EventSkeleton from "../eventSkeleton";
import EventCard from "../eventCard";

export default function RenderEvent({ events }) {
    if (!events.length) return <EventSkeleton />;
    return events.map((event) => <EventCard event={event} />);
}