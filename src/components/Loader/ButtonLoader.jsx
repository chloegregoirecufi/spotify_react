import React from 'react'
import { Audio } from 'react-loader-spinner'

const ButtonLoader = () => {
  return (
    <Audio
    height="60"
    width="60"
    color="rgba(30, 215, 96, 1)"
    ariaLabel="audio-loading"
    wrapperStyle={{}}
    wrapperClass="wrapper-class"
    visible={true}
    />

    )
}

export default ButtonLoader