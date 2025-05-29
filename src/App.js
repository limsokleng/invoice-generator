import React, { useState } from "react";
import Invoice from "./components/Invoice";
import CustomerForm from "./components/CustomerForm";
import ItemList from "./components/ItemList";

function App() {
  const [customer, setCustomer] = useState({ name: "", company: "", email: "" });
  const [items, setItems] = useState([{ description: "", unitPrice: "", quantity: "" }]);
  const [error, setError] = useState("");


  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [name]: value } : item)));
  };

  const addItem = () => setItems((prev) => [...prev, { description: "", unitPrice: "", quantity: "" }]);
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  const inputStyle = { padding: "6px 10px", fontSize: 14, borderRadius: 4, border: "1px solid #bbb", backgroundColor: "#fff", color: "#222", minWidth: 120 };
  const labelStyle = { fontSize: 14, color: "#444", marginRight: 8, minWidth: 80, display: "inline-block" };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Invoice Generator</h1>

      <CustomerForm customer={customer} onChange={handleCustomerChange} inputStyle={inputStyle} />

      <ItemList items={items} onItemChange={handleItemChange} onAddItem={addItem} onRemoveItem={removeItem} inputStyle={inputStyle} labelStyle={labelStyle} />

      {error && (
        <div style={{ color: "red", textAlign: "center", marginBottom: 20 }}>{error}</div>
      )}
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Invoice Preview</h2>
      <Invoice customer={customer} items={items} onValidationError={(msg) => setError(msg)}/>

      <footer style={{ backgroundColor: "#222", color: "#eee", textAlign: "center", padding: "20px 0", fontSize: 14, marginTop: 50, boxShadow: "0 -2px 8px rgba(0,0,0,0.1)" }}>
        &copy; {new Date().getFullYear()} Created by Sokleng Lim. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
