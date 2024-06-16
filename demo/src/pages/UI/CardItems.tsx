import React from "react";
import { CardItemType } from "../Home";
import { useNavigate } from "react-router-dom";

type CardItemData = {
  cardItemData: CardItemType;
};

const CardItems: React.FC<CardItemData> = ({ cardItemData }) => {
  const navigate = useNavigate();

  function clickHandler(title: string) {
    switch (title) {
      case "Smart Phone":
        navigate("/phone");
        break;
      case "apple":
        navigate("/pc");
        break;
      case "laptop":
        navigate("/pc");
        break;
      case "fragrances":
        navigate("/cosmotic");
        break;
      case "oil":
        navigate("/oil");
        break;
      default:
        navigate("/oil");
    }
  }

  return (
    <div className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg m-4 bg-white">
      <div className="relative">
        <img
          className="transition-opacity hover:opacity-80 w-full h-56 object-cover"
          src={cardItemData.img}
          alt={cardItemData.title}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-black bg-opacity-50">
          <button
            onClick={() => {
              clickHandler(cardItemData.title);
            }}
            className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
          >
            Shop Now
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-semibold text-xl mb-2 text-gray-900">
          {cardItemData.title}
        </div>
        <hr />
        <p className="text-gray-700 mt-2 text-base">
          {cardItemData.discription}
        </p>
      </div>
    </div>
  );
};

export default CardItems;
