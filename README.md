# 335-05 Project 2 Asgwilanga Caverns Blue Causeways
Team: JVU
Team Member: James Vu

## Intro
This program navigates the Asgwilanga Cavern system which is made up of different Cave subsystems. Each cave room has a three-part ID name made up of positive integers. The cave room ID name have unique properties. The closer the residue of the room ID is to zero, the closer the room is to the center of the Cavern system. The residue is the sum of the absolute values of the differences of the three integer ID name. When navigating through the cave system, there are causeways connecting the rooms following three rules: ID Limit Rule where the max limit for the first ID is 16, second ID is 8, and third ID is 7, Sum Rule where the sum of all ID part is 16, and Zero-Max Rule where the two changed room ID parts must be zero or the max limit. The program stops at the room closest to the center. The current room is colored in green, the previous rooms are blue, and the minimum residue room is orange.

### Content
big-O-analysis.pdf
causeways.js
draw-stuff.js
js-2.html
README.md
sample.png
styles.css

### External Requirements
Browsers such as Chrome, Edge, Firefox.
Text editor (if you want to change the delay when changing rooms)

### Setup and Installation
Open up File Explorer and drag js-2.html into the browser.

### Sample Invocation
Can be found in sample.png. Sample shows the ending room

### Features
Including: A grid, delay, finding minimum residue, update function
Missing: None

### Bugs
None found so far
