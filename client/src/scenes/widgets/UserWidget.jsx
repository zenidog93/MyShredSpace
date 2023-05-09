import {
    ManageAccountsOutlined, 
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material"
import LandscapeIcon from '@mui/icons-material/Landscape';
import {Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET", 
            headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [])

    // if there are no user to return just return null
    if (!user) {
        return null;
    }

    const {
        firstName, 
        lastName, 
        location,
        sport,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            
            <FlexBetween
                gap = "0.5rem"
                pb = "1.0rem"
                onClick = {() => navigate(`/profile/${userId}`)}
            >
                {/* first row */}
                <FlexBetween gap= "1rem">
                    <UserImage image = {picturePath}/>
                    <Box>
                        <Typography
                            textAlign="center"
                            variant = "h3"
                            color = {dark}
                            fontWeight = "500"
                            sx = {{
                                "&:hover" :{
                                    cursor: "pointer"
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                    </Box>
                    
                </FlexBetween>
                <ManageAccountsOutlined />
                </FlexBetween>

                <Divider />

                {/* Second row */}
                <Box padding = "1.0rem 0">
                    <Box display = "flex" alignItems = "center" gap = "1.0rem" mb = "0.5rem">
                        <LocationOnOutlined fontSize="large" sx = {{ color: main}}/>
                        <Typography>{location}</Typography>
                    </Box>
                    <Box display = "flex" alignItems = "center" gap = "1.0rem">
                        <LandscapeIcon fontSize="large" sx = {{ color: main}}/>
                        <Typography>{sport}</Typography>
                    </Box>

                </Box>
        </WidgetWrapper>
    )
};

export default UserWidget;