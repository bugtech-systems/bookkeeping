import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, socialLogin } from './redux/actions/auth.action';

import {
  LoginSocialGoogle,
} from 'reactjs-social-login';

import {
  GoogleLoginButton,
} from 'react-social-login-buttons';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://bugtech.solutions/">
        Bugtech Solutions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const REDIRECT_URI = 'https://files.bugtech.solutions/api/v1/auth/signup'


export default function SignInSide({ history }) {
  const dispatch = useDispatch();
  const { errors } = useSelector(({ ui }) => ui)
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: ""
  });






  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)

    if (isLogin) {


      dispatch(loginUser(values, history))
        .then(() => {
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        })
    } else {
      dispatch(registerUser(values))
        .then(() => {
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        })
    }



  };

  const handleSocialLogin = (data) => {
    let user = {
      email: data.email,
      password: data.sub,
      firstName: data.given_name,
      lastName: data.family_name,
    }
    console.log(data)
    console.log(user)

    dispatch(socialLogin(user, history))
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })


  }


  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            mx: 5,
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center"
          }}
        >
          <h2>BOOKKEEPER</h2>
          {/* <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
          <Typography component="h1" variant="h5">
            {isLogin ? "Sign In" : "Sign Up"}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <LoginSocialGoogle
              // client_id={process.env.REACT_APP_GG_APP_ID || ''}
              redirect_uri={REDIRECT_URI}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="online"
              // onResolve={({ provider, data }: IResolveParams) => {
                // handleSocialLogin(data)
              // }}
              onReject={err => {
                console.log(err);
              }}
            >
              <GoogleLoginButton disabled />
            </LoginSocialGoogle>
            <hr />
            {isLogin ? (
              <>
                <TextField
                  margin="dense"
                  size='small'
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange('email')}
                  value={values.email}
                  autoFocus
                />
                <TextField
                  margin="dense"
                  size='small'
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange('password')}
                  value={values.password}
                />
              </>
            ) : (
              <>
                <TextField
                  margin="dense"
                  size='small'
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  onChange={handleChange('firstName')}
                  value={values.firstName}
                />
                <TextField
                  margin="dense"
                  size='small'
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  type="lastName"
                  id="lastName"
                  onChange={handleChange('lastName')}
                  value={values.lastName}
                />
                <TextField
                  margin="dense"
                  size='small'
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange('email')}
                  value={values.email}
                  autoFocus
                />
                <TextField
                  margin="dense"
                  size='small'
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange('password')}
                  value={values.password}
                />
              </>
            )}


            <Box display="flex">
              <Grid item flexGrow={1}>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </Link>
              </Grid>

            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}