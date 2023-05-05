import { API } from "@/contans";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { templates } from "@/contans";

const TailwindToaster = () => {
  return (
    <Toaster>
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className="transform p-4 flex bg-white rounded shadow-lg"
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <ToastIcon toast={t} />
          <p className="px-2">{resolveValue(t.message, null)}</p>
        </Transition>
      )}
    </Toaster>
  );
};

export default function Layout({ ...props }) {
  const nav = ["Home", "Chats", "Create"];
  const router = useRouter();
  const [toastShow, setToastShow] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastTag, setToastTag] = useState(0);
  const [toastStep, setToastStep] = useState(1);
  const [soul, setSoul] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [templateList, setTemplateList] = useState(templates);
  const [templateTitle, setTemplateTitle] = useState("");
  const [templateStory, setTemplateStory] = useState("");
  const [templateEmotion, setTemplateEmotion] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [tagName, setTagName] = useState("");
  const [search, setSearch] = useState(router.query.search);
  const [showSelect, setShowSelect] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState<any>(null);
  const [emotion, setEmotion] = useState("");
  const [showAvatar, setShowAvatar] = useState("");
  const uploadRef = useRef(null);
  const [templateInfo, setTemplateInfo] = useState<any>({});
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    // 判断当前是否是signup或者/页面，如果不是，判断token是否存在，不存在跳转到登录页面
    if (
      router.pathname !== "/signup" &&
      router.pathname !== "/" &&
      !window.localStorage.getItem("token")
    ) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    setSearch(router.query.search);
  }, [router.query.search]);

  const parseKey = (key: string) => {
    return key.replace(/#/g, "").replace(/{/g, "").replace(/}/g, "").trim();
  };

  useEffect(() => {
    setTemplateInfo(templateList[selectTemplate]);
  }, [selectTemplate]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const accountId: any = window.localStorage.getItem("accountId");
    const email: any = window.localStorage.getItem("email");
    if (token && accountId) {
      axios
        .post(
          `${API}/urs/account/getAccount`,
          { accountId, email },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          if (res.data.code === 0) {
            const data = res.data.data;
            setUserInfo(data);
          }
        });
    }
  }, []);

  const getAllPasss = useCallback(() => {
    if (!name) {
      return false;
    }
    if (!avatar) {
      return false;
    }
    if (!tagName) {
      return false;
    }

    return true;
  }, [name, avatar, tagName]);

  return (
    <div className="w-full relative h-full flex bg-[#1f2128] min-h-screen max-h-screen">
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
                setToastShow(true);
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
            <div className="absolute top-1/2 w-[35rem] px-8 py-12 bg-[#242731] rounded-3xl left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[40rem] overflow-auto">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-white">
                  {toastStep < 3
                    ? "Define Silicon-based Soul"
                    : "Ready to arrive!"}
                </span>
                <img
                  src="/img/close.svg"
                  alt="close"
                  className="ml-auto cursor-pointer"
                  onClick={() => setToastShow(false)}
                />
              </div>
              {toastStep <= 2 ? (
                <div>
                  <div className="mt-6 flex">
                    {/* <div
                  className="h-9 px-5 cursor-default rounded-lg text-white text-sm font-semibold flex items-center justify-center"
                  style={{
                    background: toastStep === 0 ? "#25D4D0" : "transparent",
                    color: toastStep === 0 ? "#fff" : "#808191",
                  }}
                >
                  Custom
                </div> */}
                    <div
                      className="ml-2 h-9 cursor-default px-5 rounded-lg text-sm font-semibold flex justify-center items-center"
                      style={{
                        background:
                          toastStep === 1 || toastStep === 2
                            ? "#25D4D0"
                            : "transparent",
                        color:
                          toastStep === 1 || toastStep === 2
                            ? "#fff"
                            : "#808191",
                      }}
                    >
                      Template
                    </div>
                  </div>
                  {/* <input
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
              /> */}
                  {toastStep === 1 ? (
                    <div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowSelect(!showSelect);
                        }}
                        className="bg-[#232630] relative rounded-lg outline-none mt-4 w-full h-14 px-6 py-4 flex items-center justify-between"
                      >
                        <div className="text-[#808191] text-sm font-semibold">
                          {selectTemplate || selectTemplate === 0 ? (
                            <span className="text-white">
                              {templateList[selectTemplate].title}
                            </span>
                          ) : (
                            "Choose a kind of soul..."
                          )}
                        </div>
                        <img src="/img/down.svg" alt="down" />
                        {showSelect ? (
                          <div className="absolute rounded-lg px-6  bg-[#242731] left-0 right-0 top-0 bottom-0">
                            {templateList.length ? (
                              templateList.map((item: any, index) => (
                                <div
                                  onClick={() => {
                                    setSelectTemplate(index);
                                    setShowSelect(false);
                                    setToastStep(2);
                                  }}
                                  className="text-white cursor-default text-sm font-semibold h-14 bg-[#242731] flex justify-between items-center rounded-lg"
                                >
                                  {item.title}
                                  {index === 0 && (
                                    <img
                                      src="/img/down.svg"
                                      alt="down"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowSelect(false);
                                      }}
                                    />
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="absolute left-0 right-0 top-0 rounded-lg bg-[#242731]">
                                <div className="text-white text-sm font-semibold h-14 bg-[#242731] flex justify-between items-center rounded-lg">
                                  No template
                                  <img src="/img/down.svg" alt="down" />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-20 flex justify-center">
                        <img src="/img/box.svg" alt="box" />
                      </div>
                      <div className="mt-10 text-[#808191] text-sm font-medium flex justify-center">
                        Choose a kind, then you can fulfill it
                      </div>
                    </div>
                  ) : null}
                  {toastStep === 2 ? (
                    <div>
                      <div className="mt-4 cursor-default outline-none w-full rounded-lg bg-[#2e303a] border border-[#E4E4E41A] px-6 h-14 py-4 text-white placeholder:text-[#808191] text-sm font-semibold">
                        {templateList[selectTemplate].title}
                      </div>
                      {templateInfo &&
                        Object.keys(templateInfo.defaultValue).map(
                          (item, index) => {
                            if (item !== "#bot#" && item !== "#user#") {
                              return (
                                <div>
                                  <div className="text-[#808191] mt-8 text-xs font-medium">
                                    {parseKey(item)}
                                  </div>
                                  <textarea
                                    className="mt-4 px-6 h-[6rem] bg-[#373a43] py-4 outline-none border border-[#E4E4E41A] rounded-lg w-full resize-none text-sm font-medium placeholder:text-[#808191] text-white"
                                    value={templateInfo.defaultValue[item]}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setTemplateInfo((templateInfo) => {
                                        const defaultValue =
                                          templateInfo.defaultValue;
                                        defaultValue[item] = value;

                                        return {
                                          ...templateInfo,
                                          defaultValue,
                                        };
                                      });
                                    }}
                                  />
                                </div>
                              );
                            }
                          }
                        )}
                    </div>
                  ) : null}
                  <div className="flex mt-14 ">
                    {toastStep !== 1 && (
                      <div
                        onClick={() => {
                          setToastStep((toastStep) => toastStep - 1);
                        }}
                        className="h-14 text-white border border-[#808191] cursor-pointer rounded-2xl px-11 bg-transparent flex justify-center items-center"
                      >
                        Back
                      </div>
                    )}
                    <div
                      onClick={() => {
                        if (toastStep === 1) {
                          if (selectTemplate || selectTemplate === 0) {
                            setToastStep((toastStep) => toastStep + 1);
                          } else {
                            toast.error("Please select template");
                          }
                        } else {
                          setToastStep((toastStep) => toastStep + 1);
                        }
                      }}
                      className="h-14 rounded-2xl ml-8 cursor-pointer text-white text-sm font-bold w-[9.5rem] flex justify-center items-center"
                      style={{
                        background: toastStep === 1 ? "#808191" : "#25D4D0",
                      }}
                    >
                      Next step
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-[#808191] mt-8 text-xs font-medium">
                    Its Name
                  </div>
                  <input
                    className="mt-4 w-[17.1rem] outline-none  rounded-lg bg-[#2e303a] border border-[#E4E4E41A] px-6 h-14 py-4 text-white placeholder:text-[#808191] text-sm font-semibold"
                    value={name}
                    placeholder="How would you call it？"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="text-[#808191] mt-8 text-xs font-medium">
                    Character Avatar
                  </div>
                  <div className="flex mt-4 items-center">
                    <div className="w-20 h-20 overflow-hidden rounded-full">
                      <img
                        className="w-full h-full"
                        src={showAvatar ? showAvatar : "/img/upload-avatar.svg"}
                        alt="upload-avatar"
                      />
                    </div>
                    <div
                      onClick={() => {
                        uploadRef.current?.click();
                      }}
                      className="h-14 text-white cursor-pointer rounded-2xl px-11 bg-[#25D4D0] flex justify-center items-center ml-6"
                    >
                      Upload New
                    </div>
                    <input
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = function () {
                            setShowAvatar(reader.result as string);
                          };
                        }

                        const formData = new FormData();
                        formData.append("multipartFile", file);
                        const token = window.localStorage.getItem("token");
                        axios
                          .post(
                            `${API}/urs/character/savePortrait`,
                            {
                              multipartFile: file,
                            },
                            {
                              headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: token,
                              },
                            }
                          )
                          .then((res) => {
                            if (res.data.code === 0) {
                              setAvatar(res.data.data.picUrl);
                            }
                          });

                        e.target.value = "";
                      }}
                      type="file"
                      ref={uploadRef}
                      className="hidden"
                    />
                    <div className="h-14 text-white rounded-2xl px-11 bg-[#373a43] flex justify-center items-center ml-3">
                      Generate
                    </div>
                  </div>
                  <div className="text-[#808191] mt-12 text-xs font-medium">
                    tag Name
                  </div>
                  <input
                    className="mt-4 w-[17.1rem] outline-none w-full rounded-lg bg-[#2e303a] border border-[#E4E4E41A] px-6 h-14 py-4 text-white placeholder:text-[#808191] text-sm font-semibold"
                    value={tagName}
                    placeholder="Its Tag"
                    onChange={(e) => setTagName(e.target.value)}
                  />
                  <div className="mt-8 flex">
                    <div
                      onClick={() => {
                        setToastStep((toastStep) => toastStep - 1);
                      }}
                      className="h-14 text-white border border-[#808191] cursor-pointer rounded-2xl px-11 bg-transparent flex justify-center items-center"
                    >
                      Back
                    </div>
                    <div
                      onClick={() => {
                        if (!getAllPasss()) {
                          return;
                        }

                        const slots = {
                          ...templateInfo.defaultValue,
                          "#bot#": name,
                          "#user#": `${userInfo.firstName} ${userInfo.lastName}`,
                        };
                        axios
                          .post(
                            `${API}/urs/character/saveCharacter`,
                            {
                              name,
                              portraitUrl: avatar,
                              accountId:
                                window.localStorage.getItem("accountId"),
                              tags: tagName,
                              template: templateInfo.content,
                              slots,
                            },
                            {
                              headers: {
                                Authorization:
                                  window.localStorage.getItem("token"),
                              },
                            }
                          )
                          .then((res) => {
                            if (res.data.code === 0) {
                              toast.success(res.data.message);
                              setToastShow(false);

                              setTemplateList(templates);
                              setName("");
                              setAvatar("");
                              setTagName("");
                              setShowSelect(false);
                              setShowAvatar("");
                              setTemplateInfo({});
                              setToastStep(1);

                              setTimeout(() => {
                                if (router.pathname !== "/home") {
                                  router.push("/home");
                                } else {
                                  router.reload();
                                }
                              }, 1000);
                            }
                          });
                      }}
                      style={{
                        background: getAllPasss() ? "#25D4D0" : "#808191",
                      }}
                      className="h-14 text-white rounded-2xl px-11 cursor-pointer flex justify-center items-center ml-8"
                    >
                      Create
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <TailwindToaster />
    </div>
  );
}
