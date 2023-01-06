import { useContext } from "react"
import styles from "./SpotlightSentence.module.scss"
import { SelectedContext } from "../contexts/Selected"
import React from "react"
import { PrintSentence } from "../components"

const SpotlightSentence = ({ disableCategories }) => {
  const { selected } = useContext(SelectedContext)

  return (
    <div className={styles.spotlight}>
      <div className={styles.subtitle}>Selected sentence:</div>
      <div className={styles.title}>
        {selected?.sentence ? (disableCategories ? selected.sentence  : <PrintSentence sen={selected.sentence} struc={selected.sentence_structure} enableTooltip />) : <div className={styles.skeleton} />}
      </div>
    </div>
  )
}

export default SpotlightSentence