import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import {
  Border,
  Error,
  FlexWrapper,
  Form,
  Input,
  SocialWrapper,
  Switcher,
  SwitcherWrapper,
  Title,
  Wrapper,
} from "../components/auth-components"
import GithubButton from "../components/github-btn"
import GoogleButton from "../components/google-btn"
import { emailRegex, passwordRegex } from "../utils/regex"
import { setErrorMsg } from "../utils/error-auth-firebase"

export default function CreateAccount() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  const [isReady, setReady] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!name || !email || !password) return

    if (emailRegex(email) && passwordRegex(password)) {
      setReady(true)
    } else setReady(false)
  }, [name, email, password])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    if (name === "name") {
      setName(value)
    } else if (name === "password") {
      setPassword(value)
    } else if (name === "email") {
      setEmail(value)
    }
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if (
      !setReady ||
      isLoading ||
      name === "" ||
      email === "" ||
      password === ""
    )
      return
    try {
      setLoading(true)
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await updateProfile(credentials.user, {
        displayName: name,
      })
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
        <Title>Join &nbsp;</Title>
      </FlexWrapper>
      <FlexWrapper>
        <Form onSubmit={onSubmit}>
          <Input
            disabled={isLoading}
            onChange={onChange}
            name='name'
            value={name}
            placeholder='Name'
            type='text'
            required
          />
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
            value={isLoading ? "Loading..." : "Create Account"}
          />
        </Form>
        <Error>{error}</Error>
        <SwitcherWrapper>
          <Border />
          <Switcher>
            Already have an account? &nbsp;
            <Link to='/login'> Log in</Link>
          </Switcher>
          <Border />
        </SwitcherWrapper>
        <Switcher></Switcher>
        <SocialWrapper>
          <GithubButton setError={setError} />
          <GoogleButton setError={setError} />
        </SocialWrapper>
      </FlexWrapper>
    </Wrapper>
  )
}
