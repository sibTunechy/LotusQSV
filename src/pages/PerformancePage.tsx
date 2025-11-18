import { useState } from "react";
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    InputAdornment,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import SearchOutlineIcon from "@/components/icons/SearchOutlineIcon";
import DoubleArrowIcon from "@/components/icons/DoubleArrowIcon";
import CalendarOutlinedIcon from "@/components/icons/CalendarOutlinedIcon";
import {
    Search,
    FileDownload,
    KeyboardArrowDown,
    ChevronLeft,
    ChevronRight,
    CalendarToday,
} from "@mui/icons-material";
import Sidebar, { drawerWidth } from "../components/Sidebar";
import FixedHeader from "../components/FixedHeader";

// Dummy performance data - 20 entries for pagination
const performanceData = [
    { rank: "01", officerName: "Tunde Bakare", rmCode: "450", branch: "Lekki Admiralty", accountOpened: "1100", rewardEarned: "15,000" },
    { rank: "02", officerName: "Ngozi Okonkwo", rmCode: "550", branch: "Head Office", accountOpened: "900", rewardEarned: "12,000" },
    { rank: "03", officerName: "Ibrahim Hassan", rmCode: "123", branch: "Ahmed Onibdo", accountOpened: "800", rewardEarned: "11,000" },
    { rank: "04", officerName: "Victor Ozioma", rmCode: "234", branch: "Obalende", accountOpened: "600", rewardEarned: "10,000" },
    { rank: "05", officerName: "Joshua Matthew", rmCode: "456", branch: "Ikoyi", accountOpened: "500", rewardEarned: "9,000" },
    { rank: "06", officerName: "Precious Nwoko", rmCode: "567", branch: "Obalende", accountOpened: "450", rewardEarned: "8,900" },
    { rank: "07", officerName: "Olalekan Aminu", rmCode: "678", branch: "Obalende", accountOpened: "400", rewardEarned: "7,500" },
    { rank: "08", officerName: "Chioma Adeleke", rmCode: "789", branch: "Victoria Island", accountOpened: "380", rewardEarned: "7,200" },
    { rank: "09", officerName: "Emeka Okafor", rmCode: "890", branch: "Ikeja", accountOpened: "350", rewardEarned: "6,800" },
    { rank: "10", officerName: "Fatima Bello", rmCode: "321", branch: "Surulere", accountOpened: "340", rewardEarned: "6,500" },
    { rank: "11", officerName: "Ahmed Musa", rmCode: "432", branch: "Yaba", accountOpened: "320", rewardEarned: "6,200" },
    { rank: "12", officerName: "Blessing Okafor", rmCode: "543", branch: "Apapa", accountOpened: "310", rewardEarned: "6,000" },
    { rank: "13", officerName: "Chidi Okeke", rmCode: "654", branch: "Festac", accountOpened: "290", rewardEarned: "5,800" },
    { rank: "14", officerName: "Aisha Ibrahim", rmCode: "765", branch: "Marina", accountOpened: "280", rewardEarned: "5,500" },
    { rank: "15", officerName: "Kunle Adeyemi", rmCode: "876", branch: "Ajah", accountOpened: "270", rewardEarned: "5,300" },
    { rank: "16", officerName: "Nneka Chukwu", rmCode: "987", branch: "Gbagada", accountOpened: "260", rewardEarned: "5,100" },
    { rank: "17", officerName: "Yusuf Abdullahi", rmCode: "147", branch: "Ketu", accountOpened: "250", rewardEarned: "4,900" },
    { rank: "18", officerName: "Grace Eze", rmCode: "258", branch: "Oshodi", accountOpened: "240", rewardEarned: "4,700" },
    { rank: "19", officerName: "David Ogunleye", rmCode: "369", branch: "Ikorodu", accountOpened: "230", rewardEarned: "4,500" },
    { rank: "20", officerName: "Halima Suleiman", rmCode: "741", branch: "Badagry", accountOpened: "220", rewardEarned: "4,300" },
];

export default function PerformancePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const rowsPerPage = 7;

    const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExportClose = () => {
        setAnchorEl(null);
    };

    const filteredData = performanceData.filter((row) =>
        row.officerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.rmCode.includes(searchQuery) ||
        row.branch.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= page - 1 && i <= page + 1)
            ) {
                pages.push(
                    <Button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        sx={{
                            minWidth: 40,
                            height: 40,
                            borderRadius: 1,
                            bgcolor: page === i ? "#F8F8F8" : "transparent",
                            color: page === i ? "black" : "text.primary",
                            transition: "border-color 0.2s ease",
                            "&:hover": {
                                border: "1px solid blue",         
                                backgroundColor: page=== page ? "#F8F8F8" : "white", 
                                
                                },
                        }}
                    >
                        {i}
                    </Button>
                );
            } else if (i === page - 2 || i === page + 2) {
                pages.push(
                    <Typography key={i} sx={{ px: 1 }}>
                        ...
                    </Typography>
                );
            }
        }
        return pages;
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F5F7FA" }}>
            <Sidebar />
            <FixedHeader userName="Olalekan Babatunde" userRole="Initiator" showIcons={true} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: "64px",
                    p: 4,
                    width: { xs: "100%", md: `calc(100vw - ${drawerWidth}px)` },
                }}
            >
                {/* Page Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "white", borderRadius: 4, mb: 3, height: "90px", }}>
                    <Box>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5, color: "#1a1a1a", ml:1.5 }}>
                            Performance
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ml: 1.5}}>
                            Easily track and process RMs Account Opening Operation
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<FileDownload />}
                        endIcon={<KeyboardArrowDown />}
                        onClick={handleExportClick}
                        sx={{
                            bgcolor: "#00CECE",
                            "&:hover": { bgcolor: "#00B8B8" },
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3,
                            py: 1,
                            fontWeight: "600",
                            mr: 1.8,
                        }}
                    >
                        Export Report
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleExportClose}
                    >
                        <MenuItem onClick={handleExportClose}>Excel</MenuItem>
                        <MenuItem onClick={handleExportClose}>CSV</MenuItem>
                    </Menu>
                </Box>


                {/* Table Card */}
                <Card sx={{ mt: 2, boxShadow: "none", border: "none", borderRadius: 5, }}>
                {/* Search and Date Filter */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, mt: 3, gap: 2, mr: 1.5, ml: 1.5 }}>
                    <TextField
                        placeholder="Search RM Name, Branch"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            width: 350,
                            bgcolor: "white",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchOutlineIcon sx={{ color: "#9CA3AF" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="outlined"
                        endIcon={<CalendarOutlinedIcon />}
                        sx={{
                            borderColor: "#E5E7EB",
                            color: "text.primary",
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3,
                            bgcolor: "white",
                            "&:hover": {
                                borderColor: "#D1D5DB",
                                bgcolor: "#F9FAFB",
                            },
                            "& .MuiButton-endIcon": {
                                ml: 5.5,
                                },
                        }}
                    >
                        01 Oct. 2025 - 10 Oct 2025
                    </Button>
                </Box> 
                <Box sx={{ mt: 3, mx: 2, px: 0.5 }}>
                    <TableContainer>
                        <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "#1C219F" }}>
                            {[
                                "Rank",
                                "Officer Name",
                                "RM Code",
                                "Branch",
                                "Account Opened",
                                "Reward Earned",
                            ].map((header) => (
                                <TableCell
                                key={header}
                                sx={{
                                    color: "white",
                                    fontWeight: "600",
                                    py: 2,
                                    whiteSpace: "nowrap",
                                }}
                                >
                                <Box
                                    sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    }}
                                >
                                    {header}
                                    <DoubleArrowIcon
                                    sx={{
                                        fontSize: "18px",
                                    }}
                                    />
                                </Box>
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currentData.map((row, index) => (
                            <TableRow
                                key={index}
                                hover
                                sx={{
                                "&:hover": { bgcolor: "#F9FAFB" },
                                }}
                            >
                                <TableCell sx={{ py: 2.5 }}>{row.rank}</TableCell>
                                <TableCell sx={{ py: 2.5, fontWeight: "500" }}>
                                {row.officerName}
                                </TableCell>
                                <TableCell sx={{ py: 2.5 }}>{row.rmCode}</TableCell>
                                <TableCell sx={{ py: 2.5 }}>{row.branch}</TableCell>
                                <TableCell sx={{ py: 2.5 }}>{row.accountOpened}</TableCell>
                                <TableCell sx={{ py: 2.5 }}>{row.rewardEarned}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>


                    {/* Pagination */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 3,
                            borderTop: "1px solid #E5E7EB",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                sx={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 1,
                                    "&:disabled": { opacity: 0.5 },
                                }}
                            >
                                <ChevronLeft />
                            </IconButton>
                            {renderPageNumbers()}
                            <IconButton
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                sx={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 1,
                                    "&:disabled": { opacity: 0.5 },
                                }}
                            >
                                <ChevronRight />
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}