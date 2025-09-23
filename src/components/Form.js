import { useState } from "react";
//Form component
export default function Form({ onAddNewItem }) {
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
  const arr = Array.from({ length: 10 }, (_, i) => i + 1);
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
