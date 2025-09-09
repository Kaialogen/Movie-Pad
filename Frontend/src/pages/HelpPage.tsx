import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

export default function HelpPage() {
  const faqs: FAQ[] = [
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
    <main className='max-w-4xl mx-auto px-4 py-20 flex-grow'>
      <h1 className='text-4xl font-bold text-center mb-12 text-slate-50'>Help & FAQ</h1>

      <section className='space-y-6'>
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className='group bg-purple-700 rounded-lg shadow-md transition duration-300 open:shadow-lg open:ring-2 open:ring-purple-400 overflow-hidden'
          >
            <summary className='flex items-center justify-between cursor-pointer px-5 py-4 text-lg font-semibold text-white transition-all group-open:bg-purple-800'>
              {faq.question}
              <ChevronDown className='transition-transform duration-300 group-open:rotate-180' />
            </summary>
            <div className='px-5 pb-4 text-white text-sm leading-relaxed'>
              <em>{faq.answer}</em>
            </div>
          </details>
        ))}
      </section>
    </main>
  );
}
