$(document).ready(function() {
    //Count characters of tweet
    
    $('#tweet-text').on('input', function() {
     let maxChar = 140;
     console.log($(this).val())
     const inputData = $(this).val().length;
     const remainingChar = maxChar - inputData;
     const $counter = $('#form-new-tweet').children('.submit').children('.counter');
    $counter.text(remainingChar); 

    // style remaining characters
    if(remainingChar < 0) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', 'black');
    }
  })
  
  });
  console.log('CONNECTED!!')