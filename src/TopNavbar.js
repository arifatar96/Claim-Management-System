import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
// import AdbIcon from '@mui/icons-material/Adb';
import {MoreIcon} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Icon } from '@mui/material';

const settings = ['Logout'];

function Navbar() {
//   const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  // const[link, navigate] = React.useState('')

  // const handleNavigate = () => {
  //   var roleName = sessionStorage.getItem("name")
  //   if (roleName === "ADMIN") {
  //     navigate("/Adminpage")

  //   }
  //   else if (roleName === "RTO") {
  //     navigate("/rtoHomePage")
  //   }
  //   else if (roleName === "CLERK") {
  //     navigate("/clerkHomePage")
  //   }
  //   else if (roleName === "COP") {
  //     navigate("/copHomePage")
  //   }
  // }

  

  return (
    <div style={{backgroundColor:"grey"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <i class="fa-solid fa-stethoscope" ></i> */}
              <i>     <Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /></i> 

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >

            </Button>

          </Box>
          <Typography variant="h5" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, paddingLeft: { sm: 2, xs: 2 } }}>
            Claim Management System
          </Typography>

          <Box sx={{ flexGrow: 0 }} >
            {/* <span style={{ paddingRight: '20px' }}>
              <Badge style={badgeStyles} count={5} onClick={() => {
                navigate("/NotificationPage")
              }}>
                <i class="fa-solid fa-bell badge-notification"></i>
              </Badge>
            </span> */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <MoreIcon />
                {/* <AccountCircleIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1, fontSize: '32px' }} /> */}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography component='a' href='/' textAlign="center" sx={{ textDecoration: 'none' }}>{setting} </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
}
export default Navbar;