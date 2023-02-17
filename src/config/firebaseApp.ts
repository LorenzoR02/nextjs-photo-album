import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import config from "./config";

const Firebase = initializeApp(config.firebase);


export const Providers = {
  google: new GoogleAuthProvider()
}

export const auth = getAuth()

export default Firebase