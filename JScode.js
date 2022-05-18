// JavaScript source code
//////////////////////////////////////////////////////////////////////////////////////////
window.onload=function(){
//Selectors
	const courses=document.getElementById('courses');
	const subNav=document.querySelector('.sub-nav');
	const popup=document.querySelector('.popup');
	const signupButton=document.querySelector('.header-button-link');
	const closePopup=document.getElementById('closePopup');
	const overlay=document.querySelector('.overlay');
	const form=document.getElementById('form');
	const username=document.getElementById('username');
	const pass=document.getElementById('password');
	const recaptcha=document.getElementById('recaptcha-box');
	const menuIcon=document.getElementById('openMenu');
	const closeHamergurMenu=document.getElementById('closeMenu');
	const hamburgerMenu=document.getElementById('nav');
	const globalHeader=document.querySelector('.global-header');
	const container=document.querySelector('.container');
	const mobileItemChildren=document.querySelector('.menu-item-has-children');
	const userIcon=document.querySelector('.fa-user-circle');
	const toggleSearch=document.getElementById('toggleSearch');
	const headerRow=document.querySelector('.header-row');
	const searchRow=document.querySelector('.search-row');
	const topbar=document.querySelector('.topbar');
	const searchInput=document.querySelector('.search-input');
	const featureCourse=document.querySelector('.featured-course');
	const mainPicContainer=document.querySelector('.main-pic-Container');
	const backToTop=document.querySelector('.back-to-top');
	

	//Event listeners
	courses.addEventListener('mouseover',function(){
		subNav.style.display="flex";
	})

	subNav.addEventListener('mouseleave',function(){
		this.style.display='none';
	})
	signupButton.addEventListener('click',showModal)
	closePopup.addEventListener('click',closeModel)
	overlay.addEventListener('click',closeModel)
	form.addEventListener('submit',function(e){
		e.preventDefault();
		checkInputs()
	})
	menuIcon.addEventListener('click',openHamburgerMenu)
	closeHamergurMenu.addEventListener('click',closeHambergerMenu)
	mobileItemChildren.addEventListener('click',toggleDropDownMenuMobile)
	userIcon.addEventListener('click',showModal)
	toggleSearch.addEventListener('click',toggleSearchHandler)
	backToTop.addEventListener('click',goToTop)
	//functions
	function showModal(){
		const span=signupButton.querySelector('span')
		if(span.innerText==='ورود و ثبت نام'){
			popup.classList.add('active');
			overlay.classList.add('active');
			document.body.style.overflow='hidden';
		}		
	}

	function closeModel(){
		popup.classList.remove('active');
		document.body.style.overflow='visible';
		overlay.classList.remove('active');
	}

	function checkInputs(){
		const usernameValue=username.value.trim();
		const passwordValue=password.value.trim();

		if(usernameValue===''){
			setError(username,'نام کاربري بايد حتماً وارد شود');

		}else if(!validateEmail(usernameValue)){
			setError(username,'نام کاربری باید با فرمت صحیح وارد شود')

		}else{
			setSuccessfor(username)
		}

		if(passwordValue===''){
			setError(password,'رمز عبور باید حتماً وارد شود');
		}

		if(passwordValue.length<6){
			setError(password,'رمز عبور باید حداقل 6 کاراکتر باشد');
		}else{
			setSuccessfor(password)
		}
		checkRecaptch()
	}

	function setError(input,message){
		const formControl=input.parentElement;
		const small=formControl.querySelector('small');
		small.innerText=message;
		formControl.className='form-control error';	
		return false;
	}

	function setSuccessfor(input){
		const formControl=input.parentElement;
		const small=formControl.querySelector('small');
		small.style.visibility='visible';
		formControl.className='form-control success';
	}

	function validateEmail(email){
		const re=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email)
	}

	function checkRecaptch(){
		const response=grecaptcha.getResponse()

		if(response.length===0){
			setError(recaptcha,'من ربات نیستم را تیک بزنید')
		}else{
			closeModel();
			const span=signupButton.querySelector('span')
			span.innerText='حساب کاربری'}
	}

	function openHamburgerMenu(){
		hamburgerMenu.classList.add('active');
		const width=window.getComputedStyle(hamburgerMenu).getPropertyValue('width');	
		globalHeader.style.transform=`translate(${width},0)`;
		container.style.transform=`translate(${width},0)`;
		topbar.style.transform=`translate(${width},0)`;
		document.body.style.overflow='hidden';
		closeHamergurMenu.style.display='block';
		this.style.display='none';
	}

	function closeHambergerMenu(){
		hambergerMenu.classList.remove('active');
   
		globalHeader.style.transform = `translate(0,0)`;
		container.style.transform = `translate(0,0)`;
		document.body.style.overflow = 'visible';
		menuIcon.style.display = 'block';
		this.style.display = 'none';
	}

	function toggleDropDownMenuMobile(){
		const iElement=this.querySelector('i');
		if(iElement.className==="fa fa-angle-left"){
			this.querySelector('i').className="fa fa-angle-down";
		}else{
			this.querySelector('i').className="fa fa-angle-left";
		}
		const ulElement=this.querySelector('ul');
		ulElement.classList.toggle('active');
		iElement.setAttribute('style','position:absolute;left:0');
		this.classList.toggle('active');
	}

	function toggleSearchHandler(){
		if(this.className==='fa fa-search'){
			headerRow.classList.add('disabled');
			searchRow.classList.add('active');
			this.className='fa fa-times';
			addSeachRecoginition()
		}else{
			headerRow.classList.remove('disabled');
			searchRow.classList.remove('active');
			this.className='fa fa-search';
		}	
	}

	function addSeachRecoginition(){
		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
		const recognition = new SpeechRecognition();
		recognition.lang = 'fa-IR';
		recognition.interimResults = true;
		recognition.addEventListener('result',e=>{
			//console.log(e.results)
			const transcript = Array.from(e.results)
			.map(result=>result[0])
			.map(result=>result.transcript)
			.join("")
			console.log(transcript)
			if(e.results[0].isFinal){
				searchInput.value = transcript
			}
		})
		recognition.addEventListener('end',recognition.start)
		recognition.start()
	}
	/*animation border for menu item*/
	const menuItems=document.querySelectorAll('.nav-menu li')
	const span=document.createElement('span');
	span.classList.add('highlight');
	document.body.appendChild(span);

	menuItems.forEach((item)=>{
		item.addEventListener('mouseenter',highlight)
	})

	function highlight(){
		const itemCoordinates=this.getBoundingClientRect();
		const {left,width,bottom}=itemCoordinates;
		span.style.width=`${width}px`;
		span.style.transform=`translate(${left}px,${bottom}px)`;
	}

	function goToTop(){
		window.scrollTo({top:0,behavior:`smooth`})
	}

	/*animation border for menu item*/

	/*sticky nav*/
		window.addEventListener('scroll',function(){
			if(window.scrollY>=globalHeader.offsetHeight){
				globalHeader.style.position='fixed'
			}else{
				globalHeader.style.position='relative'
			}
			const opacity=window.getComputedStyle(featureCourse).getPropertyValue('opacity')
			//console.log(window.scrollY,featureCourse.scrollHeight)
			if(window.scrollY>featureCourse.scrollHeight/2){
				if (opacity<1){
					//console.log('test')
					featureCourse.classList.add('active')
				}				
			}
			const opacitybacktotop=window.getComputedStyle(backToTop).getPropertyValue('opacity')
			if(window.scrollY>100){
				if(opacitybacktotop<1){
					backToTop.classList.add('active');
				}				
			}else{
				backToTop.classList.remove('active');
			}			
			
		})
	/*sticky nav*/

	/*countdown*/
		const daysElement=document.getElementById('days');
		const hoursElement=document.getElementById('hours');
		const minutesElement=document.getElementById('minutes');
		const secondsElement=document.getElementById('seconds');
		const publishDate='1 Oct 2022';
		function countDown(){
			
			const newPublishDate=new Date(publishDate);
			const currentDate=new Date();
			const totalSeconds=Math.floor((newPublishDate-currentDate)/1000);
			const days=Math.floor(totalSeconds/3600/24);
			const hours=Math.floor((totalSeconds/3600)%24);
			const minutes=Math.floor((totalSeconds/60)%60);
			const seconds=Math.floor(totalSeconds%60);

			daysElement.innerText=days;
			hoursElement.innerText=hours;
			minutesElement.innerText=minutes;
			secondsElement.innerText=seconds;
		}
		countDown()
		setInterval(countDown,1000)
	/*countdown*/

	/*shopping cart*/
	const shoppingCartIcon=document.querySelector('.fa-shopping-bag');
	const shoppingCartBox=document.querySelector('.shopping-cart-box');

	shoppingCartIcon.addEventListener('click',toggleShoppingCartBox);

	function toggleShoppingCartBox(){
		shoppingCartBox.classList.toggle('active');
	}

	const cousesPrice=shoppingCartBox.querySelectorAll('.item-price');

	let sum=0;
	cousesPrice.forEach(course=>{
		sum+=Number(course.innerText.match(/\d+/))
	
	})
	const totalShoppingCart=shoppingCartBox.querySelector('.shopping-cart-total');
	totalShoppingCart.innerText=`${sum} تومان`
	/*shopping cart*/
}