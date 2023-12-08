// ShowTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sdebar';

// Import statements...

const ShowTable = () => {
  const [data, setTable] = useState([]);
  const [selectedTimetableIndex, setSelectedTimetableIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  useEffect(() => {
    axios
      .get('http://localhost:5555/expr')
      .then((response) => {
        const timetables = response.data.data.map((item) => ({
          branch: item.branch,
          timetable: item.timetable,
        }));
        setTable(timetables);
        console.log(timetables);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Define time slots for the columns
  const timeSlots = [
    '09:00 AM - 09:55',
    '09:55 AM - 10:50 AM',
    '11:10 AM - 12:05 PM',
    '01:00 PM - 01:55 PM',
    '01:55 PM - 2:50 PM',
    '02:50 PM - 3:40 PM',
  ];

  const getClassForTimeSlot = (timetables, branch, day, timeSlot) => {
    // Find the timetable for the selected branch
    const timetable = timetables.find((item) => item.branch === branch)?.timetable;

    // If timetable is found, proceed to find the class
    if (timetable) {
      // Find a matching class in the current day's classes
      const matchingClass = timetable.find((item) => item.dayOfWeek === day)?.classes.find(
        (lecture) => {
          const startTime = lecture.startTime;
          return startTime === timeSlot.slice(0, 8);
        }
      );

      // If a matching class is found, return its name
      if (matchingClass) {
        return matchingClass.name;
      }
    }

    // If no matching class is found, return an empty string
    return '';
  };

  return (
    <div className="flex">
      <Sidebar fixed/>
      <div className="flex-1 p-7 overflow-y-auto ml-80 mr-10 ">
      <h1 class="text-3xl font-light mb-4 text-center">TimeTable </h1>
        {data.map((item, index) => (
          <div
            key={index}
            className={`border rounded p-4 transition duration-300 ease-in-out transform hover:scale-102 hover:bg-gray-100 mt-10${
              selectedTimetableIndex === index ? 'bg-gray-200' : ''
            }`}
          >
            <h2 className="text-lg font-semibold mb-2 underline">Branch: {item.branch}</h2>
            <table className="w-full">
              {/* ... Table header ... */}
              <thead>
                <tr>
                  <th className="py-2">Day</th>
                  {timeSlots.map((timeSlot, timeSlotIndex) => (
                    <th key={timeSlotIndex} className="py-2">
                      {timeSlot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <React.Fragment key={day}>
                    <tr
                      className={`cursor-pointer ${
                        selectedTimetableIndex === index ? 'bg-gray-200' : ''
                      } hover:translate-y-1 hover:shadow-md`}
                      onClick={() => {
                        setSelectedTimetableIndex(index);
                        setSelectedDay(selectedDay === day ? null : day);
                      }}
                    >
                      <td className="py-2 hover:bg-gray-100 hover:font-bold rounded p-4 transition duration-300 ease-in-out transform hover:shadow-lg">{day}</td>
                      {timeSlots.map((timeSlot, timeSlotIndex) => (
                        <td key={timeSlotIndex} className="py-2">
                          {getClassForTimeSlot(data, item.branch, day, timeSlot)}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTable;
