import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToDo } from 'types/types';

/**
 * ToDoEdit component allows updates to the details of a specific Todo item.
 * It fetches the Todo details based on the ID from the URL parameters.
 * Handles loading state and potential errors during data fetching.
 *
 * @returns {React.FC} The ToDoEdit component.
 */
const ToDoEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the ID from URL parameters
  const navigate = useNavigate();
  
  const [todo, setTodo] = useState<ToDo | null>(null); // State to store the fetched ToDo
  const [loading, setLoading] = useState<boolean>(true); // State to indicate loading status

  /**
   * Handles the form submission.
   * Prevents the default form submission behavior, sets loading state to true,
   * and sends a PUT request to the backend to update Todo item.
   * Updates the form state and loading status based on the response.
   * 
   * @param event - The form submission event
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form behavior

    setLoading(true); // Set loading to true when submission starts

    fetch(`${process.env.TODO_BACKEND_API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
      .then(response => response.json())
      .then(() => {
        setLoading(false); // Set loading to false after submission completes
      })
      .catch(error => {
        console.error('Error adding todo:', error); // Log any errors
        setLoading(false); // Set loading to false if an error occurs
      });
  };

  // Handle changes to form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTodo((prevFormData: any) => ({
      ...prevFormData,
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

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
    <div>
      {loading ? (
      <p>Loading...</p>
      ) : todo ? (
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col items-stretch mb-6 p-4 bg-white shadow-lg rounded-lg"
        >
          <div className="flex">
            <input
              type="text"
              name="title"
              value={todo.title}
              onChange={handleChange}
              placeholder="Title"
              className="p-3 border border-gray-300 rounded-md mb-3 w-full"
              disabled={loading}
              required
            />
            <div className="flex flex-col px-4">
              <label htmlFor="completed" className="pb-1">Completed?</label>
              <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={todo.completed}
                // Update state of item completion
                onChange={() => setTodo((prevTodo: any) => ({
                  ...prevTodo,
                  completed: !prevTodo.completed,
                  })
                )}
                className={`px-4 py-3 h-5`}
                disabled={loading} // Disable button when loading
              />
            </div>
          </div>
          <textarea
            name="description"
            value={todo.description}
            onChange={(handleChange)}
            placeholder="Description"
            className="p-3 border border-gray-300 rounded-md mb-3 w-full"
            rows={3}
            disabled={loading} 
          />
          <select
            name="priority"
            value={todo.priority}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md mb-4 w-full"
            disabled={loading} // Disable select when loading
            required // Make this field required
          >
            <option value="">Select priority</option> {/* Default option */}
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
          <button
            type="submit"
            className={`px-4 py-3 rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Saving...' : 'Save'} {/* Show loading text */}
          </button>
        </form>
      ) : (
        <p>Todo not found.</p>
    )}
    </div>
  );
}

export default ToDoEdit;
