export const INITIAL_STATE = {
  minML: 0,
  minABV: 0,
  minQTY: 0,
};

export const filtersReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "RESET":
      state = INITIAL_STATE;
      return state;
    default:
      return {
        state,
      };
  }
};
