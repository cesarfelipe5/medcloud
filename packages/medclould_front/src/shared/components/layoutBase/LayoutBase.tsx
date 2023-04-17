import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper } from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/medcloud.svg";
import { ToolbarSearch } from "../toolbarSearch";
import { styles } from "./LayoutBase.styles";
import { TLayoutBase } from "./LayoutBase.types";

moment.locale("pt-br");

export const LayoutBase: FC<TLayoutBase> = ({
  children,
  title,
  showNewButton,
  showSearchBar,
  searchTerm,
  onClickNewButton,
  onSearch,
  onClickSearch,
}) => {
  const navigate = useNavigate();

  const handlePressImage = () => navigate("/patient");

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flex={1}
        alignItems="center"
        minHeight={50}
        borderBottom={0.5}
        borderColor="secondary.light"
      >
        <Box display="flex" flex={1} alignItems="flex-start" padding={2}>
          <img
            src={logo}
            alt="medcloud"
            height={30}
            onClick={handlePressImage}
          />
        </Box>

        <Box
          alignItems="flex-start"
          border="solid"
          borderColor="secondary.light"
          color="secondary.light"
          paddingX={3}
          paddingY={0.5}
          borderRadius={2}
          fontSize={14}
        >
          {moment().format("DD [de] MMMM [de] YYYY")}
        </Box>

        <Box flex={1} display={"flex"} />
      </Box>

      {showNewButton && (
        <Box
          minHeight={50}
          display="flex"
          justifyContent="end"
          alignItems="center"
          borderBottom={0.5}
          paddingX={1}
          borderColor="secondary.light"
        >
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            onClick={onClickNewButton}
            size="small"
            style={styles.button}
          >
            Novo
          </Button>
        </Box>
      )}

      <Box
        component={Paper}
        display="flex"
        flex={1}
        flexDirection="row"
        alignItems="center"
        paddingX={2}
        boxShadow="none"
        borderRadius={0}
        minHeight={70}
      >
        <Box fontSize={25} color="secondary.dark" boxShadow="none">
          {title}
        </Box>

        {showSearchBar && (
          <ToolbarSearch
            value={searchTerm}
            onChangeText={onSearch}
            onClickSearch={onClickSearch}
          />
        )}
      </Box>

      <Box boxShadow="none" borderRadius={0} component={Paper}>
        {children}
      </Box>
    </Box>
  );
};
