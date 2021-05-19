var items = [
    {id:1, type: 'Кот полосатый', color: 'Коричневый окрас', favorite: false, buy: false, perCent: '-40%', age: 2, countFoot: 4, price: 30000, img: './img/cat1.png'},
    {id:2, type: 'Кот полосатый', color: 'Коричневый окрас', favorite: false, buy: false, age: 3, countFoot: 4, price: 40000, img: './img/cat2.png'},
    {id:3, type: 'Кот полосатый', color: 'Коричневый окрас', favorite: false, buy: false, age: 2, countFoot: 4, price: 20000, img: './img/cat3.png'},
    {id:4, type: 'Кот полосатый', color: 'Коричневый окрас', favorite: false, buy: false, age: 1, countFoot: 4, price: 25000, img: './img/cat1.png'},
    {id:5, type: 'Кот полосатый', color: 'Коричневый окрас', favorite: false, buy: false, perCent: '-40%',age: 3, countFoot: 4, price: 30000, img: './img/cat3.png'},
    {id:6, type: 'Кот полосатый', color: 'Коричневый окрас', favorite: false, buy: false, age: 4, countFoot: 4, price: 10000, img: './img/cat2.png'},
    
]

var sortDefaultPrice = true 
var sortDefaultAge = true 

function priceButton() {
    if(sortDefaultPrice){
    items.sort((prev,next)=>prev.price-next.price)
    sortDefaultPrice = false
    } else {
        sortDefaultPrice = true
        items.sort((prev,next)=>prev.id-next.id)
    }
    
    rerender()
}
function ageButton() {
    if(sortDefaultAge){
    items.sort((prev,next)=>prev.age-next.age)
    sortDefaultAge = false
    } else {
        sortDefaultAge = true
        items.sort((prev,next)=>prev.id-next.id)
    }
    
    rerender()
}

window.document.getElementsByClassName('price')[0].addEventListener('click', () => {priceButton()})
window.document.getElementsByClassName('age')[0].addEventListener('click', () => {ageButton()})

window.addEventListener('scroll', function(e) {
    if(this.window.pageYOffset>200){
        document.getElementsByClassName('backUp')[0].style.display = 'block'
    }else{
        document.getElementsByClassName('backUp')[0].style.display = 'none'
    }
  });

window.document.getElementsByClassName('backUp')[0].addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})





window.document.getElementsByClassName('buttonSubscribe')[0].addEventListener('click', () => {
    var value = window.document.getElementsByClassName('inputSubscribe')[0].value
    if(value.match('@') && (value.match('.ru') || value.match('.com'))){
        window.document.getElementsByClassName('inputSubscribe')[0].style.border = '0px solid black'
    }else{
        window.document.getElementsByClassName('inputSubscribe')[0].style.border = '5px solid red'
    }
})



function rerender(){
    var newItems = items.map(item=>`
        <div class="container-card">
        <div style="background: url(${item.img});width: 380px;height: 264px;">
            <div class="inImage">
                ${item.perCent?`<div class="perCent">${item.perCent}</div>`:`<div></div>`}
                <img id=${item.id} class="favorite" src=${item.favorite?"./img/heart.png":"./img/heartNone.png"} alt="">
            </div>
        </div>
        <div style='background: #F3F3F3;'>
            <div class="container-description">
                <div><b>${item.type}</b></div>
                <br/>
                <div class="info">
                    <div>
                        <div>${item.color}</div>
                    </div>
                    <div>
                        <div style="font-weight: 700;">${item.age} мес</div>
                        <div>Возраст</div>
                    </div>
                    <div>
                        <div style="font-weight: 700">${item.countFoot}</div>
                        <div>Кол-во лап</div>
                    </div>
                </div>
                <br/>
                <div style="font-size: 24px; font-weight: 700;">
                    ${item.price} руб
                </div>
                
            </div>
            <div id=${item.id} class="buttonBuy ${item.buy? "blackButton": ""}">
                ${item.buy ? 'Продано' : 'Купить'}
            </div>
        </div>
        </div>
    `)
    

    var cards = window.document.getElementsByClassName('container-cards')
    cards[0].innerHTML = ''
    newItems.reverse().forEach(item=>{
        cards[0].insertAdjacentHTML('afterbegin',item)
    })    
    
}

rerender()
let modal = window.document.getElementsByClassName('modalAdd')
let favorite = window.document.getElementsByClassName('favorite')
function LoopFavorite(){
    for (let i = 0; i < favorite.length; i++) {
        favorite[i].addEventListener('click', (e) => {
            items[i].favorite = !items[i].favorite
            if(items[i].favorite){
                modal[0].style.display = 'flex'
                setTimeout(()=>{
                    modal[0].style.display = 'none'
                },200)
            }
            rerenderAllLoop()
        })  
    }
}



var button = window.document.getElementsByClassName('buttonBuy')
function LoopButton(){
    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener('click', (e) => {
            items[i].buy = !items[i].buy
            rerenderAllLoop()
        })  
    }
}


var popupPrice = window.document.getElementsByClassName('navbar-popup')


var arrow=[,false, false]

function LoopPopup(){
    
    for (let i = 1; i < arrow.length; i++) {
        popupPrice[0].children[i].addEventListener('click',(e)=>{
            let id = e.currentTarget.id
            if(!arrow[id]){
                popupPrice[0].children[i].children[0].classList.add('navbarRotate')
                arrow[id]=true
                
            }else if(arrow[id]){
                popupPrice[0].children[i].children[0].classList.remove('navbarRotate')
                arrow[id]=false
               
               
            }
        }) 
    }
}

window.document.addEventListener('click', () => {
    rerenderAllLoop()
    rerenderAllLoop()
})


function rerenderAllLoop() {
    rerender()
    LoopButton()
    LoopPopup()
    LoopFavorite()
}

rerenderAllLoop()