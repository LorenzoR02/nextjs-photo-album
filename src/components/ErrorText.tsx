import React from 'react'

export interface ErrorProp {
  error: string
}

function ErrorText(props: ErrorProp) {

  if (props.error === '') return null

  return (
    <small className='text-red-700'>
      {props.error}
    </small>
  )
}

export default ErrorText