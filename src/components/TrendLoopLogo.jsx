import React from "react";

function TrendLoopLogo({ className = "w-28 h-auto" }) {
	return (
		<div className={className} aria-label="TrendLoop logo">
			<svg viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
				<text x="0" y="18" fill="white" fontSize="18" fontFamily="Inter, system-ui, sans-serif" fontWeight="700">
					TrendLoop
				</text>
			</svg>
		</div>
	);
}

export default TrendLoopLogo;

