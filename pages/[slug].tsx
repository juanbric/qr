import { storage } from "@/config/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";


const slug = ({ url }: { url: any }) => {
  //   const [imageUrls, setImageUrls] = useState([]);
  //   const imagesListRef = ref(storage, "images/");
  //   useEffect(() => {
  //     listAll(imagesListRef).then((response) => {
  //       response.items.forEach((item) => {
  //         getDownloadURL(item).then((url) => {
  //           setImageUrls((prev) => [...prev, url]);
  //         });
  //       });
  //     });
  //   }, []);

  return (
    <div>
      <img src="" />;
    </div>
  );
};

export default slug;
