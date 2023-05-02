import Layout from "@/components/Layout";
import { API } from "@/contans";
import { characterDTOList } from "@/mock";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  // 获取query参数
  const [characterList, setCharacterList] = useState([]);
  const router = useRouter();
  const { search } = router.query;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      setTimeout(() => {
        const token = window.localStorage.getItem("token");
        const accountId: any = window.localStorage.getItem("accountId");
        if (token && accountId) {
          axios
            .post(
              `${API}/urs/character/searchCharacterDB`,
              {
                text: search,
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
              } else {
                setCharacterList([]);
              }
              setLoading(false);
            });
        }
      }, 1000);
    } else {
      const token = window.localStorage.getItem("token");
      const accountId: any = window.localStorage.getItem("accountId");
      if (token && accountId) {
        axios
          .post(
            `${API}/urs/character/listCharacters`,
            {},
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
      }
    }
  }, [search]);

  return (
    <Layout>
      <div
        className="p-16 flex flex-wrap overflow-auto"
        style={{
          maxHeight: "calc(100vh - 7rem)",
        }}
      >
        {loading ? (
          <div className="text-white">loading...</div>
        ) : (
          characterList.map((item: any, index: any) => (
            <div
              className="bg-[#242731] px-5 h-[23.375rem] w-[15rem] rounded-3xl py-6 ml-4 mb-8"
              onClick={() => {
                router.push(`/chats?character=${item.characterId}`);
              }}
            >
              <div className="w-[12.5rem] h-[12.5rem] rounded-full overflow-hidden">
                <img
                  className="w-full h-full"
                  src={
                    item.portraitUrl
                      ? item.portraitUrl
                      : "/img/default-avatar.svg"
                  }
                  alt="avatar"
                />
              </div>
              <div className="flex mt-6">
                {item.tags.split(",").map((tag, index) => (
                  <div className="mr-2 px-2 h-6 flex items-center  rounded-lg bg-[#243841] text-sm font-bold text-[#25D4D0]">
                    {tag}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-white text-lg font-medium">
                {item.name}
              </div>
              <div className="mt-4 flex items-center">
                <img
                  src={
                    item.portraitUrl ? item.portraitUrl : "/img/mini-avatar.svg"
                  }
                  className="w-6 h-6 rounded-full overflow-hidden"
                  alt="avatar"
                />
                <div className="ml-3 text-[#808191] font-medium text-xs">
                  @{item.name}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
