import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/items') 
      .then((res) => setItems(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/items', { name, description })
      .then(() => {
        setItems([...items, { name, description }]);
        setName('');
        setDescription('');
      })
      .catch(err => console.error("Add error:", err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MERN App (via Docker)</h1>
      <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}: {item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
