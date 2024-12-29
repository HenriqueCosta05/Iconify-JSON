import { Icon } from "@iconify/react";

interface IconProps {
    size: string;
    color?: string;
    icon: string;
}

export default function IconComponent({ size, color, icon }: IconProps) {
    return (
        <Icon
            icon={icon}
            color={color}
            width={size}
        />
    );
    
}