import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRouter} from 'next/router'
import { useAppDispatch, useAppSelector, setInfo } from "@/components/store";
import { Map, MapMarker } from "react-kakao-maps-sdk"
import axios from "axios";
import {router} from "next/client";

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

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const info = useAppSelector(state => state.userInfo)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        try {
            const response = await axios.post('https://ihly0ifkbi.execute-api.us-east-2.amazonaws.com/default/ssossotable-signin', {
                email: data.get('email'),
                password: data.get('password')
            });
            console.log('axios');

            switch (response.status) {
                case 201:
                    await router.push('/content/main');
                    break;
                case 202:
                    console.log('wrong email or password');
                    break;
                default:
                    console.log("An error occurred");
                    break;
            }
        } catch (error) {
            console.error(error)
        }
    };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <Box
              sx={{
                  marginTop: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 1
              }}
          >
              <img
                  src={'main_logo.png'}
                  style={{
                      width: 320
                  }}
              />
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                  mt: 1
              }}>

                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      autoComplete="off"
                      autoFocus
                      onChange={(e)=>{dispatch(setInfo({
                          option:'id',
                          value: e.target.value
                      }))}}
                  />
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="비밀번호"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e)=>{dispatch(setInfo({
                          option:'password',
                          value: e.target.value
                      }))}}
                  />
                  <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="자동로그인"
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={()=>router.push('/content/main')}
                  >
                      {"로그인"}
                  </Button>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={()=>router.push('/content/calendar')}
                  >
                      {"캘린더"}
                  </Button>
                  <Grid container spacing={0} sx={{mb: 2, mt: 1, ml:'auto', mr:'auto', width: '80%', flexWrap: 'nowrap'}}>
                      <Grid item xs={12} sm={4}  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                          <Image width={'70'} height={'70'} src={'/kakao.svg'} alt={'kakao'}/>
                      </Grid>
                      <Grid item xs={12} sm={4}  sx={{display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                          <Image width={'70'} height={'70'} src={'/naver.png'} alt={'kakao'}/>
                      </Grid>
                      <Grid item xs={12} sm={4}  sx={{display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                          <Image width={'70'} height={'70'} src={'/google.svg'} alt={'kakao'}/>
                      </Grid>
                  </Grid>
                  <Grid container>
                      <Grid item xs>
                          <Link style={{
                              color: 'black'
                          }} onClick={()=>router.push('/auth/find/account')} variant="body2">
                              {"비밀번호 찾기"}
                          </Link>
                      </Grid>
                      <Grid item>
                          <Link style={{
                              color: 'black'
                          }} onClick={()=>router.push('/auth/signup')} variant="body2">
                              {"회원가입"}
                          </Link>
                      </Grid>
                  </Grid>
              </Box>
          </Box>
      </main>
    </>
  )
}
