import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, Paper, TextField, useTheme } from "@mui/material";
import { FC } from "react";
import { IToolbarSearch } from "./ToolbarSearch.types";

export const ToolbarSearch: FC<IToolbarSearch> = ({ value, onChangeText }) => {
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
            <TextField
                fullWidth
                placeholder="Pesquisar..."
                value={value}
                onChange={(e) => onChangeText?.(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <Box
                flex={1}
                display='flex'
                justifyContent='center'>

                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                // onClick={onClickButton}
                >Buscar
                </Button>

            </Box>
        </Box >
    );
};
