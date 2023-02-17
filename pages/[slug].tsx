import MetaTag from "@/components/MetaTag";
import { storage } from "@/config/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";

export const getServerSideProps = async (context: any) => {
  const slug = context.params.slug;
  const specificFolder = ref(storage, `/images/${slug}`);
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
        title={slug}
        description={slug[0].toUpperCase() + slug.slice(1)}
        url={slug[0].toUpperCase() + slug.slice(1)}
      />
      <section>
        <h1 className="text-2xl dark:text-white mb-8">{slug[0].toUpperCase() + slug.slice(1)}</h1>
        {photo
          .filter(
            (url: string) =>
              !url.includes(`QR${slug}`)
          )
          .map((url: string, i: any) => (
            <img src={url} key={i} className="rounded-lg"/>
          ))}
      </section>
    </>
  );
};
export default Slug;
