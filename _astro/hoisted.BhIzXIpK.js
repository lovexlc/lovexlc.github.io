import"./hoisted.z2W5okS9.js";import{m as u}from"./RelativeTime.BwToASdr.js";import"./auth.CnZI4ngc.js";u("data-acc-time");let a,i="";const s=document.getElementById("searchInput"),m=document.getElementById("searchButton"),n=document.getElementById("searchResults");document.querySelector(".search-box");async function c(){const e=s?.value.trim();if(!e){o();return}if(e!==i){i=e;try{const t=await fetch(`/api/post/search?q=${encodeURIComponent(e)}`);if(!t.ok)throw new Error("Search failed");const r=await t.json();h(r,e)}catch(t){console.error("Search error:",t),f()}}}function h(e,t){n&&(e.length===0?n.innerHTML=`
        <div class="p-4 text-gray-500 text-center">
          未找到与 "${t}" 相关的文章
        </div>
      `:n.innerHTML=e.map(r=>`
          <a href="/post/${r.id}" class="block p-4 hover:bg-gray-50 border-b last:border-b-0">
            <div class="font-medium text-gray-900">${r.title}</div>
            <div class="text-sm text-gray-500 mt-1 line-clamp-2">${r.intro}</div>
            ${r.tags.length>0?`
              <div class="flex gap-2 mt-2 flex-wrap">
                ${r.tags.map(l=>`
                  <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">${l}</span>
                `).join("")}
              </div>
            `:""}
          </a>
        `).join(""),d())}function f(){n&&(n.innerHTML=`
      <div class="p-4 text-red-500 text-center">
        搜索出错，请稍后重试
      </div>
    `,d())}function d(){n?.classList.remove("hidden")}function o(){n?.classList.add("hidden"),i=""}s?.addEventListener("input",()=>{clearTimeout(a),a=setTimeout(c,300)});m?.addEventListener("click",()=>{clearTimeout(a),c()});document.addEventListener("click",e=>{const t=e.target;document.querySelector(".search-container")?.contains(t)||o()});s?.addEventListener("keydown",e=>{e.key==="Enter"?(clearTimeout(a),c()):e.key==="Escape"&&o()});s?.addEventListener("focus",()=>{s.value.trim()&&c()});
