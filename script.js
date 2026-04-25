const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",    // 0 normal
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",  // 1 confused
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",             // 2 pleading
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",             // 3 sad
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",       // 4 sadder
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",             // 5 devastated
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",               // 6 very devastated
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"  // 7 crying runaway
]

const noMessages = [
    "No",
    "Ranshiya, are you sure? �",
    "Please don't break my heart... 💔",
    "I thought we had something special 🥺",
    "I will cry, I swear 😢",
    "Ranshiya please... 💔",
    "Don't do this to meee...",
    "Last chance! 😭",
    "You can't even catch me 😜"
]

const yesTeasePokes = [
    "Ranshiya, try saying no first... I dare you 😏",
    "go on, hit no just once... 👀",
    "you're missing out on the surprise 😈",
    "click no, I dare you pookie 😏"
]

const loveQuotes = [
    "\"Every love story is beautiful, but ours is my favourite 🌹\"",
    "\"You are my today and all of my tomorrows 💫\"",
    "\"In a sea of people, my eyes will always search for you 🌊\"",
    "\"You make my heart smile, Ranshiya 💖\"",
    "\"Being with you makes everything feel like magic ✨\""
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true
let quoteIndex = 0

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const loveQuoteEl = document.getElementById('love-quote')

// Cycle through romantic quotes every 4 seconds
if (loveQuoteEl) {
    setInterval(() => {
        quoteIndex = (quoteIndex + 1) % loveQuotes.length
        loveQuoteEl.style.opacity = '0'
        setTimeout(() => {
            loveQuoteEl.textContent = loveQuotes[quoteIndex]
            loveQuoteEl.style.opacity = '1'
        }, 400)
    }, 4000)
    loveQuoteEl.style.transition = 'opacity 0.4s ease'
}

// Falling petals
function spawnPetal() {
    const petalsBg = document.getElementById('petals-bg')
    if (!petalsBg) return
    const el = document.createElement('div')
    el.classList.add('petal')
    el.textContent = ['💖','💗','💕','🌹','✨','💝','🌸'][Math.floor(Math.random() * 7)]
    el.style.left = Math.random() * 100 + 'vw'
    el.style.animationDuration = (4 + Math.random() * 5) + 's'
    el.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem'
    petalsBg.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
}
setInterval(spawnPetal, 600)

// Autoplay audio
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🎵'
    }
}

function handleYesClick() {
    // If all tease pokes have been shown, go to yes page
    if (yesTeasedCount >= yesTeasePokes.length || runawayEnabled) {
        window.location.href = 'yes.html'
        return
    }
    const msg = yesTeasePokes[yesTeasedCount]
    yesTeasedCount++
    showTeaseMessage(msg)
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800)
}

function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time (capped so it stays within the card)
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${Math.min(currentSize * 1.2, 32)}px`
    const padY = Math.min(13 + noClickCount * 2, 22)
    const padX = Math.min(36 + noClickCount * 4, 52)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.82, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}