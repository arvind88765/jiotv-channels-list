let channels = [];

const searchInput = document.getElementById("search");
const results = document.getElementById("results");
const stats = document.getElementById("stats");

async function loadData() {

const response = await fetch("channels.json");
const data = await response.json();

channels = data.result || data;

stats.innerHTML =
`${channels.length.toLocaleString()} channels loaded`;

render([]);
}

loadData();

function render(data){

if(data.length === 0){

results.innerHTML =
`
<div class="no-result">
Start typing channel name...
</div>
`;

return;
}

results.innerHTML = data.map(channel => `
<div class="card">

<div class="name">
${channel.channel_name}
</div>

<div class="id">
${channel.channel_id}
</div>

<div class="meta">
📂 ${channel.categoryName || "N/A"}
</div>

<div class="meta">
🌐 ${channel.languageName || "N/A"}
</div>

<div class="meta">
📺 ${channel.isHD ? "HD" : "SD"}
</div>

<button onclick="copyID('${channel.channel_id}')">
Copy ID
</button>

</div>
`).join("");

}

searchInput.addEventListener("input", () => {

const q = searchInput.value.trim().toLowerCase();

if(!q){
render([]);
return;
}

const filtered = channels
.filter(channel =>
channel.channel_name
.toLowerCase()
.includes(q)
)
.slice(0,100);

stats.innerHTML =
`${filtered.length} result(s)`;

render(filtered);

});

function copyID(id){

navigator.clipboard.writeText(id);

alert(`Copied Channel ID: ${id}`);

}
