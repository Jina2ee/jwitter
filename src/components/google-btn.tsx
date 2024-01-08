

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { SocialButton as Button, SocialLogo as Logo } from "./auth-components"

export default function GoogleButton(){
  const navigate = useNavigate()
  const onClick= async() => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      navigate("/") 
      
    } catch (error) {
      console.error(error)
    }
  }
  return <Button onClick={onClick}>
    <Logo src="/google-logo.svg" />
      Continue with Google
  </Button>
}