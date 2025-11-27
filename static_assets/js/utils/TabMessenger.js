import { toastMessage } from "../ui/toast.js";

export class TabMessenger {
	constructor(role, targetWindow = null, targetOrigin = "*") {
		this.role = role;
		this.targetWindow = targetWindow;
		this.targetOrigin = targetOrigin;
		this.handlers = {};

		this.listener = (event) => {
			const { type, payload } = event.data || {};
			if (type && this.handlers[type]) {
				this.handlers[type](payload, event);
			}
		};

		window.addEventListener("message", this.listener);
	}

	on(type, handler) {
		this.handlers[type] = handler;
	}

	backToParent() {
		if (window.opener && !window.opener.closed) {
			window.close();
		} else {
			console.warn("Parent closed or unavailable");
		}
		console.log("Back to parent window");
	}

	send(type, payload) {
		try {
			if (this.role === "admin" && this.targetWindow) {
				this.targetWindow.postMessage({ type, payload }, this.targetOrigin);
			} else if (this.role === "scene" && window.opener) {
				window.opener.postMessage({ type, payload }, this.targetOrigin);
			} else {
				toastMessage(
					"Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin",
					"error",
					4000
				);
			}
		} catch (err) {
			toastMessage("Không thể kết nối đến admin, hãy đóng tab này và mở lại bằng giao diện admin", "error", 4000);
		}
	}

	destroy() {
		window.removeEventListener("message", this.listener);
		this.handlers = {};
		this.targetWindow = null;
	}
}
