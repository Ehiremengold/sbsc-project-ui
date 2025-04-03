import { useState, useEffect, useRef } from 'react';
import SendButton from '../components/ui/SendButton';
import { WebSocketService } from 'shared-websocket/src/lib/websocketService';

interface RealTimeEditorProps {
  onTextChange: (text: string) => void;
}

/**
 * This is a simple real-time editor component that takes a callback function
 * as a prop and calls it whenever the text in the textarea changes.
 */
const App = ({ onTextChange }: RealTimeEditorProps) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    onTextChange(newText);
  };

  return (
    <main className="flex flex-col  gap-16 h-screen max-w-4xl mx-auto my-auto place-items-center mt-20">
      <div className="text-center">
        <h1 className="text-4xl lg:text-7xl font-bold text-[#F26722]">
          Hi SBSC Team!
        </h1>
        <p className="text-[#2E3060] text-xl lg:text-3xl font-medium">
          Share <span className="font-bold">&#183;</span> Collaborate{' '}
          <span className="font-bold">&#183;</span> Build
        </p>
      </div>
      <div className="border w-4/5 h-[700px] p-3 rounded-md shadow-md relative">
        <div className="h-[600px] overflow-scroll border">

        </div>
        <div className="flex justify-end items-center gap-4 absolute bottom-5 right-3 left-3">
          <textarea
            ref={inputRef}
            className="border flex-1 h-10 p-2 rounded-md shadow-md outline-[#F26722] resize-none"
            value={text}
            placeholder="Start typing..."
            onChange={handleChange}
          />
          <SendButton />
        </div>
      </div>
    </main>
  );
};

export default App;
