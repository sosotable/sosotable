import {configureStore, createSlice, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/src/query/core/apiState";



export const userInfoSlice = createSlice({
    name: 'userInfo',

    initialState: {
        id: '',
        password: '',
        nickname: '',
        tag: [],
        diary: []
    } as any,

    reducers: {
        setInfo(state, action) {
            switch (action.payload.option) {
                case 'id':
                    state.id = action.payload.value
                    break
                case 'password':
                    state.password = action.payload.value
                    break
                case 'nickname':
                    state.nickname = action.payload.value
                    break
                case 'tag':
                    state.tag = action.payload.value
                    break
                case 'diary':
                    state.diary = action.payload.value
            }
        },
        addTag(state, action) {
            state.tag.push({
                id: 0,
                value: action.payload,
                icon: '',
                count: 0
            })
        },
        increaseTagCount(state, action) {
            state.tag[action.payload].count += 1
        },
        deleteTagCount(state, action) {
            state.tag.splice(action.payload, 1)
        },
        addDiary(state, action) {
            state.diary.push({
                id: 0,
                value: action.payload,
                title: '',
                content: '',
                date: ''
            })
        }
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
            [userInfoSlice.name]: userInfoSlice.reducer,
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

export const fetchUserInfo =
    (id: any): AppThunk =>
        async dispatch => {
            const timeoutPromise = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

            await timeoutPromise(200);

            dispatch(
                userInfoSlice.actions.setInfo({
                    [id]: {
                        id,
                        name: `Subject ${id}`,
                    },
                }),
            );
        };

export const wrapper = createWrapper<AppStore>(makeStore);

export const selectUserInfo = (id: any) => (state: AppState) => state?.[userInfoSlice.name]?.[id];

export const {setInfo, addTag, increaseTagCount} = userInfoSlice.actions