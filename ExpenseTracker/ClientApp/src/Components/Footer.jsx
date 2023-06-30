import { Box, Typography, Link, IconButton, useScrollTrigger, Zoom, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const Logo = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Description = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ContactSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ScrollTopButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export function Footer() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <FooterContainer sx={{ background: 'linear-gradient(to bottom, #FFFFFF, #C5E1A5, #8BC34A, #4CAF50)', }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Logo>
              <Typography variant='h6' >ExpenseSage</Typography>
            </Logo>
            <Description variant="body2" sx={{ maxWidth: 400 }}>
              Expensage is a financial tracking website conceived for the purpose of self-learning and improvement as a
              full-stack developer.
            </Description>
            <SocialLinks>
              <IconButton component={Link} href="https://www.linkedin.com/in/michaelhazut" target="_blank" rel="noopener">
                <LinkedInIcon />
              </IconButton>
              <IconButton component={Link} href="https://github.com/MichaelHazut" target="_blank" rel="noopener">
                <GitHubIcon />
              </IconButton>
              <IconButton component={Link} href="https://www.instagram.com" target="_blank" rel="noopener">
                <InstagramIcon />
              </IconButton>
              <IconButton component={Link} href="https://www.youtube.com" target="_blank" rel="noopener">
                <YouTubeIcon />
              </IconButton>
            </SocialLinks>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ContactSection >
              <Typography variant="body2" fontWeight="bold">
                Contact Us
              </Typography>
              <TextField variant="outlined" size="small" label="Email" fullWidth />
              <TextField variant="outlined" size="small" label="Message" multiline rows={2} fullWidth sx={{ mt: 1, }} />
              <Button variant="contained" fullWidth sx={{ mt: 1, background: '#76D379' }}>
                Submit
              </Button>
            </ContactSection>
          </Grid>
        </Grid>
      </FooterContainer>
      <Zoom in={trigger}>
        <ScrollTopButton onClick={scrollToTop}>
          <KeyboardArrowUpIcon />
        </ScrollTopButton>
      </Zoom>
    </>
  );

}

