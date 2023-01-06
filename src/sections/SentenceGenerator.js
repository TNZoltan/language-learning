import { useState } from "react"

import styles from "./SentenceGenerator.module.scss";
import cx from "classnames";
import { Checkmark, Clear } from "grommet-icons";
import { Button, TextInput } from "../components";

const SentenceGenerator = ({
  sentence,
  setSentence,
  existingSentences = [],
  onSubmit
}) => {
  const [selectedIndices, setSelectedIndices] = useState([])
  const [structure, setStructure] = useState([])
  const [prepDone, setPrepDone] = useState(false)
  const [prepError, setPrepError] = useState('')
  const [ready, setReady] = useState(false)

  const preppingSentence = () => {
    // Processing: Remove spaces around, remove double+ spaces, uppercase first letter
    const processedSentence = sentence.trim().replace(/ +(?= )/g, '').replace(/^./, str => str.toUpperCase())
    for (let i in existingSentences) {
      if (existingSentences[i] === processedSentence) {
        setPrepError("Sentence of this wording has already been submitted.")
        return
      }
    }
    setPrepError('')
    setSentence(processedSentence)
    setPrepDone(true)
    setStructure(Array(sentence.split(' ').length).fill(''))
  }

  const renderPrep = () => {
    return (
      <div className={styles.prep}>
        <h4>Write a translation for the selected sentence</h4>
        <TextInput value={sentence} onChange={e => setSentence(e.target.value)} errorMsg={prepError} />
        <button onClick={preppingSentence}>
          <Checkmark />
        </button>
      </div>
    )
  }

  const convertStructureObj = () => {
    let saveCat, range
    const final = []
    for (let i = 0; i < structure.length; ++i) {
      if (structure[i]) {
        if (saveCat === structure[i]) {
          if (typeof range === 'number') {
            range = [range, range+1]
          } else range[1] += 1
        } else {
          if (saveCat) {
            final.push({ at: range, is: saveCat })
          }
          saveCat = structure[i]
          range = i + 1
        }
      } else if (saveCat) {
        final.push({ at: range, is: saveCat })
        saveCat = false
        range = false
      }
    }
    if (saveCat) {
      final.push({ at: range, is: saveCat })
    }
    return final
  }

  const saveCategory = (category) => {
    if (selectedIndices.length === 0) return
    selectedIndices.forEach(index => {
      setStructure(prev => prev.map((_, i) => index === i ? category : prev[i]))
    })
    setSelectedIndices([])
    setReady(true)
  }

  const renderCategorizing = () => {
    return (
      <div className={styles.categorize}>
        <Button variant="secondary" onClick={() => {
          setSelectedIndices([])
          setPrepDone(false)
        }}>Edit sentence again</Button>
        <h4>Highlight the words you want to set a category for. Best if they match the original sentence.</h4>
        <div className={styles.words}>
          {
            sentence.split(' ').map((word, i) => {
              const isSelected = selectedIndices.includes(i)
              return (
                <div
                  key={i}
                  className={cx(
                    { [styles.selected]: isSelected },
                    `underline-${structure[i]}`
                  )}
                  onClick={() => {
                    if (isSelected)
                      setSelectedIndices(prev => prev.filter(v => v !== i))
                    else
                      setSelectedIndices(prev => [...prev, i])
                  }}
                >
                  {word}
                </div>
              )
            })
          }
        </div>
        <div className={cx(
          styles.step,
          styles.categories,
          { [styles.disabled]: selectedIndices.length === 0 }
        )}>
          <div className="badge bg-obj" onClick={() => saveCategory('obj')}>
            Object
          </div>
          <div className="badge bg-loc" onClick={() => saveCategory('loc')}>
            Location
          </div>
          <div className="badge bg-time" onClick={() => saveCategory('time')}>
            Time
          </div>
          <div className="badge bg-verb" onClick={() => saveCategory('verb')}>
            Verb
          </div>
          <div className="badge bg-verp" onClick={() => saveCategory('verp')}>
            Past Verb
          </div>
          <div className="badge bg-verc" onClick={() => saveCategory('verc')}>
            Command
          </div>
          <div className="badge bg-vera" onClick={() => saveCategory('vera')}>
            Ask
          </div>
          <div className="badge bg-adj" onClick={() => saveCategory('adj')}>
            Adjective
          </div>
          <div className="badge bg-phr" onClick={() => saveCategory('phr')}>
            Phrase
          </div>
          <button>
            <Clear onClick={() => {
              setSelectedIndices([])
              setStructure(Array(sentence.split(' ').length).fill(''))
              setReady(false)
            }} />
          </button>
        </div>
      <Button variant="primary" disabled={!ready} onClick={() => onSubmit(convertStructureObj())}>Submit</Button>
      </div>
    )
  }

  return (
    <div className={styles.sentenceGenerator}>
      {prepDone ? renderCategorizing() : renderPrep()}
    </div>
  )
}


export default SentenceGenerator