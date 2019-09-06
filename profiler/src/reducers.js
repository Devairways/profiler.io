

const initialProfile = {
        id: "",
        name:"",
        email: "",
        joined:"",
        
}

export const updateProfile = (state=initialProfile, action={}) => {
  switch (action.type) {
    case "REQUEST_PROFILE_PENDING":
      return Object.assign({}, state, {authed: false, pending:true});
    case 'REQUEST_PROFILE_SUCCESS':
      return Object.assign({}, state, {profile: action.payload.user, authed: true, token:action.payload.token,pending:false})
    case 'REQUEST_PROFILE_FAILED':
      return Object.assign({}, state, {error: action.payload, profile:initialProfile,authed:false, pending:false})
    default:
      return state
  }
}

const initialSearchTerm = {
        search:""
        
}

export const getUser = (state=initialSearchTerm, action={}) => {
  switch (action.type) {
    case "CHANGE_SEARCH":
      return Object.assign({}, state, {search: action.payload});
    default:
      return state
  }
}