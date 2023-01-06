import Image from 'next/image'
import { useContext, useState } from 'react'
import { UserContext } from '../contexts/User'

export const FileSelector = ({ saveFileName, height, width }) => {
  const [previewUrl, setPreviewUrl] = useState('');

  const preview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(i));
    }
  };

  return (
    <>
      {previewUrl ? <Image src={previewUrl} height={height} width={width} /> : <div style={{ height: '150px' }} />}
      <input
        type="file"
        id="single"
        accept="image/*"
        onChange={e => {
          preview(e)
          saveFileName(e.target.files[0])
        }}
      />
    </>
  )
}
