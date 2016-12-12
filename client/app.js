$(function(){
    //sidenav collapse
    $(".button-collapse").sideNav();
    
    //declare io() for the client
    var socket = io();
    
    //click submit
    $('#submitInput').on('click', function(){
        username = $('#usernameInput').val().trim()
        password = $('#passwordInput').val().trim()

        socket.emit('loginData', username, password)
        //send it to the server
    })






    

    //form prevent default
    $('#inputForm').submit(function(event){
        event.preventDefault();
    })
})
