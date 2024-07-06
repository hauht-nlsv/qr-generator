import React, { useState, useRef } from "react";
import "../index.css";
import { QRCodeSVG } from "qrcode.react";
import * as htmlToImage from "html-to-image";

function QrCodeGenerator() {
  const [value, setValue] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleQrCodeGenerator = () => {
    if (!value) {
      return;
    }
    setIsSubmit(true);
    setUrl(value);
  };

  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef?.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <div className="qrcode__container">
      <h1>QR Code Generator</h1>
      <div className="qrcode__container--parent">
        <div className="qrcode__input">
          <input
            type="text"
            placeholder="Enter a URL"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
        </div>

        <div>
          {isSubmit && (
            <div className="qrcode__download">
              <div className="qrcode__image" ref={qrCodeRef}>
                <QRCodeSVG value={url} size={300} />
              </div>
              <button onClick={downloadQRCode}>Download QR Code</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QrCodeGenerator;
