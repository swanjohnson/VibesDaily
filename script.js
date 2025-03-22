// Use hash instead of pathname
const zodiacSign = (window.location.hash.substring(2).toLowerCase() || 'aries');
document.getElementById('zodiac-title').textContent = `${zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)} VibesDaily Horoscope`;
const today = new Date().toLocaleDateString();
document.getElementById('date').textContent = today;

async function fetchHoroscope(prompt) {
    try {
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'xai-RdMHOwRUAORjY4PD302K4v5kOHeSf9lcKMSmP9jNbpTgpphLsRu377stlkvSrXyfTP6fgCP6olVN6Nb2'
            },
            body: JSON.stringify({
                model: 'grok-2-latest',
                messages: [
                    {"role": "system", "content": "You are a cosmic guide providing detailed horoscopes."},
                    {"role": "user", "content": prompt}
                ],
                stream: false,
                temperature: 0,
                max_tokens: 200
            })
        });
        if (!response.ok) throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error:', error);
        return 'Unable to tune into the vibes. Try again later.';
    }
}

async function loadHoroscopeData() {
    document.getElementById('daily-horoscope').textContent = await fetchHoroscope(`Generate a detailed daily horoscope for ${zodiacSign} on ${today}, focusing on cosmic vibes, planetary influences, and personal advice.`);
    document.getElementById('sun-info').textContent = await fetchHoroscope(`Describe the core energy and personality traits of the sun sign ${zodiacSign} in a vibrant, cosmic tone.`);
    document.getElementById('moon-info').textContent = await fetchHoroscope(`Explain how the moon’s energy influences ${zodiacSign} on ${today}, with insights into emotions and intuition.`);
    document.getElementById('love-info').textContent = await fetchHoroscope(`Provide love compatibility vibes for ${zodiacSign} with other zodiac signs, highlighting cosmic connections and challenges.`);
}

loadHoroscopeData();