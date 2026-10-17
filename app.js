(()=>{const $=id=>document.getElementById(id),KEY="ukurBidangMVP";let d={project:{},points:[],sides:[],corners:[],next:1},fix=null,watch=null,stable=[];const fields=["jobName","jobDate","village","district","surveyor","purpose"];function save(){try{localStorage.setItem(KEY,JSON.stringify(d));$("status").textContent="Data tersimpan di perangkat."}catch(e){$("status").textContent="Penyimpanan penuh/gagal. Ekspor data dan kurangi ukuran foto."}}function read(){fields.forEach(k=>d.project[k]=$(k).value.trim());save()}function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}function coords(p){return p.lat==null?"Koordinat tidak tersedia":`${p.lat.toFixed(6)}, ${p.lon.toFixed(6)}`}function render(){ $("points").innerHTML=d.points.map(p=>`<div class="item">${p.photo?`<img src="${p.photo}">`:""}<b>${p.id} · ${esc(p.type)}</b><p>${coords(p)} · Akurasi ${p.acc==null?"—":"±"+Math.round(p.acc)+" m"}</p><p>${new Date(p.time).toLocaleString("id-ID")} · ${esc(p.note)}</p><button class="alt" data-c="${p.id}">${d.corners.includes(p.id)?"Lepas sudut":"Pilih sudut"}</button><button class="alt" data-x="${p.id}">Batalkan titik</button></div>`).join("")||"Belum ada titik.";document.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{let id=b.dataset.c;d.corners=d.corners.includes(id)?d.corners.filter(x=>x!==id):[...d.corners,id];save();render()});document.querySelectorAll("[data-x]").forEach(b=>b.onclick=()=>{let id=b.dataset.x;if(confirm("Batalkan titik "+id+"?")){d.points=d.points.filter(p=>p.id!==id);d.sides=d.sides.filter(s=>s.a!==id&&s.b!==id);d.corners=d.corners.filter(x=>x!==id);save();render()}});let opts=d.points.map(p=>`<option>${p.id}</option>`).join("");$("from").innerHTML=opts;$("to").innerHTML=opts;if(d.points.length>1)$("to").selectedIndex=1;$("sides").innerHTML=d.sides.map((s,i)=>`<div class="item"><b>${s.a} → ${s.b}: ${s.len} m</b><p>${esc(s.note)}</p><button class="alt" data-s="${i}">Hapus</button></div>`).join("")||"Belum ada ukuran.";document.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{d.sides.splice(+b.dataset.s,1);save();render()});$("corners").innerHTML=d.points.filter(p=>p.type==="Patok batas").map(p=>`<label class="corner"><input type="checkbox" data-k="${p.id}" ${d.corners.includes(p.id)?"checked":""}> ${p.id} — ${coords(p)}</label>`).join("")||"Belum ada titik patok batas.";$("corners").querySelectorAll("[data-k]").forEach(c=>c.onchange=()=>{let id=c.dataset.k;d.corners=c.checked?[...new Set([...d.corners,id])]:d.corners.filter(x=>x!==id);save();render()})}function dist(a,b){let r=x=>x*Math.PI/180,dl=r(b.lat-a.lat),dn=r(b.lon-a.lon),h=Math.sin(dl/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dn/2)**2;return 12742017.6*Math.atan2(Math.sqrt(h),Math.sqrt(1-h))}function area(ps){let lat=ps.reduce((a,p)=>a+p.lat,0)/ps.length*Math.PI/180,xy=ps.map(p=>({x:p.lon*Math.PI/180*6378137*Math.cos(lat),y:p.lat*Math.PI/180*6378137})),s=0;xy.forEach((p,i)=>{let q=xy[(i+1)%xy.length];s+=p.x*q.y-q.x*p.y});return Math.abs(s/2)}function photoData(file){return new Promise(resolve=>{if(!file)return resolve("");let r=new FileReader();r.onload=()=>{let im=new Image();im.onload=()=>{let sc=Math.min(1,1200/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*sc;c.height=im.height*sc;c.getContext("2d").drawImage(im,0,0,c.width,c.height);resolve(c.toDataURL("image/jpeg",.72))};im.onerror=()=>resolve(r.result);im.src=r.result};r.readAsDataURL(file)})}
fields.forEach(k=>$(k).value="");$("jobDate").value=new Date().toISOString().slice(0,10);try{let old=JSON.parse(localStorage.getItem(KEY));if(old){d=old;fields.forEach(k=>$(k).value=d.project[k]||"")}}catch{}render();
$("saveProject").onclick=read;$("newProject").onclick=()=>{if(confirm("Buat proyek baru? Ekspor cadangan dahulu.")){d={project:{},points:[],sides:[],corners:[],next:1};fields.forEach(k=>$(k).value="");$("jobDate").value=new Date().toISOString().slice(0,10);save();render()}};
$("startGps").onclick=()=>{if(!navigator.geolocation){alert("GPS tidak didukung browser.");return}if(watch!==null)return;watch=navigator.geolocation.watchPosition(p=>{fix={lat:p.coords.latitude,lon:p.coords.longitude,acc:p.coords.accuracy,time:p.timestamp};stable.push(fix);stable=stable.slice(-3);$("coords").textContent=coords(fix);$("accuracy").textContent="Akurasi perkiraan ±"+Math.round(fix.acc)+" m";$("gpsBadge").textContent=fix.acc<=30&&stable.length===3&&stable.every(x=>x.acc<=30)?"GPS cukup stabil":"Menunggu posisi stabil"},e=>alert("GPS gagal atau izin belum diberikan: "+e.message),{enableHighAccuracy:true,maximumAge:0,timeout:20000});$("startGps").disabled=true;$("stopGps").disabled=false};
$("stopGps").onclick=()=>{if(watch!==null)navigator.geolocation.clearWatch(watch);watch=null;$("startGps").disabled=false;$("stopGps").disabled=true;$("gpsBadge").textContent="GPS dihentikan"};
$("savePoint").onclick=async()=>{let f=$("photo").files[0];if(!f){alert("Ambil foto titik terlebih dahulu.");return}let img=await photoData(f);d.points.push({id:"P"+String(d.next++).padStart(2,"0"),type:$("pointType").value,lat:fix?.lat??null,lon:fix?.lon??null,acc:fix?.acc??null,stable:stable.length===3&&stable.every(x=>x.acc<=30),time:new Date().toISOString(),note:$("note").value,photo:img});$("photo").value="";$("note").value="";save();render()};
$("saveSide").onclick=()=>{let a=$("from").value,b=$("to").value,len=+$("length").value;if(!a||!b||a===b||!Number.isFinite(len)||len<=0){alert("Pilih dua titik berbeda dan panjang meteran valid.");return}d.sides.push({a,b,len,note:$("sideNote").value});$("length").value="";$("sideNote").value="";save();render()};
$("draw").onclick=()=>{let ps=d.corners.map(id=>d.points.find(p=>p.id===id)).filter(p=>p&&p.lat!=null);if(ps.length<3){$("sketch").textContent="Pilih minimal 3 titik sudut dengan koordinat GPS.";return}let la=ps.map(p=>p.lat),lo=ps.map(p=>p.lon),mnla=Math.min(...la),mxla=Math.max(...la),mnlo=Math.min(...lo),mxlo=Math.max(...lo),W=700,H=420,pad=55,dx=mxlo-mnlo||.00001,dy=mxla-mnla||.00001,xy=ps.map(p=>({x:pad+(p.lon-mnlo)/dx*(W-2*pad),y:H-pad-(p.lat-mnla)/dy*(H-2*pad)})),poly=xy.map(p=>p.x+","+p.y).join(" "),labs=xy.map((p,i)=>`<circle cx="${p.x}" cy="${p.y}" r="6" fill="#14532d"/><text x="${p.x+8}" y="${p.y-8}" font-size="16">${ps[i].id}</text>`).join("");$("sketch").innerHTML=`<svg viewBox="0 0 ${W} ${H}"><polygon points="${poly}" fill="#9ac6a4" fill-opacity=".35" stroke="#14532d" stroke-width="3"/>${labs}<text x="620" y="28">N ↑</text></svg>`;let a=area(ps),per=ps.reduce((s,p,i)=>s+dist(p,ps[(i+1)%ps.length]),0);$("area").textContent="Estimasi luas GPS: "+a.toLocaleString("id-ID",{maximumFractionDigits:1})+" m² · Keliling GPS: "+per.toLocaleString("id-ID",{maximumFractionDigits:1})+" m. Bukan hasil batas resmi.";d.sketch={corners:d.corners,areaGps:a,perimeterGps:per};save()};
$("clear").onclick=()=>{d.corners=[];save();render();$("sketch").textContent="Pilihan sudut dikosongkan.";$("area").textContent=""};
$("export").onclick=()=>{read();let blob=new Blob([JSON.stringify(d)],{type:"application/json"}),u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download="ukur-bidang.json";a.click();URL.revokeObjectURL(u)};
$("import").onchange=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{let x=JSON.parse(r.result);if(!x.project||!Array.isArray(x.points))throw 0;if(confirm("Impor mengganti proyek aktif. Lanjutkan?")){d=x;save();fields.forEach(k=>$(k).value=d.project[k]||"");render()}}catch{alert("File ekspor tidak valid.")}};r.readAsText(f);e.target.value=""};
$("report").onclick=()=>{read();let w=window.open("","_blank");if(!w){alert("Izinkan pop-up browser untuk membuat laporan.");return}let p=d.project,pts=d.points.map(x=>`<tr><td>${x.id}</td><td>${esc(x.type)}</td><td>${coords(x)}</td><td>${x.acc==null?"—":"±"+Math.round(x.acc)+" m"}</td><td>${new Date(x.time).toLocaleString("id-ID")}</td></tr>`).join(""),sides=d.sides.map(s=>`<tr><td>${s.a}–${s.b}</td><td>${s.len} m</td><td>${esc(s.note)}</td></tr>`).join(""),photos=d.points.map(x=>`<section class="photo"><h2>${x.id} — ${esc(x.type)}</h2>${x.photo?`<img src="${x.photo}">`:""}<p>${coords(x)} · ${new Date(x.time).toLocaleString("id-ID")}</p><p>${esc(x.note)}</p></section>`).join(""),sk=$("sketch").querySelector("svg")?.outerHTML||"Sketsa belum dibuat.";w.document.write(`<!doctype html><html lang="id"><meta charset="utf-8"><title>Laporan Ukur Bidang</title><style>body{font:12px Arial;margin:22px}table{border-collapse:collapse;width:100%;margin:10px 0 20px}td,th{border:1px solid #888;padding:6px;text-align:left}.map svg{width:100%}.photo{page-break-before:always}.photo img{max-width:100%;max-height:65vh}h1{font-size:22px}.notice{border:1px solid #999;padding:10px}</style><h1>Laporan Dokumentasi dan Pengukuran Bidang</h1><p>Nama/ID: ${esc(p.jobName||"—")} · Tanggal: ${esc(p.jobDate||"—")}</p><p>Desa: ${esc(p.village||"—")} · Kecamatan/Kabupaten: ${esc(p.district||"—")}</p><p>Petugas: ${esc(p.surveyor||"—")} · Tujuan: ${esc(p.purpose||"—")}</p><h2>Sketsa bidang</h2><div class="map">${sk}</div><h2>Daftar titik</h2><table><tr><th>ID</th><th>Jenis</th><th>Koordinat</th><th>Akurasi</th><th>Waktu</th></tr>${pts}</table><h2>Ukuran sisi manual</h2><table><tr><th>Antartitik</th><th>Panjang</th><th>Catatan</th></tr>${sides}</table><div class="notice">GPS HP memiliki kesalahan posisi yang dapat mencapai beberapa meter atau lebih. Luas dan sketsa GPS adalah estimasi awal. Dokumen ini bukan pengganti penetapan batas resmi atau dokumen pertanahan.</div>${photos}<script>onload=()=>setTimeout(()=>print(),400)<\/script></html>`);w.document.close()};

// --- Experimental WebXR distance measurement ---
const arState = { session:null, gl:null, layer:null, viewerSpace:null, hitSource:null,
  refSpace:null, points:[], latestPose:null, frameHandle:null, program:null, buffer:null,
  canvas:null, buttonPending:false, startedAt:0 };

function arMessage(message){ const el=$("arStatus"); if(el) el.textContent=message; }
function arReadout(){
  const a=arState.points[0], b=arState.points[1];
  let distText="—";
  if(a&&b){
    const dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z;
    distText=(Math.sqrt(dx*dx+dy*dy+dz*dz)).toFixed(3)+" m (estimasi AR)";
  }
  $("arReadout").textContent=`Titik 1: ${a?"tersimpan":"—"} · Titik 2: ${b?"tersimpan":"—"} · Jarak: ${distText}`;
}
function arSetLength(){
  const a=arState.points[0],b=arState.points[1];
  if(!a||!b){ arMessage("Tandai dua titik terlebih dahulu."); return; }
  const dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z;
  const meters=Math.sqrt(dx*dx+dy*dy+dz*dz);
  $("length").value=meters.toFixed(2);
  $("sideNote").value="Hasil kamera AR eksperimental: "+meters.toFixed(3)+" m; wajib diverifikasi dengan meteran.";
  $("arSection").scrollIntoView({behavior:"smooth",block:"start"});
  arMessage("Jarak dipindahkan ke kolom panjang sisi. Pilih titik awal/akhir, lalu tekan Simpan ukuran sisi setelah diverifikasi.");
}
function arMakeProgram(gl){
  const vs=gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs,`attribute vec3 p; uniform mat4 mvp; void main(){ gl_Position=mvp*vec4(p,1.0); gl_PointSize=14.0; }`);
  gl.compileShader(vs);
  const fs=gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs,`precision mediump float; void main(){ gl_FragColor=vec4(1.0,0.85,0.1,1.0); }`);
  gl.compileShader(fs);
  const pr=gl.createProgram(); gl.attachShader(pr,vs); gl.attachShader(pr,fs); gl.bindAttribLocation(pr,0,"p"); gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)) throw new Error("Shader AR tidak dapat disiapkan.");
  const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,0,0]),gl.STATIC_DRAW);
  return {program:pr,buffer:buf};
}
function arDrawReticle(gl,pose,proj){
  if(!pose)return;
  const m=pose.transform.matrix;
  gl.useProgram(arState.program);
  gl.bindBuffer(gl.ARRAY_BUFFER,arState.buffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
  const mvp=new Float32Array(16);
  // projection * view * hit pose transform
  const view=arState.currentView;
  if(!view)return;
  const pv=new Float32Array(16), out=new Float32Array(16);
  mat4Multiply(pv,view.projectionMatrix,view.transform.inverse.matrix);
  mat4Multiply(out,pv,m);
  gl.uniformMatrix4fv(gl.getUniformLocation(arState.program,"mvp"),false,out);
  gl.drawArrays(gl.POINTS,0,1);
}
function mat4Multiply(out,a,b){
  for(let c=0;c<4;c++) for(let r=0;r<4;r++){
    out[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];
  }
  return out;
}
async function arStart(){
  if(!window.isSecureContext){ arMessage("AR memerlukan HTTPS. Buka melalui URL pages.dev/https, bukan file lokal."); return; }
  if(!navigator.xr){ arMessage("Browser ini tidak menyediakan WebXR. Pengukuran manual dan GPS tetap dapat digunakan."); return; }
  try{
    const supported=await navigator.xr.isSessionSupported("immersive-ar");
    if(!supported){ arMessage("Perangkat/browser ini belum melaporkan dukungan WebXR AR. Fitur manual tetap tersedia."); return; }
    const session=await navigator.xr.requestSession("immersive-ar",{
      requiredFeatures:["hit-test"],
      optionalFeatures:["dom-overlay"],
      domOverlay:{root:$("arSection")}
    });
    arState.session=session; arState.points=[]; arReadout();
    const canvas=document.createElement("canvas"); canvas.id="arCanvas"; canvas.setAttribute("aria-label","Tampilan kamera AR");
    $("arSection").insertBefore(canvas,$("arStatus"));
    const gl=canvas.getContext("webgl",{xrCompatible:true,alpha:true,depth:true,antialias:true});
    if(!gl) throw new Error("WebGL tidak tersedia.");
    await gl.makeXRCompatible();
    arState.gl=gl; arState.canvas=canvas; arState.layer=new XRWebGLLayer(session,gl); session.updateRenderState({baseLayer:arState.layer});
    arState.refSpace=await session.requestReferenceSpace("local");
    arState.viewerSpace=await session.requestReferenceSpace("viewer");
    arState.hitSource=await session.requestHitTestSource({space:arState.viewerSpace});
    const p=arMakeProgram(gl); arState.program=p.program; arState.buffer=p.buffer;
    $("arStart").disabled=true; $("arStop").disabled=false; $("arMark").disabled=false; $("arReset").disabled=false;
    arMessage("AR aktif. Arahkan kamera ke permukaan bertekstur/terang dan gerakkan HP perlahan sampai retikel kuning muncul.");
    session.addEventListener("end",arCleanup);
    session.requestAnimationFrame(arFrame);
  }catch(e){
    arCleanup();
    arMessage("AR tidak dapat dimulai: "+(e&&e.message?e.message:"dukungan/izin tidak tersedia")+". Gunakan HTTPS Chrome Android dan pastikan layanan AR perangkat aktif.");
  }
}
function arFrame(time,frame){
  const session=frame.session,gl=arState.gl,pose=frame.getViewerPose(arState.refSpace);
  if(!pose){session.requestAnimationFrame(arFrame);return;}
  const layer=arState.layer;
  gl.bindFramebuffer(gl.FRAMEBUFFER,layer.framebuffer);
  gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  const hits=frame.getHitTestResults(arState.hitSource);
  arState.latestPose=hits.length?hits[0].getPose(arState.refSpace):null;
  for(const view of pose.views){
    const vp=layer.getViewport(view); gl.viewport(vp.x,vp.y,vp.width,vp.height);
    arState.currentView=view;
    if(arState.latestPose){
      // Hit pose transform is in reference space; draw a small yellow point.
      const m=arState.latestPose.transform.matrix;
      const pv=new Float32Array(16),out=new Float32Array(16);
      mat4Multiply(pv,view.projectionMatrix,view.transform.inverse.matrix);mat4Multiply(out,pv,m);
      gl.useProgram(arState.program);gl.bindBuffer(gl.ARRAY_BUFFER,arState.buffer);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
      gl.uniformMatrix4fv(gl.getUniformLocation(arState.program,"mvp"),false,out);gl.drawArrays(gl.POINTS,0,1);
    }
  }
  session.requestAnimationFrame(arFrame);
}
function arCleanup(){
  try{if(arState.hitSource)arState.hitSource.cancel()}catch{}
  arState.session=null;arState.hitSource=null;arState.latestPose=null;arState.points=[];arState.layer=null;arState.gl=null;
  const c=$("arCanvas");if(c)c.remove();
  if($("arStart"))$("arStart").disabled=false;
  if($("arStop"))$("arStop").disabled=true;
  if($("arMark")){ $("arMark").disabled=true; $("arMark").textContent="Tandai titik (pilih permukaan)"; $("arMark").onclick=arMarkPoint; }
  if($("arReset"))$("arReset").disabled=true;
  arReadout();
}
function arMarkPoint(){
  if(!arState.latestPose){arMessage("Permukaan belum terdeteksi. Gerakkan kamera perlahan ke tanah/lantai.");return;}
  if(arState.points.length>=2){arState.points=[];}
  const m=arState.latestPose.transform.matrix;
  arState.points.push({x:m[12],y:m[13],z:m[14]});
  arReadout();
  if(arState.points.length===1){
    arMessage("Titik pertama ditandai. Arahkan kamera ke titik kedua lalu tandai lagi.");
  }else{
    arMessage("Dua titik ditandai. Verifikasi hasil dengan meteran sebelum digunakan.");
    $("arMark").textContent="Pindahkan jarak ke ukuran sisi";
    $("arMark").onclick=arSetLength;
  }
}
$("arStart").onclick=arStart;
$("arStop").onclick=()=>{if(arState.session)arState.session.end();arCleanup();arMessage("Sesi AR diakhiri.")};
$("arMark").onclick=arMarkPoint;
$("arReset").onclick=()=>{
  arState.points=[];arReadout();
  $("arMark").textContent="Tandai titik (pilih permukaan)";
  $("arMark").onclick=arMarkPoint;
  arMessage("Titik pengukuran dikosongkan.");
};
if("serviceWorker"in navigator&&location.protocol!=="file:")navigator.serviceWorker.register("./sw.js").catch(()=>{});
})();