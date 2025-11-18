import { useState, useEffect } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Divider,
} from "@mui/material";
import { Add, Delete, ArrowBack, Check } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar, { drawerWidth } from "../components/Sidebar";
import FixedHeader from "../components/FixedHeader";

interface Successor {
    id: number;
    name: string;
    role: string;
    email: string;
}

export default function AccountOpeningStep3() {
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [successors, setSuccessors] = useState<Successor[]>([
        { id: 1, name: "", role: "", email: "" },
    ]);
    const [signingAuthority, setSigningAuthority] = useState("");
    const [transactionLimit, setTransactionLimit] = useState("");
    const [specialInstructions, setSpecialInstructions] = useState("");

    const addSuccessor = () => {
        setSuccessors([
            ...successors,
            { id: successors.length + 1, name: "", role: "", email: "" },
        ]);
    };

    const removeSuccessor = (id: number) => {
        if (successors.length > 1) {
            setSuccessors(successors.filter((s) => s.id !== id));
        }
    };

    const updateSuccessor = (id: number, field: string, value: string) => {
        setSuccessors(
            successors.map((s) => (s.id === id ? { ...s, [field]: value } : s))
        );
    };

    const handleSubmit = () => {
        // Validation
        const hasEmptyFields = successors.some(
            (s) => !s.name || !s.role || !s.email
        );
        
        if (hasEmptyFields || !signingAuthority || !transactionLimit) {
            alert("Please fill in all required fields");
            return;
        }

        // Submit logic here
        alert("Operations successors configured successfully!");
        navigate("/account-opening/step-1");
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
            <Sidebar />
            <FixedHeader userName="Olalekan Babatunde" userRole="Super Admin" showIcons={true} />

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
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                        Operations Successors
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Configure authorized signatories and account permissions
                    </Typography>
                </Box>

                {/* Successors Card */}
                <Card sx={{ p: 4, mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Typography variant="h6" fontWeight="600">
                            Authorized Signatories
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={addSuccessor}
                            sx={{
                                borderColor: "#00CECE",
                                color: "#00CECE",
                                "&:hover": { borderColor: "#00B8B8", bgcolor: "#f0fffe" },
                                textTransform: "none",
                            }}
                        >
                            Add Signatory
                        </Button>
                    </Box>

                    {successors.map((successor, index) => (
                        <Box key={successor.id}>
                            <Grid container spacing={3} sx={{ mb: 3 }}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        variant="outlined"
                                        value={successor.name}
                                        onChange={(e) =>
                                            updateSuccessor(successor.id, "name", e.target.value)
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            value={successor.role}
                                            label="Role"
                                            onChange={(e) =>
                                                updateSuccessor(successor.id, "role", e.target.value)
                                            }
                                        >
                                            <MenuItem value="Managing Director">Managing Director</MenuItem>
                                            <MenuItem value="Director">Director</MenuItem>
                                            <MenuItem value="CFO">Chief Financial Officer</MenuItem>
                                            <MenuItem value="Treasurer">Treasurer</MenuItem>
                                            <MenuItem value="Accountant">Accountant</MenuItem>
                                            <MenuItem value="Secretary">Company Secretary</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        type="email"
                                        variant="outlined"
                                        value={successor.email}
                                        onChange={(e) =>
                                            updateSuccessor(successor.id, "email", e.target.value)
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={1} sx={{ display: "flex", alignItems: "center" }}>
                                    {successors.length > 1 && (
                                        <IconButton
                                            onClick={() => removeSuccessor(successor.id)}
                                            sx={{ color: "error.main" }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    )}
                                </Grid>
                            </Grid>
                            {index < successors.length - 1 && <Divider sx={{ mb: 3 }} />}
                        </Box>
                    ))}
                </Card>

                {/* Account Configuration Card */}
                <Card sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
                        Account Configuration
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Signing Authority</InputLabel>
                                <Select
                                    value={signingAuthority}
                                    label="Signing Authority"
                                    onChange={(e) => setSigningAuthority(e.target.value)}
                                >
                                    <MenuItem value="Single">Single Signatory</MenuItem>
                                    <MenuItem value="Joint-Any2">Joint Signatories (Any 2)</MenuItem>
                                    <MenuItem value="Joint-Any3">Joint Signatories (Any 3)</MenuItem>
                                    <MenuItem value="All">All Signatories Required</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Daily Transaction Limit</InputLabel>
                                <Select
                                    value={transactionLimit}
                                    label="Daily Transaction Limit"
                                    onChange={(e) => setTransactionLimit(e.target.value)}
                                >
                                    <MenuItem value="1000000">₦1,000,000</MenuItem>
                                    <MenuItem value="5000000">₦5,000,000</MenuItem>
                                    <MenuItem value="10000000">₦10,000,000</MenuItem>
                                    <MenuItem value="50000000">₦50,000,000</MenuItem>
                                    <MenuItem value="100000000">₦100,000,000</MenuItem>
                                    <MenuItem value="unlimited">Unlimited</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Special Instructions (Optional)"
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Add any special instructions, restrictions, or notes for this account..."
                                value={specialInstructions}
                                onChange={(e) => setSpecialInstructions(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Card>

                {/* Additional Settings Card */}
                <Card sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
                        Additional Settings
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Statement Frequency</InputLabel>
                                <Select
                                    label="Statement Frequency"
                                    defaultValue="Monthly"
                                >
                                    <MenuItem value="Daily">Daily</MenuItem>
                                    <MenuItem value="Weekly">Weekly</MenuItem>
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Notification Method</InputLabel>
                                <Select
                                    label="Notification Method"
                                    defaultValue="Email-SMS"
                                >
                                    <MenuItem value="Email">Email Only</MenuItem>
                                    <MenuItem value="SMS">SMS Only</MenuItem>
                                    <MenuItem value="Email-SMS">Email & SMS</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Card>

                {/* Navigation Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate(`/account-opening/review/${customerId}`)}
                        sx={{
                            borderColor: "#1C219F",
                            color: "#1C219F",
                            "&:hover": { borderColor: "#151873", bgcolor: "#f0f0ff" },
                            textTransform: "none",
                            px: 4,
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<Check />}
                        onClick={handleSubmit}
                        sx={{
                            bgcolor: "#00CECE",
                            "&:hover": { bgcolor: "#00B8B8" },
                            textTransform: "none",
                            px: 4,
                        }}
                    >
                        Complete Setup
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}