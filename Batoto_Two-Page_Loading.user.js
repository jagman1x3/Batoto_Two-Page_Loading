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

function getNextPageURL(){
  // var urlSplit = url.split('/');
  // var curPageNum = parseInt(urlSplit[urlSplit.length - 1]);
  // var thisPage = urlSplit.slice(0, urlSplit.length - 1).join('/');
  // return thisPage + '/' + (curPageNum + 1).toString();
  // log($('#full_image + div > a').html());
  var nextImage = $('#full_image + div > a').attr('href');
  return nextImage;
}

function addImage(url){
  // log('adding ' + url);
  $.get(url, function(data){
    var imageSrc = $('<div/>').html(data).find('#full_image div > img')[0].src;
    // var image = $('<img>');
    // log(imageSrc);
    // image.attr('src', imageSrc);
    // image.attr('style', 'z-index: 1003; margin:auto; border: 4px solid #000;');
    // var currentImageDiv = $('#full_image div').has('img');
    // log(currentImageDiv);
    var comicPage = $('#comic_page');
    comicPage.css('max-width', '50%');
    var nextPage = comicPage.clone().appendTo(comicPage.parent());
    nextPage.attr('id', 'next_page');
    nextPage.attr('src', imageSrc);
    log('here');
    comicPage.attr('float', 'right');
    log('there');
    nextPage.css('float', 'left');
    log('floating');
    // currentImageDiv.append(image);
    // log(currentImageDiv);
    // $('body').append(image);
  });
}

function clearPage(){
  $('body').html('');
}

// var currentImage = $('#full_image  div > img').attr('src');
// var nextImage = $('#full_image + div > a').attr('href');
var curUrl = window.location.href;
var nextImage = getNextPageURL();
// clearPage();
// log(curUrl);
// log(nextImage);
// addImage(curUrl);
addImage(nextImage);
