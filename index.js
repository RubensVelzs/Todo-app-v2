
/* const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
}); */

const savePost= (e)=>{

    const fileInput = document.getElementById("file"); 
    const description= document.getElementById('description').value;
    const uuid= self.crypto.randomUUID();
    
   
   //const file=  toBase64(fileInput.files[0]);
    
    const post={
        file:fileInput.value,
        description,
        id: uuid,
        isFavorite: false
    } 

    if(localStorage.getItem("posts")=== null){
        let posts=[];
        posts.push(post);
        localStorage.setItem("posts", JSON.stringify(posts))
    }else{
        let posts= JSON.parse(localStorage.getItem("posts"));
        posts.push(post);
        localStorage.setItem("posts", JSON.stringify(posts));
    }
    
    clearInputs();
    getItems();
    e.preventDefault();
}

const clearInputs=()=>{
    document.getElementById("file").value=""
    document.getElementById("description").value=""
    modal.style.display="none";
}

const editFavorite= (postID)=>{
    const posts = JSON.parse(localStorage.getItem('posts'));
    const post = posts.find(item=>item.id===postID);

    if(post.isFavorite){
        post.isFavorite = false;
        localStorage.setItem('posts', JSON.stringify(posts));
    }else{
        post.isFavorite = true;
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    getItems();
}

const getItems=()=>{
    const posts = JSON.parse(localStorage.getItem('posts'));

    const sectionPostsContainer = document.getElementById('posts-container');

    sectionPostsContainer.innerHTML = ''; 

    posts?.map(item=>(
        sectionPostsContainer.innerHTML+=`<article class="section__posts--item">
            <img src="images/${item.file}"/>
            <div class="section__posts--item-content">
                <p>${item.description}</p>
                <a onclick=editFavorite('${item.id}')>
                    '${item.isFavorite? ' <i class="fa fa-heart" style="font-size:16px;color:red"></i> ':' <i class="fa fa-heart" style="font-size:16px;color:white"></i> '}'
                </a>
            </div>
       </article>`
    ));
}

const getFavorites=()=>{
    const favorites = JSON.parse(localStorage.getItem('posts'));
    const favoritesPosts= favorites.filter(item=>item.isFavorite===true);
    console.log(favoritesPosts)

    const sectionFavoritesContainer = document.getElementById('favorites-container');

    sectionFavoritesContainer= '';

    favoritesPosts?.map(item=>(
        sectionFavoritesContainer.innerHTML+=`
        <article class="section__posts--item">
            <img src="images/${item.file}"/>
            <div class="section__posts--item-content">
                <p>${item.description}</p>
                <a onclick=editFavorite('${item.id}')>
                    <i class="fa fa-heart" style="font-size:16px;color:red"></i> 
                </a>
            </div>
       </article>
        `
    ));


}


getItems();


// Get the modal
let modal = document.getElementById("modal");

// Get the button that opens the modal
let btn = document.getElementById("openModal");

// When the user clicks the button, open the modal 
btn.onclick = ()=> {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event)=> {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


document.getElementById('create-post').addEventListener('submit',savePost);