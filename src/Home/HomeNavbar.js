import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Diversity3Icon from '@mui/icons-material/Diversity3';

export default function HomeNavbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Diversity3Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component={Link}
            sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
            to="/"
          >
            Lifeline Insurance Ltd
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button color="inherit" component={Link} to="/signup">
              Sign up
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
