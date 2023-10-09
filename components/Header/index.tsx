"use client";

import { HomeOutlined, MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { checkDeviceType } from "../../hooks/checkDeviceType";
import CustomMenu from "../Menu";
import Link from "next/link";

import "./styles.scss";

const Header = () => {
  const { signOut } = useClerk();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const doSignOut = () => {
    signOut();
  }

  const device = checkDeviceType();

  return (
    <div className="header">
      {device !== "phone" && (
        <Link href="/" passHref>
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
        </Link>
      )}
      <p>Main Street HVAC & Electric</p>
      <IconButton
        sx={{
          borderRadius: "4px",
          backgroundColor: "#2196F3",
          color: "#fff",
          padding: device === "phone" ? "8px 12px" : "8px 22px",
        }}
        onClick={handleClick}
        aria-label="delete"
      >
        <MenuOutlined fontSize={device === "phone" ? "small" : "large"} />
      </IconButton>
      <CustomMenu handleSignout={doSignOut} open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
};

export default Header;
