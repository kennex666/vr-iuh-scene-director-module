import { TabMessenger } from "../utils/TabMessenger.js";

var sceneMessenger = null;

var sceneTest = {
	id: "Cs1-Sky-1224",
	title: "Trụ sở chính",
	isDefault: true,
	rotation: { x: -0.7160000000000002, y: 1.5120000000000005, z: 0 },
	description:
		"Trường có trụ sở chính tại số 12 Nguyễn Văn Bảo, phường 1 quận Gò Vấp, Tp.HCM  là nơi phục vụ cho việc học tập và nghiên cứu của giảng viên, sinh viên tất cả các khoa gồm nhiều khu vực chức năng như các phòng học lý thuyết hiện đại, thư viện rộng lớn, khu vực thực hành với các phòng lab được trang bị đầy đủ thiết bị, khu vực thể thao và khuôn viên xanh mát. Ngoài ra, còn có các khu vực giải trí và căn tin phục vụ nhu cầu ăn uống của sinh viên.",
	assets: {
		audios: {
			background: "./static_assets/audio/background.mp3",
			description: "./static_assets/audio/description.mp3",
		},
		images: {
			type: "IMAGE_360",
			preview: "./static_assets/img/360/Cs1-Sky-1224.jpg",
			highQuality: "./static_assets/img/360/Cs1-Sky-1224.jpg",
		},
	},
	spots: [
		{
			id: "Cs1-HallE-1224",
			type: "goAHead",
			title: "Nhà hiệu bộ",
			position: { x: -5.632, y: -9.5, z: -0.049 },
			rotation: { x: -90, y: 90, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-HallH-1224",
			type: "markPoint",
			title: "Phòng truyền thống",
			position: { x: -3.7, y: -7, z: 3.4 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-HallE4-1224",
			type: "markPoint",
			title: "Hội trường E4",
			position: { x: -3.57, y: -3.47, z: 0 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-HallLibrary-1224",
			type: "markPoint",
			title: "Thư viện",
			position: { x: -0.02, y: -3.47, z: 1.743 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-PracticeRoomSmartGrid-1224",
			type: "markPoint",
			title: "Phòng thực hành Smart Grid",
			position: { x: -4.49, y: -2.2, z: 0.184 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-EngineRoom4.0-1224",
			type: "markPoint",
			title: "Phòng nhà máy 4.0",
			position: { x: -4.38, y: -3.63, z: -1.627 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-PracticeRoomBanking-1224",
			type: "markPoint",
			title: "Phòng mô phỏng Ngân hàng",
			position: { x: -4.95, y: -2.89, z: -2.439 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-PracticeRoomAccounting-1224",
			type: "markPoint",
			title: "Phòng mô phỏng Kế toán",
			position: { x: -4.31, y: -3.1, z: -2.439 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-IUHBar-0425",
			type: "markPoint",
			title: "IUH Bar",
			position: { x: -5, y: -0.8, z: 0.162 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-TrainingRoom-0425",
			type: "markPoint",
			title: "Phòng đào tạo",
			position: { x: -5.36, y: -5.23, z: 2.432 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-InternationalTrainingInstitute-0425",
			type: "markPoint",
			title: "Viện Đào tạo Quốc tế",
			position: { x: -4, y: -5.23, z: 2.432 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-HallE-0425",
			type: "markPoint",
			title: "Sảnh nhà hiệu bộ",
			position: { x: -3.067, y: -3.853, z: -0.0 },
			rotation: { x: 0, y: 0, z: 0.0 },
			scale: { x: 1, y: 1, z: 1 },
		},
		{
			id: "Cs1-E7-0425",
			type: "markPoint",
			title: "Hội trường A7",
			position: { x: -0.554, y: -3.177, z: 3.986 },
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 1, y: 1, z: 1 },
		},
	],
};

var locations = [
	{
		id: "Cs1-Sky-1224",
		title: "Trụ sở chính",
	},
	{
		id: "Cs2-Sky-1224",
		title: "Trụ sở 2",
	},
	{
		id: "Cs3-Sky-1224",
		title: "Trụ sở 3",
	},
	{
		id: "Cs4-Sky-1224",
		title: "Trụ sở 4",
	},
	{
		id: "Cs5-Sky-1224",
		title: "Trụ sở 5",
	},
];

const log = (msg) => {
	document.getElementById("log").innerHTML += msg + "<br>";
};

document.getElementById("openScene").onclick = () => {
	const sceneWin = window.open("/", "sceneDirector-tab");

	sceneMessenger = new TabMessenger("admin", sceneWin);

	sceneMessenger.on("SCENE_READY", (payload) => {
		log("Scene báo READY:", payload);
	});

	sceneMessenger.on("SCENE_CLOSED", () => {
		log("Scene đã đóng");
		sceneMessenger.destroy(); // gỡ listener
	});

	sceneMessenger.on("SET_FAVORITE_POSITION", (payload) => {
		log("SET_FAVORITE_POSITION: " + JSON.stringify(payload));
		sceneTest.rotation = payload.rotation; // Cập nhật lại sceneTest
	});

	sceneMessenger.on("SAVE_CURRENT_SCENE", (payload) => {
		log("SAVE_CURRENT_SCENE: " + JSON.stringify(payload.data));
		sceneTest = payload.data; // Cập nhật lại sceneTest
	});
};

document.getElementById("sendLoad").onclick = () => {
	sceneMessenger.send("LOAD_SCENE", { data: sceneTest });
	log("Gửi lệnh LOAD_SCENE");
};

document.getElementById("loadData").onclick = () => {
	sceneMessenger.send("LOAD_DATA", {
		data: {
			locations: locations,
			scene: sceneTest,
		},
	});
	log("Gửi lệnh LOAD_DATA");
};
