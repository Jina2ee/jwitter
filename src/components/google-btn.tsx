import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { SocialButton as Button, SocialLogo as Logo } from "./auth-components"
import { FirebaseError } from "firebase/app"
import { setErrorMsg } from "../utils/error-auth-firebase"

type Props = {
  setError: React.Dispatch<React.SetStateAction<string>>
}

export default function GoogleButton({ setError }: Props) {
  const navigate = useNavigate()
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
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
      <Logo src='/google-logo.svg' />
      Continue with Google
    </Button>
  )
}
