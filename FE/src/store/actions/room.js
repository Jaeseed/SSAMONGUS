export const isReady = (e) => {
  return {
    type: "IS_READY",
    reset: e
  }
}

export const roomInf = (data) => {
  return {
    type: "ROOM_INF",
    inf: data
  }
}

export const countAllChat = (e) => {
  return {
    type: "COUNT_ALL_CHAT",
    reset: e
  }
}

export const myPlayerId = (id) => {
  return {
    type: "MY_PLAYER_ID",
    id: id
  }
}
