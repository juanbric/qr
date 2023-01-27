import MetaTag from "@/components/MetaTag";
import { storage } from "@/config/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [imageList, setImageList] = useState<any>([]);
  const [imgData, setImgData] = useState<any>();


  useEffect(() => {
    const allFolder = ref(storage, "images/");
    listAll(allFolder).then((res) => {
      const folderNames = res.prefixes.map((path) => path?._location?.path_);
      folderNames.forEach((folderName) => {
        const pathsListRef = ref(storage, `${folderName}`);
        listAll(pathsListRef).then((response) => {
          response.items.forEach((item) => {
            setImgData(item);
            getDownloadURL(item).then((url) => {
              setImageList((prev) => [...prev, url]);
            });
          });
        });
      });
    });
  }, []);
  console.log("img list", imgData);

  return (
    <>
      <MetaTag
        title={"Test"}
        description={"Genera QR y pagina de individuo por cada foto subida"}
        url={undefined}
        image={"logo/svg"}
      />
      <section>
        {imageList.map((url, i) => (
          <Link
            key={i}
            href={url}
            className="justify-center items-center"
          >
            <img key={i} src={url} />
           </Link>
        ))}
      </section>
    </>
  );
};

export default Test;
