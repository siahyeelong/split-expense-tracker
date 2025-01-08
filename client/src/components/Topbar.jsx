import { Box, IconButton, InputBase, useTheme } from "@mui/material"
import { ColorModeContext, tokens } from "../theme";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search"
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Topbar() {

    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const colourMode = useContext(ColorModeContext);

    return (
        <Box display='flex' justifyContent='space-between' p={2}>
            {/* Search bar */}
            <Box display='flex' backgroundColor={colours.primary[400]} borderRadius='3px'>
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Search' />
                <IconButton type='button' sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* Icons */}
            <Box display='flex'>
                <IconButton onClick={colourMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ?
                        <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />
                    }
                </IconButton>
                <IconButton>
                    <AccountCircleRoundedIcon />
                </IconButton>
            </Box>
        </Box >
    )
}

export default Topbar