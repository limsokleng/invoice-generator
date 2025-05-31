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
            <div style={{ float: "right", width: "30%", marginBottom: 20 }}>
                <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                    <tbody>
                        <tr>
                            <td colSpan="3" style={{ textAlign: "right" }}>SUBTOTAL</td>
                            <td style={{ textAlign: "right" }}>${subtotal}</td>
                        </tr>
                        <tr>
                            <td colSpan="3" style={{ textAlign: "right", paddingBottom: 5 }}>Delivery</td>
                            <td style={{ textAlign: "right", paddingBottom: 5 }}>${delivery}</td>
                        </tr>
                        <tr>
                            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold", borderTop: "2px solid #000", paddingTop: 5 }}>
                                Total
                            </td>
                            <td style={{ textAlign: "right", fontWeight: "bold", borderTop: "2px solid #000", paddingTop: 5 }}>
                                ${total}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Notes Section */}
            <div style={{ clear: "both", marginTop: 80, fontSize: 12 }}>
                <strong>Notes:</strong><br />
                Thank you for your business. Please contact us if you have any questions about this invoice.
            </div>


            {/* Footer Section */}
            <table style={{ width: "100%", marginTop: 30, fontSize: 10, fontWeight: "bold" }}>
                <tbody>
                    <tr>
                        <td style={{ textAlign: "left" }}>
                            <FaEnvelope style={{ verticalAlign: "middle", marginRight: 6 }} />
                            <a href="mailto:vkhon@greatharvest.com" style={{ color: "#000" }}>vkhon@greatharvest.com</a>
                        </td>
                        <td style={{ textAlign: "center" }}>
                            <FaGlobe style={{ verticalAlign: "middle", marginRight: 6 }} />
                            <a href="https://greatharvestminnetonka.com" style={{ color: "#000" }}>
                                greatharvestminnetonka.com
                            </a>
                        </td>
                        <td style={{ textAlign: "right" }}>
                            <FaMapMarkerAlt style={{ verticalAlign: "middle", marginRight: 6 }} />
                            17416 Minnetonka Blvd, Minnetonka, MN 55345
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});

export default InvoiceContent;
