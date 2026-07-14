"use client";

import { useMemo, useState } from "react";

const products = [
  {
    name: "Tortas soñadas",
    detail: "Diseños personalizados para cumpleaños y momentos que merecen algo único.",
    tag: "A tu medida",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Cupcakes",
    detail: "Suaves, coloridos y perfectos para mesas dulces, regalos o un antojo.",
    tag: "Favoritos",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Box dulces",
    detail: "Una selección irresistible para compartir, sorprender o darte un gusto.",
    tag: "Para regalar",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85",
  },
];

const flavorLabels: Record<string, string> = {
  chocolate: "Chocolate intenso",
  vainilla: "Vainilla suave",
  redvelvet: "Red velvet",
};

export default function Home() {
  const [occasion, setOccasion] = useState("Cumpleaños");
  const [portions, setPortions] = useState("15");
  const [flavor, setFlavor] = useState("chocolate");
  const [copied, setCopied] = useState(false);

  const orderText = useMemo(
    () =>
      `Hola Sugarcake, quiero consultar por una torta para ${occasion.toLowerCase()}, de ${portions} porciones y sabor ${flavorLabels[flavor].toLowerCase()}.`,
    [occasion, portions, flavor],
  );

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Sugarcake, ir al inicio">
          <span className="brand-mark">S</span>
          <span>
            Sugarcake
            <small>pastelería</small>
          </span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#delicias">Delicias</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#pedidos">Pedidos</a>
        </nav>
        <a className="header-cta" href="#pedidos">Quiero algo dulce</a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span>✦</span> Hecho con amor en Hurlingham</div>
          <h1>
            La vida es más rica con <em>algo dulce.</em>
          </h1>
          <p>
            Tortas, cupcakes y box artesanales que convierten cualquier momento en una celebración.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#delicias">Ver delicias <span>→</span></a>
            <a className="button button-ghost" href="#pedidos">Armar mi pedido</a>
          </div>
          <div className="hero-trust">
            <div className="avatars" aria-hidden="true"><span>🎂</span><span>🧁</span><span>🍓</span></div>
            <p><strong>Pastelería artesanal</strong><br />Pedidos personalizados y frescos</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="Torta rosa decorada con crema y frutas">
          <div className="blob blob-yellow" />
          <div className="blob blob-pink" />
          <div className="spark spark-one">✦</div>
          <div className="spark spark-two">✹</div>
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=90"
            alt="Torta artesanal decorada con crema"
          />
          <div className="floating-note note-one"><span>♥</span> Recién hecho</div>
          <div className="floating-note note-two"><span>★</span> 100% artesanal</div>
        </div>
      </section>

      <div className="marquee" aria-label="Especialidades">
        <div>
          <span>TORTAS PERSONALIZADAS</span><b>✦</b><span>CUPCAKES</span><b>✦</b>
          <span>BOX DULCES</span><b>✦</b><span>MESAS DULCES</span><b>✦</b>
          <span>TORTAS PERSONALIZADAS</span><b>✦</b><span>CUPCAKES</span><b>✦</b>
        </div>
      </div>

      <section className="delights section" id="delicias">
        <div className="section-heading">
          <div>
            <span className="kicker">Tentate un poquito</span>
            <h2>Nuestras delicias</h2>
          </div>
          <p>Preparadas de manera artesanal, con ingredientes elegidos y toda la dedicación.</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className={`product-card card-${index + 1}`} key={product.name}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span>{product.tag}</span>
              </div>
              <div className="product-copy">
                <p>0{index + 1}</p>
                <h3>{product.name}</h3>
                <span>{product.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="story" id="nosotros">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1100&q=85"
            alt="Preparación artesanal en una cocina de pastelería"
          />
          <div className="story-sticker">Hecho<br /><strong>con amor</strong><br />en Hurlingham</div>
        </div>
        <div className="story-copy">
          <span className="kicker">Un sabor que se recuerda</span>
          <h2>Tu idea, convertida en una torta inolvidable.</h2>
          <p>
            En Sugarcake creemos que cada festejo tiene su propia historia. Por eso hacemos cada pedido especialmente para vos: rico, fresco y con una presentación que enamora antes del primer bocado.
          </p>
          <div className="values">
            <div><span>01</span><p><strong>Artesanal</strong><br />Producción cuidada</p></div>
            <div><span>02</span><p><strong>Personalizado</strong><br />Diseños con tu estilo</p></div>
            <div><span>03</span><p><strong>Local</strong><br />Hecho en Hurlingham</p></div>
          </div>
        </div>
      </section>

      <section className="order section" id="pedidos">
        <div className="order-intro">
          <span className="kicker">Empecemos a festejar</span>
          <h2>Armá tu torta ideal</h2>
          <p>Elegí una base para tu pedido. Copiá el mensaje y envialo por el canal de contacto de Sugarcake para consultar disponibilidad.</p>
          <div className="location-pill">📍 Hurlingham, Buenos Aires</div>
        </div>

        <div className="order-builder">
          <label>
            <span>¿Para qué ocasión?</span>
            <select value={occasion} onChange={(event) => setOccasion(event.target.value)}>
              <option>Cumpleaños</option>
              <option>Aniversario</option>
              <option>Baby shower</option>
              <option>Casamiento</option>
              <option>Otro festejo</option>
            </select>
          </label>
          <label>
            <span>¿Cuántas porciones?</span>
            <select value={portions} onChange={(event) => setPortions(event.target.value)}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40 o más">40 o más</option>
            </select>
          </label>
          <fieldset>
            <legend>Sabor de base</legend>
            <div className="flavor-options">
              {Object.entries(flavorLabels).map(([value, label]) => (
                <label key={value} className={flavor === value ? "active" : ""}>
                  <input
                    type="radio"
                    name="flavor"
                    value={value}
                    checked={flavor === value}
                    onChange={(event) => setFlavor(event.target.value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="order-summary">
            <p>{orderText}</p>
            <button type="button" onClick={copyOrder}>{copied ? "¡Mensaje copiado!" : "Copiar consulta"}</button>
          </div>
        </div>
      </section>

      <section className="closing">
        <span>¿Se te antojó?</span>
        <h2>Hagamos algo<br /><em>rico y hermoso.</em></h2>
        <a className="button button-light" href="#pedidos">Empezar mi pedido <span>→</span></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-mark">S</span>
          <span>Sugarcake<small>pastelería</small></span>
        </a>
        <p>Pastelería artesanal • Hurlingham, Buenos Aires</p>
        <div><a href="#delicias">Delicias</a><a href="#nosotros">Nosotros</a><a href="#pedidos">Pedidos</a></div>
      </footer>
    </main>
  );
}
