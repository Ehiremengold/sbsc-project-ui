import { useState, useEffect, useRef } from 'react';
import SendButton from '../components/SendButton';
import { useNavigate } from 'react-router-dom';
import TeamHeader from '../components/TeamHeader';

interface Message {
  id: string;
  user: string;
  text: string;
  avatar: string;
  timestamp: number;
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

    socket.onopen = () => {
      console.log('WebSocket Connected');
      console.log('WebSocket Ready State:', socket.readyState); // debugging line
    };

    socket.onmessage = async (event) => {
      const dataText =
        event.data instanceof Blob ? await event.data.text() : event.data;
      try {
        const data = JSON.parse(dataText);

        if (!data || !data?.type) {
          console.warn('Received unknown or malformed message:', data);
          return;
        }

        switch (data.type) {
          case 'INIT':
            console.log("INIT received:", data.messages);
            setMessages(data.messages);
            break;

          case 'NEW_MESSAGE':
            setMessages((prev) => [...prev, data.message]);
            break;

          case 'EDIT_MESSAGE':
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === data.id ? { ...msg, text: data.newText } : msg
              )
            );
            break;

          case 'DELETE_MESSAGE':
            setMessages((prev) => prev.filter((msg) => msg.id !== data.id));
            break;

          case 'CLEAR_ALL':
            setMessages([]);
            break;

          default:
            console.warn('Unknown message type:', data.type);
        }
      } catch (err) {
        console.error('Failed to parse message', err);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // WebSocket connection closed
    socket.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    // Cleanup WebSocket on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (text.trim()) {
      sendMessage({ type: 'SEND', user: name, message: text });
      setText('');
    }
  };

  const handleEdit = (id: string, oldText: string) => {
    const newText = prompt('Edit your message:', oldText);
    if (newText) {
      sendMessage({ type: 'EDIT', id, newText });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      sendMessage({ type: 'DELETE', id });
    }
  };

  const sendMessage = (data: any) => {
    if (!data || typeof data !== 'object' || !data.type) {
      console.warn('Invalid message attempted:', data);
      return;
    }

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not ready. Message not sent:', data);
      return;
    }

    socketRef.current.send(JSON.stringify(data));
  };

  return (
    <main className="flex flex-col gap-10 h-screen max-w-4xl mx-auto my-auto place-items-center mt-10">
      <div className="text-center">
        <p className="text-[#2E3060] text-xl lg:text-3xl font-medium">
          Share <span className="font-bold">&#183;</span> Collaborate{' '}
          <span className="font-bold">&#183;</span> Build
        </p>
      </div>
      <div className="border w-4/5 h-[800px] p-3 relative">
        <TeamHeader sendMessage={sendMessage} />
        <div className="h-[2px] bg-[#F26722] w-full mt-2"></div>

        {/* Real-time message display */}
        <div className="h-[620px] overflow-y-scroll mt-5 flex flex-col gap-3 scroll-smooth scrollbar-thin scrollbar-thumb-[#F26722] scrollbar-track-[#F26722]/20">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 font-semibold mt-5">
              <p>Nothing Here Yet. Start a conversation!</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 ${
                message.user === name ? 'justify-end' : 'justify-start'
              }`}
            >
              <img
                src={message.avatar} // Display the avatar for each user
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="bg-[#F26722] text-white p-2 rounded-md max-w-[70%]">
                {message.text}
                <div className="text-xs text-gray-200 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>

                {message.user === name && (
                  <div className="text-sm text-right text-gray-400">
                    <button
                      onClick={() => handleEdit(message.id, message.text)}
                      className="mr-2 hover:text-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Text input for sending messages */}
        <div className="flex justify-end items-center gap-4 absolute bottom-5 right-3 left-3">
          <textarea
            ref={inputRef}
            className="border flex-1 h-10 p-2 rounded-md shadow-md outline-[#F26722] resize-none scroll-none"
            value={text}
            placeholder="Start typing..."
            onChange={handleChange}
          />
          <SendButton onClick={handleSend} />
        </div>
      </div>
    </main>
  );
};

export default Collaboration;
