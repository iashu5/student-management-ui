import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: onClick ? 1.02 : 1 }}
            onClick={onClick}
            className={`glass-card p-6 cursor-pointer transition-all duration-300 ${onClick ? 'hover:shadow-2xl' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;