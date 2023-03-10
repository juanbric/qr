import MetaTag from "@/components/MetaTag";
import { storage } from "@/config/firebase";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Subidas = ({ photo, slug }: { photo: any; slug: any }) => {
  const [imageList, setImageList] = useState<any>([]);
  const [imgData, setImgData] = useState<any>();
  const [folders, setFolders] = useState<any>();

  useEffect(() => {
    const allFolder = ref(storage, "images");
    listAll(allFolder).then((res) => {
      //@ts-ignore
      const folderNames = res.prefixes.map((path) => path?._location?.path_);
      setFolders(folderNames);
      folderNames.forEach((folderName) => {
        const pathsListRef = ref(storage, `${folderName}`);
        listAll(pathsListRef).then((response) => {
          response.items.forEach((item) => {
            setImgData(item);
            getDownloadURL(item).then((url) => {
              setImageList((prev: any) => [...prev, url]);
            });
          });
        });
      });
    });
  }, []);

  const filteredImageList = imageList.filter((url: any) => {
    return (
      url.includes("QR") &&
      !folders.some((folder: any) => url.includes(folder))
    );
  });
  return (
    <>
      <MetaTag
        title={"Subidas"}
        description={"Genera QR y pagina de individuo por cada foto subida"}
        url={undefined}
      />
      <div className="flex items-center justify-center">
        <section className="max-w-[600px]">
          {filteredImageList.map((url: any, i: any) => {
            const folder = folders.find((folder: any) =>
              url.includes(folder.replace("images/", ""))
            );
            const folderName = folder ? folder : null;
            const route = folderName?.replace("images/", "").toLowerCase();
            return (
              <>
              <p>{route}</p>
              <Link
                key={i}
                href={`/${route}`}
                className="justify-center items-center"
              >
                <img key={i} src={url} className="rounded-lg mb-8" />
              </Link>
              </>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default Subidas;
