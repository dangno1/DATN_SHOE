import React from 'react'
import Header from './header'
import Footer from './footer'
import Banner from './banner'
import Account from './account'

type Props = {}

const UserPage = (props: Props) => {
  return (
    <div>
        <Header/>
        <Banner/>
        
        <Account/>
        <Footer/>

    </div>
  )
}

export default UserPage