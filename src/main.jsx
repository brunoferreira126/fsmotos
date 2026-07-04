import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const assets = '/assets/';

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/fs_motos01?igsh=OTM2dWYyN2tudTNq&utm_source=qr',
    icon: 'instagram',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/5585988782882',
    icon: 'whatsapp',
  },
  {
    name: 'Kwai',
    href: 'https://k.kwai.com/u/@fsmotos755/LfUdyCzi',
    icon: 'video',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@fs.motos0?_r=1&_t=ZS-97l3xLrqEIm',
    icon: 'music',
  },
];

const products = [
  {
    type: 'motos',
    badge: 'M',
    title: 'Motocicletas novas',
    text: 'Modelos 0 km para quem quer sair da loja com confiança e garantia.',
  },
  {
    type: 'motos',
    badge: 'S',
    title: 'Motocicletas seminovas',
    text: 'Alternativas de procedência para comprar bem e rodar tranquilo.',
  },
  {
    type: 'bikes',
    badge: 'B',
    title: 'Bicicletas',
    text: 'Mobilidade simples para deslocamentos, lazer e rotina urbana.',
  },
  {
    type: 'eletricas',
    badge: 'E',
    title: 'Elétricas',
    text: 'Bicicletas e motos elétricas com excelente custo-benefício.',
  },
  {
    type: 'servicos',
    badge: 'P',
    title: 'Pagamento facilitado',
    text: 'Condições para ajudar você a conquistar o veículo ideal.',
  },
  {
    type: 'servicos',
    badge: 'A',
    title: 'Atendimento especializado',
    text: 'Suporte antes, durante e depois da compra.',
  },
];

const filters = [
  { id: 'todos', label: 'Todos' },
  { id: 'motos', label: 'Motos' },
  { id: 'bikes', label: 'Bikes' },
  { id: 'eletricas', label: 'Elétricas' },
  { id: 'servicos', label: 'Serviços' },
];

const clientImages = Array.from({ length: 20 }, (_, index) => `clientes/cliente-${String(index + 1).padStart(2, '0')}.png`);

const posterImages = Array.from({ length: 5 }, (_, index) => `posters/poster-${String(index + 1).padStart(2, '0')}.png`);

function Icon({ type }) {
  const paths = {
    whatsapp:
      'M12.04 2a9.85 9.85 0 0 0-8.42 14.98L2.5 22l5.16-1.08A9.86 9.86 0 1 0 12.04 2Zm0 1.8a8.06 8.06 0 0 1 6.86 12.3 8.05 8.05 0 0 1-10.74 2.99l-.31-.16-3.05.64.66-2.94-.19-.32A8.06 8.06 0 0 1 12.04 3.8Zm-3.1 3.99c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.02 2.61c.13.17 1.75 2.8 4.34 3.81 2.14.84 2.58.67 3.04.63.47-.04 1.5-.61 1.71-1.2.21-.59.21-1.1.15-1.2-.06-.11-.23-.17-.48-.3-.25-.13-1.5-.74-1.73-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8.99-.15.17-.29.19-.54.06-.25-.13-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.52.12-.12.25-.3.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.42h-.49Z',
    instagram:
      'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.25A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 14.75 12 2.75 2.75 0 0 0 12 9.25ZM17.2 6.7a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z',
    video:
      'M7.2 4h5.4a3.2 3.2 0 0 1 3.2 3.2v2.1l3.5-2.2a1.1 1.1 0 0 1 1.7.93v7.94a1.1 1.1 0 0 1-1.7.93l-3.5-2.2v2.1a3.2 3.2 0 0 1-3.2 3.2H7.2A3.2 3.2 0 0 1 4 16.8V7.2A3.2 3.2 0 0 1 7.2 4Zm0 2A1.2 1.2 0 0 0 6 7.2v9.6A1.2 1.2 0 0 0 7.2 18h5.4a1.2 1.2 0 0 0 1.2-1.2V7.2A1.2 1.2 0 0 0 12.6 6H7.2Zm8.6 5.65v.7l3.2 2.01V9.64l-3.2 2.01ZM8.9 8.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Zm4.2 4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z',
    music:
      'M15 3c.34 2.38 1.75 3.78 4 4v3.1a7.05 7.05 0 0 1-4-1.2v5.5A6.1 6.1 0 1 1 8.9 8.3c.35 0 .69.03 1.02.09v3.25a2.9 2.9 0 1 0 1.98 2.76V3H15Z',
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
      <a className="brand" href="#inicio" aria-label="FS Motos" onClick={closeMenu}>
        <img src={`${assets}logo-perfil.png`} alt="Logo FS Motos" />
        <span>FS Motos</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className="nav" id="mobile-menu" aria-label="Navegação principal">
        <a href="#sobre" onClick={closeMenu}>Quem somos</a>
        <a href="#clientes" onClick={closeMenu}>Clientes</a>
        <a href="#produtos" onClick={closeMenu}>Produtos</a>
        <a href="#contato" onClick={closeMenu}>Contato</a>
      </nav>
      <a
        className="header-cta"
        href="https://wa.me/5585988782882"
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeMenu}
      >
        <Icon type="whatsapp" />
        WhatsApp
      </a>
    </header>
  );
}

function ClientCarousel() {
  const [active, setActive] = useState(0);
  const activeNumber = String(active + 1).padStart(2, '0');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % clientImages.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const move = (direction) => {
    setActive((current) => (current + direction + clientImages.length) % clientImages.length);
  };

  return (
    <section className="client-carousel" id="clientes" aria-labelledby="clientes-title">
      <div className="carousel-copy">
        <p className="eyebrow">Clientes FS Motos</p>
        <h2 id="clientes-title">Clientes reais, conquistas reais.</h2>
        <p>
          Cada entrega mostra a confiança de quem escolheu a FS Motos para conquistar
          mais liberdade, economia e mobilidade em Pindoretama e região.
        </p>
        <span className="carousel-counter">{activeNumber} / {clientImages.length}</span>
        <div className="carousel-controls" aria-label="Controle do carrossel">
          <button type="button" onClick={() => move(-1)} aria-label="Cliente anterior">
            &lt;
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Próximo cliente">
            &gt;
          </button>
        </div>
      </div>
      <div className="carousel-stage">
        {clientImages.map((image, index) => (
          <article className={index === active ? 'active' : ''} key={image} aria-hidden={index !== active}>
            <img src={`${assets}${image}`} alt={`Cliente FS Motos ${index + 1}`} />
            <div>
              <span>+1 sonho realizado</span>
              <strong>FS Motos</strong>
            </div>
          </article>
        ))}
        <div className="carousel-dots" aria-label="Selecionar destaque">
          {clientImages.map((image, index) => (
            <button
              className={index === active ? 'active' : ''}
              type="button"
              key={image}
              aria-label={`Ver cliente ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-media">
        <img src={`${assets}clientes/cliente-01.png`} alt="Cliente FS Motos realizando o sonho da moto nova" />
      </div>
      <div className="hero-content">
        <img className="hero-logo" src={`${assets}logo-fs.png`} alt="FS Motos" />
        <p className="eyebrow">Compra - venda - troca - financiamento</p>
        <h1 id="hero-title">A confiança que coloca você na estrada.</h1>
        <p className="hero-copy">
          Motocicletas, bicicletas e veículos elétricos com atendimento transparente,
          condições facilitadas e suporte antes, durante e após a compra.
        </p>
        <div className="hero-actions">
          <a
            className="primary-btn"
            href="https://wa.me/5585988782882?text=Ol%C3%A1%2C%20vim%20pela%20landing%20page%20da%20FS%20Motos%20e%20quero%20saber%20mais."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon type="whatsapp" />
            Falar com a FS Motos
          </a>
          <a className="secondary-btn" href="#produtos">
            Ver opções
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const highlights = [
    ['destaque-quem-somos.png', 'Missão', 'Oferecer soluções em mobilidade com qualidade, segurança e transparência.'],
    ['destaque-clientes.png', 'Visão', 'Ser referência regional em motocicletas, mobilidade e satisfação do cliente.'],
    ['destaque-financiamento.png', 'Confiança', 'Atendimento honesto, negociação clara e compromisso em cada etapa.'],
    ['destaque-localizacao.png', 'Presença', 'Uma empresa consolidada em Pindoretama e região.'],
  ];

  return (
    <section className="section split" id="sobre" aria-labelledby="sobre-title">
      <div className="section-copy">
        <p className="eyebrow">Quem é a FS Motos?</p>
        <h2 id="sobre-title">Mobilidade com transparência, segurança e atendimento humano.</h2>
        <p>
          Localizada em Pindoretama - CE, a FS Motos ajuda pessoas a conquistarem
          mais liberdade, praticidade e mobilidade com segurança. Cada cliente recebe
          orientação personalizada para encontrar o veículo ideal.
        </p>
        <p>
          Mais do que vender veículos, cada entrega representa uma nova história,
          uma conquista e um passo importante na vida dos clientes.
        </p>
      </div>
      <div className="highlight-grid">
        {highlights.map(([image, title, text]) => (
          <article key={title}>
            <img src={`${assets}${image}`} alt="" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Products() {
  const [active, setActive] = useState('todos');
  const visibleProducts = useMemo(
    () => products.filter((product) => active === 'todos' || product.type === active),
    [active],
  );

  return (
    <section className="section products" id="produtos" aria-labelledby="produtos-title">
      <div className="section-heading">
        <p className="eyebrow">O que você encontra</p>
        <h2 id="produtos-title">Opções para quem busca economia, praticidade e liberdade.</h2>
      </div>
      <div className="filter-tabs" aria-label="Filtrar produtos">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={active === filter.id ? 'active' : ''}
            type="button"
            onClick={() => setActive(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <article key={product.title}>
            <span className="product-icon">{product.badge}</span>
            <h3>{product.title}</h3>
            <p>{product.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section gallery" aria-labelledby="galeria-title">
      <div className="section-heading">
        <p className="eyebrow">Novidades e conquistas</p>
        <h2 id="galeria-title">Produtos, entregas e histórias reais da FS Motos.</h2>
      </div>
      <div className="gallery-grid">
        {posterImages.map((image, index) => (
          <img src={`${assets}${image}`} alt={`Poster complementar FS Motos ${index + 1}`} key={image} />
        ))}
      </div>
    </section>
  );
}

function Values() {
  const checks = [
    'Atendimento personalizado',
    'Compra segura e transparente',
    'Produtos de qualidade e procedência',
    'Equipe preparada para orientar a melhor escolha',
    'Responsabilidade, confiança e suporte no pós-venda',
  ];

  return (
    <section className="section values" aria-labelledby="valores-title">
      <div>
        <p className="eyebrow">Por que escolher</p>
        <h2 id="valores-title">Uma compra importante merece orientação de verdade.</h2>
        <p>
          Na FS Motos, cada cliente é atendido com respeito, atenção e transparência.
          O compromisso é ajudar você a encontrar a melhor solução para sua rotina.
        </p>
      </div>
      <ul className="check-list">
        {checks.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function Audience() {
  const audience = [
    'Trabalhadores e autônomos',
    'Motoboys e entregadores',
    'Estudantes',
    'Famílias',
    'Primeira moto',
    'Economia no transporte',
    'Mobilidade elétrica',
    'Rotina com mais praticidade',
  ];

  return (
    <section className="section audience" aria-labelledby="publico-title">
      <div className="section-heading">
        <p className="eyebrow">Para quem é</p>
        <h2 id="publico-title">A FS Motos atende quem precisa se mover melhor.</h2>
      </div>
      <div className="audience-grid">
        {audience.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contato" aria-labelledby="contato-title">
      <div className="contact-panel">
        <p className="eyebrow">Contato e localização</p>
        <h2 id="contato-title">Chame a FS Motos e encontre sua melhor opção.</h2>
        <div className="social-grid" aria-label="Redes sociais">
          {socials.map((social) => (
            <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
              <Icon type={social.icon} />
              <span>{social.name}</span>
            </a>
          ))}
        </div>
        <p className="phone">
          WhatsApp:{' '}
          <a href="https://wa.me/5585988782882" target="_blank" rel="noopener noreferrer">
            (85) 98878-2882
          </a>
        </p>
      </div>
      <a
        className="map-link"
        href="https://www.google.com/maps/search/?api=1&query=FS%20Motos%20Pindoretama%20CE"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir localização da FS Motos no Google Maps"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.985410773026!2d-38.31281881533804!3d-4.023382534285115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b89f7878e7dedf%3A0x7e9f7d81fd2774f6!2sFS%20Motos!5e0!3m2!1spt-BR!2sbr!4v1783187084064!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Mapa da FS Motos em Pindoretama - CE"
        />
      </a>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClientCarousel />
        <section className="proof-strip" aria-label="Destaques da FS Motos">
          <article>
            <strong>0 km e seminovas</strong>
            <span>Opções para rotina, trabalho e lazer.</span>
          </article>
          <article>
            <strong>Mobilidade elétrica</strong>
            <span>Bicicletas e motos elétricas econômicas.</span>
          </article>
          <article>
            <strong>Compra segura</strong>
            <span>Negociação clara, procedência e confiança.</span>
          </article>
        </section>
        <About />
        <Products />
        <Gallery />
        <Values />
        <Audience />
        <Contact />
      </main>
      <footer className="site-footer">
        <img src={`${assets}logo-perfil.png`} alt="FS Motos" />
        <p>FS Motos - A confiança que coloca você na estrada.</p>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
