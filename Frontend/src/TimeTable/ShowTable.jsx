// ShowTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sdebar';

const ShowTable = () => {
  const [data, setTable] = useState([]);
  const [selectedTimetableIndex, setSelectedTimetableIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5555/schedule')
      .then((response) => {
        setTable(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Define time slots for the columns
  const timeSlots = [
    '09:00 AM - 09:55',
    '09:55 AM - 10:50 AM',
    '11:10 AM - 12:05 PM',
    '01:00 PM - 01:55 PM',
    '01:55 PM - 2:50 PM',
    '02:50 PM - 3:40 PM',
  ];

  const getClassForTimeSlot = (timetable, day, timeSlot) => {
    const matchingClass = timetable[day].find((lecture) => {
      const startTime = lecture.startTime;
      return startTime === timeSlot.slice(0,8);
    });

    return matchingClass ? matchingClass.name : '';
  };

  return (
    <div className="flex">
      <Sidebar fixed />
      <div className="flex-1 p-7 overflow-y-auto ml-72">
        {data.map((timetable, index) => (
          <div
            key={index}
            className={`border rounded p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 ${
              selectedTimetableIndex === index ? 'bg-gray-200' : ''
            }`}
          >
            <h2 className="text-lg font-semibold mb-2 underline">CSE Section {index + 1}</h2>
            <table className="w-full">
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
                {daysOrder.map((day) => (
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
                      <td className="py-2">
                        {day}
                      </td>
                      {timeSlots.map((timeSlot, timeSlotIndex) => (
                        <td key={timeSlotIndex} className="py-2">
                          {getClassForTimeSlot(timetable, day, timeSlot)}
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
