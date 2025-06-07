
import Footer from '../components/Footer';
import HeaderHome from '../components/HeaderHome'; // Assurez-vous que le chemin est correct
import  Testimonials from '../components/Testimonials'; // Assurez-vous que le chemin est correct

const HomePage = () => {

    
  return (
    <div className="homepage">
      {/* Header */}
      <HeaderHome />

      {/* Hero Section */}
        <section className="relative h-screen text-center">
        <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/heroVideo.mp4"
            autoPlay
            loop
            muted
        ></video>
        <div className="absolute inset-0 bg-bgcustom-green opacity-50"></div> {/* Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full">
            <h1 className="text-white text-5xl md:text-6xl font-bold">
            The Easiest Way To Get Your New Job
            </h1>
            <p className="text-gray-300 mt-4 text-lg">
            Each month, more than 7 million job seekers turn to website in their search.
            </p>
        </div>
        </section>


     {/* Job Categories Section */}
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold">Find job by category</h2>
      <p className="text-gray-500 mt-2 mb-10">
        Open lesser winged midst wherein may morning
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: 'Accounting & Finance', jobs: 250, icon: '🧮' },
          { name: 'Production & Operation', jobs: 250, icon: '🏭' },
          { name: 'Telecommunication', jobs: 250, icon: '📞' },
          { name: 'Garments & Textile', jobs: 250, icon: '👕' },
          { name: 'Marketing And Sales', jobs: 250, icon: '📣' },
          { name: 'Engineer & Architect', jobs: 250, icon: '👷' },
          { name: 'Design & Creative', jobs: 250, icon: '🎨' },
          { name: 'Customer Support', jobs: 250, icon: '🤝' }
        ].map((category, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:-translate-y-3 hover:shadow-2xl hover:bg-blue-100 hover:text-blue-900"
          >
            <div className="text-5xl mb-4 transition-transform transform hover:scale-110">
              {category.icon}
            </div>
            <h3 className="mt-2 text-xl font-semibold">{category.name}</h3>
            <p className="text-gray-400 mt-2">{category.jobs} Open Job</p>
          </div>
        ))}
      </div>
    </section>


     {/* Testimonials Section */}
        <section className="py-16 bg-white text-center">
             <Testimonials />
        </section>

         {/* Job Section */}
          <section 
            className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-white"
            style={{ backgroundImage: `url('/equipe.png')` }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay pour obscurcir l'image */}

            <div className="relative z-10 text-center">
              <h1 className="text-4xl font-bold text-bgcustom-green">Your Dream Job</h1>
              <p className="text-xl mt-2">Is Waiting For You</p>
              <div className="mt-6 flex justify-center space-x-4">
                <a href='/register' className="bg-bg-transparent text-white  border-2 border-bgcustom-green hover:bg-bgcustom-green   font-bold py-3 px-6  shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Find Jobs
                </a>
                <a href='/register' className="bg-bgcustom-green text-white border-2 border-bgcustom-green hover:bg-transparent hover:text-bgcustom-green font-bold py-3 px-6  shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Hire Provider
                </a>
              </div>
            </div>
          </section>


          {/* Recent Blog Section */}
        <section className="py-16 bg-white text-center" id='blog'>
        <h2 className="text-3xl font-bold">Recent Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
            {[
            {
                title: '7 Factors For Choosing Between Two Jobs',
                date: 'April 15, 2019',
                comments: '2 Comments',
                image: '/public/image_1.jpg'
            },
            {
                title: 'How To Write A Creative Cover Letter',
                date: 'April 15, 2019',
                comments: '2 Comments',
                image: '/public/image_2.jpg'
            },
            {
                title: 'The Right Way To Quit A Job You Started',
                date: 'April 15, 2019',
                comments: '2 Comments',
                image: '/public/image_3.jpg'
            }
            ].map((blog, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-lg">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-t-lg"/>
                <div className="p-6">
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-gray-500 mt-2">{blog.date} | <a href="#" className="text-bgcustom-green">{blog.comments}</a></p>
                </div>
            </div>
            ))}
        </div>
        </section>

            <div>
                <Footer/>
            </div>
    </div>
  );
};

export default HomePage;
