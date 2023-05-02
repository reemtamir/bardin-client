import React from 'react';
import AdminNavBar from './AdminNavBar';
import { useAuth } from '../hooks/useAuth';

const Information = ({ text }) => {
  const { isAdmin } = useAuth();
  const [h1, p1, p2, p3, h2] = text;
  return (
    <>
      {isAdmin && <AdminNavBar />}
      <div className="info-div">
        <h1 className="info-h1">{h1}</h1>

        <p className="info-p">{p1}</p>
        <p className="info-p">{p2}</p>

        <p className="info-p">{p3}</p>

        <h2 className="info-h2">{h2}</h2>
      </div>
    </>
  );
};

export default Information;
