import { useEffect, useRef, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { collections, images, money, products } from "./catalogue"
import type { CartItem, Product } from "./catalogue"

function Icon({ name, size = 20 }: {
  name: string
  size?: number
}) {
  const paths: Record<string, ReactNode> = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    bag: (
      <>
        <path d="M5 7h14l1 14H4L5 7Z" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
      </>
    ),
    arrow: (
      <>
        <path d="M3 12h17m-6-6 6 6-6 6" />
      </>
    ),
    close: <path d="m5 5 14 14M5 19 19 5" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    plus: <path d="M5 12h14M12 5v14" />,
    minus: <path d="M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    heart: (
      <path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1C0 9 6 15 12 21c6-6 12-12 8-16Z" />
    ),
    box: (
      <>
        <path d="m12 3 9 5v10l-9 5-9-5V8l9-5Zm0 10v10M3 8l9 5 9-5M7 5l9 5" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="1" />
        <path d="M8 10V6a4 4 0 0 1 8 0v4" />
      </>
    ),
    chat: <path d="M21 4H3v14h5l4 4v-4h9V4Z" />,
    filter: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
        <circle cx="8" cy="6" r="2" fill="currentColor" />
        <circle cx="16" cy="12" r="2" fill="currentColor" />
        <circle cx="10" cy="18" r="2" fill="currentColor" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  )
}
function Link({
  to,
  children,
  className = "",
  onClick,
}: {
  to: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <a href={`#${to}`} className={className} onClick={onClick}>
      {children}
    </a>
  )
}
function Button({
  children,
  onClick,
  disabled = false,
  secondary = false,
  type = "button",
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  secondary?: boolean
  type?: "button" | "submit"
  className?: string
}) {
  return (
    <button
      type={type}
      className={`button ${secondary ? "secondary" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
function Quantity({
  value,
  max,
  change,
}: {
  value: number
  max: number
  change: (n: number) => void
}) {
  return (
    <div className="quantity">
      <button
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => change(value - 1)}
      >
        <Icon name="minus" size={14} />
      </button>
      <span>{value}</span>
      <button
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => change(value + 1)}
      >
        <Icon name="plus" size={14} />
      </button>
    </div>
  )
}
function ProductCard({
  product,
  add,
}: {
  product: Product
  add: (p: Product, variant: string, qty: number) => void
}) {
  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={`${product.name} — supplied Camel Gold product photography`}
            loading="lazy"
          />
        </Link>
        {product.tag && (
          <span className={`product-tag ${!product.stock ? "sold-out" : ""}`}>
            {product.tag}
          </span>
        )}
        <button
          className="quick-add"
          disabled={!product.stock}
          aria-label={`Add ${product.name} to bag`}
          onClick={() => add(product, product.variants[0], 1)}
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
      <div className="product-category">{product.category} collection</div>
      <div className="product-meta">
        <Link to={`/product/${product.id}`}>{product.name}</Link>
        <span>{money(product.price)}</span>
      </div>
      <div className="swatches">
        {product.variants.map((v) => (
          <span key={v} title={v} className={`swatch ${v.toLowerCase()}`} />
        ))}
      </div>
    </article>
  )
}
function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section className="newsletter">
      <div>
        <span className="eyebrow">A little something special</span>
        <h2>Good things, in your inbox.</h2>
        <p>
          Be the first to discover new edits, considered finds and the world of
          Camel Gold.
        </p>
      </div>
      <div>
        {done ? (
          <div className="success">
            <Icon name="check" /> You're on the list — in this prototype.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setDone(true)
            }}
          >
            <label className="sr-only" htmlFor="newsletter">
              Email address
            </label>
            <div className="email-input">
              <input
                required
                type="email"
                id="newsletter"
                placeholder="Your email address"
              />
              <button aria-label="Subscribe">
                <Icon name="arrow" />
              </button>
            </div>
            <small>
              By subscribing, you agree to our{" "}
              <Link to="/policy/privacy">privacy policy</Link>. Demo only; no
              mailing list is connected.
            </small>
          </form>
        )}
      </div>
    </section>
  )
}
function Home({ add }: { add: (p: Product, v: string, q: number) => void }) {
  return (
    <>
      <section className="hero">
        <img
          className="hero-photo"
          src={images.hero}
          alt="Model wearing the Camel Gold black polo with gold camel emblem"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow">
            <span className="gold-dash" />
            Comfort. Elevated
          </span>
          <h1>
            Made to
            <br />
            Stand <em>Apart.</em>
          </h1>
          <p>
            Discover a considered collection designed to bring
            <br className="desktop-break" /> something special to every moment.
          </p>
          <Link to="/shop" className="button gold">
            Shop Collection <Icon name="arrow" size={18} />
          </Link>
          <Link to="/about" className="hero-story">
            Discover the Brand <span>↗</span>
          </Link>
        </div>
        <div className="hero-bottom">
          <span>Elagance. Quality. Trust.</span>
          <span>THE CAMEL GOLD EDIT — 01</span>
        </div>
        <div className="hero-pagination">
          <span className="active" />
          <span />
          <span />
        </div>
      </section>
      <div className="intro-line">
        <span>
          Not just things. <em>A feeling.</em>
        </span>
        <p>
          Pieces to live in. Details to love. A collection to make your own.
        </p>
      </div>
      <section className="section collection-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Find your kind of special</span>
            <h2>A collection for every moment.</h2>
          </div>
          <Link to="/collections" className="text-link">
            Explore Collections <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="collections-grid">
          {collections.map((c, i) => (
            <Link
              key={c.name}
              to={`/shop?category=${c.category}`}
              className="collection-card"
            >
              <div className="collection-image">
                <img
                  loading="lazy"
                  src={c.image}
                  alt={`Camel Gold apparel from ${c.name}`}
                />
                <span>0{i + 1}</span>
              </div>
              <div className="collection-info">
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                </div>
                <Icon name="arrow" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section featured">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The pieces we're drawn to</span>
            <h2>Quietly remarkable.</h2>
          </div>
          <Link to="/shop" className="text-link">
            Shop All Products <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="product-grid">
          {[...products.slice(0, 4), ...products.slice(-4)].map((p) => (
            <ProductCard key={p.id} product={p} add={add} />
          ))}
        </div>
      
      </section>
      <section className="editorial">
        <div className="editorial-image">
          <img
            src={images.story}
            loading="lazy"
            alt="White Camel Gold T-shirt with gold script detailing on the back"
          />
          <span>THE WORLD OF CAMEL GOLD</span>
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">Elagance. Quality. Trust. </span>
          <h2>
            It's not about more.
            <br />
            It's about <em>meaning.</em>
            <br />
            Its about <em>Trust</em>
          </h2>

          <p>
            We believe the things we surround ourselves with should feel like an
            extension of who we are. Considered, distinctive and a little
            unexpected.
          </p>
          <p>
            Camel Gold is a space for discovering something that speaks to you.
            Not just for today, but for the moments that matter.
          </p>
          <Link to="/about" className="text-link">
            Discover Our Story <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
      <section className="benefits">
        {[
          {
            icon: "heart",
            title: "Considered Design",
            copy: "A thoughtful point of view.",
          },
          {
            icon: "lock",
            title: "Secure Checkout",
            copy: "Planned for our future storefront.",
          },
          {
            icon: "chat",
            title: "Here to Help",
            copy: "Let's start a conversation.",
          },
          {
            icon: "box",
            title: "Delivery & Returns",
            copy: "The details, clearly explained.",
          },
        ].map((b, i) => (
          <Link
            key={b.title}
            to={i === 2 ? "/contact" : i === 3 ? "/policy/shipping" : "/about"}
          >
            <Icon name={b.icon} size={24} />
            <h4>{b.title}</h4>
            <p>{b.copy}</p>
          </Link>
        ))}
      </section>
      <Newsletter />
    </>
  )
}
function Shop({
  route,
  add,
}: {
  route: string
  add: (p: Product, v: string, q: number) => void
}) {
  const categoryFromUrl =
    new URLSearchParams(route.split("?")[1]).get("category") || ""
  const [category, setCategory] = useState(categoryFromUrl)
  const [sort, setSort] = useState("featured")
  const [price, setPrice] = useState("all")
  const [available, setAvailable] = useState(false)
  const [filters, setFilters] = useState(false)
  const heroPhoto = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        heroPhoto.current?.style.setProperty("--hero-parallax", `${Math.min(window.scrollY * 0.12, 65)}px`)
        frame = 0
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])
  useEffect(() => setCategory(categoryFromUrl), [categoryFromUrl])
  let results = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (price === "all" || p.price <= Number(price)) &&
      (!available || p.stock > 0),
  )
  if (sort === "low") results = [...results].sort((a, b) => a.price - b.price)
  if (sort === "high") results = [...results].sort((a, b) => b.price - a.price)
  if (sort === "new") results = [...results].reverse()
  const clear = () => {
    setCategory("")
    setPrice("all")
    setAvailable(false)
  }
  return (
    <main className="section page-main shop-page pt-0!">
      <div className="page-title shop-hero mt-0!">
        <div className="breadcrumbs absolute top-0 left-6 md:left-16 z-10 text-white! mb-0! items-baseline">
          <Link to="/" className="hover:text-gold!">Home</Link>
          <span>/</span>
          <span className="shop-breadcrumb-label">Camel Gold</span>
        </div>
        <img
          ref={heroPhoto}
          className="shop-hero-photo"
          src={images.blackTracksuit}
          alt="Two models wearing black Camel Gold tracksuits with gold detailing"
        />
        <div className="shop-hero-copy">
          <img
            className="w-52! h-32! object-cover mb-6"
            src="/camel-gold-logo.png"
            alt="Camel Gold"
          />
          <h1><em>Comfort Elevated.</em></h1>
          <p>
            {category
              ? collections.find((c) => c.category === category)?.name
              : "Signature apparel. Everyday distinction."}
          </p>
          <Button
            className="gold"
            onClick={() => document.getElementById("shop-catalogue")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          >
            Shop the Collection <Icon name="arrow" size={18} />
          </Button>
        </div>
      </div>
      <div className="shop-toolbar" id="shop-catalogue">
        <p className="shop-tagline">Elagance. Quality. Trust.</p>
        <button className="text-link" onClick={() => setFilters(!filters)}>
          <Icon name="filter" size={18} /> {filters ? "Hide filters" : "Filter"}{" "}
          {(category || price !== "all" || available) && (
            <span className="filter-dot" />
          )}
        </button>
        <span>{results.length} products</span>
        <label>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="new">Newest</option>
          </select>
        </label>
      </div>
      {filters && (
        <div className="filters">
          <label>
            Collection
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All collections</option>
              {collections.map((c) => (
                <option key={c.category} value={c.category}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Price range
            <select value={price} onChange={(e) => setPrice(e.target.value)}>
              <option value="all">All prices</option>
              <option value="800">Up to R 800</option>
              <option value="1000">Up to R 1 000</option>
              <option value="500">Up to R 500</option>
            </select>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />{" "}
            In stock only
          </label>
          <button className="underlined" onClick={clear}>
            Clear filters
          </button>
        </div>
      )}
      {results.length ? (
        <div className="product-grid shop-grid">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} add={add} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Icon name="search" size={32} />
          <h2>No finds just yet.</h2>
          <p>Try another collection or adjust your price range.</p>
          <Button onClick={clear}>Clear filters</Button>
        </div>
      )}
      <p className="demo-note">
        All products, availability and prices are demonstration data. The final
        catalogue is to be confirmed.
      </p>
    </main>
  )
}
function ProductPage({
  id,
  add,
}: {
  id: string
  add: (p: Product, v: string, q: number) => void
}) {
  const p = products.find((p) => p.id === id)
  const [variant, setVariant] = useState("")
  const [qty, setQty] = useState(1)
  const [selected, setSelected] = useState(0)
  const [error, setError] = useState("")
  useEffect(() => {
    setVariant("")
    setQty(1)
    setSelected(0)
    setError("")
  }, [id])
  if (!p)
    return (
      <div className="empty">
        <h1>Product not found</h1>
        <Link to="/shop" className="button">
          Back to shop
        </Link>
      </div>
    )
  const gallery = p.gallery || [p.image]
  return (
    <main className="section page-main">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span>{p.name}</span>
      </div>
      <div className="product-detail">
        <div>
          <div className="gallery-main">
            <img
              src={gallery[selected]}
              alt={`${p.name} — supplied product photograph`}
            />
          </div>
          <div className="thumbnails">
            {gallery.map((img, i) => (
              <button
                key={i}
                className={selected === i ? "selected" : ""}
                onClick={() => setSelected(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={selected === i}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
          <small className="muted">
            Supplied Camel Gold product photography.
          </small>
        </div>
        <div className="product-details-copy">
          <span className="eyebrow">{p.category} collection</span>
          <h1>{p.name}</h1>
          <div className="detail-price">{money(p.price)}</div>
        
          <div className="stock">
            <span className={p.stock ? "stock-dot" : "stock-dot unavailable"} />
            {p.stock
              ? "Available in the demo catalogue"
              : "Currently unavailable — demonstration stock"}
          </div>
          <div className="variant-label">
            Colour <span>{variant || "Select a colour"}</span>
          </div>
          <div className="variants">
            {p.variants.map((v) => (
              <button
                key={v}
                className={variant === v ? "selected" : ""}
                aria-pressed={variant === v}
                onClick={() => {
                  setVariant(v)
                  setError("")
                }}
              >
                <span className={`swatch ${v.toLowerCase()}`} />
                {v}
              </button>
            ))}
          </div>
          <div className="purchase-row">
            <Quantity value={qty} max={p.stock || 1} change={setQty} />
            <Button
              disabled={!p.stock}
              onClick={() => {
                if (!variant) {
                  setError("Please select a colour before adding to your bag.")
                  return
                }
                add(p, variant, qty)
              }}
            >
              {p.stock ? "Add to Bag" : "Sold Out"}
              <Icon name="bag" size={18} />
            </Button>
          </div>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          <div className="delivery-links">
            <Link to="/policy/shipping">
              <Icon name="box" size={16} />
              Delivery Information
            </Link>
            <Link to="/policy/returns">Returns Information ↗</Link>
          </div>
          {[
            {
              title: "Description",
              text: `${p.name} features the Camel Gold branding shown in the supplied photograph. Final sizing, fabric composition and care instructions will be added when confirmed.`,
            },
            {
              title: "Product specifications",
              text: `Collection: ${p.category}. Pictured colour: ${p.variants.join(", ")}. Sizes, fabric composition and care instructions are to be confirmed. Prices and stock are demonstration data.`,
            },
            {
              title: "Shipping information",
              text: "Delivery areas, methods, charges and lead times will be confirmed before launch. No courier service is connected to this demonstration.",
            },
            {
              title: "Returns information",
              text: "The client's returns and refunds policy will be supplied before launch. This prototype does not make guarantees or define a returns period.",
            },
          ].map((a) => (
            <details key={a.title} className="accordion">
              <summary>
                {a.title}
                <Icon name="plus" size={16} />
              </summary>
              <p>{a.text}</p>
            </details>
          ))}
        </div>
      </div>
      <div className="section-heading related-heading">
        <div>
          <span className="eyebrow">A considered pairing</span>
          <h2>You might also love.</h2>
        </div>
      </div>
      <div className="product-grid">
        {products
          .filter((x) => x.id !== id)
          .slice(0, 4)
          .map((x) => (
            <ProductCard key={x.id} product={x} add={add} />
          ))}
      </div>
    </main>
  )
}
function CartContents({
  cart,
  update,
  remove,
  compact = false,
}: {
  cart: CartItem[]
  update: (i: number, q: number) => void
  remove: (i: number) => void
  compact?: boolean
}) {
  return (
    <div className={compact ? "cart-lines compact" : "cart-lines"}>
      {cart.map((item, i) => {
        const p = products.find((p) => p.id === item.id)!
        return (
          <div className="cart-line" key={`${item.id}-${item.variant}`}>
            <Link to={`/product/${p.id}`}>
              <img src={p.image} alt={p.name} />
            </Link>
            <div className="cart-item-info">
              <Link to={`/product/${p.id}`}>{p.name}</Link>
              <small>
                {item.variant} · {money(p.price)}
              </small>
              <Quantity
                value={item.quantity}
                max={p.stock}
                change={(q) => update(i, q)}
              />
              <button className="underlined remove" onClick={() => remove(i)}>
                Remove
              </button>
            </div>
            <span className="line-total">{money(p.price * item.quantity)}</span>
          </div>
        )
      })}
    </div>
  )
}
function EmptyCart() {
  return (
    <div className="empty">
      <Icon name="bag" size={40} />
      <h2>Your bag is waiting.</h2>
      <p>A little something special is just around the corner.</p>
      <Link to="/shop" className="button">
        Explore the Collection <Icon name="arrow" size={16} />
      </Link>
    </div>
  )
}
type Order = {
  items: CartItem[]
  total: number
  customer: Record<string, string>
  number: string
}
function Checkout({
  cart,
  subtotal,
  complete,
}: {
  cart: CartItem[]
  subtotal: number
  complete: (customer: Record<string, string>) => void
}) {
  const [delivery, setDelivery] = useState("Delivery")
  const [review, setReview] = useState<Record<string, string> | null>(null)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as Record<string, string>
    setReview({ ...data, delivery })
  }
  if (!cart.length)
    return (
      <main className="section page-main">
        <EmptyCart />
      </main>
    )
  return (
    <main className="section page-main">
      <div className="breadcrumbs">
        <Link to="/cart">Shopping bag</Link>
        <span>/</span>
        <span>Checkout</span>
      </div>
      <div className="page-title">
        <span className="eyebrow">A thoughtful finish</span>
        <h1>{review ? "Review your details." : "Checkout."}</h1>
        <p>
          Prototype checkout only. No payment will be taken or real order
          placed.
        </p>
      </div>
      <div className="checkout-layout">
        <div>
          {review ? (
            <section className="review-card">
              <h2>Customer & delivery</h2>
              <p>
                {review.firstName} {review.lastName}
                <br />
                {review.email}
                <br />
                {review.phone}
              </p>
              <p>
                {review.street}
                <br />
                {review.suburb}, {review.city}
                <br />
                {review.province}, {review.postalCode}
                <br />
                {review.country}
              </p>
              <p>
                Proposed method: {review.delivery}
                <br />
                Payment: future gateway integration
              </p>
              <div className="demo-banner">
                This is demonstration data. No payment will be processed, and no
                delivery will be arranged.
              </div>
              <Button onClick={() => complete(review)}>
                Submit Demonstration Order <Icon name="arrow" size={18} />
              </Button>
              <button className="underlined" onClick={() => setReview(null)}>
                Edit details
              </button>
            </section>
          ) : (
            <form onSubmit={submit} className="checkout-form">
              <h2>Customer information</h2>
              <div className="form-grid">
                {[
                  { name: "firstName", label: "First name", type: "text" },
                  { name: "lastName", label: "Last name", type: "text" },
                  { name: "email", label: "Email address", type: "email" },
                  { name: "phone", label: "Telephone number", type: "tel" },
                ].map((f) => (
                  <label key={f.name}>
                    {f.label}
                    <input
                      name={f.name}
                      type={f.type}
                      required
                      defaultValue={review?.[f.name]}
                    />
                  </label>
                ))}
              </div>
              <h2>Delivery information</h2>
              <div className="form-grid">
                {[
                  { name: "street", label: "Street address", full: true },
                  { name: "suburb", label: "Suburb" },
                  { name: "city", label: "City or town" },
                  { name: "postalCode", label: "Postal code" },
                ].map((f) => (
                  <label key={f.name} className={f.full ? "full" : ""}>
                    {f.label}
                    <input name={f.name} required />
                  </label>
                ))}
                <label>
                  Province
                  <select name="province" required defaultValue="">
                    <option value="" disabled>
                      Select province
                    </option>
                    {[
                      "Eastern Cape",
                      "Free State",
                      "Gauteng",
                      "KwaZulu-Natal",
                      "Limpopo",
                      "Mpumalanga",
                      "North West",
                      "Northern Cape",
                      "Western Cape",
                    ].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <label className="full">
                  Country
                  <input name="country" defaultValue="South Africa" required />
                </label>
              </div>
              <h2>Proposed delivery method</h2>
              <p className="muted">
                Options are for demonstration; availability and costs are not
                yet confirmed.
              </p>
              <div className="delivery-options">
                {["Delivery", "Collection"].map((v) => (
                  <label key={v}>
                    <input
                      type="radio"
                      name="deliveryChoice"
                      value={v}
                      checked={delivery === v}
                      onChange={() => setDelivery(v)}
                    />
                    <span>
                      {v}
                      <small>Details to be confirmed</small>
                    </span>
                  </label>
                ))}
              </div>
              <h2>Payment</h2>
              <div className="payment-placeholder">
                <Icon name="lock" />
                <div>
                  <strong>South African payment gateway</strong>
                  <p>
                    PayFast, Yoco or Peach Payments — integration to be
                    selected. No card details are collected.
                  </p>
                </div>
              </div>
              <Button type="submit">
                Review Demonstration Order <Icon name="arrow" size={18} />
              </Button>
            </form>
          )}
        </div>
        <aside className="order-summary">
          <h2>Your order</h2>
          {cart.map((item) => {
            const p = products.find((p) => p.id === item.id)!
            return (
              <div
                className="summary-product"
                key={`${item.id}-${item.variant}`}
              >
                <img src={p.image} alt={p.name} />
                <div>
                  <strong>{p.name}</strong>
                  <small>
                    {item.variant} · Qty {item.quantity}
                  </small>
                </div>
                <span>{money(p.price * item.quantity)}</span>
              </div>
            )
          })}
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          <div className="summary-row muted">
            <span>Delivery & taxes</span>
            <span>To be confirmed</span>
          </div>
          <div className="summary-row total">
            <span>Demo total</span>
            <span>{money(subtotal)}</span>
          </div>
          <small>
            Final delivery and tax treatment will be configured for the
            production checkout.
          </small>
        </aside>
      </div>
    </main>
  )
}
function Confirmation({ order }: { order: Order | null }) {
  if (!order)
    return (
      <main className="section page-main">
        <div className="empty">
          <h1>No demonstration order yet.</h1>
          <Link to="/shop" className="button">
            Browse the Collection
          </Link>
        </div>
      </main>
    )
  return (
    <main className="section confirmation page-main">
      <div className="confirmation-icon">
        <Icon name="check" size={30} />
      </div>
      <span className="eyebrow">The prototype journey is complete</span>
      <h1>Thank You for Your Order.</h1>
      <p>
        Demonstration order {order.number}.<br />
        No real order has been placed and no payment has been received.
      </p>
      <div className="confirmation-card">
        <h2>Your demonstration summary</h2>
        {order.items.map((item) => {
          const p = products.find((p) => p.id === item.id)!
          return (
            <div className="summary-row" key={`${item.id}-${item.variant}`}>
              <span>
                {p.name} · {item.variant} · Qty {item.quantity}
              </span>
              <span>{money(p.price * item.quantity)}</span>
            </div>
          )
        })}
        <div className="summary-row total">
          <span>Demonstration total</span>
          <span>{money(order.total)}</span>
        </div>
        <h3>Customer & delivery — prototype data</h3>
        <p>
          {order.customer.firstName} {order.customer.lastName}
          <br />
          {order.customer.email}
          <br />
          {order.customer.street}, {order.customer.suburb}
          <br />
          {order.customer.city}, {order.customer.province},{" "}
          {order.customer.postalCode}
          <br />
          {order.customer.country}
          <br />
          Proposed method: {order.customer.delivery}
        </p>
      </div>
      <Link to="/shop" className="button">
        Return to Shop <Icon name="arrow" size={18} />
      </Link>
    </main>
  )
}
function Contact() {
  const [done, setDone] = useState(false)
  return (
    <main className="section page-main">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>Contact
      </div>
      <div className="page-title">
        <span className="eyebrow">A conversation starts here</span>
        <h1>We'd love to hear from you.</h1>
        <p>Questions, thoughts or something on your mind? Let's talk.</p>
      </div>
      <div className="contact-layout">
        <div>
          {done ? (
            <div className="success contact-success">
              <Icon name="check" size={30} />
              <h2>Thank you for reaching out.</h2>
              <p>
                Your message has been demonstrated successfully. It has not been
                sent to a real inbox.
              </p>
              <Button secondary onClick={() => setDone(false)}>
                Write another message
              </Button>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault()
                setDone(true)
              }}
            >
              <div className="form-grid">
                <label>
                  Name
                  <input required name="name" />
                </label>
                <label>
                  Email address
                  <input required type="email" name="email" />
                </label>
                <label className="full">
                  Subject
                  <input required name="subject" />
                </label>
                <label className="full">
                  Message
                  <textarea required name="message" rows={6} />
                </label>
              </div>
              <small className="muted">
                Demonstration form. Messages are not delivered or stored.
              </small>
              <Button type="submit">
                Send Demonstration Message <Icon name="arrow" size={18} />
              </Button>
            </form>
          )}
        </div>
        <aside className="contact-aside">
          <span className="eyebrow">Here to help</span>
          <h2>Personal, by design.</h2>
          <p>
            Our final contact channels and customer support hours will be added
            before launch.
          </p>
          <h4>Email</h4>
          <p>Contact email to be confirmed</p>
          <h4>Telephone</h4>
          <p>Contact number to be confirmed</p>
          <Link to="/policy/shipping" className="text-link">
            Delivery Information <Icon name="arrow" size={16} />
          </Link>
          <Link to="/policy/returns" className="text-link">
            Returns & Refunds <Icon name="arrow" size={16} />
          </Link>
        </aside>
      </div>
    </main>
  )
}
function About() {
  return (
    <main>
      <section className="about-hero">
        <img
          src={images.story}
          alt="Camel Gold white script T-shirt worn with gold lettering on the back"
        />
        <div>
          <span className="eyebrow">The world of Camel Gold</span>
          <h1>
            A considered life.
            <br />
            <em>A distinctive feeling.</em>
          </h1>
        </div>
      </section>
      <section className="about-copy section">
        <span className="eyebrow">Our point of view</span>
        <h2>
          The things that matter.
          <br />
          The details that stay.
        </h2>
        <p>
          Camel Gold Features Clothing Pieces imported from Dubai. A contemporary collection that brings a little something
          special to the everyday.
        </p>
        <p>
          Our philosophy is simple: Elagance. Quality. Trust. An invitation to
          discover pieces that resonate with you, and to find your own kind of
          special.
        </p>
        <Link to="/shop" className="button">
          Explore the Collection <Icon name="arrow" size={18} />
        </Link>

      </section>
      <Newsletter />
    </main>
  )
}
function Policy({ kind }: { kind: string }) {
  const policies: Record<string, {
    title: string
    text: string
  }> = {
    shipping: {
      title: "Delivery information",
      text: "Delivery areas, methods, pricing, courier partners and estimated timeframes have not yet been confirmed. The production store will display the approved delivery information and any applicable charges before an order is placed.",
    },
    returns: {
      title: "Returns & refunds",
      text: "The final returns, exchanges and refunds policy will be supplied and reviewed before launch. No return periods, refund guarantees or eligibility conditions are established by this prototype.",
    },
    privacy: {
      title: "Privacy policy",
      text: "This frontend prototype has no connected newsletter, contact inbox or payment gateway. Your shopping bag is saved locally in this browser. Demonstration checkout details are held temporarily in memory only. Please use fictional contact details. An approved production privacy policy will be added before launch.",
    },
    terms: {
      title: "Terms & conditions",
      text: "Camel Gold V1 is a client-facing frontend demonstration, not a live retail service. Sample products, pricing, imagery and availability are editable placeholders. No payments are taken and no real orders or delivery obligations are created. Production terms will be confirmed before launch.",
    },
  }
  const p = policies[kind] || policies.terms
  return (
    <main className="section page-main policy-page">
      <span className="eyebrow">The important details</span>
      <h1>{p.title}</h1>
      <div className="demo-banner">
        Proposed content — policy to be confirmed before launch.
      </div>
      <p>{p.text}</p>
      <Link to="/contact" className="text-link">
        Contact us <Icon name="arrow" size={18} />
      </Link>
    </main>
  )
}
function Modal({
  children,
  close,
  title,
  drawer = false,
}: {
  children: ReactNode
  close: () => void
  title: string
  drawer?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement
    const old = document.body.style.overflow
    document.body.style.overflow = "hidden"
    ref.current?.focus()
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "Tab") {
        const nodes = ref.current?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]',
        )
        if (!nodes?.length) return
        const first = nodes[0],
          last = nodes[nodes.length - 1]
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", key)
    return () => {
      document.body.style.overflow = old
      document.removeEventListener("keydown", key)
      previous?.focus()
    }
  }, [close])
  return (
    <div className="modal-backdrop" onClick={close}>
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`modal ${drawer ? "drawer" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-heading">
          <h2>{title}</h2>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={close}
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
export default function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || "/")
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("kimo-gold-bag") || "[]")
      return Array.isArray(raw)
        ? raw.filter((x: CartItem) =>
            products.some(
              (p) =>
                p.id === x.id &&
                p.stock > 0 &&
                p.variants.includes(x.variant) &&
                Number.isInteger(x.quantity) &&
                x.quantity >= 1 &&
                x.quantity <= p.stock,
            ),
          )
        : []
    } catch {
      return []
    }
  })
  const [overlay, setOverlay] = useState("")
  const [search, setSearch] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [scrolled, setScrolled] = useState(window.scrollY > 24)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    const handler = () => {
      setRoute(window.location.hash.slice(1) || "/")
      setOverlay("")
      window.scrollTo(0, 0)
    }
    window.addEventListener("hashchange", handler)
    return () => window.removeEventListener("hashchange", handler)
  }, [])
  useEffect(() => {
    localStorage.setItem("kimo-gold-bag", JSON.stringify(cart))
  }, [cart])
  useEffect(() => {
    document.title = `${
      route === "/"
        ? "Considered. Distinctive. Yours."
        : route.startsWith("/product")
          ? products.find((p) => route.includes(p.id))?.name || "Shop"
          : route
              .split("/")[1]
              .split("?")[0]
              .replace(/^./, (x) => x.toUpperCase())
    } | Camel Gold`
  }, [route])
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + products.find((p) => p.id === item.id)!.price * item.quantity,
    0,
  )
  const add = (p: Product, variant: string, quantity: number) => {
    if (!p.stock || !p.variants.includes(variant)) return
    setCart((prev) => {
      const index = prev.findIndex(
        (x) => x.id === p.id && x.variant === variant,
      )
      return index < 0
        ? [
            ...prev,
            { id: p.id, variant, quantity: Math.min(quantity, p.stock) },
          ]
        : prev.map((x, i) =>
            i === index
              ? { ...x, quantity: Math.min(x.quantity + quantity, p.stock) }
              : x,
          )
    })
    setOverlay("bag")
  }
  const update = (index: number, quantity: number) =>
    setCart((prev) =>
      prev.map((x, i) =>
        i === index
          ? {
              ...x,
              quantity: Math.max(
                1,
                Math.min(quantity, products.find((p) => p.id === x.id)!.stock),
              ),
            }
          : x,
      ),
    )
  const remove = (index: number) =>
    setCart((prev) => prev.filter((_, i) => i !== index))
  const close = () => setOverlay("")
  const results = products.filter((p) =>
    `${p.name} ${p.category}`
      .toLowerCase()
      .includes(search.toLowerCase().trim()),
  )
  let page: ReactNode
  if (route === "/") page = <Home add={add} />
  else if (route.startsWith("/shop")) page = <Shop route={route} add={add} />
  else if (route.startsWith("/product/"))
    page = <ProductPage id={route.split("/")[2]} add={add} />
  else if (route === "/collections")
    page = (
      <main className="section page-main">
        <div className="page-title">
          <span className="eyebrow">A point of view for every day</span>
          <h1>Find your kind of special.</h1>
          <p>Three considered edits. Endless ways to make them your own.</p>
        </div>
        <div className="collections-grid">
          {collections.map((c) => (
            <Link
              key={c.name}
              to={`/shop?category=${c.category}`}
              className="collection-card"
            >
              <div className="collection-image">
                <img src={c.image} alt={c.name} />
              </div>
              <div className="collection-info">
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                </div>
                <Icon name="arrow" />
              </div>
            </Link>
          ))}
        </div>
     
      </main>
    )
  else if (route === "/about") page = <About />
  else if (route === "/contact") page = <Contact />
  else if (route.startsWith("/policy/"))
    page = <Policy kind={route.split("/")[2]} />
  else if (route === "/cart")
    page = (
      <main className="section page-main">
        <div className="page-title">
          <span className="eyebrow">Your considered collection</span>
          <h1>
            Shopping bag<span className="title-count">({count})</span>
          </h1>
        </div>
        {cart.length ? (
          <div className="cart-layout">
            <CartContents cart={cart} update={update} remove={remove} />
            <aside className="order-summary">
              <h2>The details</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <p>
                Delivery charges and tax treatment will be confirmed in the
                final checkout.
              </p>
              <Link to="/checkout" className="button">
                Continue to Checkout <Icon name="arrow" size={18} />
              </Link>
              <Link to="/shop" className="underlined">
                Continue shopping
              </Link>
              <small>Demonstration only. No real payments or orders.</small>
            </aside>
          </div>
        ) : (
          <EmptyCart />
        )}
      </main>
    )
  else if (route === "/checkout")
    page = (
      <Checkout
        cart={cart}
        subtotal={subtotal}
        complete={(customer) => {
          setOrder({
            items: [...cart],
            total: subtotal,
            customer,
            number: `KG-DEMO-${Date.now().toString().slice(-6)}`,
          })
          setCart([])
          window.location.hash = "/confirmation"
        }}
      />
    )
  else if (route === "/confirmation") page = <Confirmation order={order} />
  else
    page = (
      <main className="empty">
        <h1>A little off the beaten path.</h1>
        <Link to="/" className="button">
          Back to home
        </Link>
      </main>
    )
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById("main-content")?.focus()
        }}
      >
        Skip to content
      </a>
      <div className="announcement">
        <span>Discover the Camel Gold collection</span>
        <Icon name="arrow" size={13} />
      </div>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <button
          className="icon-button mobile-menu"
          aria-label="Open navigation"
          onClick={() => setOverlay("menu")}
        >
          <Icon name="menu" />
        </button>
        <Link to="/" className="nav-logo">
          <img src="/camel-gold-logo.png" alt="Camel Gold" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link
            to="/shop"
            className={route.startsWith("/shop") ? "active" : ""}
          >
            Shop
          </Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="nav-tools">
          <button
            className="icon-button"
            aria-label="Search products"
            onClick={() => setOverlay("search")}
          >
            <Icon name="search" />
          </button>
          <button
            className="icon-button account-button"
            aria-label="Account information"
            onClick={() => setOverlay("account")}
          >
            <Icon name="user" />
          </button>
          <button
            className="bag-button"
            aria-label={`Open shopping bag, ${count} items`}
            onClick={() => setOverlay("bag")}
          >
            <Icon name="bag" />
            <span className="bag-label">Bag</span>
            <span className="bag-count">{count}</span>
          </button>
        </div>
      </header>
      <div id="main-content" tabIndex={-1}>
        {page}
      </div>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="wordmark">
              <span className="wordmark-camel">Camel</span>{" "}
              <span className="wordmark-gold">Gold</span>
            </Link>
            <p>
              Considered. Distinctive. Yours.
              <br />A little something special, every day.
            </p>
            <span className="footer-location">
              A contemporary South African brand concept.
            </span>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/shop">Shop All</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/about">Our Story</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Here to Help</h4>
            <Link to="/policy/shipping">Delivery Information</Link>
            <Link to="/policy/returns">Returns & Refunds</Link>
            <Link to="/contact">Get in Touch</Link>
            <button onClick={() => setOverlay("account")}>My Account</button>
          </div>
          <div>
            <h4>Stay Connected</h4>
            <p>New discoveries. A considered perspective.</p>
            <button onClick={() => setOverlay("social")}>Instagram ↗</button>
            <button onClick={() => setOverlay("social")}>Pinterest ↗</button>
            <small>Contact and social details to be confirmed.</small>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Camel Gold. All rights reserved.
          </span>
          <span className="prototype-label">V1 STOREFRONT PROTOTYPE</span>
          <div>
            <Link to="/policy/privacy">Privacy Policy</Link>
            <Link to="/policy/terms">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
      {overlay && (
        <Modal
          title={
            overlay === "bag"
              ? `Your Bag (${count})`
              : overlay === "search"
                ? "Find something special."
                : overlay === "menu"
                  ? "Explore Camel Gold"
                  : overlay === "social"
                    ? "Stay connected"
                    : "Your Camel Gold account"
          }
          close={close}
          drawer={overlay === "bag" || overlay === "menu"}
        >
          {overlay === "bag" ? (
            <>
              {cart.length ? (
                <>
                  <CartContents
                    compact
                    cart={cart}
                    update={update}
                    remove={remove}
                  />
                  <div className="drawer-summary">
                    <div className="summary-row total">
                      <span>Subtotal</span>
                      <span>{money(subtotal)}</span>
                    </div>
                    <p>Delivery and tax treatment to be confirmed.</p>
                    <Link to="/checkout" className="button" onClick={close}>
                      Checkout <Icon name="arrow" size={18} />
                    </Link>
                    <Link
                      to="/cart"
                      className="button secondary"
                      onClick={close}
                    >
                      View Shopping Bag
                    </Link>
                    <small>
                      Demo catalogue. No real payment will be taken.
                    </small>
                  </div>
                </>
              ) : (
                <div onClick={close}>
                  <EmptyCart />
                </div>
              )}
            </>
          ) : overlay === "search" ? (
            <>
              <div className="search-field">
                <Icon name="search" />
                <input
                  aria-label="Search catalogue"
                  autoFocus
                  placeholder="Search products or collections..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setSearch("")}
                  >
                    <Icon name="close" size={16} />
                  </button>
                )}
              </div>
              <span className="eyebrow">
                {search
                  ? `${results.length} matching products`
                  : "A few considered favourites"}
              </span>
              <div className="search-results">
                {results.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} onClick={close}>
                    <img src={p.image} alt={p.name} />
                    <div>
                      <strong>{p.name}</strong>
                      <small>{p.category} collection</small>
                    </div>
                    <span>{money(p.price)}</span>
                    <Icon name="arrow" size={16} />
                  </Link>
                ))}
              </div>
              {!results.length && (
                <div className="empty">
                  <h3>No matches just yet.</h3>
                  <p>Try “tee”, “polo” or “signature”.</p>
                  <button className="underlined" onClick={() => setSearch("")}>
                    Clear search
                  </button>
                </div>
              )}
            </>
          ) : overlay === "menu" ? (
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {["Shop", "Collections", "About", "Contact"].map((n) => (
                <Link key={n} to={`/${n.toLowerCase()}`} onClick={close}>
                  {n}
                  <Icon name="arrow" />
                </Link>
              ))}
              <span className="eyebrow">Considered. Distinctive. Yours.</span>
            </nav>
          ) : (
            <div className="account-info">
              <Icon name={overlay === "social" ? "chat" : "user"} size={34} />
              <h3>
                {overlay === "social"
                  ? "Our social story is still to come."
                  : "Something to look forward to."}
              </h3>
              <p>
                {overlay === "social"
                  ? "Official Instagram and Pinterest accounts will be added when the client's social channels are confirmed."
                  : "Customer accounts, order history and sign-in will be connected in the production storefront. This prototype lets you explore and shop as a demonstration guest."}
              </p>
              <Button onClick={close}>Continue Exploring</Button>
            </div>
          )}
        </Modal>
      )}
    </>
  )
}
