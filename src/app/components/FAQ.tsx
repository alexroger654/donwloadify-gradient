import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Is this video downloader completely free?',
    answer: 'Yes! Our video downloader is 100% free to use with no hidden fees, subscriptions, or limitations. You can download unlimited videos from all supported platforms.',
  },
  {
    question: 'What video quality options are available?',
    answer: 'We support multiple quality options including 360p, 720p, 1080p, and up to 4K resolution depending on the original video quality. You can choose the quality that best fits your needs.',
  },
  {
    question: 'Which platforms do you support?',
    answer: 'We currently support YouTube, TikTok, Instagram, Facebook, Twitter, LinkedIn, Twitch, and Vimeo. We\'re constantly adding support for new platforms based on user requests.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account required! You can start downloading videos immediately without any registration or sign-up process. Just paste the URL and download.',
  },
  {
    question: 'Is it safe to use this service?',
    answer: 'Absolutely! We use SSL encryption to protect your privacy and don\'t store any of your personal information or downloaded content. Your data is completely secure.',
  },
  {
    question: 'Are there any download limits?',
    answer: 'No limits at all! You can download as many videos as you want, whenever you want. Our service is designed to be unlimited and always available.',
  },
  {
    question: 'How fast are the downloads?',
    answer: 'Our optimized servers ensure lightning-fast downloads. Most videos are processed and ready for download within seconds, depending on the video size and your internet connection.',
  },
  {
    question: 'Can I download private videos?',
    answer: 'We can only download publicly available videos that you have access to view. Private or restricted content cannot be downloaded for privacy and copyright reasons.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Everything you need to know about our video downloader
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-all duration-300 group"
              >
                <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-white/90 transition-colors duration-300">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center transition-transform duration-300">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </button>
              
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-6 pb-6">
                  <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent mb-4"></div>
                  <p className="text-white/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-white/80 mb-6">
              We're here to help! Reach out to our friendly support team.
            </p>
            <button 
              className="px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{background: 'linear-gradient(108deg, rgba(0, 158, 226, .9) -57.13%, #8b2fff 11.08%, rgba(245, 5, 79, .9) 102.57%)'}}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;