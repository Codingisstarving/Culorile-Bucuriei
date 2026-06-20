document.addEventListener("DOMContentLoaded", function () {
    // Baza de date
    const toateProdusele = [
        { logo: "cybexlogo.png", imagine: "produsul1.png", nume: "Cărucior 2 in 1 Cybex Priam V colecția Platinum 2026 Cozy Beige cadru Matt Black", pret: 26650, brand: "Cybex", culoare: "Beige" },
        { logo: "littledutchlogo.png", imagine: "produsul2.png", nume: "Tricicletă 4 în 1 cu bară de împingere - GREEN - Little Dutch", pret: 2850, brand: "Little Dutch", culoare: "Green" },
        { logo: "scootridelogo.png", imagine: "produsul3.png", nume: "Trotineta cu mâner Push and Go Highway Kick 1 Mocha Scoot&Ride", pret: 2650, brand: "Scoot&Ride", culoare: "Mocha" },
        { logo: "scootridelogo.png", imagine: "produsul4.png", nume: "Trotineta Highway Kick 3S Ash Scoot&Ride", pret: 1990, brand: "Scoot&Ride", culoare: "Ash" },
        { logo: "cybexlogo.png", imagine: "produsul5.png", nume: "Cybex Protectie de ploaie pt Balios S/Talos S", pret: 1190, brand: "Cybex", culoare: "Transparent" },
        { logo: "cottonmoose.png", imagine: "produsul6.png", nume: "Husa carucior Mini Moose Black, Cottonmoose", pret: 1950, brand: "Cottonmoose", culoare: "Black" },
        { logo: "chicco.png", imagine: "produsul7.png", nume: "Chicco Carusel muzical Bear&Bunny, 0luni+", pret: 1050, brand: "Chicco", culoare: "Mix" },
        { logo: "ortoto.png", imagine: "produsul8.png", nume: "Ortoto Covoras Ortopedic-Puzzle Nature gifts", pret: 1775, brand: "Ortoto", culoare: "Mix" },
        { logo: "chicco.png", imagine: "produsul9.png", nume: "Chicco Jucarie muzicala agatatoare StardustBunny, 0luni+", pret: 640, brand: "Chicco", culoare: "Mix" },
        { logo: "joie.png", imagine: "produsul10.png", nume: "Patut pliant cu 2 niveluri Joie Allura Shale", pret: 2250, brand: "Joie", culoare: "Shale" },
        { logo: "chicco.png", imagine: "produsul11.png", nume: "Chicco Patut atasabil Next 2 Me Forever, 3 in 1, Moongrey, 0luni+", pret: 12590, brand: "Chicco", culoare: "Moongrey" },
        { logo: "chicco.png", imagine: "produsul12.png", nume: "Cosulet multifunctional 5 in 1 Chicco Baby Hug Pro, White Cream, 0luni+", pret: 7900, brand: "Chicco", culoare: "White" },
        { logo: "littledutchlogo.png", imagine: "produsul13.png", nume: "Covor - 115 x 110 cm - Lebada - Little Dutch", pret: 2400, brand: "Little Dutch", culoare: "White" },
        { logo: "littledutchlogo.png", imagine: "produsul14.png", nume: "Banc de lucru din lemn FSC - Little Dutch LD7079", pret: 2500, brand: "Little Dutch", culoare: "Lemn" },
        { logo: "ortoto.png", imagine: "produsul15.png", nume: "Ortoto Set pentru incepatori Primele cuburi moi senzoriale, (16 piese)", pret: 730, brand: "Ortoto", culoare: "Mix" },
        { logo: "joie.png", imagine: "produsul16.png", nume: "Scaun de masa Joie Mimzy Snacker Alphabet", pret: 1750, brand: "Joie", culoare: "Mix" },
        { logo: "joie.png", imagine: "produsul17.png", nume: "Carucior ultracompact Joie Signature Parcel LX Evergreen", pret: 5990, brand: "Joie", culoare: "Green" },
        { logo: "cottonmoose.png", imagine: "produsul18.png", nume: "Geanta Quickebagr Black, Cottonmoose", pret: 1450, brand: "Cottonmoose", culoare: "Black" }
    ];

    function actualizeazaStareInimiVizuale() {
        let favorite = JSON.parse(localStorage.getItem('produse-favorite')) || [];
        document.querySelectorAll('.cartocika').forEach(card => {
            const numeEl = card.querySelector('.cardtext');
            if (!numeEl) return;
            const nume = numeEl.innerText;
            const imgInima = card.querySelector('.fbuton img');
            if (imgInima) {
                const esteFavorit = favorite.some(item => item.nume === nume);
                imgInima.setAttribute('src', esteFavorit ? 'favorite2.png' : 'favorite1.png');
            }
        });
    }

    // Dropdown
    const dropdowns = document.querySelectorAll('.dropdown');
    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function (eveniment) {
                eveniment.stopPropagation();
                dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('activ'); });
                dropdown.classList.toggle('activ');
            });

            const continut = dropdown.querySelector('.dropdown-content');
            if (continut) {
                continut.addEventListener('click', function (eveniment) {
                    eveniment.stopPropagation();
                });
            }
        });

        document.addEventListener('click', function () {
            dropdowns.forEach(dropdown => dropdown.classList.remove('activ'));
        });
    }

    document.addEventListener('click', function (eveniment) {
        
        // Adaugare in cos
        if (eveniment.target.classList.contains('incos')) {
            const card = eveniment.target.closest('.cartocika');
            if (!card) return;

            const nume = card.querySelector('.cardtext').innerText;
            const pretText = card.querySelector('.cardpret').innerText;
            const pret = parseInt(pretText.replace(/[^0-9]/g, ''));
            const imagine = card.querySelector('.produsul').getAttribute('src');

            const produsSelectat = { nume, pret, imagine, cantitate: 1 };
            let cos = JSON.parse(localStorage.getItem('cos-cumparaturi')) || [];
            const produsExistent = cos.find(item => item.nume === produsSelectat.nume);

            if (produsExistent) {
                produsExistent.cantitate += 1;
            } else {
                cos.push(produsSelectat);
            }

            localStorage.setItem('cos-cumparaturi', JSON.stringify(cos));

            const buton = eveniment.target;
            const textInitial = buton.innerText;
            
            buton.innerText = "Adăugat! ✓";
            buton.style.backgroundColor = "#28a745";
            buton.style.color = "#fff";

            setTimeout(() => {
                buton.innerText = textInitial;
                buton.style.backgroundColor = "";
                buton.style.color = "";
            }, 2000);
        }

        // Adaugare favorite
        const butonFavorit = eveniment.target.closest('.fbuton');
        if (butonFavorit) {
            const card = butonFavorit.closest('.cartocika');
            if (!card) return;

            const nume = card.querySelector('.cardtext').innerText;
            const pretText = card.querySelector('.cardpret').innerText;
            const pret = parseInt(pretText.replace(/[^0-9]/g, ''));
            const imagine = card.querySelector('.produsul').getAttribute('src');
            
            const logoEl = card.querySelector('.compania');
            const logo = logoEl ? logoEl.getAttribute('src') : 'logo.png';

            let favorite = JSON.parse(localStorage.getItem('produse-favorite')) || [];
            const indexExistent = favorite.findIndex(item => item.nume === nume);

            if (indexExistent !== -1) {
                favorite.splice(indexExistent, 1);
                butonFavorit.querySelector('img').setAttribute('src', 'favorite1.png');
            } else {
                favorite.push({ nume, pret, imagine, logo });
                butonFavorit.querySelector('img').setAttribute('src', 'favorite2.png');
            }

            localStorage.setItem('produse-favorite', JSON.stringify(favorite));
            if (document.querySelector('.fsterge')) {
                afiseazaFavoritele();
            }
        }
    });


    const lip = document.querySelector('.listadeproduse');
    const butonStergeFavorite = document.querySelector('.fsterge');

    if (lip && !butonStergeFavorite) {
        const maxproduse = 16;
        let pgcurent = 1;

        let filtreActive = {
            pretMaxim: 26650,
            branduri: [],
            culori: []
        };

        function reseteazaSiRandaza() {
            pgcurent = 1;
            afiseazaProduse(pgcurent);
            addbuton();
        }

        function initializeazaEvenimenteCheckboxes() {
            const listaBranduri = document.getElementById('lista-branduri');
            const listaCulori = document.getElementById('lista-culori');

            if (listaBranduri) {
                listaBranduri.addEventListener('change', function () {
                    const bifate = Array.from(this.querySelectorAll('.chk-brand:checked')).map(el => el.value);
                    filtreActive.branduri = bifate;
                    reseteazaSiRandaza();
                });
            }

            if (listaCulori) {
                listaCulori.addEventListener('change', function () {
                    const bifate = Array.from(this.querySelectorAll('.chk-culoare:checked')).map(el => el.value);
                    filtreActive.culori = bifate;
                    reseteazaSiRandaza();
                });
            }
        }

        function obtineProduseFiltrate() {
            return toateProdusele.filter(produs => {
                const corespundePret = produs.pret <= filtreActive.pretMaxim;
                const corespundeBrand = filtreActive.branduri.length === 0 || filtreActive.branduri.includes(produs.brand);
                const corespundeCuloare = filtreActive.culori.length === 0 || filtreActive.culori.includes(produs.culoare);
                return corespundePret && corespundeBrand && corespundeCuloare;
            });
        }

        function afiseazaProduse(pagina) {
            lip.innerHTML = "";
            const produseFiltrate = obtineProduseFiltrate();
            const start = (pagina - 1) * maxproduse;
            const final = start + maxproduse;
            const produsepepg = produseFiltrate.slice(start, final);

            if (produsepepg.length === 0) {
                lip.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #9c9c9c;">
                                    <h4>Niciun produs nu corespunde filtrelor selectate.</h4>
                                 </div>`;
            }

            let favorite = JSON.parse(localStorage.getItem('produse-favorite')) || [];

            produsepepg.forEach(produs => {
                const esteFavorit = favorite.some(item => item.nume === produs.nume);
                const imagineInima = esteFavorit ? 'favorite2.png' : 'favorite1.png';

                const cartocikahtml = `
                    <div class="cartocika">
                        <img src="${produs.logo}" class="compania">
                        <img src="${produs.imagine}" alt="" class="produsul">
                        <h6 class="cardtext">${produs.nume}</h6>
                        <h4 class="cardpret">${produs.pret.toLocaleString('ro-RO')} MDL</h4>
                        <div class="cardinteractiv">
                            <button class="incos">Adaugă în coș</button>
                            <button class="fbuton"><img src="${imagineInima}" class="miniimagini"></button>
                        </div>
                    </div>
                `;
                lip.innerHTML += cartocikahtml;
            });
        }

        function addbuton() {
            const lipNumere = document.getElementById('pag-numere');
            if (!lipNumere) return;
            lipNumere.innerHTML = "";
            
            const produseFiltrate = obtineProduseFiltrate();
            const totalPagini = Math.ceil(produseFiltrate.length / maxproduse);

            for (let i = 1; i <= totalPagini; i++) {
                const buton = document.createElement('button');
                buton.innerText = i;
                if (i === pgcurent) buton.id = "pcurent";

                buton.addEventListener('click', () => {
                    pgcurent = i;
                    afiseazaProduse(pgcurent);
                    addbuton();
                });
                lipNumere.appendChild(buton);
            }
        }
        const filtruPret = document.getElementById('slider-pret');
        const afisajPret = document.getElementById('valoare-curenta-slider');

        if (filtruPret) {
            filtruPret.addEventListener('input', function () {
                filtreActive.pretMaxim = parseInt(this.value) || 26650;
                if (afisajPret) {
                    afisajPret.innerText = `${filtreActive.pretMaxim.toLocaleString('ro-RO')} MDL`;
                }
                reseteazaSiRandaza();
            });
        }

        initializeazaEvenimenteCheckboxes();
        afiseazaProduse(pgcurent);
        addbuton();
    }

    const butonStergeTotFavorite = document.querySelector('.fsterge');
    const containerFavorite = document.querySelector('.listadeproduse');
    if (butonStergeTotFavorite && containerFavorite) {
        
        function afiseazaFavoritele() {
            let favorite = JSON.parse(localStorage.getItem('produse-favorite')) || [];
            containerFavorite.innerHTML = "";

            if (favorite.length === 0) {
                containerFavorite.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 50px 10px; color: #9c9c9c;">
                                                    <h4>Nu ai adăugat niciun produs în lista de favorite.</h4>
                                                </div>`;
                return;
            }

            favorite.forEach(produs => {
                const cartocikahtml = `
                    <div class="cartocika">
                        <img src="${produs.logo}" class="compania">
                        <img src="${produs.imagine}" alt="" class="produsul">
                        <h6 class="cardtext">${produs.nume}</h6>
                        <h4 class="cardpret">${produs.pret.toLocaleString('ro-RO')} MDL</h4>
                        <div class="cardinteractiv">
                            <button class="incos">Adaugă în coș</button>
                            <button class="fbuton"><img src="favorite2.png" class="miniimagini"></button>
                        </div>
                    </div>
                `;
                containerFavorite.innerHTML += cartocikahtml;
            });
        }

        butonStergeTotFavorite.addEventListener('click', function () {
            if (confirm("Sigur dorești să elimini toate produsele din favorite?")) {
                localStorage.removeItem('produse-favorite');
                afiseazaFavoritele();
            }
        });

        afiseazaFavoritele();
    }

    const containerCos = document.querySelector('.acosul');
    
    if (containerCos) {
        function afiseazaCosul() {
            let cos = JSON.parse(localStorage.getItem('cos-cumparaturi')) || [];
            containerCos.innerHTML = ""; 
            

            if (cos.length === 0) {
                containerCos.innerHTML = `<h4 style="text-align:center; padding:30px; color:#9c9c9c; grid-column: 1/-1;">Coșul tău de cumpărături este gol.</h4>`;
                actualizeazaTotaluri(0);
                return;
            }

            cos.forEach((produs, index) => {
                const itemHtml = `
                    <div class="cartocika" data-index="${index}">
                        <img src="${produs.imagine}" class="produsul">
                        <div class="adescriere">
                            <h5>${produs.nume}</h5>
                            <h3>${(produs.pret * produs.cantitate).toLocaleString('ro-RO')} MDL</h3>
                        </div>
                        <div class="afunctionalitate">
                            <div class="as">
                                <button class="asterge"><img src="cosdegunoi.png" class="miniimagini">Sterge</button>
                            </div>
                            <div class="acantitate">
                                <h5 class="aminus" style="cursor:pointer; user-select:none;">&mdash;</h5>
                                <h5>${produs.cantitate}</h5>
                                <h5 class="aplus" style="cursor:pointer; user-select:none;">+</h5>
                            </div>
                        </div>
                    </div>
                `;
                containerCos.innerHTML += itemHtml;
            });

            calculareaTotei();
        }

        // Livrare calcul
        function calculeazaLivrareDinUI(subtotal) {
            const butonActiv = document.querySelector('.odl .bales');
            if (!butonActiv) return 0;

            const tipLivrare = butonActiv.innerText.trim().toLowerCase();
            const inputuriIntroducere = document.querySelectorAll('.alivrare .introducere');
            const localitate = inputuriIntroducere[0] ? inputuriIntroducere[0].value.trim().toLowerCase() : "";
            if (tipLivrare.includes("magazin") || tipLivrare.includes("ridicare")) {
                return 0;
            }

            if (tipLivrare.includes("chisinau")) {
                if (localitate.includes("suburb") || localitate.includes("sat") || localitate.includes("comun")) {
                    return subtotal >= 2000 ? 0 : 150;
                }
                return subtotal >= 1200 ? 0 : 100;
            }

            if (tipLivrare.includes("moldova")) {
                if (subtotal >= 7000) return 0;
                if (localitate.includes("sat") || localitate.includes("comun")) {
                    return 150;
                }
                return 100;
            }

            return 0;
        }

        // Total
        function calculareaTotei() {
            let cos = JSON.parse(localStorage.getItem('cos-cumparaturi')) || [];
            let subtotal = cos.reduce((sum, item) => sum + (item.pret * item.cantitate), 0);
            
            const costLivrare = calculeazaLivrareDinUI(subtotal);
            const totalGeneral = subtotal + costLivrare;

            const subtotalElement = document.querySelector('.sl:nth-child(1) h6:nth-child(2)');
            const livrareElement = document.querySelector('.sl:nth-child(2) h6:nth-child(2)'); 
            const totalElement = document.querySelector('.ctotal h5:nth-child(2)');
            
            if (subtotalElement) subtotalElement.innerText = `${subtotal.toLocaleString('ro-RO')} MDL`;
            if (totalElement) totalElement.innerText = `${totalGeneral.toLocaleString('ro-RO')} MDL`;
            
            if (livrareElement) {
                livrareElement.innerText = costLivrare === 0 ? "GRATUIT" : `${costLivrare} MDL`;
            }
        }

        // Sterge,plus,minus
        containerCos.addEventListener('click', function (e) {
            let cos = JSON.parse(localStorage.getItem('cos-cumparaturi')) || [];
            const card = e.target.closest('.cartocika');
            if (!card) return;
            
            const index = card.getAttribute('data-index');

            if (e.target.classList.contains('aplus')) {
                cos[index].cantitate += 1;
            } 
            else if (e.target.classList.contains('aminus')) {
                if (cos[index].cantitate > 1) {
                    cos[index].cantitate -= 1;
                } else {
                    cos.splice(index, 1);
                }
            } 
            else if (e.target.closest('.asterge')) {
                cos.splice(index, 1);
            }

            localStorage.setItem('cos-cumparaturi', JSON.stringify(cos));
            afiseazaCosul();
        });

        const butoaneLivrare = document.querySelectorAll('.odl button');
        butoaneLivrare.forEach(buton => {
            buton.addEventListener('click', function () {
                butoaneLivrare.forEach(b => {
                    b.classList.remove('bales');
                    b.classList.add('lopt');
                });
                this.classList.remove('lopt');
                this.classList.add('bales');
                calculareaTotei();
            });
        });
        const butoaneAchitare = document.querySelectorAll('.optiuniachitare button');
butoaneAchitare.forEach(buton => {
    buton.addEventListener('click', function () {
        butoaneAchitare.forEach(b1 => { 
            b1.classList.remove('bales');
            b1.classList.add('aopt');
        });
        this.classList.remove('aopt');
        this.classList.add('bales');
    });
});
        const inputLocalitate = document.querySelectorAll('.alivrare .introducere')[0];
        if (inputLocalitate) {
            inputLocalitate.addEventListener('input', function() {
                calculareaTotei();
            });
        }

        afiseazaCosul();
    }


    actualizeazaStareInimiVizuale();
    
});