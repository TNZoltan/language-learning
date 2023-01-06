import { useContext } from "react"
import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import { isLoggedIn, UserContext } from '../contexts/User';
import { supabase } from "../services/supabase"
import routes from "../constants/routes";
import styles from './Navigation.module.scss';
import { Button } from "../components";
import { HomeRounded } from "grommet-icons";

const Navigation = ({ content }) => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  const renderLoggedIn = () => {
    return (
      <div className={styles.section}>
        <Link href={routes.profile.url}>
          <div className={styles.profilePic} style={!user.profile?.avatar_file ? {} : { backgroundImage: `url(${user.profile?.avatar_url})` }} />
        </Link>
        <Button
          variant="transparent"
          onClick={() => {
            supabase.auth.signOut().then(() => Router.reload())
          }}
        >
          Sign out
        </Button>
      </div >
    )
  }

  const renderLoggedOut = () => {
    return (
      <div className={styles.section}>
        <Button
          variant="transparent"
          onClick={() => {
            router.push(routes.signup.url)
          }}
        >
          Signup
        </Button>
        <Button
          variant="transparent"
          onClick={() => {
            router.push(routes.login.url)
          }}
        >
          Login
        </Button>
      </div>
    )
  }

  return <div className={styles.navigation}>
    <div className={styles.sections}>
      <div className={styles.section}>
        <Link href={routes.editorHome.url}>
          <Button variant="transparent">
            <HomeRounded color={'#FFF'} />
          </Button>
        </Link>
      </div>
      {isLoggedIn(user) ? renderLoggedIn() : renderLoggedOut()}
    </div>
  </div>
}

export default Navigation