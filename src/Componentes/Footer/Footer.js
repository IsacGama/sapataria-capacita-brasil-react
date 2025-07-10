export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-100 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-bold font-serif">Heritage Footwear</h2>
          <p className="mt-2 text-zinc-400">Elegância em cada passo.</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-zinc-300">
            Links Rápidos
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-white">
                Novidades
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Coleções
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Sapatos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Sobre Nós
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-zinc-300">
            Ajuda
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-white">
                Contato
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Termos de Serviço
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-zinc-300">
            Newsletter
          </h3>
          <p className="text-zinc-400 mb-2">
            Assine para receber novidades e ofertas exclusivas.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Seu email"
              className="w-full px-3 py-2 rounded-l-md bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-r-md hover:bg-yellow-400 transition-colors"
            >
              Assinar
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-zinc-800 text-center py-4 px-6 text-zinc-500 text-xs flex flex-col md:flex-row justify-between items-center">
        <p>© 2024 Heritage Footwear. Todos os direitos reservados.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">
            🌐
          </a>
          <a href="#" className="hover:text-white">
            📷
          </a>
          <a href="#" className="hover:text-white">
            🐦
          </a>
        </div>
      </div>
    </footer>
  );
}
