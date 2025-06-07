import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';


const FAQs = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [visibleCustomerFaqCount, setVisibleCustomerFaqCount] = useState(3); // Initially show 3 customer FAQs
  const [visibleProviderFaqCount, setVisibleProviderFaqCount] = useState(3); // Initially show 3 provider FAQs

  const adEspressoFaqs = [
    { question: "How do I create a client account?", answer: "You can create a client account by signing up and filling out the required details." },
    { question: "What should I include in my job post?", answer: "Include details about your project, required skills, and budget to attract qualified providers." },
    { question: "How are providers matched to my job?", answer: "Our platform uses AI to match providers based on skills, experience, and availability." },
    { question: "How do I communicate with providers?", answer: "Once matched, you can use the in-platform messaging system to communicate with providers." },
    { question: "Can I set a budget for my project?", answer: "Yes, you can specify a budget to attract providers who fit within your financial requirements." },
  ];

  const onlineAdvertisingFaqs = [
    { question: "How do I set up a provider profile?", answer: "Sign up as a provider, fill out your profile, and showcase your skills and experience." },
    { question: "How can I apply to jobs?", answer: "Browse job listings, and submit a tailored proposal to showcase your expertise." },
    { question: "How is my profile ranked?", answer: "Profiles are ranked based on activity, client feedback, and experience." },
    { question: "How do I manage my job applications?", answer: "You can track and manage your applications from your dashboard." },
  ];

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-100">
       
      <div className="text-center mb-8 pt-2">
       
        <h2 className="  text-4xl font-bold text-gray-800 ">Do You Have Questions?</h2>
        <p className="text-gray-600 text-lg mt-2">
          We have answers (well, most of the time!)
        </p>
        <p className="text-gray-600 mt-2">
          Below you’ll find answers to the most common questions you may have on Clients & Providers Accounts. If you still can’t find the answer you’re looking for, just{' '}
          <a href="#" className="text-bgcustom-green underline">Contact us</a>!
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <img
          src="/help.png"
          alt="FAQ Icon"
          className="w-48 h-48"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FAQs Customers */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">FAQs Customers</h3>
          <ul className="space-y-3">
            {adEspressoFaqs.slice(0, visibleCustomerFaqCount).map((faq, index) => (
              <li key={index} className="text-gray-600">
                <div className="flex items-center">
                  <span className="bg-bgcustom-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">{index + 1}</span>
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="hover:text-bgcustom-green text-left focus:outline-none w-full"
                  >
                    {faq.question}
                  </button>
                </div>
                {expandedQuestion === index && (
                  <p className="text-gray-500 mt-2 ml-12">{faq.answer}</p>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setVisibleCustomerFaqCount(visibleCustomerFaqCount === adEspressoFaqs.length ? 3 : adEspressoFaqs.length)}
            className="text-bgcustom-green mt-4 flex items-center"
          >
            {visibleCustomerFaqCount === adEspressoFaqs.length ? <FaMinus size={20} /> : <FaPlus size={20} />}
          </button>
        </div>

        {/* FAQs Providers */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">FAQs Providers</h3>
          <ul className="space-y-3">
            {onlineAdvertisingFaqs.slice(0, visibleProviderFaqCount).map((faq, index) => (
              <li key={index} className="text-gray-600">
                <div className="flex items-center">
                  <span className="bg-bgcustom-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">{index + 1}</span>
                  <button
                    onClick={() => toggleQuestion(index + adEspressoFaqs.length)}
                    className="hover:text-bgcustom-green text-left focus:outline-none w-full"
                  >
                    {faq.question}
                  </button>
                </div>
                {expandedQuestion === index + adEspressoFaqs.length && (
                  <p className="text-gray-500 mt-2 ml-12">{faq.answer}</p>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setVisibleProviderFaqCount(visibleProviderFaqCount === onlineAdvertisingFaqs.length ? 3 : onlineAdvertisingFaqs.length)}
            className="text-bgcustom-green mt-4 flex items-center"
          >
            {visibleProviderFaqCount === onlineAdvertisingFaqs.length ? <FaMinus size={20} /> : <FaPlus size={20} />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
