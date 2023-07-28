export const initialState = {
  user: null,
  id: null,
  number: null,
  name: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_ID":
      return {
        ...state,
        id: action.id,
      };
    case "SET_NUMBER":
      return {
        ...state,
        number: action.number,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };

    default:
      return state;
  }
};

export default reducer;
