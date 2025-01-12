'use client'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'
const Header = () => {
  return (
    <section>
        <div>
            <h1 className='text-white text-2xl lg:text-8xl sm:text-5xl mb-4 font-extrabold'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600'>Hello, je suis </span>
                <br></br>
                <TypeAnimation
      sequence={[
        
        'Killian GIL',
        2000, 
        'Étudiant Design UI/UX',
        2000,
        
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1em', display: 'inline-block' }}
      repeat={Infinity}
    />
            </h1>

            


        </div>








        <div>
            Image
        </div>
    </section>

  )
}

export default Header