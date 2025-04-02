export default function Footer() {
  return (
    <footer className="p-4 text-white">
      <div className="flex justify-center space-x-6 mb-4">
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-300 transition-colors"
        >
          Facebook
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-300 transition-colors"
        >
          Instagram
        </a>
        <a 
          href="https://zalo.me" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-300 transition-colors"
        >
          Zalo
        </a>
      </div>
      <div className="text-center text-sm">
        © {new Date().getFullYear()} 1102-Architecture. All rights reserved.
      </div>
    </footer>
  );
} 