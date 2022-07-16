window.addEventListener("load", ()=>{

  const btn = document.querySelector(".btn");
  btn.addEventListener("click", () => {
      document.querySelector(".search").classList.toggle("show");
    });
  
   document.querySelector(".burger-menu").addEventListener("touchstart", ()=>{
    document.querySelector(".nav-burger").classList.toggle("show-burger")
  })
  
   document.querySelector(".btn").addEventListener("touch", () => {
      document.querySelector(".search").classList.toggle("show");
    });
 
/*   document.querySelector(".burger-menu").addEventListener("touch", ()=>{
    document.querySelector(".nav-burger").classList.toggle("show-burger")
  }) */

})
