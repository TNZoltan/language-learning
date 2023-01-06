import SiteContainer from "../../../../../../../src/sections/SiteContainer"
import SubmitAudio from "../../../../../../../src/views/SubmitAudio"

const Redirect = (props) => {
  return (
    <SiteContainer {...props}>
      <SubmitAudio {...props} />
    </SiteContainer>
  )
}

export default Redirect