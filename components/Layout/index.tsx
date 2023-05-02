import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout({ ...props }) {
  const nav = ["Home", "Chats", "Create"];
  const router = useRouter();
  const [toastShow, setToastShow] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastTag, setToastTag] = useState(0);
  const [toastStep, setToastStep] = useState(0);
  const [soul, setSoul] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [templateTitle, setTemplateTitle] = useState("");
  const [templateStory, setTemplateStory] = useState("");
  const [templateEmotion, setTemplateEmotion] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [tagName, setTagName] = useState("");
  const [search, setSearch] = useState(router.query.search);

  useEffect(() => {
    setSearch(router.query.search);
  }, [router.query.search]);

  return (
    <div className="w-full relative h-full flex bg-[#1f2128] min-h-screen">
      <div className="px-5 pt-10 w-[16rem]">
        <div>
          <img src="/img/logo.svg" alt="logo" className="" />
        </div>
        {nav.map((item: any, index: any) => (
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (router.pathname !== "/home") {
                  router.push(`/home?search=${search}`);
                } else {
                  router.replace(`/home?search=${search}`);
                  setTimeout(() => {
                    router.reload();
                  }, 0);
                }
              }
            }}
          />
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="">
              <img
                src="/img/avatar.svg"
                alt="avatar"
                className="ml-auto flex"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu shadow bg-base-100 rounded-box "
            >
              <li
                onClick={() => {
                  localStorage.clear();
                  router.push("/");
                }}
              >
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="w-full h-px bg-[#33343b]"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(228, 228, 228, 0.1)",
          }}
        ></div>
        {props.children}
        {toastShow && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#1B1D21] bg-opacity-90">
            <div className="absolute top-1/2 w-[35rem] px-8 py-12 bg-[#242731] rounded-3xl left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-white">
                  Define Silicon-based Soul
                </span>
                <img src="/img/close.svg" alt="close" className="ml-auto" />
              </div>
              <div className="mt-6 flex">
                <div
                  onClick={() => setToastTag(0)}
                  className="cursor-pointer h-9 px-5 rounded-lg text-white text-sm font-semibold flex items-center justify-center"
                  style={{
                    background: toastTag === 0 ? "#25D4D0" : "transparent",
                    color: toastTag === 0 ? "#fff" : "#808191",
                  }}
                >
                  Custom
                </div>
                <div
                  onClick={() => setToastTag(1)}
                  className="ml-2 h-9 px-5 rounded-lg text-sm font-semibold flex justify-center items-center cursor-pointer"
                  style={{
                    background: toastTag === 1 ? "#25D4D0" : "transparent",
                    color: toastTag === 1 ? "#fff" : "#808191",
                  }}
                >
                  Template
                </div>
              </div>
              <input
                className="mt-4 outline-none w-full rounded-lg bg-[#2e303a] border border-[#E4E4E41A] px-6 h-14 py-4 text-white placeholder:text-[#808191] text-sm font-semibold"
                value={soul}
                placeholder="What kind of soul are you creating？"
                onChange={(e) => setSoul(e.target.value)}
              />
              <div className="mt-8 text-xs font-medium text-[#808191]">
                Custom Prompt
              </div>
              <textarea
                className="mt-4 px-6 h-[16rem] bg-[#373a43] py-4 outline-none border border-[#E4E4E41A] rounded-lg w-full resize-none text-sm font-medium placeholder:text-[#808191] text-white"
                placeholder="Describe the soul as you wich, in detail."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
