
const talksData = [];

// Helper to format time
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Event starts at 10:00 AM
let currentTime = new Date();
currentTime.setHours(10, 0, 0, 0); // Set to 10:00 AM today

// Generate placeholder talks
for (let i = 1; i <= 6; i++) {
    const talkStartTime = new Date(currentTime);
    currentTime.setHours(currentTime.getHours() + 1); // 1 hour talk
    const talkEndTime = new Date(currentTime);

    talksData.push({
        id: i,
        title: `Technical Talk ${i}: Innovation in Tech ${i}`,
        speakers: [`Speaker ${i} A`, (i % 2 === 0 ? `Speaker ${i} B` : null)].filter(Boolean),
        category: [
            `Category ${i % 3 + 1}`,
            (i % 2 === 0 ? `Advanced Tech` : `Fundamentals`)
        ],
        duration: 60, // minutes
        description: `This talk will cover the latest advancements and future trends in technical domain ${i}. Join us to explore exciting new developments and practical applications.`,
        startTime: formatTime(talkStartTime),
        endTime: formatTime(talkEndTime)
    });

    if (i < 6) {
        if (i === 3) { // After 3rd talk, add lunch break
            currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 min transition after talk 3
            talksData.push({
                id: 'lunch',
                title: 'Lunch Break',
                speakers: [],
                category: ['Break'],
                duration: 60,
                description: 'Enjoy a delicious lunch and network with fellow attendees!',
                startTime: formatTime(currentTime),
                endTime: formatTime(new Date(currentTime.setHours(currentTime.getHours() + 1)))
            });
             currentTime.setMinutes(currentTime.getMinutes() - 10); // Adjust current time back for next transition
        }
        currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 min transition
    }
}


const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Talks Event Schedule</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 960px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 15px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
            margin-bottom: 20px;
        }
        h1, h2 {
            color: #333;
        }
        .search-container {
            margin-bottom: 20px;
            text-align: center;
        }
        .search-container input[type="text"] {
            padding: 10px;
            width: 70%;
            max-width: 400px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .talk-card {
            background-color: #e9e9e9;
            margin-bottom: 15px;
            padding: 15px;
            border-radius: 5px;
            border-left: 5px solid #007bff;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .talk-card.lunch {
            background-color: #ffeeba;
            border-left: 5px solid #ffc107;
        }
        .talk-card h3 {
            margin-top: 0;
            color: #0056b3;
        }
        .talk-card p {
            margin: 0;
        }
        .talk-card .time {
            font-weight: bold;
            color: #555;
        }
        .talk-card .speakers {
            font-style: italic;
            color: #666;
        }
        .talk-card .categories span {
            display: inline-block;
            background-color: #6c757d;
            color: #fff;
            padding: 3px 8px;
            border-radius: 3px;
            margin-right: 5px;
            font-size: 0.8em;
        }
        footer {
            text-align: center;
            padding: 20px;
            margin-top: 30px;
            color: #777;
            border-top: 1px solid #eee;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                padding: 10px;
            }
            .search-container input[type="text"] {
                width: 90%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Tech Talks Event Schedule</h1>
            <p>A day full of insights and innovation!</p>
        </header>

        <main>
            <div class="search-container">
                <input type="text" id="categorySearch" placeholder="Search by category (e.g., AI, Web Dev)">
            </div>

            <section id="schedule">
                <h2>Today's Schedule</h2>
                <div id="talksList">
                    <!-- Talks will be rendered here by JavaScript -->
                </div>
            </section>
        </main>

        <footer>
            <p>&copy; ${new Date().getFullYear()} Tech Talks Event. All rights reserved.</p>
        </footer>
    </div>

    <script>
        const allTalks = ${JSON.stringify(talksData, null, 2)};
        const talksListDiv = document.getElementById('talksList');
        const categorySearchInput = document.getElementById('categorySearch');

        function renderTalks(talksToRender) {
            talksListDiv.innerHTML = ''; // Clear previous talks
            if (talksToRender.length === 0) {
                talksListDiv.innerHTML = '<p>No talks found matching your search criteria.</p>';
                return;
            }

            talksToRender.forEach(talk => {
                const talkCard = document.createElement('div');
                talkCard.classList.add('talk-card');
                if (talk.id === 'lunch') {
                    talkCard.classList.add('lunch');
                }

                const speakersHtml = talk.speakers.length > 0
                    ? \`<p class="speakers">Speaker(s): \${talk.speakers.join(', ')}</p>\`
                    : '';

                const categoriesHtml = talk.category.length > 0
                    ? \`<p class="categories">\${talk.category.map(cat => \`<span>\${cat}</span>\`).join('')}</p>\`
                    : '';

                talkCard.innerHTML = \`
                    <p class="time">\${talk.startTime} - \${talk.endTime}</p>
                    <h3>\${talk.title}</h3>
                    \${speakersHtml}
                    \${categoriesHtml}
                    <p>\${talk.description}</p>
                \`;
                talksListDiv.appendChild(talkCard);
            });
        }

        function filterTalks() {
            const searchTerm = categorySearchInput.value.toLowerCase();
            const filteredTalks = allTalks.filter(talk => {
                if (talk.id === 'lunch') return true; // Always show lunch break
                return talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
            });
            renderTalks(filteredTalks);
        }

        // Initial render
        renderTalks(allTalks);

        // Event listener for search input
        categorySearchInput.addEventListener('keyup', filterTalks);
        categorySearchInput.addEventListener('change', filterTalks); // For immediate filter on paste/clear
    </script>
</body>
</html>
