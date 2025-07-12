import { Banner } from "../../Componentes/Banner/Banner";

const imagens = [
  "https://blog.brooksfield.com.br/wp-content/uploads/2023/05/SEO_Banner_770-314_TXT-1.jpg",
  "https://blog.brooksfield.com.br/wp-content/uploads/2023/10/SEO_Banner_1903-500_DESK-6.jpg",
  "https://blog.brooksfield.com.br/wp-content/uploads/2023/06/SEO_Banner_1903-500_DESK.jpg",
];

export function Home() {
  return (
    <div>
      <Banner imagens={imagens} />
    </div>
  );
}
