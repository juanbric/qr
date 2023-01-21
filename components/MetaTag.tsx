import Head from "next/head";

export const MetaTag = ({
  title,
  description,
  url,
  image,
}: {
  title: any;
  description: any;
  url: any;
  image: any;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="distribution" content="Global" />
      <meta name="revisit-after" content="21 days" />
      <meta name="creator" content="Juan Pablo Briceno" />
      <link rel="icon" href="https://svgshare.com/i/pdv.svg" />
      <meta http-equiv="content-language" content="en" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index, follow" />
      <meta name="twitter:image" content={image} />
      <meta property="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
};
export default MetaTag;