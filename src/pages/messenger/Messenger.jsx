import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import TopBar from "../../components/topbar/TopBar";
import "./messenger.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    const socketPort = process.env.SOCKET_PORT || 8900;
    socket.current = io(`ws://localhost:${socketPort}`);
    socket.current.on("getMessages", (data) => {
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      const onlineIds = users.map((u) => u.userId);
      setOnlineUsers(user.followings.filter((f) => onlineIds.includes(f)));
    });
  }, [user]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios(
          `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/conversation/${user._id}`
        );
        setConversation(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessages,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessages", {
      senderId: user._id,
      receiverId,
      text: newMessages,
    });
    try {
      const res = await axios.post(
        `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/messages`,
        message
      );
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div>
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" className="chatMenuInput" />
            {conversation.map((conversation, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentChat(conversation);
                }}
              >
                <Conversation conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <div>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div ref={scrollRef} key={index}>
                      <Message
                        messages={m}
                        own={m.sender === user._id}
                        currentUser={user}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Write here..."
                    className="chatMessageInput"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <span className="noConversationText">
                Open a new conversation to start chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatBoxWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
