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
            <li id="${cat.id}" class="font-medium text-lg py-3 hover:border-b-4 hover:border-b-red-800 border-b-red-800 ${cat.id === 'main' ? 'border-b-4' : ''}">${cat.title}</li>
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
        loading()

        loadNewsByCategory(e.target.id)
    })
}

const loadNewsByCategory = (categoryId) => {
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            showNewsByCategory(data.articles)
        })
        .catch(err => {
            Wrong()
        })
}

const showNewsByCategory = (articles) => {
    if(articles.length === 0){
        noDataFound()
        return;
    }
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        newsContainer.innerHTML += `
        <div class="border border-gray-200 rounded-lg">


        <img class="w-full rounded-t-lg" src='${article.image.srcset[5].url}'>

        <div class="px-1 py-2">
        <h1 class="font-bold">${article.title}</h1>
        <p class="text-sm text-gray-800">${article.time}</P>
        </div>
        `
    })
}

const loading = () => {
    newsContainer.innerHTML = `
    <div class="flex justify-center items-center col-span-4">
                <span class="loading loading-ring loading-xl w-48 h-48"></span>
            </div>
    `
}

const Wrong = () => {
        newsContainer.innerHTML = `
    <div class="flex justify-center items-center col-span-4">
                <h1 class="text-5xl mt-32 text-red-800">Something went Wrong !</h1>
            </div>
    `
}

const noDataFound = () => {
            newsContainer.innerHTML = `
    <div class="flex justify-center items-center col-span-4">
                <h1 class="text-5xl mt-32 text-red-800">No Data Found !</h1>
            </div>
    `
}


loadCategory()
loadNewsByCategory('main')