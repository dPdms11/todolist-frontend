import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import Footer from 'components/layout/Footer';
import { useConfigCheck } from 'hooks/useConfigCheck ';


/**
 * The main application component that sets up routing for the app.
 * Uses React Router to define routes and render different components based on the URL.
 * 
 * @returns {React.FC} The App component.
 */
const App: React.FC = () => {
  const configError = useConfigCheck();

  if (configError){
    console.error('CONFIGURAITON ERROR');
    return;
  } 

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="*" element={<TodoList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;