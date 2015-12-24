    //função que popula o dropdown de categoria
    function cat_dropdown() {
        var categoria = Parse.Object.extend("categoria");
        var query = new Parse.Query(categoria);

        query.find({
            success: function(results) {

                $(".cat_dropdown").html("");

                for (var i = results.length - 1; i >= 0; i--) {
                    var object = results[i];
                    var cat_dropdown = "<option value=\""+object.get("categoria")+"\">"+object.get("categoria")+"</option>";
                    $(".cat_dropdown").html($(".cat_dropdown").html() + cat_dropdown);
                }

                $(".cat_dropdown").prop("selectedIndex", -1);

            },
            error: function(error) {
                alert("Erro de busca: " + error.code + " " + error.message);
            }
        });

    }

    //função que apaga a div cards e reescreve seu conteudo para que apareçam todos os cards ou os da categoria selecionada
    function mostra_cards() {
        var card = Parse.Object.extend("card");
        var query = new Parse.Query(card);
        var categoria = document.getElementById("cat_dropdown").value;
        var cont = 0;

        query.find({
            success: function(results) {

                $("#cards").html("");

                for (var i = results.length - 1; i >= 0; i--) {
                    var object = results[i];
                    //precisa do w3.css para exibir os cards
                    var w3card = 
                    "<div id=\""+object.id+"\" >"    
                        +"<div class=\"card\">"    
                            +"<div class=\"w3-card-2 "+object.id+"\">";
                                if(object.get("titulo")){
                                    w3card = w3card + "<h3>"+object.get("titulo")+"</h3>";
                                }
                                if(object.get("img") != null){
                                    w3card = w3card + "<img src=\""+object.get("img").url()+"\">";
                                }
                                if(object.get("descricao")){
                                    w3card = w3card + "<p>"+object.get("descricao")+"</p>";
                                }
                            w3card = w3card 
                            +"</div><br class=\"disp_none\">"
                            +"<div class=\"buttons\">"
                                +"<div class=\"del_button\" title=\""+object.id+"\">deletar card</div>"
                                +"<div class=\"alt_button\" title=\""+object.id+"\">alterar card</div>"
                            +"</div>"
                        +"</div>"
                        +"<div id=\"alt_card"+object.id+"\" style=\"display:none\" class=\"alt_card\">"
                            +"<form class=\"AlterarDados\" action=\"#\">"
                                +"<br>Categoria: <br><select name=\"categoria\" id=\"categoria"+object.id+"\" class=\"cat_dropdown\" style=\"width: 250px\"></select>"
                                +"<br>Título: <br><input type=\"text\" name=\"titulo"+object.id+"\" id=\"titulo"+object.id+"\">"
                                +"<br>Descrição: <br><textarea name=\"descricao"+object.id+"\" id=\"descricao"+object.id+"\" rows=\"10\" cols=\"60\"></textarea>"    
                                +"<br>Imagem: <input type=\"file\" name=\"imagem"+object.id+"\" id=\"imagem"+object.id+"\">"
                                +"<br><div title=\""+object.id+"\" class=\"enviar_alt\">ALTERAR</div>"
                                +"<div class=\"cancelar_alt\">CANCELAR</div>"
                            +"</form>"
                        +"</div>"
                    +"</div><hr>";
                        
                    if(categoria == ""){
                        $("#cards").html($("#cards").html() + w3card);
                        cont++;
                    }else if(categoria == object.get("categoria")){
                        $("#cards").html($("#cards").html() + w3card);
                        cont++;
                    }
                }


                $("#cards").html("<br><p class=\"quant\"><h3>"+categoria.toUpperCase()+"</h3>("+cont+" resultados)</p><hr>"+$("#cards").html());
                cat_dropdown();

            },
            error: function(error) {
                alert("Erro de busca: " + error.code + " " + error.message);
            }
        });

    }

    //exibe as categorias, com o botão de excluir e o de alterar
    function mostra_categorias() {
        var categoria = Parse.Object.extend("categoria");
        var query = new Parse.Query(categoria);

         query.find({
                success: function(results) {

                    $("#categorias").html("");

                    for (var i = results.length - 1; i >= 0; i--) {
                        var object = results[i];
                        var cat ="<tr class=\""+object.id+"\" >"    
                                    +"<td>"+object.get("categoria")+"</td>"
                                    +"<td><i id=\""+object.id+"\" title=\""+object.get("categoria")+"\" class=\"glyphicon glyphicon-remove red remove_categoria\"></i></td>"
                                +"</tr>"+"<input type=\"hidden\" id=\""+object.get("categoria")+"\" value=\""+object.get("categoria")+"\">";
                        
                        $("#categorias").html($("#categorias").html() + cat);
                    }

                },
                error: function(error) {
                    alert("Erro de busca: " + error.code + " " + error.message);
                }
            });

    }