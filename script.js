// ข้อมูลจำลองของเกม
const games = [
    // เพิ่ม image: "ลิงก์รูป" เข้าไปด้านหลังสุดของแต่ละเกม
    { id: 1, title: "CyberStrike", genre: "Action", platform: "PC", price: 800, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80" },
    { id: 2, title: "Fantasy World", genre: "RPG", platform: "PC", price: 1200, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80" },
    { id: 3, title: "Space Explorer", genre: "Action", platform: "Console", price: 1500, image: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=500&q=80" },
    { id: 4, title: "Farm Builder", genre: "Simulation", platform: "PC", price: 400, image: "https://images.unsplash.com/photo-1592840062820-2f69469502ab?w=500&q=80" }
];

// หน้า 1: ดึงหมวดหมู่เกมโดยใช้ Set Theory (ลดความซ้ำซ้อน)
function renderGenres() {
    // ประยุกต์ใช้ Set: เซตจะไม่เก็บค่าที่ซ้ำกัน
    const genreSet = new Set(games.map(game => game.genre));
    const genreContainer = document.getElementById("genre-list");
    
    if(genreContainer) {
        genreSet.forEach(genre => {
            genreContainer.innerHTML += `<span class="genre-badge">${genre}</span> `;
        });
    }
}

// หน้า 2: กรองข้อมูลโดยใช้ Set Operations (Intersection / Logic AND)
function filterGames() {
    const filterGenre = document.getElementById("genreFilter").value;
    const filterPlatform = document.getElementById("platformFilter").value;
    const resultContainer = document.getElementById("game-results");
    resultContainer.innerHTML = "";

    // ประยุกต์ใช้ Logic (AND): หาส่วนอินเตอร์เซกชันของ 2 เงื่อนไข
    const filteredGames = games.filter(game => {
        const matchGenre = filterGenre === "All" || game.genre === filterGenre;
        const matchPlatform = filterPlatform === "All" || game.platform === filterPlatform;
        return matchGenre && matchPlatform; 
    });

    // (ส่วนนี้อยู่ในฟังก์ชัน filterGames)
    filteredGames.forEach(game => {
        resultContainer.innerHTML += `
            <div class="card">
                <!-- 👇 เพิ่มบรรทัดนี้เข้าไป 👇 -->
                <img src="${game.image}" alt="${game.title}" class="game-img">
                
                <h3>${game.title}</h3>
                <p>หมวดหมู่: ${game.genre}</p>
                <p>แพลตฟอร์ม: ${game.platform}</p>
                <p>ราคา: ${game.price} บาท</p>
                <button onclick="addToCart(${game.price})">สนใจเกมนี้</button>
            </div>
        `;
    });
}

// หน้า 3: ตะกร้า/สรุป ใช้ Boolean Logic & If-Else
let totalAmount = 0;
function addToCart(price) {
    totalAmount += price;
    alert("เพิ่มลงรายการสนใจแล้ว!");
    localStorage.setItem("total", totalAmount); // เก็บค่าไว้ข้ามหน้าเว็บ
}

function calculateDiscount() {
    const total = parseInt(localStorage.getItem("total")) || 0;
    let discount = 0;
    
    // ประยุกต์ใช้ If-Else และ Boolean Logic
    if (total >= 1500) {
        discount = total * 0.10; // ลด 10% ถ้ายอดรวมถึง 1500
    } else {
        discount = 0;
    }

    const netPrice = total - discount;
    document.getElementById("summary-details").innerHTML = `
        <p>ราคารวม: ${total} บาท</p>
        <p>ส่วนลด: ${discount} บาท</p>
        <h3>ยอดสุทธิ: ${netPrice} บาท</h3>
    `;
}