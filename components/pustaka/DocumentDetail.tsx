
import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { LAW_DOCUMENTS } from '../../constants';
import Icon from '../common/Icon';
import PasalInti from './tabs/PasalInti';
import Analisis from './tabs/Analisis';
import Blockchain from './tabs/Blockchain';
import Forum from './tabs/Forum';
import { getDefaultDocState } from '../../hooks/useAppState';

interface DocumentDetailProps {
  lawId: string;
}

const DocumentDetail: React.FC<DocumentDetailProps> = ({ lawId }) => {
  const { state, dispatch } = useAppState();
  const law = LAW_DOCUMENTS.find(d => d.id === lawId);
  const docState = state.documents[lawId] || getDefaultDocState();

  if (!law) {
    return <div>Dokumen tidak ditemukan.</div>;
  }

  const handleTabClick = (tab: 'pasal' | 'analisis' | 'blockchain' | 'forum') => {
    dispatch({ type: 'SET_DOC_TAB', payload: { lawId, tab } });
  };
  
  const tabs = [
    { id: 'pasal', label: 'Pasal Inti' },
    { id: 'analisis', label: 'Analisis Multidisipliner' },
    { id: 'blockchain', label: 'Timeline Blockchain' },
    { id: 'forum', label: 'Forum Diskusi' },
  ];

  const renderTabContent = () => {
    switch (docState.activeTab) {
      case 'pasal':
        return <PasalInti law={law} />;
      case 'analisis':
        return <Analisis law={law} />;
      case 'blockchain':
        return <Blockchain law={law} />;
      case 'forum':
        return <Forum law={law} />;
      default:
        return <PasalInti law={law} />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => dispatch({ type: 'GO_BACK' })} className="flex items-center text-gray-600 hover:text-[#8B1E3F] transition">
          <Icon name="ChevronLeft" className="w-5 h-5" />
          <span className="ml-1 font-semibold">Kembali ke Pustaka</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-[#8B1E3F]">{law.title}</h2>
        <p className="text-gray-500 mt-1">Kategori: {law.category}</p>
        <div className="border-b border-gray-200 mt-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as any)}
                className={`${
                  docState.activeTab === tab.id
                    ? 'border-[#8B1E3F] text-[#8B1E3F]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-6">
            {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
