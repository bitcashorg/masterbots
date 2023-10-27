// components/NavBar.js
import Link from 'next/link';

function NavBar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link href="/">Chat</Link></li>
        <li><Link href="/browse">Browse</Link></li>
        <li><Link href="/share">Share</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
