"use client"

// import { Suspense } from 'react';
import dynamic from 'next/dynamic'
import { useStore } from '../hooks/useStore'

// const KickedModal = dynamic(
//     () => import('@/components/UI/KickedModal'),
//     { ssr: false }
// )

const SettingsModal = dynamic(
    () => import('@/components/UI/SettingsModal'),
    { ssr: false }
)

const InfoModal = dynamic(
    () => import('@/components/UI/InfoModal'),
    { ssr: false }
)

const GameInfoModal = dynamic(
    () => import('@/components/UI/GameInfoModal'),
    { ssr: false }
)

// const GameControllerKeyboard = dynamic(
//     () => import('@/components/GameControllerKeyboard'),
//     { ssr: false }
// )

export default function GlobalClientModals() {

    const infoModal = useStore((state) => state.infoModal)
    const setInfoModal = useStore((state) => state.setInfoModal)

    const showSettingsModal = useStore((state) => state.showSettingsModal)
    const setShowSettingsModal = useStore((state) => state.setShowSettingsModal)

    const kickedStore = useStore((state) => state?.kicked);
    const setKickedStore = useStore((state) => state?.setKicked);

    const gameInfoModal = useStore((state) => state?.gameInfoModal);
    const setGameInfoModal = useStore((state) => state?.setGameInfoModal);

    return (
        <>

            {/* {kickedStore &&
                <KickedModal
                    show={kickedStore}
                    setShow={setKickedStore}
                />
            } */}

            {infoModal &&
                <InfoModal
                    show={infoModal}
                    setShow={setInfoModal}
                />
            }

            {showSettingsModal &&
                <SettingsModal
                    show={showSettingsModal}
                    setShow={setShowSettingsModal}
                />
            }

            {gameInfoModal &&
                <GameInfoModal
                    show={gameInfoModal}
                    setShow={setGameInfoModal}
                />
            }

            {/* <GameControllerKeyboard onFinish={(text) => console.log("Keyboard finished:", text)} /> */}

        </>
    )
}