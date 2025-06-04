import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 flex justify-center pt-20 pb-10'>
      {children}
    </div>
  )
}

export default AuthLayout;
