'use client'
import React, { useState } from 'react';

const Yash = () => {
  // State variables for task input fields
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // State variables for tasks
  const [mainTask, setMainTask] = useState([]);

  // State variables for update modal
  const [updateIndex, setUpdateIndex] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");

  // Function to handle form submission and add task
  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    setTitle("");
    setDesc("");
  }

  // Function to handle task deletion
  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  }

  // Function to handle task update
  const handleUpdate = () => {
    if (updateIndex !== null) {
      const updatedTask = [...mainTask];
      updatedTask[updateIndex].title = updatedTitle;
      updatedTask[updateIndex].desc = updatedDesc;
      setMainTask(updatedTask);
      setUpdateIndex(null);
      setUpdatedTitle("");
      setUpdatedDesc("");
    }
  };

  // Function to handle opening the update modal
  const updateHandler = (i) => {
    setUpdateIndex(i);
    setUpdatedTitle(mainTask[i].title);
    setUpdatedDesc(mainTask[i].desc);
  };

  // JSX for rendering the component
  return (
    <div>
      <h1 className='bg-black p-5 text-white text-5xl font-bold text-center'>Yash Todo list</h1>

      {/* Form for adding tasks */}
      <form onSubmit={submitHandler}>
        <input type="text" className='border-zinc-800 border-2 m-5 p-2' placeholder='Enter title here' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" className='border-zinc-800 border-2 m-5 p-2' placeholder='Enter description here' value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button className='bg-black text-white px-4 py-2 text-2xl font-bold rounded m-5'>Add task here</button>
      </form>
      <hr />

      {/* List of tasks */}
      <div className='p-8 bg-slate-200'>
        {mainTask.length === 0 ? (
          <h2>No Task Available</h2>
        ) : (
          <ul>
            {mainTask.map((t, i) => (
              <li key={i} className='flex items-center justify-between mb-4'>
                <div className='flex justify-between mb-5 w-1/2'>
                  <h5 className='text-2xl font-semibold'>{t.title}</h5>
                  <h5 className='text-2xl font-semibold'>{t.desc}</h5>
                </div>
                <button onClick={() => deleteHandler(i)} className='bg-red-400 text-white px-4 py-4 rounded bold'>Delete</button>
                <button onClick={() => updateHandler(i)} className='bg-green-400 text-white px-4 py-4 rounded bold'>Update</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Update modal */}
      {updateIndex !== null && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className='border-zinc-800 border-2 m-5 p-2'
              placeholder='Enter updated title here'
            />
            <input
              type="text"
              value={updatedDesc}
              onChange={(e) => setUpdatedDesc(e.target.value)}
              className='border-zinc-800 border-2 m-5 p-2'
              placeholder='Enter updated description here'
            />
            <button onClick={handleUpdate} className='bg-green-400 text-white px-4 py-2 text-2xl font-bold rounded m-5'>Update</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Yash;
