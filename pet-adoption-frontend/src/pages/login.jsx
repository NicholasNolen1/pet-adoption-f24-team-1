import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/login", {
      username: email,
      password: password,
    })
            .then(response => {
                alert("Login successful!");
                console.log(response.data); // Handle authentication state here
                sessionStorage.setItem('user', JSON.stringify(response.data)); // Store user data in session storage
            })
            .catch(error => {
                alert("Login failed: " + error.message);
            });
  };

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <main>
      <Container>
            <Stack>
              <Typography variant="h4">
                Welcome back!
              </Typography>
              <Typography>
                Don't have an account? <Link href="/create-account" variant='body2'>Sign up</Link>
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={4} sx={{ my: 1}}>
                  <Grid item xs={12}>
                    <TextField id="email" placeholder="Enter email address" label="Email Address" variant="outlined" fullWidth required onChange={(e) => setEmail(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="password" placeholder="Enter password" label="Password" variant="outlined" fullWidth required onChange={(e) => setPassword(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                  </Grid>
                </Grid>
              </form>
              <Typography>
                <Link href="/user-home" variant='body2'>user home</Link>
              </Typography>
            </Stack>
          
        </Container>
      </main>
    </>
  );
}