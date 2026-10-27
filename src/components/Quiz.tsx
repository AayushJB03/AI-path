import { useState } from 'react'
import type { Question } from '../data'
import { saveScore, useScores } from '../progress'

/** Multiple-choice quiz for one lesson. Remount with key={lessonId} to reset between lessons. */
export default function Quiz({ lessonId, questions }: { lessonId: string; questions: Question[] }) {
  const best = useScores()[lessonId]
  const [picks, setPicks] = useState<(number | undefined)[]>([])
  const [submitted, setSubmitted] = useState(false)
  if (questions.length === 0) return null

  const score = questions.filter((q, i) => picks[i] === q.answer).length
  const allAnswered = questions.every((_, i) => picks[i] !== undefined)
  const pick = (i: number, j: number) => setPicks((p) => Object.assign([...p], { [i]: j }))
  const submit = () => { setSubmitted(true); saveScore(lessonId, score / questions.length) }
  const reset = () => { setPicks([]); setSubmitted(false) }
  const optionClass = (i: number, j: number) =>
    !submitted ? '' : j === questions[i].answer ? 'right' : picks[i] === j ? 'wrong' : ''

  return (
    <div className="card lilac quiz">
      <div className="row">
        <h2>Daily quiz</h2>
        {best !== undefined && <small>Best: {Math.round(best * 100)}%</small>}
      </div>
      {questions.map((q, i) => (
        <fieldset key={q.q} disabled={submitted}>
          <legend>{i + 1}. {q.q}</legend>
          {q.options.map((o, j) => (
            <label key={o} className={optionClass(i, j)}>
              <input type="radio" name={`q${i}`} checked={picks[i] === j} onChange={() => pick(i, j)} />
              {o}
            </label>
          ))}
        </fieldset>
      ))}
      {submitted ? (
        <p className="result">
          You scored {score}/{questions.length}. <button className="link" onClick={reset}>Retry</button>
        </p>
      ) : (
        <button className="btn" disabled={!allAnswered} onClick={submit}>Check answers</button>
      )}
    </div>
  )
}
