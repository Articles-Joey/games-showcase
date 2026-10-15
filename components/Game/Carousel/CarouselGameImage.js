import { Component, Suspense, useState } from "react";
import { Html, Image } from "@react-three/drei";
import { DoubleSide } from "three";

// A failed or CORS-blocked texture should only replace its thumbnail.
class ImageErrorBoundary extends Component {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    render() {
        return this.state.failed ? this.props.fallback : this.props.children;
    }
}

function HtmlImage({ src, name, hidden = false, onLoad, onError }) {
    return (
        <Html
            transform
            distanceFactor={10}
            zIndexRange={[1, 0]}
            pointerEvents="none"
        >
            <img
                src={src}
                alt={name}
                onLoad={onLoad}
                onError={onError}
                draggable={false}
                style={{
                    display: "block",
                    width: "300px",
                    height: "175px",
                    borderRadius: "4px",
                    objectFit: "cover",
                    opacity: hidden ? 0 : 1,
                }}
            />
        </Html>
    );
}

export default function CarouselGameImage({
    image,
    activeImage,
    name,
    showActiveImage,
}) {
    const [loadedPreview, setLoadedPreview] = useState(null);
    const [failedPreview, setFailedPreview] = useState(null);
    const previewSrc =
        showActiveImage && activeImage && failedPreview !== activeImage
            ? activeImage
            : null;
    const previewReady = !!previewSrc && loadedPreview === previewSrc;

    if (!image) return null;

    const htmlFallback = (
        <HtmlImage
            src={image}
            name={name}
            hidden={previewReady}
        />
    );

    return (
        <group
            position={[-0.25, 11.5, 0]}
            rotation={[0, Math.PI / 2, 0]}
        >
            {/\.gif(?:$|[?#])/i.test(image) ? (
                htmlFallback
            ) : (
                <ImageErrorBoundary
                    key={image}
                    fallback={htmlFallback}
                >
                    <Suspense fallback={htmlFallback}>
                        {/* Match the former 300 x 175 Html at distanceFactor 10. */}
                        <Image
                            url={image}
                            scale={[7.5, 4.375]}
                            radius={0.1}
                            transparent
                            toneMapped={false}
                            side={DoubleSide}
                            visible={!previewReady}
                        />
                    </Suspense>
                </ImageErrorBoundary>
            )}

            {/* Keep animated previews in the DOM; TextureLoader uploads one frame. */}
            {previewSrc && (
                <HtmlImage
                    key={previewSrc}
                    src={previewSrc}
                    name={name}
                    hidden={!previewReady}
                    onLoad={() => setLoadedPreview(previewSrc)}
                    onError={() => setFailedPreview(previewSrc)}
                />
            )}
        </group>
    );
}
