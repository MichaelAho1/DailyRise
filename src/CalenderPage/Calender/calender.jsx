import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from './Calendar.module.css';
import TaskModal from '../TaskModal/TaskModal.jsx';

const TaskCalendar = () => {
  const [events, setEvents] = useState([
    { title: "Sample Task", date: "2025-02-10", extended: false },
    { title: "Sample Task", date: "2025-02-15", extended: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); 
    setIsModalOpen(true);  
  };

  const addTask = (taskName, taskTime, period) => {
    if (taskName.trim() === "") return;

    const newTask = `${taskName} at ${taskTime} ${period}`;
    const newEvent = {
      title: newTask,
      date: selectedDate,
      extended: false
    };
    setEvents([...events, newEvent]);

    setIsModalOpen(false);  
  };

  const toggleEventExpansion = (eventId) => {
    setEvents(events.map(event => 
      event.date === eventId ? { ...event, extended: !event.extended } : event
    ));
  };

  return (
    <>
      {isModalOpen && (
        <TaskModal
          selectedDate={selectedDate}
          addTask={addTask}
          toggleModal={() => setIsModalOpen(false)}
        />
      )}
      <div className={styles.calendarContainer}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
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
    </>
  );
};

export default TaskCalendar;
