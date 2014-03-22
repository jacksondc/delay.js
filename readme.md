#Delay.js
A little library for slowing down your interface.

##What it Does
Delay gives users some time to undo their actions before they take effect. It's intended for background tasks where the user won't see the result immediately anyways. For instance, you could stop showing a record immediately, but not delete it from the database until the user has had a chance to undo.

[Demo](jacksondc.github.io/delay.js)

##Usage
- Include the `delay.js` file
- Add the `delay-button` class to your button
- Listen for the `delay-confirmed` event instead of the `click` event

##Customization
###Time
Set the amount of time to wait before confirmation (in milliseconds) with the `data-delay-time` property. Defaults to `5000`.

###Success
Set the button's success text, which should prompt for an undo. Defaults to "Undo".

###Default
Set the button's default text, for when the user's action is over. Defaults to whatever it said when the page loaded.

##Hooks
###Delay-started event
Fires when the user takes an action.

###Delay-confirmed event
Fires when the action confirms, after a set interval (see the time section.)

###Delay-undone event
Fires when the user undoes an action.