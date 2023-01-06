import Head from 'next/head';
import SiteContainer from '../../../../src/sections/SiteContainer';
import EditorSubmissions from '../../../../src/views/EditorSubmissions';

const Redirect = (props) => {
  // TODO: Proper redirection to 404 across the board
  return (
    <SiteContainer {...props}>
      <Head>
        <title>Submissions</title>
      </Head>
      <EditorSubmissions {...props} />
    </SiteContainer>
  )
}

export default Redirect