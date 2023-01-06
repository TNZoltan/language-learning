const styling = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}


export const Spread = ({ children }) => {
  return (
    <div style={styling}>{children}</div>
  )
}