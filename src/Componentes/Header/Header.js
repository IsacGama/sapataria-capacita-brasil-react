import styles from "./Header.module.css";
import { Search, ShoppingCart, User } from "lucide-react";

export function Header() {
  return (
    <header
      className={`w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between ${styles.header}`}
    >
      <div className="flex items-center gap-2 text-black font-serif font-bold text-lg">
        <span className="border border-black rounded-sm p-1">&#128717;</span>{" "}
        Heritage Footwear
      </div>
      <nav className="hidden md:flex gap-6 text-sm text-black font-medium">
        <a href="#" className="hover:text-gray-600 transition-colors">
          Novidades
        </a>
        <a href="#" className="hover:text-gray-600 transition-colors">
          Coleções
        </a>
        <a href="#" className="hover:text-gray-600 transition-colors">
          Sapatos
        </a>
        <a href="#" className="hover:text-gray-600 transition-colors">
          Acessórios
        </a>
        <a href="#" className="hover:text-gray-600 transition-colors">
          Sobre
        </a>
      </nav>

      <div className="flex items-center gap-4 text-black">
        <Search className="w-5 h-5 cursor-pointer hover:text-gray-600" />
        <User className="w-5 h-5 cursor-pointer hover:text-gray-600" />
        <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-600" />
      </div>
    </header>
  );
}
