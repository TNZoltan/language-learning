import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import routes from "../constants/routes"
import { fetchAllSegments } from "../services/api"
import styles from './EditorSegments.module.scss';
import { useRouter } from 'next/router'

const EditorSegments = ({ content }) => {
  const [segments, setSegments] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchAllSegments('pl').then(data => {
      setSegments(data)
    })
  }, [])

  const segmentButton = (segment) => {
    return (
      <div className={styles.segmentButton}
        key={segment.id} onClick={() => router.push(routes.sentences.url({ segmentSlug: segment.name }))}>
        <h2 className={styles.segmentTitle}>
          {content.segments[segment.name]}
        </h2>
      </div>
    )
  }

  return <div className={styles.editorSegments}>
    {segments && (
      <>
        {segments.map(segmentButton)}
      </>
    )}
  </div>
}

export default EditorSegments