import React, { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Github users
    const searchUsers = async text => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&per_page=9&client_id=${githubClientId}&
        client_secret=${githubClientSecret}`
        );

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });

        console.log("state res:", res);
    };

    // Search single user
    const getUser = async username => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}?&client_id=${githubClientId}&
            client_secret=${githubClientSecret}`
        );
        dispatch({
            type: GET_USER,
            payload: res.data
        });

    };

    //  Get users repos
    const getUserRepos = async username => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=100&client_id=${githubClientId}&
            client_secret=${githubClientSecret}`
        );

        // sort repo array by stargazers count
        const sortedRepos = res.data.sort((a, b) => {
            return a.stargazers_count < b.stargazers_count ? 1 : -1; 
        });

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    };

    // Clear users from state
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <GitHubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos
            }}
        >
            {props.children}
        </GitHubContext.Provider>
    );
};

export default GithubState;
