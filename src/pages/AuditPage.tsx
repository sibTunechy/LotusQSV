"use client";

import { useState } from "react";
import {
    Box,
    Button,
    Card,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Menu,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import Sidebar, { drawerWidth } from "@/components/Sidebar";
import FixedHeader from "@/components/FixedHeader";

interface AuditLog {
    id: string;
    logId: string;
    action: string;
    performedBy: string;
    branch: string;
    ipAddress: string;
    timestamp: string;
}

const INITIAL_AUDIT_LOGS: AuditLog[] = [
    {
        id: "1",
        logId: "LOG-001",
        action: "Approve Request",
        performedBy: "admin@lotusbank.com",
        branch: "Lekki Admiralty",
        ipAddress: "192.728.1.45",
        timestamp: "7th of Aug, 2025 02:35 PM",
    },
    {
        id: "2",
        logId: "LOG-002",
        action: "Approve Request",
        performedBy: "rm@lotusbank.com",
        branch: "Head Office",
        ipAddress: "192.468.1.45",
        timestamp: "7th of Aug, 2025 02:35 PM",
    },
    {
        id: "3",
        logId: "LOG-003",
        action: "Export Report",
        performedBy: "rm@lotusbank.com",
        branch: "Ahmed Onibo",
        ipAddress: "192.568.1.45",
        timestamp: "7th of Aug, 2025 02:35 PM",
    },
    {
        id: "4",
        logId: "LOG-004",
        action: "Process Request",
        performedBy: "admin@lotusbank.com",
        branch: "Obalende",
        ipAddress: "192.768.1.45",
        timestamp: "7th of Aug, 2025 02:35 PM",
    },
    {
        id: "5",
        logId: "LOG-005",
        action: "User Login",
        performedBy: "rm@lotusbank.com",
        branch: "Ikoyi",
        ipAddress: "192.968.1.45",
        timestamp: "7th of Aug, 2025 02:35 PM",
    },
    {
        id: "6",
        logId: "LOG-006",
        action: "Dispatch Request",
        performedBy: "rm@lotusbank.com",
        branch: "Obalende",
        ipAddress: "192.168.1.45",
        timestamp: "7th of Aug, 2025 02:35 PM",
    },
    {
        id: "7",
        logId: "LOG-006",
        action: "Process Request",
        performedBy: "rm@lotusbank.com",
        branch: "Obalende",
        ipAddress: "192.168.1.45",
        timestamp: "7th of Aug, 2025 02:35 PM",
    },
    {
        id: "8",
        logId: "LOG-007",
        action: "User Login",
        performedBy: "admin@lotusbank.com",
        branch: "Victoria Island",
        ipAddress: "192.458.1.45",
        timestamp: "7th of Aug, 2025 02:35 PM",
    },
];

const ACTIONS = [
    "All Actions",
    "Approve Request",
    "Export Report",
    "Process Request",
    "User Login",
    "Dispatch Request",
];

export default function AuditTrailReporting() {
    const [logs, setLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState("");
    const [actionFilter, setActionFilter] = useState("All Actions");
    const [dateRange, setDateRange] = useState("01 Oct 2025 - 10 Oct 2025");

    // ===== NEW: EXPORT MENU STATES =====
    const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);
    // ===== END NEW =====

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // ===== NEW: EXPORT HANDLERS =====
    const handleExportClick = (e: React.MouseEvent<HTMLElement>) => {
        setExportAnchor(e.currentTarget);
    };

    const handleExportClose = () => {
        setExportAnchor(null);
    };

    const handleExport = (format: "CSV" | "Excel") => {
        // Mock export function
        console.log(`Exporting audit trail as ${format}`);
        handleExportClose();
    };
    // ===== END NEW =====

    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            log.logId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAction =
            actionFilter === "All Actions" || log.action === actionFilter;
        return matchesSearch && matchesAction;
    });

    const paginatedLogs = filteredLogs.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F9FAFB" }}>
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
                    mt: "60px",
                    px: 4,
                    py: 13,
                }}
            >
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
                        alignItems: "flex-start",
                        mb: 3,
                        mt: -6,
                    }}
                >
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'black' }}>
                            Audit Trail & Reporting
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Monitor system activities and generate compliance reports
                        </Typography>
                    </Box>

                    {/* ===== NEW: EXPORT REPORT BUTTON ===== */}
                    <Button
                        variant="contained"
                        endIcon={<FileDownloadIcon />}
                        onClick={handleExportClick}
                        sx={{
                            bgcolor: "#00CECE",
                            textTransform: "none",
                            fontWeight: 500,
                            fontSize: 16,
                            borderRadius: "12px",
                            px: 3,
                            py: 1.5,
                            "&:hover": { bgcolor: "#00BFBF" },
                        }}
                    >
                        Export Report
                    </Button>

                    {/* Export Menu */}
                    <Menu
                        anchorEl={exportAnchor}
                        open={Boolean(exportAnchor)}
                        onClose={handleExportClose}
                        PaperProps={{
                            sx: { mt: 1, borderRadius: "12px" },
                        }}
                    >
                        <MenuItem
                            onClick={() => handleExport("CSV")}
                            sx={{ fontFamily: "Manrope, sans-serif" }}
                        >
                            CSV
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleExport("Excel")}
                            sx={{ fontFamily: "Manrope, sans-serif" }}
                        >
                            Excel
                        </MenuItem>
                    </Menu>
                    {/* ===== END NEW ===== */}
                </Box>

                {/* Search, Filter & Date Range */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        mb: 3,
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        placeholder="Search by user, action"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: "#9CA3AF" }} />,
                        }}
                        sx={{ flex: 1, minWidth: 300 }}
                    />

                    <FormControl sx={{ minWidth: 180 }} size="small">
                        <InputLabel>All Actions</InputLabel>
                        <Select
                            value={actionFilter}
                            label="All Actions"
                            onChange={(e) => setActionFilter(e.target.value)}
                        >
                            {ACTIONS.map((action) => (
                                <MenuItem key={action} value={action}>
                                    {action}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        value={dateRange}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <CalendarTodayIcon sx={{ mr: 1, color: "#9CA3AF" }} />
                            ),
                        }}
                        sx={{ minWidth: 240 }}
                        readOnly
                    />
                </Box>

                {/* Table */}
                <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: "#1C219F" }}>
                                <TableRow>
                                    {[
                                        "Log ID",
                                        "Action",
                                        "Performed By",
                                        "Branch",
                                        "IP Address",
                                        "Timestamp",
                                    ].map((header) => (
                                        <TableCell
                                            key={header}
                                            sx={{
                                                color: "white",
                                                fontWeight: 600,
                                                fontSize: 14,
                                            }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedLogs.map((log) => (
                                    <TableRow
                                        key={log.id}
                                        sx={{
                                            "&:hover": { bgcolor: "rgba(0, 206, 206, 0.05)" },
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: 500 }}>{log.logId}</TableCell>
                                        <TableCell>{log.action}</TableCell>
                                        <TableCell>{log.performedBy}</TableCell>
                                        <TableCell>{log.branch}</TableCell>
                                        <TableCell>{log.ipAddress}</TableCell>
                                        <TableCell>{log.timestamp}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[4, 10, 25]}
                        component="div"
                        count={filteredLogs.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Card>
            </Box>
        </Box>
    );
}