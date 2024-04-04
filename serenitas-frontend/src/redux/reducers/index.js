const initialState = {
  mode: "default",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
