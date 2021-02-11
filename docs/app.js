const containerList = document.querySelector('.container-list');
const btnSubmit = document.querySelector('.submit-list');
const inputAct = document.querySelector('.form-input');
const selectType = document.querySelector('.select-type-activity');
const body = document.querySelector('body')
const date = document.querySelector('.form-date')



const persistBookmark = (arrElemt) => localStorage.setItem('ItemList', JSON.stringify(arrElemt))





   const getRemainTime = (date) =>{
     const now = new Date();
  
     const remainTime = (new Date(date) - now + 1000) / 1000;
  
     const remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2)
     const remainMinutos = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2)
     const remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2)
     const remainDays =  Math.floor(remainTime / (3600 * 24))
  
     return{
        remainTime,
        remainSeconds,
        remainMinutos,
        remainHours,
        remainDays
     } 
   }



   const countDown = async (date, el) =>{
              const timerUp =  setInterval( () =>{
                 const tiempo = getRemainTime(date);
                 el.innerText = `Days:${tiempo.remainDays} Hours:${tiempo.remainHours}:${tiempo.remainMinutos}:${tiempo.remainSeconds} ` 
            
                  if(tiempo.remainTime <= 1){
                     clearInterval(timerUp)
                     el.textContent = `timpo agotado`
                     el.closest('.container-activity').classList.add('cheack-v')
                  }
          }, 1000)

}
   

        
    

   


let i = 2
let containerElementStore = []

btnSubmit.addEventListener('click', async (e) => {
   i++
   e.preventDefault()
  
   
   if(inputAct.value !== '' && date.value !== ''){
      
         const htmlList = 
      `<div class="container-activity ${selectType.value}">
      <div class="title-name-activity">
      <p class="name-activity">${(inputAct.value)[0].toUpperCase() + inputAct.value}</p>
      <p class="timer-activity name-activity${i}"></p>
                             </div>
                            <div class="icons-activity">
                                <span class="deleted-activity del">
                                    <i class="fas fa-trash-alt del"></i>
                                 </span>
                                 <span class="check-activity act color-v">
                                    <i class="fas fa-clipboard-check act color-v"></i>
                                 </span>
                            </div>
                        </div>`


  containerList.insertAdjacentHTML('beforeend', htmlList)
   const renderTimer = document.querySelector(`.name-activity${i}`)

   await countDown(date.value, renderTimer)


    

   
  containerElementStore.push( {
      id: Math.random(),
      state: false,
      name: inputAct.value[0].toUpperCase() + inputAct.value,
      dates: date.value,
      type: selectType.value
  })
  console.log(containerElementStore);
   
   persistBookmark(containerElementStore)


    inputAct.value = ''
    date.value = ''
   }else{
      const alert = `<div class="alert">Please write activity.<div>`

      body.insertAdjacentHTML('afterbegin', alert )
      const el = document.querySelector('.alert')
      el.classList.add('deleted-animation-alert')
       setTimeout(()=>{
          el.parentElement.removeChild(el)},2000) 

    }
 });

 window.addEventListener('click', (e) => {

    console.log(e.target.id);

     if(e.target.classList.contains('del')){

      const findItemRemove = containerElementStore.findIndex(el => el.id === +e.target.id)

      const removeItem = containerElementStore.splice(findItemRemove, 1)

      persistBookmark(containerElementStore)

        e.target.closest('.container-activity').classList.add('deleted-animation')

        setTimeout(()=> {

         e.target.closest('.container-activity').parentElement.removeChild(e.target.closest('.container-activity'))

        },2000)
     }

     if(e.target.classList.contains('act')){

        e.target.closest('.container-activity').classList.toggle('cheack-v')
        

         containerElementStore.forEach(el => {
            
            
            if(el.id === +e.target.id && el.state === false) {
               el.state = true
            }else{
               el.state = false
            }
            
         
         })
         persistBookmark(containerElementStore)
     }
 })
 
 const init = () => {

   const storage = localStorage.getItem('ItemList')
    
   if(storage) containerElementStore = JSON.parse(storage)
   
   const createList = containerElementStore.map((e, i) => {

    const html =  `<div class="container-activity ${e.type}">
      <div class="title-name-activity">
      <p class="name-activity">${e.name}</p>
      <p class="timer-activity name-activity${i}"></p>
                             </div>
                            <div class="icons-activity">
                                <span id="${e.id}" class="deleted-activity del">
                                    <i id="${e.id}" class="fas fa-trash-alt del"></i>
                                 </span>
                                 <span id="${e.id}" class="check-activity act color-v">
                                    <i id="${e.id}" class="fas fa-clipboard-check act color-v"></i>
                                 </span>
                            </div>
                        </div>`


  containerList.insertAdjacentHTML('beforeend', html)
  const renderTimer = document.querySelector(`.name-activity${i}`)
  const containerActivity = document.querySelector(`.container-activity`)
  const containerActivityColor = document.querySelector(`.check-activity`)

  countDown(containerElementStore[i].dates, renderTimer)
      if(e.state === true){
         containerActivity.classList.add('cheack-v')
         
      }
   })
 };
 init()

 const clearBookmarks = function () {
   localStorage.clear('bookmarks');
 };
//  clearBookmarks();




