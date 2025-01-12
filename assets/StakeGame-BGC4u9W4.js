import{j as e,r as o,F as S,a as G,b as k}from"./index-KEA7Ocw3.js";import{m as j}from"./proxy-Bdlkacmi.js";const A=({hasBomb:a,isRevealed:i,onClick:r})=>{const h=()=>{i||r()};return e.jsx(j.div,{className:`w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 border rounded-md flex items-center justify-center cursor-pointer m-1
        ${i?a?"bg-red-500 text-white":"bg-gray-300 dark:bg-gray-700 text-black dark:text-white":"bg-blue-500 dark:bg-blue-700 text-white"}
      `,onClick:h,initial:{scale:.8},animate:{scale:1},whileHover:{scale:1.1},whileTap:{scale:.9},children:i&&(a?"💣":"💎")})},C=({onQuitGame:a,onGameOver:i,winnings:r,onCorrectTile:h})=>{const[b,m]=o.useState(p()),[g,d]=o.useState(!1),[u,f]=o.useState(0);function p(){const t=Array.from({length:5},()=>Array.from({length:5},()=>({hasBomb:!1,isRevealed:!1})));let s=0;for(;s<5;){const n=Math.floor(Math.random()*5),l=Math.floor(Math.random()*5);t[n][l].hasBomb||(t[n][l].hasBomb=!0,s++)}return t}const w=(t,s)=>{if(g||b[t][s].isRevealed)return;const n=b.map(l=>l.map(N=>({...N})));if(n[t][s].isRevealed=!0,n[t][s].hasBomb){d(!0),v(n),i(!1);return}f(l=>l+1),h(u+1),m(n),u+1===5*5-5&&(d(!0),i(!0))},v=t=>{const s=t.map(n=>n.map(l=>({...l,isRevealed:!0})));m(s)},y=()=>{m(p()),d(!1),f(0),a()};return e.jsxs("div",{className:"game-board p-4 flex flex-col items-center",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4 w-full",children:[e.jsx(j.button,{onClick:y,className:"px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600",whileHover:{scale:1.1},whileTap:{scale:.9},children:"Quit Game"}),g&&e.jsx(j.div,{className:"text-lg font-bold text-center text-red-500",initial:{opacity:0},animate:{opacity:1},children:u===5*5-5?"You Win!":"Game Over!"}),r>0&&e.jsxs(j.h3,{className:"text-lg font-bold text-green-500",initial:{opacity:0},animate:{opacity:1},children:["You won ₹",r.toFixed(2),"!"]})]}),e.jsx("div",{className:"grid grid-cols-5 gap-2 md:gap-4",children:b.map((t,s)=>t.map((n,l)=>e.jsx(A,{hasBomb:n.hasBomb,isRevealed:n.isRevealed,onClick:()=>w(s,l)},`${s}-${l}`)))})]})},M=()=>{const[a,i]=o.useState(()=>{const t=sessionStorage.getItem("totalAmount");return t?Math.round(Number(t)):11111}),[r,h]=o.useState(()=>{const t=sessionStorage.getItem("betAmount");return t?Math.round(Number(t)):100}),[c,x]=o.useState(()=>{const t=sessionStorage.getItem("winnings");return t?Math.round(Number(t)):0}),[b,m]=o.useState(""),[g,d]=o.useState(""),[u,f]=o.useState(!1);o.useEffect(()=>{sessionStorage.setItem("totalAmount",a),sessionStorage.setItem("betAmount",r),sessionStorage.setItem("winnings",c)},[a,r,c]);const p=t=>{const s=Math.round(Number(t.target.value));s<1?m("Bet amount must be at least 1 rupee."):s>a?m("Bet amount cannot exceed total amount."):(m(""),h(s))},w=()=>{c>0?i(a+c):i(a-r),h(100),x(0),m(""),d("")},v=t=>{i(t?a+c:a-r),x(0),d("")},y=t=>{const s=Math.pow(1.1,t),n=Math.round(r*s);x(n),d(`Winnings increased by ${s.toFixed(2)}x!`)};return e.jsxs("div",{className:"app-container p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100",children:[e.jsx("h1",{className:"title text-2xl font-bold mb-4",children:"Stake Game"}),e.jsxs("button",{onClick:()=>f(!u),className:"mb-4 flex items-center text-blue-500 hover:text-blue-600",children:[e.jsx(S,{className:"mr-2"}),u?"Hide Game Rules":"Show Game Rules"]}),u&&e.jsxs("div",{className:"game-rules bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-4",children:[e.jsx("h2",{className:"text-xl font-bold mb-2",children:"Game Rules"}),e.jsxs("ul",{className:"list-disc list-inside",children:[e.jsxs("li",{className:"mb-2",children:[e.jsx(G,{className:"inline text-green-500 mr-2"}),"Reveal a tile to find a gem and increase your winnings."]}),e.jsxs("li",{className:"mb-2",children:[e.jsx(k,{className:"inline text-red-500 mr-2"}),"Avoid the bombs! Revealing a bomb will end the game."]}),e.jsx("li",{className:"mb-2",children:"The more tiles you reveal without hitting a bomb, the higher your winnings will grow exponentially."}),e.jsx("li",{className:"mb-2",children:"You can quit the game at any time to secure your current winnings."}),e.jsx("li",{className:"mb-2",children:"If you hit a bomb, you lose your bet amount."})]})]}),e.jsxs("div",{className:"financial-info mb-4 flex flex-col md:flex-row items-center justify-between",children:[e.jsxs("p",{className:"text-lg",children:["Total Wallet Amount: ₹",a]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:"ml-2",children:"Bet Amount: ₹"}),e.jsx("input",{type:"number",value:r,onChange:p,min:"1",max:a,placeholder:"Enter bet amount",className:"border p-2 rounded-md ml-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"})]})]}),b&&e.jsx("p",{className:"text-red-500 mb-4",children:b}),g&&e.jsx("p",{className:"text-green-500 mb-4",children:g}),e.jsx(C,{onQuitGame:w,onGameOver:v,winnings:c,onCorrectTile:y})]})};export{M as default};
