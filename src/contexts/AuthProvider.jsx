import { createContext, useReducer, useRef } from 'react';
import { useMount } from '~/hooks';
import { constants } from '~/utils';
import api from '~/config/api';

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_PENDING': {
            return { ...state, user: null, isLoading: true, isError: false };
        }
        case 'LOGIN_FULFILLED': {
            return { ...state, user: action.payload, isLoading: false, isError: false };
        }
        case 'LOGIN_REJECT': {
            return {
                ...state,
                user: null,
                isLoading: false,
                isError: true,
                message: action.payload,
            };
        }
        case 'LOGOUT': {
            return initialState;
        }
        default:
            return state;
    }
};

export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const fetchLoginCalled = useRef(false);

    useMount(() => {
        if (fetchLoginCalled.current) return;

        const fetchLogin = async () => {
            try {
                const response = await api.post('/auth/login-refresh');
                localStorage.setItem('token', response.data.token);
                dispatch({ type: 'LOGIN_FULFILLED', payload: response.data });
            } catch (error) {
                dispatch({ type: 'LOGIN_REJECT' });
            }
        };

        dispatch({ type: 'LOGIN_PENDING' });
        fetchLogin();
        fetchLoginCalled.current = true;
    });

    const login = async (credentials) => {
        dispatch({ type: 'LOGIN_PENDING' });
        try {
            const response = await api.post('/auth/login', credentials);
            localStorage.setItem('token', response.data.token);
            dispatch({ type: 'LOGIN_FULFILLED', payload: response.data });
        } catch (error) {
            dispatch({ type: 'LOGIN_REJECT', payload: error?.data?.message || constants.sthWentWrong });
            throw error;
        }
    };

    const loginByOthers = async (data) => {
        dispatch({ type: 'LOGIN_PENDING' });
        try {
            const response = await api.post('/auth/login/others', data);
            localStorage.setItem('token', response.data.token);
            dispatch({ type: 'LOGIN_FULFILLED', payload: response.data });
        } catch (error) {
            dispatch({ type: 'LOGIN_REJECT', payload: error?.data?.message || constants.sthWentWrong });
            throw error;
        }
    };

    const logout = async () => {
        dispatch({ type: 'LOGOUT' });
        try {
            await api('/auth/logout');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, dispatch, login, logout, loginByOthers }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
