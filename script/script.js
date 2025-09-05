const categoryContainer = document.getElementById('category-container')

const newsContainer = document.getElementById('news-container')

const loadCategory = () => {
    const url = "https://news-api-fs.vercel.app/api/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const categories = data.categories
            showCategory(categories);
        })

        .catch((err) => {
            console.log(err)
        })

}

const showCategory = (categories) => {
    categories.forEach(cat => {
        categoryContainer.innerHTML += `
            <li id="${cat.id}" class="font-medium text-lg py-3 hover:border-b-4 hover:border-b-red-800 border-b-red-800">${cat.title}</li>
            `
    });

    categoryContainer.addEventListener('click', (e) => {

        const allLi = document.querySelectorAll('li')
        allLi.forEach(li => {
            li.classList.remove('border-b-4')
        })

        if (e.target.localName === 'li') {
            e.target.classList.add('border-b-4')
        }

        loadNewsByCategory(e.target.id)
    })
}

const loadNewsByCategory = (categoryId) => {
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then(res => res.json())
    .then(data => {
        showNewsByCategory(data.articles)
    })
}

const showNewsByCategory = (articles)=>{
    newsContainer.innerHTML='';
    console.log(articles)
    articles.forEach(article =>{
        newsContainer.innerHTML+=`
        <div>


        <img src='${article.image.srcset[5].url}'
        <h1>${article.title}</h1>

        <p>${article.time}</P>
        
        
        </div>
        `
    })
}
{/* <div></div> */}
loadCategory()
loadNewsByCategory('main')