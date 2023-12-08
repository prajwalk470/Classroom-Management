import React, { useState, useEffect } from 'react';
import Spinner from '../../Components/Spinner';
import axios from 'axios';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const CSa = () => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentClassIndex, setCurrentClassIndex] = useState(0);
  const [resp, setTable] = useState([]);
  const getCurrentDay = () => {
    const currentDate = new Date();
    return days[currentDate.getDay() - 1]; // Adjusted to start from Monday as the first day
  };
  const currentDay = getCurrentDay();

  useEffect(() => {
    axios.get('http://localhost:5555/schedule')
      .then((response) => {
        console.log(response.data.data[0][currentDay]);
        setTable(response.data.data[0]); // Assuming the response is an object with day-wise data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const schedule = {};
  
  for (const day in resp) {
    if (day !== '_id' && day !== '__v') {
      schedule[day] = resp[day].map(item => ({
        id: item.id,
        name: item.name,
        startTime: item.startTime,
        endTime: item.endTime
      }));
    }
  }
  

  const timetable = schedule[currentDay];
  // console.log(timetable);
  const arr = [];

  for (const key in timetable) {
    if (timetable.hasOwnProperty(key)) {
      const item = timetable[key];
      arr.push(item);
    }
  }

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
// Determine the current class based on the current class index
const currentClass =
  currentClassIndex >= 0 && currentClassIndex < allClass.length
    ? allClass[currentClassIndex]
    : null;

// Filter upcoming classes based on their start times being after the current time

// console.log(currentTime);

// const upcomingClasses = Array.isArray(allClass)
// ? allClass.filter(classItem => 
//   new Date(classItem.startTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true}) >currentTime && classItem!==currentClass):[];
// console.log(upcomingClasses
// const completedClasses =
//   Array.isArray(allClass)
//     ? allClass.filter(
//         classItem => classItem!== currentClass &&
//           !(upcomingClasses.includes(classItem))
//       )
//     : [];
// const currentTime = new Date().getTime();
function convertTimeStringToTimestamp(timeString) {
  const [time, period] = timeString.split(' ');

  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  const timestamp = new Date().setHours(hours, minutes, 0, 0);
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}
const currentTime = new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true});

const { upcomingClasses, completedClasses } = (Array.isArray(allClass)
  ? allClass.reduce(
      (result, classItem) => {
        const classStartTime = convertTimeStringToTimestamp(classItem.startTime);
        const classEndTime = convertTimeStringToTimestamp(classItem.endTime);
        console.log(classStartTime) ;
        if (classItem === currentClass || classStartTime > currentTime) {
          result.upcomingClasses.push(classItem);
        } else if (classEndTime < currentTime) {
          result.completedClasses.push(classItem);
        }

        return result;
      },
      { upcomingClasses: [], completedClasses: [] }
    )
  : { upcomingClasses: [], completedClasses: [] });

// console.log("Upcoming Classes:", upcomingClasses);
// console.log("Completed Classes:", completedClasses);

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
            <p className="font-semibold">Class Name: {timetable[currentClassIndex].name}</p>
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

export default CSa;
