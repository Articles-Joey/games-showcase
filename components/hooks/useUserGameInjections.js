// The idea is to allow users to inject their own data that may be missing for games into the system.

export default function useUserGameInjections() {

    return {
        games: [
            {
                name: "Battlefield 4",
                id: "1238860",
                game_launcher: "Steam",
                active_image: "https://images.steamusercontent.com/ugc/541923470430305358/426002902D227CB3B822A15CC7EA0AF5D6718D7B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
            }
        ]
    };

}