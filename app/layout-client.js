"use client"
import { Suspense, useEffect } from 'react';
import packageInfo from '@/package.json';

import { useHotkeys } from 'react-hotkeys-hook';

import { useStore } from '@/components/hooks/useStore';

import GlobalBody from '@articles-media/articles-dev-box/GlobalBody';
import DarkModeHandler from "@articles-media/articles-dev-box/DarkModeHandler";
import GlobalClientModals from '@articles-media/articles-dev-box/GlobalClientModals';
import { useAudioStore } from '@/components/hooks/useAudioStore';
import { useSocketStore } from '@/components/hooks/useSocketStore';
import ArticlesButton from '@/components/UI/Button';
import ControlsSetting from '@/components/UI/ControlsSetting';

export default function LayoutClient({ children }) {

    const darkMode = useStore((state) => state?.darkMode);
    const renderUniqueGameSceneRange = useStore((state) => state.renderUniqueGameSceneRange);
    const setRenderUniqueGameSceneRange = useStore((state) => state.setRenderUniqueGameSceneRange);

    useHotkeys('r', () => {
        console.log("Reloading Scene")
        useStore.getState().reloadScene();
    }, [])

    return (
        <>
            <GlobalBody />
            <DarkModeHandler
                useStore={useStore}
            />
            <Suspense>
                <GlobalClientModals
                    useStore={useStore}
                    useAudioStore={useAudioStore}
                    // useTouchControlsStore={useTouchControlsStore}
                    useSocketStore={useSocketStore}
                    packageInfo={packageInfo}
                    settingsModalConfig={{
                        tabs: {
                            'Graphics': {
                                darkMode: true,
                                landingAnimation: true,
                                children: <>
                                    <div className="mb-3">

                                        <div className="">Render Unique Game Scene Range</div>

                                        <div className='d-flex mb-3'>

                                            <ArticlesButton
                                                small
                                                className="w-50"
                                                // active={!audioSettings?.enabled}
                                                onClick={() => {
                                                    setRenderUniqueGameSceneRange(renderUniqueGameSceneRange - 1)
                                                }}
                                            >
                                                <i className="fad fa-arrow-down"></i>
                                            </ArticlesButton>

                                            <ArticlesButton
                                                small
                                                className="w-50"
                                                // active={audioSettings?.enabled}
                                                onClick={() => {
                                                    // setAudioSettings({
                                                    //     ...audioSettings,
                                                    //     enabled: true
                                                    // })
                                                }}
                                            >
                                                {renderUniqueGameSceneRange}
                                            </ArticlesButton>

                                            <ArticlesButton
                                                small
                                                className="w-50"
                                                // active={audioSettings?.enabled}
                                                onClick={() => {
                                                    setRenderUniqueGameSceneRange(renderUniqueGameSceneRange + 1)
                                                }}
                                            >
                                                <i className="fad fa-arrow-up"></i>
                                            </ArticlesButton>

                                        </div>
                                    </div>
                                </>
                            },
                            'Audio': {
                                sliders: [
                                    ...useAudioStore.getState().audioSettings ?
                                        Object.keys(useAudioStore.getState().audioSettings).filter(key => key !== "enabled").map(key => ({
                                            key,
                                            label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                                        }))
                                        :
                                        [],
                                ]
                            },
                            'Controls': {
                                touchControls: true,
                                // defaultKeyBindings: {
                                //     // moveUp: "W",
                                //     // moveDown: "S",
                                //     // moveLeft: "A",
                                //     // moveRight: "D",
                                // }
                                children: <>
                                    <ControlsSetting />
                                </>
                            },
                            'Multiplayer': {
                                serverUrl: true,
                            },
                            'Other': {
                                // toontownMode: true,
                            },
                            'Debug': {
                                showStats: true,
                                children: <>

                                </>,
                            }
                        },
                        reset: () => {
                            useAudioStore.getState().resetAudioSettings();
                            useStore.getState().setControlSettings(useStore.getState().initialControlSettings);
                        }
                    }}
                    infoModalConfig={{
                        previewImage: darkMode ? "img/preview.webp" : "img/preview.webp",
                    }}
                />
            </Suspense>
        </>
    );
}

