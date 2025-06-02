import React from "react";
import { FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const InvoiceContent = React.forwardRef(({ customer, items }, ref) => {
    const subtotal = (items || []).reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const delivery = 7;
    const total = subtotal + delivery;
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const invoiceNumber = `INV-${today.getTime().toString().slice(-6)}`;

    return (
        <div
            ref={ref}
            style={{
                padding: "20mm",
                fontFamily: "Garet, sans-serif",
                color: "#000",
            }}
        >
            {/* Header Section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #000", paddingBottom: 10, marginBottom: 20 }}>
                <div>
                    {/* Optional logo */}
                    {/* <img src="/path/to/logo.png" alt="Company Logo" style={{ height: 50, marginBottom: 10 }} /> */}
                    <h1 style={{ fontSize: 20, margin: 0 }}>INVOICE</h1>
                    <div style={{ fontSize: 12 }}>Invoice #: {invoiceNumber}</div>
                    <div style={{ fontSize: 12 }}>Issue Date: {formattedDate}</div>
                </div>
                <div style={{ textAlign: "right", fontWeight: "bold", fontSize: 16 }}>
                    GREAT HARVEST BREAD CO.
                </div>
            </div>

            {/* Issuer and Customer Info */}
            <table style={{ width: "100%", fontSize: 14, marginBottom: 20 }}>
                <tbody>
                    <tr>
                        <td style={{ verticalAlign: "top", width: "50%" }}>
                            <strong>ISSUE FROM:</strong><br />
                            Great Harvest Minnetonka<br />
                            +1 (952) 476-2515<br />
                            vkhon@greatharvest.com
                        </td>
                        <td style={{ textAlign: "right", verticalAlign: "top" }}>
                            <strong>ISSUED TO:</strong><br />
                            {customer.name}<br />
                            {customer.company}<br />
                            {customer.email}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Items Table */}
            <div className="table-section" style={{ borderBottom: "2px solid #000", paddingBottom: 10 }}>
                <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                    <thead style={{ backgroundColor: "#f2f2f2" }}>
                        <tr>
                            <th style={{ textAlign: "left", padding: "8px 0" }}>DESCRIPTION</th>
                            <th style={{ textAlign: "left", padding: "8px 0" }}>UNIT PRICE</th>
                            <th style={{ textAlign: "left", padding: "8px 0" }}>QTY</th>
                            <th style={{ textAlign: "right", padding: "8px 0" }}>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                                <td style={{ padding: "8px 0", fontWeight: "bold" }}>{item.description}</td>
                                <td style={{ padding: "8px 0" }}>${item.unitPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                                <td style={{ padding: "8px 0" }}>{item.quantity}</td>
                                <td style={{ padding: "8px 0", textAlign: "right" }}>
                                    ${(item.unitPrice * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Totals */}
            <div style={{ textAlign: "right", marginBottom: 60 }}>
                <table style={{ float: "right", fontSize: 14 }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: "4px 12px 4px 0", textAlign: "right" }}>Subtotal:</td>
                            <td style={{ fontWeight: "bold" }}>${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: "4px 12px 4px 0", textAlign: "right" }}>Delivery:</td>
                            <td style={{ fontWeight: "bold" }}>${delivery.toFixed(2)}</td>
                        </tr>
                        <tr style={{ borderTop: "2px solid #000" }}>
                            <td style={{ padding: "10px 12px 0 0", fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Total:</td>
                            <td style={{ padding: "10px 0 0", fontSize: 16, fontWeight: "bold" }}>${total.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Notes Section */}
            <div style={{ fontSize: 12, marginBottom: 40 }}>
                <strong>Notes:</strong><br />
                Thank you for your business. Please reach out if you have any questions regarding this invoice.
            </div>


            {/* Footer Section */}
            <div style={{ borderTop: "1px solid #ccc", paddingTop: 16, fontSize: 10, color: "#555", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <FaEnvelope style={{ marginRight: 6 }} />
                    <a href="mailto:vkhon@greatharvest.com" style={{ color: "#555", textDecoration: "none" }}>vkhon@greatharvest.com</a>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <FaGlobe style={{ marginRight: 6 }} />
                    <a href="https://greatharvestminnetonka.com" style={{ color: "#555", textDecoration: "none" }}>greatharvestminnetonka.com</a>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <FaMapMarkerAlt style={{ marginRight: 6 }} />
                    17416 Minnetonka Blvd, Minnetonka, MN 55345
                </div>
            </div>
        </div>
    );
});

export default InvoiceContent;