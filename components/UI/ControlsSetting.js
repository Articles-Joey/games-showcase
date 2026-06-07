"use client"
import { Suspense, useEffect } from 'react';

import { useStore } from '@/components/hooks/useStore';

import ArticlesButton from '@/components/UI/Button';

export default function ControlsSetting() {

    const controlSettings = useStore((state) => state.controlSettings);
    const setControlSettings = useStore((state) => state.setControlSettings);
    const listenForKey = useStore((state) => state.listenForKey);
    const setListenForKey = useStore((state) => state.setListenForKey);

    useEffect(() => {
        if (listenForKey) {
            const handleKeyDown = (e) => {
                e.preventDefault()
                setListenForKey({ ...listenForKey, lastKey: e.key })
            }
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
        }
    }, [listenForKey])

    return (
        <>
            {listenForKey &&
                <div className="listen-for-key-overlay d-flex flex-column justify-content-center align-items-center">

                    <div className="mb-3">Listening for key...</div>

                    <div className="h2 border rounded p-3 px-5 mb-3 bg-dark text-white">
                        {listenForKey.lastKey || 'Press a key'}
                    </div>

                    <div className="d-flex">
                        <ArticlesButton
                            variant="warning"
                            onClick={() => {

                                setControlSettings({
                                    ...controlSettings,
                                    [listenForKey.action]: false,
                                })

                                setListenForKey(false)

                            }}
                        >
                            <i className="fas fa-undo me-2"></i>
                            Cancel
                        </ArticlesButton>
                        <ArticlesButton onClick={() => {

                            setControlSettings({
                                ...controlSettings,
                                [listenForKey.action]: listenForKey.lastKey,
                            })

                            setListenForKey(false)

                        }}>
                            Confirm
                        </ArticlesButton>
                    </div>

                </div>
            }
            <div>

                <div className="small pb-3 pt-2  border-bottom">
                    Assign a key to a movement action. 1-4 are the defaults and are already assigned.
                </div>

                <div>
                    {[
                        {
                            action: 'Move 1 Space',
                            defaultKeyboardKey: '1'
                        },
                        {
                            action: 'Move 2 Space',
                            defaultKeyboardKey: '2'
                        },
                        {
                            action: 'Move 3 Space',
                            defaultKeyboardKey: '3'
                        },
                        {
                            action: 'Move 4 Space',
                            defaultKeyboardKey: '4'
                        },
                    ].map(obj =>
                        <div key={obj.action}>
                            <div className="flex-header border-bottom py-1 mb-1">

                                <div>
                                    <div>{obj.action}</div>
                                    {obj.emote && <div className="span badge bg-dark">Emote</div>}
                                </div>

                                <div>

                                    {/* <div className="badge badge-hover bg-articles me-1">{obj.defaultKeyboardKey}</div> */}

                                    {controlSettings[obj.action] &&
                                        <div className="badge bg-secondary me-1">
                                            {controlSettings[obj.action]}
                                        </div>
                                    }

                                    <ArticlesButton
                                        className=""
                                        small
                                        onClick={() => setListenForKey({
                                            action: obj.action,
                                            lastKey: false
                                        })}
                                    >
                                        Select Key
                                    </ArticlesButton>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}