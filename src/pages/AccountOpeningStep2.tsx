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
import PatternIcon from "@/components/icons/PatternIcon";
import MyCustomIcon2 from "@/components/icons/MyCustomIcon2";
import SuccessCheckIcon from "@/components/icons/SuccessCheckIcon";
import SuccessIcon from "@/components/icons/SuccessIcon";
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
        residentialAddress: "10, Commercial Avenue Sabo, Yaba, Lagos",
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

export default function AccountOpeningStep2() {
    const navigate = useNavigate();
    const { customerId } = useParams();
    const [customerData, setCustomerData] = useState<any>(null);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const [openReject, setOpenReject] = useState(false);
    const [openRejectSuccess, setOpenRejectSuccess] = useState(false);
    const [rejectReason, setRejectReason] = useState("")

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
                <Box sx={{ height: "50px", borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center", pb: 3, bgcolor: "white", boxShadow: "none" }}>
                    <Box sx={{mt: 2, ml: 2}}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5, color: "#1a1a1a" }}>
                            Account Opening
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Easily track and process RMs Account Opening Operation
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        sx={{
                            
                            bgcolor: "#00CECE",
                            "&:hover": { bgcolor: "#00B8B8" },
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3,
                            py: 1,
                            mt: 2,
                            mr: 2,
                            fontWeight: "600",
                        }}
                    >
                        Export Form
                    </Button>
                </Box>

                {/* Progress Steps */}
                
                

                {/* Account Information Card */}
                <Card sx={{ mt: 3, borderRadius: 3, boxShadow: "none",width: '100%' }}>
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

                {/* Documents Card */}
                <Card sx={{ mb: 4, mt: 5, borderRadius: 3, boxShadow: "none" }}>
                <Box sx={{ mb: 2, mt: 2, width: "95%", pl: 3, }}>
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
                        Document Upload
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
                    <Box sx={{ p: 4 }}>
                        {/* Flexbox Container - 3 columns on large screens */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                width: '100%',
                            }}
                        >
                            {/* Document Items */}
                            {[
                                { 
                                    label: 'Utility*', 
                                    name: customerData.documents.utility.name,
                                    uploadedBy: customerData.documents.utility.uploadedBy,
                                    uploadedDate: customerData.documents.utility.uploadedDate,
                                },
                                { 
                                    label: 'Valid ID*', 
                                    name: customerData.documents.validId.name,
                                    uploadedBy: customerData.documents.validId.uploadedBy,
                                    uploadedDate: customerData.documents.validId.uploadedDate,
                                },
                                { 
                                    label: 'Signature*', 
                                    name: customerData.documents.signature.name,
                                    uploadedBy: customerData.documents.signature.uploadedBy,
                                    uploadedDate: customerData.documents.signature.uploadedDate,
                                },
                            ].map((doc, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: { xs: '100%', sm: '100%', md: 'calc(33.333% - 11px)', lg: 'calc(33.333% - 11px)', xl: 'calc(33.333% - 11px)' },
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
                                        <Box component="span" sx={{ color: "#1C219F", fontWeight: 700, lineHeight: "20px", fontSize: "16px",}}>
                                        {doc.label.replace("*", "")}
                                        </Box>
                                        <Box component="span" sx={{color: "#EF4444", ml: 0.3}} >
                                            *
                                        </Box>
                                    </Typography>
                                    <Paper
                                        sx={{
                                            p: 2.5,
                                            bgcolor: "#E3EFFC",
                                            border: "1px solid white",
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            boxShadow: "none",
                                            height: "70px",
                                        }}
                                        >
                                        {/* grid wrapper: left column = icon width (37px), right column = text */}
                                        <Box
                                            sx={{
                                            display: "grid",
                                            gridTemplateColumns: "37px 1fr", // 25px icon + ~12px gap = 37px
                                            gap: 1.5,
                                            alignItems: "center",
                                            width: "100%",
                                            }}
                                        >
                                            {/* icon column */}
                                            <Box
                                            sx={{
                                                width: 25,
                                                height: 25,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                ml: 1.5,
                                            }}
                                            >
                                            {doc.name.toLowerCase().includes(".pdf") ? (
                                                <PatternIcon width={20} height={20} />
                                            ) : (
                                                <MyCustomIcon2 width={25} height={25} />
                                            )}
                                            </Box>

                                            {/* filename (keeps its exact place in column 2 row 1) */}
                                            <Box  >
                                            <Typography
                                                variant="body2"
                                                fontWeight="700"
                                                sx={{ color: "#1C219F" }}
                                            >
                                                {doc.name}
                                            </Typography>
                                            </Box>

                                            {/* subtitle — spans both columns and starts under the icon */}
                                            <Box sx={{ gridColumn: "1 / span 2" , mt: -2 , ml: 1.5}}>
                                            <Typography
                                                variant="caption"
                                                sx={{ color: "#9CA3AF", fontSize: "0.70rem",  }}
                                            >
                                                <Box component="span" sx={{ fontStyle: "italic" }}>
                                                ID Card verified by NIMBS
                                                </Box>
                                                {" | "}
                                                <Box component="span" sx={{ fontStyle: "normal" }}>
                                                {doc.uploadedDate}
                                                </Box>
                                            </Typography>
                                            </Box>
                                        </Box>

                                        {/* right-side check icon */}
                                        <Box sx={{mr: 2}}>
                                        <SuccessCheckIcon />
                                        </Box>
                                    </Paper>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Card>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => setOpenReject(true)}
                    sx={{
                        borderColor: "#EF4444",
                        color: "#EF4444",
                        "&:hover": { borderColor: "#DC2626", bgcolor: "#FEF2F2" },
                        textTransform: "none",
                        px: 5,
                        py: 1.2,
                        borderRadius: "8px",
                        fontWeight: "600",
                    }}
                    >
                    Reject
                    </Button>

                    {/* Step 1 Modal: Confirm Rejection */}
                    <Dialog
                    open={openReject}
                    onClose={() => setOpenReject(false)}
                    PaperProps={{
                        sx: { borderRadius: 3, p: 2, width: 400, textAlign: "center" },
                    }}
                    >
                    <DialogTitle sx={{ fontWeight: 700, fontSize: "1.25rem", color: "#1A1A1A" }}>
                        Reject Account
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ color: "#6B7280", mt: 1 }}>
                        Are you sure you want to proceed? This action cannot be undone once confirmed.
                        </Typography>

                        <Box sx={{ textAlign: "left", mt: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{ color: "#1A1A1A", fontWeight: 600, mb: 0.5 }}
                        >
                            Reason <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                        </Typography>
                        <TextField
                            placeholder="Enter Reason"
                            fullWidth
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            InputProps={{
                            sx: {
                                bgcolor: "#F9FAFB",
                                borderRadius: "8px",
                            },
                            }}
                        />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                        <Button
                        onClick={() => setOpenReject(false)}
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                            px: 4,
                            borderRadius: "8px",
                            color: "#1A1A1A",
                            borderColor: "#E5E7EB",
                            "&:hover": { bgcolor: "#F9FAFB" },
                        }}
                        >
                        Cancel
                        </Button>
                        <Button
                        disabled={!rejectReason.trim()}
                        onClick={() => {
                            setOpenReject(false);
                            setTimeout(() => setOpenRejectSuccess(true), 200);
                        }}
                        variant="contained"
                        sx={{
                            bgcolor: "#00CECE",
                            "&:hover": { bgcolor: "#00B8B8" },
                            textTransform: "none",
                            px: 4,
                            borderRadius: "8px",
                        }}
                        >
                        Continue
                        </Button>
                    </DialogActions>
                    </Dialog>

                    {/* Step 2 Modal: Rejection Successful */}
                    <Dialog
                    open={openRejectSuccess}
                    onClose={() => setOpenRejectSuccess(false)}
                    PaperProps={{
                        sx: { borderRadius: 3, p: 2, width: 400, textAlign: "center" },
                    }}
                    >
                    <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                        <SuccessIcon />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1A1A1A" }}>
                        Operation Successful
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#6B7280", mt: 1 }}>
                        You have successfully rejected this account opening.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                        <Button
                        onClick={() => setOpenRejectSuccess(false)}
                        variant="contained"
                        sx={{
                            bgcolor: "#00CECE",
                            "&:hover": { bgcolor: "#00B8B8" },
                            textTransform: "none",
                            px: 5,
                            borderRadius: "8px",
                        }}
                        >
                        Done
                        </Button>
                    </DialogActions>
                    </Dialog>



                    <Button
                        variant="contained"
                        onClick={() => setOpenConfirm(true)}
                        sx={{
                        bgcolor: "#00CECE",
                        "&:hover": { bgcolor: "#00B8B8" },
                        textTransform: "none",
                        px: 5,
                        py: 1.2,
                        borderRadius: "8px",
                        fontWeight: "600",
                        }}
                    >
                        Approve
                    </Button>
                </Box>

                {/* Step 1 Modal: Confirm Approval */}
                    <Dialog
                    open={openConfirm}
                    onClose={() => setOpenConfirm(false)}
                    PaperProps={{
                        sx: { borderRadius: 3, p: 2, width: 400, textAlign: "center" },
                    }}
                    >
                    <DialogTitle sx={{ fontWeight: 700, fontSize: "1.25rem", color: "#1A1A1A" }}>
                        Approve Account
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ color: "#6B7280", mt: 1 }}>
                        Are you sure you want to proceed? This action cannot be undone once confirmed.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                        <Button
                        onClick={() => setOpenConfirm(false)}
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                            px: 4,
                            borderRadius: "8px",
                            color: "#1A1A1A",
                            borderColor: "#E5E7EB",
                            "&:hover": { bgcolor: "#F9FAFB" },
                        }}
                        >
                        Cancel
                        </Button>
                        <Button
                        onClick={() => {
                            setOpenConfirm(false);
                            setTimeout(() => setOpenSuccess(true), 200);
                        }}
                        variant="contained"
                        sx={{
                            bgcolor: "#00CECE",
                            "&:hover": { bgcolor: "#00B8B8" },
                            textTransform: "none",
                            px: 4,
                            borderRadius: "8px",
                        }}
                        >
                        Continue
                        </Button>
                    </DialogActions>
                    </Dialog>

                    {/* Step 2 Modal: Success */}
                    <Dialog
                    open={openSuccess}
                    onClose={() => setOpenSuccess(false)}
                    PaperProps={{
                        sx: { borderRadius: 3, p: 2, width: 400, textAlign: "center" },
                    }}
                    >
                    <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                    <SuccessIcon />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1A1A1A" }}>
                        Operation Successful
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#6B7280", mt: 1 }}>
                        You have successfully approved this account opening.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                        <Button
                        onClick={() => setOpenSuccess(false)}
                        variant="contained"
                        sx={{
                            bgcolor: "#00CECE",
                            "&:hover": { bgcolor: "#00B8B8" },
                            textTransform: "none",
                            px: 5,
                            borderRadius: "8px",
                        }}
                        >
                        Done
                        </Button>
                    </DialogActions>
                    </Dialog>        


            </Box>
        </Box>
    );
}