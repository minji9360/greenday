function showDetail(id) {
	const content = document.querySelector("#content" + id);
	const downButton = document.querySelector("#moreDown" + id);
	const upButton = document.querySelector("#moreUp" + id);

	content.classList.toggle("hidden");
	downButton.classList.toggle("hidden");
	upButton.classList.toggle("hidden");
}

function toggleSentenceDaily(index) {
	const grayDailyButton = document.querySelector("#dailyGray" + index);
	const colorDailyButton = document.querySelector("#dailyColor" + index);
	const grayGoalButton = document.querySelector("#goalGray" + index);
	const colorGoalButton = document.querySelector("#goalColor" + index);

	if (grayGoalButton.classList.contains("hidden")) {
		grayGoalButton.classList.toggle("hidden");
		colorGoalButton.classList.toggle("hidden");
		grayDailyButton.classList.toggle("hidden");
		colorDailyButton.classList.toggle("hidden");
	}
}

function toggleSentenceGoal(index) {
	const grayDailyButton = document.querySelector("#dailyGray" + index);
	const colorDailyButton = document.querySelector("#dailyColor" + index);
	const grayGoalButton = document.querySelector("#goalGray" + index);
	const colorGoalButton = document.querySelector("#goalColor" + index);

	if (grayDailyButton.classList.contains("hidden")) {
		grayGoalButton.classList.toggle("hidden");
		colorGoalButton.classList.toggle("hidden");
		grayDailyButton.classList.toggle("hidden");
		colorDailyButton.classList.toggle("hidden");
	}
}

function toggleSentence(index) {
	const grayButton = document.querySelector("#sentenceGray" + index);
	const colorButton = document.querySelector("#sentenceColor" + index);
	const importantLabel = document.querySelector("#importantLabel" + index);
	const titleInput = document.querySelector("#titleInput" + index);
	const contentInput = document.querySelector("#contentInput" + index);
	const detailBox = document.querySelector("#detailBox" + index);
	const titleBox = document.querySelector("#titleBox" + index);
	const detailButton = document.querySelector("#contentButton" + index);
	const sentenceButtons = document.querySelector("#sentenceButtons" + index);

	grayButton.classList.toggle("hidden");
	colorButton.classList.toggle("hidden");
	importantLabel.classList.toggle("hidden");
	titleBox.classList.toggle("hidden");
	detailButton.classList.toggle("hidden");
	contentInput.classList.toggle("sentence");
	detailBox.classList.toggle("sentence");
	sentenceButtons.classList.toggle("hidden");

	if (titleBox.classList.contains("hidden")) {
		titleInput.required = false;
		contentInput.required = true;
		contentInput.placeholder = "명언이나 목표를 작성해주세요.";
	} else {
		titleInput.required = true;
		contentInput.required = false;
		contentInput.placeholder = "상세 내용을 입력해주세요.";
	}
}

function toggleImportant(index) {
	const grayButton = document.querySelector("#importantGray" + index);
	const colorButton = document.querySelector("#importantColor" + index);

	grayButton.classList.toggle("hidden");
	colorButton.classList.toggle("hidden");
}

function slidePlanDetail(index) {
	const titleBox = document.querySelector("#titleBox" + index);
	const detailBox = document.querySelector("#detailBox" + index);
	const upImage = document.querySelector("#upImage" + index);
	const downImage = document.querySelector("#downImage" + index);

	titleBox.classList.toggle("active");
	detailBox.classList.toggle("active");
	upImage.classList.toggle("hidden");
	downImage.classList.toggle("hidden");
}

function editPlan(index, plans) {
	// 수정 버튼 클릭 시 작동
	const editBtn = document.querySelector("#editButton" + index);
	const titleInput = document.querySelector("#titleInput" + index);
	const contentInput = document.querySelector("#contentInput" + index);

	if (editBtn.classList.contains("hidden")) {
		slidePlanDetail(index);
		editBtn.classList.toggle("hidden");
		titleInput.value = plans.title;
		contentInput.value = plans.content;
	} else if (titleInput.value == plans.title) {
		slidePlanDetail(index);
		editBtn.classList.toggle("hidden");
		titleInput.value = "";
		contentInput.value = "";
	} else if (titleInput.value != plans.title) {
		titleInput.value = plans.title;
		contentInput.value = plans.content;
	}
}

var Slider = function (id, _web, _tab, _mobile, spacing) {
	let containerWidth = 0;
	let sliderItemWidth = 0;
	let totalCount = 0;
	var spacing = spacing || 10;
	let display = _web;
	let left = 0;
	let interval;
	const pagination = document.querySelector(".pagination");

	var DOM = {
		container: function (id) {
			const dom = document.querySelector("#" + id);

			return dom;
		},

		slider: function (container) {
			const dom = document.createElement("div");
			totalCount = container.children.length;

			dom.className = "slider";
			dom.style.position = "relative";
			dom.style.overflow = "hidden";
			dom.style.left = 0;
			dom.style.transition = "left .5s";

			return dom;
		},
	};

	// DOM 만들기
	const container = DOM.container(id);
	const slider = DOM.slider(container);
	const temp = container.innerHTML;
	container.innerHTML = "";
	slider.innerHTML = temp;
	container.appendChild(slider);
	const items = document.querySelector("#" + id + " .slider").children;

	for (let i = 0; i < items.length; i++) {
		items[i].style.float = "left";
		items[i].style.width = sliderItemWidth - spacing + "px";
		items[i].style["margin-right"] = spacing + "px"; // 간격
	}

	// 화면 사이즈 수정시 발생하는 이벤트
	function resize() {
		left = 0;
		document.querySelector("#" + id + " .slider").style.left = left + "px";
		const innerWidth = window.innerWidth;

		if (innerWidth >= 1400) {
			setDisplayCount(_web);
		} else if (innerWidth < 1400 && innerWidth >= 768) {
			setDisplayCount(_tab);
		} else if (innerWidth < 768) {
			setDisplayCount(_mobile);
		}
	}

	// 디스플레이 갯수 설정 함수
	function setDisplayCount(count) {
		display = count;

		containerWidth = container.offsetWidth + spacing;
		sliderItemWidth = containerWidth / display;

		// if (display > 1) {
		document.querySelector("#" + id + " .slider").style.width =
			totalCount * sliderItemWidth + spacing * totalCount + "px";
		// } else {
		// 	document.querySelector("#" + id + " .slider").style.width = 480 + "px";
		// }
		const items = document.querySelector("#" + id + " .slider").children;
		const dayItem = document.querySelector(".day__item");

		if (display === 1) {
			dayItem.classList.add("mobile");
		} else {
			// for (let i = 0; i < items.length; i++) {
			// 	items[i].style.width = sliderItemWidth - spacing + "px";
			// }
			dayItem.classList.remove("mobile");
		}
	}

	// 반응형 디스플레이 갯수 조절
	const isResponsive = _tab != undefined && _mobile != undefined;

	if (isResponsive) {
		window.onresize = resize;
	}

	resize();

	return {
		setDisplayCount: setDisplayCount,
		move: function (index) {
			left = -1 * sliderItemWidth * index;
			document.querySelector("#" + id + " .slider").style.left = left + "px";
		},

		prev: function () {
			left += sliderItemWidth;
			const limit = 0;

			if (left > limit) {
				left = limit;
			}
			document.querySelector("#" + id + " .slider").style.left = left + "px";
		},

		next: function () {
			left -= sliderItemWidth;
			const limit = -1 * sliderItemWidth * (totalCount - display);

			if (left < limit) {
				left = limit;
			}
			document.querySelector("#" + id + " .slider").style.left = left + "px";
		},

		auto: function () {
			clearInterval(interval);
			interval = setInterval(function () {
				left -= sliderItemWidth;
				const limit = -1 * sliderItemWidth * (totalCount - display);

				if (left < limit) {
					left = 0;
				}
				document.querySelector("#" + id + " .slider").style.left = left + "px";
			}, 2000);
		},

		stop: function () {
			clearInterval(interval);
		},
	};
};

function init() {
	const slider = new Slider("slider", 3, 2, 1, 40);
	const next__btn = document.querySelector(".next__btn");
	const prev__btn = document.querySelector(".prev__btn");

	prev__btn.addEventListener("click", slider.prev);
	next__btn.addEventListener("click", slider.next);
	window.editPlan = editPlan;
	window.slidePlanDetail = slidePlanDetail;
	window.toggleImportant = toggleImportant;
	window.toggleSentence = toggleSentence;
	window.toggleSentenceDaily = toggleSentenceDaily;
	window.toggleSentenceGoal = toggleSentenceGoal;
	window.showDetail = showDetail;
}

init();
