import UploadForm from "@/components/UploadForm"
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function gallery() {

  const { user } = useAuth()
  const [images, setImages] = useState<any>([])

  useEffect(() => {
    if(user){
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        createElementsArray(doc)
      })
    }

  }, [])

  function createElementsArray(doc: any) {
    if (doc.exists()) {
      const urlsArray = doc.data().images

      setImages(urlsArray.map((url: string) => {
        return <Image src={url} alt='Image' key={v4()} width={200} height={500} priority />
      }))

    } else {
      console.log("No images found");
    }
  }

  return (
    <div>
      <UploadForm />
      <>{images}</>
    </div>
  )
}

export default gallery