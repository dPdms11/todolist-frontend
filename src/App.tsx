import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import Footer from 'components/layout/Footer';
import { useConfigCheck } from 'hooks/useConfigCheck ';
import TodoForm from 'components/TodoForm';
import ToDoDetails from 'components/TodoDetails';
import ToDoEdit from 'components/TodoEdit';
import Header from 'components/layout/Header';


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
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/list" element={<TodoList />} />
            <Route path="/add" element={<TodoForm />} />
            <Route path="/todos/:id" element={<ToDoDetails />} />
            <Route path="/todos/edit/:id" element={<ToDoEdit />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;