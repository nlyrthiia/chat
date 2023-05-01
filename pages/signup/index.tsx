import { API } from "@/contans";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const signUpHandler = () => {
    axios
      .post(`${API}/urs/account/register`, {
        firstName,
        lastName,
        password,
        email,
      })
      .then((res: any) => {
        if (res.code === 0) {
          router.push("/");
        }
      });
  };

  return (
    <div className="bg-[#1f2128] w-full h-full min-h-screen">
      <div className="pt-24 pl-24 cursor-default">
        <img src="/img/logo.svg" alt="logo" className="" />
      </div>
      <div className="flex pb-56">
        <div>
          <img src="/img/hero.png" alt="hero" />
        </div>
        <div className="ml-10 mt-28 bg-[#242731] flex flex-col px-12 pt-6 pb-16 h-[45rem] w-[29rem] cursor-default rounded-[2.5rem]">
          <div className="flex justify-end mb-4" onClick={() => router.back()}>
            <img src="/img/back.svg" alt="close" />
          </div>
          <div className="text-white text-4xl font-semibold">Sign up</div>
          <div className="text-xs font-medium mt-5">
            <span className="text-[#808191] mr-2">Already a user</span>
            <span
              className="text-[#25D4D0] cursor-pointer"
              onClick={() => router.push("/")}
            >
              Login now
            </span>
          </div>
          <div className="flex mt-10">
            <div className="">
              <div className="text-[#808191] text-xs font-medium">
                First name
              </div>
              <input
                type="text"
                className="input w-full  mt-4 bg-[#2e303a] text-white text-sm font-semibold"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="ml-4">
              <div className="text-[#808191] text-xs font-medium">
                Last name
              </div>
              <input
                type="text"
                className="input w-full  mt-4 bg-[#2e303a] text-white text-sm font-semibold"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-11 text-[#808191] text-xs font-medium">
            Email Address
          </div>
          <input
            type="text"
            className="input w-full  mt-4 bg-[#2e303a] text-white text-sm font-semibold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-[#808191] text-xs font-medium mt-6">
            Password
          </div>
          <input
            type="password"
            className="input w-full  mt-4 bg-[#2e303a] text-white text-sm font-semibold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="input w-full  mt-4 bg-[#2e303a] text-white text-sm font-semibold"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
          <div
            onClick={() => signUpHandler()}
            className="mt-6 bg-[#25D4D0] flex justify-center items-center h-14 text-sm font-bold text-white rounded-2xl cursor-pointer"
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  );
}
