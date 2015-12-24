
//UTILIZAR AQUI OS TOKENS DE SUA CONTA PESSOAL DO PARSE
Parse.initialize();

$(document).ready(function() {

	mostra_categorias();

	//adiciona uma categoria, verificando se ela já não existe
    $("#add_cat").click(function() {
        if(confirm("Tem certeza que deseja adicionar essa categoria?")){
            var categoria = Parse.Object.extend("categoria");
            var categoria = new categoria();
            var cat = document.getElementById('categoria').value;
            var existe = false;


            if (document.getElementById(cat)){
                existe = true;
            }


            //verifica se a categoria não é nula ou se já não existe

            if(cat != "" && !existe){

                categoria.save({categoria: cat}, {
                    success: function(object) {
                        $("#errorUploading").addClass("alert alert-success");
                        $("#errorUploading").html("Categoria salva com sucesso!<i class=\"glyphicon glyphicon-remove remove_alert\"></i>");
                    },
                    error: function(model, error) {
                        $("#errorUploading").addClass("alert alert-danger");
                        $("#errorUploading").html("Houve um erro ao salvar a categoria. Tente novamente.<i class=\"glyphicon glyphicon-remove remove_alert\"></i>");

                    }
                });

            }else{
                $("#errorUploading").addClass("alert alert-danger");
                if(cat == ""){
                    $("#errorUploading").html("Formulário vazio!<i class=\"glyphicon glyphicon-remove remove_alert\"></i>");
                }
                if(existe){
                    $("#errorUploading").html("Essa categoria já existe!<i class=\"glyphicon glyphicon-remove remove_alert\"></i>");

                }
            }
           

        }

        mostra_categorias();

    });

    //deleta uma categoria ao clicar no X vermelho. Deleta também todos os cards dessa categoria

	$(document).on("click", ".remove_categoria", function() {
		var categoria = Parse.Object.extend("categoria");
        var query_cat = new Parse.Query(categoria);
        var cat = $(this).prop("title");

        var object_id = $(this).attr('id');

        if(confirm("Você quer mesmo deletar esta categoria? Todos os cards desta categoria também serão deletados.")){
        	query_cat.get(object_id, {
                success: function(result) {
                // The object was retrieved successfully.

                    result.destroy({
                        success: function(result) {
                        // The object was deleted from the Parse Cloud.
                            
                            var card = Parse.Object.extend("card");
					        var query_card = new Parse.Query(card);
					        query_card.equalTo("categoria",cat);

					        query_card.find({
					            success: function(results) {

					            	alert("Categoria deletada. Todos os cards dessa categoria também foram deletados.");

					                for (var i = results.length - 1; i >= 0; i--) {
					                    var object = results[i];
					                    object.destroy();
					                }

					            },
					            error: function(error) {
					                alert("Erro de busca: " + error.code + " " + error.message);
					            }
					        });

                            $("."+object_id).remove();
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

        mostra_categorias();

	});

	//remove as mensagens de falha ou sucesso ao salvar um card/categoria
    $(document).on("click", ".remove_alert", function() {
        $("#errorUploading").removeClass("alert alert-danger");
        $("#errorUploading").removeClass("alert alert-success");
        $("#errorUploading").html("");
    });

});
