import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Layout({ ...props }) {
  const nav = ["Home", "Chats", "Create"];
  const router = useRouter();

  return (
    <div className="w-full h-full flex bg-[#1f2128] min-h-screen">
      <div className="px-5 pt-10 w-[16rem]">
        <div>
          <img src="/img/logo.svg" alt="logo" className="" />
        </div>
        {nav.map((item, index) => (
          // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div
            className="mt-7 w-full px-5 h-14 flex items-center cursor-default rounded-2xl"
            key={index}
            style={{
              backgroundColor:
                router.pathname === `/${item.toLocaleLowerCase()}`
                  ? "#25D4D0"
                  : "transparent",
            }}
            onClick={() => {
              if (item === "Create") {
              } else {
                router.push(`/${item.toLocaleLowerCase()}`);
              }
            }}
          >
            <div>
              <img
                src={`/img/${
                  router.pathname === `/${item.toLocaleLowerCase()}`
                    ? "re-"
                    : ""
                }${item.toLocaleLowerCase()}.svg`}
                alt={item}
              />
            </div>
            <div
              className="text-sm font-semibold ml-4"
              style={{
                color:
                  router.pathname === `/${item.toLocaleLowerCase()}`
                    ? "#fff"
                    : "#808191",
              }}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
      <div
        className="h-full min-h-screen w-px bg-[#33343b]"
        style={{
          boxShadow: "inset -1px 0px 0px rgba(228, 228, 228, 0.1);",
        }}
      ></div>
      <div className="flex-1 flex flex-col">
        <div className="px-16 flex items-center h-[7rem]">
          <div>
            <img src="/img/search.svg" alt="search" />
          </div>
          <input
            className="flex-1 mx-5 text-sm font-semibold placeholder:text-[#808191] text-white bg-transparent outline-none"
            placeholder="Search Character"
          />
          <div>
            <img src="/img/avatar.svg" alt="avatar" className="ml-auto flex" />
          </div>
        </div>
        <div
          className="w-full h-px bg-[#33343b]"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(228, 228, 228, 0.1)",
          }}
        ></div>
        {props.children}
      </div>
    </div>
  );
}
