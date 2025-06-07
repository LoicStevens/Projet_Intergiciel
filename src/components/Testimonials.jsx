
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Roger Scott',
      position: 'System Analyst',
      quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, atque!',
      image: '/pic1.jpg',
    },
    {
      id: 2,
      name: 'Alice Johnson',
      position: 'Marketing Manager',
      quote: 'Adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/pic1.jpg',
    },
    {
      id: 3,
      name: 'Michael Smith',
      position: 'Interface Designer',
      quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: '/pic1.jpg',
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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className=" py-16 bg-gray-100" id='test'>
      <h2 className="text-center text-3xl font-bold mb-8">Témoignages</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col items-center justify-center  justify-between p-4 bg-white shadow-lg rounded-lg mx-4 my-2 transition-transform transform hover:scale-105  space-x-4 space-y-3"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="h-16 w-16 rounded-full object-cover mb-2"
            />
            <blockquote className="italic text-gray-600 mb-2 text-center truncate "> {/* Réduction du max-w à 200px */}
              &quot;{testimonial.quote}&quot;
            </blockquote>
            <h3 className="text-lg font-bold">{testimonial.name}</h3>
            <p className="text-gray-400">{testimonial.position}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
