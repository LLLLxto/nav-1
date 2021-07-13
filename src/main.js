const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [
  { logo: 'A', url: 'https://www.acfun.cn' },
  { logo: 'B', url: 'https://bilibili.com' }
]

const simplifyUrl = url => {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '') //删除以 / 开头的内容
}

const render = () => {
  $siteList.find('li:not(.last').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
  </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })

    $li.on('click', '.close', e => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()

$('.addButton').on('click', () => {
  let url = window.prompt('输入你要添加的网址')
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  console.log(url)

  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), logoType: 'text', url: url })
  render()
})

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string)
}

let c = 0
let d = 0

$('input').on('click', () => {
  if (c === 0) c = 1
  if (d === 1) d = 0
  console.log('input: c=' + c, 'd=' + d)
})
$(document).on('click', () => {
  if (d == 0 && c == 1) d = 1
  else {
    d = 0
    c = 0
  }
  console.log('document: c=' + c, 'd=' + d)
})
$(document).on('keypress', e => {
  const { key } = e
  //相当于 const key = e.key
  if (d === 0) {
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
        window.open(hashMap[i].url)
      }
    }
  }
})
