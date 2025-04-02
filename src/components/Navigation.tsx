export default function Navigation() {
  return (
    <nav className="flex-1 flex items-center justify-center">
      <ul className="space-y-6 text-center">
        <li>
          <a href="#about" className="text-white text-2xl hover:text-gray-300 transition-colors">
            Chúng tôi
          </a>
        </li>
        <li>
          <a href="#products" className="text-white text-2xl hover:text-gray-300 transition-colors">
            Sản Phẩm
          </a>
        </li>
        <li>
          <a href="#pricing" className="text-white text-2xl hover:text-gray-300 transition-colors">
            Báo Giá
          </a>
        </li>
      </ul>
    </nav>
  );
} 