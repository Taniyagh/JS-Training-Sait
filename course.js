// JavaScript source code

//const { createWriteStream } = require("fs");

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
        const backToTop=document.querySelector('.back-to-top');
        const courseDetailInfoContainer=document.querySelector('.course-detil-info-container');
    
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

        function goToTop(){
            window.scrollTo({top:0,behavior:`smooth`})
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
    
        /*animation border for menu item*/
    
        /*sticky nav*/
        const courseInfo=document.querySelector('.course-info');
        const courseContent=document.querySelector('.course-content');
        const studyMode=document.querySelector('.study-mode');
        const courseDetailInfo=document.querySelector('.course-detail-info');
        
        //courseDetailInfoContainer


            window.addEventListener('scroll',function(){
                
                if(window.scrollY>=globalHeader.offsetHeight){
                    globalHeader.style.position='fixed';
                }else{
                    globalHeader.style.position='relative';
                }

                //back-to-top
                const opacitybacktotop=window.getComputedStyle(backToTop).getPropertyValue('opacity')
                if(window.scrollY>100){
                    if(opacitybacktotop<1){
                        backToTop.classList.add('active');
                    }				
                }else{
                    backToTop.classList.remove('active');
                }			
                
                //console.log(window.scrollY, courseContent.offsetTop+80,courseInfo.offsetHeight)

                if(window.scrollY>courseContent.offsetTop+80 && window.scrollY+20<courseInfo.offsetHeight){
                    studyMode.style.position="fixed";
                    studyMode.style.right='100px';
                    studyMode.style.top=`${studyMode.offsetHeight/4}px`
                }else if(window.scrollY<courseContent.offsetTop+80){
                    studyMode.style.position='absolute';
                    studyMode.style.right='-54px';
                    studyMode.style.top='0';
                }else if(window.scrollY+20>courseInfo.offsetHeight){
                    studyMode.style.position='absolute';
                    studyMode.style.right='-54px';
                    studyMode.style.top=`${courseContent.offsetHeight-40}px`;
                }
                
                /*if(window.scrollY>courseDetailInfo.parentElement.offsetTop && window.scrollY<courseContent.offsetHeight+50){
                    courseDetailInfo.style.position='fixed';
                    console.log('yes')
                    //courseDetailInfo.style.left='50px';
                    courseDetailInfo.style.top='0';
                    //courseDetailInfo.parentElement.classList.add('fixed')
                }*/

                if(scrollY+40>courseDetailInfoContainer.parentElement.offsetTop && window.scrollY<courseContent.offsetHeight+70){
                    courseDetailInfoContainer.style.position='fixed';
                    courseDetailInfoContainer.style.left='20px';
                    courseDetailInfoContainer.style.top='0px';
                    courseDetailInfoContainer.parentElement.classList.add('fixed');
                    
                }else if (window.scrollY>=courseContent.offsetHeight+70){
                    courseDetailInfoContainer.style.position='relative';
                    courseDetailInfoContainer.parentElement.classList.remove('fixed');
                    courseDetailInfoContainer.style.top=`${courseInfo.offsetHeight-courseDetailInfoContainer.offsetHeight}px`;
                    courseDetailInfoContainer.style.left='20px';
                }else{
                    courseDetailInfoContainer.style.position='relative';
                    courseDetailInfoContainer.parentElement.classList.remove('fixed');
                    courseDetailInfoContainer.style.left='20px';
                }
            })
        /*sticky nav*/
    
        /*shopping cart*/
        const shoppingCartIcon=document.querySelector('.fa-shopping-bag');
        const shoppingCartBox=document.querySelector('.shopping-cart-box');
        
        const shoppingCartItems=document.querySelector('.shopping-cart-items');
        shoppingCartIcon.addEventListener('click',toggleShoppingCartBox);
    
        function toggleShoppingCartBox(){
            shoppingCartBox.classList.toggle('active');
        }
    
        //calculating sum of items in shopping cart
        function calculateSumShoppingCartItems(){
            const cousesPrice=shoppingCartBox.querySelectorAll('.item-price');
            const reactappCartNumber=topbar.querySelector('.reactapp-cart-number');
            const topBarCartNumber=topbar.querySelector('.topbar-items-mobile .reactapp-cart-number');
            const navCartNumber=hamburgerMenu.querySelector('.studiare-cart-number');
            reactappCartNumber.innerText=cousesPrice.length;
            topBarCartNumber.innerText=cousesPrice.length;
            navCartNumber.innerText=cousesPrice.length;
    
            let sum=0;
            cousesPrice.forEach(course=>{
                sum+=Number(course.innerText.match(/\d+/))
        
            })
            const totalShoppingCart=shoppingCartBox.querySelector('.shopping-cart-total');
            totalShoppingCart.innerText=`${sum} تومان`
        }
        calculateSumShoppingCartItems()
    
        
    
        //delete shopping cart item
        shoppingCartItems.addEventListener('click',deleteCartItem)
    
        function deleteCartItem(e){
            const Item=e.target;
            if(Item.className==='fas fa-times'){
                const Selectedcourse=Item.parentElement;
                Selectedcourse.remove();
                calculateSumShoppingCartItems()
            }
        }
    
        //Add item to shopping cart
        const products=document.querySelectorAll('.featured-course-container .add-to-cart')
        
    
        products.forEach((item)=>{
            item.addEventListener('click',addToBasket)
        })
        
        function addToBasket(e){
            e.preventDefault();
            const course=e.target.parentElement.parentElement.parentElement
            const imageCourse=course.querySelector('.thumnail-course-holder img').src;
            const courseTitle = course.querySelector('.course-title a').innerText;
            let coursePrice=course.querySelector('.amount').innerText;
            console.log(imageCourse,courseTitle,coursePrice)
            if(coursePrice==='رایگان'){
                coursePrice=0;
            }else{
                coursePrice=Number(coursePrice);
            }
            createItem(imageCourse,courseTitle,coursePrice)	
        }
    
        function createItem(imageCourse,courseTitle,coursePrice){
            const cartItemElement=document.createElement('div');
            cartItemElement.className='shopping-cart-item';
            cartItemElement.innerHTML=`<i class='fas fa-times'> </i>
            <img src='${imageCourse}' alt='${courseTitle}'/>
            <div class='cart-item-content'>
                <span class='item-name'>${courseTitle}</span>
                <span class='item-price'>${coursePrice}</span>
            </div> `
            shoppingCartItems.appendChild(cartItemElement)
            calculateSumShoppingCartItems()
    
        }
        /*shopping cart*/
        
        /* magnify */

        //IIFE
        const magnify=(function(){
            const picCourse=document.querySelector('.course-info .pic-course');
            const imgCourse=picCourse.querySelector('img');
            const Glass=document.createElement('div');
            const glassDimension=150;

            let IsVisible=false;
            Glass.classList.add('glass');
            Glass.style.width=`${glassDimension}px`;
            Glass.style.height=`${glassDimension}px`;
            Glass.style.backgroundImage=`url(${imgCourse.src})`;

            picCourse.append(Glass);

            imgCourse.addEventListener('mouseover',function(){
                Glass.style.display='block';
                IsVisible=true;
                //console.log('true')

            })

            imgCourse.addEventListener('mouseout',function(){
                Glass.style.display='none';
                IsVisible=false;
                //console.log('false')
            })

            picCourse.addEventListener('mousemove',function(event){
                if(IsVisible){
                    const mouseX=event.clientX;
                    const mouseY=event.clientY;
                    const ImgCoordinates=imgCourse.getBoundingClientRect();
                    const {left,top}=ImgCoordinates;
                    const bgX=100*(mouseX-left)/imgCourse.offsetWidth;
                    const bgY=100*(mouseY-top)/imgCourse.offsetHeight;

                    Glass.style.top=`${mouseY-top-glassDimension/2}px`;
                    Glass.style.left=`${mouseX-left-glassDimension/2}px`;
                    Glass.style.backgroundPosition=`${bgX}% ${bgY}%`;

                }
            })

        })()

        /* magnify */
        /* Study-mode */
            const studyModebtn=document.querySelector('.study-mode-btn');
            
            let isActive=false;
            studyModebtn.addEventListener('click',function(){
                isActive=!isActive;
                if(isActive){
                    courseInfo.style.width='80%';
                    courseDetailInfoContainer.style.display='none'
                }else{
                    courseInfo.style.width='60%';
                    courseDetailInfoContainer.style.display='block'
                }
                
            })



        /* Study-mode */

        /*accordian*/
            const accordiansIcon=document.querySelectorAll('.course-section .fa-chevron-down')
            accordiansIcon.forEach(item=>item.addEventListener('click',accordianToggle))

            function accordianToggle(event){
                const icn=event.target;
                const courseSection=icn.parentElement.parentElement;
                const panelGroup=courseSection.querySelector('.panel-group');
                const height=window.getComputedStyle(panelGroup).getPropertyValue('height');

                if(height==='0px'){
                    panelGroup.style.height='auto';
                    panelGroup.style.transform='scaleY(1)'
                    icn.style.transform='rotate(180deg)'
                }else{
                    panelGroup.style.height='0';
                    panelGroup.style.transform='scaleY(0)'
                    icn.style.transform='rotate(360deg)'
                }
            }
            console.log(accordiansIcon)
        /*accordian*/
        
}
    