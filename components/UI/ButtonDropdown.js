"use client";

import { useState } from "react";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArticlesButton from "./Button";

export default function ButtonDropdown({ id, label, Icon, children, disabled = false }) {
    const [anchorElement, setAnchorElement] = useState(null);
    const isOpen = Boolean(anchorElement);
    const closeMenu = () => setAnchorElement(null);

    return (
        <>
            <ArticlesButton
                aria-controls={isOpen ? id : undefined}
                aria-expanded={isOpen ? "true" : undefined}
                aria-haspopup="menu"
                disabled={disabled}
                endIcon={<KeyboardArrowDownIcon />}
                fullWidth
                id={`${id}-button`}
                onClick={(event) => setAnchorElement(event.currentTarget)}
                size="small"
                startIcon={<Icon fontSize="small" />}
                sx={{ justifyContent: "flex-start", "& .MuiButton-endIcon": { marginLeft: "auto" } }}
                variant="contained"
            >
                {label}
            </ArticlesButton>
            <Menu
                anchorEl={anchorElement}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                id={id}
                marginThreshold={0}
                onClose={closeMenu}
                open={isOpen}
                slotProps={{
                    list: { "aria-labelledby": `${id}-button`, style: { margin: 0, padding: 0 } },
                    paper: { sx: { maxHeight: 600, margin: 0, width: 200 } },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
            >
                {children(closeMenu)}
            </Menu>
        </>
    );
}

