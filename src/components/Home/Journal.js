import React, { useState, useEffect } from 'react';
import './Journal.css'; 

const Journal = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
          const response = await fetch('http://localhost:5000/show', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          setEntries(data)
      } catch (error) {
          console.error('Failed to fetch entries:', error);
      }
  };
  fetchEntries();  
  }, []);


  const handleUpdateEntry = async (sno) => {
    const newDesc = prompt('Enter new description:');
    if (newDesc) {
      try {
        const response = await fetch(`http://localhost:5000/api/update-entry/${sno}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ desc: newDesc })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Update success:', data);
        setEntries(entries.map(entry => entry.sno === sno ? { ...entry, desc: newDesc } : entry));
      } catch (error) {
        console.error('Failed to update entry:', error);
      }
    }
  };

  const handleDeleteEntry = async (sno) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-entry/${sno}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Delete success:', data);
      setEntries(entries.filter(entry => entry.sno !== sno));
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };

  return (
    <div className="tab">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sno</th>
            <th scope="col">Description</th>
            <th scope="col">DateAdded</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <th scope="row">{entry.sno}</th>
              <td>{entry.desc}</td>
              <td>{entry.date_created}</td>
              <td className='actions'>
                  <button onClick={() => handleUpdateEntry(entry.sno)}>Update</button>
                  <button onClick={() => handleDeleteEntry(entry.sno)}>Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Journal;