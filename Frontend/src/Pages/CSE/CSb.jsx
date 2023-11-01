import React, { useState, useEffect } from 'react';

function CSb() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'OS', duration: 60 }, 
    { id: 2, title: 'DBMS', duration: 120 },
    { id: 3, title: 'CNC', duration: 180 },
  ]);

  const [currentTask, setCurrentTask] = useState(tasks[0]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [remainingTime, setRemainingTime] = useState(currentTask.duration);
  const upcomingTasks = tasks.filter((task) => task.id !== currentTask.id);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          const completedTask = tasks.find((task) => task.id === currentTask.id);
          setCompletedTasks([completedTask, ...completedTasks]);

          const nextTask = tasks.find((task) => task.id !== currentTask.id);
          setCurrentTask(nextTask);

          setTasks(tasks.filter((task) => task.id !== completedTask.id));

          return nextTask.duration;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks, currentTask, completedTasks]);

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-3xl font-semibold mb-6">Class Tracker</h1>
  <div className="flex flex-col">
    <div className="w-full">
      <TaskDisplay task={currentTask} remainingTime={remainingTime} />
    </div>
    <div className="w-full">
      <div className="text-xl font-semibold mb-4">Upcoming Classes</div>
      <TaskList tasks={upcomingTasks} currentTask={currentTask} />
    </div>
  </div>
    <div className="completed-tasks">
       <div className="text-xl font-semibold mb-4">Completed Classes</div>
          <TaskList tasks={completedTasks} />
    </div>
</div>
  );
}

function TaskDisplay({ task, remainingTime }) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
    <h3 className="text-xl font-semibold mb-2">Current Class</h3>
    <p className="text-lg font-medium mb-4">{task.title}</p>
    <p className="text-sm text-gray-500">Time Remaining: {formatTime(remainingTime)}</p>
  </div>
  );
}

function TaskList({ tasks, currentTask }) {
  return (
    <ul className="mt-6 space-y-2">
    {tasks.map((task) => (
      <li
        key={task.id}
        className={`border p-3 rounded-lg ${
          task.id === currentTask?.id ? 'bg-blue-100' : 'bg-white'
        }`}
      >
        {task.title}
      </li>
    ))}
  </ul>
  );
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes} min ${seconds} sec`;
}

export default CSb;
