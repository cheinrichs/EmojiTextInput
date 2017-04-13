angular.module('starter.controllers', [])

.controller('chatController', ['$scope', '$http',
function ($scope, $http) {

  $scope.data = {};

  $scope.data.currentUser = {
    user_id: 1
  }

  $scope.consoleLog = function () {
    console.log("log in chat ctrl");
  }

  $scope.data.addEmoji = function (emoji) {
    console.log("adding emoji", emoji);
    if($scope.data.chatMessage){
      $scope.data.chatMessage = $scope.data.chatMessage + " " + emoji;
    } else {
      $scope.data.chatMessage = "" + emoji;
    }
  }

  $scope.data.sendChatMessage = function () {
    console.log("Sending Message");
    if($scope.data.chatMessage){
      var newMessage = {
        broadcast_id: null,
        content: $scope.data.chatMessage,
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
    }
  }

  $scope.data.chatMessages = '';
  var url = 'https://whinny-staging.herokuapp.com/chatMessages/1';
  return $http.get(url).then(function (res) {
    $scope.data.chatMessages = res.data;
    for (var i = 0; i < $scope.data.chatMessages.length; i++) if($scope.data.chatMessages[i].convoUser.user_id === 2) $scope.data.convo = $scope.data.chatMessages[i];
  });

}])
