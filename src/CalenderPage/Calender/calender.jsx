import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from './Calendar.module.css';
import TaskModal from '../TaskModal/TaskModal.jsx';

const TaskCalendar = () => {
  const [events, setEvents] = useState([
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
      extended: false,
      id: Date.now().toString(),  
    };
    setEvents([...events, newEvent]);

    setIsModalOpen(false);  
  };

  const deleteTask = (taskId) => {
    setEvents(events.filter(event => event.id !== taskId));
  };

  const toggleEventExpansion = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, extended: !event.extended } : event
    ));
  };

  const formattedDate = selectedDate
    ? new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(selectedDate))
    : '';

  return (
    <>
      {isModalOpen && (
        <TaskModal
          selectedDate={formattedDate}
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
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();  
                  deleteTask(eventInfo.event.id);
                }}
              >
                ❌
              </button>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default TaskCalendar;

