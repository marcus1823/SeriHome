// Scroll Animation container
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-content');
    const container = document.querySelector('.container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                container.classList.add('animate-background');
            } else {
                entry.target.classList.remove('animate');
                container.classList.remove('animate-background');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

// // Scroll Animation section
// document.addEventListener("DOMContentLoaded", function() {
//     // Function to handle the intersection of elements
//     function handleIntersection(entries, observer) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const target = entry.target;
//                 // Ensure animation class is added each time the element comes into view
//                 target.classList.add('visible');

//                 // Reset animation by removing and re-adding the class
//                 // to make sure it plays every time
//                 target.classList.remove('animate');
//                 void target.offsetWidth; // Trigger reflow to restart animation
//                 target.classList.add('animate');
//             }
//         });
//     }

//     // Options for Intersection Observer
//     const options = {
//         root: null, // Use the viewport as the root
//         rootMargin: '0px',
//         threshold: 0.1 // Trigger when 10% of the element is visible
//     };

//     // Create the Intersection Observer
//     const observer = new IntersectionObserver(handleIntersection, options);

//     // Target all sections with the class 'section-content'
//     const sections = document.querySelectorAll('.section-content');
//     sections.forEach(section => observer.observe(section));
// });



//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// button
 function goToHashTag(idHashTag) {
    document.getElementById(idHashTag).scrollIntoView({ behavior: 'smooth' });
};

// href

document.addEventListener('DOMContentLoaded', function () {
    const scrollLinks = document.querySelectorAll('.scroll-link');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default anchor click behavior
            const targetId = this.getAttribute('href').substring(1); // Get the target ID from href
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    const options = { 
        timeZone: 'Asia/Ho_Chi_Minh', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedDateTime = formatter.format(now).replace(/,/, '').replace(/[/]/g, '-').replace(/ /g, 'T');
    document.getElementById("submissionDateTime").value = formattedDateTime;
});

document.getElementById("infoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let isValid = true;

    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMessage => errorMessage.style.display = 'none');

    // Validate Full Name
    const fullName = document.getElementById("fullName").value.trim();
    if (fullName === "") {
        document.getElementById("fullNameError").innerText = "Họ và Tên không được để trống";
        document.getElementById("fullNameError").style.display = "block";
        isValid = false;
    }

    // Validate Phone Number
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
        document.getElementById("phoneNumberError").innerText = "Số Điện Thoại phải là 10-11 số";
        document.getElementById("phoneNumberError").style.display = "block";
        isValid = false;
    }

    // Validate Gender
    const genderType = document.getElementById("genderType").value;
    if (genderType === "") {
        document.getElementById("genderTypeError").innerText = "Vui lòng chọn giới tính";
        document.getElementById("genderTypeError").style.display = "block";
        isValid = false;
    }

    // Validate Date of Birth
    const dob = document.getElementById("dob").value;
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    if (dob === "") {
        document.getElementById("dobError").innerText = "Ngày Tháng Năm Sinh không được để trống";
        document.getElementById("dobError").style.display = "block";
        isValid = false;
    } else if (selectedDate >= currentDate) {
        document.getElementById("dobError").innerText = "Ngày Tháng Năm Sinh phải là ngày trong quá khứ";
        document.getElementById("dobError").style.display = "block";
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Email không hợp lệ";
        document.getElementById("emailError").style.display = "block";
        isValid = false;
    }

    // Validate Service Type
    const serviceType = document.getElementById("serviceType").value;
    if (serviceType === "") {
        document.getElementById("serviceTypeError").innerText = "Vui lòng chọn loại dịch vụ";
        document.getElementById("serviceTypeError").style.display = "block";
        isValid = false;
    }

    // Validate Content
    const content = document.getElementById("content").value.trim();
    if (content === "") {
        document.getElementById("contentError").innerText = "Nội Dung không được để trống";
        document.getElementById("contentError").style.display = "block";
        isValid = false;
    }

    // If the form is valid, submit data to Google Sheets
    if (isValid) {
        // Disable submit button and show loading spinner
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang gửi...';

        const formData = new FormData(document.forms['submit-to-google-sheet']);
        fetch('https://script.google.com/macros/s/AKfycbxwbgi7kn5AOf_O6ozVVr4tTw8NpF88TNovMXAxxBIz-el1fW48B3WDsuT0vou_DXrW/exec', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                alert("Form submitted successfully!");
            } else {
                alert("There was an error submitting the form.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            // Re-enable submit button and reset text
            submitButton.disabled = false;
            submitButton.innerHTML = 'Gửi';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function initCarousel(carouselSelector) {
        const carousel = document.querySelector(carouselSelector);
        const carouselInner = carousel.querySelector('.carousel-inner');
        const items = carouselInner.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        
        // Clone items for a truly infinite loop
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carouselInner.appendChild(clone);
        });

        let currentIndex = 0;
        const itemWidth = items[0].offsetWidth;
        const transitionDuration = 500; // ms
        const pauseDuration = 2000; // ms
        const fadeDuration = 300; // ms

        // Set initial position
        carouselInner.style.transform = `translateX(0)`;

        function slideNext() {
            currentIndex++;
            carouselInner.style.transition = `transform ${transitionDuration}ms linear`;
            carouselInner.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

            // If we've reached the cloned set
            if (currentIndex >= totalItems) {
                // Start fading out
                setTimeout(() => {
                    carouselInner.style.transition = `opacity ${fadeDuration}ms ease`;
                    carouselInner.style.opacity = '0';
                }, transitionDuration - fadeDuration);

                // After the transition and fade out are complete, reset and fade in
                setTimeout(() => {
                    carouselInner.style.transition = 'none';
                    currentIndex = 0;
                    carouselInner.style.transform = `translateX(0)`;
                    
                    // Force a reflow before fading in
                    carouselInner.offsetHeight;

                    carouselInner.style.transition = `opacity ${fadeDuration}ms ease`;
                    carouselInner.style.opacity = '1';
                }, transitionDuration);
            }
        }

        function startCarousel() {
            setInterval(slideNext, pauseDuration);
        }

        startCarousel();
    }

    // Initialize both carousels
    initCarousel('.daily-carousel');
    initCarousel('.partner-logo-carousel');
});