import React from 'react'
import HeroSection from './HeroSection'
import About from './About'
import ServicesSection from './ServicesSection'
import Menu from './Menu'
import QRCodePrinter from '../Admindashboard/QRCodePrinter'

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <ServicesSection/>
      <About/>
      <Menu/>
      
    </div>
  ) 
}
