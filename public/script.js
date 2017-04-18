$(function() {

  var peerReviewCanvas = $('#peer-review')[0];
  var peerReviewContext = peerReviewCanvas.getContext('2d');
  var  colors = [
    'yellow',
    'purple',
    'silver',
    'green',
    'red',
    'blue',
    'orange',
    'fuschia',
    'cyan'
  ]

  // draw peer review chart
  peerReviewContext.strokeText("Peer Review", 90, 10);
  for(var i = 0; i < 11; i++) {
    peerReviewContext.strokeText(10 - i, 10, 30 + (i * 20));
    peerReviewContext.moveTo(25, 30 + (i * 20));
    peerReviewContext.lineTo(90, 30 + (i * 20));

  }
  peerReviewContext.stroke();

  // draw the peer review graph
  $.ajax({
    url: '/peerReview.json',
    dataType: 'json',
    success: function(data) {
      var categories = Object.keys(data);
      categories.forEach(function(category, index) {
        var value = data[category];
        var x = 30 + (index * 10);
        var y = 30 + ((10 - value) * 20);
        var height = value * 20;

        peerReviewContext.fillStyle = colors[index];
        peerReviewContext.fillRect(x, y, 5, height);
        peerReviewContext.fillRect(100, 80 + (20 * index), 10, 10);
        peerReviewContext.strokeText(category, 120, 90 + (20 * index));
      });
    }
  });

var pointDistributionCanvas = $('#point-distribution')[0];
var pointDistributionContext = pointDistributionCanvas.getContext('2d');
  // draw the point distribution graph
  $.ajax({
    url: '/pointDistribution.json',
    dataType: 'json',
    success: function(data) {
      var people = Object.keys(data);
      var total = Object.values(data).reduce(function(acc, value) {
        return acc + value;
      }, 0);
      var start = 0;
      var end = 0;
      people.forEach(function(person, index) {
        var percent = data[person] / total;
        var end = start + (percent * 2 * Math.PI);
        pointDistributionContext.beginPath();
        pointDistributionContext.arc(100, 100, 80, start, end);
        start = end;
        pointDistributionContext.fillStyle = colors[index];
        pointDistributionContext.fill()
      });
    }
  });
});
