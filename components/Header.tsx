
import React from 'react';
import { useAppState } from '../hooks/useAppState';
import { UserRole } from '../types';

const Header: React.FC = () => {
  const { state, dispatch } = useAppState();

  const handleLogin = () => dispatch({ type: 'SHOW_LOGIN', payload: true });
  const handleLogout = () => dispatch({ type: 'LOGOUT' });
  
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.Ahli: return 'bg-[#E5C07B] text-black';
      case UserRole.Pemerintah: return 'bg-[#8B1E3F] text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <header className="bg-[#8B1E3F] text-white shadow-lg relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-repeat opacity-10" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E5C07B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}
      ></div>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => dispatch({ type: 'NAVIGATE_TO', payload: { view: 'home', params: {} } })}>
          <div className="bg-[#E5C07B] p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8B1E3F]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 13.5l-3-3 1.41-1.41L8.5 12.67l4.59-4.59L14.5 9.5l-6 6z" style={{ display: 'none' }}/>
              <path d="M3.75 6.38h16.5M3.75 17.62h16.5M7.88 2L5.25 22h-1.5L1.12 2h1.5l1.69 13.25L7.88 2zM18.75 2l2.63 20h1.5L25.5 2h-1.5l-1.69 13.25L18.75 2zM12 4.5a3.38 3.38 0 00-3.38 3.38V12h6.75V7.88A3.38 3.38 0 0012 4.5z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-[#E5C07B]">LEXARA.ID</h1>
        </div>

        <div className="flex items-center space-x-4">
          {state.currentUser ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline">{state.currentUser.name}</span>
                <span className={`px-2 py-1 text-xs font-bold rounded ${getRoleBadgeColor(state.currentUser.role)}`}>{state.currentUser.role}</span>
              </div>
              <button onClick={handleLogout} className="bg-[#E5C07B] text-[#8B1E3F] px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition">
                Keluar
              </button>
            </>
          ) : (
            <button onClick={handleLogin} className="bg-[#E5C07B] text-[#8B1E3F] px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition">
              Masuk
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
