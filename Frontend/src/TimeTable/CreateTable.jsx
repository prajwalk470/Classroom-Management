import React, { useState } from 'react';
import axios from 'axios';

const CreateTable = () => {
  const [branch, setBranch] = useState('');
  const [timetableEntries, setTimetableEntries] = useState([
    {
      branch: '',
      dayOfWeek: 'Monday',
      classes: [{ id: '', name: '', startTime: '', endTime: '' }],
    },
  ]);

  const addDay = () => {
    setTimetableEntries((prevEntries) => [
      ...prevEntries,
      { dayOfWeek: 'Tuesday', classes: [{ id: '', name: '', startTime: '', endTime: '' }] },
    ]);
  };

  const addClass = (index) => {
    setTimetableEntries((prevEntries) => {
      const newEntries = [...prevEntries];
      newEntries[index].classes.push({ id: '', name: '', startTime: '', endTime: '' });
      return newEntries;
    });
  };
  const updateBranch = (value) => {
    setBranch(value);
    setTimetableEntries((prevEntries) => {
      return prevEntries.map((entry, index) => {
        if (index === 0) {
          // Update the branch in the first entry
          return { ...entry, branch: value };
        }
        return entry;
      });
    });
  };
  const updateInput = (index, classIndex, field, value) => {
    setTimetableEntries((prevEntries) => {
      const newEntries = [...prevEntries];

      if (field === 'dayOfWeek') {
        newEntries[index].dayOfWeek = value;
      } else {
        newEntries[index].classes[classIndex][field] = value;
      }

      return newEntries;
    });
  };

  const createEntries = async () => {
    try {
      const entries = timetableEntries.map((entry) => ({
        dayOfWeek: entry.dayOfWeek,
        classes: entry.classes,
      }));

      const nonEmptyEntries = entries.filter((entry) => entry.classes.length > 0);

      if (nonEmptyEntries.length === 0) {
        console.log('No classes to submit.');
        return;
      }

      // Add the branch separately only once
      const entriesWithBranch = [
        {
          branch,
          timetable: nonEmptyEntries,
        }
      ];
      // console.log(entriesWithBranch);
      await axios.post('http://localhost:5555/expr', entriesWithBranch[0]);
      console.log(entriesWithBranch[0]);
      console.log('Timetable entries created successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create Timetable Entries</h1>
      <label className="block mb-2 font-semibold">
            Branch:
            <input
              type="text"
              name="branch"
              value={branch}
              onChange={(e) =>  updateBranch(e.target.value)} 
              className="border px-3 py-2 w-full mt-1"
            />
          </label>
      {timetableEntries.map((entry, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
          
          <label className="block mb-2 font-semibold">
            Day:
            <input
              type="text"
              name="dayOfWeek"
              value={entry.dayOfWeek}
              onChange={(e) => updateInput(index, 0, 'dayOfWeek', e.target.value)}
              className="border px-3 py-2 w-full mt-1"
            />
          </label>
          {entry.classes.map((classItem, classIndex) => (
            <div key={classIndex} className="mb-2">
              <label className="block mb-1 font-semibold">
                Index:
                <input
                  type="number"
                  name="id"
                  value={classItem.id}
                  onChange={(e) => updateInput(index, classIndex, 'id', e.target.value)}
                  className="border px-3 py-2 w-full mt-1"
                />
              </label>
              <label className="block mb-1 font-semibold">
                Class Name:
                <input
                  type="text"
                  name="name"
                  value={classItem.name}
                  onChange={(e) => updateInput(index, classIndex, 'name', e.target.value)}
                  className="border px-3 py-2 w-full mt-1"
                />
              </label>
              <label className="block mb-1 font-semibold">
                Start Time:
                <input
                  type="text"
                  name="startTime"
                  value={classItem.startTime}
                  onChange={(e) => updateInput(index, classIndex, 'startTime', e.target.value)}
                  className="border px-3 py-2 w-full mt-1"
                />
              </label>
              <label className="block mb-1 font-semibold">
                End Time:
                <input
                  type="text"
                  name="endTime"
                  value={classItem.endTime}
                  onChange={(e) => updateInput(index, classIndex, 'endTime', e.target.value)}
                  className="border px-3 py-2 w-full mt-1"
                />
              </label>
            </div>
          ))}
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => addClass(index)}>
            Add Class
          </button>
        </div>
      ))}
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addDay}>
        Add Day
      </button>
      <button className="bg-green-500 text-white px-4 mx-4 py-2 rounded" onClick={createEntries}>
        Create Timetable Entries
      </button>
    </div>
  );
};

export default CreateTable;
