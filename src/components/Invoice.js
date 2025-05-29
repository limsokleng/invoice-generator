import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';


export default function Invoice({ customer, items }) {
    const invoiceRef = useRef();

    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const delivery = 7;
    const total = subtotal + delivery;

    const handleDownload = () => {
        html2pdf()
            .set({
                filename: 'invoice.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            })
            .from(invoiceRef.current)
            .save();
    };

    return (
        <>
            <div ref={invoiceRef} style={{ padding: "20mm", fontFamily: "Garet, sans-serif", color: "#000" }}>
                <div className="header" style={{ borderBottom: "2px solid #000", marginBottom: 20 }}>
                    <h1 style={{ fontSize: 24, margin: 0 }}>INVOICE</h1>
                    <div style={{ textAlign: "right", fontWeight: "bold", fontSize: 16, marginTop: -20 }}>
                        GREAT HARVEST BREAD CO.
                    </div>
                </div>

                <table style={{ width: "100%", fontSize: 16 }}>
                    <tbody>
                        <tr>
                            <td style={{ verticalAlign: "top", width: "50%" }}>
                                <div><strong>ISSUE FROM:</strong></div>
                                Great Harvest Minnetonka<br />
                                +1 (952) 476-2515<br />
                                vkhon@greatharvest.com
                            </td>
                            <td style={{ textAlign: "right", verticalAlign: "top", width: "50%" }}>
                                <div><strong>ISSUED TO:</strong></div>
                                {customer.name}<br />
                                {customer.company}<br />
                                {customer.email}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ marginTop: 20, fontSize: 14, borderBottom: "2px solid #000", paddingBottom: 10 }}>
                    <strong>ISSUE DATE:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>

                <div className="table-section" style={{ marginTop: 20, borderBottom: "2px solid #000", paddingBottom: 10 }}>
                    <table style={{ width: "100%", fontSize: 16, borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #000", paddingBottom: 8 }}>DESCRIPTION</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #000", paddingBottom: 8 }}>UNIT PRICE</th>
                                <th style={{ textAlign: "left", borderBottom: "1px solid #000", paddingBottom: 8 }}>QTY</th>
                                <th style={{ textAlign: "right", borderBottom: "1px solid #000", paddingBottom: 8 }}>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, idx) => (
                                <tr key={idx}>
                                    <td style={{ padding: "10px 0" }}>{item.description}</td>
                                    <td style={{ padding: "10px 0" }}>${item.unitPrice}</td>
                                    <td style={{ padding: "10px 0" }}>{item.quantity}</td>
                                    <td style={{ padding: "10px 0", textAlign: "right" }}>
                                        ${item.unitPrice * item.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ float: "right", width: "30%", marginBottom: 20 }}>
                    <table className="summary" style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                        <tbody>
                            <tr>
                                <td colSpan="3" style={{ textAlign: "right" }}>SUBTOTAL</td>
                                <td style={{ textAlign: "right" }}>${subtotal}</td>
                            </tr>
                            <tr>
                                <td
                                    colSpan="3"
                                    style={{
                                        textAlign: "right",
                                        paddingBottom: 5,
                                    }}
                                >
                                    Delivery
                                </td>
                                <td
                                    style={{
                                        textAlign: "right",
                                        paddingBottom: 5,
                                    }}
                                >
                                    ${delivery}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan="3"
                                    style={{
                                        textAlign: "right",
                                        fontWeight: "bold",
                                        borderTop: "2px solid #000",
                                        paddingTop: 5,
                                    }}
                                >
                                    Total
                                </td>
                                <td
                                    style={{
                                        textAlign: "right",
                                        fontWeight: "bold",
                                        borderTop: "2px solid #000",
                                        paddingTop: 5,
                                    }}
                                >
                                    ${total}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div style={{ clear: "both", marginTop: 40, fontSize: 20, fontWeight: "bold" }}>
                    THANK YOU FOR YOUR ORDER.
                </div>

                <table style={{ width: "100%", marginTop: 30, fontSize: 10, fontWeight: "bold" }}>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: "left", color: "#000" }}>
                                <FaEnvelope style={{ color: "#000", verticalAlign: "middle", marginRight: 6 }} />
                                <a href="mailto:vkhon@greatharvest.com" style={{ color: "#000" }}>
                                    vkhon@greatharvest.com
                                </a>
                            </td>
                            <td style={{ textAlign: "center", color: "#000" }}>
                                <FaGlobe style={{ color: "#000", verticalAlign: "middle", marginRight: 6 }} />
                                <a href="https://greatharvestminnetonka.com/" style={{ color: "#000" }}>
                                    greatharvestminnetonka.com
                                </a>
                            </td>
                            <td style={{ textAlign: "right", color: "#000" }}>
                                <FaMapMarkerAlt style={{ color: "#000", verticalAlign: "middle", marginRight: 6 }} />
                                17416 Minnetonka Blvd, Minnetonka, MN 55345
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ textAlign: "center", marginTop: 20 }}>
                <button
                    onClick={handleDownload}
                    style={{ backgroundColor: "#28a745", color: "#fff", padding: "12px 25px", fontSize: 16, borderRadius: 6, border: "none", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                >
                    Download PDF
                </button>
            </div>
        </>
    );
}
