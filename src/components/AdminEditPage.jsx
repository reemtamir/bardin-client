import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminNavBar from './AdminNavBar';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const AdminEditPage = () => {
  const { getUsers, updateVip, vipUsers, setVipUsers, setIsInMainPage } =
    useAuth();

  const [users, setUsers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await getUsers();
      setUsers(allUsers);
    };
    getAllUsers();
  }, [vipUsers, getUsers]);

  return (
    <>
      <AdminNavBar />
      <Link
        className="my-card-link fs-3 "
        onClick={() => setIsInMainPage(true)}
        to={'/admin-page'}
      >
        Go back
      </Link>
      <div style={{ gap: '2rem' }} className="users w-75 ">
        {users.map((element, index) => {
          return (
            <div
              style={{ minWidth: '14rem' }}
              key={index}
              className="users-container "
            >
              <li
                className="vip-status"
                id={element.email}
                onClick={async ({ target }) => {
                  try {
                    await updateVip(id, target.id, element.vip ? false : true);
                    setVipUsers((vipUsers) => !vipUsers);
                    toast(
                      `${target.id}'s VIP status has updated to ${!element.vip}`
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                VIP- {element.vip.toString()}
              </li>
              {/* vip true <input type="checkbox" name="true" id="true" />
              vip false <input type="checkbox" name="false" id="false" /> */}
              <div className="min-height">
                <img src={element.image} alt={`${element.name} `} />
              </div>
              <div className="card-body ">
                <ul className="ul ">
                  <li className="fs-6 mt-1">{element.name}</li>
                  <li className="fs-6 ">{element.email}</li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AdminEditPage;
