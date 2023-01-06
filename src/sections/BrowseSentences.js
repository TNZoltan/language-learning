import { useState } from "react";
import styles from './BrowseSentences.module.scss';
import classNames from "classnames";
import { Button } from "../components/Button";
import { languageConstants } from "../constants/objects";
import { Close } from "grommet-icons";
import { Spread } from "../components";


const BrowseSentences = ({ sentences, onChoose, onClose, nav }) => {
  const { languageSlug } = nav
  const [searchQuery, setSearchQuery] = useState('')

  return <div className={styles.browseSentences}>
    <Spread>
      <h2>
        Add a new sentence to {languageConstants[languageSlug].name}
      </h2>
      <Close onClick={onClose} />
    </Spread>
    <input
      className={styles.searchQuery}
      type="text"
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder="Find a sentence"
    />
    <div className={styles.browse}>
      {sentences.map(s => {
        return (
          <div
            key={s.id}
            className={
              classNames([
                styles.sentence,
                { [styles.hidden]: !s.sentence.toLowerCase().includes(searchQuery.toLowerCase()) }
              ])
            }
          >
            {s.sentence}
            <Button
              variant="secondary"
              size="small"
              onClick={() => onChoose(s)}
            >
              TRANSLATE
            </Button>
          </div>
        )
      })}
    </div>
  </div>
}

export default BrowseSentences