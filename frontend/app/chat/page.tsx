import ChatBot from '@/components/ChatBot';
import historians from '@/data/historiansData.json';

export default function Home() {
    return (
        <main >
            <ChatBot historians={historians} />
        </main>
    );
}
