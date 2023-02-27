import UploadForm from "@/components/UploadForm"
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function gallery() {

  const { user } = useAuth()
  const [imagesElement, setImagesElement] = useState<any>([])

  useEffect(() => {
    generateImages()
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      createImages(doc)
    });


  }, [])

  async function generateImages() {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    createImages(docSnap)
  }

  function createImages(docSnap: any) {
    if (docSnap.exists()) {
      const imagesArray = docSnap.data().images

      setImagesElement(imagesArray.map((url: string) => {
        return <Image src={url} alt='Image' key={v4()} width={500} height={500} />
      }))

    } else {
      console.log("No such document!");
    }
  }

  return (
    <div>
      <UploadForm />
      <>{imagesElement}</>

    </div>
  )
}

export default gallery