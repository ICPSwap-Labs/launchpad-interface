import { Box, BoxProps } from "@mui/material";
import { Override } from "utils/sdk/index";

export type RowProps = Override<BoxProps, {}>;

export default function Row(props: RowProps) {
  return (
    <Box
      {...props}
      sx={{
        padding: "20px 0",
        borderBottom: "1px solid rgba(189, 200, 240, 0.082)",
        ...(props.sx ?? {}),
      }}
    >
      {props.children}
    </Box>
  );
}
