import React from "react";
import { SvgIcon } from "@mui/material";

const VidtubeIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 48 48">
    {/* Stylized V shape */}
    <path d="M12 12L24 36L36 12H28L24 24L20 12H12Z" fill="#D32F2F" />
    {/* Play Button */}
    <path d="M22 18L32 24L22 30V18Z" fill="white" />
  </SvgIcon>
);

export default VidtubeIcon;