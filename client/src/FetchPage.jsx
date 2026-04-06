import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FetchPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleFetch(e) {
    e.preventDefault();
    setError('');
    setUser(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'User not found.');
      } else {
        setUser(data);
      }
    } catch {
      setError('Network error. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <div className="card">
        <h2 className="title">View User</h2>
        <form onSubmit={handleFetch} className="form">
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID to search"
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <div className="button-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch User'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              ← Back
            </button>
          </div>
        </form>

        {user && (
          <div className="user-card">
            <h3>User Details</h3>
            <table className="user-table">
              <tbody>
                <tr>
                  <th>User ID</th>
                  <td>{user.userId}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>Age</th>
                  <td>{user.age}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{user.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchPage;
