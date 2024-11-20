import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from 'react-router-dom';

const FloatingBar = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  padding: theme.spacing(1, 3),
  borderRadius: 50,
  zIndex: 1000,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[4],
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

export default function NotFound() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <FloatingBar  sx={{ mt: 2, bgcolor:"#009a47"}}>
        <Typography variant={isMobile ? "h6" : "h5"} component="h1">
          Mini Outlet
        </Typography>
      </FloatingBar>
      <ContentWrapper>
        <Container maxWidth="sm">
          <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 4 }} />
          <Typography variant="h2" component="h2" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="h3" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </Typography>
          <Button 
            variant="contained"
            size="large"
            component={Link}
            to="/"
            sx={{ mt: 2 ,bgcolor:"#009a47"}}
          >
            Back to Home
          </Button>
        </Container>
      </ContentWrapper>
    </Box>
  );
}

