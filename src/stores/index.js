import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/store.js";
import { speciesReducer, rankReducer } from "./species/storeSpecies.js";

const rootReducer = combineReducers({
  auth: authReducer,
  species: speciesReducer,
  rank: rankReducer,
  // kingdom: kingdomReducer,
  // classType: classReducer,
  // order: orderReducer,
  // family: familyReducer,
  // genus: genusReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
