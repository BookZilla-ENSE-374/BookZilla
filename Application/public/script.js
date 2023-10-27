// script.js

var bookInfo = document.getElementById('bookInfo');
var bookImages = document.querySelectorAll('#bookCarousel .carousel-item img');
var bookData = [
    {
        title: 'Diary of a Wimpy Kid (Diary of a Wimpy Kid #1) ',
        author: 'Jeff Kinney',
        releaseDate: 'April 1, 2007',
        synopsis: 'It is a new school year, and Greg Heffley finds himself thrust into middle school, where undersized weaklings share the hallways with kids who are taller, meaner, and already shaving. The hazards of growing up before you are ready are uniquely revealed through words and drawings as Greg records them in his diary'
    },
    {
        title: 'Harry Potter and the Sorcerers Stone',
        author: 'J.K. Rowling',
        releaseDate: 'June 26, 1997',
        synopsis: 'Harry Potter and the Sorcerers Stone is the first book in J.K. Rowlings beloved fantasy series. It follows the story of Harry Potter, a young orphan who discovers he is a wizard on his 11th birthday. He is invited to attend Hogwarts School of Witchcraft and Wizardry, where he learns about his magical heritage. Along with his new friends Ron and Hermione, Harry uncovers the mystery of the Sorcerers Stone, a powerful magical object hidden within the school. The trio faces challenges, confronts the dark wizard Voldemort, and embarks on a thrilling adventure filled with magic and wonder.'
    },
    {
        title: 'The Last Apprentice: Revenge of the Witch',
        author: 'Joseph Delaney',
        releaseDate: 'January 1, 2004',
        synopsis: 'The Last Apprentice: Revenge of the Witch is the first book in Joseph Delaneys The Wardstone Chronicles series. It tells the story of Tom Ward, a young boy who becomes the apprentice of the Spook, a local exorcist tasked with protecting the town from supernatural threats. As Tom begins his training, he learns about the dangers of witches and other dark creatures that lurk in the countryside. The novel follows his adventures as he faces the malevolent witch, Mother Malkin, and the challenges that come with his newfound role in a world filled with dark magic and peril.'
    },
    {
        title: 'Atomic Habits',
        author: 'James Clear',
        releaseDate: 'October 16, 2018',
        synopsis: "Atomic Habits, written by James Clear and published on October 16, 2018, is a groundbreaking book that explores the science of habit formation and provides practical advice on how to make positive changes in one's life. Clear delves into the idea that small, incremental changes, or atomic habits, can lead to remarkable results over time. He offers a comprehensive framework for building and breaking habits, emphasizing the importance of understanding the cues, cravings, responses, and rewards that drive our behaviors. Through numerous real-life examples and actionable strategies, Clear guides readers in creating habits that can lead to personal and professional success."
    },
    {
        title: 'Geronimo Stilton: Alice in Wonderland',
        author: 'Geronimo Stilton',
        releaseDate: 'Januaru 1, 2010',
        synopsis: "One summer afternoon, a curious young mouselet named Alice follows a strange white rabbit with a pocket watch down an even stranger aobbit hole. That's the beginning of a wonderful and fabumouse journey through Wonderland, a world full of unusual characters and unforgettable adventures."
    }
];

var currentBookIndex = 0;

function updateBookInfo(index) {
    var book = bookData[index];
    bookInfo.innerHTML = `
        <div class="card" style="width: 400px;"> <!-- Adjust the width as needed -->
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Author: ${book.author}</p>
                <p class="card-text">Date Released: ${book.releaseDate}</p>
                <p class="card-text">Synopsis: ${book.synopsis}</p>
            </div>
        </div>
    `;
}

var prevButton = document.querySelector('[data-bs-slide="prev"]');
prevButton.addEventListener('click', function () {
    if (currentBookIndex > 0) {
        currentBookIndex--;
    } else {
        currentBookIndex = bookData.length - 1;
    }
    updateBookInfo(currentBookIndex);
});

var nextButton = document.querySelector('[data-bs-slide="next"]');
nextButton.addEventListener('click', function () {
    if (currentBookIndex < bookData.length - 1) {
        currentBookIndex++;
    } else {
        currentBookIndex = 0;
    }
    updateBookInfo(currentBookIndex);
});

updateBookInfo(currentBookIndex);
