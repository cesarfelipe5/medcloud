import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, useTheme } from "@mui/material";
import { FC } from "react";
import { IToolbar } from "./Toolbar.types";

export const Toolbar: FC<IToolbar> = ({ showButton = false, onClickButton }) => {
    const theme = useTheme();

    return (
        <Box
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            gap={1}
            alignItems="center"
            component={Paper}>

            <Box
                flex={1}
                display='flex'
                justifyContent='end'>

                {showButton &&
                    <Button
                        variant="contained"
                        disableElevation
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={onClickButton}
                    >Novo
                    </Button>
                }
            </Box>
        </Box>
    );
};