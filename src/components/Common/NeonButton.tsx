import React from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
}

const NeonButton: React.FC<NeonButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    className = '',
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
        secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
        danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 neon-glow ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default NeonButton;