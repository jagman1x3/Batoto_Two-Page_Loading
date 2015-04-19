// ==UserScript==
// @name        Batoto Two-Page Loading
// @namespace   jagman1x3
// @description Load two pages at a time on Bato.to
// @include     http://bato.to/read/*
// @version     1
// @grant       none
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function log(text){
  unsafeWindow.console.log(text);
}

function hasNextPage(){
  var pages = $('#page_select option');
  var curPage = $('#page_select option:selected').text().split(' ')[1];
  // two page select boxes, use half the length
  var numPages = pages.length / 2;
  log("current page: " + curPage + " of " + numPages);
  return curPage < numPages;
}

function getNextPageURL(){
  return $('#full_image + div > a').attr('href');
}

function addImage(url){
  $.get(url, function(data){
    var imageSrc = $('<div/>').html(data).find('#full_image div > img')[0].src;
    var comicPage = $('#comic_page');
    comicPage.css('max-width', '50%');
    var nextPage = comicPage.clone().appendTo(comicPage.parent());
    nextPage.attr('id', 'next_page');
    nextPage.attr('src', imageSrc);
    comicPage.attr('float', 'right');
    nextPage.css('float', 'left');
    var nextNextUrl = $('<div/>').html(data).find('#full_image + div > a').attr('href');
    log('next next ' + nextNextUrl);
    $('#full_image + div > a').attr('href', nextNextUrl);
  });
}

if (hasNextPage()){
  var nextImage = getNextPageURL();
  log("adding " + nextImage);
  addImage(nextImage);  
}
