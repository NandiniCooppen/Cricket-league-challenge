document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const header = document.querySelector('header');

        // Dynamically create and insert the header image
        const headerImage = document.createElement('img');
        headerImage.src = '/assets/illustrations/cricket-header-animate.png';
        headerImage.alt = 'Header Animation';
        headerImage.width = 600;
        headerImage.height = 600;
        headerImage.classList.add('header-image');
        header.appendChild(headerImage);

        // GSAP timeline for animations
        const tl = gsap.timeline();

        // Animate header content with more stagger and delay
        tl.to(header.querySelector('h1'), { 
                duration: 2, 
                x: 0, 
                opacity: 1, 
                ease: 'power2.out', 
                stagger: 0.8 
            })
          .to(header.querySelector('p'), { 
                duration: 2, 
                x: 0, 
                opacity: 1, 
                ease: 'power2.out', 
                stagger: 0.8 
            }, '-=1.5') 
          .to(headerImage, { 
                duration: 2, 
                x: 0, 
                opacity: 1, 
                ease: 'power2.out', 
                stagger: 0.8 
            }, '-=1.5') 
          .call(() => {
              header.classList.add('background-visible');

              // Find the paragraph and convert 'Join Us' into a button
              const headerParagraph = header.querySelector('p');
              if (headerParagraph) {
                  const joinUsText = headerParagraph.innerHTML;
                  // Wrap 'Join Us' in a button element
                  headerParagraph.innerHTML = joinUsText.replace(
                      /Join us/,
                      '<a href="#join" class="join-button">Join Us</a>'
                  );

                  // Animate the button
                  const joinButton = headerParagraph.querySelector('.join-button');
                  if (joinButton) {
                      gsap.fromTo(joinButton, 
                          { scale: 0.8, opacity: 0 }, 
                          { scale: 1, opacity: 1, duration: 1, ease: 'bounce.out' }
                      );

                      // Add smooth scroll behavior
                      joinButton.addEventListener('click', (event) => {
                          event.preventDefault(); // Prevent default anchor behavior
                          const targetSection = document.querySelector('#join');
                          if (targetSection) {
                              targetSection.scrollIntoView({ behavior: 'smooth' });
                          }
                      });
                  }
              }
          }, null, '-=1'); 
    } else {
        console.log('Reduced motion detected. Disabling animations.');
        const headerText = document.querySelector('header h1');
        const headerParagraph = document.querySelector('header p');
        const headerImage = document.querySelector('.header-image');

        if (headerText) headerText.style.opacity = '1';
        if (headerParagraph) headerParagraph.style.opacity = '1';
        if (headerImage) headerImage.style.opacity = '1';

        // Convert 'Join Us' into a button in reduced motion mode
        const joinButton = document.createElement('a');
        joinButton.href = '#join';
        joinButton.textContent = 'Join Us';
        joinButton.classList.add('join-button');

        if (headerParagraph) {
            headerParagraph.innerHTML = headerParagraph.innerHTML.replace(/Join us/, joinButton.outerHTML);
        }

        // Add smooth scroll behavior
        joinButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const targetSection = document.querySelector('#join');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const main = document.createElement('main');
    main.classList.add('wrapper');

    const sections = document.querySelectorAll('section');

    if (sections.length > 0) {
        const aboutSection = sections[0];
        aboutSection.id = 'about';

        const aboutContent = document.createElement('div');
        aboutContent.classList.add('about-content');
        while (aboutSection.firstChild && aboutSection.firstChild.tagName !== 'IMG') {
            aboutContent.appendChild(aboutSection.firstChild);
        }
        aboutSection.appendChild(aboutContent);

        const aboutImage = document.createElement('img');
        aboutImage.classList.add('about-image');
        aboutImage.src = '/assets/images/cricket-about.jpg';
        aboutImage.alt = 'a cricket image';
        aboutImage.width = 500;
        aboutImage.height = 500;
        aboutSection.appendChild(aboutImage);

        main.appendChild(aboutSection);
    }

    if (sections.length > 1) {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('card-wrapper');

        const icons = [
            '/assets/icons/cricket01.svg',
            '/assets/icons/cricket02.svg',
            '/assets/icons/cricket03.svg'
        ];

        for (let i = 1; i < sections.length - 1; i++) {
            const section = sections[i];
            const idMap = ['join', 'fees', 'location'];
            section.id = idMap[i - 1];
            
            // Create and insert the icon
            const icon = document.createElement('img');
            icon.src = icons[i - 1];
            icon.alt = 'Cricket Icon';
            icon.classList.add('card-icon');

            const h2 = section.querySelector('h2');
            if (h2) {
                section.insertBefore(icon, h2);
            }

            cardWrapper.appendChild(section);
        }

        main.appendChild(cardWrapper);
    }

    if (sections.length > 2) {
        const scheduleSection = sections[sections.length - 1];
        scheduleSection.id = 'schedule';

        const h2 = scheduleSection.querySelector('h2');
        const p = scheduleSection.querySelector('p');

        const scheduleList = document.createElement('div');
        scheduleList.classList.add('schedule-list');

        const ul = scheduleSection.querySelector('ul');
        if (ul) scheduleList.appendChild(ul);

        scheduleSection.innerHTML = '';
        if (h2) scheduleSection.appendChild(h2);
        if (p) scheduleSection.appendChild(p);
        scheduleSection.appendChild(scheduleList);

        const scheduleImage = document.createElement('img');
        scheduleImage.classList.add('about-image');
        scheduleImage.src = '/assets/images/cricket-schedule.jpg';
        scheduleImage.alt = 'a cricket image';
        scheduleImage.width = 500;
        scheduleImage.height = 500;
        scheduleList.appendChild(scheduleImage);

        main.appendChild(scheduleSection);
    }

    const body = document.body;
    body.insertBefore(main, body.querySelector('footer'));
});
