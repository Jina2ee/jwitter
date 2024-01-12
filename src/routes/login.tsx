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
  FlexWrapper,
} from "../components/auth-components"
import GithubButton from "../components/github-btn"
import GoogleButton from "../components/google-btn"
import { emailRegex, passwordRegex } from "../utils/regex"
import { setErrorMsg } from "../utils/error-auth-firebase"

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
      <FlexWrapper>
        <Title>Log into &nbsp;</Title>
      </FlexWrapper>
      <FlexWrapper>
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
            className={isReady ? "isReady" : ""}
            disabled={isLoading || !isReady}
            value={isLoading ? "Loading..." : "Log in"}
          />
        </Form>
        <Error>{error}</Error>
        <SwitcherWrapper>
          <Border />
          <Switcher>
            Don't have an account? &nbsp;
            <Link to='/create-account'> Create one</Link>
          </Switcher>
          <Border />
        </SwitcherWrapper>
        <SocialWrapper>
          <GithubButton />
          <GoogleButton />
        </SocialWrapper>
      </FlexWrapper>
    </Wrapper>
  )
}
