/**
 * 我在致力于寻找一种完全抛弃JavaScript的方案，但可惜的是，在用户体验感为首位的前提下，JavaScript仍然是必要的，当然，探索的脚步不会停止。
 */
const root = document.documentElement
const switcher = document.getElementById('theme-switch')

// 恢复主题
root.dataset.theme = localStorage.theme || 
  (matchMedia('(prefers-color-scheme: light)').matches ? 'Light' : 'Dark')

// 同步按钮状态
switcher.checked = root.dataset.theme === 'Light'

// 切换
switcher.onchange = e =>
  localStorage.theme = root.dataset.theme =
    e.target.checked ? 'Light' : 'Dark'