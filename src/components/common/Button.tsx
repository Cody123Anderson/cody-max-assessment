type Props = React.InputHTMLAttributes<HTMLButtonElement> & {
    type?: 'button' | 'submit' | 'reset';
    styleType?: 'primary' | 'link';
}

const getClassName = (styleType: Props['styleType']): string => {
    switch (styleType) {
        case 'primary':
            return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full';
        case 'link':
            return 'bg-gray-200 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded-full inline-flex items-center';
        default:
            return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full';
    }
}

export const Button = ({ children, styleType = 'primary', ...props}: Props) => {
    return (
        <button
            className={getClassName(styleType)}
            {...props}
        >
            {children}
        </button>
    );
};