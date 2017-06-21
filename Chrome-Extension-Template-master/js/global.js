/*
** file: js/global.js
** description: global javascript library containing code for use across the entire chrome extension, for
**              unique functionality for specific pages, create and use a separate file named "pagename.js"
*/

var API_URL = "https://safebook-2016.herokuapp.com/";
var isCaringOfListenToEvent = true;

//bind events to dom elements
document.addEventListener('DOMContentLoaded', initPostButton(), false);

function initPostButton(){
	loadJS('https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js');
	loadJS('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js');
	injectPopupCode();
	initHomeScreenPost();
	initProfileScreenPost();
	//initComments();
}

function showAlert(text){
    alert(text);
}

var isWorking = false;
function validateText(text, onComplete){
	if(!isWorking){
		$.ajax({
			url: "https://safebook-2016.herokuapp.com/?text=" + encodeURIComponent(text),
			type: "GET",
			contentType: "application/json",
			dataType: "json",
			cache: true,
			success: function(result){
				isWorking = false;
				onComplete(result);
			},
			error: function (xhr, textStatus, errorThrown) {
				isWorking = false;
				console.log("error");
			}
		});
		
		isWorking = true;
	}
}

function initHomeScreenPost(){
	if(isCaringOfListenToEvent){
		var postPopUpArea = document.getElementsByClassName('_559p')[0];
		if(postPopUpArea){
			postPopUpArea.addEventListener('click', function (e) {
				setTimeout(function() {
					var postButton = document.getElementsByClassName('_1mf7 _4jy0 _4jy3 _4jy1 _51sy selected _42ft')[0];
					if (postButton) {
						postButton.addEventListener('mousemove', function () {
							if(isCaringOfListenToEvent){
								var postTextArea = $('[data-offset-key]').find('span')[1].innerHTML;
								validateText(postTextArea, function(result){
									dialogAccordingToResult(result);
								});
							}
						});
					}
				}, 5000);
			});
		}
	}
}

function initProfileScreenPost(){
	if(isCaringOfListenToEvent){
		var postPopUpArea = document.getElementsByClassName('_3u16')[0];
		if(postPopUpArea){
			postPopUpArea.addEventListener('click', function (e) {
				setTimeout(function() {
					var postButton = document.getElementsByClassName('_1mf7 _4jy0 _4jy3 _4jy1 _51sy selected _42ft')[0];
					if (postButton) {
						postButton.addEventListener('mousemove', function () {
							if(isCaringOfListenToEvent){
								var postTextArea = $('[data-offset-key]').find('span')[1].innerHTML;
								validateText(postTextArea, function(result){
									dialogAccordingToResult(result);
								});
							}
						});
					}
				}, 5000);
			});
		}
	}
}

function setIsCare(isCare){
	isCaringOfListenToEvent = isCare;
}

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

function injectPopupCode(){
	var popup = '<div class="modal hide fade"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h4 class="modal-title">Modal title</h4> </div><div class="modal-body"> <p>One fine body…</p></div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Save changes</button> </div></div></div></div>';
	var fragment = create(popup);
	document.body.insertBefore(fragment, document.body.childNodes[0]);
	
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css');
	//document.getElementsByTagName('head')[0].appendChild(link)

	//var container = document.getElementsByClassName('_li')[0];
}

function dialogAccordingToResult(json){
	if(json['bad_content']){
		var cookie = getCookie("profileReport");
		if(cookie){
			setCookie("profileReport", parseInt(cookie) + 1, 9999);
		} else {
			setCookie("profileReport", 1, 9999);
		}
		
		//Show dialog
		var isConfirm = confirm("Your post contains inapropriate language.\n It is recommended to avoid using words like "  + json['bad_words'][0] + "\n Are you sure you want to publish this post?");
		if(isConfirm == true) {
			document.getElementsByClassName('_1mf7 _4jy0 _4jy3 _4jy1 _51sy selected _42ft')[0].click();
			isCaringOfListenToEvent = false;
		}
	}
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function loadJS(file) {
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "application/javascript";
    // make the script element load file
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
}