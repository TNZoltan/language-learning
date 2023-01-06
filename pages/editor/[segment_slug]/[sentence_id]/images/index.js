import Head from 'next/head';
import SiteContainer from '../../../../../src/sections/SiteContainer';
import Images from '../../../../../src/views/Images';

const Redirect = (props) => {
    return (
      <SiteContainer {...props}>
        <Head>
          <title>Images</title>
        </Head>
        <Images {...props} />
      </SiteContainer>
    )
}

export default Redirect