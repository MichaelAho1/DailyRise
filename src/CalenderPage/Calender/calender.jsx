import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const TaskCalendar = () => {
  const [events, setEvents] = useState([
    { title: "Sample Task", date: "2025-02-10" },
    { title: "Sample Task", date: "2025-02-15" },
  ]);

  const handleDateClick = (info) => {
    const task = prompt(`Enter task for ${info.dateStr}`);
    if (task) {
      setEvents([...events, { title: task, date: info.dateStr }]);
    }
  };

  return (
    <>
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick} 
        />
        
    </>
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
