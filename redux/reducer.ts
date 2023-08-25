import { LOGOUT, SET_USER } from "./action-types";

const initialState = {
  user: null, // Puede ser un objeto con los datos del usuario
};

const userReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null, // Restablecer el estado a su valor inicial
      };
    default:
      return state;
  }
};

export default userReducer;
