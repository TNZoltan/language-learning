import { Selected } from "./Selected"
import { User } from "./User"

const Providers = ({ children }) => {
  return (
    <User>
      <Selected>
        {children}
      </Selected>
    </User>
  )
}

export default Providers