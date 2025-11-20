// components/FixedHeader.tsx
"use client"

import { Box, Typography, IconButton } from "@mui/material"
import { FiberManualRecord } from "@mui/icons-material"
import ChatNotificationIcon from "@/components/icons/ChatNotificationIcon";
import UserDIcon from "@/components/icons/UserDIcon";

interface FixedHeaderProps {
    userName?: string
    userRole?: string
    lastLogin?: string
    showIcons?: boolean
}

export default function FixedHeader({
                                        userName = "Olalekan Babatunde",
                                        userRole = "Initiator",
                                        lastLogin = "Initiator",
                                        showIcons = true
                                    }: FixedHeaderProps) {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                right: 0,
                left: 280, // Sidebar width - adjust to match your sidebar
                height: 80,
                bgcolor: "white",
                borderBottom: "1px solid",
                borderColor: "grey.200",
                zIndex: 1200,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
               
            }}
        >
            {/* Left side - Last login */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "30px",
                    gap: 1,
                    bgcolor: "#F8FAFC",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                        bgcolor: "grey.200",
                        "& .status-dot": {
                            fontSize: 12
                        }
                    }
                }}
            >
                <FiberManualRecord
                    className="status-dot"
                    sx={{
                        fontSize: 12,
                        color: "#1C219F",
                        transition: "font-size 0.2s ease"
                    }}
                />
                <Typography variant="body2" color="#A0AEC0" sx={{fontSize: "13px"}}>
                    Your last login was recorded on: {lastLogin}
                </Typography>
            </Box>

            {/* Right side - Icons and user info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {showIcons && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton size="small" sx={{ color: "grey.600" }}>
                            <ChatNotificationIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "grey.600" }}>
                            <UserDIcon />
                        </IconButton>
                    </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ color: "text.secondary", mr: 1 }}>
                        {userName} |
                    </Box>
                    <Box component="span" sx={{color: "#A0AEC0", fontSize: "0.85rem", mr: 1}}>
                        {lastLogin}
                    </Box>
                    <Box component="span" sx={{ fontWeight: 600 }}>
                         {userRole}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}