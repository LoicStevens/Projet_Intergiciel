
import Slider from 'react-slick';

const AffiliatePartners = () => {
    const partners = [
        { id: 1, name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
        { id: 2, name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { id: 3, name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
        { id: 4, name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png' },
        { id: 5, name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
      ];

      const settings = {
        dots: true, // Afficher les points de navigation
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Nombre de logos affichés à la fois
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2, // 2 logos pour les écrans plus petits
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1, // 1 logo pour les très petits écrans
            },
          },
        ],
      };

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-8">Nos Partenaires Affiliés</h2>
      <Slider {...settings}>
        {partners.map((partner) => (
          <div key={partner.id} className="flex items-center justify-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-16 w-auto object-contain p-4" // Applique des styles Tailwind
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};


export default AffiliatePartners;
