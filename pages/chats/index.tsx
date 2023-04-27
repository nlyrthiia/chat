import Layout from "@/components/Layout";

export default function Chats() {
  return (
    <Layout>
      <div className="flex h-full">
        <div className="px-5 flex flex-col">
          <div className="flex px-5 h-20 items-center w-[21rem] cursor-default hover:bg-[#25D4D0] rounded-xl">
            <div>
              <img src="/img/mini-avatar.svg" alt="avatar" />
            </div>
            <div className="flex flex-col ml-4">
              <div className="text-sm font-semibold text-white">
                Jesus Brown
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                2m ago
              </div>
            </div>
            <div className="flex ml-auto">
              <img src="/img/right.svg" alt="right" />
            </div>
          </div>
          <div className="flex px-5 h-20 items-center w-[21rem] cursor-default hover:bg-[#25D4D0] rounded-xl">
            <div>
              <img src="/img/mini-avatar.svg" alt="avatar" />
            </div>
            <div className="flex flex-col ml-4">
              <div className="text-sm font-semibold text-white">
                Jesus Brown
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                2m ago
              </div>
            </div>
            <div className="flex ml-auto">
              <img src="/img/right.svg" alt="right" />
            </div>
          </div>
          <div className="flex px-5 h-20 items-center w-[21rem] cursor-default hover:bg-[#25D4D0] rounded-xl">
            <div>
              <img src="/img/mini-avatar.svg" alt="avatar" />
            </div>
            <div className="flex flex-col ml-4">
              <div className="text-sm font-semibold text-white">
                Jesus Brown
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                2m ago
              </div>
            </div>
            <div className="flex ml-auto">
              <img src="/img/right.svg" alt="right" />
            </div>
          </div>
          <div className="flex px-5 h-20 items-center w-[21rem] cursor-default hover:bg-[#25D4D0] hover:opacity-20 rounded-xl">
            <div>
              <img src="/img/mini-avatar.svg" alt="avatar" />
            </div>
            <div className="flex flex-col ml-4">
              <div className="text-sm font-semibold text-white">
                Jesus Brown
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                2m ago
              </div>
            </div>
            <div className="flex ml-auto">
              <img src="/img/right.svg" alt="right" />
            </div>
          </div>
        </div>
        <div
          className="h-full min-h-screen w-px bg-[#33343b]"
          style={{
            boxShadow: "inset -1px 0px 0px rgba(228, 228, 228, 0.1);",
          }}
        ></div>
        <div className="px-16 py-8">
          <div className="font-semibold text-[2.5rem] text-white">
            Character Assistant
          </div>
          <div className="py-6 px-16"></div>
        </div>
      </div>
    </Layout>
  );
}
