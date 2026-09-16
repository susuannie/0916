// 全域變數：12H / 24H 模式設定 (預設 24 小時制)
let is24HourFormat = true;

// 4. Live Clock 即時時鐘主程式
function updateClock() {
    const now = new Date();

    // 1. 動態計算問候語 (Good Morning / Afternoon / Evening)
    const hours = now.getHours();
    const greetingEl = document.getElementById('greeting');
    if (hours < 12) {
        greetingEl.textContent = '🌅 Good Morning!';
    } else if (hours < 18) {
        greetingEl.textContent = '☀️ Good Afternoon!';
    } else {
        greetingEl.textContent = '🌙 Good Evening!';
    }

    // 2. 計算 HH : MM : SS 時間格式
    let displayHours = hours;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let ampmSuffix = '';

    if (!is24HourFormat) {
        ampmSuffix = displayHours >= 12 ? ' PM' : ' AM';
        displayHours = displayHours % 12 || 12; // 轉為 12 小時制
    }

    const formattedHours = String(displayHours).padStart(2, '0');

    // 更新 HTML 時鐘內容 (HH : MM : SS)
    document.getElementById('clock').textContent = `${formattedHours} : ${minutes} : ${seconds}${ampmSuffix}`;

    // 3. 自動更新日期顯示
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' };
    document.getElementById('date').textContent = now.toLocaleDateString('zh-TW', dateOptions);

    // 4. 自動偵測 Timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('timezone').textContent = timezone;
}

// 切換 12H / 24H 格式按鈕事件
document.getElementById('toggle-format').addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    updateClock(); // 點擊後立即更新
});

// 每秒 (1000ms) 自動更新一次時間
setInterval(updateClock, 1000);

// 網頁載入時立刻執行一次，避免出現 00:00:00
updateClock();