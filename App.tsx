
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Pustaka from './components/pustaka/Pustaka';
import DocumentDetail from './components/pustaka/DocumentDetail';
import Login from './components/Login';
import { useAppState } from './hooks/useAppState';

const App: React.FC = () => {
  const { state } = useAppState();

  const renderView = () => {
    const currentView = state.history[state.history.length - 1];
    if (!currentView) return <Home />;

    switch (currentView.view) {
      case 'home':
        return <Home />;
      case 'pustaka':
        return <Pustaka />;
      case 'documentDetail':
        return <DocumentDetail lawId={currentView.params.lawId} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5EC] font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <Footer />
      {state.showLogin && <Login />}
    </div>
  );
};

export default App;
