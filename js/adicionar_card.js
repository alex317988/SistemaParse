
Parse.initialize("t8SK0ACNZwEyYi8ghD72W0NZzDNhR5sW2yfMPtYb","GkXLz6Y6lKfHwMQX66Y4Fz48cPa78P4h1ZnGOHs8");

$(document).ready(function(){    

    cat_dropdown();

    //salva um card no parse
    $("#enviar").click(function(e) {
        e.preventDefault();

        //só permite que salve o card se a categoria e algum outro campo estiverem preenchidos
        if((document.getElementById('imagem').value != "" ||
           document.getElementById('descricao').value != "" ||
           document.getElementById('titulo').value != "") &&
           document.getElementById('cat_dropdown').value != ""){

            $("#errorUploading").removeClass("alert alert-danger");
            $("#errorUploading").removeClass("alert alert-success");
            $("#errorUploading").text("");

            //salvando o arquivo enviado com o html
            var fileUploadControl = $("#imagem")[0];
            if (fileUploadControl.files.length > 0) {
                var file = fileUploadControl.files[0];
                var fullPath = document.getElementById('imagem').value;
                var name = fullPath.split(/(\\|\/)/g).pop();

                var parseFile = new Parse.File(name, file);
                parseFile.save();
            }else{
                var parseFile = null;
            }

            //salvando um card com todas as infos do formulario
            var card = Parse.Object.extend("card");
            var card = new card();
            var titulo = document.getElementById('titulo').value;
            var descricao = document.getElementById('descricao').value;
            var categoria = document.getElementById('cat_dropdown').value;

            card.save({img: parseFile, titulo: titulo, descricao: descricao, categoria: categoria}, {
                success: function(object) {
                    $("#errorUploading").addClass("alert alert-success");
                    $("#errorUploading").html("Card salvo com sucesso!<i class=\"glyphicon glyphicon-remove remove_alert\"></i>");
                },
                error: function(model, error) {
                    $("#errorUploading").addClass("alert alert-danger");
                    $("#errorUploading").html("Houve um erro ao salvar o card. Tente novamente.<i class=\"glyphicon glyphicon-remove remove_alert\"></i>");

                }
            });

        }else{
            $("#errorUploading").addClass("alert alert-danger");
            $("#errorUploading").html("Preencha todos os campos do formulário!<i class=\"glyphicon glyphicon-remove remove_alert\"></i>");
        }
    });
    
    //remove as mensagens de falha ou sucesso ao salvar um card/categoria
    $(document).on("click", ".remove_alert", function() {
        $("#errorUploading").removeClass("alert alert-danger");
        $("#errorUploading").removeClass("alert alert-success");
        $("#errorUploading").html("");
    });

});
