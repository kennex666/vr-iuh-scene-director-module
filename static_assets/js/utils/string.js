/**
 * Generate a random string of specified length
 * @param {number} length - Length of the random string (default is 6)
 * @returns {string} - Generated random string
 */
export const randomString = (length = 6) => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

/**
 * Convert an object with x, y, z properties to a space-separated string
 * @param {Object} param0 - Object containing x, y, z properties
 * @return {string} - Space-separated string in the format "x y z"
 * @example
 * convertXYZToString({ x: 1, y: 2, z: 3 }); // returns "1 2 3"
 */
export const convertXYZToString = ({ x, y, z }) => {
	return `${x} ${y} ${z}`;
};
