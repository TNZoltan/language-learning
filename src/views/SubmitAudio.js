import { useState } from 'react'
import { submitAudio } from '../services/api'
import SpotlightTranslation from '../sections/SpotlightTranslation';
import { useRouter } from "next/router"
import routes from '../constants/routes';
import Breadcrumbs from '../sections/Breadcrumbs';
import { Button, Recorder, emptyAudio } from '../components';

import { uploadFile } from '../services/supabase';

const SubmitAudio = ({ content, nav }) => {
  const { sentenceId, translationId } = nav
  const [audio, setAudio] = useState(emptyAudio)
  const router = useRouter()
  const [ready, setReady] = useState(false)

  const sendSubmission = () => {
    const name = `${Math.random()}.webm`
    const filePath = `${name}`

    uploadFile('audio-submissions', filePath, audio.blob).then(res => {
      if (res.data) {
        submitAudio(sentenceId, translationId, name).then(status => {
          if (status === 201) {
            router.push(routes.viewTranslation.url(nav))
          }
        })
      }
    })
  }

  return <>
    <Breadcrumbs depth={5} extra={[{ text: 'Record new reading' }]} translationInvolved nav={nav} />
    <SpotlightTranslation />
    <Recorder
      record={true}
      title={"Read the sentence"}
      audioURL={audio}
      handleAudioStop={data => {
        setAudio(data)
        setReady(true)
      }}
      handleReset={() => {
        setReady(false)
        setAudio(emptyAudio)
      }}
      mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
    />
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
      <Button variant="primary" disabled={!ready} onClick={sendSubmission}>Submit</Button>
    </div>
  </>
}

export default SubmitAudio