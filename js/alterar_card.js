
//UTILIZAR AQUI OS TOKENS DE SUA CONTA PESSOAL DO PARSE
Parse.initialize();

//variavel global usada para verificar se algum card ja está sendo alterado
var GLOBAL_ALT_ATIVO = false;

$(document).ready(function() {
	
	cat_dropdown();

    //limpa a div de id cards
    $("#ocultar").click(function() {
        $("#cards").html("");
    });

    //exibe todos os cards do parse
    mostra_cards();
    $("#mostrar").click(function(e) {
        e.preventDefault();

        mostra_cards();
    });

    //deleta o card específico após confirmação
    $(document).on("click",".del_button", function() {
        var card = Parse.Object.extend("card");
        var query = new Parse.Query(card);

        var object_id = $(this).prop("title");

        if(confirm("Você quer mesmo deletar o card de ID "+object_id+"?")){
            query.get(object_id, {
                success: function(result) {
                // The object was retrieved successfully.

                    result.destroy({
                        success: function(result) {
                        // The object was deleted from the Parse Cloud.
                            alert("Card deletado.");
                            mostra_cards();
                        },
                        error: function(result, error) {
                        // The delete failed.
                        // error is a Parse.Error with an error code and message.
                            alert("Erro de exclusão: " + error.code + " " + error.message);
                        }
                    });

                },
                error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
                    alert("Erro de busca: " + error.code + " " + error.message);
                }
            });
        }
    });

	//ao clicar no botão amarelo de alterar card, o sistema adapta a tela para exibir apenas
    //o card alterado e um formulário igual ao de adição de cards. Os campos que forem pre-
    //enchidos serão modificados no card após a confirmação
    $(document).on("click",".alt_button", function() {
        if(GLOBAL_ALT_ATIVO == false){
            GLOBAL_ALT_ATIVO = true;
            var object_id = $(this).prop("title");
            var alt_card = "#alt_card" + object_id;
            $(".quant").css("display","none");
            $(".w3-card-2").css("display","none");            
            $(".buttons").css("display","none");
            $(".disp_button").css("display","none");
            $("hr").css("display","none");
            $(".disp_none").css("display","none");
            $("#selec_cat").css("display","none");
            
            $("."+object_id).show();
            $(alt_card).show();
        }
    });

    //cancela a alteração do card
    $(document).on("click",".cancelar_alt", function() {
        mostra_cards();
        $(".disp_button").show();
        $("#selec_cat").show();
        GLOBAL_ALT_ATIVO = false;
    });

    //aplica a alteração do card após confirmação
    $(document).on("click",".enviar_alt", function() {
        var card = Parse.Object.extend("card");
        var query = new Parse.Query(card);

        var object_id = $(this).prop("title");

        var titulo = "titulo" + object_id; 
        var imagem = "imagem" + object_id;
        var descricao = "descricao" + object_id;
        var categoria = "categoria" + object_id;

        query.get(object_id, {
            success: function(result) {
                
                // The object was retrieved successfully.
                var fileUploadControl = $("#"+imagem)[0];
                if (fileUploadControl.files.length > 0) {
                    var file = fileUploadControl.files[0];
                    var fullPath = document.getElementById(imagem).value;
                    var name = fullPath.split(/(\\|\/)/g).pop();

                    var parseFile = new Parse.File(name, file);
                    parseFile.save();

                    result.set("img",parseFile);
                }
                if(document.getElementById(descricao).value != ""){
                    result.set("descricao",document.getElementById(descricao).value);
                }
                if(document.getElementById(titulo).value != ""){
                    result.set("titulo",document.getElementById(titulo).value);
                }
                if(document.getElementById(categoria).value != ""){
                    result.set("categoria",document.getElementById(categoria).value);
                }
                result.save();

                alert("Suas modificações foram salvas!");
                
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
                
                alert("Erro de busca: " + error.code + " " + error.message);
            }
        });
    
        mostra_cards();
        mostra_cards();
        $(".disp_button").show();
        $("#selec_cat").show();
        GLOBAL_ALT_ATIVO = false;

    });
});
