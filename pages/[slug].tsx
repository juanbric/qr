import MetaTag from "@/components/MetaTag";
import { storage } from "@/config/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";

export const getStaticPaths = async () => {
  const allFolder = ref(storage, "images/");
  const folderNames = await listAll(allFolder).then((res) => {
    return res.prefixes.map((path) => path?._location?.path_);
  });
  
  const cleanFolderNames = folderNames.map((name) =>
  name.replace("images/", "")
  );
  
  const paths = cleanFolderNames.map((name) => {
    console.log("this is what im' gettiiiiinggg", cleanFolderNames)
    return {
      params: { slug: name.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: { params: any }) {
   console.log("getStaticProooooooooooooooooops called with params: ", params);
  
   return {
    props: { slug: params.slug },
    revalidate: 1,
  };
}

const Slug = ({ slug }: { slug: any }) => {
  return (
    <>
      <MetaTag title={slug} description={slug} url={slug} image={"logo/svg"} />
      <section>Hello {slug}</section>
    </>
  );
};

export default Slug;
