"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import UndoIcon from "@mui/icons-material/Undo";
import { useStore } from "@/components/hooks/useStore";
import ArticlesButton from "./Button";

export default function ControlsSetting() {
    const controlSettings = useStore((state) => state.controlSettings);
    const setControlSettings = useStore((state) => state.setControlSettings);
    const listenForKey = useStore((state) => state.listenForKey);
    const setListenForKey = useStore((state) => state.setListenForKey);

    useEffect(() => {
        if (!listenForKey) return;
        const handleKeyDown = (event) => {
            event.preventDefault();
            setListenForKey({ ...listenForKey, lastKey: event.key });
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [listenForKey, setListenForKey]);

    return (
        <>
            <Dialog open={Boolean(listenForKey)} disableEscapeKeyDown aria-labelledby="listen-for-key-title" slotProps={{ backdrop: { sx: { bgcolor: "rgba(0,0,0,0.8)" } } }}>
                <DialogTitle id="listen-for-key-title">Listening for key...</DialogTitle>
                <DialogContent>
                    <Typography variant="h4" sx={{ border: 1, borderColor: "divider", borderRadius: 1, py: 2, px: 6, bgcolor: "#212529", color: "#fff", textAlign: "center" }}>{listenForKey?.lastKey || "Press a key"}</Typography>
                </DialogContent>
                <DialogActions>
                    <ArticlesButton variant="warning" startIcon={<UndoIcon />} onClick={() => {
                        setControlSettings({ ...controlSettings, [listenForKey.action]: false });
                        setListenForKey(false);
                    }}>Cancel</ArticlesButton>
                    <ArticlesButton onClick={() => {
                        setControlSettings({ ...controlSettings, [listenForKey.action]: listenForKey.lastKey });
                        setListenForKey(false);
                    }}>Confirm</ArticlesButton>
                </DialogActions>
            </Dialog>
            <Box>
                <Box sx={{ fontSize: "0.875rem", pb: 2, pt: 1, borderBottom: 1, borderColor: "divider" }}>Assign a key to a movement action. 1-4 are the defaults and are already assigned.</Box>
                {[1, 2, 3, 4].map((spaces) => {
                    const action = `Move ${spaces} Space`;
                    return (
                        <Box key={action} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: 1, borderColor: "divider", py: 0.5, mb: 0.5 }}>
                            <Box>{action}</Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                {controlSettings[action] && <Chip label={controlSettings[action]} size="small" />}
                                <ArticlesButton small onClick={() => setListenForKey({ action, lastKey: false })}>Select Key</ArticlesButton>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </>
    );
}

