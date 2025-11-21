import { useState, useEffect } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Grid,
    TextField,
    Paper,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import {
    ArrowBack,
    CheckCircle,
    FileDownload,
} from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from "react-router-dom";
import Sidebar, { drawerWidth } from "../components/Sidebar";
import FixedHeader from "../components/FixedHeader";

// Dummy customer data with detailed information
const customerDetailedData = {
    1: {
        id: 1,
        customerName: "Tunde Bakare",
        bvn: "10123456789",
        accountNumber: "10123456789",
        gender: "Male",
        phoneNumber: "08123456789",
        preferredNumber: "08123456789",
        email: "olalekan1650@gmail.com",
        residentialAddress: "------------",
        documents: {
            utility: {
                name: "Photo.png",
                uploadedBy: "Olalekan Babatunde",
                uploadedDate: "October 11th, 2024",
                status: "uploaded",
            },
            validId: {
                name: "ID-document.pdf",
                uploadedBy: "Olalekan Babatunde",
                uploadedDate: "October 11th, 2024",
                status: "uploaded",
            },
            signature: {
                name: "Joshua-signature.png",
                uploadedBy: "Olalekan Babatunde",
                uploadedDate: "October 11th, 2024",
                status: "uploaded",
            },
        },
    },
    2: {
        id: 2,
        customerName: "Chioma Ventures",
        bvn: "20123456789",
        accountNumber: "20123456789",
        gender: "Female",
        phoneNumber: "08134567890",
        preferredNumber: "08134567890",
        email: "chioma@ventures.com",
        residentialAddress: "28 Ogudu Road, Ojota, Lagos",
        documents: {
            utility: {
                name: "Utility-Bill.pdf",
                uploadedBy: "Admin User",
                uploadedDate: "October 10th, 2024",
                status: "uploaded",
            },
            validId: {
                name: "National-ID.pdf",
                uploadedBy: "Admin User",
                uploadedDate: "October 10th, 2024",
                status: "uploaded",
            },
            signature: {
                name: "Signature.png",
                uploadedBy: "Admin User",
                uploadedDate: "October 10th, 2024",
                status: "uploaded",
            },
        },
    },
};

export default function AccountOpeningStep() {
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [customerData, setCustomerData] = useState<any>(null);

    useEffect(() => {
        let id = 1; // default customer
      
        if (customerId) {
          id = parseInt(customerId);
        }
      
        const data = customerDetailedData[id];
        setCustomerData(data || null);
      }, [customerId]);

    useEffect(() => {
        if (customerId) {
            const data = customerDetailedData[parseInt(customerId) as keyof typeof customerDetailedData];
            setCustomerData(data || null);
        }
    }, [customerId]);

    if (!customerData) {
        return (
            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
                <Sidebar />
                <FixedHeader userName="Olalekan Babatunde" userRole="Initiator" showIcons={true} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        mt: "64px",
                        p: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h6" color="text.secondary">
                        Customer data not found
                    </Typography>
                </Box>
            </Box>
        );
    }

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
                    width: { xs: "100%", md: `calc(100vw - ${drawerWidth}px)`, lg: `calc(100vw - ${drawerWidth}px)` },
                    maxWidth: "100%",
                }}
            >
                {/* Page Header */}
                <Box sx={{ height: "60px", borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center", pb: 3 ,bgcolor: "white", }}>
                    <Box sx={{mt: 2, ml: 2}}>
                        <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "Manrope, sans-serif",
                fontWeight: 700, mb: 0.5, fontSize: "23px",
                lineHeight: "130%", color: "#111827" }}>
                            Account Opening
                        </Typography>
                        <Typography variant="body1" color="#A0AEC0" sx={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: "500" }} >
                            Easily track and process RMs Account Opening Operation
                        </Typography>
                    </Box>    
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        sx={{
                            height: "48px",
                            width: "206px",
                            bgcolor: "#00CECE",
                            "&:hover": { bgcolor: "#00B8B8" },
                            textTransform: "none",
                            fontSize: 16,
                            borderRadius: "12px",
                            letterSpacing: "0.8px",
                            boxShadow: "none",
                            px: 3,
                            py: 1,
                            mt: 2,
                            mr: 2,
                            fontWeight: "500",
                        }}
                    >
                        Export Form
                    </Button>
                </Box>   

                {/* Account Information Card */}
                <Card sx={{ mt: 3, borderRadius: 3, boxShadow: "none", width: '100%' }}>
                    <Box sx={{ mb: 2, pt: 2, width: "95%", pl: 3, }}>
                        <Typography
                            variant="body1"
                            // fontWeight="600"
                            fontFamily= "Manrope, sans-serif"
                            sx={{
                            color: "white",
                            background: "linear-gradient(to left, #1C219F 0% 95%, #00CECE 5% 100%)",
                            px: 3,
                            py: 1,
                            pl: 9,
                            borderRadius: "20px",
                            flexGrow: 1,
                            }}
                        >
                            Account Information
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: "96%",      
                            height: "2px",
                            ml: 3,  
                            backgroundColor: "#F1F2F4",
                        }}
                    />
                    <Box sx={{ p: 4, width: '100%' }}>
                        {/* Flexbox Container - 2 columns, 4 rows */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 3,
                                width: '100%',
                                borderRadius: 8,
                            }}
                        >
                            {/* Field Item Component */}
                            {[
                                { label: 'Customer Name', value: customerData.customerName },
                                { label: 'BVN', value: customerData.bvn },
                                { label: 'Account Number', value: customerData.accountNumber },
                                { label: 'Gender', value: customerData.gender },
                                { label: 'Phone Number', value: customerData.phoneNumber },
                                { label: 'Preferred Number', value: customerData.preferredNumber },
                                { label: 'Email', value: customerData.email },
                                { label: 'Residential Address', value: customerData.residentialAddress },
                            ].map((field, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: { xs: '90%', sm: '90%', md: 'calc(47% - 12px)', lg: 'calc(47% - 12px)', xl: 'calc(47% - 12px)' },
                                        flexShrink: 0,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "#9CA3AF",
                                            fontWeight: "500",
                                            fontSize: "0.75rem",
                                            mb: 1,
                                            display: "block",
                                        }}
                                    >
                                        {field.label}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={field.value}
                                        InputProps={{
                                            readOnly: true,
                                            sx: {
                                                bgcolor: "#E9EAEC",
                                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                            },
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Card>

                <Box sx={{height: "100px"}} >

                </Box>
        </Box> 
    </Box>
    )
};