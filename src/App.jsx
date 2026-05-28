import { useEffect, useState } from 'react'
import './App.css'

const teaserFrameCount = 24
const teaserImageBase = '/imgs/drawer_open_seed_2_sample_128'
const staticObservationFrame = `${teaserImageBase}/Obs_Group_obs_raw_agentview_image.png`
const staticActionFrame = `${teaserImageBase}/Act_Group_act_agentview_image.png`
const animatedObservationFrames = Array.from(
  { length: teaserFrameCount },
  (_, index) => `${teaserImageBase}/Obs_Group_obs_raw_${index}_agentview_image.png`,
)
const animatedActionFrames = Array.from(
  { length: teaserFrameCount },
  (_, index) => `${teaserImageBase}/Act_Group_act_${index}_agentview_image.png`,
)

const authors = [
  { name: 'First Author', affiliation: '1', href: '#' },
  { name: 'Second Author', affiliation: '1 2', href: '#' },
  { name: 'Third Author', affiliation: '2', href: '#' },
  { name: 'Senior Author', affiliation: '1', href: '#' },
]

const links = [
  { label: 'arXiv', href: '#', iconClass: 'ai ai-arxiv' },
  { label: 'PDF', href: '#', iconClass: 'fas fa-file-pdf' },
  { label: 'Code', href: '#', iconClass: 'fab fa-github' },
  { label: 'Data', href: '#', iconClass: 'fas fa-database' },
]

const highlights = [
  {
    title: 'Simple Setup',
    text: 'A compact research website structure with the sections readers expect: paper details, overview, findings, and citation.',
  },
  {
    title: 'Reusable Style',
    text: 'Local CSS recreates the clean academic layout, green author links, rounded dark buttons, and roomy section spacing.',
  },
  {
    title: 'No Extra Packages',
    text: 'The page uses the existing Vite and React setup only, so it stays easy to customize and deploy.',
  },
]

function App() {
  const [teaserAngleStep, setTeaserAngleStep] = useState(0)
  const [isTeaserPlaying, setIsTeaserPlaying] = useState(true)
  const teaserFrameIndex = teaserAngleStep % teaserFrameCount
  const reflectionAngle = teaserAngleStep * (360 / teaserFrameCount)

  useEffect(() => {
    const teaserFrames = [
      staticObservationFrame,
      staticActionFrame,
      ...animatedObservationFrames,
      ...animatedActionFrames,
    ]

    teaserFrames.forEach((src) => {
      const image = new window.Image()
      image.src = src
    })
  }, [])

  useEffect(() => {
    if (!isTeaserPlaying) {
      return undefined
    }

    const timerId = window.setInterval(() => {
      setTeaserAngleStep((currentStep) => (currentStep + 1) % (teaserFrameCount + 1))
    }, 180)

    return () => window.clearInterval(timerId)
  }, [isTeaserPlaying])

  return (
    <main>
      <section className="hero-section">
        <div className="container is-max-desktop has-text-centered">
          <h1 className="publication-title">
            MIRROR: Reflecting Hidden Symmetries from Offline Robot Interaction Data
          </h1>

          <div className="publication-authors">
            {authors.map((author, index) => (
              <span className="author-block" key={author.name}>
                <a href={author.href}>{author.name}</a>
                <sup>{author.affiliation}</sup>
                {index < authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>

          <div className="publication-affiliations">
            <span>
              <sup>1</sup>University or Lab
            </span>
            <span>
              <sup>2</sup>Research Institute
            </span>
            <span>
              <sup>*</sup>Equal Contribution
            </span>
          </div>

          <p className="corresponding-authors">Corresponding authors: author@example.edu, collaborator@example.edu</p>
          <p className="venue">Conference or Journal 2026</p>

          <div className="publication-links" aria-label="Paper resources">
            {links.map((link) => (
              <a className="button is-dark is-rounded" href={link.href} key={link.label}>
                <span className="icon">
                  <i className={link.iconClass}></i>
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section teaser-section">
        <div className="container is-max-widescreen">
          <figure className="teaser">
            <div className="teaser-flow">
              <div className="teaser-transform" aria-hidden="true">
                <span>MIRROR</span>
                <svg className="teaser-transform-arrow" viewBox="0 0 340 120" focusable="false">
                  <defs>
                    <marker
                      id="teaser-arrow-head"
                      markerHeight="12"
                      markerUnits="userSpaceOnUse"
                      markerWidth="12"
                      orient="auto"
                      refX="11"
                      refY="6"
                      viewBox="0 0 12 12"
                    >
                      <path d="M0 0 L12 6 L0 12 Z" />
                    </marker>
                  </defs>
                  <path
                    className="teaser-transform-arrow-path"
                    d="M72 92 C126 40 218 38 276 86"
                    markerEnd="url(#teaser-arrow-head)"
                  />
                </svg>
              </div>

              <div className="teaser-panel is-source">
                <div className="teaser-cell">
                  <h3 className="teaser-cell-title">Observation</h3>
                  <img
                    className="teaser-image is-observation"
                    src={staticObservationFrame}
                    alt="Original drawer opening observation"
                    width="400"
                    height="400"
                  />
                </div>
                <div className="teaser-cell">
                  <h3 className="teaser-cell-title">Action</h3>
                  <img
                    className="teaser-image"
                    src={staticActionFrame}
                    alt="Original drawer opening action"
                    width="400"
                    height="400"
                  />
                </div>
              </div>

              <div className="teaser-panel is-transformed">
                <div className="teaser-cell">
                  <h3 className="teaser-cell-title">Transformed Observation</h3>
                  <img
                    className="teaser-image is-observation"
                    src={animatedObservationFrames[teaserFrameIndex]}
                    alt={`Drawer opening observation frame ${teaserFrameIndex}`}
                    width="400"
                    height="400"
                  />
                </div>
                <div className="teaser-cell">
                  <h3 className="teaser-cell-title">Transformed Action</h3>
                  <img
                    className="teaser-image"
                    src={animatedActionFrames[teaserFrameIndex]}
                    alt={`Drawer opening action frame ${teaserFrameIndex}`}
                    width="400"
                    height="400"
                  />
                </div>
              </div>
            </div>
            <div className="teaser-slider">
              <button
                className="teaser-play-button"
                type="button"
                aria-label={isTeaserPlaying ? 'Stop reflection angle autoplay' : 'Play reflection angle autoplay'}
                aria-pressed={isTeaserPlaying}
                onClick={() => setIsTeaserPlaying((currentValue) => !currentValue)}
              >
                <span
                  className={isTeaserPlaying ? 'teaser-stop-icon' : 'teaser-play-icon'}
                  aria-hidden="true"
                ></span>
              </button>
              <label className="teaser-slider-label" htmlFor="reflection-angle-slider">
                Reflection Angle
              </label>
              <input
                id="reflection-angle-slider"
                type="range"
                aria-label="Reflection angle"
                min="0"
                max={teaserFrameCount}
                step="1"
                value={teaserAngleStep}
                onPointerDown={() => setIsTeaserPlaying(false)}
                onKeyDown={() => setIsTeaserPlaying(false)}
                onChange={(event) => {
                  setIsTeaserPlaying(false)
                  setTeaserAngleStep(Number(event.target.value))
                }}
              />
              <output htmlFor="reflection-angle-slider">{reflectionAngle}°</output>
            </div>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <h2 className="title">Abstract</h2>
          <div className="content has-text-justified">
            <p>
              Exploiting symmetry in robot policy learning requires knowing how a symmetry group operates on observations and actions, an assumption that often breaks in partially observable MDPs (POMDPs) with pixel observations, where this operation is nonlinear and difficult to specify by hand. Existing approaches sidestep this challenge using environment-specific preprocessing, limiting portability across tasks and observation modalities. We introduce MIRROR, an adversarial framework that discovers how a symmetry group operates jointly on observations and actions in POMDPs directly from offline interaction data, while explicitly enforcing the group axioms. On four Robosuite tabletop tasks, MIRROR attains the lowest aggregate error on three of four symmetry-quality metrics, including a 61% reduction in compatibility error over LaLiGAN, the strongest GAN baseline on that metric. The discovered operations instantiate an equivariant behavior cloning (BC) policy that outperforms vanilla BC on all four tasks, with per-task gains up to 9.66%, and the same framework transfers zero-shot to a real Kinova GEN3 arm under a different observation modality.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-widescreen">
          <h2 className="title">Method Overview</h2>
          <p className="lead">
            Describe the system at a high level before moving into implementation details. Use this area for a concise
            pipeline figure, algorithm sketch, or set of design choices.
          </p>
          <div className="overview-grid">
            {highlights.map((item) => (
              <article className="overview-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section results-section">
        <div className="container is-max-widescreen">
          <h2 className="title">Results</h2>
          <div className="results-grid">
            <div className="result-panel">
              <p className="metric">+52%</p>
              <p>Example improvement over a baseline.</p>
            </div>
            <div className="result-panel">
              <p className="metric">29</p>
              <p>Example benchmark tasks or evaluation settings.</p>
            </div>
            <div className="result-panel">
              <p className="metric">3x</p>
              <p>Example speedup, accuracy gain, or efficiency claim.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container is-max-desktop">
          <h2 className="title">BibTeX</h2>
          <pre className="citation">
            <code>{`@inproceedings{paper2026template,
  title     = {Paper Title Goes Here},
  author    = {First Author and Second Author and Third Author},
  booktitle = {Conference Name},
  year      = {2026}
}`}</code>
          </pre>
        </div>
      </section>

      <footer className="footer">
        <div className="container is-max-desktop">
          <p>
            Built as a simple research paper website template. Replace the placeholder text, links, and teaser with
            project-specific content.
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
