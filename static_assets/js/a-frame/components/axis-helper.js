import { openCustomValuePop, setCustomObjectTab } from "../../ui/popup-coordinate.js";
import { createAxisHelper } from "../axis-helper.js";

AFRAME.registerComponent("axis-helper", {
	init: function () {
		const el = this.el;
		createAxisHelper(el.id);
		this.isSelected = false;
	},
});
AFRAME.registerComponent("axis-selector", {
	init: function () {
		const el = this.el;
		const parent = el.parentElement;

		el.addEventListener("click", (event) => {
			console.log("Click axis selector");
			const groupAxis = parent.querySelector(".axis-helper");
			console.log("Group axis:", el);
			if (groupAxis) {
				const isVisible = !groupAxis.getAttribute("visible");
				groupAxis.setAttribute("visible", isVisible);
				const axes = groupAxis.querySelectorAll(".axis");
				if (isVisible) {
					if (window.__selectTargetId) {
						const oldTarget = window.__selectTargetId;
						const oldAxes = oldTarget.querySelectorAll(".axis");
						oldAxes.forEach((axis) => {
							axis.classList.toggle("clickable", false);
						});
						setTimeout(() => {
							oldTarget.setAttribute("visible", false);
						}, 0);
					}

					window.__selectTargetId = groupAxis;
					axes.forEach((axis) => {
						axis.classList.toggle("clickable", true);
					});
					openCustomValuePop();
					setCustomObjectTab(parent.id, {
						posX: parent.getAttribute("position").x,
						posY: parent.getAttribute("position").y,
						posZ: parent.getAttribute("position").z,
						rotX: parent.getAttribute("rotation").x,
						rotY: parent.getAttribute("rotation").y,
						rotZ: parent.getAttribute("rotation").z,
						scaleX: parent.getAttribute("scale").x,
						scaleY: parent.getAttribute("scale").y,
						scaleZ: parent.getAttribute("scale").z,
					});
				} else {
					// remove class clickable cho cac axis
					window.__selectTargetId = null;
					axes.forEach((axis) => {
						axis.classList.toggle("clickable", false);
					});
				}
			}
		});
	},
});
