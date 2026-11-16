import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  MoveDown,
  X,
} from 'lucide-react'
import { business, combos, galleryItems, menuItems, reviews } from './data/business'
import './App.css'

function InstagramIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 7.5h-1.1c-1.5 0-2.4.9-2.4 2.5v1.4H8.5v2h1.5v4.6h2.1v-4.6h1.8l.3-2h-2.1v-1.2c0-.6.2-.8.8-.8h.6v-1.9Z" fill="currentColor" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.2 4.2c.4 1.8 1.4 2.9 3.2 3.3v2.2a7.1 7.1 0 0 1-3.1-1v6.2a4.7 4.7 0 1 1-4-4.6v2.4a2.3 2.3 0 1 0 1.7 2.2V4.2h2.2Z" fill="currentColor" />
    </svg>
  )
}

const currentYear = new Date().getFullYear()

const navigation = [
  { label: 'Menu', href: '#menu' },
  { label: 'Our story', href: '#story' },
  { label: 'Gallery', href: '#gallery' },
]

type Review = (typeof reviews)[number]

let anchorScrollFrame: number | null = null

function animateScrollTo(targetY: number) {
  if (anchorScrollFrame !== null) {
    window.cancelAnimationFrame(anchorScrollFrame)
  }

  const startY = window.scrollY
  const distance = targetY - startY
  const duration = Math.min(900, Math.max(450, Math.abs(distance) * 0.55))
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const progress = Math.min(1, (currentTime - startTime) / duration)
    const easedProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - ((-2 * progress + 2) ** 2) / 2

    window.scrollTo(0, startY + distance * easedProgress)

    if (progress < 1) {
      anchorScrollFrame = window.requestAnimationFrame(animate)
    } else {
      anchorScrollFrame = null
    }
  }

  anchorScrollFrame = window.requestAnimationFrame(animate)
}

function handleSmoothAnchorClick(event: React.MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href')

  if (!href?.startsWith('#')) {
    return
  }

  const target = document.querySelector(href)
  if (!target) {
    return
  }

  event.preventDefault()
  const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY)
  animateScrollTo(targetY)
  window.history.replaceState(null, '', href)
}

function ReviewCard({
  review,
  onImageClick,
}: {
  review: Review
  onImageClick: (review: Review) => void
}) {
  return (
    <blockquote className="review" style={{ flex: `0 0 ${100 / reviews.length}%` }}>
      <div className="review__meta">
        <span>{review.source}</span>
        <span aria-label="5 out of 5 stars">★★★★★</span>
      </div>
      <p>“{review.quote}”</p>
      <cite>{review.author}</cite>
      {review.image ? (
        <button
          className="review__image-button"
          type="button"
          aria-label={`View photo from ${review.author}`}
          onClick={() => onImageClick(review)}
        >
          <img src={review.image} alt={review.imageAlt} loading="lazy" />
          <span>View photo</span>
        </button>
      ) : (
        <span className="review__image-placeholder" aria-hidden="true" />
      )}
    </blockquote>
  )
}

function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null)
  const [activeReviewImage, setActiveReviewImage] = useState<{
    src: string
    alt: string
    author: string
  } | null>(null)
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const moveReview = (direction: 1 | -1) => {
    setActiveReviewIndex((current) => (current + direction + reviews.length) % reviews.length)
  }

  useEffect(() => {
    if (activeGalleryIndex === null && activeReviewImage === null) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveGalleryIndex(null)
        setActiveReviewImage(null)
      }

      if (activeGalleryIndex !== null && event.key === 'ArrowLeft') {
        setActiveGalleryIndex(
          (current) => (current === null ? 0 : (current - 1 + galleryItems.length) % galleryItems.length),
        )
      }

      if (activeGalleryIndex !== null && event.key === 'ArrowRight') {
        setActiveGalleryIndex(
          (current) => (current === null ? 0 : (current + 1) % galleryItems.length),
        )
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeGalleryIndex, activeReviewImage])

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 420)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site-shell">
      <header className={`site-header ${menuOpen ? 'site-header--open' : ''}`}>
        <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="Bao and Co. home">
          <img src="/assets/branding/bao-and-co-logo.jpg" alt="Bao & Co." />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={handleSmoothAnchorClick}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#visit" onClick={handleSmoothAnchorClick}>
          Find us <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? 'mobile-nav--visible' : ''}`}
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                handleSmoothAnchorClick(event)
                closeMenu()
              }}
            >
              {item.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ))}
          <a
            className="mobile-nav__cta"
            href="#visit"
            onClick={(event) => {
              handleSmoothAnchorClick(event)
              closeMenu()
            }}
          >
            Find us <MapPin size={17} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-frame" aria-labelledby="hero-heading">
          <div className="hero__copy">
            <p className="eyebrow">Pampanga&apos;s first cuapao-focused stall</p>
            <h1 id="hero-heading">
              <span>Freshly</span>
              <em>steamed.</em>
              <span>Boldly</span>
              <em>filled.</em>
            </h1>
            <p className="hero__lede">
              Bao & Co. brings freshly steamed baos and bold modern flavors to the Heritage District of
              Angeles City.
            </p>
            <div className="hero__actions">
              <a className="button button--dark" href="#menu" onClick={handleSmoothAnchorClick}>
                Explore the menu <MoveDown size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href="#visit" onClick={handleSmoothAnchorClick}>
                Plan your visit <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-wrap">
              <img
                src="/assets/products/7.jpg"
                alt="Freshly filled baos served in compostable trays"
                className="hero__image"
              />
              <div className="hero__stamp" aria-hidden="true">
                <span>steamed</span>
                <strong>fresh</strong>
                <span>daily</span>
              </div>
            </div>
            <p className="hero__location">
              <MapPin size={15} aria-hidden="true" /> Santo Entierro St. · Angeles City
            </p>
          </div>

          <a className="scroll-cue" href="#menu" onClick={handleSmoothAnchorClick} aria-label="Scroll to featured menu">
            <span>Scroll to discover</span>
            <ChevronDown size={17} aria-hidden="true" />
          </a>
        </section>

        <section className="marquee-band" aria-label="Bao and Co. brand statement">
          <div>
            <span>Made for cuapao dates</span>
            <i>✦</i>
            <span>Made for hungry nights</span>
            <i>✦</i>
            <span>Made in Angeles City</span>
            <i>✦</i>
          </div>
        </section>

        <section id="menu" className="menu-section section-frame section-frame--narrow" aria-labelledby="menu-heading">
          <div className="section-intro">
            <p className="eyebrow">The bao lineup</p>
            <h2 id="menu-heading">
              Choose your
              <em>flavor profile.</em>
            </h2>
            <p>Three bold takes on the soft, warm, endlessly craveable bao.</p>
          </div>

          <div className="menu-grid">
            {menuItems.map((item, index) => (
              <article className={`menu-item menu-item--${index + 1}`} key={item.name}>
                <div className="menu-item__image-wrap">
                  <img src={item.image} alt={item.name} className="menu-item__image" />
                  <span className="menu-item__number">0{index + 1}</span>
                </div>
                <div className="menu-item__copy">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="combo-bar">
            <div>
              <p className="eyebrow">Build your combo</p>
              <strong>Bring a friend. Or don&apos;t.</strong>
            </div>
            <div className="combo-options">
              {combos.map((combo) => (
                <div className="combo-option" key={combo.label}>
                  <span>{combo.label}</span>
                  <strong>{combo.price}</strong>
                </div>
              ))}
            </div>
            <p className="combo-note">Prices and availability may change.</p>
          </div>
        </section>

        <section className="reviews-section section-frame section-frame--narrow" aria-labelledby="reviews-heading">
          <div className="reviews-section__intro">
            <p className="eyebrow">From the people who tried them</p>
            <h2 id="reviews-heading">
              Loved by
              <em>bao people.</em>
            </h2>
          </div>
          <div
            className="reviews-carousel"
            aria-label="Customer reviews"
            aria-roledescription="carousel"
          >
            <div
              className="reviews-carousel__track"
              style={{
                width: `${reviews.length * 100}%`,
                transform: `translate3d(-${activeReviewIndex * (100 / reviews.length)}%, 0, 0)`,
              }}
            >
              {reviews.map((review) => (
                <ReviewCard
                  key={`${review.source}-${review.author}`}
                  review={review}
                  onImageClick={(selectedReview) =>
                    setActiveReviewImage({
                      src: selectedReview.image as string,
                      alt: selectedReview.imageAlt as string,
                      author: selectedReview.author,
                    })
                  }
                />
              ))}
            </div>
            <div className="reviews-carousel__controls">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => moveReview(-1)}
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <span>
                0{activeReviewIndex + 1} / 0{reviews.length}
              </span>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => moveReview(1)}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="reviews-carousel__indicators" aria-label="Choose a review">
              {reviews.map((review, index) => (
                <button
                  key={`${review.source}-${review.author}`}
                  type="button"
                  className={index === activeReviewIndex ? 'is-active' : ''}
                  aria-label={`Show review from ${review.author}`}
                  aria-current={index === activeReviewIndex ? 'true' : undefined}
                  onClick={() => {
                    setActiveReviewIndex(index)
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="delivery" className="delivery-section section-frame section-frame--narrow" aria-labelledby="delivery-heading">
          <div className="delivery-section__visual">
            <img src={business.delivery.image} alt="Bao & Co. delivery promotion" loading="lazy" />
          </div>
          <div className="delivery-section__copy">
            <p className="eyebrow">Now delivering</p>
            <h2 id="delivery-heading">
              Fresh baos,
              <em>delivered.</em>
            </h2>
            <p>
              Bao &amp; Co. delivers fresh, hot baos to your doorstep all week long. Message the team to
              confirm availability and place your order.
            </p>
            <div className="delivery-hours">
              <div>
                <span>Weekdays</span>
                <strong>{business.delivery.weekdayHours}</strong>
              </div>
              <div>
                <span>Weekends</span>
                <strong>{business.delivery.weekendHours}</strong>
              </div>
            </div>
            <ExternalLink className="button button--dark" href={business.contact.url}>
              Order via Facebook <ArrowUpRight size={17} aria-hidden="true" />
            </ExternalLink>
          </div>
        </section>

        <section id="visit" className="visit-section section-frame" aria-labelledby="visit-heading">
          <div className="visit-section__copy">
            <p className="eyebrow eyebrow--light">Find your way to Bao &amp; Co.</p>
            <h2 id="visit-heading">
              Your weekend
              <em>bao stop.</em>
            </h2>
            <p className="visit-section__address">
              <MapPin size={18} aria-hidden="true" />
              {business.address}
            </p>
            <div className="visit-section__hours">
              <Clock3 size={18} aria-hidden="true" />
              <div>
                <strong>{business.regularHours}</strong>
                <span>{business.hoursNote}</span>
              </div>
            </div>
            <div className="visit-section__actions">
              <ExternalLink className="button button--cream" href={business.mapsUrl}>
                Get directions <ArrowUpRight size={17} aria-hidden="true" />
              </ExternalLink>
            </div>
          </div>
          <div className="visit-section__video-wrap">
            <video
              className="visit-section__video"
              src={business.locationVideo.src}
              title={business.locationVideo.title}
              controls
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </section>

        <section id="story" className="story-section section-frame" aria-labelledby="story-heading">
          <div className="story-section__visual">
            <img src="/assets/products/4.jpg" alt="Freshly filled bao served in a compostable tray" />
            <div className="story-section__caption">
              <span>01</span>
              <span>Rooted in place</span>
            </div>
          </div>
          <div className="story-section__copy">
            <p className="eyebrow">A little bao history</p>
            <h2 id="story-heading">
              Tradition,
              <em>with a fresh point of view.</em>
            </h2>
            <p>{business.storyTrivia}</p>
            <a className="text-link" href="#gallery">
              See the story in pictures <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="gallery" className="gallery-section section-frame section-frame--narrow" aria-labelledby="gallery-heading">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">From the Bao & Co. table</p>
              <h2 id="gallery-heading">
                Come for the bao.
                <em>Stay for the feeling.</em>
              </h2>
            </div>
            <ExternalLink className="text-link text-link--desktop" href={business.social.instagram}>
              Follow @baoandcoph <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
          </div>
          <div className="gallery-album" aria-label="Bao & Co. photo gallery">
            {galleryItems.map((item, index) => (
              <button
                className={`gallery-album__item ${item.className ?? ''}`}
                type="button"
                key={item.src}
                aria-label={`Open photo ${index + 1}: ${item.alt}`}
                onClick={() => setActiveGalleryIndex(index)}
              >
                {item.type === 'video' ? (
                  <video src={item.src} aria-label={item.alt} muted playsInline preload="metadata" />
                ) : (
                  <img src={item.src} alt={item.alt} loading="lazy" />
                )}
                <span>{item.type === 'video' ? 'Watch video' : 'View photo'}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="social-section section-frame section-frame--narrow" aria-labelledby="social-heading">
          <div className="social-section__copy">
            <p className="eyebrow">Follow the bao trail</p>
            <h2 id="social-heading">
              Come hungry.
              <em>Leave curious.</em>
            </h2>
            <p>Weekend drops, new flavors, and the occasional cuapao date are waiting on our socials.</p>
          </div>
          <div className="social-links">
            <ExternalLink href={business.social.instagram} className="social-link">
              <InstagramIcon />
              <span>Instagram</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
            <ExternalLink href={business.social.facebook} className="social-link">
              <FacebookIcon />
              <span>Facebook</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
            <ExternalLink href={business.social.tiktok} className="social-link">
              <TikTokIcon />
              <span>TikTok</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
          </div>
        </section>

        <section className="contact-banner section-frame" aria-labelledby="contact-heading">
          <img src="/assets/products/1.jpg" alt="Bao with a cuapao date conversation graphic" loading="lazy" />
          <div>
            <p className="eyebrow">Your next craving has a home</p>
            <h2 id="contact-heading">Ready for a <em>cuapao date?</em></h2>
            <a className="button button--dark" href="#delivery" onClick={handleSmoothAnchorClick}>
              See delivery details <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      {showScrollTop && (
        <button
          className="scroll-top"
          type="button"
          aria-label="Scroll back to top"
          onClick={() => animateScrollTo(0)}
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      )}

      {activeGalleryIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded gallery photo"
          onClick={() => setActiveGalleryIndex(null)}
        >
          <button
            className="gallery-lightbox__close"
            type="button"
            aria-label="Close expanded photo"
            onClick={() => setActiveGalleryIndex(null)}
          >
            <X size={22} aria-hidden="true" />
          </button>
          <button
            className="gallery-lightbox__control gallery-lightbox__control--previous"
            type="button"
            aria-label="Previous gallery photo"
            onClick={(event) => {
              event.stopPropagation()
              setActiveGalleryIndex(
                (current) => (current === null ? 0 : (current - 1 + galleryItems.length) % galleryItems.length),
              )
            }}
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <figure className="gallery-lightbox__content" onClick={(event) => event.stopPropagation()}>
            {galleryItems[activeGalleryIndex].type === 'video' ? (
              <video
                src={galleryItems[activeGalleryIndex].src}
                aria-label={galleryItems[activeGalleryIndex].alt}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img src={galleryItems[activeGalleryIndex].src} alt={galleryItems[activeGalleryIndex].alt} />
            )}
            <figcaption>
              0{activeGalleryIndex + 1} / 0{galleryItems.length}
            </figcaption>
          </figure>
          <button
            className="gallery-lightbox__control gallery-lightbox__control--next"
            type="button"
            aria-label="Next gallery photo"
            onClick={(event) => {
              event.stopPropagation()
              setActiveGalleryIndex((current) => (current === null ? 0 : (current + 1) % galleryItems.length))
            }}
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>
      )}

      {activeReviewImage !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded review photo from ${activeReviewImage.author}`}
          onClick={() => setActiveReviewImage(null)}
        >
          <button
            className="gallery-lightbox__close"
            type="button"
            aria-label="Close expanded photo"
            onClick={() => setActiveReviewImage(null)}
          >
            <X size={22} aria-hidden="true" />
          </button>
          <figure className="gallery-lightbox__content" onClick={(event) => event.stopPropagation()}>
            <img src={activeReviewImage.src} alt={activeReviewImage.alt} />
            <figcaption>Photo shared by {activeReviewImage.author}</figcaption>
          </figure>
        </div>
      )}

      <footer className="site-footer">
        <div className="site-footer__main">
          <a className="brand-lockup brand-lockup--footer" href="#top" aria-label="Bao and Co. home">
            <img src="/assets/branding/bao-and-co-logo.jpg" alt="Bao & Co." />
          </a>
          <p>Freshly steamed baos and bold modern flavors in Angeles City.</p>
        </div>
        <div className="site-footer__bottom">
          <span>© {currentYear} Bao & Co.</span>
          <span>Made for hungry nights.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
