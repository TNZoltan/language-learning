import { useContext, useEffect, useState } from "react";
import { FileSelector } from "../components";
import { isProfileReady, UserContext } from "../contexts/User";
import { updateProfileData } from "../services/api";
import { uploadFile } from "../services/supabase";
import Image from 'next/image'

const Profile = ({ content }) => {
  const { user } = useContext(UserContext)
  const [username, setUsername] = useState(null)
  const [avatarUpload, setAvatarUpload] = useState('')

  const updateProfile = async () => {
    if (avatarUpload) {
      const extension = avatarUpload.name.split('.').pop()
      const name = `${Math.random()}.${extension}`
      const filePath = `${name}`
      uploadFile('avatars', filePath, avatarUpload).then(res => {
        if (res.data) {
          updateProfileData(username, filePath)
        }
      })
    } else {
      updateProfileData(username)
    }

  }

  useEffect(() => {
    if (!username && isProfileReady(user)) {
      setUsername(user.profile.username)
    }
  }, [user])

  // TODO: Replace avatar with library?
  return (<>
    <div style={{ padding: '20px' }}>
      <label htmlFor="username">My profile picture</label>
      <div>
        {user.profile && (
          <Image
            src={user.profile.avatar_url}
            height={'150px'}
            width={'150px'}
          />
        )}
      </div>
      <FileSelector saveFileName={file => setAvatarUpload(file)} />
    </div>
    <div style={{ padding: '20px' }}>
      <label htmlFor="username">Name</label>{'  '}
      <input
        type="text"
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>

    <div style={{ padding: '20px' }}>
      <button onClick={updateProfile}>
        Update
      </button>
    </div>

  </>
  )
}

export default Profile