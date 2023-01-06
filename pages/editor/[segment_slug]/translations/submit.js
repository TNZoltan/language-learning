import SiteContainer from '../../../../src/sections/SiteContainer';
import SentenceCreation from '../../../../src/views/SentenceCreation';
import Head from "next/head";

const Redirect = (props) => {
  return (
    <SiteContainer {...props}>
      <Head>
        <title>Add sentence</title>
      </Head>
      <SentenceCreation {...props} />
    </SiteContainer>
  )
}

export default Redirect