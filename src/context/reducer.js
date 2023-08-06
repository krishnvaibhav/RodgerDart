export const initialState = {
  user: null,
  id: null,
  number: null,
  name: null,
  Fnumber: null,
  Rid: null,
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
    case "SET_FNUMBER":
      return {
        ...state,
        Fnumber: action.Fnumber,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "SET_RESTAURANT":
      return {
        ...state,
        Rid: action.Rid,
      };

    default:
      return state;
  }
};

export default reducer;
