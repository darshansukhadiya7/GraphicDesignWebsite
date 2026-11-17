import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ service, onOpen }) {
  return (
    <motion.article
      className="service-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <div className="service-image-wrap">
        <img src={service.image} alt={service.title} loading="lazy" />
        <span className="service-accent">{service.accent}</span>
      </div>
      <div className="service-copy">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <button type="button" className="text-link" onClick={() => onOpen(service)}>
          Learn more <ArrowRight size={16} />
        </button>
      </div>
    </motion.article>
  )
}
