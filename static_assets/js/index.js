import "./libs/aframe/aframe-look-at-component.1.0.0.min.js";
import "./libs/tailwind/tailwind.js";
import "./a-frame/components/custom.js";
import "./instances/tab-message-handler.js";
import "./a-frame/components/axis-helper.js";

import "./a-frame/axis-helper.js";
import "./a-frame/camera.js";
import "./a-frame/hotspots-components.js";
import "./a-frame/drop-drag.js";

import "./events/hotspots.js";
import "./events/keyboard.js";

import "./ui/popup-coordinate.js";
import "./ui/scene.js";
import "./ui/sidebar.js";

import { MenuController } from "./controllers/menu.js";
import { handleTabModify } from "./ui/popup-coordinate.js";
import { handleCloseSlideBar } from "./ui/sidebar.js";

window.__hotspots = [];
window.__plugins = [];

window.currentScene = {
	id: "scene-001",
	name: "Demo Scene 001",
	rotation: { x: 0, y: 0, z: 0 },
};

window.controllMenu = function (el) {
	const controller = el.getAttribute("data-controller");
	const data = el.getAttribute("data-controller-attribute");
	if (controller) {
		MenuController[controller](data);
	}
};

window.onload = function () {
	window.__cam = document.querySelector("#cam");
	handleTabModify();
	const locationBtn = document.querySelector(".btn-add-location");
	const submenu = document.querySelector(".submenu");

	if (locationBtn && submenu) {
		locationBtn.addEventListener("click", () => {
			submenu.classList.toggle("hidden");
		});
	}

	handleCloseSlideBar();

	// Check when scene loaded
	const scene = document.querySelector("a-scene");
	if (scene.hasLoaded) {
		console.log("Scene has already loaded");
		if (messenger) {
			messenger.start();
		}
	} else {
		scene.addEventListener("loaded", () => {
			console.log("Scene loaded event fired");
			if (messenger) {
				messenger.start();
			}
		});
	}
};
