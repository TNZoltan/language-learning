import { useContext, useState } from "react"
import Link from "next/link"
import styles from "./SpotlightTranslation.module.scss";
import routes from "../constants/routes"
import { SelectedContext } from "../contexts/Selected"

const SpotlightTranslation = () => {
  const { selected } = useContext(SelectedContext)

  return (
    <div className={styles.spotlight}>
      <div className={styles.subtitle}>Selected pair:</div>
      <div className={styles.title}>
        {selected?.sentence ? selected.sentence : <div className={styles.skeleton} />}
      </div>
      <div className={styles.title}>
        {selected?.translation ? selected.translation : <div className={styles.skeleton} />}
      </div>
    </div>
  )
}

export default SpotlightTranslation