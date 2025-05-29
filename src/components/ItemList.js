import React from "react";

export default function ItemList({ items, onItemChange, onAddItem, onRemoveItem, inputStyle, labelStyle }) {
  return (
    <section style={{ marginBottom: 40, padding: 20, border: "1px solid #ddd", borderRadius: 8, backgroundColor: "#f9f9f9" }}>
      <h2 style={{ marginBottom: 20 }}>Invoice Items</h2>
      {items.map((item, idx) => (
        <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 15, gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
            <label htmlFor={`description-${idx}`} style={labelStyle}>Description</label>
            <input id={`description-${idx}`} type="text" name="description" placeholder="Item name" value={item.description} onChange={(e) => onItemChange(idx, e)} style={{ ...inputStyle, maxWidth: 160 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
            <label htmlFor={`quantity-${idx}`} style={labelStyle}>Quantity</label>
            <input id={`quantity-${idx}`} type="number" name="quantity" placeholder="0" value={item.quantity} onChange={(e) => onItemChange(idx, e)} min="0" style={{ ...inputStyle, maxWidth: 80 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
            <label htmlFor={`unitPrice-${idx}`} style={labelStyle}>Unit Price</label>
            <input id={`unitPrice-${idx}`} type="number" name="unitPrice" placeholder="0.00" value={item.unitPrice} onChange={(e) => onItemChange(idx, e)} min="0" style={{ ...inputStyle, maxWidth: 100 }} />
          </div>
          <button onClick={() => onRemoveItem(idx)} style={{ backgroundColor: "#ff4d4f", border: "none", color: "white", padding: "8px 12px", cursor: "pointer", borderRadius: 4, fontWeight: "bold" }}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={onAddItem} style={{ backgroundColor: "#1890ff", color: "white", padding: "10px 20px", border: "none", borderRadius: 5, fontSize: 16, cursor: "pointer" }}>
        + Add Item
      </button>
    </section>
  );
}
