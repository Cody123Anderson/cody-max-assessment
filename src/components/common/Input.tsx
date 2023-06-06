import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label?: string;
    onOutsideClick?: () => void;
}

export const Input = ({ label, id, children, onOutsideClick, ...props}: Props) => {
    const handleOutsideClick = () => {
        onOutsideClick && onOutsideClick();
    };
    
    const ref = useOutsideClick(handleOutsideClick);

    return (
        <div ref={ref} className="mb-4 relative">
            {label && (
                <label 
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                autoComplete="off"
                {...props}
            /> 
            {children}
        </div>
    );
};