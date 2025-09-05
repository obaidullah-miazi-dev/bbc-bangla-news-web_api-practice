// categories section api 

const url = "https://news-api-fs.vercel.app/api/categories"
fetch(url)
    .then(res => res.json())
    .then(data => getCategories(data.categories))

// get categories
const getCategories = (categories) => {
    const catContainer = document.getElementById('cat-container')
    categories.forEach(cat => {
        const catTitle = cat.title
        const newCat = document.createElement('p')
        newCat.innerHTML= `
     <p class="py-2 font-medium text-xl cursor-pointer border-red-800 hover:border-b-4">
                        ${catTitle}
                    </p>

    `

        catContainer.append(newCat)
    });
}