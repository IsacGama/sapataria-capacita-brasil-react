import styles from "./Header.module.css";
import React, { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-serif text-black font-bold text-xl">
          <span role="img" aria-label="sacola" className="text-xl">
            👜
          </span>
          Heritage Footwear
        </div>

        {/* Navegação Desktop */}
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

        {/* Ícones + Menu Mobile */}
        <div className="flex items-center gap-4 text-black">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-600 hidden sm:block" />
          <User className="w-5 h-5 cursor-pointer hover:text-gray-600 hidden sm:block" />
          <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-600 hidden sm:block" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1"
            aria-label="Abrir menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile com animação */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          menuOpen
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div className="px-6 py-4 space-y-2 text-black text-base">
          <a href="#" className="block hover:text-gray-600 transition">
            Novidades
          </a>
          <a href="#" className="block hover:text-gray-600 transition">
            Coleções
          </a>
          <a href="#" className="block hover:text-gray-600 transition">
            Sapatos
          </a>
          <a href="#" className="block hover:text-gray-600 transition">
            Acessórios
          </a>
          <a href="#" className="block hover:text-gray-600 transition">
            Sobre
          </a>
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <User className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
