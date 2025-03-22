// Get the zodiac sign from the URL path (e.g., /aries)
const zodiacSign = window.location.pathname.substring(1).toLowerCase() || 'aries'; // Default to Aries if no path

// Update the title and date
document.getElementById('zodiac-title').textContent = `${zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)} VibesDaily Horoscope`;
const today = new Date().toLocaleDateString();
document.getElementById('date').textContent = today;

// Your xAI API key
const apiKey = 'xai-RdMHOwRUAORjY4PD302K4v5kOHeSf9lcKMSmP9jNbpTgpphLsRu377stlkvSrXyfTP6fgCP6olVN6Nb2';

// Function to fetch data from xAI API
async function fetchHoroscope(prompt) {
    try {
        const response = await fetch('https://api.xai.com/v1/grok', { // Replace with actual xAI API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'grok',
                prompt: prompt,
                max_tokens: 200
            })
        });

        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        return data.choices[0].text.trim(); // Adjust based on actual API response structure
    } catch (error) {
        console.error('Error:', error);
        return 'Unable to tune into the vibes. Try again later.';
    }
}

// Load horoscope data
async function loadHoroscopeData() {
    // Daily Horoscope
    const dailyPrompt = `Generate a detailed daily horoscope for ${zodiacSign} on ${today}, focusing on cosmic vibes, planetary influences, and personal advice.`;
    const dailyHoroscope = await fetchHoroscope(dailyPrompt);
    document.getElementById('daily-horoscope').textContent = dailyHoroscope;

    // Sun Sign Insights
    const sunPrompt = `Describe the core energy and personality traits of the sun sign ${zodiacSign} in a vibrant, cosmic tone.`;
    const sunInfo = await fetchHoroscope(sunPrompt);
    document.getElementById('sun-info').textContent = sunInfo;

    // Moon Sign Insights
    const moonPrompt = `Explain how the moon’s energy influences ${zodiacSign} on ${today}, with insights into emotions and intuition.`;
    const moonInfo = await fetchHoroscope(moonPrompt);
    document.getElementById('moon-info').textContent = moonInfo;

    // Love Compatibility
    const lovePrompt = `Provide love compatibility vibes for ${zodiacSign} with other zodiac signs, highlighting cosmic connections and challenges.`;
    const loveInfo = await fetchHoroscope(lovePrompt);
    document.getElementById('love-info').textContent = loveInfo;
}

// Run the function when the page loads
loadHoroscopeData();