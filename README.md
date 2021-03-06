# Tutti Frutti

![Tutti Frutti logo](assets/images/logo-purple-3d.png)

This is a colourful and interactive memory [card game](http:/kenwals.github.io/tutti-frutti/) featuring fruit emojis.

:lemon: :cherries: :pear: :orange: :peach: :strawberry: :apple: :banana:

---

## Table of contents

- [UX](#ux)
  - [Scope](#scope)
    - [User stories](#user-stories)
      - [Visitor goals](#visitor-goals)
      - [Owner goals](#owner-goals)
  - [Structure](#structure)
  - [Skeleton](#skeleton)
  - [Surface](#surface)
    - [Colours](#colours)
    - [Icons](#icons)
    - [Images](#images)
    - [Fonts](#fonts)
- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
    - [Languages](#languages)
    - [Libraries and Frameworks](#libraries-and-frameworks)
    - [Tools](#tools)
- [Testing](#testing)
  - [Performance Testing](#performance-testing)
  - [Bugs encountered on the way](#bugs-encountered-on-the-way)
    - [DRY code mistake on Modal](#dry-code-mistake-on-modal)
    - [Timer problem](#timer-problem)
  - [Known issues](#known-issues)
  - [Project barriers and solutions](#project-barriers-and-solutions)
    - [Firebase orderByChild not working as expected](#firebase-orderbychild-not-working-as-expected)
    - [Passing scores as strings](#passing-scores-as-strings)
    - [JavaScript syntax differences p5 JS verses node JS verses vanilla](#javascript-syntax-differences-p5-js-verses-node-js-verses-vanilla)
    - [Defensive design gap](#defensive-design-gap)
  - [Version control](#version-control)
  - [Functionality Testing](#functionality-testing)
  - [Responsiveness Testing](#responsiveness-testing)
  - [CSS3 validator](#css3-validator)
  - [HTML5 validator](#html5-validator)
  - [JavaScript validator](#javascript-validator)
  - [Usability Testing](#usability-testing)
  - [Compatibility Testing](#compatibility-testing)
  - [Testing User Stories](#testing-user-stories)
    - [Visitor Stories](#visitor-stories)
    - [Owner Story](#owner-story)
- [Deployment](#deployment)
  - [GitHub](#github)
  - [Gitpod](#gitpod)
  - [GitHub Pages](#github-pages)
  - [Local Deployment](#local-deployment)
  - [Forking](#forking)
- [Credits](#credits)
  - [Content](#content)
  - [Resources](#resources)
  - [Media](#media)
  - [Acknowledgements](#acknowledgements)

---

## UX

### Scope

![view of different devices](/wireframe/homepage-view.PNG)

The site has three pages, it contains a menu page, a game page and an info page.  It's targeted at users of all ages and types.

#### User stories

##### Visitor goals

  1. As a user of this game site, I want to be able to play a fun game and test my memory.
  2. As a user of this game site, I want the ability to change the colour theme of the game so it doesn't strain my eyes.
  3. As a user of this game site, I want the ability to select a difficulty level that suits me best.
  4. As a user of this game site, I want to be able to submit my high score to the leader board.

##### Owner goals

  1. As the site owner, I want to be able to play a fun game and test my memory.

### Structure

This site is put together with HTML, using the bootstrap framework along with CSS. The game, Interactive elements and Top score leader board are done using JavaScript and jQuery. The leader board is connected to a Firebase real-time database.

### Skeleton

The site appears as three pages to the user, technically it's really one page with three sections that collapse away when not needed using bootstrap's collapse component. The Game layout/structure is inspired by [PROXX](https://www.proxx.app/).

Page 1 - Homepage or Main Menu - Game title, Theme and Difficulty settings, Start button.
          This page links to Page 2 by the start button, and to page 3 by an info Icon button.

Page 2 - Game page - Card game page with timer, score, flips gauge and modals.
          This page links to Page 1 by a go back Icon button in the lower left-hand corner or an exit button on any of the modals.

Page 3 - How to play / Top Scores - Top scores are on display here. Here is some info on how to play the game and on how the score is calculated.
          This page links to Page 1 by an X out icon button in the upper right-hand corner.

8 card pairs - Fruit emojis used  are :lemon: :cherries: :pear: :orange: :peach: :strawberry: :apple: :banana:

Wireframe

The game layout was sketched on pen and paper a few times first before it got prepared in balsamic.

![wireframe image](/wireframe/tutti-trutti-wireframe.png)

### Surface

#### Colours

Colours are vibrant and fun by default. Three colour theme options.

1. Colourful theme (default).

    Text colour : #4e03e2  (Electric Violet or Ultra Marine)

    ![Colour swatch for Electric Violet ](/wireframe/colour-electric-violet.PNG)

    The background is a CSS gradient image done with a combination of the colours below used on the fruit emojis.
    ![Background colour gradient](/wireframe/colours-used-for-background-gradient.PNG)

    #F82131 (strawberry ), #CFDE0A (lemon), #FC8440 (Orange), #FF9300 (Peach), #449C00 (Pear).
  
2. Light theme - Light background (#FFFFFF White), Dark text (#000000 Black).
3. Dark theme - Dark background (#000000 Black) , Light text (#FFFFFF White).

#### Icons

Font awesome is used for icons.

#### Images

Graphics (cards, logo and favicon) used are created by [Rudy de Souza](https://rudydesouza.com/), emojis used are sourced from joypixels.com

#### Fonts

- **"Jockey One"** was used for Header (h1,h2 and h3) text elements
![Font sample of Jockey One](/wireframe/font-jockey-one-sample.PNG)
- **"VT323"** was used for all other text.
![Font sample of VT323](/wireframe/font-VT323-sample.PNG)

On slow connections, another font may be visible while the site is loading.

back to [contents](#table-of-contents)

---

## Features

- There are three difficulty levels
- There are three theme options
- The game stores your current highest score (Personal Best) in your browser, when you beat that score you can submit your new score to the leader board.
- There is a top 10 leader board of highest scores by all users. This uses the Firebase Realtime Database API, player names and scores are saved in this NoSQL database, the scoreboard is updated on the site in real-time.
- Local Storage API is used for storing and remembering the preferred difficulty level and theme setting when the user returns to the game.
- Game can be paused whilst playing by clicking on the go back icon button in the lower left-hand corner. Continue button resumes play.

## Technologies Used

### Frontend

#### Languages

- HTML
- CSS
- JavaScript

#### Libraries and Frameworks

- [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
- [JQuery](https://jquery.com/)
- [Firebase](https://firebase.google.com/)
- Fonts : [Google Fonts](https://fonts.google.com/)
- Icons : [Fontawesome](https://fontawesome.com/)

#### Tools

- IDE: Visual Studio Code (VS Code).
- Version control: Git
- Wireframe: [Balsamiq](https://balsamiq.com/)
- Browser Developer tools : [Google Chrome](https://www.google.com/chrome) for console.logging everything.
- Kanban planner : [Github projects](https://github.com/kenwals/tutti-frutti/projects/1).
- Markdown editor: [Typora](https://typora.io/) was used when appropriate, VS code editor was used for most updates.
- File renaming utility: PowerRename from [PowerToys on Windows 10](https://www.windowscentral.com/how-bulk-rename-your-files-windows-10-powertoys)
- Pomodoro timer : [Tomato Clock](https://chrome.google.com/webstore/detail/tomato-clock/enemipdanmallpjakiehedcgjmibjihj)
- Favicon creator : [favicon.io](https://favicon.io/favicon-generator/)
- Autoprefixer CSS : [Autoprefixer](https://autoprefixer.github.io/)
- Auto formatter for HTML, CSS and JS:  [webformatter](https://webformatter.com/html)
- px to rem convertor : [nekoCalc](https://nekocalc.com/px-to-rem-converter)
- JavaScript linter : [jshint](https://jshint.com/)
- markdown linter : markdownlint extension on VS Code.
- [markdown table of contents creator](https://ecotrust-canada.github.io/markdown-toc/)
- [site preview tool](http://ami.responsivedesign.is/)
- [Grammarly](https://chrome.google.com/webstore/detail/grammarly-for-chrome/kbfnbcaeplbcioakkpcpgfkobkghlhen?hl=en)

back to [contents](#table-of-contents)

---

## Testing

I tested the site as I went along, manually testing or using automated online testing tools. I focused on getting the site working on a small mobile phone screen first (iPhone 5 simulation on the Chrome Developer tools), and then subsequently all other screen sizes. In earlier versions of the code, the command console.log was used extensively to monitor if the JavaScript/JQuery was working correctly. I also set the countdown timer to 5 or 10 seconds to save time on testing the restart game functionality.

I used the JQuery commands below in the developer tools console to give myself some shortcuts while testing the game.

```javascript
$(".card").addClass("visible")  // this turns over all the playing cards
$("#modal-you-win-leaderboard").modal("show") // this triggers a high score modal to pop up
$("#modal-you-win-leaderboard").modal("hide")  // this hides the you win leaderboard modal 
localStorage.clear() // this clears the local storage completely
localStorage.setItem("topScore" , 0) // this resets your topScore to zero
```

### Performance Testing

I used the lighthouse tool for performance testing, no major issues found.

![lighthouse testing](/wireframe/20210315-lighthouse.PNG)

### Bugs encountered on the way

#### DRY code mistake on Modal

There is a generic modal which is displayed differently for three scenarios. Initially, this refactored DRY code had a design flaw in it, that lead to the continue button and restart game button being mixed up. Also, the restart button would make the game go faster (first flagged to me on the peer review channel on slack). This problem was only fully resolved when I made sure the event listeners were only running once and I added an extra button on the modal. So relevant modal buttons are only made visible when needed.

#### Timer problem

This problem was highlighted to me on the peer review channel on slack, on repeated play the timer would speed up. It would get so bad it was showing minus figures. I since put in a block to stop the timer from going less than zero just in case.

### Known issues

- In the Firefox browser, some errors appear in the developer tool console in relation to JavaScript script imported from Google firebase. These can be safely ignored as it's [a known issue within Google](https://support.google.com/analytics/thread/55824181?hl=en).

- Site is not responsive landscape mode on mobile devices.

### Project barriers and solutions

#### Firebase orderByChild not working as expected

As part of this project, I learned how to use Firebase. I did have a problem getting the orderByChild query command working as I presumed this command ordered the data ascending or descending order. But it wasn't appearing to work. Eventually, I realised, it was working for querying or filtering the relevant data unsorted(Top 10 player scores on the leader board), just that I had to order the data dump myself in a separate process (array sort() method) for it to be sorted properly and then displayed in an ordered Top  10 fashion.

#### Passing scores as strings

Initially, the input form for receiving players top scores was sending the scores as strings to the firebase database. This lead to a problem with sort ordering the scores in Firebase. I rectified this problem by using parseInt() on the string before it was submitted to the database, this way scores are stored as integers.

#### JavaScript syntax differences p5 JS verses node JS verses vanilla

While learning and researching JavaScript, I did find it challenging at times when I was looking at super interesting JavaScript commands that turned out to be not compatible with the web browser alone and I would need to learn and use a JavaScript framework like p5 or nodeJS. I plan on researching more on JavaScript frameworks more before deciding which framework to learn next.

#### Defensive design gap

When clicking the back button while the game is running, the user is prompted to confirm if they want to Exit or Continue playing. A problem would happen if the timer ran out and the Game over modal appeared at the same time as the Are you sure? modal. To prevent this from happening, I added the ability to pause the timer automatically when the "Are you sure?" modal appears.

### Version control

For version control, I used the UI on VS Code for making git commits, and command line for branches, Merging was done on the GitHub site. I used branches when I was working on new features or bundles of changes.

### Functionality Testing

Page 1 - Homepage or Main Menu

- Theme and difficulty levels chosen are stored in the browser and are defaulting to values stored in the browser on return visits.
- When theme selection is changed, the appropriate colour theme is displayed.
- When the difficulty selection has changed then the appropriate level is used when playing the card game.
- For all clickable sections the mouse changes to a pointer on desktop viewing. Sections here is the dropdown menus, the Start button and Info Page Button.
- If Javascript is disabled on the browser an Error message appears.
- Page is responsive to screen width in portrait mode
- If you type a invalid webpage address, a 404 error page shows up.

Page 2 - Game page

- Timer displays the correct time remaining as per difficulty level.
- Total Score value increments with the appropriate score on the current play, it's also stored in the browser.
- The Visitor's current highest score (Personal best) is stored in the browser.
- No of flips value increases each time a card is flipped over.
- For clickable sections, the desktop mouse changes to a pointer. Seen here on the back button and each playing card.
- Page is responsive to screen width in portrait mode.
- Cards are animating and displaying correctly.
- 4 modals are behaving as expected:

  ​  1.  Game over - triggered when the time has run out. Visitor can Exit or Restart the game. Buttons functioning correctly.

  ​  2.  Are you sure you want to EXIT? - triggered when the go back button is pressed. Visitor can Exit or Continue playing. The timer is pausing correctly when this modal appears. The timer resumes when the continue button is pressed. Buttons functioning correctly.

  ​  3.  You Win! - triggered when the visitor completes the game but the score is not higher than the current high score stored in the browser.  Visitor can Exit or Restart the game. Buttons functioning correctly.

  ​  4.  Leader board modal - triggered when the visitor completes the game for the first time or beats a top score they achieved before in their current browser. Visitor can submit their name for the leader board, name cannot be blank. Also, they cannot submit more than once. Visitor can Exit or Restart the game. Buttons functioning correctly.

Page 3 - How to play / Top Scores

- Game instructions are on display.
- Contact details on display and clickable for queries or feedback.
- Top 10 user scores are showing in descending order.
- Scores are refreshing in real-time, dependency on uptime from Google FireBase.
- On the clickable sections the mouse changes to a pointer: The X out button on the top right-hand corner and the email address link.
- Page is responsive to screen width in portrait mode.

### Responsiveness Testing

For this test, I got a list of [15 most common screen sizes](https://www.designrush.com/trends/website-dimensions) and used [http://responsivetesttool.com/](http://responsivetesttool.com/) to check responsiveness for each screen size.

The results are below. 14 Passes and 1 Fail.

| Device category | Model                 | Size Px (%popularity) | Result |
| --------------- | --------------------- | ------------------ | ------ |
| Desktop/Laptop  | NA                    | 1366x768 (22.98%)  | Pass   |
| Desktop/Laptop  | NA                    | 1920x1080 (20.7%)  | Pass   |
| Desktop/Laptop  | NA                    | 1536x864 (7.92%)   | Pass   |
| Desktop/Laptop  | NA                    | 1440x900 (7.23%)   | Pass   |
| Desktop/Laptop  | NA                    | 1280x720 (4.46%)   | Pass   |
| Mobile Phone    | Samsung Galaxy Note 4 | 360x640 (18.7%)    | Pass   |
| Mobile Phone    | Apple iPhone 6        | 375x667 (7.34%)    | Pass   |
| Mobile Phone    | Apple iPhone XR       | 414x896 (6.76%)    | Pass   |
| Mobile Phone    | Samsung Galaxy S8     | 360x780 (5.31%)    | Pass   |
| Mobile Phone    | Apple iPhone X        | 375x812 (5.01%)    | Pass   |
| Tablet          | Apple iPad            | 768x1024 (51.43%)  | Pass   |
| Tablet          | unknown               | 1280x800 (7.28%)   | Pass   |
| Tablet          | Samsung Galaxy Tab    | 800x1280 (5.26%)   | Pass   |
| Tablet          | Google Nexus 7        | 601x962 (4.32%)    | Pass   |
| Tablet          | unknown               | 962x601 (2.99%)    | Fail   |

### CSS3 validator

no errors.  Resource: <https://jigsaw.w3.org/css-validator/>

![CSS result](/wireframe/w3c-css-validation-result.PNG)

### HTML5 validator

no errors in index.html and 404.html . Resource: <https://validator.w3.org/>

![HTML5 result](/wireframe/w3-html-validation-result.PNG)

### JavaScript validator

no issues. results below. Resource:  <https://jshint.com/>

```js
Metrics
There are 47 functions in this file.

Function with the largest signature take 2 arguments, while the median is 0.

Largest function has 36 statements in it, while the median is 3.

The most complex function has a cyclomatic complexity value of 4 while the median is 1.
```

### Usability Testing

I shared the project on the peer-review channel on slack, and also with friends/family. There were several problems highlighted to me which I have since fixed. Such as responsiveness to device screen width size and issues with timer.

I tested and improved accessibility with lighthouse and Firefox developer tools.

### Compatibility Testing

| Screen size\Browser                          | Chrome | Firefox | Edge |
| -------------------------------------------- | ------ | ------- | ---- |
| Android Mobile phone (Screen width 412px) xs | Pass | Pass | Pass |
| Android Tablet (Screen width 600px) sm       | Pass | Pass | Pass |
| Windows laptop (Screen width 2560px)         |   Pass |  Pass |  Pass    |

### Testing User Stories

#### Visitor Stories

  1. As a user of this game site, I want to be able to play a fun game and test my memory.

      ![user story 1 - visitor](/wireframe/user-story-1-visitor.PNG)

     *Game is fun to play and a great test of memory skills for the user.*

  2. As a user of this game site, I want the ability to change the colour theme of the game so it doesn't strain my eyes.

      ![user story 2 - visitor](/wireframe/user-story-2.PNG)

      *The user can choose one of three theme options. Theme setting is saved and set in the browser as default for return visits.*

  3. As a user of this game site, I want the ability to select a difficulty level that suits me best.

      ![user story 3 - visitor](/wireframe/user-story-3.PNG)

       *The user can choose one of three difficulty levels. This level setting is saved and set in the browser as default for return visits.*

  4. As a user of this game site, I want to be able to submit my high score to the leader board.

      ![user story 4 - visitor](/wireframe/user-story-4.PNG)  ![user story 4 - visitor](/wireframe/user-story-4b.PNG)

      *On achieving a high score the user can submit their name and have their name appear on the leader board.*

#### Owner Story

  1. As the site owner, I want to be able to play a fun game and test my memory.

      ![user story 1-owner ](/wireframe/user-story-1-visitor.PNG)

      *Game is fun to play and a great test of memory skills for the owner.*

back to [contents](#table-of-contents)

---

## Deployment

For easy deployment on GitHub pages, you will need a GitHub user account and possibly a Gitpod user account. If you wish to make changes to this repository, please follow the GitHub steps first.

### GitHub

GitHub is a code hosting platform for version control and collaboration. It's free to enrol for a user account and I would recommend you have one if you wish to deploy this repository and make changes.

When you have a GitHub account you can simply click on the Fork button on the top right corner. This will clone the Tutti-Frutti repository for your GitHub account, then you can make any changes you like.

### Gitpod

The site can be edited easily on a Gitpod online workspace, you first register a free user account on <http://gitpod.io/>, then download the Gitpod extension on your preferred internet browser. On signing up you will be expected to have a GitHub user account.

Once you have the extension on your browser, a green Gitpod button will appear beside this repository in GitHub. For best results fork the repository in your personal account before you open it in Gitpod.

### GitHub Pages

Once you have the completed site in your own repository, you can deploy it to GitHub pages by the following steps.

1. On GitHub, go to the completed site's repository.
2. Click on settings, on the settings page scroll down the **GitHub Pages** section.
3. Under GitHub pages, Select the appropriate branch or folder the index.html is in.
4. Click on **save.** A message should then appear advising the URL of your deployed site.

### Local Deployment

If you prefer working on the repository locally on your preferred Desktop IDE, you can clone the repository to your desktop by the following steps.

1. Go to [the Tutti Frutti github page](https://github.com/kenwals/tutti-frutti).
2. Above the list of files, click on the **code** button.
3. To clone the repository using **HTTPS,** under "Clone with HTTPS", click the paste icon.
   To clone the repository using an **SSH key**, click Use SSH, then click the paste icon.
   To clone a repository using **GitHub CLI,** click Use GitHub CLI, then click the paste icon.
4. Open your preferred Terminal interface.
5. Change the current working directory to the location where you want the cloned directory.
6. Type **git clone**, then paste the URL you copied earlier above.
7. Press Enter to create your local clone.

more detailed instructions available [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

### Forking

You may wish to contribute to this website and have your contribution published, if so, you are welcome to follow these steps below.

1. Go to the GitHub website and log in.
2. Open <https://github.com/kenwals/tutti-frutti>
3. In the top right-hand corner you will see a fork button, click on this **Fork button**.
4. This will create a copy of the Tutti-Frutti repository in your Github account.
5. Once you're finished making changes you can locate the **New Pull Request** button just above the file listing in the original repository (<https://github.com/kenwals/tutti-frutti>).
6. If your pull request is approved, it will be merged into the master version of the Tutti-Frutti repository at a future date.

more detailed instructions available [here](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo)

back to [contents](#table-of-contents)

---

## Credits

### Content

Some of the customised code used for the card game in script.js and style.css is derived from a two-part YouTube video called "How to Code a Card Matching Game" published by [Web Dev Simplified](https://youtu.be/28VfzEiJgy4)  & [PortEXE](https://youtu.be/3uuQ3g92oPQ). Click on the links for the videos.

Graphics used are created by Artist and Graphic Designer [Rudy de Souza](https://rudydesouza.com/)

### Resources

Local storage API handling was influenced by [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

Firebase real-time database code used was based on (and later customised) in the following YouTube videos

- [16.9: Array Functions: sort() - Topics of JavaScript/ES6](https://youtu.be/MWD-iKzR2c8)  (Channel: The coding Train)

- [9.3: Firebase: Retrieving Data - Programming with Text](https://youtu.be/NcewaPfFR6Y)    (Channel: The coding Train)

- [9.2: Firebase: Saving Data - Programming with Text](https://youtu.be/7lEU1UEw3YI)    (Channel: The coding Train)

- [Firebase Database Querying 101 - The Firebase Database For SQL Developers #3](https://youtu.be/3WTQZV5-roY)  (Channel: FIREBASE )

- [Common SQL Queries converted for the Firebase Database - The Firebase Database For SQL Developers #4](https://youtu.be/sKFLI5FOOHs)  (Channel: FIREBASE )

- [Connecting Firebase to a Contact Form](https://youtu.be/PP4Tr0l08NE) (Channel: Traversy Media)

- [Bootstrap components](https://getbootstrap.com/)

- [W3schools](https://www.w3schools.com/)

- [Code institute's Slack workspace channels](https://slack.com)

- [Stack Exchange](https://stackexchange.com/)

- [MDN Web Docs](https://developer.mozilla.org/en-US/)

- Aukje's MS02 preparation guide

### Media

Emojis used on playing cards are from [Joypixels](https://www.joypixels.com/emoji)

### Acknowledgements

- Game layout/structure is inspired by [PROXX](https://www.proxx.app/) , more interesting background [info here.](https://web.dev/proxx-announce/)

- My mentor Maranatha Ilesanmi.

- My class tutor Simen Daehlin.

- Various people at the [code institute](https://codeinstitute.net/) and on the code institute Slack channel.

- [Velo](https://velocoffee.ie/) Coffee Roasters , [Barry's Tea](https://www.barrystea.ie/) and the Radio stations Nova, RTE Gold, BBC2 and BBC6 .

back to [contents](#table-of-contents)
