
const fetchTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log("these are our tweets",data)
      document.getElementById("error-message").style.display = "none"
      renderTweets(data)
    },

    error: (err) => {
      console.log(err)
    },
  });
}

const renderTweets = function (tweets) {
  // console.log(tweets)
  $("#tweets").empty();
  tweets.forEach(tweet => {
    const $newTweet = createTweetElement(tweet)
    console.log("this is the new tweet",$newTweet)
    $("#tweets").prepend($newTweet)
  });
}

const createTweetElement = function (tweetData) {

  let $tweet = $(`
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
      `)
  return $tweet;
}
// renderTweets(data);

$(document).ready(function () {
  fetchTweets()
  $('.error').hide()
  $('form').on('submit', function (event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const tweetLength = $("#tweet-text").val().length
    if (tweetLength > 140) {
      document.querySelector('.error').innerHTML = 'text too long. must be less than 140'
      $('.error').show()
      console.log(" must be less than 140 characters")
      return false

    }

    else if ($("#tweet-text").val() === '') {
      document.querySelector('.error').innerHTML = 'Error, Empty tweet.'
      $('.error').show()
      console.log("empty tweet")
      return false
    }
    else {

      $.post('/tweets', serializedData, (response) => {
        console.log("successful post of a new tweet")
        $("#tweet-text").val('');
        $(".counter").val('140');
        fetchTweets();
      });

    }

  });

});