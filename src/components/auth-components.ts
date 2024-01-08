import { styled } from "styled-components"

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`
export const Title = styled.h1`
  font-size: 42px;

`
export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
export const Input = styled.input`
  padding: 10px 20px ;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"]{
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`

export const SwitcherWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`
export const Border = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  width:100%;
  height: 1px;
  background-color: rgb(47, 51, 54);
`

export const Switcher = styled.span`
  a {
    color: #1d9bf0
  }
  display: flex;
  flex: 0 1 auto;
  justify-content: center;
  align-items: center;
`

export const SocialWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`


export const SocialButton = styled.span`
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px;
  border-radius: 50px;
  border: 0; 
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
export const SocialLogo = styled.img`
  height: 25px;
`