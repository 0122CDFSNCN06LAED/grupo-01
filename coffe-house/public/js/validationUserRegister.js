window.onload = async function () {
  //Fetch de la base de datos de usuarios. Donde solo obtengo una lista de mails de los usuarios.
  const fetchEmailsListUsers = await fetch(
    "http://localhost:3000/api/user/list"
  );
  const response = await fetchEmailsListUsers.json();

  //Tomo el formulario de registro con sus elementos.
  const registerForm = document.querySelector("#form-register");

  registerForm.addEventListener("submit", async (e) => {
    let confirmPassword;
    let errors = [];

    //Comprueba si la url es de user/register.
    const urlRegister = () => {
      const locationHref = location.href;
      const urlRegister = "http://localhost:3000/user/register";

      return locationHref == urlRegister ? true : false;
    };
    //Comprueba si la url es de user/login.
    const urlLogin = () => {
      const locationHref = location.href;
      const urlLogin = "http://localhost:3000/user/login";

      return locationHref == urlLogin ? true : false;
    };
    //Comprueba si la url es de user/detail.
    const urlUserDetail = () => {
      const locationHref = location.href;
      const urlIndexOf = locationHref.lastIndexOf("/") + 1;
      const paramsId = locationHref.substring(urlIndexOf, locationHref.length);
      const urlUserDetail = `http://localhost:3000/user/detail/${paramsId}`;

      return locationHref == urlUserDetail ? true : false;
    };

    for (const input of registerForm) {
      const inputName = input.name;
      const inputValue = input.value;

      //Tomo los elementos p donde voy insertar un mensaje de error.
      const elementsMsgError = document.querySelectorAll(
        `#msgError-${inputName}`
      );

      //Función para saber si corresponde a un email válido.
      const inputValidEmail = (inpName, inpValue) => {
        if (inpName == "email") {
          const validEmail = !(inpValue.includes("@") && inpValue.includes("."))
            ? true
            : false;
          return validEmail;
        }
      };

      //Compruebo si existe el email en la base de datos de ususarios.
      const validInputEmailOfDb = (inputName, inputValue) => {
        if (inputName == "email") {
          const emailInDb = response.find((email) => {
            return email == inputValue;
          });

          return emailInDb ? true : false;
        }
      };

      //Email validado con la base de datos.
      const validEmailOfDb = validInputEmailOfDb(inputName, inputValue);

      //Recorro los elementos p de mensaje de error.
      for (const elementMsgError of elementsMsgError) {
        //Condición en caso de que el valor no es vacío.
        if (inputName !== "" && inputValue !== "") {
          //Input nombre.
          if (inputName == "name") {
            //Si es menor a dos carateres, mensaje de error.
            if (inputValue.length < 2) {
              errors.push(`The ${inputName} must have at least 2 characters`);
              elementMsgError.innerHTML = `The ${inputName} must have at least 2 characters`;
            } else {
              elementMsgError.innerHTML = "";
            }
          }

          //Input apellido.
          else if (inputName == "lastname") {
            //Si es menor a dos carateres, mensaje de error.
            if (inputValue.length < 2) {
              errors.push(`The ${inputName} must have at least 2 characters`);
              elementMsgError.innerHTML = `The ${inputName} must have at least 2 characters`;
            } else {
              elementMsgError.innerHTML = "";
            }
          }

          //Input email.
          else if (inputName == "email") {
            //Si el email no es válido se ejecuta mensaje de error.
            if (inputValidEmail(inputName, inputValue)) {
              errors.push("You must enter a valid email");
              elementMsgError.innerHTML = "You must enter a valid email";

              //Si la url es user/loging y el email está en la base de datos no devuelvo mensaje de error.
            } else if (urlLogin()) {
              if (validEmailOfDb) {
                elementMsgError.innerHTML = "";
              } else {
                errors.push("The email is not registered");
                elementMsgError.innerHTML = "The email is not registered";
              }
              //Si la url es de user/detail no devuelvo mensaje de error.
            } else if (urlUserDetail()) {
              elementMsgError.innerHTML = "";
              //Si la url es user/register y el email está en la base de datos devuelvo mensaje de error.
            } else if (urlRegister()) {
              if (validEmailOfDb) {
                errors.push("The email is already registered");
                elementMsgError.innerHTML = "The email is already registered";
              } else {
                elementMsgError.innerHTML = "";
              }
            }
          }

          //Input avatar.
          else if (inputName == "avatar") {
            //Si no esta vacío compruebo si la extensión del archivo es la indicada.
            if (inputValue !== "") {
              const extensionFile = [".jpg", ".jpeg", ".png", ".gif"];
              let extension = "";
              let countExt = 0;

              for (const ext of extensionFile) {
                extension += " " + `"${ext}"`;
                //Si termina con las extensión indicada las cuento.
                const extensionValid = inputValue.endsWith(ext)
                  ? countExt++
                  : 0;
              }

              //Si el contador de extensiones cumple la condición, no hay mensaje de error.
              if (countExt == 1) {
                elementMsgError.innerHTML = "";
              } else {
                errors.push(
                  `El archivo debe ser de la extensión siguiente : ${extension}`
                );
                elementMsgError.innerHTML = `The extension must be : ${extension}`;
              }
            }
          }

          //Input ususario.
          else if (inputName == "username") {
            //Si es menor a dos carateres, mensaje de error.
            if (inputValue.length < 2) {
              errors.push(`The ${inputName} must have at least 2 characters`);
              elementMsgError.innerHTML = `The ${inputName} must have at least 2 characters`;
            } else {
              elementMsgError.innerHTML = "";
            }
          }

          //Input contraseña.
          else if (inputName == "password") {
            confirmPassword = inputValue;
            //Si es menor a ocho carateres, mensaje de error.
            if (inputValue.length < 8) {
              errors.push(`The ${inputName} must have at least 8 characters`);
              elementMsgError.innerHTML = `The ${inputName} must have at least 8 characters`;
            } else {
              elementMsgError.innerHTML = "";
            }
          }

          //Input contaseña confirmación.
          else if (inputName == "password2") {
            //Si es menor a ocho carateres, mensaje de error.
            if (inputValue.length < 8) {
              errors.push(`The ${inputName} must have at least 8 characters`);
              elementMsgError.innerHTML = `The ${
                inputName == "password2" ? "password" : inputName
              } must have at least 8 characters`;
            }
            //Si las contraseñas no son iguales mensaje de error.
            else if (!(confirmPassword == inputValue)) {
              errors.push(`Las credenciales no son válidas`);
              elementMsgError.innerHTML = `Las credenciales no son válidas`;
            } else {
              elementMsgError.innerHTML = "";
            }
          }
        } else {
          //Si archivo de avatar está vacío, no hay mensaje de error ya que cargara por defecto.
          if (inputName == "avatar" && inputValue == "") {
            elementMsgError.innerHTML = "";
          } else {
            errors.push(`The ${inputName} field cannot be empty`);
            elementMsgError.innerHTML = `The ${
              inputName == "password2" ? "password" : inputName
            } field cannot be empty`;
          }
        }
      }
    }
    //Si no hay errores se envía el formulario.
    errors.length > 0 ? e.preventDefault() : e.submit();
  });
};
