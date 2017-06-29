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
	
	get();
});

// set toolbar button on extension load
chrome.runtime.onStartup.addListener(function ()
{
	get();
});

// make the toolbar button work
chrome.browserAction.onClicked.addListener(function ()
{
	set();
});

function get()
{
	opr.offroad.enabled.get({}, function(details)
	{
		if (details.levelOfControl === "controllable_by_this_extension" || details.levelOfControl === "controlled_by_this_extension")
		{
			if (details.value == true)
			{
				badge("on");
			}
			else
			{
				badge("off");
			}
		}
	});
}

function set()
{
	opr.offroad.enabled.get({}, function(details)
	{
		if (details.levelOfControl === "controllable_by_this_extension" || details.levelOfControl === "controlled_by_this_extension")
		{
			if (details.value == true)
			{
				opr.offroad.enabled.set({value:  false}, function ()
				{
					badge("off");
				});
			}
			else
			{
				opr.offroad.enabled.set({value:  true}, function ()
				{
					badge("on");
				});
			}
		}
	});
}

function badge(state)
{
	if (state === "on")
	{
		chrome.browserAction.setBadgeText({text: "on"});
		chrome.browserAction.setBadgeTextColor({color: "#ffffff"});
		chrome.browserAction.setBadgeBackgroundColor({color: "#cc0000"});
	}
	else if (state === "off")
	{
		chrome.browserAction.setBadgeText({text: "off"});
		chrome.browserAction.setBadgeTextColor({color: "#ffffff"});
		chrome.browserAction.setBadgeBackgroundColor({color: "#cc00ff"});
	}
}