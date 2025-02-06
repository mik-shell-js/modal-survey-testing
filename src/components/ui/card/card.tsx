// app/components/ui/card/card.tsx

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return <div className={`bg-[#303338] shadow-md rounded-lg overflow-hidden ${className}`}>{children}</div>;
};