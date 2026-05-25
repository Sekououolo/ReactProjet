export const produits = [
    {
        'id': 1,
        'nom': 'Appareil photo Canon', 
        'categorie': 'Electronique', 
        'prix': 35000, 
        'photo': 'product-1.jpg',
        'description': 'L\'appareil photo Canon... Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum ipsum ea iusto porro quae dolore est cumque minima voluptas assumenda modi ex inventore repellendus! Quae nobis eius at nostrum!'
    },
    {
        'id': 2,
        'nom': 'Pollo bleu', 
        'categorie': 'Habits-Mode', 
        'prix': 10000, 
        'photo': 'product-2.jpg',
        'description': 'Le pollo bleu... Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum ipsum ea iusto porro quae dolore est cumque minima voluptas assumenda modi ex inventore repellendus! Quae nobis eius at nostrum!'
    },
    {
        'id': 3,
        'nom': 'Lampe de lit', 
        'categorie': 'Meuble', 
        'prix': 25000, 
        'photo': 'product-3.jpg',
        'description': 'La lampe de lit... Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum ipsum ea iusto porro quae dolore est cumque minima voluptas assumenda modi ex inventore repellendus! Quae nobis eius at nostrum!'
    },
    {
        'id': 4,
        'nom': 'Basket Nike', 
        'categorie': 'Habits-Mode', 
        'prix': 15000, 
        'photo': 'product-4.jpg',
        'description': 'Le basket nike... Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum ipsum ea iusto porro quae dolore est cumque minima voluptas assumenda modi ex inventore repellendus! Quae nobis eius at nostrum!'
    },
    {
        'id': 5,
        'nom': 'Drone civil', 
        'categorie': 'Electronique', 
        'prix': 50000, 
        'photo': 'product-5.jpg',
        'description': 'Le drone civil... Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum ipsum ea iusto porro quae dolore est cumque minima voluptas assumenda modi ex inventore repellendus! Quae nobis eius at nostrum!'
    },
    {
        'id': 6,
        'nom': 'Smart watch', 
        'categorie': 'Electronique', 
        'prix': 30000, 
        'photo': 'product-6.jpg',
        'description': 'Le smart watch... Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum ipsum ea iusto porro quae dolore est cumque minima voluptas assumenda modi ex inventore repellendus! Quae nobis eius at nostrum!'
    },
    {
        'id': 7,
        'nom': 'Chemise noire', 
        'categorie': 'Habits-Mode', 
        'prix': 6000, 
        'photo': 'product-7.jpg',
        'description': 'La chemise noire... Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum ipsum ea iusto porro quae dolore est cumque minima voluptas assumenda modi ex inventore repellendus! Quae nobis eius at nostrum!'
    },
    {
        'id': 8,
        'nom': 'Crème Curology', 
        'categorie': 'Cosmétique', 
        'prix': 13500, 
        'photo': 'product-8.jpg',
        'description': 'La crème Curology... Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum ipsum ea iusto porro quae dolore est cumque minima voluptas assumenda modi ex inventore repellendus! Quae nobis eius at nostrum!'
    },
    {
        'id': 9,
        'nom': 'Fauteille de bureu', 
        'categorie': 'Meuble', 
        'prix': 75000, 
        'photo': 'product-9.jpg',
        'description': 'Le fauteille... Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum ipsum ea iusto porro quae dolore est cumque minima voluptas assumenda modi ex inventore repellendus! Quae nobis eius at nostrum!'
    }
]

// if(!localStorage.getItem('panier')) {
//     localStorage.setItem('panier', JSON.stringify({}))
// } 

// function chargerProduits(liste) {
//     let divProduits = document.getElementById('produits-liste')
//     divProduits.innerText = ''
//     if(liste.length==0) {
//         alert("Aucun produit n' a été trouvé")
//         //$.notify("Aucun produit n' a été trouvé")
//     } else {
//         for(produit of liste) {
//             divProduits.innerHTML += `
//             <div class="produit-badge">
//             <div class="produit-image">
//                 <img src="img/products/${produit.photo}" alt="${produit.nom}" />
//             </div>
//             <div class="produit-details">
//                 <h2>${produit.nom}</h2>
//                 <h3>${produit.prix} F</h3>
//             </div>
//             <div class="produit-bouton">
//                 <button class="ajout-panier-btn" id="${produit.id}" onclick="ajoutPanier(${produit.id})">+Panier</button>
//                 <button class="details-btn" id="${produit.id}" onclick="window.location.href='details.html?id=${produit.id}'">Détails</button>
//             </div>
//         </div>
//             `
//         }
//     }
// }

// //chargerProduits(produits)

// function filtrer() {
//     liste = [...produits]
//     let nom = document.getElementsByName('nom')[0].value
//     if(nom) 
//         liste = liste.filter(
//             function(produit) {
//                 return produit.nom.toLowerCase().includes(nom.toLowerCase())
//             }
//         )
//     let categorie = document.getElementsByName('cat')[0].value
//     if(categorie != 'Tout')
//         liste = liste.filter(
//             function(produit) {
//                 return produit.categorie == categorie
//             }
//         )
//     let prixmin = document.getElementsByName('prixmin')[0].value
//     if(prixmin)
//         liste = liste.filter(
//             function(produit) {
//                 return produit.prix >= prixmin
//             }
//         )
//     let prixmax = document.getElementsByName('prixmax')[0].value
//     if(prixmax)
//         liste = liste.filter(
//             function(produit) {
//                 return produit.prix <= prixmax
//             }
//         )
//     return liste
// }

// const form = document.querySelector('form');
// // Quand on submit
// if(form)
//     form.addEventListener("submit", function(event) {
//         // On empêche le chargement de la page (comportement par défaut)
//         event.preventDefault()
//         produits_filtres = filtrer()
//         chargerProduits(produits_filtres)
//     })

// function chargerProduits2(liste, nomCategorie) {
//     let divProduits = document.querySelector('#' + nomCategorie + ' div')
//     divProduits.innerText = ''
//     if(liste.length==0) {
//         divProduits.innerText = "Aucun produit n' a été trouvé pour cette catégorie"
//     } else {
//         for(produit of liste) {
//             divProduits.innerHTML += `
//             <div class="produit-badge">
//             <div class="produit-image">
//                 <img src="img/products/${produit.photo}" alt="${produit.nom}" />
//             </div>
//             <div class="produit-details">
//                 <h2>${produit.nom}</h2>
//                 <h3>${produit.prix} F</h3>
//             </div>
//             <div class="produit-bouton">
//                 <button class="ajout-panier-btn" id="${produit.id}" onclick="ajoutPanier(${produit.id})>+Panier</button>
//                 <button class="details-btn" id="${produit.id}" onclick="window.location.href='details.html?id=${produit.id}'>Détails</button>
//             </div>
//         </div>
//             `
//         }
//     }
// }

// function filtrerParCategorie() {
//     liste = [...produits]
//     let categorie = document.getElementsByName('cat')[0].value
//     if(categorie != 'Tout') {
//         liste = liste.filter(
//             function(produit) {
//                 return produit.categorie == categorie
//             }
//         )
//         let nom = document.getElementsByName('nom')[0].value
//         if(nom) 
//             liste = liste.filter(
//                 function(produit) {
//                     return produit.nom.toLowerCase().includes(nom.toLowerCase())
//                 }
//             )
//         let prixmin = document.getElementsByName('prixmin')[0].value
//         if(prixmin)
//             liste = liste.filter(
//                 function(produit) {
//                     return produit.prix >= prixmin
//                 }
//             )
//         let prixmax = document.getElementsByName('prixmax')[0].value
//         if(prixmax)
//             liste = liste.filter(
//                 function(produit) {
//                     return produit.prix <= prixmax
//                 }
//             )
//         chargerProduits2(liste, categorie)
//     }
//     else {
//         let nom = document.getElementsByName('nom')[0].value
//         if(nom) 
//             liste = liste.filter(
//                 function(produit) {
//                     return produit.nom.toLowerCase().includes(nom.toLowerCase())
//                 }
//             )
//         let prixmin = document.getElementsByName('prixmin')[0].value
//         if(prixmin)
//             liste = liste.filter(
//                 function(produit) {
//                     return produit.prix >= prixmin
//                 }
//             )
//         let prixmax = document.getElementsByName('prixmax')[0].value
//         if(prixmax)
//             liste = liste.filter(
//                 function(produit) {
//                     return produit.prix <= prixmax
//                 }
//             )
//         electroListe = liste.filter(
//             function(produit) {
//                 return produit.categorie == 'Electronique'
//             }
//         )
//         chargerProduits2(electroListe, 'Electronique')
//         modeListe = liste.filter(
//             function(produit) {
//                 return produit.categorie == 'Habits-Mode'
//             }
//         )
//         chargerProduits2(modeListe, 'Habits-Mode')
//         meubleListe = liste.filter(
//             function(produit) {
//                 return produit.categorie == 'Meuble'
//             }
//         )
//         chargerProduits2(meubleListe, 'Meuble')
//         cosmetiqueListe = liste.filter(
//             function(produit) {
//                 return produit.categorie == 'Cosmétique'
//             }
//         )
//         chargerProduits2(cosmetiqueListe, 'Cosmétique')
//     }
// }


// const btn_filter_per_cat = document.getElementById('btn-filter-per-cat')
// if(btn_filter_per_cat)
//     btn_filter_per_cat.addEventListener("click", function(event) {
//         // On empêche le chargement de la page (comportement par défaut)
//         event.preventDefault()
//         filtrerParCategorie()
//     })

// function getProduit(id) {
//     for(produit of produits) {
//         if(produit.id == id) return produit
//     }
//     return null
// }

// let btnsDetails = document.querySelectorAll(".details-btn")
// if(btnsDetails)
//     for(btn of btnsDetails) {
//         let id = btn.id //id = btn.getAttribute('id')
//         btn.addEventListener("click", function() {
//             window.location.href = "details.html?id=" + id
//             //window.location.replace("details.html?id=" + id)
//             //localStorage.setItem("id", id)
//         })
//     }

// function afficherNbrArticlesPanier() {
//     nbrArticles = 0
//     let panier = JSON.parse(localStorage.getItem('panier'))
//     for(id in panier) {
//         nbrArticles += panier[id]
//     }
//     let panierSpan = document.getElementById('nav-panier')
//     panierSpan.innerText = nbrArticles
// }

// function ajoutPanier(id) {
//     panier = JSON.parse(localStorage.getItem('panier'))
//     if(id in panier) {
//         panier[id] ++
//     } else {
//         panier[id] = 1
//     }
//     localStorage.setItem('panier', JSON.stringify(panier))
//     afficherNbrArticlesPanier()
//     $.notify('Ajout avec succès', 'success')
// }

// let btnsAjoutPanier = document.querySelectorAll(".ajout-panier-btn")
// if(btnsAjoutPanier)
//     for(btn of btnsAjoutPanier) {
//         let id = btn.id //id = btn.getAttribute('id')
//         btn.addEventListener("click", function() {
//             ajoutPanier(id)
//             //console.log(localStorage.getItem('panier'))
//         })
//     }


// afficherNbrArticlesPanier()