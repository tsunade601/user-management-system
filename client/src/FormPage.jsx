import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userId: '', name: '', age: '', address: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save user.');
      } else {
        setMessage('User added successfully!');
        setForm({ userId: '', name: '', age: '', address: '' });
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
        <h2 className="title">Add User</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              id="userId"
              type="text"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="Enter User ID"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter Age"
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter Address"
              rows="3"
              required
            />
          </div>
          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}
          <div className="button-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Submit'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              ← Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
