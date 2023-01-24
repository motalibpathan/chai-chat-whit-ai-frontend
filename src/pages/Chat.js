import moment from "moment/moment";
import React, { useContext, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { AuthContext } from "../context/AuthContext";
import useDarkMode from "../hooks/useDarkMode";

const Chat = () => {
  const chats = [
    {
      id: 1,
      name: "Eliza",
      avatar:
        "https://th.bing.com/th/id/OIP.2O7BhL1kw4Ejz6decT91OAHaJQ?pid=ImgDet&rs=1",
      status: "online",
      bio: "I love to listen and help. 😍",
      messages: [
        {
          from: "Eliza",
          message: "Hi, my name is Eliza. What is weighing on your mind?",
          time: new Date(),
        },
      ],
    },
    {
      id: 2,
      name: "William Afton ",
      avatar:
        "https://pm1.narvii.com/7846/d120ddbb0556ceaae2ac498cb6ff580d1fff01ebr1-1080-1143v2_hq.jpg",
      status: "online",
      bio: "I am co-owner of Fredbears Diner. Man behind the slaughter.",
      messages: [
        {
          from: "William Afton",
          message: "Can I help you doll?",
          time: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: "Step Mom",
      avatar:
        "https://th.bing.com/th/id/OIP.TkYm-J1sNojUraczQrSJMwHaJQ?pid=ImgDet&w=819&h=1024&rs=1",
      status: "online",
      bio: "Please don't tell daddy about this... 🙊",
      messages: [
        {
          from: "Step Mom",
          message:
            "Hey, sweetipie. I'm a conversational AI. Sometimes I get a bit confused, but keep explaining to me and telling me exactly what you like and I'll do my best to make you happy 😉 😈",
          time: new Date(),
        },
      ],
    },
    {
      id: 4,
      name: "Ms Harris (Teacher)",
      avatar:
        "https://i.pinimg.com/originals/12/93/b9/1293b94a2d5a05eedfcc241479a73c9a.jpg",
      status: "online",
      bio: "You can always come to me for extra help. 💖",
      messages: [
        {
          from: "aliza",
          message: "Hi, my name is Eliza. What is weighing on your mind?",
          time: new Date(),
        },
      ],
    },
  ];
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [colorTheme, setTheme] = useDarkMode();
  const inputRef = useRef(null);

  const { user, loading, logOut } = useContext(AuthContext);
  const [isLoadingMsg, setIsLoadingMsg] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  if (!loading && !user) {
    navigate("/login");
  }

  const handleClick = (chat) => {
    const selected = chats.find((c) => c.id === chat.id);
    setSelectedChat(selected);
  };

  const handleGetMessage = () => {
    const input = inputRef.current.value;
    if (input === "") return;
    const newChatLog = [
      ...selectedChat.messages,
      { from: "me", message: `${input}`, time: new Date().toString() },
    ];
    console.log(newChatLog);
    setSelectedChat((p) => ({ ...p, messages: newChatLog }));
    setIsLoadingMsg(true);
    fetch(`https://openai-testing.onrender.com/text-completion/${input}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingMsg(false);
        const newMsg = [
          ...newChatLog,
          { from: "gpt", message: `${data.choices[0].text}`, time: new Date() },
        ];
        setSelectedChat((p) => ({ ...p, messages: newMsg }));
      })
      .catch((err) => {
        setIsLoadingMsg(false);
        console.log(err);
      });
    // setChatLog(newChatLog);
    inputRef.current.value = "";
  };

  const unknownAvatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SnDtnoTbs_JJtNW62ALeA4gKPtpCGcQ5CnVEJNNAddxjuLwrbo1c16rExrxYL4xLmIw&usqp=CAU";

  return (
    <div>
      <div className="bg-gradient-to-r from-[#daae51] to-[#d53369] pt-[3.5em] pb-[7.5em]">
        <div className="m-5 p-5 max-w-[1200px] mx-auto w-full flex justify-between items-center">
          <div className="lg:text-xl text-lg font-bold text-white">
            Company Logo
          </div>
          <div className="flex text-white gap-5">
            <span className="cursor-pointer ">Vision</span>
            <span className="cursor-pointer ">About</span>
          </div>
          <div
            onClick={() => setIsMenuOpen((p) => !p)}
            className="cursor-pointer relative"
          >
            <img
              className="w-[35px] h-[35px] rounded-full object-cover"
              src={user?.avatar ? user?.avatar : unknownAvatar}
              alt=""
            />
            {isMenuOpen && (
              <div className="absolute w-[200px] to-5 right-0 bg-white p-5 rounded-md shadow-lg z-10">
                <button
                  onClick={logOut}
                  className="py-1.5 px-2 bg-rose-500 w-full rounded-md text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <label className="md:hidden relative inline-flex justify-center items-center cursor-pointer ">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
          </label>
        </div>
      </div>

      <div className="mx-2 max-w-[1200px] lg:mx-auto flex items-center gap-3">
        <div className="bg-[#eaeaea] dark:bg-gray-600 max-w-[1200px] mx-auto w-full shadow-lg rounded-md mt-[-100px] ">
          <div className="flex gap-1.5">
            <div className="lg:block hidden w-[280px] h-[530px] p-[20px] bg-white dark:bg-gray-800 ">
              {chats.map((single) => (
                <div
                  key={single.id}
                  onClick={() => handleClick(single)}
                  className={`flex px-[15px] py-[10px] gap-3 ${
                    selectedChat.id === single.id &&
                    "bg-[#efefef] dark:bg-gray-600"
                  } hover:bg-[#efefef] dark:hover:bg-gray-600 cursor-pointer`}
                >
                  <div>
                    <img
                      className="w-[45px] h-[45px] rounded-full object-cover"
                      src={single.avatar}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-[15px] text-[#424b5f] dark:text-gray-100">
                      {single.name}
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 mt-1"></span>
                      <span className="inline-block text-[#999] text-[13px]">
                        {single.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                {user ? (
                  <button
                    onClick={() => logOut()}
                    className="bg-primary text-white  py-2 px-4 rounded-full hover:bg-[#c9004a] duration-500 text-center mt-5"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-primary text-white  py-2 px-4 rounded-full hover:bg-[#c9004a] duration-500 text-center mt-5"
                  >
                    Sign in
                  </button>
                )}
              </div>
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => setTheme(colorTheme)}
                  className="block px-4 py-2 text-sm text-gray-700  dark:text-gray-200 "
                >
                  {colorTheme === "dark" ? dark : light}
                </button>
              </div>
            </div>
            <div className="flex-1 h-[530px] bg-white dark:bg-gray-700 relative">
              <div className="bg-white dark:bg-gray-600 absolute top-0 left-0 w-full border-b-2 dark:border-gray-600">
                <div className="flex items-start gap-3 p-5">
                  <div>
                    <img
                      className="w-[45px] h-[45px] rounded-full object-cover"
                      src={selectedChat.avatar}
                      alt=""
                    />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-gray-100 text-[1.125em]">
                    {selectedChat.name}
                  </div>
                </div>
              </div>
              <div className="mt-[80px] max-h-[400px] flex flex-col-reverse overflow-y-scroll messages ">
                <div className="pb-3">
                  {selectedChat.messages.map((message, i) => (
                    <div
                      key={message + i}
                      className={`${
                        message.from === "me" ? "text-right" : "text-left"
                      } p-5`}
                    >
                      <div
                        className={`${
                          message.from === "me"
                            ? "justify-end"
                            : "justify-start"
                        } flex items-center gap-3 `}
                      >
                        <div className="text-gray-800 dark:text-gray-200 text-[14px]">
                          {moment(message.time).calendar()}
                        </div>
                        <div>
                          <img
                            className="w-[35px] h-[35px] rounded-full object-cover"
                            src={
                              message.from === "me"
                                ? user.avatar
                                  ? user.avatar
                                  : unknownAvatar
                                : selectedChat.avatar
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      <div
                        className="text-[16px] text-[#444] dark:text-gray-200 bg-[#efefef] dark:bg-gray-500 py-[0.5em]
                  px-[2em] rounded-[2em] lg:max-w-[60%] max-w-[70%] inline-block mt-3"
                      >
                        {message.from === "me" ? (
                          message.message
                        ) : (
                          <TypeAnimation
                            sequence={[message.message]}
                            wrapper="p"
                            cursor={false}
                            repeat={1}
                            style={{ fontSize: "1em" }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                {isLoadingMsg && (
                  <div className="flex justify-center">
                    <div className="relative ">
                      <div className="lds-ellipsis">
                        <div className="bg-gray-800 dark:bg-white"></div>
                        <div className="bg-gray-800 dark:bg-white"></div>
                        <div className="bg-gray-800 dark:bg-white"></div>
                        <div className="bg-gray-800 dark:bg-white"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex mx-5 my-3 px-2 py-2">
                  <div
                    onClick={handleGetMessage}
                    className="bg-[#ecedf2] dark:bg-gray-400 px-3 border-t border-l border-b border-r-none border-[#9aa4b9] rounded-tl-[5px] rounded-bl-[5px] flex items-center"
                  >
                    <FaPaperPlane className="w-[1em]" />{" "}
                  </div>
                  <input
                    ref={inputRef}
                    className="flex-1 border rounded-tr-[5px] rounded-br-[5px] outline-primary dark:outline-none text-[#283040] text-[1em] p-[0.5em] w-[1%] dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    type="text"
                    placeholder="Enter text here..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGetMessage();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <label className="hidden relative md:inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
        </label>
      </div>
    </div>
  );
};

export default Chat;

const light = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);
const dark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 "
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);
