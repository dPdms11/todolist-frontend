import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToDo } from 'types/types';

/**
 * TodoDetails component displays the details of a specific Todo item.
 * It fetches the Todo details based on the ID from the URL parameters.
 * Handles loading state and potential errors during data fetching.
 *
 * @returns {React.FC} The ToDoDetails component.
 */
const ToDoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the ID from URL parameters
  const navigate = useNavigate();
  
  const [todo, setTodo] = useState<ToDo | null>(null); // State to store the fetched ToDo
  const [loading, setLoading] = useState<boolean>(true); // State to indicate loading status

  useEffect(() => {
    if (id) {
      fetch(`${process.env.TODO_BACKEND_API_URL}/todos/${id}`)
        .then(response => response.json())
        .then(data => {
          setTodo(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching todo details:', error); 
          setLoading(false); 
        });
    }
  }, [id]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {loading ? (
        <p>Loading...</p>
      ) : todo ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">{todo.title}</h2>
          <p className="mb-4">{todo.description || 'No description available.'}</p>
          <p className="mb-4">Status: {todo.completed ? 'Completed' : 'Not Completed'}</p>
          {todo.priority !== undefined && (
            <p className="mb-4">Priority: {todo.priority === 1 ? 'High' : todo.priority === 2 ? 'Medium' : 'Low'}</p>
          )}
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to List
          </button>
        </>
      ) : (
        <p>Todo not found.</p>
      )}
    </div>
  );
}

export default ToDoDetails;
