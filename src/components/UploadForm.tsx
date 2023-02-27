import { db, storage } from "@/config/firebase"
import { useAuth } from "@/context/AuthContext"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import ErrorText from "./ErrorText"
import { v4 } from "uuid"
import { arrayUnion, doc, setDoc } from "firebase/firestore"


function UploadForm() {

  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const types = ['image/png', 'image/jpeg', 'image/jpg']

  const changeHandler = (e: any) => {

    let selected = e.target.files[0]
    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setError('')
    } else {
      setFile(null)
      setError('Errore')
    }
  }

  const uploadImage = () => {
    if (!file) return

    const path = `${user.uid}/${v4()}`

    const storageRef = ref(storage, path)
    uploadBytes(storageRef, file).then(() => {
      alert('uploaded')
      getDownloadURL(ref(storage, path))
      .then((url) => {

        
        setUrl(url)



      })
      .catch((error) => {
        // Handle any errors
      });
    })

    console.log(path)
    


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