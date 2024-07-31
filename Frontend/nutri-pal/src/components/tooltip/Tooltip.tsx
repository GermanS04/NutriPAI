'use client'

import '@/styles/Tooltip.css'

interface TooltipProps {
    trigger: any;
    tooltipText: any;
    position: string;
    width?: string;
}

export const Tooltip = ({ trigger, tooltipText, position, width = 'default' }: TooltipProps) => {
    return (
        <div className='tooltip-trigger-container'>
            {trigger}
            <div className={`tooltip-text-container tooltip-text-container-${position} tooltip-text-container-${width}`}>
                {tooltipText}
            </div>
        </div>
    )
}
