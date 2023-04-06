import React from 'react'
import logoJS from '../assets/img/logo_450x200_azul_trans.png'
import Image from 'next/image'


export default function Footer() {
  return (
    <section className='footer'>
        <a href='https://www.juliosantacruz.dev'target="_blank" className='js-dev'>
            <Image src={logoJS} alt="" />
        </a>
    </section>
  )
}
