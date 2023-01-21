import MetaTag from "@/components/MetaTag";
import { useState, useEffect } from "react";
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

export default function Home() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  // const imagesListRef = ref(storage, "images/");
  // const uploadFile = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageUrls((prev) => [...prev, url]);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <>
      <MetaTag
        title={"QR App"}
        description={"Genera QR y pagina de individuo por cada foto subida"}
        url={undefined}
        image={"logo/svg"}
      />
      {/* <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url, i) => {
        return <img key={i} src={url} />;
      })} */}
    </>
  );
}

