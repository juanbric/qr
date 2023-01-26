import MetaTag from "@/components/MetaTag";
import { useState } from "react";
import QRCode from "qrcode";

export default function Test() {
  const [imageUpload, setImageUpload] = useState(null);
  const [qrCodes, setQrcodes] = useState([]);

  const showFile = () => {
    if (imageUpload == null) return;
    for (let i = 0; i < imageUpload.length; i++) {
      const imageName = imageUpload[i].name;
      const url = `https://soltype.io/${imageName}`;

      
      QRCode.toDataURL(url, { margin: 2 }, (err, url) => {
        if (err) return console.error(err);
        qrCodes.push(url);
      });
    }
    setQrcodes(qrCodes);
    console.log("qrs", qrCodes);
  };

  return (
    <>
      <MetaTag
        title={"Test"}
        description={"Genera QR y pagina de individuo por cada foto subida"}
        url={undefined}
        image={"logo/svg"}
      />
      <section>
        <input
          type="file"
          multiple
          onChange={(event: any) => {
            setImageUpload(event.target.files);
          }}
        />
        <button onClick={showFile}>Show</button>
        {qrCodes?.map((qr) => (
          <img src={qr} />
        ))}
      </section>
    </>
  );
}
