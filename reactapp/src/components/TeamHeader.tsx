import { AvatarCircles } from '../components/ui/AvatarCircles';
import { avatars } from '../lib/utils';

interface TeamHeaderProps {
  sendMessage: (message: string) => void;
}

const TeamHeader = ({ sendMessage }: TeamHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className='flex flex-col gap-3'>
        <h2 className="sm:text-xl text-sm font-bold text-[#F26722]">
          #devOps-team
        </h2>
        <p className="text-gray-500 text-sm font-normal">
          Online <span className="text-[#F26722]">●</span> 4
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        <AvatarCircles numPeople={12} avatarUrls={avatars} />
        <button
          onClick={() => sendMessage(JSON.stringify({ type: 'CLEAR_ALL' }))}
          className="text-sm text-red-500"
        >
          Clear All Messages
        </button>
      </div>
    </div>
  );
};

export default TeamHeader;
