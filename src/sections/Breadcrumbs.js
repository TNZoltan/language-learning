import Link from "next/link"
import { useContext } from "react"
import { languageConstants, segmentConstants } from "../constants/objects"
import routes from "../constants/routes"
import { SelectedContext } from "../contexts/Selected";
import styles from "./Breadcrumbs.module.scss";
import cx from "classnames";

const Breadcrumbs = ({ depth, extra, nav, translationInvolved = false }) => {
  const { languageSlug, segmentSlug } = nav
  const { selected } = useContext(SelectedContext)
  const shouldRender = level => level <= depth

  const renderCountry = () => {
    return (
      <Link href={routes.editorHome.url}>
        {languageConstants[languageSlug].name}
      </Link>
    )
  }

  const renderSegment = () => {
    return depth === 2 ? (
      <>{` / ${segmentConstants[segmentSlug].name}`}</>
    ) : (
      <Link href={routes.sentences.url(nav)}>
        {` / ${segmentConstants[segmentSlug].name}`}
      </Link>
    )
  }

  const renderSentence = () => {
    let sentence = `${selected.sentence.split(' ').slice(0, 3).join(' ')}`
    if (sentence.length !== selected.sentence.length) sentence += '...'
    return depth === 3 ? (
      <>{` / ${sentence}`}</>
    ) : (
      <Link href={routes.submissions.url(nav)}>
        {` / ${sentence}`}
      </Link>

    )
  }

  const renderTranslation = () => {
    let translation = `${selected.translation.split(' ').slice(0, 3).join(' ')}`
    if (translation.length !== selected.translation.length) translation += '...'
    return depth === 4 ? (
      <>{` / ${translation}`}</>
    ) : (
      <Link href={routes.viewTranslation.url(nav)}>
        {` / ${translation}`}
      </Link>

    )
  }

  const renderExtra = extraObj => {
    return extraObj.url ? (
      <Link href={extraObj.url}>
        {` / ${extraObj.text}`}
      </Link>
    ) : (
      <>
        <span>{` / ${extraObj.text}`}</span>
      </>
    )
  }

  const sentenceNotReady = depth >= 3 && !selected?.sentence
  const navNotReady = !segmentSlug
  const translationNotReady = translationInvolved && depth >= 4 && !selected?.translation

  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.colorLine} />
      {
        sentenceNotReady || navNotReady || translationNotReady ?
          <div className={cx(styles.skeleton, { [styles.wider]: translationInvolved })} /> : (
            <>
              {shouldRender(1) && renderCountry()}
              {shouldRender(2) && renderSegment()}
              {shouldRender(3) && renderSentence()}
              {shouldRender(4) ? (translationInvolved ? renderTranslation() : renderExtra(extra[0])) : <></>}
              {shouldRender(5) && (translationInvolved ? renderExtra(extra[0]) : renderExtra(extra[1]))}
              {shouldRender(6) && renderExtra(extra[2])}
            </>
          )
      }
    </div>
  )
}

export default Breadcrumbs