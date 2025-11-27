/**
 * Get the position in front of the camera
 * @param {number} distance Distance in front of the camera
 * @returns {Object} Position {x, y, z}
 */
export function getForwardPosition(distance = 5) {
	const sceneEl = document.querySelector("a-scene");
	const cameraEl = sceneEl.querySelector("#cam");

	if (!cameraEl) return console.warn("Không tìm thấy camera.");

	// --- Lấy position và rotation từ camera ---
	const camPos = cameraEl.getAttribute("position");
	const camRot = cameraEl.getAttribute("rotation");

	// --- Tính vị trí hotspot phía trước camera ---
	const radY = THREE.MathUtils.degToRad(camRot.y);
	const radX = THREE.MathUtils.degToRad(camRot.x);

	const hotspotPos = {
		x: camPos.x - distance * Math.sin(radY),
		y: camPos.y + distance * Math.sin(radX),
		z: camPos.z - distance * Math.cos(radY),
	};

	return hotspotPos;
}

/**
 * Get the current rotation of the camera
 * @returns {Object} The current rotation {x, y, z}
 */
export const getCurrentRotation = () => {
	let cameraEl = document.querySelector("#cam");
	// Access the custom-look component
	console.log(cameraEl.components);
	if (!cameraEl || !cameraEl.components["custom-look"]) {
		console.warn("Camera or custom-look component not found.");
		return { x: 0, y: 0, z: 0 };
	}
	let rotation = cameraEl.components["custom-look"].getCurrentRotation();
	return rotation;
};
