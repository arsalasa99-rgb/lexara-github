
import React from 'react';
import { LawDocument } from '../../../types';

interface PasalIntiProps {
  law: LawDocument;
}

const PasalInti: React.FC<PasalIntiProps> = ({ law }) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Pasal-Pasal Inti</h3>
      <div className="space-y-6">
        {law.coreArticles.map((article, index) => (
          <div key={index} className="bg-[#FFF5EC] p-4 rounded-md border-l-4 border-[#E5C07B]">
            <h4 className="font-bold text-[#8B1E3F]">{article.article}</h4>
            <p className="text-gray-700 mt-2">{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasalInti;
