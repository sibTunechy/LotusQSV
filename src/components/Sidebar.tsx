"use client"

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import {
  Dashboard,
  PersonAdd,
  People,
  Settings,
  Description,
  Logout,
} from "@mui/icons-material"
import GridViewIcon from '@mui/icons-material/GridView'
import CircleConnectionIcon from "@/components/icons/CircleConnectionIcon";
import UserIcon from "@/components/icons/UserIcon";
import BookIcon from "@/components/icons/BookIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";
import GridIcon from "@/components/icons/GridIcon";
import { useNavigate, useLocation } from "react-router-dom"
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon";

const drawerWidth = 280

const sidebarItems = [
  { text: "Dashboard", icon: GridIcon, route: "/dashboard" },
  { text: "Account Opening", icon: UserIcon, route: "/account-opening/step-1" },
  { text: "Performance", icon: CircleConnectionIcon, route: "/performance" },
  { text: "User Management", icon: UserIcon, route: "/management" },
  { text: "Audit Report", icon: BookIcon, route: "/audit" },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#1C219F",
          color: "white",
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Box mb={3}>
            <img src="/assets/lotuspngwhite.png" alt="Lotus Bank" height={40} />
          </Box>
        </Box>

        {/* Navigation Items */}
        <List sx={{ p: 0 }}>
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.route;

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => navigate(item.route)}
                  sx={{
                    borderRadius: 1,
                    bgcolor:
                      item.text === "Dashboard"
                        ? "white"
                        : isActive
                        ? "#4169E1" 
                        : "transparent",
                    color:
                      item.text === "Dashboard"
                        ? "#1C219F"
                        : isActive
                        ? "white" 
                        : "white",
                    "&:hover": {
                      bgcolor: "#4169E1",
                      color: "white",
                    },
                    display: "flex",
                    justifyContent:
                      item.text === "Dashboard"
                        ? "space-between"
                        : "flex-start",
                  }}
                >
                  {item.text === "Dashboard" ? (
                    <>
                      <ListItemText primary={item.text} />
                      <ListItemIcon
                        component="span"
                        sx={{
                          color: "#1C219F",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <GridIcon width={20} height={20} fill="#1C219F" />
                      </ListItemIcon>
                    </>
                  ) : (
                    <>
                      <ListItemIcon
                        sx={{
                          color: isActive ? "white" : "white",
                          minWidth: 40,
                        }}
                      >
                        <item.icon />
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Sign Out Button */}
      <Box sx={{ mt: 4, p: 3, }}>
        <ListItemButton
          sx={{
            borderRadius: 1,
            "&:hover": { bgcolor: "#4169E1" },
            color: "white",
          }}
          onClick={() => navigate("/")}
        >
          <LogoutIcon sx={{ color: "red", minWidth: 40, }}>
            <Logout />
          </LogoutIcon>
          <ListItemText primary={<Typography sx={{ml: 1.5, fontWeight: 600}}>
            Sign Out
          </Typography>} />
        </ListItemButton>
      </Box>
    </Drawer>
  )
}

export { drawerWidth }
