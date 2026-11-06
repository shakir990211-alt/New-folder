const categories = [
  {name:'Plumber',icon:'fa-wrench'},
  {name:'Electrician',icon:'fa-bolt'},
  {name:'Chef',icon:'fa-utensils'},
  {name:'Tailor',icon:'fa-scissors'},
  {name:'Driver',icon:'fa-car'},
  {name:'Mechanic',icon:'fa-gear'},
  {name:'Mason',icon:'fa-hammer'},
  {name:'Painter',icon:'fa-paint-roller'},
  {name:'Beauty',icon:'fa-spa'},
  {name:'Cleaner',icon:'fa-broom'},
  {name:'Tutor',icon:'fa-book'},
  {name:'IT Repair',icon:'fa-laptop'},
];

const workers = [
  {name:'Ahmed Khan',skill:'Plumber',rating:4.9,price:'Rs 1500/hr',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'},
  {name:'Sara Ali',skill:'Electrician',rating:4.8,price:'Rs 1800/hr',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'},
  {name:'Bilal Raza',skill:'Chef',rating:4.7,price:'Rs 2000/hr',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'},
  {name:'Fatima Noor',skill:'Tailor',rating:4.9,price:'Rs 1200/hr',img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'},
  {name:'Usman Tariq',skill:'Mechanic',rating:4.6,price:'Rs 1600/hr',img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'},
  {name:'Ayesha Malik',skill:'Beauty',rating:4.9,price:'Rs 2200/hr',img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'},
  {name:'Hassan Shah',skill:'Driver',rating:4.5,price:'Rs 1000/hr',img:'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400'},
  {name:'Zainab Iqbal',skill:'Tutor',rating:4.8,price:'Rs 1400/hr',img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'},
];

const jobs = [
  {title:'Fix kitchen sink leakage',category:'Plumber',location:'Karachi',budget:3500,desc:'Need experienced plumber to fix sink leakage urgently.'},
  {title:'Install ceiling fan wiring',category:'Electrician',location:'Lahore',budget:4500,desc:'Wiring for 3 ceiling fans in living room.'},
  {title:'Catering for 50 guests',category:'Chef',location:'Islamabad',budget:25000,desc:'Need chef for weekend event.'},
  {title:'Stitch 2 formal suits',category:'Tailor',location:'Karachi',budget:6000,desc:'Custom stitching for 2 suits.'},
  {title:'Full car service',category:'Mechanic',location:'Lahore',budget:8000,desc:'Oil change, brake check, general service.'},
  {title:'House painting 3 rooms',category:'Painter',location:'Islamabad',budget:18000,desc:'Interior painting of 3 bedrooms.'},
  {title:'Bridal makeup',category:'Beauty',location:'Karachi',budget:12000,desc:'Bridal makeup at home.'},
  {title:'Deep house cleaning',category:'Cleaner',location:'Lahore',budget:5000,desc:'Full house deep clean.'},
  {title:'Math tutor for grade 10',category:'Tutor',location:'Islamabad',budget:3000,desc:'Weekly math tutoring.'},
  {title:'Laptop screen repair',category:'IT Repair',location:'Karachi',budget:7000,desc:'Cracked screen replacement.'},
  {title:'Airport pickup driver',category:'Driver',location:'Lahore',budget:2500,desc:'Need driver for airport drop.'},
  {title:'Build boundary wall',category:'Mason',location:'Islamabad',budget:30000,desc:'Construct 20ft boundary wall.'},
];

function renderCategories(){
  const grid=document.getElementById('categoriesGrid');
  if(!grid) return;
  grid.innerHTML=categories.map(c=>`
    <div class="category-card" onclick="filterByCategory('${c.name}')">
      <i class="fa-solid ${c.icon}"></i>
      <h3>${c.name}</h3>
    </div>`).join('');
}

function renderWorkers(){
  const grid=document.getElementById('workersGrid');
  if(!grid) return;
  grid.innerHTML=workers.map(w=>`
    <div class="worker-card">
      <img src="${w.img}" alt="${w.name}">
      <div class="worker-info">
        <h3>${w.name}</h3>
        <p>${w.skill}</p>
        <div class="worker-meta">
          <span class="rating"><i class="fa-solid fa-star"></i> ${w.rating}</span>
          <span>${w.price}</span>
        </div>
      </div>
    </div>`).join('');
}

function renderJobs(list){
  const el=document.getElementById('jobsList');
  if(!el) return;
  if(!list.length){el.innerHTML='<p>No jobs found.</p>';return;}
  el.innerHTML=list.map(j=>`
    <div class="job-card">
      <div>
        <h3>${j.title}</h3>
        <p>${j.desc}</p>
        <div class="job-meta">
          <span><i class="fa-solid fa-tag"></i> ${j.category}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${j.location}</span>
        </div>
      </div>
      <div class="job-budget">Rs ${j.budget.toLocaleString()}</div>
    </div>`).join('');
}

function applyFilters(){
  const cat=document.getElementById('filterCategory')?.value||'all';
  const loc=document.getElementById('filterLocation')?.value||'all';
  const bud=document.getElementById('filterBudget')?.value||'all';
  const q=(document.getElementById('jobSearch')?.value||'').toLowerCase();
  let list=jobs.filter(j=>{
    if(cat!=='all'&&j.category!==cat) return false;
    if(loc!=='all'&&j.location!==loc) return false;
    if(bud==='low'&&j.budget>=5000) return false;
    if(bud==='mid'&&(j.budget<5000||j.budget>15000)) return false;
    if(bud==='high'&&j.budget<=15000) return false;
    if(q&&! (j.title+' '+j.category+' '+j.location).toLowerCase().includes(q)) return false;
    return true;
  });
  renderJobs(list);
}

function searchWorkers(q){
  q=q.toLowerCase();
  const filtered=workers.filter(w=>(w.name+' '+w.skill).toLowerCase().includes(q));
  const grid=document.getElementById('workersGrid');
  if(grid) grid.innerHTML=filtered.map(w=>`
    <div class="worker-card">
      <img src="${w.img}" alt="${w.name}">
      <div class="worker-info">
        <h3>${w.name}</h3>
        <p>${w.skill}</p>
        <div class="worker-meta">
          <span class="rating"><i class="fa-solid fa-star"></i> ${w.rating}</span>
          <span>${w.price}</span>
        </div>
      </div>
    </div>`).join('');
}

function filterByCategory(name){
  window.location.href='jobs.html?cat='+encodeURIComponent(name);
}

document.addEventListener('DOMContentLoaded',()=>{
  renderCategories();
  renderWorkers();
  renderJobs(jobs);
  ['filterCategory','filterLocation','filterBudget'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('change',applyFilters);
  });
  const jsb=document.getElementById('jobSearchBtn');
  if(jsb) jsb.addEventListener('click',applyFilters);
  const jobSearch=document.getElementById('jobSearch');
  if(jobSearch) jobSearch.addEventListener('input',applyFilters);
  const searchInput=document.getElementById('searchInput');
  const searchBtn=document.getElementById('searchBtn');
  if(searchBtn) searchBtn.addEventListener('click',()=>searchWorkers(searchInput.value));
  if(searchInput) searchInput.addEventListener('input',e=>searchWorkers(e.target.value));
  const mt=document.getElementById('menuToggle');
  if(mt){mt.addEventListener('click',()=>{const n=document.querySelector('.nav');if(n) n.style.display=n.style.display==='flex'?'none':'flex';});}
});
  const cat=params.get('cat');
  if(cat){
    const sel=document.getElementById('filterCategory');
    if(sel){sel.value=cat;applyFilters();}
  }
});
