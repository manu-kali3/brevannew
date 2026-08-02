import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import CtaSection from "@/components/CtaSection";
import { listEvents } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events, workshops and trainings hosted by Brevan Softwares in Kenya. Digital skills, AI bootcamps and community tech meetups.",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function EventsPage() {
  const events = await listEvents();

  return (
    <>
      <PageHeading title="Events" />
      <section className="events-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading">
                <h6>Upcoming</h6>
                <h4>Events &amp; Workshops</h4>
              </div>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="row">
              <div className="col-lg-12">
                <div className="events-empty">
                  <p>No events scheduled right now. Check back soon!</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
                <article className="event-card" key={event.id}>
                  <div className="event-thumb">
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.title} />
                    ) : (
                      <div className="event-thumb-fallback">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                    )}
                  </div>
                  <div className="event-body">
                    <div className="event-date">
                      <i className="fas fa-calendar-alt"></i> {formatDate(event.event_date)}
                      {event.event_time ? ` at ${event.event_time}` : ""}
                    </div>
                    <h4>{event.title}</h4>
                    {event.venue && (
                      <p className="event-venue">
                        <i className="fas fa-map-marker-alt"></i> {event.venue}
                      </p>
                    )}
                    {event.description && (
                      <p className="event-desc">{event.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
