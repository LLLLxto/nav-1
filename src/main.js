const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const siteList = localStorage.getItem('siteList')
const xObject = JSON.parse(siteList)

const hashMap = xObject || [
  { logo: 'Y', url: 'https://www.yuque.com/zhilengtu' },
  { logo: 'G', url: 'https://google.com' },
  { logo: 'M', url: 'https://developer.mozilla.org/zh-CN/' },
  { logo: 'Z', url: 'https://zhihu.com' },
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
  localStorage.setItem('siteList', string)
}

$(document).on('keypress', e => {
  const { key } = e
  //相当于 const key = e.key
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})

$('input').on('keypress', e => {
  e.stopPropagation()
})
