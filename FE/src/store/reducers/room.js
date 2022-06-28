const initialState = {
  isReady: false,
  inf: [],
  count: 0,
  myPlayerId: ""
}

export default function room(state = initialState, action) {
  switch (action.type) {
    case 'IS_READY':
      if (action.reset) {
        return {
          ...state,
          isReady: false
        }
      } else {
        if (state.isReady) {
          return {
            ...state,
            isReady: false
          }
        } else {
          return {
            ...state,
            isReady: true
          }
        }
      }
    case 'ROOM_INF':
      return {
        ...state,
        inf: action.inf
      }
    case 'COUNT_ALL_CHAT':
      if (action.reset) {
        return {
          ...state,
          count: 0
        }
      } else {
        return {
          ...state,
          count: state.count + 1
        }
      }
    case 'MY_PLAYER_ID':
      return {
        ...state,
        myPlayerId: action.id
      }
    default:
      return state;
  }
}
