import { db, storage } from "@/config/firebase"
import { useAuth } from "@/context/AuthContext"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import ErrorText from "./ErrorText"
import { v4 } from "uuid"
import { arrayUnion, doc, setDoc } from "firebase/firestore"
import config from "@/config/config"


function UploadForm() {

  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const changeHandler = (e: any) => {
    let selected = e.target.files[0]
    if (selected && config.supportedFormats.includes(selected.type)) {
      setFile(selected)
      setError('')
    } else {
      setFile(null)
      setError('Errore')
    }
  }

  const uploadImage = () => {
    if (!file) return

    const path = `${user.email}/${v4()}`
    const storageRef = ref(storage, path)
    uploadBytes(storageRef, file).then(() => {
      alert('uploaded')
      getDownloadURL(ref(storage, path))
      .then((url) => {
        setUrl(url)
      })
      .catch((error) => {
        console.log("An error occurred during the syncronization with the database")
      })
    }).catch((error) => {
      console.log("An error occurred during the upload")
    })
  }

  const setUrl = async (url: string) => {
    await setDoc(doc(db, "users", user.uid), {
      images: arrayUnion(url)
    }, { merge: true });
  }

  return (<>
    <input type="file" onChange={changeHandler} />
    {file !== null && <button onClick={uploadImage}>Upload</button>}
    <ErrorText error={error} /></>
  )
}

export default UploadForm