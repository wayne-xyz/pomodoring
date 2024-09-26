// the header is the top bar of the app with Logo, Pricing, Chart-AI, Account  all the button are in the center of the header
import { LoaderCircle } from 'lucide-react';


export default function Header() {
  return (
    <div className="flex justify-center items-center h-16 bg-background">
      <div className="flex justify-center items-center w-full">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <LoaderCircle className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Pomodoring</h1>
          </div>
          <button className="text-primary">Pricing</button>
          <button className="text-primary">Chart-AI</button>
          <button className="text-primary">Account</button>
        </div>
      </div>
    </div>
  );
}

