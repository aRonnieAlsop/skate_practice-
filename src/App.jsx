import { useEffect, useState } from 'react'
import heartOutline from './assets/heart-outline.svg'
import heartFilled from './assets/heart-filled.svg'
import celebrationA from './assets/celebrationA.gif'
import celebrationB from './assets/celebrationB.gif'
import celebrationC from './assets/celebrationC.gif'
import celebrationD from './assets/celebrationD.gif'
import celebrationE from './assets/celebrationE.gif'
import PWABadge from './PWABadge.jsx'
import './App.css'

const edges = [
  {
    id: 'swizzles',
    name: 'Swizzles with Circle Arms',
    detail: 'Forward and backward',
  },
  {
    id: 'twist-side-lunge',
    name: 'Twist Side Lunge',
    detail: 'Forward and backward',
  },
  {
    id: 'power-pulls',
    name: 'Power Pulls',
    detail: 'Forward and backward · Right and left',
  },
  {
    id: 'cross-strokes',
    name: 'Cross-Strokes',
    detail: 'Forward and backward',
  },
  {
    id: 'alternate-three-turns',
    name: 'Alternate 3-Turns',
    detail: 'Outside and inside',
  },
  {
    id: 'waltz-three-turns',
    name: 'Waltz 3-Turns',
    detail: 'Outside and inside',
  },
]

const circleEdges = [
  {
    id: 'circle-crossovers',
    name: 'Crossovers',
    detail: '5× each direction · Forward and backward',
  },
  {
    id: 'outside-mohawks',
    name: 'Outside Mohawks',
    detail: '5× each direction',
  },
  {
    id: 'back-three-crossovers',
    name: 'Back 3-Turn Crossovers',
    detail: '5× both directions',
  },
]

const skatingSkillsRuns = [
  {
    id: 'skills-run-one',
    name: 'Run 1',
  },
  {
    id: 'skills-run-two',
    name: 'Run 2',
  },
  {
    id: 'skills-run-three',
    name: 'Run 3',
  },
]

const spins = [
  {
    id: 'forward-scratch-spin',
    name: 'Forward Scratch Spin',
  },
  {
    id: 'backward-scratch-spin',
    name: 'Backward Scratch Spin',
  },
  {
    id: 'sit-spin',
    name: 'Sit Spin',
  },
  {
    id: 'camel-spin',
    name: 'Camel Spin',
  },
  {
    id: 'layback-spin',
    name: 'Layback',
  },
  {
    id: 'pancake-spin',
    name: 'Pancake',
  },
  {
    id: 'camel-sit-spin',
    name: 'Camel Sit',
  },
]

const jumps = [
  {
    id: 'waltz-jump',
    name: 'Waltz Jump',
  },
  {
    id: 'salchow',
    name: 'Salchow',
  },
  {
    id: 'toe-loop',
    name: 'Toe Loop',
  },
  {
    id: 'loop-jump',
    name: 'Loop',
  },
  {
    id: 'flip-jump',
    name: 'Flip',
  },
  {
    id: 'axel',
    name: 'Axel',
  },
]

const makeHeartIds = (exerciseId) =>
  Array.from({ length: 10 }, (_, index) => `${exerciseId}-${index + 1}`)

const allEdgeIds = [
  ...edges.map((exercise) => exercise.id),
  ...circleEdges.map((exercise) => exercise.id),
]

const allSkillsIds = skatingSkillsRuns.map((run) => run.id)

const allSpinIds = spins.flatMap((spin) => makeHeartIds(spin.id))

const allJumpIds = jumps.flatMap((jump) => makeHeartIds(jump.id))

const totalPracticeChecks =
  allEdgeIds.length +
  allSkillsIds.length +
  allSpinIds.length +
  allJumpIds.length

function App() {
 const [checked, setChecked] = useState(() => {
    try {
    const savedProgress = localStorage.getItem('evan-skate-progress')
      return savedProgress ? JSON.parse(savedProgress) : {}
    } catch {
      return {}
    }
  })

  const [jumpCombos, setJumpCombos] = useState(() => {
    return localStorage.getItem('evan-jump-combos') || ''
  })

  const [sparkle, setSparkle] = useState(null)
  const [celebration, setCelebration] = useState(null)

  useEffect(() => {
    localStorage.setItem('evan-skate-progress', JSON.stringify(checked))
  }, [checked])

  useEffect(() => {
    localStorage.setItem('evan-jump-combos', jumpCombos)
  }, [jumpCombos])

  const isComplete = (ids, progress = checked) => {
    return ids.every((id) => Boolean(progress[id]))
  }

  const checkedTotal = [
    ...allEdgeIds,
    ...allSkillsIds,
    ...allSpinIds,
    ...allJumpIds,
  ].filter((id) => checked[id]).length

  const progressPercent = Math.round(
    (checkedTotal / totalPracticeChecks) * 100,
  )

  const launchSparkles = (event) => {
    const rectangle = event.currentTarget.getBoundingClientRect()

    setSparkle({
      id: Date.now(),
      x: rectangle.left + rectangle.width / 2,
      y: rectangle.top + rectangle.height / 2,
    })

    window.setTimeout(() => {
      setSparkle(null)
    }, 850)
  }

  const showCelebration = (image, title, message) => {
    setCelebration({
      image,
      title,
      message,
    })
  }

  const toggleSingleCheck = (
    event,
    id,
    groupIds,
    groupCelebration,
  ) => {
    const willBeChecked = !checked[id]

    const nextProgress = {
      ...checked,
      [id]: willBeChecked,
    }

    setChecked(nextProgress)

    if (!willBeChecked) {
      return
    }

    launchSparkles(event)

    const groupWasComplete = isComplete(groupIds, checked)
    const groupIsNowComplete = isComplete(groupIds, nextProgress)

    if (!groupWasComplete && groupIsNowComplete) {
      window.setTimeout(() => {
        showCelebration(
          groupCelebration.image,
          groupCelebration.title,
          groupCelebration.message,
        )
      }, 350)
    }
  }

  const toggleHeart = (
    event,
    heartId,
    rowIds,
    exerciseName,
    sectionIds,
    sectionName,
    rowImage,
    sectionImage,
  ) => {
    const willBeChecked = !checked[heartId]

    const nextProgress = {
      ...checked,
      [heartId]: willBeChecked,
    }

    setChecked(nextProgress)

    if (!willBeChecked) {
      return
    }

    launchSparkles(event)

    const rowWasComplete = isComplete(rowIds, checked)
    const rowIsNowComplete = isComplete(rowIds, nextProgress)

    const sectionWasComplete = isComplete(sectionIds, checked)
    const sectionIsNowComplete = isComplete(sectionIds, nextProgress)

    if (!sectionWasComplete && sectionIsNowComplete) {
      window.setTimeout(() => {
        showCelebration(
          sectionImage,
          `${sectionName} Complete!`,
          `You finished every ${sectionName.toLowerCase()} exercise!`,
        )
      }, 350)

      return
    }

    if (!rowWasComplete && rowIsNowComplete) {
      window.setTimeout(() => {
        showCelebration(
          rowImage,
          `${exerciseName} Complete!`,
          'All ten hearts are filled!',
        )
      }, 350)
    }
  }

  const answerJumpCombos = (answer) => {
    setJumpCombos(answer)

    if (answer === 'yes') {
      showCelebration(
        celebrationE,
        'Jump Combos Complete!',
        'You finished your jump combinations!',
      )
    }
  }

  const resetPractice = () => {
    const shouldReset = window.confirm(
      'Start a new practice and empty all of the hearts?',
    )

    if (!shouldReset) {
      return
    }

    setChecked({})
    setJumpCombos('')
    setSparkle(null)
    setCelebration(null)

    localStorage.removeItem('evan-skate-progress')
    localStorage.removeItem('evan-jump-combos')
  }

  return (
    <div className="skate-app">
      <header className="hero">
        <div className="hero-decoration hero-star-one">✦</div>
        <div className="hero-decoration hero-star-two">★</div>
        <div className="hero-decoration hero-heart">♥</div>

        <p className="hero-small-title">Evan’s Practice</p>
        <h1>Skate &amp; Sparkle</h1>
        <p className="hero-subtitle">
          Fill your hearts and celebrate every win!
        </p>

        <div className="practice-progress">
          <div className="progress-text">
            <span>Today’s practice</span>
            <strong>{progressPercent}%</strong>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Practice progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progressPercent}
          >
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      <main>
        <PracticeSection
          id="edges"
          eyebrow="Glide, bend and flow"
          title="Edges"
          icon="⛸️"
          color="pink"
        >
          <div className="single-check-list">
            {edges.map((exercise) => (
              <SingleCheck
                key={exercise.id}
                exercise={exercise}
                checked={Boolean(checked[exercise.id])}
                onClick={(event) =>
                  toggleSingleCheck(
                    event,
                    exercise.id,
                    allEdgeIds,
                    {
                      image: celebrationA,
                      title: 'Edges Complete!',
                      message: 'Beautiful edges! Every one is checked!',
                    },
                  )
                }
              />
            ))}
          </div>

          <div className="circle-card">
            <div className="circle-heading">
              <span>○</span>

              <div>
                <p>Edges continued</p>
                <h3>On the Circle</h3>
              </div>
            </div>

            <div className="single-check-list">
              {circleEdges.map((exercise) => (
                <SingleCheck
                  key={exercise.id}
                  exercise={exercise}
                  checked={Boolean(checked[exercise.id])}
                  onClick={(event) =>
                    toggleSingleCheck(
                      event,
                      exercise.id,
                      allEdgeIds,
                      {
                        image: celebrationA,
                        title: 'Edges Complete!',
                        message: 'Beautiful edges! Every one is checked!',
                      },
                    )
                  }
                />
              ))}
            </div>
          </div>
        </PracticeSection>

        <PracticeSection
          id="skating-skills"
          eyebrow="Three strong tries"
          title="Skating Skills Test"
          icon="★"
          color="purple"
        >
          <div className="skills-checks">
            {skatingSkillsRuns.map((run, index) => (
              <button
                key={run.id}
                type="button"
                className={`skills-check ${
                  checked[run.id] ? 'checked' : ''
                }`}
                onClick={(event) =>
                  toggleSingleCheck(
                    event,
                    run.id,
                    allSkillsIds,
                    {
                      image: celebrationB,
                      title: 'Skating Skills Complete!',
                      message: 'Three strong runs! You did it!',
                    },
                  )
                }
                aria-pressed={Boolean(checked[run.id])}
              >
                <img
                  src={checked[run.id] ? heartFilled : heartOutline}
                  alt=""
                />

                <span>{run.name}</span>

                <small>Try {index + 1}</small>
              </button>
            ))}
          </div>
        </PracticeSection>

        <PracticeSection
          id="spins"
          eyebrow="Ten hearts each"
          title="Spins"
          icon="✿"
          color="blue"
        >
          <div className="heart-exercise-list">
            {spins.map((spin) => {
              const rowIds = makeHeartIds(spin.id)
              const completedHearts = rowIds.filter(
                (id) => checked[id],
              ).length

              return (
                <HeartExercise
                  key={spin.id}
                  exercise={spin}
                  rowIds={rowIds}
                  completedHearts={completedHearts}
                  checked={checked}
                  onHeartClick={(event, heartId) =>
                    toggleHeart(
                      event,
                      heartId,
                      rowIds,
                      spin.name,
                      allSpinIds,
                      'Spins',
                      celebrationC,
                      celebrationC,
                    )
                  }
                />
              )
            })}
          </div>
        </PracticeSection>

        <PracticeSection
          id="jumps"
          eyebrow="Ten hearts each"
          title="Jumps"
          icon="♥"
          color="yellow"
        >
          <div className="heart-exercise-list">
            {jumps.map((jump) => {
              const rowIds = makeHeartIds(jump.id)
              const completedHearts = rowIds.filter(
                (id) => checked[id],
              ).length

              return (
                <HeartExercise
                  key={jump.id}
                  exercise={jump}
                  rowIds={rowIds}
                  completedHearts={completedHearts}
                  checked={checked}
                  onHeartClick={(event, heartId) =>
                    toggleHeart(
                      event,
                      heartId,
                      rowIds,
                      jump.name,
                      allJumpIds,
                      'Jumps',
                      celebrationD,
                      celebrationD,
                    )
                  }
                />
              )
            })}
          </div>
        </PracticeSection>

        <PracticeSection
          id="jump-combos"
          eyebrow="Last question"
          title="Jump Combos"
          icon="✦"
          color="coral"
        >
          <div className="combo-card">
            <h3>Did you do your jump combos?</h3>

            <div className="combo-answer-row">
              <button
                type="button"
                className={`combo-answer yes ${
                  jumpCombos === 'yes' ? 'selected' : ''
                }`}
                onClick={() => answerJumpCombos('yes')}
                aria-pressed={jumpCombos === 'yes'}
              >
                Yes!
              </button>

              <button
                type="button"
                className={`combo-answer no ${
                  jumpCombos === 'no' ? 'selected' : ''
                }`}
                onClick={() => answerJumpCombos('no')}
                aria-pressed={jumpCombos === 'no'}
              >
                Not today
              </button>
            </div>

            {jumpCombos === 'no' && (
              <p className="combo-kind-message">
                That’s okay. You can try them next practice!
              </p>
            )}
          </div>
        </PracticeSection>

        <button
          type="button"
          className="reset-practice"
          onClick={resetPractice}
        >
          Start a New Practice
        </button>
      </main>

      <footer>
        <p>Made with love and sparkles for Evan</p>
        <PWABadge />
      </footer>

      {sparkle && (
        <SparkleBurst
          key={sparkle.id}
          x={sparkle.x}
          y={sparkle.y}
        />
      )}

      {celebration && (
        <CelebrationModal
          celebration={celebration}
          onClose={() => setCelebration(null)}
        />
      )}
    </div>
  )
}

function PracticeSection({
  id,
  eyebrow,
  title,
  icon,
  color,
  children,
}) {
  return (
    <section
      id={id}
      className={`practice-section section-${color}`}
    >
      <div className="section-title-row">
        <div className="section-icon" aria-hidden="true">
          {icon}
        </div>

        <div>
          <p>{eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>

      {children}
    </section>
  )
}

function SingleCheck({ exercise, checked, onClick }) {
  return (
    <button
      type="button"
      className={`single-check ${checked ? 'checked' : ''}`}
      onClick={onClick}
      aria-pressed={checked}
    >
      <span className="single-check-text">
        <strong>{exercise.name}</strong>
        <small>{exercise.detail}</small>
      </span>

      <img
        className="single-heart"
        src={checked ? heartFilled : heartOutline}
        alt=""
      />
    </button>
  )
}

function HeartExercise({
  exercise,
  rowIds,
  completedHearts,
  checked,
  onHeartClick,
}) {
  return (
    <article
      className={`heart-exercise ${
        completedHearts === 10 ? 'complete' : ''
      }`}
    >
      <div className="heart-exercise-heading">
        <h3>{exercise.name}</h3>
        <span>{completedHearts}/10</span>
      </div>

      <div className="heart-row">
        {rowIds.map((heartId, index) => (
          <button
            key={heartId}
            type="button"
            className={`heart-button ${
              checked[heartId] ? 'filled' : ''
            }`}
            onClick={(event) => onHeartClick(event, heartId)}
            aria-label={`${exercise.name}, heart ${index + 1} of 10`}
            aria-pressed={Boolean(checked[heartId])}
          >
            <img
              src={checked[heartId] ? heartFilled : heartOutline}
              alt=""
            />
          </button>
        ))}
      </div>
    </article>
  )
}

function SparkleBurst({ x, y }) {
  return (
    <div
      className="sparkle-pop"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      aria-hidden="true"
    >
      <span>✦</span>
      <span>★</span>
      <span>♥</span>
      <span>✧</span>
      <span>★</span>
      <span>♥</span>
      <span>✦</span>
      <span>✧</span>
    </div>
  )
}

function CelebrationModal({ celebration, onClose }) {
  return (
    <div
      className="celebration-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={celebration.title}
      onClick={onClose}
    >
      <div
        className="celebration-window"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="celebration-confetti" aria-hidden="true">
          <span>★</span>
          <span>♥</span>
          <span>✦</span>
          <span>●</span>
          <span>★</span>
          <span>♥</span>
          <span>✦</span>
          <span>●</span>
        </div>

        <img
          className="celebration-gif"
          src={celebration.image}
          alt=""
        />

        <p className="celebration-label">Amazing!</p>
        <h2>{celebration.title}</h2>
        <p>{celebration.message}</p>

        <button type="button" onClick={onClose}>
          Keep Skating!
        </button>
      </div>
    </div>
  )
}

export default App