const copySvg = `<svg t="1747030748345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15893" width="20" height="20" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M798.72 960H225.28a79.36 79.36 0 0 1-79.36-79.36V204.8a79.36 79.36 0 0 1 79.36-79.36h143.36a38.4 38.4 0 0 1 0 76.8H225.28a2.56 2.56 0 0 0-2.56 2.56v675.84a2.56 2.56 0 0 0 2.56 2.56h573.44a2.56 2.56 0 0 0 2.56-2.56V204.8a2.56 2.56 0 0 0-2.56-2.56h-143.36a38.4 38.4 0 0 1 0-76.8h143.36A79.36 79.36 0 0 1 878.08 204.8v675.84a79.36 79.36 0 0 1-79.36 79.36z" p-id="15894" fill="#808080"></path><path d="M368.64 64h286.72A38.4 38.4 0 0 1 693.76 102.4v122.88a38.4 38.4 0 0 1-38.4 38.4H368.64a38.4 38.4 0 0 1-38.4-38.4V102.4a38.4 38.4 0 0 1 38.4-38.4z m248.32 76.8h-209.92v46.08h209.92z" p-id="15895" fill="#808080"></path><path d="M665.6 468.48H378.88a38.4 38.4 0 1 1 0-76.8H665.6a38.4 38.4 0 0 1 0 76.8z" p-id="15896" fill="#808080"></path><path d="M665.6 632.32H378.88a38.4 38.4 0 1 1 0-76.8H665.6a38.4 38.4 0 0 1 0 76.8z" p-id="15897" fill="#808080"></path><path d="M665.6 796.16H378.88a38.4 38.4 0 1 1 0-76.8H665.6a38.4 38.4 0 0 1 0 76.8z" p-id="15898" fill="#808080"></path></svg>`;

/**
 * pre拼接
 * @param lang 语言
 * @param code 处理后的html代码串,getPre不会处理，只做拼接
 */
const getPre = (lang: string,code:string) => {
    return `<div><button class="article-content-pre-copy">${copySvg}</button><span class="article-content-pre-lang">${lang}</span><div class="language language-${lang}">${code}</div></div>`;
}

export {
    getPre
}