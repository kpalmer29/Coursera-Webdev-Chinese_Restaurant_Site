# Coursera-Front-End-Dev
Based off of the David Chu's China Bistro website built in the John Hopkins Coursera *HTML, CSS, Javascript for Web Developers* Course. Unlike the version of the website built in that course, this version utilizes Bootstrap v 5.0. 

## index.html
Main page. Includes a Navbar, Footer, and a div tag (id="main-content") for loading other content into the body of the website. Tags for importing Bootstrap v5.0 and JQuery are included on this page. 

## main-styles.css
Stylesheet for index.html. Uses responsive design.

## menu-items.html
Depreciated - no longer used in the functionality of the website. This html page was used in the initial design of the menu-items page. 

## home-snippet.html
Contains the HTML inserted into the main-section of the website upon loading. This documents contains the HTML for the jumbotron image.

## menu-categories.html && category-snippet.html
Contains the HTML implemented by JS functions to display the menu-category page

## menu-items-title.html && menu-item.html
Contains the HTML implemented by JS functions to display a single menu-category

## ajax-utils.js
JS page containing ajax-utils functionality

## main-script.js
Contains the bulk of the JS used in the website. Notable functions are: 

"""
document.addEventListener("DOMContent Loaded ... ) :
This function loads the jumbotron into the #main-content section in the body of HTML upon the website loading.

dc.loadMenuCategories:
This function utilizes helper functions to load the menu categories page into #main-content upon the user clicking the appropriate links. Data for this page is retrieved in json format from a Herokuapp hosted site.

dc.loadMenuItems:
This function utilizes helper functions to load the page to display a single menu category. Data for this page is retrieved in json format from a Herokuapp hosted site.
"""
