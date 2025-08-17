import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer/Footer';

export default function CategoriesPage() {
  const categories = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Drama',
    'Fantasy',
    'Horror',
    'Romance',
    'ScienceFiction',
    'Thriller',
    'Western',
  ];

  return (
    <div className='bg-slate-900 min-h-screen text-slate-50 font-inter flex flex-col'>
      <NavBar />
      <section className='pt-24 px-8 max-w-7xl flex-grow'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-2'>Categories</h1>
          <p className='text-slate-300 text-lg'>Click on a category to view available movies.</p>
        </div>

        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {categories.map((category) => (
            <a
              key={category}
              href='#'
              className='group relative rounded-xl overflow-hidden bg-slate-800 shadow-md hover:shadow-xl transition duration-300'
            >
              <img
                src={`/images/${category}.jpg`}
                alt={category}
                className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
              />
              <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3'>
                <h2 className='text-white text-lg font-semibold'>{category.replace(/([A-Z])/g, ' $1').trim()}</h2>
              </div>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
