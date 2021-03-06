# Concept

This project is a single-player RPG game. This game has a little story, and therefore it has a beginning and an end. 

The battle is turn-based. The Enemies are two mutant plants. As the main character is a robot, the player will "operate" two parts of it. The "Robot cannon" and the "Robot fists." The robot cannons have more power and health points capability than the fists. But in the end, it all depends on "the crystals." 

The game has a score count. 

There are crystals on the map that the player can collect. These crystals not only increase the score. They will be the health points That the player will have for the battle.

As this is more close to a mini-game, it has only one "final" battle. And once that the player starts it, there is no way back. Winning or losing, the game is over.

<br>

<p align="center"><img src="./screenshots/game-flow.png" width="1000px"/></p>

<br>

# Story

It is the year 2853. 

The world has been facing a fourth world war. But this time feels different. There are not many humans left of the billions that there were long ago.

Only two factions are fighting, and one of them almost disappears. Everybody says that the war is about to end. Fortunately, you belong to the team that is about to win.

The camp has been quiet since the war started. Giant robots make anyone feel intimidated. The troops sensed that something serious was about to happen. Unfortunately, they were right.

Cries for help are heard on the communication radio. "We are in the barracks!" was heard before the transmission stopped. But there was something else, a strange sound that you had not heard before.

<br>

<p align="center"><img src="./dist/assets/images/bg-btn/title-background.png" width="1000px"/></p>

<br>

# External resources

This project uses [this API](https://www.notion.so/Leaderboard-API-service-24c0c3c116974ac49488d4eb0267ade3) to handle the scores, which was created for this capstone project.

<br>
<br>

# Commands

**On the map**
<br>
- Arrow up.
- Arrow left.
- Arrow right.
- Arrow down.
<br>

**On the battle**

Select enemy:
- Arrow up.
- Arrow down.

Change action:
- Arrow left or space bar.

<br>

# Game Structure

The game starts with the **Preload Scene**, which loads all assets. After loading, the scene changes to the title scene. 

The **Title Scene** will show a form to store the user's name, then the PLAY button will appear.

After the Play button is clicked, the **Introduction Scene** will show a little introduction.

Clicking on next, the **Instructions Scene** will appear, showing the controls and the game goal.

The next scene to be called is the actual game, the **Game Play Scene**, which will call in parallel the **Points Scene** to store the score while collecting crystals.

Once the battle zone is reached, the game will switch to the **Battle Scene**, together with the **UI Scene** will be responsible for the battle actions.

If the fight is over, the last scene will be called. **The Game Over Scene** will sort and show the top scores.