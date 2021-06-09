import React from 'react';
import { useRouter } from 'next/router';
import { Path } from '../lib/constants';
import Button from './Button';
import { Close, Menu, Sailboat } from './Icons';

type NavItemProps = {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

const NavItem = ({href, active = false, children}: NavItemProps) => (
  <li className="flex tracking-wide">
    <a
      href={href}
      className={`p-3 lg:pb-0 lg:pt-2 flex-auto lg:flex lg:flex-col lg:justify-center lg:border-b-8 transition-colors duration-250 focus:outline-none ${active ? 'bg-yellow-200 lg:bg-transparent lg:border-yellow-500' : 'text-gray-500 hover:text-gray-900 focus:text-gray-900 hover:bg-yellow-100 focus:bg-yellow-100 lg:hover:bg-transparent lg:focus:bg-transparent lg:border-transparent lg:hover:border-yellow-300 lg:focus:border-yellow-300'}`}>
      {children}
    </a>
  </li>
)

type NavMenuProps = {
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactElement<typeof NavItem>[];
}

const NavMenu = ({isOpen, onClick, children}: NavMenuProps) => (
  <nav
    onClick={onClick}
    className={`lg:flex-auto lg:flex lg:justify-between lg:h-16 pb-2 lg:pb-0 transform lg:transform-none absolute lg:relative top-14 lg:top-auto right-0 lg:right-auto bg-gray-50 w-56 lg:w-auto transition-navmenu lg:transition-none duration-250 shadow-md lg:shadow-none lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none translate-x-40'}`}>
    
    <div className="p-3 lg:p-0 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 lg:items-center lg:order-2">
      <Button link href={Path.sellers}>
        Sell your boat
      </Button>
      <Button primary link href={Path.sailboats}>
        Find your new boat
      </Button>
    </div>

    <ul className="lg:flex lg:ml-8 lg:space-x-2 lg:order-1">
      {children}
    </ul>
  </nav>
)

type MenuBtnProps = {
  menuOpen: boolean;
  onClick: () => void;
}

const MenuBtn = ({menuOpen, onClick}: MenuBtnProps) => (
  <button type="button" onClick={onClick} className="p-[0.375rem] rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 lg:hidden">
    {menuOpen ? 
    <Close sizeStyles="w-8 h-8" extraStyles="text-yellow-700" />
    :
    <Menu sizeStyles="w-8 h-8" extraStyles="text-yellow-700" />
    }
  </button>
)

export default function Navbar() {
  const router = useRouter();
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-screen h-14 lg:h-16 px-2 sm:px-4 flex items-center bg-gray-50 shadow-md text-gray-900 z-50">
      <a href="/" className="md:-ml-2.5 mr-2 py-2.5 w-11 h-11 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500">
        <Sailboat extraStyles="m-auto text-yellow-500" />
      </a>

      <h1 className="text-lg sm:text-xl xl:text-2xl font-bold tracking-wider text-yellow-900 flex-auto lg:flex-none">Sailboat Sales Demo</h1>

      <MenuBtn menuOpen={navOpen} onClick={() => setNavOpen(!navOpen)} />

      <NavMenu isOpen={navOpen} onClick={() => setNavOpen(!navOpen)}>
        <NavItem active={router.pathname === Path.home} href={Path.home}>Home</NavItem>
        <NavItem active={router.pathname.startsWith(Path.sailboats)} href={Path.sailboats}>Sailboats</NavItem>
        <NavItem active={router.pathname.startsWith(Path.about)} href={Path.about}>About</NavItem>
        <NavItem active={router.pathname.startsWith(Path.news)} href={Path.news}>News</NavItem>
      </NavMenu>
    </header>
  );
}
