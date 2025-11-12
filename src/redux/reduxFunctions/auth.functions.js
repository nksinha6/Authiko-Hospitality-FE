import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            return data; // return user data
        } catch (error) {
            return rejectWithValue(error.message); // handles errors
        }
    }
);

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch user');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);