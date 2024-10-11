"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Link,
  Box,
} from "@mui/material";
import axios from "axios";
// import StarIcon from "@mui/icons-material/Star";
// import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating } from "@mui/material";

const Posts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       i <= rating ? <StarIcon key={i} /> : <StarBorderIcon key={i} />
  //     );
  //   }
  //   return stars;
  // };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: 500 }}>
              <Link href={product.image} target="_blank">
                <CardMedia
                  sx={{
                    height: 200,
                    width: 200,
                    margin: "auto",
                    objectFit: "contain",
                  }}
                  component="img"
                  height="140"
                  width="140"
                  image={product.image}
                  alt={product.title}
                />
              </Link>
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price.toFixed(2)}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <Box>
                  <Typography noWrap variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </Box>
                {/* <Typography variant="body2" color="text.secondary">
                  {renderStars(product.rating)}
                </Typography> */}
                <Rating value={product.rating.rate} />
              </CardContent>
              {/* <CardActions>
                <Button
                  size="small"
                  href={product.image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;
