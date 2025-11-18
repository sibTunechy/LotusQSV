"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";
import RotateIcon from "@/components/icons/RotateIcon.tsx";
import trophyIcon from "/assets/award.png";

import Sidebar, { drawerWidth } from "@/components/Sidebar";
import FixedHeader from "@/components/FixedHeader";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const accountOpeningData = [
  { month: "Jul", amount: 10500 },
  { month: "Aug", amount: 6500 },
  { month: "Sep", amount: 4800 },
  { month: "Oct", amount: 1500 },
  { month: "Nov", amount: 5200 },
  { month: "Dec", amount: 1600 },
];

const topOfficers = [
  { rank: 1, name: "Joshua Matthew", id: "RM-523", accounts: 250 },
  { rank: 2, name: "Victor David", id: "RM-403", accounts: 230 },
  { rank: 3, name: "Precious Nwoko", id: "RM-550", accounts: 210 },
  { rank: 4, name: "Magnus William", id: "RM-655", accounts: 200 },
  { rank: 5, name: "Olalekan Aminu", id: "RM-998", accounts: 190 },
];

const metrics = [
  {
    title: "Total Accounts",
    value: "2,847",
    change: "+5.1%",
    status: "positive",
    info: "green",
    subtext: "+12 from yesterday",
  },
  {
    title: "Total Active Accounts",
    value: "1,247",
    change: "+5.1%",
    status: "positive",
    info: "blue",
    subtext: "+12 from yesterday",
  },
  {
    title: "Total Inactive Accounts",
    value: "500",
    change: "+5.1%",
    status: "positive",
    info: "green",
    subtext: "+12 from yesterday",
  },
  {
    title: "Total Dormant Accounts",
    value: "100",
    change: "-25.5%",
    status: "negative",
    info: "orange",
    subtext: "-12 from yesterday",
  },
];

export default function CorporateBankingDashboard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (option: string) => {
    setSelectedFilter(option);
    handleClose();
  };
  const CustomBar = (props: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y, width, height, fill, value } = props;
  
    return (
      <g
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The bar itself */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={20}
          ry={20}
          style={{ cursor: "pointer" }}
        />
        
        {/* The label that appears on hover */}
        {isHovered && (
          <text
            x={x + width / 2}
            y={y - 10}
            fill="#1C219F"
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fontFamily="Manrope, sans-serif"
          >
            {`${(value / 1000).toFixed(1)}K`}
          </text>
        )}
      </g>
    );
  };
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F9FAFB" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          mt: "60px",
          px: 4,
          py: 3,
          pr: 2,
        }}
      >
        {/* Fixed Header */}
        <FixedHeader
          userName="Olalekan Babatunde"
          userRole="Super Admin"
          showIcons={true}
        />

        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            mt: 2,           
            bgcolor: "white",
            borderRadius: "8px",
            height: "100px",
            width: "78vw",
          }}
        >
          <Box sx={{ml: 2}}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                mb: 0.5,
                mr: -2,
              }}
            >
              QuickServe Banking Overview
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontFamily: "Manrope, sans-serif" }}
            >
              Real-time monitoring and management of account opening operations
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ExpandMoreOutlinedIcon />}
            onClick={handleClick}
            sx={{
              bgcolor: "#00CECE",
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
              borderRadius: "12px",
              px: 3,
              py: 1.5,
              mr: 2,
              "&:hover": { bgcolor: "#00BFBF" },
            }}
          >
            Filter Dashboard
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: { mt: 1, borderRadius: "12px", minWidth: 160 },
            }}
          >
            {["Today", "Last Week", "Last Month"].map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleSelect(option)}
                sx={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: selectedFilter === option ? 600 : 500,
                  color: selectedFilter === option ? "#000" : "text.primary",
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Metrics Section */}
        <Box                     
            sx={{ 
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mb: 3, 
                width: "100%",
                }}>
                {metrics.map((metric) => (                    
                  <Card
                      key={metric.title}
                      sx={{ 
                          cursor: "pointer",
                          flex: "1 1 calc(25% - 24px)",
                          minWidth: "255px",
                          border: "1px transparent solid",
                          transition: "all 0.2s", 
                          "&:hover": 
                          { boxShadow: "none" },
                          boxShadow: "none",
                          display: "flex", 
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "170px",
                          borderRadius: "20px",
                          color: "#111827",
                      }}
                      onClick={() => setSelectedMetric(metric.title)}
                  >
                      <CardContent sx={{ 
                          p: 3, 
                          flexGrow: 1,
                          }}>
                          <Box sx={{ 
                              display: "flex", justifyContent: "space-between", 
                              mb: 2 }}>
                              <Typography variant="h7"
                                  
                              sx={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, }}>
                                  {metric.title}
                              </Typography>
                              <InfoOutlineIcon sx={{ 
                                  mr: -3,
                                  fontSize: 26, 
                                  color: 
                                  metric.info === "green" 
                                  ? "success.main" 
                                  : metric.info === "blue" 
                                  ? "info.main" 
                                  : metric.info === "orange"
                                  ? "warning.main"
                                  : "text.secondary",
                                  pt: 0.3, 
                                  pr: 2.5 }} />
                          </Box>
                          <Box sx={{ 
                              display: "flex", 
                              alignItems: "center", 
                              gap: 2, 
                              mb: 1,
                              color: "#111827",}}>
                              <Typography variant="h4" fontWeight="bold">
                                  {metric.value}
                              </Typography>
                              <Box
                                  sx={{
                                      bgcolor: metric.status === "positive" ? "rgba(209, 250, 229, 0.9)" : "rgba(254, 226, 226, 0.9)",
                                      borderRadius: "20px",
                                      px: 1.5,
                                      py: 0.2,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                      color: metric.status === "positive" ? "success.main" : "error.main",
                                  }}
                              >
                                  {metric.status === "positive" ? (
                                      <TrendingUp sx={{ fontSize: 16 }} />
                                  ) : (
                                      <TrendingDown sx={{ fontSize: 16 }} />
                                  )}
                                  <Typography variant="body2" fontWeight="bold" 
                                      sx={{color: "inherit", fontSize: "0.9rem"}}>
                                      {metric.change}
                                  </Typography>
                              </Box>
                          </Box>
                          <Typography variant="body2" color="#A0AEC0" sx={{ pt: 1.5 }}>
                              {metric.subtext}
                          </Typography>
                      </CardContent>
                  </Card>
                ))}
            </Box>

        {/* Chart + Top Officers Section */}
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={6} sx={{ width: "47%" }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#fff",
                boxShadow: "none",
                height: 520,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <RotateIcon sx={{ color: "#1E3A8A" }} />
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Account Opening Trend
                </Typography>
              </Box>

              <ResponsiveContainer width="100%" height={420}>
                <BarChart
                  data={accountOpeningData}
                  margin={{ top: 20, right: 30, left: -30, bottom: 10 }}
                  
                >
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#6B7280", fontSize: 13 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 12000]}
                    ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000]}
                    tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}K`)}
                    tick={{ fill: "#6B7280", fontSize: 13 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(30,58,138,0.05)" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #00CECE",
                      borderRadius: 12,
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
                    }}
                    labelStyle={{ fontWeight: 600, color: "#00CECE" }}
                    itemStyle={{ color: "#00CECE", fontWeight: 500 }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#1C219F" 
                    radius={[20, 20, 0, 0]} 
                    barSize={40}
                    shape={<CustomBar/>}
                  >
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Top Officers */}
          <Grid item xs={12} md={6} sx={{ width: "50%" }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#fff",
                boxShadow: "none",
                height: 520,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component="img"
                  src={trophyIcon}
                  alt="Trophy Icon"
                  sx={{
                    width: 24,        
                    height: 24,
                    objectFit: "contain",
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Top Performing Officer
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, ml: 4.5 }}
              >
                Ranked by total accounts opened by Officers
              </Typography>

              <Box>
                {topOfficers.map((officer) => (
                  <Box
                    key={officer.rank}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "#FFF",
                      borderRadius: 2,
                      px: 2,
                      py: 2.5,
                      mb: 1.5,
                      transition: "all 0.2s",
                      "&:hover": {
                        boxShadow: 2,
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{ color: "#4B5563", pl: 2.1, fontWeight: 600, bgcolor: "#F5F6FF", width: "30px", height: "39px", borderRadius: "20px", alignItems: "center", justifyContent: "center", pt: 0.8 }}
                      >
                        {officer.rank}
                      </Typography>
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight="600"
                          color="#111827"
                        >
                          {officer.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.85rem" }}
                        >
                          {officer.id}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight="700"
                      color="#111827"
                    >
                      {officer.accounts}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
