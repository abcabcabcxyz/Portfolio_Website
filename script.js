document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark Mode Logic ---
    const htmlClass = document.documentElement.classList;
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeToggleBtnMobile = document.getElementById('themeToggleMobile');
    
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlClass.add('dark');
    } else {
        htmlClass.remove('dark');
    }

    const toggleTheme = () => {
        if (htmlClass.contains('dark')) {
            htmlClass.remove('dark');
            localStorage.theme = 'light';
        } else {
            htmlClass.add('dark');
            localStorage.theme = 'dark';
        }
    };

    themeToggleBtn.addEventListener('click', toggleTheme);
    themeToggleBtnMobile.addEventListener('click', toggleTheme);

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Initial setup with GSAP for mobile menu
    gsap.set(mobileMenu, { display: "none", opacity: 0, scaleY: 0 });

    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            gsap.to(mobileMenu, { duration: 0.3, display: "block", opacity: 1, scaleY: 1, ease: "power2.out" });
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-3xl"></i>';
        } else {
            gsap.to(mobileMenu, { duration: 0.2, opacity: 0, scaleY: 0, display: "none", ease: "power2.in" });
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-3xl"></i>';
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // --- Typewriter Effect ---
    const words = ["web applications.", "interfaces.", "digital experiences."];
    let i = 0;
    let timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typewriter').innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return false;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typewriter').innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                setTimeout(typingEffect, 500);
                return false;
            }
            timer = setTimeout(loopDeleting, 50);
        };
        loopDeleting();
    }
    
    // Start typing after a short delay
    setTimeout(typingEffect, 1000);

    // --- ScrollSpy (Active Nav Link) ---
    const sections = document.querySelectorAll("section[id]");
    const navLinksDesktop = document.querySelectorAll(".nav-link");
    
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinksDesktop.forEach((link) => {
            link.classList.remove("active");
            link.classList.remove("text-primary");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
                link.classList.add("text-primary");
            }
        });
        
        // Navbar glass effect shadow on scroll
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("shadow-md");
        } else {
            navbar.classList.remove("shadow-md");
        }
    });

    // --- GSAP ScrollTrigger Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero timeline
    const heroTl = gsap.timeline();
    heroTl.from(".hero-text > p, .hero-text > h1", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(".hero-text > div > a", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.4")
    .from(".hero-image", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1");

    // Standard Fade Up
    const fadeUps = document.querySelectorAll('.gsap-fade-up');
    fadeUps.forEach(element => {
        let delay = 0;
        if(element.classList.contains('delay-1')) delay = 0.2;
        if(element.classList.contains('delay-2')) delay = 0.4;
        if(element.classList.contains('delay-3')) delay = 0.6;
        
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: delay,
            ease: "power3.out"
        });
    });

    // Stagger Feature Cards
    gsap.from(".gsap-feature-cards > div", {
        scrollTrigger: {
            trigger: ".gsap-feature-cards",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out"
    });

    // Stagger Tech Stack
    gsap.from(".gsap-stagger-grid > div", {
        scrollTrigger: {
            trigger: ".gsap-stagger-grid",
            start: "top 85%",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "back.out(1.5)"
    });

    // Project Cards Reveal
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });
    });
});
