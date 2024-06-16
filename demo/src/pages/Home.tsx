import { useNavigate } from "react-router-dom";

import CardItems from "./UI/CardItems";

import React, { useState } from "react";
import Videoplayer from "./Videoplayer";
import SliderPage from "./SliderPage";
import Footer from "./Footer";

// import SliderPage from "./SliderPage";

export type CardItemType = {
  img: string;
  title: string;
  discription: string;
};

const Home: React.FC = () => {
  const [cardItemData1, setCardItemData1] = useState<CardItemType>({
    img: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
    title: "Smart Phone",
    discription: "Sleek Device",
  });
  const [cardItemData2, setCardItemData2] = useState<CardItemType>({
    img: "https://cdn.dummyjson.com/product-images/9/1.jpg",
    title: "laptop",
    discription: "Elegant Gadget         ",
  });
  const [cardItemData3, setCardItemData3] = useState<CardItemType>({
    img: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
    title: "apple",
    discription: "luxurious brand",
  });
 
  console.log("ok");
  
  const navigate = useNavigate();

  return (
    <div className="w-[100%]">
          
          

      <header className="w-full mt-2 sm:mt-0 p-2 sm:p-1  lg:flex-row  flex-col sm:h-full md:p-8 shadow-xl relative">
        <div className=" sm:mt-5 xl:mt-0 md:mt-4">
          <img
            className="w-full h-[300px]  sm:h-full object-cover"
            src="https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1536/cms/41f4JcME9BHuk5l85SVpgX/763de15cb9227d5520821161a1223e0b/24Q2-TreeRunnerGo-Q2-Hero-Desktop-3840___1439-02__1_.jpg"
            alt="Banner"
          />
        </div>

        <div className="shadow-indigo-800 absolute hidden md:block py-5 bg-white top-[40%]  p-4">
          <h4 className="font-semibold mb-5 ml-4 font-custom">FEATURED</h4>
          <ul className="flex-col  ml-4 font-mono">
            <li className="hover:text-emerald-800 hover:font-bold py-1">
              Cloths
            </li>
            <li className="py-1 hover:text-emerald-800 hover:font-bold">
              Electronics
            </li>
            <li className="py-1 hover:text-emerald-800 hover:font-bold">
              All Product
            </li>
          </ul>
        </div>

        <div className="absolute flex   sm:ml-32  lg:mr-5 flex-col sm:items-center  top-[30%] sm:top-[40%] md:left-[20%]   xl:ml-[40%]  text-center text-white">
          <h1 className=" sm:text-2xl  font-custom md:text-5xl font-extrabold mb-2">
            New: Tree Runner Go
          </h1>
          <p className="md:text-xl sm:text-md font-medium px-2">
            super packable. ultra wearable. perfect travel able
          </p>
          <div className="flex justify-center  md:mt-3  md:mr-8 md:w-full">
            <button
              onClick={() => navigate("/category")}
              className="xl:p-2 text-xs p-[2px]  md:p-1 sm:p-[5px]  sm:text-base  hover:bg-slate-800 hover:text-white mr-5  text-black font-semibold bg-white rounded xl:text-[18px] shadow-xl md:mr-10 h-[40px]"
            >
              Show category
            </button>
            <button
              onClick={() => navigate("/shopeAll")}
              className="xl:p-2 text-xs p-[2px]  md:p-1 sm:p-[5px]  sm:text-base bg-white hover:bg-slate-800 text-black hover:text-white  font-semibold rounded  shadow-lg "
            >
              Shop All Products
            </button>
          </div>
        </div>
      </header>

      <section className="mt-10 mb-5 text-center">
        <h1 className="font-serif font-bold sm:text-2xl md:text-3xl">
          Our Favorites
        </h1>
        <div className="flex justify-center gap-2  sm:gap-3 sm:text-base md:gap-40 mt-4">
          <button
            onClick={() => [
              setCardItemData1({
                img: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
                title: "Smart Phone",
                discription: "Sleek Device",
              }),
              setCardItemData2({
                img: "https://cdn.dummyjson.com/product-images/9/1.jpg",
                title: "laptop",
                discription: "Elegant Gadget         ",
              }),
              setCardItemData3({
                img: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
                title: "apple",
                discription: "luxurious brand",
              }),
            ]}
            className="font-serif md:text-2xl sm:text-xl  hover:underline hover:border-blue-500"
          >
            Electronics
          </button>
          <button
            onClick={() => [
              setCardItemData1({
                img: "https://cdn.dummyjson.com/product-images/14/thumbnail.jpg",
                title: "fragrances",
                discription: "Glamorous Potions  ",
              }),
              setCardItemData2({
                img: "https://cdn.dummyjson.com/product-images/13/thumbnail.webp",
                title: "fragrances",
                discription: "Elegant Elixir ",
              }),
              setCardItemData3({
                img: "https://cdn.dummyjson.com/product-images/18/thumbnail.jpg",
                title: "oil",
                discription: "Glamorous Potions  ",
              }),
            ]}
            className="font-serif md:text-2xl sm:text-xl hover:underline hover:border-blue-500"
          >
            Cosmotic
          </button>
          <button
            onClick={() => navigate("/shopeAll")}
            className="font-serif md:text-2xl sm:text-xl hover:underline hover:border-blue-500"
          >
            All Products
          </button>
        </div>
        
      </section>
      <hr className="mt-1" />
      <section className=" mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <CardItems cardItemData={cardItemData1} />
          <CardItems cardItemData={cardItemData2} />
          <CardItems cardItemData={cardItemData3} />
        </div>
      </section>

      <hr />
      <section className="">
        <Videoplayer />
      </section>

      <hr />

      <section className=" mt-5 mb-5 ">
        <SliderPage/>
      </section>

      <hr />

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
