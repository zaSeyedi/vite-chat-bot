import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Message from '../../components/Message';
import axios from "axios";
import '../../styles/isTyping.css'
import '../../styles/loading.css'
import ContainerLayout from '../../layout/containerLayout';
import ChatHeader from './chatHeader';
import { getTime } from '../../helpers/getDateAndTime';

const socket = io('http://78.157.46.108:3001');
type MessageInfo = {
  _id: string;
  startStepId: string;
  createdById: {
    _id: string
  }
};
type LastMessageInfo = {
  id: string;
  numeric: string;
};

function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState('');
  const [lastMessageInfo, setLastMessageInfo] = useState<LastMessageInfo>();
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [post, setPost] = useState<MessageInfo>();
  const messagesEndRef = useRef<any>(null)

  useEffect(() => {
    socket.on('resultNextStep', (msg) => {
      setMessages([...messages, msg] as any);
      setLastMessageInfo({ id: msg._id, numeric: msg.numericKeyboard })
      setTimeout(() => {
        setIsTyping(msg.type === "Message")
      }, 1000);
      setIsTyping(msg.createdById === "student")
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    });
    setLoading(false)
    axios.get("http://78.157.46.108:8080/bot/view/تست").then((data) => {
      setPost(data.data.data);
    });
    console.log(messages)
  }, [messages]);

  const startMessage = () => {
    setLoading(true)
    socket.emit('nextStep', {
      "userId": post?.createdById._id,
      "botId": post?._id,
      "stepId": post?.startStepId,
      "goToNext": "0",
      "answers": "0"
    });

  };
  const sendMessage = () => {
    console.log(lastMessageInfo)
    setIsTyping(true)
    setMessages([...messages, { text: messageText, createdById: 'student' }] as any);
    socket.emit('nextStep', {
      "userId": post?.createdById._id,
      "botId": post?._id,
      "stepId": lastMessageInfo?.id,
      "goToNext": 1,
      "answers": messageText
    });
    setMessageText('');
  };

  return (
    <ContainerLayout>
      <div className='h-full flex flex-col justify-between pb-6'>
        <ChatHeader onclick={() => socket.close()} />
        <div className='flex flex-col overflow-y-scroll'>
          <div className='overflow-y-scroll'>
            <div className="flex flex-col w-full p-6">
              {messages.map((message, index) => (
                <div className='flex flex-col items-start mb-3'>
                  <div
                    ref={messagesEndRef}
                    className={`flex flex-col border p-3 w-fit ${message.createdById === "student" ? 'self-end' : 'self-start'}`}>
                    <Message
                      key={index}
                      text={message.text}
                    />
                  </div>
                  <div className='text-xs'>{getTime(message.createdAt)}</div>
                </div>

              ))}
              {isTyping &&
                <div className="loadingio-spinner-ellipsis-im4lfyjrno"><div className="ldio-keytljv6rgj">
                  <div></div><div></div><div></div><div></div><div></div>
                </div></div>
              }
            </div>
            {messages.length === 0 && !loading &&
              <div
                className='cursor-pointer mb-96 font-extrabold text-2xl bg-slate-300 p-4 w-fit mx-auto'
                onClick={startMessage}>
                Start Bot
              </div>}
            {loading && <div className="loadingio-spinner-spin-e0qcogc5l4a mb-80"><div className="ldio-bz4lwtqws9q">
              <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
            </div></div>}
          </div>
          <div className="input-box w-full mt-2">
            <input
              className='border w-4/5 p-2'
              type={lastMessageInfo?.numeric ? 'number' : 'text'}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
            />
            <button className='ml-4 text-lg font-semibold text-blue-500' onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>

    </ContainerLayout>

  );
}

export default ChatPage;