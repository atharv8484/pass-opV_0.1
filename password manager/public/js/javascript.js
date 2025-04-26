var passwordData;
var passwordDataObject
var filter = "email"

function info(obj){
    const websiteName = obj.website
    const email =  obj.email
    const image = obj.Image
    const password = obj.password
    const link = obj.link
    const userName =  obj.userName
    // console.log(document.querySelector(".logo_Image img"))
    document.querySelector(".logo_Image img").setAttribute('src' , `public/upload/${image}`)
    document.querySelector(".company_name div").innerHTML = websiteName
    document.querySelector(".userName_text").innerHTML = userName
    document.querySelector(".email_text").innerHTML = email
    document.querySelector(".password_text").innerHTML = password
    document.querySelector(".link_text").innerHTML = link

    document.getElementById("qrImage").setAttribute("src" , `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`)
}

function creatDiv(array ,  mess="from fetch"){
    document.getElementById('companies_list').innerHTML = ''
    console.log(array , mess)
    array.forEach(obj => {
        let objArray = Object.entries(obj)[0]
        let key = objArray[0]
        let value =   objArray[1]

        const companies_mainBlock = document.createElement("div")
        companies_mainBlock.setAttribute("class" , "companies_mainBlock")
        companies_mainBlock.setAttribute("id" , key)

        const companies_block =  document.createElement("div")
        companies_block.setAttribute("id" , "companies_block")

        const image_block = document.createElement("div")
        image_block.setAttribute("class" , "image_block")

        const img = document.createElement("img")
        img.setAttribute("id" , "list_logo")
        img.setAttribute("src" , `/public/upload/${value["Image"]}`)

        image_block.appendChild(img)
        companies_block.appendChild(image_block)

        const name_and_userName =  document.createElement('div')
        name_and_userName.setAttribute("class" ,  "name_and_userName")

        const name = document.createElement("div")
        name.setAttribute("class", "name")
        name.innerHTML = `<div>${value["website"]}</div>`
        if(value["website"].length > 13){
            name.style.fontSize = "1.5vw"
            name.style.marginLeft = "1vw"
            name_and_userName.style.gap = "3vw"
        }
        const userName = document.createElement("div")
        userName.setAttribute("class" ,  "userName")
        userName.innerHTML = `<h3>${value["email"]}</h3>`

        name_and_userName.appendChild(name)
        name_and_userName.appendChild(userName)

        companies_block.appendChild(name_and_userName)
        companies_mainBlock.appendChild(companies_block)

        document.getElementById('companies_list').appendChild(companies_mainBlock)        
    });
    document.querySelectorAll(".companies_mainBlock").forEach(ele=>{
        ele.addEventListener("click" ,  ()=>{
            let id = ele.getAttribute("id")
            // alert(id)
            // console.log(passwordDataObject[0])
            info(passwordDataObject[id])
        })
    })
    if(document.querySelectorAll(".companies_mainBlock").length > 0){

        document.querySelectorAll(".companies_mainBlock")[0].click()
    }

}
fetch("/getData")
    .then(res=>res.json())
    .then(res=>{
        passwordData =  JSON.parse(res.data)
        passwordDataObject =  passwordData.map((obj)=> {
            return obj
        }).reduce((acc , obj , index)=>{
            console.log(Object.entries(obj))

            let Obj =  Object.entries(obj)[0]
            let key =  Obj[0]
            let value = Obj[1]
            acc[key] =  value
            return acc
        },{})
        console.log("this is obj array" , passwordDataObject);

        // console.log(passwordDataObject[])

        creatDiv(JSON.parse(res.data))
    })

document.getElementById('create_btn').addEventListener("click" , ()=>{
    window.location.href = "/create"
})
document.querySelector(".close_mainBlock").addEventListener("click" , ()=>{
    document.querySelector("main").scrollIntoView({behavior:"smooth"})

})
document.querySelector(".qrCode").addEventListener("click" , ()=>{
    document.querySelector(".main2").scrollIntoView({behavior:"smooth"})
})
// document.querySelector("main").scrollIntoView({behavior:"smoot"})

document.querySelector(".seearch_btn_mainBlock").addEventListener("click" , ()=>{
    const search_value =  document.querySelector("#search_inp").value
    if(search_value === ""){
        console.log("hiiih" ,passwordData)
        creatDiv(passwordData ,  "from filter")

    }else{
        const array =  passwordData.filter(obj=>{
            let Obj =  Object.entries(obj)[0]
            let value  = Obj[1]
            if(value[filter] === search_value){
                return obj
            }
        })
        creatDiv(array)        
    }

})
document.getElementById("filter_Btn").addEventListener("click" , ()=>{
    const inp =  document.getElementById("search_inp")
    if(filter === "email"){
        filter = "website"
        inp.setAttribute("placeholder" , "search by website name")
    }else if(filter === "website"){
        filter = "folder"
        inp.setAttribute("placeholder" , "search by folder")
    }else if(filter === 'folder'){
        filter = "email"
        inp.setAttribute("placeholder" , "search by email")
    }
})
