// import Header from './header'
import Slider from './banner'
import ProductList from './productList'
import Social from './social'
// import Footer from './footer'
import Seller from './sellers'
import Banner1 from './banner1'
import ProductList2 from './productList2'

const HomePage = () => {
  return (
    <div>
        {/* <Header/> */}
        <Slider/>
        <Seller/>
        <ProductList/>
        <Banner1/>
        <ProductList2/>
        <Social/>
        {/* <Footer/> */}
    </div>
  )
}

export default HomePage