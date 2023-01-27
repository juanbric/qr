import MetaTag from "@/components/MetaTag";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  const image =
    "https://firebasestorage.googleapis.com/v0/b/juanbri-face-recognition.appspot.com/o/images%2Flogo.svg?alt=media&token=5662b932-40eb-4b11-b0bb-e4b40d9b48a6";

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  }, []);

  return (
    <>
      <MetaTag title={"Oopss"} description={"Page not found"} url={undefined} />
      <section>
        <h1>Page not found. Redirecting to home.</h1>
      </section>
    </>
  );
}
