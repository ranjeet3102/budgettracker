import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
     return(

       <div className="h-screen w-screen  flex items-center justify-center ">
       {/* <div className="h-screen w-screen  flex items-center justify-center pt-50 pb-40"> */}

   <SignUp appearance={{
          variables: {
            colorBackground: 'rgba(255, 255, 255, 0.2)', // semi-transparent card
            colorText: '#1f2937', // Tailwind gray-800
            colorPrimary: '#3b82f6', // Tailwind blue-500
            borderRadius: '1rem',
            fontFamily: 'Inter, sans-serif',
          },
          elements: {
            card: 'backdrop-blur-md shadow-xl p-8',
          },
        }}/>
   </div>
  )
}

export default page
