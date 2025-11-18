// AccountOpeningStep1.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  TablePagination,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, CalendarToday, ChevronLeft, ChevronRight, MoreHoriz } from "@mui/icons-material";
import SearchOutlineIcon from "@/components/icons/SearchOutlineIcon";
import DoubleArrowIcon from "@/components/icons/DoubleArrowIcon";
import CalendarOutlinedIcon from "@/components/icons/CalendarOutlinedIcon";
import { useNavigate } from "react-router-dom";
import Sidebar, { drawerWidth } from "../components/Sidebar";
import FixedHeader from "../components/FixedHeader";

// Dummy data - Customer account opening requests
const customerAccountRequests = [
  { id: 1, customerName: "Tunde Bakare", phoneNumber: "08034567890", accountNumber: "10023456781", accountTier: "Tier 3", status: "Approved", timestamp: "2025-01-15 10:30 AM" },
  { id: 2, customerName: "Ngozi Okonkwo", phoneNumber: "08051234567", accountNumber: "20023456789", accountTier: "Tier 1", status: "Approved", timestamp: "2025-01-14 02:15 PM" },
  { id: 3, customerName: "Ibrahim Hassan", phoneNumber: "08078901234", accountNumber: "30023456784", accountTier: "Tier 1", status: "Pending", timestamp: "2025-01-14 09:45 AM" },
  { id: 4, customerName: "Victor Ozioma", phoneNumber: "08092345678", accountNumber: "10023456785", accountTier: "Tier 3", status: "Pending", timestamp: "2025-01-13 04:20 PM" },
  { id: 5, customerName: "Joshua Matthew", phoneNumber: "08105678901", accountNumber: "10023456786", accountTier: "Tier 3", status: "Rejected", timestamp: "2025-01-13 11:00 AM" },
  { id: 6, customerName: "Tunde Matthew", phoneNumber: "08123456789", accountNumber: "1002345667", accountTier: "Tier 3", status: "Pending", timestamp: "2025-01-12 03:30 PM" },
  { id: 7, customerName: "Precious Nwoko", phoneNumber: "08136789012", accountNumber: "10023456787", accountTier: "Tier 3", status: "Pending", timestamp: "2025-01-12 08:15 AM" },
  { id: 8, customerName: "Olalekan Aminu", phoneNumber: "08159012345", accountNumber: "10023456788", accountTier: "Tier 3", status: "Rejected", timestamp: "2025-01-11 01:45 PM" },
  { id: 9, customerName: "Bolanle Samuel", phoneNumber: "08178012345", accountNumber: "10023456799", accountTier: "Tier 3", status: "Pending", timestamp: "2025-01-11 01:45 PM" },
  { id: 10, customerName: "James Gamabari", phoneNumber: "08159077345", accountNumber: "10023456766", accountTier: "Tier 3", status: "Approved", timestamp: "2025-01-11 01:45 PM" },
  { id: 11, customerName: "Francis Durujaiye", phoneNumber: "08158812345", accountNumber: "10023456700", accountTier: "Tier 3", status: "Approved", timestamp: "2025-01-11 01:45 PM" },
  { id: 12, customerName: "Abidemi Emmanuel", phoneNumber: "08159017745", accountNumber: "10023456711", accountTier: "Tier 3", status: "Pending", timestamp: "2025-01-11 01:45 PM" },
  { id: 13, customerName: "Seun Olayemi", phoneNumber: "08144012345", accountNumber: "15623456788", accountTier: "Tier 3", status: "Rejected", timestamp: "2025-01-11 01:45 PM" },
  { id: 14, customerName: "Sami Benson", phoneNumber: "08155012345", accountNumber: "10993456788", accountTier: "Tier 3", status: "Rejected", timestamp: "2025-01-11 01:45 PM" },
];

type PaginationProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
};

// Custom pagination actions with ellipsis and styled buttons
function CustomPaginationActions({ count, page, rowsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(count / rowsPerPage);
  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, page - 1);
  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, page + 1);

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      if (page <= 2) {
        pages.push(0, 1, 2, "...", totalPages - 1);
      } else if (page >= totalPages - 3) {
        pages.push(0, "...", totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pages.push(0, "...", page - 1, page, page + 1, "...", totalPages - 1);
      }
    }

    return pages.map((p, idx) => { 
      if (p === "...") {
        return (
          <IconButton
            key={`ellipsis-${idx}`}
            disabled
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              color: "#9CA3AF",
              border: "1px solid transparent",
            }}
          >
            <MoreHoriz fontSize="small" />
          </IconButton>
        );
      }

      const pageIndex = p as number;
      return (
        <IconButton
          key={pageIndex}
          onClick={(e) => onPageChange(e, pageIndex)}
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            fontSize: "0.875rem",
            bgcolor: page === pageIndex ? "#F3F4F6" : "#fff",
            color: page === pageIndex ? "#000" : "#4B5563",
            border: "1px solid #E5E7EB",
            "&:hover": { bgcolor: "#F9FAFB" },
          }}
        >
          {pageIndex + 1}
        </IconButton>
      );
    });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        sx={{
          bgcolor: "#fff",
          border: "1px solid #E5E7EB",
          width: 36,
          height: 36,
          borderRadius: "10px",
          "&:hover": { bgcolor: "#F9FAFB" },
        }}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>

      {renderPageNumbers()}

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= totalPages - 1}
        sx={{
          bgcolor: "#fff",
          border: "1px solid #E5E7EB",
          width: 36,
          height: 36,
          borderRadius: "10px",
          "&:hover": { bgcolor: "#F9FAFB" },
        }}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function AccountOpeningStep1() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(7); // default 7
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Sort state for icon rotation only
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({ key: "", direction: "asc" });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return { background: "#E7F7EF", color: "#1E8E3E" };
      case "pending":
        return { background: "#FFF6D3", color: "#E6BB20" };
      case "rejected":
        return { background: "#FFEDEC", color: "#D32F2F" };
      default:
        return { background: "#F5F5F5", color: "#6B7280" };
    }
  };

  const filteredData = customerAccountRequests
    .filter((row) =>
      row.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.phoneNumber.includes(searchQuery) ||
      row.accountNumber.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((row) => (statusFilter === "All" ? true : row.status.toLowerCase() === statusFilter.toLowerCase()));

  const handleReviewClick = (customerId: number) => {
    navigate(`/account-opening/review/${customerId}`);
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      <Sidebar />
      <FixedHeader userName="Olalekan Babatunde" userRole="Super Admin" showIcons={true} />

      <Box component="main" sx={{ flexGrow: 1, mt: "64px", p: 2, width: { xs: "100%", md: `calc(100vw - ${drawerWidth}px)` } }}>
        {/* Page Header */}
        <Box sx={{ mb: 4, bgcolor: "white", borderRadius: 4, height: "80px", width: "100%", mr: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, mt: 1.5, ml: 2, pt: 1 }}>Account Opening</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "15px", ml: 2 }}>
            Easily track and process RMs Account Opening Operations
          </Typography>
        </Box>

        {/* Search and Filters Card */}
        <Card sx={{  boxShadow: "none", border: "none", borderRadius: "12px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, flexWrap: "wrap", gap: 2, mr: 1.5, ml: 1.5, }}>
            <TextField
              placeholder="Search ID, Customer, Type, Channel"
              variant="outlined"
              size="medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: 350, "& .MuiOutlinedInput-root": { borderRadius: "13px" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                size="medium"
                sx={{ bgcolor: "white", borderRadius: "8px", px: 2, height: "55px", minWidth: "150px", "& .MuiSelect-select": { display: "flex", alignItems: "center" } }}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>

              <Button
                variant="outlined"
                endIcon={<CalendarOutlinedIcon />}
                sx={{ borderColor: "#E5E7EB", display: "flex", flexDirection: "space-between", color: "text.primary", textTransform: "none", width: "320px", borderRadius: "8px", height: "55px", px: 3, bgcolor: "white", "&:hover": { borderColor: "#D1D5DB", bgcolor: "#F9FAFB",},"& .MuiButton-endIcon": {
                      ml: 5.5,
                    }, 
                  }}
              >
                01 Oct. 2025 - 10 Oct. 2025
              </Button>
            </Box>
          </Box>

          {/* Table with inset header */}
          <Box sx={{ mt: 3, mx: 2, px: 0.5 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#1C219F", borderRadius: "8px 8px 0 0", "& th": { borderBottom: "none" } }}>
                    {["Customer Name", "Phone Number", "Account Number", "Account Tier", "Status", "Timestamp", "Action"].map((header) => (
                      <TableCell
                        key={header}
                        sx={{ color: "white", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap", borderBottom: "none", pl: 2, pr: 2 }}
                        align={header === "Action" ? "center" : "left"}
                        onClick={() => handleSort(header)}
                      >
                        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, justifyContent: header === "Action" ? "center" : "flex-start" }}>
                          {header}
                          <Box component="span" sx={{ display: "flex", transform: sortConfig.key === header && sortConfig.direction === "asc" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
                            <DoubleArrowIcon />
                          </Box>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const statusColors = getStatusColor(row.status);
                    return (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ fontWeight: "500" }}>{row.customerName}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{row.accountNumber}</TableCell>
                        <TableCell>
                          <Chip label={row.accountTier} size="small" sx={{ fontWeight: "500", border: "none", boxShadow: "none", bgcolor: "transparent" }} />
                        </TableCell>
                        <TableCell>
                          <Chip label={row.status} size="medium" sx={{ width: "130px", fontWeight: "500", bgcolor: statusColors.background, color: statusColors.color }} />
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.875rem", color: "text.secondary" }}>{row.timestamp}</TableCell>
                        <TableCell align="center">
                          <IconButton size="small" onClick={() => handleReviewClick(row.id)} sx={{ display: "flex", alignItems: "center", gap: 0.8, fontWeight: 500 }} title="Review Application">
                            <Visibility fontSize="small" />
                            <Typography variant="body2" sx={{ ml: 0.3, fontSize: "0.85rem", fontWeight: 500 }}>Review</Typography>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Pagination */}
            <Box
              sx={{
                mt: 2,
                px: 2,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Left side: Showing entries */}
              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                  fontSize: "0.875rem",
                  ml: 0.5,
                }}
              >
                Showing {page * rowsPerPage + 1} to{" "}
                {Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
                {filteredData.length} entries
              </Typography>

              {/* Right side: Pagination buttons */}
              <CustomPaginationActions
                count={filteredData.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
              />
            </Box>
        </Card>
      </Box>
    </Box>
  );
}
