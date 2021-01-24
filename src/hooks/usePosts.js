import {useReducer} from "react";
import {generatePostDocument, getPostsDocumentsByCountry, getPostsDocumentsByUser} from "../firebase";


function reducer(state, action){
    switch (action.type){
        case 'SET_POST':
            return {...state, posts: action.payload}
        case 'ADD_POST':
            return { ...state, posts: [action.payload, ...state.posts]}
        case 'GET_POST_BY_COUNTRY':
            return { ...state, posts: [action.payload]}
        case 'GET_POST_BY_USER':
            return { ...state, posts: [action.payload]}

    }
}

export function usePosts(){
    const [state, dispatch] = useReducer(reducer, {
        posts: []
    })

    return{
        posts: state.posts,
        fetchPosts: function () {
            dispatch({type: 'SET_POST', payload: () => {}})
        },
        fetchPostsByCountry: function (countryCode) {
            dispatch({type: 'GET_POST_BY_COUNTRY', payload: getPostsDocumentsByCountry(countryCode)})
        },
        addPost: function (post) {
            generatePostDocument(post)
            dispatch({type: 'ADD_POST', payload: post})
        },
        fetchPostsByUser: function (uid) {
            dispatch({type: 'GET_POST_BY_USER', payload: getPostsDocumentsByUser(uid)})
        }

    }
}
