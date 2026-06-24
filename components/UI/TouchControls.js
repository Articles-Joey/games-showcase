import { memo, useEffect, useState } from "react";

import ArticlesButton from "@/components/UI/Button"
// import { useStore } from "@/hooks/useStore";
import useTouchControlsStore from "@/components/hooks/useTouchControlsStore";
import { useStore } from "@/components/hooks/useStore";
import useAllGames from "@/components/hooks/useAllGames";

const arePropsEqual = (prevProps, nextProps) => {
    // Compare all props for equality
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

function CarouselControlButtonsBase() {

    // const {
    //     touchControls, setTouchControls
    // } = useControlsStore()
    const touchControlsEnabled = useTouchControlsStore(state => state.enabled)
    const setTouchControlsEnabled = useTouchControlsStore(state => state.setEnabled)

    const touchControls = useTouchControlsStore(state => state.touchControls)
    const setTouchControls = useTouchControlsStore(state => state.setTouchControls)

    const incrementActiveGameIndex = useStore(state => state.incrementActiveGameIndex)
    const decrementActiveGameIndex = useStore(state => state.decrementActiveGameIndex)

    const activeGameIndex = useStore(state => state.activeGameIndex)
    const setGameInfoModal = useStore(state => state.setGameInfoModal)

    const {
        games: allGames,
        filteredGames
    } = useAllGames();

    const zoomLevel = useStore((state) => state?.zoomLevel);
    const setZoomLevel = useStore((state) => state?.setZoomLevel);

    // let activeGames = allGames;

    return (
        <>
            <ArticlesButton
                large
                onClick={() => {
                    console.log("Left!")
                    decrementActiveGameIndex()
                }}
            >
                <i className="fas fa-chevron-left"></i>
                {/* Previous */}
            </ArticlesButton>
            <ArticlesButton
                large
                onClick={() => {

                    console.log("Select!")

                    const selectedGame = filteredGames[activeGameIndex];

                    setGameInfoModal(selectedGame);

                }}
            >
                Select
            </ArticlesButton>
            <ArticlesButton
                large
                onClick={() => {
                    console.log("Right!")
                    incrementActiveGameIndex()
                }}
            >
                <i className="fas fa-chevron-right"></i>
                {/* Next */}
            </ArticlesButton>

            <div className="zoom-controls">
                <ArticlesButton
                    // large
                    onClick={() => {
                        setZoomLevel(zoomLevel - 1)
                    }}
                >
                    <i className="fas fa-search-minus me-0"></i>
                    {/* Previous */}
                </ArticlesButton>
                <ArticlesButton
                    // large
                    disabled
                    onClick={() => {
                        // setZoomLevel(zoomLevel - 1)
                    }}
                >
                    {zoomLevel}
                    {/* <i className="fas fa-search-minus me-0"></i> */}
                    {/* Previous */}
                </ArticlesButton>
                <ArticlesButton
                    // large
                    onClick={() => {
                        setZoomLevel(zoomLevel + 1)
                    }}
                >
                    <i className="fas fa-search-plus me-0"></i>
                    {/* Previous */}
                </ArticlesButton>
            </div>
        </>
    )
}

const CarouselControlButtons = memo(CarouselControlButtonsBase, arePropsEqual);

function TouchControlsBase(props) {

    const touchControlsEnabled = useTouchControlsStore(state => state.enabled)

    return (
        <div className={`touch-controls-area hide-in-screenshot-mode ${!touchControlsEnabled && 'd-none'}`}>

            <CarouselControlButtons />

        </div>
    )
}

const TouchControls = memo(TouchControlsBase, arePropsEqual);

export default TouchControls