// pages/_app.js
import '../src/app/globals.css';
import NavBar from '../src/app/components/NavBar';
import Image from 'next/image'

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen text-gray-900 bg-gray-100">
      {/* Navigation */}
      <NavBar />

      {/* Logo */}
      <div className="relative w-full py-4 bg-red-900 text-c enter" style={{height: 200}}>
          <Image
            src="/images/masterbotslogo.png"
            fill={true}
            alt="Masterbots Logo"
            style={{maxWidth: 726}}
          />
      </div>
      
      {/* Page Content */}
      <div className="p-4">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
