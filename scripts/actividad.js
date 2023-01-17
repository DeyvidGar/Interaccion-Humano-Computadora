function verificarRespuestas(){
    //numero de preguntas
    var total = 6;
    var puntos = 0;

    var myForm = document.forms['quizForm'];//nombre del formulario
    
    var respuestas = ["b", "a", "b", "c", "c", "d"];

    for(i = 0 ; i<total; i++){
        if(myForm["p" + i].value === null || myForm["p" + i].value === ""){
            alert("Favor de contestar la pregunta " + i);
            return false;
        }
        else{
            
            console.log(myForm["p"+i].value);
            console.log(respuestas[i]);
            if(myForm["p"+i].value === respuestas[i]){
                puntos++;
                console.log(puntos);
            }
        }
    }

    var resultado = document.getElementById("resultado");

    var promedio = (puntos/total)*100;
    var conDecimal = promedio.toFixed(2); 
    
    console.log(resultado);
    resultado.innerHTML = '<h3 class="h3-quiz">Puntuación: <span class="span-quiz">' + puntos + '</span> de <span class="span-quiz">' + total + '</span> puntos ('+ conDecimal +'%).</h3><div class="respuestas"><p>Las respuestas son:</p><p>1. Ella cerró la tienda ayer <span>She closed the store yesterday</span></p><p>2. Todos saltaron cuando escucharon esa canción en el concierto <span>All the people jumped when they heard that song at the concert</span></p><p>3. Fui a tu casa en mi bicicleta <span>I went to your house on my bicycle</span></p><p>4. No fui a tu casa en mi bicicleta <span>I didn’t go to your house on my bicycle</span></p><p>5. ¿Recordaste la respuesta correcta justo antes del final del examen? <span>Did you remember the correct answer just before the end of test time?</span></p><p>6. Could you close the door, please? <span>This question is not in the past simple</span></p></div>';

    return false;
}