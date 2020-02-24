////////////////////////Random quote machine///////////////////

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
        var quoteText = $(data.content.rendered).text().trim();
        var quoteAuthor = data.title.rendered;

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
