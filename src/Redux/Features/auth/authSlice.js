import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";


const initialState = {
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  user: null,
  message: "",
}; 

export const register = createAsyncThunk(
  "auth/register",
  async(userData, thunckAPI) => {
    try{
      return await authService.register(userData)
    }catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.toString();
      return thunckAPI.rejectWithValue(message);
    }
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async(userData, thunckAPI) => {
    try{
      return await authService.login(userData)
    }catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.toString();
      return thunckAPI.rejectWithValue(message);
    }
  }
)

export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async(_, thunckAPI) => {
    try{
      return await authService.getLoginStatus()
    }catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.toString();
      return thunckAPI.rejectWithValue(message);
    }
  }
)

export const getUser = createAsyncThunk(
  "auth/getUser",
  async(userData, thunckAPI) => {
    try{
      return await authService.getUser(userData)
    }catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.toString();
      return thunckAPI.rejectWithValue(message);
    }
  }
)

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async(userData, thunckAPI) => {
    try{
      return await authService.updateUser(userData)
    }catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.toString();
      return thunckAPI.rejectWithValue(message);
    }
  }
)

export const updatePhoto = createAsyncThunk(
  "auth/updatePhoto",
  async(userData, thunckAPI) => {
    try{
      return await authService.updatePhoto(userData)
    }catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message
      ) || error.toString();
      return thunckAPI.rejectWithValue(message);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset_auth(state) {
      // console.log(action.payload);
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
        },
      },
   extraReducers: (builder) => {
    builder
    .addCase(register.pending,(state) => {
      state.isLoading = true
    })
    .addCase(register.fulfilled,(state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      toast.success("Registeration successful");

    })
    .addCase(register.rejected,(state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
      toast.success(action.payload);

    })
    //login user
    .addCase(login.pending,(state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled,(state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      toast.success("Login successful");

    })
    .addCase(login.rejected,(state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
      console.log(action.payload)
      toast.success(action.payload);

    })
    //login user
    .addCase(getLoginStatus.pending,(state) => {
      state.isLoading = true;
    })
    .addCase(getLoginStatus.fulfilled,(state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = action.payload;
      console.log(action.payload)
      if (action.payload.message === "invalid signature") {
        state.isLoggedIn = false;
      }
    })
    .addCase(getLoginStatus.rejected,(state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;

    })
    //login user
    .addCase(getUser.pending,(state) => {
      state.isLoading = true;
    })
    .addCase(getUser.fulfilled,(state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log(action.payload)

    })
    .addCase(getUser.rejected,(state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
      toast.error(action.payload);

    })
    //login user
    .addCase(updateUser.pending,(state) => {
      state.isLoading = true;
    })
    .addCase(updateUser.fulfilled,(state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log(action.payload)
      toast.success("User Updated");
    })
    .addCase(updateUser.rejected,(state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
      toast.error(action.payload);
    })
    //login user
    .addCase(updatePhoto.pending,(state) => {
      state.isLoading = true;
    })
    .addCase(updatePhoto.fulfilled,(state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log(action.payload)
      toast.success("Photo Updated");
    })
    .addCase(updatePhoto.rejected,(state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
      toast.error(action.payload);
    })
   }
});




export const { reset_auth, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;