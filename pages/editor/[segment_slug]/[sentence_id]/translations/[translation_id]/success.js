import SiteContainer from '../../../../../../src/sections/SiteContainer';
import SubmissionSuccess from '../../../../../../src/views/SubmissionSuccess';
import Head from 'next/head';

const Redirect = (props) => {
  return (
    <SiteContainer {...props}>
      <Head>
        <title>Congratulations!</title>
      </Head>
      <SubmissionSuccess {...props} />
    </SiteContainer>
  )
}

export default Redirect