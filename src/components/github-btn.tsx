import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { SocialButton as Button, SocialLogo as Logo } from "./auth-components"
import { FirebaseError } from "firebase/app"
import { setErrorMsg } from "../utils/error-auth-firebase"

type Props = {
  setError: React.Dispatch<React.SetStateAction<string>>
}

export default function GithubButton({ setError }: Props) {
  const navigate = useNavigate()
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider()
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
      <Logo src='/github-logo.svg' />
      Continue with Github
    </Button>
  )
}
