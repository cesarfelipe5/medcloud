import { LinearProgress, Stack } from "@mui/material";
import { ILoadingSpinner } from "./LoadingSpinner.types";

export const LoadingSpinner = ({
  children,
  loading,
}: ILoadingSpinner): JSX.Element => {
  return loading ? (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
      <LinearProgress color="primary" />
    </Stack>
  ) : (
    <> {children}</>
  );
};
