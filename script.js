const app = document.getElementById("app");

const users = [
    {
        email: "test@test.com",
        phone: "99999999999",
        ref: 100,
        refBy: null
    },
    {
        email: "tust@tust.com",
        phone: "99999999999",
        ref: 200,
        refBy: 100
    },
    {
        email: 'tost@tost.com',
        phone: '99999999999',
        ref: 300,
        refBy: 200
    }
];

const getUser = (userData) => {
    return users.find((user) => user.email === userData.email);
};

const getTotalSubscribers = (userData) => {
    return users.filter((user) => user.refBy === userData.ref).length;
};

const showInvite = (userData) => {
    app.innerHTML = `
    <main>
      <h3>Inscrição confirmada!</h3>
      <p>
        Convide mais pessoas e concorra a prêmios! <br/>
        Compartilhe o link e acompanhe as inscrições:
      </p>
      <div id="copy-area">
      <div class="input-group">
        <label for="link">
          <img src="link.svg" alt="Link icon">
        </label>
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" readonly>
      </div>
      </div>
    </main>
    <section class="stats">
        <h4>${getTotalSubscribers(userData)}</h4>
        <p>Inscrições feitas!</p>
    </section>
    `;
    app.setAttribute("class", "page-invite");
    updateImageLinks();

    document.getElementById("copy-area").style.userSelect = "none";
    document.getElementById("link").style.userSelect = "none";

    document.getElementById("copy-area").addEventListener("click", copyLink);
    document.querySelector('label[for="link"]').addEventListener("click", copyLink);
    document.getElementById("link").addEventListener("click", copyLink);

    document.getElementById("copy-area").addEventListener("mousedown", (e) => {
        e.preventDefault();  
    });
    document.querySelector('label[for="link"] img').addEventListener("click", (e) => {
        e.preventDefault();  
        copyLink(); 
    });
};

const copyLink = () => {
    const linkInput = document.getElementById("link");

    navigator.clipboard.writeText(linkInput.value).then(() => {
        showCopyConfirmation();
    }).catch(err => console.error("Erro ao copiar: ", err));
};

const showCopyConfirmation = () => {
    const confirmation = document.createElement("div");
    confirmation.classList.add("copy-confirmation");
    confirmation.innerText = "Link copiado com sucesso!";
    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.remove();
    }, 2000);
};

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 4000),
        refBy: 100
    };
    users.push(newUser);
    return newUser;
};

const formAction = () => {
    const form = document.getElementById("form");
    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const userData = {
            email: formData.get("email"),
            phone: formData.get("phone"),
        };
        const user = getUser(userData);
        if (user) {
            showInvite(user);
        } else {
            const newUser = saveUser(userData);
            showInvite(newUser);
        }
    };
};

const updateImageLinks = () => {
    document.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src");
        if (src && !src.startsWith("http")) {
            img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
        }
    });
};

const startApp = () => {
    const content = `
    <main>
    <section class="about">
      <div class="section-header">
        <h2>Sobre o evento</h2>
        <span class="badge">AO VIVO</span>
      </div>
      <p>
        Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
        <br/><br/>Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito 
      </p>
    </section>

    <section class="registration">
      <h2>Inscrição</h2>

      <form id="form">
        <div class="input-wrapper">
          <div class="input-group">
            <label for="email">
              <img src="mail.svg" alt="Email icon">
            </label>
            <input type="email" id="email" name="email" placeholder="E-mail">
          </div>

          <div class="input-group">
            <label for="phone">
              <img src="phone.svg" alt="Phone icon">
            </label>
            <input type="text" id="phone" name="phone" placeholder="Telefone">
          </div>
        </div>

        <button>
          Confirmar
          <img src="arrow.svg" alt="Arrow right">
        </button>
      </form>
    </section>
  </main>
  `;
    app.innerHTML = content;
    app.setAttribute("class", "page-start");
    updateImageLinks();
    formAction();
};

document.querySelector("header").onclick = () => startApp();

startApp(); //so pro git hub desbugar//