import { useEffect, useLayoutEffect, useState } from "react";
import { usePreviewActive, usePreviewVisible } from "./PreviewActivity";
import { PreviewSuspense, usePreviewLoadTracker } from "./PreviewLoadTracker";

const jobs = [];
let scheduled = false;
let revision = 0;

export function getPreviewWorkState() {
    return { pending: jobs.length > 0 || scheduled, revision };
}

// Mount one chunk per idle period, with a painted frame between chunks. Code
// splitting alone still constructs every CSG mesh in the same React commit.
export function schedulePreviewWork(callback, priority = 0) {
    const job = { callback, priority, cancelled: false };
    jobs.push(job);
    revision += 1;
    scheduleNext();
    return () => {
        job.cancelled = true;
        const index = jobs.indexOf(job);
        if (index !== -1) jobs.splice(index, 1);
        revision += 1;
    };
}

function scheduleNext() {
    if (scheduled || !jobs.length) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
        const run = () => {
            scheduled = false;
            jobs.sort((a, b) => b.priority - a.priority);
            const job = jobs.shift();
            try {
                if (job && !job.cancelled) job.callback();
            } finally {
                revision += 1;
                scheduleNext();
            }
        };
        if (window.requestIdleCallback) {
            window.requestIdleCallback(run, { timeout: 250 });
        } else {
            window.setTimeout(run, 16);
        }
    });
}

export default function DeferredPreview({ children, enabled = true }) {
    const visible = usePreviewVisible();
    const active = usePreviewActive();
    const [ready, setReady] = useState(false);
    const tracker = usePreviewLoadTracker();

    useLayoutEffect(() => {
        if (!enabled || ready) return;
        return tracker?.begin();
    }, [tracker, enabled, ready]);

    useEffect(() => {
        if (ready || !visible || !enabled) return;
        return schedulePreviewWork(() => setReady(true), active ? 1 : 0);
    }, [ready, visible, enabled, active]);

    // Once mounted, keep the same instances even when the preview is hidden.
    return ready ? <PreviewSuspense>{children}</PreviewSuspense> : null;
}
