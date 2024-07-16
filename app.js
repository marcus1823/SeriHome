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

// Form validation
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
        });
    }
});