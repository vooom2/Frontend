import { RiLoader5Fill } from "react-icons/ri";

const CircularLoader = ({ color }: { color?: string }) => {
    return (
        <RiLoader5Fill className="animate-spin text-3xl" color={color ?? "black"} />
    );
}

export default CircularLoader;