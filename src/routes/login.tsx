import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
  SocialWrapper,
  SwitcherWrapper,
  Border,
} from "../components/auth-components"
import GithubButton from "../components/github-btn"
import GoogleButton from "../components/google-btn"

function setErrorMsg(code: string): string {
  switch (code) {
    case "auth/invalid-login-credentials":
      return "Incorrect email and password. Please try again."

    default:
      return "Oops, something went wrong. Please try again later."
  }
}

function emailRegex(value: string) {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  return regex.test(value)
}
function passwordRegex(value: string) {
  const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,30}$/
  return regex.test(value)
}

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [isReady, setReady] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!email || !password) return

    if (emailRegex(email) && passwordRegex(password)) {
      setReady(true)
    } else setReady(false)
  }, [email, password])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    if (name === "password") {
      setPassword(value)
    } else if (name === "email") {
      setEmail(value)
    }
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if (isLoading || email === "" || password === "") return
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorMsg = setErrorMsg(e.code)
        setError(errorMsg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Title>Log into 🐳</Title>
      <Form onSubmit={onSubmit}>
        <Input
          disabled={isLoading}
          onChange={onChange}
          name='email'
          value={email}
          placeholder='Email'
          type='email'
          required
        />
        <Input
          disabled={isLoading}
          onChange={onChange}
          name='password'
          value={password}
          placeholder='Password'
          type='password'
          required
        />

        <Input
          type='submit'
          className={isReady ? "isReadyToLogin" : ""}
          disabled={isLoading || !isReady}
          value={isLoading ? "Loading..." : "Log in"}
        />
      </Form>
      <Error>{error}</Error>
      <SwitcherWrapper>
        <Border />
        <Switcher>
          Don't have an account? <Link to='/create-account'> Create one</Link>
        </Switcher>
        <Border />
      </SwitcherWrapper>
      <SocialWrapper>
        <GithubButton />
        <GoogleButton />
      </SocialWrapper>
    </Wrapper>
  )
}
