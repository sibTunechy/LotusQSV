// "use client"

// import { useState } from "react";
// import {
//     Box,
//     Card,
//     CardContent,
//     Menu,
//     MenuItem,
//     Typography,
//     Grid,
//     Button,
// } from "@mui/material";
// import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
// import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import FixedHeader from "@/components/FixedHeader";
// import {
//     TrendingUp,
//     TrendingDown,
//     People,
//     CreditCard,
//     AccountCircle,
//     PersonOff,
//     ShowChart,
//     InfoOutline,
// } from "@mui/icons-material";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     ResponsiveContainer,
//     Tooltip,
// } from "recharts";

// import Sidebar, { drawerWidth } from "@/components/Sidebar";

// // Dummy data
// const accountOpeningData = [
//     { month: "Jul", amount: 10500 },
//     { month: "Aug", amount: 6500 },
//     { month: "Sep", amount: 4800 },
//     { month: "Oct", amount: 1500 },
//     { month: "Nov", amount: 5200 },
//     { month: "Dec", amount: 1600 },
// ];

// const topOfficers = [
//     { rank: 1, name: "Joshua Matthew", id: "RM-523", accounts: 250 },
//     { rank: 2, name: "Victor David", id: "RM-403", accounts: 230 },
//     { rank: 3, name: "Precious Nwoko", id: "RM-550", accounts: 210 },
//     { rank: 4, name: "Magnus William", id: "RM-855", accounts: 200 },
//     { rank: 5, name: "Olalekan Aminu", id: "RM-998", accounts: 190 },
// ];

// export default function CorporateBankingDashboard() {
//     const [setSelectedMetric] = useState<string | null>(null)
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [selectedFilter, setSelectedFilter] = useState("Today");

//     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     const handleSelect = (option: string) => {
//         setSelectedFilter(option);
//         handleClose();
//     };

//     const metrics = [
//         { id: "corporate-accounts", title: "Total Corporate Accounts", value: "2,847", change: "+5.1%", changeType: "positive", info: "green", subtitle: "+112 from yesterday", icon: People },
//         { id: "daily-transactions", title: "Daily Transaction Count", value: "45.2K", change: "+5.1%", changeType: "positive", info: "blue", subtitle: "+112 from yesterday", icon: CreditCard },
//         { id: "active-accounts", title: "Total Active Accounts", value: "1647", change: "+5.1%", changeType: "positive", info: "green", subtitle: "+112 from yesterday", icon: AccountCircle },
//         { id: "inactive-accounts", title: "Total Inactive Accounts", value: "1200", change: "-25.5%", changeType: "negative", info: "orange", subtitle: "-12 from yesterday", icon: PersonOff },
//     ];

//     return (
//         <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
//             {/* Sidebar */}
//             <Sidebar />

//             <FixedHeader userName="Olalekan Babatunde" userRole="Super Admin" showIcons={true} />

//             {/* Main Content */}
//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     mt: "44px",
//                     p: 4,
//                     border: "3px solid blue",
//                     // width: { xs: "100%", md: `calc(100vw - ${drawerWidth}px - 60px)` },
//                     width: "70%",
//                     overflowX: "auto",
//                     overflowY: "auto",
//                 }}
//             >
//                 {/* ======= IMPORTANT FIX =======
//                     Removed the transform: scale wrapper that caused the Grid to layout in logical (unscaled) space while being visually scaled.
//                     Replaced with a plain full-width wrapper so child Grids can use the full width.
//                 */}
//                 <Box
//                     sx={{
//                         width: "100%",          // ensure full width
//                         maxWidth: "100%",      // avoid unintended maxWidth constraints
//                         px: 0,                 // remove extra horizontal padding that can shrink available space
//                     }}
//                 >
//                     {/* Page Title */}
//                     <Box sx={{ display: "flex", justifyContent: "space-between", bgcolor: "white", mb: 4 }}>
//                         <Box sx={{ mb: 4 }}>
//                             <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, fontFamily: "Manrope sans-serif" }}>
//                                 Corporate Banking Overview
//                             </Typography>
//                             <Typography variant="h6" color="text.secondary">
//                                 Real-time monitoring and management of corporate internet banking operations
//                             </Typography>
//                         </Box>

//                         <Box sx={{ pt: 3 }}>
//                             <Button
//                                 variant="contained"
//                                 endIcon={<ExpandMoreOutlinedIcon />}
//                                 sx={{
//                                     bgcolor: "#00CECE",
//                                     "&:hover": { bgcolor: "#00CEBB" },
//                                     height: 48,
//                                     fontSize: 20,
//                                     textTransform: "none",
//                                     fontWeight: "300",
//                                     borderRadius: "12px",
//                                     fontFamily: "Manrope sans-serif",
//                                 }}
//                                 onClick={(e) => setAnchorEl(e.currentTarget)}
//                             >
//                                 Filter Dashboard
//                             </Button>
//                             <Menu
//                                 anchorEl={anchorEl}
//                                 open={Boolean(anchorEl)}
//                                 onClose={handleClose}
//                                 PaperProps={{
//                                     elevation: 3,
//                                     sx: { mt: 1, minWidth: 160, borderRadius: "12px" },
//                                 }}
//                             >
//                                 {["Today", "Last Week", "Last Month"].map((option) => (
//                                     <MenuItem
//                                         key={option}
//                                         onClick={() => handleSelect(option)}
//                                         sx={{
//                                             fontFamily: "Manrope sans-serif",
//                                             fontWeight: selectedFilter === option ? "600" : "500",
//                                             color: selectedFilter === option ? "#000000" : "text.primary",
//                                             "&:hover": { bgcolor: "#f0f0f0" },
//                                         }}
//                                     >
//                                         {option}
//                                     </MenuItem>
//                                 ))}
//                             </Menu>
//                         </Box>
//                     </Box>

//                     {/* Metrics Cards */}
//                     <Grid
//                         container
//                         spacing={3}
//                         sx={{
//                             mb: 4,
//                             width: "75vw",             // changed from 100vw -> 100% to avoid overflow
//                             // alignItems: "stretch",
//                             // justifyContent: "space-between",
//                             border: "2px solid red",
//                         }}
//                     >
//                         {metrics.map((metric) => (
//                             <Grid item xs={12} sm={8} md={4} lg={3} key={metric.id} sx={{ display: "flex" }}>
//                                 <Card
//                                     sx={{
//                                         cursor: "pointer",
//                                         // width: "100%",        // allow card to size to grid column rather than fixed px
//                                         height: 180,
//                                         flexGrow: 1,
//                                         border: "1px transparent solid",
//                                         transition: "all 0.2s",
//                                         "&:hover": { boxShadow: 4 },
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         justifyContent: "space-between",
//                                     }}
//                                     onClick={() => setSelectedMetric(metric.id)}
//                                 >
//                                     <CardContent sx={{ p: 3, flexGrow: 1 }}>
//                                         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                                             <Typography variant="h6" fontWeight="bold">
//                                                 {metric.title}
//                                             </Typography>
//                                             <InfoOutlineIcon
//                                                 sx={{
//                                                     fontSize: 26,
//                                                     color:
//                                                         metric.info === "green"
//                                                             ? "success.main"
//                                                             : metric.info === "blue"
//                                                             ? "info.main"
//                                                             : metric.info === "orange"
//                                                             ? "warning.main"
//                                                             : "text.secondary",
//                                                     pt: 0.3,
//                                                     pr: 2.5,
//                                                 }}
//                                             />
//                                         </Box>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
//                                             <Typography variant="h4" fontWeight="bold">
//                                                 {metric.value}
//                                             </Typography>
//                                             <Box
//                                                 sx={{
//                                                     bgcolor:
//                                                         metric.changeType === "positive"
//                                                             ? "rgba(209, 250, 229, 0.9)"
//                                                             : "rgba(254, 226, 226, 0.9)",
//                                                     borderRadius: "20px",
//                                                     px: 1.5,
//                                                     py: 0.2,
//                                                     display: "flex",
//                                                     alignItems: "center",
//                                                     gap: 0.5,
//                                                     color: metric.changeType === "positive" ? "success.main" : "error.main",
//                                                 }}
//                                             >
//                                                 {metric.changeType === "positive" ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />}
//                                                 <Typography variant="body2" fontWeight="bold" sx={{ color: "inherit", fontSize: "0.9rem" }}>
//                                                     {metric.change}
//                                                 </Typography>
//                                             </Box>
//                                         </Box>
//                                         <Typography variant="body2" color="#A0AEC0" sx={{ pt: 1.5 }}>
//                                             {metric.subtitle}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>

//                     {/* ===== Chart + Top Performing Officer: ensure they use the full width ===== */}
//                     <Box sx={{ width: "100%", display: "flex", flexDirection: "column", border: "2pc solid green" }}>
//                         <Grid container spacing={3} sx={{ width: "100%", alignItems: "stretch" }}>
//                             <Grid >
//                             <Card sx={{ p: 3, height: 520, bgcolor: "#F9FAFB" }}>
//                                 <Typography variant="h6">Account Opening Trend</Typography>
//                             </Card>
//                             </Grid>

//                             <Grid >
//                             <Card sx={{ p: 3, height: 520, bgcolor: "#F9FAFB" }}>
//                                 <Typography variant="h6">Top Performing Officer</Typography>
//                             </Card>
//                             </Grid>
//                         </Grid>
//                     </Box>

//                 </Box>
//             </Box>
//         </Box>
//     );
// }

