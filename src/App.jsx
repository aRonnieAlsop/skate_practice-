import { useEffect, useState } from 'react'
import heartOutline from './assets/heart-outline.svg'
import heartFilled from './assets/heart-filled.svg'

import celebrationA from './assets/celebrationA.gif'
import celebrationB from './assets/celebrationB.gif'
import celebrationC from './assets/celebrationC.gif'
import celebrationD from './assets/celebrationD.gif'
import celebrationE from './assets/celebrationE.gif'
import celebrationF from './assets/celebrationF.gif'
import celebrationG from './assets/celebrationG.gif'
import celebrationH from './assets/celebrationH.gif'
import celebrationI from './assets/celebrationI.gif'

import completion1 from './assets/completion1.gif'
import completion2 from './assets/completion2.gif'
import completion3 from './assets/completion3.gif'
import completion4 from './assets/completion4.gif'
import completion5 from './assets/completion5.gif'
import completion6 from './assets/completion6.gif'
import completion7 from './assets/completion7.gif'
import completion8 from './assets/completion8.gif'
import completion9 from './assets/completion9.gif'

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
  { id: 'skills-run-one', name: 'Run 1' },
  { id: 'skills-run-two', name: 'Run 2' },
  { id: 'skills-run-three', name: 'Run 3' },
]

const routineRuns = [
  {
    id: 'routine-run-one',
    name: 'Routine Run 1',
    message: 'Put it all together!',
  },
  {
    id: 'routine-run-two',
    name: 'Routine Run 2',
    message: 'Make it even stronger!',
  },
  {
    id: 'routine-run-three',
    name: 'Final Routine',
    message: 'Finish with your biggest performance!',
  },
]

const spins = [
  { id: 'forward-scratch-spin', name: 'Forward Scratch Spin' },
  { id: 'backward-scratch-spin', name: 'Backward Scratch Spin' },
  { id: 'sit-spin', name: 'Sit Spin' },
  { id: 'camel-spin', name: 'Camel Spin' },
  { id: 'layback-spin', name: 'Layback' },
  { id: 'pancake-spin', name: 'Pancake' },
  { id: 'camel-sit-spin', name: 'Camel Sit' },
]

const jumps = [
  { id: 'waltz-jump', name: 'Waltz Jump' },
  { id: 'salchow', name: 'Salchow' },
  { id: 'toe-loop', name: 'Toe Loop' },
  { id: 'loop-jump', name: 'Loop' },
  { id: 'flip-jump', name: 'Flip' },
  { id: 'lutz', name: 'Lutz' },
  { id: 'axel', name: 'Axel' },
  { id: 'double-salchow', name: 'Double Salchow' },
  { id: 'split-jump', name: 'Split Jump' },
]

const spirals = [
  { id: 'forward-inside-edge-spiral', name: 'Forward Inside Edge' },
  { id: 'forward-outside-edge-spiral', name: 'Forward Outside Edge' },
  { id: 'backward-inside-edge-spiral', name: 'Backward Inside Edge' },
  { id: 'backward-outside-edge-spiral', name: 'Backward Outside Edge' },
  { id: 'arabesque-scale-spiral', name: 'Arabesque Scale Spiral' },
  { id: 'arabesque-penche-spiral', name: 'Arabesque Penché Spiral' },
  { id: 'y-spiral', name: 'Y-Spiral' },
  { id: 'unsupported-y-spiral', name: 'Unsupported Y-Spiral' },
  { id: 'catch-foot-spiral', name: 'Catch-Foot / Cross-Catch' },
  { id: 'biellmann-spiral', name: 'Biellmann Spiral' },
]

const jumpCombos = [
  { id: 'lutz-two-toes', name: 'Lutz–2 Toes' },
  { id: 'flip-loop', name: 'Flip–Loop' },
  { id: 'flip-axel', name: 'Flip–Axel' },
]

const specialTricks = [
  { id: 'hydroblade', name: 'Hydroblade' },
  { id: 'spread-eagle', name: 'Spread Eagle' },
  { id: 'cantilever', name: 'Cantilever' },
  { id: 'ina-bauer', name: 'Ina Bauer' },
]

const completionGifs = [
  completion1,
  completion2,
  completion3,
  completion4,
  completion5,
  completion6,
  completion7,
  completion8,
  completion9,
]

const makeHeartIds = (exerciseId, amount = 10) =>
  Array.from(
    { length: amount },
    (_, index) => `${exerciseId}-${index + 1}`,
  )

const warmUpIds = edges.map((exercise) => exercise.id)

const allEdgeIds = [
  ...warmUpIds,
  ...circleEdges.map((exercise) => exercise.id),
]

const allSkillsIds = skatingSkillsRuns.map((run) => run.id)
const allRoutineIds = routineRuns.map((run) => run.id)

const allSpinIds = spins.flatMap((spin) =>
  makeHeartIds(spin.id, 10),
)

const allJumpIds = jumps.flatMap((jump) =>
  makeHeartIds(jump.id, 10),
)

const allSpiralIds = spirals.flatMap((spiral) =>
  makeHeartIds(spiral.id, 3),
)

const allJumpComboIds = jumpCombos.flatMap((combo) =>
  makeHeartIds(combo.id, 10),
)

const allSpecialTrickIds = specialTricks.flatMap((trick) =>
  makeHeartIds(trick.id, 3),
)

const allPracticeIds = [
  ...allEdgeIds,
  ...allSkillsIds,
  ...allRoutineIds,
  ...allSpinIds,
  ...allJumpIds,
  ...allSpiralIds,
  ...allJumpComboIds,
  ...allSpecialTrickIds,
]

const totalPracticeChecks = allPracticeIds.length

function App() {
  const [checked, setChecked] = useState(() => {
    try {
      const savedProgress = localStorage.getItem(
        'evan-skate-progress',
      )

      return savedProgress ? JSON.parse(savedProgress) : {}
    } catch {
      return {}
    }
  })

  const [sparkle, setSparkle] = useState(null)
  const [heartExplosion, setHeartExplosion] = useState(null)
  const [celebration, setCelebration] = useState(null)

  useEffect(() => {
    localStorage.setItem(
      'evan-skate-progress',
      JSON.stringify(checked),
    )
  }, [checked])

  const isComplete = (ids, progress = checked) => {
    return ids.every((id) => Boolean(progress[id]))
  }

  const becameComplete = (ids, oldProgress, newProgress) => {
    return (
      !isComplete(ids, oldProgress) &&
      isComplete(ids, newProgress)
    )
  }

  const checkedTotal = allPracticeIds.filter(
    (id) => checked[id],
  ).length

  const progressPercent = Math.round(
    (checkedTotal / totalPracticeChecks) * 100,
  )

  const getButtonCenter = (event) => {
    const rectangle = event.currentTarget.getBoundingClientRect()

    return {
      x: rectangle.left + rectangle.width / 2,
      y: rectangle.top + rectangle.height / 2,
    }
  }

  const launchSparkles = (event) => {
    const center = getButtonCenter(event)

    setSparkle({
      id: Date.now(),
      ...center,
    })

    window.setTimeout(() => {
      setSparkle(null)
    }, 850)
  }

  const launchHeartExplosion = (event) => {
    const center = getButtonCenter(event)

    setHeartExplosion({
      id: Date.now(),
      ...center,
    })

    window.setTimeout(() => {
      setHeartExplosion(null)
    }, 1250)
  }

  const showCelebration = (image, title, message) => {
    setCelebration({
      type: 'single',
      image,
      title,
      message,
    })
  }

  const showFinalCelebration = () => {
    setCelebration({
      type: 'completion',
      title: 'Practice Complete!',
      message:
        'You filled every heart and completed your entire practice!',
    })
  }

  const checkForFinalCompletion = (
    oldProgress,
    newProgress,
  ) => {
    if (
      becameComplete(
        allPracticeIds,
        oldProgress,
        newProgress,
      )
    ) {
      window.setTimeout(() => {
        showFinalCelebration()
      }, 500)

      return true
    }

    return false
  }

  const toggleSingleCheck = (
    event,
    id,
    completionGroups = [],
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

    if (checkForFinalCompletion(checked, nextProgress)) {
      return
    }

    const newlyCompletedGroups = completionGroups.filter(
      (group) =>
        becameComplete(
          group.ids,
          checked,
          nextProgress,
        ),
    )

    const celebrationToShow =
      newlyCompletedGroups[newlyCompletedGroups.length - 1]

    if (celebrationToShow) {
      window.setTimeout(() => {
        showCelebration(
          celebrationToShow.image,
          celebrationToShow.title,
          celebrationToShow.message,
        )
      }, 350)
    }
  }

  const toggleRoutine = (event, routineId) => {
    const willBeChecked = !checked[routineId]

    const nextProgress = {
      ...checked,
      [routineId]: willBeChecked,
    }

    setChecked(nextProgress)

    if (!willBeChecked) {
      return
    }

    launchHeartExplosion(event)
    checkForFinalCompletion(checked, nextProgress)
  }

  const toggleHeart = (
    event,
    heartId,
    rowIds,
    exerciseName,
    sectionIds,
    sectionName,
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

    if (checkForFinalCompletion(checked, nextProgress)) {
      return
    }

    const sectionJustCompleted = becameComplete(
      sectionIds,
      checked,
      nextProgress,
    )

    const rowJustCompleted = becameComplete(
      rowIds,
      checked,
      nextProgress,
    )

    if (sectionJustCompleted) {
      window.setTimeout(() => {
        showCelebration(
          sectionImage,
          `${sectionName} Complete!`,
          `You finished every ${sectionName.toLowerCase()} exercise!`,
        )
      }, 350)

      return
    }

    if (rowJustCompleted) {
      window.setTimeout(() => {
        showCelebration(
          celebrationI,
          `${exerciseName} Complete!`,
          `All ${rowIds.length} hearts are filled!`,
        )
      }, 350)
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
    setSparkle(null)
    setHeartExplosion(null)
    setCelebration(null)

    localStorage.removeItem('evan-skate-progress')
    localStorage.removeItem('evan-jump-combos')
  }

  return (
    <div className="skate-app">
      <header className="hero">
        <div className="hero-decoration hero-star-one">
          ✦
        </div>

        <div className="hero-decoration hero-star-two">
          ★
        </div>

        <div className="hero-decoration hero-heart">
          ♥
        </div>

        <p className="hero-small-title">
          Evan’s Practice
        </p>

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
              style={{
                width: `${progressPercent}%`,
              }}
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
                    [
                      {
                        ids: warmUpIds,
                        image: celebrationA,
                        title: 'Warm-Up Complete!',
                        message:
                          'You finished every warm-up edge!',
                      },
                      {
                        ids: allEdgeIds,
                        image: celebrationB,
                        title: 'All Edges Complete!',
                        message:
                          'Beautiful edges! Every one is checked!',
                      },
                    ],
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
                      [
                        {
                          ids: allEdgeIds,
                          image: celebrationB,
                          title: 'All Edges Complete!',
                          message:
                            'Beautiful edges! Every one is checked!',
                        },
                      ],
                    )
                  }
                />
              ))}
            </div>
          </div>
        </PracticeSection>

        <RoutineMoment
          run={routineRuns[0]}
          checked={Boolean(checked[routineRuns[0].id])}
          onClick={(event) =>
            toggleRoutine(event, routineRuns[0].id)
          }
        />

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
                    [
                      {
                        ids: allSkillsIds,
                        image: celebrationC,
                        title: 'Skating Skills Complete!',
                        message:
                          'Three strong runs! You did it!',
                      },
                    ],
                  )
                }
                aria-pressed={Boolean(checked[run.id])}
              >
                <img
                  src={
                    checked[run.id]
                      ? heartFilled
                      : heartOutline
                  }
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
          <HeartExerciseSection
            exercises={spins}
            amount={10}
            checked={checked}
            sectionIds={allSpinIds}
            sectionName="Spins"
            sectionImage={celebrationD}
            onToggle={toggleHeart}
          />
        </PracticeSection>

        <PracticeSection
          id="jumps"
          eyebrow="Ten hearts each"
          title="Jumps"
          icon="♥"
          color="yellow"
        >
          <HeartExerciseSection
            exercises={jumps}
            amount={10}
            checked={checked}
            sectionIds={allJumpIds}
            sectionName="Jumps"
            sectionImage={celebrationE}
            onToggle={toggleHeart}
          />
        </PracticeSection>

        <RoutineMoment
          run={routineRuns[1]}
          checked={Boolean(checked[routineRuns[1].id])}
          onClick={(event) =>
            toggleRoutine(event, routineRuns[1].id)
          }
        />

        <PracticeSection
          id="spirals"
          eyebrow="Three hearts each"
          title="Spirals"
          icon="✧"
          color="pink"
        >
          <HeartExerciseSection
            exercises={spirals}
            amount={3}
            checked={checked}
            sectionIds={allSpiralIds}
            sectionName="Spirals"
            sectionImage={celebrationF}
            onToggle={toggleHeart}
          />
        </PracticeSection>

        <PracticeSection
          id="jump-combos"
          eyebrow="Ten hearts each"
          title="Jump Combos"
          icon="✦"
          color="purple"
        >
          <HeartExerciseSection
            exercises={jumpCombos}
            amount={10}
            checked={checked}
            sectionIds={allJumpComboIds}
            sectionName="Jump Combos"
            sectionImage={celebrationG}
            onToggle={toggleHeart}
          />
        </PracticeSection>

        <PracticeSection
          id="special-tricks"
          eyebrow="Three hearts each"
          title="Special Tricks"
          icon="★"
          color="coral"
        >
          <HeartExerciseSection
            exercises={specialTricks}
            amount={3}
            checked={checked}
            sectionIds={allSpecialTrickIds}
            sectionName="Special Tricks"
            sectionImage={celebrationH}
            onToggle={toggleHeart}
          />
        </PracticeSection>

        <RoutineMoment
          run={routineRuns[2]}
          checked={Boolean(checked[routineRuns[2].id])}
          onClick={(event) =>
            toggleRoutine(event, routineRuns[2].id)
          }
          final
        />

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

      {heartExplosion && (
        <HeartExplosion
          key={heartExplosion.id}
          x={heartExplosion.x}
          y={heartExplosion.y}
        />
      )}

      {celebration?.type === 'single' && (
        <CelebrationModal
          celebration={celebration}
          onClose={() => setCelebration(null)}
        />
      )}

      {celebration?.type === 'completion' && (
        <CompletionCelebration
          title={celebration.title}
          message={celebration.message}
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
        <div
          className="section-icon"
          aria-hidden="true"
        >
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

function SingleCheck({
  exercise,
  checked,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`single-check ${
        checked ? 'checked' : ''
      }`}
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

function RoutineMoment({
  run,
  checked,
  onClick,
  final = false,
}) {
  return (
    <section
      className={`routine-moment ${
        final ? 'final-routine-moment' : ''
      }`}
    >
      <div className="routine-copy">
        <p>
          {final ? 'Final performance' : 'Routine time'}
        </p>

        <h2>{run.name}</h2>
        <span>{run.message}</span>
      </div>

      <button
        type="button"
        className={`routine-heart-button ${
          checked ? 'filled' : ''
        }`}
        onClick={onClick}
        aria-label={`${run.name}: ${
          checked ? 'completed' : 'not completed'
        }`}
        aria-pressed={checked}
      >
        <img
          src={checked ? heartFilled : heartOutline}
          alt=""
        />

        <span>
          {checked ? 'Amazing!' : 'Tap when done'}
        </span>
      </button>
    </section>
  )
}

function HeartExerciseSection({
  exercises,
  amount,
  checked,
  sectionIds,
  sectionName,
  sectionImage,
  onToggle,
}) {
  return (
    <div className="heart-exercise-list">
      {exercises.map((exercise) => {
        const rowIds = makeHeartIds(
          exercise.id,
          amount,
        )

        const completedHearts = rowIds.filter(
          (id) => checked[id],
        ).length

        return (
          <HeartExercise
            key={exercise.id}
            exercise={exercise}
            amount={amount}
            rowIds={rowIds}
            completedHearts={completedHearts}
            checked={checked}
            onHeartClick={(event, heartId) =>
              onToggle(
                event,
                heartId,
                rowIds,
                exercise.name,
                sectionIds,
                sectionName,
                sectionImage,
              )
            }
          />
        )
      })}
    </div>
  )
}

function HeartExercise({
  exercise,
  amount,
  rowIds,
  completedHearts,
  checked,
  onHeartClick,
}) {
  return (
    <article
      className={`heart-exercise hearts-${amount} ${
        completedHearts === amount
          ? 'complete'
          : ''
      }`}
    >
      <div className="heart-exercise-heading">
        <h3>{exercise.name}</h3>

        <span>
          {completedHearts}/{amount}
        </span>
      </div>

      <div className="heart-row">
        {rowIds.map((heartId, index) => (
          <button
            key={heartId}
            type="button"
            className={`heart-button ${
              checked[heartId] ? 'filled' : ''
            }`}
            onClick={(event) =>
              onHeartClick(event, heartId)
            }
            aria-label={`${exercise.name}, heart ${
              index + 1
            } of ${amount}`}
            aria-pressed={Boolean(checked[heartId])}
          >
            <img
              src={
                checked[heartId]
                  ? heartFilled
                  : heartOutline
              }
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

function HeartExplosion({ x, y }) {
  return (
    <div
      className="heart-explosion"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      aria-hidden="true"
    >
      <span className="explosion-center">♥</span>
      <span>♥</span>
      <span>★</span>
      <span>♥</span>
      <span>✦</span>
      <span>♥</span>
      <span>★</span>
      <span>♥</span>
      <span>✧</span>
      <span>♥</span>
      <span>★</span>
      <span>♥</span>
      <span>✦</span>
    </div>
  )
}

function CelebrationModal({
  celebration,
  onClose,
}) {
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
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <CelebrationStars />

        <img
          className="celebration-gif"
          src={celebration.image}
          alt=""
        />

        <p className="celebration-label">
          Amazing!
        </p>

        <h2>{celebration.title}</h2>
        <p>{celebration.message}</p>

        <button type="button" onClick={onClose}>
          Keep Skating!
        </button>
      </div>
    </div>
  )
}

function CompletionCelebration({
  title,
  message,
  onClose,
}) {
  const [gifIndex, setGifIndex] = useState(0)

  useEffect(() => {
    if (gifIndex >= completionGifs.length - 1) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setGifIndex(
        (currentIndex) => currentIndex + 1,
      )
    }, 2400)

    return () => {
      window.clearTimeout(timer)
    }
  }, [gifIndex])

  const isLastGif =
    gifIndex === completionGifs.length - 1

  return (
    <div
      className="celebration-overlay completion-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="celebration-window completion-window"
        style={{
          width: 'min(100%, 440px)',
        }}
      >
        <CelebrationStars big />

        <p className="celebration-label">
          100% Complete!
        </p>

        <h2>{title}</h2>

        <div
          className="completion-gif-stage"
          style={{
            display: 'grid',
            width: '100%',
            height: 'min(42vh, 310px)',
            minHeight: '230px',
            placeItems: 'center',
            overflow: 'hidden',
            margin: '12px 0',
            background: '#ffeaf4',
            border: '3px solid #ffffff',
            borderRadius: '22px',
            boxShadow: '0 5px 0 #ead4e3',
          }}
        >
          <img
            key={gifIndex}
            className="celebration-gif completion-gif"
            src={completionGifs[gifIndex]}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 'none',
              margin: 0,
              objectFit: 'contain',
              background: 'transparent',
              border: 0,
              borderRadius: 0,
              boxShadow: 'none',
            }}
          />
        </div>

        <div
          className="completion-number"
          aria-label={`Celebration ${
            gifIndex + 1
          } of ${completionGifs.length}`}
        >
          {completionGifs.map((_, index) => (
            <span
              key={index}
              className={
                index === gifIndex ? 'active' : ''
              }
            />
          ))}
        </div>

        <p>{message}</p>

        {isLastGif ? (
          <button
            type="button"
            onClick={onClose}
          >
            I Did It! ♥
          </button>
        ) : (
          <button
            type="button"
            className="skip-celebration"
            onClick={onClose}
          >
            Finish Celebration Early
          </button>
        )}
      </div>
    </div>
  )
}

function CelebrationStars({ big = false }) {
  const stars = Array.from(
    { length: big ? 30 : 16 },
    (_, index) => index,
  )

  const symbols = ['★', '♥', '✦', '●', '✧']

  return (
    <div
      className={`celebration-confetti ${
        big ? 'big-celebration-confetti' : ''
      }`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span key={star}>
          {symbols[star % symbols.length]}
        </span>
      ))}
    </div>
  )
}

export default App