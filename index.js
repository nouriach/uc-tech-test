/******
N Ouriach
User Conversion Tech Test
July 2019
******/

// Access the User Conversion WordPress API
// Limit the data to the most recent 3 posts

const apiLink = 'https://www.userconversion.com/wp-json/wp/v2/posts?per_page=3&_embed';
const innerContent = "";

// Create an empty section titled 'section' to eventually store the new content
// place the content section before '#how-we-work'

function createNewSection () {
    let sectionContainer = document.createElement('section');
    sectionContainer.id = ("content-container");
    let target = document.querySelector('#how-we-work'); 
    target.parentNode.insertBefore (sectionContainer, target) 
}

createNewSection ();

// fetch the apiLink above

/***
> map the data to a new variable called post
> create an array of all the category terms from the JSON
> For each entry of the array add the category name to the variable categoryList
> After accessing the date data, remove all of the time stamps via a slice
> Through using template strings, add all of the require data available via the post variable to a new div to display: title, author, category/ies, publish date and read more
> Once the new div is stored in a variable, pass this variable through a function as an argument

***/

fetch (apiLink)
.then(response => response.json() )
.then (data => {
data.map( post => {
  
  let categoryArray = post._embedded ['wp:term'][0];
  console.log (categoryArray);
  
  let categoryList = "";
  
  for (i = 0; i < categoryArray.length; i++){        
    categoryList += ` • ${categoryArray[i].name}`;
}
  
  let dateSplit = post.date.slice(0, 10)
    
const innerContent = 
`
<div class = "inner">
	  <p class "author-date">
      <span class = "date"> ${dateSplit} </span><br>
      <a class = "author">${post._embedded.author[0].name}</a>
    </p>
    <header>
      <a href = ${post.link} target="_blank" <h2>${post.title.rendered} </h2> </a>
    </header>
    <div class ="assoc-cats">
      <p>${categoryList}</p>
    </div>
    <a href=${post.link}  target="_blank"> <p> Read More </p> </a>
</div>
`

addPosts(innerContent);
})
 
// add the new content to the pre-made <section>
    
/*****

> Create a new, empty div and asign it the class "post"
> Grab the element created earlier through its Id and store it in a variable
> add the data made in innerContent to the new div
> attach the new div to the section created above

******/
 
    
});

function addPosts (innerContent) { 
  let newSection = document.createElement('divs');
  newSection.className = ("post");
  
  let contentContainer = document.getElementById("content-container");
  
  newSection.innerHTML = `${innerContent}`; 
  contentContainer.appendChild(newSection);
};
