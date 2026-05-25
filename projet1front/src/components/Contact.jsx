import React from 'react';

function Contact() {
  return (
    <main>
        <div id="auth-form">
          <h2>Contactez Nous</h2>
          <form method="post" action="">
              <div>
                <label for="lo">Entrez votre nom</label>
                <input type="text" name="lo" id="lo" />
              </div>
              <div>
                <label for="mp">email</label>
                <input type="email" name="mp" id="mp" />
              </div>
              <div>
                <label for="mp">objet</label>
                <input type="text" name="mp" id="mp" />
              </div>
              <div>
                <label for="mp">message</label>
                <input type="text" name="mp" id="mp" />
              </div>
              <div>
                <input type="submit" value="Envoyer" className="submit-btn" />
              </div>
          </form>
        </div>
        <div id="auth-img">
          <img src={require("../img/auth_img.png")} alt="Image d'authentification" />
        </div>
    </main>
  )
}

export default Contact;