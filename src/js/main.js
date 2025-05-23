//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//Fancybox
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
Fancybox.bind("[data-fancybox]", {
	on: {
		done: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.remove('hide');
			}
		},
		close: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.add('hide');
			}
		}
	}
});

//Inputmask
import Inputmask from "inputmask";

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
		document.querySelector('.js-header').classList.add('open-menu');
	});
}

//Закрыть меню
if(document.querySelector('.js-main-menu-close')){
	document.querySelector('.js-main-menu-close').addEventListener("click", function(e){
		document.querySelector('.js-main-menu-wrap-popup').classList.remove('active');
		document.querySelector('.js-header').classList.remove('open-menu');
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

// Слайдер коллекций
if(document.querySelector('.js-slider-collection')){
	const sliderCollection = new Swiper('.js-slider-collection',
	{
		modules: [Pagination],
		slidesPerView: 1.2,
		spaceBetween: 24,
		pagination:{
			el:".js-slider-collection-pagination",
			clickable:true
		},
	});
}

// Слайдер товаров
if(document.querySelector('.js-catalog-slider')){
	const sliderCollection = new Swiper('.js-catalog-slider',
	{
		modules: [Pagination],
		slidesPerView: 1.2,
		spaceBetween: 24,
		pagination:{
			el:".js-catalog-slider-pagination",
			clickable:true
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
				spaceBetween: 20,
			}
		}
	});
}

// Слайдер категорий
const screenWidth = window.screen.width;

if(document.querySelector('.js-slider-sect-img')){
	if(screenWidth < 768){
		const sliderSect = new Swiper('.js-slider-sect',
		{
			slidesPerView: 1,
			modules: [Navigation],
			navigation: {
				nextEl: ".js-slider-sect-next",
				prevEl: ".js-slider-sect-prev",
			},
		});
	}
	
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

//Слайдер детального изображения каталога
var prodDetailSliderThumb = new Swiper('.js-prod-detail-thumb-slider', {
	modules: [Navigation],
	slidesPerView: 2,
	spaceBetween: 5,
	freeMode: true,
	watchSlidesProgress: true,
	direction: "vertical",
	navigation: {
		nextEl: ".js-prod-detail-thumb-slider-next",
		prevEl: ".js-prod-detail-thumb-slider-prev",
	},
	breakpoints: {
		992: {
			slidesPerView: 4,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 10,
		}
	}
	// loop: true,
});
var prodDetailSlider = new Swiper('.js-prod-detail-slider', {
	modules: [Thumbs, Pagination],
	spaceBetween: 20,
	// direction: "vertical",
	// loop: true,
	thumbs: {
		swiper: prodDetailSliderThumb,
	},
	pagination:{
		el:".js-prod-detail-slider-pagination",
		clickable:true
	},
	// breakpoints: {
	// 	// 768: {
	// 	// 	direction: "horizontal",
	// 	// }
	// }
});

// Раскрывающийся блок
document.querySelectorAll('.js-unwrap-block').forEach((accSection) => {
	const accHeader = accSection.querySelector('.js-unwrap-head ');
	const accBody = accSection.querySelector('.js-unwrap-content');
	const accContent = accSection.querySelector('.js-unwrap-info');
	
	accHeader.addEventListener('click', () => {
		accSection.classList.toggle("opened");
		
		if ( accSection.classList.contains("opened") ) {
			accBody.style.maxHeight = `${accContent.clientHeight}px`;
		} else {
			accBody.style.maxHeight = "0px";
		}
	})
});

// Маска для телефона
document.addEventListener("DOMContentLoaded", function(){
	if(document.querySelector('.js-phone')){
		Inputmask('+7 (999) 999-9999').mask('.js-phone');
	}
});

// Слайдер банковских карточек
if(document.querySelector('.js-cards-slider')){
	const topSlider = new Swiper('.js-cards-slider',
	{
		modules: [Pagination],
		loop:true,
		pagination:{
			el:".js-cards-slider-pagination",
			clickable:true
		},
	});
}

// Вызов сообщения об успешном заказе
if(document.querySelector('.js-success-order.active')){
	Fancybox.show([{ src: "#success-order", type: "inline" }])
}

// Переключение мобильного меню
if(document.querySelector('.js-main-menu-choose-item')){
	document.querySelectorAll('.js-main-menu-choose-item').forEach((itemMenu) => {
		itemMenu.addEventListener('click', () => {
			let idMenu = itemMenu.getAttribute('data-id');
			console.log('idMenu = ', idMenu);

			showSectMenu(idMenu);
		})

		function showSectMenu(id) {
			document.querySelectorAll('.js-main-menu-choose-item').forEach(function(item){
				item.classList.remove('active');
			});
	
			document.querySelectorAll('.js-main-menu-wrap-sect').forEach(function(item){
				item.classList.remove('active');
			});

			document.querySelector('.js-main-menu-choose-item[data-id="'+id+'"]').classList.add('active');
			document.querySelector('.js-main-menu-wrap-sect[data-id="'+id+'"]').classList.add('active');
		}
	});
}

//Открыть информацию о товаре
if(document.querySelector('.js-info-material-btn')){
	document.querySelector('.js-info-material-btn').addEventListener("click", function(e){
		document.querySelector('.js-info-material').classList.toggle('active');
	});
}