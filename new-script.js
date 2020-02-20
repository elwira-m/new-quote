$(function(){
	
    var prefix = "https://cors-anywhere.herokuapp.com/";
    var tweetLink = "https://twitter.com/intent/tweet?text=";
    /* var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"; */
    var quoteUrl = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";	
	
       
    function getQuote() {
        $.getJSON(prefix + quoteUrl, createTweet);
        $.ajaxSetup({ cache: false });
    }	
	
    function createTweet(input) {

        var data = input[0];
        var quoteText = $(data.content).text().trim();
        var quoteAuthor = data.title;

        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown author";
        }

        var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

        if (tweetText.length > 280) {	                                            	
    	  getQuote();				                                                        
	    } else {
	  	    var tweet = tweetLink + encodeURIComponent(tweetText);
	 	    $('.quote').text(quoteText);
    	    $('.author').text("Author: " + quoteAuthor);
    	    $('.tweet').attr('href', tweet);
	    };
    };
                                         
    $(document).ready(function() {
        getQuote();
        $('.trigger').click(function() {
            getQuote();
        });
    });

});

////////////////Random Chuck Norris Fact//////////

/*$(function(){  

  var url = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";
  
  $('#get-joke').click (function() {
   getJoke();
  });

  function getJoke() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    $(xhr).on('load', function(){
      var response = JSON.parse(xhr.response);
      $('#joke').text(response.value.joke);
    });
    xhr.send();
  };

  getJoke();

});*/
/*
var data = null;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(JSON.parse(this.responseText));
  }
});

xhr.open("GET", "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand");

xhr.send(data);*/
