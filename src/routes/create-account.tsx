import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { Border, Error, Form, Input, SocialWrapper, Switcher, SwitcherWrapper, Title, Wrapper } from "../components/auth-components"
import GithubButton from "../components/github-btn"
import GoogleButton from "../components/google-btn"

// const errors = {
//   "auth/email-already-in-use": "That email already exists."
// }


export default function CreateAccount(){
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: {name, value} } = e
    if(name === "name" ){
      setName(value)
    } else if(name === "password"){
      setPassword(value)
    } else if (name === "email") {
      setEmail(value)
    }
  }
  const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if(isLoading || name === "" || email === "" || password === "") return
    try {
      setLoading(true)
      const credentials = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credentials.user, {
        displayName: name
      })
      navigate("/")
    } catch (e) {
      if(e instanceof FirebaseError){
        setError(e.message)
      }
    }
    finally{
      setLoading(false)
    }
    console.log("onSubmit", name, email, password)
  }
  return<Wrapper>
    <Title>Join 🐳</Title>
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required/>
      <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
      <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
      <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
    </Form>
    {error !== "" ? <Error>{error}</Error> : null}
    <SwitcherWrapper>
      <Border/>
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
      <Border/>
    </SwitcherWrapper>
    <Switcher>
    </Switcher>
    <SocialWrapper>
      <GithubButton />
      <GoogleButton />
    </SocialWrapper>
  </Wrapper>
} 