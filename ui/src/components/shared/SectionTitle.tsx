import React from "react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ paddingLeft: "10px", textAlign: "left", width: "100%" }}>
    {children}
  </h3>
);

export default SectionTitle;
