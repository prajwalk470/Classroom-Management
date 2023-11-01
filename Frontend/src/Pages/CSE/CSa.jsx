import React, { useState, useEffect } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const timetable = {
  Monday: [
    { id: 1, name: 'Operating System', startTime: '7:00 PM', endTime: '7:07 PM' },
    { id: 2, name: 'CNC', startTime: '10:00 AM', endTime: '11:15 AM' }
  ],
  Tuesday: [
    { id: 3, name: 'Operating systems', startTime: '09:00 AM', endTime: '9:55 AM' },
    { id: 4, name: 'Computer Networks', startTime: '9:55 AM', endTime: '10:50 AM' },
    { id: 5, name: 'Break', startTime: '10:50 AM', endTime: '11:00 AM' },
    { id: 6, name: 'Computer Networks', startTime: '11:00 AM', endTime: '12:05 AM' }
  ],
  Wednesday: [
    { id: 7, name: 'Operating systems', startTime: '05:00 PM', endTime: '06:00 PM' },
    { id: 8, name: 'Database Management Systems', startTime: '07:00 PM', endTime: '08:00 PM' },
    { id: 9, name: 'Break', startTime: '08:01 PM', endTime: '09:00 PM' },
    { id: 10, name: 'Computer Networks', startTime: '09:10 PM', endTime: '10:05 PM' },
    // { id: 11, name: 'CNC', startTime: '10:00 PM', endTime: '11:15 AM' }
    // Add classes for Thursday, and Friday similarly
  ]
};

const CSa = () => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentClassIndex, setCurrentClassIndex] = useState(0);

  const getCurrentDay = () => {
    const currentDate = new Date();
    return days[currentDate.getDay() - 1]; // Adjusted to start from Monday as the first day
  };
  const currentDay = getCurrentDay();

  const updateClassProgress = () => {
    const currentTime = new Date();
    const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    let currentClass = null;
    for (const classItem of timetable[currentDay]) {
      if (currentTimeStr >= classItem.startTime && currentTimeStr <= classItem.endTime) {
        currentClass = classItem;
        break;
      }
    }

    if (currentClass) {
      const classStartTime = new Date(currentTime.toDateString() + ' ' + currentClass.startTime);
      const classEndTime = new Date(currentTime.toDateString() + ' ' + currentClass.endTime);

      const timeElapsed = currentTime - classStartTime;
      const classDuration = classEndTime - classStartTime;
      const timeRemaining = Math.max(0, classDuration - timeElapsed);
      const progress = ((classDuration - timeRemaining) / classDuration) * 100;

      const currentClassIndex = getCurrentClassIndex(new Date(), currentDay);

      setCurrentClassIndex(currentClassIndex);
      setProgress(progress);
      setTimeRemaining(timeRemaining);
    } else {     
        const nextClassIndex = getNextClassIndex(currentTime, currentDay);
        setCurrentClassIndex(nextClassIndex);
        // console.log(nextClassIndex);
      
    }
  };

  useEffect(() => {
    const progressInterval = setInterval(updateClassProgress, 1000);
    return () => clearInterval(progressInterval);
  }, [currentClassIndex, currentDay]);

  const getNextClassIndex = (currentTime, currentDay) => {
    const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    for (let i = 0; i < timetable[currentDay].length; i++) {
      if (currentTimeStr < timetable[currentDay][i].startTime) {
        return i;
      }
    }

    return -1; // No upcoming classes
  };
  const getCurrentClassIndex = (currentTime, currentDay) => {
    const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
    for (let i = 0; i < timetable[currentDay].length; i++) {
      if (currentTimeStr >= timetable[currentDay][i].startTime && currentTimeStr <= timetable[currentDay][i].endTime) {
        return i; // The current class is within this time slot
      }
    }
  
    return -1; // No ongoing class right now
  };

    const allClass= timetable[currentDay];
    const currentClass = currentClassIndex !== -1 ? allClass[currentClassIndex] : null;
    const upcomingClasses = currentClassIndex !== -1 ? allClass.slice(currentClassIndex) : [];
  
  const completedClasses = allClass.filter(classItem => (
    classItem !== currentClass && !upcomingClasses.includes(classItem)
  ));
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Class Schedule</h1>

      <h2 className="text-xl font-semibold mb-2">Today's Schedule: {currentDay}</h2>
      {/* Progress bar  */}
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
        {timeRemaining > 0 ? (
          <div className="bg-blue-500 text-white p-4 rounded-md">
            <p className="font-semibold">Class Name: {timetable[currentDay][currentClassIndex].name}</p>
            <p>Time Remaining: {formatTime(timeRemaining)}</p>
          </div>
        ) : (
          <p>No live class right now.</p>
        )}
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 sm:gap-x-5 md:gap-x-5 mx-4">
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Time Table</h2>
        <ul className="space-y-2">
          {allClass.map((cls, index) => (
            <li key={index} className="bg-white p-2 rounded-md shadow-md">
              <p className="font-semibold">{cls.name}</p>
              <p>{cls.startTime} - {cls.endTime}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="container mx-auto p-4">
      <div className="mt-4">
  <h2 className="text-xl font-semibold mb-2">Upcoming Classes</h2>
  {upcomingClasses.length > 0 ? (
    <ul className="space-y-2">
      {upcomingClasses.map((cls, index) => (
        <li key={index} className="bg-white p-2 rounded-md shadow-md">
          <p className="font-semibold">{cls.name}</p>
          <p>{cls.startTime} - {cls.endTime}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No upcoming classes.</p>
  )}
</div>
</div>
<div className="mt-4">
  <h2 className="text-xl font-semibold mb-2">Completed Classes</h2>
  {completedClasses.length > 0 ? (
    <ul className="space-y-2">
      {completedClasses.map((cls, index) => (
        <li key={index} className="bg-white p-2 rounded-md shadow-md">
          <p className="font-semibold">{cls.name}</p>
          <p>{cls.startTime} - {cls.endTime}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No upcoming classes.</p>
  )}
</div>
  
    </div>
    </div>
  );
};

function formatTime(time) {
  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time / 1000) % 60);
  return `${minutes} min ${seconds} sec`;
}

export default CSa;
