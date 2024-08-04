import React, { useState } from 'react';
import { ToDo } from 'types/types';

/**
 * TodoForm component is used to add new Todo items to the TodoList.
 * It contains a form with input fields for title, description, and priority.
 * Handles form submission and sends a POST request to the backend API to add a new Todo item.
 *
 * @returns {React.FC} The TodoForm component.
 */
const TodoForm: React.FC = () => {
  const [formData, setFormData] = useState<ToDo>({
    id: 0,
    title: '',
    completed: false,
    description: '',
    priority: 1,
  });
  const [loading, setLoading] = useState<boolean>(false); // State to indicate submission status

  /**
   * Handles the form submission.
   * Prevents the default form submission behavior, sets loading state to true,
   * and sends a POST request to the backend to add a new Todo item.
   * Updates the form state and loading status based on the response.
   * 
   * @param event - The form submission event
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form behavior

    setLoading(true); // Set loading to true when submission starts

    fetch(`${process.env.TODO_BACKEND_API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(() => {
        setFormData({ id: 0, completed: false, title: '', description: '', priority: 1 }); // Clear the form data
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
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col items-stretch mb-6 p-4 bg-white shadow-lg rounded-lg"
    >
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-3 border border-gray-300 rounded-md mb-3 w-full"
        disabled={loading}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="p-3 border border-gray-300 rounded-md mb-3 w-full"
        rows={3}
        disabled={loading} 
      />
      <select
        name="priority"
        value={formData.priority}
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
        {loading ? 'Adding...' : 'Add'} {/* Show loading text */}
      </button>
    </form>
  );
}

export default TodoForm;
