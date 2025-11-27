export function toastMessage(message, type = "success", duration = 3000) {
	const toast = document.createElement("div");
	toast.className = `z-[120] fixed bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 ${
		type === "success" ? "bg-green-500" : "bg-red-500 text-white"
	} `;
	toast.textContent = message;
	document.body.appendChild(toast);
	console.log("Toast message:", message);
	setTimeout(() => {
		document.body.removeChild(toast);
	}, duration);
}
