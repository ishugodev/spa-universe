const routes = {
  "/": "/page/home.html",
  "/universe": "/page/universe.html",
  "/exploration": "/page/exploration.html",
  404: "/page/404.html"
}

function route(event) {
  event = event || window.event
  event.preventDefault()
  
  window.history.pushState({}, "", event.target.href)

  handle()
}

function handle() {
  const { pathname } = window.location
  const route = routes[pathname] || routes[404]

  fetch(route)
  .then(data => data.text())
  .then(html => {
    document.querySelector('main').innerHTML = html
  })

  changeBackground(pathname)

  console.log(pathname)
}

function changeBackground(path) {
  switch(path) {
    case "/":
      document.getElementById('app').style.backgroundImage = 'url(./assets/mountains-universe-1.png)'
      break
    case "/universe":
      document.getElementById('app').style.backgroundImage = 'url(./assets/mountains-universe-2.png)'
      break
    case "/exploration":
      document.getElementById('app').style.backgroundImage = 'url(./assets/mountains-universe-3.png)'
      break
    default:
      document.getElementById('app').style.backgroundImage = 'url(./assets/mountains-universe-1.png)'
      break
  }
}

handle()

window.onpopstate = () => handle()
window.route = () => route()