import Navigation from './Navigation'

const siteContainerStyle = {
  maxWidth: '1280px',
  width: '90%',
  margin: '0 auto'
}

const SiteContainer = ({ children, content }) => {
  return <>
    <Navigation content={content} />
    <div style={siteContainerStyle}>
      {children}
    </div>
  </>
}

export default SiteContainer