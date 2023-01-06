const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw'
}

const modalStyle = {
  position: 'absolute',
  background: 'white',
  padding: '30px',
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  transform: 'translate(-50%, -50%)',
  border: '1px solid transparent',
  borderRadius: '15px',
  boxShadow: '0 0 4px -2px'
}

export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div style={{
      ...overlayStyle,
      display: isOpen ? 'block' : 'none'
    }} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}