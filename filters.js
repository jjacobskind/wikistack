var marked = require('marked');

module.exports = function(swig) {
  var page_link = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='/wiki/"+doc.url_name+"'>"+link_name+"</a>";
  };
  page_link.safe = true;

  marked.safe = true;
 
  swig.setFilter('page_link', page_link);
  swig.setFilter('marked', marked);
};