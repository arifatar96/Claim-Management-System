import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Diversity3Icon from '@mui/icons-material/Diversity3';

// const pages = ['ADD SCHEME', 'VIEW SCHEMES', 'CLIENT FORMS', 'CLAIM REQUESTS'];
// const pages = [{name:'ADD SCHEME', link:'/add-scheme'},
// {name:'VIEW SCHEMES', link:'/scheme-list'},
// {name:'CLIENT FORMS', link:'/add-scheme'},
// {name:'CLAIM REQUESTS', link:'/client-forms'}  ];

const settings = ["Logout"];

const pages = [
  { name: "Home", link: "/admin/" },
  { name: "Add Scheme", link: "/admin/add-scheme" },
  { name: "Listed Schemes", link: "/admin/scheme-list" },
  { name: "Client Forms", link: "/admin/client-forms" },
  { name: "Claim Requests", link: "/admin/claim-requests" },
  { name: "Client Querries", link: "/admin/client-querries" },
];

function AdminNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const firstName = sessionStorage.getItem("firstName");

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
    sessionStorage.removeItem("name");
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#00ADB5" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        {/* <Avatar sx={{  bgcolor: "blueviolet" }}>LIL</Avatar> */}
          {/* <Avatar src="/images/logo.png"  alt="CMS"  sx={{ width: 56, height: 56 }} /> */}
          <Diversity3Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/admin/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LIL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.link}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Diversity3Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

          <Diversity3Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/admin/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LIL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to={page.link}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex", // Display items in a flex layout
              alignItems: "center", // Align items vertically in the middle
            }}
          >
            <Typography variant="body1" sx={{ marginRight: "16px" }}>
              Hi, {firstName}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton
                color="inherit"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                {/* <LogoutIcon/> */}
                <MoreIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to="/"
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AdminNavbar;
