import React from 'react';

type LeftRightProps = {
  children: React.ReactElement<typeof LeftRightItem> | React.ReactElement<typeof LeftRightItem>[];
}

export const LeftRight: React.FC<LeftRightProps> = ({ children }) => (
  <div className="grid grid-cols-leftright gap-x-2 gap-y-1">
    { children }
  </div>
)

type LeftRightItemProps = {
  left: string;
  right: string;
}

export const LeftRightItem: React.FC<LeftRightItemProps> = ({ left, right }) => (
  <>
    <div className="font-bold">{left}</div>
    <div>{right}</div>
  </>
)
