document.addEventListener('DOMContentLoaded', function () {

      //crear objeto
      const email = {
            email: '',
            asunto: '',
            mensaje: ''
      }
      const cc = '';

      //Seleccionar los elementos de la interfaz
      const inputEmail = document.querySelector('#email');
      const inputCc = document.querySelector('#cc');
      const inputAsunto = document.querySelector('#asunto');
      const inputMensaje = document.querySelector('#mensaje');
      const formulario = document.querySelector('#formulario');
      const btnSubmit = document.querySelector('#formulario button[type="submit"]')
      const btnReset = document.querySelector('#formulario button[type="reset"]')
      const spinner = document.querySelector('#spinner');
      // console.log(inputEmail);
      // console.log(inputAsunto);
      // console.log(inputMensaje);

      //Asignar eventos
      inputEmail.addEventListener('input', validarCampo);
      // console.log('Avandono el campo email');
      // console.log(e.target.value);
      // });
      inputAsunto.addEventListener('input', validarCampo);
      // console.log('Avandono el campo email');
      // console.log(e.target.value);
      // });
      inputMensaje.addEventListener('input', validarCampo);
      // console.log('Avandono el campo email');
      // console.log(e.target.value);   
      // });
      inputCc.addEventListener('input', (e) => {
            if (e.target.value !== '') {
                  // console.log(e.target.value);
                  if (!validarEmail(e.target.value)) {
                        console.log(e.target.parentElement);
                        mostrarAlerta('Email no es valido', e.target.parentElement);
                  } else {

                        limpiarAlerta(e.target.parentElement);
                  }
            } else {
                  limpiarAlerta(e.target.parentElement);
            }
      });

      formulario.addEventListener('submit', enviarEmail);

      btnReset.addEventListener('click', (e) => {
            e.preventDefault();
            confirm('Deseas reiniciar los campos?');

            //Reiniciar el objeto
            reiniciaObjeto();
      });

      function enviarEmail(e) {
            e.preventDefault();

            spinner.classList.add('flex');
            spinner.classList.remove('hidden');

            setTimeout(() => {
                  spinner.classList.remove('flex');
                  spinner.classList.add('hidden');

                  //reinicia objeto
                  reiniciaObjeto();

                  //Alerta exito

                  const exito = document.createElement('P');
                  exito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounder-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
                  exito.textContent = 'Mensaje enviado con exito';
                  formulario.appendChild(exito);
                  setTimeout(() => {
                        exito.remove();
                  }, 3000);
            }, 3000);
      }

      function validarCampo(e) {
            if (e.target.value.trim() === '') {
                  // console.log('esta vacio');
                  mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
                  email[e.target.name] = '';
                  //Comprobar el objeto de email
                  comprobarEmail();
                  return;
            }

            //validar con exprecion regular
            if (e.target.id === 'email' && !validarEmail(e.target.value)) {
                  mostrarAlerta('Email no es valido', e.target.parentElement);
                  email[e.target.name] = '';
                  //Comprobar el objeto de email
                  comprobarEmail();
                  return;
            }

            //limpiar alerta si on se cumple la validacion
            limpiarAlerta(e.target.parentElement);

            //Asignar los valores
            email[e.target.name] = e.target.value.trim().toLowerCase();

            //Comprobar el objeto de email
            comprobarEmail();
      }

      //Muestra alerta
      function mostrarAlerta(mensaje, referencia) {
            limpiarAlerta(referencia);


            const error = document.createElement('P');
            error.textContent = mensaje;
            error.classList.add('err', 'bg-red-600', 'text-white', 'p-2', 'text-center');

            //comprueba si ya existe una alerta
            // const alerta = referencia.querySelector('.err');

            // if (alerta) {
            //       alerta.remove();
            // }

            //inyectar el error al formulario
            referencia.appendChild(error);
      }

      function limpiarAlerta(referencia) {
            const alerta = referencia.querySelector('.err');
            if (alerta) {

                  alerta.remove();
            }
      }

      function validarEmail(email) {
            const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            const resultado = regex.test(email);

            return resultado;
      }

      function comprobarEmail() {
            // console.log(Object.values(email)); //Para ver los valores 
            if (Object.values(email).includes('')) {
                  btnSubmit.classList.add('opacity-50')
                  btnSubmit.disabled = true;
                  return;
            }
            btnSubmit.classList.remove('opacity-50')
            btnSubmit.disabled = false;

      }

      function reiniciaObjeto() {
            //Reiniciar el objeto
            email.email = '';
            email.asunto = '';
            email.mensaje = '';

            comprobarEmail();
            formulario.reset();
      }

});

//