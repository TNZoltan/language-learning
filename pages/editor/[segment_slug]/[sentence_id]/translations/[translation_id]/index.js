import SiteContainer from "../../../../../../src/sections/SiteContainer"
import ViewTranslation from "../../../../../../src/views/ViewTranslation"

const Redirect = (props) => {
  return (
    <SiteContainer {...props}>
      <ViewTranslation {...props} />
    </SiteContainer>
  )
}

export default Redirect