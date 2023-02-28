import UploadForm from "@/components/UploadForm"
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function gallery() {

  const { user } = useAuth()
  const [images, setImages] = useState<any>([])
  let array: any = null

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        createElementsArray(doc)
      })
    }

  }, [])

  function createElementsArray(doc: any) {
    if (doc.exists()) {
      const objArray = doc.data().images
      array = objArray

      setImages(objArray?.map((obj: any) => {
        return <div key={v4()}>
          <Image src={obj.url} alt='Image' width={200} height={500} priority />
          <button onClick={() => { deleteImage(obj.url) }} >Delete</button>
        </div>
      }))

    } else {
      console.log("No images found");
    }
  }

  async function deleteImage(path: string) {
    const userRef = doc(db, "users", user.uid)

    await updateDoc(userRef, {
      images: array.filter((image: any) => image.url !== path)
    }).then(() => {
      const storage = getStorage();
      const desertRef = ref(storage, path);

      deleteObject(desertRef).then(() => {
        
      }).catch((error) => {
        console.log("An error occurred while deleting image on storage")
      });
    })
  }

  return (
    <div>
      <UploadForm />
      <>{images}</>
    </div>
  )
}

export default gallery