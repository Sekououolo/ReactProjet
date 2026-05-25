import React from 'react'

function Footer() {
  return (
    <footer>  
        <div id="contacts">
            <h2>Nous contactez ?</h2>
            <b>Tél (whatsapp):</b>  +223 60 60 60 60 <br/>
            <b>Adresse:</b> Badalabougou, Rue 15, Porte 10. <br/>
            <b>Email:</b> <a href="mailto:contact@eshop.ml">contact@eshop.ml</a>
        </div>
        <div id="reseaux-sociaux">
            <h2>Nous suivre ?</h2>
            <p>
                <img src={require("../img/icons/facebook.png")} alt="Facebook" />
                <img src={require("../img/icons/twitter.png")} alt="Twitter" />
                <img src={require("../img/icons/vimeo.png")} alt="Vimeo" />
                <img src={require("../img/icons/flickr.png")} alt="Flickr" />
                <img src={require("../img/icons/rss.png")} alt="RSS" />
            </p>
        </div>
        <div id="copyright">
            <h3>Copyright &copy; Hamidou KASSOGUE @ 2023</h3>
        </div>            
    </footer>
  )
}

export default Footer;