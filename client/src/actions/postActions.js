import { FETCH_POSTS, NEW_POST } from './types.js';

// This file is where the actions are defined

export function fetchPosts() {
    return function(dispatch) {
        fetch('http://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts => dispatch({
                type: FETCH_POSTS,
                payload: posts
            }))
    }
}

export function newPost(post) {
    return function(dispatch) {
        fetch('http://jsonplaceholder.typicode.com/posts', {
             method: 'POST',
             headers: {
                 'content-type': 'application/json'
             },
             body: JSON.stringify(post)
         })
         .then(res => res.json())
         .then(post => dispatch({
             type: NEW_POST,
             payload: post
         }))
    }
}