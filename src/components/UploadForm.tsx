import { db, storage } from "@/config/firebase"
import { useAuth } from "@/context/AuthContext"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import ErrorText from "./ErrorText"
import { v4 } from "uuid"
import { arrayUnion, doc, setDoc } from "firebase/firestore"
import config from "@/config/config"


function UploadForm() {
  const [error, setError] = useState('')
  const { user } = useAuth()

  const changeHandler = (e: any) => {
    setError('')
    
    let selected = e.target.files[0]
    if (selected && config.supportedFormats.includes(selected.type)) {
      uploadImage(selected)
    } else {
      setError('Unsupported format')
    }
  }

  const uploadImage = (file: any) => {
    if (!file) return

    const path = `${user.email}/${v4()}`
    const storageRef = ref(storage, path)
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(ref(storage, path))
      .then((url) => {
        addImageDB(url, path)
      })
      .catch((error) => {
        setError("An error occurred during the syncronization with the database")
      })
    }).catch((error) => {
      setError("An error occurred during the upload")
    })
  }

  const addImageDB = async (url: string, name: string) => {
    await setDoc(doc(db, "users", user.uid), {
      images: arrayUnion({
        url: url,
        name: name
      })
    }, { merge: true });
  }

  return (
    <div className="flex gap-2 mt-12 justify-center items-center">
    <label className="border-black hover:bg-slate-200 w-12 h-12 text-4xl border rounded-xl text-center" >+
      <input type="file" onChange={changeHandler} className='hidden' />
    </label>
    <ErrorText error={error} />
    </div>
  )
}

export default UploadForm