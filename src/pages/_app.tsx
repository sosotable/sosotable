import '@/styles/globals.css'
import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import {wrapper} from '../components/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();

export default function App({Component, ...rest }: AppProps) {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Component {...props.pageProps} />
            </Provider>
            <Copyright sx={{ mt: 5 }} />
        </ThemeProvider>

    );
}
