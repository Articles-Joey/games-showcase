export default function useUserGames() {

    const userGames = [
        {
            name: 'Halo 3',
            key: 'halo-3',
            type: 'public',
            image: '/img/Games/Halo.webp',
            active_image: "https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyNGFvdWtyYWhvcnY1ZnpmdW1vNTJiaWd1MHNyaG1zcDAybDZzNTV1MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZnqfvC8BNlAXInRwG1/source.gif",
            short_description: 'Example of a user added game.',
            single_player: true,
            multiplayer: true,
            multiplayer_tag: 'Various Modes',
            developer: 'Halo Studios',
            publisher: 'Xbox Game Studios',
        },
        {
            name: 'Fortnite',
            key: 'fortnite',
            type: 'public',
            image: '/img/Games/Fortnite.webp',
            active_image: "https://media2.giphy.com/media/gwiIM7kk0MPdSJaQqT/giphy-downsized.gif",
            short_description: 'Example of a user added game.',
            multiplayer: true,
            multiplayer_tag: 'Various Modes',
            developer: 'Epic Games',
            publisher: 'Epic Games',
        },
        {
            name: 'Minecraft',
            key: 'minecraft',
            type: 'public',
            image: '/img/Games/Minecraft.webp',
            active_image: "https://media2.giphy.com/media/7OH9z8lL8cnmkOxb6A/200.gif",
            short_description: 'Example of a user added game.',
            multiplayer: true,
            multiplayer_tag: 'Various Modes',
            developer: 'Epic Games',
            publisher: 'Epic Games',
            // launch_location: "F:\\Programs\\PrismLauncher\\prismlauncher.exe"
            launch_command: process.env.NEXT_PUBLIC_MINECRAFT_LAUNCH_COMMAND || "",
        },
    ]

    return {
        games: userGames
    };

}