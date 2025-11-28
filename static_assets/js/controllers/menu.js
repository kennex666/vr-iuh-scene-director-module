import { getCurrentRotation, getForwardPosition } from "../a-frame/camera.js";
import { toastMessage } from "../ui/toast.js";
import { getPluginsFromScene, getSpotsFromScene } from "../utils/hotspots.js";

export const MenuController = {
	setFavorite: function () {
		const rotation = getCurrentRotation();
		console.log("Vị trí hiện tại đã được đặt làm vị trí mặc định:", rotation);
		if (messenger) {
			messenger.send("SET_FAVORITE_POSITION", {
				data: {
					id: currentScene.id,
					rotation,
				},
			});
			messenger.ack = new Date().getTime();
			setTimeout(() => {
				if (messenger.ack) {
					toastMessage(
						"Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin hoặc thử lại 1 lần nữa",
						"error",
						8000
					);
					messenger.ack = null;
				}
			}, 5000);
		} else {
			toastMessage("Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin", "error", 8000);
		}
	},

	goToForward: function () {
		// current select object
		const popup = document.querySelector("#popup-custom-value");
		const currentObjId = popup.getAttribute("current-object-id");
		console.log("Input changed for object:", currentObjId);
		if (currentObjId) {
			// Apply all attributes to the object
			const obj = document.getElementById(currentObjId);
			if (!obj) {
				console.warn("Object not found:", currentObjId);
				return;
			}

			obj.setAttribute("position", getForwardPosition(5));
		}
	},

	toggleCustomValuePopup: function () {
		const popup = document.querySelector("#popup-custom-value");
		popup.classList.toggle("hidden");
	},
	saveCurrentScene: () => {
		if (!currentScene || !currentScene.id) {
			console.warn("No current scene to save.");
			return;
		}
		const spots = getSpotsFromScene();
		const plugins = getPluginsFromScene();
		currentScene.spots = spots;
		currentScene.plugins = plugins;

		console.log("Current scene data to save:", currentScene);
		if (messenger) {
			messenger.send("SAVE_CURRENT_SCENE", { data: currentScene });
			messenger.ack = new Date().getTime();
			setTimeout(() => {
				if (messenger.ack) {
					toastMessage(
						"Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin hoặc thử lại 1 lần nữa",
						"error",
						8000
					);
					messenger.ack = null;
				}
			}, 5000);
		} else {
			toastMessage("Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin", "error", 8000);
		}
	},
	openMenuLeftPlugins: () => {
		const sidebar = document.querySelector("#side-menu");
		if (sidebar) {
			sidebar.classList.toggle("-translate-x-full");
			document.querySelector("#plugin-list").classList.toggle("hidden", false);
			document.querySelector("#location-list").classList.toggle("hidden", true);
		}
	},
	openMenuLeftLocations: () => {
		const sidebar = document.querySelector("#side-menu");
		if (sidebar) {
			sidebar.classList.toggle("-translate-x-full");
			document.querySelector("#plugin-list").classList.toggle("hidden", true);
			document.querySelector("#location-list").classList.toggle("hidden", false);
		}
	},
};
