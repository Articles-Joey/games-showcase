import { useSocketStore } from "@/components/hooks/useSocketStore"
import { useStore } from "@/components/hooks/useStore"

export default function OnlinePlayerCount() {

    const lobbyDetails = useStore(state => state.lobbyDetails)
    const connected = useSocketStore(state => state.connected)

    return (
        <div className="online-players d-flex flex-wrap justify-content-center align-items-center mb-3">
            {connected ?
                <>
                    <div className="">Players Online: {lobbyDetails?.players_online || 0}</div>
                    <div className="px-1">|</div>
                    <div className="">Players In Game: {lobbyDetails?.players_in_game || 0}</div>
                </>
                :
                <>
                    <div className="">Loading server details...</div>
                </>
            }
        </div>
    )

}