import ArticlesButton from "@/components/UI/Button";
import { useCanvasLoading } from "./CanvasLoadingContext";
import styles from "./GameCanvasLoader.module.css";

export default function GameCanvasLoader() {
    const state = useCanvasLoading((value) => value);
    if (state.status === "ready" || state.skipped) return null;
    const percent =
        state.status === "finishing"
            ? 99
            : Math.min(
                  98,
                  Math.floor(
                      (state.completed / Math.max(1, state.total)) * 100,
                  ),
              );

    return (
        <div
            className={styles.overlay}
            aria-busy="true"
        >
            <div className={styles.panel}>
                <p className={styles.title}>Loading games</p>
                <p
                    className={styles.detail}
                    role="status"
                    aria-live="polite"
                >
                    {state.current || "Getting the carousel ready"}
                </p>
                <div
                    className={styles.track}
                    role="progressbar"
                    aria-label="Game previews"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={percent}
                >
                    <div
                        className={styles.fill}
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <div className={styles.progress}>
                    <span>
                        {state.phase} · {state.completed} of {state.total}
                    </span>
                    <span>{percent}%</span>
                </div>
                <div className={styles.skip}>
                    <ArticlesButton
                        type="button"
                        onClick={state.skipPreload}
                    >
                        Skip Preload
                    </ArticlesButton>
                </div>
            </div>
        </div>
    );
}
