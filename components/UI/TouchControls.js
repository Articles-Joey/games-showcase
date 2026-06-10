import { memo, useEffect, useState } from "react";

import ArticlesButton from "@/components/UI/Button"
// import { useStore } from "@/hooks/useStore";
import useTouchControlsStore from "@/components/hooks/useTouchControlsStore";
import { useStore } from "@/components/hooks/useStore";
import useAllGames from "../hooks/useAllGames";

const arePropsEqual = (prevProps, nextProps) => {
    // Compare all props for equality
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

function JumpButtonBase() {

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
    } = useAllGames();

    let activeGames = allGames;

    return (
        <>
            <ArticlesButton
                onClick={() => {
                    console.log("Left!")
                    decrementActiveGameIndex()
                }}
            >
                Previous
            </ArticlesButton>
            <ArticlesButton
                onClick={() => {

                    // TODO - Use filtered games instead of all games

                    console.log("Select!")

                    const selectedGame = activeGames[activeGameIndex];

                    setGameInfoModal(selectedGame);

                }}
            >
                Select
            </ArticlesButton>
            <ArticlesButton
                onClick={() => {
                    console.log("Right!")
                    incrementActiveGameIndex()
                }}
            >
                Next
            </ArticlesButton>
        </>
    )
}

const JumpButton = memo(JumpButtonBase, arePropsEqual);

function TouchControlsBase(props) {

    // const {
    //     touchControlsEnabled,
    // } = props;

    // const touchControlsEnabled = useStore(state => state.touchControlsEnabled)
    const touchControlsEnabled = useTouchControlsStore(state => state.enabled)
    const setTouchControlsEnabled = useTouchControlsStore(state => state.setEnabled)

    const [nippleCreated, setNippleCreated] = useState(false)

    const [nStart, setnStart] = useState(false)
    const [nDirection, setnDirection] = useState(false)

    // const {
    //     touchControls, setTouchControls
    // } = useControlsStore()
    const touchControls = useTouchControlsStore(state => state.touchControls)
    const setTouchControls = useTouchControlsStore(state => state.setTouchControls)

    useEffect(() => {

        // if (!nippleCreated) {
        //     console.log("Load nipple")
        //     startNipple()
        // }

    }, []);

    return (
        <div className={`touch-controls-area hide-in-screenshot-mode ${!touchControlsEnabled && 'd-none'}`}>

            <JumpButton />

        </div>
    )
}

const TouchControls = memo(TouchControlsBase, arePropsEqual);

export default TouchControls