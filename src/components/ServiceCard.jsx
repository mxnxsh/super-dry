import { useState } from 'react'
import { motion } from 'framer-motion'
import './ServiceCard.css'

export default function ServiceCard({
  image,
  icon,
  title,
  desc,
  tag,
  disclaimer,
  onClick,
  custom,
  variants,
  initial,
  animate
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      className="service-card"
      variants={variants}
      custom={custom}
      initial={initial}
      animate={animate}
      onClick={onClick}
    >
      <div className="service-card__image-wrapper">
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          className={`service-card__image ${loaded ? 'loaded' : 'loading'}`}
          onLoad={() => setLoaded(true)}
        />
        <div className="service-card__image-overlay" />
        {tag && <span className="service-card__badge">{tag}</span>}
      </div>
      
      <div className="service-card__content">
        <div className="service-card__icon">{icon}</div>
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__desc">{desc}</p>
        {disclaimer && <p className="service-card__disclaimer">{disclaimer}</p>}
      </div>
    </motion.div>
  )
}
