import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  ImageList,
  ImageListItem,
} from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const pages = [
    { name: "Add Scheme", link: "/admin/add-scheme" },
    { name: "Listed Schemes", link: "/admin/scheme-list" },
    { name: "Client Forms", link: "/admin/client-forms" },
    { name: "Claim Requests", link: "/admin/claim-requests" },
    { name: "Client Querries", link: "/admin/client-querries" },
  ];

  return (
    <React.Fragment>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={1}>
          {pages.map((page) => (
            <Grid item key={page.link} xs={12} sm={6} md={4} p={3} lg={4}>
              <CardActionArea component={Link} to={page.link}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#CBFFA9"
                  }}
                >
                  <ImageList sx={{ width: 300, ml: 11 }}>
                    <ImageListItem>
                      <img src={page.image} alt={page.name} />
                    </ImageListItem>
                  </ImageList>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {page.name}
                    </Typography>
                    <Typography>{page.description}</Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default AdminHome;
