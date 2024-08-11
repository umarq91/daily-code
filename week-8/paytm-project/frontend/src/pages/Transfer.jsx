import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

function Transfer() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const navigate = useNavigate();
  const transfer = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/account/transfer',
        { to: id, amount: input },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (res.status === 200) {
        setSuccess(res.data.message);
setInput('')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
        <Link to={"/dashboard"} className=' text-center mt-10'> Go back </Link>
          
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name[0]}</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={transfer}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Initiate Transfer'}
              </button>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              {success && <div className="text-green-500 text-sm mt-2">{success}</div>}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
