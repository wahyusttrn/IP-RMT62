import { TCh2, TCh3, TCh4, TCHeader, TCp } from '@/components/Typography';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <header className="w-screen h-screen flex justify-center items-center">
        <div className="w-3/5 text-center">
          <TCHeader>
            Tired of facing really complicated tasks in your mind? Just <b>Shred</b> it.
          </TCHeader>
        </div>
      </header>
      <section className="w-screen flex flex-col items-center justify-center gap-70">
        <div className="w-full flex justify-center items-center gap-30">
          <div className="w-1/2 text-center">
            <TCh2>What is Shred?</TCh2>
            <TCp>
              Shred is a simple tool to help you break down complex tasks into smaller, manageable steps. It allows you
              to focus on one step at a time, making it easier to tackle even the most daunting projects.
            </TCp>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-30">
          <div className="w-96 h-64 bg-gray-200 rounded-lg flex justify-center items-center">
            <span className="text-gray-400">[Image/Illustration]</span>
          </div>
          <div className="w-2/6 sm:text-right">
            <TCh2>Easy to use</TCh2>
            <TCp>
              Shred is designed to be user-friendly. You can quickly create tasks, add steps, and track your progress
              without any hassle.
            </TCp>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-30">
          <div className="w-96 h-64 bg-gray-200 rounded-lg flex justify-center items-center sm:order-2">
            <span className="text-gray-400">[Image/Illustration]</span>
          </div>
          <div className="w-2/6">
            <TCh2>AI Powered (as what people love)</TCh2>
            <TCp>
              Shred uses AI to help you break down tasks intelligently. It suggests steps based on your input, making it
              easier to get started and stay on track.
            </TCp>
          </div>
        </div>
        <footer className="w-screen h-20 bg-gray-100 flex justify-center items-center">
          <TCh3>
            Made with ❤️ by{' '}
            <a href="https://wahyusattriana.com" target="_blank" className="underline">
              Wahyu Sattriana
            </a>
          </TCh3>
        </footer>
      </section>
    </main>
  );
}
