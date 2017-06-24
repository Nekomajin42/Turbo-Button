// stuff to do on page load
window.addEventListener("load", function()
{
	// load subpage from URL hash
	var hash = (location.hash) ? location.hash : "#settings";
	document.querySelector(hash).classList.add("visible");
	document.querySelector(hash + "-nav").classList.add("selected");
	
	// make the menu work
	var subpages = document.querySelectorAll("article");
	var menuitems = document.querySelectorAll("nav ul li a");
	for (var i=0; i<menuitems.length; i++)
	{
		menuitems[i].addEventListener("click", function(e)
		{
			e.preventDefault();
			for (j=0; j<menuitems.length; j++)
			{
				if (this.id == menuitems[j].id)
				{
					subpages[j].classList.add("visible");
					menuitems[j].classList.add("selected");
				}
				else
				{
					subpages[j].classList.remove("visible");
					menuitems[j].classList.remove("selected");
				}
			}
		}, false);
	}
	
	// inject Extensions and KeyConfig page links
	document.getElementById("ext").addEventListener("click", function(e)
	{
		e.preventDefault();
		chrome.tabs.create({url: "opera://extensions/?id=" + chrome.runtime.id});
	}, false);
	document.getElementById("keys").addEventListener("click", function(e)
	{
		e.preventDefault();
		chrome.tabs.create({url: "opera://settings/configureCommands"});
	}, false);
}, false);
