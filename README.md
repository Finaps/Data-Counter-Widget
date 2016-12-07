# Description
This widget performs a database count on a selected object adhering to the XPath contraints set in the modeller. The purpose of this widget is to allow developers to quickly add counters to their Mendix projects. 

## Typical usage scenario
The widget is usefull when displaying counts to either guide proccesses or create a dashboard. The refresh rate is to be configured according to the business purpose.

## Features and limitations
The widget does a count on initialisation and on the interval set in the refresh rate. A limitation is that the refresh rate cannot be below 200ms. When the refresh rate is configured below 200ms the widget will refresh every 200ms.

## Configuration
When adding the widget to a project you have to select the object to count (and optionally add XPath constraints), a refresh rate and a microflow to trigger when clicking on the counter shown to the user.
The minimum refresh rate is set to 200 ms.
 
## Known bugs
None at the moment