document.addEventListener('DOMContentLoaded', () => {
    const talks = [
        {
            title: "The Future of AI in Web Development",
            speakers: ["Dr. Evelyn Reed"],
            categories: ["AI", "WebDev", "FutureTech"],
            duration: 60,
            description: "An in-depth look at how artificial intelligence is shaping the future of web development, from automated coding to personalized user experiences."
        },
        {
            title: "Mastering Modern JavaScript",
            speakers: ["Johnathan Carter", "Maria Rodriguez"],
            categories: ["JavaScript", "Frontend"],
            duration: 60,
            description: "Explore the latest features in ECMAScript, and learn advanced techniques and best practices for writing clean, efficient, and scalable JavaScript code."
        },
        {
            title: "Building Scalable APIs with GraphQL",
            speakers: ["Aisha Khan"],
            categories: ["API", "GraphQL", "Backend"],
            duration: 60,
            description: "A comprehensive guide to designing and building flexible and scalable APIs using GraphQL, with a focus on performance and security."
        },
        {
            title: "DevOps Culture: Beyond the Tools",
            speakers: ["Kenji Tanaka"],
            categories: ["DevOps", "Culture"],
            duration: 60,
            description: "This talk delves into the cultural shifts required for a successful DevOps transformation, focusing on collaboration, communication, and continuous improvement."
        },
        {
            title: "Cybersecurity in a Cloud-Native World",
            speakers: ["Dr. Lena Petrova", "Samuel Green"],
            categories: ["Cybersecurity", "Cloud"],
            duration: 60,
            description: "Learn how to secure modern applications and infrastructure in a cloud-native environment, covering everything from container security to serverless best practices."
        },
        {
            title: "The Art of UI/UX Design for Developers",
            speakers: ["Chloe Dubois"],
            categories: ["UI", "UX", "Design"],
            duration: 60,
            description: "A practical guide for developers on the principles of user interface and user experience design, with tips and tricks to create beautiful and intuitive applications."
        }
    ];

    const scheduleContainer = document.getElementById('schedule-container');
    const searchBar = document.getElementById('search-bar');
    
    let schedule = [];

    function calculateSchedule() {
        schedule = [];
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

        let talkIndex = 0;

        function addMinutes(date, minutes) {
            return new Date(date.getTime() + minutes * 60000);
        }

        // Talk 1
        schedule.push({ type: 'talk', details: talks[talkIndex++], startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 60);

        // Transition 1
        schedule.push({ type: 'transition', startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 10);
        
        // Talk 2
        schedule.push({ type: 'talk', details: talks[talkIndex++], startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 60);

        // Transition 2
        schedule.push({ type: 'transition', startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 10);

        // Talk 3
        schedule.push({ type: 'talk', details: talks[talkIndex++], startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 60);
        
        // Lunch Break
        schedule.push({ type: 'break', name: 'Lunch Break', startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 60);

        // Talk 4
        schedule.push({ type: 'talk', details: talks[talkIndex++], startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 60);

        // Transition 3
        schedule.push({ type: 'transition', startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 10);

        // Talk 5
        schedule.push({ type: 'talk', details: talks[talkIndex++], startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 60);

        // Transition 4
        schedule.push({ type: 'transition', startTime: new Date(currentTime) });
        currentTime = addMinutes(currentTime, 10);

        // Talk 6
        schedule.push({ type: 'talk', details: talks[talkIndex++], startTime: new Date(currentTime) });
    }

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function renderSchedule(filter = '') {
        scheduleContainer.innerHTML = '';
        const searchTerm = filter.trim().toLowerCase();

        const filteredSchedule = schedule.filter(item => {
            if (item.type !== 'talk') return true;
            if (!searchTerm) return true;
            return item.details.categories.some(cat => cat.toLowerCase().includes(searchTerm));
        });

        if (filteredSchedule.every(item => item.type !== 'talk')) {
             scheduleContainer.innerHTML = '<p style="text-align: center;">No talks found for that category.</p>';
             return;
        }

        filteredSchedule.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('schedule-item');
            
            let endTime;
            if (item.type === 'talk') {
                endTime = addMinutes(item.startTime, item.details.duration);
            } else if (item.type === 'break') {
                endTime = addMinutes(item.startTime, 60);
            } else { // transition
                 endTime = addMinutes(item.startTime, 10);
            }

            const timeString = `${formatTime(item.startTime)} - ${formatTime(endTime)}`;
            
            if (item.type === 'talk') {
                const talk = item.details;
                itemDiv.innerHTML = `
                    <div class="time-info">${timeString}</div>
                    <div class="talk-details">
                        <h2>${talk.title}</h2>
                        <div class="speakers">${talk.speakers.join(', ')}</div>
                        <div class="description">${talk.description}</div>
                        <div class="categories">
                            ${talk.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                        </div>
                    </div>
                `;
            } else if (item.type === 'break') {
                itemDiv.classList.add('break');
                 itemDiv.innerHTML = `
                    <div class="time-info">${timeString}</div>
                    <div class="talk-details">
                        <h2>${item.name}</h2>
                    </div>
                `;
            } else { // transition
                 itemDiv.classList.add('transition');
                 itemDiv.innerHTML = `
                    <div class="time-info">${timeString}</div>
                    <div class="talk-details">
                        <p>Transition</p>
                    </div>
                `;
            }
            scheduleContainer.appendChild(itemDiv);
        });
    }

    searchBar.addEventListener('input', (e) => {
        renderSchedule(e.target.value);
    });

    calculateSchedule();
    renderSchedule();
});
