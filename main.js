const isShowing = {}

const checkboxes = [...document.querySelectorAll('input')]
checkboxes.map(checkbox => {
  checkbox.addEventListener('change', handleCheck)
})

const checkAll = document.getElementById('check-all')
const uncheckAll = document.getElementById('uncheck-all')

checkAll.addEventListener('click', () => {
  checkboxes.forEach(checkbox => {
    checkbox.setAttribute('checked', 'checked')

    var event = new Event('change');
    checkbox.dispatchEvent(event);
  })
})

uncheckAll.addEventListener('click', () => {
  checkboxes.forEach(checkbox => {
    checkbox.removeAttribute('checked')

    var event = new Event('change');
    checkbox.dispatchEvent(event);
  })
})

function handleCheck(ev) {
  const isOn = ev.target.checked
  const property = ev.target.value
  isShowing[property] = isOn

  output.textContent = JSON.stringify(isShowing)

  filterImages()
}

function filterImages() {
  const images = [...document.querySelectorAll('img')]
  images.forEach(img => {
    let [year, month, day, mod, week] = img.src.split('-')

    year = year.split("img/")[1]    
    week = week.split(".png")[0]

    cohort = year + '-' + month + '-' + day
    if (isShowing[mod] && isShowing[week]) {
      console.log('showing', img.src.substring(60))
      img.classList.remove('hidden')
    } else {
      console.log(' hiding', img.src.substring(60))
      img.classList.add('hidden')
    }
  })
}

