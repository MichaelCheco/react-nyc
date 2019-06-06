export const autoGrid = (minColumnWidth = 250, gridGap = 0) => ({
	display: 'grid',
	gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`,
	gridGap,
});
