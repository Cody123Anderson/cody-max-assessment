import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
    children: ReactNode;
    showBackButton?: boolean;
    showMyListButton?: boolean;
}

export const Page = ({children, showBackButton = true, showMyListButton = true}: Props) => {
    return (
        <div className="p-8 max-w-5xl m-auto">
            <nav className="flex justify-between mb-8">
                <Link to="/" className={showBackButton ? 'visible' : 'invisible'}>
                    <button type="button" className="text-gray-700 transition-colors border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mr-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
                        <svg aria-hidden="true" className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Back</span>
                        <span className="ml-2">Back to Search</span>
                    </button>
                </Link>
                <Link to="/my-list" className={`text-blue-500 hover:underline justify-self-end ${!showMyListButton && 'invisible'}`}>View My List</Link>
            </nav>
            {children}
        </div>
    );
}