const categoryContainer = document.getElementById('category-container')
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
        console.log(data)
    })
}

loadCategory()