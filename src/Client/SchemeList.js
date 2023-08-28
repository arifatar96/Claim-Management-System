import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import ClientRegistration from "./Registration";
import SchemeDetails from "./SchemeDetail";

const schemeDetails = () => {
  return axios
    .get("http://localhost:9091/allSchemes")
    .then((response) => response.data);
};

const InsuranceSchemeList = () => {
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Sample dummy data for insurance schemes
  const initialDummySchemes = [
    {
      id: 1,
      schemeName: "Life Insurance Plan",
      description:
        "This is a life insurance plan for individuals and families.",
      coverageType: "Life Coverage",
      premiumAmount: 500,
    },
    {
      id: 2,
      schemeName: "Health Insurance Plan",
      description: "This is a health insurance plan for medical coverage.",
      coverageType: "Health Coverage",
      premiumAmount: 300,
    },
    {
      id: 3,
      schemeName: "Auto Insurance Plan",
      description: "This is an auto insurance plan for vehicles.",
      coverageType: "Auto Coverage",
      premiumAmount: 200,
    },
  ];

  useEffect(() => {
    schemeDetails()
      .then((resp) => {
        setSchemes(resp);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleViewSchemeDetails = (schemeName) => {
    const selected = schemes.find((scheme) => scheme.schemeName === schemeName);
    setSelectedScheme(selected);
  };

  // const handleRegisterScheme = (schemeName, description) => {
  //   console.log(schemeName);

  //   return (
  //     <ClientRegistration schemeName={schemeName} schemeDescription={description} premiumAmount={premiumAmount}/>
  //   );
  // };

  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h2" variant="h5" mt={6} mb={3} align="center">
        Insurance Scheme List
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {schemes.map((scheme) => (
          <Grid key={scheme.schemeName} item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", backgroundColor: "#FAF3F0", display: "flex", flexDirection: "column" }}
            >

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">
                  {scheme.schemeName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {scheme.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Premium Amount: ₹ {scheme.premiumAmount}
                </Typography>
              </CardContent>

              <CardActions sx={{ marginTop: "auto" }}>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleViewSchemeDetails(scheme.schemeName)}
                >
                  View Details
                </Button>

                <Button
                  size="small"
                  // type="button"
                  color="primary"
                  component={Link}
                  to={{
                    // pathname: "/client/registration",
                    // state: {
                    //   schemeName: scheme.schemeName,
                    //   schemeDescription: scheme.description,
                    //   premiumAmount: scheme.premiumAmount,
                    // },

                    pathname: "/client/registration",
                    search: `?schemeName=${encodeURIComponent(
                      scheme.schemeName
                    )}&schemeDescription=${encodeURIComponent(
                      scheme.description
                    )}&premiumAmount=${encodeURIComponent(
                      scheme.premiumAmount
                    )}`,
                  }}
                  // to="/client/registration"
                  // onClick={() => handleRegisterScheme(scheme.schemeName, scheme.description)}
                >
                  Register
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedScheme && (
        <SchemeDetails
          scheme={selectedScheme}
          schemeName={selectedScheme.schemeName}
          schemeDescription={selectedScheme.description}
        />
      )}
    </Container>
  );
};

export default InsuranceSchemeList;
