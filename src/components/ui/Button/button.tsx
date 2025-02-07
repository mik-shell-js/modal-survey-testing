// app/components/ui/button/button.tsx

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'outline';
    disabled?: boolean;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = 'primary',
    disabled = false,
    className = '',
}) => {
    const baseStyles = 'py-2 rounded-[5rem] border-2 border-black px-16 text-center transition-all duration-200';
    const variants: Record<'primary' | 'outline', string> = {
        primary: 'bg-[#f14421] text-white hover:bg-blue-600',
        outline: 'border border-black text-white hover:bg-gray-100',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${className}`}
        >
            {children}
        </button>
    );
};