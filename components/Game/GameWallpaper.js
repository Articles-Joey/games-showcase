import { memo, useEffect, useState } from "react";
import { useStore } from "@/components/hooks/useStore";
import useAllGames from "@/components/hooks/useAllGames";
import styles from "./GameWallpaper.module.css";

function GameWallpaper() {
    const activeGameIndex = useStore((state) => state.activeGameIndex);
    const { filteredGames } = useAllGames();
    const imageSrc = filteredGames?.[activeGameIndex]?.image;
    const [wallpaper, setWallpaper] = useState({
        current: null,
        previous: null,
    });

    useEffect(() => {
        if (!imageSrc) {
            setWallpaper((current) =>
                current.current ? { current: null, previous: null } : current,
            );
            return;
        }

        let cancelled = false;
        const image = new window.Image();
        image.decoding = "async";

        const showImage = () => {
            if (cancelled) return;
            setWallpaper((current) =>
                current.current === imageSrc
                    ? current
                    : { current: imageSrc, previous: current.current },
            );
        };

        image.onload = () => {
            // Decode before starting the fade, including cached images.
            if (image.decode) {
                image.decode().then(showImage, showImage);
            } else {
                showImage();
            }
        };
        image.src = imageSrc;

        return () => {
            cancelled = true;
            image.onload = null;
        };
    }, [imageSrc]);

    return (
        <div
            className={styles.wallpaper}
            aria-hidden="true"
        >
            {wallpaper.previous && (
                <img
                    key={`previous:${wallpaper.previous}`}
                    className={styles.image}
                    src={wallpaper.previous}
                    alt=""
                    draggable={false}
                />
            )}
            {wallpaper.current && (
                <img
                    key={wallpaper.current}
                    className={`${styles.image} ${styles.fadeIn}`}
                    src={wallpaper.current}
                    alt=""
                    draggable={false}
                    onAnimationEnd={() => {
                        setWallpaper((current) =>
                            current.current === wallpaper.current &&
                            current.previous
                                ? { ...current, previous: null }
                                : current,
                        );
                    }}
                />
            )}
        </div>
    );
}

export default memo(GameWallpaper);
