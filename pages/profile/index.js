import SiteContainer from '../../src/sections/SiteContainer';
import Profile from '../../src/views/Profile';

const Component = (props) => {
  return (
    <SiteContainer {...props}>
      <Profile {...props} />
    </SiteContainer>
  )
}
export default Component