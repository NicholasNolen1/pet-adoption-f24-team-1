import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Stack } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import InboxIcon from '@mui/icons-material/Inbox';
import { useState, useEffect, useStyles } from 'react';
import Router, { useRouter } from 'next/router';
import LoginModal from './login-modal';
import DialogModal from './dialog-modal';
import Link from 'next/link';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const pages = ['Manage Pets', 'Manage Events', 'Profile'];
const settings = ['Settings', 'Logout'];
const loginSettings = ['Login', 'Create Account'];
const messages = ['Request: John Doe', 'Request: Jane Smith'];


export default function NavBar() {
  const router = useRouter();
  const user = useAuthUser();
  const signOut = useSignOut();
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleOpenInbox = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseInbox = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Login
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  // Logout
  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.reload();
  }

  const handleNav = (nav) => {
    if(nav === 'Settings')  {
      router.push('/adoption-center-home/adpotion-center-settings');
    }
    if(nav === 'Logout')  {
      openLogoutModal();
    }
    if(nav === 'Manage Pets')  {
      router.push('/adoption-center-home/manage-pets');    
    }
    if(nav === 'Manage Events')  {
      router.push('/adoption-center-home/manage-events');   
    }
    if(nav === 'Profile')  {
      router.push('/adoption-center-home/adpotion-center-profile');
    }
    
  };

  return (
    <>
    <AppBar position="fixed">
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{width: `100%`}}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/adoption-center-home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              FLUFFY FRIENDS
            </Typography>
          </Stack>
          
          <PetsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FLUFFY FRIENDS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNav(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ mr: 2 }}>
            <Tooltip title="Inbox">
              <IconButton>
                <InboxIcon sx={{color: 'white'}}/>
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            <Tooltip title="Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                {user ? <Avatar>{user.email.substring(0,1)}</Avatar> : <Avatar>?</Avatar>}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {(user ? settings : loginSettings).map((setting) => (
                <MenuItem key={setting} onClick={() => handleNav(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {/* Login modal */}
    <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    {/* Logout modal */}
    <DialogModal open={isLogoutModalOpen} 
                 header="Log out?" 
                 message="This will kick you out of the current session."
                 handleYes={handleLogout}
                 handleNo={closeLogoutModal}
    />
    </>
  );
}
