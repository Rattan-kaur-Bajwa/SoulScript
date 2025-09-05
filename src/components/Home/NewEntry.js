import React, { useState } from 'react';
import './NewEntry.css';

const NewEntry = () => {
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ desc }),
    });
    if (response.ok) {
      setDesc('');
      // You can also redirect or update state to show the new entry
    } else {
      console.error('Failed to add entry');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="text">
          <textarea
            id='desc'
            placeholder='Enter Text Here'
            name='desc'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button type='submit'>ADD</button>
      </form>
    </div>
  );
};

export default NewEntry;
