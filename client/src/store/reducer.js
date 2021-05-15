// Initial state of the application
export const initialState = {
  token: null,
  lookup: [],
  conversions: {},
  countries: [],
};

// Action types for the react context API
export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  SET_LOOKUP: "SET_LOOKUP",
  ADD_COUNTRY: "ADD_COUNTRY",
  SET_CONVERSION_JSON: "SET_CONVERSION_JSON",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.SET_LOOKUP:
      return {
        ...state,
        lookup: action.lookup,
      };
    case actionTypes.ADD_COUNTRY:
      // Check if the country to be added is already in the list
      // Returns true if every element in the array is different
      let checkIFNotExists = state.countries.every(
        (country) => country.numericCode !== action.country.numericCode
      );
      if (checkIFNotExists) {
        return {
          ...state,
          countries: [...state.countries, action.country], // Add it to the list
        };
      }
      return state;

    case actionTypes.SET_CONVERSION_JSON:
      return {
        ...state,
        conversions: action.conversions,
      };
    default:
      return state;
  }
};

export default reducer;
