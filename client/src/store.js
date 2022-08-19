import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/book/bookSlice";
import demandeReducer from "./features/demandes/demandeSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    demandes: demandeReducer,
    user: userReducer,
  },
});

export default store;
