$(function(){
    //sidenav collapse
    $(".button-collapse").sideNav();

    //click submit
    $('#submitInput').on('click', function(){
        console.log($('#usernameInput').val(),$('#passwordInput').val() )
        //send it to the server
    })

    //form prevent default
    $('#inputForm').submit(function(event){
        event.preventDefault();
    })


})
