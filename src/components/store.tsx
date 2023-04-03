import {configureStore, createSlice, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/src/query/core/apiState";

export const subjectSlice = createSlice({
    name: 'subject',

    initialState: {} as any,

    reducers: {
        setEnt(state, action) {
            return action.payload;
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.subject,
            };
        },
    },
});

const makeStore = () =>
    configureStore({
        reducer: {
            [subjectSlice.name]: subjectSlice.reducer,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState<any, any, any>> = useSelector;

export const fetchSubject =
    (id: any): AppThunk =>
        async dispatch => {
            const timeoutPromise = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

            await timeoutPromise(200);

            dispatch(
                subjectSlice.actions.setEnt({
                    [id]: {
                        id,
                        name: `Subject ${id}`,
                    },
                }),
            );
        };

export const wrapper = createWrapper<AppStore>(makeStore);

export const selectSubject = (id: any) => (state: AppState) => state?.[subjectSlice.name]?.[id];