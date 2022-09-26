$(function() {
    $("#detailFig").hide();
    $("#result").hide();

    /*********_CODIGO RELACIONADO A VISTA DEL FORMULARIO PARA CALCULAR AREA_************* */
    /**
     * VARIABLE QUE GUARDARA ESTRUCTURA HTML DEL FORMULARIO DE CIRCULO
     */
    let formCicle="<label for='rad' class='form-label'>Radio</label>" +
                    "<input type='number' step='any' id='rad' name='radio' class='form-control' />";


    /**
     * VARIABLE QUE GUARDARA ESTRUCTURA HTML DEL FORMULARIO DE RECTANGULO
     */
    let formRect="<label for='base' class='form-label'>Base</label>"+
                "<input type='number' step='any' id='base' name='base' class='form-control' />" +
                "<label for='altura' class='form-label'>Altura</label>" +
                "<input type='number' step='any' id='altura' name='altura' class='form-control' />";
    
    /**
     * VARIABLE QUE GUARDARA ESTRUCTURA DE BOTON
     */
    let btn="<button id='btn' disabled class='btn btn-primary mt-3'>Calcular</button>";

    /**
     * VALIDARA Y MOSTRAR EL FORMULARIO PARA LA FIGURA ELEGIDA
     */
    let showForm=()=>{
        
        let typeFig=$("#selectFig").val();

        if(typeFig==="1")
            $("#detailFig").html(formCicle+btn);

        else if(typeFig==="2")
            $("#detailFig").html(formRect+btn);
        else
            $("#detailFig").html(""); 

        $("#detailFig").show();
        $("#result").hide();
    };

    /**
     * CAPTURA LA ELECCION DE FIGURA
     */
    $("#selectFig").on('change',showForm);


    /****************CODIGO RELACIONADO CON CALCULO DE AREA*****************/

    /**
     * METODO QUE SE ENCARGARA DE PROCESAR LOS DATOS A CALCULAR
     */
   let processCal=()=>{
        let eleccionFig=$("#selectFig").val();
        let valuesCal=null;
        if(eleccionFig==="1"){
            let radio=$("#rad").val();
            valuesCal={
                'radio': radio,
                'figura': 1
            };

        }else if(eleccionFig==="2"){
            let altura=$("#altura").val();
            let base=$("#base").val();
            valuesCal={
                'altura': altura,
                'base': base,
                'figura': 2
            };

            
        }else{
            return;
        }

        webServiceCalcular(valuesCal);
            
   };

   /**
    * METODO SE ENCARGAR DE ENVIAR DATOS A CALCULAR A WEB_SERVICE
    */
   function webServiceCalcular(data){
        $.ajax({
            type: "POST",
            url: "../service/Calcular.php",
            data: data,
            dataType: "json",
            success: showResult,
        });
   }

   /**
    * METODO QUE MOSTRARA EL RESULTADO EN PANTALLA DEL CALCULO
    */

   function showResult(response){
        let eleccionFig=$("#selectFig").val();
        let resultStruct=null;
        if(eleccionFig==1){
            $("#titleTable").html("Resultado del calculo del circulo");
            let radio=$("#rad").val();
            resultStruct="<tr>"+
                            "<td>Radio</td> <td>"+radio+"</td> </tr>"+
                        "<tr>"+
                            "<td>Area</td> <td>"+response+"</td>";
        
            $("#rad").val("");
        }else if(eleccionFig==2){
            let altura=$("#altura").val();
            let base=$("#base").val();

            $("#titleTable").html("Resultado del calculo del rect&aacute;ngulo");
            resultStruct="<tr>"+
                            "<td>Altura</td> <td>"+altura+"</td> </tr>"+
                        "<tr>"+
                            "<td>Base</td> <td>"+base+"</td> </tr>"+
                        "<tr>"+
                            "<td>&Aacute;rea</td> <td>"+response+"</td>";

            $("#base").val("");
            $("#altura").val("");
        }

        $("#btn").attr('disabled',true);
        $("#tbo").html(resultStruct);
        $("#result").show();
   }

    /**
     * CAPTURA EVENTO EN EL BOTON DE CALCULAR AREA
     */
    $("#detailFig").on('click','#btn', processCal);

    /**
     * CAPTURARA EVENTO DE INPUT DE RADIO
     */
    $("#detailFig").on('change',"#rad", function () {
        
        if($("#btn").attr('disabled')=="disabled"){
            $("#btn").attr('disabled',false);
        }
        
    });

    /**
     * CAPTURARA EVENTO DE INPUT DE ALTURA
     */
    $("#detailFig").on('change',"#altura", function () {
        
        if($("#btn").attr('disabled')=="disabled" && $("#base").val().trim()!=""){
            $("#btn").attr('disabled',false);
        }
    });

    /**
     * CAPTURARA EVENTO DE INPUT DE BASE
     */
    $("#detailFig").on('change',"#base", function () {

        if($("#btn").attr('disabled')=="disabled" && $("#altura").val().trim()!=""){
            $("#btn").attr('disabled',false);
        }
    });
});