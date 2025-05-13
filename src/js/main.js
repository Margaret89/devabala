// Лоадер
const body = document.querySelector('.js-body');
if(document.querySelector('.js-loader')){
	const loader = document.querySelector('.js-loader'); //Весь экран лоадера
	const loaderLineBegin = document.querySelector('.js-progress-line-color-begin'); //Начальная линия лоадера
	const loaderLineLast = document.querySelector('.js-progress-line-color-last'); //Конечная линия лоадера

	window.addEventListener('load', () => {
		//Считаем время загрузки страницы
		var loadTime = (window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart) / 1000;
		// console.log('Page load time is '+ loadTime);

		//Если меньше 5 сек, то приводим анимации в конечную позицию и скрываем лоадер
		if(loadTime < 5){
			loaderLineBegin.style.animationPlayState = 'running';
			loaderLineBegin.style.animationDuration = '0s';

			loaderLineLast.style.opacity = 1;

			setTimeout(function(){
				hideLoader();
			},1000);
		}else{
			//Иначе запускаем анимацию второй линии и позже скрываем лоадер
			loaderLineLast.classList.add('active');

			setTimeout(function(){
				hideLoader();
			},1200);
		}

		function hideLoader() {
			loader.classList.add('hide');
			body.classList.remove('no-scroll');
		}
	});
}