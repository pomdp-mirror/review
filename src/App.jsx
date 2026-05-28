import { useEffect, useState } from 'react'
import './App.css'

const teaserFrameCount = 24

const imgBase = `${import.meta.env.BASE_URL}imgs`

const teaserTasks = [
  { id: 'drawer_open', label: 'Drawer Opening', folder: 'drawer_open_seed_5_sample_288' },
  { id: 'drawer_close', label: 'Drawer Closing', folder: 'drawer_close_seed4_sample_488' },
  { id: 'cube_drop', label: 'Cube Dropping', folder: 'cube_drop_seed_5_sample_16' },
  { id: 'hammer_lift', label: 'Hammer Lifting', folder: 'hammer_lift_seed4_sample_376' },
].map((task) => {
  const base = `${imgBase}/${task.folder}`
  return {
    ...task,
    staticObservation: `${base}/Obs_Group_obs_raw_agentview_image.png`,
    staticAction: `${base}/Act_Group_act_agentview_image.png`,
    animatedObservations: Array.from(
      { length: teaserFrameCount },
      (_, index) => `${base}/Obs_Group_obs_raw_${index}_agentview_image.png`,
    ),
    animatedActions: Array.from(
      { length: teaserFrameCount },
      (_, index) => `${base}/Act_Group_act_${index}_agentview_image.png`,
    ),
  }
})

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

function App() {
  const [teaserAngleStep, setTeaserAngleStep] = useState(0)
  const [isTeaserPlaying, setIsTeaserPlaying] = useState(true)
  const [selectedTaskId, setSelectedTaskId] = useState(teaserTasks[0].id)
  const teaserFrameIndex = teaserAngleStep % teaserFrameCount
  const reflectionAngle = teaserAngleStep * (360 / teaserFrameCount)
  const currentTask = teaserTasks.find((task) => task.id === selectedTaskId) ?? teaserTasks[0]

  useEffect(() => {
    teaserTasks.forEach((task) => {
      const taskFrames = [
        task.staticObservation,
        task.staticAction,
        ...task.animatedObservations,
        ...task.animatedActions,
      ]
      taskFrames.forEach((src) => {
        const image = new window.Image()
        image.src = src
      })
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
                    src={currentTask.staticObservation}
                    alt={`Original ${currentTask.label.toLowerCase()} observation`}
                    width="400"
                    height="400"
                  />
                </div>
                <div className="teaser-cell">
                  <h3 className="teaser-cell-title">Action</h3>
                  <img
                    className="teaser-image"
                    src={currentTask.staticAction}
                    alt={`Original ${currentTask.label.toLowerCase()} action`}
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
                    src={currentTask.animatedObservations[teaserFrameIndex]}
                    alt={`${currentTask.label} observation frame ${teaserFrameIndex}`}
                    width="400"
                    height="400"
                  />
                </div>
                <div className="teaser-cell">
                  <h3 className="teaser-cell-title">Transformed Action</h3>
                  <img
                    className="teaser-image"
                    src={currentTask.animatedActions[teaserFrameIndex]}
                    alt={`${currentTask.label} action frame ${teaserFrameIndex}`}
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
            <div className="teaser-task-selector" role="tablist" aria-label="Demonstration task">
              {teaserTasks.map((task) => {
                const isActive = task.id === selectedTaskId
                return (
                  <button
                    key={task.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`teaser-task-button${isActive ? ' is-active' : ''}`}
                    onClick={() => setSelectedTaskId(task.id)}
                  >
                    {task.label}
                  </button>
                )
              })}
            </div>
            <figcaption>
              Given an observation–action pair (<em>o</em>, <em>a</em>), MIRROR produces a symmetric counterpart:
              the observation is reflected to a rotated scene, and the in-plane action components
              (Δ<em>x</em>, Δ<em>y</em>) are reflected consistently with the observation, while the remaining
              components are unchanged.
            </figcaption>
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
          <figure className="method-figure">
            <img src={`${imgBase}/fig_pipeline_v1.png`} alt="MIRROR pipeline overview" />
          </figure>
          <p className="lead">
            MIRROR follows a two-stage latent symmetry discovery process. <strong>Stage 1</strong> pretrains a
            frozen spherical autoencoder (<em>E</em><sub>o</sub>, <em>D</em><sub>o</sub>) that compresses each
            observation into a latent <em>z</em>. <strong>Stage 2</strong> learns symmetry modules
            (<em>E</em><sub>z</sub>, <em>D</em><sub>z</sub>) and (<em>E</em><sub>a</sub>, <em>D</em><sub>a</sub>)
            that map <em>z</em> and the action <em>a</em> into latents on which a linear representation of the
            group <em>G</em> acts; these modules are trained by adversarial tuple matching together with a
            group-consistency regularizer.
          </p>
        </div>
      </section>

      <section className="section results-section">
        <div className="container is-max-widescreen">
          <h2 className="title">Results</h2>
          <figure className="results-figure">
            <img src={`${imgBase}/fig_symmetry_error.png`} alt="Symmetry-quality metric comparison across baselines and MIRROR variants" />
          </figure>
          <p className="lead">
            We evaluate MIRROR against two GAN baselines (SymGAN and LaLiGAN) along with several variants on four
            symmetry-quality metrics: <strong>Symmetry Invariance</strong>,{' '}
            <strong>Identity</strong>, <strong>Compatibility</strong>, and{' '}
            <strong>Invertibility</strong>. MIRROR attains the best aggregate score on
            Compatibility and Invertibility, reducing compatibility error by ≥61% and invertibility error by
            ≥39% relative to the GAN baselines.
          </p>
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
