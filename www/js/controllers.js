angular.module('starter.controllers', [])

.controller('chatController', ['$scope', '$http', '$timeout',
function ($scope, $http, $timeout) {

  $scope.data = {};

  $scope.data.currentUser = {
    user_id: 1
  }

  $scope.consoleLog = function () {
    console.log("log in chat ctrl");
  }

  function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      console.log("the defined top");
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      console.log("the undefined bottom");
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }



  $scope.data.addEmoji = function (emoji) {

    console.log("adding emoji", emoji);
    var imgEmoji = emoji.substring(1, emoji.length - 1);

    document.getElementById("chatboxDiv").innerHTML += '<img class="emoji" src="img/emoji/'+imgEmoji+'.png"></img>';
    document.getElementById("chatboxDiv").innerHTML = document.getElementById("chatboxDiv").innerHTML.replace(new RegExp('<br>', 'g'), '');
    placeCaretAtEnd(document.getElementById("chatboxDiv"));

  }

  $scope.data.sendChatMessage = function () {

      //var myEl = angular.element(document.querySelector('#chattext'));

      console.log("Sending Message..");
      //$scope.data.chatMessage = myEl;
      var chatMessageEncoded = document.getElementById("chatboxDiv").innerHTML;

      var emojiIds = [ "HappyFace", "AngryFace", "LayingHorse", "GrazingHorse"];

      var emojiIdsLength = emojiIds.length;
      for (var i = 0; i < emojiIdsLength; i++){
        chatMessageEncoded.replace(new RegExp('<img class="emoji" src="img/emoji/' + emojiIds[i] + '.png"></img>', 'g'), ":" + emojiIds[i] + ":");
      }

      //if($scope.data.chatMessage){
      if (chatMessageEncoded.trim() != "") {
      var newMessage = {
        broadcast_id: null,
        content: chatMessageEncoded,
        from_user: 1,
        geographically_limited: false,
        group_id: null,
        latitude: null,
        longitude: null,
        message_created: "2017-04-12T23:46:20.973Z",
        message_id: 5,
        message_type: "chat",
        read: false,
        sent_as_mms: false,
        sent_in_app:true,
        state: null,
        time_read:null,
        to_user: 2,
        zip: null
      }
      $scope.data.convo.messages.push(newMessage);
      console.log($scope.data.convo);
      $scope.data.chatMessage = "";

      document.getElementById("chatboxDiv").innerHTML = "";
    }
  }

  $scope.data.chatMessages = '';

  var url = 'https://whinny-staging.herokuapp.com/chatMessages/1';
  return $http.get(url).then(function (res) {
    $scope.data.chatMessages = res.data;
    for (var i = 0; i < $scope.data.chatMessages.length; i++)
        if ($scope.data.chatMessages[i].convoUser.user_id === 2)
            $scope.data.convo = $scope.data.chatMessages[i];
  });

        }])
