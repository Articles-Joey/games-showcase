"use client";

import { useEffect, useState, lazy, useRef, Suspense } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GitHubIcon from "@mui/icons-material/GitHub";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ForumIcon from "@mui/icons-material/Forum";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArticlesButton from "../Button";
import { useStore } from "@/components/hooks/useStore";
import B from "@articles-media/articles-gamepad-helper/dist/img/Xbox UI/B.svg";
import A from "@articles-media/articles-gamepad-helper/dist/img/Xbox UI/A.svg";

const GameComments = lazy(() => import("./Comments"));
const GameNews = lazy(() => import("./News"));
const GameAchievements = lazy(() => import("./Achievements"));
const tabsData = [
    { name: "News", Icon: NewspaperIcon, component: GameNews },
    { name: "Comments", Icon: ForumIcon, component: GameComments },
    {
        name: "Achievements",
        Icon: EmojiEventsIcon,
        component: GameAchievements,
    },
];

const getRandomDarkHex = (index) => {
    const pseudoRandom = Math.abs(Math.sin(index + 1) * 10000) % 1;
    const h = Math.floor(pseudoRandom * 360);
    const s = 100;
    const l = 25;
    const lPrime = l / 100;
    const a = (s * Math.min(lPrime, 1 - lPrime)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = lPrime - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `${f(0)}${f(8)}${f(4)}`;
};

const imageNavigationSx = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    bgcolor: "rgba(0,0,0,0.5)",
    color: "#fff",
    p: 1,
    zIndex: 1,
    width: 30,
    height: 30,
    transitionDuration: "200ms",
    borderRadius: 0,
    "&:hover": {
        bgcolor: "rgba(0,0,0,0.7)",
        transform: "translateY(-50%) scale(1.1)",
    },
};

export default function GameInfoModal({ show, setShow }) {
    const [closing, setClosing] = useState(false);
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    const gameInfoModal = useStore((state) => state.gameInfoModal);
    const launchGame = useStore((state) => state.launchGame);
    const containerRef = useRef(null);
    const previewImage =
        gameInfoModal?.active_image?.image_url || gameInfoModal?.image;
    const previewSource = previewImage?.src || previewImage;
    const gameImages =
        gameInfoModal?.images ||
        Array.from({ length: 10 }, (_, index) => {
            const placeholderBackground = getRandomDarkHex(index);
            return {
                image_url: `https://placehold.co/600x400/${placeholderBackground}/FFF?text=Image+${index + 1}`,
                caption: `Screenshot ${index + 1}`,
                placeholderBackground,
            };
        });

    useEffect(() => {
        void Promise.all([
            import("./News"),
            import("./Comments"),
            import("./Achievements"),
        ]);
    }, []);

    const moveGameImage = (direction) => {
        if (!gameInfoModal?.active_image || !gameImages.length) return;
        const currentIndex = gameImages.findIndex(
            (image) => image === gameInfoModal.active_image,
        );
        const nextIndex =
            (currentIndex + direction + gameImages.length) % gameImages.length;
        useStore.setState({
            gameInfoModal: {
                ...gameInfoModal,
                active_image: gameImages[nextIndex],
            },
        });
    };
    const close = () => setClosing(true);

    return (
        <>
            <Dialog
                open={Boolean(show) && !closing}
                maxWidth="xl"
                fullWidth
                scroll="paper"
                aria-labelledby="game-info-title"
                onClose={close}
                slotProps={{
                    transition: {
                        onExited: () => {
                            setShow(false);
                            setClosing(false);
                        },
                    },
                    paper: { sx: { alignSelf: "flex-start", mt: 4 } },
                }}
            >
                <DialogTitle
                    id="game-info-title"
                    sx={{ pr: 7 }}
                >
                    <Box
                        component="span"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            "@media (min-width: 992px)": {
                                flexDirection: "row",
                                alignItems: "center",
                            },
                        }}
                    >
                        <span>{gameInfoModal?.name}</span>
                        <Box
                            component="span"
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            <Chip
                                label="0 Players Online"
                                size="small"
                                sx={{ bgcolor: "#000", color: "#fff" }}
                            />
                            <Chip
                                label="0 Players In Game"
                                size="small"
                                sx={{ bgcolor: "#000", color: "#fff" }}
                            />
                        </Box>
                    </Box>
                    <IconButton
                        aria-label="Close game details"
                        onClick={close}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent ref={containerRef}>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "minmax(0, 1fr)",
                            gap: 3,
                            "@media (min-width: 992px)": {
                                gridTemplateColumns:
                                    "repeat(2, minmax(0, 1fr))",
                            },
                        }}
                    >
                        <Box sx={{ minWidth: 0 }}>
                            <Box sx={{ position: "relative" }}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        aspectRatio: "16 / 9",
                                        cursor: "zoom-in",
                                    }}
                                    onClick={() => setIsImagePreviewOpen(true)}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                        ) {
                                            event.preventDefault();
                                            setIsImagePreviewOpen(true);
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Open fullscreen image preview"
                                >
                                    <Box
                                        component="img"
                                        src={previewSource}
                                        alt={`${gameInfoModal?.name} screenshot`}
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                                <IconButton
                                    aria-label="Previous screenshot"
                                    onClick={() => moveGameImage(-1)}
                                    sx={{ ...imageNavigationSx, left: 10 }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="Next screenshot"
                                    onClick={() => moveGameImage(1)}
                                    sx={{ ...imageNavigationSx, right: 10 }}
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    overflowX: "auto",
                                    mb: 1,
                                }}
                            >
                                {gameImages.map((image, index) => (
                                    <Box
                                        key={index}
                                        component="button"
                                        type="button"
                                        aria-label={`Select ${image.caption || `screenshot ${index + 1}`}`}
                                        aria-pressed={
                                            image ===
                                            gameInfoModal?.active_image
                                        }
                                        onClick={() =>
                                            useStore.setState({
                                                gameInfoModal: {
                                                    ...gameInfoModal,
                                                    active_image: image,
                                                },
                                            })
                                        }
                                        sx={{
                                            position: "relative",
                                            aspectRatio: "16 / 9",
                                            width: 100,
                                            flexShrink: 0,
                                            p: 0,
                                            bgcolor: "#000",
                                            border:
                                                image ===
                                                gameInfoModal?.active_image
                                                    ? "3px solid #000"
                                                    : "1px solid rgba(133,133,133,0.5)",
                                            overflow: "hidden",
                                            cursor: "pointer",
                                            "& img": {
                                                position: "absolute",
                                                inset: 0,
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                transition:
                                                    "transform 0.3s ease",
                                            },
                                            "&:hover img": {
                                                transform: "scale(1.5)",
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={image.image_url}
                                            alt={image.caption}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Box>
                            <Box>
                                {gameInfoModal?.short_description ||
                                    "No description available for this game."}
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    mb: 2,
                                }}
                            >
                                <Box sx={{ width: "50%" }}>
                                    <Detail
                                        label="Engine"
                                        value={
                                            gameInfoModal?.engine || "Unknown"
                                        }
                                    />
                                    <Detail
                                        label="Rating"
                                        value={
                                            gameInfoModal?.content_rating ||
                                            "Unrated"
                                        }
                                    />
                                </Box>
                                <Box sx={{ width: "50%" }}>
                                    <Detail
                                        label="Single Player"
                                        value={
                                            gameInfoModal?.single_player
                                                ? gameInfoModal.single_player_tag ||
                                                  "..."
                                                : "No"
                                        }
                                    />
                                    <Detail
                                        label="Multiplayer"
                                        value={
                                            gameInfoModal?.multiplayer
                                                ? gameInfoModal.multiplayer_tag ||
                                                  "..."
                                                : "No"
                                        }
                                    />
                                </Box>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ width: "50%" }}>
                                    <Box sx={{ mb: 1 }}>
                                        Developer:{" "}
                                        {gameInfoModal?.developer || "Unknown"}
                                    </Box>
                                    <Box>
                                        Publisher:{" "}
                                        {gameInfoModal?.publisher || "Unknown"}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: "50%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    {gameInfoModal?.github_repo &&
                                        gameInfoModal.github_public && (
                                            <>
                                                <Box>Public on GitHub!</Box>
                                                <ArticlesButton
                                                    component="a"
                                                    href={
                                                        gameInfoModal.github_repo
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    small
                                                    startIcon={
                                                        <GitHubIcon fontSize="small" />
                                                    }
                                                >
                                                    View Repo
                                                </ArticlesButton>
                                            </>
                                        )}
                                </Box>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                {tabsData.map(({ name, Icon }) => (
                                    <ArticlesButton
                                        key={name}
                                        active={activeTab === name}
                                        startIcon={<Icon fontSize="small" />}
                                        onClick={() => {
                                            setActiveTab(name);
                                            sendGAEvent(
                                                "event",
                                                "Game tab clicked",
                                                {
                                                    value: name,
                                                    game: gameInfoModal?.name,
                                                },
                                            );
                                        }}
                                    >
                                        {name}
                                    </ArticlesButton>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <TabContent activeTab={activeTab} />
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <ArticlesButton
                            variant="outline-dark"
                            onClick={close}
                        >
                            <Box
                                component="img"
                                width={20}
                                alt=""
                                className="controller-only"
                                src={B.src}
                                sx={{ mr: 1 }}
                            />
                            Close
                        </ArticlesButton>
                        <ArticlesButton
                            variant="outline-dark"
                            aria-label="Scroll to top"
                            onClick={() =>
                                containerRef.current?.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                })
                            }
                        >
                            <ArrowUpwardIcon fontSize="small" />
                        </ArticlesButton>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {gameInfoModal?.link && (
                            <Box
                                component="span"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", lg: "inline-flex" },
                                }}
                            >
                                {gameInfoModal.link.replace("https://", "")}
                            </Box>
                        )}
                        <ArticlesButton
                            variant="outline-dark"
                            onClick={() => launchGame()}
                        >
                            <Box
                                component="img"
                                width={20}
                                alt=""
                                className="controller-only"
                                src={A.src}
                                sx={{ mr: 1 }}
                            />
                            Launch
                        </ArticlesButton>
                    </Box>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isImagePreviewOpen}
                onClose={() => setIsImagePreviewOpen(false)}
                maxWidth={false}
                aria-label={`${gameInfoModal?.name} fullscreen image preview`}
                slotProps={{
                    backdrop: { sx: { bgcolor: "rgba(0,0,0,0.92)" } },
                    paper: {
                        sx: {
                            width: "min(96vw, 1400px)",
                            height: "min(92vh, 900px)",
                            m: 2,
                            borderRadius: "0.75rem",
                            overflow: "hidden",
                            bgcolor: "#000",
                            boxShadow: "0 18px 48px rgba(0,0,0,0.45)",
                        },
                    },
                }}
            >
                <IconButton
                    aria-label="Close fullscreen image preview"
                    onClick={() => setIsImagePreviewOpen(false)}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        bgcolor: "rgba(255,255,255,0.12)",
                        color: "#fff",
                        width: 40,
                        height: 40,
                        zIndex: 1,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.22)" },
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box
                    component="img"
                    src={previewSource}
                    alt={`${gameInfoModal?.name} fullscreen preview`}
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
            </Dialog>
        </>
    );
}

function Detail({ label, value }) {
    return (
        <Box sx={{ mb: 1 }}>
            <Box sx={{ fontSize: "0.75rem" }}>{label}:</Box>
            <Box>{value}</Box>
        </Box>
    );
}

function TabContent({ activeTab }) {
    const TabComponent = tabsData.find(
        (tab) => tab.name === activeTab,
    )?.component;
    if (!TabComponent) return null;
    return (
        <Box>
            <Suspense
                fallback={
                    <Typography sx={{ mt: 2, color: "text.secondary" }}>
                        Loading tab…
                    </Typography>
                }
            >
                <TabComponent />
            </Suspense>
        </Box>
    );
}
