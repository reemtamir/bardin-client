import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ShowUsers from './ShowUsers';
import ShowFavoriteUsersUsers from './ShowFavoriteUsersUsers';

const Search = () => {
  const {
    usersWhoDidNotBlockedMe,
    favoriteUsers,
    removeFromFavoritesById,
    showAlert,
    addToFavoritesById,
    blockedUsers,
  } = useAuth();

  const [usersToShow, setUsersToShow] = useState([]);
  const [filteredUsersToShow, setFilteredUsersToShow] = useState([]);

  useEffect(() => {
    setFilteredUsersToShow(
      usersToShow.filter((user) => {
        return (
          !favoriteUsers.some(
            (favoriteUser) => favoriteUser._id === user._id
          ) &&
          !blockedUsers.some((favoriteUser) => favoriteUser._id === user._id)
        );
      })
    );
  }, [usersToShow, favoriteUsers, blockedUsers]);

  return (
    <>
      <div className="input-div mb-5">
        <label className="label" htmlFor="">
          Name
        </label>
        <input
          style={{ width: '25%' }}
          className="input"
          onChange={(event) => {
            setUsersToShow(
              usersWhoDidNotBlockedMe.filter((user) =>
                user.name.includes(event.target.value)
              )
            );

            if (event.target.value === '') {
              setUsersToShow([]);
            }
          }}
          type="text"
        />
      </div>

      {/* <div>
        <label htmlFor="">Male</label>

        <input type="checkbox" name="male" />
        <label htmlFor="">Female</label>

        <input type="checkbox" name="female" />
        <label htmlFor="">Non Binary</label>

        <input type="checkbox" name="non-binary" />
      </div> */}
      <div className="d-flex">
        <div className="users">
          {favoriteUsers.length ? (
            <>
              <div className="fav">
                <ShowFavoriteUsersUsers
                  str={'bi bi-star-fill'}
                  fn={removeFromFavoritesById}
                  blockFn={showAlert}
                />{' '}
                <ShowUsers
                  users={filteredUsersToShow}
                  str={`bi bi-star`}
                  fn={addToFavoritesById}
                />{' '}
              </div>
            </>
          ) : null}{' '}
        </div>
        <div className="users">
          {favoriteUsers.length === 0 ? (
            <ShowUsers
              users={usersToShow}
              str={`bi bi-star`}
              fn={addToFavoritesById}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Search;
