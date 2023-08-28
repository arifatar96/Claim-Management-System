import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const defaultTheme = createTheme();

const initialFormData = {
  email: "",
  password: "",
};

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(initialFormData);
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can handle form submission here
      console.log("Form submitted:", formData);

      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:9090/login",
          headers: { "content-type": "application/json" },
          data: formData,
        });

        if (response.data) {

          const userData = response.data;
          console.log(userData);

          const roleName = userData.rolename;

          console.log(roleName);
          sessionStorage.setItem("roleName", roleName);

          const name = userData.firstName + " " + userData.lastName;
          console.log(name);
          sessionStorage.setItem("email", userData.email);
          sessionStorage.setItem("firstName", userData.firstName);
          sessionStorage.setItem("lastName", userData.lastName);
          sessionStorage.setItem("name", name);

          if (roleName.length < 1) {
            alert("User Not Found");
          } else {
            if (roleName === "ADMIN") navigate("/admin/");
            else if (roleName === "USER") navigate("/user/");
            else if (roleName === "CLIENT") navigate("/client/");
            else navigate("/");
          }
        } else {
          console.log("server Isuue");
          alert("Server Issue");
        }

        setFormData(initialFormData);
      } catch (error) {
        console.log(error);
      }

    } else {
      // Form has errors, display them
      console.log("Form has validation errors:", validationErrors);
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 5) {
      validationErrors.password = "Password must be at least 5 characters long";
    }

    return validationErrors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          boxShadow={"5px 5px 10px grey"}
          sx={{
            padding: 4,
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // backgroundColor:"#FCBAAD"
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h2" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleInputChange}
              autoComplete="email"
              value={formData.email}
              autoFocus
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleInputChange}
              value={formData.password}
              id="password"
              error={!!errors.password}
              helperText={errors.password}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
