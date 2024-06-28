'use client'

import '@/styles/Tooltip.css'

interface TooltipProps {
    trigger: any,
    tooltipText: string,
    position: string
}

export const Tooltip = ({ trigger, tooltipText, position }: TooltipProps) => {
    return (
        <div className='tooltip-trigger-container'>
            {trigger}
            <div className={`tooltip-text-container tooltip-text-container-${position}`}>
                {tooltipText}
            </div>
        </div>
    )
}
