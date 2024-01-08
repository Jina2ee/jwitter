

import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { SocialButton as Button, SocialLogo as Logo } from "./auth-components"

export default function GithubButton(){
  const navigate = useNavigate()
  const onClick= async() => {
    try {
      const provider = new GithubAuthProvider()
      await signInWithPopup(auth, provider)
      navigate("/") 
      
    } catch (error) {
      console.error(error)
    }
  }
  return <Button onClick={onClick}>
    <Logo src="/github-logo.svg" />
    Continue with Github
  </Button>
}