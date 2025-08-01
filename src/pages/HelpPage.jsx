import NavBar from '../components/NavBar/NavBar';
import { FaChevronDown } from 'react-icons/fa';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: "An account can be opened through the login portal, by selecting 'Don't have an account'.",
    },
    {
      question: 'Can an account be used by more than one person?',
      answer: 'No, only one person should have access to an account.',
    },
    {
      question: 'Can I watch a movie more than one time?',
      answer: 'Yes, you can watch a movie as many times as you want during your rental period.',
    },
    {
      question: 'Am I allowed to use multiple devices?',
      answer: 'Yes, you can log on and watch on multiple devices but not at the same time.',
    },
    {
      question: 'Will more movies be added?',
      answer: 'Yes, we intend to add more movies in the future, although there is not a fixed date for this.',
    },
  ];

  return (
    <div className='bg-slate-900 min-h-screen text-slate-50 font-inter'>
      <NavBar />
      <main className='max-w-4xl mx-auto px-4 py-20'>
        <h1 className='text-4xl font-bold text-center mb-12'>Help & FAQ</h1>

        <section className='space-y-6'>
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className='group bg-[#0f79af] rounded-lg shadow-md transition duration-300 open:shadow-lg open:ring-2 open:ring-[#32b9e7] overflow-hidden'
            >
              <summary className='flex items-center justify-between cursor-pointer px-5 py-4 text-lg font-semibold text-white transition-all group-open:bg-[#128ac9]'>
                {faq.question}
                <FaChevronDown className='transition-transform duration-300 group-open:rotate-180' />
              </summary>
              <div className='px-5 pb-4 text-white text-sm leading-relaxed'>
                <em>{faq.answer}</em>
              </div>
            </details>
          ))}
        </section>
      </main>
    </div>
  );
}
