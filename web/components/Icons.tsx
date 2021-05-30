import React from 'react'

type PublicIconProps = {
  sizeStyles?: string;
  extraStyles?: string;
}

type IconProps = PublicIconProps & {
  children: React.SVGProps<SVGPathElement> | React.SVGProps<SVGPathElement>[];
}

const defaultSizes = 'w-6 h-6';
const defaultStyles = 'stroke-current fill-current';

const Icon: React.FC<IconProps> = ({ sizeStyles = defaultSizes, extraStyles, children }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${sizeStyles} ${defaultStyles} ${extraStyles ? extraStyles : ''}`}>
    {children}
  </svg>
)

export const UpCarat: React.FC<PublicIconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 10l4 4H8z"/>
  </Icon>
)

export const DownCarat: React.FC<PublicIconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 14l-4-4h8z"/>
  </Icon>
)

export const Sailboat: React.FC<PublicIconProps> = (props) => (
  <Icon {...props}>
    <path d="M3 18h18a.5.5 0 0 1 .4.8l-2.1 2.8a1 1 0 0 1-.8.4h-13a1 1 0 0 1-.8-.4l-2.1-2.8A.5.5 0 0 1 3 18zM15 2.425V15a1 1 0 0 1-1 1H4.04a.5.5 0 0 1-.39-.812L14.11 2.113a.5.5 0 0 1 .89.312z"/>
  </Icon>
)

export const Menu: React.FC<PublicIconProps> = (props) => (
  <Icon {...props}>
    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
  </Icon>
)

export const Close: React.FC<PublicIconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
  </Icon>
)

export const Star: React.FC<PublicIconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"/>
  </Icon>
)

export const ArrowCircleRight: React.FC<PublicIconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 11V8l4 4-4 4v-3H8v-2h4zm0-9c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z"/>
  </Icon>
)

export const ArrowHeadRight: React.FC<PublicIconProps> = (props) => (
  <Icon {...props}>
    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
  </Icon>
)

export const ArrowHeadLeft: React.FC<PublicIconProps> = (props) => (
  <Icon {...props}>
    <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
  </Icon>
)
