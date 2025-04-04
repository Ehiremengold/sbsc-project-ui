import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SendButton from '../components/ui/SendButton';
import { AvatarCircles } from '../components/ui/AvatarCircles';
import { avatars } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface Message {
  user: string;
  text: string;
}

const Collaboration = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  // Get user name from localStorage
  const name = localStorage.getItem('userName') || '';

  useEffect(() => {
    if (!name) {
      navigate('/'); // Redirect if no name is set
      return;
    }

    const socket = new WebSocket('ws://localhost:8000');
    socketRef.current = socket;

    socket.onopen = () => console.log('WebSocket Connected');

    socket.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        const textData = await event.data.text();
        try {
          const data = JSON.parse(textData);
          console.log('Received message:', data.message);
          setMessages((prevMessages) => [...prevMessages, { user: data.user, text: data.message }]);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.error('Unexpected WebSocket data type:', typeof event.data);
      }
    };

    socket.onerror = (error) => console.error('WebSocket Error:', error);
    socket.onclose = () => console.log('WebSocket Disconnected');

    return () => socketRef.current?.close();
  }, []);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (text.trim() && socketRef.current) {
      console.log('Sending message:', text);
      socketRef.current.send(JSON.stringify({ message: text }));
      setText('');
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col gap-10 h-screen max-w-4xl mx-auto my-auto place-items-center mt-10"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <p className="text-[#2E3060] text-xl lg:text-3xl font-medium">
          Share <span className="font-bold">&#183;</span> Collaborate <span className="font-bold">&#183;</span> Build
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="border w-4/5 h-[800px] p-3 relative"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#F26722]">#devOps-team</h2>
            <p className="text-gray-500 text-sm font-normal">
              Online <span className="text-[#F26722]">●</span> 4
            </p>
          </div>
          <AvatarCircles numPeople={12} avatarUrls={avatars} />
        </div>

        <div className="h-[2px] bg-[#F26722] w-full mt-2"></div>

        <div className="h-[620px] overflow-y-scroll mt-5 flex flex-col gap-3 scroll-smooth scrollbar-thin scrollbar-thumb-[#F26722] scrollbar-track-[#F26722]/20">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-500 font-semibold mt-5"
            >
              <p>Nothing Here Yet. Start a conversation!</p>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: message.user === name ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-3 ${message.user === name ? 'justify-end' : 'justify-start'}`}
            >
              <img
                src={avatars[0].imageUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="bg-[#F26722] text-white p-2 rounded-md max-w-[70%]">
                {message.text}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end items-center gap-4 absolute bottom-5 right-3 left-3"
        >
          <motion.textarea
            ref={inputRef}
            className="border flex-1 h-10 p-2 rounded-md shadow-md outline-[#F26722] resize-none scroll-none"
            value={text}
            placeholder="Start typing..."
            onChange={handleChange}
            whileFocus={{ scale: 1.02, borderColor: "#F26722" }}
          />
          <SendButton onClick={handleSend} />
        </motion.div>
      </motion.div>
    </motion.main>
  );
};

export default Collaboration;
