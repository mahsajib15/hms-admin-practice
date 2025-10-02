import { createContext, useContext } from 'react';
import { useLogoutMutation } from '@/app/auth/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from '@/app/auth/authSlice';
import { authApi } from '@/app/api/authApi';


const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [logoutServer] = useLogoutMutation();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      logoutServer();
      dispatch(logout());
      dispatch(authApi.util.resetApiState());
    } catch (err) {
      return false;
    }
  };

  const isCurrentUser = (currentUser) => {
    return user?.email === currentUser?.email;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logOut,
        isCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
