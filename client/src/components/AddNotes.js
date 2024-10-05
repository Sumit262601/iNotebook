import React, { useContext, useState } from 'react';
import contextValue from '../context/notes/noteContext';
import NotesForm from '../Content/NotesForm';
import toast from 'react-hot-toast';

const AddNotes = (props) => {
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const context = useContext(contextValue);
  const { addNote } = context;

  const handleClick = (e) => {
    e.preventDefault();

    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      props.showAlert('Login Please!', 'error'); // Show alert if not logged in
      return; // Exit the function
    }

    // Use toast.promise for the addNote operation
    toast.promise(
      addNote(note.title, note.description, note.tag), // Call addNote
      {
        pending: 'Adding note...',
        success: 'Note added successfully!', // Success message as string
        error: (error) => error.error || 'Failed to add note.', // Error message as string
      }
    );
    // Clear the form after the toast is triggered
    setNote({ title: '', description: '', tag: '' });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className='px-5 sm:px-10 lg:px-20'>
      <h1 className='text-center text-2xl md:text-3xl text-[#3B4B76] lg:text-4xl mb-6'>Add Notes</h1>

      <form className='px-2 md:px-5' onSubmit={handleClick}>
        <div className="w-full mb-4 border border-gray-200 rounded-md bg-gray-50 dark:bg-[#4D869C] dark:border-gray-600">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
            <NotesForm />
          </div>
          <div className="bg-[#ffffff] py-2 rounded-md">
            <input
              type='text'
              id='title'
              name='title'
              className='w-full p-2 focus:outline-none'
              value={note.title}
              onChange={onChange}
              minLength={5}
              placeholder='Title'
              required
            />

            <textarea
              id="description"
              name="description"
              rows="10"
              className='w-full p-2 focus:outline-none'
              value={note.description}
              onChange={onChange}
              placeholder='Write an article...'
              minLength={5}
              required
            />

            <input
              type="text"
              className='w-full p-2 focus:outline-none'
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
              placeholder='Tags'
              required
            />
          </div>
        </div>
        <button
          type='submit'
          className='bg-[#4D869C] text-white px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
