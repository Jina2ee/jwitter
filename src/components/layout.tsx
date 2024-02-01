import { Link, Outlet, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import { auth } from "../firebase"

const Wrapper = styled.div`
  display: grid;
  position: relative;
  gap: 20px;
  height: 100%;
  width: 100%;
  max-width: 860px;
  padding: 3rem 1rem 3.5rem;
  @media (min-width: 768px) {
    grid-template-columns: 0fr 4fr;
  }
`
const Header = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 0.5rem 0;
  font-weight: bold;
  font-style: italic;
  font-size: 1.5rem;
  color: white;
  text-align: center;
  justify-content: center;
  @media (min-width: 768px) {
    display: none;
  }
`

const Menu = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  @media (min-width: 768px) {
    display: flex;
    position: static;
    flex-direction: column;
    align-items: end;
    justify-content: start;
    gap: 20px;
  }
`

const Logo = styled.div`
  font-weight: bold;
  font-style: italic;
  font-size: 1.5rem;
  color: white;
  text-align: center;
  border: none;
`

const NavLink = styled(Link)`
  padding: 0.6rem 1rem;
  text-decoration: none;
  &.main-logo {
    @media (max-width: 768px) {
      display: none;
    }
  }
`
const NavBtn = styled.button`
  padding: 0.6rem 1rem;
  background-color: transparent;
  border: none;
  margin: 0;
`
const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  svg {
    width: 30px;
    fill: white;
  }
  &.log-out {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
`

export default function Layout() {
  const navigate = useNavigate()
  const onLogout = async () => {
    const ok = confirm("Are you sure you want to log out?")
    if (ok) {
      await auth.signOut()
      navigate("/login")
    }
  }
  return (
    <Wrapper>
      <Header>Jwitter</Header>
      <Menu>
        <NavLink to='/' className='main-logo'>
          <Logo>Jw</Logo>
        </NavLink>
        <NavLink to='/'>
          <MenuItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z'
                clipRule='evenodd'
              />
            </svg>
          </MenuItem>
        </NavLink>
        <NavLink to='/profile'>
          <MenuItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
            >
              <path d='M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z' />
            </svg>
          </MenuItem>
        </NavLink>
        <NavBtn onClick={onLogout}>
          <MenuItem className='log-out'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z'
                clipRule='evenodd'
              />
              <path
                fillRule='evenodd'
                d='M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z'
                clipRule='evenodd'
              />
            </svg>
          </MenuItem>
        </NavBtn>
      </Menu>

      <Outlet />
    </Wrapper>
  )
}
