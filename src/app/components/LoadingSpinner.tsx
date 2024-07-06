'use client';

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <svg width="50" height="50">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'rgba(255, 0, 38, 1)' }} />
                        <stop offset="100%" style={{ stopColor: '#E77F7C' }} />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <circle className="spin2" cx="25" cy="25" fill="none"
                    r="20" strokeWidth="5" stroke="url(#grad1)"
                    strokeDasharray="60 90"
                    strokeLinecap="round" filter="url(#glow)" />
            </svg>
        </div>
    );
};

export default LoadingSpinner;
