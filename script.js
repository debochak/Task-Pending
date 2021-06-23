function create (ele, eleclass, eleid){
    var demo = document.createElement(ele);
    demo.setAttribute('class', eleclass);
    demo.setAttribute('id', eleid);
    return demo;
}

const monthNames = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

var a = 'home';

const arr = ['home', 'world', 'politics', 'magazine', 'technology', 'science', 'health', 'sports', 'arts', 'fashion', 'food', 'travel']

var container = create ('div', 'container')

var mainnb = create('nav', 'navbar navbar-expand navbar-dark bg-dark text-white justify-content-center')
var nb = create('div', 'collapse navbar-collapse justify-content-center')
var menulist = create('ul', 'navbar-nav');

var item1 = create('li','nav-item');
var item1a = create('a','nav-link btn');
item1a.innerHTML = 'Home';
item1.append(item1a);

var item2 = create('li','nav-item');
var item2a = create('a','nav-link btn');
item2a.innerHTML = 'World';
item2.append(item2a);

var item3 = create('li','nav-item');
var item3a = create('a','nav-link btn');
item3a.innerHTML = 'Politics';
item3.append(item3a);

var item4 = create('li','nav-item');
var item4a = create('a','nav-link btn');
item4a.innerHTML = 'Magazine';
item4.append(item4a);

menulist.append(item1, item2, item3, item4)

nb.append(menulist);
mainnb.append(nb);
container.append(mainnb);

item1a.setAttribute('onclick', "foo(arr[0])")
item2a.setAttribute('onclick', "foo(arr[1])")
item3a.setAttribute('onclick', "foo(arr[2])")
item4a.setAttribute('onclick', "foo(arr[3])")

foo(arr[0]);


function foo2(item){
    alert(item);
}

function foo(item){


    let temp = fetch('https://api.nytimes.com/svc/topstories/v2/'+item+'.json?api-key=8ukrhTwOyGWKR3hAQNhEjU1GPv2Vcrng')
    
    temp.then((data)=>{
        let demo = data.json();
        return demo;
    }).then((result)=>{
        foofinal(result.results)
    }).catch((err)=>{
        console.log("could not load")
        console.log(err);
    })
}

function foofinal(answer){

    answer.forEach(element => {

        var row1 = create('div','row mb-3');
        var maindiv = create('div','col-9 card');
        var imagediv = create('div','col-3');
        row1.append(maindiv, imagediv)
        
        var headdiv = create('h5','mt-2 text-uppercase')
        headdiv.innerHTML = element.section;
        headdiv.setAttribute('style','color: black')

        var titlediv = create('div','title-card');
        titlediv.innerHTML = element.title;

        var datediv = create('div','date-card');
        let tempdate = new Date(Date.parse(element.published_date))
        datediv.innerHTML = monthNames[tempdate.getUTCMonth()]+' '+tempdate.getUTCFullYear();

        var abscard = create('div','abstract-card');
        abscard.innerHTML = element.abstract;
        
        var contreading = create('a','continuereading')
        contreading.innerHTML = 'Continue Reading'
        contreading.setAttribute('href', element.short_url);

        var cardimg = create('img','img-thumbnail')
        
        cardimg.setAttribute('src', element.multimedia[0].url)
        // cardimg.setAttribute('src','https://place-hold.it/2000x2000&text=This%20is%20just%20for%20display')
        cardimg.setAttribute('width','100%')
        cardimg.setAttribute('height','200px')
        imagediv.append(cardimg)

        maindiv.append(headdiv, titlediv, datediv, abscard, contreading)
        container.append(row1);
    });
}

document.body.append(container);

//Two queries
// 1. How to ensure that everytime we are clicking the link, the container is being created from scratch
// 2. How to get the image in a single card