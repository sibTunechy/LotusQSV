// import React, { useState } from "react";
// import {
//     Box,
//     Button,
//     Checkbox,
//     FormControlLabel,
//     IconButton,
//     InputAdornment,
//     TextField,
//     Typography,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import CountUp from "react-countup";

// export default function LoginPage() {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [form, setForm] = useState({ username: "adminlotus", password: "password123" });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // TODO: hook up real login logic
//         navigate("/dashboard");
//     };

//     return (
//         <Box sx={{
//             height: "100vh",
//             // minWidth: "100vh",
//             // minHeight: "100vh",
//             width: "100%",
//             display: "flex",
//             border: "5px solid blue",
//             flexDirection: "row",
//             overflow: "hidden",
//             // alignItems: "stretch",

//         }}>
//             {/* Left Image Section */}
//             <Box
//                 sx={{
//                     flex: 1,
//                     backgroundImage: "url(/assets/loginpng.png)",
//                     backgroundSize: "cover",
//                     border: "2px solid green",
//                     backgroundPosition: "center",
//                     height: "100%",
//                     color: "white",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     // pt: 10,
//                     // pb: 10,
//                     // margin: 0,
//                     // width: "100%",
//                     // flexDirection: "column",
//                 }}
//             >
//             </Box>
//             {/* Right Form Section */}
//             <Box
//                 sx={{
//                     flex: 1,
//                     // pt: 2,
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     bgcolor: "white",
//                     // alignItems: "center",
//                     // overflowY: "auto",
//                     px: 6,
//                     py: 4,
//                     boxSizing: "border-box",

//                 }}
//             >
//                 {/* Logo */}
//                 <Box mb={2}
//                     display="flex"
//                     justifyContent="space-between"
//                     color="text.secondary"
//                     fontSize={12}>
//                     <img src="/assets/lotuslogo.png" alt="Lotus Bank" height={40} />
//                     <Typography sx={{ cursor: "pointer",
//                         fontFamily: "Manrope, sans-serif",
//                         fontWeight: 400,
//                         fontStyle: "normal",
//                         fontSize: "14px",
//                         lineHeight: "155%",
//                         marginRight: 2,
//                         letterSpacing: "0%", }}
//                     >Card Management Portal</Typography>
//                 </Box>

//                 <Box
//                     sx={{
//                         flexGrow: 1,
//                         // display: "flex",
//                         // flexDirection: "column",
//                         // width: "100%",
//                         // maxWidth: 480,
//                         // height: "auto",
//                         opacity: 1,
//                         transform: "rotate(0deg)",
//                         borderRadius: "16px",
//                         display: "flex",
//                         alignItems: "center",
//                         alignSelf: "center",
//                         flexDirection: "column",
//                         gap: "50px",
//                         backgroundColor: "#fff", 
//                         p: 4, 
//                         overflow: "auto",
//                             }}>
//                         <Typography 
//                             sx={{
//                             fontFamily: "Manrope, sans-serif",
//                             fontWeight: 700,
//                             fontStyle: "normal",
//                             fontSize: "30px",
//                             lineHeight: "100%",
//                             textAlign: "center",
//                             color: "#111827",
//                         }}
//                         >
//                     Login to Your Account
//                     </Typography>
//                     <Typography 
//                         variant="body2"
//                         color="text.secondary"
//                         mb={3}
//                         sx={{
//                             fontFamily: "Manrope, sans-serif",
//                             fontWeight: 500,
//                             fontStyle: "normal",
//                             fontSize: "16px",
//                             lineHeight: "150%",
//                             letterSpacing: "0.2px",
//                             textAlign: "center",
//                             color: "#A0AEC0",
//                         }}
//                         >
//                         Enter your Active Directory credentials to access the portal
//                     </Typography>

//                     <form onSubmit={handleSubmit}>
//                         <Box sx={{ width: "100%" }}>
//                             <Typography
//                                 sx={{
//                                 fontFamily: "Manrope, sans-serif",
//                                 fontWeight: 500,
//                                 fontSize: "14px",
//                                 color: "#687588",
//                                 display: "flex",
//                                 overflow: "auto",
//                                 gap: "2px",
//                                 }}
//                                 >
//                                 Username
//                                 <Box component="span" sx={{ color: "red" }}>
//                                 *
//                                 </Box>
//                             </Typography>

//                             <TextField
//                                 fullWidth
//                                 name="username"
//                                 type="text"
//                                 placeholder="Enter Username"
//                                 value={form.username}
//                                 onChange={handleChange}
//                                 margin="normal"
//                                 required
//                                 variant="outlined"
//                             />
//                         </Box>
//                         <Box sx={{ width: "100%" }}>
//                             <Typography
//                             sx={{
//                             fontFamily: "Manrope, sans-serif",
//                             fontWeight: 500,
//                             fontSize: "14px",
//                             color: "#687588",
//                             display: "flex",
//                             gap: "2px",
//                             mt: 2,
//                             }}
//                             >
//                                 Password <Box component="span" sx={{ color: "red" }}>*</Box>
//                             </Typography>
//                             <TextField
//                                 fullWidth
//                                 name="Password"
//                                 type="password"
//                                 placeholder="Enter Password"
//                                 value={form.password}
//                                 onChange={handleChange}
//                                 margin="normal"
//                                 required
//                                 variant="outlined"
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 edge="end"
//                                             >
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         </Box>
//                         <FormControlLabel
//                             control={<Checkbox 
//                                 disableRipple
//                                 sx={{
//                                     marginLeft: 1,
//                                     width: 20,
//                                     height: 20,
//                                     opacity: 0.6,
//                                     transition: "all 0.3s ease",
//                                     color: "#B0BEC5",
//                                     "&.Mui-checked": {
//                                     color: "#00CECE",
//                                     }
//                                 }}
//                                 />}
//                                 label={
//                                 <Typography sx={{ color: "#687588",
//                                     fontFamily: "Manrope, sans-serif",
//                                     fontWeight: 500,
//                                     fontStyle: "normal", 
//                                     fontSize: "14px",
//                                     lineHeight: "160%",
//                                 }}>
//                                     Remember Me
//                                 </Typography>
//                             }
//                             sx={{ gap: 1, }}
//                         />

//                         <Button
//                             fullWidth
//                             type="submit"
//                             variant="contained"
//                             sx={{
//                                 mt: 3,
//                                 backgroundColor: "#00CECE",
//                                 "&:hover": { backgroundColor: "#00b8b8"},
//                                 py: 1.5,
//                                 borderRadius: 2,
//                                 textTransform: "none",
//                                 fontFamily: "Manrope sans-serif",
//                                 fontWeight: 800,
//                                 // fontStyle: "normal",
//                                 fontSize: "16px",
//                                 lineHeight: "150%",
//                                 letterSpacing: "0.3px",
//                                 textAlign: "center",
//                             }}
//                         >
//                             Login
//                         </Button>
//                     </form>                        
//                 </Box>

//                 <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     color="text.secondary"
//                     fontSize={12}
//                 >
//                     <Typography
//                         sx={{
//                             fontFamily: "Manrope, sans-serif",
//                             fontWeight: 400,
//                             fontStyle: "normal",
//                             fontSize: "14px",
//                             lineHeight: "155%",
//                             letterSpacing: "0%",
//                         }}
//                     >© 2025 LOTUS Bank
//                     </Typography>

//                     <Box display="flex" gap={1.5}>
//                         <Typography sx={{ cursor: "pointer",
//                             fontFamily: "Manrope, sans-serif",
//                             fontWeight: 400,
//                             fontStyle: "normal",
//                             fontSize: "14px",
//                             lineHeight: "155%",
//                             letterSpacing: "0%", }}>All rights reserved
//                             </Typography>
//                         <Typography sx={{ cursor: "pointer",
//                             fontFamily: "Manrope, sans-serif",
//                             fontWeight: 400,
//                             fontStyle: "normal",
//                             fontSize: "14px",
//                             lineHeight: "155%",
//                             marginRight: 2,
//                             letterSpacing: "0%", }}>Privacy Policy
//                         </Typography>
//                     </Box>
//             </Box>
//         </Box>
//     </Box>
//     );
// };
// <Box sx={{ width: "100%" }}>
//                         <Grid container spacing={3} alignItems="stretch">
//                             {/* Account Opening Trend Chart */}
//                             <Grid item xs={12} md={6}>
//                                 <Card
//                                     sx={{
//                                         p: 3,
//                                         borderRadius: 3,
//                                         bgcolor: "#F9FAFB",
//                                         boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
//                                         height: "100%",           // allow card to fill the grid cell
//                                         minHeight: 520,
//                                         boxSizing: "border-box",
//                                     }}
//                                 >
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
//                                         <ShowChart sx={{ color: "#1E3A8A" }} />
//                                         <Typography variant="h6" fontWeight="600" color="#111827">
//                                             Account Opening Trend
//                                         </Typography>
//                                     </Box>

//                                     <ResponsiveContainer width="100%" height={420}>
//                                         <BarChart data={accountOpeningData} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
//                                             <CartesianGrid vertical={false} strokeDasharray="3 3" />
//                                             <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 13 }} />
//                                             <YAxis
//                                                 domain={[0, 12000]}
//                                                 ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000]}
//                                                 tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}K`)}
//                                                 tick={{ fill: "#64748B", fontSize: 13 }}
//                                                 axisLine={false}
//                                                 tickLine={false}
//                                             />
//                                             <Tooltip
//                                                 cursor={{ fill: "rgba(30,58,138,0.05)", radius: 30 }}
//                                                 contentStyle={{
//                                                     backgroundColor: "rgba(255, 255, 255, 0.98)",
//                                                     border: "1px solid #00CECE",
//                                                     borderRadius: 12,
//                                                     boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
//                                                     padding: "10px 14px",
//                                                 }}
//                                                 labelStyle={{ fontWeight: "600", color: "#00CECE" }}
//                                                 itemStyle={{ color: "#00CECE", fontWeight: "500" }}
//                                             />
//                                             <Bar dataKey="amount" fill="#1C219F" radius={[30, 30, 30, 30]} barSize={50} />
//                                         </BarChart>
//                                     </ResponsiveContainer>
//                                 </Card>
//                             </Grid>

//                             {/* Top Performing Officer Section */}
//                             <Grid item xs={12} md={6}>
//                                 <Card
//                                     sx={{
//                                         p: 3,
//                                         borderRadius: 3,
//                                         bgcolor: "#F9FAFB",
//                                         boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
//                                         height: "100%",
//                                         minHeight: 520,
//                                         boxSizing: "border-box",
//                                     }}
//                                 >
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                                         <EmojiEventsIcon sx={{ color: "#F59E0B", fontSize: 28 }} />
//                                         <Typography variant="h6" fontWeight="600" color="#111827">
//                                             Top Performing Officer
//                                         </Typography>
//                                     </Box>
//                                     <Typography variant="body2" color="text.secondary" sx={{ mb: 3, ml: 4.5 }}>
//                                         Ranked by total accounts opened by Officers
//                                     </Typography>

//                                     <Box sx={{ mt: 3 }}>
//                                         {topOfficers.map((officer) => (
//                                             <Box
//                                                 key={officer.rank}
//                                                 sx={{
//                                                     display: "flex",
//                                                     alignItems: "center",
//                                                     justifyContent: "space-between",
//                                                     py: 2.5,
//                                                     px: 2,
//                                                     mb: 1.5,
//                                                     bgcolor: "white",
//                                                     borderRadius: 2,
//                                                     transition: "all 0.2s",
//                                                     "&:hover": { boxShadow: 2, transform: "translateX(4px)" },
//                                                 }}
//                                             >
//                                                 <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
//                                                     <Typography variant="h6" fontWeight="600" color="text.secondary" sx={{ minWidth: 30 }}>
//                                                         {officer.rank}
//                                                     </Typography>
//                                                     <Box>
//                                                         <Typography variant="body1" fontWeight="600" color="#111827">
//                                                             {officer.name}
//                                                         </Typography>
//                                                         <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
//                                                             {officer.id}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
//                                                 <Typography variant="h6" fontWeight="700" color="#111827">
//                                                     {officer.accounts}
//                                                 </Typography>
//                                             </Box>
//                                         ))}
//                                     </Box>
//                                 </Card>
//                             </Grid>
//                         </Grid>
//                     </Box>