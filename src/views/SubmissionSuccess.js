import { useContext, useEffect, useState } from 'react'
import { fetchSubmissionsByUser } from '../services/api'
import SpotlightTranslation from '../sections/SpotlightTranslation';
import { UserContext } from "../contexts/User"
import Link from 'next/link';
import routes from '../constants/routes';
import Breadcrumbs from '../sections/Breadcrumbs';
import { Button } from '../components';
import { useRouter } from "next/router";
import styles from "./SubmissionSuccess.module.scss";

const SubmissionSuccess = ({ content, nav }) => {
  const { sentenceId } = nav
  const { user } = useContext(UserContext)
  const router = useRouter()

  return <>
    <Breadcrumbs depth={5} translationInvolved extra={[{ text: 'Success!' }]} nav={nav} />
    <SpotlightTranslation />
    <div className={styles.submissionSuccess}>
      <h2>Congrats {user.profile?.username}! You just added a new sentence to our library!</h2>
      <h3>Let us add some more.</h3>

      <Button variant="primary" onClick={() => router.push(routes.audioSubmit.url(nav))}>Record audio</Button>
      <Button variant="primary" onClick={() => router.push(routes.images.url(nav))}>Upload picture</Button>
      <div style={{ textAlign: 'center', marginTop: '25px' }}>
        <Link href={routes.viewTranslation.url(nav)}>or view translation page</Link>
      </div>
    </div>
  </>
}

export default SubmissionSuccess