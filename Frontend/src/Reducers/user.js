const userInitialState = {
  user: {},
  error: false
};

export default function user(state = userInitialState, action) {
  switch (action.type) {
    case 'LoginSuccess':
      return {
        ...state,
        user: action.user,
        error: false
      };

    case 'LoginFailed':
      return {
        ...state,
        error: true
      };
    case 'logout':
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
}
