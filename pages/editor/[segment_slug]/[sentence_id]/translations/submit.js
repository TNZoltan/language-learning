import SiteContainer from '../../../../../src/sections/SiteContainer';
import SubmitTranslation from '../../../../../src/views/SubmitTranslation';

const Redirect = (props) => {
  return (
    <SiteContainer {...props}>
      <SubmitTranslation {...props} />
    </SiteContainer>
  )
}

export default Redirect