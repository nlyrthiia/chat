import Layout from "@/components/Layout";
import { API } from "@/contans";
import { characterDTOList } from "@/mock";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Chats() {
  const router = useRouter();
  const { character } = router.query;
  const [characterList, setCharacterList] = useState([]);
  const [characterId, setCharacterId] = useState(character);
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState<any>({});
  const tags = ["ALL", "MY"];
  const [tag, setTag] = useState(0);
  const scrollRef = useRef<any>(null);
  const [entering, setEntering] = useState(false);

  const getTime = (lastChatTime: any) => {
    const time = new Date().getTime() - lastChatTime;
    const days = Math.floor(time / (24 * 3600 * 1000));
    const leave1 = time % (24 * 3600 * 1000);
    const hours = Math.floor(leave1 / (3600 * 1000));
    const leave2 = leave1 % (3600 * 1000);
    const minutes = Math.floor(leave2 / (60 * 1000));
    const leave3 = leave2 % (60 * 1000);
    const seconds = Math.round(leave3 / 1000);
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  const [result, setResult] = useState<any>([]);

  const getChats = () => {
    const token = window.localStorage.getItem("token");
    const accountId: any = window.localStorage.getItem("accountId");
    const email: any = window.localStorage.getItem("email");
    if (token && accountId) {
      axios
        .post(
          `${API}/urs/character/listCharacters`,
          {
            accountId: tag === 0 ? null : accountId,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res: any) => {
          if (res.data.code === 0) {
            setCharacterList(res.data.data.characterDTOList);
          }
        });

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
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    setResult([]);
  }, [characterId]);

  return (
    <Layout>
      <div
        className="flex"
        style={{
          maxHeight: "calc(100vh - 7rem)",
        }}
      >
        <div
          className="flex flex-1"
          style={{
            maxHeight: "calc(100vh - 7rem)",
          }}
        >
          <div className="px-5 max-h-screen overflow-y-auto overflow-x-hidden">
            <div className="flex mb-4 mt-2">
              {tags.map((item, index) => (
                <div
                  onClick={() => setTag(index)}
                  className="h-14 rounded-xl cursor-pointer flex mr-4 px-7 outline-none justify-center items-center text-sm font-semibold"
                  style={{
                    background: index === tag ? "#25D4D0" : "#203339",
                    color: index === tag ? "#fff" : "#808191",
                    width: index === 1 ? "8.75rem" : "auto",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            {characterList.map((item: any, index) => (
              <div
                className="flex px-5 h-20 items-center w-[21rem] cursor-default hover:bg-[#20454a] rounded-xl"
                style={{
                  background:
                    Number(characterId) === Number(item.characterId)
                      ? "#20454a"
                      : "",
                  display:
                    tag === 0
                      ? "flex"
                      : item.creatorAccountId === userInfo.accountId
                      ? "flex"
                      : "none",
                }}
                onClick={() => setCharacterId(item.characterId)}
              >
                <div>
                  <img
                    src={
                      item.portraitUrl
                        ? item.portraitUrl
                        : "/img/mini-avatar.svg"
                    }
                    alt="avatar"
                    className="w-12 h-12 rounded-full overflow-hidden"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <div className="text-sm font-semibold text-white">
                    {item.name}
                  </div>
                  <div className="text-sm font-semibold text-white mt-1">
                    {getTime(item.lastChatTime)}
                  </div>
                </div>
                <div className="flex ml-auto">
                  <img src="/img/right.svg" alt="right" />
                </div>
              </div>
            ))}
          </div>
          <div
            className="w-px bg-[#33343b]"
            style={{
              boxShadow: "inset -1px 0px 0px rgba(228, 228, 228, 0.1);",
              minHeight: "calc(100vh - 7rem)",
            }}
          ></div>
          {characterId && (
            <div className="px-16 py-8 flex flex-col flex-1">
              <div className="font-semibold text-[2.5rem] text-white">
                {
                  characterList.find(
                    (item: any) =>
                      Number(item.characterId) === Number(characterId)
                  )?.name
                }
              </div>
              <div className="py-6 flex-1 overflow-auto" ref={scrollRef}>
                {result.map((item: any, index: any) => {
                  if (item.info) {
                    return (
                      <div
                        className="flex"
                        style={{
                          marginTop: result.length ? "1.5rem" : "",
                        }}
                      >
                        <img
                          src={
                            item.type === "me"
                              ? "/img/mini-avatar.svg"
                              : characterList.find(
                                  (item: any) =>
                                    Number(item.characterId) ===
                                    Number(characterId)
                                )?.portraitUrl
                          }
                          className="w-14 h-14 rounded-full overflow-hidden"
                          alt="avatar"
                        />
                        <div className="ml-5 flex-1 mr-36">
                          <div className="flex">
                            <span className="text-white text-xs font-medium">
                              {item.type === "me"
                                ? `${userInfo.firstName} ${userInfo.lastName}`
                                : characterList.find(
                                    (item: any) =>
                                      Number(item.characterId) ===
                                      Number(characterId)
                                  )?.name}
                            </span>
                            <span className="ml-4 text-[#808191] text-xs font-medium">
                              {getTime(item.createTime)}
                            </span>
                          </div>
                          <div
                            className="bg-[#E4E4E41A] mt-4 px-6 py-4 text-[#808191] text-sm font-normal"
                            style={{
                              borderRadius: "20px 20px 20px 4px",
                              lineHeight: "1.5rem",
                              color: item.type === "me" ? "#808191" : "#fff",
                              background:
                                item.type === "me" ? "#E4E4E41A" : "#25D4D0",
                            }}
                          >
                            {item.message}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex">
                        <div
                          className="ml-[4.75rem] mt-2 text-sm font-normal px-6 py-4"
                          style={{
                            borderRadius: "4px 20px 20px 20px",
                            background:
                              item.type === "me" ? "#E4E4E41A" : "#25D4D0",
                            color: item.type === "me" ? "#808191" : "#fff",
                          }}
                        >
                          {item.message}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              {entering && (
                <div className="my-6 flex justify-center bg-[#33343b] h-14 px-11 rounded-2xl text-white font-bold text-sm w-[9.1rem] items-center mx-auto cursor-default">
                  Entering
                </div>
              )}
              <div className="py-6 px-16">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = e.target.value;

                      setResult((result) => {
                        if (
                          result.length &&
                          result[result.length - 1].type === "me"
                        ) {
                          const newChat = {
                            type: "me",
                            info: false,
                            message: value,
                            createTime: new Date().getTime(),
                          };
                          return [...result, newChat];
                        } else {
                          const newChat = {
                            type: "me",
                            info: true,
                            message: value,
                            createTime: new Date().getTime(),
                          };
                          return [...result, newChat];
                        }
                      });

                      setEntering(true);

                      axios
                        .post(
                          `${API}/urs/mvp/ask`,
                          {
                            accountId: Number(
                              window.localStorage.getItem("accountId")
                            ),
                            characterId,
                            message,
                          },
                          {
                            headers: {
                              Authorization:
                                window.localStorage.getItem("token"),
                            },
                          }
                        )
                        .then((res: any) => {
                          if (res.data.code === 0) {
                            const data = res.data.data;
                            const parseAnswer = (answer) => {
                              const mesage = answer
                                .replace("#Name#:", "")
                                .replace(
                                  "#user#",
                                  `${userInfo.firstName} ${userInfo.lastName}`
                                );
                              return mesage;
                            };
                            const message = parseAnswer(data.answer);
                            setResult((result) => {
                              if (
                                result.length &&
                                result[result.length - 1].type === "bot"
                              ) {
                                const newChat = {
                                  type: "bot",
                                  info: false,
                                  message,
                                  createTime: new Date().getTime(),
                                };
                                return [...result, newChat];
                              } else {
                                const newChat = {
                                  type: "bot",
                                  info: true,
                                  message,
                                  createTime: new Date().getTime(),
                                };
                                return [...result, newChat];
                              }
                            });
                          }
                        })
                        .finally(() => {
                          scrollRef.current?.scrollTo({
                            top: scrollRef.current.scrollHeight,
                          });
                          setEntering(false);
                        });

                      setMessage("");

                      scrollRef.current?.scrollTo({
                        top: scrollRef.current.scrollHeight,
                      });
                    }
                  }}
                  className="w-full px-6 h-10 bg-transparent border border-[#808191] outline-none rounded-2xl text-sm font-normal placeholder:#808191 text-white"
                  placeholder="Type Message"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
