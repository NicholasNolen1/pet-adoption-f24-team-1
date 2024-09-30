import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography, Grid, TextField } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios';

export default function CreateAccount() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) => {
    //e.preventDefault();

    axios.post('http://localhost:8080/users', {
      emailAddress: emailAddress,
      password: password,
      userType: userType,
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const getUsers = () => {
    axios.get('http://localhost:8080/allusers')
    .then(function (response) {
      alert(JSON.stringify(response.data, undefined, 4));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (

    <>
      <Head>
        <title>Create Account</title>
      </Head>

      <main>
        <Stack alignItems='center'>
          <p>Create Account Page</p>
          <Card sx={{ width: 600 }} elevation={0}>
            <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField id="emailAddress" placeholder="Enter email address" label="Email Address" variant="outlined" fullWidth required onChange={(e) => setEmailAddress(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="password" placeholder="Enter password" label="Password" variant="outlined" fullWidth required onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="userType" placeholder="Enter user type" label="User Type" variant="outlined" fullWidth required onChange={(e) => setUserType(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
              </Grid>
            </form>
            <Button type="submit" variant="contained" color="primary" fullWidth onClick={getUsers}>List Users</Button>
            </CardContent>
          </Card>
        </Stack>
      </main>
    </>
  );
}