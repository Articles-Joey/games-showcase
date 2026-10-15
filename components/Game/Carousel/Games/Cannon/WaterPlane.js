import PreviewWater from "../shared/PreviewWater";

export default function WaterPlane({ radius = 5, ...props }) {
    return (
        <PreviewWater
            radius={radius}
            speed={0.25}
            {...props}
        />
    );
}
