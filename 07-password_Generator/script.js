 document.addEventListener('DOMContentLoaded', () => {
 
    const inputPass = document.getElementById('pass')
    const inputLength = document.getElementById('length')
    const numberInput = document.getElementById('numberInput')
    const charInput = document.getElementById('charInput')
    const generateBtn = document.getElementById('gene-pass')
    const lengthLabel = document.getElementById('label-length')
    const copyBtn = document.querySelector('.copy')
    

    let numberAllowed = false
    let charAllowed = false
    let length = 8

copyBtn.addEventListener('click', () => {
      copyPassword()
})

   generateBtn.addEventListener('click', () => {
       passwordGenerator()
   })    


    numberInput.addEventListener('change', () => {
        numberAllowed = !numberAllowed      
        passwordGenerator()
    })

    charInput.addEventListener('change', () => {
        charAllowed = !charAllowed        
        passwordGenerator()
    })

    inputLength.addEventListener("change", () => {
        length = inputLength.value
        lengthLabel.innerHTML = `length : ${length}`
        passwordGenerator()
    })
 
   

    function passwordGenerator() {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numberAllowed) str += "0123456789"
        if(charAllowed) str += "~!@#$%^&*()_{}"
         
        for(let i = 1; i <= length; i++) {
             let char = Math.floor(Math.random() * str.length)
        
             pass += str.charAt(char)
            
        }   

        inputPass.value = pass

    }

    function bsdk() {
        return inputPass.value
    }

    function copyPassword () {
        inputPass.select();
        document.execCommand("copy");
     }

    passwordGenerator()

    // password tracker start 

    //////////////////// +++++++++++++

    const okBtn = document.getElementById('ok')
    const passCheck = document.getElementById('passCheck')
    const enterPass = document.getElementById('enter-pass')
    const fromAbove  = document.getElementById('from-above')
    const passForm = document.getElementById('passTrack')
    const passName = document.getElementById('passFor')
    const passInput = document.getElementById('hello')
    const passwordList = document.getElementById('pass-list') 
    const last = document.getElementById('last')  
    const close = document.querySelector('.close')

    let passArr = JSON.parse(localStorage.getItem("password")) || []
    

       last.classList.add('hidden')
    
    
    
    
    okBtn.addEventListener('click', () => {
        let password = passCheck.value.trim()
        if(password == "Anurag") {
           enterPass.classList.add('hidden')
           okBtn.classList.add('hidden')
           last.classList.remove('hidden')

        }
    })

 lol()

 function lol() { 
 if(passArr.length == 0) {
    close.classList.add('hidden')
 } else {
    close.classList.remove('hidden')
 }
}  

   close.addEventListener('click', () => {
        last.classList.add('hidden')
        enterPass.classList.remove('hidden')
        okBtn.classList.remove('hidden')

   })
   
   
   
   

    // ++++++++++++++++++++++++++++++++++++++++

  
  
    fromAbove.addEventListener('click', (e) => {
        e.preventDefault()
        passInput.value = bsdk()
        // console.log("fuck you")
    })
  

   

   renderPassword()

   passForm.addEventListener("submit", (e) => {
      e.preventDefault()
       const passFor = passName.value.trim()
       const fuck = passInput.value.trim()

       if(passFor !== "" && bsdk().length > 5)  {
           const myObj = {
             id: Date.now(),
             text: passFor,
             passValue: fuck
           }
           passArr.push(myObj)
          
          
           renderPassword()
           savePassword()

           passName.value = ""
           passInput.value = ""
           
       }
        lol()
   })

    function savePassword() {
        localStorage.setItem('password', JSON.stringify(passArr))
    }
   
    function renderPassword() {
        
        passwordList.innerHTML = ''
        passArr.forEach((item) => { 
             const li = document.createElement('li')
             li.innerHTML = `
             <span>${item.text}</span> : <span>${item.passValue}</span>
             <button class="delete-btn" data-id="${item.id}">Delete</button>
             `
             passwordList.appendChild(li)
         })
    }

    passwordList.addEventListener('click', (e) => {
        // console.log(e.target.tagName)
       
        if(e.target.tagName === 'BUTTON'){ 
            const targetId = parseInt(e.target.getAttribute('data-id'))
            // console.log(targetId)

            passArr = passArr.filter( (item) =>  item.id !== targetId )
        }
         renderPassword()
         savePassword()
         lol()
    })

    

    


    
})