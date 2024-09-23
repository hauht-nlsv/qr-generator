import React, { useState, useRef } from "react";
import "../index.css";
import { QRCodeSVG } from "qrcode.react";
import * as htmlToImage from "html-to-image";
import logo from "../assets/img/logo.png";

function QrCodeGenerator() {
  const [value, setValue] = useState("");
  const [img, setImg] = useState([]);
  const [embed, setEmbed] = useState(null);
  const [url, setUrl] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [embedProperties, setEmbedProperties] = useState({
    borderRadius: "0%",
  });

  const handleSelectImage = (image) => {
    setEmbed(image);
  };

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

  const handleChangeShape = (e) => {
    setEmbedProperties({
      ...embedProperties,
      borderRadius: e.target.checked ? "50%" : "0%",
    });
  };

  return (
    <>
      <div className="flex w-full items-center justify-center mt-5">
        <h1 style={{}}>QR Code Generator</h1>
      </div>
      <div className="flex">
        <div className="qrcode__container flex-[1]">
          <div className="qrcode__container--parent">
            <div className="qrcode__input">
              <textarea
                className="w-full border border-black mb-2"
                rows={3}
                placeholder="Enter a URL"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <button className="w-full" onClick={handleQrCodeGenerator}>
                Generate QR Code
              </button>
            </div>
            <div className="flex w-full">
              <div className="flex border border-black p-1 w-full">
                <input
                  type="file"
                  className="w-full"
                  onChange={(e) =>
                    setImg((img) => [
                      URL.createObjectURL(e.target.files[0]),
                      ...img,
                    ])
                  }
                />
              </div>
            </div>
            <div className="flex w-full gap-1">
              {!!img.length &&
                img.map((_img, idx) => (
                  <ImageItem key={idx} src={_img} onClick={handleSelectImage} />
                ))}
              <div
                className="flex items-center justify-center w-11 h-11 border border-black p-1"
                onClick={() => setEmbed(null)}
              >
                <span>X</span>
              </div>
              <ImageItem src={logo} onClick={handleSelectImage} />
            </div>
            <div className="flex flex-col w-full gap-1 border border-[#C0C0C0] rounded-sm p-2">
              <div className="flex justify-between">
                <label>Circle</label>
                <input
                  type="checkbox"
                  value={true}
                  onChange={handleChangeShape}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          {isSubmit && (
            <div className="qrcode__download">
              <div className="qrcode__image relative" ref={qrCodeRef}>
                {!!embed && (
                  <img
                    src={embed}
                    alt="embed"
                    className="absolute top-[50%] left-[50%] w-[25%] h-[25%] bg-white"
                    style={{
                      transform: "translate(-50%, -50%)",
                      ...embedProperties,
                    }}
                  />
                )}
                <QRCodeSVG value={url} size={300} />
              </div>
              <button onClick={downloadQRCode}>Download QR Code</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const ImageItem = ({ src, onClick }) => {
  return (
    <div
      className="flex items-center justify-center w-11 h-11 border border-black p-1"
      onClick={() => onClick(src)}
    >
      <img
        src={src}
        alt="Logo"
        // style={{
        //   position: "absolute",
        //   top: "50%",
        //   left: "50%",
        //   transform: "translate(-50%, -50%)",
        //   width: "25%", // Adjust logo size as needed
        //   height: "25%",
        //   backgroundColor: "white",
        //   margin: "0",
        // }}
      />
    </div>
  );
};

export default QrCodeGenerator;
