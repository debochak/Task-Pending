function create (ele, eleclass, eleid){
    var demo = document.createElement(ele);
    demo.setAttribute('class', eleclass);
    demo.setAttribute('id', eleid);
    return demo;
}

function clearborder(){
    for (i=0;i<arr.length;i++){
        var t = document.getElementById(arr[i]);
        t.style.borderColor = 'white'
    }
}

const monthNames = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

const arr = ['home', 'world', 'politics', 'magazine', 'technology', 'science', 'health', 'sports', 'arts', 'fashion', 'food', 'travel']

var container = create ('div', 'container')

var mainnb = create('nav', 'navbar navbar-expand-xl bg-light text-white justify-content-center border-bottom')
var nb = create('div', 'collapse navbar-collapse justify-content-center','firstnav')
var menulist = create('ul', 'navbar-nav');

var hambut = create('button', 'navbar-toggler');
hambut.setAttribute('type','button');
hambut.setAttribute('data-toggle','collapse');
hambut.setAttribute('data-target','#firstnav')
hambut.innerHTML = "Menu"

var item1 = create('li','nav-item');
var item1a = create('a','nav-link btn','home');
item1a.setAttribute('role','button')
item1a.innerHTML = 'Home';
item1.append(item1a);

var item2 = create('li','nav-item');
var item2a = create('a','nav-link btn','world');
item2a.innerHTML = 'World';
item2.append(item2a);

var item3 = create('li','nav-item');
var item3a = create('a','nav-link btn','politics');
item3a.innerHTML = 'Politics';
item3.append(item3a);

var item4 = create('li','nav-item');
var item4a = create('a','nav-link btn','magazine');
item4a.innerHTML = 'Magazine';
item4.append(item4a);

var item5 = create('li','nav-item');
var item5a = create('a','nav-link btn','technology');
item5a.innerHTML = 'Technology';
item5.append(item5a);

var item6 = create('li','nav-item');
var item6a = create('a','nav-link btn','science');
item6a.innerHTML = 'Science';
item6.append(item6a);

var item7 = create('li','nav-item');
var item7a = create('a','nav-link btn','health');
item7a.innerHTML = 'Health';
item7.append(item7a);

var item8 = create('li','nav-item');
var item8a = create('a','nav-link btn','sports');
item8a.innerHTML = 'Sports';
item8.append(item8a);

var item9 = create('li','nav-item');
var item9a = create('a','nav-link btn','arts');
item9a.innerHTML = 'Arts';
item9.append(item9a);

var item10 = create('li','nav-item');
var item10a = create('a','nav-link btn','fashion');
item10a.innerHTML = 'Fashion';
item10.append(item10a);

var item11 = create('li','nav-item');
var item11a = create('a','nav-link btn','food');
item11a.innerHTML = 'Food';
item11.append(item11a);

var item12 = create('li','nav-item');
var item12a = create('a','nav-link btn','travel');
item12a.innerHTML = 'Travel';
item12.append(item12a);

menulist.append(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12)

nb.append(menulist);
mainnb.append(hambut, nb);
container.append(mainnb);
document.body.append(container);

item1a.setAttribute('onclick', "foo(arr[0])")
item2a.setAttribute('onclick', "foo(arr[1])")
item3a.setAttribute('onclick', "foo(arr[2])")
item4a.setAttribute('onclick', "foo(arr[3])")
item5a.setAttribute('onclick', "foo(arr[4])")
item6a.setAttribute('onclick', "foo(arr[5])")
item7a.setAttribute('onclick', "foo(arr[6])")
item8a.setAttribute('onclick', "foo(arr[7])")
item9a.setAttribute('onclick', "foo(arr[8])")
item10a.setAttribute('onclick', "foo(arr[9])")
item11a.setAttribute('onclick', "foo(arr[10])")
item12a.setAttribute('onclick', "foo(arr[11])")

foo(arr[0]);

// function foo2(item){
//     alert(item);
// } test function

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

    clearborder();

    var x = document.getElementById(item);
    x.style.borderColor = "rgb(98, 165, 241)"
   
}

var bodydiv = create('div');

function foofinal(answer){
    
    bodydiv.innerHTML = '';
    
    answer.forEach(element => {
        
        var row1 = create('div','row mb-1 mx-0 mt-2');
        var maindiv = create('div','col-lg-12 card mt-1 shadow-sm pr-0 pl-0');
        maindiv.style.flexDirection = 'row'
        maindiv.style.borderColor = '#5b5c5d';
        maindiv.style.borderRadius = '0px'
        maindiv.style.fontFamily = "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
        var textdiv = create('div', 'col-9')
        var imagediv = create('div','col-lg-3 pr-0');
        maindiv.append(textdiv, imagediv)
        row1.append(maindiv)
        
        var headdiv = create('h5','mt-2 text-uppercase font-weight-bold')
        headdiv.innerHTML = element.section;
        headdiv.setAttribute('style','color: black')
        
        var titlediv = create('div','title-card');
        titlediv.innerHTML = element.title;
        
        var datediv = create('div','date-card font-weight-bold');
        let tempdate = new Date(Date.parse(element.published_date))
        datediv.innerHTML = monthNames[tempdate.getUTCMonth()]+' '+tempdate.getUTCFullYear();
        
        var abscard = create('div','abstract-card');
        abscard.innerHTML = element.abstract;
        
        var contreading = create('a','continuereading')
        contreading.innerHTML = 'Continue Reading'
        contreading.setAttribute('href', element.short_url);
        contreading.setAttribute('target','_blank')
        
        var cardimglink = create('a')
        cardimglink.setAttribute('href', element.short_url)
        cardimglink.setAttribute('target','_blank')

        var cardimg = create('img','img-thumbnail p-0 border-0')
        cardimg.style.borderRadius = '0px'
        
        cardimg.setAttribute('src', element.multimedia[0].url)
        cardimg.setAttribute('width','100%')
        cardimg.setAttribute('height','200px')

        cardimglink.append(cardimg);
        
        imagediv.append(cardimglink)
        textdiv.append(headdiv, titlediv, datediv, abscard, contreading)
        bodydiv.append(row1);

    });
    
}

container.append(bodydiv);
