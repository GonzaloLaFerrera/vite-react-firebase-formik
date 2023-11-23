import { logout } from "../config/firebase";
import { Box, Button, Container, Typography } from "@mui/material";

const Dashboard = () => {

    const handleLogout = async() => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (     
            <Box sx={{ display:'flex',flexDirection:'column' ,maxWidth: '700px', mx:'auto', justifyContent: 'center', mt:6, gap:5 }}>
                <Typography variant="h2" component='h1' >Dashboard (ruta protegida)</Typography>
                <Button variant="contained" sx={{maxWidth:'100px', mb:6}} onClick={handleLogout}>Logout</Button>
            </Box> 
    );
};

export default Dashboard;
