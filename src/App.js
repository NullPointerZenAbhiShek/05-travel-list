import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charget", quantity: 1, packed: false },
// ];
const arr = Array.from({ length: 10 }, (_, i) => i + 1);
//App component
export default function App() {
  const [item, setItem] = useState([]);
  //function to handle new item
  function handleItem(item) {
    setItem((items) => [...items, item]);
  }
  //function to handle delete item
  function handleDelete(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }
  function handleToggle(id) {
    setItem((item) =>
      item.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddNewItem={handleItem} />
      <PackingList
        item={item}
        onDeleteItem={handleDelete}
        onToggleItem={handleToggle}
      />
      <Status items={item} />
    </div>
  );
}

//Logo component
function Logo() {
  return (
    <div>
      <h1>🛫Far Away🛬</h1>
    </div>
  );
}

//Form component
function Form({ onAddNewItem }) {
  //states for form inputs
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    // don't submit if description is empty
    if (!description) return;
    // create a new item
    const newItem = { description, quantity, packed: false, id: Date.now() };

    console.log(newItem);
    onAddNewItem(newItem);
    // console.log(item);
    // clear the form
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍</h3>
      {/* in select make a value
      then onChange change the value by e.target.value  */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* onChange={(e)=>setQuantity(Number(e.target.value))}} */}
        {arr.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ item, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {item.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Status({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🏖️</em>
      </footer>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      {percentage !== 100 ? (
        <em>
          🎒You have {numItems} items on your list, and you already packed{" "}
          {numPacked} ({percentage}%)
        </em>
      ) : (
        <em>✅You are ready to go ✈ </em>
      )}
    </footer>
  );
}
