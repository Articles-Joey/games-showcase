"use client"
import ArticlesButton from '@/components/UI/Button';

import { Dropdown, Form } from 'react-bootstrap';

import { useStore } from '../hooks/useStore';
import { memo, Suspense, useEffect, useState } from 'react';
import useFullscreen from '../hooks/useFullScreen';
import useCameraStore from '../hooks/useCameraStore';
import classNames from 'classnames';
import useGames from '../hooks/useGames';
import useAllGames from '../hooks/useAllGames';
import { useGameControllerKeyboardStore } from '@articles-media/articles-gamepad-helper';
import { useFilterStore } from '../hooks/useFilterStore';
import FilterDropdowns from './FilterDropdowns';

import GameMenuPrimaryButtonGroup from '@articles-media/articles-dev-box/GameMenuPrimaryButtonGroup';
import { useRouter } from 'next/navigation';

function GameMenu({}) {

    const { games, publicGames } = useGames();

    const { games: allGames } = useAllGames();

    const setCameraUpdate = useCameraStore((state) => state?.setCameraUpdate);

    const visible = useGameControllerKeyboardStore((state) => state.visible);

    const activeGameIndex = useStore((state) => state?.activeGameIndex);
    const setActiveGameIndex = useStore((state) => state?.setActiveGameIndex);

    const zoomLevel = useStore((state) => state?.zoomLevel);
    const setZoomLevel = useStore((state) => state?.setZoomLevel);

    const showMenu = useStore((state) => state?.showMenu);
    const setShowMenu = useStore((state) => state?.setShowMenu);

    const search = useFilterStore((state) => state.search);
    const setSearch = useFilterStore((state) => state.setSearch);

    const filters = useFilterStore((state) => state.filters);
    const setFilters = useFilterStore((state) => state.setFilters);

    const setInfoModal = useStore((state) => state.setInfoModal)

    const setShowSettingsModal = useStore((state) => state.setShowSettingsModal)

    const devDebug = useStore((state) => state.devDebug)
    const toggleDevDebug = useStore((state) => state.toggleDevDebug)

    const sidebar = useStore((state) => state.sidebar)
    const toggleSidebar = useStore((state) => state.toggleSidebar)
    const reloadScene = useStore((state) => state.reloadScene)

    return (
        <div
            // className='menu-card-wrapper'
            className={
                classNames(
                    'menu-card-wrapper',
                    {
                        show: showMenu,
                        "show-menu": showMenu,
                        "hide-menu": !showMenu,
                        "sidebar-enabled": sidebar,
                        "sidebar-disabled": !sidebar,
                    }
                )
            }
        >

            <div
                className={
                    classNames(
                        `menu-card-backdrop`,
                        {
                            show: showMenu,
                            "show-menu": showMenu,
                            "hide-menu": !showMenu,
                            "sidebar-enabled": sidebar,
                            "sidebar-disabled": !sidebar,
                        }
                    )
                }
            >

            </div>

            <div className={
                classNames(
                    `menu-card card card-articles rounded-0`,
                    {
                        show: showMenu,
                        "show-menu": showMenu,
                        "hide-menu": !showMenu,
                        "sidebar-enabled": sidebar,
                        "sidebar-disabled": !sidebar,
                    }
                )
            }>

                <div className="card-body d-flex flex-wrap">

                    <GameMenuPrimaryButtonGroup 
                        useStore={useStore}
                        type="GameMenu"
                        useRouter={useRouter}
                    />

                </div>

                <div className="card-body p-2 mt-auto d-flex flex-column">

                    <div className='d-flex flex-column mb-2 mt-auto'>

                        <div className='search-bar-'>
                            <input
                                type="text"
                                className='form-control form-control-sm'
                                placeholder='Search Games...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {process.env.NODE_ENV === 'development' &&
                            <div className='local-only-content border p-1 mb-3'>

                                {visible ? <div>Visible Content</div> : <div>Hidden Content</div>}

                                <div className='flex-header mb-1'>

                                    <span>Launchers</span>

                                    <ArticlesButton
                                        className={``}
                                        small
                                    >
                                        <i className='fad fa-eraser me-0'></i>
                                    </ArticlesButton>

                                </div>

                                <div>
                                    {Object.keys(filters.launchers).map((launcher) => (
                                        <ArticlesButton
                                            key={launcher}
                                            className={`w-50`}
                                            small
                                            active={filters.launchers[launcher]}
                                            onClick={() => {
                                                const newLaunchers = { ...filters.launchers };
                                                newLaunchers[launcher] = !newLaunchers[launcher];
                                                setFilters({ ...filters, launchers: newLaunchers });
                                            }}
                                        >
                                            {launcher}
                                        </ArticlesButton>
                                    ))}
                                </div>

                            </div>
                        }

                        <div>
                            Filters
                        </div>

                        <div className="d-flex flex-column mb-2">

                            <FilterDropdowns />

                        </div>

                        <div className='d-flex flex-wrap mb-2'>

                            <ArticlesButton
                                className={`w-50`}
                                small
                                // active={devDebug}
                                onClick={() => {
                                    reloadScene()
                                    console.log("games", games)
                                }}
                            >
                                <i className="fad fa-info-square"></i>
                                Reset
                            </ArticlesButton>

                        </div>

                        <div>
                            <ArticlesButton
                                className={``}
                                small
                                // active={devDebug}
                                onClick={() => {
                                    setActiveGameIndex(activeGameIndex - 1)
                                }}
                            >
                                <i className="fad fa-arrow-circle-down"></i>

                            </ArticlesButton>
                            <ArticlesButton
                                className={``}
                                small
                                // active={devDebug}
                                onClick={() => {

                                }}
                                disabled
                            >
                                {activeGameIndex}/{(allGames?.length - 1) || 0}
                            </ArticlesButton>
                            <ArticlesButton
                                className={``}
                                small
                                // active={devDebug}
                                onClick={() => {
                                    setActiveGameIndex(activeGameIndex + 1)
                                }}
                            >
                                <i className="fad fa-arrow-circle-up"></i>
                            </ArticlesButton>
                        </div>

                        <div>
                            <ArticlesButton
                                className={``}
                                small
                                // active={devDebug}
                                onClick={() => {
                                    setZoomLevel(zoomLevel - 1)
                                }}
                            >
                                <i className="fad fa-arrow-circle-down"></i>

                            </ArticlesButton>
                            <ArticlesButton
                                className={``}
                                small
                                disabled
                                onClick={() => {

                                }}
                            >
                                {zoomLevel}
                            </ArticlesButton>
                            <ArticlesButton
                                className={``}
                                small
                                onClick={() => {
                                    setZoomLevel(zoomLevel + 1)
                                }}
                            >
                                <i className="fad fa-arrow-circle-up"></i>
                            </ArticlesButton>
                        </div>

                    </div>

                    <hr className='my-2' />

                    <Dropdown className="d-flex w-100 text-center">

                        <Dropdown.Toggle variant='articles w-100 d-flex justify-content-center align-items-center text-center'>
                            Camera Presets
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="">

                            {
                                // userReduxState?.friends?
                                [
                                    {
                                        name: "Starting",
                                        position: [19, 10, 15]
                                    },
                                    {
                                        name: "Bleacher",
                                        position: [28.32, 5.38, -6.30]
                                    },
                                    {
                                        name: "First Person",
                                        position: [0, 3.5, 0]
                                    },
                                    {
                                        name: "Wind Turbine",
                                        position: [42.50, 16.94, -125.86]
                                    }
                                ]
                                    .map((friend, i) => {
                                        return (
                                            <Dropdown.Item
                                                key={`${i}-${friend.name}`}
                                                onClick={() => {
                                                    setCameraUpdate({
                                                        position: friend.position
                                                    })
                                                }}
                                                className=""
                                                eventKey={i}
                                            >
                                                {/* <i className="fad fa-user" aria-hidden="true"></i> */}
                                                {friend.name}
                                            </Dropdown.Item>
                                        )
                                    })}

                        </Dropdown.Menu>

                    </Dropdown>

                </div>

            </div>

        </div >
    );
}

export default memo(GameMenu);