const redux=require('redux')
const createStore=redux.createStore
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default
const axios=require('axios')


const initialState={
    loading:true,
    users:[],
    error:''
}

const fetch_users_request='fetch_users_request'
const fetch_users_success="fetch_users_success"
const fetch_users_failure="fetch_users_failure"

function featchUserRequest(){
    return {
        type:fetch_users_request,
    }
}

function  featchUserSuccess (users){
    return { 
        type: fetch_users_success,
        payload:users
    }
}

function featchUserFailure(error){
    return {
        type:fetch_users_failure,
        payload:error
    }
}

function reducer(state=initialState,action){
    switch(action.type){
        case fetch_users_request: return {
            ...state,
            loading:true,
        }
        case fetch_users_success: return {
            // ...state,
            loading:false,
            users:action.payload,
            error:''
        }
        case fetch_users_failure:return{
            // ...state,
            loading:false,
            users:[],
            error:action.payload
        }
        default : return state
    }

}

const fetchData=()=>{
    return function(dispatch){
        dispatch(featchUserRequest())
        axios.get('http://timeapi.kaaylabs.com/api/v1/project_view/')
        .then((response)=>{
            const users=response.data.data
            dispatch(featchUserSuccess(users))
        })
        .catch((error)=>{
            dispatch(featchUserFailure(error.message))
        })
    }
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware))
// store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchData())
export default store