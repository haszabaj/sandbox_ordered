


  

  
  
    
    //process API results with .replace method for proper display
    
    quote = newQuote.quote.replace(/<(?:.|\n)*?>/gm, '');
    author = newQuote.titles.replace(/<(?:.|\n)*?>/gm, '');
    
    
    if (quote && author) {
      
      /*
      replaceWith is a jQuery method - replaces pointed element (in this case pointed by id) with the provided new content or a function - 
      as a replacement we put not only quote but the whole DOM element - because if we put only the quote the script will work only once
      */
      
       $('#quote').replaceWith('<p id="quote">"' +  quote + '"</p>');
       $('#author').replaceWith('<p id="author">-' + author + '</p>');
    }
  }
  
  /*
  we set up a function (inside of document.ready) that is triggered by by clicking on Get new quote/ this function will be WikiqouteAPI.queryRandomTitle
  */
  
 $("#getquote").click(function(event) {
   
   //queryRandomTitle is defined in WIkiquotes API - takes arguments sucess and error whch we both set up as functions
   
    WikiquoteApi.queryRandomTitle(
      
      //this function is an argument to queryRandomTitle - the success one
      function(title) {
        
        /*
        in case of success run getRandomQuote - it takes arguments: title, success and error. we handle error in the queryRandomTitle, 
        so the only thing we set up is the success - in this case we run quoteReady (the quote processing function) on the quote we got from API
        */
        
      WikiquoteApi.getRandomQuote(title, function(newQuote) {
        quoteReady(newQuote);
      }
    );},
      
      //this function is an argument to queryRandomTitle - the error one - it displays the error message
      
    function(msg) {
      console.log(msg);
    });
   
   //set Default prevention
   event.preventDefault();
  });



//
// WikiquoteApi thanks to Nate Tyler. https://github.com/natetyler/wikiquotes-api
//


//this is using $.ajax to fetch data from API URL

var WikiquoteApi = (function() {

  var wqa = {};

  var API_URL = "https://en.wikiquote.org/w/api.php";

  wqa.queryTitles = function(titles, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "query",
        redirects: "",
        titles: titles
      },

      success: function(result, status) {
        var pages = result.query.pages;
        var pageId = -1;
        for(var p in pages) {
          var page = pages[p];
          if(!("missing" in page)) {
            pageId = page.pageid;
            break;
          }
        }
        if(pageId > 0) {
          success(pageId);
        } else {
          error("No results");
        }
      },

      error: function(xhr, result, status){
        error("Error processing your query");
      }
    });
  };
  
  /* this is exectuded on Wikiquoteapi function after clicking on Get Quote
 first we connect to API using $.ajax - specifying url and different data parameters inside of an object
 function takes two arguments: success and error. we set up success as a function -> in our script sucess function will be wikiQuoteApi.getRandomQuote
 */

  wqa.queryRandomTitle = function(success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "query",
        redirects: "",
        list: "random",
        rnnamespace: "0"
      },

      success: function(result, status) {
        var title = result.query.random[0].title;
        if(title !== undefined) {
          success(title);
        } else {
          error("No results");
        }
      },

      error: function(xhr, result, status){
        error("Error processing your query");
      }
    });
  };

 w 
  wqa.getSectionsForPage = function(pageId, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "parse",
        prop: "sections",
        pageid: pageId
      },

      success: function(result, status){
        var sectionArray = [];
        var sections = result.parse.sections;
        for(var s in sections) {
          var splitNum = sections[s].number.split('.');
          if(splitNum.length > 1 && splitNum[0] === "1") {
            sectionArray.push(sections[s].index);
          }
        }
        if(sectionArray.length === 0) {
          sectionArray.push("1");
        }
        success({ titles: result.parse.title, sections: sectionArray });
      },
      error: function(xhr, result, status){
        error("Error getting sections");
      }
    });
  };

  wqa.getQuotesForSection = function(pageId, sectionIndex, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "parse",
        noimages: "",
        pageid: pageId,
        section: sectionIndex
      },

      success: function(result, status){
        var quotes = result.parse.text["*"];
        var quoteArray = [];

        var $lis = $(quotes).find('li:not(li li)');
        $lis.each(function() {
          $(this).children().remove(':not(b)');
          var $bolds = $(this).find('b');

          if($bolds.length > 0) {
            quoteArray.push($bolds.html());
          } else {
            quoteArray.push($(this).html());
          }
        });
        success({ titles: result.parse.title, quotes: quoteArray });
      },
      error: function(xhr, result, status){
        error("Error getting quotes");
      }
    });
  };

  wqa.openSearch = function(titles, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "opensearch",
        namespace: 0,
        suggest: "",
        search: titles
      },

      success: function(result, status){
        success(result[1]);
      },
      error: function(xhr, result, status){
        error("Error with opensearch for " + titles);
      }
    });
  };
  
  
  //this is exectuted as a success function on queryRandomQuote 

  wqa.getRandomQuote = function(titles, success, error) {

    var errorFunction = function(msg) {
      error(msg);
    };

    var chooseQuote = function(quotes) {
      var randomNum = Math.floor(Math.random()*quotes.quotes.length);
      success(
         { titles: quotes.titles, quote: quotes.quotes[randomNum] }
      );
    };

    var getQuotes = function(pageId, sections) {
      var randomNum = Math.floor(Math.random()*sections.sections.length);
      wqa.getQuotesForSection(pageId, sections.sections[randomNum], chooseQuote, errorFunction);
    };

    var getSections = function(pageId) {
      wqa.getSectionsForPage(pageId, function(sections) { getQuotes(pageId, sections); }, errorFunction);
    };

    wqa.queryTitles(titles, getSections, errorFunction);
  };

  wqa.getCompletelyRandomQuote = function(success, error) {
      wqa.queryRandomTitle(function(title) {
          wqa.getRandomQuote(title, success, error);
      }, error);
  };

  wqa.capitalizeString = function(input) {
    var inputArray = input.split(' ');
    var output = [];
    for(s in inputArray) {
      output.push(inputArray[s].charAt(0).toUpperCase() + inputArray[s].slice(1));
    }
    return output.join(' ');
  };

  return wqa;
}());
});





//
// WikiquoteApi thanks to Nate Tyler. https://github.com/natetyler/wikiquotes-api
//

var WikiquoteApi = (function() {

  var wqa = {};

  var API_URL = "https://en.wikiquote.org/w/api.php";

  wqa.queryTitles = function(titles, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "query",
        redirects: "",
        titles: titles
      },

      success: function(result, status) {
        var pages = result.query.pages;
        var pageId = -1;
        for(var p in pages) {
          var page = pages[p];
          if(!("missing" in page)) {
            pageId = page.pageid;
            break;
          }
        }
        if(pageId > 0) {
          success(pageId);
        } else {
          error("No results");
        }
      },

      error: function(xhr, result, status){
        error("Error processing your query");
      }
    });
  };

  wqa.queryRandomTitle = function(success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "query",
        redirects: "",
        list: "random",
        rnnamespace: "0"
      },

      success: function(result, status) {
        var title = result.query.random[0].title;
        if(title !== undefined) {
          success(title);
        } else {
          error("No results");
        }
      },

      error: function(xhr, result, status){
        error("Error processing your query");
      }
    });
  };

  wqa.getSectionsForPage = function(pageId, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "parse",
        prop: "sections",
        pageid: pageId
      },

      success: function(result, status){
        var sectionArray = [];
        var sections = result.parse.sections;
        for(var s in sections) {
          var splitNum = sections[s].number.split('.');
          if(splitNum.length > 1 && splitNum[0] === "1") {
            sectionArray.push(sections[s].index);
          }
        }
        if(sectionArray.length === 0) {
          sectionArray.push("1");
        }
        success({ titles: result.parse.title, sections: sectionArray });
      },
      error: function(xhr, result, status){
        error("Error getting sections");
      }
    });
  };

  wqa.getQuotesForSection = function(pageId, sectionIndex, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "parse",
        noimages: "",
        pageid: pageId,
        section: sectionIndex
      },

      success: function(result, status){
        var quotes = result.parse.text["*"];
        var quoteArray = [];

        var $lis = $(quotes).find('li:not(li li)');
        $lis.each(function() {
          $(this).children().remove(':not(b)');
          var $bolds = $(this).find('b');

          if($bolds.length > 0) {
            quoteArray.push($bolds.html());
          } else {
            quoteArray.push($(this).html());
          }
        });
        success({ titles: result.parse.title, quotes: quoteArray });
      },
      error: function(xhr, result, status){
        error("Error getting quotes");
      }
    });
  };

  wqa.openSearch = function(titles, success, error) {
    $.ajax({
      url: API_URL,
      dataType: "jsonp",
      data: {
        format: "json",
        action: "opensearch",
        namespace: 0,
        suggest: "",
        search: titles
      },

      success: function(result, status){
        success(result[1]);
      },
      error: function(xhr, result, status){
        error("Error with opensearch for " + titles);
      }
    });
  };

  wqa.getRandomQuote = function(titles, success, error) {

    var errorFunction = function(msg) {
      error(msg);
    };

    var chooseQuote = function(quotes) {
      var randomNum = Math.floor(Math.random()*quotes.quotes.length);
      success(
         { titles: quotes.titles, quote: quotes.quotes[randomNum] }
      );
    };

    var getQuotes = function(pageId, sections) {
      var randomNum = Math.floor(Math.random()*sections.sections.length);
      wqa.getQuotesForSection(pageId, sections.sections[randomNum], chooseQuote, errorFunction);
    };

    var getSections = function(pageId) {
      wqa.getSectionsForPage(pageId, function(sections) { getQuotes(pageId, sections); }, errorFunction);
    };

    wqa.queryTitles(titles, getSections, errorFunction);
  };

  wqa.getCompletelyRandomQuote = function(success, error) {
      wqa.queryRandomTitle(function(title) {
          wqa.getRandomQuote(title, success, error);
      }, error);
  };

  wqa.capitalizeString = function(input) {
    var inputArray = input.split(' ');
    var output = [];
    for(s in inputArray) {
      output.push(inputArray[s].charAt(0).toUpperCase() + inputArray[s].slice(1));
    }
    return output.join(' ');
  };

  return wqa;
}());
