$(function () {
    let socket = io();
    let name = '';
    let nameInput = $('#name-input');
    let chatInput = $('#chat-input');

  $('#name-input').on('keypress', function (event) {
    if(event.which === 13){
      event.preventDefault();
      if (nameInput.val() !== '') {
                name = nameInput.val();
                nameInput.val("");
                $('.enter-name').hide();
                $('.submit-name').hide();
              
                socket.emit('newMember', name);
        }
    }

  });

    $('.submit-name').on('click', function(event) {
      event.preventDefault();
  
     
      if (nameInput.val() !== "") {
        name = nameInput.val();
        nameInput.val("");
        $(".enter-name").hide();
        socket.emit("newMember", name);
      }
    });

    chatInput.keydown(function(event) {
      if (event.which === 13) {
        event.preventDefault();
  
       
        if (chatInput.val() !== "" && name !== "") {
          socket.emit("newMessage", {name: name, msg: chatInput.val()});
          chatInput.val("");
        }
      }
    });

    
    $(".submit-chat-message").on("click", function(event) {
      event.preventDefault();

      if (chatInput.val() !== "" && name !== "") {
        socket.emit("newMessage", {name: name, msg: chatInput.val()});
        chatInput.val("");
      }
      
    });
  
    socket.on("newMessage", function(msgObject){
      $("#messages").append($('<div class="msg new-chat-message">').html('<span class="member-name">' + msgObject.name + "</span>: " + msgObject.msg));
      $('.chat-window').scrollTop($('#messages').height());
    });
  
    
    socket.on("newMember", function(name){
      $("#messages").append($('<div class="msg new-member">').text(name + " ienāca čatiņā:"));
      $(".chat-window").scrollTop($("#messages").height());
    });

  });
  