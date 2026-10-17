import {
    Component,
    createContext,
    Suspense,
    useContext,
    useLayoutEffect,
} from "react";

const LoadContext = createContext(null);

export function createPreviewLoadTracker() {
    return {
        pending: new Set(),
        revision: 0,
        committed: false,
        error: null,
        begin() {
            const token = Symbol();
            this.pending.add(token);
            this.revision += 1;
            return () => {
                if (this.pending.delete(token)) this.revision += 1;
            };
        },
    };
}

export function PreviewLoadProvider({ tracker, children }) {
    return (
        <LoadContext.Provider value={tracker}>{children}</LoadContext.Provider>
    );
}

export function usePreviewLoadTracker() {
    return useContext(LoadContext);
}

export function PreviewPending() {
    const tracker = usePreviewLoadTracker();
    useLayoutEffect(() => tracker?.begin(), [tracker]);
    return null;
}

function PreviewCommitted() {
    const tracker = usePreviewLoadTracker();
    useLayoutEffect(() => {
        if (!tracker) return;
        tracker.committed = true;
        tracker.revision += 1;
    }, [tracker]);
    return null;
}

export function PreviewSuspense({ children, fallback = null }) {
    return (
        <Suspense
            fallback={
                <>
                    <PreviewPending />
                    {fallback}
                </>
            }
        >
            {children}
            <PreviewCommitted />
        </Suspense>
    );
}

export class PreviewErrorBoundary extends Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error) {
        this.props.tracker.error = error;
        this.props.tracker.revision += 1;
        console.error(`Unable to prepare ${this.props.name} preview`, error);
    }

    render() {
        return this.state.error ? null : this.props.children;
    }
}
