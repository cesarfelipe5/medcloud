import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, Paper, TextField } from "@mui/material";
import { FC } from "react";
import { styles } from "./ToolbarSearch.styles";
import { IToolbarSearch } from "./ToolbarSearch.types";

export const ToolbarSearch: FC<IToolbarSearch> = ({
  value,
  onChangeText,
  onClickSearch,
}) => {
  return (
    <>
      <Box
        display="flex"
        gap={2}
        flex={1}
        alignItems="center"
        component={Paper}
        boxShadow={"none"}
        paddingX={20}
      >
        <TextField
          fullWidth
          placeholder="Pesquisar..."
          value={value}
          size="small"
          onChange={(e) => onChangeText?.(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="secondary" />
              </InputAdornment>
            ),
            style: { maxHeight: 30, fontSize: 14 },
          }}
        />

        <Box flex={1} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            style={styles.button}
            onClick={onClickSearch}
          >
            Buscar
          </Button>
        </Box>
      </Box>
    </>
  );
};
