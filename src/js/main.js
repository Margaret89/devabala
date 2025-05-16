//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

//Открыть меню
if(document.querySelector('.js-main-menu-open')){
	document.querySelector('.js-main-menu-open').addEventListener("click", function(e){
		document.querySelector('.js-main-menu-wrap-popup').classList.add('active');
	});
}

//Закрыть меню
if(document.querySelector('.js-main-menu-close')){
	document.querySelector('.js-main-menu-close').addEventListener("click", function(e){
		document.querySelector('.js-main-menu-wrap-popup').classList.remove('active');
	});
}

// Верхний слайдер
if(document.querySelector('.js-top-slider')){
	const topSlider = new Swiper('.js-top-slider',
	{
		modules: [Pagination],
		loop:true,
		pagination:{
			el:".js-top-slider-pagination",
			clickable:true
		},
	});
}

// Слайдер категорий
if(document.querySelector('.js-slider-sect-img')){
	document.querySelectorAll('.js-slider-sect-img').forEach(function(sliderSect){
		const numSlider = sliderSect.getAttribute('data-pager');

		const sliderSectImg = new Swiper(sliderSect,
			{
				modules: [Pagination],
				loop:true,
				pagination:{
					el:".js-slider-sect-img-pagination-"+numSlider,
					clickable:true
				},
			});
	});
}

//Изменяем ширину секции при наведении
if(document.querySelector('.js-slider-sect-item')){
	document.querySelectorAll('.js-slider-sect-item').forEach(function(section){
		section.addEventListener('mouseover', () =>{
			hoverSect(section)
		});
	});

	function hoverSect(elem) {
		document.querySelectorAll('.js-slider-sect-item').forEach(function(item){
			item.classList.remove('active');
		});

		elem.classList.add('active');
	}
}

// Раскрывающийся блок фильтра
if(document.querySelector('.js-filter-item')){
	document.querySelectorAll('.js-filter-item').forEach((accSection) => {
		const accHeader = accSection.querySelector('.js-filter-head');
		const accBody = accSection.querySelector('.js-filter-content');
		const accContent = accSection.querySelector('.js-filter-info');
		
		accHeader.addEventListener('click', () => {
			accSection.classList.toggle("opened");
			
			if ( accSection.classList.contains("opened") ) {
				accBody.style.maxHeight = `${accContent.clientHeight}px`;
			} else {
				accBody.style.maxHeight = "0px";
			}
		})
	});
}

// Открыть фильтр
if(document.querySelector('.js-filter-open')){
	document.querySelector('.js-filter-open').addEventListener("click", function(e){
		document.querySelector('.js-filter').classList.add('active');
	});
}

// Закрыть фильтр
if(document.querySelector('.js-filter-close')){
	document.querySelector('.js-filter-close').addEventListener("click", function(e){
		document.querySelector('.js-filter').classList.remove('active');
	});
}

