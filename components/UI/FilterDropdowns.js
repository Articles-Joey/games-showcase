"use client";

import { useId } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import ButtonDropdown from "./ButtonDropdown";
import { useFilterStore } from "@/components/hooks/useFilterStore";
import { useStore } from "@/components/hooks/useStore";

export default function FilterDropdowns() {
    const id = useId();
    const setActiveGameIndex = useStore((state) => state.setActiveGameIndex);
    const playerFilter = useFilterStore((state) => state.playerFilter);
    const setPlayerFilter = useFilterStore((state) => state.setPlayerFilter);
    const availabilityFilter = useFilterStore((state) => state.availabilityFilter);
    const setAvailabilityFilter = useFilterStore((state) => state.setAvailabilityFilter);
    const search = useFilterStore((state) => state.search);

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2, width: "100%" }}>
            {[
                { key: "player", label: "Play Type", title: "Player Type", Icon: FilterAltIcon, value: playerFilter, setValue: setPlayerFilter, options: ["All", "Single Player", "Multiplayer"] },
                { key: "status", label: "Status", title: "Availability Status", Icon: SortIcon, value: availabilityFilter, setValue: setAvailabilityFilter, options: ["All", "Available", "Upcoming"] },
            ].map(({ key, label, title, Icon, value, setValue, options }) => (
                <Box key={key} sx={{ display: "flex", alignItems: "center", width: "50%", minWidth: 0 }}>
                    <ButtonDropdown
                        id={`${id}-${key}`}
                        Icon={Icon}
                        disabled={search !== ""}
                        label={<Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.65rem" }}>
                            {label}
                            <Chip label={value} size="small" sx={{ display: { xs: "none", lg: "inline-flex" }, height: 20, fontSize: "0.65rem", bgcolor: "#212529", color: "#fff" }} />
                        </Box>}
                    >
                        {(closeMenu) => [
                            <ListSubheader key="title" sx={{ lineHeight: "2rem", fontSize: "0.75rem" }}>{title}</ListSubheader>,
                            <Divider key="divider" />,
                            ...options.map((item) => (
                                <MenuItem key={item} selected={value === item} onClick={() => {
                                    setValue(item);
                                    setActiveGameIndex(0);
                                    closeMenu();
                                }}>{item}</MenuItem>
                            )),
                        ]}
                    </ButtonDropdown>
                </Box>
            ))}
        </Box>
    );
}

