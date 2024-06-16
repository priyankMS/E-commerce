import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const SliderPage = () => {
  const UserData = [
    {
      id: 1,
      img: "https://i.pravatar.cc/250?img=6",
      name: "John Doe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      img: "https://i.pravatar.cc/250?img=6",
      name: "John Doe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      img: "https://i.pravatar.cc/250?img=6",
      name: "John Doe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      img: "https://i.pravatar.cc/250?img=6",
      name: "John Doe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      img: "https://i.pravatar.cc/250?img=6",
      name: "John Doe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      img: "https://i.pravatar.cc/250?img=6",
      name: "John Doe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-5 mb-5">
      <div className="shadow-md bg-slate-600 md:p-5 sm:p-3 w-[95%] mx-auto">
        <Slider {...settings}>
          {UserData.map((item) => (
            <div
              key={item.id}
              className="shadow-lg border border-gray-700 rounded-t-md p-5 bg-slate-300 md:h-60"
            >
              <div className="flex items-center justify-center">
                <img
                  src={item.img}
                  alt="user"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="text-center mt-2">
                <h2 className="xl:text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-500 text-sm truncate">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderPage;
