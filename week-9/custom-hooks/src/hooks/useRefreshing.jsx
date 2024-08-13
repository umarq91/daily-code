// basically user will passs n number of seconds , then the request will go back there 


import React from 'react'

function useRefreshing(n) {
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

      setInterval(() => {
          fetchTodos();
      },n*1000)
    }, [n]);
  
    return { todos, loading, error };
  }



export default useRefreshing