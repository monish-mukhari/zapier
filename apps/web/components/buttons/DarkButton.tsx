import { ReactNode } from "react"


export const DarkButton = ({ children, onClick, size = "small" }: { children: ReactNode, onClick: () => void, size?: "big" | "small" }) => {
    return <div onClick={onClick} className={`bg-purple-800 text-white cursor-pointer rounded hover:shadow-md text-center px-8 py-2 flex flex-col justify-center`}>
        { children }
    </div>
}