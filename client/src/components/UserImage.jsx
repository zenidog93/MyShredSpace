import {Box} from '@mui/material';

const UserImage = ({ image, size = "90px"}) => {
    return (
        <Box width = {size} height = {size}>
            <img
                style = {{ objectFit: "cover", borderRadius: "30%", marginRight: "10px"}}
                height = {size}
                width = {size}
                alt = "user picture"
                src = {`http://localhost:3001/assets/${image}`}
                
            />
        </Box>
    )
};

export default UserImage