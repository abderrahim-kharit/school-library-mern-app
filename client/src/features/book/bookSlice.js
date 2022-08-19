import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axiosAdminConfig";

export const addBook = createAsyncThunk(
  "books/addBook",
  async (book, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/admin/books", book);
      return data.book;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios("/admin/books");
      return data.books;
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/admin/books/${id}`);
      return id;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const editBook = createAsyncThunk(
  "books/editBook",
  async ({ id, book }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/admin/books/${id}`, book);
      return data.book;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const renderBook = createAsyncThunk(
  "books/renderBook",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/admin/books/render/${id}`);
      return data.book;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  books: [],
};

const bookSlice = createSlice({
  initialState,
  name: "books",
  extraReducers: (builder) => {
    builder
      .addCase(addBook.fulfilled, (state, action) => {
        state.books = [...state.books, action.payload];
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.books = state.books.map((book) => {
          if (book._id === action.payload._id) {
            return action.payload;
          }
          return book;
        });
      })
      .addCase(renderBook.fulfilled, (state, action) => {
        state.books = state.books.map((book) => {
          if (book._id === action.payload._id) {
            return action.payload;
          }
          return book;
        });
      });
  },
});

export default bookSlice.reducer;
