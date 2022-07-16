window.addEventListener("load", function () { 
    const formulario = document.getElementById("formulario");
    const inputs = document.querySelectorAll("input");
    const description = document.getElementById("description");
    const file = document.getElementById("file");
  
    const expresiones = {
      name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      region: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      description: /^[a-zA-ZÀ-ÿ\s\d\w].{1,300}$/,
      price: /^[0-9]+([\,]?[\s, \d]?[0-9]+)?(\.[0-9]{1,2})?$/,
      stock: /^[0-9]{1,7}$/,
    };
  
    const errores = [];
  
    const validarFormulario = (e) => {
      switch (e.target.name) {
        case "name":
          validarCampo(expresiones.name, e.target, "name");
          validateEmptyField(e.target, "name");
          break;
        case "region":
          validarCampo(expresiones.region, e.target, "region");
          validateEmptyField(e.target, "region");
          break;
        case "description":
          validarCampo(expresiones.description, e.target, "description");
          validateEmptyField(e.target, "description");
          break;
  
        case "price":
          validarCampo(expresiones.price, e.target, "price");
          validateEmptyField(e.target, "price");
          break;
  
        case "stock":
          validarCampo(expresiones.stock, e.target, "stock");
          validateEmptyField(e.target, "stock");
          break;
        
          
      }
    };
  
    const validarCampo = (expresion, input, campo) => {
      let valorInput = input.value;
      if (expresion.test(valorInput)) {
        document
          .getElementById(`grupo-${campo}`)
          .classList.remove("formulario-grupo-incorrecto");
        document
          .querySelector(`#grupo-${campo} .formulario-input-error`)
          .classList.remove("formulario-input-error-activo");
          if(errores.length >= 1){
            errores.pop()
          } 
          
          
      } else {
        document
          .getElementById(`grupo-${campo}`)
          .classList.add("formulario-grupo-incorrecto");
        document
          .querySelector(`#grupo-${campo} .formulario-input-error`)
          .classList.add("formulario-input-error-activo");
        errores.push(`error-${campo}`);
      }
    };
  
    const validateEmptyField = (input, campo) => {
      const valorInput = input.value;
      if (valorInput.length === 0) {
        document
          .querySelector(`#grupo-${campo} .formulario-input-empty`)
          .classList.add("formulario-input-empty-activo");
      } else {
        document
          .querySelector(`#grupo-${campo} .formulario-input-empty`)
          .classList.remove("formulario-input-empty-activo");
      }
    };
  
    description.addEventListener("keyup", validarFormulario);
    description.addEventListener("blur", validarFormulario);
    inputs.forEach((input) => {
      input.addEventListener("keyup", validarFormulario);
      input.addEventListener("blur", validarFormulario);
    });
  
    file.addEventListener("change", (e) => {
      const fileExt = e.target.files[0].name.split(".").pop().toLowerCase();
      const allowedExt = ["jpg", "jpeg", "png"];
      if (!allowedExt.includes(fileExt)) {
        document
          .getElementById("grupo-file")
          .classList.add("formulario-grupo-incorrecto");
        document
          .querySelector("#grupo-file .formulario-input-error")
          .classList.add("formulario-input-error-activo");
      } else {
        document
          .getElementById("grupo-file")
          .classList.remove("formulario-grupo-incorrecto");
        document
          .querySelector("#grupo-file .formulario-input-error")
          .classList.remove("formulario-input-error-activo");
      }
    });


//capturar los checkbox
const validarChecked = (input, campo) =>{
  const isChecked = document.getElementById(input).checked;
  if(!isChecked) {
    document.querySelector(`#grupo-${campo} .formulario-input-error`)
    .classList.add("formulario-input-error-activo");
  } else {
  document.querySelector(`#grupo-${campo} .formulario-input-error`)
    .classList.remove("formulario-input-error-activo");
  }
} 


    formulario.addEventListener("submit", (e) => {
      if (errores.length > 0) {
        e.preventDefault();
        document
          .getElementById("errores-alert")
          .classList.add("errores-alert-activo");
          
          
            const grindIsChecked = document.getElementById("grind").checked;
            if(!grindIsChecked) {
              document.querySelector(`#grupo-grind .formulario-input-error`)
              .classList.add("formulario-input-error-activo");
            } else {
            document.querySelector(`#grupo-grind .formulario-input-error`)
              .classList.remove("formulario-input-error-activo");
            }
            const weightIsChecked = document.getElementById("weight").checked;
            if(!weightIsChecked) {
              document.querySelector(`#grupo-weight .formulario-input-error`)
              .classList.add("formulario-input-error-activo");
            } else {
            document.querySelector(`#grupo-weight .formulario-input-error`)
              .classList.remove("formulario-input-error-activo");
            }
        
          

      }  else {
       
        formulario.submit();
      } 
    });
    
  }); 