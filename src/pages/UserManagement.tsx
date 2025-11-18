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
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Alert,
    LinearProgress,
    Stepper,
    Step,
    StepLabel,
    Chip,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Sidebar, { drawerWidth } from "@/components/Sidebar";
import FixedHeader from "@/components/FixedHeader";

interface User {
    id: string;
    fullName: string;
    email: string;
    role: "Super_Admin" | "Admin" | "Relationship_Manager" | "Operation";
    staffId: string;
    daoCode: string;
    branch: string;
    status: "Active" | "Inactive";
}

interface FormData {
    fullName: string;
    email: string;
    staffId: string;
    daoCode: string;
    branch: string;
    role: string;
}

// ===== NEW: BULK UPLOAD TYPES =====
interface BulkUploadRecord {
    fullName: string;
    email: string;
    staffId: string;
    daoCode: string;
    branch: string;
    role: string;
    status: "pending" | "success" | "error";
    message?: string;
}
// ===== END NEW =====

const INITIAL_USERS: User[] = [
    {
        id: "1",
        fullName: "Olalekan Aminu",
        email: "OlalekanAminu@gmail.com",
        role: "Admin",
        staffId: "011",
        daoCode: "011",
        branch: "Lekki",
        status: "Active",
    },
    {
        id: "2",
        fullName: "Precious Nwoko",
        email: "OlalekanAminu@gmail.com",
        role: "Relationship_Manager",
        staffId: "102",
        daoCode: "102",
        branch: "Ikoyi",
        status: "Active",
    },
    {
        id: "3",
        fullName: "Victor David",
        email: "VictorDavid@gmail.com",
        role: "Admin",
        staffId: "003",
        daoCode: "003",
        branch: "Lagos Island",
        status: "Active",
    },
    {
        id: "4",
        fullName: "Precious Matthew",
        email: "PreciousMatthew@gmail.com",
        role: "Operation",
        staffId: "234",
        daoCode: "234",
        branch: "Lekki",
        status: "Inactive",
    },
    {
        id: "5",
        fullName: "Olalekan Victor",
        email: "OlalekanVictor@gmail.com",
        role: "Relationship_Manager",
        staffId: "345",
        daoCode: "345",
        branch: "Victoria Island",
        status: "Active",
    },
];

const ROLES = ["Super_Admin", "Admin", "Relationship_Manager", "Operation"];

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");

    // Dialog states
    const [openAddUser, setOpenAddUser] = useState(false);
    const [openEditUser, setOpenEditUser] = useState(false);
    const [openDeactivate, setOpenDeactivate] = useState(false);
    const [openActivate, setOpenActivate] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // ===== NEW: BULK UPLOAD DIALOG STATES =====
    const [openBulkUpload, setOpenBulkUpload] = useState(false);
    const [bulkUploadStep, setBulkUploadStep] = useState(0);
    const [bulkRecords, setBulkRecords] = useState<BulkUploadRecord[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [bulkPage, setBulkPage] = useState(0);
    // ===== END NEW =====

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        staffId: "",
        daoCode: "",
        branch: "",
        role: "",
    });

    // Handlers
    const handleAddUserOpen = () => {
        setFormData({
            fullName: "",
            email: "",
            staffId: "",
            daoCode: "",
            branch: "",
            role: "",
        });
        setOpenAddUser(true);
    };

    const handleFormChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent<string>
    ) => {
        // normalize target so it works with TextField and Select
        const target = e.target as { name?: string; value: unknown };
        const { name, value } = target;
        if (!name) return;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateUser = () => {
        const newUser: User = {
            id: String(users.length + 1),
            fullName: formData.fullName,
            email: formData.email,
            role: formData.role as User["role"],
            staffId: formData.staffId,
            daoCode: formData.daoCode,
            branch: formData.branch,
            status: "Active",
        };
        setUsers([...users, newUser]);
        setOpenAddUser(false);
        setSuccessMessage("User created successfully");
        setOpenSuccess(true);
    };

    const handleEditUserOpen = (user: User) => {
        setSelectedUser(user);
        setFormData({
            fullName: user.fullName,
            email: user.email,
            staffId: user.staffId,
            daoCode: user.daoCode,
            branch: user.branch,
            role: user.role,
        });
        setOpenEditUser(true);
    };

    const handleSaveChanges = () => {
        if (selectedUser) {
            setUsers(
                users.map((u) =>
                    u.id === selectedUser.id
                        ? {
                            ...u,
                            fullName: formData.fullName,
                            email: formData.email,
                            staffId: formData.staffId,
                            daoCode: formData.daoCode,
                            branch: formData.branch,
                            role: formData.role as User["role"],
                        }
                        : u
                )
            );
            setOpenEditUser(false);
            setSuccessMessage("User updated successfully");
            setOpenSuccess(true);
        }
    };

    const handleDeactivateUser = (user: User) => {
        setSelectedUser(user);
        setOpenDeactivate(true);
    };

    const handleActivateUser = (user: User) => {
        setSelectedUser(user);
        setOpenActivate(true);
    };

    const confirmDeactivate = () => {
        if (selectedUser) {
            setUsers(
                users.map((u) =>
                    u.id === selectedUser.id ? { ...u, status: "Inactive" } : u
                )
            );
            setOpenDeactivate(false);
            setSuccessMessage("User deactivated successfully");
            setOpenSuccess(true);
        }
    };

    const confirmActivate = () => {
        if (selectedUser) {
            setUsers(
                users.map((u) =>
                    u.id === selectedUser.id ? { ...u, status: "Active" } : u
                )
            );
            setOpenActivate(false);
            setSuccessMessage("User activated successfully");
            setOpenSuccess(true);
        }
    };

    // ===== NEW: BULK UPLOAD HANDLERS =====
    const handleBulkUploadOpen = () => {
        setBulkUploadStep(0);
        setBulkRecords([]);
        setUploadProgress(0);
        setOpenBulkUpload(true);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const mockRecords: BulkUploadRecord[] = [
            {
                fullName: "Joshua Matthew",
                email: "joshua@gmail.com",
                staffId: "250",
                daoCode: "250",
                branch: "Lekki",
                role: "Admin",
                status: "pending",
            },
            {
                fullName: "Samuel David",
                email: "samuel@gmail.com",
                staffId: "251",
                daoCode: "251",
                branch: "Ikoyi",
                role: "Relationship_Manager",
                status: "pending",
            },
            {
                fullName: "Chioma Okafor",
                email: "chioma@gmail.com",
                staffId: "252",
                daoCode: "252",
                branch: "Lagos Island",
                role: "Operation",
                status: "pending",
            },
        ];

        setBulkRecords(mockRecords);
        setBulkUploadStep(1);
    };

    const handleProcessBulkUpload = () => {
        setBulkUploadStep(2);
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setBulkRecords((prev) =>
                    prev.map((record) => ({ ...record, status: "success" }))
                );
            }
            setUploadProgress(progress);
        }, 300);
    };

    const handleCompleteBulkUpload = () => {
        const newUsers = bulkRecords
            .filter((r) => r.status === "success")
            .map((r, idx) => ({
                id: String(users.length + idx + 1),
                fullName: r.fullName,
                email: r.email,
                role: r.role as User["role"],
                staffId: r.staffId,
                daoCode: r.daoCode,
                branch: r.branch,
                status: "Active" as const,
            }));

        setUsers([...users, ...newUsers]);
        setOpenBulkUpload(false);
        setSuccessMessage(`${newUsers.length} users imported successfully`);
        setOpenSuccess(true);
    };
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

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "All Status" || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const paginatedUsers = filteredUsers.slice(
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
                    py: 3,
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
                        alignItems: "center",
                        mb: 3,
                        mt: -6,
                        bgcolor: "white",
                        borderRadius: "8px",
                        p: 3,
                    }}
                >
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'black' }}>
                            User Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            View, edit, and manage user access and control
                        </Typography>
                    </Box>
                    {/* ===== NEW: BULK UPLOAD BUTTON =====  */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            onClick={handleBulkUploadOpen}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                borderColor: "#00CECE",
                                color: "#00CECE",
                                "&:hover": { borderColor: "#00BFBF", bgcolor: "rgba(0, 206, 206, 0.05)" },
                            }}
                        >
                            Upload Bulk Users
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleAddUserOpen}
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
                            + Add New User
                        </Button>
                    </Box>
                    {/* ===== END NEW =====  */}
                </Box>

                {/* Search and Filter */}
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <TextField
                        placeholder="Search User"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ flex: 1, maxWidth: 300 }}
                    />
                    <FormControl sx={{ minWidth: 150 }} size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <MenuItem value="All Status">All Status</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Table */}
                <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: "#1C219F" }}>
                                <TableRow>
                                    {[
                                        "Full Name",
                                        "Email",
                                        "Role",
                                        "Staff ID",
                                        "DAO Code",
                                        "Branch",
                                        "Status",
                                        "Action",
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
                                {paginatedUsers.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            "&:hover": { bgcolor: "rgba(0, 206, 206, 0.05)" },
                                        }}
                                    >
                                        <TableCell>{user.fullName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role.replace(/_/g, " ")}</TableCell>
                                        <TableCell>{user.staffId}</TableCell>
                                        <TableCell>{user.daoCode}</TableCell>
                                        <TableCell>{user.branch}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "inline-block",
                                                    bgcolor:
                                                        user.status === "Active"
                                                            ? "rgba(209, 250, 229, 0.9)"
                                                            : "rgba(254, 226, 226, 0.9)",
                                                    color:
                                                        user.status === "Active"
                                                            ? "success.main"
                                                            : "error.main",
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: "20px",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {user.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEditUserOpen(user)}
                                                sx={{ color: "#00CECE" }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    user.status === "Active"
                                                        ? handleDeactivateUser(user)
                                                        : handleActivateUser(user)
                                                }
                                                sx={{
                                                    color: user.status === "Active" ? "error.main" : "success.main",
                                                }}
                                            >
                                                {user.status === "Active" ? (
                                                    <DeleteIcon fontSize="small" />
                                                ) : (
                                                    <CheckCircleIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Card>

                {/* Add User Dialog */}
                <Dialog
                    open={openAddUser}
                    onClose={() => setOpenAddUser(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 18 }}>
                        Add New User
                    </DialogTitle>
                    <DialogContent sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            placeholder="Enter Full Name"
                            value={formData.fullName}
                            onChange={handleFormChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleFormChange}
                            margin="normal"
                        />
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Staff Code"
                                name="staffId"
                                placeholder="Enter Staff Code"
                                value={formData.staffId}
                                onChange={handleFormChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="DAO Code"
                                name="daoCode"
                                placeholder="Enter DAO Code"
                                value={formData.daoCode}
                                onChange={handleFormChange}
                                margin="normal"
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label="Branch"
                            name="branch"
                            placeholder="Enter Branch"
                            value={formData.branch}
                            onChange={handleFormChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={formData.role}
                                label="Role"
                                onChange={handleFormChange}
                            >
                                {ROLES.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role.replace(/_/g, " ")}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setOpenAddUser(false)}>Cancel</Button>
                        <Button
                            onClick={handleCreateUser}
                            variant="contained"
                            sx={{ bgcolor: "#00CECE", "&:hover": { bgcolor: "#00BFBF" } }}
                        >
                            Create User
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit User Dialog */}
                <Dialog
                    open={openEditUser}
                    onClose={() => setOpenEditUser(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 18 }}>
                        Edit User
                    </DialogTitle>
                    <DialogContent sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleFormChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            margin="normal"
                        />
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Staff Code"
                                name="staffId"
                                value={formData.staffId}
                                onChange={handleFormChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="DAO Code"
                                name="daoCode"
                                value={formData.daoCode}
                                onChange={handleFormChange}
                                margin="normal"
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label="Branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleFormChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={formData.role}
                                label="Role"
                                onChange={handleFormChange}
                            >
                                {ROLES.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role.replace(/_/g, " ")}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setOpenEditUser(false)}>Cancel</Button>
                        <Button
                            onClick={handleSaveChanges}
                            variant="contained"
                            sx={{ bgcolor: "#00CECE", "&:hover": { bgcolor: "#00BFBF" } }}
                        >
                            Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Deactivate Confirmation */}
                <Dialog open={openDeactivate} onClose={() => setOpenDeactivate(false)}>
                    <DialogTitle sx={{ fontWeight: 600 }}>Deactivate User</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to proceed? This action cannot be undone once confirmed.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setOpenDeactivate(false)}>Cancel</Button>
                        <Button
                            onClick={confirmDeactivate}
                            variant="contained"
                            sx={{ bgcolor: "#EF4444", "&:hover": { bgcolor: "#DC2626" } }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Activate Confirmation */}
                <Dialog open={openActivate} onClose={() => setOpenActivate(false)}>
                    <DialogTitle sx={{ fontWeight: 600 }}>Activate User</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to proceed? This action cannot be undone once confirmed.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setOpenActivate(false)}>Cancel</Button>
                        <Button
                            onClick={confirmActivate}
                            variant="contained"
                            sx={{ bgcolor: "#00CECE", "&:hover": { bgcolor: "#00BFBF" } }}
                        >
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Success Dialog */}
                <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)}>
                    <DialogContent sx={{ textAlign: "center", py: 4 }}>
                        <CheckCircleIcon
                            sx={{ fontSize: 64, color: "success.main", mb: 2 }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            Operation Successful
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {successMessage}
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                        <Button
                            onClick={() => setOpenSuccess(false)}
                            variant="contained"
                            sx={{ bgcolor: "#00CECE", "&:hover": { bgcolor: "#00BFBF" } }}
                        >
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ===== NEW: BULK UPLOAD DIALOG ===== */}
                <Dialog
                    open={openBulkUpload}
                    onClose={() => setOpenBulkUpload(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle sx={{ fontWeight: 600, fontSize: 18 }}>
                        Upload Bulk Users
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3 }}>
                        <Stepper activeStep={bulkUploadStep} sx={{ mb: 3 }}>
                            <Step>
                                <StepLabel>Upload File</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Review</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Complete</StepLabel>
                            </Step>
                        </Stepper>

                        {/* Step 0: File Upload */}
                        {bulkUploadStep === 0 && (
                            <Box sx={{ textAlign: "center", py: 4 }}>
                                <CloudUploadIcon sx={{ fontSize: 64, color: "#00CECE", mb: 2 }} />
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Drag and drop your file here, or click to browse
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    Supported formats: CSV, Excel (.xlsx)
                                </Typography>
                                <input
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    onChange={handleFileUpload}
                                    style={{ display: "none" }}
                                    id="bulk-file-input"
                                />
                                <label htmlFor="bulk-file-input">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        sx={{ bgcolor: "#00CECE", "&:hover": { bgcolor: "#00BFBF" } }}
                                    >
                                        Choose file
                                    </Button>
                                </label>
                            </Box>
                        )}

                        {/* Step 1: Review */}
                        {bulkUploadStep === 1 && (
                            <Box>
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    Review the records below before proceeding. {bulkRecords.length} records found.
                                </Alert>
                                <TableContainer sx={{ maxHeight: 400, overflow: "auto" }}>
                                    <Table size="small">
                                        <TableHead sx={{ bgcolor: "#F3F4F6" }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                                                <TableCell sx={{ fontWeight: 600 }}>Branch</TableCell>
                                                <TableCell sx={{ fontWeight: 600 }} align="center">
                                                    Status
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bulkRecords.slice(bulkPage * 5, bulkPage * 5 + 5).map((record, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell>{record.fullName}</TableCell>
                                                    <TableCell>{record.email}</TableCell>
                                                    <TableCell>{record.role.replace(/_/g, " ")}</TableCell>
                                                    <TableCell>{record.branch}</TableCell>
                                                    <TableCell align="center">
                                                        <Chip
                                                            label="Pending"
                                                            size="small"
                                                            variant="outlined"
                                                            color="warning"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {bulkRecords.length > 5 && (
                                    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                                        <Button
                                            onClick={() => setBulkPage(Math.max(0, bulkPage - 1))}
                                            disabled={bulkPage === 0}
                                        >
                                            Previous
                                        </Button>
                                        <Typography variant="body2">
                                            Page {bulkPage + 1} of {Math.ceil(bulkRecords.length / 5)}
                                        </Typography>
                                        <Button
                                            onClick={() => setBulkPage(bulkPage + 1)}
                                            disabled={(bulkPage + 1) * 5 >= bulkRecords.length}
                                        >
                                            Next
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* Step 2: Processing */}
                        {bulkUploadStep === 2 && (
                            <Box sx={{ py: 4 }}>
                                <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
                                    Processing Upload...
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="body2">Progress</Typography>
                                        <Typography variant="body2">{Math.round(uploadProgress)}%</Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={uploadProgress}
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>
                                {uploadProgress === 100 && (
                                    <Alert severity="success" sx={{ mt: 3 }}>
                                        All {bulkRecords.length} records uploaded successfully!
                                    </Alert>
                                )}
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        {bulkUploadStep === 0 && (
                            <>
                                <Button onClick={() => setOpenBulkUpload(false)}>Cancel</Button>
                            </>
                        )}
                        {bulkUploadStep === 1 && (
                            <>
                                <Button onClick={() => setBulkUploadStep(0)}>Back</Button>
                                <Button
                                    onClick={handleProcessBulkUpload}
                                    variant="contained"
                                    sx={{ bgcolor: "#00CECE", "&:hover": { bgcolor: "#00BFBF" } }}
                                >
                                    Proceed
                                </Button>
                            </>
                        )}
                        {bulkUploadStep === 2 && uploadProgress === 100 && (
                            <>
                                <Button onClick={() => setOpenBulkUpload(false)}>Cancel</Button>
                                <Button
                                    onClick={handleCompleteBulkUpload}
                                    variant="contained"
                                    sx={{ bgcolor: "#00CECE", "&:hover": { bgcolor: "#00BFBF" } }}
                                >
                                    Complete
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>
                {/* ===== END NEW: BULK UPLOAD DIALOG ===== */}
            </Box>
        </Box>
    );
}

