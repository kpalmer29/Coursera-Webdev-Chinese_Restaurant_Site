
// $(function () {
//
//     $("#navToggle").blur(function (event) {
//         var screenwidth = window.innerWidth;
//         if (screenwidth < 992) {
//             $("#navbarNav").collapse('hide');
//         }
//     });
// });

(function (global) {

    var dc = {};

    //html for jumbotron
    var homeHtml = "snippets/home-snippet.html";

    //URL to receive Menu-Categories JSON
    var categoriesURL ="https://davids-restaurant.herokuapp.com/categories.json";

    //HTML for building menu-categories page
    var categoriesTitleHTML = "snippets/menu-categories.html";
    var categoryHTML = "snippets/category-snippet.html";

    //URL to receive JSON for a single menu-category page
    var menuItemsURL = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";

    //HTML for building single menu-category page
    var menuItemsTitle = "snippets/menu-items-title.html";
    var menuItemHTML = "snippets/menu-item.html";

    //helper function for inserting html into a target element id.
    var insertHtml = function(selector,html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHtml = html;
    };

    //helper function to display Ajax-loader while content is being loaded
    var showloading = function(selector) {
        var html = "<div class='text-center'>";
        html += '<img src="https://commons.wikimedia.org/wiki/File:Ajax-loader.gif"></div>';
        insertHtml(selector,html);
    };

    //helper function to replace placeholders in HTML
    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    //function to load the jumbotron into #main-content upon page loading
    document.addEventListener("DOMContentLoaded", function (event){

        showloading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);
    });

    //function to load the menu-categories page into #main-content
    dc.loadMenuCategories = function () {
        showloading("#main-content");
        $ajaxUtils.sendGetRequest(categoriesURL, buildAndShowCategoriesHTML, false);
    };

    //function to load the menu-items (single category) page into #main-content
    dc.loadMenuItems = function (categoryShort) {
        showloading("#mgitain-content");
        $ajaxUtils.sendGetRequest(
            menuItemsURL + categoryShort,
            buildAndShowMenuItemsHTML);
    };


    //loadMenuItems helper. Calls buildMenuItemsViewHTML and insertHtml to generate
    //and insert the html needed to display the menu-items page
    function buildAndShowMenuItemsHTML (categoryMenuItems) {

        $ajaxUtils.sendGetRequest(
            menuItemsTitle,
            function (menuItemsTitle) {

                $ajaxUtils.sendGetRequest(
                    menuItemHTML,
                    function (menuItemHTML) {
                        var menuItemsView =
                            buildMenuItemsViewHtml(categoryMenuItems,
                                menuItemsTitle,
                                menuItemHTML);
                        insertHtml("#main-content", menuItemsView);
                    },
                    false);
            },
        false);
    }

    //buildAndShowMenuItems helper functions. Generates the HTML which the calling function inserts
    //into #main-section
    function buildMenuItemsViewHtml (categoryMenuItems,
                                     menuItemsTitleHTML,
                                     menuItemHtml) {
        menuItemsTitleHTML = insertProperty(menuItemsTitleHTML,
                                            "name",
                                            categoryMenuItems.category.name);
        menuItemsTitleHTML = insertProperty(menuItemsTitleHTML,
                                             "speical_instructions",
                                            categoryMenuItems.category.special_instructions);

        var finalHtml = menuItemsTitleHTML;
        finalHtml += "<section class='row'>";

        var menuItems = categoryMenuItems.menu_items;

        for (var i = 0; i < menuItems.length; i++) {

            var html = menuItemHtml;

            html = insertProperty(html, "short_name", menuItems[i].short_name);
            html = insertProperty(html, "price_small", menuItems[i].price_small);

            html = insertItemPrice(html, "price_small", menuItems[i].price_small);
            html = insertItemPortionName(html, "small_portion_name", menuItems[i].small_portion_name);
            html = insertItemPrice(html, "price_large", menuItems[i].price_large);
            html = insertItemPortionName(html, "large_portion_name", menuItems[i].large_portion_name);

            html = insertProperty(html, "name", menuItems[i].name);
            html = insertProperty(html, "description", menuItems[i].description);


            finalHtml += html;

        }
        finalHtml += "</section>";
        return finalHtml;
    }

    //buildMenuItemsViewHtml helper function. Utilizes insertProperty to replace price placeholders in
    //menu-item.html
    function insertItemPrice(html, name, priceValue) {

        if (!priceValue) {
            return insertProperty(html, name, "");
        }

        priceValue = "$" + priceValue.toFixed(2);
        html = insertProperty(html, name, priceValue);
        return html;
    }

    //buildMenuItemsViewHtml helper function. Utilizes insertProperty to replace portion placeholders in
    //menu-item.html
    function insertItemPortionName(html, name, portionValue) {

        if(!portionValue) {
            return insertProperty(html, name, "");
        }


    }

    //loadMenuCategories helper function. Generates and inserts code to display menu-categories page
    function buildAndShowCategoriesHTML (categories) {
        $ajaxUtils.sendGetRequest(
            categoriesTitleHTML,
            function (categoriesTitleHTML){
                $ajaxUtils.sendGetRequest(
                    categoryHTML,
                    function (categoryHTML) {
                    var categoriesViewHTML =
                        buildCategoriesViewHtml(categories,
                        categoriesTitleHTML,
                        categoryHTML);
                    insertHtml("#main-content", categoriesViewHTML);
                    },
                    false);
        },
            false);
    }

    //buildAndShowCategoriesHTML helper function. Generates the HTML which is then inserted into #main-content
    function buildCategoriesViewHtml (categories,
                                      categoriesTitleHTML,
                                      categoryHTML) {
        var finalHtml = categoriesTitleHTML;
        finalHtml += "<section class='row'>";

        for (var i = 0; i < categories.length; i++) {
            var html = categoryHTML;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);
            finalHtml += html;
        }

        finalHtml += "</section>";

        return finalHtml;
    }

    global.$dc = dc;

}) (window);