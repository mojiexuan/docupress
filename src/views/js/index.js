/**
 * 我在致力于寻找一种完全抛弃JavaScript的方案，但可惜的是，在用户体验感为首位的前提下，JavaScript仍然是必要的，当然，探索的脚步不会停止。
 */

/**
 * 主题切换
 */
const mjxToggleTheme = (res) => {
    if (res.checked) {
        setTheme('Light')
    } else {
        setTheme('Dark')
    }
}

/**
  * 设置html标签上的自定义属性data-theme为Dark或Light
  * @param theme 
  */
function setTheme(theme) {
    const htmlElement = document.documentElement;
    htmlElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
}

const themeSwitch = document.getElementById("theme-switch");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "Light" || currentTheme === "Dark") {
    setTheme(currentTheme);
    if(themeSwitch){
        themeSwitch.checked = currentTheme === "Light";
    }
}