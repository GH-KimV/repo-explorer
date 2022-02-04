import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo }) => {
    return (
        <div className='card'>
            <h3>
                <a href={repo.html_url}>{repo.name}</a>
            </h3>
            <p>{repo.description}</p>
            <hr style={{margin: "10px 0"}}/>
            <div className="all-center row my-1'" >
                <h4>
                    <span>⭐</span>
                    {repo.stargazers_count}
                </h4>
                <h4>{repo.language}</h4>
                <h4>
                    <span>🍴</span>
                    {repo.forks_count}
                </h4>
            </div>
        </div>
    );
};

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
};

export default RepoItem;
