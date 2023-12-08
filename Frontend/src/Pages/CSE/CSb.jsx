import React, { useState, useEffect } from 'react';
import Spinner from '../../Components/Spinner';
import axios from 'axios';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const CSb = () => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentClassIndex, setCurrentClassIndex] = useState(0);
  const [resp, setTable] = useState([]);
  const getCurrentDay = () => {
    const currentDate = new Date();
    return days[currentDate.getDay() - 1]; // Adjusted to start from Monday as the first day
  };
  const currentDay = getCurrentDay();
  // const branch = "ece-b";
  useEffect(() => {
    axios.get(`http://localhost:5555/expr/cse-b`)
      .then((response) => {
        // console.log(response.data.data.timetable);
        setTable(response.data.data.timetable);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const currentDayTimetable = resp.find(day => day.dayOfWeek === currentDay);
  const classesForCurrentDay = currentDayTimetable ? currentDayTimetable.classes : [];
//   console.log(classesForCurrentDay);
  const schedule = {};

  // Iterate through the classes of the current day and create a schedule object
  if (currentDayTimetable) {
    schedule[currentDayTimetable.dayOfWeek] = classesForCurrentDay.map(item => ({
      id: item.id,
      name: item.name,
      startTime: item.startTime,
      endTime: item.endTime
    }));
  }
//   console.log(schedule);
  const timetable = schedule;
  // console.log(timetable);
  const arr = [];

  for (const key in timetable) {
    if (timetable.hasOwnProperty(key)) {
      const item = timetable[key];
      arr.push(...item); // Use spread operator or concat to flatten the array
    }
  }
  
//   console.log(arr);
  const updateClassProgress = () => {
    const currentTime = new Date();
    const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    // console.log(currentTimeStr);
    let currentClass = null;

    for (const classItem of arr) {
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

      const currentClassIndex = getCurrentClassIndex(currentTime);

      setCurrentClassIndex(currentClassIndex);
      setProgress(progress);
      setTimeRemaining(timeRemaining);
    } else {
      const nextClassIndex = getNextClassIndex(currentTime);
      setCurrentClassIndex(nextClassIndex);
    }
  };

  useEffect(() => {
    const progressInterval = setInterval(updateClassProgress, 1000);
    return () => clearInterval(progressInterval);
  }, [currentClassIndex, currentDay]);

  const getNextClassIndex = (currentTime) => {
    const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    for (let i = 0; i < arr.length; i++) {
      if (currentTimeStr < arr[i].startTime) {
        return i;
      }
    }
    return -1; 
  };

  const getCurrentClassIndex = (currentTime) => {
    const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    for (let i = 0; i < arr.length; i++) {
      if (currentTimeStr >= arr[i].startTime && currentTimeStr <= arr[i].endTime) {
        return i; 
      }
    }
    return -1; 
  };

  const allClass = arr;
  // console.log(allClass);
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true}); 

// Determine the current class based on the current class index
const currentClass =
  currentClassIndex >= 0 && currentClassIndex < allClass.length
    ? allClass[currentClassIndex]
    : null;

// Filter upcoming classes based on their start times being after the current time

// console.log(currentTime);

const upcomingClasses = allClass.filter(classItem => 
  new Date(classItem.startTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true}) > currentTime && classItem!==currentClass);
// console.log(upcomingClasses);
// Filter completed classes based on their start times being before the current time
// and ensuring they are not part of the upcoming classes
const completedClasses =
  Array.isArray(allClass)
    ? allClass.filter(
        classItem => classItem!== currentClass &&
        new Date(classItem.startTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true}) < currentTime &&
          !upcomingClasses.includes(classItem)
      )
    : [];

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
        {timeRemaining > 0 ? (
          <div className="bg-blue-500 text-white p-4 rounded-md">
            <p className="font-semibold">Class Name: {timetable.name}</p>
            <p>Time Remaining: {formatTime(timeRemaining)}</p>
          </div>
        ) : (
          <p>No live class right now.</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 sm:gap-x-5 md:gap-x-5 mx-4">
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Time Table</h2>
          <ul className="space-y-2">
            {Array.isArray(allClass) && allClass.map((cls, index) =>
              <li key={index} className="bg-white p-2 rounded-md shadow-md">
                <p className="font-semibold">{cls.name}</p>
                <p>{cls.startTime} - {cls.endTime}</p>
              </li>
            )}
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
            <p>No completed classes.</p>
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

export default CSb;
