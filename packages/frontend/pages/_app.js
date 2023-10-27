// pages/_app.js
import '../src/app/globals.css';
import NavBar from '../src/app/components/NavBar';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navigation */}
      <NavBar />
      
      {/* Page Content */}
      <div className="p-4">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
