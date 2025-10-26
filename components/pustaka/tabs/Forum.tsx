
import React, { useState, useEffect } from 'react';
import { LawDocument, ForumComment, User, UserRole } from '../../../types';
import { FORUM_DATA, USERS } from '../../../constants';
import { useAppState } from '../../../hooks/useAppState';
import Icon from '../../common/Icon';
import { getDefaultDocState } from '../../../hooks/useAppState';

interface ForumProps {
  law: LawDocument;
}

const Comment: React.FC<{ comment: ForumComment, level: number }> = ({ comment, level }) => {
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.Ahli: return 'bg-[#E5C07B] text-black';
      case UserRole.Pemerintah: return 'bg-[#8B1E3F] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`transition-all duration-300 ${level > 0 ? 'ml-8 pl-4 border-l-2 border-gray-200' : ''}`}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${getRoleBadgeColor(comment.author.role)}`}>
            {comment.author.name.charAt(0)}
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-800">{comment.author.name}</span>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getRoleBadgeColor(comment.author.role)}`}>{comment.author.role}</span>
              </div>
              <span className="text-xs text-gray-500">{comment.timestamp}</span>
            </div>
            {comment.linkedArticle && <p className="text-xs text-gray-500 mt-1 italic">Membahas: {comment.linkedArticle}</p>}
            <p className="text-gray-700 my-2">{comment.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <button className="flex items-center space-x-1 hover:text-[#8B1E3F]"><Icon name="ThumbsUp" className="w-4 h-4"/> <span>{comment.upvotes}</span></button>
              <button className="flex items-center space-x-1 hover:text-[#8B1E3F]"><Icon name="MessageSquare" className="w-4 h-4"/> <span>Balas</span></button>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {comment.replies.map(reply => <Comment key={reply.id} comment={reply} level={level + 1} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Forum: React.FC<ForumProps> = ({ law }) => {
  const { state, dispatch } = useAppState();
  const docState = state.documents[law.id] || getDefaultDocState();
  const comments = FORUM_DATA[law.id] || [];
  
  useEffect(() => {
    const draft = docState.forumCommentDraft;
    if (draft) {
      if (window.confirm("Lanjutkan edit draft sebelumnya?")) {
        // Text is already in the textarea via state
      } else {
        dispatch({ type: 'CLEAR_DOC_FORUM_DRAFT', payload: { lawId: law.id } });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_DOC_FORUM_DRAFT', payload: { lawId: law.id, draft: e.target.value } });
  };
  
  const handlePostComment = () => {
    // Mock posting
    console.log("Posting comment:", docState.forumCommentDraft);
    alert("Komentar berhasil dikirim (simulasi).");
    dispatch({ type: 'CLEAR_DOC_FORUM_DRAFT', payload: { lawId: law.id } });
  };

  return (
    <div className="animate-fade-in bg-[#FFF5EC] p-2 md:p-6 rounded-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Forum Diskusi</h3>
      
      {state.currentUser ? (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <textarea
            value={docState.forumCommentDraft}
            onChange={handleDraftChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#E5C07B] focus:border-[#E5C07B]"
            rows={3}
            placeholder={`Beri komentar sebagai ${state.currentUser.name} (${state.currentUser.role})...`}
          />
          <div className="text-right mt-2">
            <button onClick={handlePostComment} disabled={!docState.forumCommentDraft} className="bg-[#8B1E3F] text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 disabled:bg-gray-400 transition">
              Kirim Komentar
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6" role="alert">
          <p className="font-bold">Anda harus masuk untuk berpartisipasi.</p>
          <p>Silakan <button onClick={() => dispatch({type: 'SHOW_LOGIN', payload: true})} className="font-bold underline hover:text-yellow-800">masuk</button> untuk mengirim komentar, membalas, dan memberikan suara.</p>
        </div>
      )}
      
      <div className="space-y-6">
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} level={0} />
        ))}
      </div>
    </div>
  );
};

export default Forum;
