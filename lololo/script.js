
 $(document).ready(function() {
	//Загрузка сказки и формирование html
	$.getJSON(
		'https://api.myjson.com/bins/jcmhn',
		function(data) {
			render(data.text);
		}
	);	

	//обработчик нажатия на кнопку
	$('.create').click(function() {
		for (let i = 1; i < $("input").length; i++) {
			writeHtml(`.field-${i}`, $(`input-field${i}`).val());
		}

		$("input").each(function(index) {
			writeHtml(`.${$( this ).attr('class').replace(/input-(.+)/, "$1")}`, $( this ).val());
			
		});
	});
});

function render(data) {
	//замена в шаблоне значениями из формы
	let fairyTail = "";
	let templates = {}; //Ассоциативный массив с найденными в тексте шаблонными фразами
	let count = 0; //Счетчик найденных шабонных фраз
	
	data.forEach(function(string) {
		
		//далее собирается ассоциативный массив templatees
		string = string.replace(/\{.+?\}/g, 
							function(match) {
								let flagFound = false; //флаг того, что шаблонная фраза уже обработана
								for (let key in templates) {
									if (templates[key] == match) {
										flagFound = true;
										return `<span class="${key}">${templates[key]}</span>`
									}
								}
								if (flagFound == false) {
									templates[`field-${++count}`] = match;
									return `<span class="field-${count}">${match}</span>`
								};
							});

		//сбор всех строк в переменную fairyTail
		fairyTail = fairyTail + `<p>${string}</p>`;
	});
	//Создание input элементов в html
	let formContent = ``;
	for (let key in templates) {
		formContent += `<input type="text" class="input-${key}"" placeholder="${templates[key]}">`
	}	
	
	writeHtml('form', formContent); //Создание формы в html
	writeHtml('.result', fairyTail); //Создание текста под формой
}

function writeHtml(field, data) {
	const $result = $(field);
	$result.html(data);
}
