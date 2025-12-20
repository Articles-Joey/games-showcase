import { ModelMinecraftChest } from "@/components/Models/Minecraft/Chest";
import { ModelMinecraftChicken } from "@/components/Models/Minecraft/Chicken";
import { ModelMinecraftCreeper } from "@/components/Models/Minecraft/Creeper";
import { ModelMinecraftDiamondAxe } from "@/components/Models/Minecraft/Diamond_axe";
import { ModelMinecraftSnowGolem } from "@/components/Models/Minecraft/Snow_golem";
import { ModelMinecraftSteve } from "@/components/Models/Minecraft/Steve";
import { ModelMinecraftWoodenDoor } from "@/components/Models/Minecraft/Wooden_door";
import { degToRad } from "three/src/math/MathUtils";

export default function MinecraftScene() {
    return (
        <group
        // scale={0.05}
        >

            <ModelMinecraftCreeper
                position={[5, 2.5, 3]}
                scale={0.16}
                rotation={[0, degToRad(45), 0]}
            />

            <ModelMinecraftChest
                position={[5, 1.4, 0]}
                scale={0.01}
            />

            <ModelMinecraftChicken
                position={[5, 3, 0]}
                scale={1}
            />

            <ModelMinecraftSnowGolem
                position={[5, 2.5, -3.2]}
                scale={0.14}
                rotation={[0, degToRad(90 + 45), 0]}
            />        

            <ModelMinecraftDiamondAxe
                position={[0, 0, 0]}
                scale={0.01}
            />
            
            <ModelMinecraftSteve
                position={[0, 3, -2]}
                scale={0.004}
                rotation={[0, degToRad(60), 0]}
            />
            
            <ModelMinecraftWoodenDoor
                position={[-1.2, 3.5, 2]}
                scale={1.5}
                rotation={[0, degToRad(90), 0]}
            />

        </group>
    );
}