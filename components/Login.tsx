
import React, { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import { USERS } from '../constants';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const { dispatch } = useAppState();
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.Warga);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let userToLogin;
    switch (selectedRole) {
      case UserRole.Warga:
        userToLogin = USERS['user1'];
        break;
      case UserRole.Ahli:
        userToLogin = USERS['user2'];
        break;
      case UserRole.Pemerintah:
        userToLogin = USERS['user3'];
        break;
      default:
        userToLogin = USERS['user1'];
    }
    dispatch({ type: 'LOGIN', payload: userToLogin });
  };

  const handleClose = () => {
    dispatch({ type: 'SHOW_LOGIN', payload: false });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-[#FFF5EC] p-10 rounded-xl shadow-2xl w-full max-w-md m-4 relative animate-scale-in">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#8B1E3F]">Masuk ke Lexara.id</h2>
            <p className="text-gray-600 mt-2">Pilih peran Anda untuk berpartisipasi.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email (Simulasi)</label>
            <input type="email" id="email" defaultValue="demouser@lexara.id" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#E5C07B] focus:border-[#E5C07B] transition" />
          </div>
          <div className="mb-8">
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-2">Password (Simulasi)</label>
            <input type="password" id="password" defaultValue="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#E5C07B] focus:border-[#E5C07B] transition" />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Masuk sebagai</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(UserRole).map(role => (
                <button
                  type="button"
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${selectedRole === role ? 'bg-[#8B1E3F] text-white ring-2 ring-offset-2 ring-[#E5C07B]' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full bg-[#8B1E3F] text-white py-3 rounded-md font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
