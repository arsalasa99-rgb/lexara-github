
import React from 'react';
import { useAppState } from '../hooks/useAppState';

const features = [
  {
    title: 'Pustaka UU & RUU',
    description: 'Jelajahi katalog hukum, peraturan pemerintah, dan rancangan undang-undang yang terstruktur.',
    icon: '📚',
    view: 'pustaka',
  },
  {
    title: 'Analisis AI',
    description: 'Dapatkan pemahaman mendalam dari berbagai disiplin ilmu tentang dampak sebuah regulasi.',
    icon: '🔬',
    view: 'pustaka', // Leads to Pustaka first to select a document
  },
  {
    title: 'Blockchain Transparency',
    description: 'Lacak jejak perubahan setiap pasal dan regulasi secara transparan dan terverifikasi.',
    icon: '🔗',
    view: 'pustaka',
  },
  {
    title: 'Forum Diskusi',
    description: 'Bergabung dalam percakapan publik yang konstruktif bersama warga, ahli, dan pemerintah.',
    icon: '💬',
    view: 'pustaka',
  },
];

const Home: React.FC = () => {
  const { dispatch } = useAppState();

  const handleFeatureClick = (view: 'pustaka') => {
    dispatch({ type: 'NAVIGATE_TO', payload: { view, params: {} } });
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-[#8B1E3F] mb-4">Selamat Datang di Lexara.id</h2>
      <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">Platform LegalTech & CivicTech untuk transparansi hukum, analisis mendalam, dan partisipasi publik yang bermakna, berlandaskan kearifan lokal.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            onClick={() => handleFeatureClick(feature.view as 'pustaka')}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-t-4 border-[#8B1E3F]"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-[#8B1E3F] mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
