
import React, { useState, useRef, useEffect } from 'react';
import { LawDocument, ChatMessage } from '../../../types';
import { ANALYSIS_DATA } from '../../../constants';
import Icon from '../../common/Icon';
import { getAiAnalysis, getExternalAnalysis, getGoogleSearchSummary } from '../../../services/geminiService';
import { useAppState } from '../../../hooks/useAppState';
import { getDefaultDocState } from '../../../hooks/useAppState';


interface AnalisisProps {
  law: LawDocument;
}

const Analisis: React.FC<AnalisisProps> = ({ law }) => {
  const { state, dispatch } = useAppState();
  const docState = state.documents[law.id] || getDefaultDocState();
  const analysisList = ANALYSIS_DATA[law.id] || [];
  
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSubAction, setActiveSubAction] = useState<string | null>(null);
  const [subActionResult, setSubActionResult] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [docState.chatHistory, isLoading, subActionResult]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_DOC_CHAT_INPUT', payload: { lawId: law.id, input: e.target.value } });
  };

  const handleSendMessage = async () => {
    if (!docState.chatInput.trim() || isLoading) return;
    
    const userMessage: ChatMessage = { sender: 'user', text: docState.chatInput };
    dispatch({ type: 'ADD_DOC_CHAT_MESSAGE', payload: { lawId: law.id, message: userMessage } });
    dispatch({ type: 'SET_DOC_CHAT_INPUT', payload: { lawId: law.id, input: '' } });
    setIsLoading(true);
    setSubActionResult(null);
    setActiveSubAction(null);

    const aiResponseText = await getAiAnalysis(docState.chatInput, law.title);
    const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText, options: ['externalAI', 'googleSearch'] };
    dispatch({ type: 'ADD_DOC_CHAT_MESSAGE', payload: { lawId: law.id, message: aiMessage } });
    setIsLoading(false);
  };

  const handleSubAction = async (action: 'externalAI' | 'googleSearch') => {
      setActiveSubAction(action);
      let result = '';
      if (action === 'externalAI') {
          result = await getExternalAnalysis();
      } else {
          result = await getGoogleSearchSummary();
      }
      setSubActionResult(result);
      setActiveSubAction(null);
  }

  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left side: Analysis Cards */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Analisis Multidisipliner</h3>
        {analysisList.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-2">
              <span className="text-[#8B1E3F]"><Icon name={item.icon} className="w-6 h-6"/></span>
              <h4 className="ml-3 font-bold text-lg text-[#8B1E3F]">{item.discipline}</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">{item.summary}</p>
            <button onClick={() => setSelectedAnalysis(item.fullAnalysis)} className="text-sm font-semibold text-[#8B1E3F] hover:underline">Baca Selengkapnya</button>
          </div>
        ))}
      </div>

      {/* Right side: AI Lexara Chat */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col h-[70vh]">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b pb-2">Tanya AI Lexara</h3>
        <div className="flex-grow overflow-y-auto p-2 space-y-4">
          {docState.chatHistory.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${msg.sender === 'user' ? 'bg-[#8B1E3F] text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.sender === 'ai' && msg.options && (
                    <div className="mt-3 border-t border-gray-300 pt-2 flex space-x-2">
                        <button onClick={() => handleSubAction('externalAI')} disabled={!!activeSubAction} className="text-xs bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded">
                            {activeSubAction === 'externalAI' ? 'Memuat...' : 'Penjelasan AI Eksternal'}
                        </button>
                        <button onClick={() => handleSubAction('googleSearch')} disabled={!!activeSubAction} className="text-xs bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded">
                            {activeSubAction === 'googleSearch' ? 'Mencari...' : 'Cari di Google'}
                        </button>
                    </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs p-3 rounded-lg bg-gray-200 text-gray-800">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          {subActionResult && (
             <div className="flex justify-start">
                <div className="max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg bg-blue-100 text-gray-800 border-l-4 border-blue-500">
                    <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: subActionResult.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></p>
                </div>
             </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="mt-4 border-t pt-4 flex items-center">
          <textarea
            value={docState.chatInput}
            onChange={handleInputChange}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
            placeholder="Tanyakan apapun tentang dokumen ini..."
            className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-[#E5C07B] focus:border-[#E5C07B] resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button onClick={handleSendMessage} disabled={isLoading || !docState.chatInput.trim()} className="bg-[#8B1E3F] text-white p-3 rounded-r-md disabled:bg-gray-400 hover:bg-opacity-90 transition">
            <Icon name="Send" className="w-6 h-6"/>
          </button>
        </div>
      </div>

      {/* Analysis Detail Overlay */}
      {selectedAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedAnalysis(null)}>
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-[#8B1E3F] mb-4">Analisis Lengkap</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedAnalysis}</p>
            <button onClick={() => setSelectedAnalysis(null)} className="mt-6 bg-[#8B1E3F] text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition">Kembali</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analisis;
