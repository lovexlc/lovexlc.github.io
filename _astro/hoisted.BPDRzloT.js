import{g}from"./hoisted.z2W5okS9.js";import{m as y}from"./RelativeTime.BwToASdr.js";import"./auth.CnZI4ngc.js";y("data-acc-time");let a,i="",d=[];const s=document.getElementById("searchInput"),v=document.getElementById("searchButton"),n=document.getElementById("searchResults");document.querySelector(".search-box");async function p(){try{d=await g()}catch(e){console.error("Failed to load posts:",e)}}function x(e){if(!e)return[];const t=e.toLowerCase();return d.filter(r=>{const o=r.title.toLowerCase().includes(t),m=r.intro?.toLowerCase().includes(t),h=r.tags.some(f=>f.toLowerCase().includes(t));return o||m||h})}async function c(){const e=s?.value.trim();if(!e){l();return}if(e!==i){i=e;try{const t=x(e);L(t,e)}catch(t){console.error("Search error:",t),E()}}}function L(e,t){n&&(e.length===0?n.innerHTML=`
        <div class="p-4 text-gray-500 text-center">
          未找到与 "${t}" 相关的文章
        </div>
      `:n.innerHTML=e.map(r=>`
          <a href="/post/${r.id}" class="block p-4 hover:bg-gray-50 border-b last:border-b-0">
            <div class="font-medium text-gray-900">${r.title}</div>
            <div class="text-sm text-gray-500 mt-1 line-clamp-2">${r.intro||""}</div>
            ${r.tags.length>0?`
              <div class="flex gap-2 mt-2 flex-wrap">
                ${r.tags.map(o=>`
                  <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">${o}</span>
                `).join("")}
              </div>
            `:""}
          </a>
        `).join(""),u())}function E(){n&&(n.innerHTML=`
      <div class="p-4 text-red-500 text-center">
        搜索出错，请稍后重试
      </div>
    `,u())}function u(){n?.classList.remove("hidden")}function l(){n?.classList.add("hidden"),i=""}p();s?.addEventListener("input",()=>{clearTimeout(a),a=setTimeout(c,300)});v?.addEventListener("click",()=>{clearTimeout(a),c()});document.addEventListener("click",e=>{const t=e.target;document.querySelector(".search-container")?.contains(t)||l()});s?.addEventListener("keydown",e=>{e.key==="Enter"?(clearTimeout(a),c()):e.key==="Escape"&&l()});s?.addEventListener("focus",()=>{s.value.trim()&&c()});
