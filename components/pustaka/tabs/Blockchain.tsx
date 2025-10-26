
import React, { useState } from 'react';
import { LawDocument } from '../../../types';
import { BLOCKCHAIN_DATA } from '../../../constants';

interface BlockchainProps {
  law: LawDocument;
}

const Blockchain: React.FC<BlockchainProps> = ({ law }) => {
  const timelineData = BLOCKCHAIN_DATA[law.id] || [];
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(timelineData.length > 0 ? timelineData[timelineData.length - 1].id : null);

  const selectedNode = timelineData.find(node => node.id === selectedNodeId);

  return (
    <div className="animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Timeline */}
      <div className="md:col-span-1">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Timeline Perubahan</h3>
        <div className="relative border-l-2 border-[#E5C07B] pl-6 space-y-8">
          {timelineData.map((node, index) => (
            <div key={node.id} className="relative">
              <div className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full ${selectedNodeId === node.id ? 'bg-[#8B1E3F] ring-4 ring-white' : 'bg-[#E5C07B]'}`}></div>
              <div onClick={() => setSelectedNodeId(node.id)} className="cursor-pointer">
                <p className="font-bold text-sm text-[#8B1E3F]">{node.date}</p>
                <p className="font-semibold text-gray-700">{node.actor}</p>
                <p className="text-sm text-gray-500">{node.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
        {selectedNode ? (
          <div>
            <h3 className="text-xl font-bold text-[#8B1E3F]">Detail Perubahan Node</h3>
            <div className="mt-4 space-y-2 text-sm">
                <p><strong className="text-gray-600 w-24 inline-block">Tanggal:</strong> {selectedNode.date}</p>
                <p><strong className="text-gray-600 w-24 inline-block">Aktor:</strong> {selectedNode.actor}</p>
                <p><strong className="text-gray-600 w-24 inline-block">Hash:</strong> <span className="font-mono bg-gray-100 p-1 rounded text-xs">{selectedNode.hash}</span></p>
            </div>
            
            <div className="mt-6">
                <h4 className="font-bold text-lg mb-2 text-gray-700">Perbandingan Pasal: {selectedNode.changes.article}</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h5 className="font-semibold text-gray-500 border-b pb-1">Sebelum</h5>
                        <div className="mt-2 p-3 bg-red-50 text-red-800 rounded-md text-sm">{selectedNode.changes.before}</div>
                    </div>
                    <div>
                        <h5 className="font-semibold text-gray-500 border-b pb-1">Sesudah</h5>
                        <div className="mt-2 p-3 bg-green-50 text-green-800 rounded-md text-sm">{selectedNode.changes.after}</div>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                 <h4 className="font-bold text-lg mb-2 text-gray-700">Alasan Perubahan</h4>
                 <p className="p-3 bg-blue-50 text-blue-800 rounded-md text-sm">{selectedNode.changes.reason}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Pilih sebuah node pada timeline untuk melihat detail.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blockchain;
