import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="title">User Management System</h1>
        <p className="subtitle">Manage your users efficiently</p>
        <div className="button-group">
          <button className="btn btn-primary" onClick={() => navigate('/add-user')}>
            ➤ Add User
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/view-user')}>
            ➤ View User
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
