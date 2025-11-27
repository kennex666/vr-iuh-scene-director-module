/**
 * Register event to handle close sidebar
 */
export function handleCloseSlideBar() {
	// Close sidebar
	const btnClose = document.querySelector("#close-side-menu");
	const sidebar = document.querySelector("#side-menu");
	if (btnClose && sidebar) {
		btnClose.addEventListener("click", () => {
			sidebar.classList.toggle("-translate-x-full");
		});
	}

	// Back to parent window
	const backParentBtn = document.querySelector("#back-parent-btn");
	if (backParentBtn) {
		backParentBtn.addEventListener("click", () => {
			messenger.backToParent();
		});
	}
}
