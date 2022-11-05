const navbar = document.querySelector('header.header');
// const hasilTest = document.querySelectorAll('div.div-info');
const body = document.querySelector('body');
const search = document.querySelector('form.search');
const board = document.querySelector('div.board');
let childDisplay = [];
let tampilkan = false;

function pendataaan(parent) {
    let jumlahAnak = parent.childElementCount;
    let tambahkan = true;
    for (let i = 0; i < jumlahAnak; i++) {
        childDisplay.forEach((element) => {
            if (parent.children[i].className == element) {
                tambahkan = false;
            }
        })
        tambahkan == true ? childDisplay.push(parent.children[i].className) : tambahkan = true;
        if (parent.children[i].childElementCount != 0) {
            pendataaan(parent.children[i]);
        }
    }
};

const t1Day = document.querySelector("div.timer1 div.div-clock span.day");
const t1Hour = document.querySelector("div.timer1 div.div-clock span.hour");
const t1Mint = document.querySelector("div.timer1 div.div-clock span.mint");
const t1Sec = document.querySelector("div.timer1 div.div-clock span.sec");
const t2Day = document.querySelector("div.timer2 div.div-clock span.day");
const t2Hour = document.querySelector("div.timer2 div.div-clock span.hour");
const t2Mint = document.querySelector("div.timer2 div.div-clock span.mint");
const t2Sec = document.querySelector("div.timer2 div.div-clock span.sec");

let deadline = new Date("NOV 05, 2022 16:00:00").getTime();
  
let x = setInterval(function() {
  
let now = new Date().getTime();
let t = deadline - now;
let days = Math.floor(t / (1000 * 60 * 60 * 24));
let hours = Math.floor((t % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((t % (1000 * 60)) / 1000);
if (days < 10) days = "0" + days;
if (hours < 10) hours = "0" + hours;
if (minutes < 10) minutes = "0" + minutes;
if (seconds < 10) seconds = "0" + seconds;
t1Day.innerHTML = days ;
t1Hour.innerHTML = hours;
t1Mint.innerHTML = minutes; 
t1Sec.innerHTML = seconds; 
t2Day.innerHTML = days ;
t2Hour.innerHTML = hours;
t2Mint.innerHTML = minutes; 
t2Sec.innerHTML = seconds; 
if (t < 0) {
        clearInterval(x);
        tampilkan = true;
        t1Day.innerHTML = '00';
        t1Hour.innerHTML = '00';
        t1Mint.innerHTML = '00'; 
        t1Sec.innerHTML = '00'; 
        t2Day.innerHTML = '00';
        t2Hour.innerHTML = '00';
        t2Mint.innerHTML = '00'; 
        t2Sec.innerHTML = '00'; 
    }
}, 1000);

function resultBox(cekHasil) {
    let keluaran;
    if (cekHasil.Hasil.toUpperCase() == "LOLOS") {
        keluaran = `
        <!-- hidden ??? -->
        <div class="over-result kotak-result md:hidden bg-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" class="w-5 h-5">
                <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>            
            <span class="keterangan text-emerald-700">LOLOS</span>
        </div>`;
    } else if (cekHasil.Hasil.toUpperCase() == "GAGAL") {
        keluaran = `
        <!-- hidden ??? -->
        <div class="over-result kotak-result md:hidden bg-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" class="w-5 h-5">
                <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>            
            <span class="keterangan text-red-700">GAGAL</span>
        </div>`;
    }
    return keluaran;
};

function ucapan(cekHasil) {
    let keluaran;
    if (cekHasil.Hasil.toUpperCase() == "LOLOS") {
        keluaran = `
        <!-- hidden ??? -->
        <div class="congrat"></div>`;
    } else if (cekHasil.Hasil.toUpperCase() == "GAGAL") {
        keluaran = `
        <!-- hidden ??? -->
        <div class="never-giveUp"></div>`;
    }
    return keluaran;
};

function resultTabel(cekHasil) {
    let subHasil;
    if (cekHasil.Hasil.toUpperCase() == "LOLOS") {
        subHasil = `
        <!-- hidden ??? -->
        <div class="kotak-result bg-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" class="w-5 h-5">
                <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
            <span class="keterangan text-emerald-700">LOLOS</span>
        </div>`;
    } else if (cekHasil.Hasil.toUpperCase() == "GAGAL") {
        subHasil = `
        <!-- hidden ??? -->
        <div class="kotak-result bg-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" class="w-5 h-5">
                <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>          
            <span class="keterangan text-red-700">GAGAL</span>
        </div>`;
    }
    return `
        <div class="over-table">
            <table class="table-auto w-full">
                <thead class="border-b p-4 border-slate-300">
                <tr>
                    <th><span class="p-4">NIM</span></th>
                    <th>DEVISI</th>
                    <th>TIM</th>
                    <th>HASIL</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr>
                    <td>${cekHasil.Nim}</td>
                    <td>${cekHasil.Divisi}</td>
                    <td>${cekHasil.Tim}</td>
                    <td>
                        ${subHasil}    
                    </td>
                </tr>
                </tbody>
            </table>
        </div>`;
};

function showCard(masukan) {
    let box = resultBox(masukan);
    let greeting = ucapan(masukan);
    let tabel = resultTabel(masukan);
    return `
    <div class="overlay">
        <div class="blur-layer"></div>
        <span class="close-btn">Tutup</span>
        <div class="display-iden">
            <div class="mid-layer">
                <div class="mb-1 flex mx-auto">
                    <span class="text-2xl font-bold text-biru-uii">Data Diri Peserta</span>
                    <span class="overlay-no1">1</span>
                </div>
                <span class="over-name">${masukan.Nama}</span>
                ${box}
                <div class="flex flex-col items-center">
                    ${greeting}
                    ${tabel}
                </div>
                <div class="div-table-out">
                    <span class="font-bold">Identitas Peserta</span>
                    <div class="div-table-mid">
                        <div class="div-table-inner">
                            <span class="font-bold">NIM</span>
                            <span>${masukan.Nim}</span>
                        </div>
                        <div class="div-table-inner">
                            <span class="font-bold">DIVISI</span>
                            <span>${masukan.Divisi}</span>
                        </div>
                        <div class="div-table-inner">
                            <span class="font-bold">TIM</span>
                            <span>${masukan.Tim}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// let info;
// hasilTest.forEach((aktif) => {
//     aktif.classList.contains("hidden") == false ? info = aktif : "";
// });
// INTERACTION ==============================
body.addEventListener("click", function(pil) {
    let overlay;
    let tutup = true;
    const display = document.querySelector('div#display');
    
    if (display.childElementCount != 0) {
        overlay = document.querySelector('div.display-iden');
        childDisplay.push(overlay.className);
        pendataaan(overlay);
    }
    childDisplay.forEach((element) => {
        if (element == pil.target.className) {
            tutup = false;
        }
    })
    if (tutup && display.childElementCount != 0) {
        display.innerHTML = "";
        // display.classList.add("hidden");
    }
    childDisplay = [''];
});

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 0) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
});

let input;
let hasilTest = [];
let valid = true;
// const label = document.querySelector('label.l-input');
const notice = document.querySelector("div.notice");
const ujicoba = document.querySelector("div.board span.ujicobaZZ");

search.addEventListener('submit', function(pil) {
    pil.preventDefault();
    pil.stopPropagation();
    input = document.querySelector('input#nim');
    if (tampilkan == false) {
        input.classList.add('invalid-input'); 
        notice.innerHTML = getInvalids("notTime");
    } else {
        let keyword = input.value.trim();
        if (input.value == "") {
            input.classList.add('invalid-input'); 
            notice.innerHTML = getInvalids("kosong");
        } else {
            let clean = DOMPurify.sanitize(keyword, {RETURN_DOM: false});
            clean = escapeHtmlEntities(clean);
            valid = checkNumber(clean);
            // ujicoba.innerHTML = clean;
            // hasilTest = await getHasil(clean);
            if (valid == false) {
                input.classList.add('invalid-input'); 
                notice.innerHTML = getInvalids("inval");
            } else {
                try {
                    hasilTest[0] = checkArray(clean);
                    if (hasilTest[0] == undefined) {
                        input.classList.add('invalid-input'); 
                        notice.innerHTML = getInvalids("notfound");
                    } else {
                        input.classList.remove('invalid-input');
                        notice.innerHTML = "";
                        let card = getBoard(hasilTest[0]);
                        board.innerHTML = card;
                        let info = document.querySelector('.div-info');
                        info.classList.add('animate-muncul');
                    }
                } catch (err) {
                    input.classList.add('invalid-input'); 
                    notice.innerHTML = getInvalids("");
                    console.error(err);
                }
            }
        }
    }
    // try {
    // } catch(err) {
    //     console.log(err);
    //     if (err == "Error: Not Found") {
    //         input.classList.add('invalid-input'); 
    //         notice.innerHTML = getInvalids("notfound");
    //     } else {
    //         input.classList.add('invalid-input'); 
    //         notice.innerHTML = getInvalids("");
    //     }
    // }   
    // if (pil.target.classList.contains("btn-search") == true) {
    // }
});

function checkNumber(val) {
    let list = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    var status = true;

    for (i=0; i<=val.length-1; i++)
    {
        // jika karakter ke-i termasuk dalam array, maka nilainya TRUE
        // sedang jika tidak, nilai FALSE
        if (val[i] in list) cek = true;
        else cek = false;
   
        // kenakan operasi AND
        status = status && cek;
        if (status == false) {   
            return false;
        }
        else {
            return true; 
        } 
    }
}

function checkArray(masukan) {
    let hash = undefined;
    data.forEach(d => {
        if (d.Nim == masukan) hash = d
    });
    return hash;
}

function getInvalids(masukan) {
    let keluaran ="";
    if (masukan == "kosong") {
        keluaran = `
        <span class="text-xs ml-1 font-medium text-red-700 before:content-['*']">masukan tidak boleh kosong</span>`;
    } else if (masukan == "notfound") {
        keluaran = `
        <span class="text-xs ml-1 font-medium text-red-700 before:content-['*']">nim mahasiswa tidak terdaftar</span>`;
    } else if (masukan == "notTime") {
        keluaran = `
        <span class="text-xs ml-1 font-medium text-red-700 before:content-['*']">belum memasuki waktu pengumuman</span>`;
    } else if (masukan == "inval") {
        keluaran = `
        <span class="text-xs ml-1 font-medium text-red-700 before:content-['*']">inputan user tidak valid!!!</span>`;
    } else {
        keluaran = `
        <span class="text-xs ml-1 font-medium text-red-700 before:content-['*']">something is wrong</span>`;
    }
    return keluaran;
}

board.addEventListener("click", function(pil) {
    let cards = '';
    const display = document.querySelector('div#display');
    if (pil.target.classList.contains("detail") == true) {
        cards += showCard(hasilTest[0]);
        // display.innerHTML = cards;
        display.setHTML(cards, { sanitizer: new Sanitizer() })
        // display.classList.remove("hidden");
    } 

    pil.preventDefault();
    pil.stopPropagation();
});

function getHasil(keyword) {
    return fetch("http://localhost:8080/api/robotics/" + keyword,
        {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'*'
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText); // dilempar ke line 207
            }
            return response.json(); 
        })
        .then(response => {
            if (response.Response === "False") {
                throw new Error(response.Error); // dilempar ke line 207
            }
            // console.log(response);
            return response;
        })
}

function getBoard(hasil) {
    let kondisi = hasil.Hasil;
    if (kondisi.toUpperCase() == "LOLOS") {
        return ingpo2(hasil);
    } else if (kondisi.toUpperCase() == "GAGAL") {
        return ingpo1(hasil);
    } else {
        return ingpo3(hasil);
    }
}

function ingpo1(m) {
    return `
    <!-- satu -->
    <div class="div-info">
        <span class="font-bold text-black">Informasi Hasil Seleksi</span>
        <div class="w-full mt-2">
            <div class="div-info-main justify-between border-slate-600">
                <span class="text-red-900">${m.Nama}</span>
                <div class="div-info-ket">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                    </svg>        
                    <span class="span-lolos text-red-700">${m.Hasil}</span>
                </div>
            </div>
        </div>
        <!-- success-line -->
        <div class="w-full flex coba">
            <div class="line-result bg-red-600"></div>
            <div class="sub-div-detail">
                <a href="#display">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" class="w-5 h-5 inline animate-bounce mt-1">
                        <path fill-rule="evenodd" d="M5.23 15.79a.75.75 0 01-.02-1.06l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 11-1.08 1.04L10 11.832 6.29 15.77a.75.75 0 01-1.06.02zm0-6a.75.75 0 01-.02-1.06l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 11-1.08 1.04L10 5.832 6.29 9.77a.75.75 0 01-1.06.02z" clip-rule="evenodd"/></svg>
                    <span class="detail text-red-900">Detail</span>
                </a>
            </div>
        </div>
    </div>`;
}

function ingpo2(m) {
    return `
    <!-- dua -->
    <div class="div-info">
        <span class="font-bold text-black">Informasi Hasil Seleksi</span>
        <div class="w-full mt-2">
            <div class="div-info-main justify-between border-slate-600">
                <span class="text-green-900">${m.Nama}</span>
                <div class="div-info-ket">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>          
                    <span class="span-lolos text-emerald-700">${m.Hasil}</span>
                </div>
            </div>
        </div>
        <!-- success-line -->
        <div class="w-full flex">
            <div class="line-result bg-green-600"></div>
            <div class="sub-div-detail">
                <a href="#display">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" class="w-5 h-5 inline animate-bounce mt-1">
                        <path fill-rule="evenodd" d="M5.23 15.79a.75.75 0 01-.02-1.06l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 11-1.08 1.04L10 11.832 6.29 15.77a.75.75 0 01-1.06.02zm0-6a.75.75 0 01-.02-1.06l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 11-1.08 1.04L10 5.832 6.29 9.77a.75.75 0 01-1.06.02z" clip-rule="evenodd"/></svg>
                    <span class="detail text-green-900">Detail</span>
                </a>
            </div>
        </div>
    </div>`;
}

function ingpo3(m) {
    return `
    <!-- tiga -->
    <div class="div-info animate-pulse">
        <span class="font-bold text-black">Informasi Hasil Seleksi</span>
        <div class="w-full mt-2 mb-4">
            <div class="div-info-main justify-center border-biru-uii">
                <span class="text-biru-uii text-center">.....</span>
            </div>
        </div>
    </div>`;
}