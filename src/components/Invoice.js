import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';



export default function Invoice({ customer, items, onValidationError }) {
    const invoiceRef = useRef();
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState(customer.email || "");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const delivery = 7;
    const total = subtotal + delivery;

    const handleDownload = () => {
        if (!customer.name || !customer.company || !customer.email) {
            if (onValidationError) {
                onValidationError("Please fill in all customer information before downloading.");
            }
            return;
        }

        // Validate items
        for (const [index, item] of items.entries()) {
            if (
                !item.description.trim() ||
                !item.quantity ||
                Number(item.quantity) <= 0 ||
                !item.unitPrice ||
                Number(item.unitPrice) <= 0
            ) {
                if (onValidationError) {
                    onValidationError(`Please fill in valid description, quantity, and unit price for item #${index + 1}.`);
                }
                return;
            }
        }

        // Clear error if all fields are valid
        if (onValidationError) {
            onValidationError("");
        }

        html2pdf()
            .set({
                filename: 'invoice.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            })
            .from(invoiceRef.current)
            .save();
    };
    const openEmailModal = () => {
        if (!customer.name || !customer.company || !customer.email) {
            onValidationError?.("Please fill in all customer information before sending email.");
            return;
        }
        onValidationError?.("");
        setRecipientEmail(customer.email); // Pre-fill
        setShowEmailModal(true);
    };

    const handleEmailInvoice = async () => {
        if (!/\S+@\S+\.\S+/.test(recipientEmail)) {
            alert("Invalid email address entered.");
            return;
        }

        const element = invoiceRef.current;
        const opt = {
            margin: 0.5,
            filename: 'invoice.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).outputPdf('blob').then(async (pdfBlob) => {
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);
            reader.onloadend = async () => {
                const base64data = reader.result.split(',')[1];

                try {
                    const response = await fetch("https://vercel-invoice-api-limsokleng-sokleng-lims-projects.vercel.app/api/send-invoice", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            to: recipientEmail,
                            pdfData: base64data,
                            customerName: customer.name,
                        }),
                    });
                    if (!response.ok) throw new Error('Failed to send email');
                    setShowEmailModal(false);
                    setShowSuccessModal(true);
                } catch (error) {
                    alert('Error sending email: ' + error.message);
                }
            };
        });
    };

    const modalStyles = {
        backdrop: {
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        },
        modal: {
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            width: "90%",
            maxWidth: 400
        },
        buttonPrimary: {
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            marginLeft: 10
        },
        buttonSecondary: {
            backgroundColor: "#6c757d",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer"
        }
    };

    return (
        <>
            <div ref={invoiceRef} style={{ padding: "20mm", fontFamily: "Garet, sans-serif", color: "#000", border: "1px solid #ccc", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
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
                <button
                    onClick={openEmailModal}
                    style={{ backgroundColor: "#007bff", color: "#fff", padding: "12px 25px", fontSize: 16, borderRadius: 6, border: "none", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", marginLeft: 10 }}
                >
                    Email Invoice
                </button>
            </div>

            {showEmailModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center",
                    zIndex: 9999
                }}>
                    <div style={{
                        backgroundColor: "#fff", padding: 30, borderRadius: 10, width: 400,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                    }}>
                        <h2 style={{ marginTop: 0 }}>Send Invoice via Email</h2>
                        <label style={{ display: "block", marginBottom: 10 }}>
                            Recipient Email:
                            <input
                                type="email"
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                style={{ width: "100%", padding: 10, marginTop: 5, borderRadius: 6, border: "1px solid #ccc" }}
                            />
                        </label>
                        <div style={{ textAlign: "right", marginTop: 20 }}>
                            <button
                                onClick={() => setShowEmailModal(false)}
                                style={{ marginRight: 10, padding: "10px 15px", borderRadius: 6, border: "none", background: "#ccc", cursor: "pointer" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEmailInvoice}
                                style={{ padding: "10px 15px", borderRadius: 6, border: "none", background: "#007bff", color: "#fff", cursor: "pointer" }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showSuccessModal && (
                <div style={modalStyles.backdrop}>
                    <div style={modalStyles.modal}>
                        <h3>Success</h3>
                        <p>Invoice was emailed successfully to <strong>{recipientEmail}</strong>.</p>
                        <div style={{ textAlign: "right" }}>
                            <button onClick={() => setShowSuccessModal(false)} style={modalStyles.buttonPrimary}>OK</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
