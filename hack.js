function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

document.getElementById('hack').addEventListener('click', () => {
  
  console.log('Popup DOM fully loaded and parsed')

  function modifyDOM() {
    console.log('Tab script:')
    console.log(document.body)
    return document.body.innerHTML
  }

  function findTextOfSelector() {
    const cssSelector =
      '#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div'
    const element = document.querySelector(cssSelector)
    return element.textContent
  }

  function enterText(nextChar) {
    const cssSelector =
      '#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > input'
    const element = document.querySelector(cssSelector)
    console.log(element)
    console.log(nextChar)
    element.value = element.value + nextChar
  }

  chrome.tabs.executeScript(
    { code: '(' + findTextOfSelector + `)();` },
    (text) => {
      const wpm = parseInt(document.getElementById('wpm').value)
      document.getElementById('info').textContent = `WPM: ${wpm}`
      const spaces = text[0].split(' ').length
      const all = text[0].length
      
      const time = spaces/wpm * 60 * 1000 / all
      for (let char of text[0]) {
        sleep(time);
        console.log(char)
        if (char === '\'')
          char = '\\\''
        chrome.tabs.executeScript({ code: '(' + enterText + `)('${char}');` })
      }
    }
  )
})
