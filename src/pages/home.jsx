import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/card'
import Slider from '../components/slider'

const dummyData = [
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/Bestseller/holi/GATEWAY/Hero_PC_BEST-SELLER_2X._CB579340867_.jpg', alt: 'Slide 1' },
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_hero_1_2x_1._CB582889946_.jpg', alt: 'Slide 2' },
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg', alt: 'Slide 3' },
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg', alt: 'Slide 4' },
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg', alt: 'Slide 5' }
  ];


const Home = () => {

    const cartHandler = () => { }

    return (
        <div className='home'>
            {/* <section></section> */}
            <Slider images={dummyData}/>
            <h1>
                Latest Products
                <Link to={"/search"} className='findmore'>
                    More
                </Link>
            </h1>
            <main>
                <Card prodId="123" price="50" name="iphone" photo="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70&crop=false" stock={10} handler={cartHandler} />
            </main>
            <h1>
                Latest Products
                <Link to={"/search"} className='findmore'>
                    More
                </Link>
            </h1>
            <main>
                <Card prodId="123" price="50" name="iphone" photo="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70&crop=false" stock={10} handler={cartHandler} />
            </main>
            <h1>
                Latest Products
                <Link to={"/search"} className='findmore'>
                    More
                </Link>
            </h1>
            <main>
                <Card prodId="123" price="50" name="iphone" photo="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70&crop=false" stock={10} handler={cartHandler} />
            </main>
            <h1>
                Latest Products
                <Link to={"/search"} className='findmore'>
                    More
                </Link>
            </h1>
            <main>
                <Card prodId="123" price="50" name="iphone" photo="https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70&crop=false" stock={10} handler={cartHandler} />
            </main>
        </div>
    )
}

export default Home