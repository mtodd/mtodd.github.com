// jQuery 1.2.6 available

// Constants

var ReposToIgnore = [ 'mtodd.github.com',
                      'empty-merb-app-with-authentication',
                      'base-authenticated-merb-app' ];

$(function(){ // Application onLoad
  
  // load posts
  loadSection("#entries", "api/posts.json", function(id, post) {
    return applyTemplate('#entries .template', id, post);
  }, prepend = true);
  
  // load links
  loadSection("#links", "api/links.json", function(id, link) {
    link['url'] = id;
    return applyTemplate('#links .template', id, link);
  });
  
  // load repos
  $.getJSON('http://github.com/api/v1/json/mtodd?callback=?', function(data) {
    $('#repos .content').html(''); // clear out "loading"
    
    // get repos (non-forks and sorted by popularity)
    var repos = $.grep(data.user.repositories, function(repo) { return !repo.fork && !ReposToIgnore.include(repo.name); });
    repos.sort(function(a, b) { return b.watchers - a.watchers; });
    
    $.each(repos, function(id, repo) {
      $('#repos .content').append(applyTemplate('#repos .template', id, repo));
    });
  });
  
});

// Utility Functions

var loadSection = function(element_id, api_url, callback, prepend) {
  if(prepend == undefined) { prepend = false; } // append by default
  $.getJSON(api_url, function(items) {
    $(element_id+' .content').html(''); // clear out "loading"
    // process each item with the provided callback
    $.each(items, function(id, item) {
      if(!prepend) { // determine whether to prepend or append
        $(element_id+' .content').append(callback(id, item));
      } else {
        $(element_id+' .content').prepend(callback(id, item));
      }
    });
  });
}

var applyTemplate = function(element_or_id, id, attributes) {
  template = $(element_or_id);
  content = template.html();
  attributes['id'] = id;
  $.each(attributes, function(key, value) {
    content = content.replace("#"+escape("{"+key+"}"), value, "g"); // escaped version ("#%26id%27" for example)
    content = content.replace("#{"+key+"}", value, "g");
  });
  return content;
}

// Extensions

Array.prototype.index = function(val) {
  for(var i = 0, l = this.length; i < l; i++) {
    if(this[i] == val) return i;
  }
  return null;
}

Array.prototype.include = function(val) {
  return this.index(val) !== null;
}
