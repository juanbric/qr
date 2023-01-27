import Link from "next/link";
// import { HStack } from "@chakra-ui/react";
// import { auth } from "../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { signOut } from "firebase/auth";
// import useGetRol from "../hooks/useGetRol";

export const AppBar = () => {
  // const [user] = useAuthState(auth);
  // const rol = useGetRol();
  // const unauthorized = rol?.rol === "guest";
  // const admin = rol?.rol === "admin";

  // const signUserOut = async () => {
  //   await signOut(auth);
  // };

  return (
    <div className="bg-gray-900 shadow-xl py-3 lg:py-4">
      <div className="lg:flex lg:justify-center lg:items-center">
        <div className="px-4 lg:px-8 w-auto lg:w-[1130px]">
          <div className="flex text-sm text-slate-400 justify-between items-center">
                <Link
                  className="hover:scale-110 transform-gpu ease-in-out duration-300 rounded-full"
                  href={"/"}
                >
                  <img
                    src="/melenti.svg"
                    className="w-[32px] h-[32px] shadow-lg"
                  />
                </Link>
              <div className="flex items-center gap-6">
                <Link href={"/subidas"}>
                  <img src="/search.svg" />
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
