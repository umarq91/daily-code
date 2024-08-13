import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://sum-server.100xdevs.com/todos');
        setTodos(response.data.todos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return { todos, loading, error };
}

export default useTodos;
