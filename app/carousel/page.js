import GameControllerKeyboard from "@/components/GameControllerKeyboard"
import PageContent from "."

export const metadata = {
  title: `Carousel | Games Showcase`,
}

export default function Home() {

  return (
    <>
      <GameControllerKeyboard />
      <PageContent />
    </>
  )

}
