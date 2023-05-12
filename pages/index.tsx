import { API } from "@/contans";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      router.push("/home");
    }
  }, []);

  const loginHandler = () => {
    axios
      .post(`${API}/urs/account/login`, { email, password })
      .then((res: any) => {
        if (res.data.code === 0) {
          const token = res.data.data.token;
          const accountId = res.data.data.accountId;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("accountId", accountId);
          window.localStorage.setItem("email", email);

          router.push("/home");
        }
      });
  };

  return (
    <div className="bg-[#1f2128] w-full h-full min-h-screen">
      <div className="pt-24 pl-24 cursor-default">
        <img src="/img/logo.svg" alt="logo" className="" />
      </div>
      <div className="flex pb-56 justify-center">
        <div>
          <img src="/img/hero.png" alt="hero" className="h-[40rem]" />
        </div>
        <div className="ml-10 mt-28 bg-[#242731] flex flex-col px-12 pt-6 pb-16 h-[33rem] w-[29rem] cursor-default rounded-[2.5rem]">
          <div className="flex justify-end mb-4">
            <img src="/img/close.svg" alt="close" />
          </div>
          <div className="text-white text-4xl font-semibold">Sign in</div>
          <div className="text-xs font-medium mt-5">
            <span className="text-[#808191] mr-2">New user</span>
            <span
              className="text-[#25D4D0] cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Create an account
            </span>
          </div>
          <div className="mt-11 text-[#808191] text-xs font-medium">Email</div>
          <input
            type="text"
            className="input w-full focus:border-[#25D4D0] mt-4 bg-[#2e303a] text-white text-sm font-semibold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-[#808191] text-xs font-medium mt-6">
            Password
          </div>
          <input
            type="password"
            className="input w-full focus:border-[#25D4D0] mt-4 bg-[#2e303a] text-white text-sm font-semibold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            onClick={() => loginHandler()}
            className="mt-6 bg-[#25D4D0] cursor-pointer flex justify-center items-center h-14 text-sm font-bold text-white rounded-2xl"
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  );
}
