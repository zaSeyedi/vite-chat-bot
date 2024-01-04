import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Message from '../../components/Message';
import axios from "axios";
import '../../styles/isTyping.css'
import '../../styles/loading.css'
import ContainerLayout from '../../layout/containerLayout';
import ChatHeader from './chatHeader';
import { getTime } from '../../helpers/getDateAndTime';

const socket = io('http://78.157.46.108:3001', {
  autoConnect: false
});
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
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [init, setInit] = useState(socket.connected);
  const [lastMessageInfo, setLastMessageInfo] = useState<LastMessageInfo>();
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [post, setPost] = useState<MessageInfo | null>(null);
  const messagesEndRef = useRef<any>(null)
  let urlElements = window.location.pathname.split('/')


  useEffect(() => {
    socket.connect()
    function onConnect() {
      console.log('connected')
      setIsConnected(true);
      setInit(true)
    }

    function onDisconnect() {
      console.log('disconnect')
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect()
    };
  }, []);


  useEffect(() => {
    setupMessageEvent(messages)
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

  function setupMessageEvent(all: any) {
    socket?.on('resultNextStep', (msg: any) => {
      setMessages([...all, msg] as any);
      setLastMessageInfo({ id: msg._id, numeric: msg.numericKeyboard })
      setTimeout(() => {
        setIsTyping(msg.type === "Message" && msg.isLast === false)
      }, 1000);
      setIsTyping(msg.createdById === "student")
      console.log(msg)
    });
    setLoading(false)
  }

  useEffect(() => {
    if (init) {
      axios.get(`http://78.157.46.108:8080/bot/view/${urlElements[2]}`).then((data) => {
        setPost(data.data.data);
      });
    }
  }, [init]);

  useEffect(() => {
    if (post && socket) {
      startMessage(post);
    }
  }, [socket, post]);


  const startMessage = (data: any) => {
    setLoading(true)
    console.log('inited', socket)
    socket?.emit('nextStep', {
      "userId": data?.createdById._id,
      "botId": data?._id,
      "stepId": data?.startStepId,
      "goToNext": "0",
      "answers": "0"
    });
    setPost(data);

  };
  const sendMessage = () => {
    setIsTyping(true)
    setMessages([...messages, { text: messageText, createdById: 'student', createdAt: new Date() }] as any);
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
        <div className='flex flex-col overflow-y-scroll flex-1'>
          <div className='overflow-y-scroll h-screen'>
            <div
              className={`flex flex-col w-full ${loading ? 'p-0' : 'p-6'}`}>
              {messages.map((message, index) => (
                <div className={`flex flex-col ${message.createdById === "student" ? 'items-end' : 'items-start'} mb-3`}>
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
            {loading && <div className='flex items-center w-full h-full justify-center'><div className="loadingio-spinner-spin-e0qcogc5l4a mx-auto h-full"><div className="ldio-bz4lwtqws9q">
              <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
            </div></div></div>}
          </div>
        </div>
        <div className="input-box w-full mt-2 justify-center flex">
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

    </ContainerLayout>

  );
}

export default ChatPage;