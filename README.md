# Tutti Frutti

![Tutti Frutti logo](assets\images\logo_red_3d.png)

This is a colourful memory card game with an Italian fruity emoji theme .

- [Tutti Frutti](#tutti-frutti)
  - [UX](#ux)
    - [Scope](#scope)
      - [User stories](#user-stories)
    - [Structure](#structure)
    - [Skeleton](#skeleton)
    - [Surface](#surface)
      - [Colours](#colours)
      - [Icons](#icons)
      - [Images](#images)
      - [Fonts](#fonts)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Testing](#testing)
    - [Performance Testing](#performance-testing)
    - [Known issues](#known-issues)
    - [Project barriers and solutions](#project-barriers-and-solutions)
    - [Version control](#version-control)
    - [Functionality Testing](#functionality-testing)
    - [CSS3 validator](#css3-validator)
    - [HTML5 validator](#html5-validator)
    - [Usability Testing](#usability-testing)
    - [Compatibility Testing](#compatibility-testing)
    - [Testing User Stories](#testing-user-stories)
  - [Deployment](#deployment)
  - [Credits](#credits)
    - [Content](#content)
    - [Resources](#resources)
    - [Media](#media)
    - [Acknowledgements](#acknowledgements)

## UX

### Scope

The site is three pages, it containes a menu page , a game page and an info page .  Its targeted at users of all ages and types.

#### User stories

1. As a visitor to this game site , I want to be able to play a fun game and test my memory.
2. As a visitor to this game site , I want the ability to change the colour theme of the game so it doesn't strain my eyes.
3. As a visitor to this game site , I want the ability to select a difficulty level that suits me best .
4. As a visitor to this game site , I want to be able to submit my high score to the leaderboard.
5. As a visitor to this game site , I want to see the names of fruit in Italian.

### Structure

This site will be put together with HTML, using the bootstrap framework along with CSS. The game part will made using JavaScript and jQuery . An the Top Scores Leaderboard is connected to a Firebase realtime Database.

### Skeleton

The site appears as three pages to the user, technically it's really one page with three sections that collapse away when not needed.

Page 1 - Homepage or Main Menu - Game title , theme and difficulty settings , Start button.

Page 2 - Game page - Card game page with timer , score and flips gauge

Page 3 - How to play / Top Scores - Top scores on display and some info on how the game works .

8 card pairs - Fruit emojis chosen are only ones that are currently grown in Italy.

1 Strawberry
2 Orange
3 Cherrie
4 Banana
5 Red Apple
6 Lemon
7 Peach
8 Pear

Wireframe

![wireframe image](assets\wireframe\tutti_trutti_wireframe.png)

### Surface

#### Colours

Colours vibrant fun by default . Three colour theme options.

1. Colourful theme (default).
2. Light theme - Light background , Dark text
3. Dark theme - Dark background, Light text

#### Icons

Font awesome !

#### Images

Graphics used are created by [Rudy de Souza](https://rudydesouza.com/)

#### Fonts

- **"Jockey One"** was used for Header (h1,h2 and h3) text elements
- **"VT323"** was used for all other text.

On slow connections, another font may be visible while the site is loading.

## Features

- There are three difficulty levels
- There are three theme options
- The game stores your current highest score in your browser, when you beat that score you can submit your new score to the leaderboard.
- There is top 10 leaderboard of highest scores by all users

## Technologies Used

- Languages : HTML, CSS , Bootstrap framework, JavaScript , and JQuery
- Realtime Database: [Firebase](https://firebase.google.com/)
- IDE: Visual Studio code.
- Version control: Git on VS code terminal , [Github](https://github.com/) Desktop app and at repository web page.
- Wireframe: [Balsamiq](https://balsamiq.com/)
- Browser Developer tools : [Google Chrome](https://www.google.com/chrome) for console.loging everything.
- Kanban planner : [Github projects](https://github.com/kenwals/tutti-frutti/projects/1).
- Markdown editor: [Typora](https://typora.io/) was used when doing spellchecks and big changes to my README.md file, Gitpod editor was used for minor updates.
- Fonts : [Google Fonts](https://fonts.google.com/)
- Icons : [Fontawesome](https://fontawesome.com/)
- File renaming utility : PowerRename from [PowerToys on Windows 10](https://www.windowscentral.com/how-bulk-rename-your-files-windows-10-powertoys)
- Pomodoro timer : [Tomato Clock](https://chrome.google.com/webstore/detail/tomato-clock/enemipdanmallpjakiehedcgjmibjihj)
- Overflow rescue tool : [Unicorn Revealer](https://chrome.google.com/webstore/detail/unicorn-revealer/lmlkphhdlngaicolpmaakfmhplagoaln) was used for when a scroll left to right appeared on my site on smaller screens.
- HEX to RGB converter : [RapidTables](https://www.rapidtables.com/convert/color/hex-to-rgb.html) and [webfx](https://www.webfx.com/web-design/hex-to-rgb/)
- Colour contrast checking for Accessibility refinements : [WebAIM](https://webaim.org/resources/contrastchecker/) was used for when trying to decide what colours to use for text against which background colour.
- Favicon creator : [favicon.io](https://favicon.io/favicon-generator/)
- Autoprefixer CSS : [Autoprefixer](https://autoprefixer.github.io/)
- Auto formatter for HTML and CSS : [dirtyMarkUp](https://www.10bestdesign.com/dirtymarkup/) and  [webformatter](https://webformatter.com/html)
- JSlint
- markdown linter
- linters!

## Testing

I tested the site as I went along, manually testing or using automated online testing tools (listed below). I focused on getting the site working on a small mobile phone screen first (iPhone 5 simulation on the Chrome Developer tools), and then subsequently all other screen sizes. In earlier version of the code console.log was used extensively to monitor is the JavaScript was working correctly.

### Performance Testing

### Known issues

On local desktop , the dropdown menu button become unresponsive . this bug could be limited to the Python http server.

### Project barriers and solutions

modal setup mistake with ids

Firebase orderByChild not working as expected

passing scores as strings

Javascript syntax changes

### Version control

### Functionality Testing

### CSS3 validator

### HTML5 validator

### Usability Testing

### Compatibility Testing

### Testing User Stories

## Deployment

## Credits

### Content

Some of the code used for the card game on script.js and style.css is derived from a two part YouTube video called "How to Code a Card Matching Game" published by [Web Dev Simplified](https://youtu.be/28VfzEiJgy4)  & [PortEXE](https://youtu.be/3uuQ3g92oPQ) . click on the links for the videos.

Graphics used are created by Artist and Graphic Designer [Rudy de Souza](https://rudydesouza.com/)

### Resources

Local storage API handling was influenced by [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

Firebase realtime database code used for the Leaderboard.js script was based on code used in the following YouTube videos

- [16.9: Array Functions: sort() - Topics of JavaScript/ES6](https://youtu.be/MWD-iKzR2c8)  (Channel : The coding Train)

- [9.3: Firebase: Retrieving Data - Programming with Text](https://youtu.be/NcewaPfFR6Y)    (Channel : The coding Train)

- [9.2: Firebase: Saving Data - Programming with Text](https://youtu.be/7lEU1UEw3YI)    (Channel : The coding Train)

- [Firebase Database Querying 101 - The Firebase Database For SQL Developers #3](https://youtu.be/3WTQZV5-roY)  (Channel : FIREBASE )

- [Common SQL Queries converted for the Firebase Database - The Firebase Database For SQL Developers #4](https://youtu.be/sKFLI5FOOHs)  (Channel : FIREBASE )
- [Connecting Firebase to a Contact Form](https://youtu.be/PP4Tr0l08NE) (Channel : Traversy Media)

### Media

Emojis used on playing cards are from [Joypixels](https://www.joypixels.com/emoji)

### Acknowledgements

Game layout/structure is inspired by [PROXX](https://www.proxx.app/) , more interesting background [info here.](https://web.dev/proxx-announce/)

Various people at the [code institute](https://codeinstitute.net/) and on the code institute Slack channel.
