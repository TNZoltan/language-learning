
const textStyle = {
  display: 'block',
  border: '1px solid transparent',
  borderRadius: '5px'
}

export const Text = ({ color, size, children, ...rest }) => {
  return (
    <span style={textStyle}>{children}</span>
  )
}