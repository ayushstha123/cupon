import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import offersData from '../assests/offers.json';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    './src/assests/images/img1.jpg',
    './src/assests/images/img2.jpg',
    './src/assests/images/img3.jpg',
    './src/assests/images/img4.jpg',
  ];

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='bg-violet-600'>
      <div className="relative w-full">
        <div className="carousel-container aspect-w-16 aspect-h-9 object-scale-down overflow-hidden w-full">
          <div
            className="carousel-content flex transition-transform duration-300 ease-in-out transform"
            style={{
              width: `${images.length * 100}%`,
              transform: `translateX(-${(activeIndex / images.length) * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="carousel-item w-full h-96">
                <img src={image} alt={`carousel-item-${index}`} className=" w-full" />
              </div>
            ))}
          </div>
          
        </div>
        <div className="absolute p-5 top-1/2 left-0 transform -translate-y-1/2 w-full">
        <button className="carousel-arrow hover:bg-white hover:rounded-full p-2 transition-all animate-bounce carousel-prev float-left " onClick={handlePrev}>
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8L8 12 12 16" />
  </svg>
</button>
<button className="carousel-arrow hover:bg-white hover:rounded-full p-2 transition-all animate-bounce carousel-next  float-right" onClick={handleNext}>
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8L16 12 12 16" />
  </svg>
</button>

        </div>
      </div>
      <h1 className='text-5xl font-sans pt-24 text-white font-black text-center p-10'>
      Nepal's Premier Student Discounts Hub!      
      </h1>
      <p className='text-center pb-8 p-2 font-light font-sans text-white'>Study More, Spend Less - Empowering Nepali Students with Unmatched Deals!</p>
             
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 justify-center">
        {offersData.map((offer, index) => (
          <div key={index} className="p-5 mx-5 md:mx-2">
            <div className="w-full bg-gradient-to-r from-white to-violet-200 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
              <div className="p-5">
                <img
                  className="object-cover w-20 h-20 md:w-24 md:h-24 rounded-full md:rounded-xl shadow-2xl"
                  src={offer.imgUrl}
                  alt={offer.name}
                />
              </div>
              <div className="flex flex-col flex-grow pb-5 px-5 md:p-5">
                <h2 className="mb-1 md:text-start text-center font-medium text-black">
                  {offer.name}
                </h2>
                
                 
                    <p href="#" className="inline-flex items-center my-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ">
                      Discount: {offer.discount}
                    </p>
                    <p href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-gray-300 rounded-lg">
                      Location: {offer.location}
                    </p>
               
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
