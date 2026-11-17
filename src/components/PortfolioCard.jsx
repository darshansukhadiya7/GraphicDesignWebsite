import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function PortfolioCard({ project, onOpen }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen(project)
    }
  }

  return (
    <motion.article
      className="portfolio-card"
      layout
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} concept`}
    >
      <div className="portfolio-image-wrap">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="portfolio-overlay">
          <span>{project.concept}</span>
          <span className="portfolio-view">View concept <ArrowUpRight size={16} /></span>
        </div>
      </div>
      <div className="portfolio-meta">
        <span>{project.category}</span>
        <h3>{project.title}</h3>
      </div>
    </motion.article>
  )
}
