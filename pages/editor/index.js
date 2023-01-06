import Head from 'next/head';
import SiteContainer from '../../src/sections/SiteContainer';
import EditorSegments from '../../src/views/EditorSegments';

const Redirect = (props) => {
  return <SiteContainer {...props}>
    <Head>
      <title>Segments</title>
    </Head>
    <EditorSegments {...props} />
  </SiteContainer>
}

export default Redirect