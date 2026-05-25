function plusPanier(id) {
    panier = JSON.parse(localStorage.getItem('panier'))
    panier[id] ++
    localStorage.setItem('panier', JSON.stringify(panier))
    afficherNbrArticlesPanier()
    $.notify('Ajout avec succès', 'success')
}

function moinsPanier(id) {
    panier = JSON.parse(localStorage.getItem('panier'))
    panier[id] --
    if(panier[id] <= 0)
        delete panier[id]
    localStorage.setItem('panier', JSON.stringify(panier))
    afficherNbrArticlesPanier()
    $.notify('Retrait avec succès', 'success')
}

function suppPanier(id) {
    panier = JSON.parse(localStorage.getItem('panier'))
    if(id in panier)
        delete panier[id]
    localStorage.setItem('panier', JSON.stringify(panier))
    afficherNbrArticlesPanier()
    $.notify('Suppression avec succès', 'success')
}

function viderPanier() {
    let reponse = window.confirm("Etes-vous sûr de vider votre panier ?")
    if(reponse) {
        localStorage.removeItem('panier')
        localStorage.setItem('panier', JSON.stringify({}))
        $.notify('Panier vidé avec succès', 'success')
    }
    afficherNbrArticlesPanier()
}

function chargerPanier(){
    let panier = localStorage.getItem('panier')
    if(panier === '{}') {
        let divPanier = document.getElementById('panier')
        divPanier.innerText = 'Votre panier est vide. Profitez des promotions pour faire le plein du panier.'
    }
    else {
        // delete panier['']
        // localStorage.setItem('panier', JSON.stringify(panier))
        panier = JSON.parse(panier)
        let tbodyDiv = document.querySelector('tbody')
        tbodyDiv.innerHTML = ''
        grandTotal = 0
        for(id in panier) {
            produit = getProduit(id)
            if(produit) {
                total = panier[id] * produit.prix
                grandTotal += total
                tbodyDiv.innerHTML += `
                <tr id="${id}">
                    <td class="photo"><img src="img/products/${produit.photo}"></td>
                    <td class="nom">${produit.nom}</td>
                    <td class="prix">${produit.prix}</td>
                    <td class="quantite">${panier[id]}</td>
                    <td class="total">${total}</td>
                    <td class="action"><button class="plus-panier"><img src="img/icons/add.png"></button><button class="minus-panier"><img src="img/icons/minus.png"></button><button class="remove-panier"><img src="img/icons/delete.png"></button></td>
                </tr>
                `
            }
        }
        let grandTotalDiv = document.querySelector('.grandtotalv')
        grandTotalDiv.innerText = grandTotal

        let btnsPlusPanier = document.querySelectorAll(".plus-panier")
        for(btn of btnsPlusPanier) {
            let id = btn.parentNode.parentNode.id
            //console.log(btn.parentNode.parentNode.id)
            btn.addEventListener("click", function(event) {
                event.preventDefault()
                plusPanier(id)
                //console.log(localStorage.getItem('panier'))
                chargerPanier()
            })
        }

        let btnsMinusPanier = document.querySelectorAll(".minus-panier")
        for(btn of btnsMinusPanier) {
            let id = btn.parentNode.parentNode.id
            btn.addEventListener("click", function(event) {
                event.preventDefault()
                moinsPanier(id)
                chargerPanier()
            })
        }

        let btnsRemovePanier = document.querySelectorAll(".remove-panier")
        for(btn of btnsRemovePanier) {
            let id = btn.parentNode.parentNode.id
            btn.addEventListener("click", function(event) {
                event.preventDefault()
                suppPanier(id)
                chargerPanier()
            })
        }
    }
}

// chargerPanier()

let btnViderPanier = document.getElementById("vider-panier")
btnViderPanier.addEventListener("click", function(event) {
    event.preventDefault()
    viderPanier()
    chargerPanier()
})

$('#confirmer-payer').click(function(){
    $.ajax({
        type: 'POST',
        url: 'confirmerPanier.html',
        //dataType: 'JSON',
        data: {panier: JSON.stringify(JSON.parse(localStorage.getItem('panier')))},
        success: function(reponse) {
            //$.notify('Envoi réussi', 'success');
            viderPanier();
            window.location.href = "paiement.html";
        },
        error: function(response) {
            $.notify('Echec: ' + response.statusText, 'error');
        }
    });
});