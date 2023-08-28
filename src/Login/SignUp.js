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
import { Alert, Snackbar } from "@mui/material";

const defaultTheme = createTheme();

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const initialErrors = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const [formData, setFormData] = React.useState(initialFormData);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  // const [errors, setErrors] = React.useState({});
  const [errors, setErrors] = React.useState(initialErrors);
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const onChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    
    setFormData({ ...formData, [fieldName]: fieldValue });
    
    const validationErrors = { ...errors };
    
    switch (fieldName) {
      case 'firstName':
        validationErrors.firstName = fieldValue ? '' : 'First name is required';
        break;
      case 'lastName':
        validationErrors.lastName = fieldValue ? '' : 'Last name is required';
        break;
      case 'email':
        validationErrors.email = fieldValue ? (isValidEmail(fieldValue) ? '' : 'Invalid email format') : 'Email is required';
        break;
      case 'password':
        validationErrors.password = fieldValue ? (fieldValue.length < 5 ? 'Password must be at least 5 characters long' : '') : 'Password is required';
        break;
      case 'confirmPassword':
        validationErrors.confirmPassword = fieldValue === formData.password ? '' : 'Passwords do not match';
        break;
      default:
        break;
    }
  
    setErrors(validationErrors);

  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const user = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        rolename: "CLIENT"
      };

      userDetails(user)
        .then((resp) => {
          console.log(resp);
          if(resp==="Success") {
          setAlertMessage(`${formData.firstName} Sign Up Successfully, You Can Login Now`);
          setOpenSnackbar(true);
          }
          else {
            alert("User Already Exist")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Form has errors, display them
      console.log("Form has validation errors:", validationErrors);
      setErrors(validationErrors);
    }
  };

  const {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  } = formData;

  const userDetails = (user) => {
    return axios
      .post("http://localhost:9090/addUser", user, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => response.data);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    navigate("/login");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.firstName) {
      validationErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      validationErrors.lastName = "Last name is required";
    }

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
  
    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    return validationErrors;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          boxShadow={"5px 5px 10px grey"}
          sx={{
            padding: 4,
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // backgroundColor:"#FFEECC"
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={onChange}
                  value={formData.firstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={onChange}
                  autoComplete="family-name"
                  value={formData.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={onChange}
                  autoComplete="email"
                  value={email}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={onChange}
                  autoComplete="new-password"
                  value={password}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>

              <Grid item xs={12}>
  <TextField
    required
    fullWidth
    name="confirmPassword"
    label="Confirm Password"
    type="password"
    id="confirmPassword"
    onChange={(e) => setConfirmPassword(e.target.value)}
    value={confirmPassword}
    error={!!errors.confirmPassword}
    helperText={errors.confirmPassword}
  />
</Grid>

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
