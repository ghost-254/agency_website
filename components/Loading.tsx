import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-blue-500" />
            <span className="ml-2 text-lg text-gray-700">Loading...</span>
        </div>
    );
};

export default Loading;

