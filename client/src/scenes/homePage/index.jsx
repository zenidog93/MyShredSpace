import Navbar from "../navbar";
import {Box, useMediaQuery} from "@mui/material"
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";


const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath} = useSelector((state) => state.user)
    return ( 
        <Box>
            <Navbar />
            <Box
                width = "100%"
                padding = "1.0rem 7%"
                display = {isNonMobileScreens ? "flex" : "block:" }
                gap = "1rem"
                justifyContent= "center"                
            >
                <Box flexBasis={isNonMobileScreens ? "30% ": undefined}>
                    <UserWidget userId = {_id} picturePath = {picturePath} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "40% ": undefined}
                    mt = {isNonMobileScreens ? undefined: "2rem"}
                >
                    <MyPostWidget picturePath = {picturePath}/>
                    <PostsWidget userId = {_id}/>
                    {isNonMobileScreens && (
                        <Box flexBasis = "30%">

                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage;