import MetaTag from "@/components/MetaTag";
import { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../config/firebase";
//@ts-ignore
import QRCode from "qrcode";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [imageUpload, setImageUpload] = useState(null);
  const [qrCodes, setQrcodes] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refreshes the page after upload
  useEffect(() => {
    if (isUploaded) {
      setLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [isUploaded]);

  const uploadFile = () => {
    if (imageUpload == null) return;
    //@ts-ignore
    for (let i = 0; i < imageUpload.length; i++) {
     // No caps, no space, no file extension
      //@ts-ignore
      const imageNameClean = imageUpload[i].name.split(".").shift().toLowerCase().replace(/\s+/g, '');
      const url = `https://qr-photo-app.vercel.app/${imageNameClean}`;
      const imageRef = ref(
        storage,
        //@ts-ignore
        `images/${imageNameClean}/${imageNameClean}`
      );
      const qrRef = ref(
        storage,
        //@ts-ignore
        `images/${imageNameClean}/QR${imageNameClean}`
      );

      QRCode.toDataURL(url, { margin: 2 }, (err, url) => {
        if (err) return console.error(err);
        var arr = url.split(","),
          //@ts-ignore
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new Blob([u8arr], { type: mime });
        //Change the file name of the QR code to match that of the original image
        const qrCodeFile = new File([file], `${imageNameClean}`, {
          type: "image/png",
        });
        //@ts-ignore
        qrCodes.push(qrCodeFile);
      });
      console.log("url", url);
      console.log("qr", qrCodes[i]);
      console.log("img", imageUpload[i]);

      uploadBytes(imageRef, imageUpload[i]);
      uploadBytes(qrRef, qrCodes[i]);

      setIsUploaded(true);
    }
  };

  return (
    <>
      <MetaTag
        title={"Sube"}
        description={"Genera QR y pagina de individuo por cada foto subida"}
        url={undefined}
      />
      <section>
        <input
          type="file"
          className="file:mr-4 file:py-2 mb-8 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700  file:text-white  hover:file:bg-[#FF0066]"
          multiple
          onChange={(event: any) => {
            setImageUpload(event.target.files);
          }}
        />
        <button onClick={uploadFile}  className="py-2 mb-8 px-4 rounded-lg border-0 text-sm font-semibold bg-gray-700  text-white  hover:bg-[#FF0066]">Sube</button>
        {loading ? (
          <div className="flex">
            <Spinner />
          </div>
        ) : null}
      </section>
    </>
  );
}
