// ############################
	
	// *** НАСТРОЙКИ ***
		
	var sel_killer_active = true; // Запрет выделения текста
	var pkm_killer_active = true; // Запрет ПКМ
	
	var add_source_active = true; // Добавление источника к скопированному тексту
	 var add_source_text = "<br><br>Source: "; // Текст для добавления. Формат "Text123 " + тут будет ссылка на страницу
	
	var key_killer_active = true; // Отслеживание горячих клавиш (настраиваются в массиве)
	 var joke_alert_active = true; // Выводить ли шуточные сообщения каждые N нажатых комбинаций
	 var echo_combo_in_log = false; // Дебаг: Выводить инфу о комбо в лог консоли
	 var key_throw_tags = "INPUT|TEXTAREA|I"; // Теги, где запреты не работают.  !!! Обязательно капсом
	
	// Желательно обфусцировать все файлы
	
// ############################

// Главный массив с горячими клавишами
var arr_keys_comb =
	[
		// Горячие клавиши "для себя"
		[ ["CapsLock","Digit1","KeyY"] , function(){ window.open("https://yandex.ru/", "_blank"); } ],
		[ ["CapsLock","Digit1","KeyG"] , function(){ window.open("https://www.google.com/", "_blank");} ],
		[ ["CapsLock","Digit1","KeyT","Digit5"] , function(){ window.open("https://translate.yandex.ru/", "_blank");} ],
		[ ["CapsLock","Digit1","KeyT","Digit6"] , function(){ window.open("https://translate.google.com/", "_blank");} ],
		
		[ ["CapsLock","Digit2","KeyF"] , function(){ window.open("https://accounts.fozzy.com/clientarea.php", "_blank");} ],
		
		[ ["CapsLock","Digit3","KeyO"] , function(){ window.open("http://www.php.su/", "_blank");} ],
		[ ["CapsLock","Digit3","KeyP"] , function(){ window.open("http://www.php.net/", "_blank");} ],
		
		
		// ################
		
		// Дебаг режим - вывожит нажатые клавиши на экран
		[ ["CapsLock","KeyA","KeyS"] , function(){ antiplag_debug_start(); alert("HotKeys Debug START!!!"); } ],
		[ ["CapsLock","KeyA","KeyE"] , function(){ antiplag_debug_end(); alert("HotKeys Debug END!!!"); } ],
		
		// ################
		
		// Запрет горячих клавиш
		[ ["ControlLeft","KeyS"] , function(){ KeyKiller(event); alert("YOU SHALL NOT SAVE!!!"); } ],
		[ ["ControlLeft","KeyA"] , function(){ KeyKiller(event); alert("Нет"); } ],
		[ ["ControlLeft","KeyU"] , function(){ KeyKiller(event); alert("Ай-яй-яй, нехорошо..."); } ],
		[ ["ControlLeft","KeyC"] , function(){ KeyKiller(event); alert("Плагиатить нехорошо :("); } ],
		[ ["ControlLeft","KeyP"] , function(){ KeyKiller(event); alert("Бумага закончилась"); } ],
		[ ["ControlLeft","KeyI","ShiftLeft"] , function(){ KeyKiller(event); alert("Мдааа..."); } ],
		[ ["ControlLeft","KeyJ","ShiftLeft"] , function(){ KeyKiller(event); alert("О, мало кто знает эту комбинацию...))."); } ],
		[ ["F12"] , function(){ KeyKiller(event); alert("Думал будет так просто?"); } ],
		
		// ################
		
		[ ["CapsLock","KeyQ","KeyW","KeyE"] , function()
			{ alert("Доказательство авторства 1/3:\nЕсли вы это читаете, то комбинацию вам сказал автор проекта.\n");} ],
		[ ["CapsLock","KeyI","KeyO","KeyP"] , function()
			{ alert("Доказательство авторства 2/3:\nЕсли вы это читаете, то комбинацию вам сказал автор проекта.\n");} ],
		[ ["CapsLock","KeyG","Digit6"] , function()
			{ alert("Доказательство авторства 3/3:\nЕсли вы это читаете, то комбинацию вам сказал автор проекта.\n");} ]
		
	];
	// ShiftLeft ControlLeft AltLeft    Digit1 KeyA

/*
	150420

	CapsLock + ?

	1 = Поиск и всякое
	G - google
	Y - yandex
	T+5 - яндекс переводчик
	T+6 - гугл переводчик

	2 = Хостинги
	F - fozzy (везде страницы входа)
	C - cloudflare
	H - Hostinger

	3 = Для кода
	O - php.su
	P - php.net
	Потом = https://keycode.info/

	4 = Платежки (Вход)
	M = перф мон
	P = пейер
	W = WebMoney
	Q = Qiwi

	Авторство:
	1 = Caps + Q W E
	2 = Caps + I O P
	3 = Caps + G 6


	ДЕБАГ:
	Caps + A + S = Start
	Caps + A + E = End

*/

// ############################



/*

!!! коды всех клавиш  https://keycode.info/
Полезный код по теме https://qna.habr.com/q/367617

!!! Готовая библиотека с похожим функционалом.
https://progi.pro/obrabotka-sobitiy-nazhatiya-klavish-f1-f12-s-ispolzovaniem-javascript-i-jquery-kross-brauzer-7261536


ОБХОДЫ:
0) !!! Жать не левый, а правый CTRL и Shift (Все кобы работают). Решение - продублировать в массиве слежение и для правых кнопок.
1) Сделать все команды через верхнее меню браузера
2) Некоторые клавиши работают во время показа алерта (Точно: Ctrl+S и F12)
3) Любая клавиша + F12   откроет инспектор
4) Можно просто отключить JS (Вкладка Source - F8)
5) view-source:САЙТ

Возможные проблемы и недоделки:
0) Спустя время счетчик комбинаций может сломаться и отслеживание перестанет работать. Решение есть, но муторное.
0) Обычный Alt+Tab сломает массив активных нажатых клавиш и отслеживание перестает работать. Решение есть, но очень муторное.
1) В IE5 может не работать
2) На MAC другие сочетания клавиш (CMD иместо Ctrl)
3) Меню ПКМ редачить нельзя, только отключить либо писать с нуля
4) Скрипт грузится внизу боди - до этого все можно копировать и тд (но будет мешать прелоадер, если есть)


*/









/* End */