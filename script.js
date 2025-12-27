/**
 * کلینیک زیبایی رها - اسکریپت اصلی
 * نویسنده: تیم توسعه کلینیک رها
 * تاریخ: ۱۴۰۲
 */

// منتظر بارگذاری کامل صفحه
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ کلینیک زیبایی رها - اسکریپت فعال شد ✨');
    
    // ========== مدیریت منوی موبایل ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // تابع باز/بستن منوی موبایل
    function toggleMobileMenu() {
        if (mainNav) {
            const navList = mainNav.querySelector('ul');
            navList.classList.toggle('active');
            
            // تغییر آیکون منو
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // جلوگیری از اسکرول بدن هنگام باز بودن منو
            document.body.classList.toggle('menu-open');
        }
    }
    
    // بستن منو هنگام کلیک روی لینک
    function closeMobileMenu() {
        if (mainNav) {
            const navList = mainNav.querySelector('ul');
            navList.classList.remove('active');
            
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            document.body.classList.remove('menu-open');
        }
    }
    
    // اضافه کردن رویداد به دکمه منو
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // بستن منو هنگام کلیک روی لینک‌ها
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // برای لینک‌های داخلی، بستن منو بعد از کلیک
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // بستن منوی موبایل
                    closeMobileMenu();
                    
                    // اسکرول نرم به بخش مورد نظر
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            } else {
                closeMobileMenu();
            }
        });
    });
    
    // ========== مدیریت فرم رزرو ==========
    const reservationForm = document.getElementById('reservationForm');
    const formMessage = document.getElementById('formMessage');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع‌آوری داده‌های فرم
            const formData = {
                name: document.getElementById('name').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim()
            };
            
            // اعتبارسنجی فرم
            if (validateForm(formData)) {
                // نمایش وضعیت در حال ارسال
                showFormMessage('در حال ارسال اطلاعات...', 'info');
                
                // شبیه‌سازی ارسال به سرور
                simulateFormSubmission(formData);
            }
        });
    }
    
    // تابع اعتبارسنجی فرم
    function validateForm(data) {
        // پاک کردن پیام‌های قبلی
        clearFormErrors();
        
        let isValid = true;
        const errors = [];
        
        // اعتبارسنجی نام
        if (!data.name) {
            errors.push('نام و نام خانوادگی را وارد کنید');
            isValid = false;
        } else if (data.name.length < 3) {
            errors.push('نام باید حداقل ۳ حرف داشته باشد');
            isValid = false;
        }
        
        // اعتبارسنجی شماره تلفن
        if (!data.phone) {
            errors.push('شماره تماس را وارد کنید');
            isValid = false;
        } else if (!/^[\d\s\-+()]{10,}$/.test(data.phone)) {
            errors.push('شماره تماس معتبر نیست');
            isValid = false;
        }
        
        // اعتبارسنجی خدمت
        if (!data.service) {
            errors.push('نوع خدمت را انتخاب کنید');
            isValid = false;
        }
        
        // نمایش خطاها
        if (errors.length > 0) {
            showFormMessage(errors.join('<br>'), 'error');
        }
        
        return isValid;
    }
    
    // تابع پاک کردن خطاها
    function clearFormErrors() {
        if (formMessage) {
            formMessage.style.display = 'none';
        }
    }
    
    // تابع نمایش پیام فرم
    function showFormMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.innerHTML = message;
        formMessage.className = 'form-message';
        formMessage.classList.add(type);
        formMessage.style.display = 'block';
        
        // پنهان کردن پیام بعد از ۵ ثانیه
        if (type !== 'info') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // شبیه‌سازی ارسال فرم
    function simulateFormSubmission(formData) {
        setTimeout(() => {
            // در حالت واقعی، اینجا درخواست AJAX به سرور ارسال می‌شود
            console.log('📤 ارسال فرم:', formData);
            
            // پیام موفقیت
            showFormMessage(
                '✅ درخواست رزرو شما با موفقیت ثبت شد.<br>همکاران ما طی ۲۴ ساعت آینده با شما تماس خواهند گرفت.',
                'success'
            );
            
            // ریست کردن فرم
            reservationForm.reset();
            
            // ارسال داده به کنسول (برای تست)
            console.log('📋 اطلاعات فرم:');
            console.log('- نام: ' + formData.name);
            console.log('- تلفن: ' + formData.phone);
            console.log('- خدمت: ' + formData.service);
            if (formData.message) {
                console.log('- پیام: ' + formData.message);
            }
            
        }, 1500);
    }
    
    // ========== انیمیشن اسکرول ==========
    // هایلایت لینک فعال در ناوبری
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // انیمیشن عناصر هنگام اسکرول
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .luxury-item, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    // ========== دکمه بازگشت به بالا ==========
    // ایجاد دکمه بازگشت به بالا
    function createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'بازگشت به بالا');
        document.body.appendChild(backToTopBtn);
        
        // نمایش/مخفی کردن دکمه
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // رویداد کلیک
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        return backToTopBtn;
    }
    
    // ========== ساعت و تاریخ فارسی ==========
    function updatePersianDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        // در صورت نیاز می‌توان ساعت را در جای خاصی نمایش داد
        console.log('🕒 زمان فعلی: ' + now.toLocaleDateString('fa-IR', options));
    }
    
    // ========== پیش‌بارگذاری تصاویر ==========
    function preloadImages() {
        const images = [
            'https://images.unsplash.com/photo-1556228578-9c360e1d8d34',
            'https://images.unsplash.com/photo-1596462502278-27bfdc403348'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => console.log(`✅ تصویر ${src} بارگذاری شد`);
            img.onerror = () => console.warn(`⚠️ خطا در بارگذاری تصویر ${src}`);
        });
    }
    
    // ========== شمارنده آمار (در صورت وجود) ==========
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            // شروع شمارش هنگام اسکرول
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
            
            observer.observe(counter);
        });
    }
    
    // ========== مدیریت اسکرول نرم ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========== نمایش نوتیفیکیشن خوش‌آمدگویی ==========
    function showWelcomeNotification() {
        // بررسی اینکه آیا کاربر قبلاً دیده
        if (!localStorage.getItem('welcomeShown')) {
            setTimeout(() => {
                console.log('🌸 به کلینیک زیبایی رها خوش آمدید! 🌸');
                console.log('✨ زیبایی شما، تخصص ماست ✨');
                
                // می‌توانید نوتیفیکیشن واقعی هم نمایش دهید
                // showFormMessage('به کلینیک زیبایی رها خوش آمدید!', 'info');
                
                localStorage.setItem('welcomeShown', 'true');
            }, 1000);
        }
    }
    
    // ========== مقداردهی اولیه ==========
    function init() {
        // ایجاد دکمه بازگشت به بالا
        createBackToTopButton();
        
        // مقداردهی اولیه انیمیشن‌ها
        animateOnScroll();
        
        // برجسته کردن ناوبری فعال
        highlightActiveNav();
        
        // راه‌اندازی اسکرول نرم
        initSmoothScroll();
        
        // پیش‌بارگذاری تصاویر
        preloadImages();
        
        // راه‌اندازی شمارنده‌ها
        initCounters();
        
        // نمایش نوتیفیکیشن خوش‌آمدگویی
        showWelcomeNotification();
        
        // به‌روزرسانی تاریخ و ساعت
        updatePersianDateTime();
        
        // تنظیم فوکوس اولیه روی فرم
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.focus();
        }
    }
    
    // ========== رویدادهای صفحه ==========
    // اسکرول
    window.addEventListener('scroll', function() {
        highlightActiveNav();
        animateOnScroll();
    });
    
    // تغییر اندازه پنجره
    window.addEventListener('resize', function() {
        // بستن منوی موبایل در حالت دسکتاپ
        if (window.innerWidth > 768 && mainNav) {
            const navList = mainNav.querySelector('ul');
            if (navList.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    // کلیک خارج از منو برای بستن آن
    document.addEventListener('click', function(e) {
        if (mainNav && mobileMenuBtn) {
            const navList = mainNav.querySelector('ul');
            const isClickInsideMenu = mainNav.contains(e.target);
            const isClickOnMenuButton = mobileMenuBtn.contains(e.target);
            
            if (navList.classList.contains('active') && 
                !isClickInsideMenu && 
                !isClickOnMenuButton) {
                closeMobileMenu();
            }
        }
    });
    
    // راه‌اندازی کلی اسکریپت
    init();
    
    // لاگ نهایی
    console.log('🚀 اسکریپت کلینیک زیبایی رها با موفقیت راه‌اندازی شد!');
    console.log('📞 برای پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸');
    console.log('👑 زیبایی شما، تخصص ماست 👑');
});

// ========== توابع کمکی ==========
/**
 * قالب‌بندی شماره تلفن فارسی
 */
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
}

/**
 * تبدیل تاریخ به شمسی
 */
function toPersianDate(date) {
    const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    
    const d = new Date(date);
    const day = d.getDate();
    const month = persianMonths[d.getMonth()];
    const year = d.getFullYear();
    
    return `${day} ${month} ${year}`;
}

/**
 * بررسی اینکه آیا کاربر از موبایل استفاده می‌کند
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * کپی متن به کلیپ‌بورد
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
        () => console.log('✅ متن کپی شد: ' + text),
        (err) => console.error('❌ خطا در کپی: ', err)
    );
}

// ========== اضافه کردن استایل‌های داینامیک ==========
const dynamicStyles = `
    /* حالت منوی باز */
    body.menu-open {
        overflow: hidden;
    }
    
    /* دکمه بازگشت به بالا */
    .back-to-top {
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #D4AF37, #B8860B);
        color: white;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
        background: linear-gradient(135deg, #B8860B, #D4AF37);
    }
    
    /* انیمیشن برای عناصر */
    .service-card.animated,
    .feature-card.animated,
    .luxury-item.animated,
    .contact-item.animated {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* استایل برای فرم در حالت موبایل */
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            left: 20px;
            width: 45px;
            height: 45px;
            font-size: 1rem;
        }
    }
`;

// اضافه کردن استایل‌های داینامیک به صفحه
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);