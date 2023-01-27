import MetaTag from "@/components/MetaTag";
import { storage } from "@/config/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";

export const getStaticPaths = async () => {
  const allFolder = ref(storage, "/images");
  const folderNames = await listAll(allFolder).then((res) => {
    //@ts-ignore
    return res.prefixes.map((path) => path?._location?.path_);
  });
  const cleanFolderNames = folderNames.map((name) =>
    name.replace("images/", "")
  );

  const paths = cleanFolderNames.map((name) => {
    return {
      params: { slug: name.toLowerCase() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const slug = context.params.slug;
  const upperCaseSlug = slug[0].toUpperCase() + slug.slice(1);
  const specificFolder = ref(storage, `/images/${upperCaseSlug}`);
  const items = await listAll(specificFolder).then((res) => res.items);
  const imageList = await Promise.all(
    items.map(async (item) => await getDownloadURL(item))
  );
  return {
    props: { photo: imageList, slug },
  };
};

const Slug = ({ photo, slug }: { photo: any; slug: any }) => {
  console.log("", photo);
  return (
    <>
      <MetaTag
        title={slug[0].toUpperCase() + slug.slice(1)}
        description={slug[0].toUpperCase() + slug.slice(1)}
        url={slug[0].toUpperCase() + slug.slice(1)}
      />
      <section>
        <h1 className="text-2xl dark:text-white mb-8">{slug[0].toUpperCase() + slug.slice(1)}</h1>
        {photo
          .filter(
            (url: string) =>
              !url.includes(`QR${slug[0].toUpperCase()}${slug.slice(1)}`)
          )
          .map((url: string, i: any) => (
            <img src={url} key={i} className="rounded-lg"/>
          ))}
      </section>
    </>
  );
};

export default Slug;
