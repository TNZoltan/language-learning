import React, { memo } from "react"
import styles from "./PrintSentence.module.scss";

const PrintSentence = ({ sen, struc, enableTooltip }) => {
  const words = new Map()
  sen.split(' ').forEach((word, i) => {
    words.set(i, word)
  })

  struc.forEach(strucObj => {
    if (!isNaN(strucObj.at)) {
      // For singular index
      words.set(strucObj.at - 1, (<><span className={`underline-${strucObj.is}`}>{words.get(strucObj.at - 1)}</span>{' '}</>))
    } else {
      // For range index
      let i = strucObj.at[0]
      const collectWords = []
      while (i <= strucObj.at[1]) {
        collectWords.push(words.get(i - 1))
        words.set(i - 1, null)
        ++i
      }
      words.set(strucObj.at[0] - 1, (<span className={`underline-${strucObj.is}`}>{collectWords.join(' ')}{' '}</span>))
    }
  })

  const renderable = []
  words.forEach(w => {
    if (typeof w === 'string') {
      renderable.push(<span>{`${w} `}</span>)
    } else renderable.push(w)
  })
  return (
    <span className={styles.sentence}>
      {renderable.map((w, i) => <React.Fragment key={i}>{w}</React.Fragment>)}
      {enableTooltip && (
        <>
          <div className={styles.arrow} />
          <div className={styles.tooltip}>
            <div className={styles.column}>
              <div className="bg-obj" style={{ height: '15px', width: '15px' }} />
              Object
            </div>
            <div className={styles.column}>
              <div className="bg-loc" style={{ height: '15px', width: '15px' }} />
              Location
            </div>
            <div className={styles.column}>
              <div className="bg-time" style={{ height: '15px', width: '15px' }} />
              Time
            </div>
            <div className={styles.column}>
              <div className="bg-verb" style={{ height: '15px', width: '15px' }} />
              Verb
            </div>
            <div className={styles.column}>
              <div className="bg-verp" style={{ height: '15px', width: '15px' }} />
              Past Verb
            </div>
            <div className={styles.column}>
              <div className="bg-verc" style={{ height: '15px', width: '15px' }} />
              Command
            </div>
            <div className={styles.column}>
              <div className="bg-vera" style={{ height: '15px', width: '15px' }} />
              Ask
            </div>
            <div className={styles.column}>
              <div className="bg-adj" style={{ height: '15px', width: '15px' }} />
              Adjective
            </div>
            <div className={styles.column}>
              <div className="bg-phr" style={{ height: '15px', width: '15px' }} />
              Phrase
            </div>
            <div className={styles.learnMore}>
              <a>Learn more</a>
            </div>
          </div>
        </>
      )}
    </span>
  )
}

export default memo(PrintSentence);