(function() {
  'use strict';

  var emojis = [
    'HappyFace',
    'LayingHorse',
    'AngryFace',
    'GrazingHorse',
  ];

  var emojiRegex = new RegExp(':(' + emojis.join('|') + '):', 'g');

  angular.module('starter').filter('emoji', ['$filter', function ($filter) {
    return function (input) {
      if(input){
        return input.replace(emojiRegex, function (match, text) {
          return '<img class="emoji" src="img/emoji/'+ text + '.png">';
        });
      }
    };
  }]);
}());
