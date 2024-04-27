const TelegramBot = require("node-telegram-bot-api");

// Ganti token berikut dengan token bot Telegram Anda
const token = "6979478685:AAFsZxV2XtYjQqJBhv_6dqBZdKPzRj9yjec";

// Inisialisasi bot
const bot = new TelegramBot(token, { polling: true });

// Objek untuk menyimpan status obrolan dengan pengguna
const chatStatus = {};

// Fungsi untuk menangani perintah /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name; // Mengambil nama pengguna
  bot.sendMessage(
    chatId,
    `Halo ${userName}! Aku siap membantumu membuat percakapan yang romantis. Mulai saja!`
  );
});

// Fungsi untuk menampilkan menu
bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;
  const menuMessage =
    "Menu Bot tegardevsja.\n\n1. Chat AI\n2. Pacar Online\n3. Buat Gambar\n4. Info Bot\n\nMenu lain\nsebutkan kata romantis apapun itu";
  bot.sendMessage(chatId, menuMessage);
});

// Fungsi untuk menangani pesan yang berisi nomor menu
bot.onText(/^\d+$/, (msg) => {
  const chatId = msg.chat.id;
  const menuNumber = parseInt(msg.text);
  switch (menuNumber) {
    case 1:
      bot.sendMessage(chatId, "Fitur Chat AI akan segera hadir.");
      break;
    case 2:
      handlePacarChat(msg);
      break;
    case 3:
      bot.sendMessage(chatId, "Fitur Buat Gambar akan segera hadir.");
      break;
    case 4:
      handleInfoBot(msg);
      break;
    default:
      bot.sendMessage(chatId, "Maaf, pilihan menu tidak valid.");
      break;
  }
});

// Fungsi untuk menangani pesan yang berisi kata sapaan
bot.onText(/(p|halo|malam|siang|pagi|sore|hi|salam)/, (msg) => {
  const chatId = msg.chat.id;
  const menuMessage =
    "Menu Bot tegardevsja.\n\n1. Chat AI\n2. Pacar Online\n3. Buat Gambar\n4. Info Bot\n\nMenu lain\nsebutkan kata romantis apapun itu";
  bot.sendMessage(chatId, menuMessage);
});

// Fungsi untuk menangani pesan yang berisi kata kunci romantis
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name; // Mengambil nama pengguna
  const message = msg.text.toLowerCase();

  // Kata kunci yang memicu respons romantis
  const romanticKeywords = [
    "cinta",
    "sayang",
    "kasih",
    "romantis",
    "mesra",
    "manis",
    "indah",
    "berdua",
    "i love u",
    "cantik",
    "ganteng",
  ];

  // Memeriksa apakah pesan pengguna berisi kata kunci romantis
  const isRomantic = romanticKeywords.some((keyword) =>
    message.includes(keyword)
  );

  // Jika pesan pengguna mengandung kata kunci romantis, bot memberikan respons romantis
  if (isRomantic) {
    // Respon romantis yang acak
    const romanticResponses = [
      `Aku terpesona olehmu, ${userName}...`,
      `Ketika aku bersamamu, semuanya terasa indah, ${userName}...`,
      `Setiap detik bersamamu adalah anugerah bagiku, ${userName}...`,
      `Cintaku padamu tak terhingga, ${userName}...`,
      `Kau adalah cahaya dalam hidupku, ${userName}...`,
      `Ketika aku memandang matamu, aku melihat dunia yang lebih baik, ${userName}...`,
      `Kau membuat hatiku berdebar-debar, ${userName}...`,
      `Kisah cintaku denganmu seperti dongeng yang indah, ${userName}...`,
    ];

    // Memilih respons romantis secara acak dari daftar respons
    const randomResponse =
      romanticResponses[Math.floor(Math.random() * romanticResponses.length)];

    // Mengirimkan respons romantis kepada pengguna
    bot.sendMessage(chatId, randomResponse);
  }
});

// Fungsi untuk menangani menu Pacar Online
function handlePacarChat(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `hai sayang ${msg.from.first_name}`);
  chatStatus[chatId] = { step: 1 };

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    // Periksa langkah obrolan untuk pengguna tertentu
    if (chatStatus[chatId]) {
      const step = chatStatus[chatId].step;

      // Langkah 1: Bot bertanya apakah sudah makan
      if (step === 1) {
        if (message.toLowerCase() === "sudah") {
          chatStatus[chatId].step = "udah";
          bot.sendMessage(
            chatId,
            `Oke, ${msg.from.first_name}. Kamu sudah makan ya.`
          );
        } else if (message.toLowerCase() === "belum") {
          chatStatus[chatId].step = "belom";
          bot.sendMessage(
            chatId,
            `Oke, ${msg.from.first_name}. Kamu makan dulu.`
          );
        }
      } else if (step === "udah") {
        chatStatus[chatId].age = message;
        chatStatus[chatId].step = 3;
        bot.sendMessage(chatId, `Oke, ${msg.from.first_name}. Apa hobimu?`);
      } else if (step === "belom") {
        chatStatus[chatId].hobby = message;
        bot.sendMessage(
          chatId,
          `Terima kasih! Berikut informasi yang kamu berikan:\nNama: ${chatStatus[chatId].name}\nUsia: ${chatStatus[chatId].age}\nHobi: ${chatStatus[chatId].hobby}`
        );
        delete chatStatus[chatId];
      }
    }
  });
}

// Fungsi untuk menangani menu Info Bot
function handleInfoBot(msg) {
  const chatId = msg.chat.id;
  const imageUrl =
    "https://drive.google.com/uc?id=17jeAggF4nX3se4Eu1cEusVvZlFQZ27fn";
  bot.sendPhoto(chatId, imageUrl, {
    caption:
      "Halo ini saya pembuat bot ini. Jangan lupa follow instagram saya @tegardevsja",
  });
}
