import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/items').then((res) => setItems(res.data));
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/items', { name, description }).then((res) => {
      setItems([...items, res.data]);
      setName('');
      setDescription('');
    });
  };

  return (
    <div>
      <h1>MERN App</h1>
      <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}: {item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;