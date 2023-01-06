import Head from 'next/head';
import SiteContainer from '../../../src/sections/SiteContainer';
import EditorSentences from '../../../src/views/EditorSentences';

const Redirect = (props) => {
  return (
    <SiteContainer {...props}>
      <Head>
        <title>Sentences</title>
      </Head>
      <EditorSentences {...props} />
    </SiteContainer>
  )
}

export default Redirect