import MetaTag from "@/components/MetaTag";
import { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../config/firebase";
//@ts-ignore
import { v4 } from "uuid";
import QRCode from "qrcode";
import Spinner from "@/components/Spinner";

export default function Home() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState<any>([]);
  const imagesListRef = ref(storage, "images/");
  const [qrCodes, setQrcodes] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

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
      //@ts-ignore
      const imageName = imageUpload[i].name;
      //@ts-ignore
      const imageNameClean = imageUpload[i].name.split(".").shift();
      const url = `http://localhost:3000/${imageName}`;
      const imageRef = ref(
        storage,
        //@ts-ignore
        `images/${imageNameClean}/${imageUpload[i].name}`
      );
      const qrRef = ref(
        storage,
        //@ts-ignore
        `images/${imageNameClean}/QR${imageUpload[i].name}`
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
        const qrCodeFile = new File([file], `${imageName}`, {
          type: "image/png",
        });
        //@ts-ignore
        qrCodes.push(qrCodeFile);
      });
      // setQrcodes(qrCodes);
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
        title={"QR App"}
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
        <button onClick={uploadFile}> Upload</button>
        {loading ? (
          <div className="flex">
            <Spinner />
          </div>
        ) : null}
      </section>
    </>
  );
}
