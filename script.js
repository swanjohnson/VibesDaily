const zodiacSign = (window.location.hash.replace(/^#\/?/, '').toLowerCase() || 'aries');
document.getElementById('zodiac-title').textContent = zodiacSign.toUpperCase();
const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
document.getElementById('date').textContent = today;

async function fetchHoroscope(prompt) {
    try {
        const response = await fetch('https://vibes-daily-proxy-aladpf57q-johns-projects-0aedfb8a.vercel.app/api/horoscope', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });
        if (!response.ok) throw new Error(`Proxy failed: ${response.status} ${response.statusText}`);
        const data = await response.json();
        return data.content.trim();
    } catch (error) {
        console.error('Error:', error);
        return 'Unable to tune into the vibes. Try again later.';
    }
}

async function loadHoroscopeData() {
    document.getElementById('daily-horoscope').textContent = await fetchHoroscope(`Generate a detailed daily horoscope for ${zodiacSign} on ${today}, focusing on cosmic vibes, planetary influences, and personal advice.`);
    document.getElementById('sun-info').textContent = await fetchHoroscope(`Describe the core energy and personality traits of the sun sign ${zodiacSign} in a vibrant, cosmic tone. Format as: "${zodiacSign} (Element)"`);
    document.getElementById('moon-info').textContent = await fetchHoroscope(`Explain how the moon’s energy influences ${zodiacSign} on ${today}, with insights into emotions and intuition. Format as: "Moon in [Sign] (Element)"`);
    document.getElementById('love-info').textContent = await fetchHoroscope(`Provide love compatibility vibes for ${zodiacSign} with other zodiac signs, highlighting cosmic connections and challenges. Format as: "[Sign]"`);
}

loadHoroscopeData();