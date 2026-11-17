import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CircleArrowDown,
  X,
  MapPin,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
  Palette,
  Monitor,
  Handshake,
  Check,
  Star,
} from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SectionHeading from './components/SectionHeading'
import ServiceCard from './components/ServiceCard'
import PortfolioCard from './components/PortfolioCard'
import ContactForm from './components/ContactForm'
import {
  navItems,
  services,
  portfolioProjects,
  reasons,
  processSteps,
  industries,
  structuredData,
  contactEmail,
  whatsappUrl,
} from './data/siteData'

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: 'easeOut' },
}

const iconMap = {
  Sparkles,
  Palette,
  Monitor,
  Handshake,
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All Projects')
  const [selectedDetail, setSelectedDetail] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [showAllServices, setShowAllServices] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllIndustries, setShowAllIndustries] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!selectedDetail) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedDetail(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedDetail])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All Projects') return portfolioProjects
    return portfolioProjects.filter((project) => project.category === activeFilter)
  }, [activeFilter])
  const visibleServices = showAllServices ? services : services.slice(0, 6)
  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 6)
  const visibleIndustries = showAllIndustries ? industries : industries.slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="page-shell">
        <Navbar navItems={navItems} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} />

        <main>
          <section id="home" className="hero-section">
            <div className="container hero-grid">
              <motion.div
                className="hero-copy"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <span className="eyebrow hero-eyebrow">Creative design studio • Ahmedabad</span>
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } },
                  }}
                >
                  <motion.span
                    className="headline-line"
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                    }}
                  >
                    WE MAKE BRANDS
                  </motion.span>
                  <motion.span
                    className="headline-line headline-last"
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                    }}
                  >
                    <motion.span
                      className="headline-accent"
                      whileHover={{ scale: 1.06, rotate: -2 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 16 }}
                    >
                      IMPOSSIBLE
                    </motion.span>{' '}
                    TO IGNORE.
                  </motion.span>
                </motion.h1>
                <p>
                  From powerful brand identities to eye-catching creatives and premium print experiences,
                  we turn your ideas into visuals that make an impact.
                </p>

                <div className="hero-actions">
                  <a href="#portfolio" className="primary-button">
                    Explore Our Work <ArrowRight size={18} />
                  </a>
                  <a href="#contact" className="secondary-button">
                    Start a Project
                  </a>
                </div>

                <div className="hero-badges">
                  <span>Brand Identity</span>
                  <span>Packaging</span>
                  <span>Web Design</span>
                  <span>Printing</span>
                </div>
              </motion.div>

              <motion.div
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              >
                <div className="hero-visual-frame">
                  <div className="ring-text">
                    <span>A&amp;M</span>
                    <small>Creative studio</small>
                  </div>
                  <motion.div
                    className="hero-photo-wrap"
                    animate={{ y: [0, -10, 0], rotate: [0, 0.6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <img
                      className="hero-photo"
                      src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85"
                      alt="Creative workspace with colorful art and design materials"
                      fetchPriority="high"
                    />
                    <div className="photo-caption">
                      <span>Ideas into impact</span>
                      <strong>Made to be remembered.</strong>
                    </div>
                  </motion.div>
                  <div className="float-card card-one">
                    <span>Brand Story</span>
                    <strong>Creative Direction</strong>
                  </div>
                  <div className="float-card card-two">
                    <span>Campaign</span>
                    <strong>Modern &amp; memorable</strong>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="scroll-indicator">
              <span>Scroll</span>
              <CircleArrowDown size={20} />
            </div>
          </section>

          <section id="about" className="content-section about-section">
            <div className="container">
              <motion.div {...reveal}>
                <SectionHeading
                  eyebrow="About A&M"
                  title="Creativity That Gives Your Brand a Voice."
                  description="At A&M Graphic Designers, we believe great design is more than appearance. It is about creating meaningful connections between brands and people."
                />
              </motion.div>
              <div className="about-grid">
                <motion.div {...reveal} className="about-copy">
                  <p>
                    We bring together creativity, thoughtful design, and attention to detail to help
                    businesses communicate their identity across digital and physical platforms.
                  </p>
                  <p>
                    From the first idea to the final printed experience, we focus on creating designs
                    that are memorable, professional, and aligned with each client&apos;s vision.
                  </p>

                  <div className="about-pills">
                    <span>Creative thinking</span>
                    <span>Brand consistency</span>
                    <span>Attention to detail</span>
                    <span>Digital &amp; print expertise</span>
                  </div>
                </motion.div>

                <motion.div {...reveal} className="about-visual">
                  <div className="image-collage">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                      alt="Design professionals collaborating"
                    />
                    <div className="quote-card">
                      <Star size={18} />
                      <p>
                        We design experiences that feel premium, purposeful, and unmistakably yours.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="services" className="content-section services-section">
            <div className="container">
              <SectionHeading
                eyebrow="Services"
                title="Design solutions shaped for visibility and growth."
                description="We create design systems for brands that need clarity, personality, and a stronger presence across every touchpoint."
                align="center"
              />

              <div className="service-grid">
                {visibleServices.map((service) => (
                  <ServiceCard
                    key={service.title}
                    service={service}
                    onOpen={(item) => setSelectedDetail({ type: 'service', item })}
                  />
                ))}
              </div>
              {services.length > 6 ? (
                <div className="load-more-wrap">
                  <button
                    type="button"
                    className="load-more-button"
                    onClick={() => setShowAllServices((showAll) => !showAll)}
                    aria-expanded={showAllServices}
                  >
                    {showAllServices ? 'Show fewer services' : 'Load more services'}
                    <ArrowRight size={17} />
                  </button>
                </div>
              ) : null}
            </div>
          </section>

          <section id="portfolio" className="content-section portfolio-section">
            <div className="container">
              <SectionHeading
                eyebrow="Our Work"
                title="Concept portfolio built for a premium creative brand presence."
                description="These are illustrative concept projects created to demonstrate the style, range, and creative direction A&M could bring to brand and marketing work."
                align="center"
              />

              <div className="portfolio-filters">
                {['All Projects', 'Branding', 'Packaging', 'Social Media', 'Print Design', 'Advertising', 'Web Design'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={filter === activeFilter ? 'filter active' : 'filter'}
                    onClick={() => {
                      setActiveFilter(filter)
                      setShowAllProjects(false)
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <motion.div layout className="portfolio-grid">
                {visibleProjects.map((project) => (
                  <PortfolioCard
                    key={project.title}
                    project={project}
                    onOpen={(item) => setSelectedDetail({ type: 'project', item })}
                  />
                ))}
              </motion.div>
              {filteredProjects.length > 6 ? (
                <div className="load-more-wrap">
                  <button
                    type="button"
                    className="load-more-button"
                    onClick={() => setShowAllProjects((showAll) => !showAll)}
                    aria-expanded={showAllProjects}
                  >
                    {showAllProjects ? 'Show fewer projects' : 'Load more projects'}
                    <ArrowRight size={17} />
                  </button>
                </div>
              ) : null}
            </div>
          </section>

          <section className="content-section why-section">
            <div className="container">
              <SectionHeading
                eyebrow="Why Choose A&M"
                title="Good Design Gets Attention. Great Design Builds Recognition."
                align="center"
              />

              <div className="why-grid">
                {reasons.map((item, index) => {
                  const Icon = iconMap[item.icon]
                  return (
                    <motion.article
                      key={item.title}
                      className={`reason-card reason-card-${index + 1}`}
                      {...reveal}
                      whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                    >
                      <span className="reason-index">0{index + 1}</span>
                      <div className="reason-icon">
                        <Icon size={18} />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          </section>

          <section id="process" className="content-section process-section">
            <div className="container">
              <SectionHeading
                eyebrow="Our Creative Process"
                title="From First Conversation to Final Creation."
                align="center"
              />

              <div className="process-timeline">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    className="process-item"
                    {...reveal}
                    transition={{ duration: 0.55, delay: index * 0.12 }}
                  >
                    <div className="step-badge">{step.step}</div>
                    <div className="step-copy">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section industries-section">
            <div className="container">
              <SectionHeading
                eyebrow="Industries We Serve"
                title="Creative solutions for brands with a story to tell."
                align="center"
              />

              <div className="industries-grid">
                {visibleIndustries.map((industry, index) => (
                  <motion.div
                    key={industry.name}
                    className="industry-card"
                    {...reveal}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    whileHover={{ y: -7, scale: 1.015 }}
                    style={{ backgroundImage: `url("${industry.image}")` }}
                  >
                    <span>{industry.name}</span>
                  </motion.div>
                ))}
              </div>
              {industries.length > 6 ? (
                <div className="load-more-wrap">
                  <button
                    type="button"
                    className="load-more-button"
                    onClick={() => setShowAllIndustries((showAll) => !showAll)}
                    aria-expanded={showAllIndustries}
                  >
                    {showAllIndustries ? 'Show fewer industries' : 'Explore all industries'}
                    <ArrowRight size={17} />
                  </button>
                </div>
              ) : null}
            </div>
          </section>

          <section className="cta-section">
            <div className="container cta-inner">
              <motion.div {...reveal} className="cta-copy">
                <span className="eyebrow">Start a project</span>
                <h2>
                  Have an Idea? <span>Let&apos;s Make It Visible.</span>
                </h2>
                <p>
                  Whether you are building a new brand or refreshing an existing one, let&apos;s create
                  something that makes people remember you.
                </p>
                <div className="hero-actions">
                  <a href="#contact" className="primary-button">
                    Start Your Project <ArrowRight size={18} />
                  </a>
                  <a href="#contact" className="secondary-button light-button">
                    Talk to Our Team
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="cta-sticker"
                aria-hidden="true"
                animate={{ rotate: [8, -5, 8], y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span>Good ideas</span>
                <strong>deserve<br />great design.</strong>
              </motion.div>
            </div>
          </section>

          <section id="contact" className="content-section contact-section">
            <div className="container">
              <motion.div {...reveal}>
                <SectionHeading
                  eyebrow="Contact"
                  title="Let&apos;s build something that stands out."
                  description="We help brands sharpen their voice, design system, and visual impact through strategic creative work."
                  align="center"
                />
              </motion.div>
              <div className="contact-grid">
                <motion.div {...reveal} className="contact-copy">
                  <div className="contact-intro">
                    <span>Let&apos;s connect</span>
                    <h3>Good work starts with a good conversation.</h3>
                    <p>
                      Tell us what you&apos;re building. We&apos;ll help you find the right creative
                      direction for your brand.
                    </p>
                  </div>
                  <div className="contact-details">
                    <div>
                      <div className="detail-icon">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <strong>A&amp;M Graphic Designers</strong>
                        <p>Ahmedabad, Gujarat, India</p>
                      </div>
                    </div>

                    <div>
                      <div className="detail-icon">
                        <Phone size={18} />
                      </div>
                      <div>
                        <a href="tel:+918980982919">+91 8980982919</a>
                        <a href="tel:+919081982919">+91 9081982919</a>
                      </div>
                    </div>

                    <div>
                      <div className="detail-icon">
                        <MessageCircle size={18} />
                      </div>
                      <div>
                        <a href={whatsappUrl} target="_blank" rel="noreferrer">
                          WhatsApp enquiry
                        </a>
                      </div>
                    </div>

                    <div>
                      <div className="detail-icon">
                        <Mail size={18} />
                      </div>
                      <div>
                        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div {...reveal} className="contact-panel">
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        <AnimatePresence>
          {selectedDetail ? (
            <motion.div
              className="project-modal-backdrop"
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetail(null)}
            >
              <motion.div
                className={`project-modal ${selectedDetail.type}-detail-modal`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="detail-modal-title"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="modal-close"
                  aria-label="Close detail view"
                  onClick={() => setSelectedDetail(null)}
                >
                  <X size={18} />
                </button>
                <div className="modal-media">
                  <img src={selectedDetail.item.image} alt={selectedDetail.item.title} />
                  <div className="modal-image-caption">
                    <span>A&amp;M Graphic Designers</span>
                    <strong>
                      {selectedDetail.type === 'service'
                        ? selectedDetail.item.accent
                        : selectedDetail.item.concept}
                    </strong>
                  </div>
                </div>
                <div className="modal-copy">
                  <span className="modal-tag">
                    {selectedDetail.type === 'service'
                      ? selectedDetail.item.accent
                      : `${selectedDetail.item.category} concept`}
                  </span>
                  <h3 id="detail-modal-title">{selectedDetail.item.title}</h3>
                  <p>{selectedDetail.item.description || selectedDetail.item.summary}</p>
                  {selectedDetail.type === 'service' ? (
                    <div className="service-detail-content">
                      <h4>What this service can include</h4>
                      <ul className="modal-checks">
                        {selectedDetail.item.deliverables.map((deliverable) => (
                          <li key={deliverable}>
                            <Check size={14} /> {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <>
                      <div className="modal-breakdown">
                        <div>
                          <span>Project type</span>
                          <strong>{selectedDetail.item.concept}</strong>
                        </div>
                        <div>
                          <span>Design direction</span>
                          <strong>Premium, strategic, visually distinctive</strong>
                        </div>
                      </div>
                      <ul className="modal-checks">
                        <li><Check size={14} /> Brand-led creative thinking</li>
                        <li><Check size={14} /> Strong visual hierarchy</li>
                        <li><Check size={14} /> Premium presentation and storytelling</li>
                      </ul>
                      <p className="concept-note">Illustrative concept work, not a confirmed client project.</p>
                    </>
                  )}
                  <a
                    href="#contact"
                    className="primary-button modal-cta"
                    onClick={() => setSelectedDetail(null)}
                  >
                    Discuss a similar project <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  )
}

export default App
