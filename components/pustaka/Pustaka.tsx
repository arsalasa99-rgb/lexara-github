
import React, { useState, useEffect, useRef } from 'react';
import { LAW_DOCUMENTS } from '../../constants';
import { useAppState } from '../../hooks/useAppState';
import Icon from '../common/Icon';
import { LawDocument } from '../../types';

const Pustaka: React.FC = () => {
  const { state, dispatch } = useAppState();
  const currentView = state.history[state.history.length - 1];
  
  const [searchQuery, setSearchQuery] = useState(currentView.pustakaSearchQuery || '');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current && currentView.pustakaScrollPos) {
      listRef.current.scrollTop = currentView.pustakaScrollPos;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        dispatch({
          type: 'SET_PUSTAKA_STATE',
          payload: { scrollPos: listRef.current.scrollTop, searchQuery }
        });
      }
    };

    const currentRef = listRef.current;
    currentRef?.addEventListener('scroll', handleScroll);
    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, [dispatch, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Also update state immediately for persistence
     if (listRef.current) {
        dispatch({
          type: 'SET_PUSTAKA_STATE',
          payload: { scrollPos: listRef.current.scrollTop, searchQuery: e.target.value }
        });
      }
  };

  const filteredDocuments = LAW_DOCUMENTS.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    (acc[doc.category] = acc[doc.category] || []).push(doc);
    return acc;
  }, {} as Record<string, LawDocument[]>);

  const handleSelectDocument = (lawId: string) => {
    dispatch({ type: 'NAVIGATE_TO', payload: { view: 'documentDetail', params: { lawId } } });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#8B1E3F]">Pustaka UU & RUU</h2>
        <button onClick={() => dispatch({ type: 'GO_BACK' })} className="flex items-center text-gray-600 hover:text-[#8B1E3F] transition">
          <Icon name="ChevronLeft" className="w-5 h-5" />
          <span className="ml-1 font-semibold">Kembali ke Beranda</span>
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari dokumen hukum..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E5C07B] focus:border-[#E5C07B] transition"
        />
      </div>

      <div ref={listRef} className="overflow-y-auto flex-grow pr-2">
        {Object.entries(groupedDocuments).map(([category, docs]) => (
          <div key={category} className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 border-b-2 border-[#E5C07B] pb-2 mb-4">{category}</h3>
            <div className="space-y-4">
              {docs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => handleSelectDocument(doc.id)}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:border-l-4 hover:border-[#8B1E3F] transition-all duration-200 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-[#8B1E3F]">{doc.title}</h4>
                      <p className="text-gray-600 mt-1">{doc.shortDescription}</p>
                    </div>
                    <span className="text-sm bg-[#E5C07B] text-[#8B1E3F] font-bold px-3 py-1 rounded-full whitespace-nowrap ml-4">{doc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pustaka;
