import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from './Calendar.module.css';

const TaskCalendar = () => {
  const [events, setEvents] = useState([
    { title: "Sample Task", date: "2025-02-10", extended: false },
    { title: "Sample Task", date: "2025-02-15", extended: false },
  ]);

  const handleDateClick = (info) => {
    const task = prompt(`Enter task for ${info.dateStr}`); //change later to modal
    if (task) {
      setEvents([...events, { title: task, date: info.dateStr, extended: false }]);
    }
  };

  const toggleEventExpansion = (eventId) => {
    setEvents(events.map(event => 
      event.date === eventId ? { ...event, extended: !event.extended } : event
    ));
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        eventContent={(eventInfo) => (
          <div
            className={`${styles.eventContent} ${eventInfo.event.extended ? styles.expanded : ''}`}
            onClick={() => toggleEventExpansion(eventInfo.event.id)}
          >
            <span className={styles.eventTitle}>{eventInfo.event.title}</span>
          </div>
        )}
      />
    </div>
  );
};

export default TaskCalendar;

/*
{isModalOpen && (
    <TaskModal toggleModal={toggleModal} setTasks={setTasks} tasks={tasks} />
)}
        const [isModalOpen, setIsModalOpen] = useState(false);
        const toggleModal = () => {
            setIsModalOpen(!isModalOpen);
        };
*/
