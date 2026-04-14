import { memo, useState, useCallback } from 'react'
import './ServiceCard.css'

/*
  OPTIMIZATIONS:
  1. React.memo    — skips re-render if props are identical
  2. useCallback   — stable onLoad handler, no new fn each render
  3. loading="lazy"— browser defers off-screen image fetch
  4. decoding="async" — image decode runs off main thread
  5. Skeleton      — fixed-height placeholder prevents layout shift
  6. CSS shimmer   — pure GPU linear-gradient animation, no JS loop
*/
const ServiceCard = memo(function ServiceCard({
  image,
  icon,
  title,
  desc,
  tag,
  disclaimer,
  onClick,
}) {
  // false = skeleton visible, true = image revealed
  const [loaded, setLoaded] = useState(false)

  // Stable reference — won't recreate on parent re-renders
  const handleLoad = useCallback(() => setLoaded(true), [])

  return (
    <div className="service-card" onClick={onClick}>

      {/* ── Image area with fixed height to prevent layout shift ── */}
      <div className="service-card__image-wrapper">

        {/* Skeleton shimmer — hidden once image loads via opacity */}
        <div
          className={`service-card__skeleton ${loaded ? 'service-card__skeleton--hidden' : ''}`}
          aria-hidden="true"
        />

        {/* Image: lazy + async decode → never blocks initial render */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className={`service-card__image ${loaded ? 'service-card__image--loaded' : ''}`}
          onLoad={handleLoad}
        />

        <div className="service-card__image-overlay" />
        {tag && <span className="service-card__badge">{tag}</span>}
      </div>

      {/* ── Text content ── */}
      <div className="service-card__content">
        <div className="service-card__icon">{icon}</div>
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__desc">{desc}</p>
        {disclaimer && <p className="service-card__disclaimer">{disclaimer}</p>}
      </div>

    </div>
  )
})

export default ServiceCard
