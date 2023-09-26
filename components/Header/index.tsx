"use client";

import { HomeOutlined, MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { checkDeviceType } from "../../hooks/checkDeviceType";
import "./styles.scss";

const Header = () => {
  const device = checkDeviceType();

  return (
    <div className="header">
      {device !== "phone" && (
        <IconButton
          sx={{
            borderRadius: "4px",
            backgroundColor: "#2196F3",
            color: "#fff",
            padding: "8px 22px",
          }}
          aria-label="delete"
        >
          <HomeOutlined />
        </IconButton>
      )}
      <p>Main Street HVAC & Electric</p>
      <IconButton
        sx={{
          borderRadius: "4px",
          backgroundColor: "#2196F3",
          color: "#fff",
          padding: device === "phone" ? "8px 12px" : "8px 22px",
        }}
        aria-label="delete"
      >
        <MenuOutlined fontSize={device === "phone" ? "small" : "large"} />
      </IconButton>
    </div>
  );
};

export default Header;
