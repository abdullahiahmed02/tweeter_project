$(document).ready(function() {

const fetchTweets= ()=> { 
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: (data) => {
        console.log(data)
        renderTweets(data)
      },
  
      error: (err) => {
        console.log(err)
      },
  
    });
  }   
  fetchTweets()
  $('.error').hide()
  
  $('#form-new-tweet').on('submit', function(event) {

    event.preventDefault();
    const serializedData = $(this).serialize();
    const tweetLength = $("#tweet-text").val().length
    if (tweetLength > 140) {
      document.querySelector('.error').innerHTML = 'text too long. must be less than 140'
      $('.error').show() 
      console.log(" must be less than 140 characters")
      // alert("ERROR: tweet must be less than 140 characters")
      return false
    
    }

    else if ($("#tweet-text").val() === '') {
      document.querySelector('.error').innerHTML = 'Sorry, Tweet cannot be empty'
      $('.error').show() 
      console.log("Sorry, tweet cannot be empty tweet")
      // alert("ERROR: EMPTY TWEET")
      return false
    }
  else { 

    $.post('/tweets', serializedData, (response) => {
      $("#form-new-tweet").trigger("reset")
      fetchTweets();

     });

  }

  });


  const renderTweets = function(tweets) {
    $("#tweets").empty();
    for (const tweet of tweets) {
      const $newTweet = createTweetElement(tweet)
      $("#tweets").prepend($newTweet)
    }
    
    }
    
    const createTweetElement = function(tweetData) {
    let $tweet =`
    <article class="tweet">
        <header class="tweet">
          <div class="tweet">
            <img height="50px" width="50px" class="avatars" src="${tweetData.user.avatars}">
            <p>${tweetData.user.name}</p>
          </div>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
    
        <main class="content">
          ${tweetData.content.text}
        </main>
    
        <footer class="tweet">
          <p class="created_at">${timeago.format(tweetData.created_at)}</p>
          <div class="icons">
            <div class="flag"><i class="fas fa-flag"></i></div>
            <div class="retweet"><i class="fas fa-retweet"></i></div>
            <div class="like"><i class="fas fa-heart"></i></div>  
          </div>
        </footer>
    
        </article>
    `
    
    // ...
    return $tweet;
    }
    
    renderTweets(data);





});



