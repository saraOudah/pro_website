document.addEventListener('DOMContentLoaded', function() {
    const courseMenu = [
        {
            title: "Programming Courses",
            items: [
                { name: "Welcome", video: "videos/welcome.mp4" },
                { name: "What is Coding?", video: "videos/What is Coding_.mp4" },
                { name: "Java", video: "videos/java.mp4" },
                { name: "Benefits of Learning Java", video: "videos/benfit.mp4" },
                { name: "Java-Quiz", type: "quiz", questions: [
                    { question: "What does JVM stand for?", answers: ["Java Virtual Machine", "Java Very Much", "Java Verified Method"], correct: 0 }
                ]},
                { name: "Location of available courses for Java", video: "videos/java-location.mp4" },
                { name: "Python", video: "videos/python.mp4" },
                { name: "Python in Data Science", video: "videos/python.mp4" },
                { name: "Python-Quiz", type: "quiz", questions: [
                    { question: "Which of the following is a Python data type?", answers: ["list", "array", "vector"], correct: 0 }
                ]},
                { name: "Location of available courses for Python", video: "videos/python-location.mp4" },
                { name: "JavaScript", video: "videos/JavaScript.mp4" },
                { name: "JavaScript for Web Development", video: "videos/JavaScript.mp4" },
                { name: "JavaScript-Quiz", type: "quiz", questions: [
                    { question: "What is used to declare a variable in JavaScript?", answers: ["let", "var", "const", "all of the above"], correct: 3 }
                ]},
                { name: "Location of available courses for JavaScript", video: "videos/javascript-location.mp4" },
                { name: "HTML", video: "videos/html.mp4" },
                { name: "HTML Best Practices", video: "videos/html.mp4" },
                { name: "HTML-Quiz", type: "quiz", questions: [
                    { question: "What does HTML stand for?", answers: ["HyperText Markup Language", "HighText Machine Language", "HyperText and links Markup Language"], correct: 0 }
                ]},
                { name: "Location of available courses for HTML", video: "videos/html-location.mp4" }
            ]
        },
        {
            title: "Development Courses",
            items: [
                { name: "Web Development Fundamentals", video: "videos/Web Development.mp4" },
                { name: "Database Design", video: "videos/DB.mp4" }
            ]
        }
    ];

    const locations = {
        "Java": [
            { name: "Course Riyadh", lat: 24.7136, lng: 46.6753 }, // Riyadh
            { name: "Course Jeddah ", lat: 21.4858, lng: 39.1925 }, // Jeddah
            { name: "Course Khobar ", lat: 26.2915, lng: 50.1991 }, // Khobar
            { name: "Course Dammam ", lat: 26.5765, lng: 49.9982 }, // Dammam
            { name: "Course Taif ", lat: 24.5247, lng: 39.5692 }  // Taif
        ],
        "Python": [
            { name: "Course Riyadh", lat: 24.7136, lng: 46.6753 }, // Riyadh
            { name: "Course Dammam", lat: 26.4207, lng: 50.0888 }, // Dammam
            { name: "Course Jeddah", lat: 21.4858, lng: 39.1925 }, // Jeddah
            { name: "Course Dhahran", lat: 24.774265, lng: 46.738586 }, // Dhahran
            { name: "Course Hofuf", lat: 25.3457, lng: 49.6026 }  // Hofuf
        ],
        "JavaScript": [
            { name: "Course Riyadh", lat: 24.7136, lng: 46.6753 }, // Riyadh
            { name: "Course Mecca", lat: 21.2854, lng: 39.2376 }, // Mecca
            { name: "Course Khobar", lat: 26.2915, lng: 50.1991 }, // Khobar
            { name: "Course Dammam", lat: 26.5765, lng: 49.9982 }, // Dammam
            { name: "Course Jubail", lat: 26.7195, lng: 50.0666 }  // Jubail
        ],
        "HTML": [
            { name: "Course Riyadh", lat: 24.7136, lng: 46.6753 }, // Riyadh
            { name: "Course Dhahran", lat: 24.774265, lng: 46.738586 }, // Dhahran
            { name: "Course Jeddah", lat: 21.4858, lng: 39.1925 }, // Jeddah
            { name: "Course Khobar", lat: 26.2915, lng: 50.1991 }, // Khobar
            { name: "Course Buraidah", lat: 25.2854, lng: 49.9982 }  // Buraidah
        ]
    };

    const courseMenuList = document.getElementById('course-menu');
    const mainContent = document.querySelector('.main-content');
    const toggleScrollbarIcon = document.querySelector('.toggle-scrollbar');
    const sidebar = document.querySelector('.sidebar');
    let activeCourse = null;


    // Toggle scrollbar visibility and sidebar height
    toggleScrollbarIcon.addEventListener('click', function() {
        const isMinimized = sidebar.classList.toggle('minimized');
        mainContent.classList.toggle('full-height', isMinimized);
        toggleScrollbarIcon.src = isMinimized ? 'images/unlock.png' : 'images/lock.png';
        sidebar.style.overflowY = isMinimized ? 'auto' : 'hidden';
        mainContent.style.overflowY = isMinimized ? 'hidden' : 'auto';
    });

    // Generate course menu dynamically
    courseMenu.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('category-item');

        const categoryTitle = document.createElement('span');
        categoryTitle.textContent = category.title;
        categoryItem.appendChild(categoryTitle);

        const nestedList = document.createElement('ul');
        nestedList.classList.add('nested');

        category.items.forEach((course, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('course-item');

            const courseName = document.createElement('span');
            courseName.textContent = course.name;
            listItem.appendChild(courseName);

            listItem.addEventListener('click', function(event) {
                event.stopPropagation();
                showCourseContent(course, index, category.items);
                if (activeCourse) {
                    activeCourse.classList.remove('active');
                }
                listItem.classList.add('active');
                activeCourse = listItem;
            });

            nestedList.appendChild(listItem);
        });

        categoryItem.appendChild(nestedList);

        categoryItem.addEventListener('click', function() {
            this.classList.toggle('open');
        });

        courseMenuList.appendChild(categoryItem);
    });

    function showCourseContent(course, index, items) {
        if (course.type === 'quiz') {
            mainContent.innerHTML = generateQuizHtml(course.name, course.questions);
            setupQuizHandler(course.questions);
        } else if (course.name.startsWith("Location of available courses for ")) {
            const courseName = course.name.replace("Location of available courses for ", "");
            mainContent.innerHTML = `
                <h1>${course.name} in Saudi Arabia</h1>
                <button class="location-button" data-course="${courseName}" data-action="show-riyadh">Show Riyadh Location</button>
                <button class="location-button" data-course="${courseName}" data-action="show-all">Show All Locations</button>
                <div id="map" class="map"></div>
                <button id="continue-button" class="continue-button">Continue</button>`;
            setupMap(courseName);
        } else {
            mainContent.innerHTML = `
                <h1>${course.name}</h1><br>
                <div class="video-wrapper">
                    <video controls autoplay>
                        <source src="${course.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <button id="continue-button" class="continue-button">Continue</button>`;
        }
        setupContinueButton(index, items);
    }

    function setupMap(courseName) {
        const map = L.map('map').setView([24.7136, 46.6753], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        locations[courseName].forEach(location => {
            L.marker([location.lat, location.lng]).addTo(map)
                .bindPopup(location.name)
                .openPopup();
        });
         // Add event listeners to location buttons
         const locationButtons = document.querySelectorAll('.location-button');
         locationButtons.forEach(button => {
             button.addEventListener('click', function() {
                 const action = this.getAttribute('data-action');
                 const course = this.getAttribute('data-course');
     
                 if (action === 'show-riyadh') {
                     const riyadhLocation = locations[course].find(loc => loc.name === "Course Riyadh");
                     map.setView([riyadhLocation.lat, riyadhLocation.lng], 12);
                 } else if (action === 'show-all') {
                     const bounds = locations[course].map(loc => [loc.lat, loc.lng]);
                     map.fitBounds(bounds);
                 }
             });
         });
    }


    // Generate HTML for quiz
    function generateQuizHtml(title, questions) {
        let quizHtml = `<h1>${title}</h1><div class="quiz-container">`;
        questions.forEach((q, index) => {
            quizHtml += `
                <div class="quiz-question-container">
                    <p class="quiz-question">${q.question}</p>
                    ${q.answers.map((answer, i) => `
                        <div>
                            <input type="radio" id="q${index}a${i}" name="q${index}" value="${i}">
                            <label for="q${index}a${i}">${answer}</label>
                        </div>
                    `).join('')}
                </div>
            `;
        });
        quizHtml += `<button id="submit-quiz" disabled>Submit</button></div>`;
        quizHtml += `<button id="continue-button" class="continue-button">Continue</button></div>`;
        quizHtml += `<div id="popup" class="popup"><div class="popup-content"><span class="close">&times;</span><p id="popup-text"></p></div></div>`;
        return quizHtml;
    }

    // Setup handler for quiz submission 
    function setupQuizHandler(questions) {
        const submitButton = document.getElementById('submit-quiz');
        const continueButton = document.getElementById('continue-button');
        const radioButtons = document.querySelectorAll('input[type="radio"]');

        // Enable submit button when a radio button is selected
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '#428254'; // Enabled button color
            });
        });

        submitButton.addEventListener('click', function() {
            const popup = document.getElementById('popup');
            const popupText = document.getElementById('popup-text');
            let correct = true;
            questions.forEach((question, index) => {
                const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
                if (!selectedAnswer || parseInt(selectedAnswer.value) !== question.correct) {
                    correct = false;
                }
            });
            popupText.textContent = correct ? "Correct answer!  Good job" : " Incorrect answer !    Try Again";
            popup.style.display = 'block';

            const closeBtn = document.querySelector('.close');
            closeBtn.addEventListener('click', function() {
                popup.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target === popup) {
                    popup.style.display = 'none';
                }
            });
        });
        continueButton.addEventListener('click', function() {
            const nextIndex = currentIndex + 1;
            if (nextIndex < items.length) {
                showCourseContent(items[nextIndex], nextIndex, items);
                if (activeCourse) {
                    activeCourse.classList.remove('active');
                }
                activeCourse = courseMenuList.querySelectorAll('.course-item')[nextIndex];
                activeCourse.classList.add('active');
            } else {
                alert("You have completed all courses in this category.");
            }
        });
    };
    function setupContinueButton(currentIndex, items) {
        const continueButton = document.getElementById('continue-button');
        continueButton.classList.add('continue-button'); 
        continueButton.addEventListener('click', function() {
            const nextIndex = currentIndex + 1;
            if (nextIndex < items.length) {
                showCourseContent(items[nextIndex], nextIndex, items);
                if (activeCourse) {
                    activeCourse.classList.remove('active');
                }
                activeCourse = courseMenuList.querySelectorAll('.course-item')[nextIndex];
                activeCourse.classList.add('active');
            } else {
                alert("You have completed all courses in this category.");
            }
        });
    }
    
});