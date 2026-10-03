"use client";

import Box from "@mui/material/Box";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArticlesModal from "./ArticlesModal";
import ArticlesButton from "./Button";

export default function PublishWithUsModal({ show, setShow }) {
    return (
        <ArticlesModal
            show={show}
            setShow={setShow}
            title="Publish Your Game!"
        >
            <Box sx={{ mb: 2 }}>
                If you have a WebGL/WebGPU game that you have made and would
                like to publish then reach out! We can host your game for you
                and provide a few different services.
            </Box>
            <ul>
                <li>Scoreboard and multiplayer API for your games!</li>
                <li>
                    React Three Fiber components for characters and animations.
                    Also allows players to bring their AMCOT character from game
                    to game on our platform!
                </li>
                <li>
                    React components and APIs for handling user accounts and
                    authentication.
                </li>
            </ul>
            <ArticlesButton
                component="a"
                href="https://articles.media/community/press"
                target="_blank"
                rel="noopener noreferrer"
                large
                fullWidth
                startIcon={<EditNoteIcon />}
                sx={{ mb: 2 }}
            >
                Contact Us
            </ArticlesButton>
            <Box sx={{ mb: 2 }}>
                Here is some links to some of our documentation and resources if
                you want to learn more about how to use our platform to publish
                your game:
            </Box>
            <ul>
                <li>
                    <a
                        href="https://github.com/Articles-Joey/articles-dev-box"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Articles Dev Box
                    </a>
                    <span>
                        {" "}
                        - Helps you get started building a React Three Fiber
                        game. Includes quick ways of setting up landing pages,
                        state management, socket logic, and more.
                    </span>
                </li>
                <li>
                    <a
                        href="https://github.com/Articles-Joey/articles-gamepad-helper"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Articles Gamepad Helper
                    </a>
                    <span>
                        {" "}
                        - Provides utilities for handling gamepad input in your
                        React Three Fiber games.
                    </span>
                </li>
                <li>
                    <a
                        href="https://github.com/Articles-Joey/articles-amcot-character"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Articles AMCOT Character
                    </a>
                    <span>
                        {" "}
                        - Provides components and utilities for handling AMCOT
                        characters in your React Three Fiber games. Easily allow
                        users to bring their AMCOT character from game to game
                        on our platform! Also serves as a way to easily add
                        customizable NPCs into your game. Similar to the Xbox
                        Avatars system.
                    </span>
                </li>
            </ul>
        </ArticlesModal>
    );
}
