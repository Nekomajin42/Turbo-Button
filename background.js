// do some stuff on install and update
chrome.runtime.onInstalled.addListener(function(details)
{
	if (details.reason === "install" || details.reason === "update")
	{
		// throw notification
		var options = 
		{
			type : "basic",
			title: "Turbo Button " + details.reason,
			message: "Please, take a look the the Settings page!",
			iconUrl : "icons/icon48.png",
			isClickable: true
		};
		chrome.notifications.create("turbo-button", options, function(notificationID)
		{
			window.setTimeout(function()
			{
				chrome.notifications.clear("turbo-button");
			}, 5000);
		});
		chrome.notifications.onClicked.addListener(function()
		{
			chrome.runtime.openOptionsPage();
		});
	}
});

// set toolbar button on extension load
window.addEventListener("load", function ()
{
	chrome.browserAction.setBadgeBackgroundColor({color: "#CC0000"});
	opr.offroad.enabled.get({}, function(details)
	{
		if (details.levelOfControl === "controllable_by_this_extension" || details.levelOfControl === "controlled_by_this_extension")
		{
			if (details.value == true)
			{
				chrome.browserAction.setBadgeText({text: "on"});
			}
			else
			{
				chrome.browserAction.setBadgeText({text: "off"});
			}
		}
	});
});

// make the toolbar button work
chrome.browserAction.onClicked.addListener(function ()
{
	opr.offroad.enabled.get({}, function(details)
	{
		if (details.levelOfControl === "controllable_by_this_extension" || details.levelOfControl === "controlled_by_this_extension")
		{
			if (details.value == true)
			{
				opr.offroad.enabled.set({value:  false});
				chrome.browserAction.setBadgeText({text: "off"});
			}
			else
			{
				opr.offroad.enabled.set({value:  true});
				chrome.browserAction.setBadgeText({text: "on"});
			}
		}
	});
});