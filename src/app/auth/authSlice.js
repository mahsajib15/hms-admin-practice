import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'auth',
  initialState: () => {
    let acs = {
      acs: null,
      user: null,
    };
    //
    try {
      acs = window.localStorage.getItem('li')
        ? JSON.parse(window.localStorage.getItem('li'))
        : acs;
    } catch (err) {
      console.log(err);
    }

    return {
      user: null,
      token: acs.acs,
    };
  },
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;

      window.localStorage.setItem('li', JSON.stringify({ acs: token }));

      //
      state.user = user;
      state.token = token;
    },
    setUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logout(state) {
      window.localStorage.removeItem('li');
      window.localStorage.removeItem('active-pkg');
      window.sessionStorage.removeItem('prev-active-pkg');
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout, toggleDepartment, setUser } =
  counterSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

export default counterSlice.reducer;
