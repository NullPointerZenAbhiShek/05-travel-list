import { useState } from "react";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Logo from "./components/Logo";
import Status from "./components/Status";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charget", quantity: 1, packed: false },
// ];

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
  //function to handle toggle item
  function handleToggle(id) {
    setItem((item) =>
      item.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  //function to handle clear list
  function handelClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (confirmed) setItem([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddNewItem={handleItem} />
      <PackingList
        item={item}
        onDeleteItem={handleDelete}
        onToggleItem={handleToggle}
        onClearList={handelClearList}
      />
      <Status items={item} />
    </div>
  );
}
