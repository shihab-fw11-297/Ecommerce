import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/card';
import Slider from '../components/slider';
import { useLatestProductsQuery, useBestProductsQuery } from '../redux/api/productAPI';
import { Skeleton } from "../components/loader";

const dummyData = [
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/Bestseller/holi/GATEWAY/Hero_PC_BEST-SELLER_2X._CB579340867_.jpg', alt: 'Slide 1' },
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_hero_1_2x_1._CB582889946_.jpg', alt: 'Slide 2' },
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg', alt: 'Slide 3' },
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg', alt: 'Slide 4' },
    { url: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg', alt: 'Slide 5' }
];

const Home = () => {
    const [latestPage, setLatestPage] = useState(1);
    const [bestPage, setBestPage] = useState(1);
    const limit = 4;

    const { data: latestData, isLoading: latestLoading, isError: latestError, isFetching: latestFetching } = useLatestProductsQuery({ page: latestPage, limit });
    const { data: bestData, isLoading: bestLoading, isError: bestError, isFetching: bestFetching } = useBestProductsQuery({ page: bestPage, limit });

    const handleNext = (setter) => () => {
        setter((prevPage) => prevPage + 1);
    };

    const handlePrev = (setter) => () => {
        setter((prevPage) => Math.max(prevPage - 1, 1));
    };

    const renderProducts = (data) => {
        return (
            <div className="slider-container">
                {data.products.map((product) => (
                    <Card
                        key={product._id}
                        productId={product._id}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        handler={() => {}}
                        photo={product.photo}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className='home'>
            <Slider images={dummyData} />
            <h1>
                Latest Products
                <Link to={"/search"} className='findmore'>
                    More
                </Link>
            </h1>
            <main>
                <div className="slider">
                    {latestLoading || latestFetching ? <Skeleton width="80vw" length={4} /> : renderProducts(latestData)}
                    <button className="prev-slide" disabled={latestPage <= 1} onClick={handlePrev(setLatestPage)}>
                        &#10094;
                    </button>
                    <button className="next-slide" disabled={!latestData || latestPage >= Math.ceil(latestData.totalPage)} onClick={handleNext(setLatestPage)}>
                        &#10095;
                    </button>
                </div>
            </main>
            <h1>
                Best Products
                <Link to={"/search"} className='findmore'>
                    More
                </Link>
            </h1>
            <main>
                <div className="slider">
                    {bestLoading || bestFetching ? <Skeleton width="80vw" length={4} /> : renderProducts(bestData)}
                    <button className="prev-slide" disabled={bestPage <= 1} onClick={handlePrev(setBestPage)}>
                        &#10094;
                    </button>
                    <button className="next-slide" disabled={!bestData || bestPage >= Math.ceil(bestData.totalPage)} onClick={handleNext(setBestPage)}>
                        &#10095;
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Home;
