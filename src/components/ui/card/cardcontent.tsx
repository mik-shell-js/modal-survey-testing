// app/components/ui/card/cardcontent.tsx

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
    return <div className={`p-4 ${className}`}>{children}</div>;
};