import Typography from "@mui/material/Typography";
import React from "react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography
    component="h3"
    variant="subtitle1"
    sx={{ pl: "10px", textAlign: "left", width: "100%" }}
  >
    {children}
  </Typography>
);

export default SectionTitle;
