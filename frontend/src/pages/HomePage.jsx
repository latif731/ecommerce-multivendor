
import React from 'react'
import Header from '../components/layout/Header'
import Hero from '../components/route/Hero/Hero'
import Categories from '../components/route/Categories/Categories'
import BestDeals from '../components/route/BestDeals/BestDeals'
import FeaturedProduct from '../components/route/FeaturedProduct/FeaturedProduct'
import Events from '../components/events/Events'
import Sponsored from '../components/route/Sponsored'
import Footer from '../components/layout/Footer'

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1}/>
      <Hero/>
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
      <Sponsored/>
      <Footer/>
    </div>
  )
}
  
export default HomePage