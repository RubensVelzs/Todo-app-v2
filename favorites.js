


const editFavorite= (postID)=>{
    const posts = JSON.parse(localStorage.getItem('posts'));
    const post = posts.find(item=>item.id===postID);


    post.isFavorite=false;
    localStorage.setItem('posts', JSON.stringify(posts));
    getFavorites();
}


const getFavorites=()=>{
    const favorites = JSON.parse(localStorage.getItem('posts'));
    const favoritesPosts= favorites.filter(item=>item.isFavorite===true);
    console.log(favoritesPosts)

    const sectionFavoritesContainer = document.getElementById('favorites-container');

    sectionFavoritesContainer.innerHTML='';

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

getFavorites();