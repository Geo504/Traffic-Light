import React from 'react'

export const Light = ({turnOnFunc, className, tabIndex}) => {

  return (
    <div
      role="button"
      tabIndex={tabIndex}
      className={className}
      onKeyDown={turnOnFunc}
      onClick={turnOnFunc}
    ></div>
  )
}
