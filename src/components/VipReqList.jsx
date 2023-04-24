import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const VipReqList = () => {
  const {
    vipReq,
    setVipReq,
    admin,
    updateVip,
    setVipUsers,
    deleteVipReq,
    setIsInMainPage,
    isDark,
  } = useAuth();

  return (
    <>
      <Link
        style={{ color: isDark ? 'white' : 'black' }}
        className="my-card-link fs-3"
        onClick={() => setIsInMainPage(true)}
        to={'/admin-page'}
      >
        Go back
      </Link>

      {!vipReq.length && (
        <div className="text-info fs-3 m-auto">No vip req</div>
      )}
      <div className="vip-req-container">
        {vipReq.map((req) => {
          return (
            <div className="vip-req-div" key={req.email}>
              <ul className="vip-req-ul">
                <li> Card Number- {req.cardNumber}</li>
                <li>
                  {' '}
                  Email-
                  <Link onClick={() => {}} to={`/edit-users/${admin._id}`}>
                    {' '}
                    {req.email}
                  </Link>{' '}
                </li>
              </ul>
              <div className="vip-req-btns-div">
                <button
                  className="make-vip-btn"
                  id={req.email}
                  onClick={async ({ target }) => {
                    try {
                      await updateVip(
                        admin._id,
                        target.id,
                        req.vip ? false : true
                      );
                      await deleteVipReq(admin._id, target.id);
                      await setVipUsers((vipUsers) => !vipUsers);
                      await setVipReq(
                        vipReq.filter((req) => req.email !== target.id)
                      );
                      toast(
                        `${req.email}'s VIP status has updated to ${!req.vip}`
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {' '}
                  Make VIP
                </button>
                <button
                  className="delete-vip-btn"
                  id={req.email}
                  onClick={async ({ target }) => {
                    try {
                      await deleteVipReq(admin._id, target.id);
                      await setVipReq(
                        vipReq.filter((req) => req.email !== target.id)
                      );
                      toast(`Deleted ${req.email}'s req`);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Delete req
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VipReqList;
