function chargerDetailsProduit(id) {
    produit = getProduit(id)
    let details_photo = document.querySelector('#details-photo img')
    details_photo.src = `img/products/${produit.photo}`
    details_photo.alt = produit.nom
    let details_nom_cat = document.getElementById('details-nom-cat')
    details_nom_cat.innerHTML = `
        <h2>${produit.nom}</h2>
        <span>${produit.categorie}</span>
    `
    let details_prix = document.getElementById('details-prix')
    details_prix.innerHTML = `
        <span>${produit.prix}</span> F CFA
    `
    let details_description = document.getElementById('details-description')
    details_description.innerText = produit.description
    let btn_ajout_panier = document.querySelector('.ajout-panier-btn')
    btn_ajout_panier.id = id
    btn_ajout_panier.addEventListener("click", function() {
        ajoutPanier(id)
    })
}

//let id = localStorage.getItem("id");
//console.log(window.location.search)
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('id')) {
    id = urlParams.get('id')
    chargerDetailsProduit(id)
}

