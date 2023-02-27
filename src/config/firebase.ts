import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import config from "./config"

const app = initializeApp(config.firebase)

export const auth = getAuth()

export const storage = getStorage(app)
export const db = getFirestore(app);
