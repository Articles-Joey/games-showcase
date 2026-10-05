"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { sendGAEvent } from "@next/third-parties/google";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GitHubIcon from "@mui/icons-material/GitHub";
import PowerIcon from "@mui/icons-material/Power";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import HistoryIcon from "@mui/icons-material/History";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import ArticlesButton from "@/components/UI/Button";
import { Textfit } from "@/components/UI/Textfit";
import { useStore } from "@/components/hooks/useStore";

const ArticlesModal = dynamic(() => import("@/components/UI/ArticlesModal"), {
    ssr: false,
});
const actionSx = {
    bgcolor: "background.paper",
    borderRadius: "100px",
    border: "1px solid rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    p: 0,
    boxShadow: "0 0 0 1px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.2)",
    transitionDuration: "200ms",
    "@media (min-width: 992px)": { width: 25, height: 25 },
    "& .MuiSvgIcon-root": { fontSize: "0.8rem" },
};

export default function GameItem({ item, toontownImages }) {
    const setGameInfoModal = useStore((state) => state.setGameInfoModal);
    const [showOfflineModal, setShowOfflineModal] = useState(false);
    const [gamepadSupportModal, setGamepadSupportModal] = useState(false);
    const [activeDeveloper, setActiveDeveloper] = useState(null);
    const openInfo = () => {
        sendGAEvent("event", "Opened gameInfoModal", { value: item.name });
        setGameInfoModal(item);
    };

    return (
        <Box sx={{ height: "100%" }}>
            {showOfflineModal && (
                <ArticlesModal
                    show={showOfflineModal}
                    setShow={setShowOfflineModal}
                    title="Offline Support"
                >
                    <Typography variant="h6">
                        {showOfflineModal.name}
                    </Typography>
                    <Box
                        sx={{
                            fontSize: "0.875rem",
                            color: "text.secondary",
                            mb: 2,
                        }}
                    >
                        Offline Info and Settings
                    </Box>
                    <Box sx={{ fontSize: "0.875rem" }}>
                        {showOfflineModal.offlineNote || "offlineNote"}
                    </Box>
                </ArticlesModal>
            )}
            {gamepadSupportModal && (
                <ArticlesModal
                    show={gamepadSupportModal}
                    setShow={setGamepadSupportModal}
                    title="Gamepad Support"
                >
                    <Typography variant="h6">
                        {gamepadSupportModal.name}
                    </Typography>
                    <Box
                        sx={{
                            fontSize: "0.875rem",
                            color: "text.secondary",
                            mb: 2,
                        }}
                    >
                        Gamepad Info and Settings
                    </Box>
                    <Box>
                        This game has full support for the following
                        controllers.
                    </Box>
                </ArticlesModal>
            )}
            {activeDeveloper && (
                <ArticlesModal
                    show={activeDeveloper}
                    setShow={setActiveDeveloper}
                    title="Developer Info"
                >
                    <Box sx={{ mb: 1 }}>
                        <b>{activeDeveloper.developer}</b>
                    </Box>
                    <Box sx={{ fontSize: "0.875rem" }}>
                        {activeDeveloper.developer === "Articles Media" &&
                            "Developed by our own team at Articles Media! Our aim with the games we develop is to drive traffic and engagement with the site overall."}
                    </Box>
                </ArticlesModal>
            )}
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid aqua",
                    borderRadius: 0,
                    boxShadow:
                        "0 0 0 1px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.2)",
                    "@media (min-width: 992px)": { minHeight: 250 },
                }}
            >
                <Box sx={{ p: 1, bgcolor: "#260346", color: "#fff" }}>
                    <b>{item.name}</b>
                </Box>
                <Box sx={{ position: "relative" }}>
                    <Box
                        component={Link}
                        href={`${item.link}`}
                        prefetch={false}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: "block" }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                aspectRatio: "1 / 1",
                                bgcolor: "#212529",
                                width: "100%",
                            }}
                        >
                            {item?.image?.src && (
                                <Image
                                    alt=""
                                    fill
                                    placeholder={
                                        ["jpg", "png", "wep"].includes(
                                            item.image.src.split(".").pop(),
                                        )
                                            ? "blur"
                                            : "empty"
                                    }
                                    style={{ objectFit: "cover" }}
                                    src={item.image}
                                />
                            )}
                            {item.image && !item?.image?.src && (
                                <Box
                                    component="img"
                                    src={
                                        toontownImages && item.inspo_image
                                            ? item.inspo_image
                                            : item.image
                                    }
                                    alt=""
                                    loading="lazy"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            zIndex: 1,
                            m: "0.2rem",
                            display: "flex",
                        }}
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                        }}
                    >
                        {item.gamepadSupport && (
                            <Tooltip
                                placement="bottom"
                                title="Gamepad Support"
                            >
                                <IconButton
                                    aria-label="Gamepad support"
                                    sx={actionSx}
                                >
                                    <SportsEsportsIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {item.leaderboards && (
                            <Tooltip
                                placement="bottom"
                                title={
                                    <Box>
                                        Leaderboards
                                        {item.leaderboards.local && (
                                            <Box>Local</Box>
                                        )}
                                        {item.leaderboards.online && (
                                            <Box>Online</Box>
                                        )}
                                    </Box>
                                }
                            >
                                <IconButton
                                    aria-label="Leaderboards"
                                    sx={actionSx}
                                >
                                    <EmojiEventsIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {item.github_repo && item.github_public && (
                            <Tooltip
                                placement="bottom"
                                title="Open Source GitHub Repo"
                            >
                                <IconButton
                                    component="a"
                                    href={item.github_repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Open GitHub repository"
                                    sx={actionSx}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        sendGAEvent(
                                            "event",
                                            "Clicked GitHub Action",
                                            { value: item.name },
                                        );
                                    }}
                                >
                                    <GitHubIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {item.offline && (
                            <Tooltip
                                placement="bottom"
                                title="Playable Offline"
                            >
                                <IconButton
                                    aria-label="Playable offline"
                                    sx={actionSx}
                                >
                                    <PowerIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {item.amcot_character && (
                            <Tooltip
                                placement="bottom"
                                title="AMCOT Character Usage"
                            >
                                <IconButton
                                    aria-label="AMCOT character usage"
                                    sx={actionSx}
                                >
                                    <AccessibilityNewIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        p: 0.5,
                        borderBottom: 1,
                        borderColor: "divider",
                        bgcolor: "#260346",
                        color: "#fff",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 0.5,
                        }}
                    >
                        {item.single_player && (
                            <Tooltip
                                placement="bottom"
                                title={
                                    <Box
                                        sx={{}}
                                    >
                                        Single Player
                                        {item.single_player_tag && (
                                            <Box>{item.single_player_tag}</Box>
                                        )}
                                    </Box>
                                }
                            >
                                <Chip
                                    size="small"
                                    icon={<PersonIcon />}
                                    label="Single Player"
                                    sx={{
                                        cursor: "pointer",
                                        bgcolor: "background.paper",
                                        color: "text.primary",
                                    }}
                                />
                            </Tooltip>
                        )}
                        {item.multiplayer && (
                            <Tooltip
                                placement="bottom"
                                title={
                                    <Box
                                        sx={{}}
                                    >
                                        Multiplayer
                                        {item.multiplayer_tag && (
                                            <Box>{item.multiplayer_tag}</Box>
                                        )}
                                    </Box>
                                }
                            >
                                <Chip
                                    size="small"
                                    icon={<GroupsIcon />}
                                    label="Multiplayer"
                                    sx={{
                                        cursor: "pointer",
                                        bgcolor: "background.paper",
                                        color: "text.primary",
                                    }}
                                />
                            </Tooltip>
                        )}
                        {item.multiplayer === false && (
                            <Tooltip
                                placement="bottom"
                                title="Multiplayer coming soon!"
                            >
                                <Chip
                                    size="small"
                                    icon={<HistoryIcon />}
                                    label="Multiplayer"
                                    sx={{
                                        opacity: 0.5,
                                        cursor: "pointer",
                                        bgcolor: "background.paper",
                                        color: "text.primary",
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        p: 0.5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        flexGrow: 1,
                    }}
                >
                    <Box sx={{ mt: "auto", width: "100%" }}>
                        <Box sx={{ display: "flex", mb: 0.5 }}>
                            {item.preview ? (
                                <ArticlesButton
                                    disabled={item.public}
                                    small
                                    fullWidth
                                    sx={{ height: 30 }}
                                >
                                    <Textfit
                                        mode="single"
                                        maxFontSize={12}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            {item.preview_true_button_text}
                                            <PlayArrowIcon fontSize="small" />
                                        </Box>
                                    </Textfit>
                                </ArticlesButton>
                            ) : (
                                <ArticlesButton
                                    component={Link}
                                    href={`${item.link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    prefetch={false}
                                    small
                                    fullWidth
                                    endIcon={<PlayArrowIcon fontSize="small" />}
                                >
                                    Play
                                </ArticlesButton>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ArticlesButton
                                onClick={openInfo}
                                small
                                variant="link"
                                startIcon={<InfoIcon fontSize="small" />}
                                sx={{ flexGrow: 1, width: "50%", py: 0 }}
                            >
                                Game Info
                            </ArticlesButton>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        fontSize: "0.875rem",
                        p: 0.5,
                        borderTop: 1,
                        borderColor: "divider",
                    }}
                >
                    <Box sx={{ border: 1, borderColor: "divider" }}>
                        {[
                            { label: "Developer", value: item.developer },
                            {
                                label: "Publisher",
                                value: item.publisher || "Articles Media",
                            },
                            {
                                label: "Rating",
                                value: item.content_rating || "No Rating Yet",
                            },
                            { label: "Engine", value: item.engine || "None" },
                        ].map(({ label, value }, index) => (
                            <Box
                                key={label}
                                onClick={
                                    index === 0
                                        ? () => setGameInfoModal(item)
                                        : undefined
                                }
                                sx={{
                                    display: "flex",
                                    px: 0.5,
                                    alignItems: "center",
                                    fontSize: "0.65rem",
                                    ...(index < 3 && {
                                        borderBottom: 1,
                                        borderColor: "divider",
                                    }),
                                    ...(index === 0 && { cursor: "pointer" }),
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        mr: 0.5,
                                        borderRight: 1,
                                        borderColor: "divider",
                                        width: 60,
                                        flexShrink: 0,
                                    }}
                                >
                                    {label}:
                                </Box>
                                <span>{value}</span>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
