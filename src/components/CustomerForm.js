export default function CustomerForm({ customer, onChange, inputStyle }) {
    return (
      <section style={{ marginBottom: 40, padding: 20, border: "1px solid #ddd", borderRadius: 8, backgroundColor: "#f9f9f9" }}>
        <h2 style={{ marginBottom: 20 }}>Customer Information</h2>
        <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
          {["name", "company", "email"].map((field) => (
            <div key={field} style={{ flexGrow: 1, minWidth: 200 }}>
              <label htmlFor={field} style={{ display: "block", marginBottom: 5, fontWeight: "bold", fontSize: 14, color: "#333" }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={customer[field]}
                onChange={onChange}
                style={{ ...inputStyle, width: "90%" }}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
  