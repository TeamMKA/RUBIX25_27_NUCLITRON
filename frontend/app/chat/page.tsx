import ChatBot from '@/components/ChatBot';
import historians from '@/data/historiansData.json';

export default function Home() {
    return (
        <main className="relative bg-black-100 mt-20 flex justify-center items-center flex-col mx-auto  overflow-clip">
            <ChatBot historians={historians} />
        </main>
    );
}
