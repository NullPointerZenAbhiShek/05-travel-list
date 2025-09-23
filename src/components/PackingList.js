import { useState } from "react";
import Item from "./Item";
//PackingList component
export default function PackingList({
  item,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = item;
  if (sortBy === "description")
    sortedItems = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = item.slice().sort((a, b) => a.packed - b.packed);
  if (sortBy === "quantity")
    sortedItems = item.slice().sort((a, b) => a.quantity - b.quantity);
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {/* <option value="sort">Sort by...</option> */}
          <option value="description">Description</option>
          <option value="packed">Packed status</option>
          <option value="quantity">Quantity</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
