import { styled } from "styled-components"

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1rem;
  justify-content: center;
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 2.5rem 2.5rem;
  }
  @media (min-width: 1024px) {
    width: 1024px;
    padding: 2.5rem 4.5rem;
  }
`

export const FlexWrapper = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export const Title = styled.h1`
  display: flex;
  flex-direction: row;
  font-size: 1.4rem;
  justify-content: center;
  align-items: center;
  &::after {
    content: "Jwitter";
    font-weight: bold;
    font-style: italic;
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 2rem;
    flex-direction: column;
    padding: 2.5rem 2.5rem;
    gap: 1rem;
    &::after {
      content: "Jwitter";
      font-size: 6rem;
    }
  }
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
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    background-color: rgb(203 213 225);
    &:hover {
      opacity: 0.8;
    }
  }
  &.isReady {
    background-color: #1d9bf0;
    color: white;
  }
`

export const Error = styled.span`
  height: 2rem;
  font-weight: 600;
  color: tomato;
  text-align: center;
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
  width: 100%;
  height: 1px;
  background-color: rgb(47, 51, 54);
`

export const Switcher = styled.span`
  a {
    color: #1d9bf0;
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
