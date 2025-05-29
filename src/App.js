import React, { useState } from "react";
import Invoice from "./components/Invoice";

function App() {
  const [customer, setCustomer] = useState({ name: "", company: "", email: "" });
  const [items, setItems] = useState([{ description: "", unitPrice: 0, quantity: 0 }]);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: name === "description" ? value : Number(value) } : item
      )
    );
  };

  const addItem = () => setItems((prev) => [...prev, { description: "", unitPrice: 0, quantity: 0 }]);
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Invoice Generator</h1>

      <section style={{ marginBottom: 40, padding: 20, border: "1px solid #ddd", borderRadius: 8, backgroundColor: "#f9f9f9" }}>
        <h2 style={{ marginBottom: 20 }}>Customer Information</h2>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {["name", "company", "email"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={customer[field]}
              onChange={handleCustomerChange}
              style={{ flexGrow: 1, minWidth: 250, padding: "10px 15px", fontSize: 16, borderRadius: 4, border: "1px solid #ccc" }}
            />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 40, padding: 20, border: "1px solid #ddd", borderRadius: 8, backgroundColor: "#f9f9f9" }}>
        <h2 style={{ marginBottom: 20 }}>Invoice Items</h2>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 15, flexWrap: "wrap" }}>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleItemChange(idx, e)}
              style={{ flexGrow: 2, minWidth: 200, padding: "8px 12px", fontSize: 15, borderRadius: 4, border: "1px solid #ccc" }}
            />
            <input
              type="number"
              name="unitPrice"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(idx, e)}
              min="0"
              style={{ flexGrow: 1, maxWidth: 120, padding: "8px 12px", fontSize: 15, borderRadius: 4, border: "1px solid #ccc" }}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(idx, e)}
              min="0"
              style={{ flexGrow: 1, maxWidth: 120, padding: "8px 12px", fontSize: 15, borderRadius: 4, border: "1px solid #ccc" }}
            />
            <button
              onClick={() => removeItem(idx)}
              style={{ backgroundColor: "#ff4d4f", border: "none", color: "white", padding: "8px 12px", cursor: "pointer", borderRadius: 4, fontWeight: "bold" }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addItem}
          style={{ backgroundColor: "#1890ff", color: "white", padding: "10px 20px", border: "none", borderRadius: 5, fontSize: 16, cursor: "pointer" }}
        >
          + Add Item
        </button>
      </section>

      <section>
        <h2 style={{ marginBottom: 20, textAlign: "center" }}>Invoice Preview</h2>
        <Invoice customer={customer} items={items} />
      </section>

      <footer style={{ textAlign: "center", padding: "15px 0", borderTop: "1px solid #ccc", fontSize: 14, color: "#999", marginTop: 40, fontStyle: "italic" }}>
        Created by Sokleng Lim
      </footer>
    </div>
  );
}

export default App;
