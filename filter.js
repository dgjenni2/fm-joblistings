$(document).ready(function () {
	let activeFilters = []

	function resetFilters() {
		activeFilters = []
		$(".filters").addClass("hidden")
		$("main").css("padding-top", "3rem")
		$(".card").removeClass("hidden")
	}

	function updateDisplayedFilters() {
		if (activeFilters.length < 1) {
			resetFilters()
			return
		}

		// Filter Display
		$(".filters > ul").empty()
		$(".filters > ul").append(
			activeFilters.map((item) => {
				itemString =
					"<li><p>" +
					item +
					'</p><img class="filters__removeButton" data-filterName="' +
					item +
					'" src="./images/icon-remove.svg" alt="remove filter" /></li>'
				return itemString
			})
		)

		// Shuffle content down in main that no longer displays
		$("main").css(
			"padding-top",
			$(".filters").outerHeight() ? $(".filters").outerHeight() : 0
		)

		// Add Hidden Filters to appropriate cards
		let cardList = $(".card")
		for (let cardIndex = 0; cardIndex < cardList.length; cardIndex++) {
			let card = cardList[cardIndex]
			let tags = $(card)
				.children("section")
				.children(".card__filters")
				.children("li")
				.text()
			for (
				let filterIndex = 0;
				filterIndex < activeFilters.length;
				filterIndex++
			) {
				if (!tags.includes(activeFilters[filterIndex])) {
					$(cardList[cardIndex]).addClass("hidden")
					continue
				}
			}
		}
	}

	function filterCards() {}

	$(".filters__clear").click(function (e) {
		e.preventDefault()
		resetFilters()
	})

	$(this).on("click", "img.filters__removeButton", function (e) {
		e.preventDefault()
		activeFilters = activeFilters.filter((item) => {
			return item != $(this)[0].dataset["filtername"]
		})
		updateDisplayedFilters()
	})

	$(".card__filters > li").click(function (e) {
		e.preventDefault()
		$(".filters").removeClass("hidden")

		let newFilter = $(this)[0].childNodes[0].data
		if (!activeFilters.includes(newFilter)) {
			activeFilters.push(newFilter)
		}
		updateDisplayedFilters()
	})
})
