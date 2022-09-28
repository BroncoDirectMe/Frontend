<h1> BroncoDirectMe </h1>

<p> An extension for Chrome that is an alternative frontend for the BroncoDirect website. This extension allows Cal Poly Pomona students to access BroncoDirect information from anywhere while browsing the web. </p>

<h3> BroncoDirectMe Frontend </h3>

<p> This repository contains all required code to drive the frontend for the BroncoDirectMe Chromium extension. This mainly includes the composition and rendering of the user interface.</p>

<h2> Recommended IDE Settings for Various IDEs </h2> 
<h3> Recommanded <code> .vscode/settings.json </code> Setup</h3>
<code>
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
</code>
<h2> Features </h2> 

<h3> Content Script </h3>
<p> Function: allows Developers to modify the DOM of the app. </p> 

<h3> User Interface/ User Experience </h3>
<p> Function: A centralized place for the user to adjust the settings of the extension. </p> 

<h3> Toggle Enabled Button </h3>
<p> Function: This button is used to enable or disable the extenson. </p>

<p> Function </p> 
<ul>
<li> Displays on top right of extension. </li>
<li> State is logged when the button is pressed. </li>
<li> Logging passes state to parents. </li>
</ul>

<h3> Dynamic search results </h3>
<p> Function: This module allows the user to have a list of professors generated based on their search query. </p>

<h3> Popup search bar </h3> 
<p> Function: Search bar meant to log searches made in the app. </p>

<h3> Upvote/Downvote button </h3>
<p> Function: This button is used to provide user feedback on the professors. Upon pressing, the button logs either one upvote or one downvote towards the professor's rating. </p> 

<h3> Professor Info Page </h3> 
<p> Function: This feature is used to display some information on a selacted professor. The info comes in a popup that can be closed. </p> 

<h3> Identify BroncoDirect Page </h3>
<p> Function: The extension must know what page its on. It must only work on the various pages of BroncoDirect. </p>

<h3> Display Professor Ratings </h3>
<p> Function Displays relevant professors' ratings. </p>


