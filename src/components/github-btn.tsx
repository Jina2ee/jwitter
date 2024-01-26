import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "../firebase"
import { useNavigate } from "react-router-dom"
import { SocialButton as Button, SocialLogo as Logo } from "./auth-components"
import { FirebaseError } from "firebase/app"
import { setErrorMsg } from "../utils/error-auth-firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

type Props = {
  setError: React.Dispatch<React.SetStateAction<string>>
}

export default function GithubButton({ setError }: Props) {
  const navigate = useNavigate()
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider()
      const credentials = await signInWithPopup(auth, provider)
      const documentRef = doc(db, "users", credentials.user.uid)
      const userDoc = await getDoc(documentRef)
      if (!userDoc.data()) {
        await setDoc(doc(db, "users", credentials.user.uid), {
          createdAt: Date.now(),
          uid: credentials.user.uid,
          name: credentials.user.displayName,
        })
      }
      navigate("/")
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMsg = setErrorMsg(error.code)
        setError(errorMsg)
      }
    }
  }
  return (
    <Button onClick={onClick}>
      <Logo src='/github-logo.svg' />
      Continue with Github
    </Button>
  )
}
