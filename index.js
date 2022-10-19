// Antes de ejecutar Javascript espera que toda la página se dibuje. IMP para usar querySelector para asegurar funcionamiento
document.addEventListener('DOMContentLoaded', function(){
    //Variables globales
    const botonEmpezar = document.querySelector('#submit');
    let palabra = document.querySelector('#palabra');
    let mostrarIntentos = document.querySelector('#intentos');
    let lineas = document.querySelector('#muestraPalabra');    
    let mensaje = document.querySelector('#mensaje');
    const botonLetra = document.querySelector('#submit2');
    let usadas = document.querySelector('#letrasUsadas');
    let imagen = document.querySelector('#imagen');
    let letrasUsadas = []; 
    let palabraAdivinada = [];
    let intentos = 5;

    function comenzar(){       
         // Imprime las lineas que iran cambiando
        for(let i in palabra.value){
            palabraAdivinada.push('_');
        }       
        let mostrarPalabra = document.querySelector('#muestraPalabra');
        mostrarPalabra.innerHTML = palabraAdivinada.join(' '); 
        mostrarIntentos.textContent = intentos;
        imagen.src = 'img/perfecto.jpg'; 
        botonEmpezar.disabled = true;  
        palabra.disabled = true;
    
    }
    
    function introducirLetra(){   
        let letra = document.querySelector('#letra').value;    
        let palabraActual = palabra.value;                          
        mensaje.innerHTML = " ";    
        //comprueba si la letra ya existe en letrasUsadas
        if(letrasUsadas.indexOf(letra) != -1){            
            mensaje.innerHTML = 'Letra ya usada';
        } else {           
            letrasUsadas.push(letra);
            for(let i=0;i<palabraActual.length;i++){
                //Si existe la letra en la palabra a adivinar se sustituye
                if(letra == palabraActual[i]){                                    
                    palabraAdivinada[i] = letra;                                                              
                }           
            }
            //Si la letra no esta en la palabra a adivinar te resta intento e imprime mensaje de error
            if(palabraAdivinada.indexOf(letra) == -1){
                
                intentos--;
                mensaje.innerHTML = "Te equivocaste. Te quedan " + intentos + " intentos."
            }
            //modificacion de nodos y comprobaciones           
            lineas.innerHTML = palabraAdivinada.join(' ');
            usadas.innerHTML = letrasUsadas.join(', ');
            mostrarIntentos.textContent = intentos; 
            compruebaImagen();
            comprobarVictoria(); 
            document.querySelector('#letra').value = "";
                      
        }
    
    }
    function compruebaImagen(){
        if(intentos == 4){
            imagen.src = 'img/bien.jpeg';
        }
        else if(intentos == 3){
            imagen.src = 'img/regular.jpg';
        }
        else if(intentos == 2){
            imagen.src = 'img/mal.png';
        }
        else if(intentos == 1){
            imagen.src = 'img/fatal.jpg';
        }
        else if(intentos == 0){
            imagen.src = 'img/muerto.jpg';
        }
    }
    function comprobarVictoria(){
        //Si son iguales la palabra a adivinar y el resultado del usuario entonces imprime mensaje de victoria
        if(palabra.value == palabraAdivinada.join('')){
            mensaje.innerHTML = "Enhorabuena, ganaste";
            palabra.disabled = true;
            letra.disabled = true;            
            botonLetra.disabled = true;
            imagen.src = 'img/bailongo.gif';
        }
        //Si los intentos llegan a 0 has perdido
        if(intentos == 0){
            mensaje.innerHTML = "Lo siento, te quedaste sin intentos, has perdido"
            
            letra.disabled = true;
            botonEmpezar.disabled = true;
            botonLetra.disabled = true;
        }
    }
    //Accion de botones
    
    botonEmpezar.addEventListener('click',comenzar);    
    botonLetra.addEventListener('click',introducirLetra);
    

});