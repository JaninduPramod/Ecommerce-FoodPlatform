import React from "react";
import { Box, Typography, Button, Container, Grid, Divider, Paper } from "@mui/material";
import ImageListComponent from "../components/imglist";
import ProductSlider from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { CheckCircle, LocalShipping, Shield, Star } from "@mui/icons-material";

const Onboarding = () => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Hero Banner */}
      <Box
        sx={{
          width: "100vw",
          height: "500px",
          mt: "75px",
          backgroundImage:
            "url(https://freshgo-webibazaar.myshopify.com/cdn/shop/files/slider-1_8d15eebe-d99f-4800-af09-a24e70339c55.jpg?v=1625900666)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "120px",
            gap: "30px",
            maxWidth: "600px",
            backgroundColor: "rgba(255,255,255,0.8)",
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold", color: "#2E7D32" }}>
            Organic Fresh Fruits <br /> For Your Health
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            Nourish your body with nature's finest produce. Our fruits are handpicked at peak ripeness and delivered fresh to your doorstep.
          </Typography>
          <Button
            onClick={() => navigate("/product")}
            sx={{
              width: "140px",
              height: "45px",
              backgroundColor: "#ff7d01",
              color: "white",
              borderRadius: "12px",
              ":hover": { backgroundColor: "#2E7D32" },
              fontWeight: "bold"
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          <FeatureCard 
            icon={<LocalShipping fontSize="large" />} 
            title="Free Delivery" 
            text="On all orders over $50"
          />
          <FeatureCard 
            icon={<CheckCircle fontSize="large" />} 
            title="Fresh Guarantee" 
            text="100% organic products"
          />
          <FeatureCard 
            icon={<Shield fontSize="large" />} 
            title="Quality Check" 
            text="Rigorously tested"
          />
          <FeatureCard 
            icon={<Star fontSize="large" />} 
            title="Customer Rated" 
            text="4.8/5 stars"
          />
        </Grid>
      </Container>

      <ImageListComponent />

      {/* TRENDING PRODUCTS (ORIGINAL VERSION - UNCHANGED) */}
      <Container sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Trending Products
        </Typography>
      </Container>
      <ProductSlider />

      {/* About Section */}
      <Box sx={{ backgroundColor: "#f9f9f9", py: 8 }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="About Us"
                sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                About Our Farm
              </Typography>
              <Typography variant="body1" paragraph>
                Since 2010, we've been committed to sustainable farming practices that respect both the environment and our customers.
              </Typography>
              <Typography variant="body1" paragraph>
                Our fruits are grown without synthetic pesticides or fertilizers, ensuring you get the purest, most nutritious produce possible.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: "#2E7D32",
                  borderColor: "#2E7D32",
                  mt: 2,
                  ":hover": { backgroundColor: "#2E7D32", color: "white" }
                }}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 6 }}>
          What Our Customers Say
        </Typography>
        <Grid container spacing={4}>
          <TestimonialCard 
            text="The fruits are always fresh and delicious. My family loves the weekly organic box!"
            author="Sarah J."
          />
          <TestimonialCard 
            text="Best quality produce I've found online. The delivery is always on time too."
            author="Michael T."
          />
          <TestimonialCard 
            text="I can taste the difference with these organic fruits. Worth every penny!"
            author="Emma R."
          />
        </Grid>
      </Container>

      {/* Newsletter */}
      <Box sx={{ backgroundColor: "#2E7D32", py: 6, color: "white" }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
            Join Our Newsletter
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 4 }}>
            Get 10% off your first order and updates on seasonal produce
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ 
                padding: "12px 20px",
                width: "400px",
                border: "none",
                borderRadius: "4px 0 0 4px",
                fontSize: "1rem"
              }}
            />
            <Button
              sx={{
                backgroundColor: "#ff7d01",
                color: "white",
                borderRadius: "0 4px 4px 0",
                px: 4,
                ":hover": { backgroundColor: "#e67100" }
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, text }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Paper elevation={0} sx={{ p: 3, textAlign: "center", height: "100%" }}>
      <Box sx={{ color: "#2E7D32", mb: 2 }}>{icon}</Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>{text}</Typography>
    </Paper>
  </Grid>
);

// Reusable Testimonial Card Component
const TestimonialCard = ({ text, author }) => (
  <Grid item xs={12} md={4}>
    <Paper sx={{ p: 4, height: "100%", borderRadius: 2 }}>
      <Box sx={{ display: "flex", mb: 2 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} sx={{ color: "#ffc107" }} />
        ))}
      </Box>
      <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
        "{text}"
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        - {author}
      </Typography>
    </Paper>
  </Grid>
);

export default Onboarding;