$(function() {
    $("#detailFig").hide();
    $("#result").hide();

    /******************_CODIGO RELACIONADO A VISTA DEL FORMULARIO PARA CALCULAR AREA_********************************* */
    /**
     * VARIABLE QUE GUARDARA ESTRUCTURA HTML DEL FORMULARIO DE CIRCULO
     */
    let formCicle="<label for='lOpuesto' class='form-label'>Lado Opuesto</label>" +
                    "<input type='number' step='any' id='lOpuesto' name='lOpuesto' class='form-control' />"+
                    "<label for='lAdyacente' class='form-label'>Lado Adyacente</label>" +
                    "<input type='number' step='any' id='lAdyacente' name='lAdyacente' class='form-control' />" +
                    "<label for='hipotenusa' class='form-label'>Hipotenusa</label>" +
                    "<input type='number' step='any' id='hipotenusa' name='hipotenusa' class='form-control' />";


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


    /****************CODIGO RELACIONADO CON CALCULO DE AREA****************************************** */

    /**
     * METODO QUE SE ENCARGARA DE PROCESAR LOS DATOS A CALCULAR
     */
   let processCal=()=>{
        let eleccionFig=$("#selectFig").val();
        let valuesCal=null;
        if(eleccionFig==="1"){
            let lOpuesto=$("#lOpuesto").val();
            let lAdyacente=$("#lAdyacente").val();
            let hipotenusa=$("#hipotenusa").val();
            valuesCal={
                'opuesto': lOpuesto,
                'adyacente': lAdyacente,
                'hipotenusa': hipotenusa,
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
            url: "../service/Calculo.php",
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
            $("#titleTable").html("Resultado del calculo del triangulo rect&aacute;ngulo");
            let lOpuesto=$("#lOpuesto").val();
            let lAdyacente=$("#lAdyacente").val();
            let hipotenusa=$("#hipotenusa").val();
            resultStruct="<tr>"+
                            "<td>Lado Opuesto</td> <td>"+lOpuesto+"</td> </tr>"+
                        "<tr>"+
                            "<td>Lado Adyacente</td> <td>"+lAdyacente+"</td> </tr>"+
                        "<tr>"+
                            "<td>Hipotenusa</td> <td>"+hipotenusa+"</td> </tr>";
        
            $("#lOpuesto").val("");
            $("#lAdyacente").val("");
            $("#hipotenusa").val("");
        }else if(eleccionFig==2){
            let altura=$("#altura").val();
            let base=$("#base").val();

            $("#titleTable").html("Resultado del calculo del rect&aacute;ngulo");
            resultStruct="<tr>"+
                            "<td>Altura</td> <td>"+altura+"</td> </tr>"+
                        "<tr>"+
                            "<td>Base</td> <td>"+base+"</td> </tr>";

            $("#base").val("");
            $("#altura").val("");
        }

        resultStruct=resultStruct+" <tr>"+
        "<td>&Aacute;rea</td> <td>"+response['area']+"</td>"+
        "<tr>"+
            "<td>Perimetro</td> <td>"+response['perimetro']+"</td>"+
        "<tr>"+
        "<td>Nombre de figura</td> <td>"+response['nombreFig']+"</td>";

        $("#btn").attr('disabled',true);
        $("#tbo").html(resultStruct);
        $("#result").show();
   }

    /**
     * CAPTURA EVENTO EN EL BOTON DE CALCULAR AREA Y PERIMETRO
     */
    $("#detailFig").on('click','#btn', processCal);

    /**
     * CAPTURARA EVENTO DE INPUT DE LADO OPUESTO
     */
    $("#detailFig").on('change',"#lOpuesto", function () {
        
        if($("#btn").attr('disabled')=="disabled" && $("#lAdyacente").val().trim()!="" && $("#hipotenusa").val().trim()!=""){
            $("#btn").attr('disabled',false);
        }

        if($("#lOpuesto").val().trim()=="" || $("#lOpuesto").val().trim()=="0"){
            $("#btn").attr('disabled',true);
        }
        
    });

    /**
     * CAPTURARA EVENTO DE INPUT DE LADO ADYACENTE
     */
    $("#detailFig").on('change',"#lAdyacente", function () {
        
        if($("#btn").attr('disabled')=="disabled" && $("#lOpuesto").val().trim()!="" && $("#hipotenusa").val().trim()!=""){
            $("#btn").attr('disabled',false);
        }

        if($("#lAdyacente").val().trim()=="" || $("#lAdyacente").val().trim()=="0"){
            $("#btn").attr('disabled',true);
        }
        
    });

    /**
     * CAPTURARA EVENTO DE INPUT DE HIPOTENUSA
     */
    $("#detailFig").on('change',"#hipotenusa", function () {
        
        if($("#btn").attr('disabled')=="disabled" && $("#lAdyacente").val().trim()!="" && $("#lOpuesto").val().trim()!=""){
            $("#btn").attr('disabled',false);
        }

        if($("#hipotenusa").val().trim()=="" || $("#hipotenusa").val().trim()=="0"){
            $("#btn").attr('disabled',true);
        }
        
    });

    /**
     * CAPTURARA EVENTO DE INPUT DE ALTURA
     */
    $("#detailFig").on('change',"#altura", function () {
        
        if($("#btn").attr('disabled')=="disabled" && $("#base").val().trim()!="" && $("#base").val().trim()>0){
            $("#btn").attr('disabled',false);
        }

        if($("#altura").val().trim()=="" || $("#altura").val().trim()=="0"){
            $("#btn").attr('disabled',true);
        }
    });

    /**
     * CAPTURARA EVENTO DE INPUT DE BASE
     */
    $("#detailFig").on('change',"#base", function () {

        if($("#btn").attr('disabled')=="disabled" && $("#altura").val().trim()!="" && $("#altura").val().trim()>0){
            $("#btn").attr('disabled',false);
        }
        
        if($("#base").val().trim()=="" || $("#base").val().trim()=="0"){
            $("#btn").attr('disabled',true);
        }
    });
});