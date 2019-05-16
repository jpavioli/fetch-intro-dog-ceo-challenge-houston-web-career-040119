console.log('%c HI', 'color: firebrick')

//Challenge 1
document.addEventListener("DOMContentLoaded",function(){
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  let breedDropdown = document.querySelector("#breed-dropdown")
  breedDropdown.addEventListener("change",function(e){
    displayBreedsThatStartWith(e.target.value)
  })

  fetch(imgUrl)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      data.message.forEach(function(image_url){
        displayImage(image_url)
      })
    })

    function displayImage(image_url){
      let dogPic = document.createElement('img')
      dogPic.src = image_url
      dogPic.height = 200
      document.querySelector("#dog-image-container").append(dogPic)
    }

  displayBreedsThatStartWith(breedDropdown.value)

  function displayBreedsThatStartWith(startsWith){
    fetch(breedUrl)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      let keys = Object.keys(data.message)
      let breedsUL =document.querySelector("#dog-breeds")
      while (breedsUL.firstChild){
        breedsUL.removeChild(breedsUL.firstChild)
      }
      keys.forEach(function(key){
        if (data.message[key].length == 0){
          if (key.charAt(0) == startsWith){
            displayBreed(key)
          }
        }
        else {
          data.message[key].forEach(function(minor_breed){
            if (minor_breed.charAt(0) == startsWith){
              displayBreed(`${minor_breed} ${key}`)
            }
          })
        }
      })
    })
  }

function displayBreed(element){
  let li = document.createElement('li')
  let colors = ["red","blue","orange","brown","yellow","black","turquoise"]
  li.innerText=element
  //Challenge 3 - To add color change on click
  li.addEventListener("click", function(e){
    this.style.color = colors[Math.floor(Math.random() * colors.length)]
  })
  //
  document.querySelector("#dog-breeds").append(li)
}

})
