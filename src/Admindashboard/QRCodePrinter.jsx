import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode"; // frontend QR code library

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const QRCodePrinter = () => {
  const [tableId, setTableId] = useState("");
  const [qrCodes, setQrCodes] = useState([]);

  // Fetch all QR codes on mount
  const fetchAllQRCodes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/qrcode`);
      setQrCodes(response.data);
    } catch (error) {
      console.error("Error fetching QR codes:", error);
    }
  };

  useEffect(() => {
    fetchAllQRCodes();
  }, []);

  const handleTableIdChange = (e) => {
    setTableId(e.target.value);
  };

  const handleGenerateQRCode = async (e) => {
    e.preventDefault();
    if (!tableId) {
      alert("❌ Please enter a valid Table ID.");
      return;
    }

    try {
      // Check if already exists
      const check = await axios.get(`${BACKEND_URL}/api/qrcode/${tableId}`);
      if (check.data) {
        alert("❌ QR Code for this Table ID already exists.");
        return;
      }
    } catch (error) {
      // 404 is okay — proceed
    }

    try {
      const qrCodeUrl = `${FRONTEND_URL}/table/${tableId}`;
      const qrCodeImage = await QRCode.toDataURL(qrCodeUrl);

      const response = await axios.post(`${BACKEND_URL}/api/qrcode`, {
        tableId,
      });

      setQrCodes((prev) => [
        ...prev,
        {
          tableId,
          qrCodeImage,
          qrCodeUrl: response.data.qrCodeUrl,
        },
      ]);
      alert("✅ QR Code generated successfully!");
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("❌ Error generating QR code.");
    }
  };

  const handleDeleteQRCode = async (tableId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/qrcode/${tableId}`);
      setQrCodes(qrCodes.filter((qr) => qr.tableId !== tableId));
      alert("✅ QR Code deleted.");
    } catch (error) {
      console.error("Error deleting QR code:", error);
      alert("❌ Failed to delete QR code.");
    }
  };

  const handleDownloadQRCode = (qrCodeImage, tableId) => {
    const link = document.createElement("a");
    link.href = qrCodeImage;
    link.download = `Table_${tableId}_QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Generate QR Code for Table</h1>

      <div className="d-flex justify-content-center mb-4">
        <input
          type="number"
          className="form-control w-25"
          placeholder="Enter Table ID"
          value={tableId}
          onChange={handleTableIdChange}
        />
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary" onClick={handleGenerateQRCode}>
          Generate QR Code
        </button>
      </div>

      <div>
        <h3>Existing QR Codes</h3>
        <div className="d-flex flex-wrap">
          {qrCodes.length === 0 ? (
            <p>No QR codes available.</p>
          ) : (
            qrCodes.map((qrCode) => (
              <div
                key={qrCode.tableId}
                className="card m-3"
                style={{ width: "18rem" }}
              >
                <img
                  src={qrCode.qrCodeImage}
                  alt={`QR Code for Table ${qrCode.tableId}`}
                  className="card-img-top"
                  style={{ maxHeight: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Table {qrCode.tableId}</h5>
                  <button
                    className="btn btn-danger mr-2 me-2"
                    onClick={() => handleDeleteQRCode(qrCode.tableId)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleDownloadQRCode(qrCode.qrCodeImage, qrCode.tableId)
                    }
                  >
                    Download
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodePrinter;
