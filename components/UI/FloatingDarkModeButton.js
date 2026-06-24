import "@/styles/components/FloatingDarkModeButton.scss"
import { useStore } from "@/components/hooks/useStore";

export default function FloatingDarkModeButton() {

    const darkMode = useStore((state) => state.darkMode);
    const toggleDarkMode = useStore((state) => state.toggleDarkMode);

    return (
        <button
            className="floating-dark-mode-button"
            onClick={toggleDarkMode}
        >
            {darkMode ?
                <i className="fad fa-sun"></i>
                :
                <i className="fad fa-moon"></i>
            }
        </button>
    );
}