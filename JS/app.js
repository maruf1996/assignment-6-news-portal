function loadCatagory(){
   try{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=>displayCatagory(data.data.news_category))
   }
   catch(error){
    console.log(error)
   }
}

function displayCatagory(categories){
    const listContainer=document.getElementById('list_container');
    categories.forEach(category => {
        // console.log(category);
        const list=document.createElement('li');
        list.classList.add('nav-item');
        list.classList.add('ms-2');
        list.innerHTML=`
        <a class="nav-link" style="cursor: pointer" onclick="loadCatagoryDetails('${category.category_id}')">${category.category_name}</a>
        `;
        listContainer.appendChild(list)
    });
}
loadCatagory();

const loadCatagoryDetails=(id)=>{
    spinnerLoading(true)
    // console.log(id);
    const url=`https://openapi.programming-hero.com/api/news/category/${id}`
   try{
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCatagoryDetails(data.data))
   }
   catch(error){
    console.log(error)
   }
}


const displayCatagoryDetails=newsAll=>{
    // console.log(newsAll.length)
    const newsContainer=document.getElementById('news_container');
    newsContainer.innerText='';
    const foundItems=document.getElementById('found_items');
    foundItems.innerText=newsAll.length+' items found for category Entertainment';
    if(newsAll.length>0){
        newsAll.forEach(news=>{
            // console.log(news);
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`
            <div class="card">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${news.thumbnail_url}" class="news_img" alt="..." />
                    </div>
                    <div class="col-md-9 d-flex flex-column align-items-stretch">
                        <div class="card-body">
                            <h5 class="card-title my-2">${news.title}</h5>
                            <p class="card-text news_details">${news.details}</p>
                        </div>
                        <div class="d-md-flex justify-content-between align-items-center px-3">
                            <div class="d-flex align-items-center">
                                <div>
                                <img src="${news.author.img}" class="author_img" alt="..." />
                                </div>
                                <div class="mt-3 mx-3">
                                    <h6>${news.author.name? news.author.name:'No Data Available'}</h6>
                                    <p>${news.author.published_date?news.author.published_date.slice(0,10):'No Data Available'}</p>
                                 </div>
                            </div>
                            <div class="">
                                <p class="mt-md-3 fw-bold">${news.total_view? "Views: "+news.total_view+"M":'No Data Available'}</p>
                            </div>
                            <div class="pb-2">
                                <button onclick="loadNewsModal('${news._id}')" class="btn btn-info text-light fw-bold" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            newsContainer.appendChild(div);
        })
    }
    else{
        const div=document.createElement('div');
        div.innerHTML=`
            <h1 class="text-center text-danger">Ops! Data Not Found</h1>
        `;
        newsContainer.appendChild(div);
    }
    spinnerLoading(false)
    
}

const loadNewsModal=id=>{
    const url=`https://openapi.programming-hero.com/api/news/${id}`
    try{
        fetch(url)
        .then(res=>res.json())
        .then(data=>displayModal(data.data[0]))
    }
    catch(error){
        console.log(error)
    }
}

const displayModal=newsDetails=>{
    const modalTitle=document.getElementById('modal_title');
    modalTitle.innerText=`${newsDetails.title? newsDetails.title:'No Data Available'}`;

    const modalContainer=document.getElementById('modal_container');
    modalContainer.innerHTML=`
        <div>
            <img src="${newsDetails.thumbnail_url}" class="modal_img mb-4">
            <p>${newsDetails.details? newsDetails.details:'No Data Available'}</p>
        </div>
        <div class="d-md-flex justify-content-between align-items-center px-3 mt-5">
           <div>
                <div class="d-flex align-items-center">
                    <p class="mt-3 fw-bold">${newsDetails.total_view? "Views: "+newsDetails.total_view+"M":'No Data Available'}</p>
                </div>
                <div class="">
                    <p class="fw-bold">Rating: ${newsDetails.rating.number? newsDetails.rating.number:'No Data Available'}</p>
                </div>
           </div>
            <div class="d-flex align-items-center">
                <div>
                    <img src="${newsDetails.author.img? newsDetails.author.img:'No Data Available'}" class="author_img" alt="..." />
                </div>
                <div class="mt-3 mx-2">
                    <h6>${newsDetails.author.name? newsDetails.author.name:'No Data Available'}</h6>
                    <p>${newsDetails.author.published_date? newsDetails.author.published_date.slice(0,10):'No Data Available'}</p>
                </div>
            </div>
        </div>
    `;
}

const spinnerLoading=isLoading=>{
    const spinner=document.getElementById('spinner')
    if(isLoading===true){
        spinner.classList.remove('d-none');
    }
    else(
        spinner.classList.add('d-none')
    )
}