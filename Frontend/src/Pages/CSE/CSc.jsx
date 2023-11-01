import React, { useState, useEffect } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const timetable = {
  Monday: [
    { name: 'Operating System', startTime: '7:00 PM', endTime: '7:07 PM' },
    { name: 'CNC', startTime: '10:00 AM', endTime: '11:15 AM' },
  ],
  Tuesday: [
    { name: 'Operating systems', startTime: '09:00 AM', endTime: '9:55 AM' },
    { name: 'Computer Networks', startTime: '9:55 AM', endTime: '10:50 AM' },
    { name: 'Break', startTime: '10:50 AM', endTime: '11:00 AM' },
    { name: 'Computer Networks', startTime: '11:00 AM', endTime: '12:05 AM' },
  ],
  Wednesday: [
    { name: 'Operating systems', startTime: '09:00 AM', endTime: '9:55 AM' },
    { name: 'Computer Networks', startTime: '9:55 AM', endTime: '10:50 AM' },
    { name: 'Break', startTime: '10:40 AM', endTime: '11:00 AM' },
    { name: 'Computer Networks', startTime: '11:00 AM', endTime: '12:05 AM' },
  ],
  // Add classes for Thursday, and Friday similarly
};

const CSc = () => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentClassIndex, setCurrentClassIndex] = useState(0);
  const currentDay = getCurrentDay();
  const [completedClasses, setCompletedClasses] = useState([]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      updateClassProgress(currentDay, currentClassIndex, setProgress, setTimeRemaining, setCurrentClassIndex);
    }, 1000);
    return () => clearInterval(progressInterval);
  }, [currentClassIndex, currentDay]);

  const upcomingClasses = timetable[currentDay].slice(currentClassIndex + 1);
  const liveClass = upcomingClasses[0]; 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Class Schedule</h1>

      <h2 className="text-xl font-semibold mb-2">Today's Schedule: {currentDay}</h2>

      <div className="bg-gray-200 w-full h-6 rounded-md">
        <div
          className="h-full text-center text-white bg-green-500 rounded-md"
          style={{ width: `${progress}%` }}
        >
          {progress.toFixed(2)}%
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Live Class</h2>
        {liveClass && timeRemaining > 0 ? (
          <div className="bg-blue-500 text-white p-4 rounded-md">
            <p className="font-semibold">Class Name: {liveClass.name}</p>
            <p>Time Remaining: {formatTime(timeRemaining)}</p>
          </div>
        ) : (
          <p>No live class right now.</p>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Time Table</h2>
        <ul className="space-y-2">
          {upcomingClasses.map((cls, index) => (
            <li key={index} className="bg-white p-2 rounded-md shadow-md">
              <p className="font-semibold">{cls.name}</p>
              <p>{cls.startTime} - {cls.endTime}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Completed Classes</h2>
        <ul className="space-y-2">
          {completedClasses.map((cls, index) => (
            <li key={index} className="bg-white p-2 rounded-md shadow-md">
              <p className="font-semibold">{cls.name}</p>
              <p>{cls.startTime} - {cls.endTime}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function formatTime(time) {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time / 1000) % 60);
  return `${minutes} min ${seconds} sec`;
}

function getCurrentDay() {
  const currentDate = new Date();
  return days[currentDate.getDay() - 1]; // Adjusted to start from Monday as the first day
}

function updateClassProgress(currentDay, currentClassIndex, setProgress, setTimeRemaining, setCurrentClassIndex) {
  const currentTime = new Date();
  const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  if (currentDay && currentClassIndex && timetable[currentDay] && timetable[currentDay][currentClassIndex]) {
    if (currentTimeStr < timetable[currentDay][currentClassIndex].startTime) {
      const classStartTime = new Date(currentTime.toDateString() + ' ' + timetable[currentDay][currentClassIndex].startTime);
      const classEndTime = new Date(currentTime.toDateString() + ' ' + timetable[currentDay][currentClassIndex].endTime);

      const timeElapsed = currentTime - classStartTime;
      const classDuration = classEndTime - classStartTime;
      const timeRemaining = Math.max(0, classDuration - timeElapsed);
      const progress = ((classDuration - timeRemaining) / classDuration) * 100;
      setProgress(progress);
      setTimeRemaining(timeRemaining);
    } else {
      const nextClassIndex = getNextClassIndex(currentTime, currentDay);
      if (nextClassIndex !== -1) {
        setCurrentClassIndex(nextClassIndex);
      } else {
        const nextDay = getNextDay(currentDay);
        if (nextDay) {
          // setCurrentDay(nextDay);
          setCurrentClassIndex(0);
        }
      }
    }
  }
}

function getNextClassIndex(currentTime, currentDay) {
  const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  for (let i = 0; i < timetable[currentDay].length; i++) {
    if (currentTimeStr < timetable[currentDay][i].startTime) {
      return i;
    }
  }
  return -1; // No upcoming classes
}

function getNextDay(currentDay) {
  const currentIndex = days.indexOf(currentDay);
  if (currentIndex === -1 || currentIndex === 4) {
    return null; // No more days
  }
  return days[currentIndex + 1];
}

export default CSc;
