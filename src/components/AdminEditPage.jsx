import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminNavBar from './AdminNavBar';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const AdminEditPage = () => {
  const {
    getUsers,
    updateVip,
    vipUsers,
    setVipUsers,
    setIsInMainPage,
    isDark,
  } = useAuth();

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
        style={{ color: isDark ? 'white' : 'black' }}
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

              <div className="min-height">
                <img
                  src={element.image}
                  alt={`${element.name} `}
                  title={`${element.name} `}
                />
              </div>
              <div className="card-body ">
                <ul className="ul ">
                  <li className="fs-6 mt-1">{element.name}</li>
                  <li className="fs-6 ">{element.email}</li>
                  <li className="fs-6 ">
                    {element.blockList.length ? (
                      <>
                        <button
                          className="btn-see-blocked"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseBlocked"
                          aria-expanded="false"
                          aria-controls="collapseBlocked"
                        >
                          See blocked list
                        </button>

                        <div className="collapse" id="collapseBlocked">
                          <ul className="list-group">
                            {element.blockList.map((blocked, index) => (
                              <li key={index}>
                                {' '}
                                <div className="admin-block-list-div">
                                  <p className="admin-block-list-p">
                                    {blocked.name}
                                  </p>
                                  <img
                                    className="admin-block-list-image"
                                    src={blocked.image}
                                    alt={blocked.name}
                                    title={blocked.name}
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <p>Blocked list is empty</p>
                    )}
                  </li>
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
