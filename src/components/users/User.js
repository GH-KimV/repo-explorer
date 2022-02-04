import React, { useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repo from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {

  const githubContext = useContext(GithubContext);

  const { getUser, user, loading, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user

  if (loading) return <Spinner />;

  return (
    <>
      <Link to='/' className='btn btn-light'>
        Back 2 Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>{bio}</p>
          <p>Location: {location}</p>
        </div>
        <div className='text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-dark'>Public Repos: {public_repos}</div>
        <div className='badge badge-light'>Public Gist: {public_gists}</div>
      </div>
      </div>

        <div className="sub-container">
        <Repo repos={repos} />
        </div>
    </>
  );
};

export default User;