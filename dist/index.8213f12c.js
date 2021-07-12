(function () {
const $3920c17d9f5276c54162013f7118516f$var$$siteList = $('.siteList');
const $3920c17d9f5276c54162013f7118516f$var$$lastLi = $3920c17d9f5276c54162013f7118516f$var$$siteList.find('li.last');
const $3920c17d9f5276c54162013f7118516f$var$x = localStorage.getItem('x');
const $3920c17d9f5276c54162013f7118516f$var$xObject = JSON.parse($3920c17d9f5276c54162013f7118516f$var$x);
const $3920c17d9f5276c54162013f7118516f$var$hashMap = $3920c17d9f5276c54162013f7118516f$var$xObject || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://bilibili.com'
    }
];
const $3920c17d9f5276c54162013f7118516f$var$simplifyUrl = (url)=>{
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //删除以 / 开头的内容
};
const $3920c17d9f5276c54162013f7118516f$var$render = ()=>{
    $3920c17d9f5276c54162013f7118516f$var$$siteList.find('li:not(.last').remove();
    $3920c17d9f5276c54162013f7118516f$var$hashMap.forEach((node, index)=>{
        const $li = $(`<li>\n      <div class="site">\n        <div class="logo">${node.logo[0]}</div>\n        <div class="link">${$3920c17d9f5276c54162013f7118516f$var$simplifyUrl(node.url)}</div>\n        <div class="close">\n          <svg class="icon">\n            <use xlink:href="#icon-close"></use>\n          </svg>\n        </div>\n      </div>\n  </li>`).insertBefore($3920c17d9f5276c54162013f7118516f$var$$lastLi);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation();
            $3920c17d9f5276c54162013f7118516f$var$hashMap.splice(index, 1);
            $3920c17d9f5276c54162013f7118516f$var$render();
        });
    });
};
$3920c17d9f5276c54162013f7118516f$var$render();
$('.addButton').on('click', ()=>{
    let url = window.prompt('输入你要添加的网址');
    if (url.indexOf('http') !== 0) url = 'https://' + url;
    console.log(url);
    $3920c17d9f5276c54162013f7118516f$var$hashMap.push({
        logo: $3920c17d9f5276c54162013f7118516f$var$simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    $3920c17d9f5276c54162013f7118516f$var$render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify($3920c17d9f5276c54162013f7118516f$var$hashMap);
    localStorage.setItem('x', string);
};
$(document).on('keypress', (e)=>{
    const { key: key  } = e;
    //相当于 const key = e.key
    for(let i = 0; i < $3920c17d9f5276c54162013f7118516f$var$hashMap.length; i++)if ($3920c17d9f5276c54162013f7118516f$var$hashMap[i].logo.toLowerCase() === key) window.open($3920c17d9f5276c54162013f7118516f$var$hashMap[i].url);
});

})();
//# sourceMappingURL=index.8213f12c.js.map
