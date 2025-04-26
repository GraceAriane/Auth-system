// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDWQyXTMwYWauW5nITBcWdgH0ALn5p0lUU",
authDomain: "authentification-js-dd3a2.firebaseapp.com",
projectId: "authentification-js-dd3a2",
storageBucket: "authentification-js-dd3a2.firebasestorage.app",
messagingSenderId: "858958815572",
appId: "1:858958815572:web:528038b4280eb3df1068c1"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()


console.log("voici l'authentification",auth," et voici la db", db)

const btnInscription = document.querySelector('.btn-inscription')
const btnConnection = document.querySelector('.btn-connection')
const deco = document.querySelector('.btn-deco')

const formInscription = document.querySelector('.form-inscription')
const emailInscription = document.querySelector('.email-inscription')
const mdpInscription = document.querySelector('.mdp-inscription')

const formConnection = document.querySelector('.form-connection')
const emailConnection = document.querySelector('.email-connection')
const mdpConnection = document.querySelector('.mdp-connection')



btnInscription.addEventListener('click', ()=>{

    if(formConnection.classList.contains('apparition')){
        formConnection.classList.remove('apparition')
    }

    formInscription.classList.toggle('apparition')

})

btnConnection.addEventListener('click', ()=>{

    if(formInscription.classList.contains('apparition')){
        formInscription.classList.remove('apparition')
    }

    formConnection.classList.toggle('apparition')

})

formInscription.addEventListener('submit', e=>{
    e.preventDefault()

    const mailValeur = emailInscription.value
    const mdpInscriptionValeur = mdpInscription.value

    auth.createUserWithEmailAndPassword(mailValeur, mdpInscriptionValeur)
    .then(cred =>{
        console.log(cred)
        //elle retourne une promesse qui va se resoudre en logant les credentials ie les informations de l'utilisateur
        formInscription.reset()
        formInscription.classList.toggle("apparition")
    })
})

//deco

deco.addEventListener('click', e=>{
    e.preventDefault()
    auth.signOut().then(()=>{
        console.log("Déconnecté")
    })
})

//connexion

formConnection.addEventListener('submit', e=>{
    e.preventDefault()

    const mailValeur = emailConnection.value
    const mdpConnectionValeur = mdpConnection.value

    auth.signInWithEmailAndPassword(mailValeur, mdpConnectionValeur)
    .then(cred =>{
        console.log("CONNEXION !",cred.user)
        //elle retourne une promesse qui va se resoudre en logant les credentials ie les informations de l'utilisateur
        formConnection.reset()
        formConnection.classList.toggle("apparition")
    })
})

//gerer le contenu
const h1 = document.querySelector('h1')
const info = document.querySelector('.info')
auth.onAuthStateChanged(utilisateur =>{
    if(utilisateur){
        info.innerText = "Voici le contenu privé !"
        h1.innerText = "Vous voilà de retour ! :)"
    }else{
        console.log("Utilisateur s'est déconnecté")
        info.innerText = "Contenu public."
        h1.innerText ="Bienvenue, inscrivez-vous ou connectez-vous."
    }
})
//permet de connaitre le statut de l'utilisateur(savoir s'il est connecté ou pas)