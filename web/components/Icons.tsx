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
  <Icon {...props} >
    <path d="M12 14l-4-4h8z"/>
  </Icon>
)

export const Sailboat: React.FC<PublicIconProps> = (props) => (
  <Icon {...props} >
    <path d="M3 18h18a.5.5 0 0 1 .4.8l-2.1 2.8a1 1 0 0 1-.8.4h-13a1 1 0 0 1-.8-.4l-2.1-2.8A.5.5 0 0 1 3 18zM15 2.425V15a1 1 0 0 1-1 1H4.04a.5.5 0 0 1-.39-.812L14.11 2.113a.5.5 0 0 1 .89.312z"/>
  </Icon>
)

export const Menu: React.FC<PublicIconProps> = (props) => (
  <Icon {...props} >
    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
  </Icon>
)

export const Close: React.FC<PublicIconProps> = (props) => (
  <Icon {...props} >
    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
  </Icon>
)
