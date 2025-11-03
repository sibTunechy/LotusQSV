import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >    
      {/* Left side image */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          backgroundImage: "url('/assets/loginpng.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          display: "flex",
          backgroundColor: "#ffffff",
          pt: 6,
          }}
      >
      </Box>
      {/* Right side (form section) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "12px",
          bgcolor: "#fff",
          px: 6,
          py: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pb: 8,
          }}
        >
          <img src="/assets/lotuslogo.png" alt="Lotus Bank" height={36} />
          <Typography
            sx={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "#687588",
            }}
          >
            Card Management Portal
          </Typography>
        </Box>

        {/* Center Form */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Typography
              sx={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                fontSize: "28px",
                textAlign: "center",
                color: "#111827",
                mb: 1.5,
              }}
            >
              Login to Your Account
            </Typography>
            <Typography
              sx={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#A0AEC0",
                textAlign: "center",
                mb: 4,
              }}
            >
              Enter your Active Directory credentials to access portal
            </Typography>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Typography
                sx={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#687588",
                }}
              >
                Username <Box component="span" sx={{ color: "red" }}>*</Box>
              </Typography>
              <TextField
                fullWidth
                name="username"
                placeholder="Enter Username"
                value={form.username}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />

              <Typography
                sx={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#687588",
                  mt: 2,
                }}
              >
                Password <Box component="span" sx={{ color: "red" }}>*</Box>
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#B0BEC5",
                      "&.Mui-checked": { color: "#00CECE" },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      color: "#687588",
                    }}
                  >
                    Remember Me
                  </Typography>
                }
                sx={{ mt: 1 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#00CECE",
                  "&:hover": { backgroundColor: "#00b8b8" },
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                Login
              </Button>
            </form>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Manrope, sans-serif",
            fontSize: "13px",
            color: "#687588",
            pt: 13,   
          }}
        >
          <Typography>© 2025 LOTUS Bank</Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Typography>All rights reserved</Typography>
            <Typography sx={{ cursor: "pointer" }}>Privacy Policy</Typography>
          </Box>
        </Box>
  </Box>

    </Box>
  );
};

export default LoginPage;
