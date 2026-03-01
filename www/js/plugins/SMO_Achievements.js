/*:
* @plugindesc v1.04 - ShadowDragon和NerdyChara合力制作的界面美化成就系统。
* @author SMO
*
* @param ---- Data Management ----
* @desc Achievements', categories' and menu settings.
* @default --------------------
*
* @param Use In-Game Editor
* @parent ---- Data Management ----
* @type boolean
* @desc If ON, the achievements', the categories' and the menu's
* settings will only be changed through the in-game editor.
* @default false
*
* @param Categories And Trophies
* @parent ---- Data Management ----
* @type struct<categories>[]
* @desc Add/edit the categories you want here. Leave it empty
* if you don't want to use categories.
* @default ["{\"Category Name\":\"Battle\",\"New Scene Name\":\"\",\"Category Background\":\"\",\"New Menu Background\":\"\",\"Locked Achiev Image\":\"\",\"Secret Achiev Image\":\"\",\"Global Category\":\"false\",\"Auto Color\":\"{\\\"Color\\\":\\\"\\\",\\\"AC Category Name\\\":\\\"true\\\",\\\"AC Scene Name\\\":\\\"true\\\",\\\"AC Achievs Names\\\":\\\"true\\\",\\\"AC Pop Up\\\":\\\"true\\\"}\",\"--- Trophy ---\":\"--------------------\",\"Hide Trophy\":\"false\",\"Trophy Description\":\"\\\"This is a description.\\\"\",\"Trophy Image\":\"\",\"Locked Trophy Image\":\"\",\"On Unlock\":\"\"}"]
*
* @param Achievements Data
* @parent ---- Data Management ----
* @type struct<data>[]
* @desc Create/edit the data of each achievement here.
* @default ["{\"Name\":\"And so it begins\",\"Category\":\"Battle\",\"Description\":\"\\\"No prison can hold me, adventure awaits! HUZZAAA!\\\"\",\"Pop Up Desc\":\"\\\"Adventure awaits!\\\"\",\"Visibility\":\"Visible from start\",\"Background Image\":\"\",\"Pop Up Image\":\"\",\"Hide Progress\":\"false\",\"Requirements\":\"[\\\"{\\\\\\\"Type\\\\\\\":\\\\\\\"Playtime\\\\\\\",\\\\\\\"Item ID\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Comparison\\\\\\\":\\\\\\\"≥\\\\\\\",\\\\\\\"Required Value\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Alias\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Alias Icon\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"Advanced\\\\\\\":\\\\\\\"------\\\\\\\",\\\\\\\"Current Value\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Final Value\\\\\\\":\\\\\\\"\\\\\\\"}\\\"]\",\"Rewards\":\"\",\"Icons\":\"------\",\"Locked Icon\":\"-2\",\"Unlocked Icon\":\"-2\",\"Secret Icon\":\"-2\"}"]
*
* @param Menu Settings
* @parent ---- Data Management ----
* @type struct<menuSets>
* @desc Define the settings for the windows on the achievements
* menu.
* @default {"Scene Name":"{\"------ Position ------\":\"--------------------\",\"X\":\"0\",\"Y\":\"0\",\"-------- Size --------\":\"--------------------\",\"Width\":\"Graphics.width\",\"Height\":\"80\",\"------- Texts --------\":\"--------------------\",\"Title\":\"Achievements\",\"-------- Font --------\":\"--------------------\",\"Font Face\":\"GameFont\",\"Font Size\":\"28\",\"----- Appearence -----\":\"--------------------\",\"Opacity\":\"255\",\"Window Skin\":\"\",\"------- Colors -------\":\"--------------------\",\"Text Color\":\"#ffffff\"}","Categories":"{\"------ Position ------\":\"--------------------\",\"X\":\"0\",\"Y\":\"80\",\"-------- Size --------\":\"--------------------\",\"Width\":\"Graphics.width / 3\",\"Height\":\"Graphics.height - 80\",\"------- Texts --------\":\"--------------------\",\"Text\":\"<name> (<unlocked>/<all>)\",\"Text Align\":\"Center\",\"-------- Font --------\":\"--------------------\",\"Font Face\":\"GameFont\",\"Font Size\":\"28\",\"----- Appearence -----\":\"--------------------\",\"Opacity\":\"255\",\"Window Skin\":\"\",\"Columns\":\"1\",\"------- Colors -------\":\"--------------------\",\"Text Color\":\"#ffffff\",\"------- Items --------\":\"--------------------\",\"Item Height\":\"72\",\"Draw Rectangle\":\"true\",\"Rect Border Size\":\"1\",\"Rect Border Color\":\"rgba(255,255,255,1)\",\"Rect Back Color\":\"rgba(0,0,0,0.5)\"}","Trophies":"{\"Type\":\"Trophies\",\"------ Position ------\":\"--------------------\",\"X\":\"Graphics.width / 3\",\"Y\":\"80\",\"-------- Size --------\":\"--------------------\",\"Width\":\"Graphics.width * 2 / 3\",\"Height\":\"Graphics.height - 80\",\"------- Texts --------\":\"--------------------\",\"Title\":\"TROPHIES\",\"Description\":\"\\\"Unlock trophies by completing achievements. Each category unlocks a different trophy.\\\"\",\"Locked\":\"LOCKED\",\"Locked Sign\":\"?\",\"Total Progress\":\"Total Progress: <unlocked>/<all> (<percent>%)\",\"-------- Font --------\":\"--------------------\",\"Font Face\":\"GameFont\",\"Font Size\":\"28\",\"----- Appearence -----\":\"--------------------\",\"Opacity\":\"255\",\"Window Skin\":\"\",\"Lines\":\"2\",\"Columns\":\"2\",\"Big Trophy Y\":\"140\",\"Big Trophy Height\":\"250\",\"Progress Bar Y\":\"480\",\"Progress Text Position\":\"Top Right\",\"------- Colors -------\":\"--------------------\",\"Text Color\":\"#ffffff\",\"Progress Gauge C1\":\"#aa8300\",\"Progress Gauge C2\":\"#ffa500\",\"Progress Gauge BG\":\"#202040\",\"------- Items --------\":\"--------------------\",\"Border Size\":\"2\",\"------ Selector ------\":\"--------------------\",\"Selector\":\"Grow\",\"Selector Color\":\"#ff9900\",\"Selector Image\":\"\"}","Achievements":"{\"------ Position ------\":\"--------------------\",\"X\":\"0\",\"Y\":\"80\",\"-------- Size --------\":\"--------------------\",\"Width\":\"Graphics.width\",\"Height\":\"Graphics.height - 80\",\"-------- Font --------\":\"--------------------\",\"Font Face\":\"GameFont\",\"Font Size\":\"18\",\"----- Appearence -----\":\"--------------------\",\"Opacity\":\"255\",\"Window Skin\":\"\",\"Columns\":\"Math.floor(Graphics.width / 200)\",\"------- Colors -------\":\"--------------------\",\"Text Color\":\"#ffffff\",\"Progress Gauge C1\":\"rgba(20,255,20,1)\",\"Progress Gauge C2\":\"rgba(100,255,100,1)\",\"Progress Gauge BG\":\"#202040\",\"------- Items --------\":\"--------------------\",\"Hide Progress\":\"false\",\"Progress Gauge Height\":\"24\",\"Progress Align\":\"Center\",\"Progress Style\":\"Percent\",\"Corner Radius\":\"8\",\"Description Lines\":\"3\",\"Item Height\":\"144\",\"Border Size\":\"1\"}","Achievs Info":"{\"Enabled\":\"true\",\"------ Position ------\":\"--------------------\",\"X\":\"Graphics.width / 4\",\"Y\":\"78\",\"-------- Size --------\":\"--------------------\",\"Width\":\"Graphics.width / 2\",\"Height\":\"468\",\"------- Texts --------\":\"--------------------\",\"Unlocked On\":\"Unlocked on <date> at <time>\",\"Requirements\":\"Requirements:\",\"Rewards\":\"Rewards:\",\"None\":\"None\",\"Collect\":\"COLLECT\",\"Collected\":\"COLLECTED\",\"------ Collect -------\":\"--------------------\",\"Collect X\":\"50\",\"Collect Y\":\"425\",\"Collect Width\":\"100\",\"Collect Height\":\"25\",\"Collect Color\":\"#43d643\",\"Collect Border Size\":\"1\",\"Collect Image\":\"\",\"-------- Font --------\":\"--------------------\",\"Font Face\":\"GameFont\",\"Font Size\":\"28\",\"----- Appearence -----\":\"--------------------\",\"Opacity\":\"255\",\"Window Skin\":\"\",\"Scroll Color 1\":\"#777777\",\"Scroll Color 2\":\"#353535\",\"Text Color\":\"#ffffff\"}","Pop Up":"{\"Enabled\":\"true\",\"Button\":\"true\",\"------ Position ------\":\"--------------------\",\"X\":\"Graphics.width - 140\",\"Y\":\"0\",\"-------- Size --------\":\"--------------------\",\"Width\":\"140\",\"Height\":\"106\",\"------- Texts --------\":\"--------------------\",\"Text\":\"\\\"<center>\\\\\\\\c[1]\\\\\\\\}Unlocked:\\\\n<center>\\\\\\\\c[0]\\\\\\\\{<achievName>\\\"\",\"-------- Font --------\":\"--------------------\",\"Font Face\":\"GameFont\",\"Font Size\":\"21\",\"----- Appearence -----\":\"--------------------\",\"Opacity\":\"255\",\"------- Border -------\":\"--------------------\",\"Border Size\":\"1\",\"Border Color\":\"#ff9900\",\"----- Animation ------\":\"--------------------\",\"Fading\":\"Fade In and Out\",\"Move In\":\"Leftwards\",\"Move Out\":\"Rightwards\",\"Size In\":\"No size change\",\"Size Out\":\"No size change\",\"Easing\":\"Back\",\"Custom Easing In\":\"\",\"Custom Easing Out\":\"\"}","Sort Option":"{\"Enabled\":\"true\",\"------ Position ------\":\"--------------------\",\"X\":\"15\",\"Y\":\"25\",\"-------- Size --------\":\"--------------------\",\"Width\":\"120\",\"Height\":\"30\",\"------- Texts --------\":\"--------------------\",\"Options\":\"[\\\"{\\\\\\\"Symbol\\\\\\\":\\\\\\\"A-z\\\\\\\",\\\\\\\"Script\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"main = unlocked.concat(locked);\\\\\\\\\\\\\\\\nmain.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\\\\\\\\\nmain.push(...secrets);\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol\\\\\\\":\\\\\\\"Locked\\\\\\\",\\\\\\\"Script\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"unlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\\\\\\\\\nlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\\\\\\\\\nmain = locked.concat(unlocked, secrets);\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol\\\\\\\":\\\\\\\"Unlocked\\\\\\\",\\\\\\\"Script\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"unlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\\\\\\\\\nlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\\\\\\\\\nmain = unlocked.concat(locked, secrets);\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol\\\\\\\":\\\\\\\"Recent\\\\\\\",\\\\\\\"Script\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"unlocked.sort((a, b) => SMO.AM.compareAchievsDates(a, b));\\\\\\\\\\\\\\\\nlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\\\\\\\\\nmain = unlocked.concat(locked, secrets);\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol\\\\\\\":\\\\\\\"Unlocking\\\\\\\",\\\\\\\"Script\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"locked.sort(function(a, b) {var pa = a.progress(); var pb = b.progress(); return pb - pa || a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' })});\\\\\\\\\\\\\\\\nmain = locked.concat(unlocked, secrets);\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"-------- Font --------\":\"--------------------\",\"Font Face\":\"GameFont\",\"Font Size\":\"18\",\"----- Appearence -----\":\"--------------------\",\"Opacity\":\"255\",\"Border Size\":\"2\",\"------- Colors -------\":\"--------------------\",\"Text Color\":\"#ffffff\",\"Border Color\":\"#ffffff\",\"Background Color\":\"rgba(0,0,0,0.8)\"}"}
*
* @param ---- Global Settings ----
* @desc Define the settings for the global mode.
* @default --------------------
*
* @param Global Mode
* @parent ---- Global Settings ----
* @type boolean
* @desc If ON, unlocked achievements will keep unlocked through
* save files, check the help section for more info.
* @default false
*
* @param Global Rewards
* @parent ---- Global Settings ----
* @type boolean
* @desc If ON, the player will gain all the unlocked achievements'
* rewards when starting a new game.
* @default false
*
* @param Global Auto Reset
* @parent ---- Global Settings ----
* @type boolean
* @desc Resets the global data every time you start a new playtest
* session. This won't affect deployed projects.
* @default false
*
* @param ---- Achievs Update -----
* @desc These settings define the way the achievements are updated.
* @default --------------------
*
* @param Auto Refresh
* @parent ---- Achievs Update -----
* @type boolean
* @on YES
* @off NO
* @desc Do you wish to check for unlocked achievements 
* automatically?
* @default true
*
* @param Update Interval
* @parent ---- Achievs Update -----
* @type number
* @min 30
* @desc Defines the interval between updates, in frames. 
* (1 sec = 60 frames). A smaller interval may cause lag.
* @default 60

* @param Refresh After Transfer
* @parent ---- Achievs Update -----
* @type boolean
* @desc If ON, the achievements will be automatically
* refreshed after transfering between maps.
* @default true
*
* @param --- Menu Command (MC) ---
* @desc Define the settings for the menu command.
* @default --------------------
*
* @param MC Active
* @parent --- Menu Command (MC) ---
* @type boolean
* @on YES
* @off NO
* @desc Do you wish to add a command on the menu to show the achievements?
* @default true
*
* @param MC Show Switch
* @parent --- Menu Command (MC) ---
* @type switch
* @desc Use this switch to show/hide the menu command. If this switch is ON, the command is visible.
* @default 0
*
* @param MC Position
* @parent --- Menu Command (MC) ---
* @type number
* @min 1
* @desc Choose the menu command's position on the menu list.
* @default 4
*
* @param MC Name
* @parent --- Menu Command (MC) ---
* @desc This name will appear on the menu.
* @default Achievements
*
* @param -- Title Command (TC) ---
* @desc Define the settings for the title command.
* Available only on Global Mode.
* @default --------------------
*
* @param TC Active
* @parent -- Title Command (TC) ---
* @type boolean
* @on YES
* @off NO
* @desc Do you wish to add a command on the title to show the
* achievements? (Only on Global Mode)
* @default true
*
* @param TC Position
* @parent -- Title Command (TC) ---
* @type number
* @min 1
* @desc Choose the position for this command on the title.
* (Only on Global Mode)
* @default 3
*
* @param TC Name
* @parent -- Title Command (TC) ---
* @desc The command will appear on the title with this name.
* (Only on Global Mode)
* @default Achievements
*
* @param -------- Images ---------
* @desc These images will be used when no other is specified.
* @default --------------------
*
* @param Menu Background
* @parent -------- Images ---------
* @type file
* @dir img/achievements
* @require 1
* @desc Choose a file on the img/achievements folder to be the background of the achievement's menu.
*
* @param Locked Trophy Img
* @parent -------- Images ---------
* @type file
* @dir img/achievements
* @require 1
* @desc This image will be drawn for all locked trophies when no
* other image is specified on "Categories And Trophies".
* @default
*
* @param Locked Achievement Img
* @parent -------- Images ---------
* @type file
* @dir img/achievements
* @require 1
* @desc Default image for locked (non secret) achievements.
* @default
*
* @param Secret Achievement Img
* @parent -------- Images ---------
* @type file
* @dir img/achievements
* @require 1
* @desc Default image for secret achievements.
* @default
*
* @param -------- Icons ----------
* @desc These icons will be used when no other is specified.
* @default --------------------
*
* @param Locked Icon
* @parent -------- Icons ----------
* @type number
* @min -1
* @desc This icon will be drawn if the achievement is locked.
* Set it to -1 if you don't want to use an icon.
* @default 160
*
* @param Unlocked Icon
* @parent -------- Icons ----------
* @type number
* @min -1
* @desc This icon will be drawn if the achievement is unlocked.
* Set it to -1 if you don't want to use an icon.
* @default 164
*
* @param Secret Icon
* @parent -------- Icons ----------
* @type number
* @min -1
* @desc This icon will be drawn if the achievement is secret.
* Set it to -1 if you don't want to use an icon.
* @default 166
*
* @param Gold Icon
* @parent -------- Icons ----------
* @type number
* @min -1
* @desc Choose an icon for your currency. Use -1 if you don't wanna
* use this.
* @default 314
*
* @param Recent Unlock
* @parent -------- Icons ----------
* @type number
* @min -1
* @desc This icon will be shown on recently unlocked achievements. 
* Use -1 if you don't wanna use it.
* @default 191
*
* @param Reward to Collect
* @parent -------- Icons ----------
* @type number
* @min -1
* @desc Icon chosen to mark unlocked achievements with rewards
* to collect, used only with "Reward Collect" - Manually
* @default 208
*
* @param -------- Others ---------
* @desc Other settings.
* @default --------------------
*
* @param AutoColor by Image
* @parent -------- Others ---------
* @type struct<imageAc>[]
* @desc Add a symbol to your images and it'll auto color texts for you.
* @default
*
* @param Local Load Pop Up
* @parent -------- Others ---------
* @type select
* @option Remember
* @option Skip
* @option Clear
* @desc Check out the help section to learn about this parameter.
* @default Skip
*
* @param Secret Sign
* @parent -------- Others ---------
* @desc This sign will replace the secret achievements' name,
* if no sign is selected the achiev's name will be shown.
* @default ???
*
* @param Secret Description
* @parent -------- Others ---------
* @type note
* @desc This text will replace the secret achievements' description.
* @default "This is a secret achievement. It'll be revealed once it's requirements are met."
*
* @param Unlocked Color
* @parent -------- Others ---------
* @type note
* @desc This color represents unlocked achievements/trophies.
* It'll be used to draw some borders and texts.
* @default #00ff00
*
* @param Hide Totally
* @parent -------- Others ---------
* @type boolean
* @desc If ON, "Hidden" achievements won't be part of the total progress calculation.
* @default false
*
* @param On Unlock
* @parent -------- Others ---------
* @type note
* @desc Use JS to write a script, this script will be called every
* time an achievement is unlocked.
* @default "AudioManager.playMe({\n  name: 'Fanfare1',\n  pan: 0,\n  pitch: 100,\n  volume: 30\n});"
*
* @param Use Rewards
* @parent -------- Others ---------
* @type boolean
* @desc If OFF, there will be no rewards after completing achievements.
* It also won't appear on the achievements menu.
* @default true
*
* @param Reward Collect
* @parent -------- Others ---------
* @type select
* @option Automatically
* @option Manually
* @desc When an achievement is unlocked, how should the player
* receive the rewards?
* @default Automatically
*          
* @help
*==============================================================================
* SMO_Achievements.js
*==============================================================================
* Hi there!
*
* This plugin adds an achievements' mechanic to your project, including a menu,
* a pop up and other features stuff.
*
* Special Thanks To
* - ShadowDragon
* - NerdyChara
*
*------------------------------------------------------------------------------
* THE BASICS
*------------------------------------------------------------------------------
* ACHIEVEMENTS
* To add/change your achievements use the parameter "Achievements Data". You
* can customize their name, description, icon, image, etc.
*
* CATEGORIES AND TROPHIES
* Each achievement may have one or more categories, use the parameter
* "Categories And Trophies" to customize the categories' names, images and
* other settings.
*
* If you don't want to use categories you can erase all data inside this
* parameter, but keep in mind that the trophies will also be deactivated.
*
* What's a TROPHY?
* After completing all the achievements of a specific category the player
* unlocks a trophy, a custom image will be shown at the achievements menu
* with an also custom message.
*
* As said before, the achievements may be in multiple categories, separate
* the name of each one with a comma, like this: Battle,Gameplay,Dungeon
*
* IMPORTANT: Avoid naming two different achievements/categories with the 
* same name.
*
* CUSTOM IMAGES
* Any custom image shall be placed on "img/achievements". All achievements,
* categories an trophies may use custom images.
*
*------------------------------------------------------------------------------
* IN-GAME EDITOR
*------------------------------------------------------------------------------
* In case this parameter is ON, you'll be able to edit the achievements' data
* in game, that includes the achievements' data, the categories, trophies and
* the menu settings. But that will deactivate the plugin parameters related to
* that data.
*
* The editor was created to make the data management easier, as the plugin
* parameters can't be conditional.
*
* TO START
* When you open the achievements' menu you'll see a green button with the
* letter E, click on it or just press E to open the ACHIEVENATOR, which is
* basically the editors' selector.
*
* Necessary files are automatically created inside the /data file, their
* filenames are: AchievsEditor.json, AchievsCategories.json and
* AchievsMenu.json.
*
* NAVIGATION
* You're gonna need a mouse to navigate through the editors but there's also
* some shortcuts you can use:
*
* Common Shortcuts
* ESC or RMB: Cancel selection / Close the menu;
* Enter: Confirm selection/action;
* Delete: Delete the selected achievement/category;
* CTRL + S: Save changes
*
* Achievenator's Shortcuts
* 1: Open the achievements' editor;
* 2: Open the categories' editor;
* 3: Open the menu editor;
*
* Menu Editor's Shortcuts
* 1: Hide the window selector;
* 2: Enable the window selector's blinking;
* 3: Disable the window selector's blinking;
* H: Hide/Show the menu editor;
*
* You can also move the editors around by clicking and dragging them.
*
* In order to better explain each editor's mechanics this tutorial continues on
* GitHub: https://github.com/SMO-Valadorn/RPGMV/wiki/Achievements
*
*------------------------------------------------------------------------------
* CATEGORIES AND TROPHIES
*------------------------------------------------------------------------------
* If the In-Game Editor is OFF, you'll be able to add/change or remove your
* categories and trophies on this parameter.
*
* Most parameters are easy to understand, but some of them need some more
* information so they'll be highlighted here.
*
* NEW SCENE NAME:
* When you select a category you'll see all the achievements on that category,
* it'll be like you changed to another scene changed (but not really), that's
* why you can use this option to change the scene's name, which is basically
* the text shown at the top of the menu.
*
* NEW SCENE BACKGROUND:
* Similar to the New Scene Name, but with the menu's background, when you
* select this category, the scene's background will change to this image.
*
* LOCKED ACHIEV IMAGE:
* All locked achievements will use this image as default;
*
* SECRET ACHIEV IMAGE:
* All secret achievements will use this image as default;
*
* GLOBAL CATEGORY:
* If true, this cateogory will be automatically added to all achievements,
* but there can only be one global category;
*
* AUTO COLOR:
* You can choose a color to auto color some texts related to this category,
* like the scene name's color when this category is selected and the
* achievements' names within this cateogry;
*
*------------------------------------------------------------------------------
* ACHIEVEMENTS DATA
*------------------------------------------------------------------------------
* If the In-Game Editor is OFF, you'll be able to add/change or remove your
* achievements on this parameter.
*
* A simple setup for this parameter would be like:
* 1 {achievement data} -> this achievement will have ID 1
* 2 {achievement data} -> ID 2
* 3 {achievement data} -> ID 3
*
* The numbers on the left are the lines, if you don't add any custom line they
* will also match the achievement id. For organization pourposes you can add
* custom texts inside this structure (but only on this one), if you do so it'll
* look like this:
* 1 Custom text -> ignored by the plugin
* 2 Custom text -> ignored by the plugin
* 3 {achievement data} -> ID 1
* 4 {achievement data} -> ID 2
* 5 Custom text -> ignored by the plugin
* 6 {achievement data} -> ID 3
*
* As you can see the lines do not match the achievements' ids anymore, the
* id's are given based on the achievements order on the list ignoring the
* custom texts. Any line can be a custom text, as long as it doesn't start
* with a "{".
*
* Check this plugin's demo to see an example of setup for this parameter.
*
*------------------------------------------------------------------------------
* REQUIREMENTS and REWARDS
*------------------------------------------------------------------------------
* TYPE
* The first step is to select a Type (Switch, Variable, Steps, etc);
*
* ITEM ID
* The parameter "Item ID" is only necessary if the chosen type is Switch,
* Variable, Item, Weapon, Armor or Party Member, if the chosen type is not
* between the ones mentioned the "Item ID" will be ignored.
*
* COMPARISON
* It's recommended to leave the "Comparison" in "≥". 
* While using "≥", the achievement's unlock progress will be calculated based
* on this requirement's current/required value, when using other comparisons
* the progress will be based on whether the requirement has been met or not.
*
* Example:
* Requirement: Walk 10 steps.
* After walking 5 steps you'll have: Steps 5/10.
* This will show 50% if the comparison is "≥", but if it's not, it'll show 0%
* until the you reach the 10 steps, then it'll change to 100%.
*
* REQUIRED VALUE
* It's gonna be compared with the current value of the selected item. That's
* the target value.
*
* For example, let's say that you've chosen:
* Type           = Variable 
* Item ID        = 1
* Comparison     = ≥
* Required Value = 10
*
* This requirement will be met only when the variable 1's value is equal or 
* bigger than 10.
*
* ALIAS
* If you don't wanna show this requirement's default name you can give it a
* custom name using this parameter.
* You can make use of the following text codes:
* <CurrentValue>  -> replaced by this item's "Current Value";
* <RequiredValue> -> replaced by this item's "Required Value" (or by the
* "Final Value" if you're using a Custom(Advanced) type);
*
* Each item Type has a default word in case you don't use an Alias:
* Custom(Advanced): Custom
* Switch:           The switch's name
* Variable:         The variable's name
* Item:             The item's name
* Weapon:           The weapon's name
* Armor:            The armor's name
* Gold:             (Gold Icon)
* Party Member:     The party member's name
* All the others are replaced by the item type.
*
* You can also select an icon to be drawn next to your alias by using the
* parameter ALIAS ICON.
* 
* ADVANCED
* To have more control over the requirements you can use JavaScript codes
* to define the current and final values for this requirement.
*
* To create an advanced requirement choose the item type "Custom(Advanced)",
* then add a script to "Current Value", this script shall return the current
* value for this requirement, not the comparison.
* Examples of script on "Current Value":
* $gameVariables.value(1) -> Returns the variable 1's value.
* $gameSwitches.value(1) -> Returns the switch 1's value.
* $gameParty.gold() -> Returns the party's gold.
*
* The comparison is made based on the "Comparison" parameter, don't forget
* to check it out.
*
* Finally, the "Final Value" will be compared to the "Current Value" to unlock
* (or not) the achievement. Adding a script on "Final Value" is not required
* though, if you leave it empty the "Required Value" parameter will be used 
* instead.
*
* Example 1:
* Current Value: $gameVariables.value(1)
* Comparison:    ≥
* Final Value:   $gameVariables.value(2)
* This requirement will be met when the variable 1's value is equal or
* bigger than the variable 2's value.
*
* Example 2:
* Current Value: $gameMap.mapId()
* Comparison:    =
* Final Value:   12
* Met when the player arrives on the map with ID 12.
*
* Example 3
* Current Value: $gameSwitches.value(1) || $gameSwitches.value(2)
* Comparison:    =
* Final Value:   true
* Met when the switch 1 or the switch 2 is ON.
*
* Example 4 (using YEP_JobPoints):
* Current Value: $gameActors.actor(1).jp()
* Comparison:    ≥
* Final Value:   500
* Met at if the actor 1 has 500 JP or more on it's current class.
*
* It's recommended that you use the "Alias" parameter to customize this
* requirement's name. If you don't, the word "Custom" will be used as
* a default name.
*
* REWARDS
* The rewards are similar to the requirements with a few differences.
*
* The "Advanced" parameter is a script call called when the achievement is
* unlocked, it works with any item type not only with custom.
*
*------------------------------------------------------------------------------
* MENU SETTINGS
*------------------------------------------------------------------------------
* On this parameter you can find options to customize all the menu's settings,
* including texts, colors, positions, sizes and so on. Each window has custom
* settings, some of them are explained below:
*
*----------------------------------------
* CATEGORIES WINDOW - Text
*----------------------------------------
* This is the text format used to draw the category's names, you can use some
* text codes in it, which will be replaced when on the menu:
*
* TAG           -> Replacer
* <name>        -> The category's name
* <unlocked>    -> The number of unlocked achievements
* <locked>      -> The number of locked achievements
* <secret>      -> The number of secret achievements
* <recent>      -> The number of recently unlocked achievements
* <collectable> -> The number of achievements with collectable rewards
* <percent>     -> The percentage of unlocked achievements
* <all>         -> The total number of achievements
*
* All achievements mentioned above are related to the current category,
* so <unlocked> will be replaced by the number of unlocked achievements
* on this category, the logic is the same for the other TAGS.
*
* Example: <name> <unlocked>/<all> -> Battle 2/5
*
*----------------------------------------
* TROPHIES - Total Progress, Type and Selection
*----------------------------------------
* Total Progress:
* This text is shown around the Total Progress Bar and, except for the <name>
* TAG, it has the same TAGS as the categories window's text shown above. Also,
* here those codes refer to all achievements, not only for a category.
*
* Example: Progress: <percent>% -> Progress: 20%
*
* Type:
* This parameter refers to the type of data shown on the trophies' window:
* Trophies -> The default option, shows the non hidden trophies;
* Recent -> Shows the recently unlocked achievements;
* Progress -> Shows the achievements closest to being unlocked;
*
* Selecting Trophies:
* To select a trophy on the achievs menu make use of the left and right
* arrow keys, you can hold them to move the selector faster. It's also
* possible to click on the trophies to select them.
*
*----------------------------------------
* ACHIEVS INFO WINDOW - Unlocked On
*----------------------------------------
* All unlocked achievements have their "unlock date" saved, and you can
* use that info on this parameter, just use the following text codes:
*
* <Hour>   -> replaced by the hour (24h style);
* <HourB>  -> replaced by the hour (AM/PM style);
* <Phase>  -> replaced by the phase of the day (AM or PM);
* <Min>    -> replaced by the minutes;
* <Sec>    -> replaced by the seconds;
* <Day>    -> replaced by the day (number);
* <DayB>   -> replaced by the day of the week;
* <DayC>   -> replaced by the abbreviation of the day of the week;
* Examples: Saturday -> Sat, Sunday -> Sun, Monday -> Mon
* <Month>  -> replaced by the month (number);
* <MonthB> -> replaced by the month's name;
* <MonthC> -> replaced by the abbreviation of the month's name;
* Examples: January -> Jun, February -> Feb, December -> Dec
* <Year>   -> replaced by the year (number);
* <Date>   -> replaced by the date (day/month/year);
* <Time>   -> replaced by the time (hour:min:sec);
*
* Examples:
* Unlocked on <date> at <time> --> Unlocked on 19/05/2020 at 19:29:30
* Unlocked on <MonthC> <day>, at <HourB>:<min>:<sec> <phase> -->
*    Unlocked on May 19, at 07:29:30 PM
* Unlocked on <DayC> <MonthC> <year> --> Unlocked on Tue May 2020
*
* Notice that using upper/lower case is irrelevant, you can write
* <Date> or <date> or <DATE> or any other way you want.
* 
*----------------------------------------
* POP UP WINDOW - Button, Text and Animation
*----------------------------------------
* This plugin allows you to show a Pop Up when an achievement is unlocked.
* When many achievements are unlocked at once they enter a queue.
* You can customize this window's properties using the plugin's parameters
* or even deactivate it changing the "Enabled" parameter.
*
* Button:
* If ON, the pop up will become a button, if so, by clicking on it the player
* will be taken to the achievement's menu and the current achievement on the
* pop up will be automatically selected.
*
*
* Text:
* It's also possible to write a text above the custom image using the parameter
* "Text", this text allows text codes like \c[x] and \i[x] and others, but not
* only that, it has some customized text codes you may use:
* TAG                -> Replacer
* <AchievName>       -> The achievement's name;
* <AchievID>         -> The achievement's ID;
* <AchievIcon>       -> Draws the achievement's icon;
* <AchievCategory:n> -> The achievement's n-th category;
* <PopUpDesc>        -> The defined pop up description for this achievement;
* <center>           -> Centralizes this line of text;
* <right>            -> Aligns this line of text to the right of the window;
* The left alignment is default, so there's no code for that.
*
* These codes are case insensitive, which means that you can write <center>,
* <Center>, <CENTER> or any other way you want.
*
*
* Animation:
* When an achievement is unlocked, the pop up must:
* 1. Appear
* 2. Hold on for a momment
* 3. Disappear
*
* At the time it appears and disappears you may use some commands for it:
* 1. Appear
*  - Fade In
*  - Move to the left
* 2. Hold on for a momment
* 3. Disappear
*  - Fade Out
*  - Move to the right
*
* That's meant to give it some life, movement, but you can also give it
* some other commands, actually you can:
* - Move it Left, Up, Right or Down;
* - Increase or Decrease it's size;
* - Fade In/Out;
*
* You can also give it some easing to make it feel more natural, like make
* it's movement follow a quadratic or cubic formula, or just give it a nice
* effect like using the "back" or custom easings, go on and test some of them.
*
* For custom easings I recommend you to go to easings.net and take a look
* at their easing formulas.
*
*----------------------------------------
* SORT OPTIONS
*----------------------------------------
* You may notice an option on the upper left corner of the achievements menu
* (A-z), this option may be used to order all the achievements in a specific
* way. You may click (LMB) on that box to show the options and select a new
* one to order the achievements again.
*
* The keyboard and the gamepad may also be used to command the sort option,
* press "Shift" to open it, the arrow keys to select a new option and "Ok"
* (Z or Enter) to confirm or "Cancel" (X or Esc) to cancel.
*
* You can add/edit or remove the sort options with this parameter. By removing
* all the options you'll deactivate it. You'll need some JavaScript knowledge
* to create or edit those options.
*
* When editing a sort option's script, you may use some variables:
*
* locked -> an array which stores all the locked (non secret) achievements;
*
* unlocked -> an array which stores all the unlocked achievements;
*
* secrets -> an array which stores all the secret achievements. Keep in mind
* that those are also locked, if a secret achievement is unlocked it'll be
* part of the unlocked array.
*
* main -> an empty array which will be returned as the new list of achievements
* for the achievements menu, so make sure to concat the other arrays into
* this one.
*
* all -> an array containing all the achievements, just like the other arrays,
* this one is filtered by the selected category. Also, no hidden achievement 
* will appear on any array, but once a hidden achievement is unlocked it'll be 
* part of the unlocked array.
*
* Examples:
*
* main = all;
* The example above will return the achievements with the same order as the
* database.
*
* main = main.concat(locked, unlocked, secrets);
* With the script above the achievements will also be at the same order as the
* database, except that the locked achievements will appear first, followed
* by the unlocked ones and at last the secret ones.
*
* You can use sort() to order the achievents, check the default value on
* "Options" to see some examples.
*
*------------------------------------------------------------------------------
* GLOBAL MODE
*------------------------------------------------------------------------------
*  - Global Mode OFF (Local Mode):
* The Achievements must be unlocked on each playthrough, unlocked achievements
* are saved with that game's save file.
*
* - Global Mode ON:
* Unlocked achievements will remain unlocked even if the player closes the game
* and the only way to change it's state back to "locked" is by using plugin
* commands or script calls. This data is saved on /save/achievs.rpgsave.
*
*------------------------------------------------------------------------------
* YEP_MainMenuManager Compatibility
*------------------------------------------------------------------------------
* In case you want to use YEP_MainMenuManager you can turn the "MC Active"
* parameter OFF and use the following settings:
*
*       Name: "Achievements"
*     Symbol: achievements
*       Show: true
*    Enabled: true
*        Ext:
*  Main Bind: this.commandAchievements.bind(this)
* Actor Bind:
*
* You can customize the "Name", "Show" and "Enabled" options.
*
*------------------------------------------------------------------------------
* PLUGIN COMMANDS
*------------------------------------------------------------------------------
* Command 1:
* ShowAchievements
*
* Action:
* Opens the achievements menu.
*
*  -  -  -  -  -  -  -  -  -  -
* Command 2:
* ShowAchievements categoryName
*
* Action:
* Opens the achievements menu on a specific category.
*
* Example:
* ShowAchievements Battle
*
*  -  -  -  -  -  -  -  -  -  -
* Command 3:
* RefreshAchievements
*
* Action:
* Manually refreshes the locked achievements, unlocking them in case their
* requirements are met.
*
*  -  -  -  -  -  -  -  -  -  -
* Command 4:
* ResetAchievementsData
*
* Action:
* Locks all the achievements and trophies.
*
*------------------------------------------------------------------------------
* SCRIPT CALLS
*------------------------------------------------------------------------------
* The id of an achievement is the number that appears next to it's data on
* the "Achievements Data" parameter, it's based on their order on that list
* so the first data will have id = 1, the second id = 2 and so on.
*
* Script 1:
* $gameSystem.achievement(id)
*
* Action:
* Returns the data of this achievement or null if there's no achievement
* with this id.
*
* Examples:
* $gameSystem.achievement(1);
* $gameSystem.achievement('Slime Slayer');
*
*  -  -  -  -  -  -  -  -  -  -
* Script 2:
* $gameSystem.achievement(id).isUnlocked()
*
* Action:
* Returns a boolean (true or false).
*
*  -  -  -  -  -  -  -  -  -  -
* Script 3:
* $gameSystem.achievement(id).isSecret()
*
* Action:
* Returns a boolean (true or false).
*
*  -  -  -  -  -  -  -  -  -  -
* Script 4:
* $gameSystem.achievement(id).isHidden()
*
* Action:
* Returns a boolean (true or false).
*
*  -  -  -  -  -  -  -  -  -  -
* Script 5:
* $gameSystem.achievement(id).unlock()
*
* Action:
* Forces this achievement to unlock.
*
*  -  -  -  -  -  -  -  -  -  -
* Script 6:
* $gameSystem.achievement(id).lock()
*
* Action:
* Locks the achievement again.
*
*  -  -  -  -  -  -  -  -  -  -
* Script 7:
* $gameSystem.unlockedAchievsCount()
*
* Action:
* Returns the number of achievements unlocked so far.
*
*  -  -  -  -  -  -  -  -  -  -
* Script 8:
* $gameSystem.lockedAchievsCount()
*
* Action:
* Returns the number of achievements still locked.
*
*  -  -  -  -  -  -  -  -  -  -
* Script 9:
* $gameSystem.isTrophyUnlocked(id)
*
* Action:
* Returns a boolean (true or false). You can use the category's name or ID.
*
* Examples:
* $gameSystem.isTrophyUnlocked(1);
* $gameSystem.isTrophyUnlocked('Battle');
*
*  -  -  -  -  -  -  -  -  -  -
* Script 10:
* $gameSystem.achievement(id).turnSecret()
*
* Action:
* Turns this achievement secret;
*
*  -  -  -  -  -  -  -  -  -  -
* Script 11:
* $gameSystem.achievement(id).turnHidden()
*
* Action:
* Turns this achievement hidden;
*
*  -  -  -  -  -  -  -  -  -  -
* Script 12:
* $gameSystem.achievement(id).reveal()
*
* Action:
* Reveals this achievement in case it's a secret or hidden;
*
*  -  -  -  -  -  -  -  -  -  -
* Script 13:
* $gameSystem.achievement(id).isRevealed()
*
* Action:
* Returns true if this achievement was originally hidden or secret but is
* currently relealed, or false otherwise;
*
*  -  -  -  -  -  -  -  -  -  -
* Script 14:
* $gameSystem.achievement(id).isRewardAvailable()
*
* Action:
* Returns true if this achievement is unlocked but it's rewards haven't been
* collected yet, or false otherwise;
*
*  -  -  -  -  -  -  -  -  -  -
* Script 15:
* $gameParty.goldGained();
*
* Action:
* Returns all the gold the player ever gained during the current playthrough;
*
*  -  -  -  -  -  -  -  -  -  -
* Script 16:
* $gameParty.goldSpent();
*
* Action:
* Returns the gold spent by the player during the current playthrough;
*
*------------------------------------------------------------------------------
* Changelog
*------------------------------------------------------------------------------
* V 1.04
*    - Added the ACHIEVENATOR, which includes an editor for the achievements,
*    for the menu and for the categories;
*    - Added option to collect the reward manually, check out the "Collect
*    Reward" parameter;
*    - Rewards are now optional, check out the "Use Rewards" parameter;
*    - You can now reveal secret and hidden achievements before the player
*    unlocks it or turn other achievements into secret/hidden ones, take a
*    look at the new script calls (10-14);
*    - Gold gained and spent are now tracked and available to be used as the
*    requirement types: "Gold Gained" and "Gold Spent", there are new script
*    calls to check those values too (scripts 15 and 16);
*    - New reward type: Experience;
*    - New parameter for categories: "Global Category", only one category may
*    be global, it'll be automatically added to all achievements;
*    - The info window now has a fixed height and scrollers were added to the
*    requirements and rewards;
*    - Compatibility with YEP_MessageCore and some translation plugins:
*    SRD_TranslationEngine, KDTools_Localization and Iavra Localization - Core;
*    - Necessary files are automatically created, "data/Achievements.json"
*    is now on "save/achievs.rpgsave", the old data is automatically imported
*    and the old file deleted;
*    - Auto-refresh after transfer is now optional, check out the "Refresh
*    After Transfer" parameter;
*    - Fixed error where achievements unlocked on global mode were not being
*    saved on deployed projects;
*    - Fixed bug where unlocking an achievement with no background would still
*    show the "locked" image as background;
*    - Fixed bug where loading a game saved while the pop up is visible would
*    show the same pop up without background when that game is loaded, you can
*    now decide what the pop up should remember when loading a game, check out
*    the "Local Load Pop Up" parameter;
*    - Fixed bug where the trophies could be misplaced when using the "Grow"
*    selector;
*    - Fixed bug where creating a requirement based on the party size would
*    crash the game;
*    - Fixed bug where it was possible to unlock achievements on scenes
*    loaded from the title on local mode;
*    - General improvements on the plugin's script and plugin parameters;
*
* V 1.03 
*    - The info window now open/close instead of just appearing/disappearing;
*    - Improved wrap text mechanic, and it also works on the info window now;
*    - Improved performance on the menu;
*    - Achievements are now refreshed after transfering;
*    - Parameter "Unlocked In" changed to "Unlocked On";
*    - New parameters for trophies on "Categories and Trophies": "Hide Trophy",
*    "Trophy Image" and "On Unlock";
*    - New parameter inside "Use Trophies": "Trophy Selector";
*    - Added option to select images for locked and secret achievements (check
*    out "Locked Achiev Background" and "Secret Achiev Background";
*    - Added text codes for the pop up's text and for the "Unlocked On" text;
*    - Added possibility to set custom images for categories;
*    - It's possible to set a different image for the pop up for each achiev,
*    check out "Pop Up Image" inside "Achievements Data";
*    - Fixed bug where advanced requirements were not working properly;
*
* V 1.02 
*    - Fixed bug with plugin commands;
*    - Fixed bug where achievements unlocked with script calls were not
*    being saved on global range;
*
* V 1.01 
*    - New parameter added: Global Rewards;
*
* V 1.00 
*    - Plugin released!
*
*------------------------------------------------------------------------------
* END OF THE HELP FILE
*------------------------------------------------------------------------------
*/
//==========================================================================================
// Categories Structure
//==========================================================================================
/*~struct~categories:
*
* @param Category Name
* @desc Choose a name for this category.
* @default Battle
*
* @param New Scene Name
* @desc Choose a new name for the menu when this category is selected.
* @default
*
* @param Category Background
* @type file
* @dir img/achievements
* @require 1
* @desc This image will appear behind the category's name when
* selecting categories.
* @default
*
* @param New Menu Background
* @type file
* @dir img/achievements
* @require 1
* @desc This image will be the menu's background when this category
* is selected.
* @default
*
* @param Locked Achiev Image
* @type file
* @dir img/achievements
* @require 1
* @desc Locked achievements on this category will have this image
* as background by default.
* @default
*
* @param Secret Achiev Image
* @type file
* @dir img/achievements
* @require 1
* @desc Secret achievements on this category will have this image
* as background by default.
* @default
*
* @param Global Category
* @type boolean
* @desc If ON, all achievements will belong to this category
* automatically, only one Global Category is allowed.
* @default false
*
* @param Auto Color
* @type struct<catAutoColor>
* @desc Options to auto color the names of the achievements on this category.
* @default {"Color":"","AC Category Name":"true","AC Scene Name":"true","AC Achievs Names":"true","AC Pop Up":"true"}
*
* @param --- Trophy ---
* @default --------------------
*
* @param Hide Trophy
* @parent --- Trophy ---
* @type boolean
* @desc If ON, this trophy won't appear on the menu, but the player can still unlock it.
* @default false
*
* @param Trophy Description
* @parent --- Trophy ---
* @type note
* @desc Write a description for this category's trophy.
* @default "This is a description."
*
* @param Trophy Image
* @parent --- Trophy ---
* @type file
* @dir img/achievements
* @require 1
* @desc This image will be drawn on the achievements menu while this
* trophy is unlocked.
* @default
*
* @param Locked Trophy Image
* @parent --- Trophy ---
* @type file
* @dir img/achievements
* @require 1
* @desc This image will be drawn on the achievements menu while this
* trophy is locked.
* @default
*
* @param On Unlock
* @parent --- Trophy ---
* @type note
* @desc This script will be called once this trophy is unlocked.
* @default
*
*/

//==========================================================================================
// Category Auto Color Structure
//==========================================================================================
/*~struct~catAutoColor:
*
* @param Color
* @desc This color represents this category.
* @default
*
* @param AC Category Name
* @type boolean
* @on YES
* @off NO
* @desc Auto color the category's name on category selection?
* @default true
*
* @param AC Scene Name
* @type boolean
* @on YES
* @off NO
* @desc Auto color the scene name when this category is selected?
* @default true
*
* @param AC Achievs Names
* @type boolean
* @on YES
* @off NO
* @desc Auto color the achievements' names on this category?
* @default true
*
* @param AC Pop Up Desc
* @type boolean
* @on YES
* @off NO
* @desc Auto color the category's name on the pop up?
* @default true
*
* @param AC Pop Up (AchievName)
* @type boolean
* @on YES
* @off NO
* @desc Auto color the achievement's name on the pop up?
* @default true
*
* @param AC Pop Up (Borders)
* @type boolean
* @on YES
* @off NO
* @desc Auto color the pop up's borders?
* @default true
*
*/
//==========================================================================================
// Achievs Structure
//==========================================================================================
/*~struct~data:
*
* @param Name
* @desc Defines the name of this achievement.
* This name will appear when selecting achievements.
* @default Slime Slayer
*
* @param Category
* @desc Define the category of this achievement. You can set
* multiple categories, separate each one with a comma.
* @default Battle
*
* @param Description
* @type note
* @desc This text will be shown on this achievement's body.
* Maximum of 3 lines.
* @default "Kill 10 Slimes."
*
* @param Pop Up Desc
* @type note
* @desc A second description which may be used on the pop up.
* @default "Well, that was easy."
*
* @param Visibility
* @type select
* @option Visible from start
* @option Secret
* @option Hidden
* @desc Secret: You'll see this achievement with question marks.
* Hidden: You won't see this achievement on the menu.
* @default Visible from start
*
* @param Background Image
* @type file
* @dir img/achievements
* @require 1
* @desc Choose an image to serve as background for this achievement.
* @default
*
* @param Pop Up Image
* @type file
* @dir img/achievements
* @require 1
* @desc This image will be the pop up's background when this achievement is unlocked.
* @default
*
* @param Hide Progress
* @type boolean
* @desc If ON, this achievement's progress will be hidden on the menu.
* @default false
*
* @param Requirements
* @type struct<requirements>[]
* @desc Defines what is required to unlock this achievement.
* @default ["{\"Type\":\"Switch\",\"Item ID\":\"1\",\"Comparison\":\"≥\",\"Value\":\"1\",\"Alias\":\"\",\"Advanced\":\"------\",\"Current Value\":\"\",\"Final Value\":\"\"}"]
*
* @param Rewards
* @type struct<rewards>[]
* @desc Make a list with the rewards for unlocking this achievement.
* @default
*
* @param Icons
* @desc These icons will be drawn next to this achievement's name.
* They will overwrite the "Default Icons".
* @default ------
*
* @param Locked Icon
* @parent Icons
* @type number
* @min -2
* @desc -1 -> No icon at all;
* -2 -> Replaced the equivalent "Global Icon".
* @default -2
*
* @param Unlocked Icon
* @parent Icons
* @type number
* @min -2
* @desc -1 -> No icon at all; 
* -2 -> Replaced the equivalent "Global Icon".
* @default -2
*
* @param Secret Icon
* @parent Icons
* @type number
* @min -2
* @desc -1 -> No icon at all;
* -2 -> Replaced the equivalent "Global Icon".
* @default -2
*
*/
//==========================================================================================
// Requirements Structure
//==========================================================================================
/*~struct~requirements:
*
* @param Type
* @type select
* @option Custom(Advanced)
* @option Switch
* @option Variable
* @option Item
* @option Weapon
* @option Armor
* @option Gold Gained
* @option Gold Spent
* @option Gold
* @option Steps
* @option Playtime
* @option Save Count
* @option Battle Count
* @option Win Count
* @option Escape Count
* @option Party Member
* @option Party Level
* @option Party Size
* @desc Choose the requirement type.
* @default Switch
*
* @param Item ID
* @type Number
* @min 1
* @desc The ID of the Switch, Variable, Item, Weapon, Armor or
* Party Member.
* @default 1
*
* @param Comparison
* @type select
* @option =
* @option >
* @option ≥
* @option <
* @option ≤
* @option ≠
* @desc This will be used for comparison between the current
* value and the required one.
* @default ≥
*
* @param Required Value
* @desc This is the value required to unlock this achievement.
* @default 1
*
* @param Alias
* @desc This name will override the item's name.
* Read the help section to learn about it.
* @default
*
* @param Alias Icon
* @parent Alias
* @type number
* @min -2
* @desc -2 to use the default icon.
* -1 to use no icon at all.
* @default -2
*
* @param Advanced
* @desc For custom items only.
* Check the parameters below.
* @default ------
*
* @param Current Value
* @parent Advanced
* @type note
* @desc Use JS to define this requirement's current value.
* Read the help section to learn about it.
* @default
*
* @param Final Value
* @parent Advanced
* @type note
* @desc Use JS to define this requirement's final value.
* Read the help section to learn about it.
* @default
*
*/
//==========================================================================================
// Rewards Structure
//==========================================================================================
/*~struct~rewards:
*
* @param Type
* @type select
* @option Custom(Advanced)
* @option Gold
* @option Item
* @option Weapon
* @option Armor
* @option Experience
* @desc Select the item type.
* @default Gold
*
* @param Item ID
* @type number
* @min 1
* @desc Select the Item ID (ignore this if you selected Gold).
* @default 1
*
* @param Amount
* @type Number
* @min 1
* @desc Defines the amount of the selected item to be given
* to the player.
* @default 1
*
* @param Advanced
* @type note
* @desc Use JS to code a script, this script will be called once
* this achievement is unlocked. Works with all item types.
* @default
*
* @param Alias
* @desc This name will override the item's name.
* Read the help section to learn about it.
* @default
*
* @param Alias Icon
* @parent Alias
* @type number
* @min -2
* @desc -2 to use the default icon.
* -1 to use no icon at all.
* @default -2
*
*/
//==========================================================================================
// Menu Settings Structure
//==========================================================================================
/*~struct~menuSets:
*
* @param Scene Name
* @type struct<sceneNameSets>
* @desc Settings of the window at the top of the menu.
* @default {"------ Position ------":"--------------------","X":"0","Y":"0","-------- Size --------":"--------------------","Width":"Graphics.width","Height":"80","------- Texts --------":"--------------------","Title":"Achievements","-------- Font --------":"--------------------","Font Face":"GameFont","Font Size":"28","----- Appearence -----":"--------------------","Opacity":"255","Window Skin":"","------- Colors -------":"--------------------","Text Color":"#ffffff"}
*
* @param Categories
* @type struct<categoriesSets>
* @desc Settings for the categories' window.
* @default {"------ Position ------":"--------------------","X":"0","Y":"80","-------- Size --------":"--------------------","Width":"Graphics.width / 3","Height":"Graphics.height - 80","------- Texts --------":"--------------------","Text":"<name> (<unlocked>/<all>)","Text Align":"Center","-------- Font --------":"--------------------","Font Face":"GameFont","Font Size":"28","----- Appearence -----":"--------------------","Opacity":"255","Window Skin":"","Columns":"1","------- Colors -------":"--------------------","Text Color":"#ffffff","------- Items --------":"--------------------","Item Height":"72","Draw Rectangle":"true","Rect Border Size":"1","Rect Border Color":"rgba(255,255,255,1)","Rect Back Color":"rgba(0,0,0,0.5)"}
*
* @param Trophies
* @type struct<trophiesSets>
* @desc Settings for the trophies' window.
* @default {"Type":"Trophies","------ Position ------":"--------------------","X":"Graphics.width / 3","Y":"80","-------- Size --------":"--------------------","Width":"Graphics.width * 2 / 3","Height":"Graphics.height - 80","------- Texts --------":"--------------------","Title":"TROPHIES","Description":"\"Unlock trophies by completing achievements. Each category unlocks a different trophy.\"","Locked":"LOCKED","Locked Sign":"?","Total Progress":"Total Progress: <unlocked>/<all> (<percent>%)","-------- Font --------":"--------------------","Font Face":"GameFont","Font Size":"28","----- Appearence -----":"--------------------","Opacity":"255","Window Skin":"","Lines":"2","Columns":"2","Big Trophy Y":"140","Big Trophy Height":"250","Progress Bar Y":"480","Progress Text Position":"Top Right","------- Colors -------":"--------------------","Text Color":"#ffffff","Progress Gauge C1":"#aa8300","Progress Gauge C2":"#ffa500","Progress Gauge BG":"#202040","------- Items --------":"--------------------","Border Size":"2","------ Selector ------":"--------------------","Selector":"Grow","Selector Color":"#ff9900","Selector Image":""}
*
* @param Achievements
* @type struct<achievementsSets>
* @desc Settings for the achievements' window.
* @default {"------ Position ------":"--------------------","X":"0","Y":"80","-------- Size --------":"--------------------","Width":"Graphics.width","Height":"Graphics.height - 80","-------- Font --------":"--------------------","Font Face":"GameFont","Font Size":"18","----- Appearence -----":"--------------------","Opacity":"255","Window Skin":"","Columns":"Math.floor(Graphics.width / 200)","------- Colors -------":"--------------------","Text Color":"#ffffff","Progress Gauge C1":"rgba(20,255,20,1)","Progress Gauge C2":"rgba(100,255,100,1)","Progress Gauge BG":"#202040","------- Items --------":"--------------------","Hide Progress":"false","Progress Gauge Height":"24","Progress Align":"Center","Progress Style":"Percent","Corner Radius":"8","Description Lines":"3","Item Height":"144","Border Size":"1"}
*
* @param Achievs Info
* @type struct<achievsInfoSets>
* @desc Settings for the achievement's info window.
* @default {"Enabled":"true","------ Position ------":"--------------------","X":"Graphics.width / 4","Y":"78","-------- Size --------":"--------------------","Width":"Graphics.width / 2","Height":"468","------- Texts --------":"--------------------","Unlocked On":"Unlocked on <date> at <time>","Requirements":"Requirements:","Rewards":"Rewards:","None":"None","Collect":"COLLECT","Collected":"COLLECTED","------ Collect -------":"--------------------","Collect X":"50","Collect Y":"425","Collect Width":"100","Collect Height":"25","Collect Color":"#43d643","Collect Border Size":"1","Collect Image":"","-------- Font --------":"--------------------","Font Face":"GameFont","Font Size":"28","----- Appearence -----":"--------------------","Opacity":"255","Window Skin":"","Scroll Color 1":"#777777","Scroll Color 2":"#353535","Text Color":"#ffffff"}
*
* @param Pop Up
* @type struct<popUpSets>
* @desc Settings for the info window.
* @default {"Enabled":"true","Button":"true","------ Position ------":"--------------------","X":"Graphics.width - 140","Y":"0","-------- Size --------":"--------------------","Width":"140","Height":"106","------- Texts --------":"--------------------","Text":"\"<center>\\\\c[1]\\\\}Unlocked:\\n<center>\\\\c[0]\\\\{<achievName>\"","-------- Font --------":"--------------------","Font Face":"GameFont","Font Size":"21","----- Appearence -----":"--------------------","Opacity":"255","------- Border -------":"--------------------","Border Size":"1","Border Color":"#ff9900","----- Animation ------":"--------------------","Fading":"Fade In and Out","Move In":"Leftwards","Move Out":"Rightwards","Size In":"No size change","Size Out":"No size change","Easing":"Back","Custom Easing In":"","Custom Easing Out":""}
*
* @param Sort Option
* @type struct<sortOptSets>
* @desc Settings for the sort option.
* @default {"Enabled":"true","------ Position ------":"--------------------","X":"15","Y":"25","-------- Size --------":"--------------------","Width":"120","Height":"30","------- Texts --------":"--------------------","Options":"[\"{\\\"Symbol\\\":\\\"A-z\\\",\\\"Script\\\":\\\"\\\\\\\"main = unlocked.concat(locked);\\\\\\\\nmain.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\nmain.push(...secrets);\\\\\\\"\\\"}\",\"{\\\"Symbol\\\":\\\"Locked\\\",\\\"Script\\\":\\\"\\\\\\\"unlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\nlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\nmain = locked.concat(unlocked, secrets);\\\\\\\"\\\"}\",\"{\\\"Symbol\\\":\\\"Unlocked\\\",\\\"Script\\\":\\\"\\\\\\\"unlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\nlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\nmain = unlocked.concat(locked, secrets);\\\\\\\"\\\"}\",\"{\\\"Symbol\\\":\\\"Recent\\\",\\\"Script\\\":\\\"\\\\\\\"unlocked.sort((a, b) => SMO.AM.compareAchievsDates(a, b));\\\\\\\\nlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\\\\\nmain = unlocked.concat(locked, secrets);\\\\\\\"\\\"}\",\"{\\\"Symbol\\\":\\\"Unlocking\\\",\\\"Script\\\":\\\"\\\\\\\"locked.sort(function(a, b) {var pa = a.progress(); var pb = b.progress(); return pb - pa || a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' })});\\\\\\\\nmain = locked.concat(unlocked, secrets);\\\\\\\"\\\"}\"]","-------- Font --------":"--------------------","Font Face":"GameFont","Font Size":"18","----- Appearence -----":"--------------------","Opacity":"255","Border Size":"2","------- Colors -------":"--------------------","Text Color":"#ffffff","Border Color":"#ffffff","Background Color":"rgba(0,0,0,0.8)"}
*
*/
//==========================================================================================
// Scene Name Settings Structure
//==========================================================================================
/*~struct~sceneNameSets:
*
* @param ------ Position ------
* @default --------------------
*
* @param X
* @parent ------ Position ------
* @desc Define the X position for this window.
* @default 0
*
* @param Y
* @parent ------ Position ------
* @desc Define the Y position for this window.
* @default 0
*
* @param -------- Size --------
* @default --------------------
*
* @param Width
* @parent -------- Size --------
* @desc Define the width for this window.
* @default Graphics.width
*
* @param Height
* @parent -------- Size --------
* @desc Define the Height for this window.
* @default 80
*
* @param ------- Texts --------
* @default --------------------
*
* @param Title
* @parent ------- Texts --------
* @desc The default text drawn on this window.
* @default Achievements
*
* @param -------- Font --------
* @default --------------------
*
* @param Font Face
* @parent -------- Font --------
* @desc Define the font used on this window.
* @default GameFont
*
* @param Font Size
* @parent -------- Font --------
* @type number
* @min 12
* @max 100
* @desc Define the default font size for this window.
* @default 28
*
* @param ----- Appearence -----
* @default --------------------
*
* @param Opacity
* @parent ----- Appearence -----
* @type number
* @min 0
* @max 255
* @desc Define the opacity of this window.
* @default 255
*
* @param Window Skin
* @parent ----- Appearence -----
* @type file
* @dir img/system
* @require 1
* @desc The image used to draw this window. Notice that this one is
* loaded from img/system, NOT from img/achievements.
*
* @param ------- Colors -------
* @default --------------------
*
* @param Text Color
* @parent ------- Colors -------
* @desc The default color used to draw this window's text.
* You can use Hexadecimal or rgba colors.
* @default #ffffff
*
*/
//==========================================================================================
// Categories Settings Structure
//==========================================================================================
/*~struct~categoriesSets:
*
* @param ------ Position ------
* @default --------------------
*
* @param X
* @parent ------ Position ------
* @desc Define the X position for this window.
* @default 0
*
* @param Y
* @parent ------ Position ------
* @desc Define the Y position for this window.
* @default 80
*
* @param -------- Size --------
* @default --------------------
*
* @param Width
* @parent -------- Size --------
* @desc Define the width for this window.
* @default Graphics.width / 3
*
* @param Height
* @parent -------- Size --------
* @desc Define the Height for this window.
* @default Graphics.height - 80
*
* @param ------- Texts --------
* @default --------------------
*
* @param Text
* @parent ------- Texts --------
* @desc Defines the style of the category's name.
* @default <name> (<unlocked>/<all>)
*
* @param Text Align
* @parent ------- Texts --------
* @type select
* @option Left
* @option Center
* @option Right
* @desc Defines the alignment for the categories' texts.
* @default Center
*
* @param -------- Font --------
* @default --------------------
*
* @param Font Face
* @parent -------- Font --------
* @desc Define the font used on this window.
* @default GameFont
*
* @param Font Size
* @parent -------- Font --------
* @type number
* @min 12
* @max 100
* @desc Define the default font size for this window.
* @default 28
*
* @param ----- Appearence -----
* @default --------------------
*
* @param Opacity
* @parent ----- Appearence -----
* @type number
* @min 0
* @max 255
* @desc Define the opacity of this window.
* @default 255
*
* @param Window Skin
* @parent ----- Appearence -----
* @type file
* @dir img/system
* @require 1
* @desc The image used to draw this window. Notice that this one is
* loaded from img/system, NOT from img/achievements.
*
* @param Columns
* @parent ----- Appearence -----
* @type number
* @min 1
* @max 12
* @desc Define the amount of columns for the categories.
* @default 1
*
* @param ------- Colors -------
* @default --------------------
*
* @param Text Color
* @parent ------- Colors -------
* @desc The default color used to draw this window's text.
* You can use Hexadecimal or rgba colors.
* @default #ffffff
*
* @param ------- Items --------
* @default --------------------
*
* @param Item Height
* @parent ------- Items --------
* @desc Defines the height for each category.
* @default 72
*
* @param Draw Rectangle
* @parent ------- Items --------
* @type Boolean
* @on YES
* @off NO
* @desc Do you want to draw a rectangle behind the
* categories' names when no image is selected?
* @default true
*
* @param Rect Border Size
* @parent Draw Rectangle
* @type number
* @min 0
* @max 10
* @desc Define the border's thickness.
* Leave it at zero if you don't want borders.
* @default 1
*
* @param Rect Border Color
* @parent Draw Rectangle
* @desc Define a color for the rectangle's borders.
* You can use hexadecimal or rgba colors.
* @default rgba(255,255,255,1)
*
* @param Rect Back Color
* @parent Draw Rectangle
* @desc Define a color for the rectangle's background.
* You can use hexadecimal or rgba colors.
* @default rgba(0,0,0,0.5)
*
*/
//==========================================================================================
// Trophies Settings Structure
//==========================================================================================
/*~struct~trophiesSets:
*
* @param Type
* @type select
* @option Trophies
* @option Recent
* @option Progress
* @desc Recent -> Shows the recently unlocked achievements
* Progress -> Shows the achievements closest to being unlocked
* @default Trophies
*
* @param ------ Position ------
* @default --------------------
*
* @param X
* @parent ------ Position ------
* @desc Define the X position for this window.
* @default Graphics.width / 3
*
* @param Y
* @parent ------ Position ------
* @desc Define the Y position for this window.
* @default 80
*
* @param -------- Size --------
* @default --------------------
*
* @param Width
* @parent -------- Size --------
* @desc Define the width for this window.
* @default Graphics.width * 2 / 3
*
* @param Height
* @parent -------- Size --------
* @desc Define the Height for this window.
* @default Graphics.height - 80
*
* @param ------- Texts --------
* @default --------------------
*
* @param Title
* @parent ------- Texts --------
* @desc This name will appear above the tophies.
* @default TROPHIES
*
* @param Description
* @parent ------- Texts --------
* @type note
* @desc This text will be right below the trophies' title.
* @default "Unlock trophies by completing achievements. Each category unlocks a different trophy."
*
* @param Locked
* @parent ------- Texts --------
* @desc This text will be shown when selecting a locked trophy.
* @default LOCKED
*
* @param Locked Sign
* @parent ------- Texts --------
* @desc This is the sign drawn over a locked trophy.
* @default ?
*
* @param Total Progress
* @parent ------- Texts --------
* @desc This is the text showed at the end of the trophies'
* window, below the progress gauge.
* @default Total Progress: <unlocked>/<all>
*
* @param -------- Font --------
* @default --------------------
*
* @param Font Face
* @parent -------- Font --------
* @desc Define the font used on this window.
* @default GameFont
*
* @param Font Size
* @parent -------- Font --------
* @type number
* @min 12
* @max 100
* @desc Define the default font size for this window.
* @default 28
*
* @param ----- Appearence -----
* @default --------------------
*
* @param Opacity
* @parent ----- Appearence -----
* @type number
* @min 0
* @max 255
* @desc Define the opacity of this window.
* @default 255
*
* @param Window Skin
* @parent ----- Appearence -----
* @type file
* @dir img/system
* @require 1
* @desc The image used to draw this window. Notice that this one is
* loaded from img/system, NOT from img/achievements.
*
* @param Lines
* @parent ----- Appearence -----
* @type number
* @min 1
* @max 7
* @desc Define the number of columns on this window.
* @default 2
*
* @param Columns
* @parent ----- Appearence -----
* @type number
* @min 1
* @max 7
* @desc Define the number of columns on this window.
* @default 2
*
* @param Big Trophy Y
* @parent ----- Appearence -----
* @desc Define Y coordinate for the big trophy.
* @default 140
*
* @param Big Trophy Height
* @parent ----- Appearence -----
* @desc Define height of the big trophy.
* @default 250
*
* @param Progress Bar Y
* @parent ----- Appearence -----
* @desc Define Y coordinate for the total progress bar.
* @default 428
*
* @param Progress Text Position
* @parent ----- Appearence -----
* @type select
* @option Top Left
* @option Top Center
* @option Top Right
* @option Middle Left
* @option Middle Center
* @option Middle Right
* @option Bottom Left
* @option Bottom Center
* @option Bottom Right
* @desc Define a place around the Total Progress bar to draw the
* Total Progress text.
* @default Bottom Center
*
* @param ------- Colors -------
* @default --------------------
*
* @param Text Color
* @parent ------- Colors -------
* @desc The default color for the trophies' text.
* You can use hexadecimal or rgba colors. Default: #ffffff
* @default #ffffff
*
* @param Progress Gauge C1
* @parent ------- Colors -------
* @desc The first color for the total progress gauge.
* You can use hexadecimal or rgba colors. Default: rgba(170,130,0,1)
* @default rgba(170,130,0,1)
*
* @param Progress Gauge C2
* @parent ------- Colors -------
* @desc The second color for the total progress gauge.
* You can use hexadecimal or rgba colors. Default: rgba(255,165,0,1)
* @default rgba(255,165,0,1)
*
* @param Progress Gauge BG
* @parent ------- Colors -------
* @desc The background color for the progress gauge.
* You can use hexadecimal or rgba colors. Default: #202040
* @default #202040
*
* @param ------- Items --------
* @default --------------------
*
* @param Border Size
* @parent ------- Items --------
* @desc Defines the border size for each trophy.
* @default 2
*
* @param ------ Selector ------
* @default --------------------
*
* @param Selector
* @parent ------ Selector ------
* @type select
* @option Grow
* @option Cursor
* @desc Grow -> The trophy will grow in size when selected.
* Cursor -> An image will appear around the trophy.
* @default Grow
*
* @param Selector Color
* @parent ------ Selector ------
* @desc The color of the selector.
* You can use hexadecimal or rgba colors. Default: #ff9900
* @default #ff9900
*
* @param Selector Image
* @parent ------ Selector ------
* @type file
* @dir img/achievements
* @require 1
* @desc Choose a custom image to use as the selector.
* @default
*/
//==========================================================================================
// Achievs Window Structure
//==========================================================================================
/*~struct~achievementsSets:
*
* @param ------ Position ------
* @default --------------------
*
* @param X
* @parent ------ Position ------
* @desc Define the X position for this window.
* @default 0
*
* @param Y
* @parent ------ Position ------
* @desc Define the Y position for this window.
* @default 80
*
* @param -------- Size --------
* @default --------------------
*
* @param Width
* @parent -------- Size --------
* @desc Define the width for this window.
* @default Graphics.width
*
* @param Height
* @parent -------- Size --------
* @desc Define the Height for this window.
* @default Graphics.height - 80
*
* @param -------- Font --------
* @default --------------------
*
* @param Font Face
* @parent -------- Font --------
* @desc Define the font used on this window.
* @default GameFont
*
* @param Font Size
* @parent -------- Font --------
* @type number
* @min 12
* @max 100
* @desc Define the default font size for this window.
* @default 18
*
* @param ----- Appearence -----
* @default --------------------
*
* @param Opacity
* @parent ----- Appearence -----
* @type number
* @min 0
* @max 255
* @desc Define the opacity of this window.
* @default 255
*
* @param Window Skin
* @parent ----- Appearence -----
* @type file
* @dir img/system
* @require 1
* @desc The image used to draw this window. Notice that this one is
* loaded from img/system, NOT from img/achievements.
*
* @param Columns
* @parent ----- Appearence -----
* @desc Define the number of columns on this window.
* @default Math.floor(Graphics.width / 200)
*
* @param ------- Colors -------
* @default --------------------
*
* @param Text Color
* @parent ------- Colors -------
* @desc The color for the achievement's text.
* You can use hexadecimal or rgba colors. Default: #ffffff
* @default #ffffff
*
* @param Progress Gauge C1
* @parent ------- Colors -------
* @desc The first color for the achievements progress gauge.
* You can use hexadecimal or rgba colors. Default: rgba(20,255,20,1)
* @default rgba(20,255,20,1)
*
* @param Progress Gauge C2
* @parent ------- Colors -------
* @desc The second color for the achievements progress gauge.
* You can use hexadecimal or rgba colors. Default: rgba(100,255,100,1)
* @default rgba(100,255,100,1)
*
* @param Progress Gauge BG
* @parent ------- Colors -------
* @desc The background color for the progress gauge.
* You can use hexadecimal or rgba colors. Default: #202040
* @default #202040
*
* @param ------- Items --------
* @default --------------------
*
* @param Hide Progress
* @parent ------- Items --------
* @type boolean
* @desc If ON, the progress gauge and text will be hidden for all achievements.
* @default false
*
* @param Progress Gauge Height
* @parent ------- Items --------
* @type number
* @min 1
* @max 40
* @desc Define the height of the progress bar.
* @default 24
*
* @param Progress Align
* @parent ------- Items --------
* @type select
* @option Left
* @option Center
* @option Right
* @desc Define the alignment for the progress text.
* @default Center
*
* @param Progress Style
* @parent ------- Items --------
* @type select
* @option Percent
* @option Flat
* @desc Choose between showing the progress in percentage (E.G. 10%) or in flat numbers (E.G. 1/10)
* @default Percent
*
* @param Corner Radius
* @parent ------- Items --------
* @type number
* @min 0
* @max 12
* @desc If this value is bigger than zero, the achievements' corners will be rounded based on this radius.
* @default 8
*
* @param Description Lines
* @parent ------- Items --------
* @type number
* @min 1
* @max 20
* @desc What is the maximun amount of lines to draw the description?
* @default 3
*
* @param Item Height
* @parent ------- Items --------
* @desc Defines the height for each item on this window.
* @default 144
*
*
* @param Border Size
* @parent ------- Items --------
* @desc Defines thickness of the borders around each achievement.
* @default 1
*
*/
//==========================================================================================
// Achievs Info Structure
//==========================================================================================
/*~struct~achievsInfoSets:
*
* @param Enabled
* @type boolean
* @desc If OFF, the info window won't appear when an achievement is selected.
* @default true
*
* @param ------ Position ------
* @default --------------------
*
* @param X
* @parent ------ Position ------
* @desc Define the X position for this window.
* @default 0
*
* @param Y
* @parent ------ Position ------
* @desc Define the Y position for this window.
* @default 0
*
* @param -------- Size --------
* @default --------------------
*
* @param Width
* @parent -------- Size --------
* @desc Define the width for this window.
* @default 100
*
* @param Height
* @parent -------- Size --------
* @desc Define the Height for this window.
* @default 100
*
* @param ------- Texts --------
* @default --------------------
*
* @param Unlocked On
* @parent ------- Texts --------
* @desc Shown on the info window when the selected achievement is
* unlocked. Learn more about it on the Help section.
* @default Unlocked on <date> at <time>
*
* @param Requirements
* @parent ------- Texts --------
* @desc This text is shown above the requirements.
* @default Requirements:
*
* @param Rewards
* @parent ------- Texts --------
* @desc This text is shown above the rewards.
* @default Rewards:
*
* @param None
* @parent ------- Texts --------
* @desc This text appears when there's no requirements/rewards to be shown.
* @default None
*
* @param Collect
* @parent ------- Texts --------
* @desc The text shown on the button to collect the rewards.
* @default COLLECT
*
* @param Collected
* @parent ------- Texts --------
* @desc The text shown on the button when the rewards were already collected.
* @default COLLECTED
*
* @param ------ Collect -------
* @default --------------------
*
* @param Collect X
* @parent ------ Collect -------
* @type number
* @desc The X coordinate for the button to collect the rewards.
* @default 160
*
* @param Collect Y
* @parent ------ Collect -------
* @type number
* @desc The Y coordinate for the button to collect the rewards.
* @default 425
*
* @param Collect Width
* @parent ------ Collect -------
* @type number
* @min 5
* @desc The width for the button to collect the rewards.
* @default 100
*
* @param Collect Height
* @parent ------ Collect -------
* @type number
* @min 5
* @desc The width for the button to collect the rewards.
* @default 25
*
* @param Collect Color
* @parent ------ Collect -------
* @desc The color for the button to collect the rewards.
* @default #43d643
*
* @param Collect Border Size
* @parent ------ Collect -------
* @type number
* @min 0
* @max 20
* @desc The color for the button to collect the rewards.
* @default 1
*
* @param Collect Image
* @parent ------ Collect -------
* @type file
* @dir img/achievements
* @require 1
* @desc This image will be displayed on the "collect" button.
* @default
*
* @param -------- Font --------
* @default --------------------
*
* @param Font Face
* @parent -------- Font --------
* @desc Define the font used on this window.
* @default GameFont
*
* @param Font Size
* @parent -------- Font --------
* @type number
* @min 12
* @max 100
* @desc Define the default font size for this window.
* @default 28
*
* @param ----- Appearence -----
* @default --------------------
*
* @param Opacity
* @parent ----- Appearence -----
* @type number
* @min 0
* @max 255
* @desc Define the opacity of this window.
* @default 255
*
* @param Window Skin
* @parent ----- Appearence -----
* @type file
* @dir img/system
* @require 1
* @desc The image used to draw this window. Notice that this one is
* loaded from img/system, NOT from img/achievements.
*
* @param Scroll Color 1
* @parent ----- Appearence -----
* @desc The color used to draw the scroller on the requirements or
* rewards if necessary (background).
* @default #777777
*
* @param Scroll Color 2
* @parent ----- Appearence -----
* @desc The color used to draw the scroller on the requirements or
* rewards if necessary (scrollable bar).
* @default #353535
*
* @param Text Color
* @parent ----- Appearence -----
* @desc The default color used to draw texts.
* @default #ffffff
*
*/
//==========================================================================================
// Pop Up Structure
//==========================================================================================
/*~struct~popUpSets:
*
* @param Enabled
* @type boolean
* @desc If OFF, the pop up will be disabled.
* @default true
*
* @param Button
* @type boolean
* @desc If ON, the Pop Up will take the player to the achievs menu after
* being click on.
* @default true
*
* @param ------ Position ------
* @default --------------------
*
* @param X
* @parent ------ Position ------
* @desc Define the X position for this window.
* @default Graphics.width - 80
*
* @param Y
* @parent ------ Position ------
* @desc Define the Y position for this window.
* @default 0
*
* @param -------- Size --------
* @default --------------------
*
* @param Width
* @parent -------- Size --------
* @desc Define the width for this window.
* @default 160
*
* @param Height
* @parent -------- Size --------
* @desc Define the Height for this window.
* @default 106
*
* @param ------- Texts --------
* @default --------------------
*
* @param Text
* @parent ------- Texts --------
* @type note
* @desc The text shown on the pop up window, text codes are allowed.
* @default "<center>\\c[1]Unlocked:\n<center>\\c[0]\\{<achievName>\n<center>\\}\\}<PopUpDesc>"
*
* @param -------- Font --------
* @default --------------------
*
* @param Font Face
* @parent -------- Font --------
* @desc Define the font used on this window.
* @default GameFont
*
* @param Font Size
* @parent -------- Font --------
* @type number
* @min 12
* @max 100
* @desc Define the default font size for this window.
* @default 28
*
* @param ----- Appearence -----
* @default --------------------
*
* @param Opacity
* @parent ----- Appearence -----
* @type number
* @min 0
* @max 255
* @desc Define the opacity of this window.
* @default 255
*
* @param ------- Border -------
* @default --------------------
*
* @param Border Size
* @parent ------- Border -------
* @type number
* @min 0
* @max 10
* @desc Define the border's thickness.
* Leave it at zero if you don't want borders.
* @default 1
*
* @param Border Color
* @parent ------- Border -------
* @desc The color for used on pop up's borders.
* You can use hexadecimal or rgba colors.
* @default #ff9900
*
* @param ----- Animation ------
* @default --------------------
*
* @param Fading
* @parent ----- Animation ------
* @type select
* @option None
* @option Fade In
* @option Fade Out
* @option Fade In and Out
* @desc Define the fade effect when the pop up appears/disappears.
* @default Fade In and Out
*
* @param Move In
* @parent ----- Animation ------
* @type select
* @option None
* @option Upwards
* @option Rightwards
* @option Downwards
* @option Leftwards
* @desc Define the pop up's movement the momment it appears.
* @default Leftwards
*
* @param Move Out
* @parent ----- Animation ------
* @type select
* @option None
* @option Upwards
* @option Rightwards
* @option Downwards
* @option Leftwards
* @desc Define the pop up's movement when it disappears.
* @default Rightwards
*
* @param Size In
* @parent ----- Animation ------
* @type select
* @option No size change
* @option Size increase
* @option Size decrease
* @desc Define the pop up's size change when it appears.
* @default No size change
*
* @param Size Out
* @parent ----- Animation ------
* @type select
* @option No size change
* @option Size increase
* @option Size decrease
* @desc Define the pop up's size change when it disappears.
* @default No size change
*
* @param Easing
* @parent ----- Animation ------
* @type select
* @option Quadratic
* @option Cubic
* @option Back
* @option Custom
* @desc Used to make the movement and/or size change smoother.
* @default Back
*
* @param Custom Easing In
* @parent ----- Animation ------
* @type note
* @desc Define a custom formula of easing on pop.
* Read the help section for more info.
* @default
*
* @param Custom Easing Out
* @parent ----- Animation ------
* @type note
* @desc Define a custom formula of easing on hide.
* Read the help section for more info.
* @default
*/
//==========================================================================================
// Sort Option Settings Structure
//==========================================================================================
/*~struct~sortOptSets:
*
* @param Enabled
* @type boolean
* @desc If OFF, the sort option's button will be disabled.
* @default true
*
* @param ------ Position ------
* @default --------------------
*
* @param X
* @parent ------ Position ------
* @desc Define the X position for this window.
* @default 15
*
* @param Y
* @parent ------ Position ------
* @desc Define the Y position for this window.
* @default 25
*
* @param -------- Size --------
* @default --------------------
*
* @param Width
* @parent -------- Size --------
* @desc Define the width for this window.
* @default 120
*
* @param Height
* @parent -------- Size --------
* @desc Define the Height for this window.
* @default 30
*
* @param ------- Texts --------
* @default --------------------
*
* @param Options
* @parent ------- Texts --------
* @type struct<sort>[]
* @desc Use JS to create new options, or just delete the ones you don't want.
* @default ["{\"Symbol\":\"A-z\",\"Script\":\"\\\"main = unlocked.concat(locked);\\\\nmain.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\nmain.push(...secrets);\\\"\"}","{\"Symbol\":\"Locked\",\"Script\":\"\\\"unlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\nlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\nmain = locked.concat(unlocked, secrets);\\\"\"}","{\"Symbol\":\"Unlocked\",\"Script\":\"\\\"unlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\nlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\nmain = unlocked.concat(locked, secrets);\\\"\"}","{\"Symbol\":\"Recent\",\"Script\":\"\\\"unlocked.sort((a, b) => SMO.AM.compareAchievsDates(a, b));\\\\nlocked.sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));\\\\nmain = unlocked.concat(locked, secrets);\\\"\"}"]
*
* @param -------- Font --------
* @default --------------------
*
* @param Font Face
* @parent -------- Font --------
* @desc Define the font used on this window.
* @default GameFont
*
* @param Font Size
* @parent -------- Font --------
* @type number
* @min 12
* @max 100
* @desc Define the default font size for this window.
* @default 18
*
* @param ----- Appearence -----
* @default --------------------
*
* @param Opacity
* @parent ----- Appearence -----
* @type number
* @min 0
* @max 255
* @desc Define the opacity of this window.
* @default 255
*
* @param Border Size
* @parent ----- Appearence -----
* @type number
* @min 0
* @max 10
* @desc Define the border's thickness.
* Leave it at zero if you don't want borders.
* @default 2
*
* @param ------- Colors -------
* @default --------------------
*
* @param Text Color
* @parent ------- Colors -------
* @desc The color for used to draw the sort option's text.
* You can use hexadecimal or rgba colors.
* @default #ffffff
*
* @param Border Color
* @parent ------- Colors -------
* @desc The color for used on sort option's borders.
* You can use hexadecimal or rgba colors.
* @default #ffffff
*
* @param Background Color
* @parent ------- Colors -------
* @desc The color for used on sort option's background.
* You can use hexadecimal or rgba colors.
* @default rgba(0,0,0,0.8)
*
*/
//==========================================================================================
// Sort Option Structure
//==========================================================================================
/*~struct~sort:
* @param Symbol
* @desc This will be the name of this option.
* @default A-z
*
* @param Script
* @type note
* @desc The script called to sort the achievements. Check the @help section for more info.
* @default "main = unlocked.concat(locked);\nmain.sort((a, b) => a._name.localeCompare(b._name, 'en', { sensitivity: 'base' }));"
*
*/
//==========================================================================================
// AutoColor by Image Structure
//==========================================================================================
/*~struct~imageAc:
* @param Symbol
* @desc Images with this symbol on their name will be colored
* following the next parameters.
* @default _1
*
* @param Color
* @desc Choose the color used to draw the texts. You may use
* rgba, hexadecimal colors or text code (only the number).
* @default #00ff00
*
* @param AC Category Name
* @type boolean
* @on YES
* @off NO
* @desc Auto color the category's name on category selection?
* @default true
*
* @param AC Scene Name
* @type boolean
* @on YES
* @off NO
* @desc Auto color the scene name when this category is selected?
* @default true
*
* @param AC Achievs Names
* @type boolean
* @on YES
* @off NO
* @desc Auto color the achievements' names on this category?
* @default true
*
* @param AC Pop Up Desc
* @type boolean
* @on YES
* @off NO
* @desc Auto color the category's name on the pop up?
* @default true
*
* @param AC Pop Up (AchievName)
* @type boolean
* @on YES
* @off NO
* @desc Auto color the achievement's name on the pop up?
* @default true
*
* @param AC Pop Up (Borders)
* @type boolean
* @on YES
* @off NO
* @desc Auto color the pop up's borders?
* @default true
*
*/

var Imported = Imported || {};
var SMO = SMO || {};
SMO.AM = {};
Imported.SMO_Achievements = true;

var $dataAchievsCategories = null; //Categories' data
var $dataAchievements = null; //Achievements' data
var $dataAchievsMenu = null; //Menu settings
SMO.AM.version = 1.04; //Plugin version
SMO.AM.DataDynamic = null; //Achievements' and trophies' states
SMO.AM.globalCategoryName = ''; //Achievements are automatically added to this one
SMO.AM.unlockList = []; //Used to unlock many achievements at once
SMO.AM.currentCategory = { id: 0 }; //Current category on screen
SMO.AM.FrameCount = { lastValue: 0, value: 0 }; //Frame count (used for global mode)
SMO.AM.refreshCounter = 0; // Time between updates
SMO.AM.DefaultAlias = null; //Alias used for rewards and requirements
SMO.AM.requestedImgNames = { busy: false }; //Used to save images names when using the image selector
SMO.AM.buttonsSilentMode = true; //Silences SButtons
SMO.AM.AchievsEditorActions = {}; //Actions made to achievements through the in-game editor
SMO.AM.AchievementBase = { //Base for new achievements
	"Name": "",
	"Category": "",
	"Description": "Kill 10 Slimes.",
	"Visibility": "Visible from start",
	"Background Image": "",
	"Pop Up Image": "",
	"Requirements": "",
	"Rewards": "",
	"Hide Progress": false,
	"Pop Up Desc": "",
	"Locked Icon": "-2",
	"Unlocked Icon": "-2",
	"Secret Icon": "-2"
};
// PARAMETERS FOR THE SPECIAL BUTTONS (SButtons)
var DOUBLE_CLICK_INTERVAL = 24; //Maximun interval between two clicks to create a double click, in frames
//Desings for SButtons
// rect -> rectangle
// round-rect -> rectangle with rounded borders
// circle -> perfect circle
var SBUTTON_DESIGNS = ['rect', 'round-rect', 'circle'];
var SBUTTON_TEXT_FILTERS = ['number', 'letter', 'alphanum']; //Filters for values inside text entries
var SBUTTON_DEFAULT = { //Basic parameters for all SButtons
	x: 0,
	y: 0,
	width: 100,
	height: 100,
	text: '',
	textAlign: 'left',
	textOffset: null, //Array => [x-offset, y-offset]
	textColor: '#ffffff',
	fontSize: 18,
	fontFace: 'GameFont',
	borderSize: 2,
	borderColor: '#ffffff',
	backColor: 'rgba(0,0,0,0)',
	selectorColor: '#7777ff',
	useShadow: true,
	cursorStyle: '',
	img: '', //Background image
	hoverImg: '', //Background "on hover" image
	clickImg: '', //Background "on click" image
	hoverTone: 50,
	disabledTone: -100,
	hideSelect: false, //Borders don't change when this button is selected
	enabled: true, //Button's initial state
	enableMethod: '', //Function called every frame to determine if this button should be enabled/disabled
	onClick: '', //Function called when the user clicks the button
	design: SBUTTON_DESIGNS[0],
	description: ''
};
var SBUTTON_DEFAULT_SELECT = { //Extra parameters for "select" SButtons
	hoverColor: '#9696ff',
	itemColors: null, //array -> [color1, color2]
	scrollColors: null, //array -> [roller, background]
	open: false,
	options: null,
	value: null, //array
	lastValue: '',
	listLimit: 5,
	scrollArrows: true,
	onOptChange: '',
	onOptKeep: '',
	drawIds: false,
	foregroundSelect: false,
	maxSelection: 1
};
var SBUTTON_DEFAULT_TEXT = { //Extra parameters for text entries
	precisionArrows: true,
	cursorStyle: 'text',
	filter: null,
	open: false,
	options: null,
	value: '',
	lastValue: '',
	maxDigits: 0,
	maxLines: 1,
	minValue: 0,
	maxValue: 0,
	allowPaste: true,
	allowSpace: true
};

//===========================================================================================
// Color functions
//===========================================================================================
//Method - rgbToHex
// * Convertion of rgb colors into hexadecimal, returns a string like '#ffffff'
// Number: r -> A number between 0 and 255 representing the color red
// Number: g -> A number between 0 and 255 representing the color green
// Number: b -> A number between 0 and 255 representing the color blue
// Boolean: skipFormat -> true if the color is already on the correct format
SMO.AM.rgbToHex = function(r, g, b, skipFormat) {
	var rgb = [Number(r), Number(g), Number(b)];
	if (!skipFormat) {
		rgb = SMO.AM.formatRgbColor(r, g, b);
	}
	rgb[0] = rgb[0].toString(16).padZero(2);
	rgb[1] = rgb[1].toString(16).padZero(2);
	rgb[2] = rgb[2].toString(16).padZero(2);
	return '#' + rgb[0] + rgb[1] + rgb[2];
};

//Method - formatRgbColor
// * Converts any value into an array of rgb colors like [r, g, b]
// Any: r -> will be formatted into a number between 0 and 255
// Any: g -> will be formatted into a number between 0 and 255
// Any: b -> will be formatted into a number between 0 and 255
SMO.AM.formatRgbColor = function(r, g, b) {
	r = r >= 0 && r <= 255 ? Math.floor(r) : 0;
	g = g >= 0 && r <= 255 ? Math.floor(g) : 0;
	b = b >= 0 && r <= 255 ? Math.floor(b) : 0;
	return [r, g, b];
};

//Method - hexToRgb
// * Convertion of hexadecimal colors into rgb, returns an array like [r, g, b]
// String: color -> An hexadecimal color in the format '#ffffff'
// Boolean: skipFormat -> true if the color is already on the correct format
SMO.AM.hexToRgb = function(color, skipFormat) {
	if (!skipFormat) {
		color = SMO.AM.formatHexColor(color);
	}
	var r = parseInt(color[1] + color[2], 16);
	var g = parseInt(color[3] + color[4], 16);
	var b = parseInt(color[5] + color[6], 16);
	return [r, g, b];
};

//Method - formatHexColor
// * Converts any value into an hexadecimal color formatted like: '#rrggbb'
// Any: color -> this value will be converted to a string and formatted as an hex color: '#rrggbb'
SMO.AM.formatHexColor = function(color) {
	if (!color) return '#000000';
	color = String(color);
	if (color[0] === '#') {
		color = color.substring(0, 7).replace('#', '').toLowerCase();
	} else {
		color = color.substring(0, 6).toLowerCase();
	}
	//Turning chars that are out of range into zeros
	var valid_chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	for (var i = 0; i < color.length; i++) {
		if (!valid_chars.contains(color[i])) {
			color = color.substring(0, i) + '0' + color.substring(i + 1, color.length);
		}
	}
	if (color.length === 6) return '#' + color;
	if (color.length === 3) return '#' + color.replace(/(.)/g, '$1$1'); //'rgb' -> 'rrggbb'
	//Padding with zeros
	while (color.length < 6) {
		color += '0';
	}
	return '#' + color;
};

//===========================================================================================
// Easing functions
//  Adapted from: easings.net
//===========================================================================================
SMO.AM.easeInQuad = function(x) {
	return x * x;
};

SMO.AM.easeOutQuad = function(x) {
	return 1 - (1 - x) * (1 - x);
};

SMO.AM.easeInCubic = function(x) {
	return x * x * x;
};

SMO.AM.easeOutCubic = function(x) {
	return 1 - Math.pow(1 - x, 3);
};

SMO.AM.easeInBack = function(x) {
	const c1 = 1.70158;
	const c3 = c1 + 1;

	return c3 * x * x * x - c1 * x * x;
};

SMO.AM.easeOutBack = function(x) {
	const c1 = 1.70158;
	const c3 = c1 + 1;

	return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

SMO.AM.easeOutQuart = function (x) {
	return 1 - Math.pow(1 - x, 4);
};

//===========================================================================================
// Array prototype
//===========================================================================================
if (!Array.prototype.hasOwnProperty('last')) {
	Object.defineProperty(Array.prototype, 'last', {
		enumerable: false,
		value: function() {
			return this[this.length - 1];
		}
	});
}

if (!Array.prototype.hasOwnProperty('delete')) {
	Object.defineProperty(Array.prototype, 'delete', {
		enumerable: false,
		value: function(value) {
			var index = this.indexOf(value);
			if (index > -1) {
				this.splice(index, 1);
			}
			return this;
		}
	});
}

//===========================================================================================
// Bitmap
//===========================================================================================
//Draws the rectangle with a gradation (you can use "n" colors)
Bitmap.prototype.gradientFillRectS = function(x, y, width, height, colors, vertical) {
	if (Object.prototype.toString.call(colors) !== '[object Array]') return;
	if (colors.length < 2) return;
	var context = this._context;
	var grad;
	if (vertical) {
		grad = context.createLinearGradient(x, y, x, y + height);
	} else {
		grad = context.createLinearGradient(x, y, x + width, y);
	}
	for (var c = 0; c < colors.length; c++) {
		var stop = c / (colors.length - 1);
		grad.addColorStop(stop, colors[c]);
	}
	context.save();
	context.fillStyle = grad;
	context.fillRect(x, y, width, height);
	context.restore();
	this._setDirty();
};

Bitmap.prototype.getContextGradient = function(context, x, y, width, height, colors, vertical) {
	if (!Array.isArray(colors)) return colors;
	var grad = vertical ? context.createLinearGradient(x, y, x, y + height) : context.createLinearGradient(x, y, x + width, y);
	for (var c = 0; c < colors.length; c++) {
		var stop = c / (colors.length - 1);
		grad.addColorStop(stop, colors[c]);
	}
	return grad;
};

//Draws a triangle
// Number: x -> x coordinate for the top left corner
// Number: y -> y coordinate for the top left corner
// Number: base -> the width of the triangle's base
// Number: height -> the height of the triangle
// String: direction -> the side it'll be pointed at ('left', 'right', 'up' or 'down')
// String: color -> Hexadecimal ("#ffffff") or rgba ("rgba(255,255,255,1)")
Bitmap.prototype.drawTriangleS = function(x, y, base, height, direction, color) {
	if (!(base > 0) || !(height > 0)) return;
	var p1, p2, p3;
	switch(direction) {
	case 'left':
		p1 = {x: x, y: y + base / 2};
		p2 = {x: x + height, y: y};
		p3 = {x: x + height, y: y + base};
		break;
	case 'right':
		p1 = {x: x + height, y: y + base / 2};
		p2 = {x: x, y: y};
		p3 = {x: x, y: y + base};
		break;
	case 'up':
		p1 = {x: x + base / 2, y: y};
		p2 = {x: x, y: y + height};
		p3 = {x: x + base, y: y + height};
		break;
	default:
		p1 = {x: x + base / 2, y: y + height};
		p2 = {x: x, y: y};
		p3 = {x: x + base, y: y};
		break;
	}
	color = color || "#ffffff";
	var context = this._context;
	context.save();
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(p1.x, p1.y);
	context.lineTo(p2.x, p2.y);
	context.lineTo(p3.x, p3.y);
	context.fill();
	context.restore();
	this._setDirty();
};

//Draws a rectangle with borders
// Number: x -> x coordinate for the top left corner
// Number: y -> y coordinate for the top left corner
// Number: width -> the rectangle's width
// Number: height -> the rectangle's height
// Number: borderSize -> the thickness for the border
// String: borderColor -> color for the borders
// String: backColor -> color for the background
// String: backImg -> the path for the image used as background (EG: "achievements/Book") 
// Colors may be hexadecimal (EG: "#ffffff") or rgba (EG: "rgba(255,255,255,1)")
Bitmap.prototype.drawBorderedRect = function(x, y, width, height, borderSize, borderColor, backColor, backImg) {
	this.drawRectBorders(x, y, width, height, borderSize, borderColor);
	this.drawRectBackground(x, y, width, height, borderSize, backColor, backImg);
};

Bitmap.prototype.drawRectBorders = function(x, y, width, height, thickness, color, shadow) {
	if (!(thickness > 0)) return;
	var size = Number(thickness);
	var isGradient = Array.isArray(color);
	if (isGradient) {
		var colors = color.clone();
		var vertical = false;
		var index = colors.indexOf('vertical');
		if (index > -1) {
			vertical = true;
			colors.splice(index, 1);
		}
		colors[0] = colors[0] || '#ffffff';
		colors[1] = colors[1] || '#ffffff';
		this.gradientFillRectS(x, y, width, height, colors, vertical);
		this.clearRect(x + size, y + size, width - size * 2, height - size * 2);
	} else {
		color = color || '#ffffff';
		this.fillRect(x, y, width, height, color);
		this.clearRect(x + size, y + size, width - size * 2, height - size * 2);
	}
	if (shadow) {
		let t = thickness;
		this.fillRect(x + width - t, y + t, t, height - t * 2, 'rgba(0,0,0,0.5)');
		this.fillRect(x + t, y + height - t, width - t, t, 'rgba(0,0,0,0.5)');
	}
};

Bitmap.prototype.drawRectBackground = function(x, y, width, height, borderSize, color, img) {
	if (color == null && img == null) return;
	var bds = Number(borderSize) || 0;
	x += bds;
	y += bds;
	width -= bds * 2;
	height -= bds * 2;
	if (img) {
		var index = img.lastIndexOf('/') + 1;
		var filename = img.slice(index, img.length);
		var path = 'img/' + img.slice(0, index);
		var bitmap = ImageManager.loadBitmap(path, filename, 0, true);
		return this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, width, height);
	}

	var isGradient = Array.isArray(color);
	if (isGradient) {
		var colors = color.clone();
		var vertical = false;
		var index = colors.indexOf('vertical');
		if (index > -1) {
			vertical = true;
			colors.splice(index, 1);
		}
		colors[0] = colors[0] || 'rgba(0,0,0,0)';
		colors[1] = colors[1] || 'rgba(0,0,0,0)';
		this.gradientFillRectS(x, y, width, height, colors, vertical);
	} else {
		color = color || 'rgba(0,0,0,0)';
		this.fillRect(x, y, width, height, color);
	}
};

Bitmap.prototype.drawBorderedAndRoundedRect = function(x, y, width, height, radius, borderSize, 
												borderColor, backColor, image) {
	if (!(radius > 0)) {
		return this.drawBorderedRect(x, y, width, height, borderSize, borderColor, backColor, image);
	}
	//Drawing borders
	if (borderSize) {
		this.drawRoundedRect(x, y, width, height, radius, borderColor);
		x += borderSize;
		y += borderSize;
		width -= borderSize * 2;
		height -= borderSize * 2;
		this.clearRoundRect(x, y, width, height, radius);
	}
	//Drawing background
	this.drawRoundedRect(x, y, width, height, radius, backColor, image);
};

Bitmap.prototype.drawRoundedBorders = function(x, y, width, height, radius, thickness, color, shadow) {
	var bitmap = new Bitmap(width, height);
	bitmap.drawRoundedRect(0, 0, width, height, radius, color, null, shadow);
	if (shadow) {
		bitmap.apply3DShadow(x, y, width, height, radius);
	}
	var x2 = x + thickness;
	var y2 = y + thickness;
	var w2 = width - thickness * 2;
	var h2 = height - thickness * 2;
	bitmap.clearRoundRect(x2, y2, w2, h2, radius);
	this.blt(bitmap, 0, 0, width, height, x, y, width, height);
};

// Method: "drawRoundedRect"
// * Draws a rectangle with rounded corners
// Number: x -> x coordinate for the top left corner
// Number: y -> y coordinate for the top left corner
// Number: width -> the rectangle's width
// Number: height -> the rectangle's height
// Number: radius -> the radius of the corners
// String: color -> color for the background
// Colors may be hexadecimal (EG: "#ffffff") or rgba (EG: "rgba(255,255,255,1)")
Bitmap.prototype.drawRoundedRect = function(x, y, width, height, radius, color, image, shadow) {
	if (!(radius > 0)) {
		return this.drawRectBackground(x, y, width, height, 0, color, image);
	}
	if (image) {
		var index = image.lastIndexOf('/') + 1;
		var filename = image.slice(index, image.length);
		var path = 'img/' + image.slice(0, index);
		var source = ImageManager.loadBitmap(path, filename, 0, true);
		return this.drawRoundedImage(source, x, y, width, height, radius);
	}
	var r = radius;
	var d = r * 2;
	//The radius can't be bigger than the width or the height
	if (!(width >= d) || !(height >= d)) return;
	color = color || 'rgba(0,0,0,0.6)';

	var context = this._context;
	var vertical = false;
	if (Array.isArray(color)) { //Gradient
		var colors = color.clone();
		var index = colors.indexOf('vertical');
		if (index > -1) {
			vertical = true;
			colors.splice(index, 1);
		}
		colors[0] = colors[0] || 'rgba(0,0,0,0)';
		colors[1] = colors[1] || 'rgba(0,0,0,0)';
		color = this.getContextGradient(context, x, y, width, height, colors, vertical);
	}

	context.save();
	context.fillStyle = color;
	context.beginPath();
	//Top left corner
	context.moveTo(x, y + r);
	context.arc(x + r, y + r, radius, Math.PI, Math.PI * 3/2, false);
	context.lineTo(x + width - r, y);
	//Top right corner
	context.arc(x + width - r, y + r, radius, Math.PI * 3/2, Math.PI * 2, false);
	context.lineTo(x + width, y + height - r);
	//Bottom right corner
	context.arc(x + width - r, y + height - r, radius, 0, Math.PI * 1/2, false);
	context.lineTo(x - r, y + height);
	//Bottom left corner
	context.arc(x + r, y + height - r, radius, Math.PI * 1/2, Math.PI, false);
	context.lineTo(x, y + r);
	context.fill();
	context.restore();
	this._setDirty();
};

Bitmap.prototype.apply3DShadow = function(x, y, width, height, r) {
	var context = this._context;
	context.fillStyle = 'rgba(0,0,0,0.6)';
	context.beginPath();
	context.moveTo(x + width, y + r);
	context.arc(x + width - r, y + r, r, 0, Math.PI * 7/4, true);
	//Top right corner
	context.moveTo(x + width, y + r);
	context.lineTo(x + width, y + height - r);
	//Bottom right corner
	context.arc(x + width - r, y + height - r, r, 0, Math.PI * 1/2, false);
	context.lineTo(x, y + height);
	//Bottom left corner
	context.arc(x + r, y + height - r, r, Math.PI * 1/2, Math.PI * 3/4, false);
	var fw = Math.sqrt(Math.pow(r, 2)/2); //end of the first arc drawn
	context.lineTo(x + width - r + fw, y + fw);
	context.fill();
	this._setDirty();
};

Bitmap.prototype.clearRoundRect = function(x, y, width, height, radius) {
	var r = radius;
	var d = r * 2;
	var context = this._context;
	context.save();
	context.beginPath();
	context.fillStyle = '#ffffff';
	context.globalCompositeOperation = 'xor';

	//Start drawing
	context.moveTo(x, y + r);
	//Top left corner
	context.arc(x + r, y + r, radius, Math.PI, Math.PI * 3/2, false);
	context.lineTo(x + width - r, y);
	//Top right corner
	context.arc(x + width - r, y + r, radius, Math.PI * 3/2, Math.PI * 2, false);
	context.lineTo(x + width, y + height - r);
	//Bottom right corner
	context.arc(x + width - r, y + height - r, radius, 0, Math.PI * 1/2, false);
	context.lineTo(x - r, y + height);
	//Bottom left corner
	context.arc(x + r, y + height - r, radius, Math.PI * 1/2, Math.PI, false);
	context.lineTo(x, y + r);
	//End drawing
	context.fill();

	context.globalCompositeOperation = 'source-over';
	context.restore();
	this._setDirty();
};

//Method: "drawRoundedImage"
// * Draws an image with rounded corners
// Object: source -> instanceof Bitmap
// Number: x -> x coordinate for the top left corner of the drawing
// Number: y -> y coordinate for the top left corner of the drawing
// Number: width -> the image's final width
// Number: height -> the image's final height
// Number: radius -> the radius of the corners
Bitmap.prototype.drawRoundedImage = function(source, x, y, width, height, radius) {
	//Draw a rounded-rect shape on another bitmap
	var bitmap = new Bitmap(width, height);
	bitmap.drawRoundedRect(0, 0, width, height, radius, '#ff0000');
	//Draw the image inside the drawn shape
	var sw = source.width;
	var sh = source.height;
	var context = bitmap._context;
	context.globalCompositeOperation = 'source-in';
	context.drawImage(source._canvas, 0, 0, sw, sh, 0, 0, width, height);
	context.globalCompositeOperation = 'source-over';
	bitmap._setDirty();
	//Draw the bitmap with the drawn image on this one
	this.blt(bitmap, 0, 0, width, height, x, y, width, height);
};

//Draws a rectangle with specific rounded corners
// Array: rounded -> what corners are rounded? [bool, bool, bool, bool]
// Number: x -> x coordinate for the top left corner
// Number: y -> y coordinate for the top left corner
// Number: width -> the rectangle's width
// Number: height -> the rectangle's height
// Number: radius -> the radius for the borders
// String: color -> color for the background
// Colors may be hexadecimal (EG: "#ffffff") or rgba (EG: "rgba(255,255,255,1)")
Bitmap.prototype.drawRoundedRectB = function(rounded, x, y, width, height, radius, color) {
	if (!Array.isArray(rounded)) {
		return this.drawRoundedRect(x, y, width, height, radius, backColor);
	}
	var r = radius;
	var r1 = rounded[0] ? r : 0; //top left corner
	var r2 = rounded[1] ? r : 0; //top right corner
	var r3 = rounded[2] ? r : 0; //bottom right corner
	var r4 = rounded[3] ? r : 0; //bottom left corner
	var d = r * 2;
	if (!(width > d) || !(height > d)) return;
	color = color || 'rgba(0,0,0,0.6)';
	var context = this._context;
	context.save();
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(x, y + r1);
	if (r1) {
		context.arc(x + r1, y + r1, radius, Math.PI, Math.PI * 3/2, false);
	}
	context.lineTo(x + width - r2, y);
	if (r2) {
		context.arc(x + width - r2, y + r2, radius, Math.PI * 3/2, Math.PI * 2, false);
	}
	context.lineTo(x + width, y + height - r3);
	if (r3) {
		context.arc(x + width - r3, y + height - r3, radius, 0, Math.PI * 1/2, false);
	}
	context.lineTo(x - r4, y + height);
	if (r4) {
		context.arc(x + r4, y + height - r4, radius, Math.PI * 1/2, Math.PI, false);
	}
	context.fill();
	context.restore();
	this._setDirty();
};

//Method: "drawCircumference"
// * Draws a circumference with the given thickness
// Number: x -> x coordinate for the center of the circumference
// Number: y -> y coordinate for the center of the circumference
// Number: radius -> the circumference's radius
// String: color -> the color used to draw it
Bitmap.prototype.drawCircumference = function(x, y, radius, thickness, color) {
	var diameter = radius * 2;
	var bitmap = new Bitmap(diameter, diameter);
	bitmap.drawCircle(radius, radius, radius, color);
	x -= radius;
	y -= radius;
	var r2 = radius - thickness;
	bitmap.clearCircle(radius, radius, r2);
	this.blt(bitmap, 0, 0, diameter, diameter, x, y, diameter, diameter);
};

Bitmap.prototype.drawCircleBackground = function(x, y, radius, color, image) {
	if (!image) return this.drawCircle(x, y, radius, color);
	x -= radius;
	y -= radius;
	var index = image.lastIndexOf('/') + 1;
	var filename = image.slice(index, image.length);
	var path = 'img/' + image.slice(0, index);
	var source = ImageManager.loadBitmap(path, filename, 0, true);
	this.drawCircleImage(source, x, y, radius);
};

Bitmap.prototype.drawCircleImage = function(source, x, y, radius) {
	var diameter = radius * 2;
	//Draw a rounded-rect shape on another bitmap
	var bitmap = new Bitmap(diameter, diameter);
	bitmap.drawCircle(radius, radius, radius, '#ff0000');
	//Draw the image inside the drawn shape
	var sw = source.width;
	var sh = source.height;
	var context = bitmap._context;
	context.globalCompositeOperation = 'source-in';
	context.drawImage(source._canvas, 0, 0, sw, sh, 0, 0, diameter, diameter);
	context.globalCompositeOperation = 'source-over';
	bitmap._setDirty();
	//Draw the bitmap with the drawn image on this one
	this.blt(bitmap, 0, 0, diameter, diameter, x, y, diameter, diameter);
}

Bitmap.prototype.clearCircle = function(x, y, radius) {
	var context = this._context;
	context.save();
	context.beginPath();
	context.fillStyle = '#ff0000';
	context.globalCompositeOperation = 'xor';
	context.arc(x, y, radius, 0, Math.PI * 2, false);
	context.fill();
	context.globalCompositeOperation = 'source-over';
	context.restore();
	this._setDirty();
};

//==========================================================================================
// Plugin Parameters
//==========================================================================================
SMO.AM.parse = function(text) {
	if (!text) return '';
	return JSON.parse(text);
};

SMO.AM.toBool = function(str) {
	return String(str) === 'true' ? true : false;
};

SMO.AM.isAlphaNumericCode = function(charCode) {
	if (this.isNumberCode(charCode)) return true;
	if (this.isLetterCode(charCode)) return true;
	return false;
};

SMO.AM.isNumberCode = function(charCode) {
	return charCode >= 48 && charCode <= 57;
};

SMO.AM.isLetterCode = function(charCode) {
	return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
};

SMO.Params = PluginManager.parameters('SMO_Achievements');
SMO.AM.isGlobalMode = SMO.AM.toBool(SMO.Params['Global Mode']);
SMO.AM.isGlobalRewards = SMO.AM.isGlobalMode ? SMO.AM.toBool(SMO.Params['Global Rewards']) : false;
SMO.AM.isGlobalAutoReset = SMO.AM.isGlobalMode ? SMO.AM.toBool(SMO.Params['Global Auto Reset']) : false;
SMO.AM.isEditorEnabled = SMO.AM.toBool(SMO.Params['Use In-Game Editor']);
SMO.AM.autoRefresh = SMO.AM.toBool(SMO.Params['Auto Refresh']);
SMO.AM.transferRefresh = SMO.AM.toBool(SMO.Params['Refresh After Transfer']);
SMO.AM.updateInterval = Number(SMO.Params['Update Interval']);
SMO.AM.onUnlockScript = SMO.AM.parse(SMO.Params['On Unlock']);
SMO.AM.hideTotally = SMO.AM.toBool(SMO.Params['Hide Totally']);
SMO.AM.secretSign = SMO.Params['Secret Sign'] || '';
SMO.AM.secretDescription = SMO.AM.parse(SMO.Params['Secret Description']);
SMO.AM.unlockedColor = SMO.Params['Unlocked Color'] || '#00ff00';
SMO.AM.useRewards =  SMO.Params['Use Rewards'] ? SMO.AM.toBool(SMO.Params['Use Rewards']) : true;
SMO.AM.isManualReward = SMO.Params['Reward Collect'] === 'Manually' ? true : false;
SMO.AM.imageAutoColors = SMO.AM.parse(SMO.Params['AutoColor by Image']) || [];
SMO.AM.localLoadPopUp = SMO.Params['Local Load Pop Up'] || 'Skip';

if (SMO.AM.isEditorEnabled) {
	DataManager._databaseFiles.push(
		{ name: '$dataAchievements', src: 'AchievsEditor.json' },
		{ name: '$dataAchievsCategories', src: 'AchievsCategories.json' },
		{ name: '$dataAchievsMenu', src: 'AchievsMenu.json' }
	);
}

//------------------------------------------------------------------------------------------
// Getting the images' names

SMO.AM.Images = {
	menu: String(SMO.Params['Menu Background']), //Menu background
	locked: String(SMO.Params['Locked Achievement Img']), //Default locked achievement
	secret: String(SMO.Params['Secret Achievement Img']), //Default secret achievement
	lockedTrophy: String(SMO.Params['Locked Trophy Img']), //Default locked trophy
	all: {} //All images
};

if (SMO.AM.Images.menu) {
	SMO.AM.Images.all[SMO.AM.Images.menu] = true;
}
if (SMO.AM.Images.locked) {
	SMO.AM.Images.all[SMO.AM.Images.locked] = true;
}
if (SMO.AM.Images.secret) {
	SMO.AM.Images.all[SMO.AM.Images.secret] = true;
}
if (SMO.AM.Images.lockedTrophy) {
	SMO.AM.Images.all[SMO.AM.Images.lockedTrophy] = true;
}

//Menu Command
SMO.AM.MenuCommand = {
	enabled: SMO.AM.toBool(SMO.Params['MC Active']),
	name: String(SMO.Params['MC Name']),
	switchId: Number(SMO.Params['MC Show Switch']),
	position: Number(SMO.Params['MC Position'])
};

//Title command
SMO.AM.TitleCommand = {
	enabled: SMO.AM.toBool(SMO.Params['TC Active']),
	name: String(SMO.Params['TC Name']),
	position: Number(SMO.Params['TC Position'])
};

//Default Icons
SMO.AM.Icons = {
	locked: SMO.Params['Locked Icon'] ? Number(SMO.Params['Locked Icon']) : -1,
	unlocked: SMO.Params['Unlocked Icon'] ? Number(SMO.Params['Unlocked Icon']) : -1,
	secret: SMO.Params['Secret Icon'] ? Number(SMO.Params['Secret Icon']) : -1,
	gold: SMO.Params['Gold Icon'] ? Number(SMO.Params['Gold Icon']) : -1,
	recentUnlock: SMO.Params['Recent Unlock'] ? Number(SMO.Params['Recent Unlock']) : -1,
	reward2Collect: SMO.Params['Reward to Collect'] ? Number(SMO.Params['Reward to Collect']) : -1
};

//==========================================================================================
// Other SMO.AM Methods
//==========================================================================================
//Get auto color from an item's (achievement or category) name
SMO.AM.getAutoColorFromItemImage = function(item) {
	var imageName = item.img || item.popUpImage || item.backgroundImage;
	if (!imageName) return {};
	var autoColor;
	for (var i in SMO.AM.imageAutoColors) {
		autoColor = SMO.AM.imageAutoColors[i];
		if (autoColor.symbol && imageName.indexOf(autoColor.symbol) > -1) {
			return autoColor;
		}
	}
	return {};
};

SMO.AM.getAutoColorByImage = function() {
	if (!SMO.AM.imageAutoColors.length) return;
	var autoColor;
	var data = SMO.AM.imageAutoColors;
	SMO.AM.imageAutoColors = [];
	for (var i = 0; i < data.length; i++) {
		autoColor = JSON.parse(data[i]);
		SMO.AM.imageAutoColors[i] = {
			symbol: autoColor.Symbol,
			color: autoColor.Color,
			category: SMO.AM.toBool(autoColor['AC Category Name']),
			scene: SMO.AM.toBool(autoColor['AC Scene Name']),
			achievs: SMO.AM.toBool(autoColor['AC Achievs Names']),
			popUpDesc: SMO.AM.toBool(autoColor['AC Pop Up Desc']),
			popUpAchiev: SMO.AM.toBool(autoColor['AC Pop Up (AchievName)']),
			popUpBorders: SMO.AM.toBool(autoColor['AC Pop Up (Borders)']) 
		};
	}
};

//Get the default alias for each type of reward and category
SMO.AM.getDefaultAlias = function() {
	SMO.AM.DefaultAlias = {
		Reward: {
			'custom(advanced)': 'Custom Reward',
			gold: '<Amount> ' + TextManager.currencyUnit,
			item: '<ItemName> x <Amount>',
			weapon: '<ItemName> x <Amount>',
			armor: '<ItemName> x <Amount>',
			experienceA: '<Amount> ' + TextManager.expA,
			experienceB: '<Amount> ' + TextManager.expA + ' to <ItemName>'
		},
		Requirement: {
			'custom(advanced)': 'Custom <CurrentValue>/<RequiredValue>',
			switch: '<ItemName>',
			variable: '<ItemName> <CurrentValue>/<RequiredValue>',
			item: '<ItemName> <CurrentValue>/<RequiredValue>',
			weapon: '<ItemName> <CurrentValue>/<RequiredValue>',
			armor: '<ItemName> <CurrentValue>/<RequiredValue>',
			'gold gained': TextManager.currencyUnit + ' (Total) <CurrentValue>/<RequiredValue>',
			'gold spent': TextManager.currencyUnit + ' Spent <CurrentValue>/<RequiredValue>',
			gold: TextManager.currencyUnit + ' <CurrentValue>/<RequiredValue>',
			steps: 'Steps <CurrentValue>/<RequiredValue>',
			playtime: 'Playtime <CurrentValue>/<RequiredValue>',
			'save count': 'Save Count <CurrentValue>/<RequiredValue>',
			'battle count': 'Battle Count <CurrentValue>/<RequiredValue>',
			'win count': 'Win Count <CurrentValue>/<RequiredValue>',
			'escape count': 'Escape Count <CurrentValue>/<RequiredValue>',
			'party memberA': '<ItemName> joined the party',
			'party memberB': '<ItemName> left the party',
			'party level': "Party's <ItemName> level <CurrentValue>/<RequiredValue>",
			'party size': 'Party Members <CurrentValue>/<RequiredValue>'
		}
	};
};

//Setup the dynamic data when a new game is started
SMO.AM.onNewGame = function() {
	$gameSystem.setupAchievs();
	if (SceneManager._scene._achievsPopUp) {
		SceneManager._scene._achievsPopUp.clear();
		$gameSystem.achievPopUp = SMO.AM._popUpBackUp;
		SceneManager._scene._achievsPopUp.restore();
	}

	if (!(SceneManager._scene instanceof Scene_Boot) && !SMO.AM.isGlobalMode) {
		SMO.AM.refreshDynamicData();
	}

	if (SMO.AM.isGlobalRewards && !SMO.AM.isManualReward) {
		//Give the player all the unlocked achievements' rewards
		for (var i = 0; i < SMO.AM.DataDynamic.achievs.length; i++) {
			if (SMO.AM.DataDynamic.achievs[i].state > 0) {
				$dataAchievements[i].gainRewards();
			}
		}
	}
	SMO.AM.FrameCount.lastValue = 0;
};

//Get all achievements' data on the Plugin Manager format, just copy-paste the returning
//string on the "Achievements Data" parameter (on the Text tab)
SMO.AM.getAchievsToPluginManager = function() {
	var data = $dataAchievements.map(a => SMO.AM.getAchievToPluginManager(a));
	return JSON.stringify(data);
};

//Get a specific achievement's data on the Plugin Manager format, just select an achievement inside
//the "Achievements Data" parameter, select the Text tab and paste the returning string
SMO.AM.getAchievToPluginManager = function(achievement) {
	var rawData = achievement.rawData();
	if (rawData.Requirements) {
		rawData.Requirements = JSON.stringify(rawData.Requirements.map(function(req) {
			req['Item ID'] = String(req['Item ID']);
			req['Alias Icon'] = String(req['Alias Icon']);
			return JSON.stringify(req);
		}));
	}
	if (rawData.Rewards) {
		rawData.Rewards = JSON.stringify(rawData.Rewards.map(function(rew) {
			rew['Item ID'] = String(rew['Item ID']);
			rew['Amount'] = String(rew['Amount']);
			rew['Alias Icon'] = String(rew['Alias Icon']);
			return JSON.stringify(rew);
		}));
	}
	rawData.Description = JSON.stringify(rawData.Description);
	rawData['Pop Up Desc'] = JSON.stringify(rawData['Pop Up Desc']);
	rawData['Hide Progress'] = String(rawData['Hide Progress']);
	rawData['Locked Icon'] = String(rawData['Locked Icon']);
	rawData['Unlocked Icon'] = String(rawData['Unlocked Icon']);
	rawData['Secret Icon'] = String(rawData['Secret Icon']);
	return JSON.stringify(rawData);
};

SMO.AM.isEditorAllowed = function() {
	return SMO.AM.isEditorEnabled && SMO.AM.isPlaytest() && Utils.isNwjs();
};

SMO.AM.isAchievementsScene = function() {
	var scene = SceneManager._scene;
	return !!scene && (scene instanceof Scene_Achievements);
};

SMO.AM.refreshAchievementsScene = function(easy, unlocking) {
	if (!this.isAchievementsScene()) return;
	var Scene = SceneManager._scene;
	if (easy) {
		if (!unlocking && Scene._trophiesWindow) {
			Scene._trophiesWindow.refreshAchievsProgress();
		}
		return Scene.easyRefresh(unlocking);
	}
	return Scene.fullRefresh();
};

SMO.AM.refreshGoldWindow = function() {
	SMO.AM.refreshWindow('_goldWindow');
};

SMO.AM.refreshItemWindow = function() {
	var windowName = SMO.AM.currentCategory.id ? '_achievementsWindow' : '_categoriesWindow';
	SMO.AM.refreshWindow(windowName);
};

SMO.AM.refreshWindow = function(windowName) {
	var Scene = SceneManager._scene;
	if (!Scene) return;
	if (!Scene[windowName]) return;
	if (!Scene[windowName].refresh) return;
	Scene[windowName].refresh();
};

SMO.AM.lockTrophy = function(trophyId) {
	var Category = $dataAchievsCategories[trophyId-1];
	if (!Category) return false;
	var Trophies = SMO.AM.DataDynamic.trophies;
	if (!Trophies[trophyId-1]) return false;
	Trophies[trophyId-1] = 0;
	SMO.AM.refreshUnlockedTrophies(true);
	return true;
};

SMO.AM.unlockTrophy = function(trophyId) {
	var Category = $dataAchievsCategories[trophyId-1];
	if (!Category) return false;
	var Trophies = SMO.AM.DataDynamic.trophies;
	if (Trophies[trophyId-1]) return false;
	Trophies[trophyId-1] = 1;
	if (Category.Trophy.onUnlock) {
		try {
			eval(Category.Trophy.onUnlock);
		} catch (e) {
			console.error(`Error on trophy's unlock script (${Category.name}).`);
			console.error(e);
		}
	}
	DataManager.saveGlobalAchievements();
	return true;
};

SMO.AM.refreshUnlockedTrophies = function(forceSave) {
	var updated = false;
	var Trophies = SMO.AM.DataDynamic.trophies;
	for (var i = 0; i < $dataAchievsCategories.length; i++) {
		if (Trophies[i]) {
			continue; // This trophy is already unlocked
		}
		let Category = $dataAchievsCategories[i];
		let CategorysAchievs = SMO.AM.getAchievsByCategory(Category.name);
		if (CategorysAchievs.some(a => !a.isUnlocked())) {
			continue; // Some achievement on this category is still locked
		}

		Trophies[i] = 1; //Unlocking Trophy
		if (Category.Trophy.onUnlock) {
			try {
				eval(Category.Trophy.onUnlock);
			} catch (e) {
				console.error(`Error on trophy's unlock script (${Category.name}).`);
				console.error(e);
			}
		}
		updated = true;
	}
	if (updated || forceSave) {
		DataManager.saveGlobalAchievements();
	}
};

SMO.AM.isPlaytest = function() {
	return $gameTemp ? $gameTemp.isPlaytest() : Utils.isOptionValid('test');
};

//---------------------------------------------------------------------------------------
// Time Management

//Get an obj with date info
SMO.AM.getDate = function(time) {
	//The date will be like "Sat Jul 18 2020 10:52:06"
	var date = time ? new Date(time) : new Date();
	var arr = date.toString().split(' ');

	var hours = arr[4].split(':');
	var hour = String(hours[0].padZero(2));
	var hourA = hour;
	var hourB = Math.max(0, Number(hours[0]) - 12);
	hourB = String(hourB).padZero(2);
	var phase = Number(hours[0]) >= 12 ? 'PM' : 'AM';
	var min = String(hours[1].padZero(2));
	var sec = String(hours[2].padZero(2));

	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var day_week = date.getDay();
	var day = String(arr[2].padZero(2));
	var dayA = day;
	var dayB = days[day_week];
	var dayC = arr[0];

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
		'September', 'October', 'November', 'December'];
	var month_id = date.getMonth() + 1;
	var month = String(month_id.padZero(2));
	var monthA = month;
	var monthB = months[month_id];
	var monthC = arr[1];
	var year = arr[3];
	var now = date.getTime();

	var Data = {
		//"ab" stands for "abbreviated"
		hour, //hour (24h)
		hourA, //hour (24h)
		hourB, //hour (AM/PM)
		phase, //AM or PM
		min, //min
		sec, //sec
		day, //day (1 - 31)
		dayA, //day (1 - 31)
		dayB, //day of the week
		dayC, //day of the week (ab)
		month, //month (1 - 12)
		monthA, //month (1 - 12)
		monthB, //month's name
		monthC, //month's name (ab)
		year, //year
		now //date now
	};
	Data.date =  `${day}/${month}/${year}`;
	Data.time = `${hour}:${min}:${sec}`;
	return Data;
};

//Check which of the given achievs was unlocked first (for a sort() function)
SMO.AM.compareAchievsDates = function(achiev1, achiev2) {
	var v1 = achiev1.getUnlockDateNow();
	var v2 = achiev2.getUnlockDateNow();
	if (v1 == null || v2 == null) return 0;
	return v2 - v1;
};

SMO.AM.playtime = function() {
	return SMO.AM.isGlobalMode ? Math.floor(SMO.AM.FrameCount.value / 60) : $gameSystem.playtime();
};

//---------------------------------------------------------------------------------------
// Text Management

SMO.AM.getTextColor = function(n) {;
	var bitmap = new Bitmap(1, 1);
	bitmap = ImageManager.loadSystem('Window');
	var px = 96 + (n % 8) * 12 + 6;
	var py = 144 + Math.floor(n / 8) * 12 + 6;
	return bitmap.getPixel(px, py);
};

//The TextWindow is used to measure texts
SMO.AM.createTextWindow = function() {
	if (this.TextWindow) return;
	this.TextWindow = new Window_Base();
	this.TextWindow.resetFontSettings = function() {};
};

//Get height from a text state
SMO.AM.textStateHeight = function(textState, fontSize, all) {
	this.createTextWindow();
	this.TextWindow.contents.fontSize = fontSize || 28;
	return this.TextWindow.calcTextHeight(textState, all);
};

//Method: SMO.AM.textWidthEx
// * Gets a given text's width
// String: text
// Number: fontSize
// Boolean: easy - Common text => true | Text with text codes => false
// Number: font rate - The rate the font is changed when using the text codes \{ and \}
// Boolean: keepFont - Continue to use the last font size used?
SMO.AM.textWidthEx = function (text, font, easy) {
	if (text == null || text === '') return 0;
	var method, lines, textWidth, line_w;
	SMO.AM.createTextWindow();
	var TW = this.TextWindow;

	text = String(text);
	var fontSize = font.keep ? TW.contents.fontSize : font.size || 28;
	var fontFace = font.face || 'GameFont';
	var fontRate = font.rate || 12;
	var isSingleLine = text.indexOf('\n') === -1;
	TW.contents.fontSize = fontSize;
	TW.contents.fontFace = fontFace;

	if (easy) {
		//There are no text codes
		if (isSingleLine) return Math.ceil(TW.textWidth(text));

		lines = text.split('\n');
		return Math.ceil(lines.reduce(function(a, v) {
			var w = SMO.AM.TextWindow.textWidth(v);
			return w > a ? w : a;
		}, 0));
	}

	//There may be text codes
	TW.makeFontBigger = function() {
		if (this.contents.fontSize <= 96) {
			this.contents.fontSize += fontRate;
		}
	};
	TW.makeFontSmaller = function() {
		if (this.contents.fontSize >= 4) {
			this.contents.fontSize -= fontRate;
		}
	};

	if (isSingleLine) return Math.ceil(TW.textWidthEx(text));

	lines = text.split('\n');
	return Math.ceil(lines.reduce(function(a, v) {
		var w = SMO.AM.TextWindow.textWidthEx(v);
		return w > a ? w : a;
	}, 0));
};

// Fastest way to get a text's width, the font must be monospaced though
SMO.AM.textWidthEasy = function(text, fontSize) {
	var letter_w = fontSize / 2;
	if (text.indexOf('\n') === -1) return Math.ceil(text.length * letter_w);

	var lines = text.split('\n');
	var max_length = Math.max.apply(null, lines.map(line => line.length));
	return Math.ceil(max_length * letter_w);
};

SMO.AM.removeTextCodes = function(text) {
	if (text == null) return '';
	text = String(text);
	text = text.replace(/\\/g, '\x1b');
	text = text.replace(/\x1b\x1b/g, '\\');
	text = text.replace(/\x1bV\[\d+\]/gi, '');
	text = text.replace(/\x1bN\[\d+\]/gi, '');
	text = text.replace(/\x1bP\[\d+\]/gi, '');
	text = text.replace(/\x1bG/gi, '');
	text = text.replace(/\x1bC\[\d+\]/gi, '');
	text = text.replace(/\x1bI\[\d+\]/gi, '');
	text = text.replace(/\x1b{/g, '');
	text = text.replace(/\x1b}/g, '');
	//From YEP_MessageCore
	text = text.replace(/\x1bMSGCORE/g, '');
	text = text.replace(/\x1bFS/g, '');
	text = text.replace(/\x1bFN/g, '');
	text = text.replace(/\x1bOC/g, '');
	text = text.replace(/\x1bOW/g, '');
	return text;
};

SMO.AM.wrapText = function(text, maxWidth, font, easy) {
	if (text == null) return '';
	if (!(maxWidth > 0)) return text;
	var space = ' ';
	var space_w = SMO.AM.textWidthEx(space, font, true); //Space's width
	var one_line_txt = String(text).replace(/\s?\n/g, space); //Text without line breaks
	var words = one_line_txt.split(space);
	var line_w = 0; //Line's width
	var safe = 1000; //Loop's limit (1000 words)
	text = '';

	//Looping through all words on the given text
	for (var w = 0, l = 0; w < words.length; w++) {
		var word = words[w] || ' ';
		var word_w = SMO.AM.textWidthEx(word, font, easy);
		var isFirstWord = line_w === 0;
		var space_w2 = isFirstWord ? 0 : space_w;
		//Checking if the current word will fit on this line
		if (maxWidth >= (line_w + space_w2 + word_w) || isFirstWord) {
			//It fits or it's the first word on this line
			text = isFirstWord ? text + word : text + space + word;
			line_w += space_w2 + word_w;
		} else {
			//The word didn't fit on this line -> add it to the next one
			text = text + '\n' + word;
			line_w = word_w;
		}
		if (--safe < 0) {
			console.warn('Wrap text safe activated. 1000 word limit reached.');
			break;
		}
	}
	return text;
};

//---------------------------------------------------------------------------------------
// Compatibility to translation/localization plugins

SMO.AM.translate = function(text) {
	if (text == null) return '';
	text = String(text);

	//If there's no translation plugin, just return the text
	if (!SMO.AM.translationEngine.on) return text;

	//Translate using the plugin's method and return the resulting text
	return SMO.AM.translationEngine.translate(text);
};

//Get a specific translation plugin and add it's method to SMO.AM.translationEngine
SMO.AM.initTranslationEngine = function() {
	var isIavra = false;
	try {
		IAVRA.I18N.localize;
		isIavra = true;
	} catch (e) {};

	//Looking for "Iavra Localization - Core.js"
	if (isIavra) {
		SMO.AM.translationEngine = {
			author: 'IAVRA',
			translate: function(text) {
				return IAVRA.I18N.localize(text);
			},
			on: true
		};

	//Looking for "DKTools_Localization.js"
	} else if (Imported['DKTools_Localization']) {
		SMO.AM.translationEngine = {
			author: 'DK',
			translate: function(text) {
				return DKTools.Localization.getText(text);
			},
			on: true
		};

	//Looking for "SRD_TranslationEngine.js"
	} else if (Imported["SumRndmDde Translation Engine"]) {
		SMO.AM.translationEngine = {
			author: 'SRD',
			translate: function(text) {
				return SRD.TranslationEngine.translate(text);
			},
			on: true
		};

	//There's no translation plugin
	} else if (SMO.AM.translationEngine == null) {
		SMO.AM.translationEngine = {
			on: false
		}
	}
};

//-----------------------------------------------------------------------------------------
// Achievements' Commands

//Method: "showAchievements"
// * Opens the achievements' scene (the achievements' menu)
// String: categoryName -> will open the menu menu on a specifc category

SMO.AM.showAchievements = function(categoryName) {
	if (categoryName != null) {
		var category = $dataAchievsCategories.find(c => c.name === categoryName);
		SMO.AM.currentCategory = category || { id: 0 };
	}
	SceneManager.push(Scene_Achievements);
};

//Method: "refreshAchievsAfterTransfer"
// * Calls the method "refreshAchievements" right after transfering

SMO.AM.refreshAchievsAfterTransfer = function() {
	if (!SMO.AM.transferRefresh) return;
	SMO.AM.refreshCounter = 0;
	SMO.AM.refreshAchievements();
};

//Method: "refreshAchievements"
// * Tries to unlock all the locked achievements

SMO.AM.refreshAchievements = function() {
	var scene = SceneManager._scene;

	if ((scene instanceof Scene_Map) && $gamePlayer._transferring) {
		return;
	}
	//creating the game system obj
	if (!$gameSystem.achievs) {
		$gameSystem.setupAchievs();
	}
	//check locked achievements
	for (var d = 0; d < SMO.AM.DataDynamic.achievs.length; d++) {
		if (SMO.AM.DataDynamic.achievs[d].state < 1) {
			SMO.AM.tryUnlockingAchievement(d+1);
		}
	}
	var isUnlock = SMO.AM.unlockList.length > 0;
	if (isUnlock) {
		SMO.AM.unlockList.forEach(function(a) {
			SMO.AM.unlockAchievement(a);
		});
		SMO.AM.refreshGoldWindow();
		SMO.AM.refreshUnlockedTrophies(true);
		SMO.AM.refreshItemWindow();
	}
	SMO.AM.unlockList = [];
	SMO.AM.refreshAchievementsScene(true, isUnlock);
};

//Method: "tryUnlockingAchievement"
// * Adds an achievement to the unlock list if it's requirements are met
// Number: id

SMO.AM.tryUnlockingAchievement = function(id) {
	var Achievement = $dataAchievements[id - 1];
	if (!Achievement) return false;
	if (Achievement.isUnlockEdible()) {
		SMO.AM.unlockList.push(id);
		return true;
	}
	return false;
};

//Method: "getAchievementId"
//  * Gets the real ID of an achievement based on a candidade
//  Number or String: candidate

SMO.AM.getAchievementId = function(candidate) {
	var isNumber = !isNaN(candidate);
	if (isNumber) return Number(candidate);
	return this.getAchievementIdByName(candidate);
};

//Method: "getAchievementIdByName"
//  * Gets the ID of an achievement based on it's name
//  String: name

SMO.AM.getAchievementIdByName = function(name) {
	var achievement = $dataAchievements.find(a => a._name === name);
	return achievement ? achievement.id : 0;
};

//Method: "unlockAchievement"
//  * Forces an achievement to unlock
//  Number or String: id -> may be the achievement's ID or name

SMO.AM.unlockAchievement = function(id) {
	id = this.getAchievementId(id);
	if (!id) return;
	var Achievement = $dataAchievements[id-1];
	if (Achievement.isUnlocked()) return;

	this.DataDynamic.achievs[id-1].state = 1;
	this.DataDynamic.achievs[id-1].date = SMO.AM.getDate();
	this.addToPopUpQueue(id);
	if (!SMO.AM.isManualReward) {
		Achievement.gainRewards();
	}
	if (this.onUnlockScript) {
		try {
			eval(this.onUnlockScript);
		} catch (e) {
			this.onUnlockScript = '';
			console.error("There's an error on your 'On Unlock' script.")
			console.error(e)
		}
	}
};

SMO.AM.addToPopUpQueue = function(id) {
	if (!id) return;
	if (!$dataAchievsMenu.PopUp.enabled) return;
	$gameSystem.achievPopUp.queue.push(id);
};

//Method: "getAchievsByCategory"
//  * Returns an array with all the achievements on a specific category
//  String: name -> The category's name

SMO.AM.getAchievsByCategory = function(name) {
	if (typeof name !== 'string') return [];
	if ($dataAchievsCategories.length === 0) return [];
	return $dataAchievements.filter(function(achiev) {
		return achiev && achiev.categories && achiev.categories.contains(name);
	});
};

SMO.AM.getNonHiddenAchievsByCategory = function(name) {
	if (typeof name !== 'string') return [];
	if ($dataAchievsCategories.length === 0) return [];
	return $dataAchievements.filter(function(achiev) {
		return achiev && achiev.categories.contains(name) && !achiev.isHidden();
	});
};

//Method: "preloadCustomWindowSkins"
//  * Preloads window skins specified by the user
//  * Window skins are loaded from img/system

SMO.AM.preloadCustomWindowSkins = function() {
	var images = SMO.AM.getCustomWindowSkins();
	for (var i = 0; i < images.length; i++) {
		ImageManager.reserveSystem(images[i]);
	}
};

SMO.AM.getCustomWindowSkins = function() {
	var skins = [];
	for (var m in $dataAchievsMenu) {
		let skin = $dataAchievsMenu[m].windowSkin;
		let index = skins.indexOf(skin);
		if (skin && index < 0) {
			skins.push(skin);
		}
	}
	return skins;
};

//==========================================================================================
// Dynamic Data
//  Saves the IDs of locked, unlocked, recentUnlock and unlockDate of achievs and trophies
//  On local mode it points to $gameSystem, as it saves these IDs using the same keys
//==========================================================================================
SMO.AM.DataDynamic = {
	global_achievs: [],
	global_trophies: []
};

Object.defineProperty(SMO.AM.DataDynamic, 'achievs', {
	get: function() {
		return SMO.AM.isGlobalMode ? this.global_achievs : $gameSystem.achievs;
	},
	set: function(value) {
		if (!Array.isArray(value)) return;
		if (SMO.AM.isGlobalMode) {
			this.global_achievs = value;
		} else {
			$gameSystem.achievs = value;
		}
	},
	configurable: true
});

Object.defineProperty(SMO.AM.DataDynamic, 'trophies', {
	get: function() {
		return SMO.AM.isGlobalMode ? this.global_trophies : $gameSystem.trophies;
	},
	set: function(value) {
		if (!Array.isArray(value)) return;
		if (SMO.AM.isGlobalMode) {
			this.global_trophies = value;
		} else {
			$gameSystem.trophies = value;
		}
	},
	configurable: true
});

// Reset the dynamic data for achievements and trophies
SMO.AM.resetDynamicData = function() {
	SMO.AM.DataDynamic.achievs = $dataAchievements.map(a => ({ state:0, date:0 }));
	SMO.AM.DataDynamic.trophies = $dataAchievsCategories.map(c => 0);

	DataManager.saveGlobalAchievements();
	SMO.AM.refreshAchievementsScene();
};

// Update the dynamic data, adding new data and removing the deleted ones
SMO.AM.refreshDynamicData = function() {
	if (SMO.AM.DataDynamic.achievs.hasOwnProperty('unlockDate')) {
		SMO.AM.convertOldDynamicData();
	}
	var updatedA = SMO.AM.refreshAchievsDynamicData();
	var updatedB = SMO.AM.refreshTrophiesDynamicData();
	if (SceneManager._scene && !(SceneManager._scene instanceof Scene_Boot)) {
		SMO.AM.refreshUnlockedTrophies(updatedA || updatedB);
	}
};

SMO.AM.convertOldDynamicData = function() {
	//Achievements' dynamic data
	var oldAchievsData = SMO.AM.DataDynamic.achievs;
	var newAchievsData = [];
	oldAchievsData.locked.forEach(function(id) {
		var vis = $dataAchievements[id-1] ? $dataAchievements[id-1].visibility : 0;
		newAchievsData[id-1] = {
			state: vis === 'hidden' ? -2 : vis === 'secret' ? -1 : 0,
			date: 0
		};
	});
	oldAchievsData.unlocked.forEach(function(id, index) {
		newAchievsData[id-1] = {
			state: SMO.AM.DataDynamic.achievs.recentUnlock.contains(id) ? 4 : 3,
			date: SMO.AM.DataDynamic.achievs.unlockDate[index]
		};
	});
	SMO.AM.DataDynamic.achievs = newAchievsData;
	//Trophies' dynamic data
	var oldTrophiesData = SMO.AM.DataDynamic.trophies;
	var newTrophiesData = [];
	oldTrophiesData.locked.forEach(function(id) {
		newTrophiesData[id-1] = 0;
	});
	oldTrophiesData.unlocked.forEach(function(id) {
		newTrophiesData[id-1] = 1;
	});
	SMO.AM.DataDynamic.trophies = newTrophiesData;
	delete SMO.AM.DataDynamic.achievs.locked;
	delete SMO.AM.DataDynamic.achievs.unlocked;
	delete SMO.AM.DataDynamic.achievs.unlockDate;
	delete SMO.AM.DataDynamic.achievs.recentUnlock;
};

// Update the achievements dynamic data
SMO.AM.refreshAchievsDynamicData = function() {
	var data = SMO.AM.DataDynamic.achievs;
	var oldLength = data.length;
	var dif = oldLength - $dataAchievements.length;
	if (!dif) return false;
	if (dif < 0) {
		// Achievements were added
		for (var d = oldLength; d < $dataAchievements.length; d++) {
			var vis = $dataAchievements[d].visibility;
			data.push({
				state: vis === 'hidden' ? -2 : vis === 'secret' ? -1 : 0,
				date: 0
			});
		}
	} else {
		// Achievements were removed
		data.splice($dataAchievements.length);
	}
	return true;
};

// Update the trophies dynamic data
SMO.AM.refreshTrophiesDynamicData = function() {
	var data = SMO.AM.DataDynamic.trophies;
	var oldLength = data.length;
	var dif = oldLength - $dataAchievsCategories.length;
	if (!dif) return false;
	if (dif < 0) {
		// Categories were added
		for (var d = oldLength; d < $dataAchievsCategories.length; d++) {
			data.push(0);
		}
	} else {
		// Categories were removed
		data.splice($dataAchievsCategories.length);
	}
	return true;
};

//==========================================================================================
// Data Manager
//  Manages the editor's data (achievements, categories and menu - saved on /data)
//  Manages the global achievements' data (saved at /save/achievs.rpgsave)
//==========================================================================================
//------------------------------------------------------------------------------------------
// Creating editor's necessary files (only on Node.js)

DataManager.createAchievsEditorFiles = function() {
	if (!SMO.AM.isEditorEnabled) return false;
	var files = ['AchievsEditor.json', 'AchievsCategories.json', 'AchievsMenu.json'];
	var initialData = [
		'NoXSAA==',
		'[]',
		'1'
	];
	var filepath = '';
	var fs = require('fs');
	var dirpath = StorageManager.dataDirectoryPath();
	if (!fs.existsSync(dirpath)) {
		fs.mkdirSync(dirpath);
	}
	for (var i = 0; i < files.length; i++) {
		filepath = dirpath + files[i];
		if (!fs.existsSync(filepath)) {
			fs.writeFileSync(filepath, initialData[i]);
		}
	}
	return true;
};

//========================================
// Global Achievements' Data

DataManager.saveGlobalAchievements = function() {
	if (!SMO.AM.isGlobalMode) return false;
	try {
		var savefileId = 'achievs';
		StorageManager.backup(savefileId);
		if (this.saveAchievsWithoutRescue()) {
			StorageManager.cleanBackup(savefileId);
			return true;
		}
	} catch (e) {
		console.error(e);
		try {
			StorageManager.remove(savefileId);
			StorageManager.restoreBackup(savefileId);
		} catch (e2) {
			console.error(e2);
		}
		return false;
	}
};

DataManager.saveAchievsWithoutRescue = function() {
	var data = {
		trophies: SMO.AM.DataDynamic.trophies
	};
	data.achievs = SMO.AM.DataDynamic.achievs.map(function(a) {
		return {
			state: a.state,
			date: a.date ? a.date.now : 0
		};
	});
	var json = JsonEx.stringify(data);
	if (json.length >= 200000) {
		console.warn('Save data too big!');
	}
	StorageManager.save('achievs', json);
	return true;
};

DataManager.loadGlobalAchievements = function() {
	if (!SMO.AM.isGlobalMode) return;
	try {
		return this.loadAchievsWithoutRescue();
	} catch (e) {
		console.error(e);
		return false;
	}
};

DataManager.loadAchievsWithoutRescue = function() {
	if (!StorageManager.exists('achievs')) {
		if (!this.importOldGlobalAchievs()) {
			SMO.AM.refreshDynamicData();
			//Convert Data.now into my date obj
			SMO.AM.DataDynamic.achievs.forEach(function(a) {
				a.date = a.date ? SMO.AM.getDate(a.date) : 0;
			});
			this.saveGlobalAchievements();
		}
		if (SMO.AM.isGlobalAutoReset && SMO.AM.isPlaytest()) {
			SMO.AM.resetDynamicData();
		}
		return;
	}

	if (SMO.AM.isGlobalAutoReset && SMO.AM.isPlaytest()) {
		SMO.AM.resetDynamicData();
	} else {
		var json = StorageManager.load('achievs');
		this.setDynamicData(JsonEx.parse(json));
		//Convert Data.now into my date obj
		SMO.AM.DataDynamic.achievs.forEach(function(a) {
			a.date = a.date ? SMO.AM.getDate(a.date) : 0;
		});
	}
};

DataManager.setDynamicData = function(data) {
	if (Array.isArray(data.achievs)) {
		SMO.AM.DataDynamic.achievs = data.achievs;
		SMO.AM.DataDynamic.trophies = data.trophies;
	} else {
		for (var d in data) {
			for (var a in data[d]) {
				if (SMO.AM.DataDynamic[d] == null) {
					SMO.AM.DataDynamic[d] = {};
				}
				SMO.AM.DataDynamic[d][a] = data[d][a];
			}
		}
	}
	SMO.AM.refreshDynamicData();
};

DataManager.importOldGlobalAchievs = function() {
	if (!StorageManager.isLocalMode()) return false;
	var fs = require('fs');
	var path = DataManager.oldGlobalAchievsPath();
	if (!fs.existsSync(path)) return false;

	var request = new XMLHttpRequest();
	request.open('GET', path);
	request.overrideMimeType('application/json');

	request.onload = function() {
		if (request.status < 400 && request.responseText) {
			var text = request.responseText;
			text = text.replace('S', '');
			text = atob(text);
			DataManager.setDynamicData(JSON.parse(text));
			fs.unlinkSync(path); //deleting old file
		}
	};
	request.send();
	return true;
};

//========================================
// Editor's Menu Data

DataManager.saveMenuFromEditor = function() {
	if (!SMO.AM.isEditorEnabled) return false;
	var fs = require('fs');
	var dirPath = StorageManager.dataDirectoryPath();
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
	}
	if (!SMO.AM.translationEngine.on) {
		$dataAchievsMenu.PopUp.text = JSON.stringify($dataAchievsMenu.PopUp.text);
	}
	var filePath = dirPath + 'AchievsMenu.json';
	var data = JSON.stringify($dataAchievsMenu, null, '\t');
	fs.writeFileSync(filePath, data);
	if (!SMO.AM.translationEngine.on) {
		$dataAchievsMenu.PopUp.text = JSON.parse($dataAchievsMenu.PopUp.text);
	}
	return true;
};

//Check changes on the menu settings' properties
DataManager.refreshAchievsMenuData = function(data) {
	var customData = $dataAchievsMenu; // Data loaded from the .json file
	var defaultData = data; // Data loaded from the plugin's parameters
	var background = customData.MenuImage == null ? SMO.AM.Images.menu : customData.MenuImage;
	if (customData.version >= defaultData.version) return;

	//Looking for new properties to add
	for (var i in defaultData) {
		for (var j in defaultData[i]) {
			if (customData[i] == null) {
				customData[i] = {};
				customData[i][j] = defaultData[i][j];
				continue;
			}
			if (customData[i][j] == null) {
				customData[i][j] = defaultData[i][j];
			}
		}
	}

	//Looking for old unused properties to delete
	for (i in customData) {
		if (defaultData[i] == null) {
			delete customData[i];
			continue;
		}

		for (j in customData[i]) {
			if (defaultData[i][j] == null) {
				delete customData[i][j];
			}
		}
	}
	customData.version = defaultData.version;
	customData.MenuImage = background;
	this.saveMenuFromEditor();
	return true;
};

//========================================
// Editor's Achievements Data

DataManager.saveAchievsFromEditor = function() {
	if (!SMO.AM.isEditorEnabled) return false;
	var fs = require('fs');
	var dirPath = StorageManager.dataDirectoryPath();
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
	}
	var filePath = dirPath + 'AchievsEditor.json';
	var compressed = LZString.compressToBase64(this.getAchievsDataToSave());
	fs.writeFileSync(filePath, compressed);
	return true;
};

DataManager.getAchievsDataToSave = function() {
	var data = $dataAchievements.map(a => a.rawData());
	return JSON.stringify(data);
};

//========================================
// Editor's Categories Data

DataManager.saveCategoriesFromEditor = function() {
	if (!SMO.AM.isEditorEnabled) return false;
	var fs = require('fs');
	var dirPath = StorageManager.dataDirectoryPath();
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
	}
	var filePath = dirPath + 'AchievsCategories.json';
	fs.writeFileSync(filePath, this.getCategsDataToSave());
	return true;
};

DataManager.getCategsDataToSave = function() {
	var category, categoryData;
	var data = [];
	for (var a = 0; a < $dataAchievsCategories.length; a++) {
		category = $dataAchievsCategories[a];
		data.push({
			id: category.id,
			img: category.img,
			menuImg: category.menuImg,
			lockedAchievImg: category.lockedAchievImg,
			secretAchievImg: category.secretAchievImg,
			name: category.name,
			sceneName: category.sceneName,
			globalCategory: category.globalCategory,
			autoColor: category.autoColor,
			Trophy: {
				id: category.Trophy.id,
				img: category.Trophy.img,
				lockedImg: category.Trophy.lockedImg,
				description: category.Trophy.description,
				hidden: category.Trophy.hidden,
				onUnlock: category.Trophy.onUnlock
			}
		});
	}
	return JSON.stringify(data, null, '\t');
};

// The only property from the date object necessary to save is the date.now, this will
// reduce the saved file's size
SMO.AM._DataManager_saveGameWithoutRescue = DataManager.saveGameWithoutRescue;
DataManager.saveGameWithoutRescue = function(savefileId) {
	if (!SMO.AM.isGlobalMode) {
		// Convert date into date.now
		SMO.AM.DataDynamic.achievs.forEach(function(a) {
			a.date = a.date ? a.date.now : 0;
		});
		// Save contents
		var result = SMO.AM._DataManager_saveGameWithoutRescue.call(this, savefileId);
		// Convert date.now back into my date obj
		SMO.AM.DataDynamic.achievs.forEach(function(a) {
			a.date = a.date ? SMO.AM.getDate(a.date) : 0;
		});
		return result;
	}
	return SMO.AM._DataManager_saveGameWithoutRescue.call(this, savefileId);
};

SMO.AM._DataManager_loadDataFile = DataManager.loadDataFile;
DataManager.loadDataFile = function(name, src) {
	if (name === '$dataAchievsCategories' || name === '$dataAchievsMenu' || name === '$dataAchievements') {
		var xhr = new XMLHttpRequest();
		var url = 'data/' + src;
		xhr.open('GET', url);
		xhr.overrideMimeType('application/json');
		xhr.onload = function() {
			if (xhr.status < 400) {
				var text = xhr.responseText;
				if (text) {
					text = name === '$dataAchievements' ? LZString.decompressFromBase64(text) : text;
					window[name] = JSON.parse(text);
				} else if (name === '$dataAchievsMenu') {
					$dataAchievsMenu = 1;
				} else {
					window[name] = [];
				}
			}
		};
		xhr.onerror = this._mapLoader || function() {
			DataManager._errorUrl = DataManager._errorUrl || url;
		};
		xhr.send();
	} else {
		SMO.AM._DataManager_loadDataFile.call(this, name, src);
	};
};

DataManager.loadAchievements = function() {
	SMO.AM.initTranslationEngine();
	this.getAchievsCategsData();
	this.getAchievsData();
	this.getAchievsMenuData();
	SMO.AM.getAutoColorByImage();
	SMO.AM.getDefaultAlias();
	DataManager.loadGlobalAchievements();
	SMO.AM.preloadCustomWindowSkins();
};

DataManager.getAchievsCategsData = function() {
	var needSave = false;
	if ($dataAchievsCategories && $dataAchievsCategories.length) {
		$dataAchievsCategories.forEach(function(category) {
			category.Trophy.isUnlocked = function() {
				return SMO.AM.DataDynamic.trophies[this.id-1];
			};
			category.Trophy.imageName = function() {
				return this.isUnlocked() ? this.img : this.lockedImg || SMO.AM.Images.lockedTrophy;
			};
			if (category.globalCategory && !SMO.AM.globalCategoryName) {
				SMO.AM.globalCategoryName = category.name;
			}
		});
		return;
	}
	if ($dataAchievsCategories) {
		needSave = true;
	} else {
		$dataAchievsCategories = [];
	}

	var Categories = SMO.AM.parse(SMO.Params['Categories And Trophies']) || [];
	for (var c = 0; c < Categories.length; c++) {
		var data = JSON.parse(Categories[c]);
		$dataAchievsCategories.push({
			id: c + 1,
			img: data['Category Background'] || '',
			menuImg: data['New Menu Background'] || '',
			lockedAchievImg: data['Locked Achiev Image'] || '',
			secretAchievImg: data['Secret Achiev Image'] || '',
			name: String(data['Category Name']),
			sceneName: data['New Scene Name'] || '',
			globalCategory: SMO.AM.toBool(data['Global Category']),
			autoColor: null,
			Trophy: {
				id: c + 1,
				img: data['Image'] || data['Trophy Image'] || '',
				lockedImg: data['Locked Trophy Image'] || '',
				description: SMO.AM.parse(data['Trophy Description']),
				hidden: SMO.AM.toBool(data['Hide Trophy']),
				onUnlock: SMO.AM.parse(data['On Unlock']),
				isUnlocked: function() {
					return SMO.AM.DataDynamic.trophies[this.id-1];
				},
				imageName: function() {
					return this.isUnlocked() ? this.img : this.lockedImg || SMO.AM.Images.lockedTrophy;
				}
			}
		});
		var Category = $dataAchievsCategories[c];
		if (data['Auto Color']) {
			var autoColor = JSON.parse(data['Auto Color']);
			Category.autoColor = {
				color: autoColor.Color,
				category: SMO.AM.toBool(autoColor['AC Category Name']),
				scene: SMO.AM.toBool(autoColor['AC Scene Name']),
				achievs: SMO.AM.toBool(autoColor['AC Achievs Names']),
				popUpDesc: SMO.AM.toBool(autoColor['AC Pop Up Desc']),
				popUpAchiev: SMO.AM.toBool(autoColor['AC Pop Up (AchievName)']),
				popUpBorders: SMO.AM.toBool(autoColor['AC Pop Up (Borders)'])
			};
		}
		if (Category.globalCategory && !SMO.AM.globalCategoryName) {
			SMO.AM.globalCategoryName = Category.name;
		}
		var Images = [
			Category.img,
			Category.menuImg,
			Category.lockedAchievImg,
			Category.secretAchievImg,
			Category.Trophy.img,
			Category.Trophy.lockedImg
		];
		for (var i = 0; i < Images.length; i++) {
			if (Images[i]) {
				SMO.AM.Images.all[Images[i]] = true;
			}
		}
	};
	if (needSave && $dataAchievsCategories.length) {
		this.saveCategoriesFromEditor();
	}
};

//Read the achievement's data from the plugin's parameters or the editor's file
DataManager.getAchievsData = function() {
	var Achievements = [];
	var needSave = false;
	if ($dataAchievements && $dataAchievements.length) {
		for (var i = 0; i < $dataAchievements.length; i++) {
			Achievements.push(new Achievement_Data(i+1, $dataAchievements[i]));
		}
	} else {
		if ($dataAchievements) {
			needSave = true;
			$dataAchievements = null;
		}
		var data = JSON.parse(SMO.Params['Achievements Data']);
		for (var i = 0, id = 0; i < data.length; i++) {
			if (data[i][0] === '{') { //If the first index is != '{' this is a custom line
				Achievements.push(new Achievement_Data(++id, JSON.parse(data[i])));
			}
		}
	}
	$dataAchievements = Achievements;
	if (needSave) {
		this.saveAchievsFromEditor();
	}
};

DataManager.getAchievsMenuData = function() {
	//Formatting the properties' names (EG: "Font Size" becomes "fontSize")
	// String: prop -> the property's name
	// Boolean: lowerCase -> should the first letter be lower case?
	function FormatProp(prop, lowerCase) {
		//Removing empty spaces
		var p = prop.replace(/\s/g, '');
		//Turning the first letter lower case
		p = lowerCase ? p.replace(prop[0], prop[0].toLowerCase()) : p;
		return p;
	};

	var numbersTypes = ['opacity', 'fontSize']; //number type parameters
	var Menu = {};
	var MenuSettings = JSON.parse(SMO.Params['Menu Settings']);
	for (var i in MenuSettings) {
		var i2 = FormatProp(i);
		Menu[i2] = {};
		var obj = JSON.parse(MenuSettings[i]);
		for (var j in obj) {
			//Checking if this line should be ignored
			if (j[0] === '-') {
				continue;
			}

			var j2 = FormatProp(j, true);
			var value = numbersTypes.contains(j2) ? Number(obj[j]) : obj[j];
			Menu[i2][j2] = value;
		}
	}

	//Categories
	Menu.Categories.drawRectangle = SMO.AM.toBool(Menu.Categories.drawRectangle);
	Menu.Categories.columns = Number(Menu.Categories.columns) || 1;
	Menu.Categories.textAlign = ['Left', 'Center', 'Right'].contains(Menu.Categories.textAlign) ?
		Menu.Categories.textAlign.toLowerCase() : 'center';

	//Achievements
	Menu.Achievements.hideProgress = SMO.AM.toBool(Menu.Achievements.hideProgress);
	Menu.Achievements.borderSize = Number(Menu.Achievements.borderSize) || 0;
	Menu.Achievements.progressGaugeHeight = Number(Menu.Achievements.progressGaugeHeight) || 24;
	Menu.Achievements.progressAlign = Menu.Achievements.progressAlign || 'Center';
	Menu.Achievements.progressAlign = Menu.Achievements.progressAlign.toLowerCase();
	Menu.Achievements.cornerRadius = Number(Menu.Achievements.cornerRadius) || 0;
	Menu.Achievements.descriptionLines = Number(Menu.Achievements.descriptionLines) || 1;

	//Trophies
	Menu.Trophies.type = Menu.Trophies.type ? Menu.Trophies.type.toLowerCase() : 'trophies';
	Menu.Trophies.selector = Menu.Trophies.selector === 'Grow' ? 'grow' : 'cursor';
	Menu.Trophies.description = SMO.AM.parse(Menu.Trophies.description);
	Menu.Trophies.bigTrophyY = Menu.Trophies.bigTrophyY || '140';
	Menu.Trophies.bigTrophyHeight = Menu.Trophies.bigTrophyHeight || '250';
	Menu.Trophies.progressBarY = Menu.Trophies.progressBarY || '428';
	Menu.Trophies.progressTextPosition = Menu.Trophies.progressTextPosition || 'Bottom Center';

	//Pop Up
	Menu.PopUp.enabled = SMO.AM.toBool(Menu.PopUp.enabled);
	Menu.PopUp.button = SMO.AM.toBool(Menu.PopUp.button);
	Menu.PopUp.preselect = -1;
	Menu.PopUp.isClickTriggered = false;
	if (!SMO.AM.translationEngine.on) {
		//This is made to improve the pop up's performance when no translation engine is detected
		Menu.PopUp.text = SMO.AM.parse(Menu.PopUp.text);
	}

	//Sort Option
	Menu.SortOption.enabled = SMO.AM.toBool(Menu.SortOption.enabled);
	Menu.SortOption.borderSize = Menu.SortOption.borderSize ? Number(Menu.SortOption.borderSize) : 2;
	if (Menu.SortOption.options) {
		options = JSON.parse(Menu.SortOption.options);
		Menu.SortOption.options = [];
		options.forEach(function(o) {
			var parse = JSON.parse(o);
			Menu.SortOption.options.push({
				symbol: parse.Symbol,
				script: SMO.AM.parse(parse.Script)
			});
		});
	} else {
		//There are no options - deactivate the sort option
		Menu.SortOption.options = [];
		Menu.SortOption.enabled = false;
	}

	Menu.AchievsInfo.enabled = Menu.AchievsInfo.enabled || 'true';
	Menu.AchievsInfo.enabled = SMO.AM.toBool(Menu.AchievsInfo.enabled);

	Menu.version = SMO.AM.version;
	var updated = false;
	if ($dataAchievsMenu && $dataAchievsMenu != 1) {
		if (!SMO.AM.translationEngine.on) {
			//This is made to improve the pop up's performance when no translation engine is detected
			$dataAchievsMenu.PopUp.text = SMO.AM.parse($dataAchievsMenu.PopUp.text);
		}
		this.refreshAchievsMenuData(Menu);
		SMO.AM.Images.menu = $dataAchievsMenu.MenuImage;
	} else {
		$dataAchievsMenu = Menu;
	}

	//Make sure the currently selected sort option actually exists
	if ($dataAchievsMenu.SortOption.enabled && $dataSystem.achievs) {
		if (!$dataAchievsMenu.SortOption.options[$dataSystem.achievsSortType]) {
			$dataSystem.achievsSortType = 0;
		}
	}
};

//On new game -> Setup achievements and give global rewards
SMO.AM._DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
	if (SceneManager._scene._achievsPopUp && SMO.AM.isGlobalMode) {
		SMO.AM._popUpBackUp = $gameSystem.achievPopUp;
	}
	SMO.AM._DataManager_setupNewGame.call(this);
	SMO.AM.onNewGame();
	delete SMO.AM._popUpBackUp;
};

DataManager.getAchievsImgNames = function() {
	var dirpath = this.achievsImagesPath();
	DataManager.getPngImgNames(dirpath);
};

DataManager.getPngImgNames = function(dirpath) {
	if (SMO.AM.requestedImgNames.busy) return;
	SMO.AM.requestedImgNames = {
		result: [],
		dirpath: dirpath,
		busy: true
	};
	if (!Utils.isNwjs()) return;
	var fs = require('fs');
	var path = require('path');

	fs.readdir(dirpath, (err, files) => {
		if (err) {
			console.error('Error when trying to read the image names on: ' + dirpath);
			console.error(err);
		} else {
			files.forEach(file => {
				if (path.extname(file) === '.png') {
					SMO.AM.requestedImgNames.result.push(path.parse(file).name);
				}
			});
			SMO.AM.requestedImgNames.busy = false;
		}
	});
};

DataManager.oldGlobalAchievsPath = function() {
	var path = StorageManager.dataDirectoryPath();
	return path + 'Achievements.json';
};

DataManager.achievsImagesPath = function() {
	var path = StorageManager.imgDirectoryPath();
	return path + 'achievements';
};

SMO.AM._StorageManager_localFilePath = StorageManager.localFilePath;
StorageManager.localFilePath = function(savefileId) {
	if (savefileId === 'achievs') {
		return this.localFileDirectoryPath() + savefileId + '.rpgsave';
	}
	return SMO.AM._StorageManager_localFilePath.call(this, savefileId);
};

StorageManager.dataDirectoryPath = function() {
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	return path.join(base, 'data/');
};

StorageManager.imgDirectoryPath = function() {
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	return path.join(base, 'img/');
};

SMO.AM._StorageManager_webStorageKey = StorageManager.webStorageKey;
StorageManager.webStorageKey = function(savefileId) {
	if (savefileId === 'achievs') return 'RPG Achievs';
	return SMO.AM._StorageManager_webStorageKey.call(this, savefileId);
};

//==========================================================================================
// Achievement Data - Create
//==========================================================================================
function Achievement_Data() {
	this.initialize.apply(this, arguments);
}

Achievement_Data.prototype = Object.create(null);
Achievement_Data.prototype.constructor = Achievement_Data;

Object.defineProperty(Achievement_Data.prototype, 'name', {
	get: function() {
		return this.isSecret() ? SMO.AM.secretSign : this._name;
	},
	set: function(value) {
		this._name = value;
	},
	configurable: true
});

Object.defineProperty(Achievement_Data.prototype, 'description', {
	get: function() {
		return this.isSecret() ? SMO.AM.secretDescription : this._description;
	},
	set: function(value) {
		this._description = value;
	},
	configurable: true
});

Object.defineProperty(Achievement_Data.prototype, 'tname', {
	get: function() {
		return SMO.AM.translate(this.name);
	},
	configurable: true
});

Object.defineProperty(Achievement_Data.prototype, 'imageName', {
	get: function() {
		if (this.isUnlocked()) {
			return this.backgroundImage;
		} else {
			var secret = SMO.AM.currentCategory.secretAchievImg || SMO.AM.Images.secret;
			var locked = SMO.AM.currentCategory.lockedAchievImg || SMO.AM.Images.locked;
			return this.isSecret() ? secret : locked;
		}
	},
	configurable: true
});

//========================================
// Achievement Data - Initialize

Achievement_Data.prototype.initialize = function(id, data) {
	this.id = id;
	this._achievement = true;
	this.setupRequirements(data);
	this.setupRewards(data);
	this.setupVisibility(data['Visibility']);
	this.categories = data['Category'].split(',');
	if (SMO.AM.globalCategoryName) {
		this.categories.delete(SMO.AM.globalCategoryName)
		this.categories.push(SMO.AM.globalCategoryName);
	}
	this.category = this.categories[0] || '';
	this._name = data.Name;
	this._description = $dataAchievements ? data['Description'] : SMO.AM.parse(data['Description']);
	this.popUpImage = data['Pop Up Image'] || '';
	this.popUpDesc = $dataAchievements ? (data['Pop Up Desc'] || '') : SMO.AM.parse(data['Pop Up Desc']);
	this.hideProgress = $dataAchievements ? (data['Hide Progress'] || false) : SMO.AM.toBool(data['Hide Progress']);
	this.backgroundImage = data['Background Image'];
	if (this.backgroundImage) {
		SMO.AM.Images.all[this.backgroundImage] = true;
	}
	this.icon = {
		locked: data['Locked Icon'] ? Number(data['Locked Icon']) : -2,
		unlocked: data['Unlocked Icon'] ? Number(data['Unlocked Icon']) : -2,
		secret: data['Secret Icon'] ? Number(data['Secret Icon']) : -2
	};
};

Achievement_Data.prototype.getIcon = function() {
	if (this.isSecret()) {
		return this.icon.secret > -2 ? this.icon.secret : SMO.AM.Icons.secret;
	} else if (this.isUnlocked()) {
		return this.icon.unlocked > -2 ? this.icon.unlocked : SMO.AM.Icons.unlocked;
	} else {
		return this.icon.locked > -2 ? this.icon.locked : SMO.AM.Icons.locked;
	}
};

Achievement_Data.prototype.setupRequirements = function(data) {
	this.requirements = [];
	var Requirements = $dataAchievements ? data['Requirements'] : SMO.AM.parse(data['Requirements']);
	if (Requirements) {
		let isPlaytime = false;
		Requirements.forEach(function(r) {
			let requirement = $dataAchievements ? r : JSON.parse(r);
			requirement = this.initRequirement(requirement);
			if (requirement.type === 'playtime') {
				isPlaytime = true;
			}
		}, this);
		this._playtimeRequired = isPlaytime;
	}
};

Achievement_Data.prototype.initRequirement = function(data) {
	var Requirement = {
		name: '',
		type: data.Type.toLowerCase(),
		itemId: Number(data['Item ID']),
		comparison: data.Comparison,
		alias: String(data.Alias),
		aliasIcon: data['Alias Icon'] ? Number(data['Alias Icon']) : -1,
		currentValue: $dataAchievements ? data['Current Value'] : SMO.AM.parse(data['Current Value']),
		targetValueA: data['Value'] || data['Required Value'], //data['Value'] -> old version
		targetValueB: $dataAchievements ? data['Final Value'] : SMO.AM.parse(data['Final Value']),
		getText: function() {}, //returns the name with current and required values
		getIcon: function() {}, //returns the item, armor, weapon, gold or alias icon
		value: function() {}, //currentValue
		tvalue: function() {}, //requiredValue
		//isReached: function() {} returns a boolean indicating if this requirement has been met
	};
	Requirement = this.getRequirementsMethods(Requirement);
	this.requirements.push(Requirement);
	return Requirement;
};

Achievement_Data.prototype.getRequirementsMethods = function(Requirement) {
	var type = Requirement.type;
	var itemId = Requirement.itemId;

	switch(Requirement.type) {
	case 'custom(advanced)':
		Requirement.value = function() {
			return eval(this.currentValue);
		};
		Requirement.tvalue = function() {
			return this.targetValueB ? eval(this.targetValueB) : this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	case 'switch':
		Requirement.comparison = '=';
		Requirement.value = function() {
			return $gameSwitches.value(this.itemId);
		};
		if (Requirement.targetValueA === 'false' || Requirement.targetValueA === false || Requirement.targetValueA === 'off') {
			Requirement.tvalue = function() {
				return false;
			};
		} else {
			Requirement.tvalue = function() {
				return true;
			};
		}
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		Requirement.getItemName = function() {
			return $dataSystem.switches[this.itemId];
		};
		break;
	case 'variable':
		Requirement.value = function() {
			return $gameVariables.value(this.itemId);
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		Requirement.getItemName = function() {
			return $dataSystem.variables[this.itemId];
		};
		break
	case 'item':
		Requirement.iconIndex = $dataItems[itemId] ? $dataItems[itemId].iconIndex : -1;
		Requirement.value = function() {
			return $gameParty.numItems($dataItems[this.itemId]);
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : this.iconIndex;
		};
		Requirement.getItemName = function() {
			return $dataItems[this.itemId] ? $dataItems[this.itemId].name : `I${this.itemId} NOT FOUND`;
		};
		break;
	case 'weapon':
		Requirement.iconIndex = $dataWeapons[itemId] ? $dataWeapons[itemId].iconIndex : -1;
		Requirement.value = function() {
			return $gameParty.numItems($dataWeapons[this.itemId]);
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : this.iconIndex;
		};
		Requirement.getItemName = function() {
			return $dataWeapons[this.itemId] ? $dataWeapons[this.itemId].name : `W${this.itemId}  NOT FOUND`;
		};
		break;
	case 'armor':
		Requirement.iconIndex = $dataArmors[itemId] ? $dataArmors[itemId].iconIndex : -1;
		Requirement.value = function() {
			return $gameParty.numItems($dataArmors[this.itemId]);
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : this.iconIndex;
		};
		Requirement.getItemName = function() {
			return $dataArmors[this.itemId] ? $dataArmors[this.itemId].name : `Ar${this.itemId}  NOT FOUND`;
		};
		break;
	case 'gold gained':
		Requirement.value = function() {
			return $gameParty.goldGained();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : SMO.AM.Icons.gold;
		};
		break;
	case 'gold spent':
		Requirement.value = function() {
			return $gameParty.goldSpent();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : SMO.AM.Icons.gold;
		};
		break;
	case 'gold':
		Requirement.value = function() {
			return $gameParty.gold();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : SMO.AM.Icons.gold;
		};
		break;
	case 'steps':
		Requirement.value = function() {
			return $gameParty.steps();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	case 'playtime':
		Requirement.value = function() {
			return SMO.AM.playtime();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	case 'save count':
		Requirement.value = function() {
			return $gameSystem.saveCount();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	case 'battle count':
		Requirement.value = function() {
			return $gameSystem.battleCount();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	case 'win count':
		Requirement.value = function() {
			return $gameSystem.winCount();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	case 'escape count':
		Requirement.value = function() {
			return $gameSystem.escapeCount();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	case 'party member':
		Requirement.comparison = '=';
		Requirement.value = function() {
			return $gameParty._actors.contains(this.itemId);
		};
		if (Requirement.targetValueA === 'false' || Requirement.targetValueA === false || Requirement.targetValueA === 'off') {
			Requirement.targetValueA = false;
			Requirement.tvalue = function() {
				return false;
			};
		} else {
			Requirement.targetValueA = true;
			Requirement.tvalue = function() {
				return true;
			};
		}
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		Requirement.getItemName = function() {
			return $dataActors[this.itemId] ? $gameActors.actor(this.itemId).name() : `Ac${this.itemId}  NOT FOUND`;
		};
		break;
	case 'party level':
		if (Requirement.itemId <= 1) {
			Requirement.value = function() {
				return Math.min.apply(null, $gameParty.members().map(a => a.level));
			};
			Requirement.getItemName = function() {
				return 'Minimun';
			};
		} else if (Requirement.itemId === 2) {
			Requirement.value = function() {
				return ($gameParty.members().length < 1 ? 0 :
					Math.round($gameParty.members().reduce((a, v) => a.level + v.level)/$gameParty.members().length));
			};
			Requirement.getItemName = function() {
				return 'Medium';
			};
		} else if (Requirement.itemId === 3) {
			Requirement.value = function() {
				return Math.max.apply(null, $gameParty.members().map(a => a.level));
			};
			Requirement.getItemName = function() {
				return 'Maximun';
			};
		} else {
			Requirement.value = function() {
				return $gameParty.members().reduce((a, v) => a.level + v.level);
			};
			Requirement.getItemName = function() {
				return 'Total';
			};
		}
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	case 'party size':
		Requirement.value = function() {
			return $gameParty.size();
		};
		Requirement.tvalue = function() {
			return this.targetValueA;
		};
		Requirement.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	}
	Requirement.getText = function() {
		var type = this.type !== 'party member' ? this.type : this.targetValueA ? 'party memberA' : 'party memberB';
		var text = this.alias ? SMO.AM.translate(this.alias) : SMO.AM.translate(SMO.AM.DefaultAlias.Requirement[type]);
		return this.convertAliasCodes(text);
	};

	switch (Requirement.comparison) {
	case '=':
		Requirement.isReached = function() {
			return this.value() == this.tvalue();
		};
		break;
	case '>':
		Requirement.isReached = function() {
			return this.value() > this.tvalue();
		};
		break;
	case '≥':
		Requirement.isReached = function() {
			return this.value() >= this.tvalue();
		};
		break;
	case '<':
		Requirement.isReached = function() {
			return this.value() < this.tvalue();
		};
		break;
	case '≤':
		Requirement.isReached = function() {
			return this.value() <= this.tvalue();
		};
		break;
	case '≠':
		Requirement.isReached = function() {
			return this.value() != this.tvalue();
		};
		break;
	default:
		Requirement.isReached = function() {
			return false;
		};
		break;
	}

	if (!Requirement.getItemName) {
		Requirement.getItemName = function() {
			return '';
		};
	}

	Requirement._achievement = this;

	Requirement.convertAliasCodes = function(text) {
		value1 = Number(this.value());
		value2 = Number(this.tvalue());
		if (this.isReached() || this._achievement.isUnlocked()) {
			value1 = value2;
		}
		text = text.replace(/\\value1/g, value1);//old versions
		text = text.replace(/\\value2/g, value2);//old versions
		text = text.replace(/<ItemName>/gi, this.getItemName());
		text = text.replace(/<CurrentValue>/gi, value1);
		text = text.replace(/<RequiredValue>/gi, value2);
		return text;
	};

	Requirement.iconIndex = Requirement.iconIndex == null ? -1 : Requirement.iconIndex;

	return Requirement;
};

Achievement_Data.prototype.setupRewards = function(data) {
	this.rewards = [];
	var Rewards = $dataAchievements ? data['Rewards'] : SMO.AM.parse(data['Rewards']);
	if (!Rewards) return;
	Rewards.forEach(function(r) {
		let rew = $dataAchievements ? r : JSON.parse(r);
		let Reward = {
			type: rew.Type.toLowerCase(),
			itemId: Number(rew['Item ID']),
			amount: Number(rew.Amount),
			advanced: $dataAchievements ? rew.Advanced : SMO.AM.parse(rew.Advanced),
			alias: rew.Alias,
			aliasIcon: rew['Alias Icon']
		}
		Reward = this.getRewardsMethods(Reward);
		this.rewards.push(Reward);
	}, this);
};

Achievement_Data.prototype.getRewardsMethods = function(Reward) {
	function collectAdvancedReward () {
		if (!this.advanced) return;
		try {
			eval(this.advanced);
		} catch (e) {
			var err = 'Error on Advanced Reward! ';
			var info = `(Achiev Name: ${this._name} | ID: ${this.id})`;
			console.error(err + info);
			console.error(e);
		}
	}
	switch (Reward.type) {
	case 'custom(advanced)':
		Reward.collect = function() {
			collectAdvancedReward.call(this);
		};
		Reward.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	case 'gold':
		Reward.collect = function() {
			$gameParty.gainGold(this.amount);
			collectAdvancedReward.call(this);
		};
		Reward.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : SMO.AM.Icons.gold;
		};
		break;
	case 'item':
		var item = $dataItems[Reward.itemId];
		Reward.iconIndex = item ? item.iconIndex : -1;
		Reward.collect = function() {
			$gameParty.gainItem($dataItems[this.itemId], this.amount);
			collectAdvancedReward.call(this);
		};
		Reward.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : this.iconIndex;
		};
		if (item) {
			Reward.getItemName = function() {
				return SMO.AM.translate($dataItems[this.itemId].name);
			};
		} else {
			Reward.getItemName = function() {
				return `I${this.itemId} NOT FOUND`;
			};
		}
		break;
	case 'weapon':
		var weapon = $dataWeapons[Reward.itemId];
		Reward.iconIndex = weapon ? weapon.iconIndex : -1;
		Reward.collect = function() {
			$gameParty.gainItem($dataWeapons[this.itemId], this.amount);
			collectAdvancedReward.call(this);
		};
		Reward.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : this.iconIndex;
		};
		if (weapon) {
			Reward.getItemName = function() {
				return SMO.AM.translate($dataWeapons[this.itemId].name);
			};
		} else {
			Reward.getItemName = function() {
				return `W${this.itemId} NOT FOUND`;
			};
		}
		break;
	case 'armor':
		var armor = $dataArmors[Reward.itemId];
		Reward.iconIndex = armor ? armor.iconIndex : -1;
		Reward.collect = function() {
			$gameParty.gainItem($dataArmors[this.itemId], this.amount);
			collectAdvancedReward.call(this);
		};
		Reward.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : this.iconIndex;
		};
		if (armor) {
			Reward.getItemName = function() {
				return SMO.AM.translate($dataArmors[this.itemId].name);
			};
		} else {
			Reward.getItemName = function() {
				return `Ar${this.itemId} NOT FOUND`;
			};
		}
		break;
	case 'experience':
		if (Reward.itemId === -1) { //EXP to the party leader
			Reward.collect = function() {
				$gameParty.leader().gainExp(this.amount);
				collectAdvancedReward.call(this);
			};
		} else if (Reward.itemId === -2) { //EXP to all the party members
			Reward.collect = function() {
				$gameParty.members().forEach(a => a.gainExp(this.amount));
				collectAdvancedReward.call(this);
			};
		} else {
			Reward.collect = function() {
				$gameActors.actor(this.itemId).gainExp(this.amount);
				collectAdvancedReward.call(this);
			};
			if ($dataActors[Reward.itemId]) {
				Reward.getItemName = function() {
					return $gameActors.actor(this.itemId).name();
				};
			} else {
				Reward.getItemName = function() {
					return `Ac${this.itemId} NOT FOUND`;
				};
			}
		}
		Reward.getIcon = function() {
			return this.aliasIcon > -2 ? this.aliasIcon : -1;
		};
		break;
	}
	if (!Reward.getItemName) {
		Reward.getItemName = function() {
			return '';
		};
	}

	Reward._achievement = this;

	Reward.getText = function() {
		var type = this.type !== 'experience' ? this.type : this.itemId < 0 ? 'experienceA' : 'experienceB';
		var text = this.alias ? SMO.AM.translate(this.alias) : SMO.AM.translate(SMO.AM.DefaultAlias.Reward[type]);
		return this.convertAliasCodes(text);
	};

	Reward.convertAliasCodes = function(text) {
		text = text.replace(/<Amount>/gi, this.amount);
		text = text.replace(/<ItemName>/gi, this.getItemName());
		return text;
	};

	return Reward;
};

Achievement_Data.prototype.isPlaytimeRequired = function() {
	return this._playtimeRequired && !this.isUnlocked();
};

Achievement_Data.prototype.setupVisibility = function(string) {
	var state = string.toLowerCase();
	this.visibility = (state === 'secret' || state === 'hidden') ? state : 'visible';
};

//Method: "progress"
// * Returns an integer indicating the % of completion of this achievement
Achievement_Data.prototype.progress = function() {
	if (this.requirements.length === 0 || this.isUnlocked()) return 100;
	var progress = 0;
	var reached = 0; //reached requirements
	var all = this.requirements.length; //total number of requirements
	var each = 100 / all; // % of progress that each requirement unlocks
	for (var r = 0; r < all; r++) {
		let Requirement = this.requirements[r];
		if (Requirement.isReached()) {
			reached++;
			progress += each;
			continue;
		}

		if (Requirement.comparison === '≥') {
			let v1 = Requirement.value();
			let v2 = Requirement.tvalue();
			if (!isNaN(v1) && !isNaN(v2) && v2 != 0) {
				progress += each * v1 / v2;
			}
		}
	}
	progress = reached === all ? 100 : Math.min(99, Math.round(progress));
	return progress;
};

Achievement_Data.prototype.flatProgress = function() {
	if (!this.requirements.length) return '0/0';
	var all = 0;
	var done = 0;
	for (var a = 0; a < this.requirements.length; a++) {
		if (this.requirements[a].comparison === '≥') {
			let v1 = Number(this.requirements[a].value());
			let v2 = Number(this.requirements[a].tvalue());
			if (!isNaN(v1) && !isNaN(v2)) {
				all += v2;
				done += Math.min(v1, v2);
				continue;
			}
		}
		if (this.requirements[a].isReached()) {
			done += 1;
		}
		all += 1;
	}
	if (this.isUnlocked()) {
		return all + '/' + all;
	}
	return done + '/' + all;
};

Achievement_Data.prototype.isUnlockEdible = function() {
	if (this.requirements.length === 0) return true;
	return !this.requirements.some(req => !req.isReached());
};

Achievement_Data.prototype.unlock = function() {
	if (this.isUnlocked()) return;
	SMO.AM.unlockAchievement(this.id);
	SMO.AM.refreshUnlockedTrophies(true);
	SMO.AM.refreshAchievementsScene();
};

Achievement_Data.prototype.lock = function() {
	if (!this.isUnlocked()) return;
	var vis = this.visibility;
	SMO.AM.DataDynamic.achievs[this.id-1] = {
		state: vis === 'hidden' ? -2 : vis === 'secret' ? -1 : 0,
		date: 0
	};
	this.removeFromPopUpQueue();

	DataManager.saveGlobalAchievements();

	SMO.AM.refreshAchievementsScene();
};

Achievement_Data.prototype.removeFromPopUpQueue = function() {
	var PopUp = SceneManager._scene._achievsPopUp;
	if (!PopUp) return;
	var index = PopUp._queue.indexOf(this.id);
	if (index === -1) return;
	if (index === 0) return PopUp.skip();
	$gameSystem.achievPopUp.queue.splice(index, 1);
	PopUp._queue = $gameSystem.achievPopUp.queue;
};

Achievement_Data.prototype.gainRewards = function() {
	if (!SMO.AM.useRewards) return;
	var dynamic = SMO.AM.DataDynamic.achievs[this.id-1];
	dynamic.state = dynamic.state === 1 ? 4 : 3;
	if (SMO.AM.isManualReward) {
		$gameSystem.collectedAchievs[this.id-1] = 1;
	}
	this.rewards.forEach(r => r.collect());
};

/*
  Achievements' states:
    -2 -> Hidden
    -1 -> Secret
     0 -> Locked
     1 -> Recent
     2 -> Unlocked
     3 -> Collected
     4 -> Recent && Collected
*/
Achievement_Data.prototype.isHidden = function() {
	return SMO.AM.DataDynamic.achievs[this.id-1].state === -2;
};

Achievement_Data.prototype.isSecret = function() {
	return SMO.AM.DataDynamic.achievs[this.id-1].state === -1;
};

Achievement_Data.prototype.isUnlocked = function() {
	return SMO.AM.DataDynamic.achievs[this.id-1].state > 0;
};

Achievement_Data.prototype.isRecent = function() {
	var state = SMO.AM.DataDynamic.achievs[this.id-1].state;
	return state === 1 || state === 4;
};

Achievement_Data.prototype.isCollected = function() {
	if (SMO.AM.isManualReward) return !!$gameSystem.collectedAchievs[this.id-1];
	return SMO.AM.DataDynamic.achievs[this.id-1].state > 2;
};

Achievement_Data.prototype.isRewardAvailable = function() {
	return SMO.AM.isManualReward && this.isUnlocked() && !this.isCollected();
};

Achievement_Data.prototype.isRevealed = function() {
	if (this.isHidden() || this.isSecret()) return false;
	return this.visibility !== 'visible';
};

Achievement_Data.prototype.reveal = function() {
	if (!this.isUnlocked() && (this.isSecret() || this.isHidden())) {
		SMO.AM.DataDynamic.achievs[this.id-1].state = 0;
		SMO.AM.refreshAchievementsScene();
	}
};

Achievement_Data.prototype.turnSecret = function(forcelock) {
	if (this.isSecret()) return false;
	if (this.isUnlocked() && !forcelock) return false;
	this.lock();
	SMO.AM.DataDynamic.achievs[this.id-1].state = -1;
	SMO.AM.refreshAchievementsScene();
	return true;
};

Achievement_Data.prototype.turnHidden = function(forcelock) {
	if (this.isHidden()) return false;
	if (this.isUnlocked() && !forcelock) return false;
	this.lock();
	SMO.AM.DataDynamic.achievs[this.id-1].state = -2;
	SMO.AM.refreshAchievementsScene();
	return true;
};

Achievement_Data.prototype.getUnlockDateString = function() {
	if (!this.isUnlocked()) return '';
	var date = SMO.AM.DataDynamic.achievs[this.id-1].date;
	var str = SMO.AM.translate($dataAchievsMenu.AchievsInfo.unlockedOn);
	var dateStr = '';
	for (var d in date) {
		dateStr = '<' + d.toLowerCase() + '>';
		if (str.indexOf(dateStr) > -1) {
			var regex = new RegExp(dateStr, "i");
			var translation = SMO.AM.translate(date[d]);
			str = str.replace(regex, translation);
		}
	}
	return str;
};

Achievement_Data.prototype.getUnlockDateNow = function() {
	if (!this.isUnlocked()) return null;
	return SMO.AM.DataDynamic.achievs[this.id-1].date.now;
};

Achievement_Data.prototype.isMyBackgroundReady = function() {
	if (!this.backgroundImage) return true;

	if (!this.backgroundBitmap) {
		this.backgroundBitmap = ImageManager.loadAchievement(this.backgroundImage);
	}

	if (this.backgroundBitmap.isReady()) {
		delete this.backgroundBitmap;
		return true;
	}
	return false;
};

Achievement_Data.prototype.isMyPopUpReady = function() {
	if (!this.popUpImage) return this.isMyBackgroundReady();

	if (!this.popUpBitmap) {
		this.popUpBitmap = ImageManager.loadAchievement(this.popUpImage);
	}
	
	if (this.popUpBitmap.isReady()) {
		delete this.popUpBitmap;
		return true;
	}
	return false;
};

//Returns an object with the same properties used to create this achievement
Achievement_Data.prototype.rawData = function() {
	var v = this.visibility;
	var data = {
		'Name': this._name,
		'Category': this.categories.join(','),
		'Description': this._description,
		'Pop Up Desc': this.popUpDesc,
		'Visibility': v === 'visible' ? 'Visible from start' : v === 'hidden' ? 'Hidden' : 'Secret',
		'Background Image': this.backgroundImage,
		'Pop Up Image': this.popUpImage,
		'Hide Progress': this.hideProgress,
		'Requirements': [],
		'Rewards': [],
		'Locked Icon': this.icon.locked,
		'Unlocked Icon': this.icon.unlocked,
		'Secret Icon': this.icon.secret
	};

	var reqs = this.requirements;
	for (var r = 0; r < reqs.length; r++) {
		if (reqs[r].type === 'custom(advanced)') {
			var type = 'Custom(Advanced)';
		} else {
			var split = reqs[r].type.split(' ');
			var type = split[0][0].toUpperCase() + split[0].substring(1);
			if (split[1]) {
				type += ' ' + split[1][0].toUpperCase() + split[1].substring(1);;
			}
		}
		data.Requirements[r] = {
			'Type': type,
			'Item ID': reqs[r].itemId,
			'Comparison': reqs[r].comparison,
			'Required Value': reqs[r].targetValueA,
			'Alias': reqs[r].alias,
			'Alias Icon': reqs[r].aliasIcon,
			'Current Value': reqs[r].currentValue,
			'Final Value': reqs[r].targetValueB
		};
	}

	var rews = this.rewards;
	for (r = 0; r < rews.length; r++) {
		if (rews[r].type === 'custom(advanced)') {
			var type = 'Custom(Advanced)';
		} else {
			var split = rews[r].type.split(' ');
			var type = split[0][0].toUpperCase() + split[0].substring(1);
			if (split[1]) {
				type += ' ' + split[1][0].toUpperCase() + split[1].substring(1);;
			}
		}
		data.Rewards[r] = {
			'Type': type,
			'Item ID': rews[r].itemId,
			'Amount': rews[r].amount,
			'Advanced': rews[r].advanced,
			'Alias': rews[r].alias,
			'Alias Icon': rews[r].aliasIcon
		};
	}
	return data;
};

//==========================================================================================
// Scene_Load - Creating/Updating data
//==========================================================================================
SMO.AM._SceneLoad_onSavefileOk = Scene_Load.prototype.onSavefileOk;
Scene_Load.prototype.onSavefileOk = function() {
	if (this._achievsPopUp && SMO.AM.isGlobalMode) {
		SMO.AM._popUpBackUp = $gameSystem.achievPopUp;
	}
	SMO.AM._SceneLoad_onSavefileOk.call(this);
	delete SMO.AM._popUpBackUp;
};

SMO.AM._SceneLoad_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function() {
	SMO.AM._SceneLoad_onLoadSuccess.call(this);
	if (SMO.AM._popUpBackUp) {
		this._achievsPopUp.clear();
		$gameSystem.achievPopUp = SMO.AM._popUpBackUp;
		this._achievsPopUp.restore();
	} else if ($gameSystem.achievPopUp.queue.length) {
		//Reset pop up's data
		$gameSystem.achievPopUp.animCount = -1;
		$gameSystem.achievPopUp.isOutAnim = false;
		$gameSystem.achievPopUp.opacity = 0;
		$gameSystem.achievPopUp.timer = 0;
		if (SMO.AM.localLoadPopUp === 'Skip') {
			$gameSystem.achievPopUp.queue.splice(0, 1);
		} else if (SMO.AM.localLoadPopUp === 'Clear') {
			$gameSystem.achievPopUp.queue = [];
		}
	}
	if (!SMO.AM.isGlobalMode) {
		SMO.AM.DataDynamic.achievs.forEach(function(a) {
			a.date = a.date ? SMO.AM.getDate(a.date) : 0;
		});
	}
};

SMO.AM._SceneLoad_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
Scene_Load.prototype.reloadMapIfUpdated = function() {
	SMO.AM._SceneLoad_reloadMapIfUpdated.call(this);
	if ($gameSystem.versionId() !== $dataSystem.versionId) {
		$gameSystem.setupAchievs();
		SMO.AM.DataDynamic.achievs.forEach(function(a) {
			if (typeof a.date !== 'number') {
				a.date = a.date.now;
			}
		});
	}
};

//==========================================================================================
// Game Player
// Refreshing achievements after transfer
//==========================================================================================
SMO.AM._GamePlayer_clearTransferInfo = Game_Player.prototype.clearTransferInfo;
Game_Player.prototype.clearTransferInfo = function() {
	SMO.AM._GamePlayer_clearTransferInfo.call(this);
	SMO.AM.refreshAchievsAfterTransfer();
};

SMO.AM._GamePlayer_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
	if (SceneManager._scene.isGrabbingSprite()) return false;
	if (SceneManager._scene.isSelecting()) return false;
	return SMO.AM._GamePlayer_canMove.call(this);
};

//==========================================================================================
// Game Party
// Creating a varible to track the gold spent and the gold gained
//==========================================================================================
Game_Party.prototype.maxGoldSpent = function() {
	return 999999999999;
};

Game_Party.prototype.goldSpent = function() {
	if (this._goldSpent == null) {
		this._goldSpent = 0;
	}
	return this._goldSpent;
};

Game_Party.prototype.maxGoldGained = function() {
	return 999999999999;
};

Game_Party.prototype.goldGained = function() {
	if (this._goldGained == null) {
		this._goldGained = 0;
	}
	return this._goldGained;
};

SMO.AM._GameParty_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
	var gold = this.gold();
	SMO.AM._GameParty_gainGold.call(this, amount);
	var dif = this.gold() - gold;
	this._goldGained = dif > 0 ? Math.min(this.maxGoldGained(), this.goldGained()+dif) : this.goldGained();
	this._goldSpent = dif < 0 ? Math.min(this.maxGoldSpent(), this.goldSpent()-dif) : this.goldSpent();
};

//==========================================================================================
// Game System
//==========================================================================================
Game_System.prototype.setupAchievs = function() {
	if (this.achievs) {
		if (!SMO.AM.isGlobalMode) {
			SMO.AM.refreshDynamicData();
		}
	} else {
		this.achievs = [];
		this.trophies = [];
		this.achievsSortType = 0;
		this.collectedAchievs = [];
		this.achievPopUp = {
			opacity: 0,
			animCount: -1,
			isOutAnim: false,
			timer: 0,
			queue: []
		};
		if (!SMO.AM.isGlobalMode && $dataAchievements) {
			SMO.AM.refreshDynamicData();
		}
	}

	if (this.achievPopUp.animCount == null) {
		this.achievPopUp.animCount = -1;
		this.achievPopUp.isOutAnim = false;
		this.achievsSortType = 0;
		this.collectedAchievs = [];
	}
};

//The achievementId may be a number or the achievement name
Game_System.prototype.achievement = function(achievementId) {
	if (Number(achievementId)) {
		return $dataAchievements[achievementId - 1] || null;
	} else {
		achievementId = SMO.AM.getAchievementIdByName(achievementId);
		if (achievementId) return $dataAchievements[achievementId - 1];
	}
	return null;
};

//The trophyId may be a number or the category's name
Game_System.prototype.isTrophyUnlocked = function(trophyId) {
	if (Number(trophyId)) {
		return !!SMO.AM.DataDynamic.trophies[trophyId-1];
	} else {
		var category = $dataAchievsCategories.find(c => c.name === trophyId);
		var categoryId = category ? category.id : 0;
		return !!SMO.AM.DataDynamic.trophies[categoryId-1];
	}
	return false;
};

Game_System.prototype.unlockedAchievsCount = function() {
	return SMO.AM.DataDynamic.achievs.filter(a => a.state > 0).length;
};

Game_System.prototype.lockedAchievsCount = function() {
	if (SMO.AM.hideTotally) {
		return SMO.AM.DataDynamic.achievs.filter(a => a.state === -1 || a.state === 0).length;
	}
	return SMO.AM.DataDynamic.achievs.filter(a => a.state < 1).length;
};

SMO.AM._GameSystem_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
	SMO.AM._GameSystem_onBeforeSave.call(this);
	SMO.AM.refreshAchievements();
};

//==========================================================================================
// Window Base
//==========================================================================================
Window_Base.prototype.textWidthEx = function(text) {
	return this.drawTextEx(text, 0, this.contents.height);
};

Window_Base.prototype.drawBorderedRect = function(x, y, width, height, borderSize, borderColor, backColor, backImg) {
	this.contents.drawBorderedRect(x, y, width, height, borderSize, borderColor, backColor, backImg);
};

//==========================================================================================
// Scene Base
//==========================================================================================
SMO.AM._Scene_Base_initialize = Scene_Base.prototype.initialize;
Scene_Base.prototype.initialize = function() {
	SMO.AM._Scene_Base_initialize.call(this);
	this.createSButtons();
};

SMO.AM._Scene_Base_createFadeSprite = Scene_Base.prototype.createFadeSprite;
Scene_Base.prototype.createFadeSprite = function(white) {
	var creatingSprite = !this._fadeSprite;
	SMO.AM._Scene_Base_createFadeSprite.call(this, white);
	//Making sure the pop up is always on top of the fade sprite
	if (this._achievsPopUp && SMO.AM.isGlobalMode && creatingSprite) {
		var index = this.getChildIndex(this._fadeSprite);
		this.setChildIndex(this._achievsPopUp, index);
	}
};

Scene_Base.prototype.createSButtons = function() {
	if (this instanceof Scene_Boot) return;
	this._selecting = false;
	this.SButtons = {
		_all: [],
		_selected: null,
		_grabbing: null,
		_hovered: null,
		_needSort: 'start',
		_state: 'on',
		_description: new Sprite(new Bitmap(Graphics.width, Graphics.height))
	};

	var desc_sprite = this.SButtons._description;
	desc_sprite.bitmap.fontSize = 12;
	desc_sprite.bitmap.outlineColor = 'rgba(0,0,0,0.9)';
	desc_sprite.bitmap.outlineWidth = 3;

	//Method - setButton
	//Gets the button's description and draws it on screen
	desc_sprite.setButton = function(button) {
		if (!this.parent) {
			SceneManager._scene.addChild(this);
		}
		this.bitmap.clear();
		if (button) {
			var padding = 6;
			var line_h = this.bitmap.fontSize;
			var text = button._data.description;
			var lines = text.split('\n');
			var font = {
				size: line_h,
				face: this.bitmap.fontFace
			};
			var text_w = SMO.AM.textWidthEx(text, font, true); //text width
			var text_h = lines.length * line_h + (lines.length - 1) * padding; //text height

			this.width = text_w + padding * 2;
			this.height = text_h + padding * 2;
			var bd_size = 1;
			var bd_color = 'rgba(0,0,0,0.9)';
			this.bitmap.drawRoundedRect(0, 0, this.width, this.height, 3, bd_color);

			var body_w = this.width - 2 * bd_size;
			var body_h = this.height - 2 * bd_size;
			var body_c = '#ffffff';
			this.bitmap.drawRoundedRect(bd_size, bd_size, body_w, body_h, 3, body_c);
			for (var line_i = 0; line_i < lines.length; line_i++) {
				var line = lines[line_i];
				var line_y = padding + line_i * (line_h + padding);
				this.bitmap.drawText(line, 0, line_y, this.width, line_h, 'center');
			}
			this.x = Math.floor(button.realX() + button.width / 2 - this.width / 2);
			this.y = button.realY() - this.height - 1;
			this._button = button;
			this.smartPosition();
			this.show();
		} else {
			this._button = null;
			this.hide();
		}
	};

	//Method - Smart Position
	//Prevents the description from spawning outside the screen
	desc_sprite.smartPosition = function() {
		if (this.y < 0) {
			var button = this._button;
			this.y = button ? button.realY() + button.height + 1 : 0;
		} else if ((this.y + this.height) > Graphics.height) {
			this.y = Graphics.height - this.height;
		}
		if (this.x < 0) {
			this.x = 0;
		} else if ((this.x + this.width) > Graphics.width) {
			this.x = Graphics.width - this.width;
		}
	};

	desc_sprite.update = function() {
		Sprite.prototype.update.call(this);
		this.updateFading();
	};

	desc_sprite.updateFading = function() {
		if (this._fading) {
			this.opacity += this._fadeRate;
			if (this._fadeRate > 0) {
				if (this.opacity >= this._fadeLimit) {
					this.opacity = this._fadeLimit;
					this._fading = false;
				}
			} else {
				if (this.opacity <= this._fadeLimit) {
					this.opacity = this._fadeLimit;
					this._fading = false;
					if (this.opacity === 0) {
						this.visible = false;
					}
				}
			}
		}
		if (this._fadeTimer && !this._fading) {
			this._fadeTimer--;
			if (this._fadeTimer <= 0) {
				this.hide();
				this._fadeTimer = 0;
			}
		}
	};

	desc_sprite.show = function() {
		this.visible = true;
		this.opacity = 0;
		this._fadeLimit = 255;
		this._fadeRate = 15;
		this._fadeTimer = 0;
		this._fading = true;
	};

	desc_sprite.hide = function() {
		this._fadeLimit = 0;
		this._fadeRate = -15;
		this._fadeTimer = 0;
		this._fading = true;
	};
};

Scene_Base.prototype.grabSprite = function(sprite) {
	if (!sprite) return this.SButtons._grabbing = null;
	var sx = Sprite_Button.prototype.canvasToLocalX.call(sprite, 0);
	var sy = Sprite_Button.prototype.canvasToLocalY.call(sprite, 0);
	this.SButtons._grabbing = {
		sprite: sprite,
		x: TouchInput._x + sx,
		y: TouchInput._y + sy
	};
	sprite.onGrab();
};

Scene_Base.prototype.isGrabbingSprite = function() {
	return !!this.SButtons._grabbing;
};

Scene_Base.prototype.grabbedSprite = function() {
	return this.SButtons._grabbing ? this.SButtons._grabbing.sprite : null;
};

Scene_Base.prototype.addSButton = function(button) {
	if (this.SButtons._needSort === 'start') return this.SButtons._all.push(button);
	this.SButtons._needSort = true;
	button._needSort = true;
};

Scene_Base.prototype.removeSButton = function(button) {
	this.SButtons._all.delete(button);
};

Scene_Base.prototype.getSButtons = function() {
	return this.SButtons._all;
};

Scene_Base.prototype.SButtonsState = function() {
	return this.SButtons._state;
};

Scene_Base.prototype.setSButtonsState = function(state) {
	state = ['on', 'pause', 'off'].contains(state) ? state : 'on';
	this.SButtons._state = state;
};

Scene_Base.prototype.buttonDescription = function() {
	return this.SButtons._description;
};

Scene_Base.prototype.getButtonById = function(id) {
	return this.getSButtons().find(function(button) {
		return (button.isButton() && button.id === id);
	});
};

Scene_Base.prototype.isCallingTrigger = function() {
	var button = this.SButtons._hovered;
	return !!button && button.isButton() && button._touching;
};

Scene_Base.prototype.isGrabAnySButton = function() {
	var button = this.SButtons._hovered;
	return !!button && !button.isButton() && button._touching;
};

Scene_Base.prototype.isTextInputSelected = function() {
	var Button = this.selectedButton();
	return !!Button && (Button instanceof SButton_Text);
};

Scene_Base.prototype.selectedButton = function() {
	return this.SButtons ? this.SButtons._selected : null;
};

Scene_Base.prototype.selectButton = function(new_selection, touch) {
	var current_selection = this.SButtons._selected;
	if (current_selection) {
		if (current_selection === new_selection) {
			return current_selection.onReselect();
		} else {
			this.SButtons._selected = null;
			current_selection.onDeselect();
		}
	}

	this.SButtons._selected = new_selection || null;
	if (new_selection) {
		new_selection.onSelect(touch);
	}
};

Scene_Base.prototype.isHoverAnySButton = function() {
	return !!this.SButtons._hovered;
};

Scene_Base.prototype.isSelecting = function() {
	return this._selecting;
};

SMO.AM._Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
	SMO.AM._Scene_Base_update.call(this);
	this.updateSButtons();
	this.updateGlobalFrames();
	this.updateAchievements();
};

Scene_Base.prototype.updateSButtons = function() {
	if (this instanceof Scene_Boot) return;
	if (this.isSButtonSorting()) return;
	this.updateSButtonsHover();
	//Updating button selection
	if (TouchInput.isTriggered() && this.isTriggeringSButton()) {
		this.selectButton(this.SButtons._hovered);
	}
	this.updateTextButtons();
};

Scene_Base.prototype.isSButtonSorting = function() {
	var SB = this.SButtons;
	if (!SB._needSort) return false;
	if (SB._needSort === 'start') return SB._needSort = false; //Scene start - No need to sort
	this.getSButtons().forEach(function(Button) {
		Button._needSort = true;
	});
	this.removeChild(this.buttonDescription());
	SB._all = [];
	SB._needSort = false;
	return true;
};

Scene_Base.prototype.updateSButtonsHover = function() {
	if (this.isGrabbingSprite()) {
		this.SButtons._hovered = null;
		return;
	}
	var Hovered = null;
	var Button = null;
	for (var b = this.getSButtons().length - 1; b > -1; b--) {	
		Button = this.getSButtons()[b];
		if (!Button) {
			this.getSButtons().splice(b, 1);
			continue;
		}
		if (!Hovered && Button.checkHover()) { //Only one button may be hovered at a time
			Hovered = Button;
			continue;
		}
		Button.setHover(false);
	}

	if (Hovered) {
		Hovered.setHover(true);
		this.SButtons._hovered = Hovered;
	} else {
		this.SButtons._hovered = null;
	}
	return Hovered;
};

Scene_Base.prototype.updateTextButtons = function() {
	if (document.hasFocus() && this.isTextInputSelected()) {
		SButton_Text.updateTextInput(this.selectedButton());
	}
};

Scene_Base.prototype.isTriggeringSButton = function() {
	var Button = this.SButtons._hovered;
	if (this.isSelecting() && (!Button || !Button.isOverrideSelect())) {
		this.selectButton(null);
		return false;
	}
	if (!Button || (!Button.isButton() && !Button.isClickOnMyGrabBox())) {
		if (this.selectedButton()) {
			this.selectButton(null);
		}
		return false;
	}
	if ((Button instanceof SButton_Text) && !Button.enabled) return false;
	return true;
};

Scene_Base.prototype.updateGlobalFrames = function() {
	if (!SMO.AM.isGlobalMode) return;
	if (SMO.AM.FrameCount.lastValue !== Graphics.frameCount) {
		SMO.AM.FrameCount.value += Graphics.frameCount - SMO.AM.FrameCount.lastValue;
		SMO.AM.FrameCount.lastValue = Graphics.frameCount;
	}
};

Scene_Base.prototype.updateAchievements = function() {
	if (this instanceof Scene_Boot) return;
	var isFromTitle = SceneManager._stack[0] === Scene_Title;
	if (!SMO.AM.isGlobalMode && (isFromTitle || (this instanceof Scene_Title))) return;
	this.createAchievementPopUp();

	//Refreshing achievements
	if (SMO.AM.autoRefresh) {
		SMO.AM.refreshCounter++;
		if (SMO.AM.refreshCounter >= SMO.AM.updateInterval) {
			SMO.AM.refreshAchievements();
			SMO.AM.refreshCounter = 0;
		}
	}
};

Scene_Base.prototype.createAchievementPopUp = function() {
	if (!$dataAchievsMenu.PopUp.enabled) return;
	if (this._achievsPopUp) return;

	this._achievsPopUp = new Achievement_PopUp();
	//Adding the pop up below the editor
	if (SMO.AM.isAchievementsScene() && this._achievenator) {
		let index = this.getChildIndex(this._achievenator);
		this.addChildAt(this._achievsPopUp, index);
	} else {
		//Adding the pop up on the highest layer
		this.addChild(this._achievsPopUp);
	}
};

SMO.AM._SceneBase_terminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
	SMO.AM._SceneBase_terminate.call(this);
	if (this.isTextInputSelected()) {
		SButton_Text.loadDefaultKeyCodes();
	}
	document.body.style.cursor = '';
};

//==========================================================================================
// Image Manager
//==========================================================================================
ImageManager.loadAchievement = function(filename, hue) {
	return this.loadBitmap('img/achievements/', filename, hue, true);
};

ImageManager.reserveAchievement = function(filename, hue, reservationId) {
	reservationId = reservationId || 'achievs';
    return this.reserveBitmap('img/achievements/', filename, hue, true, reservationId);
};

ImageManager.isAchievementsReady = function() {
	if (!SMO.AM.Images.loading) {
		SMO.AM.Images.loop = -1;
		SMO.AM.Images.loading = [];
		for (var imgName in SMO.AM.Images.all) {
			SMO.AM.Images.loading.push(ImageManager.reserveAchievement(imgName));
		}
	}
	SMO.AM.Images.loop++;

	if (SMO.AM.Images.loading.some(i => !i.isReady())) {
		return false;
	}

	if (!SMO.AM.Images.menu) {
		var background = SceneManager.backgroundBitmap();
		if (!background || !background.isReady()) {
			return false;
		}
		SceneManager._scene.setBackground();
	}

	if (SMO.AM.Images.loop) {
		// Some image was not loaded initially, so we may have to refresh some windows to make
		// sure all items were drawn correctly
		SceneManager._scene.refreshDrawnImages();
	}
	delete SMO.AM.Images.loading;
	delete SMO.AM.Images.loop;
	return true;
};

//==========================================================================================
// Scene Manager
//==========================================================================================
SMO.AM._SceneManager_snapForBackground = SceneManager.snapForBackground;
SceneManager.snapForBackground = function() {
	var scene = this._scene;
	if (scene._achievsPopUp) {
		scene._achievsPopUp.opacity = 0;
	}
	SMO.AM._SceneManager_snapForBackground.call(this);
};

//==========================================================================================
// Pop Up - Create
// This sprite is created on all scenes except for the Scene_Boot
//==========================================================================================
function Achievement_PopUp() {
	this.initialize.apply(this, arguments);
}

Achievement_PopUp.prototype = Object.create(Sprite_Button.prototype);
Achievement_PopUp.prototype.constructor = Achievement_PopUp;

//========================================
// Pop Up - Initialize

Achievement_PopUp.prototype.initialize = function() {
	Sprite_Button.prototype.initialize.call(this);
	this.initMembers();
	this.initBitmap();
	this.refreshPosition();
	this.restore();
	this.drawMe();
	this.setClickHandler(this.onClick.bind(this));
};

Achievement_PopUp.prototype.initMembers = function() {
	this._maxAnimCount = 45;
	this._animCount = this._maxAnimCount;
	this._testing = false;
	this._timerX = 180;
	this._timer = 0;
	this._scaleVariation = 0.5;
	this.opacity = 0;
	this._queue = [];
	this._x0 = 0;
	this._x1 = 0;
	this._y0 = 0;
	this._y1 = 0;
	this._scale1 = 0;
	this._isOutAnim = false;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
};

Achievement_PopUp.prototype.initBitmap = function() {
	var settings = $dataAchievsMenu.PopUp;
	var width = 140;
	var height = 106;
	try {
		width = eval(settings.width);
		height = eval(settings.height);
	} catch (e) {
		console.error("Error on your Pop Up's Width or Height settings.");
		console.error(e);
	}
	this.bitmap = new Bitmap(width, height);
	this.bitmap.fontFace = this.standardFontFace();
	this.bitmap.fontSize = this.standardFontSize();
};

//========================================
// Pop Up - Update

Achievement_PopUp.prototype.update = function() {
	Sprite_Button.prototype.update.call(this);
	if (!this.isAllowed()) return;
	if (this.isEditing()) return;
	this.updateAnimation();
	this.updateTimer();
	this.updateShowing();
};

Achievement_PopUp.prototype.updateAnimation = function() {
	if (this.isAnimating()) {
		this._animCount++;
		var ratio = this.getAnimationRatio();
		if (this._isOutAnim) {
			this.x = this._x0 + (this._x1 - this._x0) * ratio;
			this.y = this._y0 + (this._y1 - this._y0) * ratio;
			this.scale.x = 1 + (this._scale1 - 1) * ratio;
			this.scale.y = this.scale.x;
			this.opacity = this._fadeOut ? 255 * (1 - ratio) : 255;
		} else {
			this.x = this._x1 + (this._x0 - this._x1) * ratio;
			this.y = this._y1 + (this._y0 - this._y1) * ratio;
			this.scale.x = this._scale1 + (1 - this._scale1) * ratio;
			this.scale.y = this.scale.x;
			this.opacity = this._fadeIn ? 255 * ratio : 255;
		}
		this.applySettings();

		if (!this.isAnimating()) {
			this.onAnimationOver();
		}
	}
};

Achievement_PopUp.prototype.updateTimer = function() {
	if (this.isTimerWait()) {
		if (--this._timer <= 0) {
			this.onTimerOver();
		}
		$gameSystem.achievPopUp.timer = this._timer;
	}
};

Achievement_PopUp.prototype.updateShowing = function() {
	this._queue = $gameSystem.achievPopUp.queue;
	if (this.isQueueBusy() && !this.isAnimating() && !this.isTimerWait()) {
		this.show();
	}
};

//========================================
// Pop Up - Refresh

Achievement_PopUp.prototype.refresh = function() {
	if (!SMO.AM.isAchievementsScene()) return;
	if (!SceneManager._scene.isEditing()) return;
	this.drawMe(1);
};

Achievement_PopUp.prototype.onResize = function() {
	var Editor = SceneManager._scene._achievenator;
	var achievementId = Editor && Editor._popUpAchievId > -1 ? Editor._popUpAchievId + 1 : null;
	this.initBitmap();
	this.drawMe(achievementId);
};

Achievement_PopUp.prototype.refreshPosition = function() {
	var PopUp = this;
	var settings = $dataAchievsMenu.PopUp;
	try {
		this.x = Math.floor(eval(settings.x) + eval(settings.width)/2);
		this.y = Math.floor(eval(settings.y) + eval(settings.height)/2);
	} catch (e) {
		this.x = 0;
		this.y = 0;
		console.error("Error on your Pop Up's X or Y settings.");
		console.error(e);
	} finally {
		this._x0 = this.x;
		this._y0 = this.y;
	}
};

Achievement_PopUp.prototype.refreshAnimationRatio = function(isOutAnimation) {
	switch ($dataAchievsMenu.PopUp.easing) {
	case 'Custom':
		var settings = $dataAchievsMenu.PopUp;
		var custom = isOutAnimation ? settings.customEasingOut : settings.customEasingIn;
		var match = custom.match(/{((.|\s)+)}/);
		if (match && match[1]) {
			var body = "var pow = Math.pow;	var sin = Math.sin;	var cos = Math.cos;	var PI = Math.PI;";
			body += match[1];
			var easeFunction = new Function('x', body);
			this.getAnimationRatio = function() {
				return easeFunction(this._animCount / this._maxAnimCount);
			};
		} else {
			console.warn("There's something wrong in your custom ease script, check the plugin's help section.");
			this.getAnimationRatio = function() {
				return this._animCount / this._maxAnimCount;
			};
		}
		break;
	case 'Quadratic':
		if (isOutAnimation) {
			this.getAnimationRatio = function() {
				return SMO.AM.easeInQuad(this._animCount / this._maxAnimCount);
			};
		} else {
			this.getAnimationRatio = function() {
				return SMO.AM.easeOutQuad(this._animCount / this._maxAnimCount);
			};
		}
		break;
	case 'Cubic':
		if (isOutAnimation) {
			this.getAnimationRatio = function() {
				return SMO.AM.easeInCubic(this._animCount / this._maxAnimCount);
			};
		} else {
			this.getAnimationRatio = function() {
				return SMO.AM.easeOutCubic(this._animCount / this._maxAnimCount);
			};
		}
		break;
	case 'Back':
		if (isOutAnimation) {
			this.getAnimationRatio = function() {
				return SMO.AM.easeInBack(this._animCount / this._maxAnimCount);
			};
		} else {
			this.getAnimationRatio = function() {
				return SMO.AM.easeOutBack(this._animCount / this._maxAnimCount);
			};
		}
		break;
	default:
		this.getAnimationRatio = function() {
			return this._animCount / this._maxAnimCount;
		};
		break;
	}
};

//========================================
// Pop Up - Draw

Achievement_PopUp.prototype.drawMe = function(achievementId) {
	var Data = $dataAchievements;
	var Achievement = achievementId ? Data[achievementId - 1] : Data[this._queue[0] - 1];
	if (!Achievement) return;
	this.bitmap.clear();
	var width = this.bitmap.width;
	var height = this.bitmap.height;
	var popUpImg = Achievement.popUpImage || Achievement.backgroundImage;

	//Drawing background
	var category = $dataAchievsCategories.find(c => c.name === Achievement.category) || {};
	var isCategoryAutoColor = category.autoColor && category.autoColor.color && category.autoColor.popUpBorders;
	var autoColor = isCategoryAutoColor ? category.autoColor : SMO.AM.getAutoColorFromItemImage(Achievement);
	var isAutoColor = autoColor.color && autoColor.popUpBorders;
	var bdColor = isAutoColor ? autoColor.color : $dataAchievsMenu.PopUp.borderColor;
	var bdSize = $dataAchievsMenu.PopUp.borderSize;
	popUpImg = popUpImg ? `achievements/${popUpImg}` : '';
	var y = 0;
	if (height % 2) {
		//Combining the anchor at 0.5 and odd heights makes the first pixel disappear and doubles the last one
		//that's why we need to skip those, this can make an even number like 106 actually bigger than 107
		y = 1;
		height -= 2;
	}
	this.bitmap.drawBorderedRect(0, y, width, height, bdSize, bdColor, 'rgba(20,20,20,0.8)', popUpImg);

	//Drawing text
	if ($dataAchievsMenu.PopUp.text) {
		var text = $dataAchievsMenu.PopUp.text;
		if (SMO.AM.translationEngine.on) {
			try {
				text = JSON.parse(SMO.AM.translate(text));
			} catch (e) {
				console.error("Bad formatting on the translation of your Pop Up's text.");
				console.error(e);
			}
		}
		text = this.convertPopUpTextCodes(text, Achievement);
		this.drawTextEx(text, 6, 5);
	}
};

Achievement_PopUp.prototype.drawText = function(text, x, y, maxWidth, maxHeight, align) {
	if (this.bitmap) {
		this.bitmap.drawText(text, x, y, maxWidth, maxHeight, align);
	}
};

Achievement_PopUp.prototype.drawTextEx = function(text, x, y) {
	if (!this.bitmap || !text) return 0;
	var lines = text.split('\n');
	var xOffSet = [];
	var lineSize = 0;
	var keepFont = false;
	this.resetFontSettings();
	var font = {
		size: this.bitmap.fontSize,
		face: this.bitmap.fontFace,
		rate: 4,
		keep: keepFont
	};
	//Calculating the align offset
	for (var l = 0; l < lines.length; l++) {
		var line = lines[l];
		line = line.replace(/\\FC\[.*?\]/g, '');
		if (line.toLowerCase().indexOf('<center>') > -1) {
			font.keep = keepFont;
			line = line.replace(/<center>/i, '');
			lineSize = SMO.AM.textWidthEx(line, font, false);
			keepFont = true;
			xOffSet.push(Math.floor((this.width - lineSize) / 2) - x - 2);
		} else if (line.toLowerCase().indexOf('<right>') > -1) {
			font.keep = keepFont;
			line = line.replace(/<right>/i, '');
			lineSize = SMO.AM.textWidthEx(line, font, false);
			keepFont = true;
			xOffSet.push(this.width - lineSize - x - 6);
		} else {
			lineSize = 0;
			xOffSet.push(lineSize);
		}
	}
	text = this.removeAlignTexts(text);

	//Drawing the texts
	var textState = { index: 0, x: x, y: y, left: x, xOffSet: xOffSet, lineIndex: 0 };
	textState.text = this.convertEscapeCharacters(text);
	textState.height = SMO.AM.textStateHeight(textState, this.bitmap.fontSize, false);
	while (textState.index < textState.text.length) {
		this.processCharacter(textState);
	}
	return textState.x - x;
};

Achievement_PopUp.prototype.drawIcon = function(iconIndex, x, y) {
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
};

//========================================
// Pop Up - Settings

Achievement_PopUp.prototype.defineSetting = function(parameter, value, refresh) {
	if (value == null) return;
	if ($dataAchievsMenu.PopUp[parameter] == null) return;
	$dataAchievsMenu.PopUp[parameter] = value;
	if (refresh) {
		if (parameter === 'x' || parameter === 'y') {
			this.refreshPosition();
		} else if (parameter === 'width' || parameter === 'height') {
			this[parameter] = eval(value);
			this.initBitmap();
			this.refresh();
		} else {
			this.refresh();
		}
	}
};

Achievement_PopUp.prototype.standardFontFace = function() {
	var ff = $dataAchievsMenu.PopUp.fontFace;
	return ff || Window_Base.prototype.standardFontFace.call(this);
};

Achievement_PopUp.prototype.standardFontSize = function() {
	return $dataAchievsMenu.PopUp.fontSize || 18;
};

Achievement_PopUp.prototype.resetFontSettings = function() {
	this.bitmap.fontFace = this.standardFontFace();
	this.bitmap.fontSize = this.standardFontSize();
	this.bitmap.outlineColor = 'rgba(0, 0, 0, 0.5)';
	this.bitmap.outlineWidth = 4;
	this.bitmap.fontBold = false;
	this.bitmap.fontItalic = false;
	this.bitmap.textColor = SMO.AM.getTextColor(0);
};

//========================================
// Pop Up - On Action

Achievement_PopUp.prototype.onClick = function() {
	if (!$dataAchievsMenu.PopUp.button) return;
	if (this.opacity > 0) {
		if (SceneManager._scene instanceof Scene_Title) return;
		if (SceneManager._scene instanceof Scene_Achievements) return;
		if (Imported.AlphaABS && uAPI.isBattle) {
			AlphaABS.BattleManagerABS.alertNoInBattle();
			AlphaABS.BattleManagerABS.warning(1);
			return;
		}
		if (!$gamePlayer.canMove()) return;
		if (!this._queue[0]) return;
		var achievement = $gameSystem.achievement(this._queue[0]);
		if (achievement) {
			var categoryName = achievement.category;
			var category = $dataAchievsCategories.find(c => c.name === categoryName);
			SMO.AM.currentCategory = category || { id: 0 };
			if (category) {
				var data = SMO.AM.getNonHiddenAchievsByCategory(SMO.AM.currentCategory.name);
			} else {
				var data = $dataAchievements.clone();
			}
			data = Window_Achievements.prototype.sortData(data, $gameSystem.achievsSortType);
			$dataAchievsMenu.PopUp.preselect = data.indexOf(achievement);
			$dataAchievsMenu.PopUp.isClickTriggered = true;
			SoundManager.playOk();
			SMO.AM.showAchievements();
		}		
	}
};

//========================================
// Pop Up - Other

Achievement_PopUp.prototype.startAnimation = function(isOutAnimation) {
	this.refreshAnimationRatio(isOutAnimation);
	var x0 = this._x0;
	var y0 = this._y0;
	var r = this._scaleVariation; //ratio used for the size change
	if (isOutAnimation) {
		var move = $dataAchievsMenu.PopUp.moveOut;
		var size = $dataAchievsMenu.PopUp.sizeOut;
		this._x1 = move === 'Rightwards' ? x0+this.width : move === 'Leftwards' ? x0-this.width : x0;
		this._y1 = move === 'Downwards' ? y0+this.height : move === 'Upwards' ? y0-this.height : y0;
		this._scale1 = size === 'Size increase' ? 1+r : size === 'Size decrease' ? 1-r : 1;
		this._fadeOut = $dataAchievsMenu.PopUp.fading;
		this._fadeOut = this._fadeOut === 'Fade Out' || this._fadeOut === 'Fade In and Out';
		this._isOutAnim = true;
	} else {
		var move = $dataAchievsMenu.PopUp.moveIn;
		var size = $dataAchievsMenu.PopUp.sizeIn;
		this._x1 = move === 'Rightwards' ? x0-this.width : move === 'Leftwards' ? x0+this.width : x0;
		this._y1 = move === 'Downwards' ? y0-this.height : move === 'Upwards' ? y0+this.height : y0;
		this._scale1 = size === 'Size increase' ? 1-r : size === 'Size decrease' ? 1+r : 1;
		this._fadeIn = $dataAchievsMenu.PopUp.fading;
		this._fadeIn = this._fadeIn === 'Fade In' || this._fadeIn === 'Fade In and Out';
		this._isOutAnim = false;
	}

	this._animCount = 0;
	this._timer = this._testing ? 50 : this._timerX;
};

Achievement_PopUp.prototype.restoreAnimation = function() {
	this.refreshAnimationRatio(this._isOutAnim);
	var x0 = this._x0;
	var y0 = this._y0;
	var r = this._scaleVariation;
	if (this._isOutAnim) {
		var move = $dataAchievsMenu.PopUp.moveOut;
		var size = $dataAchievsMenu.PopUp.sizeOut;
		this._x1 = move === 'Rightwards' ? x0+this.width : move === 'Leftwards' ? x0-this.width : x0;
		this._y1 = move === 'Downwards' ? y0+this.height : move === 'Upwards' ? y0-this.height : y0;
		this._scale1 = size === 'Size increase' ? 1+r : size === 'Size decrease' ? 1-r : 1;
		this._fadeOut = $dataAchievsMenu.PopUp.fading;
		this._fadeOut = this._fadeOut === 'Fade Out' || this._fadeOut === 'Fade In and Out';
		this._isOutAnim = true;
	} else {
		var move = $dataAchievsMenu.PopUp.moveIn;
		var size = $dataAchievsMenu.PopUp.sizeIn;
		this._x1 = move === 'Rightwards' ? x0-this.width : move === 'Leftwards' ? x0+this.width : x0;
		this._y1 = move === 'Downwards' ? y0-this.height : move === 'Upwards' ? y0+this.height : y0;
		this._scale1 = size === 'Size increase' ? 1-r : size === 'Size decrease' ? 1+r : 1;
		this._fadeIn = $dataAchievsMenu.PopUp.fading;
		this._fadeIn = this._fadeIn === 'Fade In' || this._fadeIn === 'Fade In and Out';
		this._isOutAnim = false;
	}
};

Achievement_PopUp.prototype.isAnimating = function() {
	if (this._animCount < 0) {
		this._animCount = this._maxAnimCount;
	}
	return this._animCount < this._maxAnimCount;
};

Achievement_PopUp.prototype.onAnimationOver = function() {
	if (this._isOutAnim) {
		this.opacity = 0;
		this._queue = $gameSystem.achievPopUp.queue;
		this._queue.splice(0, 1);
		this.x = this._x0;
		this.y = this._y0;
		this.scale.x = 1;
		this.scale.y = 1;
		this._testing = false;
		this._isOutAnim = false;
		this.applySettings();
	}
};

//Method: "getAnimationRatio"
// * Returns the animation rate based on the easing function
// * It's rewritten inside the "refreshAnimationRatio" function
Achievement_PopUp.prototype.getAnimationRatio = function() {};

//Restores the pop up settings from the previous scene
Achievement_PopUp.prototype.restore = function() {
	var Data = $gameSystem.achievPopUp;
	if (!Data || !Data.queue || Data.queue.length === 0) return; //There's no data to be restored
	if (!this.isAllowed()) return;
	var Achievement = $dataAchievements[Data.queue[0]-1];
	this._animCount = Data.animCount;
	this._isOutAnim = Data.isOutAnim;
	this.opacity = Data.opacity;
	this._timer = Data.timer;
	this._queue = Data.queue;
	this.restoreAnimation();
};

Achievement_PopUp.prototype.isEditing = function() {
	if (this._testing) return false;
	var scene = SceneManager._scene;
	if (scene._achievenator) {
		var editor = scene._achievenator._achievementEditor;
		return scene.isEditing() && (!editor || !editor.visible);
	}
	return false;
};

Achievement_PopUp.prototype.clear = function() {
	this.clearPreviousData();
	this.opacity = 0;
	this._timer = 0;
	this._queue = [];
	this.x = this._x0;
	this.y = this._y0;
	this.scale.x = 1;
	this.scale.y = 1;
	this._testing = false;
	this._isOutAnim = false;
	this._animCount = this._maxAnimCount;
	this.applySettings();
};

Achievement_PopUp.prototype.clearPreviousData = function() {
	$gameSystem.achievPopUp = {
		opacity: 0,
		animCount: -1,
		isOutAnim: false,
		timer: 0,
		queue: []
	};
};

Achievement_PopUp.prototype.isButtonTouched = function() {
	var x = this.canvasToLocalX(TouchInput.x) + this.width * this.anchor.x;
	var y = this.canvasToLocalY(TouchInput.y) + this.height * this.anchor.y;
	return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Achievement_PopUp.prototype.isQueueBusy = function() {
	return this._queue.length > 0;
};

Achievement_PopUp.prototype.isBusy = function() {
	return this.isAnimating() || this.isTimerWait();
};

Achievement_PopUp.prototype.isTimerWait = function() {
	return this._timer > 0 && !this.isAnimating();
};

Achievement_PopUp.prototype.onTimerOver = function() {
	if ($gameSystem.achievPopUp._queue_wait) {
		delete $gameSystem.achievPopUp._queue_wait;
	} else {
		this.hide();
	}
	this._timer = 0;
};

Achievement_PopUp.prototype.isAllowed = function() {
	var scene = SceneManager._scene;
	if (!SMO.AM.isGlobalMode) {
		if (scene instanceof Scene_Title) return false;
		if (scene instanceof Scene_Load) return false;
	}
	return true;
};

Achievement_PopUp.prototype.show = function() {
	if (!this.canShow()) return;

	// Get the first achievement that has it's pop up ready and show it
	this._queue = $gameSystem.achievPopUp.queue;
	for (var q = 0; q < this._queue.length; q++) {
		var Achievement = $dataAchievements[this._queue[q] - 1];
		if (Achievement.isMyPopUpReady()) {
			break;
		}
	}
	if (q < this._queue.length) {
		// The loaded achievement is passed to the start of the queue
		this._queue = this._queue.splice(q, 1).concat(this._queue);
		this.drawMe(this._queue[0]);
		this.opacity = 1;
		this.startAnimation();
	} else {
		// No achievement has it's pop up ready -> wait 6 frames
		this._timer = 6;
		$gameSystem.achievPopUp._queue_wait = true;
	}
};

Achievement_PopUp.prototype.canShow = function() {
	if (this.isBusy()) {
		if (this._testing) {
			this.skip();
			return true
		}
		return false;
	}
	if (!this.isAllowed()) {
		//It is not allowed on this scene
		this.clearPreviousData();
		return false;
	}
	if ($gameSystem.achievPopUp.queue.length === 0) {
		//Theres no achievement recently unlocked
		return false;
	};

	return true;
};

Achievement_PopUp.prototype.hide = function() {
	this.startAnimation(true);
};

Achievement_PopUp.prototype.convertPopUpTextCodes = function(text, Achievement) {
	if (!text) return '';
	if (!Achievement) return text;
	var iconIndex = Achievement.icon.unlocked > -2 ? Achievement.icon.unlocked : SMO.AM.Icons.unlocked;
	// Get auto color
	var c1 = '', c2 = '', c3 = '', c4 = '';
	var category = $dataAchievsCategories.find(c => c.name === Achievement.category) || {};
	var autoColorByImage = SMO.AM.getAutoColorFromItemImage(Achievement);
	var isCategoryAutoColor = category.autoColor && category.autoColor.color;
	var isCategoryAutoColorA = isCategoryAutoColor && category.autoColor.popUpAchiev;
	var isCategoryAutoColorB = isCategoryAutoColor && category.autoColor.popUpDesc;
	var autoColorA = isCategoryAutoColorA ? category.autoColor : autoColorByImage;
	var autoColorB = isCategoryAutoColorA ? category.autoColor : autoColorByImage;
	// Define flags to apply the auto color later
	if (autoColorA.color && autoColorA.popUpAchiev) {
		c1 = `\\FC[${autoColorA.color}]`;
		c2 = '\\FC[restore]';
	}
	if (autoColorB.color && autoColorB.popUpDesc) {
		c3 = `\\FC[${autoColorB.color}]`;
		c4 = '\\FC[restore]';
	}
	// Replace text codes
	text = text.replace(/<AchievCategory:(\d+)>/gi, function() {
		var index = parseInt(arguments[1]) - 1;
		return SMO.AM.translate(Achievement.categories[index]);
	}.bind(this));
	text = text.replace(/<AchievName>/gi, c1 + SMO.AM.translate(Achievement.name) + c2);
	text = text.replace(/<AchievId>/gi, Achievement.id);
	text = text.replace(/<AchievIcon>/gi, '\\i[' + iconIndex + ']');
	text = text.replace(/<PopUpDesc>/gi, c3 + SMO.AM.translate(Achievement.popUpDesc) + c4);
	return text;
};

Achievement_PopUp.prototype.changeTextColor = function(color) {
	if (this.bitmap) {
		this.bitmap.textColor = color;
	}
};

Achievement_PopUp.prototype.lineHeight = function() {
	return 36;
};

Achievement_PopUp.prototype.removeAlignTexts = function(text) {
	text = text.replace(/<center>/ig, '');
	text = text.replace(/<right>/ig, '');
	return text;
};

Achievement_PopUp.prototype.convertEscapeCharacters = function(text) {
	text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
};

//For compatibility with YEP_MessageCore.js
Achievement_PopUp.prototype.setWordWrap = function(text) {
	return text;
};

Achievement_PopUp.prototype.convertExtraEscapeCharacters = function(text) {
	return Window_Base.prototype.convertExtraEscapeCharacters.call(this, text);
};

Achievement_PopUp.prototype.actorClassName = function(n) {
	return Window_Base.prototype.actorClassName.call(this, n);
};

Achievement_PopUp.prototype.actorNickname = function(n) {
	return Window_Base.prototype.actorNickname.call(this, n);
};

Achievement_PopUp.prototype.partyClassName = function(text) {
	return Window_Base.prototype.partyClassName.call(this, n);
};

Achievement_PopUp.prototype.partyNickname = function(text) {
	return Window_Base.prototype.partyNickname.call(this, n);
};

Achievement_PopUp.prototype.escapeIconItem = function(n, database) {
	return Window_Base.prototype.escapeIconItem.call(this, n, database);
};

Achievement_PopUp.prototype.obtainEscapeString = function(textState) {
	return Window_Base.prototype.obtainEscapeString.call(this, textState);
};

Achievement_PopUp.prototype.processCharacter = function(textState) {
    switch (textState.text[textState.index]) {
    case '\n':
        this.processNewLine(textState);
        break;
    case '\f':
        this.processNewPage(textState);
        break;
    case '\x1b':
        this.processEscapeCharacter(this.obtainEscapeCode(textState), textState);
        break;
    default:
        this.processNormalCharacter(textState);
        break;
    }
};

Achievement_PopUp.prototype.processNewLine = function(textState) {
	textState.x = textState.left;
	textState.y += textState.height;
	textState.lineIndex++;
	textState.height = SMO.AM.textStateHeight(textState, this.bitmap.fontSize, false);
	textState.index++;
};

Achievement_PopUp.prototype.processNormalCharacter = function(textState) {
	var f = {size: this.bitmap.fontSize, face: this.bitmap.fontFace };
	var c = textState.text[textState.index++];
	var w = SMO.AM.textWidthEx(c, f, true);
	var xOffSet = textState.xOffSet[textState.lineIndex] || 0;
	this.bitmap.drawText(c, textState.x + xOffSet, textState.y, this.width/2, textState.height);
	textState.x += w;
};

Achievement_PopUp.prototype.processNewPage = function(textState) {
	textState.index++;
};

Achievement_PopUp.prototype.processEscapeCharacter = function(code, textState) {
	switch (code) {
	case 'C':
		this.bitmap.textColor = SMO.AM.getTextColor(this.obtainEscapeParam(textState));
		break;
	case 'I':
		this.processDrawIcon(this.obtainEscapeParam(textState), textState);
		break;
	case '{':
		this.makeFontBigger();
		break;
	case '}':
		this.makeFontSmaller();
		break;
	case 'FC':
		var color = this.obtainString(textState);
		if (color === 'restore') {
			this.bitmap.textColor = this._fc_restore || this.bitmap.textColor;
			this._fc_restore = null;
		} else {
			this._fc_restore = this.bitmap.textColor;
			this.bitmap.textColor = color;
		}
		break;
	//The ones below are from YEP_MessageCore.js
	case 'MSGCORE':
		if (Imported.YEP_MessageCore) {
			var id = this.obtainEscapeParam(textState);
			if (id === 0) this.resetFontSettings();
			if (id === 1) this.bitmap.fontBold = !this.bitmap.fontBold;
			if (id === 2) this.bitmap.fontItalic = !this.bitmap.fontItalic;
		}
		break;
	case 'FS':
		var size = this.obtainEscapeParam(textState);
		this.bitmap.fontSize = size;
		break;
	case 'FN':
		if (Imported.YEP_MessageCore) {
			var name = this.obtainEscapeString(textState);
			this.bitmap.fontFace = name;
		}
		break;
	case 'OC':
		var id = this.obtainEscapeParam(textState);
		this.bitmap.outlineColor = SMO.AM.getTextColor(id);
		break;
	case 'OW':
		this.bitmap.outlineWidth = this.obtainEscapeParam(textState);
		break;
	}
};

Achievement_PopUp.prototype.processDrawIcon = function(iconIndex, textState) {
	var xOffSet = textState.xOffSet[textState.lineIndex] || 0;
	var yOffSet = -(28 - this.bitmap.fontSize)/2;
	this.drawIcon(iconIndex, textState.x + 2 + xOffSet, textState.y + 2 + yOffSet);
	textState.x += Window_Base._iconWidth + 4;
};

Achievement_PopUp.prototype.makeFontBigger = function() {
	if (this.bitmap.fontSize <= 96) {
		this.bitmap.fontSize += 4;
	}
};

Achievement_PopUp.prototype.makeFontSmaller = function() {
	if (this.bitmap.fontSize >= 4) {
		this.bitmap.fontSize -= 4;
	}
};

Achievement_PopUp.prototype.obtainEscapeCode = function(textState) {
	return Window_Base.prototype.obtainEscapeCode.call(this, textState);
};

Achievement_PopUp.prototype.obtainEscapeParam = function(textState) {
	return Window_Base.prototype.obtainEscapeParam.call(this, textState);
};

Achievement_PopUp.prototype.obtainString = function(textState) {
	var arr = /\[.*?\]/.exec(textState.text.slice(textState.index));
	if (arr) {
		textState.index += arr[0].length;
		return arr[0].slice(1, -1);
	} else {
		return '';
	}
};

Achievement_PopUp.prototype.skip = function() {
	if (this._queue.length === 0) return;
	this._queue.splice(0, 1);
	this.opacity = 0;
	this._timer = 0;
	this.x = this._x0;
	this.y = this._y0;
	this.scale.x = 1;
	this.scale.y = 1;
	this._animCount = this._maxAnimCount;
	this.applySettings();
};

Achievement_PopUp.prototype.applySettings = function() {
	$gameSystem.achievPopUp.animCount = this._animCount;
	$gameSystem.achievPopUp.isOutAnim = this._isOutAnim;
	$gameSystem.achievPopUp.opacity = this.opacity;
	$gameSystem.achievPopUp.timer = this._timer;
	$gameSystem.achievPopUp.queue = this._queue;
};

//==========================================================================================
// Scene Boot
// Load the initial data for the achievements and the menu
// Also gets the translation method
//==========================================================================================
SMO.AM._SceneBoot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function() {
	DataManager.createAchievsEditorFiles();
	SMO.AM._SceneBoot_create.call(this);
};

SMO.AM._SceneBoot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	SMO.AM._SceneBoot_start.call(this);
	DataManager.loadAchievements();
};

//==========================================================================================
// Scene Title
// Adding the title command (on global range only)
//==========================================================================================
if (SMO.AM.isGlobalMode) {

	SMO.AM._SceneTitle_createCommandWindow = Scene_Title.prototype.createCommandWindow;
	Scene_Title.prototype.createCommandWindow = function() {
		SMO.AM._SceneTitle_createCommandWindow.call(this);
		this._commandWindow.setHandler('achievements', this.commandAchievements.bind(this));
	};

	Scene_Title.prototype.commandAchievements = function() {
		this._commandWindow.close();
		SceneManager.push(Scene_Achievements);
	};

	SMO.AM._WindowTitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function() {
		SMO.AM._WindowTitleCommand_makeCommandList.call(this);
		if (SMO.AM.TitleCommand.enabled) {
			var position = SMO.AM.TitleCommand.position - 1;
			var name = SMO.AM.TitleCommand.name;
			this.addCommandWithIndex(name, 'achievements', true, null, position);
		}
	};

}//SMO.AM.isGlobalMode

//==========================================================================================
// Scene Menu
// Adding the menu command
//==========================================================================================
SMO.AM._SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	SMO.AM._SceneMenu_createCommandWindow.call(this);
	this._commandWindow.setHandler('achievements', this.commandAchievements.bind(this));	
};

Scene_Menu.prototype.commandAchievements = function() {
	SceneManager.push(Scene_Achievements);
};

SMO.AM._WindowMenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function() {
	SMO.AM._WindowMenuCommand_makeCommandList.call(this);
	var command = SMO.AM.MenuCommand;
	if (command.enabled) {
		var switchId = command.switchId;
		var condition = switchId ? $gameSwitches.value(switchId) : true;
		var position = command.position - 1;
		var name = command.name;
		if (condition) {
			this.addCommandWithIndex(name, 'achievements', true, null, position);
		}
	}	
};

Window_Command.prototype.addCommandWithIndex = function(name, symbol, enabled, ext, index) {
	if (enabled === undefined) {
		enabled = true;
	}
	if (ext === undefined) {
		ext = null;
	}
	var min = 0;
	var max = this._list.length;
	var position = index.clamp(min, max);
	var command = { name: name, symbol: symbol, enabled: enabled, ext: ext};
	this._list.splice(position, 0, command);
};

//==========================================================================================
// Scene Map
// Avoiding making the player walk after clicking on the pop up
//==========================================================================================
SMO.AM._SceneMap_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
	if (TouchInput.isTriggered() || this._touchCount > 0) {
		if (TouchInput.isPressed()) {
			if (this._touchCount === 0 || this._touchCount >= 15) {
				if (!this.isGrabbingSprite() && !this.isAnySButton(TouchInput.x, TouchInput.y) && !this.isCallingTrigger()) {
					SMO.AM._SceneMap_processMapTouch.call(this);
					this._touchCount--;
				}
			}
			this._touchCount++;
		} else {
			this._touchCount = 0;
		}
	}
};

Scene_Map.prototype.isAnySButton = function(x, y) {
	if ($dataAchievsMenu.PopUp.button && this.isAchievementPopUp(x, y)) return true;
	return this.isHoverAnySButton();
};

Scene_Map.prototype.isAchievementPopUp = function(x, y) {
	var popup = this._achievsPopUp;
	if (!popup) return false;
	if (!popup.isQueueBusy()) return false;
	x += popup.width/2;
	y += popup.height/2;
	if (x >= popup.x && x <= popup.x + popup.width) {
		if (y >= popup.y && y <= popup.y + popup.height) {
			return true;
		}
	}
	return false;
};

//===========================================================================================
// New Scene - Scene Achievements
//===========================================================================================
function Scene_Achievements() {
	this.initialize.apply(this, arguments);
}

Scene_Achievements.prototype = Object.create(Scene_Base.prototype);
Scene_Achievements.prototype.constructor = Scene_Achievements;

Scene_Achievements.prototype.initialize = function() {
	Scene_Base.prototype.initialize.call(this);
	var isEditionEdible = this.isEditionEdible();
	var isCategory = $dataAchievsCategories.length || isEditionEdible;
	var isInfo = $dataAchievsMenu.AchievsInfo.enabled || isEditionEdible;
	var isSort = $dataAchievsMenu.SortOption.enabled || isEditionEdible;
	this.createBackground();
	this.createWindowLayer();
	this.createTitleWindow();
	if (isCategory) {
		this.createCategoriesWindow();
		this.createTrophiesWindow();
	}
	this.createAchievsWindow();
	if (isInfo) {
		this.createInfoWindow();
	}
	if (isSort) {
		this.createSortSprite();
	}
	this.createEditionTool();

	//After clicking on the Pop Up
	if ($dataAchievsMenu.PopUp.isClickTriggered) {
		this._categoriesWindow.deactivate();
		this._achievementsWindow.show();
		if ($dataAchievsMenu.AchievsInfo.enabled) {
			this.onAchievementOk();
		} else {
			this._achievementsWindow.activate();
		}
		this.showSortOption();
		$dataAchievsMenu.PopUp.isClickTriggered = false;
	}

	//When directly opening a category
	if (SMO.AM.currentCategory.id) {
		this.showSortOption();
	}
};

//------------------------------------------------------------------------------------------
// Scene Achievements - Create

Scene_Achievements.prototype.start = function() {
    Scene_Base.prototype.start.call(this); // 调用父类的start方法
	SceneManager._bgmOnSceneStart = AudioManager.saveBgm();  
	SceneManager._bgsOnSceneStart = AudioManager.saveBgs();
	AudioManager.fadeOutBgm(2);
    AudioManager.playBgs({name: 'm-art_DreamFeeling', volume: 90, pitch: 100, pan: 0})
};

Scene_Achievements.prototype.createBackground = function() {
	this._backgroundSprite = new Sprite();
	this.setBackground(SMO.AM.Images.menu);
	this.addChild(this._backgroundSprite);
};

Scene_Achievements.prototype.createTitleWindow = function() {
	this._titleWindow = new Window_SceneName();
	this.addWindow(this._titleWindow);
};

Scene_Achievements.prototype.createCategoriesWindow = function() {
	this._categoriesWindow = new Window_Categories();
	this._categoriesWindow.setHandler('ok', this.onCategoryOk.bind(this));
	this._categoriesWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
	if (!$dataAchievsCategories.length) {
		this._categoriesWindow.deactivate();
	}
	this.addWindow(this._categoriesWindow);
};

Scene_Achievements.prototype.createTrophiesWindow = function() {
	this._trophiesWindow = new Window_Trophies();
	this.addWindow(this._trophiesWindow);
};

Scene_Achievements.prototype.createAchievsWindow = function() {
	this._achievementsWindow = new Window_Achievements();
	this._achievementsWindow.setHandler('ok', this.onAchievementOk.bind(this));
	this._achievementsWindow.setHandler('cancel', this.onAchievementCancel.bind(this));
	this.addWindow(this._achievementsWindow);
	if ($dataAchievsCategories.length) {
		this._achievementsWindow.visible = false;
		this._achievementsWindow.deactivate();
	} else {
		this._achievementsWindow.visible = true;
	}
	if ($dataAchievsMenu.PopUp.preselect >= 0) {
		this._achievementsWindow.select($dataAchievsMenu.PopUp.preselect);
		this._achievementsWindow.deactivate();
	} else {
		this._achievementsWindow.select(0);
	}
};

Scene_Achievements.prototype.createInfoWindow = function() {
	this._infoWindow = new Window_AchievInfo();
	this.addWindow(this._infoWindow);
};

Scene_Achievements.prototype.createSortSprite = function() {
	var Data = $dataAchievsMenu.SortOption;
	var options = Data.options.map(o => o.symbol);
	var sortButton = {
		x: eval(Data.x),
		y: eval(Data.y),
		options: options,
		width: eval(Data.width),
		height: eval(Data.height),
		textOffset: [5, 0],
		listLimit: 8,
		fontFace: Data.fontFace,
		fontSize: Data.fontSize,
		borderSize: Data.borderSize,
		borderColor: Data.borderColor,
		backColor: Data.backgroundColor,
		textColor: Data.textColor,
		itemColors: [Data.backgroundColor, Data.backgroundColor],
		hideSelect: true
	};

	this._sortOption = new Sort_Option(sortButton);
	this.preselectSortOption(options);
	this.addChild(this._sortOption);
	this._sortOption.visible = false;
};

Scene_Achievements.prototype.isEditionEdible = function() {
	return SMO.AM.isEditorAllowed();
};

Scene_Achievements.prototype.createEditionTool = function() {
	this._editMode = false;
	if (!this.isEditionEdible()) {
		this._achievenator = null;
		return;
	}
	var startButtonData = {
		description: "Start the ACHIEVENATOR! [E]\nPress H to show/hide this button",
		text: 'E',
		textAlign: 'center',
		x: Math.floor((Graphics.width - 30) / 2),
		y: 50,
		width: 30,
		height: 30,
		design: 'round-rect',
		borderColor: '#0ad222',
		backColor: '#069517',
		cursorStyle: 'pointer',
		hideSelect: true,
		onClick: this.startAchievenator.bind(this)
	};
	this._editorStartButton = new SButton_Confirm(startButtonData);
	this.addChild(this._editorStartButton);
	this.createWindowSelector();
	this._achievenator = new Achievenator();
	this._achievenator.parentFocus = function() {};
	this.addChild(this._achievenator);
	this.adaptKeyMapper();
};
SMO.AM.TEST = 119;
Scene_Achievements.prototype.createWindowSelector = function() {
	var Data = { width: Graphics.width, height: Graphics.height, borderSize: 5 };
	this._windowSelector = new Sprite_Grabbable(Data);
	this._windowSelector._fixedTone = true;
	this._windowSelector._offScreen.x = 1;
	this._windowSelector._offScreen.y = 1;
	this._windowSelector.setDragLimits();
	this._windowSelector.borders.update = function() {
		Sprite.prototype.update.call(this);
	};
	this._windowSelector.parentFocus = function() {};
	this._windowSelector.update = function() {
		this.updateHoverStyle();
		Sprite_Grabbable.prototype.update.call(this);
		var Editor = SceneManager._scene._achievenator._menuEditor;
		if (Editor && !Editor._isSelectorOpen) {
			this.updateSelectedTone();
			this.updatePreciseMove();
		}
		this.updateMyLayer();
		this.updateSizeChange();
	};
	this._windowSelector.updateHoverStyle = function() {
		if (this._moveType) return false;
		if (!this.visible) return this.cursorStyle = null;
		if (!this._hovered) return this.cursorStyle = null;
		var cursorStyle = this.getBorderHoverStyle() || 'move';
		if (this.cursorStyle === cursorStyle) return false;
		this.cursorStyle = cursorStyle;
		document.body.style.cursor = cursorStyle;
		return true;
	};
	this._windowSelector.getBorderHoverStyle = function() {
		var bds = this.borderSize;
		var x = this.x;
		var y = this.y;
		var width = this._size[0];
		var height = this._size[1];
		if (TouchInput._cX < (x + bds)) {
			if (TouchInput._cY < (y + bds)) return 'nw-resize'; //Top-left corner
			if (TouchInput._cY > (y + height - bds - 1)) return 'sw-resize'; //Bottom-left corner
			return 'w-resize'; //Left border
		}
		if (TouchInput._cX > (x + width - bds - 1)) {
			if (TouchInput._cY < (y + bds)) return 'ne-resize'; //Top-right corner
			if (TouchInput._cY > (y + height - bds - 1)) return 'se-resize'; //Bottom-right corner
			return 'e-resize'; //Right border
		}
		if (TouchInput._cY < (y + bds)) return 'n-resize'; //Top border
		if (TouchInput._cY > (y + height - bds - 1)) return 's-resize'; //Bottom border
		return '';
	};
	this._windowSelector.updateSelectedTone = function() {
		if (this._touching || !this.visible || this.toneFixed) return this.alpha = 1;
		if (this.glow) {
			this.alpha -= 0.02;
			if (this.alpha <= 0.5) {
				this.glow = 0;
			}
		} else {
			this.alpha += 0.02;
			if (this.alpha >= 1) {
				this.glow = 1;
			}
		}
	};
	this._windowSelector.updateGrabbing = function() {
		if (!this.isGrabbed()) return;
		if (!this.visible) {
			return this.onRelease();
		}
		if (this._moveType === 'move') return Sprite_Grabbable.prototype.updateGrabbing.call(this);
		if (!TouchInput.isPressed() || !SceneManager._scene.isGrabbingSprite()) return this.onRelease();
		var width_changed = this.updateWidthChange();
		var height_changed = this.updateHeightChange();
		if (width_changed || height_changed) {
			this.redraw();
		}
	};
	this._windowSelector.updateWidthChange = function() {
		if (this._moveType === 'n-resize' || this._moveType === 's-resize') return false;
		var spot = SceneManager._scene.SButtons._grabbing; //Clicked spot
		var borders = 10 + this.borderSize * 2;
		var width = this._size[0];
		var x = this.x;
		if (this._moveType === 'e-resize' || this._moveType === 'ne-resize' || this._moveType === 'se-resize') {
			width += TouchInput._cX - this.x - spot.x;
		} else { // w-resize, nw-resize or sw-resize
			x = TouchInput._cX - spot.x;
			width += this._position[0] - x;
		}
		if (this.width === width) return false;
		if (width >= borders) {
			this.x = x;
			this.width = width;
			return true;
		} else if (this.width > borders) {
			this.x = Math.min(x, this._position[0] + this._size[0] - borders);
			this.width = borders;
			return true;
		}
		return false;
	};
	this._windowSelector.updateHeightChange = function() {
		if (this._moveType === 'w-resize' || this._moveType === 'e-resize') return false;
		var spot = SceneManager._scene.SButtons._grabbing;
		var borders = 10 + this.borderSize * 2;
		var height = this.height;
		var y = this.y;
		if (this._moveType === 's-resize' || this._moveType === 'sw-resize' || this._moveType === 'se-resize') {
			height = (TouchInput._cY - this.y) + this._size[1] - spot.y;
		} else { // 'w-resize', 'nw-resize' or 'sw-resize'
			y = TouchInput._cY - spot.y;
			height = this._size[1] + this._position[1] - y;
		}
		height = Math.max(borders, height);
		if (this.height === height) return false;
		if (height >= borders) {
			this.y = y;
			this.height = height;
			return true;
		} else if (this.height > borders) {
			this.y = Math.min(y, this._position[1] + this._size[1] - borders);
			this.height = borders;
			return true;
		}
		return false;
	};
	this._windowSelector.updatePreciseMove = function() {
		if (!this.visible) return;
		if (this.isGrabbed()) return;
		if (SceneManager._scene.isSelecting() || SceneManager._scene.isTextInputSelected()) return;
		var Editor = SceneManager._scene._achievenator._menuEditor;
		if (Editor._isSelectorOpen) return;
		var movedX = false;
		var movedY = false;
		if (Input.isRepeated('left')) {
			this.x--;
			movedX = true;
		}
		if (Input.isRepeated('up')) {
			this.y--;
			movedY = true;
		}
		if (Input.isRepeated('right')) {
			this.x++;
			movedX = true;
		}
		if (Input.isRepeated('down')) {
			this.y++;
			movedY = true;
		}
		if (!movedX && !movedY) return;
		if (movedX) {
			this.selected.defineSetting('x', this.x, true);
		}
		if (movedY) {
			this.selected.defineSetting('y', this.y, true);
		}
		Editor.redrawPositionAndSizeInfo();
	};
	this._windowSelector.updateMyLayer = function() {
		//Making sure the selector is above the pop up
		if (this._layerUpdated > 1) return;
		this._layerUpdated = this._layerUpdated || 0;
		this._layerUpdated++;
		if (this._layerUpdated < 2) return;
		if (this.parent._achievsPopUp) {
			var index = this.parent.getChildIndex(this.parent._achievsPopUp);
			this.parent.setChildIndex(this, index + 1);
		}
	};
	this._windowSelector.updateSizeChange = function() {
		if (this.width > this.bitmap.width || this.height > this.bitmap.height) {
			var width = this.width + 200;
			var height = this.height + 200;
			this.bitmap.resize(width, height);
			this._refresh();
			this.borders.bitmap.resize(width, height);
			this.borders._refresh();
			this.setGrabBox(0, 0, width, height);
			this.redraw();
		}
	};
	this._windowSelector.onGrab = function() {
		Sprite_Grabbable.prototype.onGrab.call(this);
		this._moveType = this.cursorStyle;
	};
	this._windowSelector.onRelease = function() {
		Sprite_Grabbable.prototype.onRelease.call(this);
		if (!this._moveType) return;
		var x_changed = this.x != this.selected.x;
		var y_changed = this.y != this.selected.y;
		var width_changed = this.width != this.selected.width;
		var height_changed = this.height != this.selected.height;
		var Editor = SceneManager._scene._achievenator._menuEditor;
		this._moveType = null;
		if (width_changed) {
			this.selected.defineSetting('width', this.width, true);
		}
		if (height_changed) {
			this.selected.defineSetting('height', this.height, true);
		}

		if (x_changed) {
			this.selected.defineSetting('x', this.x, true);
		}
		if (y_changed) {
			this.selected.defineSetting('y', this.y, true);
		}
		Editor.redrawPositionAndSizeInfo();
		this.refreshDefaultPosition();
		this.refreshDefaultSize();
	};
	this._windowSelector.refreshDefaultPosition = function() {
		this._position = [this.x, this.y];
	};
	this._windowSelector.refreshDefaultSize = function() {
		this._size = [this.width, this.height];
	};
	this._windowSelector.onMoved = function() {
		var selected = this.selected;
		var moved = selected.x !== this.x || selected.y !== this.y;
		if (!moved) return;
		selected.defineSetting('x', this.x, true);
		selected.defineSetting('y', this.y, true);
		var Editor = SceneManager._scene._achievenator._menuEditor;
		Editor.redrawPositionAndSizeInfo();
	};
	this._windowSelector.onMouseLeave = function() {
		Sprite_Grabbable.prototype.onMouseLeave.call(this);
		document.body.style.cursor = '';
	};
	this._windowSelector.drawMe = function(start) {
		if (!this.selected) return;
		var bds = this.borderSize;
		var c1 = '#ffffff'; //border color
		var c2 = 'rgba(255, 255, 255, 0.2)'; //background color
		this.bitmap.drawBorderedRect(0, 0, this.width, this.height, bds, c1, c2);
	};
	this._windowSelector.visible = false;
	this.addChild(this._windowSelector);
};

Scene_Achievements.prototype.selectWindow = function(selected, name) {
	if (!selected) return;
	var px = selected.anchor ? Math.floor(selected.x - selected.width * selected.anchor.x) : selected.x;
	var py = selected.anchor ? Math.floor(selected.y - selected.height * selected.anchor.y) : selected.y;
	this._windowSelector.selected = selected;
	this._windowSelector.selectedName = name;
	this._windowSelector.width = selected.width;
	this._windowSelector.height = selected.height;
	this._windowSelector._position = [px, py];
	this._windowSelector._size = [selected.width, selected.height];
	this._windowSelector.x = selected.x;
	this._windowSelector.y = selected.y;
	this._windowSelector.redraw();
	if (!this._windowSelector.hidding) {
		this._windowSelector.visible = true;
	}
};

Scene_Achievements.prototype.deselectWindow = function() {
	this._windowSelector.selected = null;
	this._windowSelector.visible = false;
};

//------------------------------------------------------------------------------------------
// Scene Achievements - Update

Scene_Achievements.prototype.update = function() {
	Scene_Base.prototype.update.call(this);
	this.updateTriggers();
};

Scene_Achievements.prototype.updateTriggers = function() {
	var onChange = false;
	if (this._achievenator) {
		if (this.canStartEditor()) {
			if (Input.isTriggered('e')) {
				return this.startAchievenator();
			}
			if (Input.isTriggered('h')) {
				this._editorStartButton.visible = !this._editorStartButton.visible;
			}
		}
	}

	if (this.isEditing()) return;

	if (this._infoWindow && this._infoWindow.isOpen()) {
		if (Input.isTriggered('ok') || Input.isTriggered('cancel') || 
			TouchInput.isCancelled()) {
			SoundManager.playCancel();
			return this.onAchievementOk();
		}
	} else {
		if (this._trophiesWindow && this._trophiesWindow.visible) {
			if (TouchInput.isTriggered()) {
				var buttonName = this.getButtonOnClick();
				if (buttonName) {
					this._trophiesWindow.onClick(buttonName);
				}
			}
			if (Input.isRepeated('left')) {
				this._trophiesWindow.selectSlot(this._trophiesWindow._selected - 1);
			} else if (Input.isRepeated('right')) {
				this._trophiesWindow.selectSlot(this._trophiesWindow._selected + 1);
			}
		}
	}
};

Scene_Achievements.prototype.canStartEditor = function() {
	return !this._achievenator.isAnimating() && !this.isEditing();
};

Scene_Achievements.prototype.getButtonOnClick = function() {
	var x = TouchInput._x - this._trophiesWindow.x;
	var y = TouchInput._y - this._trophiesWindow.y;
	var buttons = this._trophiesWindow.buttons;
	var button;
	for (var i in buttons) {
		button = buttons[i];
		if (x >= button.x1 && x <= button.x2 && y >= button.y1 && y <= button.y2) {
			return i;
		}
	}
	return '';
};

//------------------------------------------------------------------------------------------
// Scene Achievements - Refresh

//Refreshing all windows completely
Scene_Achievements.prototype.fullRefresh = function() {
	this._windowLayer.children.forEach(function(w) {
		if (w.refresh) {
			w.refresh();
		};
	});
};

//Refreshing all windows, but only important stuff
Scene_Achievements.prototype.easyRefresh = function(isUnlock) {
	if (!this._achievementsWindow) return;

	if (this._achievementsWindow.active) {
		this._achievementsWindow.easyRefresh();
	}

	if (this._categoriesWindow.active) {
		this._categoriesWindow.easyRefresh(isUnlock);
	}

	this._trophiesWindow.easyRefresh(isUnlock);

	if (this._infoWindow.isOpen()) {
		this._infoWindow.easyRefresh(isUnlock);
	}
};

Scene_Achievements.prototype.refreshDrawnImages = function() {
	if (this._achievementsWindow.visible) {
		this._achievementsWindow.refresh();
	}
	if (this._categoriesWindow && this._categoriesWindow.visible) {
		this._categoriesWindow.refresh();
	}
	if (this._trophiesWindow && this._trophiesWindow.visible) {
		this._trophiesWindow.refresh();
	}
};

//------------------------------------------------------------------------------------------
// Scene Achievements - Key Mapper

//Adding shortcuts to the key mapper
Scene_Achievements.prototype.adaptKeyMapper = function() {
	this._keyMapperBackup = {};
	for (var k in Input.keyMapper) {
		this._keyMapperBackup[k] = Input.keyMapper[k];
	}
	Input.keyMapper[46] = 'delete';
	Input.keyMapper[49] = '1';
	Input.keyMapper[50] = '2';
	Input.keyMapper[51] = '3';
	Input.keyMapper[69] = 'e';
	Input.keyMapper[72] = 'h';
	Input.keyMapper[83] = 's';
};

//Restoring the key mapper's shortcuts
Scene_Achievements.prototype.restoreKeyMapper = function() {
	if (!this._keyMapperBackup) return;
	for (var k in this._keyMapperBackup) {
		Input.keyMapper[k] = this._keyMapperBackup[k];
	}
};

//------------------------------------------------------------------------------------------
// Scene Achievements - On Action

Scene_Achievements.prototype.onCategoryOk = function() {
	var index = this._categoriesWindow.index();
	var item = this._categoriesWindow._data[index];
	if (!item) return;
	this.setCurrentCategory(item);
	this._achievementsWindow._scrollY = 0;
	this._achievementsWindow.show();
	this._achievementsWindow.activate();
	this._trophiesWindow.hide();
	this.showSortOption();
	if (SMO.AM.currentCategory.menuImg) {
		this.setBackground(SMO.AM.currentCategory.menuImg);
	}
	this.fullRefresh();
};

Scene_Achievements.prototype.onCategoryCancel = function() {
	SceneManager.pop();
};

Scene_Achievements.prototype.onAchievementOk = function() {
	var index = this._achievementsWindow.index();
	var item = this._achievementsWindow._data[index];
	if (!item) return;
	if (!$dataAchievsMenu.AchievsInfo.enabled) {
		if (item.isRewardAvailable()) {
			item.gainRewards();
		}
		this._achievementsWindow.redrawCurrentItem();
		this._achievementsWindow.activate();
	} else if (this._infoWindow.isOpen()) {
		this._infoWindow.close();
		this._achievementsWindow.easyRefresh();
		this._achievementsWindow.activate();
	} else {
		this._infoWindow.open(item);
		if (item.isRecent()) {
			var dynamic = SMO.AM.DataDynamic.achievs[item.id-1];
			dynamic.state = dynamic.state === 1 ? 2 : 3;
			DataManager.saveGlobalAchievements();
			this._achievementsWindow.redrawCurrentItem();
		}
	}
};

Scene_Achievements.prototype.onAchievementCancel = function() {
	if (!$dataAchievsCategories.length) {
		this.onCategoryCancel();
		return;
	}
	this.clearRecentUnlock();
	this.hideSortOption();
	this.setCurrentCategory();
	this._achievementsWindow.select(0);
	$dataAchievsMenu.PopUp.preselect = -1;
	this.setBackground(SMO.AM.Images.menu);
	this.fullRefresh();
	this._trophiesWindow.show();
	this._achievementsWindow.hide();
	this._categoriesWindow.activate();
};

//------------------------------------------------------------------------------------------
// Scene Achievements - Background

Scene_Achievements.prototype.setBackground = function(filename) {
	var background = this._backgroundSprite;
	if (background._bitmap && filename && this.isBackgroundName(filename)) return;
	background.bitmap = filename ? ImageManager.loadAchievement(filename) : SceneManager.backgroundBitmap();
};

Scene_Achievements.prototype.isBackgroundName = function(filename) {
	var url = this._backgroundSprite._bitmap._url.replace('.png', '');
	var backname = url.slice(url.lastIndexOf('/') + 1);
	return url ? filename === backname : !filename;
};

//------------------------------------------------------------------------------------------
// Scene Achievements - Others

Scene_Achievements.prototype.startAchievenator = function() {
	if (this._sortOption) {
		this._sortOption.close();
	}
	this._achievenator._startButtonState = this._editorStartButton.visible;
	this._editorStartButton.visible = false;
	this._achievenator.open();
};

Scene_Achievements.prototype.preselectSortOption = function(options) {
	if ($gameSystem.achievsSortType < options.length) {
		this._sortOption.selectItem($gameSystem.achievsSortType);
	} else {
		$gameSystem.achievsSortType = Math.max(0, options.length - 1);
	}
};

//Check if the editor is open
Scene_Achievements.prototype.isEditing = function() {
	return this._editMode;
};

//Is the player seeing the categories list?
Scene_Achievements.prototype.isCategoriesList = function() {
	return !SMO.AM.currentCategory.id;
};

//Remove recently unlocked achievements when leaving a category's page
Scene_Achievements.prototype.clearRecentUnlock = function() {
	if (!SMO.AM.currentCategory.id) return;
	var Achievements = SMO.AM.getAchievsByCategory(SMO.AM.currentCategory.name);
	Achievements.forEach(function(achievement) {
		if (achievement.isRecent()) {
			var dynamic = SMO.AM.DataDynamic.achievs[achievement.id-1];
			dynamic.state = dynamic.state === 1 ? 2 : 3;
		}
	});
	DataManager.saveGlobalAchievements();
};

Scene_Achievements.prototype.showSortOption = function() {
	if (this._sortOption) {
		this._sortOption.show();
	}
};

Scene_Achievements.prototype.hideSortOption = function() {
	if (this._sortOption) {
		this._sortOption.hide();
	}
};

Scene_Achievements.prototype.setCurrentCategory = function(categoryName) {
	if (!categoryName) {
		return SMO.AM.currentCategory = { id: 0 };
	}
	return SMO.AM.currentCategory = $dataAchievsCategories.find(c => c.name === categoryName);
};

//Check if all images are ready
Scene_Achievements.prototype.isReady = function() {
	var ready = Scene_Base.prototype.isReady.call(this);
	return ready && ImageManager.isAchievementsReady();
};

//Make sure the key mapper is restored before leaving the scene
Scene_Achievements.prototype.terminate = function() {
	this.restoreKeyMapper();
	ImageManager.releaseReservation('achievs');
	Scene_Base.prototype.terminate.call(this);
	AudioManager.stopBgs();  // 停止当前BGM
    AudioManager.replayBgm(SceneManager._bgmOnSceneStart);
	AudioManager.replayBgs(SceneManager._bgsOnSceneStart);
	AudioManager.fadeInBgm(2);
};

//==========================================================================================
// SceneName Window
//==========================================================================================
function Window_SceneName() {
	this.initialize.apply(this, arguments);
}

Window_SceneName.prototype = Object.create(Window_Base.prototype);
Window_SceneName.prototype.constructor = Window_SceneName;

Window_SceneName.prototype.initialize = function() {
	var SceneName = $dataAchievsMenu.SceneName;
	var x = eval(SceneName.x);
	var y = eval(SceneName.y);
	var width = eval(SceneName.width);
	var height = eval(SceneName.height);
	
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.opacity = SceneName.opacity;
	this.drawSceneName();
};

//------------------------------------------------------------------------------------------
// Window SceneName - Create

Window_SceneName.prototype.createContents = function() {
	Window_Base.prototype.createContents.call(this);
	this.drawSceneName();
};

//------------------------------------------------------------------------------------------
// Window SceneName - Refresh

Window_SceneName.prototype.refresh = function() {
	this.resetFontSettings()
	this.drawSceneName();
};

//------------------------------------------------------------------------------------------
// Window SceneName - Draw

Window_SceneName.prototype.drawSceneName = function() {
	var category = SMO.AM.currentCategory;
	var title = $dataAchievsMenu.SceneName.title;
	var name = category.id ? category.sceneName || title : title;
	name = SMO.AM.translate(name);

	var x = 0;
	var y = 0;
	var maxWidth = this.contentsWidth();
	this.contents.clear();
	this.applyAutoColor();
	this.drawText(name, x, y, maxWidth, 'center');
};

SMO.AM._WindowSceneName_drawText = Window_SceneName.prototype.drawText;
Window_SceneName.prototype.drawText = function(text, x, y, maxWidth, align) {
	SMO.AM._WindowSceneName_drawText.call(this, text, x, y, maxWidth, align);
	this.clearAutoColor();
};

//------------------------------------------------------------------------------------------
// Window SceneName - Auto Color

Window_SceneName.prototype.autoColor = function() {
	if (this.isCategoriesList()) return false;
	var category = SMO.AM.currentCategory;
	var isCategoryAutoColor = category.autoColor && category.autoColor.color && category.autoColor.scene;
	var autoColor = isCategoryAutoColor ? category.autoColor : SMO.AM.getAutoColorFromItemImage(category);
	return autoColor.color && autoColor.scene ? autoColor : null;
};

Window_SceneName.prototype.applyAutoColor = function() {
	var autoColor = this.autoColor();
	if (autoColor) {
		this._lastTextColor = this.contents.textColor;
		this.contents.textColor = autoColor.color;
	} else {
		this.contents.textColor = $dataAchievsMenu.SceneName.textColor;
	}
};

Window_SceneName.prototype.clearAutoColor = function() {
	if (this._lastTextColor) {
		this.contents.textColor = this._lastTextColor;
		delete this._lastTextColor;
	}
};

//------------------------------------------------------------------------------------------
// Window SceneName - Settings

Window_SceneName.prototype.defineSetting = function(parameter, value, refresh) {
	if (value == null) return;
	if ($dataAchievsMenu.SceneName[parameter] == null) return;
	$dataAchievsMenu.SceneName[parameter] = value;
	if (refresh) {
		if (parameter === 'x' || parameter === 'y' || parameter === 'opacity') {
			this[parameter] = eval(value);
		} else if (parameter === 'width' || parameter === 'height') {
			this[parameter] = eval(value);
			this.createContents();
			this.refresh();
		} else if (parameter === 'windowSkin') {
			this.windowskin = ImageManager.loadSystem($dataAchievsMenu.SceneName.windowSkin || 'Window');
		} else {
			this.refresh();
		}
	}
};

Window_SceneName.prototype.getSetting = function(parameter) {
	return $dataAchievsMenu.SceneName[parameter];
};

Window_SceneName.prototype.standardFontFace = function() {
	var ff = $dataAchievsMenu.SceneName.fontFace;
	return ff || Window_Base.prototype.standardFontFace.call(this);
};

Window_SceneName.prototype.standardFontSize = function() {
	var fs = $dataAchievsMenu.SceneName.fontSize;
	return fs || Window_Base.prototype.standardFontSize.call(this);
};

Window_SceneName.prototype.loadWindowskin = function() {
	var skin_name = $dataAchievsMenu.SceneName.windowSkin || 'Window';
	this.windowskin = ImageManager.loadSystem(skin_name);
};

//------------------------------------------------------------------------------------------
// Window SceneName - Others

Window_SceneName.prototype.isCategoriesList = function() {
	return !SMO.AM.currentCategory.id;
};

//==========================================================================================
// Categories Window - Create
//==========================================================================================
function Window_Categories() {
	this.initialize.apply(this, arguments);
}

Window_Categories.prototype = Object.create(Window_Command.prototype);
Window_Categories.prototype.constructor = Window_Categories;

//========================================
// Categories Window - Initialize

Window_Categories.prototype.initialize = function() {
	this._data = [];
	this._name = 'Categories';
	var x = eval($dataAchievsMenu.Categories.x);
	var y = eval($dataAchievsMenu.Categories.y);
	Window_Command.prototype.initialize.call(this, x, y);
	SMO.AM.refreshUnlockedTrophies();
};

//========================================
// Categories Window - Refresh

Window_Categories.prototype.refresh = function() {
	Window_Command.prototype.refresh.call(this);
	this.opacity = $dataAchievsMenu.Categories.opacity;
	if (!this.active) {
		this.updateCursor();
	}
};

Window_Categories.prototype.easyRefresh = function(isUnlock) {
	if (isUnlock) {
		this.refresh();
	}
};

//========================================
// Categories Window - Draw

Window_Categories.prototype.drawItem = function(index) {
	this.resetTextColor();
	var recent = [];
	var unlocked = [];
	var collectable = [];
	var rect = this.itemRectForText(index);
	var cat = $dataAchievsCategories[index].name;
	var achievs = SMO.AM.hideTotally ? SMO.AM.getNonHiddenAchievsByCategory(cat) : SMO.AM.getAchievsByCategory(cat);
	for (var a = 0; a < achievs.length; a++) {
		if (achievs[a].isUnlocked()) {
			unlocked.push(achievs[a]);
			if (achievs[a].isRecent()) { recent.push(achievs[a]); }
			if (achievs[a].isRewardAvailable()) { collectable.push(achievs[a]); }
		}
	}
	this.drawCategoryBackground(index, rect);
	this.drawCategoryEventIcon(rect, recent, collectable);
	this.drawCategoryText(index, rect, achievs, unlocked, recent, collectable);
};

//Draw the category's background (the image or shape selected)
Window_Categories.prototype.drawCategoryBackground = function(index, rect) {
	var data = $dataAchievsCategories[index];
	if (!$dataAchievsMenu.Categories.drawRectangle && !data.img) return;

	var cursor_gap = 6;
	var x = rect.x;
	var y = rect.y + cursor_gap;
	var w = rect.width;
	var h = rect.height - cursor_gap * 2;
	var c1 = $dataAchievsMenu.Categories.rectBorderColor; //borders
	var c2 = $dataAchievsMenu.Categories.rectBackColor; //background
	var bds = Number($dataAchievsMenu.Categories.rectBorderSize); //border size
	var img = data.img ? `achievements/${data.img}` : '';
	var rect = this.itemRect(index);
	this.drawBorderedRect(x, y, w, h, bds, c1, c2, img);
};

//Drawing the "recently unlocked" and the "reward available" icons on categories
Window_Categories.prototype.drawCategoryEventIcon = function(rect, recent, collectable) {
	var isFromTitle = SceneManager._stack[0] === Scene_Title;
	if (recent.length && SMO.AM.Icons.recentUnlock > -1) {
		var x = Math.floor(rect.width - Window_Base._iconWidth / 2 - 4);
		this.drawIcon(SMO.AM.Icons.recentUnlock, x, rect.y);
	} else if (collectable.length && !isFromTitle && SMO.AM.Icons.reward2Collect > -1) {
		var x = rect.width - Window_Base._iconWidth / 2 - 4;
		this.drawIcon(SMO.AM.Icons.reward2Collect, x, rect.y);
	}
};

Window_Categories.prototype.drawCategoryText = function(index, rect, achievs, unlocked, recent, collectable) {
	var all = achievs.length;
	unlocked = unlocked.length;
	recent = recent.length;
	collectable = collectable.length;
	var locked = all - unlocked;
	var secret = achievs.filter(a => a.isSecret()).length;
	var category = $dataAchievsCategories[index];
	var isCategoryAutoColor = category.autoColor && category.autoColor.color && category.autoColor.category;
	var autoColor = isCategoryAutoColor ? category.autoColor : SMO.AM.getAutoColorFromItemImage(category);
	var isAutoColor = autoColor.category && autoColor.color;
	this.contents.textColor = $dataAchievsMenu.Categories.textColor;
	var originalTxtColor = this.contents.textColor;
	this.contents.textColor = isAutoColor ? autoColor.color : this.contents.textColor;
	this.changePaintOpacity(this.isCommandEnabled(index));
	var progress = all == 0 ? '100' : Math.floor((unlocked / all) * 100);
	var text = $dataAchievsMenu.Categories.text;
	text = text.replace(/<name>/gi, SMO.AM.translate(category.name));
	text = text.replace(/<locked>/gi, locked);
	text = text.replace(/<unlocked>/gi, unlocked);
	text = text.replace(/<secret>/gi, secret);
	text = text.replace(/<recent>/gi, recent);
	text = text.replace(/<collectable>/gi, collectable);
	text = text.replace(/<percent>/gi, progress);
	text = text.replace(/<all>/gi, all);
	var y = Math.floor(rect.y + (rect.height - this.lineHeight()) / 2);
	this.drawText(text, rect.x, y, rect.width, this.itemTextAlign());
	this.changePaintOpacity(true);
	this.contents.textColor = originalTxtColor;
};

//========================================
// Categories Window - Command List

Window_Categories.prototype.getCommandListData = function() {
	return $dataAchievsCategories.map(c => c.name);
};

Window_Categories.prototype.makeCommandList = function() {
	this._data = this.getCommandListData();
	this._data.forEach(function(cat) {
		var achievs = SMO.AM.getAchievsByCategory(cat);
		var enabled = achievs.length > 0;
		this.addCommand(cat, 'achiev', enabled);
	}, this);
};

//========================================
// Categories Window - Settings

Window_Categories.prototype.defineSetting = function(parameter, value, refresh) {
	if (value == null) return;
	if ($dataAchievsMenu.Categories[parameter] == null) return;
	$dataAchievsMenu.Categories[parameter] = value;
	if (refresh) {
		if (parameter === 'x' || parameter === 'y') {
			this[parameter] = eval(value);
		} else if (parameter === 'width' || parameter === 'height') {
			this[parameter] = eval(value);
			this.createContents();
			this.refresh();
		} else if (parameter === 'windowSkin') {
			this.windowskin = ImageManager.loadSystem($dataAchievsMenu.Categories.windowSkin || 'Window');
		} else {
			this.refresh();
		}
	}
};

Window_Categories.prototype.getSetting = function(parameter) {
	return $dataAchievsMenu.Categories[parameter];
};

Window_Categories.prototype.itemTextAlign = function() {
	return $dataAchievsMenu.Categories.textAlign;
};

Window_Categories.prototype.windowWidth = function() {
	return eval($dataAchievsMenu.Categories.width);
};

Window_Categories.prototype.windowHeight = function() {
	return eval($dataAchievsMenu.Categories.height);
};

Window_Categories.prototype.itemHeight = function(index) {
	return eval($dataAchievsMenu.Categories.itemHeight);
};

Window_Categories.prototype.maxCols = function() {
	return $dataAchievsMenu.Categories.columns;
};

Window_Categories.prototype.standardFontFace = function() {
	var ff = $dataAchievsMenu.Categories.fontFace;
	return ff || Window_Base.prototype.standardFontFace.call(this);
};

Window_Categories.prototype.standardFontSize = function() {
	return $dataAchievsMenu.Categories.fontSize || 28;
};

Window_Categories.prototype.loadWindowskin = function() {
	var skin_name = $dataAchievsMenu.Categories.windowSkin || 'Window';
	this.windowskin = ImageManager.loadSystem(skin_name);
};

//==========================================================================================
// Achievements Window - Create
//==========================================================================================
function Window_Achievements() {
	this.initialize.apply(this, arguments);
}

Window_Achievements.prototype = Object.create(Window_Command.prototype);
Window_Achievements.prototype.constructor = Window_Achievements;

//========================================
// Achievements Window - Initialize

Window_Achievements.prototype.initialize = function() {
	this._sortType = $gameSystem.achievsSortType;
	this._cursor_gap = 3;
	this._data = [];
	this._name = 'Achievements';
	var x = eval($dataAchievsMenu.Achievements.x);
	var y = eval($dataAchievsMenu.Achievements.y);
	Window_Command.prototype.initialize.call(this, x, y);
};

//========================================
// Achievements Window - Refresh

Window_Achievements.prototype.refresh = function() {
	Window_Command.prototype.refresh.call(this);
	this.opacity = $dataAchievsMenu.Trophies.opacity;
	if (!this.active) {
		this.updateCursor();
	}
};

Window_Achievements.prototype.easyRefresh = function(isUnlock) {
	for (var d = 0; d < this._data.length; d++) {
		if (this._data[d].isPlaytimeRequired()) {
			this.redrawItem(d);
		}
	}
};

//========================================
// Achievements Window - Draw

Window_Achievements.prototype.drawItem = function(index) {
	var item = this._data[index];
	if (!item) return;
	var rect = this.itemRect(index);
	var color = item.isUnlocked() ? SMO.AM.unlockedColor : $dataAchievsMenu.Achievements.textColor;
	var isHideProgress = this.isHideProgress(item);
	var isExtraLine = isHideProgress && this.isAutoAddLine();

	this.changeTextColor(this.normalColor());
	this.drawAchievBackground(rect, item);
	this.drawAchievNameAndIcon(rect, item);
	this.drawAchievDescription(index, rect, color, isExtraLine);
	if (!isHideProgress) {
		this.drawAchievProgressBar(index, rect);
	}
	this.drawAchievEventIcon(rect, item);
};

Window_Achievements.prototype.isHideProgress = function(achievement) {
	var a = achievement;
	return $dataAchievsMenu.Achievements.hideProgress || a.hideProgress || a.isSecret() || !a.requirements.length;
};

// If the progress is hidden, a new line will be added to the description
Window_Achievements.prototype.isAutoAddLine = function() {
	return true;
};

Window_Achievements.prototype.drawAchievBackground = function(rect, item) {
	var isUnlocked = item.isUnlocked();
	var x = rect.x + this._cursor_gap;
	var y = rect.y + this._cursor_gap;
	var w = rect.width - this._cursor_gap * 2;
	var h = rect.height - this._cursor_gap * 2;
	var c1 = isUnlocked ? SMO.AM.unlockedColor : $dataAchievsMenu.Achievements.textColor; //borders
	var c2 = 'rgba(0,0,0,0.5)'; //background
	var c3 = 'rgba(0,0,0,0.6)'; //name's background
	var background = '';
	var needDark = false;
	var bds = $dataAchievsMenu.Achievements.borderSize;
	var radius = $dataAchievsMenu.Achievements.cornerRadius;
	if (isUnlocked) {
		background = item.backgroundImage;
	} else if (item.isSecret()) {
		background = SMO.AM.currentCategory.secretAchievImg || SMO.AM.Images.secret;
	} else {
		background = SMO.AM.currentCategory.lockedAchievImg || SMO.AM.Images.locked || item.backgroundImage;
		needDark = !background ? false : SMO.AM.currentCategory.lockedAchievImg ? false : SMO.AM.Images.locked ? false : true;
	}
	background = background ? `achievements/${background}` : '';
	this.contents.drawBorderedAndRoundedRect(x, y, w, h, radius, bds, c1, c2, background);
	if (!background) {
		//Draw black rectangle behind the achievement's name
		this.contents.drawRoundedRectB([1, 1, 0, 0], x+bds, y+bds, w-bds*2, this.lineHeight(), radius, c3);
	}
	if (needDark) {
		//Draw dark tone above achievement's background
		let width = rect.width - 2 + this.textPadding();
		let height = rect.height - this._cursor_gap * 2 - 2;
		this.contents.drawRoundedRect(x+bds, y+bds, w-bds*2, h-bds*2, radius, c3);
	}
};

Window_Achievements.prototype.drawAchievNameAndIcon = function(rect, item) {
	var category = SMO.AM.currentCategory;
	var isCategoryAutoColor = category.autoColor && category.autoColor.color && category.autoColor.achievs;
	var autoColor = isCategoryAutoColor ? category.autoColor : SMO.AM.getAutoColorFromItemImage(category);
	var isAutoColor = autoColor.color && autoColor.achievs;
	var originalTxtColor = this.contents.textColor;
	this.contents.textColor = isAutoColor ? autoColor.color : this.contents.textColor;
	this.contents.fontSize += 4;
	this._keepColor = true;
	this.drawItemName(item, rect.x, rect.y, rect.width);
	this._keepColor = false;
	this.contents.fontSize -= 4;
	this.contents.textColor = originalTxtColor;
};

Window_Achievements.prototype.drawSecretDescription = function(rect) {
	var text = SMO.AM.secretDescription;
	var x = rect.x + this._cursor_gap;
	var y = rect.y + 2 * this.lineHeight() - this._cursor_gap;
	var maxWidth = rect.width - this._cursor_gap * 2;
	this.drawText(text, x, y, maxWidth, 'center');
};

Window_Achievements.prototype.drawAchievDescription = function(index, rect, color, isExtraLine) {
	var Achievement = this._data[index];
	var LH = this.lineHeight();
	//Drawing simplified description
	var font = {
		size: this.contents.fontSize,
		face: this.contents.fontFace
	};
	var text = SMO.AM.removeTextCodes(SMO.AM.translate(Achievement.description));
	var maxWidth = rect.width - this._cursor_gap * 2 - this.textPadding() * 2;
	var texts = SMO.AM.wrapText(text, maxWidth, font, true).split('\n');
	var x = rect.x + this._cursor_gap + this.textPadding();
	var y = 0;
	this.contents.textColor = $dataAchievsMenu.Achievements.textColor;
	var maxLines = $dataAchievsMenu.Achievements.descriptionLines;
	maxLines = isExtraLine ? maxLines + 1 : maxLines;
	for (var t = 0; t < maxLines; t++) {
		if (!texts[t]) {
			continue;
		}

		if (t === (maxLines - 1) && texts.length > maxLines) {
			//Drawing three circles to show that the description continues
			let radius = 4;
			let gap = radius * 4;
			let circle_x = Math.floor(rect.x + rect.width / 2);
			let circle_y = y + (LH - 14) * 2 - radius;
			this.contents.drawCircle(circle_x - gap, circle_y, radius, '#ffffff');
			this.contents.drawCircle(circle_x, circle_y, radius, '#ffffff');
			this.contents.drawCircle(circle_x + gap, circle_y, radius, '#ffffff');
		} else {
			y = rect.y + LH + (LH - 14) * t;
			this.drawText(texts[t], x, y, maxWidth, 'left');
		}
	}
	this.changeTextColor(color);
};

Window_Achievements.prototype.drawAchievProgressBar = function(index, rect) {
	var isFromTitle = (SceneManager._stack[0] === Scene_Title);
	var Achievement = this._data[index];
	var LH = this.lineHeight();
	var borderSize = $dataAchievsMenu.Achievements.borderSize;
	var radius = Math.floor($dataAchievsMenu.Achievements.cornerRadius/2);
	var y = rect.y + rect.height - 32 - this._cursor_gap - borderSize - radius;

	//Drawing progress gauge
	var progress = Achievement.progress();
	var gx = rect.x + this._cursor_gap + borderSize + 3;
	var gw = rect.width - this._cursor_gap * 2 - borderSize * 2 - 6;
	var gh = $dataAchievsMenu.Achievements.progressGaugeHeight;
	var gr = Math.floor(progress) / 100; //rate
	var gy = y - gh;
	var c1 = $dataAchievsMenu.Achievements.progressGaugeC1; //color1
	var c2 = $dataAchievsMenu.Achievements.progressGaugeC2; //color2
	this.drawGauge(gx, gy, gw, gh, gr, c1, c2);

	//Drawing progress text
	if ($dataAchievsMenu.Achievements.progressStyle === 'Flat') {
		var text = Achievement.flatProgress();
	} else {
		var text = progress + '%';
	}
	var ty = y - 2;
	var originalOutline = this.contents.outlineColor;
	var align = $dataAchievsMenu.Achievements.progressAlign;
	if (align === 'right' && (Achievement.isRecent() || (!isFromTitle && Achievement.isRewardAvailable()))) {
		gx -= Window_Base._iconWidth + 2;
	}
	this.contents.outlineColor = 'rgba(0,0,0,0.8)';
	this.drawText(text, gx, ty, gw, align);
	this.contents.outlineColor = originalOutline;
};

Window_Achievements.prototype.drawAchievEventIcon = function(rect, item) {
	var isFromTitle = (SceneManager._stack[0] === Scene_Title);
	var radius = $dataAchievsMenu.Achievements.cornerRadius;
	if (item.isRecent() && SMO.AM.Icons.recentUnlock > -1) {
		var x = rect.x + rect.width - Window_Base._iconWidth - this._cursor_gap - 2;
		var y = rect.y + rect.height - Window_Base._iconWidth - this._cursor_gap - radius + 2;
		this.drawIcon(SMO.AM.Icons.recentUnlock, x, y);
	} else if (!isFromTitle && item.isRewardAvailable() && SMO.AM.Icons.reward2Collect > -1) {
		var x = rect.x + rect.width - Window_Base._iconWidth - this._cursor_gap - 2;
		var y = rect.y + rect.height - Window_Base._iconWidth - this._cursor_gap - radius + 2;
		this.drawIcon(SMO.AM.Icons.reward2Collect, x, y);
	}
};

Window_Achievements.prototype.drawItemName = function(item, x, y, width) {
	x += this._cursor_gap + 3;
	y += this._cursor_gap + 3;
	var iconBoxWidth = 4;
	var align = 'left';
	width = width || 312;
	if (!item) return;
	var iconIndex = item.getIcon();
	if (!this._keepColor) {
		this.resetTextColor();
	}

	if (iconIndex > -1) {
		iconBoxWidth = Window_Base._iconWidth + 2;
		this.drawIcon(iconIndex, x, y);
	}

	if (item.isSecret()) {
		align = 'center';
		if (iconIndex > -1) {
			x -= 16;
		}
	}
	var maxWidth = width - iconBoxWidth - this._cursor_gap * 2 - 7;
	this.drawText(item.name, x + iconBoxWidth, y, maxWidth, align);
};

Window_Achievements.prototype.drawGauge = function(x, y, width, height, rate, c1, c2) {
	height = height || 6;
	var fillW = Math.floor(width * rate);
	var gaugeY = y + this.lineHeight() - 8;
	var backColor = $dataAchievsMenu.Achievements.progressGaugeBG || '#202040';
	this.contents.fillRect(x, gaugeY, width, height, backColor);
	this.contents.gradientFillRect(x, gaugeY, fillW, height, c1, c2);
};

//========================================
// Achievements Window - Settings

Window_Achievements.prototype.defineSetting = function(parameter, value, refresh) {
	if (value == null) return;
	if ($dataAchievsMenu.Achievements[parameter] == null) return;
	$dataAchievsMenu.Achievements[parameter] = value;
	if (refresh) {
		if (parameter === 'x' || parameter === 'y' || parameter === 'opacity') {
			this[parameter] = eval(value);
		} else if (parameter === 'width' || parameter === 'height') {
			this[parameter] = eval(value);
			this.createContents();
			this.refresh();
		} else if (parameter === 'windowSkin') {
			this.windowskin = ImageManager.loadSystem($dataAchievsMenu.Achievements.windowSkin || 'Window');
		} else {
			this.refresh();
		}
	}
};

Window_Achievements.prototype.getSetting = function(parameter) {
	return $dataAchievsMenu.Achievements[parameter];
};

Window_Achievements.prototype.windowWidth = function() {
	return eval($dataAchievsMenu.Achievements.width);
};

Window_Achievements.prototype.windowHeight = function() {
	return eval($dataAchievsMenu.Achievements.height);
};

Window_Achievements.prototype.itemHeight = function(index) {
	return eval($dataAchievsMenu.Achievements.itemHeight);
};

Window_Achievements.prototype.maxCols = function() {
	return eval($dataAchievsMenu.Achievements.columns);
};

Window_Achievements.prototype.standardFontFace = function() {
	var ff = $dataAchievsMenu.Achievements.fontFace;
	return ff || Window_Base.prototype.standardFontFace.call(this);
};

Window_Achievements.prototype.standardFontSize = function() {
	return $dataAchievsMenu.Achievements.fontSize || 28;
};

Window_Achievements.prototype.loadWindowskin = function() {
	var skin_name = $dataAchievsMenu.Achievements.windowSkin || 'Window';
	this.windowskin = ImageManager.loadSystem(skin_name);
};

//========================================
// Achievements Window - Command List

Window_Achievements.prototype.makeCommandList = function() {
	this._data = this.getCommandListData();
	this._data.forEach(function(d) {
		this.addCommand(d._name, 'achiev', true);
	}, this);
};

Window_Achievements.prototype.getCommandListData = function() {
	if (!$dataAchievsMenu.SortOption.options[0]) {
		$dataAchievsMenu.SortOption.options[0] = {
			name: 'A-z',
			script: "main = all.filter(a => !a.isSecret()).sort((a, b) => a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' }));main.push(...secrets);"
		};
	}
	//Getting achievements from current category and sorting them
	if ($dataAchievsCategories.length) {
		var achievs = this.sortData(SMO.AM.getNonHiddenAchievsByCategory(SMO.AM.currentCategory.name));
	} else {
		var achievs = this.sortData($dataAchievements.filter(a => !a.isHidden()), 0);
	}

	return achievs;	
};

//========================================
// Achievements Window - Others

Window_Achievements.prototype.isCategoriesList = function() {
	return !SMO.AM.currentCategory.id;
};

Window_Achievements.prototype.sortData = function(data, sortType) {
	if (data == null) return;

	var Sort = $dataAchievsMenu.SortOption;
	if (!Sort.enabled) return data;

	if (sortType == null) {
		sortType = this._sortType;
	}

	var option = Sort.options[sortType];
	if (!option) {
		this._sortType = 0;
		$gameSystem.achievsSortType = 0;
		option = Sort.options[0];
		if (!option) return data;
	}

	var all = data;
	var unlocked = []; 
	var locked = []; 
	var secrets = [];
	var main = [];
	data.forEach(function(achiev) {
		if (achiev.isUnlocked()) {
			unlocked.push(achiev);
		} else if (achiev.isSecret()) {
			secrets.push(achiev);
		} else {
			locked.push(achiev);
		}
	});
	try {
		eval(option.script);
	} catch (e) {
		console.error(`Error on Sort Script (${option.symbol})`);
		console.error(e);
	}
	return main;
};

//==========================================================================================
// Trophies Window - Create
//==========================================================================================
function Window_Trophies() {
	this.initialize.apply(this, arguments);
}

Window_Trophies.prototype = Object.create(Window_Base.prototype);
Window_Trophies.prototype.constructor = Window_Trophies;

Window_Trophies.prototype.createContents = function() {
	Window_Base.prototype.createContents.call(this);
	this._maxWidth = this.width - this.standardPadding() * 2;
};

Window_Trophies.prototype.createSprites = function() {
	var x, y, color;
	this.createTrophies();
	this.createSelector();

	//Creating arrows' sprites
	this._arrows = [];
	var A1 = new Sprite_Button();
	A1.bitmap = new Bitmap(20, 30);
	A1.x = Math.ceil(this.width / 4 + this._gap - 50);
	A1.y = this._big_trophy.y + this._big_trophy.height + 35;
	A1.setClickHandler(function() {
		if (SceneManager._scene.isEditing && SceneManager._scene.isEditing()) return;
		this.parent.selectSlot(-1);
	});
	this._arrows.push(A1);
	this.addChild(A1);

	var A2 = new Sprite_Button();
	A2.bitmap = new Bitmap(20, 30);
	A2.x = Math.ceil(this.width / 4 + this._gap + 30);
	A2.y = A1.y;
	A2.setClickHandler(function() {
		if (SceneManager._scene.isEditing && SceneManager._scene.isEditing()) return;
		this.parent.selectSlot(this.parent._maxItems);
	});
	this._arrows.push(A2);
	this.addChild(A2);
};

Window_Trophies.prototype.createTrophies = function() {
	var isGrow = this.isGrowSelector();
	var maxItems = this.pageMaxItems();
	var scale = isGrow ? 1 - this.scaleVariation() : 1;
	var width = isGrow ?  Math.floor(this._trophy_w / scale) : this._trophy_w;
	var height = isGrow ? Math.floor(this._trophy_h / scale) : this._trophy_h;
	var Trophy;
	this._trophies = [];
	for (var s = 0; s < maxItems; s++) {
		Trophy = new Sprite_Button();
		Trophy.bitmap = new Bitmap(width, height);
		Trophy.setClickHandler(function() {
			if (SceneManager._scene.isEditing && SceneManager._scene.isEditing()) return;
			this.parent.selectSlot(this._index);
		});

		Trophy._index = s;

		Trophy._realIndex = function() {
			return this._index + this._page * this._maxItems;
		};

		Trophy.data = function() {
			return this.parent._data[this._realIndex()];
		};

		Trophy.x_fix = function() {
			return this.baseWidth() * this.anchor.x;
		};

		Trophy.y_fix = function() {
			return this.baseHeight() * this.anchor.y;
		};

		Trophy.baseWidth = function() {
			if (this.parent.isGrowSelector()) {
				return this.width * (1 - this.parent.scaleVariation());
			}
			return this.width;
		};

		Trophy.baseHeight = function() {
			if (this.parent.isGrowSelector()) {
				return this.height * (1 - this.parent.scaleVariation());
			}
			return this.height;
		};

		Trophy.isButtonTouched = function() {
			var tx = TouchInput.x;
			var ty = TouchInput.y;
			var x = this.canvasToLocalX(tx) + this.x_fix();
			var y = this.canvasToLocalY(ty) + this.y_fix();
			return x >= 0 && y >= 0 && x < this.baseWidth() && y < this.baseHeight();
		};
		
		Trophy.update = function() {
			Sprite_Button.prototype.update.call(this);
			this.updateScale();
		};

		Trophy.updateScale = function() {
			if (!this.parent) return;
			if (!this.parent.visible) return;
			if (!this.parent.isGrowSelector()) return;
			var variation = this.parent.scaleVariation();
			var tick = variation / this.parent.scaleVarFrames();
			if (this.parent._selected === this._index) {
				if (this.scale.x < 1) {
					this.scale.x = Math.min(1, this.scale.x + tick);
					this.scale.y = this.scale.x;
				}
			} else if (this.scale.x > (1 - variation)) {
				this.scale.x = Math.max(1 - variation, this.scale.x - tick);
				this.scale.y = this.scale.x;
			}
		};

		Trophy.anchor.x = this._anchor;
		Trophy.anchor.y = this._anchor;
		Trophy.scale.x = scale;
		Trophy.scale.y = scale;
		this._trophies.push(Trophy);
		this.addChild(Trophy);
	}
	this.swapChildren(this._trophies[0], this._trophies[maxItems - 1]);
};

Window_Trophies.prototype.createSelector = function() {
	var bds = 3; //border size
	var bdc = $dataAchievsMenu.Trophies.selectorColor; //border color
	var width = this._trophy_w + 2;
	var height = this._trophy_h + 2;
	var selector = new Sprite(new Bitmap(width, height));
	var x = this._trophies[0] ? this._trophies[0].x - 1 : 28;
	var y = this._trophies[0] ? this._trophies[0].y - 1 : 158;
	selector.x = x;
	selector.y = y;
	selector.bdc = bdc;
	selector.visible = !this.isGrowSelector();
	this._selector = selector;
	this.addChild(selector);
};

//========================================
// Trophies Window - Initialize

Window_Trophies.prototype.initialize = function() {
	var Data = $dataAchievsMenu.Trophies;
	var x = eval(Data.x);
	var y = eval(Data.y);
	var width = eval(Data.width);
	var height = eval(Data.height);
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.initValues();
	this.createSprites();
	if (SMO.AM.currentCategory.id) {
		this.hide();
	} else {
		this.refresh();
	}
};

Window_Trophies.prototype.initValues = function() {
	var Trophies = $dataAchievsMenu.Trophies;
	this._maxLines = eval(Trophies.lines);
	this._maxCols = eval(Trophies.columns);
	this._maxItems = this._maxLines * this._maxCols;
	this.refreshProgressBar();
	this.getData();
	this._maxPages = Math.ceil(this._data.length / this._maxItems);
	this._page = 0;
	this._gap = 10;
	this._anchor = this.isGrowSelector() ? 0.5 : 0;
	this._maxWidth = this.width - this.standardPadding() * 2;
	this._trophies = null;
	this._selected = 0;

	var big_trophy_y, big_trophy_h;
	try {
		big_trophy_y = eval($dataAchievsMenu.Trophies.bigTrophyY);
		big_trophy_h = eval($dataAchievsMenu.Trophies.bigTrophyHeight);
	} catch(e) {
		console.error('Error found on your Big Trophy (Y or Height) formula');
		console.error(e);
		big_trophy_y = 140;
		big_trophy_h = 250;
	}
	this._big_trophy = {
		x: this._maxWidth / 2 + this._gap,
		y: big_trophy_y,
		width: this._maxWidth / 2 - 2 * this._gap,
		height: big_trophy_h
	};

	this._trophy_w = Math.floor((this._maxWidth / 2 - this._gap * (this._maxCols + 1)) / this._maxCols);
	this._trophy_h = Math.floor((this._big_trophy.height - this._gap * (this._maxLines - 1)) / this._maxLines);
	this._x_fix = this.fixToTrophyX();
	this._y_fix = this.fixToTrophyY();
};

//========================================
// Trophies Window - Update

Window_Trophies.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.updateTotalProgress();
};

//Making the "Total Progress" gauge will increase in size smoothly
Window_Trophies.prototype.updateTotalProgress = function() {
	var tp = this._progress;
	if (tp.currentValue > tp.lastValue) {
		if (this.visible) {
			tp.lastValue += 0.2;
			tp.lastValue = Math.min(tp.lastValue, tp.currentValue);
		} else {
			tp.lastValue = tp.currentValue;
		}
		this.redrawTotalProgressGauge();
	}
};

//========================================
// Trophies Window - Refresh

//Refresh only necessary stuff
Window_Trophies.prototype.easyRefresh = function(isUnlock) {
	if (isUnlock) {
		if (!this.isTrophies()) {
			this.getData();
			this.redrawTrophies();
		}
		this.refreshProgressBar();
		this.redrawTotalProgressText();
	}
};

//Refresh completely
Window_Trophies.prototype.refresh = function() {
	this.resetFontSettings()
	this.contents.clear();
	this._trophies.forEach(function(t) {
		t.bitmap.clear();
	});
	this.refreshProgressBar();
	this.drawMe();
	this.refreshSelector();
	this.opacity = $dataAchievsMenu.Trophies.opacity;
};

Window_Trophies.prototype.refreshProgressBar = function() {
	var unlocked = SMO.AM.DataDynamic.achievs.filter(a => a.state > 0).length;
	var all = $dataAchievements.length || 1;
	var progress = Math.floor(unlocked * 100 / all);

	if (!this._progress) {
		var y;
		try {
			y = eval($dataAchievsMenu.Trophies.progressBarY);
		} catch(e) {
			console.error('Error found on your Progress Bar Y script');
			console.error(e);
			y = 428;
		}
		this._progress = {
			x: 20,
			y: y,
			width: this.width - this.standardPadding() * 2 - 40,
			height: 24,
			lastValue: progress,
			currentValue: 0,
			lastRate: function() {
				return this.lastValue / 100;
			},
			rate: function() {
				return this.currentValue / 100;
			}
		};
	}

	this._progress.currentValue = progress;
};

Window_Trophies.prototype.refreshAchievsProgress = function() {
	if ($dataAchievsMenu.Trophies.type !== 'progress') return;
	var oldData = this._data;
	this.getData();
	if (oldData.equals(this._data)) {
		return this.refresh();
	}
	this.redrawTrophies();
};

Window_Trophies.prototype.getData = function() {
	this._data = [];
	if (this.isTrophies()) {
		//Get non hidden trophies
		for (var c = 0; c < $dataAchievsCategories.length; c++) {
			if (!$dataAchievsCategories[c].Trophy.hidden) {
				this._data.push($dataAchievsCategories[c].Trophy);
			}
		}
	} else if ($dataAchievsMenu.Trophies.type === 'recent') {
		//Get recently unlocked achievements
		var recent = $dataAchievements.filter(a => a.isUnlocked());
		this._data = recent.sort((a, b) => b.getUnlockDateNow() - a.getUnlockDateNow()).splice(0, this._maxItems);
	} else {
		//Get all locked achievements and sort them by progress (unlocking percentage)
		var locked = $dataAchievements.filter(a => !a.isUnlocked() && !a.isHidden());
		if (!locked.length) return;
		this._data = locked.sort(function(a, b) {
			var pa = a.progress();
			var pb = b.progress();
			return pb - pa || a.tname.localeCompare(b.tname, 'en', { sensitivity: 'base' });
		}).slice(0, 4);
	}
};

Window_Trophies.prototype.refreshSelector = function(isTypeChanged) {
	if (isTypeChanged) return this.setSelector(this.isGrowSelector() ? 'grow' : 'cursor');
	if (this.isGrowSelector()) return this._selector.visible = false;
	//Refreshing size
	var width = this._trophies[0].width;
	var height = this._trophies[0].height;
	if (width !== (this._selector.width - 2) || height !== (this._selector.height - 2)) {
		this._selector.bitmap.resize(width + 2, height + 2);
		this._selector._refresh();
		this.redrawSelector();
	}
	//Refreshing position
	this._selector.x = this._trophies[this._selected].x - 1;
	this._selector.y = this._trophies[this._selected].y - 1;
	this._selector.visible = true;
};

//========================================
// Trophies Window - Draw

Window_Trophies.prototype.drawMe = function() {
	this.drawTitle();
	this.drawDescription();
	this.drawTrophies();
	this.drawBigTrophy();
	this.drawArrows();
	this.drawTotalProgress();
	this.drawSelector();
};

Window_Trophies.prototype.drawTitle = function() {
	this.contents.textColor = $dataAchievsMenu.Trophies.textColor;
	var title = $dataAchievsMenu.Trophies.title;
	this.drawText(title, 0, 0, this._maxWidth, 'center');
};

Window_Trophies.prototype.drawDescription = function() {
	var font = {
		size: this.contents.fontSize - 5,
		face: this.contents.fontFace
	};
	var description = SMO.AM.translate($dataAchievsMenu.Trophies.description);
	description = SMO.AM.wrapText(description, this._maxWidth, font);
	this._lockFontState = true; //prevents "drawTextEx" from changing the font size
	this.contents.fontSize -= 5;
	this.drawTextEx(description, 0, this.lineHeight());
	this.contents.fontSize += 5;
};

Window_Trophies.prototype.redrawTrophies = function() {
	var bt = this._big_trophy;
	this.contents.clearRect(bt.x, bt.y, bt.width, bt.height);
	this._trophies.forEach(function(trophy) {
		trophy.bitmap.clear();
	});

	this.drawTrophies();
	this.drawBigTrophy();
};

Window_Trophies.prototype.drawTrophies = function() {
	this.contents.textColor = $dataAchievsMenu.Trophies.textColor;
	if (!this._data.length) return;
	var isTrophy = this.isTrophies();
	var defaultImg = SMO.AM.Images.lockedTrophy;
	var x, y, index, img, unlocked, item;
	var firstIndex = this._maxItems * this._page;
	var pageMax = this.pageMaxItems();
	var y0 = eval($dataAchievsMenu.Trophies.bigTrophyY);
	for (var line = 0, col = 0, index = 0; index < pageMax; index++) {
		item = this._data[firstIndex + index];
		x = this._gap + (this._trophy_w + this._gap) * col;
		y = y0 + (this._trophy_h + this._gap) * line;
		unlocked = isTrophy ? item.isUnlocked() : !!item.id;
		img = isTrophy ? item.imageName() : unlocked ? item.backgroundImage : defaultImg;
		img = img ? `achievements/${img}` : '';
		this.drawTrophy(index, x, y, img, unlocked);
		if (++col >= this._maxCols) { 
			line++;
			col = 0;
		}
	}
};

Window_Trophies.prototype.drawTrophy = function(index, x, y, img, unlocked) {
	var Trophy = this._trophies[index];
	if (!Trophy) return;

	Trophy.x = x + this._x_fix;
	Trophy.y = y + this._y_fix;
	var width = Trophy.width;
	var height = Trophy.height;
	var bds = $dataAchievsMenu.Trophies.borderSize;
	var color = unlocked ? SMO.AM.unlockedColor : $dataAchievsMenu.Trophies.textColor;
	Trophy.bitmap.drawBorderedRect(0, 0, width, height, bds, color, 'rgba(0,0,0,0.6)', img);

	var sign = $dataAchievsMenu.Trophies.lockedSign;
	if (!unlocked && sign) {
		Trophy.bitmap.drawText(sign, 0, 0, Trophy.width, Trophy.height, 'center');
	}
};

Window_Trophies.prototype.drawBigTrophy = function() {
	var index = this._selected + this._maxItems * this._page;
	var data = this._data[index];
	if (!data) return;
	var Trophies = $dataAchievsMenu.Trophies;
	var isTrophy = this.isTrophies();
	var unlocked = isTrophy ? SMO.AM.DataDynamic.trophies[data.id-1] : !!data.id;
	var image = this.selectedImage();
	var LH = this.lineHeight() - 10;
	var bt = this._big_trophy;

	//Drawing background and borders
	var borderColor = $dataAchievsMenu.Trophies.textColor;
	this.drawBorderedRect(bt.x, bt.y, bt.width, bt.height, 2, borderColor, 'rgba(0,0,0,0.6)');

	//Drawing back image (above the background)
	if (image) {
		var bitmap = ImageManager.loadAchievement(image);
		var sw = bitmap.width;
		var sh = bitmap.height;
		var dx = bt.x + 2;
		var dy = bt.y + 2;
		var dw = bt.width - 4;
		var dh = bt.height - 4
		this.contents.blt(bitmap, 0, 0, sw, sh, dx, dy, dw, dh);
	}
	this.contents.fontSize -= 10;

	//Drawing "LOCKED" text
	if (!unlocked) {
		var text = Trophies.locked || undefined;
		this.contents.drawText(text, bt.x, bt.y, bt.width, bt.height, 'center');
		this.contents.fontSize += 10;
		return;
	}

	var backColor = 'rgba(0,0,0,0.5)';
	var font = {
		face: this.contents.fontFace,
		size: this.contents.fontSize
	};
	var description = SMO.AM.wrapText(this.selectedDescription(), bt.width - 8, font, true);
	var texts = description.split('\n');
	var text_h = LH * texts.length;
	var align_y = {
		up: bt.y,
		center: bt.y + (bt.height - text_h) / 2,
		down: bt.y - text_h + bt.height - 8
	}
	var y = unlocked ? align_y.down : align_y.center;

	//Drawing description (above the base background and above the image)
	if (isTrophy) {
		for (var t = 0; t < texts.length; t++) {
			this.contents.fillRect(bt.x + 2, y + LH * t + 4, bt.width - 4, LH, backColor);
			this.drawText(texts[t], bt.x + 8, y + LH * t, bt.width - 16, 'left');
		}
	} else {
		this.contents.fontSize += 6;
		//Drawing the achievement's name
		//Dark Background
		this.contents.fillRect(bt.x + 4, align_y.up + 4, bt.width - 8, LH + 15, backColor);
		//Text
		this.drawText(data.name, bt.x + 8, align_y.up + 5, bt.width - 16, 'center');
		this.contents.fontSize -= 6;
		if ($dataAchievsMenu.Trophies.type === 'recent') {
			//Drawing the unlock date
			//Dark Background
			this.contents.fillRect(bt.x + 4, align_y.down + 4, bt.width - 8, LH, backColor);
			//Text
			this.changeTextColor(SMO.AM.unlockedColor);
			var date = data.getUnlockDateString();
			this.drawText(date, bt.x + 8, align_y.down, bt.width - 16, 'center');
			this.changeTextColor(this.normalColor());
		} else {
			y -= LH;
			for (var t = 0; t < texts.length; t++) {
				this.contents.fillRect(bt.x + 2, y + LH * t + 4, bt.width - 4, LH, backColor);
				this.drawText(texts[t], bt.x + 8, y + LH * t, bt.width - 16, 'left');
			}
			this.contents.fillRect(bt.x + 2, bt.y + bt.height - LH - 4, bt.width - 4, LH, backColor);
			//Drawing progress gauge
			var progress = data.progress();
			var gx = bt.x + 4;
			var gw = bt.width - 8;
			var gh = $dataAchievsMenu.Achievements.progressGaugeHeight;
			var gr = Math.floor(progress) / 100; //rate
			var gy = bt.y + bt.height - gh - 6;
			var c1 = $dataAchievsMenu.Achievements.progressGaugeC1; //color1
			var c2 = $dataAchievsMenu.Achievements.progressGaugeC2; //color2
			this.drawAchievGauge(gx, gy, gw, gh, gr, c1, c2);

			//Drawing progress text
			var text = progress + '%';
			gy -= font.size + 8;
			var originalOutline = this.contents.outlineColor;
			var align = $dataAchievsMenu.Achievements.progressAlign;
			this.contents.outlineColor = 'rgba(0,0,0,0.8)';
			this.drawText(text, gx, gy, gw, align);
			this.contents.outlineColor = originalOutline;
		}
	}
	
	this.contents.fontSize += 10;
};

Window_Trophies.prototype.drawAchievGauge = function(x, y, width, height, rate, c1, c2) {
	height = height || 6;
	var fillW = Math.floor(width * rate);
	var backColor = $dataAchievsMenu.Achievements.progressGaugeBG || '#202040';
	this.contents.fillRect(x, y, width, height, backColor);
	this.contents.gradientFillRect(x, y, fillW, height, c1, c2);
};

Window_Trophies.prototype.drawArrows = function() {
	var A1 = this._arrows[0];
	var A2 = this._arrows[1];
	if (this._data.length <= this._maxItems) {
		A1.visible = false;
		A2.visible = false;
		return;
	}
	//Left arrow
	A1.bitmap.clear();
	var color = this.isFirstPage() ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,1)';
	A1.bitmap.drawTriangleS(0, 0, 30, 20, 'left', color);
	A1.visible = true;

	//Right arrow
	A2.bitmap.clear();
	color = this.isLastPage() ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,1)';
	A2.bitmap.drawTriangleS(0, 0, 30, 20, 'right', color);
	A2.visible = true;

	//<CurrentPage>/<LastPage>
	this.contents.fontSize -= 4;
	var currentPage = this._page + 1;
	var lastPage = this._maxPages;
	var text = currentPage + '/' + lastPage;
	var x = A1.x + 25 - this.standardPadding();
	var y = A1.y - this.standardPadding() - 4;
	var maxWidth = A2.x - 5 - x - this.standardPadding();
	this.drawText(text, x, y, maxWidth, 'center');
	this.contents.fontSize += 4;
};

Window_Trophies.prototype.drawTotalProgress = function() {
	this.drawTotalProgressGauge();
	this.drawTotalProgressText();
};

Window_Trophies.prototype.drawTotalProgressGauge = function() {
	var tp = this._progress;
	var fillW = Math.floor(tp.width * tp.lastRate());
	var color1 = $dataAchievsMenu.Trophies.progressGaugeC1;
	var color2 = $dataAchievsMenu.Trophies.progressGaugeC2;
	var backColor = $dataAchievsMenu.Trophies.progressGaugeBG || '#202040';

	this.contents.fillRect(tp.x, tp.y, tp.width, tp.height, backColor);
	this.contents.gradientFillRect(tp.x, tp.y, fillW, tp.height, color1, color2);
};

Window_Trophies.prototype.drawTotalProgressText = function() {
	var Achievements = $dataAchievements;
	var locked = 0;
	var unlocked = 0;
	var recent = 0;
	var secret = 0;
	var collectable = 0;
	var all = 0;
	for (var a = 0; a < Achievements.length; a++) {
		var achiev = Achievements[a];
		if (achiev.isHidden() && SMO.AM.hideTotally) {
			continue;
		}
		all++;
		if (achiev.isRecent()) {
			collectable = achiev.isCollected() ? collectable : collectable + 1;
			recent++;
			unlocked++;
			continue;
		}
		if (achiev.isUnlocked()) {
			collectable = achiev.isCollected() ? collectable : collectable + 1;
			unlocked++;
			continue;
		}
		if (achiev.isSecret()) {
			secret++;
		}
		locked++;
	}
	var text = SMO.AM.translate($dataAchievsMenu.Trophies.totalProgress);
	text = text.replace(/<percent>/i, this._progress.currentValue);
	text = text.replace(/<locked>/gi, locked);
	text = text.replace(/<unlocked>/gi, unlocked);
	text = text.replace(/<secret>/gi, secret);
	text = text.replace(/<recent>/gi, recent);
	text = text.replace(/<collectable>/gi, collectable);
	text = text.replace(/<all>/i, all);
	var textPosition = $dataAchievsMenu.Trophies.progressTextPosition.split(' ');
	this.contents.fontSize -= 4;
	var fs = this.contents.fontSize;
	var y = this._progress.y - 6;
	y = textPosition[0] === 'Top' ? y - fs : textPosition[0] === 'Bottom' ? y + fs : y;
	var align = textPosition[1].toLowerCase();
	this.drawText(text, this._progress.x, y, this._progress.width, align);
	this.contents.fontSize += 4;
};

Window_Trophies.prototype.drawSelector = function() {
	var width = this._selector.width;
	var height = this._selector.height;
	var color = $dataAchievsMenu.Trophies.selectorColor;
	var image = $dataAchievsMenu.Trophies.selectorImage;
	image = image ? `achievements/${image}` : '';
	var thickness = image ? 0 : 3;
	this._selector.bitmap.drawBorderedRect(0, 0, width, height, thickness, color, null, image);
};

Window_Trophies.prototype.redrawTrophyDesc = function() {
	var x = this._big_trophy.x;
	var y = this._big_trophy.y;
	var width = this._big_trophy.width;
	var height = this._big_trophy.height;
	this.contents.clearRect(x, y, width, height);
	this.drawBorderedRect(x, y, width, height, 2, null, 'rgba(0,0,0,0.6)');
	this.drawBigTrophy();
};

Window_Trophies.prototype.redrawTotalProgressText = function() {
	var textPosition = $dataAchievsMenu.Trophies.progressTextPosition.split(' ');
	var fs = this.contents.fontSize - 4;
	var y = this._progress.y - 6;
	y = textPosition[0] === 'Top' ? y - fs : textPosition[0] === 'Bottom' ? y + fs : y;
	this.contents.clearRect(this._progress.x, y, this._progress.width, fs + 5);
	this.drawTotalProgressText();
};

Window_Trophies.prototype.redrawSelector = function() {
	this._selector.bitmap.clear();
	this.drawSelector();
};

Window_Trophies.prototype.redrawTotalProgressGauge = function() {
	var tp = this._progress;
	this.contents.clearRect(tp.x, tp.y, tp.width, tp.height);
	this.drawTotalProgressGauge();
};

//========================================
// Trophies Window - Settings

Window_Trophies.prototype.defineSetting = function(parameter, value, refresh) {
	if (value == null) return;
	if ($dataAchievsMenu.Trophies[parameter] == null) return;
	$dataAchievsMenu.Trophies[parameter] = value;
	if (refresh) {
		if (parameter === 'x' || parameter === 'y') {
			this[parameter] = eval(value);
		} else if (parameter === 'width' || parameter === 'height') {
			this[parameter] = eval(value);
			this.createContents();
			this.reinitialize();
		} else if (parameter === 'columns' || parameter === 'lines') {
			this.reinitialize();
		} else if (parameter === 'windowSkin') {
			this.windowskin = ImageManager.loadSystem($dataAchievsMenu.Trophies.windowSkin || 'Window');
		} else {
			this.refresh();
		}
	}
};

Window_Trophies.prototype.getSetting = function(parameter) {
	return $dataAchievsMenu.Trophies[parameter];
};

Window_Trophies.prototype.standardFontFace = function() {
	var ff = $dataAchievsMenu.Trophies.fontFace;
	return ff || Window_Base.prototype.standardFontFace.call(this);
};

Window_Trophies.prototype.standardFontSize = function() {
	var fs = $dataAchievsMenu.Trophies.fontSize;
	return fs || Window_Base.prototype.standardFontSize.call(this);
};

Window_Trophies.prototype.loadWindowskin = function() {
	var skin_name = $dataAchievsMenu.Trophies.windowSkin || 'Window';
	this.windowskin = ImageManager.loadSystem(skin_name);
};

Window_Trophies.prototype.resetFontSettings = function() {
	if (this._lockFontState) {
		this._lockFontState = false;
		return;
	}
	this.contents.fontFace = this.standardFontFace();
	this.contents.fontSize = this.standardFontSize();
	this.resetTextColor();
};

//========================================
// Trophies Window - Others

Window_Trophies.prototype.isTrophies = function() {
	return $dataAchievsMenu.Trophies.type === 'trophies';
};

Window_Trophies.prototype.reinitialize = function() {
	this._progress = null;
	this.removeTrophies();
	this.removeChild(this._selector);
	this.initValues();
	this.createTrophies();
	this.createSelector();
	this.refresh();
};

//Returns the max change on the trophy's scale when the "Trophy Selector" is set to "grow"
Window_Trophies.prototype.scaleVariation = function() {
	return 0.20;
};

//Returns amount of frames it'll take for the trophy to "grow" (Trophy Selector)
Window_Trophies.prototype.scaleVarFrames = function() {
	return 15;
};

Window_Trophies.prototype.isGrowSelector = function() {
	return $dataAchievsMenu.Trophies.selector === 'grow';
};

Window_Trophies.prototype.isFirstPage = function() {
	return this._page === 0;
};

Window_Trophies.prototype.isLastPage = function() {
	return this._page === this._maxPages - 1;
};

//The the maximum amount of trophies on the current page
Window_Trophies.prototype.pageMaxItems = function() {
	return Math.min(this._maxItems, this._data.length - this._maxItems * this._page);
};

Window_Trophies.prototype.selectSlot = function(index, playCursor, refresh) {
	var last = this._selected;
	if (!this.select(index)) return;
	if (this._trophies[last]) {
		this.swapChildren(this._trophies[this._selected], this._trophies[last]);
	}
	if (refresh || refresh === undefined) {
		this.redrawTrophyDesc();
		if (!this.isGrowSelector()) {
			this._selector.x = this._trophies[this._selected].x - 1;
			this._selector.y = this._trophies[this._selected].y - 1;
			this._selector.visible = true;
		}
	}
	if (playCursor || playCursor === undefined) {
		SoundManager.playCursor();
	}
};

Window_Trophies.prototype.selectFirstItem = function() {
	if (this._selected === 0 && this.isFirstPage()) return false;
	this._selected = 0;
	if (this._page) {
		this._page = 0;
		this.refresh();
	}
	return true;
};

Window_Trophies.prototype.selectLastItem = function() {
	var lastItemIndex = this._data.length % this._maxItems;
	lastItemIndex = lastItemIndex ? lastItemIndex - 1 : this._maxItems - 1;
	if (this._selected === lastItemIndex && this.isLastPage()) return false;
	this._selected = this._data.length % this._maxItems;
	this._selected = this._selected ? this._selected - 1 : this._maxItems - 1;
	var lastPage = this._maxPages - 1;
	if (this._page !== lastPage) {
		this._page = lastPage;
		this.refresh();
	}
	return true;
};

Window_Trophies.prototype.select = function(index) {
	var dataIndex = index + this._maxItems * this._page;
	if (dataIndex < 0) {
		return this.selectLastItem();
	} else if (dataIndex >= this._data.length) {
		return this.selectFirstItem();
	}
	var data = this._data[dataIndex];
	if (!data) return false;
	if (index < 0) {
		this._page--;
		this._selected = this._maxItems - 1;
		this.refresh();
		return true;
	} else if (index + 1 > this._maxItems) {
		this._page++;
		this._selected = 0;
		this.refresh();
		return true;
	} else if (this._selected != index) {
		this._selected = index;
		return true;
	}
	return false;
};

//The scale variation and the anchor's change cause an offset on both axis
Window_Trophies.prototype.fixToTrophyX = function() {
	var width = this._trophy_w;
	if (!this.isGrowSelector()) {
		var scale = 1 - this.scaleVariation();
		width /= scale;
	}
	var variation_x = width * this._anchor;
	return Math.ceil(this.standardPadding() + variation_x);
};

Window_Trophies.prototype.fixToTrophyY = function() {
	var height = this._trophy_h;
	if (!this.isGrowSelector()) {
		var scale = 1 - this.scaleVariation();
		height /= scale;
	}
	var variation_y = height * this._anchor;
	return Math.ceil(this.standardPadding() + variation_y);
};

//Change the trophy's selector
Window_Trophies.prototype.setSelector = function(selector) {
	selector = selector === 'grow' ? 'grow' : 'selector';
	$dataAchievsMenu.Trophies.selector = selector;
	this.removeSprites();
	this.initValues();
	this.createSprites();
	this.refresh();
};

//Getting the image of the selected trophy
Window_Trophies.prototype.selectedImage = function() {
	var enabled = this.isTrophies();
	var index = this._selected + this._maxItems * this._page;
	var item = enabled ? this._data[index] : this._data[index];
	if (enabled) {
		return item.imageName();
	}
	var unlocked = !!item.id;
	return unlocked ? item.backgroundImage : SMO.AM.Images.lockedTrophy;
};

//Getting the description of the selected trophy
Window_Trophies.prototype.selectedDescription = function() {
	var isRecent = $dataAchievsMenu.Trophies.type === 'recent';
	var enabled = this.isTrophies();
	var index = this._selected + this._maxItems * this._page;
	var item = this._data[index];
	return isRecent ? $dataAchievsMenu.Trophies.locked : item.description;
};

Window_Trophies.prototype.removeSprites = function() {
	this.removeTrophies();
	this.removeChild(this._selector);
	this.removeChild(this._arrows[0]);
	this.removeChild(this._arrows[1]);
};

Window_Trophies.prototype.removeTrophies = function() {
	for (var t = 0; t < this._trophies.length; t++) {
		this.removeChild(this._trophies[t]);
	}
};

//==========================================================================================
// Achievement Info - Create
//==========================================================================================
function Window_AchievInfo() {
	this.initialize.apply(this, arguments);
}

Window_AchievInfo.prototype = Object.create(Window_Base.prototype);
Window_AchievInfo.prototype.constructor = Window_AchievInfo;

//========================================
// Achievement Info - Initialize

Window_AchievInfo.prototype.initialize = function() {
	try {
		var width = eval($dataAchievsMenu.AchievsInfo.width);
		var height = eval($dataAchievsMenu.AchievsInfo.height);
		var x = eval($dataAchievsMenu.AchievsInfo.x);
		var y = eval($dataAchievsMenu.AchievsInfo.y);
	} catch(e) {
		console.error('Error on the Info Window position/size formula.')
		console.error(e)
		var width = Math.floor(Graphics.width / 2);
		var height = 468;
		var x = Math.floor(Graphics.width / 4);
		var y = 78;
	}
	this._textMaxWidth = width - 36;
	this._data = null;
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.initItemLists();
	this.openness = 0;
};

Window_AchievInfo.prototype.initItemLists = function() {
	var padding = this.standardPadding();
	var scrollC1 = $dataAchievsMenu.AchievsInfo.scrollColor1;
	var scrollC2 = $dataAchievsMenu.AchievsInfo.scrollColor2;
	var data = {
		x: padding,
		y: 220,
		width: this.width - padding * 2,
		height: 69,
		itemHeight: 34,
		hideSelect: true,
		borderSize: 0,
		fontFace: $dataAchievsMenu.AchievsInfo.fontFace,
		textColor: $dataAchievsMenu.AchievsInfo.textColor,
		backColor: 'rgba(0,0,0,0.4)',
		selectorColor: 'rgba(0,0,0,0.8)',
		hoverColor: 'rgba(0,0,0,0.8)',
		itemColors: ['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.4)'],
		scrollColors: [scrollC1, scrollC2]
	};
	if (!$dataAchievsMenu.AchievsInfo.requirements) {
		data.y -= 28;
	}
	this.initRequirementsList(data);
	if (!$dataAchievsMenu.AchievsInfo.rewards) {
		data.y -= 28;
	}
	this.initRewardsList(data);
	this.initCollectButton();
};

Window_AchievInfo.prototype.initRequirementsList = function(data) {
	this._requirementsList = new Sprite_ItemList(data, 2);
	this._requirementsList.visible = false;
	this._requirementsList.update = function() {
		Sprite_ItemList.prototype.update.call(this);
		if (this.visible && TouchInput.isTriggered() && !this.isHovered()) {
			this.deselectAllItems();
		}
	};
	this._requirementsList.isXyFilled = function() {
		return true;
	};
	this.addChild(this._requirementsList);
};

Window_AchievInfo.prototype.initRewardsList = function(data) {
	if (!SMO.AM.useRewards) return;
	data.y += 125;
	this._rewardsList = new Sprite_ItemList(data, 2);
	this._rewardsList.visible = false;
	this._rewardsList.update = function() {
		Sprite_ItemList.prototype.update.call(this);
		if (this.visible && TouchInput.isTriggered() && !this.isHovered()) {
			this.deselectAllItems();
		}
	};
	this._rewardsList.isXyFilled = function() {
		return true;
	};
	this.addChild(this._rewardsList);
};

Window_AchievInfo.prototype.initCollectButton = function() {
	if (!SMO.AM.isManualReward && !SMO.AM.isEditorAllowed()) return;
	if (!SMO.AM.useRewards) return;
	var color = $dataAchievsMenu.AchievsInfo.collectColor;
	var bColor = color.indexOf('rgb') > -1 ? color : SMO.AM.hexToRgb(color);
	bColor = [
		Math.min(255, bColor[0] + 40),
		Math.min(255, bColor[1] + 40),
		Math.min(255, bColor[2] + 40)
	];
	bColor = `rgba(${bColor[0]}, ${bColor[1]}, ${bColor[2]}, 1)`;
	var imageName = $dataAchievsMenu.AchievsInfo.collectImage;
	imageName = imageName ? `achievements/${imageName}` : '';
	var collectBtnData = {
		textAlign: 'center',
		x: $dataAchievsMenu.AchievsInfo.collectX,
		y: $dataAchievsMenu.AchievsInfo.collectY,
		width: $dataAchievsMenu.AchievsInfo.collectWidth,
		height: $dataAchievsMenu.AchievsInfo.collectHeight,
		fontFace: $dataAchievsMenu.AchievsInfo.fontFace,
		textColor: $dataAchievsMenu.AchievsInfo.textColor,
		backColor: color,
		borderColor: bColor,
		borderSize: Number($dataAchievsMenu.AchievsInfo.collectBorderSize),
		design: 'round-rect',
		fontSize: 16,
		img: imageName,
		onClick: this.onRewardCollected.bind(this)
	};
	this._collectButton = new SButton_Confirm(collectBtnData);
	this._collectButton.update = function() {
		SButton_Confirm.prototype.update.call(this);
		if (SceneManager._scene.isEditing() && !this.visible) {
			this.visible = true;
		}
	};
	this._collectButton.visible = false;
	this.addChild(this._collectButton);
};

Window_AchievInfo.prototype.reinitCollectButton = function() {
	this.removeChild(this._collectButton);
	this.initCollectButton();
	if (this._collectButton) {
		this.refreshCollectButton();
		this._collectButton.visible = this.isOpen();
	}
};

//========================================
// Achievement Info - Update

Window_AchievInfo.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.updateTriggers();
};

Window_AchievInfo.prototype.updateTriggers = function() {
	var scene = SceneManager._scene;
	if (scene.isEditing && scene.isEditing()) return;
	if (!this.isOpen()) return;

	if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isCancelled()) {
		var isCollect = this._collectButton && this._collectButton.visible && this._collectButton.enabled;
		if (Input.isTriggered('ok') && isCollect && this._collectButton.isSelected()) {
			this._data.gainRewards();
			scene._achievementsWindow.redrawCurrentItem();
		}
		SoundManager.playCancel();
		return scene.onAchievementOk();
	}
	if (Input.isTriggered('shift')) {
		var isCollect = this._collectButton && this._collectButton.visible && this._collectButton.enabled;
		var reqs = this._requirementsList;
		var rews = this._rewardsList;
		var isReqSelected = !!(reqs && reqs._selectedIndexes.length);
		var isRewSelected = !!(rews && rews._selectedIndexes.length);
		var isCollectSelected = isCollect && this._collectButton.isSelected();
		if (isReqSelected) {
			scene.selectButton(null);
			reqs.deselectAllItems();
			if (rews) {
				rews.selectItem(0);
				scene.selectButton(rews);
			} else if (isCollect) {
				scene.selectButton(this._collectButton);
			}
		} else if (isRewSelected) {
			scene.selectButton(null);
			rews.deselectAllItems();
			if (isCollect) {
				scene.selectButton(this._collectButton);
			} else if (reqs) {
				reqs.selectItem(0);
				scene.selectButton(reqs);
			}
		} else if (isCollectSelected) {
			if (reqs) {
				reqs.selectItem(0);
				scene.selectButton(reqs);
			} else if (rews) {
				rews.selectItem(0);
				scene.selectButton(rews);
			}
			scene.selectButton(null);
		} else {
			if (reqs) {
				reqs.selectItem(0);
				scene.selectButton(reqs);
			} else if (rews) {
				rews.selectItem(0);
				scene.selectButton(rews);
			} else if (isCollect) {
				scene.selectButton(this._collectButton);
			}
		}
	}
};

Window_AchievInfo.prototype.updateOpen = function() {
	var opening = this._opening;
	Window_Base.prototype.updateOpen.call(this);
	var isDoneOpening = opening && !this._opening;
	if (isDoneOpening && this._data) {
		this._requirementsList.visible = true;
		if (this._rewardsList) {
			this._rewardsList.visible = true;
		}
		if (this._collectButton && !this._data.isSecret()) {
			this._collectButton.visible = true;
		}
	}
};

//========================================
// Achievement Info - Refresh

Window_AchievInfo.prototype.refresh = function(openning) {
	if (this.isOpen() || openning) {
		this.resetFontSettings();
		this.contents.clear();
		this.drawContents();
		this.opacity = $dataAchievsMenu.AchievsInfo.opacity;
	}
};

Window_AchievInfo.prototype.easyRefresh = function(isUnlock) {
	if (this._data && this._data.isPlaytimeRequired() || isUnlock) {
		this.refresh();
	}
};

Window_AchievInfo.prototype.refreshCollectButton = function() {
	if (!this._collectButton) return;
	if (!this._data) return;
	this._collectButton.visible = false;
	var isCollected = this._data.isCollected();
	var isFromTitle = (SceneManager._stack[0] === Scene_Title);
	var isUnlocked = this._data.isUnlocked();
	var collected = $dataAchievsMenu.AchievsInfo.collected;
	this._collectButton.enabled = isUnlocked && !isCollected && !isFromTitle;
	this._collectButton.text = isCollected ? collected : $dataAchievsMenu.AchievsInfo.collect;
};

//========================================
// Achievement Info - Draw

Window_AchievInfo.prototype.drawContents = function() {
	if (!this._data) return;
	this.drawAchievNameAndIcon();
	this.contents.fontSize -= 6;
	this.drawDescription();
	this.drawAchievStatus();
	this.drawRequirementsText();
	this.drawRewardsText();
	this.contents.fontSize += 6;
};

Window_AchievInfo.prototype.drawAchievNameAndIcon = function() {
	var achiev = this._data;
	var isSecret = achiev.isSecret();
	//Draw Icon
	var iconBoxWidth = 0;
	var iconIndex = achiev.getIcon();
	if (iconIndex > -1) {
		iconBoxWidth = Window_Base._iconWidth + 6;
		this.drawIcon(iconIndex, 0, 0);
	}
	//Draw Name
	var name_align = isSecret ? 'center' : 'left';
	var name_x = isSecret ? (iconBoxWidth ?  0 : -16) : iconBoxWidth;
	this.drawText(achiev.name, name_x, 0, this.width - iconBoxWidth, name_align);
	this.drawHorzLine(Math.round(this.lineHeight()/2));
	this._lockFontState = true;
};

Window_AchievInfo.prototype.drawDescription = function() {
	var achiev = this._data;
	var LH = this.lineHeight();
	var font = {
		size: this.contents.fontSize,
		face: this.contents.fontFace
	};
	var description = SMO.AM.translate(achiev.description);
	description = SMO.AM.wrapText(description, this._textMaxWidth, font, false);
	this.drawTextEx(description, 0, LH);
	this.drawHorzLine(LH * 4);
};

Window_AchievInfo.prototype.drawRequirementsText = function() {
	this.changeTextColor('#84aaff'); //system color
	this.drawText($dataAchievsMenu.AchievsInfo.requirements, 0, 164, this._textMaxWidth, 'center');
	this.changeTextColor(this.normalColor());
};

Window_AchievInfo.prototype.drawRewardsText = function() {
	if (!SMO.AM.useRewards) return;
	var offset = $dataAchievsMenu.AchievsInfo.requirements ? 0 : 28;
	this.drawHorzLine(270 - offset);
	this.changeTextColor(this.systemColor());
	this.drawText($dataAchievsMenu.AchievsInfo.rewards, 0, 290 - offset, this._textMaxWidth, 'center');
	this.changeTextColor(this.normalColor());
	this._lockFontState = false;
};

Window_AchievInfo.prototype.drawIcon = function(iconIndex, x, y) {
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	this.contents.blt(bitmap, sx, sy, pw, ph, x + 2, y, pw - 4, ph - 4);
};

Window_AchievInfo.prototype.drawAchievStatus = function() {
	var item = this._data;
	if (item.isSecret()) return;
	if (item.isUnlocked()) {
		var text = item.getUnlockDateString();
	} else {
		var text = $dataAchievsMenu.Trophies.locked;
	}
	var y = this.lineHeight() * 4 - 20;
	var color = item.isUnlocked() ? SMO.AM.unlockedColor : this.systemColor();
	this.changeTextColor(color);
	this.drawText(text, 0, y, this._textMaxWidth, 'center');
	this.changeTextColor(this.normalColor());
};

Window_AchievInfo.prototype.drawHorzLine = function(y) {
	var lineY = y + this.lineHeight() / 2 - 1;
	this.contents.paintOpacity = 48;
	this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
	this.contents.paintOpacity = 255;
};

Window_AchievInfo.prototype.redrawItemOnAchievsWindow = function() {
	var ItemWindow = SceneManager._scene._achievementsWindow;
	var index = ItemWindow._data.indexOf(this._data);
	var initialIndex = ItemWindow.topIndex();
	var finalIndex = initialIndex + ItemWindow.maxPageItems() - 1;
	if (index > -1 && index >= initialIndex && index <= finalIndex) {
		ItemWindow.redrawItem(index);
	}
};

//========================================
// Achievement Info - Settings

Window_AchievInfo.prototype.defineSetting = function(parameter, value, refresh) {
	if (value == null) return;
	if ($dataAchievsMenu.AchievsInfo[parameter] == null) return;
	$dataAchievsMenu.AchievsInfo[parameter] = value;
	if (refresh) {
		switch(parameter) {
		case 'x':
		case 'y':
			this[parameter] = eval(value);
			break;
		case 'width':
		case 'height':
			this[parameter] = eval(value);
			this.createContents();
			this.refresh();
			break;
		case 'fontFace':
			this._requirementsList[parameter] = value;
			if (this._collectButton) {
				this._collectButton[parameter] = value;
			}
			if (this._rewardsList) {
				this._rewardsList[parameter] = value;
			}
			this.refresh();
			break;
		case 'textColor':
			var oldTxtColor = this.contents.textColor;
			var newTextColor = value;
			if (!this._requirementsList.isEmpty()) {
				this._requirementsList._items.forEach(function(r) {
					r.textColor = r.textColor === oldTxtColor ? newTextColor : r.textColor;
				});
				this._requirementsList.redraw();
			}
			if (this._rewardsList && !this._rewardsList.isEmpty()) {
				this._rewardsList._items.forEach(function(r) {
					r.textColor = r.textColor === oldTxtColor ? newTextColor : r.textColor;
				});
				this._rewardsList.redraw();
			}
			if (this._collectButton) {
				this._collectButton.textColor = value;
			}
			this.refresh();
			break;
		case 'windowSkin':
			this.windowskin = ImageManager.loadSystem($dataAchievsMenu.AchievsInfo.windowSkin || 'Window');
			break;
		default:
			this.refresh();
			break;
		}
	}
};

Window_AchievInfo.prototype.getSetting = function(parameter) {
	return $dataAchievsMenu.AchievsInfo[parameter];
};

Window_AchievInfo.prototype.standardFontFace = function() {
	var ff = $dataAchievsMenu.AchievsInfo.fontFace;
	return ff || Window_Base.prototype.standardFontFace.call(this);
};

Window_AchievInfo.prototype.standardFontSize = function() {
	var fs = $dataAchievsMenu.AchievsInfo.fontSize;
	return fs || Window_Base.prototype.standardFontSize.call(this);
};

Window_AchievInfo.prototype.normalColor = function() {
    return $dataAchievsMenu.AchievsInfo.textColor || Window_Base.prototype.normalColor.call(this);
};

Window_AchievInfo.prototype.loadWindowskin = function() {
	var skin_name = $dataAchievsMenu.AchievsInfo.windowSkin || 'Window';
	this.windowskin = ImageManager.loadSystem(skin_name);
};

Window_AchievInfo.prototype.resetFontSettings = function() {
	if (this._lockFontState) return;
	this.contents.fontFace = this.standardFontFace();
	this.contents.fontSize = this.standardFontSize();
	this.resetTextColor();
};

//========================================
// Achievement Info - Others

Window_AchievInfo.prototype.onRewardCollected = function() {
	this._collectButton.text = $dataAchievsMenu.AchievsInfo.collected;
	this._collectButton.enabled = false;
	if (!this._data) return;
	this._data.gainRewards();
	this.redrawItemOnAchievsWindow();
	this._rewardsList._items.forEach(r => r.textColor = SMO.AM.unlockedColor);
	this._rewardsList.redraw();
};

Window_AchievInfo.prototype.open = function(achievement) {
	this.setData(achievement);
	Window_Base.prototype.open.call(this);
	this.refresh(true);
};

Window_AchievInfo.prototype.close = function() {
	Window_Base.prototype.close.call(this);
	this._requirementsList.visible = false;
	if (this._rewardsList) {
		this._rewardsList.visible = false;
	}
	if (this._collectButton) {
		this._collectButton.visible = false;
	}
};

Window_AchievInfo.prototype.setData = function(data) {
	this._data = data ? data : null;
	if (this._data) {
		this.getReqRewData();
		this.refreshCollectButton();
	}
};

Window_AchievInfo.prototype.getReqRewData = function(dataName) {
	var v1, v2, dataName, data, spriteName;
	var isUnlocked = this._data.isUnlocked();
	var isCollected = this._data.isCollected();
	var none = $dataAchievsMenu.AchievsInfo.none;
	if (this._data.isSecret()) {
		this._requirementsList._itemHeight = 68;
		this._requirementsList._cols = 1;
		this._requirementsList.setItemList([{name: SMO.AM.secretSign, align: 'center'}]);
		this._rewardsList._itemHeight = 68;
		this._rewardsList._cols = 1;
		this._rewardsList.setItemList([{name: SMO.AM.secretSign, align: 'center'}]);
		return;
	}

	function getRewData(r) {
		var iconIndex = r.getIcon();
		return {
			name: r.getText(),
			iconIndex: iconIndex > -1 ? iconIndex : -2,
			textColor: isCollected ? SMO.AM.unlockedColor : $dataAchievsMenu.AchievsInfo.textColor
		};
	}
	function getReqData(r) {
		var iconIndex = r.getIcon();
		return {
			name: r.getText(),
			iconIndex: iconIndex > -1 ? iconIndex : -2,
			textColor: isUnlocked || r.isReached() ? SMO.AM.unlockedColor : $dataAchievsMenu.AchievsInfo.textColor
		};
	}
	for (var a = 0; a < 2; a++) {
		dataName = a ? 'rewards' : 'requirements';
		spriteName = `_${dataName}List`;
		if (!this[spriteName]) {
			continue;
		}
		data = this._data[dataName];
		data = data.length ? data.map(a ? getRewData : getReqData) : [{ name:none, textColor:SMO.AM.unlockedColor }];
		spriteName = `_${dataName}List`;
		this[spriteName]._gap_col = 0;
		this[spriteName]._gap_row = 0;
		if (data.length < 3) {
			//Set new values
			this[spriteName]._itemHeight = 68;
			this[spriteName]._cols = 1;
			data[0].align = 'center';
			if (data.length === 2) {
				this[spriteName]._itemHeight = 34;
				data[1].align = 'center';
			}
		} else {
			this[spriteName]._itemHeight = 34;
			this[spriteName]._cols = 2;
		}
		this[spriteName].setItemList(data);
	}
};

//==========================================================================================
// Touch Input
//==========================================================================================
SMO.AM._TouchInput_clear = TouchInput.clear;
TouchInput.clear = function() {
	SMO.AM._TouchInput_clear.call(this);
	this._cX = 0;
	this._cY = 0;
};

SMO.AM._TouchInput__onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
	SMO.AM._TouchInput__onMouseMove.call(this, event);
	this._cX = Graphics.pageToCanvasX(event.pageX);
	this._cY = Graphics.pageToCanvasY(event.pageY);
};

//==========================================================================================
// Input
//==========================================================================================
SMO.AM._Input__onKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event) {
	SMO.AM._Input__onKeyDown.call(this, event);
	SMO.AM.onKeyDown(event);
};

SMO.AM.onKeyDown = function(event) {
	if (!SceneManager._scene) return;
	if (SceneManager._scene.isTextInputSelected()) {
		var code = event.keyCode;
		var special = SButton_Text.SPECIAL_KEY_CODES;
		var command = SButton_Text.COMMAND_KEYS;
		var isCommand = !!command[code];
		if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || isCommand || special[code]) {
			let key = isCommand ? command[code] : event.key;
			let shift = event.shiftKey;
			let ctrl = event.ctrlKey;
			let alt = event.altKey;
			SButton_Text.PressedKeys[code] = { key, shift, ctrl, alt };
		}
	}
};

SMO.AM._Input__onKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) {
	SMO.AM._Input__onKeyUp.call(this, event);
	SMO.AM.onKeyUp(event);
};

SMO.AM.onKeyUp = function(event) {
	var code = event.keyCode;
	var key = event.key;
	var special = SButton_Text.SPECIAL_KEY_CODES;
	var command = SButton_Text.COMMAND_KEYS;
	if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || special[code] || command[code]) {
		delete SButton_Text.PressedKeys[code];
	}
};

Input.keyQuickRepeatInterval = 3;
Input.isQuickRepeated = function(keyName) {
	if (this._isEscapeCompatible(keyName) && this.isQuickRepeated('escape')) {
		return true;
	} else {
		return (this._latestButton === keyName &&
				(this._pressedTime === 0 ||
				(this._pressedTime >= this.keyRepeatWait &&
				this._pressedTime % this.keyQuickRepeatInterval === 0)));
	}
};

SMO.AM._TouchInput__onWheel = TouchInput._onWheel;
TouchInput._onWheel = function(event) {
	SMO.AM._TouchInput__onWheel.call(this, event);
	SMO.AM.onWheel(this._events.wheelX, this._events.wheelY);
};

SMO.AM.onWheel = function(wheelX, wheelY) {
	var scene = SceneManager._scene;
	if (!scene) return;
	if (!scene.SButtons) return; // 防止游戏初始化时期滚轮报错
	var hovered = scene.SButtons._hovered;
	hovered = hovered && hovered.isScroll && hovered.isScroll() ? hovered : null;
	var button = hovered || scene.selectedButton();
	if (scene.isSelecting() || (button && button.isScroll)) {
		if (button && button.isScroll()) {
			var scroller = button._scroller;
			var roller = scroller._roller;
			var limitY = scroller.height - roller.height;
			var y = (Math.floor(wheelY/10) + roller.y).clamp(0, limitY);
			if (roller.y !== y) {
				roller.y = y;
				roller.onMoved();
			}
		}
	}
};

//==============================================================================================
//==============================================================================================
// SButtons -> Special Buttons
//==============================================================================================
//==============================================================================================
//----------------------------------------------------------------------------------------------
// Button Base - Create
//----------------------------------------------------------------------------------------------
function SButton_Base() {
	this.initialize.apply(this, arguments);
}

SButton_Base.prototype = Object.create(Sprite.prototype);
SButton_Base.prototype.constructor = SButton_Confirm;

Object.defineProperties(SButton_Base.prototype, {
	width: {
		get: function() {
			return this._frame.width;
		},
		set: function(value) {
			if (this._frame.width === value) return;
			this.bitmap.resize(value, this._frame.height);
			this._frame.width = value;
			this._refresh();
			if (this.borders) {
				this.borders._frame.width = value;
				this.borders.bitmap.resize(value, this._frame.height);
				this.borders._refresh();
			}
			if (this.txtChild) {
				this.txtChild._frame.width = value;
				this.txtChild.bitmap.resize(value, this._frame.height);
				this.txtChild._refresh();
			}
			this._needRedraw = true;
		},
		configurable: true
	},

	height: {
		get: function() {
			return this._frame.height;
		},
		set: function(value) {
			if (this._frame.height === value) return;
			this._frame.height = value;
			this.bitmap.resize(this._frame.width, value);
			this._refresh();
			if (this.borders) {
				this.borders._frame.height = value;
				this.borders.bitmap.resize(this._frame.width, value);
				this.borders._refresh();
			}
			if (this.txtChild) {
				this.txtChild._frame.height = value;
				this.txtChild.bitmap.resize(this._frame.width, value);
				this.txtChild._refresh();
			}
			this._needRedraw = true;
		},
		configurable: true
	},

	enabled: {
		configurable: true,
		get: function() {
			return this._data.enabled;
		},
		set: function(value) {
			value = !!value;
			if (this._data.enabled != value) {
				this._data.enabled = value;
				if (value) {
					this.onEnable();
				} else {
					this.onDisable();
				}
				this.refreshEnabledTone();
			}
		}
	},

	text: {
		configurable: true,
		get: function() {
			return this._data.text;
		},
		set: function(value) {
			value = value == null ? '' : String(value);
			if (this._data.text != value) {
				this._data.text = value;
				this.redrawMyText();
			}
		}
	},

	textColor: {
		configurable: true,
		get: function() {
			return this._data.textColor;
		},
		set: function(value) {
			if (this._data.textColor != value) {
				this._data.textColor = value;
				this.txtChild.bitmap.textColor = this._data.textColor;
				this.redrawMyText();
			}
		}
	},

	fontSize: {
		configurable: true,
		get: function() {
			return this._data.fontSize;
		},
		set: function(value) {
			if (value > 0 && this.txtChild.bitmap.fontSize !== value) {
				this._data.fontSize = Number(value);
				this.txtChild.bitmap.fontSize = this._data.fontSize;
				this.redrawMyText();
			}
		}
	},

	fontFace: {
		configurable: true,
		get: function() {
			return this._data.fontFace;
		},
		set: function(value) {
			if ((value = String(value)) && this.txtChild.bitmap.fontFace !== value) {
				this._data.fontFace = Number(value);
				this.txtChild.bitmap.fontFace = this._data.fontFace;
				this.redrawMyText();
			}
		}
	},

	design: {
		configurable: true,
		get: function() {
			return this._data.design;
		},
		set: function(value) {
			if (this._data.design != value && SBUTTON_DESIGNS.contains(value)) {
				this._data.design = value;
				this.redrawBackground();
				this.redrawBorders();
			}
		}
	},

	backColor: {
		configurable: true,
		get: function() {
			return this._data.backColor;
		},
		set: function(value) {
			if (this._data.backColor != value) {
				this._data.backColor = value;
				this.redrawBackground();
			}
		}
	},

	borderColor: {
		configurable: true,
		get: function() {
			return this._data.borderColor;
		},
		set: function(value) {
			if (this._data.borderColor != value) {
				this._data.borderColor = value;
				this.redrawBorders();
			}
		}
	},

	borderSize: {
		configurable: true,
		get: function() {
			return this._data.borderSize;
		},
		set: function(value) {
			if (this._data.borderSize != value) {
				this._data.borderSize = value;
				this.redraw();
			}
		}
	}
});

//========================================
// Button Base - Initialize

SButton_Base.prototype.initialize = function(data) {
	Sprite.prototype.initialize.call(this);
	this.initValues(data || {});
	this.initPosition();
	this.initBitmaps();
	this.addListener('added', this.onParentAdded.bind(this));
	this.addListener('removed', this.onParentRemoved.bind(this));
	this.checkReady();
};

SButton_Base.prototype.initValues = function(data) {
	this.getDefaultData(data);
	this._imgStates = [];
	this._fixedTone = false;
	this._hovered = false;
	this._overrideSelect = false;
	this._overrideState = false;
	this._needRedraw = false;
	this._ready = false;
	this.visible = false;
};

SButton_Base.prototype.getDefaultData = function(data) {
	this.id = data.id != null ? data.id : '';
	this._data = {};
	for (var k in SBUTTON_DEFAULT) {
		this._data[k] = data[k] != null ? data[k] : SBUTTON_DEFAULT[k];
	}

	if (!Array.isArray(this._data.textOffset)) {
		this._data.textOffset = [0, 0];
	}
	if (this._data.textOffset.length < 2) {
		this._data.textOffset[0] = this._data.textOffset[0] || 0;
		this._data.textOffset[1] = this._data.textOffset[1] || 0;
	}

	if (!SBUTTON_DESIGNS.contains(this._data.design)) {
		this._data.design = SBUTTON_DESIGNS[0];
	}
};

SButton_Base.prototype.initPosition = function() {
	this.x = this._data.x;
	this.y = this._data.y;
};

SButton_Base.prototype.initBitmaps = function() {
	this.bitmap = new Bitmap(this._data.width, this._data.height);
	this.txtChild = new Sprite(new Bitmap(this._data.width, this._data.height));
	this.txtChild.bitmap.fontSize = this.fontSize;
	this.txtChild.bitmap.fontFace = this.fontFace;
	this.txtChild.bitmap.textColor = this.textColor;
	this.txtChild.update = function() {
		Sprite.prototype.update.call(this);
		var parent = this.parent;
		if (parent && parent.anchor && (parent.anchor.x !== this.anchor.x || parent.anchor.y  !== this.anchor.y)) {
			this.anchor.x = parent.anchor.x;
			this.anchor.y = parent.anchor.y;
		}
	};
	this.borders = new Sprite(new Bitmap(this._data.width, this._data.height));
	this.borders.update = function() {
		Sprite.prototype.update.call(this);
		var parent = this.parent;
		if (parent && parent.anchor && (parent.anchor.x !== this.anchor.x || parent.anchor.y  !== this.anchor.y)) {
			this.anchor.x = parent.anchor.x;
			this.anchor.y = parent.anchor.y;
		}
	};
	this.addChild(this.txtChild);
	this.addChild(this.borders);
};

//Method - checkReady
// * Checks if this button's images are loaded
SButton_Base.prototype.checkReady = function() {
	if (this.loadMyImages()) {
		this._ready = true;
		this.onReady();
	}
};

SButton_Base.prototype.onReady = function() {
	this.show();
	this.drawMe();
};

//========================================
// Button Base - Listeners

SButton_Base.prototype.onParentAdded = function() {
	var tone = this.isEnabled() ? 0 : this._data.disabledTone;
	this.setColorTone([tone, tone, tone, tone]);
	if (this.parent.anchor && (this.parent.anchor.x > 0 || this.parent.anchor.y > 0)) {
		this.x -= this.parent.width * this.parent.anchor.x;
		this.y -= this.parent.height * this.parent.anchor.y;
	};
	SceneManager._scene.addSButton(this);
};

SButton_Base.prototype.onParentRemoved = function() {
	this.x = this._data.x;
	this.y = this._data.y;
	if (this.isSelected()) {
		SceneManager._scene.selectButton(null);
	}
	SceneManager._scene.removeSButton(this);
};

//========================================
// Button Base - Update

SButton_Base.prototype.update = function() {
	this.updateRedraw();
	this.updateLoadState();
	this.updateSort();
	this.updateTouchTrigger();
	Sprite.prototype.update.call(this);
	if (this._parentFocused) return this._parentFocused = false;
	if (this.isStateActive()) {
		this.updateEnabledState();
		this.updateHoverAndTone();
	}
};

SButton_Base.prototype.updateRedraw = function() {
	if (this._needRedraw) {
		this._needRedraw = false;
		this.redraw();
	}
};

SButton_Base.prototype.updateLoadState = function() {
	if (this._ready) return;
	this.checkReady();
};

SButton_Base.prototype.updateSort = function() {
	if (this._needSort) {
		SceneManager._scene.SButtons._all.push(this);
		this._needSort = false;
	}
};

SButton_Base.prototype.updateTouchTrigger = function() {
	if (this._touching) {
		if (TouchInput.isReleased() || !this.isMouseOverMe()) {
			this._touching = false;
			if (this._data.clickImg) {
				this.redrawBackground();
			}
			if (TouchInput.isReleased()) {
				this.onClick();
			}
		}
	}
};

SButton_Base.prototype.updateEnabledState = function() {
	if (!this.isActive()) return;
	if (this._data.enableMethod) {
		this.enabled = this._data.enableMethod();
	}
};

SButton_Base.prototype.updateHoverAndTone = function() {
	var tone = this._colorTone[0];
	var htone = this._data.hoverTone;
	var dtone = this._data.disabledTone;

	if (!this.isEnabled())
		return (tone != dtone) ? this.setColorTone([dtone, dtone, dtone, dtone]) : undefined;

	if (!this.isHoverEdible() || this._fixedTone)
		return (tone != 0) ? this.setColorTone([0, 0, 0, 0]) : undefined;

	//Removing tone added after click
	if (tone > htone + 4)
		return this.setColorTone([tone-5, tone-5, tone-5, tone-5]);

	//Adding tone when hovered
	if (this._hovered && this.isEnabled())
		return (tone < htone - 4) ? this.setColorTone([tone+5, tone+5, tone+5, tone+5]) : undefined;

	//Removing tone when not hovered
	if (tone > 4)
		return this.setColorTone([tone-5, tone-5, tone-5, tone-5]);
};

//========================================
// Button Base - Draw

SButton_Base.prototype.drawMe = function() {
	this.drawBackground();
	this.drawBorders();
	this.drawMyText();
	this.refreshEnabledTone();
};

SButton_Base.prototype.drawBackground = function() {
	var data = this._data;
	var width = this.bitmap.width;
	var height = this.bitmap.height;
	var bds = data.borderSize;
	var img = this._touching ? data.clickImg : data.hoverImg && this.isHovered() ? data.hoverImg : data.img;
	switch(data.design) {
	case 'circle':
		var radius = Math.ceil(width / 2 - bds);
		var x = Math.floor(width / 2);
		var y = Math.floor(height / 2);
		this.bitmap.drawCircleBackground(x, y, radius, data.backColor, img);
		break;
	case 'round-rect':
		var radius = Math.floor(Math.min(width, height) / 5) - bds;
		if (radius > 0) {
			width -= bds * 2;
			height -= bds * 2;
			this.bitmap.drawRoundedRect(bds, bds, width, height, radius, data.backColor, img);
			break;
		} //else -> use default
	default: //'rect'
		this.bitmap.drawRectBackground(0, 0, width, height, bds, data.backColor, img);
		break;
	}
};

SButton_Base.prototype.drawBorders = function() {
	if (!this.borders) return;
	var data = this._data;
	var thickness = this.borderSize;
	if (!thickness) return;
	var bmp = this.borders.bitmap;
	var width = this.width;
	var height = this.height;
	var isSelectorColor = this.isSelected() && data.selectorColor && !data.hideSelect && this.enabled;
	var color = isSelectorColor ? data.selectorColor : data.borderColor;
	switch(data.design) {
	case 'circle':
		var radius = Math.ceil(width / 2);
		bmp.drawCircumference(radius, radius, radius, thickness, color);
		break;
	case 'round-rect':
		var radius = Math.floor(Math.min(width, height) / 5);
		bmp.drawRoundedBorders(0, 0, width, height, radius, thickness, color, data.useShadow);
		break;
	default: //'rect'
		bmp.drawRectBorders(0, 0, width, height, thickness, color, data.useShadow);
		break;
	}
};

SButton_Base.prototype.drawMyText = function() {
	if (!this.txtChild) return;
	var bitmap = this.txtChild.bitmap;
	if (!this.text) return bitmap.clear();
	var data = this._data;
	bitmap.fontSize = data.fontSize;
	bitmap.textColor = data.textColor;
	var x = data.textOffset[0] + data.borderSize;
	var y = data.textOffset[1] + data.borderSize;
	var maxWidth = this.txtChild.width - data.borderSize * 2;
	var maxHeight = this.txtChild.height - data.borderSize * 2;
	var align = data.textAlign;
	bitmap.drawText(this.text, x, y, maxWidth, maxHeight, align);
};

SButton_Base.prototype.refreshEnabledTone = function() {
	if (this._fixedTone) return;
	var enabled = this.isEnabled();
	var hoverTone = this._data.hoverTone;
	var deactTone = enabled ? 0 : this._data.disabledTone;
	var tone = enabled && this._hovered ? hoverTone : deactTone;
	var currentTone = this._colorTone[0];
	if (tone != currentTone) {
		this.setColorTone([tone, tone, tone, tone]);
	}
	if (this.txtChild && this.txtChild._colorTone[0] !== deactTone) {
		this.txtChild.setColorTone([deactTone, deactTone, deactTone, deactTone]);
	}
	if (this.borders && this.borders._colorTone[0] !== deactTone) {
		this.borders.setColorTone([deactTone, deactTone, deactTone, deactTone]);
	}
};

//========================================
// Button Base - Redraw

SButton_Base.prototype.redraw = function() {
	this.setColorTone([0, 0, 0, 0]);
	this.bitmap.clear();
	if (this.txtChild) {
		this.txtChild.setColorTone([0, 0, 0, 0]);
		this.txtChild.bitmap.clear();
	}
	this.redrawBorders();
	this.drawMe();
};

SButton_Base.prototype.redrawBackground = function() {
	this.setColorTone([0, 0, 0, 0]);
	this.bitmap.clear();
	this.drawBackground();
	this.refreshEnabledTone();
};

SButton_Base.prototype.redrawBorders = function() {
	if (!this.borders) return;
	this.borders.setColorTone([0, 0, 0, 0]);
	this.borders.bitmap.clear();
	this.drawBorders();
	this.refreshEnabledTone();
};

SButton_Base.prototype.redrawMyText = function() {
	if (!this.txtChild) return;
	this.txtChild.setColorTone([0, 0, 0, 0]);
	this.txtChild.bitmap.clear();
	this.drawMyText();
	this.refreshEnabledTone();
};

//========================================
// Button Base - Select

//Method - onSelect
// * Called the moment the user clicks this button
// * The selected button's borders become the color of "this._data.selectorColor"
// * While the click is hold, the background image of this button will be "this._data.clickImg"
// * After relasing the click, if the cursor was kept over the button, the function "onClick" will be called
SButton_Base.prototype.onSelect = function(touch) {
	this._touching = touch === undefined ? true : touch;
	if (this._touching && this._data.clickImg) {
		this.redrawBackground();
	}
	this.redrawBorders();
};

SButton_Base.prototype.onReselect = function() {
	this._touching = true;
	if (this._data.clickImg) {
		this.redrawBackground();
	}
};

//Method - onDeselect
// * Called once the user clicks on another button, or anywhere else on the screen
// * The button's borders return to their original color "this._data.borderColor"
SButton_Base.prototype.onDeselect = function() {
	this.redrawBorders();
};

SButton_Base.prototype.isSelected = function() {
	return SceneManager._scene.selectedButton() === this;
};

//========================================
// Button Base - Click Handler

//Method - onClick
// * Called once the click is released while the cursor is still over the button
SButton_Base.prototype.onClick = function() {
	if (this.isEnabled()) {
		this.onClickSuccess();
	} else {
		this.onClickFail();
	}
};

SButton_Base.prototype.onClickSuccess = function() {
	if (this._data.onClick) {
		this._data.onClick(this._data.value);
	}
	this.parentFocus();
};

SButton_Base.prototype.onClickFail = function() {};

//Method - parentFocus
// * Places this button at it's parent's the highest layer
SButton_Base.prototype.parentFocus = function() {
	if (!this.parent) return;
	var buttons = SceneManager._scene.getSButtons();
	var index = buttons.indexOf(this);
	if (index < 0) return;
	// Find the first button with the same parent
	for (var b = buttons.length - 1; b > -1; b--) {
		if (buttons[b].parent !== this.parent) {
			continue;
		}
		if (b === index) return; // This button is already on the highest layer
		// Set this button on the highest layer
		var new_index = this.parent.getChildIndex(buttons[b]);
		this.parent.setChildIndex(this, new_index);
		SceneManager._scene.SButtons._needSort = true;
		// Changing a child's index will cause the 'update' function to be called
		// twice this frame, the variable below is used to prevent some weird stuff
		return this._parentFocused = true;
	}
};

//========================================
// Button Base - Enabled

SButton_Base.prototype.isEnabled = function() {
	return this._data.enabled;
};

//Method: "onEnable"
// * Called once this button's state is switched from disabled to enabled
SButton_Base.prototype.onEnable = function() {
};

//Method: "onDisable"
// * Called once this button's state is switched from enabled to disabled
SButton_Base.prototype.onDisable = function() {
};

//========================================
// Button Base - Hover

SButton_Base.prototype.checkHover = function() {
	return this.isHoverEdible() && this.isMouseOverMe();
};

SButton_Base.prototype.isHoverEdible = function() {
	return !!this.parent && this.isActive() && this.isStateActive();
};

SButton_Base.prototype.isMouseOverMe = function() {
	return this.isXyInsideMe(TouchInput._cX, TouchInput._cY);
};

SButton_Base.prototype.isXyInsideMe = function(x, y) {
	x += Sprite_Button.prototype.canvasToLocalX.call(this, 0);
	y += Sprite_Button.prototype.canvasToLocalY.call(this, 0);
	if (this.anchor.x > 0 || this.anchor.y > 0) {
		x += this.width * this.anchor.x;
		y += this.height * this.anchor.y;
	}
	var isInsideMyBox = x >= 0 && x < this.width && y >= 0 && y < this.height;
	return isInsideMyBox && this.isXyFilled(x, y);
};

//Method - isXyFilled
// * Returns a boolean indicating if there's anything drawn on the given pixel
SButton_Base.prototype.isXyFilled = function(x, y) {
	return !!this.bitmap._context.getImageData(x, y, 1, 1).data[3];
};

SButton_Base.prototype.isHovered = function() {
	return this._hovered;
};

SButton_Base.prototype.setHover = function(hover) {
	hover = !!hover;
	if (this._hovered === hover) return;
	if (hover) {
		this.onMouseHover();
	} else {
		this.onMouseLeave();
	}
};

SButton_Base.prototype.onMouseHover = function() {
	this._hovered = true;
	if (this._data.hoverImg) {
		this.redrawBackground();
	}
	if (this._data.cursorStyle) {
		document.body.style.cursor = this._data.cursorStyle;
	};
};

SButton_Base.prototype.onMouseLeave = function() {
	this._hovered = false;
	if (this._data.hoverImg) {
		this.redrawBackground();
	}
	if (this._data.cursorStyle) {
		document.body.style.cursor = '';
	};
};

//========================================
// Button Base - Others

SButton_Base.prototype.redefine = function(data, redraw) {
	for (var d in data) {
		this._data[d] = data[d];
	}
	if (redraw) this.redraw();
};

SButton_Base.prototype.textPaddingX = function() {
	return this.borderSize + this._data.textOffset[0] + 3;
};

SButton_Base.prototype.textPaddingY = function() {
	return this.borderSize + this._data.textOffset[1] + 1;
};

SButton_Base.prototype.realX = function() {
	return -Sprite_Button.prototype.canvasToLocalX.call(this, 0);
};

SButton_Base.prototype.realY = function() {
	return -Sprite_Button.prototype.canvasToLocalY.call(this, 0);
};

SButton_Base.prototype.isActive = function() {
	return this.parent && Sprite_Button.prototype.isActive.call(this);
};

// Method - isButton
// * Used to avoid using "instanceof" to differentiate a Button from a Grabbable Sprite
SButton_Base.prototype.isButton = function() {
	return true;
};

SButton_Base.prototype.loadMyImages = function(type) {
	var name, prop, path, index, filename;
	var Data = this._data;
	var names = [Data.img, Data.hoverImg, Data.clickImg];
	for (var n = 0; n < names.length; n++) {
		name = names[n];
		if (!name) {
			this._imgStates[n] = true;
			continue;
		}
		if (this._imgStates[n] === true) {
			continue;
		} else {
			index = name.lastIndexOf('/') + 1;
			filename = name.slice(index, name.length);
			path = 'img/' + name.slice(0, index);
			this._imgStates[n] = ImageManager.loadBitmap(path, filename, 0, true);
		}
		if (this._imgStates[n].isReady()) {
			this._imgStates[n] = true;
		}
	}
	return !this._imgStates.some(i => i !== true);
};

//Method: "isOverrideSelect"
// * When another button is being selected, this one will ignore the selection
SButton_Base.prototype.isOverrideSelect = function() {
	return this._overrideSelect;
};

SButton_Base.prototype.show = function() {
	this.visible = true;
};

SButton_Base.prototype.hide = function() {
	this.visible = false;
};

SButton_Base.prototype.isStateActive = function() {
	if (this._overrideState) return true;
	if (SceneManager._scene.SButtonsState() === 'on') return true;
	return false;
};

//==========================================================================================
//==========================================================================================
// Grabbable Sprite
// Sprite Grab - Create
//==========================================================================================
//==========================================================================================
function Sprite_Grabbable() {
	this.initialize.apply(this, arguments);
}

Sprite_Grabbable.prototype = Object.create(SButton_Base.prototype);
Sprite_Grabbable.prototype.constructor = Sprite_Grabbable;

Sprite_Grabbable.prototype.initialize = function(Data) {
	Data.useShadow = Data.useShadow || false;
	SButton_Base.prototype.initialize.call(this, Data);
	this._offScreen = {x:0.5, y:0.5};
	this._lastPosition = {x: this.x, y: this.y};
	this._needSort = false;
	this._needStart = true;
	this._fixed = false;
	this._overrideSelect = false;
	this._overrideState = false;
	this._hoverTone = 0;
	this._grabTone = 0;
	this.setFullGrabBox();
	this.setDragLimits();
};

//========================================
// Sprite Grab - Drag Limits
// Defines the X and Y limits where one may drag this sprite

// this._offScreen defines the % of this sprite that can go off screen
// this._offScreen.x = 0; -> none of it may go off screen on X axis
// this._offScreen.y = 1; -> all of it may go off screen on Y axis
// For default, both "this._offScreen.x" and "this._offScreen.y" are set to 0.5

//Method - setDragLimits
// * Allows you to set fixed limits to dragging the sprite
// * For example, you can make "xMin" and "xMax" have the same value so that this sprite
//   won't move on he X axis, this is used to build lists' scrollers
Sprite_Grabbable.prototype.setDragLimits = function(xMin, xMax, yMin, yMax) {
	this._hasDraggingLimits = xMin != null || xMax != null || yMin != null || yMax != null;
	xMin = xMin != null ? xMin : (-this.width * this._offScreen.x);
	xMax = xMax != null ? xMax : (Graphics.width + this.width * (this._offScreen.x - 1));
	yMin = yMin != null ? yMin : (-this.height * this._offScreen.y);
	yMax = yMax != null ? yMax : (Graphics.height + this.height * (this._offScreen.y - 1));
	this._limitX = { min :xMin, max: xMax };
	this._limitY = { min: yMin, max: yMax };
};

//========================================
// Sprite Grab - Grab Box
// The box where the user may click to grab this sprite

Sprite_Grabbable.prototype.setFullGrabBox = function() {
	this.setGrabBox(0, 0, this.width, this.height);
};

Sprite_Grabbable.prototype.setGrabBox = function(x, y, width, height) {
	this._grabBox = {
		x: x,
		y: y,
		width: width,
		height: height
	};
};

Sprite_Grabbable.prototype.isClickOnMyGrabBox = function() {
	return this.isXyInsideMyGrabBox(TouchInput._x, TouchInput._y);
};

Sprite_Grabbable.prototype.isXyInsideMyGrabBox = function(x, y) {
	var gb = this._grabBox;
	if (gb.width === 0 || gb.height === 0) return false;
	var mx = this.realX() + gb.x;
	var my = this.realY() + gb.y;
	if (this.anchor.x > 0 || this.anchor.y > 0) {
		mx -= this.width * this.anchor.x;
		my -= this.height * this.anchor.y;
	}
	return x >= mx && x < mx + gb.width && y >= my && y < my + gb.height;
};

//========================================
// Sprite Grab - Select

Sprite_Grabbable.prototype.onSelect = function(touch) {
	this._touching = touch === undefined ? true : !!touch;
	if (this._touching) {
		SceneManager._scene.grabSprite(this);
		if (this._data.clickImg) {
			this.redrawBackground();
		}
	}
	this.redrawBorders();
};

Sprite_Grabbable.prototype.onReselect = function() {
	this.onSelect(true);
};

//========================================
// Sprite Grab - Touch

Sprite_Grabbable.prototype.updateTouchTrigger = function() {};

//========================================
// Sprite Grab - Grab

Sprite_Grabbable.prototype.isGrabbed = function() {
	return this._touching;
};

Sprite_Grabbable.prototype.onGrab = function() {
	this.parentFocus();
	if (this._grabTone) {
		var tone = this._grabTone;
		this.setColorTone([tone, tone, tone, tone]);
	}
};

Sprite_Grabbable.prototype.onRelease = function() {
	this._touching = false;
	SceneManager._scene.grabSprite(null);
	if (this._grabTone) {
		if (this.isHovered() && this._hoverTone) {
			var tone = this._hoverTone;
			this.setColorTone([tone, tone, tone, tone]);
		} else {
			this.setColorTone([0, 0, 0, 0]);
		}
	}
	SceneManager._scene.selectButton(null);
};

Sprite_Grabbable.prototype.onMoved = function() {};

//========================================
// Sprite Grab - Hover

Sprite_Grabbable.prototype.onMouseHover = function() {
	SButton_Base.prototype.onMouseHover.call(this);
	if (this._hoverTone) {
		var tone = this._hoverTone;
		this.setColorTone([tone, tone, tone, tone]);
	}
};

Sprite_Grabbable.prototype.onMouseLeave = function() {
	SButton_Base.prototype.onMouseLeave.call(this);
	if (this._hoverTone) {
		this.setColorTone([0, 0, 0, 0]);
	}
};

//========================================
// Sprite Grab - Update

Sprite_Grabbable.prototype.update = function() {
	SButton_Base.prototype.update.call(this);
	if (this.isStateActive()) {
		this.updateGrabbing();
	} else {
		this._touching = false;
	}
};

Sprite_Grabbable.prototype.updateGrabbing = function() {
	if (!this.isGrabbed()) return;
	var scene = SceneManager._scene;
	if (!TouchInput.isPressed() || !scene.isGrabbingSprite()) {
		return this.onRelease();
	}
	if (this.isFixed()) return;
	var x = TouchInput._x - scene.SButtons._grabbing.x;
	var y = TouchInput._y - scene.SButtons._grabbing.y;
	var limitX1 = this.anchor.x > 0 ? this._limitX.min + this.width * this.anchor.x : this._limitX.min;
	var limitX2 = this.anchor.x > 0 ? this._limitX.max + this.width * this.anchor.x : this._limitX.max;
	var limitY1 = this.anchor.y > 0 ? this._limitY.min + this.height * this.anchor.y : this._limitY.min;
	var limitY2 = this.anchor.y > 0 ? this._limitY.max + this.height * this.anchor.y : this._limitY.max;
	if (this._hasDraggingLimits) {
		var rX = this.realX() - this.x;
		var rY = this.realY() - this.y;
		limitX1 += rX;
		limitX2 += rX;
		limitY1 += rY;
		limitY2 += rY;
	}
	x = x.clamp(limitX1, limitX2);
	y = y.clamp(limitY1, limitY2);
	if (x !== this._lastPosition.x || y !== this._lastPosition.y) {
		var visual_x = this._hasDraggingLimits ? rX : 0;
		var visual_y = this._hasDraggingLimits ? rY : 0;
		var lastX1 = this.x;
		var lastY1 = this.y;
		this._lastPosition.x = x;
		this._lastPosition.y = y;
		this.x = x - visual_x;
		this.y = y - visual_y;
		this.onMoved();
	}
};

//========================================
// Sprite Grab - Others

Sprite_Grabbable.prototype.isButton = function() {
	return false;
};

//Method - isFixed
// * If fixed, this sprite can't be moved, but can still be grabbed, which means
//   that the functions "onGrab" and "onRelease" will still be called
Sprite_Grabbable.prototype.isFixed = function() {
	return this._fixed;
};

//----------------------------------------------------------------------------------------------
// Confirm Button - Create
// * Used for common buttons like "Ok" and "Cancel"
//----------------------------------------------------------------------------------------------
function SButton_Confirm() {
	this.initialize.apply(this, arguments);
}

SButton_Confirm.prototype = Object.create(SButton_Base.prototype);
SButton_Confirm.prototype.constructor = SButton_Confirm;

Object.defineProperty(SButton_Confirm.prototype, 'description', {
	get: function() {
		return this._data.description;
	},
	set: function(value) {
		if (this._data.description != value) {
			this._data.description = value;
			if (this._descriptionCount > 0) {
				this._descriptionCount = 0;
				this.hideDescription();
			}
		}
	},
	configurable: true
});

//========================================
// Button Confirm - Initialize

SButton_Confirm.prototype.initialize = function(data) {
	SButton_Base.prototype.initialize.call(this, data);
	this.initTools();
};

SButton_Confirm.prototype.initValues = function(data) {
	SButton_Base.prototype.initValues.call(this, data);
	this._preventClickSE = false;
	this._preventClickBlink = false;
	this._descriptionCountLimit = 75;
	this._descriptionCount = 0;
	this._descriptionVisible = false;
};

SButton_Confirm.prototype.initTools = function() {};

//========================================
// Button Confirm - On Click

SButton_Confirm.prototype.onClickSuccess = function() {
	SButton_Base.prototype.onClickSuccess.call(this);
	this.resetDescriptionCount();
	this.playClickSE();
	this.blinkOnClick();
};

SButton_Confirm.prototype.onClickFail = function() {
	SButton_Base.prototype.onClickFail.call(this);
	if (SMO.AM.buttonsSilentMode) return;
	SoundManager.playBuzzer();
};

SButton_Confirm.prototype.resetDescriptionCount = function() {
	this._descriptionCount = 0;
};

SButton_Confirm.prototype.playClickSE = function() {
	if (this._preventClickSE) return this._preventClickSE = false;
	if (SMO.AM.buttonsSilentMode) return;
	SoundManager.playCursor();
};

SButton_Confirm.prototype.blinkOnClick = function() {
	if (this._preventClickBlink) return this._preventClickBlink = false;
	if (this._fixedTone) return;
	var tone = 85;
	this.setColorTone([tone, tone, tone, tone]);
};

//========================================
// Button Confirm - Update & Description

SButton_Confirm.prototype.update = function() {
	if (SButton_Base.prototype.update.call(this) === false) return false;
	if (this.isStateActive()) {
		this.updateDescription();
	}
};

SButton_Confirm.prototype.updateDescription = function() {
	if (!this.isActive() || !document.hasFocus() || SceneManager._scene.isSelecting()) {
		this._descriptionCount = 0;
	}
	if (this.isHovered() && this._data.description) {
		if (this._descriptionCountLimit > 0) {
			this._descriptionCount++;
		}
		if (this._descriptionCount >= this._descriptionCountLimit) {
			this.showDescription();
		} else {
			this.hideDescription();
		}
	} else {
		this._descriptionCount = 0;
		this.hideDescription();
	}
};

SButton_Confirm.prototype.showDescription = function() {
	var last_description = SceneManager._scene.buttonDescription()._button;
	if (last_description && last_description != this) {
		last_description.hideDescription();
	}

	if (!this._descriptionVisible) {
		SceneManager._scene.buttonDescription().setButton(this);
		this._descriptionVisible = true;
	}
};

SButton_Confirm.prototype.hideDescription = function() {
	if (this._descriptionVisible) {
		SceneManager._scene.buttonDescription().setButton(null);
		this._descriptionVisible = false;
	}
};

SButton_Confirm.prototype.onParentRemoved = function() {
	this.hideDescription();
	SButton_Base.prototype.onParentRemoved.call(this);
};

//----------------------------------------------------------------------------------------------
// Select Button - Create
// * When selected it'll open a list of options for the user to choose from
// * Clicking anywhere on the screen will close the list
//----------------------------------------------------------------------------------------------
function SButton_Select() {
	this.initialize.apply(this, arguments);
}

SButton_Select.prototype = Object.create(SButton_Confirm.prototype);
SButton_Select.prototype.constructor = SButton_Select;

Object.defineProperties(SButton_Select.prototype, {
	width: {
		get: function() {
			return this._frame.width;
		},
		set: function(value) {
			if (this._frame.width === value) return;
			this.bitmap.resize(value, this._frame.height);
			this._frame.width = value;
			this._refresh();
			if (this.borders) {
				this.borders._frame.width = value;
				this.borders.bitmap.resize(value, this._frame.height);
				this.borders._refresh();
			}
			if (this.txtChild) {
				this.txtChild._frame.width = value;
				this.txtChild.bitmap.resize(value, this._frame.height);
				this.txtChild._refresh();
			}
			this._options._frame.width = value;
			this._options._data.width = value;
			this._options._needRedraw = true;
			this._needRedraw = true;
		},
		configurable: true
	},

	height: {
		get: function() {
			return this._frame.height;
		},
		set: function(value) {
			if (this._frame.height === value) return;
			this._frame.height = value;
			this.bitmap.resize(this._frame.width, value);
			this._refresh();
			if (this.borders) {
				this.borders._frame.height = value;
				this.borders.bitmap.resize(this._frame.width, value);
				this.borders._refresh();
			}
			if (this.txtChild) {
				this.txtChild._frame.height = value;
				this.txtChild.bitmap.resize(this._frame.width, value);
				this.txtChild._refresh();
			}
			this._options._frame.height = value;
			this._options.itemHeight = value;
			this._needRedraw = true;
		},
		configurable: true
	},

	textColor: {
		configurable: true,
		get: function() {
			return this._data.textColor;
		},
		set: function(value) {
			if (this._data.textColor != value) {
				this._data.textColor = value;
				this.txtChild.bitmap.textColor = value;
				if (this._options) {
					this._options.textColor = value;
				}
				this.redrawMyText();
			}
		}
	},

	fontSize: {
		configurable: true,
		get: function() {
			return this._data.fontSize;
		},
		set: function(value) {
			if (value > 0 && this.txtChild.bitmap.fontSize !== value) {
				this._data.fontSize = Number(value);
				this.txtChild.bitmap.fontSize = this._data.fontSize;
				if (this._options) {
					this._options.fontSize = this._data.fontSize;
				}
				this.redrawMyText();
			}
		}
	},

	fontFace: {
		configurable: true,
		get: function() {
			return this._data.fontFace;
		},
		set: function(value) {
			if ((value = String(value)) && this.txtChild.bitmap.fontFace !== value) {
				this._data.fontFace = value;
				this.txtChild.bitmap.fontFace = value;
				if (this._options) {
					this._options.fontFace = value;
				}
				this.redrawMyText();
			}
		}
	},

	backColor: {
		configurable: true,
		get: function() {
			return this._data.backColor;
		},
		set: function(value) {
			if (this._data.backColor != value) {
				this._data.backColor = value;
				if (this._options) {
					this._options.redefine({itemColors: [value, value]}, true);
				}
				this.redrawBackground();
			}
		}
	},

	borderColor: {
		configurable: true,
		get: function() {
			return this._data.borderColor;
		},
		set: function(value) {
			if (this._data.borderColor != value) {
				this._data.borderColor = value;
				if (this._options) {
					this._options.backColor = this._data.borderColor;
					this._options.borderColor = this._data.borderColor;
				}
				this.redrawBorders();
			}
		}
	},

	borderSize: {
		configurable: true,
		get: function() {
			return this._data.borderSize;
		},
		set: function(value) {
			if (this._data.borderSize != value) {
				this._data.borderSize = Number(value);
				if (this._options) {
					this._options.borderSize = this._data.borderSize;
				}
				this.redraw();
			}
		}
	}
});

//========================================
// Select Button - Initialize

SButton_Select.prototype.initTools = function() {
	this.initOptions();
};

SButton_Select.prototype.initOptions = function() {
	var data = this._data;
	var options;
	var visibleOptions = Math.max(Math.min(data.options.length, data.listLimit), 1);
	var itemColors = [data.backColor, data.backColor];
	var optionsData = {
		x: 0,
		y: this.height - data.borderSize,
		width: this.width,
		height: (this.height + 1) * visibleOptions, //the 1 is the default value of gap_y
		itemHeight: this.height,
		listLimit: data.listLimit,
		maxSelection: data.maxSelection,
		fontSize: data.fontSize,
		fontFace: data.fontFace,
		textColor: data.textColor,
		backColor: data.borderColor,
		borderColor: data.borderColor,
		borderSize: data.borderSize,
		selectorColor: data.selectorColor,
		hoverColor: data.hoverColor,
		itemColors: itemColors,
		scrollColors: data.scrollColors,
		drawIds: data.drawIds,
		foregroundSelect: data.foregroundSelect,
		hideSelect: true
	};
	var options = new Sprite_ItemList(optionsData, 1);
	options._overrideSelect = true;
	options._scroller._roller._overrideSelect = true;
	options.setItemList(data.options);
	options.open = function() {
		this.visible = true;

		//Smart positioning
		//This avoids showing the list out of the screen
		this.x = 0;
		this.y = this.parent.height - this.borderSize;
		var x = this.realX();
		var y = this.realY();
		if ((y + this.height) > Graphics.height) {
			this.y -= (y + this.height) - Graphics.height;
		}
		if (x < 0) {
			this.x -= x;
		} else if ((x + this.width) > Graphics.width) {
			this.x -= (x + this.width) - Graphics.width;
		}

		var index = this.getIndexByString(this.parent.currentValue());
		if (index > -1 && !this._selectedIndexes.contains(index)) {
			this.selectItem(index, true, false);
		}
		if (!this.isSelected()) {
			SceneManager._scene.selectButton(this, false);
		}
	};
	options.close = function(cancel) {
		if (!this.visible) return;
		this.visible = false;
		this._selectedIndexes.sort();
		var data = this.parent._data;
		var texts = this.getSelectedItemsTexts();
		if (data.value.equals(texts)) {
			this.parent.onOptionKeep();
		} else {
			if (cancel) {
				var index;
				this.deselectAllItems();
				for (var a = 0; a < data.value.length; a ++) {
					index = this.getIndexByString(data.value[a]);
					this.selectItem(index, true, false);
				}
				this.parent.redrawMyText();
			} else {
				this.parent.onOptionChange(texts, this._selectedIndexes.clone());
			}
		}
		SceneManager._scene._selecting = false;
		this.parent.setHover(false);
	};
	options.onOkTriggered = function() {
		this.close();
	};
	options.onSelect = function(touch) {
		touch = touch == undefined ? true : touch;
		Sprite_ItemList.prototype.onSelect.call(this, touch);
		if (touch && !Input.isPressed('control') && !this.isMouseOverScroller()) {
			this.close();
		}
	};
	options.onReselect = function() {
		Sprite_ItemList.prototype.onReselect.call(this);
		if (!Input.isPressed('control') && !this.isMouseOverScroller()) {
			this.close();
		}
	};
	options.onDeselect = function() {
		Sprite_ItemList.prototype.onDeselect.call(this);
		if (!this.isMouseOverScroller()) {
			this.close();
		}
	};
	options.onCancelled = function() {
		this.close(true);
	};
	options.drawItemList = function() {
		var visibleOptions = Math.min(this._items.length, this._data.listLimit);
		var sprite_h = visibleOptions * (this._data.itemHeight + this._gap_row) + this.borderSize;
		if (this.height !== sprite_h) {
			this.height = sprite_h;
			this.borders.height = this.height;
			this.borders.bitmap.resize(this.width, this.height);
			this.borders._refresh();
			this._scroller.height = this.height;
			this._scroller.bitmap.resize(this.width, this.height);
			this._scroller._refresh();
		}
		Sprite_ItemList.prototype.drawItemList.call(this);
	};
	options.visible = false;
	this._options = options;
	this.addChild(this._options);
};

SButton_Select.prototype.getDefaultData = function(data) {
	data.useShadow = data.useShadow || false;
	SButton_Confirm.prototype.getDefaultData.call(this, data);
	this._data.hideSelect = true;
	for (var k in SBUTTON_DEFAULT_SELECT) {
		this._data[k] = data[k] != null ? data[k] : SBUTTON_DEFAULT_SELECT[k];
	}

	if (!Array.isArray(this._data.options)) {
		this._data.options = [];
	}

	if (!Array.isArray(this._data.value)) {
		this._data.value = [];
	}

	if (!Array.isArray(this._data.itemColors)) {
		this._data.itemColors = [];
	}
	if (this._data.itemColors.length < 2) {
		this._data.itemColors[0] = this._data.itemColors[0] || '#3e3e3e';
		this._data.itemColors[1] = this._data.itemColors[1] || '#555555';
	}

	if (!Array.isArray(this._data.scrollColors)) {
		this._data.scrollColors = [];
	}
	if (this._data.scrollColors.length < 2) {
		this._data.scrollColors[0] = this._data.scrollColors[0] || '#777777';
		this._data.scrollColors[1] = this._data.scrollColors[1] || '#353535';
	}
};

//========================================
// Select Button - On Action

SButton_Select.prototype.onClickSuccess = function() {
	SButton_Confirm.prototype.onClickSuccess.call(this);
	this.switchOpenState();
};

SButton_Select.prototype.onOptionChange = function(values, indexes, skipSound) {
	if (!skipSound && !SMO.AM.buttonsSilentMode) {
		SoundManager.playOk();
	}
	this._data.value = values;
	this.redrawMyText();
	if (this._data.onOptChange) {
		this._data.onOptChange(values, indexes);
	}
};

SButton_Select.prototype.onOptionKeep = function() {
	if (!SMO.AM.buttonsSilentMode) {
		SoundManager.playCancel();
	}
	this.redrawMyText();
	if (this._data.onOptKeep) {
		this._data.onOptKeep();
	}
};

//========================================
// Select Button - Draw
SButton_Select.prototype.drawMyText = function() {
	var txt_bmp = this.txtChild.bitmap;
	var data = this._data;
	var currentValue = this.currentValue();
	var selections = this._options ? this._options._selectedIndexes.length : 0;
	if (selections > 1) {
		selections -= 1;
		currentValue = currentValue + ' (+' + selections + ')';
	}
	var text = currentValue == null ? data.text : currentValue;
	var bds = data.borderSize;
	var x = bds + data.textOffset[0];
	var y = data.textOffset[1];
	txt_bmp.fontSize = data.fontSize;
	txt_bmp.textColor = data.textColor;

	//Drawing arrow
	var arrow_w = data.fontSize - 6;
	var arrow_h = data.fontSize - 6;
	var arrow_x = data.width - arrow_w - data.borderSize - 4;
	var arrow_y = Math.floor((data.height - arrow_h)/2);
	var arrow_d = this._options && this._options.visible ? 'up' : 'down';
	txt_bmp.drawTriangleS(arrow_x, arrow_y, arrow_w, arrow_h, arrow_d, '#ffffff');

	//Drawing text
	var arrow_w = Math.floor(data.height / 2);
	var arrow_x = data.width - Math.floor(arrow_w / 2) - 8 - bds;
	var maxWidth = data.width - bds - x - arrow_w - 12;
	var maxHeight = data.height - data.textOffset[1];
	var align = data.textAlign;
	txt_bmp.drawText(text, x, y, maxWidth, maxHeight, align);
	if (!currentValue) {
		let tone = -75;
		this.txtChild.setColorTone([tone, tone, tone, tone]);
	}
};

SButton_Select.prototype.redraw = function(all) {
	if (all) {
		this.redrawOptions();
	}
	SButton_Confirm.prototype.redraw.call(this);
	this._refresh();
};

SButton_Select.prototype.redrawOptions = function() {
	this._options.redraw();
};

SButton_Select.prototype.redrawMyText = function() {
	SButton_Confirm.prototype.redrawMyText.call(this);
	this._refresh();
};

//========================================
// Select Button - Others

SButton_Select.prototype.refreshValues = function(skipSound) {
	var current_values = this._data.value.clone();
	var list_values = this._options.getSelectedItemsTexts();
	if (!current_values.equals(list_values)) {
		this.onOptionChange(list_values, this._options._selectedIndexes, skipSound);
	}
};

SButton_Select.prototype.currentValue = function() {
	return this._data.value.length ? this._data.value[0] : '';
};

SButton_Select.prototype.isOpen = function() {
	return this._options.visible;
};

SButton_Select.prototype.open = function() {
	if (!this.isOpen()) {
		this._options.open();
		SceneManager._scene._selecting = true;
		this.redraw();
	}
};

SButton_Select.prototype.close = function() {
	if (this.isOpen()) {
		this._options.close();
		SceneManager._scene._selecting = false;
		this.redraw();
	}
};

SButton_Select.prototype.switchOpenState = function() {
	if (this.isOpen()) {
		this._options.close();
		SceneManager._scene._selecting = false;
	} else {
		this._options.open();
		SceneManager._scene._selecting = true;
	}
	this.redraw();
};

SButton_Select.prototype.isEmpty = function() {
	return this._options.isEmpty();
};

SButton_Select.prototype.setList = function(list) {
	this._data.options = [];
	if (!Array.isArray(list)) return;
	if (this._data.options.equals(list)) return;
	this._options.setItemList(list);
	if (this.isOpen()) {
		this._options.close();
	}
};

SButton_Select.prototype.isAnyItemSelected = function() {
	return this._options.isAnyItemSelected();
};

SButton_Select.prototype.selectItem = function(index, ctrl) {
	this._options.selectItem(index, ctrl, false);
	this.refreshValues();
};

SButton_Select.prototype.deselectAllItems = function() {
	var isSelection = this.isAnyItemSelected();
	if (isSelection) {
		var selected = this._options._selectedIndexes;
		this._options.deselectAllItems();
		this._options.onItemDeselected(selected);
	}
};

SButton_Select.prototype.selectedIndexes = function() {
	return this._options._selectedIndexes;
};

SButton_Select.prototype.selectItemByName = function(itemName, ctrl) {
	this._options.selectItemByName(itemName, ctrl);
	this.refreshValues();
};

SButton_Select.prototype.add = function(text, iconIndex) {
	this._options.add(text, iconIndex);
};

SButton_Select.prototype.remove = function(index) {
	if (index > -1 && index < this._options.items().length) {
		this._options.remove(index);
	}
};

//----------------------------------------------------------------------------------------------
// Text Button - Create
// * Allows the player to input a text on it
//----------------------------------------------------------------------------------------------
function SButton_Text() {
	this.initialize.apply(this, arguments);
}

SButton_Text.prototype = Object.create(SButton_Confirm.prototype);
SButton_Text.prototype.constructor = SButton_Text;

Object.defineProperty(SButton_Text.prototype, 'value', {
	get: function() {
		return this._lines.reduce((a, v) => a + '\n' + v);
	},
	set: function(value) {
		if (value !== null) {
			var current = this.value;
			value = String(value);
			if (value !== current) {
				this._lines = [''];
				this._skipAction = true;
				this._skipRedraw = true;
				this.setCursorAt(0, 0);
				this.pasteValue(String(value));
				this.setScrollX(0);
				this.setScrollY(0);
				this._skipAction = false;
				this._skipRedraw = false;
				this.redrawMyText();
				this.clearActions();
			}
		};
	},
	configurable: true
});

Object.defineProperty(SButton_Text.prototype, 'passwordSymbol', {
	get: function() {
		return this._passwordSymbol;
	},
	set: function(value) {
		value = value == null ? '' : String(value);
		this._passwordSymbol = value;
		this.redrawMyText();
	},
	configurable: true
});

//========================================
// Text Button - Initialize

SButton_Text.prototype.initialize = function(data) {
	SButton_Confirm.prototype.initialize.call(this, data);
	this.formatValue();
};

SButton_Text.prototype.initValues = function(data) {
	this._lines = [''];
	SButton_Confirm.prototype.initValues.call(this, data);
	this.clearActions();
	this._skipRedraw = false;
	this._scrollX = 0;
	this._scrollY = 0;
	this._redoingAction = false;
	this._actionsLimit = 10;
	this._passwordSymbol = '';
	this._click_cooldown = {
		cd:0,
		point:[0, 0]
	};
	this._selection = {
		start: null,
		end: null,
		hold: false,
		dir: 1
	};
};

SButton_Text.prototype.getDefaultData = function(data) {
	SButton_Confirm.prototype.getDefaultData.call(this, data);
	for (k in SBUTTON_DEFAULT_TEXT) {
		this._data[k] = data[k] != null ? data[k] : SBUTTON_DEFAULT_TEXT[k];
	}

	if (!Array.isArray(this._data.options)) {
		this._data.options = [];
	}

	if (!SBUTTON_TEXT_FILTERS.contains(this._data.filter)) {
		this._data.filter = null;
	}

	if (!(this._data.maxLines > -1)) {
		this._data.maxLines = 1;
	}

	if (this._data.minValue > this._data.maxValue) {
		let v = this._data.maxValue;
		this._data.maxValue = this._data.minValue;
		this._data.minValue = v;
	}

	if (this._data.filter === 'number') {
		this._data.allowSpace = false;
		if (data.maxDigits == null && this._data.maxValue > 0) {
			this._data.maxDigits = String(this._data.maxValue).length;
		}
	}

	if (this._data.value) {
		let value = String(this._data.value);
		this._lines = value.split('\n');
	}
};

SButton_Text.prototype.initTools = function() {
	SButton_Confirm.prototype.initTools.call(this);

	//Creating the text's cursor
	this.initCursor();

	//Creating the precision arrows (only when using the filter 'number')
	if (this.isOnlyNumbers() && this._data.precisionArrows) {
		this.initPrecisionArrows();
	}
};

SButton_Text.prototype.initCursor = function() {
	var data = this._data;
	var width = 2;
	var height = data.fontSize + 2;
	var fadeInWait = 30;
	var fadeOutWait = 10;
	this._cursor = new Sprite(new Bitmap(width, height));
	this._cursor._fadeState = 0;
	this._cursor._fadeCounter = 0;
	this._cursor._position = [0, 0];
	this._cursor.update = function() {
		Sprite.prototype.update.call(this);
		this.updateFading();
	};
	this._cursor.updateFading = function() {
		if (!this.parent.isSelected()) return;
		if (this._fadeState) { // Fade in
			if (this.alpha >= 1) {
				this._fadeCounter++;
				if (this._fadeCounter >= fadeInWait) {
					this._fadeCounter = 0;
					this._fadeState = 0;
				}
			} else {
				this.alpha += 0.05;
			}
		} else { // Fade out
			if (this.alpha <= 0) {
				this._fadeCounter++;
				if (this._fadeCounter >= fadeOutWait) {
					this._fadeCounter = 0;
					this._fadeState = 1;
				}
			} else {
				this.alpha -= 0.05;
			}
		}
	};
	this._cursor.refreshPosition = function() {
		var font = {
			size: this.parent.fontSize,
			face: this.parent.fontFace
		};
		var isOffText = this._position[1] >= this.parent._lines.length;
		this._position[1] = this._position[1].clamp(0, this.parent._lines.length - 1);
		var line = this.parent.line();
		this._position[0] = isOffText ? line.length : this._position[0].clamp(0, line.length);

		var text_x = SMO.AM.textWidthEx(line.substring(0, this._position[0]), font, true);
		var cursor_min_x = this.parent.textPaddingX();
		var cursor_max_x = this.parent.width - this.parent.borderSize - this.width - 2;
		var cursor_x = cursor_min_x + text_x - this.parent._scrollX - 1;
		if (cursor_x < cursor_min_x) {
			this.parent.setScrollX(Math.max(0, Math.ceil(this.parent._scrollX + cursor_x - cursor_min_x)));
			cursor_x = cursor_min_x + text_x - this.parent._scrollX;
		} else if (cursor_x > cursor_max_x) {
			this.parent.setScrollX(Math.max(0, Math.ceil(this.parent._scrollX + cursor_x - cursor_max_x)));
			cursor_x = cursor_min_x + text_x - this.parent._scrollX;
		}
		this.x = cursor_x;
		if (this.parent.isMultLine()) {
			var text_y = Math.ceil(this._position[1] * this.parent.lineHeight());
			var cursor_min_y = this.parent.textPaddingY() - 1;
			var cursor_max_y = this.parent.height - this.parent.borderSize - this.height;
			var cursor_y = cursor_min_y + text_y - this.parent._scrollY;
			if (cursor_y < cursor_min_y) {
				this.parent.setScrollY(Math.max(0, Math.ceil(this.parent._scrollY + cursor_y - cursor_min_y)));
				cursor_y = cursor_min_y + text_y - this.parent._scrollY;
			} else if (cursor_y > cursor_max_y) {
				this.parent.setScrollY(Math.max(0, Math.ceil(this.parent._scrollY + cursor_y - cursor_max_y)));
				cursor_y = cursor_min_y + text_y - this.parent._scrollY;
			}
			this.y = cursor_y;
		}
	};

	this._cursor.bitmap.fillAll('#ffffff');
	this._cursor.x = this.textPaddingX();
	this._cursor.y = this.textPaddingY();
	this._cursor._position0 = 0;
	this.hideCursor();
	this.addChild(this._cursor);
};

SButton_Text.prototype.isMultLine = function() {
	return this._data.maxLines !== 1;
};

SButton_Text.prototype.initPrecisionArrows = function() {
	var data = this._data;
	this._arrows = [];
	var height = this.height / 2;

	var upArrow = {
		backColor: data.backColor,
		textColor: data.textColor,
		borderColor: data.borderColor,
		borderSize: 1,
		fontSize: Math.floor(data.fontSize/2 - 2),
		text: '▲',
		textAlign: 'center',
		height: height,
		width: height,
		x: this.width,
		y: 1,
		enableMethod: (() => this.enabled).bind(this),
		onClick: (() => this.onUpArrowClick()).bind(this)
	};
	this._arrows.push(new SButton_Confirm(upArrow));
	this.addChild(this._arrows[0]);

	var downArrow = {
		backColor: data.backColor,
		textColor: data.textColor,
		borderColor: data.borderColor,
		borderSize: 1,
		fontSize: Math.floor(data.fontSize/2 - 2),
		text: '▼',
		textAlign: 'center',
		height: height,
		width: height,
		x: this.width,
		y: height - 1,
		enableMethod: (() => this.enabled).bind(this),
		onClick: (() => this.onDownArrowClick()).bind(this)
	};
	this._arrows.push(new SButton_Confirm(downArrow));
	this.addChild(this._arrows[1]);
};

//========================================
// Text Button - Update

SButton_Text.prototype.update = function() {
	SButton_Confirm.prototype.update.call(this);
	this.updateArrowTriggers();
	this.updateDoubleClickCooldown();
	this.updateSelection();
};

SButton_Text.prototype.updateArrowTriggers = function() {
	if (!this.isOnlyNumbers()) return;
	if (!this.isSelected()) return;
	if (Input.isRepeated('up')) {
		if (this.onUpArrowClick() && !SMO.AM.buttonsSilentMode) {
			this.playArrowScrollSE();
		}
	} else if (Input.isRepeated('down')) {
		if (this.onDownArrowClick() && !SMO.AM.buttonsSilentMode) {
			this.playArrowScrollSE();
		}
	}
};

SButton_Text.prototype.updateDoubleClickCooldown = function() {
	if (this._click_cooldown.cd > 0) {
		this._click_cooldown.cd--;
	}
};

SButton_Text.prototype.updateSelection = function() {
	if (!this.isMouseSelecting()) return;
	var slct = this._selection;
	if (TouchInput.isReleased()) {
		slct.hold = false;
		if (!slct.end || (slct.start.x === slct.end.x && slct.start.y === slct.end.y)) {
			this._selection.start = null;
			this._selection.end = null;
		}
		return;
	}
	var x = this.getXIndexByXPosition(TouchInput._cX);
	var y = this.getYIndexByYPosition(TouchInput._cY);
	var cx = this.cursorX();
	var cy = this.cursorY();
	this.setCursorAt(x, y);
	var cx2 = this.cursorX();
	var cy2 = this.cursorY();
	if (cx2 !== cx || cy2 !== cy) {
		this.setSelection(slct.start.x, slct.start.y, cx2, cy2);
	}
};

//========================================
// Text Button - Draw

SButton_Text.prototype.drawBackground = function() {
	var data = this._data;
	var width = this.bitmap.width;
	var height = this.bitmap.height;
	var bds = data.borderSize;
	var img = this._touching ? data.clickImg : data.hoverImg && this.isHovered() ? data.hoverImg : data.img;
	switch(data.design) {
	case 'round-rect':
		var radius = 5;
		width -= bds * 2;
		height -= bds * 2;
		this.bitmap.drawRoundedRect(bds, bds, width, height, radius, data.backColor, img);
		break;
	default: //'rect'
		this.bitmap.drawRectBackground(0, 0, width, height, bds, data.backColor, img);
		break;
	}
};

SButton_Text.prototype.drawBorders = function() {
	if (!this.borders) return;
	var data = this._data;
	var thickness = this.borderSize;
	if (!thickness) return;
	var bmp = this.borders.bitmap;
	var width = this.width;
	var height = this.height;
	var color = this.isSelected() && data.selectorColor && !data.hideSelect ? data.selectorColor : data.borderColor;
	switch(data.design) {
	case 'round-rect':
		var radius = 5;
		bmp.drawRoundedBorders(0, 0, width, height, radius, thickness, color);
		break;
	default: //'rect'
		bmp.drawRectBorders(0, 0, width, height, thickness, color);
		break;
	}
};

SButton_Text.prototype.refreshTextBmpSize = function(lineIndex) {
	if (lineIndex == null) {
		var text = this.value;
		var lineId = this._lines.length;
	} else {
		var text = this._lines[lineIndex];
		var lineId = lineIndex + 1;
		if (text == null) return;
	}
	var font = { size:this.fontSize, face:this.fontFace };
	var bmp_width = this.txtChild.bitmap.width;
	var bmp_height = this.txtChild.bitmap.height;
	var txt_width = SMO.AM.textWidthEx(text, font, true) + this.textPaddingX();
	var txt_height = lineId * this.lineHeight() + this.textPaddingY();
	var new_width = txt_width > bmp_width ? txt_width + 200 : bmp_width;
	var new_height = txt_height > bmp_height ? txt_height + 200 : bmp_height;

	if (new_width > bmp_width || new_height > bmp_height) {
		this.txtChild.bitmap.resize(new_width, new_height);
		this.txtChild._refresh();
		return true;
	}
	return false;
};

SButton_Text.prototype.redrawLines = function(startIndex, endIndex) {
	if (this._skipRedraw) return;
	startIndex = startIndex || 0;
	endIndex = endIndex == null ? this._lines.length - 1 : endIndex;
	for (var i = startIndex; i <= endIndex; i++) {
		this.redrawLine(i);
	}
};

SButton_Text.prototype.redrawLine = function(index) {
	if (this._skipRedraw) return;
	var lineHeight = this.lineHeight();
	var line_y = index * lineHeight;
	var maxWidth = this.txtChild.bitmap.width;
	this.clearTextRect(0, line_y, maxWidth, lineHeight + 2);
	if (this._lines[index] == null) return;
	var line = this.getSymbolLine(index);
	var font = { size:this.fontSize, face:this.fontFace };
	var selection = this.getLineSelection(index);
	if (selection) {
		let start = selection[0];
		let selected_t = this._lines[index].substring(selection[0], selection[1]);
		let selected_x = SMO.AM.textWidthEx(this._lines[index].substring(0, start), font, true);
		let selected_w = SMO.AM.textWidthEx(selected_t, font, true);
		this.drawSelectionRect(selected_x, line_y, selected_w);
	}
	this.drawText(line, 0, line_y, maxWidth, this.lineHeight());
};

SButton_Text.prototype.drawText = function(text, x, y, width, height, align) {
	x += this.textPaddingX();
	y += this.textPaddingY();
	this.txtChild.bitmap.drawText(text, x, y, width, height, align);
};

SButton_Text.prototype.clearTextRect = function(x, y, width, height) {
	x += this.textPaddingX();
	y += this.textPaddingY();
	this.txtChild.bitmap.clearRect(x, y, width, height);
};

SButton_Text.prototype.drawSelectionRect = function(x, y, width) {
	x += this.textPaddingX();
	y += this.textPaddingY();
	this.txtChild.bitmap.fillRect(x, y, width, this.lineHeight(), this._data.selectorColor);
};

SButton_Text.prototype.getLineSelection = function(y) {
	if (!this._selection.end) return null;
	var slct = this._selection;
	var line_l = this._lines[y].length;
	if (slct.dir === 1) {
		function isLineSelected(index) {
			return slct.start.y <= index && index <= slct.end.y;
		}
		if (!isLineSelected(y)) return null;
		var start = isLineSelected(y - 1) ? 0 : slct.start.x;
		var end = isLineSelected(y + 1) ? line_l : slct.end.x;
		return [start, end];
	} else {
		function isLineSelected(index) {
			return slct.start.y >= index && index >= slct.end.y;
		}
		if (!isLineSelected(y)) return null;
		var start = isLineSelected(y - 1) ? 0 : slct.end.x;
		var end = isLineSelected(y + 1) ? line_l : slct.start.x;
		return [start, end];
	}
};

SButton_Text.prototype.drawMyText = function() {
	var default_text = this._data.text;
	var input_text = this.value;
	if (!input_text && !default_text) return;
	if (input_text) {
		this.redrawLines();
	} else if (default_text.indexOf('\n') > -1) {
		var lines = default_text.split('\n');
		for (var t = 0; t < lines.length; t++) {
			this.txtChild.bitmap.drawText(lines[t], 0, 0, this.txtChild.width, this.txtChild.height, 'center');
		}
	} else {
		this.txtChild.bitmap.drawText(default_text, 0, 0, this.txtChild.width, this.txtChild.height, 'center');
	}
};

SButton_Text.prototype.redrawMyText = function() {
	if (this._skipRedraw) return;
	SButton_Confirm.prototype.redrawMyText.call(this);
};

//========================================
// Text Button - Scroll

SButton_Text.prototype.setScrollX = function(x) {
	if (this.txtChild._frame.x === x) return;
	this.txtChild._frame.x = x;
	this.txtChild._refresh();
	this._scrollX = x;
};

SButton_Text.prototype.setScrollY = function(y) {
	if (this.txtChild._frame.y === y) return;
	this.txtChild._frame.y = y;
	this.txtChild._refresh();
	this._scrollY = y;
};

//========================================
// Text Button - On Action

SButton_Text.prototype.getXIndexOnClick = function() {
	return this.getXIndexByXPosition(TouchInput.x);
};

SButton_Text.prototype.getYIndexOnClick = function() {
	return this.getYIndexByYPosition(TouchInput.y);
};

SButton_Text.prototype.getXIndexByXPosition = function(x) {
	var line = this.line();
	if (!line.length) return 0;
	var touch_x = x + Sprite_Button.prototype.canvasToLocalX.call(this, 0) + this._scrollX;
	touch_x -= this.textPaddingX() - 2;
	var font = { size:this.fontSize, face:this.fontFace };
	var old_width = 0;
	var new_width = 0;
	var letter_w = 0;
	for (var i = 0; i < line.length; i++) {
		new_width = SMO.AM.textWidthEx(line.substring(0, i+1), font, true);
		if (new_width >= touch_x) {
			letter_w = new_width - old_width;
			return Math.round((touch_x - old_width) / letter_w) + i;
		}
		old_width = new_width;

	}
	return line.length;
};

SButton_Text.prototype.getYIndexByYPosition = function(y) {
	if (!this.isMultLine()) return 0;
	var touch_y = y + Sprite_Button.prototype.canvasToLocalY.call(this, 0) + this._scrollY;
	touch_y -= this._data.textOffset[1];
	var index = Math.floor(touch_y / this.lineHeight());
	if (index === this._lines.length) {
		index--;
	}
	return index;
};

//Method - onUpArrowClick
// * Called after clicking on the the upper arrow button (visible only when using the filter "number")
// * Increases the current value by 1
SButton_Text.prototype.onUpArrowClick = function() {
	var value = Number(this.value);
	var maxValue = this._data.maxValue;
	var digits = String(value + 1).length;
	var maxDigits = this._data.maxDigits;
	if ((!maxValue || value < maxValue) && (!maxDigits || digits <= maxDigits)) {
		value++;
		this.value = value;
		var cursor = this._cursor;
		cursor.alpha = 0;
		cursor._fadeState = 0;
		cursor._fadeCounter = -10;
		cursor.refreshPosition();
		return true;
	}
	return false;
};

//Method - onDownArrowClick
// * Called after clicking on the the lower arrow button (visible only when using the filter "number")
// * Decreases the current value by 1
SButton_Text.prototype.onDownArrowClick = function() {
	var data = this._data;
	var number = Number(this.value);
	if (number > data.minValue) {
		number--;
		this.value = number;
		var cursor = this._cursor;
		cursor.alpha = 0;
		cursor._fadeState = 0;
		cursor._fadeCounter = -10;
		cursor.refreshPosition();
		return true;
	}
	return false;
};

//Method - onOkTriggered
// * Called when this button is selected and the cursor is on the last line available
SButton_Text.prototype.onOkTriggered = function() {};

SButton_Text.prototype.onDoubleClick = function() {
	var index_x = this._click_cooldown.point[0];
	var index_y = this._click_cooldown.point[1];
	var line = this._lines[index_y].toUpperCase();
	if (!line) return;
	if (line.length === 1) {
		this.setSelection(0, index_y, 1, index_y);
		return;
	}
	function isAlphanum (char) {
		var keyCode = char.charCodeAt(0);
		return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90);
	}
	function getType (char) {
		return isAlphanum(char) ? 'alphanum' : 'special';
	}
	var type = 'special';
	var start = index_x !== line.length ? index_x : index_x - 1;
	var end = index_x;
	var char1_alphanum = (line[index_x] && isAlphanum(line[index_x]));
	var char2_alphanum = (line[index_x-1] && isAlphanum(line[index_x-1]));
	var main_type = char1_alphanum || char2_alphanum ? 'alphanum' : 'special';

	if (line[end]) {
		for (var i = end; i < line.length; i++) {
			if (main_type !== getType(line[i])) {
				break;
			}
			end++;
		}
	}
	if (line[start]) {
		for (var i = start; i > 0; i--) {
			if (main_type !== getType(line[i-1])) {
				break;
			}
			start--;
		}
	}
	this._skipRedraw = true;
	this.setSelection(start, index_y, end, index_y);
	this.setCursorAt(end, index_y);
	this._skipRedraw = false;
	this.redrawLine(index_y);
};

SButton_Text.prototype.addUndoneAction = function(action) {
	this._undoneActions.push(action);
	if (this._undoneActions.length > this._actionsLimit) {
		this._undoneActions.splice(0, 1);
	}
};

SButton_Text.prototype.addAction = function(action) {
	if (this._skipAction) return;
	if (!this._redoingAction) {
		this._undoneActions = [];
	}
	var lastAction = this._actions.last();
	if (lastAction) {
		if (lastAction.type === 'selection') {
			action.selection = lastAction;
			this._actions.pop();
			return this.addAction(action);
		}
		var noSelection = !lastAction.selection;
		var isBothAdd = lastAction.type === 'add' && action.type === 'add';
		var isBothNewLine = lastAction.type === 'newLine' && action.type === 'newLine';
		if (isBothAdd && noSelection) {
			var isFrameOk = action.frames - lastAction.frames < 60;
			var isXyOk = action.y === lastAction.y && action.x === (lastAction.x + lastAction.value.length);
			if (isFrameOk && isXyOk) {
				lastAction.value += action.value;
				lastAction.frames = action.frames - 20;
				return;
			}
		} else if (isBothNewLine && noSelection) {
			var isFrameOk = action.frames - lastAction.frames < 60;
			var isXyOk = action.x === 0 && action.y === (lastAction.y + lastAction.lines);
			if (isFrameOk && isXyOk) {
				lastAction.lines += 1;
				lastAction.frames = action.frames - 20;
				return;
			}
		}
	}
	this._actions.push(action);
	if (this._actions.length > this._actionsLimit) {
		this._actions.splice(0, 1);
	}
	this.onAction();
};

SButton_Text.prototype.onAction = function() {};

SButton_Text.prototype.redoAction = function() {
	if (this.isMouseSelecting()) return;
	this._skipRedraw = true;
	this.clearSelection();
	this._skipRedraw = false;
	this._redoingAction = true;
	var action = this._undoneActions.last();
	if (action) {
		var selection = action.selection;
		switch (action.type) {
		case 'add':
			this._skipRedraw = true;
			if (selection) {
				this.setSelection(selection.sx, selection.sy, selection.ex, selection.ey);
			}
			this.setCursorAt(action.x, action.y);
			this._skipRedraw = false;
			this.addValue(action.value);
			break;
		case 'cut':
			this._skipRedraw = true;
			this.setSelection(selection.sx, selection.sy, selection.ex, selection.ey);
			this.deleteSelection(true);
			this.addAction({
				x: action.x,
				y: action.y,
				type: 'cut'
			});
			this._skipRedraw = false;
			if (selection.ey > selection.sy) {
				var end = this._lines.length + selection.ey - selection.sy - 1;
				this.redrawLines(selection.sy, end);
			} else {
				this.redrawLine(selection.ey);
			}
			break;
		case 'paste':
			this._skipRedraw = true;
			var sy = action.sy;
			var ey = action.ey;
			if (selection) {
				this.setSelection(selection.sx, selection.sy, selection.ex, selection.ey);
				ey = Math.max(ey, selection.ey);
			}
			this.setCursorAt(action.sx, action.sy);
			this.pasteValue(action.value, true);
			this._skipRedraw = false;
			if (sy === ey) {
				this.redrawLine(sy);
			} else {
				ey = this._lines.length + ey - sy - 1;
				this.redrawLines(sy, ey);
			}
			break;
		case 'delete':
			this._skipRedraw = true;
			this.setCursorAt(action.x, action.y);
			if (selection) {
				this.setSelection(selection.sx, selection.sy, selection.ex, selection.ey);
			}
			this.deleteValue(action.x, action.x + action.value.length);
			this._skipRedraw = false;
			if (selection && selection.ey > selection.sy) {
				var end = this._lines.length + selection.ey - selection.sy - 1;
				this.redrawLines(selection.sy, end);
			} else {
				this.redrawLine(action.y);
			}
			break;
		case 'newLine':
			this._skipRedraw = true;
			if (selection) {
				this.setSelection(selection.sx, selection.sy, selection.ex, selection.ey);
			}
			this.setCursorAt(action.x, action.y);
			this.addNewLine();
			this._skipRedraw = false;
			this.redrawLines(action.y);
			break;
		}
	}
	this._redoingAction = false;
	this._undoneActions.pop();
	this.onRedo();
};

SButton_Text.prototype.onRedo = function() {};

SButton_Text.prototype.clearActions = function() {
	this._actions = [];
	this._undoneActions = [];
};

SButton_Text.prototype.undoLastAction = function() {
	if (this.isMouseSelecting()) return;
	this.clearSelection();
	var redoSelection = function (s) {
		this.pasteValue(s.value, true);
		this.setSelection(s.sx, s.sy, s.ex, s.ey);
		this._skipRedraw = false;
		if (s.sy === s.ey) {
			this.redrawLine(s.sy);
		} else {
			var end = this._lines.length + s.ey - s.sy - 1;
			this.redrawLines(s.sy, end);
		}
	}.bind(this);

	this._skipAction = true;
	var action = this._actions.last();
	if (action) {
		var selection = action.selection;
		switch (action.type) {
		case 'add':
			this._skipRedraw = true;
			this.setCursorAt(action.x, action.y);
			this.deleteValue(action.x, action.x + action.value.length);
			if (selection) {
				redoSelection(selection);
			} else {
				this._skipRedraw = false;
				this.redrawLine(action.y);
			}
			break;
		case 'cut':
			this._skipRedraw = true;
			this.setCursorAt(action.x, action.y);
			redoSelection(selection);
			break;
		case 'paste':
			this._skipRedraw = true;
			this.setCursorAt(action.sx, action.sy);
			this.setSelection(action.sx, action.sy, action.ex, action.ey);
			this.deleteSelection();
			if (selection) {
				this.pasteValue(selection.value, true);
				this.setSelection(selection.sx, selection.sy, selection.ex, selection.ey);
				this._skipRedraw = false;
				if (selection.sy === selection.ey) {
					if (action.sy === action.ey) {
						this.redrawLine(action.sy);
					} else {
						var biggerY = Math.max(action.ey, selection.ey);
						var end = this._lines.length + biggerY - action.sy - 1;
						this.redrawLines(action.sy, end);
					}
				} else {
					var biggerY = Math.max(action.ey, selection.ey);
					var end = this._lines.length + biggerY - action.sy - 1;
					this.redrawLines(action.sy, end);
				}
			} else {
				this._skipRedraw = false;
				if (action.sy === action.ey) {
					this.redrawLine(action.sy);
				} else {
					var end = this._lines.length + action.ey - action.sy - 1;
					this.redrawLines(action.sy, end);
				}
			}
			break;
		case 'delete':
			this._skipRedraw = true;
			this.setCursorAt(action.x, action.y);
			if (selection) {
				redoSelection(selection);
			} else if (action.value === '\n') {
				this.addNewLine();
				this._skipRedraw = false;
				this.redrawLines(action.y);
			} else {
				this.addValue(action.value);
				this._skipRedraw = false;
				this.redrawLine(action.y);
			}
			break;
		case 'newLine':
			this._skipRedraw = true;
			this.setCursorAt(action.x, action.y);
			this._lines.splice(action.y + 1, action.lines);
			if (action.value) {
				this._lines[action.y] += action.value;
			}
			var end = this._lines.length;
			if (selection) {
				this.pasteValue(selection.value, true);
				this.setSelection(selection.sx, selection.sy, selection.ex, selection.ey);
				end += selection.ey - selection.sy;
			}
			this._skipRedraw = false;
			this.redrawLines(action.y, this._lines.length);
			break;
		}
		this.addUndoneAction(action);
	}
	this._actions.pop();
	this._skipAction = false;
	this.onUndo(action);
};

SButton_Text.prototype.onUndo = function(action) {};

//========================================
// Text Button - Select

SButton_Text.prototype.onSelect = function(touch) {
	SButton_Confirm.prototype.onSelect.call(this, touch);
	SButton_Text.getCustomKeyCodes();
	var index_y = this.getYIndexOnClick().clamp(0, this._lines.length);
	this._cursor._position[1] = index_y;

	var index_x = this.getXIndexOnClick();
	this.setCursorAt(index_x, index_y);
	var cursorX = this.cursorX();
	var cursorY = this.cursorY();
	this._click_cooldown.cd = DOUBLE_CLICK_INTERVAL;
	this._click_cooldown.point = [cursorX, cursorY];
	this.selectionStart(cursorX, cursorY);
	this.showCursor();
};

SButton_Text.prototype.onReselect = function() {
	SButton_Confirm.prototype.onReselect.call(this);
	var index_y = this.getYIndexOnClick().clamp(0, this._lines.length);
	this._cursor._position[1] = index_y;

	var index_x = this.getXIndexOnClick();
	this.setCursorAt(index_x, index_y);
	var cursorX = this.cursorX();
	var cursorY = this.cursorY();
	var cx = this._click_cooldown.point[0];
	var cy = this._click_cooldown.point[1];
	if (this._click_cooldown.cd > 0 && cursorX === cx && cursorY === cy) {
		this.onDoubleClick();
		this._click_cooldown.cd = 0;
	} else {
		this._click_cooldown.cd = DOUBLE_CLICK_INTERVAL;
		this._click_cooldown.point = [cursorX, cursorY];
		this.selectionStart(cursorX, cursorY);
	}
	this._preventClickSE = true;
	this._preventClickBlink = true;
};

SButton_Text.prototype.onDeselect = function() {
	SButton_Confirm.prototype.onDeselect.call(this);
	this.hideCursor();
	SButton_Text.loadDefaultKeyCodes();
	this.formatValue();
	this.clearSelection();
};

SButton_Text.prototype.selectionStart = function(x, y) {
	this.clearSelection();
	this._selection.start = {x, y};
	this._selection.hold = true;
};

SButton_Text.prototype.clearSelection = function() {
	if (this.hasSelection()) {
		var start = this._selection.dir === 1 ? this._selection.start.y : this._selection.end.y;
		var end = this._selection.dir === 1 ? this._selection.end.y : this._selection.start.y;
		this._selection.start = null;
		this._selection.end = null;
		this.redrawLines(start, end);
	}
};

SButton_Text.prototype.hasSelection = function() {
	return !!this._selection.end;
};

SButton_Text.prototype.isMouseSelecting = function() {
	return this._selection.hold;
};

SButton_Text.prototype.setSelection = function(x_start, y_start, x_end, y_end) {
	x_start = x_start != null ? x_start : this.cursorX();
	y_start = y_start != null ? y_start : this.cursorY();
	x_end = x_end != null ? x_end : this.cursorX();
	y_end = y_end != null ? y_end : this.cursorY();
	var redraw_lines = [];
	if (this.hasSelection()) {
		let min_y = Math.min(y_start, y_end);
		let max_y = Math.max(y_start, y_end);
		let old_start = this._selection.dir === 1 ? this._selection.start.y : this._selection.end.y;
		let old_end = this._selection.dir === 1 ? this._selection.end.y : this._selection.start.y;
		for (var a = old_start; a <= old_end; a++) {
			if (a < min_y || a > max_y) {
				redraw_lines.push(a);
			}
		}
	}
	this._selection.dir = (y_end < y_start || (y_end === y_start && x_end < x_start)) ? -1 : 1;
	if (!this._selection.start) {
		this._selection.start = {
			x: x_start,
			y: y_start
		};
	}
	this._selection.end = { x:x_end, y:y_end };
	if (redraw_lines.length) {
		redraw_lines.forEach(((l) => this.redrawLine(l)).bind(this));
	}
	this.checkSelection();
	if (this.hasSelection()) {
		var start = this._selection.dir === 1 ? this._selection.start.y : this._selection.end.y;
		var end = this._selection.dir === 1 ? this._selection.end.y : this._selection.start.y;
		this.redrawLines(start, end);
	}
};

SButton_Text.prototype.selectAll = function() {
	if (this.isMouseSelecting()) return;
	if (!this.value) return;
	this._selection.start = { x: 0, y: 0 };
	var fx = this._lines.last().length;
	var fy = this._lines.length - 1;
	this.setCursorAt(fx, fy);
	this.setSelection(0, 0, fx, fy);
};

SButton_Text.prototype.checkSelection = function() {
	if (this.isMouseSelecting()) return;
	var slct = this._selection;
	if (!slct.end || (slct.start.x === slct.end.x && slct.start.y === slct.end.y)) {
		this.clearSelection();
	}
};

//========================================
// Text Button - Cursor

SButton_Text.prototype.showCursor = function() {
	this._cursor.visible = true;
};

SButton_Text.prototype.hideCursor = function() {
	this._cursor.visible = false;
};

SButton_Text.prototype.moveCursorLeft = function(shift) {
	if (this.isMouseSelecting()) return;
	var index_x = this.cursorX();
	var index_y = this.cursorY();
	if (this.hasSelection() && !shift) {
		if (this._selection.dir === 1) {
			var cx = this._selection.start.x;
			var cy = this._selection.start.y;
			var end = this._selection.end.y;
		} else {
			var cx = this._selection.end.x;
			var cy = this._selection.end.y;
			var end = this._selection.start.y;
		}
		this.setCursorAt(cx, cy);
		this._selection.start = null;
		this._selection.end = null;
		this.redrawLines(cy, end);
		return;
	}
	if (index_x > 0) {
		this.setCursorAt(index_x - 1, index_y);
	} else if (index_y > 0) {
		this.setCursorAt(this._lines[index_y - 1].length, index_y - 1);
	}
	var new_index_x = this.cursorX();
	var new_index_y = this.cursorY();
	if (shift && (new_index_x !== index_x || new_index_y !== index_y)) {
		let start_x = this._selection.end ? this._selection.start.x : index_x;
		let start_y = this._selection.end ? this._selection.start.y : index_y;
		this.setSelection(start_x, start_y, new_index_x, new_index_y, true);
	}
};

SButton_Text.prototype.moveCursorUp = function(shift) {
	if (this.isMouseSelecting()) return;
	var index_x = this.cursorX();
	var index_y = this.cursorY();
	this._cursor._position[1] = Math.max(index_y-1, 0);
	var cursor_x = -Sprite_Button.prototype.canvasToLocalX.call(this._cursor, 0);
	this._cursor._position[0] = this.getXIndexByXPosition(cursor_x);
	if (index_y > 0) {
		this.setCursorAt(this._cursor._position[0], index_y - 1);
	}
	var new_index_x = this.cursorX();
	var new_index_y = this.cursorY();
	if (shift) {
		if ((new_index_x !== index_x || new_index_y !== index_y)) {
			let start_x = this._selection.end ? this._selection.start.x : index_x;
			let start_y = this._selection.end ? this._selection.start.y : index_y;
			this.redrawLine(index_y + 1);
			this.setSelection(start_x, start_y, new_index_x, new_index_y);
		}
	} else {
		this.clearSelection();
	}
};

SButton_Text.prototype.moveCursorRight = function(shift) {
	if (this.isMouseSelecting()) return;
	var index_x = this.cursorX();
	var index_y = this.cursorY();
	if (this.hasSelection() && !shift) {
		if (this._selection.dir === 1) {
			var cx = this._selection.end.x;
			var cy = this._selection.end.y;
			var start = this._selection.start.y;
		} else {
			var cx = this._selection.start.x;
			var cy = this._selection.start.y;
			var start = this._selection.end.y;
		}
		this.setCursorAt(cx, cy);
		this._selection.start = null;
		this._selection.end = null;
		this.redrawLines(start, cy);
		return;
	}
	if (index_x < this.line().length) {
		this.setCursorAt(index_x + 1, index_y);
	} else if (this._lines[index_y + 1] != null) {
		this.setCursorAt(0, index_y + 1);
	}
	var new_index_x = this.cursorX();
	var new_index_y = this.cursorY();
	if (shift && (new_index_x !== index_x || new_index_y !== index_y)) {
		let start_x = this._selection.end ? this._selection.start.x : index_x;
		let start_y = this._selection.end ? this._selection.start.y : index_y;
		this.setSelection(start_x, start_y, new_index_x, new_index_y);
	}
};

SButton_Text.prototype.moveCursorDown = function(shift) {
	if (this.isMouseSelecting()) return;
	var index_x = this.cursorX();
	var index_y = this.cursorY();
	var next_line = this._lines[index_y + 1];
	if (next_line != null) {
		this.setCursorAt(null, index_y + 1);
	}
	var new_index_x = this.cursorX();
	var new_index_y = this.cursorY();
	if (shift) {
		if (new_index_x !== index_x || new_index_y !== index_y) {
			let start_x = this._selection.end ? this._selection.start.x : index_x;
			let start_y = this._selection.end ? this._selection.start.y : index_y;
			this.redrawLine(index_y - 1);
			this.setSelection(start_x, start_y, new_index_x, new_index_y);
		}
	} else {
		this.clearSelection();
	}
};

SButton_Text.prototype.cursorX = function() {
	return this._cursor._position[0];
};

SButton_Text.prototype.cursorY = function() {
	return this._cursor._position[1];
};

//========================================
// Text Button - Other

SButton_Text.prototype.lineHeight = function() {
	return this.fontSize + 4;
};

SButton_Text.prototype.getSymbolLine = function(y) {
	var line = this._lines[y];
	if (!line) return '';
	if (!this._passwordSymbol[0]) return line;
	var symbol = '';
	while (symbol.length < line.length) {
		symbol += this._passwordSymbol[0];
	}
	return symbol;
};

SButton_Text.prototype.refreshEnabledTone = function() {
	SButton_Base.prototype.refreshEnabledTone.call(this);
	var value = this.value;
	if (!value && this._data.text) {
		let dtone = this._data.disabledTone;
		this.txtChild.setColorTone([dtone, dtone, dtone, dtone]);
	}
};

SButton_Text.prototype.addNewLine = function() {
	if (this.isMouseSelecting()) return;
	if (!this.canAddNewLine()) return this.onOkTriggered();
	this.setScrollX(0);
	this.deleteSelection(true);
	var index_x = this.cursorX();
	var index_y = this.cursorY();
	var line = this.line();	
	var jumpingText = line.substring(index_x, line.length);
	this.addAction({
		type: 'newLine',
		frames: Graphics.frameCount,
		value: jumpingText,
		x: index_x,
		y: index_y,
		lines: 1
	});	
	this._lines.splice(index_y + 1, 0, '');
	if (jumpingText) {
		this._lines[index_y + 1] = jumpingText;
		this._lines[index_y] = this._lines[index_y].substring(0, index_x);
		this.redrawLine(index_y);
	}
	this.setCursorAt(0, index_y + 1);
	if (this.refreshTextBmpSize()) {
		this.redrawMyText();
	} else {
		this.redrawLines(index_y + 1);
	}
};

SButton_Text.prototype.canAddNewLine = function() {
	if (!this.isMultLine()) return false;
	return !this._data.maxLines || this._data.maxLines > this._lines.length;
};

SButton_Text.prototype.playArrowScrollSE = function() {
	if (SMO.AM.buttonsSilentMode) return;
	SoundManager.playCursor();
};

SButton_Text.prototype.isOnlyNumbers = function() {
	return this._data.filter === 'number';
};

SButton_Text.prototype.line = function(lineIndex) {
	lineIndex = lineIndex != null ? lineIndex : this.cursorY();
	return this._lines[lineIndex] || '';
};

SButton_Text.prototype.formatValue = function() {
	if (!this.isOnlyNumbers()) return;
	var value = this.value;
	var minimun = Math.abs(Number(this._data.minValue)) || 0;
	var maximun = Math.abs(Number(this._data.maxValue)) || 0;
	if (value === '') {
		this.value = minimun.toString();
		return;
	}
	var number = Number(value);
	number = isNaN(number) ? minimun : number;
	if (!maximun) return this.value = number.toString();
	number = number.clamp(minimun, maximun);
	this.value = number.toString();
};

SButton_Text.prototype.acceptInput = function(keyCode, shift, ctrl, alt) {
	var filter = this._data.filter;
	if (!filter) return true;
	var isNumber = keyCode >= 48 && keyCode <= 57;
	var isLetter = keyCode >= 65 && keyCode <= 90;
	var isSpecLetter = Boolean(ctrl || alt);
	var isSpecNumber = Boolean(isSpecLetter || shift);
	switch (filter) {
	case 'number':
		return isNumber && !isSpecNumber;
	case 'letter':
		return isLetter && !isSpecLetter;
	case 'alphanum':
		return isNumber ? !isSpecNumber : isLetter ? !isSpecLetter : false;
	default:
		return false;
	}
};

SButton_Text.prototype.filterPastedValue = function(text, maxLength) {
	if (!this._data.allowPaste) return text;
	this.applyFilterToValue(text, maxLength);
};

//Method - applyFilterToValue
// * Removes parts of a string which are not allowed by the current filter
// String: text
// Number: maxLength -> the maximum length of the final text
SButton_Text.prototype.applyFilterToValue = function(text, maxLength) {
	//if (!this._data.filter && this._data.allowSpace) return text;
	var keyCode, char, filter = this._data.filter;
	var allowSpace = this._data.allowSpace;
	var line = 1;
	var maxLines = this._data.maxLines;
	var currentLine = this.cursorY();
	var pasteValue = '';
	for (var c = 0; c < text.length; c++) {
		if (pasteValue.length >= maxLength) {
			break;
		}

		char = text[c];
		keyCode = text.charCodeAt(c);

		if (keyCode === 13) { //Enter
			continue;
		}

		if (maxLines && keyCode === 10) { //line break (\n)
			if (++line + currentLine > maxLines) break;
		}

		if (keyCode === 32) { //Space
			if (allowSpace) {
				pasteValue += char;
			}
			continue;
		}

		//Checking the filter
		if (!filter) {
			pasteValue += char;
			continue;
		}

		var isNumber = keyCode >= 48 && keyCode <= 57;
		var isLetter = (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);
		switch(filter) {
		case 'number':
			if (isNumber) {
				pasteValue += char;
			};
			break;
		case 'letter':
			if (isLetter) {
				pasteValue += char;
			}
			break;
		case 'alphanum':
			if (isNumber || isLetter) {
				pasteValue += char;
			}
			break;
		default:
			break;
		}
	}
	return pasteValue;
};

SButton_Text.prototype.setLineValue = function(value, lineIndex) {
	lineIndex = lineIndex || this.cursorY();
	this._lines[lineIndex] = value;
};

SButton_Text.prototype.isEnvelop = function(string) {
	if (this.hasSelection() && ['(', '[', '{'].contains(string)) {
		var value = this.value;
		var maxDigits = this._data.maxDigits;
		return !maxDigits || (maxDigits - value.length) > 1;
	}
	return false;
};

//Envelop -> if you select some text and press "(", "[" or "{" the text will be surrounded by that symbol
// For example, let's say you selected "BC" on "ABCDE", if you press "(" it'll become "A(BC)DE"
SButton_Text.prototype.envelop = function(string) {
	if (this._selection.dir === 1) {
		var s = this._selection.start;
		var e = this._selection.end;
	} else {
		var s = this._selection.end;
		var e = this._selection.start;
	}
	this.clearSelection();
	this.setCursorAt(s.x, s.y);
	this.addValue(string);
	if (s.y === e.y) {
		this.setCursorAt(e.x+1, e.y);
		this.addValue(string === '(' ? ')' : string === '[' ? ']' : '}');
		this.setCursorAt(e.x+1, e.y);
		this.setSelection(s.x+1, s.y, e.x+1, e.y);
	} else {
		this.setCursorAt(e.x, e.y);
		this.addValue(string === '(' ? ')' : string === '[' ? ']' : '}');
		this.setCursorAt(e.x, e.y);
		this.setSelection(s.x+1, s.y, e.x, e.y);
	}
};

SButton_Text.prototype.addValue = function(string) {
	if (!string) return;
	if (this.isMouseSelecting()) return;
	if (this.isEnvelop(string)) return this.envelop(string);
	var multLineSelection = 0;
	if (this.hasSelection()) {
		var skipRedraw = this._skipRedraw;
		this._skipRedraw = true;
		multLineSelection = Math.abs(this._selection.end.y - this._selection.start.y);
		this.deleteSelection(true);
		this._skipRedraw = skipRedraw;
	}
	var value = this.value;
	var maxDigits = this._data.maxDigits;
	if (maxDigits && (value.length + string.length) > maxDigits) {
		let maxIndex = maxDigits - value.length;
		string = string.substr(0, maxIndex);
	}
	if (string.length === 0) return;
	if (!value) {
		this.txtChild.setColorTone([0, 0, 0, 0]);
		this.txtChild.bitmap.clear();
	}
	var line = this.line();
	var index_x = this.cursorX();
	var index_y = this.cursorY();
	var new_index_x = index_x + string.length;
	var sstr1 = line.substr(0, index_x);
	var sstr2 = line.substr(index_x);
	var new_line = sstr1 + string + sstr2;
	this.addAction({
		type: 'add',
		value: string,
		x: index_x,
		y: index_y,
		frames: Graphics.frameCount
	});
	this.setLineValue(new_line);
	this.setCursorAt(new_index_x);
	if (this.refreshTextBmpSize(index_y)) {
		this.redrawMyText();
	} else if (multLineSelection) {
		this.redrawLines(index_y, this._lines.length - 1 + multLineSelection);
	} else {
		this.redrawLine(index_y);
	}
	SButton_Text.resetAccent();
};

SButton_Text.prototype.getSelectedValue = function() {
	var slct = this._selection;
	if (!slct.end) return '';
	var line, isPrevLineSelected, isNextLineSelected, start, end, value = '';
	var slctStartX = slct.dir === 1 ? slct.start.x : slct.end.x;
	var slctStartY = slct.dir === 1 ? slct.start.y : slct.end.y;
	var slctEndX = slct.dir === 1 ? slct.end.x : slct.start.x;
	var slctEndY = slct.dir === 1 ? slct.end.y : slct.start.y;
	for (var i = slctStartY; i <= slctEndY; i++) {
		line = this._lines[i];
		if (!line) {
			value += '\n';
			continue;
		}
		isPrevLineSelected = i > slctStartY;
		isNextLineSelected = i < slctEndY;
		start = isPrevLineSelected ? 0 : slctStartX;
		end = isNextLineSelected ? line.length : slctEndX;
		line = line.substring(start, end);
		value += line + '\n';
	}
	value = value.substr(0, value.length - 1);
	return value;
};

//Method: "deleteValue"
//  * Deletes values between the given indexes
//  Number: start -> first index
//  Number: end -> last index
SButton_Text.prototype.deleteValue = function(start, end) {
	SButton_Text.resetAccent();
	if (this.hasSelection()) {
		var slct = this._selection;
		var slctStartX = slct.dir === 1 ? slct.start.x : slct.end.x;
		var slctStartY = slct.dir === 1 ? slct.start.y : slct.end.y;
		this.deleteSelection(true);
		this.addAction({
			type:'delete',
			value: '',
			x: slctStartX,
			y: slctStartY
		});
		return;
	}
	var index_y = this.cursorY();
	if (start < 0) {
		if (index_y > 0) {
			this.addAction({
				type: 'delete',
				value: '\n',
				x: this.line(index_y-1).length,
				y: index_y - 1
			});
			this.concatLine(true);
		}
		return;
	}
	var line = this.line();
	if (end > line.length) {
		if (this._lines.length - 1 > index_y) {
			this.addAction({
				type: 'delete',
				value: '\n',
				x: line.length,
				y: index_y
			});
			this.concatLine();
		}
		return;
	}
	if (start === end || !line) return false;
	var sstr1 = line.substring(0, start);
	var sstr2 = line.substring(end, line.length);
	this.addAction({
		type: 'delete',
		value: line.substring(start, end),
		x: start,
		y: index_y
	});
	this.setLineValue(sstr1 + sstr2);
	var scrollX = this._scrollX;
	var scrollY = this._scrollY;
	this.setCursorAt(start);
	this.redrawLine(index_y);
	return true;
};

//Method - deleteSelection
// * Deletes the selected text
// Boolean: addAction -> if true, the current selection will be added to the next action created
SButton_Text.prototype.deleteSelection = function(addAction) {
	if (!this.hasSelection()) return;
	if (this.isMouseSelecting()) return;
	var line, start, end, value = '';
	var slct = this._selection;
	if (slct.dir === 1) {
		var slctStartX = slct.start.x;
		var slctStartY = slct.start.y;
		var slctEndX = slct.end.x;
		var slctEndY = slct.end.y;
	} else {
		var slctStartX = slct.end.x;
		var slctStartY = slct.end.y;
		var slctEndX = slct.start.x;
		var slctEndY = slct.start.y;
	}
	if (addAction) {
		this.addAction({
			type: 'selection',
			sx: slctStartX,
			sy: slctStartY,
			ex: slctEndX,
			ey: slctEndY,
			value: this.getSelectedValue()
		});
	}
	line = this._lines[slctStartY];
	if (slctEndY > slctStartY) {
		var line_f = this._lines[slctEndY];
		this._lines[slctStartY] = line.substring(0, slctStartX) + line_f.substring(slctEndX, line_f.length);
		this._lines.splice(slctStartY+1, slctEndY - slctStartY);
	} else {
		this._lines[slctStartY] = line.substring(0, slctStartX) + line.substring(slctEndX, line.length);
	}
	this.setCursorAt(slctStartX, slctStartY);
	this._selection.start = null;
	this._selection.end = null;
	if (slctStartY === slctEndY) {
		this.redrawLine(slctStartY);
	} else {
		var end = this._lines.length + slctEndY - slctStartY - 1;
		this.redrawLines(slctStartY, end);
	}
};

//Method: "concatLine"
//  * Concats the current line with the previous one
SButton_Text.prototype.concatLine = function(isBackspace) {
	var index_x = this.cursorX();
	var index_y = this.cursorY();
	var font = { size:this.fontSize, face:this.fontFace };

	//When Backspace is pressed
	if (isBackspace) {
		if (index_y === 0) return false;
		var target_y = index_y - 1;
		var target_x = this._lines[target_y].length;
		this._lines[target_y] += this._lines[index_y];
		this._lines.splice(index_y, 1);
		var line_w = SMO.AM.textWidthEx(this._lines[target_y], font, true) + this.textPaddingX();
		if (line_w > this.txtChild.bitmap.width) {
			this.txtChild.bitmap.resize(line_w, this.txtChild.bitmap.height);
			this.txtChild._refresh();
		}
		this.setCursorAt(target_x, target_y);
		this.redrawLines(target_y, this._lines.length);
		return true;
	}

	//When Delete is pressed
	var target_y = index_y + 1;
	var target_line = this._lines[target_y];
	if (target_line == null) return false;
	this._lines[index_y] += target_line;
	this._lines.splice(target_y, 1);
	var line_w = SMO.AM.textWidthEx(this._lines[index_y], font, true) + this.textPaddingX();
	if (line_w > this.txtChild.bitmap.width) {
		this.txtChild.bitmap.resize(line_w, this.txtChild.bitmap.height);
		this.txtChild._refresh();
	}
	this.redrawLines(index_y, this._lines.length);
	return true;
};

SButton_Text.prototype.pasteValue = function(text, skipFilter) {
	if (this.isMouseSelecting()) return;
	if (!text) return;
	var data = this._data;
	var value = this.value;
	var fittingText = text;
	var hasSelection = this.hasSelection();
	this.deleteSelection(true);
	if (!skipFilter) {
		let maxLength = data.maxDigits ? data.maxDigits - value.length : text.length;
		fittingText = this.applyFilterToValue(text, maxLength);
		if (!fittingText) {
			if (hasSelection) {
				this._actions.pop();
			}
			return;
		}
	}
	if (!value) {
		this.txtChild.setColorTone([0, 0, 0, 0]);
		this.txtChild.bitmap.clear();
	}
	var new_width = 0;
	var new_height = 0;
	var index_x = this.cursorX();
	var index_y = this.cursorY();
	var new_lines = fittingText.split('\n');
	this.addAction({
		type: 'paste',
		value: fittingText,
		sx: index_x,
		sy: index_y,
		ex: new_lines.length > 1 ? new_lines.last().length : index_x + new_lines.last().length,
		ey: new_lines.length - 1 + index_y
	});
	var pre_text = this._lines[index_y].substring(0, index_x);
	var pos_text = this._lines[index_y].substring(index_x, this._lines[index_y].length);
	if (new_lines.length > 1) {
		this._lines[index_y] = pre_text + new_lines[0];
		for (var i = 1; i < new_lines.length; i++) {
			this._lines.splice(index_y + i, 0, new_lines[i]);
		}
		if (pos_text) {
			this._lines[index_y + i-1] += pos_text;
		}
	} else {
		this._lines[index_y] = pre_text + new_lines[0] + pos_text;
	}
	var cursorX = new_lines.length > 1 ? new_lines.last().length : index_x + new_lines.last().length;
	var cursorY = index_y + new_lines.length - 1;
	this.setCursorAt(cursorX, cursorY);

	if (this.refreshTextBmpSize()) {
		this.redrawMyText();
	} else if (new_lines.length > 1) {
		this.redrawLines(index_y);
	} else {
		this.redrawLine(index_y);
	}
};

//Method: "setCursorAt"
//  * Places the cursor at the given coordinates
//  Number: x -> index of the X coordinate
//  Number: y -> index of the Y coordinate
//  Boolean: visual -> if you are defining a visual position, this argument must be true
SButton_Text.prototype.setCursorAt = function(x, y) {
	var Cursor = this._cursor;
	var isKeepLastX = x == null;
	x = x == null ? Cursor._position0 : x;
	y = y == null ? Cursor._position[1] : y;
	Cursor._position[0] = x;
	Cursor._position[1] = y;
	Cursor.alpha = 0.9;
	Cursor._fadeState = 1;
	Cursor._fadeCounter = -10;
	Cursor.refreshPosition();
	Cursor._position0 = isKeepLastX ? Cursor._position0 : Cursor._position[0];
};

//========================================
// Text Button - Constants

//KeyMapper - key handling
SButton_Text.PressedKeys = {};
SButton_Text.DEFAULT_KEY_CODES = null;
SButton_Text.COMMAND_KEYS = {
	8: 'backspace',
	13: 'enter',
	32: 'space',
	35: 'end',
	36: 'home',
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
	46: 'delete'
};
SButton_Text.SPECIAL_KEY_CODES = {
	186: 'ç',
	187: '=',
	188: ',',
	189: '-',
	190: '.',
	191: ';',
	192: '\'',
	193: '/',
	219: '´', //dead
	220: ']',
	221: '[',
	222: '~', //dead
	226: '\\'
};

SButton_Text.SPECIAL_SIGNS = {
	54: '6',
	'54b': '¨',
	219: '´',
	'219b': '`',
	222: '~',
	'222b': '^'
};

//Method - oncopy - EventHandler
// * Copies the text saved on the clipboard into the selected text button (SButton_Text)
SMO.AM._document_oncopy = document.oncopy;
document.oncopy = function (event) {
	//Check if there's a text input button selected
	var Scene = SceneManager._scene;
	if (Scene && Scene.isTextInputSelected()) {
		var button = Scene.selectedButton();
		var value = button.getSelectedValue();
		if (value) {
			event.clipboardData.setData('text/plain', value);
			event.preventDefault();
		}
	} else if (SMO.AM._document_oncopy) {
		// No text button selected -> call original method
		SMO.AM._document_oncopy.call(this, event);
	}
};

SMO.AM._document_oncut = document.oncut;
document.oncut = function (event) {
	//Check if there's a text input button selected
	var Scene = SceneManager._scene;
	if (Scene && Scene.isTextInputSelected()) {
		var button = Scene.selectedButton();
		if (button.isMouseSelecting()) return;
		var value = button.getSelectedValue();
		if (value) {
			button.deleteSelection(true);
			button.addAction({
				x: button.cursorX(),
				y: button.cursorY(),
				type: 'cut'
			});
			event.clipboardData.setData('text/plain', value);
			event.preventDefault();
		}
	} else if (SMO.AM._document_oncut) {
		// No text button selected -> call original method
		SMO.AM._document_oncut.call(this, event);
	}
};

//Method - onpaste - EventHandler
// * Pastes the text saved on the clipboard on the selected text button (SButton_Text)
SMO.AM._document_onpaste = document.onpaste;
document.onpaste = function (event) {
	//Check if there's a text input button selected
	var Scene = SceneManager._scene;
	if (Scene && Scene.isTextInputSelected()) {
		var button = Scene.selectedButton();
		if (button) {
			button.pasteValue(event.clipboardData.getData('text'));
		}
	} else if (SMO.AM._document_onpaste) {
		// No text button selected -> call original method
		SMO.AM._document_onpaste.call(this, event);
	}
};

SButton_Text.getCustomKeyCodes = function() {
	SButton_Text.saveDefaultKeyCodes();
	//Numbers
	for (var c = 48; c < 58; c++) {
		Input.keyMapper[c] = String.fromCharCode(c);
	}
	//Letters - (uppercase 65 -> 90) - (lowercase 97 -> 122)
	for (c = 65; c < 91; c++) {
		Input.keyMapper[c] = String.fromCharCode(c).toLowerCase();
	}

	for (c in SButton_Text.SPECIAL_KEY_CODES) {
		Input.keyMapper[c] = SButton_Text.SPECIAL_KEY_CODES[c];
	}

	for (c in SButton_Text.COMMAND_KEYS) {
		Input.keyMapper[c] = SButton_Text.COMMAND_KEYS[c];
	}
};

SButton_Text.saveDefaultKeyCodes = function() {
	SButton_Text.DEFAULT_KEY_CODES = SButton_Text.DEFAULT_KEY_CODES || {};
	for(var k in Input.keyMapper) {
		SButton_Text.DEFAULT_KEY_CODES[k] = Input.keyMapper[k];
	}
};

SButton_Text.loadDefaultKeyCodes = function() {
	for(var k in Input.keyMapper) {
		if (Input._currentState[Input.keyMapper[k]]) {
			//Raising pressed keys before loading the original keyMapper
			//This is to avoid having keys "pressed" as forever
			Input._onKeyUp({keyCode:k});
		}
		if (SButton_Text.DEFAULT_KEY_CODES[k]) {
			Input.keyMapper[k] = SButton_Text.DEFAULT_KEY_CODES[k];
		} else {
			delete Input.keyMapper[k];
		}
	}
	SButton_Text.DEFAULT_KEY_CODES = null;
};

SButton_Text.resetAccent = function() {
	SButton_Text.accent = { code: 0, key: '' };
};
SButton_Text.resetAccent();

SButton_Text.updateTextInput = function(button) {
	var BTI = SButton_Text;
	var Pressed = BTI.PressedKeys;
	for (var k in Pressed) {
		var shift = Pressed[k].shift;
		var ctrl = Pressed[k].ctrl;
		var alt = Pressed[k].alt;
		var char = Pressed[k].key;
		var originalChar = Input.keyMapper[k];

		if (!Input.isQuickRepeated(originalChar)) {
			continue;
		}
		
		var data = button._data;
		var line = button.line();
		var index_x = button.cursorX();
		var index_y = button.cursorY();
		var maxDigits = data.maxDigits;
		var filter = data.filter;
		switch (char) {
		case 'Dead':
			if (filter) return;
			if (!BTI.SPECIAL_SIGNS[k]) return;
			char = shift ? BTI.SPECIAL_SIGNS[k + 'b'] : BTI.SPECIAL_SIGNS[k];
			if (BTI.accent.code === 0) return BTI.accent = { code: k, key: char };
			return button.addValue(BTI.accent.key + char);
		case 'enter':
			return button.addNewLine();
		case 'left':
			return button.moveCursorLeft(shift);
		case 'up':
			return button.moveCursorUp(shift);
		case 'right':
			return button.moveCursorRight(shift);
		case 'down':
			return button.moveCursorDown(shift);
		case 'backspace':
			return button.deleteValue(index_x - 1, index_x);
		case 'delete':
			return button.deleteValue(index_x, index_x + 1);
		case 'space':
			if (data.allowSpace) {
				if (BTI.accent.code !== 0) {
					return button.addValue(BTI.accent.key);
				}
				return button.addValue(' ');
			};
			break;
		case 'home':
			if (button.isMouseSelecting()) return;
			var fx = 0;
			var fy = ctrl ? 0 : null;
			button.setCursorAt(fx, fy);
			if (shift) {
				button.setSelection(index_x, index_y, fx, fy);
			} else {
				button.clearSelection();
			}
			return;
		case 'end':
			if (button.isMouseSelecting()) return;
			var fx = line.length;
			var fy = ctrl ? button._lines.length - 1 : null;
			button.setCursorAt(fx, fy);
			if (shift) {
				button.setSelection(index_x, index_y, fx, fy);
			} else {
				button.clearSelection();
			}
			return;
		default:
			if (ctrl) {
				if (k === '65' || k === '97') {
					//CTRL + A
					button.selectAll();
					return;
				}
				if (k === '90' || k === '122') {
					//CTRL + Z
					button.undoLastAction();
					return;
				}
				if (k === '89' || k === '121') {
					//CTRL + Y
					button.redoAction();
					return;
				}
			}
			if (ctrl && !(alt && char !== originalChar)) return;
			if (button.acceptInput(k, shift, ctrl, alt)) {
				if (BTI.accent.code !== 0) { //Adding previously typed accents
					let isSpecial = k === '97' || k === '101' || k === '105' || k === '111' || k === '117' || //a, e, i, o, u
									k === '65' || k === '69'  || k === '73'  || k === '79'  || k === '85'  || //A, E, I, O, U
									(k === '89' && BTI.accent.key === '´') || //ý
									(k === '78' && BTI.accent.key === '~'); //ñ
					if (!isSpecial) { char = BTI.accent.key + char; };
				}
				return button.addValue(char);
			};
			break;
		}
	}
};

//----------------------------------------------------------------------------------------------
// Item List - Create
// * Creates a list of items from which it's possible to choose from
//----------------------------------------------------------------------------------------------
function Sprite_ItemList() {
	this.initialize.apply(this, arguments);
}

Sprite_ItemList.prototype = Object.create(SButton_Base.prototype);
Sprite_ItemList.prototype.constructor = Sprite_ItemList;

Object.defineProperty(Sprite_ItemList.prototype, 'width', {
	get: function() {
		return this._frame.width;
	},
	set: function(value) {
		this._frame.width = value;
		if (this.borders) {
			this.borders._frame.width = value;
			this.borders.bitmap.resize(value, this._frame.height);
			this.borders._refresh();
			this._needRedrawBorders = true;
		}
		this._refresh();
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'height', {
	get: function() {
		return this._frame.height;
	},
	set: function(value) {
		this._frame.height = value;
		if (this.borders) {
			this.borders._frame.height = value;
			this.borders.bitmap.resize(this._frame.width, value);
			this.borders._refresh();
			this._needRedrawBorders = true;
		}
		this._refresh();
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'textColor', {
	get: function() {
		return this._data.textColor;
	},
	set: function(value) {
		if (this._data.textColor != value) {
			this._data.textColor = value;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'fontSize', {
	get: function() {
		return this._data.fontSize;
	},
	set: function(value) {
		if (value > 0 && this._data.fontSize !== value) {
			this._data.fontSize = Number(value);
			this.bitmap.fontSize = this._data.fontSize;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'fontFace', {
	get: function() {
		return this._data.fontFace;
	},
	set: function(value) {
		if (this._data.fontFace !== value) {
			this._data.fontFace = value;
			this.bitmap.fontFace = value;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'backColor', {
	get: function() {
		return this._data.backColor;
	},
	set: function(value) {
		if (this._data.backColor != value) {
			this._data.backColor = value;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'itemWidth', {
	get: function() {
		return this._itemWidth;
	},
	set: function(value) {
		if (!isNaN(value = Number(value)) && this._itemWidth !== value) {
			this._itemWidth = value;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'itemHeight', {
	get: function() {
		return this._itemHeight;
	},
	set: function(value) {
		if (!isNaN(value = Number(value)) && this._itemHeight !== value && value >= 0) {
			this._itemHeight = value;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'columns', {
	get: function() {
		return this._cols;
	},
	set: function(value) {
		if (!isNaN(value = Number(value)) && this._cols !== value && value >= 0) {
			this._cols = value;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'rows', {
	get: function() {
		return this._rows;
	},
	set: function(value) {
		if (!isNaN(value = Number(value)) && this._rows !== value && value >= 0) {
			this._rows = value;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'gap_x', {
	get: function() {
		return this._gap_col;
	},
	set: function(value) {
		if (!isNaN(value = Number(value)) && this._gap_col !== value && value >= 0) {
			this._gap_col = value;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'gap_y', {
	get: function() {
		return this._gap_row;
	},
	set: function(value) {
		if (!isNaN(value = Number(value)) && this._gap_row !== value && value >= 0) {
			this._gap_row = value;
			this.redraw();
		}
	},
	configurable: true
});

Object.defineProperty(Sprite_ItemList.prototype, 'scrollerWidth', {
	get: function() {
		return this._scroller_w;
	},
	set: function(value) {
		if (!isNaN(value = Number(value)) && this._scroller_w !== value && value >= 0) {
			this._scroller_w = value;
			this.redraw();
		}
	},
	configurable: true
});

//========================================
// Item List - Initialize

Sprite_ItemList.prototype.initialize = function(data, cols, rows) {
	data = data || {};
	data.useShadow = data.useShadow || false;
	this._items = [];
	this._cols = cols || 1;
	this._rows = rows || 999;
	data.scrollColors = data.scrollColors || [];
	data.scrollColors[0] = data.scrollColors[0] || '#777777';
	data.scrollColors[1] = data.scrollColors[1] || '#353535';
	SButton_Base.prototype.initialize.call(this, data);
	var ndata = this._data;
	ndata.listLimit = data.listLimit || 5;
	ndata.hoverColor = data.hoverColor || '#9696ff';
	ndata.itemHeight = data.itemHeight || (ndata.height - ndata.borderSize * 2) / ndata.listLimit;
	ndata.itemColors = data.itemColors || [];
	ndata.drawIds = !!data.drawIds;
	ndata.foregroundSelect = !!data.foregroundSelect;
	ndata.itemColors[0] = ndata.itemColors[0] || '#3e3e3e';
	ndata.itemColors[1] = ndata.itemColors[1] || '#555555';
	ndata.scrollColors = data.scrollColors || [];
	ndata.scrollColors[0] = ndata.scrollColors[0] || '#575757';
	ndata.scrollColors[1] = ndata.scrollColors[1] || '#353535';
	ndata.maxSelection = data.maxSelection > 0 ? data.maxSelection : 1;
	ndata.gapCol = data.gapCol > -1 ? Number(data.gapCol) : 1;
	ndata.gapRow = data.gapRow > -1 ? Number(data.gapRow) : 1;
	var borders_x = this.isScroll() ? ndata.borderSize : ndata.borderSize * 2;
	var scroller_w = this.isScroll() ? this._scroller_w : 0;
	this._gap_col = ndata.gapCol;
	this._gap_row = ndata.gapRow;
	this._itemWidth = Math.round((ndata.width - borders_x - scroller_w - this._gap_col * (this.columns - 1)) / this.columns);
	this._itemHeight = Math.ceil(ndata.itemHeight);
};

Sprite_ItemList.prototype.initValues = function(data) {
	SButton_Base.prototype.initValues.call(this, data);
	this._scroller_w = 8;
	this._selectedIndexes = [];
	this._scrollX = 0;
	this._scrollY = 0;
	this._gap_row = 1;
	this._gap_col = 1;
	this._fixedTone = true;
	this._needRedrawBorders = false;
};

Sprite_ItemList.prototype.initBitmaps = function() {
	this.bitmap = new Bitmap(this._data.width, this._data.height + this.borderSize);
	this.bitmap.fontSize = this.fontSize;
	this.bitmap.fontFace = this.fontFace;
	this.bitmap.textColor = this.textColor;
	this.borders = new Sprite(new Bitmap(this._data.width, this._data.height + this.borderSize));
	this.addChild(this.borders);
	this.initScroller();
};

Sprite_ItemList.prototype.initScroller = function() {
	var x = this.width - this._scroller_w;
	var scroll_h = this.height - this.borderSize * 2;
	this._scroller = new Sprite(new Bitmap(this._scroller_w, this.height));
	this._scroller.x = x;

	roller = new Sprite_Grabbable({desing:'round-rect', borderSize:0, hoverTone:15});
	roller.initBitmaps = function() {
		this.bitmap = new Bitmap(1, 1);
	};
	roller.drawMe = function(width, height, radius, color) {
		this.bitmap.drawRoundedRect(0, 0, width, height, radius, color);
	};
	roller.onMoved = function() {
		Sprite_Grabbable.prototype.onMoved.call(this);
		var gramps = this.parent.parent;
		gramps.setScrollY(this.y * this._tick);
	};
	roller.onRelease = function() {
		Sprite_Grabbable.prototype.onRelease.call(this);
		SceneManager._scene.selectButton(this.parent.parent, false);
	};
	roller._tick = 0;
	this._scroller._roller = roller;
	this._scroller.addChild(this._scroller._roller);

	this.addChild(this._scroller);
};

//========================================
// Item List - Update

Sprite_ItemList.prototype.update = function() {
	SButton_Base.prototype.update.call(this);
	this.updateRedrawBorders();
	this.updateIndexSelection();
	this.updateMyTriggers();
};

Sprite_ItemList.prototype.updateRedrawBorders = function() {
	if (this._needRedrawBorders) {
		this.redrawBorders();
	}
};

Sprite_ItemList.prototype.updateMyTriggers = function() {
	var ctrl, shift;
	if (!this.isSelected()) return;
	if (Input.isTriggered('ok')) return this.onOkTriggered();
	if (this.isCancelled()) return this.onCancelled();

	ctrl = Input.isPressed('control');
	shift = Input.isPressed('shift');
	if (Input.isRepeated('up')) return this.selectItemAbove(ctrl, shift);
	if (Input.isRepeated('right')) return this.selectNextItem(ctrl, shift);
	if (Input.isRepeated('down')) return this.selectItemBeneath(ctrl, shift);
	if (Input.isRepeated('left')) return this.selectPreviousItem(ctrl, shift);
};

Sprite_ItemList.prototype.updateIndexSelection = function() {
	if (!this.isHovered()) return;
	if (!this.isMouseMoved()) return;
	var hover_index = this.getHoverIndex();
	this._lastHoverX = TouchInput._cX;
	this._lastHoverY = TouchInput._cY;
	this.hoverSelect(hover_index);
};

//========================================
// Item List - Draw

Sprite_ItemList.prototype.drawItemList = function() {
	var lines = Math.ceil(this.items().length / this.columns);
	var list_h = lines * this.itemHeight + (lines - 1) * this._gap_row + this.borderSize;
	this.resizeBitmap(this.width, list_h);
	this.bitmap.fillAll(this.backColor);

	var item, color2, isSelectorColor;
	var maxCols = this.columns;
	var itemColors = this._data.itemColors;
	var color = itemColors[0];
	var textMaxWidth = Math.floor(this.itemWidth - this.textPadding() * 2);
	for (var i=0, x=0, y=0, row=1, column=1; i < this.items().length; i++) {
		item = this._items[i];
		x = (this.itemWidth + this._gap_col) * (column - 1) + this.borderSize;
		y = (this._itemHeight + this._gap_row) * (row - 1) + this.borderSize;
		isSelectorColor = this._selectedIndexes.contains(i) && !(item.color && item.topColor);
		color2 = isSelectorColor ? this._data.selectorColor : item.color ? item.color : '';
		this.bitmap.clearRect(x, y, this.itemWidth, this.itemHeight);
		this.bitmap.fillRect(x, y, this.itemWidth, this.itemHeight, color2 || color);
		this.drawItemText(item, x, y, textMaxWidth, this.itemHeight, i);
		color = color === itemColors[0] || color2 ? itemColors[1] : itemColors[0];
		if (++column <= maxCols) continue;
		column = 1;
		color = ++row % 2 ? itemColors[0] : itemColors[1];
		if (row > 1000) {
			console.warn("The given list is too big! Button ID: '" + this.id + "'");
			break;
		}
	}
	this.drawScroller();
};

Sprite_ItemList.prototype.drawItemText = function(item, x, y, width, maxHeight, itemIndex) {
	width = width || 312;
	if (item) {
		x += this.textPadding();
		var font = {
			size: this.fontSize,
			face: this.fontFace
		};
		var align = item.align || 'left';
		var id_width = 0;
		if (this._data.drawIds) {
			let id = (itemIndex + 1).padZero(String(this._items.length).length) + '.';
			this.bitmap.drawText(id, x, y, width - iconBoxWidth, maxHeight);
			id_width = SMO.AM.textWidthEx(id, font, true) + 4;
		}
		var iconBoxWidth = 0;
		if (item.iconIndex > -2) {
			iconBoxWidth = Math.min(this.itemHeight - 4, Math.max(font.size, Window_Base._iconWidth));
			if (align === 'right') {
				var iconX = width - SMO.AM.textWidthEx(item.text, font, true) - 2;
			} else if (align === 'center') {
				var iconX = (width - SMO.AM.textWidthEx(item.text, font, true) - iconBoxWidth) / 2;
				iconX = Math.floor(iconX);
			} else {
				var iconX = x + id_width;
			}
			let iconY = Math.floor(y + (maxHeight - iconBoxWidth)/2);
			this.drawIcon(item.iconIndex, iconX, iconY, iconBoxWidth);
			iconBoxWidth += 2;
		}
		x += iconBoxWidth + id_width;
		var maxWidth =  width - iconBoxWidth - id_width;
		var originalTxtColor = this._data.textColor;
		var txtColor = item.textColor || originalTxtColor;
		this.bitmap.textColor = txtColor;
		this.bitmap.drawText(item.text, x, y, maxWidth, maxHeight, align);
		this.bitmap.textColor = originalTxtColor;
	}
};

Sprite_ItemList.prototype.drawIcon = function(iconIndex, x, y, width) {
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y, width, width);
};

Sprite_ItemList.prototype.drawScroller = function() {
	if (!this.isScroll()) return;
	var width = this._scroller.width;
	var height = this.height;
	var radius = Math.floor(this._scroller.width / 2);
	var color = this._data.scrollColors[0];
	this._scroller.bitmap.drawRoundedRect(0, 0, width, height, radius, color);
	height = this._scroller._roller.height;
	color = this._data.scrollColors[1];
	this._scroller._roller.drawMe(width, height, radius, color);
};

Sprite_ItemList.prototype.redraw = function() {
	this.bitmap.fontSize = this._data.fontSize;
	this.bitmap.fontFace = this._data.fontFace;
	this.bitmap.textColor = this._data.textColor;
	this.setColorTone([0, 0, 0, 0]);
	this.bitmap.clear();
	this.drawItemList();
};

Sprite_ItemList.prototype.redrawBorders = function() {
	SButton_Base.prototype.redrawBorders.call(this);
	this._needRedrawBorders = false;
};

Sprite_ItemList.prototype.redrawItem = function(index) {
	var item = this._items[index];
	if (!item) return;
	var id = index + 1;
	var maxCols = this.columns
	var column = (id % maxCols) || maxCols;
	var line = Math.ceil(id / maxCols);
	var x = (this.itemWidth + this._gap_col) * (column - 1) + this.borderSize;
	var y = (this.itemHeight + this._gap_row) * (line - 1) + this.borderSize;
	var textMaxWidth = this.itemWidth - this.textPadding() * 2;

	var originalTxtColor = '#ffffff';
	var txtColor = item.textColor || originalTxtColor;
	var isTopColor = item.color && item.topColor;
	var isHoverColor = this._hoverSelection === index && !isTopColor;
	var isSelectorColor = this._selectedIndexes.contains(index) && !isTopColor;
	var color = isHoverColor ? this._data.hoverColor : isSelectorColor ? this._data.selectorColor : item.color || '';
	if (!color) {
		let isColumnOdd = column % 2 !== 0;
		let isLineOdd = line % 2 !== 0;
		let isBothOdd = isLineOdd && isColumnOdd;
		let isNeitherOdd = !isLineOdd && !isColumnOdd;
		color = (isBothOdd || isNeitherOdd) ? this._data.itemColors[0] : this._data.itemColors[1];
	}

	this.bitmap.clearRect(x, y, this.itemWidth, this.itemHeight);
	this.bitmap.fillRect(x, y, this.itemWidth, this.itemHeight, color);
	this.bitmap.textColor = txtColor;
	this.drawItemText(item, x, y, textMaxWidth, this.itemHeight, index);
	this.bitmap.textColor = originalTxtColor;
};

Sprite_ItemList.prototype.redrawScroller = function() {
	this._scroller.bitmap.clear();
	this._scroller._roller.bitmap.clear();
	this.drawScroller();
};

//========================================
// Item List - Hover

Sprite_ItemList.prototype.hoverSelect = function(index) {
	var hoverIndex = this.isIndexAvailable(index) ? index : -1;
	if (this._hoverSelection !== hoverIndex) {
		let oldHoverIndex = this._hoverSelection;
		this._hoverSelection = hoverIndex;
		this.redrawItem(this._hoverSelection);
		this.redrawItem(oldHoverIndex);
	}
};

Sprite_ItemList.prototype.getHoverIndex = function() {
	if (!this.isHovered()) return -1;
	if (this.items().length === 0) return -1;
	var tx = TouchInput._cX;

	var index = this.getOptionIndexOnXy(TouchInput._cX, TouchInput._cY);
	var maxIndex = this.items().length - 1;
	if (index < 0 || index > maxIndex) return -1;
	return index;
};


Sprite_ItemList.prototype.onMouseLeave = function() {
	SButton_Base.prototype.onMouseLeave.call(this);
	if (this._hoverSelection !== -1) {
		let hover = this._hoverSelection;
		this._hoverSelection = -1;
		this.redrawItem(hover);
	}
};

Sprite_ItemList.prototype.getOptionIndexOnXy = function(x, y) {
	var column, row;
	var items = this.items();
	if (!items.length) return -1;
	x = x - this.realX() + this._scrollX;
	y = y - this.realY() + this._scrollY;

	if (this.columns < 2) {
		column = 1;
	} else {
		let col_width = this.itemWidth + this._gap_col;
		if (x > this._cols * col_width - this._gap_col) return -1; //Column out of range
		if (x - Math.floor(x / col_width) * col_width > this.itemWidth) return -1; //Clicked on the gap
		column = Math.ceil(x / col_width) || 1;
	}

	if (this.rows < 2) {
		row = 1;
	} else {
		let row_height = this.itemHeight + this._gap_row;
		if (y > this._rows * row_height - this._gap_row) return -1; //Row out of range
		if (y - Math.floor(y / row_height) * row_height > this.itemHeight) return -1; //Clicked on the gap
		row = Math.ceil(y / row_height) || 1;
	}

	return this._cols * (row - 1) + column - 1;
};

Sprite_ItemList.prototype.isMouseOverScroller = function() {
	if (!this.isScroll()) return false;
	var tx = TouchInput._cX;
	var ty = TouchInput._cY;
	var x1 = this.realX.call(this._scroller);
	var x2 = x1 + this._scroller.width;
	var y1 = this.realY.call(this._scroller);
	var y2 = y1 + this._scroller.height;
	return tx >= x1 && tx < x2 && ty >= y1 && ty < y2;
};

Sprite_ItemList.prototype.isMouseMoved = function() {
	return this._lastHoverX != TouchInput._cX || this._lastHoverY != TouchInput._cY;
};

//========================================
// Item List - Items' Management

//Method - setItemList
// * Redraws the list with the given list of items (an array)
// * The array may contain the game objetcs (items, weapons and armors) or just strings
Sprite_ItemList.prototype.setItemList = function(list) {
	if (!Array.isArray(list)) {
		console.warn('The given list must be an array.')
		return;
	}
	this.deselectAllItems();
	this._items = [];
	if (list.length) {
		var item;
		for(var d = 0; d < list.length; d++) {
			if (list[d] == null) {
				continue;
			}
			item = {
				text: list[d].name != null ? list[d].name : list[d],
				iconIndex: list[d].iconIndex != null ? list[d].iconIndex : -2
			};
			if (list[d].color) {
				item.color = list[d].color;
			}
			if (list[d].align) {
				item.align = list[d].align;
			}
			if (list[d].textColor) {
				item.textColor = list[d].textColor;
			}
			if (list[d].topColor) {
				item.topColor = true;
			}
			this._items.push(item);
		}
	}
	this.redraw();
};

// Method - remove
// * Removes an item from the list and redraws it
// Number: index -> the indes of the item you want to remove
Sprite_ItemList.prototype.remove = function(index) {
	this._items.splice(index, 1);
	var isItemSelected = this.isAnyItemSelected();
	if (isItemSelected) {
		var selected = this._selectedIndexes;
		this.deselectAllItems();
		this.onItemDeselected(selected);
	}
	this.redraw();
};

// Method - add
// * Adds an item to the list and redraws it
// String: text -> the item's text
// Number: iconIndex -> the index of the icon to be drawn before the text (-1 leaves an empty space)
// String: color -> the background color for this item, it may be an hexadecimal or rgba/rgba
// String: align -> the alignment for this item's text
Sprite_ItemList.prototype.add = function(text, iconIndex, color, align) {
	if (this._items.length >= this.maxItems()) return;
	text = text || '';
	iconIndex = iconIndex || -2;
	color = color || '';
	align = align || '';
	this.addItem({text, iconIndex, color, align});
};

// Method - addItem
// * Adds an item to the list and redraws it
// Object: item -> {text(string), iconIndex(integer>=-2)}
Sprite_ItemList.prototype.addItem = function(item) {
	this._items.push(item);
	this.redraw();
};

Sprite_ItemList.prototype.items = function() {
	return this._items;
};

Sprite_ItemList.prototype.getSelectedItemsTexts = function() {
	var items = [];
	for (var i = 0; i < this._selectedIndexes.length; i++) {
		items.push(this.items()[this._selectedIndexes[i]].text);
	}
	return items;
};

Sprite_ItemList.prototype.deselectAllItems = function() {
	if (!this.isAnyItemSelected()) return;
	var selected = this._selectedIndexes.clone();
	this._selectedIndexes = [];
	for (var i = 0; i < selected.length; i++) {
		this.redrawItem(selected[i]);
	}
};

Sprite_ItemList.prototype.deselectItem = function(index) {
	this._selectedIndexes.delete(index);
	this.redrawItem(index);
	this.onItemDeselected([index]);
};

Sprite_ItemList.prototype.deselectAllButThisItem = function(index) {
	if (!this.isMultipleItemsSelected()) return;
	var deselected = this._selectedIndexes.clone();
	deselected.delete(index);
	this._selectedIndexes = [index];
	for (var a = 0; a < deselected.length; a++) {
		this.redrawItem(deselected[a]);
	}
	this.onItemDeselected(deselected);
};

Sprite_ItemList.prototype.selectItem = function(index, ctrl, touch) {
	touch = touch == null ? true : touch;
	if (!this.isIndexAvailable(index)) return this.deselectAllItems();
	if (this._selectedIndexes.contains(index)) { // Index already selected
		if (ctrl) {
			this.deselectItem(index);
		} else {
			this.deselectAllButThisItem(index);
		}
		this.checkDoubleClick(index, touch);
	} else {
		if (this.isAnyItemSelected() && !ctrl) {
			if (this._data.maxSelection > 0) {
				this._selectedIndexes.push(index);
				this.redrawItem(index);
				this.focusItem(index);
				this.deselectAllButThisItem(index);
				this.onItemSelected(index);
				this.checkDoubleClick(index, touch);
			} else {
				var selected = this._selectedIndexes;
				this.deselectAllItems();
				this.onItemDeselected(selected);
			}
		} else if (this._selectedIndexes.length < this._data.maxSelection) {
			this._selectedIndexes.push(index);
			this.redrawItem(index);
			this.focusItem(index);
			this.onItemSelected(index);
			this.checkDoubleClick(index, touch);
		}
	}
};

Sprite_ItemList.prototype.selectItemByName = function(itemName, ctrl) {
	var index = this.getIndexByString(itemName);
	var isSelectionEdible = index > -1 && !this._selectedIndexes.contains(index);
	if (isSelectionEdible) {
		this.selectItem(index, ctrl, false);
	}
};

// Array -> indexes
Sprite_ItemList.prototype.onItemDeselected = function(indexes) {};

Sprite_ItemList.prototype.onItemSelected = function(index) {};

Sprite_ItemList.prototype.selectedItem = function() {
	return this._selectedIndexes.length ? this._items[this._selectedIndexes[0]] : null;
};

Sprite_ItemList.prototype.selectedItemText = function() {
	var selectedItem = this.selectedItem();
	return selectedItem ? selectedItem.text : '';
};

Sprite_ItemList.prototype.checkDoubleClick = function(index, touch) {
	if (!touch) return;
	var selection = { index:index, frame:Graphics.frameCount };
	if (!this._lastSelection) {
		return this._lastSelection = selection;
	}
	if (this._lastSelection.index !== index) {
		return this._lastSelection = selection;
	}
	var timespan = Graphics.frameCount - this._lastSelection.frame;
	if (timespan > DOUBLE_CLICK_INTERVAL) {
		return this._lastSelection = selection;
	}
	delete this._lastSelection;
	return this.onDoubleClick(index);
};

//Method - focusItem
// * Makes sure the item on the given index is visible for the user
Sprite_ItemList.prototype.focusItem = function(index) {
	if (!this.isScroll()) return;
	var item_row = this.getItemRow(index);
	var item_y = (this.itemHeight + this._gap_row) * (item_row - 1);
	if (this._scrollY > item_y) {
		this.setScrollY(item_y);
		this._scroller._roller.y = this._scrollY / this._scroller._roller._tick;
		return;
	}

	item_y += this.borderSize * 2;
	if (this._scrollY + this.height < item_y + this.itemHeight) {
		this.setScrollY(item_y - this.height + this.itemHeight);
		this._scroller._roller.y = this._scrollY / this._scroller._roller._tick;
		return;
	}
};

Sprite_ItemList.prototype.selectItemAbove = function(ctrl, shift) {
	var itemIndex, itemRow, itemCol, lastRow, lastCol;
	if (this.isEmpty()) return;
	if (!this.isAnyItemSelected()) return this.selectItem(this.items().length - 1, false, false);
	if (this.items().length == 1) return;
	if ((ctrl || shift) && this._selectedIndexes.length >= this._data.maxSelection) return;

	itemIndex = this._selectedIndexes.last();
	itemRow = this.getItemRow(itemIndex);
	itemCol = this.getItemCol(itemIndex);
	lastRow = this.lastRow();
	lastCol = this.lastCol();
	if (lastRow === 1) return; //This list has only one line
	if (itemRow === 1) { //Go to the last line
		let index = this.items().length - lastCol + Math.min(itemCol, lastCol) - 1;
		return this.selectItem(index, ctrl || shift, false);
	}
	return this.selectItem(itemIndex - this.columns, ctrl || shift, false);
};

Sprite_ItemList.prototype.selectNextItem = function(ctrl, shift) {
	var itemIndex, lastIndex, nextIndex;
	if (this.isEmpty()) return;
	if (!this.isAnyItemSelected()) return this.selectItem(0, false, false);
	if (this.items().length == 1) return;
	if ((ctrl || shift) && this._selectedIndexes.length >= this._data.maxSelection) return;

	itemIndex = this._selectedIndexes.last();
	lastIndex = this.items().length - 1;
	nextIndex = lastIndex > itemIndex ? itemIndex + 1 : 0;
	return this.selectItem(nextIndex, ctrl || shift, false);
};

Sprite_ItemList.prototype.selectItemBeneath = function(ctrl, shift) {
	var itemIndex, itemRow, itemCol, lastRow, lastCol, select;
	if (this.isEmpty()) return;
	if (!this.isAnyItemSelected()) return this.selectItem(0, false, false);
	if ((ctrl || shift) && this._selectedIndexes.length >= this._data.maxSelection) return;

	lastRow = this.lastRow();
	if (lastRow === 1) return; //This list has only one line
	lastCol = this.lastCol();
	itemIndex = this._selectedIndexes.last();
	itemRow = this.getItemRow(itemIndex);
	itemCol = this.getItemCol(itemIndex);
	if (itemRow === lastRow) return this.selectItem(itemCol - 1, ctrl || shift, false); //Go to the first line
	itemIndex = Math.min(this.items().length - 1, itemIndex + this.columns);
	return this.selectItem(itemIndex, ctrl || shift, false);
};

Sprite_ItemList.prototype.selectPreviousItem = function(ctrl, shift) {
	var itemIndex, previousIndex;
	if (this.isEmpty()) return;
	if (!this.isAnyItemSelected()) return this.selectItem(this.items().length - 1, false, false);
	if (this.items().length == 1) return;
	if ((ctrl || shift) && this._selectedIndexes.length >= this._data.maxSelection) return;

	itemIndex = this._selectedIndexes.last();
	previousIndex = itemIndex > 0 ? itemIndex - 1 : this.items().length - 1;
	return this.selectItem(previousIndex, ctrl || shift, false);
};

//========================================
// Item List - Resize

Sprite_ItemList.prototype.resizeBitmap = function(width, height) {
	width = Math.max(width, this.width);
	height = Math.max(height, this.height);
	var isSizeChanged = this.bitmap.width !== width || this.bitmap.height !== height;
	var isScrollerSizeChanged =  this._scroller.width === this._scroller_w;
	if (!isSizeChanged && !isScrollerSizeChanged) return;
	var borders_x, scroller_w;
	var roller = this._scroller._roller;
	var old_width = this.width;
	var old_height = this.height;
	this.bitmap.resize(width, height);
	this._refresh();
	this.width = old_width;
	this.height = old_height;
	if (this.isScroll()) {
		this._scroller.visible = true;
		scroller_w = this._scroller_w;
		borders_x = this._data.borderSize;
		let base_height = this.height - this.borderSize * 2;
		let roller_w = scroller_w;
		let roller_h = Math.floor(base_height * base_height / this.bitmap.height);
		let limit_y = this.height - roller_h;
		roller.bitmap = new Bitmap(roller_w, roller_h);
		roller.setDragLimits(0, 0, 0, limit_y);
		roller._tick = (this.bitmap.height - this.height + this.borderSize) / (this.height - roller_h);
		if (this._scroller.width !== scroller_w) {
			this._scroller.bitmap.resize(scroller_w, this._scroller.height);
			this._scroller.width = scroller_w;
		}
		this._scroller.x = this.width - scroller_w;
		roller.setFullGrabBox();
	} else {
		borders_x = this._data.borderSize * 2;
		scroller_w = 0;
		this._scroller.visible = false;
	}
	this._itemWidth = Math.round((this._data.width - borders_x - scroller_w - this._gap_col * (this.columns - 1)) / this.columns);
	roller.y = 0;
	this.setScrollY(0);
};

//========================================
// Item List - Scroll

Sprite_ItemList.prototype.isScroll = function() {
	return this.height < this.bitmap.height;
};

Sprite_ItemList.prototype.setScrollY = function(y) {
	this._frame.y = y;
	this._scrollY = y;
	this._refresh();
};

//========================================
// Item List - Others

Sprite_ItemList.prototype.getIndexByString = function(string) {
	if (!string) return -1;
	string = string.toLowerCase();
	var items = this.items();
	for (var i = 0; i < items.length; i++) {
		if (items[i].text.toLowerCase() == string) {
			return i;
		}
	}
	return -1;
};

Sprite_ItemList.prototype.onOkTriggered = function() {};

Sprite_ItemList.prototype.onCancelled = function() {
	if (this.isAnyItemSelected()) {
		var deselected = this._selectedIndexes;
		this.deselectAllItems();
		this.onItemDeselected(deselected);
	}
};

Sprite_ItemList.prototype.isCancelled = function() {
	return Input.isTriggered('cancel') || TouchInput.isCancelled();
};

Sprite_ItemList.prototype.textPadding = function() {
	return 4;
};

Sprite_ItemList.prototype.maxItems = function() {
	return this.columns * this.rows;
};

Sprite_ItemList.prototype.isEmpty = function() {
	return !this.items().length;
};

Sprite_ItemList.prototype.isIndexAvailable = function(index) {
	return index > -1 && index < this.items().length;
};

Sprite_ItemList.prototype.isAnyItemSelected = function() {
	return !!this._selectedIndexes.length;
};

Sprite_ItemList.prototype.isMultipleItemsSelected = function() {
	return this._selectedIndexes.length > 1;
};

Sprite_ItemList.prototype.getItemCol = function (index) {
	if (!(index > 0)) return 1;
	return ((index + 1) % this.columns) || this.columns;
};

Sprite_ItemList.prototype.getItemRow = function(index) {
	if (!(index > 0)) return 1;
	return Math.ceil((index + 1) / this.columns);
};

Sprite_ItemList.prototype.lastCol = function() {
	return this.getItemCol(this.items().length - 1);
};

Sprite_ItemList.prototype.lastRow = function() {
	return this.getItemRow(this.items().length - 1);
};

Sprite_ItemList.prototype.setGap = function(colGap, rowGap) {
	this._gap_col = colGap == null ? 0 : colGap;
	this._gap_row = rowGap == null ? 0 : rowGap;
	this.redraw();
};

Sprite_ItemList.prototype.onSelect = function(touch) {
	SButton_Base.prototype.onSelect.call(this, touch);
	if (touch != null && !touch) return;
	var ctrl = Input.isPressed('control');
	var selected = this.getOptionIndexOnXy(TouchInput._x, TouchInput._y);
	if (this.hasItem(selected)) {
		this.selectItem(selected, ctrl);
	}
};

Sprite_ItemList.prototype.onReselect = function() {
	SButton_Base.prototype.onReselect.call(this);
	var ctrl = Input.isPressed('control');
	var selected = this.getOptionIndexOnXy(TouchInput._x, TouchInput._y);
	if (this.hasItem(selected)) {
		this.selectItem(selected, ctrl);
	}
};

Sprite_ItemList.prototype.hasItem = function(index) {
	return !!this._items[index];
};

Sprite_ItemList.prototype.onDoubleClick = function(index) {};

//==========================================================================================
// SWindow - Create
//==========================================================================================
function SWindow_Base() {
	this.initialize.apply(this, arguments);
}

SWindow_Base.prototype = Object.create(Sprite_Grabbable.prototype);
SWindow_Base.prototype.constructor = SWindow_Base;

Object.defineProperty(SWindow_Base.prototype, 'title', {
	configurable: true,
	get: function() {
		return this._title;
	},
	set: function(value) {
		if (this._title != value) {
			this._title = value;
			var bds = this.borderSize;
			this.txtChild.bitmap.clearRect(bds, bds, this.width - bds * 2, 22);
			this.drawTitle();
		}
	}
});

Object.defineProperty(SWindow_Base.prototype, 'titleBgColor', {
	configurable: true,
	get: function() {
		return this._title;
	},
	set: function(value) {
		if (this._titleBackground != value) {
			this._titleBackground = value;
			var bds = this.borderSize;
			this.txtChild.bitmap.clearRect(bds, bds, this.width - bds * 2, 22);
			this.drawTitle();
		}
	}
});

//========================================
// SWindow - Initialize

SWindow_Base.prototype.initialize = function(data) {
	Sprite_Grabbable.prototype.initialize.call(this, data);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.initPosition();
	this.initTools();
	this.drawTitle();
	this.initMaskButton();
};

SWindow_Base.prototype.initPosition = function() {
	this.x = Math.floor(this._data.x + this.width * this.anchor.x);
	this.y = Math.floor(this._data.y + this.height * this.anchor.y);
};

SWindow_Base.prototype.initTools = function() {
	var closeButton = {
		id: 'closeButton',
		design: 'round-rect',
		text: '❌',
		x: this.width - 23,
		y: 3,
		width: 20,
		height: 20,
		textAlign: 'center',
		fontSize: 12,
		textColor: 'rgba(180,50,50,1)',
		borderColor: 'rgba(150,0,0,1)',
		backColor: '#ef0000',
		hideSelect: true,
		disabledTone: 0,
		onClick: (() => this.close()).bind(this)
	};
	this._closeButton = new SButton_Confirm(closeButton);
	this.addChild(this._closeButton);
};

SWindow_Base.prototype.initValues = function(data) {
	Sprite_Grabbable.prototype.initValues.call(this, data);
	this._isSelectorOpen = false;
	this._title = data.title || '';
	this._titleBackground = data.titleBackground || '';
	this._paddingX = 15;
	this._paddingY = 23;
	this._opening = true;
	this._closing = false;
	if (!data.initVisible) {
		this._opening = false;
		this.opacity = 0;
		this._animation = 31;
		this.visible = false;
		this.scale.x = 0.8;
		this.scale.y = 0.8;
	}
};

//The mask button is shown when the window is closing the it's hidden once it's fully open
//This is used to prevent the user from clicking any buttons during the animation
SWindow_Base.prototype.initMaskButton = function() {
	this._maskButtonLayer = new Sprite();
	var data = {
		x: 0,
		y: 0,
		width: this.width,
		height: this.height,
		backColor: 'rgba(0,0,0,0)',
		borderColor: 'rgba(0,0,0,0)',
		hideSelect: true,
		disabledTone: 0,
		useShadow: false
	};
	this._maskButton = new SButton_Confirm(data);
	this._maskButton.isXyFilled = function(x, y) {
		return true;
	};
	this._maskButton._fixedTone = true;
	this._maskButton.visible = false;
	this._maskButtonLayer.addChild(this._maskButton);

	this.addChild(this._maskButtonLayer);
};

//========================================
// SWindow - Update

SWindow_Base.prototype.update = function() {
	Sprite_Grabbable.prototype.update.call(this);
	this.updateOpenState();
};

SWindow_Base.prototype.updateOpenState = function() {
	if (this._animation > 30) return;
	var interval = 15;
	if (this.visible && this._closing) {
		var frame = SMO.AM.easeOutQuart(this._animation/30);
		this.scale.x = 1 - 0.2 * frame;
		this.scale.y = 1 - 0.2 * frame;
		if (this.opacity > 0) {
			this.opacity = Math.max(this.opacity - interval, 0);
		}
		if (++this._animation > 30) {
			this.onClose();
		}
	} else if (this._opening) {
		this.visible = true;
		var frame = SMO.AM.easeOutQuart(this._animation/30);
		this.scale.x = 0.8 + 0.2 * frame;
		this.scale.y = 0.8 + 0.2 * frame;
		if (this.opacity < 255) {
			this.opacity = Math.min(this.opacity + interval, 255);
		}
		if (++this._animation > 30) {
			this.onOpen();
		}
	}
};

//========================================
// SWindow - Draw

SWindow_Base.prototype.drawTitle = function() {
	var bds = this.borderSize;
	var y = bds;
	var maxWidth = this.width - bds * 2;
	if (this._titleBackground) {
		this.txtChild.bitmap.fillRect(y, y, maxWidth, 22, this._titleBackground);
		this.txtChild.bitmap.fillRect(y, y + 21, maxWidth, 1, 'rgba(255,255,255,0.5)');
	}
	if (this._title) {
		this.txtChild.bitmap.drawText(this._title, y, y, maxWidth, 22, 'center');
	}
};

//========================================
// SWindow - Other

SWindow_Base.prototype.addChild = function(child) {
	Sprite_Grabbable.prototype.addChild.call(this, child);
	if (!(child instanceof SButton_Base)) {
		child.x -= Math.floor(this.width * this.anchor.x);
		child.y -= Math.floor(this.height * this.anchor.y);
	}
};

SWindow_Base.prototype.open = function() {
	this._opening = true;
	this._animation = 1;
};

SWindow_Base.prototype.close = function() {
	this._closing = true;
	this._animation = 1;
	this._maskButton.visible = true;
};

SWindow_Base.prototype.onOpen = function() {
	this._opening = false;
	this._maskButton.visible = false;
};

SWindow_Base.prototype.onClose = function() {
	this.visible = false;
	this._closing = false;
};

SWindow_Base.prototype.isAnimating = function() {
	return this._opening || this._closing;
};

//==========================================================================================
// Image Selector - Create
//==========================================================================================
function ImageSelector() {
	this.initialize.apply(this, arguments);
}

ImageSelector.prototype = Object.create(SWindow_Base.prototype);
ImageSelector.prototype.constructor = ImageSelector;

//========================================
// Image Selector - Initialize

ImageSelector.prototype.initialize = function(dirpath) {
	var data = {
		x: Math.ceil((Graphics.width - 600)/2),
		y: Math.ceil((Graphics.height - 450)/2),
		width: 600,
		height: 450,
		backColor: '#222222',
		title: 'Select an Image',
		titleBackground: '#1a1a1a',
		hideSelect: true
	};
	this._dirpath = dirpath || 'img/achievements';
	SWindow_Base.prototype.initialize.call(this, data);
	this.refreshImageNames();
};

ImageSelector.prototype.initValues = function(data) {
	SWindow_Base.prototype.initValues.call(this, data);
	this._refreshingNames = false;
	this._fixedTone = true;
	this._selectingImage = '';
	this._selectedImage = null;
	this.imageName = '';
};

ImageSelector.prototype.initTools = function() {
	SWindow_Base.prototype.initTools.call(this);
	this.initImageNamesList();
	this.initRefreshButton();
	this.initConfirmButton();
};

ImageSelector.prototype.initImageNamesList = function() {
	var data = {
		x: 2,
		y: this._paddingY,
		itemHeight: 30,
		width: 150,
		height: 400,
		backColor: '#111111',
		disabledTone: 0,
		hideSelect: true,
		enableMethod: (() => !this._isLoadingImage).bind(this)
	};
	this._imageNamesList = new Sprite_ItemList(data, 1);
	this._imageNamesList.onItemSelected = function(index) {
		if (index) {
			var dirpath = this.parent._dirpath + '/';
			var filename = this._items[index].text;
			this.parent._selectedImage = ImageManager.loadBitmap(dirpath, filename, 0, false);
			this.parent.drawSelectedImage();
		} else {
			this.parent.clearSelectedImage();
		}
	};
	this._imageNamesList.onItemDeselected = function(indexes) {
		if (!this.isAnyItemSelected()) {
			this.parent.clearSelectedImage();
		}
	};
	this._imageNamesList.onDoubleClick = function(index) {
		Sprite_ItemList.prototype.onDoubleClick.call(this, index);
		this.parent.onConfirm();
	};
	this._imageNamesList.isSelected = function() {
		return this.parent.visible;
	};
	this._imageNamesList.onOkTriggered = function() {
		Sprite_ItemList.prototype.onOkTriggered.call(this);
		this.parent.onConfirm();
	};
	this.addChild(this._imageNamesList);
};

ImageSelector.prototype.initRefreshButton = function() {
	var data = {
		text: 'REFRESH',
		textAlign: 'center',
		x: 2,
		y: 425,
		width: 150,
		height: 23,
		backColor: '#43d643',
		borderColor: '#78ff78',
		disabledTone: 0,
		hideSelect: true,
		fontSize: this.txtChild.bitmap.fontSize,
		onClick: this.refreshImageNames.bind(this),
		enableMethod: (() => !this._isLoadingImage).bind(this)
	};
	this._refreshButton = new SButton_Confirm(data);
	this.addChild(this._refreshButton);
};

ImageSelector.prototype.initConfirmButton = function() {
	var data = {
		text: 'OK',
		textAlign: 'center',
		x: this.width - 63,
		y: this.height - 25,
		width: 60,
		height: 22,
		backColor: '#43d643',
		borderColor: '#78ff78',
		disabledTone: 0,
		hideSelect: true,
		fontSize: this.txtChild.bitmap.fontSize,
		onClick: (() => this.onConfirm()).bind(this)
	};
	//The "onClick" method above is written like that so I can redefine it later and the
	//changes will still take effect, what doesn't happen if I write "this.onConfirm.bind(this)"
	this._confirmButton = new SButton_Confirm(data);
	this.addChild(this._confirmButton);
};

//========================================
// Image Selector - Update

ImageSelector.prototype.update = function() {
	SWindow_Base.prototype.update.call(this);
	this.updateImagesNames();
	this.updateImageLoading();
	this.updateAutoSelect();
};

ImageSelector.prototype.updateAutoSelect = function() {
	if (!this._imageNamesList.isSelected()) {
		if (this.visible && !this.isAnimating()) {
			this._imageNamesList.updateMyTriggers();
		}
	}
};

ImageSelector.prototype.updateImagesNames = function() {
	if (this._refreshingNames) {
		if (!SMO.AM.requestedImgNames.busy) {
			let clone = SMO.AM.requestedImgNames.result.clone();
			clone.splice(0, 0, '<none>')
			this._imageNamesList.setItemList(clone);
			this.clearSelectedImage();
			this._refreshingNames = false;
			if (this._selectingImage) {
				this.selectImage(this._selectingImage);
				this._selectingImage = '';
			}
		}
	}
};

ImageSelector.prototype.updateImageLoading = function() {
	if (this._isLoadingImage) {
		if (!this._selectedImage) {
			return this._isLoadingImage = false;
		}
		if (this._selectedImage.isReady()) {
			this.drawSelectedImage();
		}
	}
};

//========================================
// Image Selector - Other

ImageSelector.prototype.clearSelectedImage = function() {
	this.txtChild.bitmap.clearRect(154, 24, 442, 426);
	this._isLoadingImage = false;
};

ImageSelector.prototype.refreshImageNames = function() {
	if (!Utils.isNwjs()) {
		return this.showErrorMessage('This window can only exist on Node.js');
	}
	if (this._dirpath) {
		this.title = 'Select an Image (' + this._dirpath + ')';
		DataManager.getPngImgNames(this._dirpath);
		this._refreshingNames = true;
	}
};

ImageSelector.prototype.selectImage = function(imageName) {
	if (this._refreshingNames) {
		this._selectingImage = imageName;
		return;
	}
	for (var i = 0; i < this._imageNamesList.items().length; i++) {
		if (this._imageNamesList._items[i].text === imageName) {
			return this._imageNamesList.selectItem(i);
		}
	}
};

ImageSelector.prototype.drawSelectedImage = function() {
	var image = this._selectedImage;
	if (!image.isReady()) {
		this._isLoadingImage = true;
		return;
	}

	//The image is already loaded, draw it
	var text = 'Original Size: ' + image.width + 'x' + image.height;
	this.clearSelectedImage();
	this.txtChild.bitmap.blt(image, 0, 0, image.width, image.height, 154, 24, 442, 400);
	this.txtChild.bitmap.fontSize -= 2;
	this.txtChild.bitmap.drawText(text, 155, 425, 250, 23);
	this.txtChild.bitmap.fontSize += 2;
};

ImageSelector.prototype.showErrorMessage = function(message) {
	this.clearSelectedImage();
	var text = 'ERROR: ' + message;
	var oldTxtColor = this.txtChild.bitmap.textColor;
	this.txtChild.bitmap.textColor = '#ff3535';
	this.txtChild.bitmap.drawText(text, 155, 23, 442, 426, 'center');
	this.txtChild.bitmap.textColor = oldTxtColor;
};

ImageSelector.prototype.onConfirm = function() {
	if (this._imageNamesList._selectedIndexes.length) {
		var items = this._imageNamesList._items;
		this.imageName = items[this._imageNamesList._selectedIndexes[0]].text;
	}
	this.close();
	if (this._editor && this._editor.onImageSelectorConfirmed) {
		this._editor.onImageSelectorConfirmed();
	}
};

ImageSelector.prototype.open = function() {
	SWindow_Base.prototype.open.call(this);
	this.imageName = '';
	if (!Utils.isNwjs()) {
		return this.showErrorMessage('This window can only exist on Node.js');
	}
};

ImageSelector.prototype.close = function() {
	SWindow_Base.prototype.close.call(this);
	if (this._editor && this._editor.open) {
		this._editor.open();
	}
};

ImageSelector.prototype.onClose = function() {
	SWindow_Base.prototype.onClose.call(this);
	this._imageNamesList.deselectAllItems();
	this.clearSelectedImage();
};

//==========================================================================================
// Icon Selector - Create
//==========================================================================================
function IconSelector() {
	this.initialize.apply(this, arguments);
}

IconSelector.prototype = Object.create(SWindow_Base.prototype);
IconSelector.prototype.constructor = IconSelector;

//========================================
// Icon Selector - Initialize

IconSelector.prototype.initialize = function() {
	var IconSet = ImageManager.loadSystem('IconSet');
	var data = {
		x: Math.floor((Graphics.width - IconSet.width - 14)/2),
		y: Math.floor((Graphics.height - 440)/2),
		width: IconSet.width + 14,
		height: 440,
		backColor: '#222222',
		title: 'Select an Icon',
		titleBackground: '#1a1a1a',
		hideSelect: true
	};
	SWindow_Base.prototype.initialize.call(this, data);
};

IconSelector.prototype.initValues = function(data) {
	SWindow_Base.prototype.initValues.call(this, data);
	this._fixedTone = true;
	this._lastIndexSelected = -1;
	this.iconIndex = -1;
};

IconSelector.prototype.initTools = function() {
	SWindow_Base.prototype.initTools.call(this);
	this.initIconList();
	this.initConfirmButton();
	var fontSize = this.txtChild.bitmap.fontSize;
	this.txtChild.bitmap.drawText('Icon Selected: None', 15, 400, this.width, 40);
};

IconSelector.prototype.initIconList = function() {
	var data = {
		x: 2,
		y: this._paddingY,
		width: this.width-5,
		height: 376,
		itemWidth: Window_Base._iconHeight,
		itemHeight: Window_Base._iconHeight,
		listLimit: 999999,
		fontSize: 32,
		gapCol: 0,
		gapRow: 0,
		hoverColor: '#ff0000',
		selectorColor: '#eb0000',
		backColor: '#222222',
		itemColors: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
		borderSize: 1,
		foregroundSelect: true,
		hideSelect: true,
		disabledTone: 0
	};
	this._iconList = new Sprite_ItemList(data, 16);
	this._iconList._selectorSprite = new Sprite(new Bitmap(data.width, data.height));
	this._iconList.addChild(this._iconList._selectorSprite);
	this._iconList.hasItem = function(index) {
		return true;
	};
	this._iconList.drawItemList = function() {
		var bitmap = ImageManager.loadSystem('IconSet');
		this.resizeBitmap(bitmap.width+10, bitmap.height+2);
		this._selectorSprite.bitmap.resize(bitmap.width+10, bitmap.height+2);
		this._selectorSprite._refresh();
		this.bitmap.clear();
		this.bitmap.fillAll(this.backColor);
		this.bitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 2, 2);
		this.drawScroller();
		if (this.isAnyItemSelected()) {
			this.redrawItem(this._selectedIndexes[0]);
		}
	};
	this._iconList.isSelected = function() {
		return this.parent.visible;
	};

	this._iconList.items = function() {
		return {length: Math.floor(this.bitmap.height/Window_Base._iconHeight) * 16};
	};

	this._iconList.setScrollY = function(y) {
		Sprite_ItemList.prototype.setScrollY.call(this, y);
		this._selectorSprite._frame.y = y;
		this._selectorSprite._refresh();
	};

	this._iconList.redrawItem = function(index) {
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = index % 16 * pw + 2;
		var sy = Math.floor(index / 16) * ph + 2;
		var isItemHovered = this._hoverSelection === index;
		var isItemSelected = this._selectedIndexes.contains(index);
		var color = isItemHovered ? this._data.hoverColor : isItemSelected ? this._data.selectorColor : '';
		this._selectorSprite.bitmap.clearRect(sx, sy, pw, ph);
		if (color) {
			this._selectorSprite.bitmap.fillRect(sx, sy, pw, ph, color);
			this._selectorSprite.bitmap.clearRect(sx+2, sy+2, pw-4, ph-4);
	    }
	};

	this._iconList.onItemSelected = function(index) {
		this.parent.refreshBottomNote();
	};
	this._iconList.onItemDeselected = function(indexes) {
		if (!this.isAnyItemSelected()) {
			this.parent.refreshBottomNote();
		}
	};
	this._iconList.onDoubleClick = function(index) {
		Sprite_ItemList.prototype.onDoubleClick.call(this, index);
		this.parent._lastIndexSelected = index;
		this.parent.onConfirm();
	};
	this._iconList.onOkTriggered = function() {
		Sprite_ItemList.prototype.onOkTriggered.call(this);
		var selected = this._selectedIndexes[0];
		this.parent._lastIndexSelected = selected != null ? selected : -1;
		this.parent.onConfirm();
	};
	this._iconList.redraw();
	this.addChild(this._iconList);
};

IconSelector.prototype.initConfirmButton = function() {
	var data = {
		text: 'OK',
		textAlign: 'center',
		x: this.width - 80,
		y: this.height - 31,
		width: 60,
		height: 22,
		backColor: '#43d643',
		borderColor: '#78ff78',
		disabledTone: 0,
		hideSelect: true,
		fontSize: this.txtChild.bitmap.fontSize,
		onClick: (() => this.onConfirm()).bind(this)
	};
	this._confirmButton = new SButton_Confirm(data);
	this.addChild(this._confirmButton);
};

//========================================
// Icon Selector - Other

IconSelector.prototype.refreshBottomNote = function() {
	this.txtChild.bitmap.clearRect(15, 400, this.width, 40);
	if (this._iconList.isAnyItemSelected()) {
		var font = {
			size: this.txtChild.bitmap.fontSize,
			face: this.txtChild.bitmap.fontFace
		};
		var index = this._iconList._selectedIndexes[0];
		this._lastIndexSelected = index;
		var bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = index % 16 * pw;
		var sy = Math.floor(index / 16) * ph;
		var tw1 = SMO.AM.textWidthEx('Icon Selected: ', font, true) + 15;
		this.txtChild.bitmap.drawText('Icon Selected: ', 15, 400, this.width, 40);
		this.txtChild.bitmap.blt(bitmap, sx, sy, pw, ph, tw1, 404);
		this.txtChild.bitmap.drawText(' ('+index+')', tw1 + pw, 400, this.width, 40);
	} else {
		this._lastIndexSelected = -1;
		this.txtChild.bitmap.drawText('Icon Selected: None', 15, 400, this.width, 40);
	}
};

IconSelector.prototype.selectIcon = function(iconIndex) {
	if (typeof iconIndex !== 'number') {
		this._iconList.deselectAllItems();
		this.refreshBottomNote();
	} else {
		this._iconList.selectItem(iconIndex);
	}
};

IconSelector.prototype.onConfirm = function() {
	this.iconIndex = this._lastIndexSelected;
	this.close();
	if (this._editor && this._editor.onIconSelectorConfirmed) {
		this._editor.onIconSelectorConfirmed();
	}
};

IconSelector.prototype.open = function() {
	SWindow_Base.prototype.open.call(this);
	if (this.iconIndex !== -1) {
		this.iconIndex = -1;
		this.refreshBottomNote();
		this._iconList.redraw();
	}
};

IconSelector.prototype.close = function() {
	SWindow_Base.prototype.close.call(this);
	if (this._editor && this._editor.open) {
		this._editor.open();
	}
};

//==========================================================================================
// Color Selector - Create
//==========================================================================================
function ColorSelector() {
	this.initialize.apply(this, arguments);
}

ColorSelector.prototype = Object.create(SWindow_Base.prototype);
ColorSelector.prototype.constructor = ColorSelector;

Object.defineProperty(ColorSelector.prototype, 'hexColor', {
	configurable: true,
	get: function() {
		return this._hexColor;
	},
	set: function(value) {
		this.setColor(value);
	}
});

Object.defineProperty(ColorSelector.prototype, 'rgbaColor', {
	configurable: true,
	get: function() {
		return this._rgbaColor;
	},
	set: function(value) {
		this.setColor(value);
	}
});

//========================================
// Color Selector - Initialize

ColorSelector.prototype.initialize = function() {
	var data = {
		id: 'ColorSelector',
		title: 'Color Selector',
		titleBackground: '#1a1a1a',
		x: Math.floor((Graphics.width - 270)/2),
		y: Math.floor((Graphics.height - 264)/2),
		width: 270,
		height: 264,
		backColor: '#222222',
		hideSelect: true,
		fontSize: 16
	};
	SWindow_Base.prototype.initialize.call(this, data);
};

ColorSelector.prototype.initValues = function(data) {
	SWindow_Base.prototype.initValues.call(this, data);
	this._fixedTone = true;
	this._hexColor = '#ff0000';
	this._rgbaColor = 'rgba(255,0,0,1)';
	this._lastSelectorMoved = null;
	this.color = '';
};

ColorSelector.prototype.initTools = function() {
	SWindow_Base.prototype.initTools.call(this);
	this.initMainColor();
	this.initShadeSelector();
	this.initOpacitySelector();
	this.initHueSelector();
	this.initColorSamples();
	this.initWindowColorSamples();
	this.initRgbaInputs();
	this.initHexInput();
	this.initConfirmButton();
};

ColorSelector.prototype.initMainColor = function() {
	var data = {
		x: 20,
		y: 40,
		width: 103,
		height: 80,
		borderSize: 1,
		hideSelect: true,
		disabledTone: 0,
		useShadow: false
	};
	this._mainColor = new SButton_Confirm(data);
	this._mainColor._currentColor = this._hexColor;
	this._mainColor._currentOpacity = 100;
	this._mainColor._fixedTone = true;
	this._mainColor.drawBackground = function() {
		var c1 = '#555555';
		var c2 = '#bbbbbb';
		var c3 = c1;
		var x, y, w;
		for (var i = 0; i < 10; i++) {
			w = i === 9 || i === 0 ? 11 : 10;
			x = i ? 10 * i + 1 : 10 * i;
			c3 = c3 === c1 ? c2 : c1;
			for (var j = 0; j < 8; j++) {
				y = 10 * j;
				this.bitmap.fillRect(x, y, w, 10, c3);
				c3 = c3 === c1 ? c2 : c1;
			}
		}
	};
	this._mainColor.drawMyText = function () {
		var hexColor = this._currentColor;
		var opacity = this._currentOpacity / 100;
		var rgb = SMO.AM.hexToRgb(hexColor);
		var rgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`;
		if (this.parent) {
			this.parent._hexColor = hexColor;
			this.parent._rgbaColor = rgbaColor;
			this.parent._redInput.value = rgb[0];
			this.parent._greenInput.value = rgb[1];
			this.parent._blueInput.value = rgb[2];
			this.parent._hexInput.value = hexColor;
		}
		this.txtChild.bitmap.fillAll(rgbaColor);
	};
	this._mainColor.setOpacity = function(opacity) {
		if (this._currentOpacity !== opacity) {
			this._currentOpacity = opacity;
			this.parent._opacityInput.value = this._currentOpacity.toString();
			this.redrawMyText();
		};
	};
	this._mainColor.setColor = function(color) {
		if (this._currentColor !== color) {
			this._currentColor = color;
			this.redrawMyText();
		}
	};
	this._mainColor.redrawBackground();
	this._mainColor.redrawMyText();
	this.addChild(this._mainColor);
};

ColorSelector.prototype.initShadeSelector = function() {
	var data = {
		x: this.width - 123,
		y: 40,
		width: 103,
		height: 80,
		borderSize: 1,
		disabledTone: 0,
		hideSelect: true,
		useShadow: false,
		enableMethod: (() => !this._windowSamplesBase.visible).bind(this.parent)
	};
	var sData = {
		x: data.width - 11,
		y: -10,
		width: 20,
		height: 20,
		design: 'circle',
		backColor: '#ff0000',
		borderColor: '#cccccc',
		cursorStyle: 'pointer',
		hideSelect: true,
		enableMethod: (() => !this._windowSamplesBase.visible).bind(this.parent)
	};

	this._shadeSelector = new SButton_Confirm(data);
	this._shadeSelector._currentColor = this._hexColor;
	this._shadeSelector._fixedTone = true;
	this._shadeSelector.drawBackground = function() {
		var color = this.parent ? this.parent._hueSelector._currentColor : '#ff0000';
		var context = this.bitmap._context;
		var grad = context.createLinearGradient(0, 0, this.width, 0);
		context.save();
		grad.addColorStop(0.01, '#ffffff');
		grad.addColorStop(0.99, color);
		context.fillStyle = grad;
		context.fillRect(0, 0, this.width, this.height);

		grad = context.createLinearGradient(0, 0, 0, this.height);
		grad.addColorStop(0.01, 'rgba(0,0,0,0)');
		grad.addColorStop(0.99, '#000000');
		context.fillStyle = grad;
		context.fillRect(0, 0, this.width, this.height);
		context.restore();
		this.bitmap._setDirty();
	};
	//On select -> move scroller to the spot, redraw it's background and select it
	this._shadeSelector.onSelect = function() {
		SButton_Confirm.prototype.onSelect.call(this);
		if (!this.isEnabled()) return;
		var x = TouchInput.x + Sprite_Button.prototype.canvasToLocalX.call(this, 0);
		var y = TouchInput.y + Sprite_Button.prototype.canvasToLocalY.call(this, 0);
		this._scroller.x = Math.ceil(x - this._scroller.width/2);
		this._scroller.y = Math.ceil(y - this._scroller.height/2);
		this._scroller.onMouseHover();
		SceneManager._scene.selectButton(this._scroller);
	};
	this._shadeSelector.setColor = function(color, redrawAll) {
		this._currentColor = color;
		this.redrawBackground();
		this._scroller.refreshColor();
		if (redrawAll) {
			this.parent._mainColor.setColor(this._scroller.backColor);
			this.parent._opacitySelector.setColor(this._scroller.backColor);
		}
	};

	//Creating scroller
	this._shadeSelector._scroller = new Sprite_Grabbable(sData);
	var limitX1 = -sData.width/2;
	var limitX2 = data.width - 1 + limitX1;
	var limitY1 = -sData.height/2;
	var limitY2 = data.height - 1 + limitY1;
	this._shadeSelector._scroller.setDragLimits(limitX1, limitX2, limitY1, limitY2);
	this._shadeSelector._scroller._fixedTone = true;
	this._shadeSelector._scroller.onSelect = function() {
		if (!this.isEnabled() || !this.parent.isEnabled()) return;
		Sprite_Grabbable.prototype.onSelect.call(this);
		this.parent.parent.selectScroller(this);
	};
	this._shadeSelector._scroller.onMoved = function() {
		Sprite_Grabbable.prototype.onMoved.call(this);
		this.refreshColor();
		this.parent.parent._opacitySelector.setColor(this.backColor);
		this.parent.parent._mainColor.setColor(this.backColor);
	};
	this._shadeSelector._scroller.refreshColor = function() {
		var x = Math.ceil(this.x + this.width/2);
		var y = Math.ceil(this.y + this.height/2);
		var color = this.parent.bitmap.getPixel(x, y);
		this.backColor = color;
		this.parent._currentColor = color;
	};
	this._shadeSelector.addChild(this._shadeSelector._scroller);

	this._shadeSelector.redrawBackground();
	this.addChild(this._shadeSelector);
};

ColorSelector.prototype.initOpacitySelector = function() {
	var data = {
		x: 20,
		y: 135,
		width: 103,
		height: 14,
		borderSize: 1,
		disabledTone: 0
	};
	var sData = {
		x: data.width - 6,
		y: -3,
		width: 10,
		height: 20,
		cursorStyle: 'pointer',
		borderColor: '#cccccc',
		hideSelect: true,
		useShadow: false
	};

	this._opacitySelector = new SButton_Confirm(data);
	this._opacitySelector._currentOpacity = 100;
	this._opacitySelector._currentColor = this._hexColor;
	this._opacitySelector.drawBackground = function() {
		var c1 = '#555555';
		var c2 = '#bbbbbb';
		var c3 = c1;
		var x, y;
		for (var i = 0; i < 18; i++) {
			x = 6 * i + 1;
			this.bitmap.fillRect(x, 1, 6, 6, c3);
			c3 = c3 === c1 ? c2 : c1;
			this.bitmap.fillRect(x, 7, 6, 6, c3);
		}
	};
	this._opacitySelector.drawMyText = function () {
		var color = this._currentColor;
		this.txtChild.bitmap.gradientFillRect(0, 0, data.width, data.height, 'rgba(0,0,0,0)', color);
	};
	//On select -> move scroller to the spot, redraw it's background and select it
	this._opacitySelector.onSelect = function() {
		SButton_Confirm.prototype.onSelect.call(this);
		if (!this.isEnabled()) return;
		var x = TouchInput.x + Sprite_Button.prototype.canvasToLocalX.call(this, 0) - this._scroller.width/2;
		var xmax = this.width - this._scroller.width/2;
		this._scroller.x = x;
		this._scroller.onMouseHover();
		SceneManager._scene.selectButton(this._scroller);
	};
	//Method - setOpacity
	// Number: opacity -> a number between [0..1]
	this._opacitySelector.setOpacity = function(opacity, redrawMain) {
		var xmax = this.width - this._scroller.width/2 - 1;
		var x = xmax * opacity;
		this._scroller.x = x;
		this._currentOpacity = Math.ceil(x * 100 / xmax);
		if (redrawMain) {
			this.parent._mainColor._currentOpacity = this._currentOpacity;
			this.parent._mainColor.redrawMyText();
		}
	};
	this._opacitySelector.setColor = function(color) {
		if (this._currentColor !== color) {
			this._currentColor = color;
			this.redrawMyText();
		}
	};

	//Creating scroller
	this._opacitySelector._scroller = new Sprite_Grabbable(sData);
	var limitX1 = -sData.width/2;
	var limitX2 = data.width - 1 + limitX1;
	this._opacitySelector._scroller.setDragLimits(limitX1, limitX2, sData.y, sData.y);
	this._opacitySelector._scroller._fixedTone = true;
	this._opacitySelector._scroller.onSelect = function() {
		if (!this.isEnabled() || !this.parent.isEnabled()) return;
		Sprite_Grabbable.prototype.onSelect.call(this);
		this.parent.parent.selectScroller(this);
	};
	this._opacitySelector._scroller.onMoved = function() {
		Sprite_Grabbable.prototype.onMoved.call(this);
		var x = Math.ceil(this.x + this.width/2);
		var xmax = this.parent.width - 1;
		this.parent._currentOpacity = Math.round(x * 100 / xmax);
		this.parent.parent._mainColor.setOpacity(this.parent._currentOpacity);
	};
	this._opacitySelector._scroller.isXyFilled = function() {
		return true;
	};
	this._opacitySelector.addChild(this._opacitySelector._scroller);

	this._opacitySelector.redrawBackground();
	this._opacitySelector.redrawMyText();
	this._opacitySelector._fixedTone = true;
	this.addChild(this._opacitySelector);
};

ColorSelector.prototype.initHueSelector = function() {
	var i, x_limit1, x_limit2, interval = 15;
	var data = {
		x: this.width - 123,
		y: 135,
		width: 6*(255/interval) + 1,
		height: 14,
		borderSize: 0,
		disabledTone: 0
	};
	var sData = {
		x: data.width - 11,
		y: -3,
		width: 20,
		height: 20,
		design: 'circle',
		backColor: '#ff0000',
		borderColor: '#cccccc',
		cursorStyle: 'pointer',
		hideSelect: true
	};
	this._hueSelector = new SButton_Confirm(data);
	this._hueSelector._currentColor = this._hexColor;
	//For the background, an array of colors (hue)
	this._hueSelector.drawBackground = function() {
		var x = 0;
		var y = 0;
		var width = 1;
		var height = this.height;
		var r = 255;
		var g = 0;
		var b = 0;
		var context = this.bitmap._context;
		context.save();
		for (i = 0; i < (255 / interval); i++) {
			context.fillStyle = `rgb(${r}, ${g}, ${b})`;
			context.fillRect(x, y, width, height);
			g += interval;
			x++;
		}
		for (i = 0; i < (255 / interval); i++) {
			context.fillStyle = `rgb(${r}, ${g}, ${b})`;
			context.fillRect(x, y, width, height);
			r -= interval;
			x++;
		}
		for (i = 0; i < (255 / interval); i++) {
			context.fillStyle = `rgb(${r}, ${g}, ${b})`;
			context.fillRect(x, y, width, height);
			b += interval;
			x++;
		}
		for (i = 0; i < (255 / interval); i++) {
			context.fillStyle = `rgb(${r}, ${g}, ${b})`;
			context.fillRect(x, y, width, height);
			g -= interval;
			x++;
		}
		for (i = 0; i < (255 / interval); i++) {
			context.fillStyle = `rgb(${r}, ${g}, ${b})`;
			context.fillRect(x, y, width, height);
			r += interval;
			x++;
		}
		for (i = 0; i < (255 / interval); i++) {
			context.fillStyle = `rgb(${r}, ${g}, ${b})`;
			context.fillRect(x, y, width, height);
			b -= interval;
			x++;
		}
		context.fillStyle = `rgb(${r}, ${g}, ${b})`;
		context.fillRect(x, y, width, height);
		context.restore();
		this.bitmap._setDirty();
	};
	//On select -> move scroller to the spot, redraw it's background and select it
	this._hueSelector.onSelect = function() {
		SButton_Confirm.prototype.onSelect.call(this);
		if (!this.isEnabled()) return;
		var x = TouchInput.x + Sprite_Button.prototype.canvasToLocalX.call(this, 0);
		var y = TouchInput.y + Sprite_Button.prototype.canvasToLocalY.call(this, 0);
		this._scroller.x = Math.ceil(x - this._scroller.width/2);
		this._scroller.onMouseHover();
		SceneManager._scene.selectButton(this._scroller);
	};
	this._hueSelector.setColor = function(color, redrawAll) {
		if (this._currentColor === color) return;
		var rgb = SMO.AM.hexToRgb(color, true);
		var rrgb = this.roundRgb(rgb[0], rgb[1], rgb[2]);
		var hexColor = SMO.AM.rgbToHex(rrgb[0], rrgb[1], rrgb[2], true);
		var shader = this.parent._shadeSelector._scroller;
		var isKeepCurrentColor = this._currentColor === hexColor || (rrgb[0] === rrgb[1] && rrgb[1] === rrgb[2]);
		if (isKeepCurrentColor && shader.x === rrgb[4] && shader.y === rrgb[5]) return;
		if (!isKeepCurrentColor) {
			this._currentColor = hexColor;
			this._scroller.x = Math.ceil(rrgb[3] - this._scroller.width/2);
			this._scroller.backColor = hexColor;
		}
		shader.x = rrgb[4];
		shader.y = rrgb[5];
		this.parent._shadeSelector.setColor(hexColor, redrawAll);
	};
	//The hue selector is drawn in intervals of 15 colors (i.e. 0->15->30...255), that's why it's necessary to
	//round colors before selecting them (e.g. 8->0 and 9->15)
	//
	//returns an Array: [r, g, b, hx, sx, sy]
	// Where:
	// r, g, b -> tones of red, blue and green respectively, for the hueSelector's scroller
	// hx -> the X position for the hueSelector's scroller
	// sx, sy -> the X and Y positions respectively, for the shadeSelector's scroller
	this._hueSelector.roundRgb = function(r, g, b) {
		function roundColor(value) {
			var rest = value % 15;
			return rest ? value + 15 - rest : value;
		}
		var hr, hg, hb, hx, sx, sy;
		var shader = this.parent._shadeSelector._scroller;
		var offset =  shader.height / 2;
		//Get the maximun values on the X and Y axis
		var LX = shader._limitX.max - shader._limitX.min;
		var LY = shader._limitY.max - shader._limitY.min;
		//Round colors to get multiples of 15
		var rr = roundColor(r);
		var rg = roundColor(g);
		var rb = roundColor(b);
		//If all values are equal, the shader will surely be on the extreme left
		if (rr === rg && rg === rb) {
			hx = this._scroller.x + this._scroller.width/2;
			sx = -shader.width/2;
			sy = Math.round((1 - r/255) * LY - offset);
			return [rr, rg, rb, hx, sx, sy];
		}
		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);
		var med = r === max ? Math.max(g, b) : (g === max ? Math.max(r, b) : Math.max(r, g));
		//If two out of the three values are equal I can use the maximun and the minimun values
		//to calculate the shader's X and Y
		if (max === med || med === min) {
			hr = r < max ? 0 : 255;
			hg = g < max ? 0 : 255;
			hb = b < max ? 0 : 255;
			sy = Math.round((1 - max/255) * LY - offset);
			sx = Math.round((1 - min/(255*(1-(sy+offset)/LY))) * LX - offset);
		} else {
			//All three values are different, round them up to multiples of 15, but subtract the lowest value,
			//this will help finding the HUE closest to the real color
			hr = r === min ? 0 : roundColor(Math.ceil(255 * (r-min)/(max-min)));
			hg = g === min ? 0 : roundColor(Math.ceil(255 * (g-min)/(max-min)));
			hb = b === min ? 0 : roundColor(Math.ceil(255 * (b-min)/(max-min)));
			sy = Math.round((1 - max/255) * LY - offset);
			sx = Math.round((1 - min/(255*(1-(sy+offset)/LY))) * LX - offset);
		}
		r = hr;
		g = hg;
		b = hb;
		//Calculating the X index for the new color
		hx = r ? (g ? (r > g ? g/15 : 17-r/15 + g/15) :	(b ? (b > r ? 68+r/15 : 102-b/15) : 0)) :
			(g ? (b ? (g > b ? 34+b/15 : 68-g/15) : 34) : 68);
		return [r, g, b, hx, sx, sy];
	};

	//Creating scroller
	this._hueSelector._scroller = new Sprite_Grabbable(sData);
	x_limit1 = - sData.width/2;
	x_limit2 = data.width - 1 + x_limit1;
	this._hueSelector._scroller.setDragLimits(x_limit1, x_limit2, sData.y, sData.y);
	this._hueSelector._scroller._fixedTone = true;
	this._hueSelector._scroller.onSelect = function() {
		if (!this.isEnabled() || !this.parent.isEnabled()) return;
		Sprite_Grabbable.prototype.onSelect.call(this);
		this.parent.parent.selectScroller(this);
	};
	this._hueSelector._scroller.onMoved = function() {
		Sprite_Grabbable.prototype.onMoved.call(this);
		var x = Math.ceil(this.x + this.width/2);
		var color = this.parent.bitmap.getPixel(x, 0);
		if (this.backColor !== color) {
			this.backColor = color;
			this.parent._currentColor = color;
			this.parent.parent._shadeSelector.setColor(color, true);
		}
	};
	this._hueSelector.addChild(this._hueSelector._scroller);

	this._hueSelector.redrawBackground();
	this._hueSelector._fixedTone = true;
	this.addChild(this._hueSelector);
};


ColorSelector.prototype.initColorSamples = function() {
	var button;
	var data = {
		width: 15,
		height: 15,
		borderSize: 1,
		hideSelect: true,
		cursorStyle: 'pointer'
	};
	var colors = ['#ffffff', '#000000', '#7D7D7D', '#5A3C2D', '#EB1E23', '#69E619', '#00A0E6', '#0F0F82', '#FFF000', '#FF7D28', '#CD00CD', '#e62896'];

	this._colorSamples = new Sprite();
	this._colorSamples.x = 20;
	this._colorSamples.y = 160;
	for (var line, c = 0; c < colors.length; c++) {
		data.y =  c < 6 ? 0 : 20;
		data.backColor = colors[c];
		data.x = c < 6 ? (data.width + 5) * c : (data.width + 5) * (c - 6);
		button = new SButton_Confirm(data);
		button._fixedTone = true;
		button.onClickSuccess = function() {
			SButton_Confirm.prototype.onClickSuccess.call(this);
			this.parent.parent.setColor(this.backColor);
		};
		this._colorSamples.addChild(button);
	}
	this.addChild(this._colorSamples);
};

ColorSelector.prototype.initWindowColorSamples = function() {
	this._windowImage = ImageManager.loadSystem('Window');
	var data1 = {
		text: 'Windowskin',
		description: 'Choose a color from your main window skin',
		textAlign: 'center',
		x: this.width - 122,
		y: 160,
		width: 102,
		height: 35,
		borderSize: 1,
		backColor: '#222233',
		design: 'round-rect',
		fontSize: 16,
		enabled: false,
		enableMethod: this._windowImage.isReady.bind(this._windowImage),
		disabledTone: 0
	};
	var data2 = {
		x: -data1.x,
		y: 125 - data1.y,
		width: this.width,
		height: this.height - 125,
		fontSize: this.txtChild.bitmap.fontSize,
		backColor: '#1a1a1a',
		hideSelect: true
	};
	this._windowSamplesButton = new SButton_Confirm(data1);
	this._windowSamplesButton.onClickSuccess = function() {
		SButton_Confirm.prototype.onClickSuccess.call(this);
		this.parent._windowSamplesBase.visible = true;
		if (!this.parent._windowSamplesBase._samplesLoaded) {
			this.parent._windowSamplesBase.loadSamples();
		}
	};
	this._windowSamplesBase = new SButton_Confirm(data2);
	this._windowSamplesBase.visible = false;
	this._windowSamplesBase._samplesLoaded = false;
	this._windowSamplesBase._fixedTone = true;
	this._windowSamplesBase.onClick = function() {};
	this._windowSamplesBase.update = function() {
		SButton_Confirm.prototype.update.call(this);
		if (this.visible && (Input.isPressed('cancel') || TouchInput.isCancelled())) {
			this.visible = false;
		}
	};
	this._windowSamplesBase.loadSamples = function() {
		var px, py;
		var data = {
			width: 15,
			height: 15,
			borderSize: 1,
			hideSelect: true,
			cursorStyle: 'pointer'
		};
		var maxHeight = this.txtChild.bitmap.fontSize;
		this.txtChild.bitmap.drawText('SELECT A COLOR', 0, 10, this.width, maxHeight, 'center');
		for (var line, c = 0; c < 32; c++) {
			data.x = 58 + 20 * (c % 8);
			data.y = 35 + Math.floor(c / 8) * 20;
			px = 96 + (c % 8) * 12 + 6;
    		py = 144 + Math.floor(c / 8) * 12 + 6;
			data.backColor = this.parent.parent._windowImage.getPixel(px, py);
			button = new SButton_Confirm(data);
			button._fixedTone = true;
			button.onClickSuccess = function() {
				SButton_Confirm.prototype.onClickSuccess.call(this);
				this.parent.parent.parent.setColor(this.backColor);
				this.parent.visible = false;
			};
			this.addChild(button);
		}
		this._samplesLoaded = true;
	};
	this._windowSamplesButton.addChild(this._windowSamplesBase);
	this.addChild(this._windowSamplesButton);
};

ColorSelector.prototype.initRgbaInputs = function() {
	var match = this._rgbaColor.replace(/\s/g, '').match(/rgba\((.+),(.+),(.+),(.+)\)/i);
	var red = match[1];
	var green = match[2];
	var blue = match[3];
	var redTextColor = '#ff3535';
	var greenTextColor = '#45ff45';
	var blueTextColor = '#00d2ff';
	var data = {
		x: 13,
		y: 0,
		width: 36,
		height: 22,
		borderSize: 1,
		backColor: '#222233',
		borderColor: redTextColor,
		textColor: redTextColor,
		design: 'round-rect',
		minValue: 0,
		maxValue: 255,
		fontSize: 16,
		precisionArrows: false,
		filter: 'number',
		value: red
	};
	var width = this.width - 40;
	this._rgbaSprite = new Sprite(new Bitmap(width, 22));
	this._rgbaSprite.bitmap.fontSize = this.txtChild.bitmap.fontSize;
	this._rgbaSprite.x = 20;
	this._rgbaSprite.y = 203;
	//Red button
	this._rgbaSprite.bitmap.textColor = redTextColor;
	this._rgbaSprite.bitmap.drawText('R', 0, data.y, 8, data.height, 'center');
	this._redInput = new SButton_Text(data);
	this._redInput.onSelect = function() {
		SButton_Text.prototype.onSelect.call(this);
		this.parent.parent.selectScroller(null);
	};
	this._redInput.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		var r = this.value;
		var g = this.parent.parent._greenInput.value;
		var b = this.parent.parent._blueInput.value;
		var color = SMO.AM.rgbToHex(r, g, b, true);
		this.parent.parent.setColor(color);
	};
	this._redInput.onOkTriggered = function() {
		SceneManager._scene.selectButton(null); //Auto-deselect
	};
	//Blue button
	data.x += data.width + 25;
	data.value = green;
	data.borderColor = greenTextColor;
	data.textColor = greenTextColor;
	this._rgbaSprite.bitmap.textColor = greenTextColor;
	this._rgbaSprite.bitmap.drawText('G', data.x-13, data.y, 8, data.height, 'center');
	//Green button
	this._greenInput = new SButton_Text(data);
	this._greenInput.onSelect = function() {
		SButton_Text.prototype.onSelect.call(this);
		this.parent.parent.selectScroller(null);
	};
	this._greenInput.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		var r = this.parent.parent._redInput.value;
		var g = this.value;
		var b = this.parent.parent._blueInput.value;
		var color = SMO.AM.rgbToHex(r, g, b, true);
		this.parent.parent.setColor(color);
	};
	this._greenInput.onOkTriggered = function() {
		SceneManager._scene.selectButton(null); //Auto-deselect
	};
	data.x += data.width + 25;
	data.value = blue;
	data.borderColor = blueTextColor;
	data.textColor = blueTextColor;
	this._rgbaSprite.bitmap.textColor = blueTextColor;
	this._rgbaSprite.bitmap.drawText('B', data.x-13, data.y, 8, data.height, 'center');
	this._blueInput = new SButton_Text(data);
	this._blueInput.onSelect = function() {
		SButton_Text.prototype.onSelect.call(this);
		this.parent.parent.selectScroller(null);
	};
	this._blueInput.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		var r = this.parent.parent._redInput.value;
		var g = this.parent.parent._greenInput.value;
		var b = this.value;
		var color = SMO.AM.rgbToHex(r, g, b, true);
		this.parent.parent.setColor(color);
	};
	this._blueInput.onOkTriggered = function() {
		SceneManager._scene.selectButton(null); //Auto-deselect
	};
	//Opacity button
	data.borderColor = '#ffffff';
	data.textColor = '#ffffff';
	this._rgbaSprite.bitmap.textColor = '#ffffff';
	data.x = width - data.width;
	data.value = '100';
	data.maxValue = 100;
	this._rgbaSprite.bitmap.drawText('A', data.x-13, data.y, 8, data.height, 'center');
	this._opacityInput = new SButton_Text(data);
	this._opacityInput.onSelect = function() {
		SButton_Text.prototype.onSelect.call(this);
		this.parent.parent.selectScroller(null);
	};
	this._opacityInput.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent.parent._opacitySelector.setOpacity(this.value/100, true);
	};
	this._opacityInput.onOkTriggered = function() {
		SceneManager._scene.selectButton(null); //Auto-deselect
	};

	this._rgbaSprite.addChild(this._redInput, this._greenInput, this._blueInput, this._opacityInput);
	this.addChild(this._rgbaSprite);
};

ColorSelector.prototype.initHexInput = function() {
	var data = {
		x: 30,
		y: 0,
		width: 72,
		height: 22,
		borderSize: 1,
		backColor: '#222233',
		design: 'round-rect',
		maxDigits: 7,
		fontSize: 16,
		textOffset: [3, 0],
		value: this._hexColor
	};
	//Base sprite
	this._hexSprite = new Sprite(new Bitmap(data.width+30, data.height));
	this._hexSprite.x = 36;
	this._hexSprite.y = 232;
	this._hexSprite.bitmap.fontSize = this.fontSize;
	this._hexSprite.bitmap.drawText('HEX', 0, 0, 27, data.height, 'center');
	//Text input
	this._hexInput = new SButton_Text(data);
	this._hexInput._fixedTone = true;
	this._hexInput.onSelect = function() {
		SButton_Text.prototype.onSelect.call(this);
		this.parent.parent.selectScroller(null);
	};
	this._hexInput.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent.parent.setColor(this.value);
	};
	this._hexInput.formatValue = function() {
		if (!this.parent) return;
		var color = this.value;
		var format = SMO.AM.formatHexColor(color);
		if (color !== format) {
			this.value = format;
			this.redrawMyText();
		}
	};
	this._hexInput.onOkTriggered = function() {
		SceneManager._scene.selectButton(null); //Auto-deselect
	};

	this._hexSprite.addChild(this._hexInput);
	this.addChild(this._hexSprite);
};

ColorSelector.prototype.initConfirmButton = function() {
	var data = {
		text: 'OK',
		textAlign: 'center',
		x: this.width - 96,
		y: 232,
		width: 60,
		height: 22,
		backColor: '#43d643',
		borderColor: '#78ff78',
		disabledTone: 0,
		hideSelect: true,
		fontSize: this.txtChild.bitmap.fontSize,
		onClick: (() => this.onConfirm()).bind(this)
	};
	this._confirmButton = new SButton_Confirm(data);
	this.addChild(this._confirmButton);
};

//========================================
// Color Selector - Update

ColorSelector.prototype.update = function() {
	SWindow_Base.prototype.update.call(this);
	this.updateSelectorsTriggers();
};

ColorSelector.prototype.updateSelectorsTriggers = function() {
	if (!this._lastSelectorMoved) return;
	var sprite = this._lastSelectorMoved;
	if (Input.isQuickRepeated('up')) {
		if (sprite.y > sprite._limitY.min) {
			sprite.y--;
			sprite.onMoved();
		}
	} else if (Input.isQuickRepeated('right')) {
		if (sprite.x < sprite._limitX.max) {
			sprite.x++;
			sprite.onMoved();
		}
	} else if (Input.isQuickRepeated('down')) {
		if (sprite.y < sprite._limitY.max) {
			sprite.y++;
			sprite.onMoved();
		}
	} else if (Input.isQuickRepeated('left')) {
		if (sprite.x > sprite._limitX.min) {
			sprite.x--;
			sprite.onMoved();
		}
	} else if (Input.isQuickRepeated('pageup')) {
		if (Input.isPressed('shift')) {
			if (sprite.y > sprite._limitY.min) {
				sprite.y = Math.max(sprite.y - 10, sprite._limitY.min);
				sprite.onMoved();
			}
		} else {
			if (sprite.x < sprite._limitX.max) {
				sprite.x = Math.min(sprite.x + 10, sprite._limitX.max);
				sprite.onMoved();
			}
		}
	} else if (Input.isQuickRepeated('pagedown')) {
		if (Input.isPressed('shift')) {
			if (sprite.y < sprite._limitY.max) {
				sprite.y = Math.min(sprite.y + 10, sprite._limitY.max);
				sprite.onMoved();
			}
		} else {
			if (sprite.x > sprite._limitX.min) {
				sprite.x = Math.max(sprite.x - 10, sprite._limitX.min);
				sprite.onMoved();
			}
		}
	}
};

//========================================
// Color Selector - Others

//Method - selectScroller
// * Selects a scroller so that the user may move it using the arrow keys (see "updateSelectorsTriggers")
// Object: scroller -> A Sprite_Grabbable or null (if null, any selected sprite will be deselected)
ColorSelector.prototype.selectScroller = function(scroller) {
	if (scroller !== this._lastSelectorMoved) {
		if (this._lastSelectorMoved) {
			this._lastSelectorMoved.borderColor = '#cccccc';
		}
		this._lastSelectorMoved = scroller;
		if (scroller) {
			scroller.borderColor = '#ffffff';
		}
	}
};

//Method - setColor
// * Sets the main color for the window
// String: color -> an hexadecimal color in the format '#rrggbb'
ColorSelector.prototype.setColor = function(color) {
	var rgb, rgbaColor, hexColor, opacity;
	var rgba = String(color).replace(/\s/g, '').match(/rgba\((.+),(.+),(.+),(.+)\)/i);
	if (rgba) {
		opacity = Number(rgba[4]) || 0;
		opacity = opacity.clamp(0, 1);
		this._opacitySelector.setOpacity(opacity, true);

		rgb = SMO.AM.formatRgbColor(rgba[1], rgba[2], rgba[3]);
		rgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`;
		if (this._rgbaColor === rgbaColor) return;
		this._rgbaColor = rgbaColor;

		hexColor = SMO.AM.rgbToHex(rgb[0], rgb[1], rgb[2]);
	} else {
		if (this._currentOpacity !== 1) {
			this._opacitySelector.setOpacity(1, true);
		}
		hexColor = SMO.AM.formatHexColor(color);
		if (this._hexColor === color) return;
		this._hexColor = color;

		opacity = this._opacitySelector._currentOpacity/100;
		rgb = SMO.AM.hexToRgb(color);
		rgbaColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`;
		this._rgbaColor = rgbaColor;
	}
	this._hueSelector.setColor(hexColor);
	this._opacitySelector.setColor(hexColor);
	this._mainColor.setColor(hexColor);
};

ColorSelector.prototype.onConfirm = function() {
	if (this._opacitySelector._currentOpacity !== 100) {
		this.color = this.rgbaColor;
	} else {
		this.color = this.hexColor;
	}
	this.close();
	if (this._editor && this._editor.onColorSelectorConfirmed) {
		this._editor.onColorSelectorConfirmed();
	}
};

ColorSelector.prototype.open = function() {
	SWindow_Base.prototype.open.call(this);
	this.color = '';
};

ColorSelector.prototype.close = function() {
	if (this._windowSamplesBase.visible) {
		return this._windowSamplesBase.visible = false;
	}
	SWindow_Base.prototype.close.call(this);
	if (this._editor && this._editor.open) {
		this._editor.open();
	}
};

//==========================================================================================
// Achievement Editor - Create
//==========================================================================================
function Editor_Achievement() {
	this.initialize.apply(this, arguments);
}

Editor_Achievement.prototype = Object.create(SWindow_Base.prototype);
Editor_Achievement.prototype.constructor = Editor_Achievement;

//========================================
// Achievement Editor - Initialize

Editor_Achievement.prototype.initialize = function() {
	var data = {
		title: 'Achievement Editor',
		titleBackground: '#1a1a1a',
		x: Math.ceil((Graphics.width - 605)/2),
		y: Math.ceil((Graphics.height - 562)/2),
		width: 605,
		height: 562,
		backColor: '#222222',
		hideSelect: true,
		fontSize: 16
	};
	SWindow_Base.prototype.initialize.call(this, data);
	this.refreshAchievsList();
};

Editor_Achievement.prototype.initValues = function(data) {
	SWindow_Base.prototype.initValues.call(this, data);
	this._categories = $dataAchievsCategories.map(a => a.name);
	this._currentMenu = 'main';
	this._mainLoaded = false;
	this._reqLoaded = false;
	this._rewLoaded = false;
	this._fixedTone = true;
	this._isSelectorOpen = false;
	this._achievement = null;
	this._skipAction = false;
	this._deletions = 0;
};

Editor_Achievement.prototype.initTools = function(data) {
	SWindow_Base.prototype.initTools.call(this);
	this.initTopMenu();
	this.initLeftMenu();
	this.initRightMenu();
	this.initMoreOptions();
	this.initReqRewMenu();
	this.initConfirmMenu();
};

Editor_Achievement.prototype.initTopMenu = function() {
	this._topMenu = new Sprite();
	this._topMenu.x = 154;
	this._topMenu.y = 25;
	this.addChild(this._topMenu);

	var saveData = {
		text: '💾 SAVE  ',
		textAlign: 'center',
		description: 'Save all your changes in "/data/AchievsEditor.json"',
		x: 0,
		y: 0,
		width: 148,
		height: 18,
		fontSize: 14,
		backColor: '#55ff55',
		borderColor: '#99ff99',
		design: 'round-rect',
		hideSelect: true,
		enabled: false,
		onClick: this.saveData.bind(this)
	};
	this._saveButton = new SButton_Confirm(saveData);
	this._saveButton._saveMsgDelay = 0;
	this._saveButton.update = function() {
		SButton_Confirm.prototype.update.call(this);
		if (this._saveMsgDelay > 0) {
			if (--this._saveMsgDelay < 1) {
				this.text = '💾 SAVE  ';
			}
		}
	};
	this._topMenu.addChild(this._saveButton);

	var seeChangesData = {
		text: '📒 See Changes  ',
		textAlign: 'center',
		description: 'See all the changes you made since the last time you saved',
		x: 150,
		y: 0,
		width: 148,
		height: 18,
		fontSize: 14,
		backColor: '#111111',
		design: 'round-rect',
		enabled: false,
		hideSelect: true

	};
	this._seeChangesButton = new SButton_Confirm(seeChangesData);
	this._seeChangesButton.onClickSuccess = function() {
		SButton_Confirm.prototype.onClickSuccess.call(this);
		this.parent.parent._confirmMenu.showChanges();
		this.parent.parent._cmConfirmButton.onClickSuccess = function() {
			SButton_Confirm.prototype.onClickSuccess.call(this);
			this.parent.visible = false;
		};
	};
	this._topMenu.addChild(this._seeChangesButton);

	var settingsData = {
		text: '⚙️ Settings  ',
		textAlign: 'center',
		description: "See the editor's settings (coming soon)",
		x: this.width - 306,
		y: 0,
		width: 148,
		height: 18,
		fontSize: 14,
		backColor: '#111111',
		design: 'round-rect',
		hideSelect: true,
		enabled: false
	};
	this._settingsButton = new SButton_Confirm(settingsData);
	this._topMenu.addChild(this._settingsButton);
};

Editor_Achievement.prototype.initLeftMenu = function() {
	var sortData = {
		value: ['ID'],
		description: 'Sort your achievements',
		x: 2,
		y: 44,
		width: 150,
		height: 22,
		backColor: '#000000',
		options: ['ID', 'A-z', 'Category', 'Visibility'],
		itemColors: ['#000000', '#000000'],
		fontSize: 16,
		borderSize: 1,
		textOffset: [3, 0],
		hideSelect: true,
		disabledTone: 0
	};
	this._sortAchievButton = new SButton_Select(sortData);
	this._sortAchievButton.onOptionChange = function(values, indexes) {
		SButton_Select.prototype.onOptionChange.call(this, values, indexes);
		if (!values[0] && !this.isEmpty()) {
			if (!this.isEmpty()) {
				this.selectItem(0, false);
			}
			return;
		}
		this.parent.refreshAchievsList();
	};
	this.addChild(this._sortAchievButton);

	var newData = {
		text: 'NEW',
		textAlign: 'center',
		description: 'Create a new achievement',
		x: 2,
		y: 66,
		width: 150,
		height: 22,
		backColor: '#004400',
		fontSize: 16,
		borderSize: 1,
		hideSelect: true,
		disabledTone: 0,
		onClick: this.newAchievement.bind(this)
	};
	this._newAchievButton = new SButton_Confirm(newData);
	this.addChild(this._newAchievButton);

	var listData = {
		x: 2,
		y: 88,
		width: 150,
		height: this.height-90,
		itemHeight: 25,
		backColor: '#000000',
		itemColors: ['#3e3e3e', '#555555'],
		fontSize: 16,
		borderSize: 1,
		hideSelect: true,
		disabledTone: 0
	};
	this._achievsList = new Sprite_ItemList(listData, 1);
	this._achievsList.onCancelled = function() {};
	this._achievsList.isSelected = function() {
		var sceneBusy = SceneManager._scene.isSelecting() || SceneManager._scene.isTextInputSelected();
		var parentBusy = this.parent.isAnimating() || this.parent._confirmMenu.visible;
		return !sceneBusy && !parentBusy && this.parent.visible;
	};
	this._achievsList.onItemSelected = function(index) {
		Sprite_ItemList.prototype.onItemSelected.call(this, index);
		this.parent.currentMenu().visible = true;
		this.parent._mainLoaded = false;
		this.parent._reqLoaded = false;
		this.parent._rewLoaded = false;
		this.parent.redrawAchievementInfo(this._items[index].text);
		if (this.parent._moreOptBase.visible) {
			this.parent._rightMenuBase.visible = false;
		}
	};
	this._achievsList.onItemDeselected = function(indexes) {
		if (!this.isAnyItemSelected()) {
			this.parent.currentMenu().visible = false;
		}
	};
	this._achievsList.selectItemAbove = function(ctrl, shift, preventLoop) {
		if (this.parent._reqRewList.isAnyItemSelected()) {
			if (!this.parent._reqRewList.isSelected()) {
				this.parent._reqRewList.selectItemAbove(ctrl, shift);
			}
			return;
		}
		Sprite_ItemList.prototype.selectItemAbove.call(this, ctrl, shift);
		var itemName = this.getSelectedItemsTexts()[0];
		if (itemName.charCodeAt(0) === 13 && !preventLoop) {
			return this.selectItemAbove(ctrl, shift, true);
		}
	};
	this._achievsList.selectNextItem = function(ctrl, shift, preventLoop) {
		if (this.parent._reqRewList.isAnyItemSelected()) {
			if (!this.parent._reqRewList.isSelected()) {
				this.parent._reqRewList.selectNextItem(ctrl, shift);
			}
			return;
		}
		Sprite_ItemList.prototype.selectNextItem.call(this, ctrl, shift);
		var itemName = this.getSelectedItemsTexts()[0];
		if (itemName.charCodeAt(0) === 13 && !preventLoop) {
			return this.selectNextItem(ctrl, shift, true);
		}
	};
	this._achievsList.selectItemBeneath = function(ctrl, shift, preventLoop) {
		if (this.parent._reqRewList.isAnyItemSelected()) {
			if (!this.parent._reqRewList.isSelected()) {
				this.parent._reqRewList.selectItemBeneath(ctrl, shift);
			}
			return;
		}
		Sprite_ItemList.prototype.selectItemBeneath.call(this, ctrl, shift);
		var itemName = this.getSelectedItemsTexts()[0];
		if (itemName.charCodeAt(0) === 13 && !preventLoop) {
			return this.selectItemBeneath(ctrl, shift, true);
		}
	};
	this._achievsList.selectPreviousItem = function(ctrl, shift, preventLoop) {
		if (this.parent._reqRewList.isAnyItemSelected()) {
			if (!this.parent._reqRewList.isSelected()) {
				this.parent._reqRewList.selectPreviousItem(ctrl, shift);
			}
			return;
		}
		Sprite_ItemList.prototype.selectPreviousItem.call(this, ctrl, shift);
		var itemName = this.getSelectedItemsTexts()[0];
		if (itemName.charCodeAt(0) === 13 && !preventLoop) {
			return this.selectPreviousItem(ctrl, shift, true);
		}
	};
	this.addChild(this._achievsList);
};

Editor_Achievement.prototype.initRightMenu = function() {
	this._rightMenuBase = new Sprite(new Bitmap(this.width - 155, this.height - 44));
	this._rightMenuBase.bitmap.fontSize = 12;
	this._rightMenuBase.x = 155;
	this._rightMenuBase.y = 44;
	var fontSize = this.txtChild.bitmap.fontSize-1;
	var drawText = this._rightMenuBase.bitmap.drawText.bind(this._rightMenuBase.bitmap);
	var drawLine = (function(y) {
						this.fillRect(20, y, this.width-40, 1, '#111111');
					}).bind(this._rightMenuBase.bitmap);
	this.drawMainBackground();
	var x1 = 17;
	var x2 = 233;

	//>>>>> MAIN -> Drawing the NAME, CATEGORY, VISIBILITY and DESCRIPTION buttons <<<<
	drawText('NAME', x1, 10, 26, 15);
	var nameData = {
		description: 'Change the name of your achievement (maximun of 30 chars)',
		x: x1,
		y: 25,
		width: 195,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		maxDigits: 30,
		textOffset: [0, -2]
	};
	this._nameInput = new SButton_Text(nameData);
	this._nameInput.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent.parent.changeAchievNameTo(this.value);
	};
	this._nameInput.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this._rightMenuBase.addChild(this._nameInput);

	drawText('CATEGORY', x2, 10, 50, 15);
 var catDesc = 'Click on a category to select/deselect it;                        \n';
	catDesc += 'Click outside of the list or press ENTER to confirm the selection;\n';
	catDesc += 'Click with RMB or press ESC to cancel the selection;              \n';
	catDesc += 'You cannot deselect a "Global Category";                          ';
	var catData = {
		description: catDesc,
		x: x2,
		y: 25,
		width: 195,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		maxSelection: 99,
		textOffset: [2, 0],
		options: this._categories,
		enabled: $dataAchievsCategories.length > 1
	};
	this._categorySelect = new SButton_Select(catData);
	this._categorySelect.onOptionChange = function(values, indexes) {
		SButton_Select.prototype.onOptionChange.call(this, values, indexes);
		var editor = this.parent.parent;
		if (this._skipExtraChanges) return;
		if (SMO.AM.globalCategoryName) {
			values.delete(SMO.AM.globalCategoryName);
			values.push(SMO.AM.globalCategoryName);
		}
		var oldValue = editor._achievement.categories.clone();
		oldValue.sort();
		oldValue = oldValue.join(',');
		editor._achievement.categories = values;
		editor._achievement.category = values[0] || '';
		var newValue = editor._achievement.categories.clone();
		newValue.sort();
		newValue = newValue.join(',');
		if (oldValue !== newValue) {
			var action = {
				id: editor._achievement.id,
				type: 'CATEGORY',
				old: oldValue,
				new: newValue
			};
			editor.addAction(action);
		}
		if (SMO.AM.globalCategoryName) {
			var index = this._options.getIndexByString(SMO.AM.globalCategoryName);
			if (!this.selectedIndexes().contains(index)) {
				this._skipRedraw = true;
				this.selectItem(index, true);
				this._skipRedraw = false;
				this.redrawMyText();
			}
		}
		if (editor._sortAchievButton.currentValue() === 'Category') {
			let selected = editor._achievsList.getSelectedItemsTexts()[0];
			editor.refreshAchievsList();
			let index = editor._achievsList.getIndexByString(selected);
			editor._achievsList.selectItem(index, false, false);
		}
	};
	this._categorySelect.currentValue = function() {
		var values = this._data.value;
		if (values[0] === SMO.AM.globalCategoryName && values.length > 1) return values[1];
		return values[0];
	};
	this._categorySelect._options.onSelect = function(touch) {
		Sprite_ItemList.prototype.onSelect.call(this, touch);
	};
	this._categorySelect._options.onReselect = function(touch) {
		Sprite_ItemList.prototype.onReselect.call(this, touch);
	};
	this._categorySelect._options.selectItem = function(index, ctrl, touch) {
		Sprite_ItemList.prototype.selectItem.call(this, index, true, touch);
	};
	this._rightMenuBase.addChild(this._categorySelect);

	drawText('VISIBILITY', x1, 55, 62, 15);
	var visDesc = "ALWAYS VISIBLE: It'll always be visible to the user, showing normal images and icons;            \n";
	visDesc += "SECRET: While locked, secret icons and images will be shown instead of the normal ones;          \n";
	visDesc += "HIDDEN: It'll only be visible to the user when unlocked, it still counts to the total completion;";
	var visData = {
		value: ['Always Visible'],
		description: visDesc,
		x: x1,
		y: 70,
		width: 195,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		textOffset: [2, 0],
		options: ['Always Visible', 'Secret', 'Hidden']
	};
	this._visibilitySelect = new SButton_Select(visData);
	this._visibilitySelect.onOptionChange = function(values, indexes) {
		SButton_Select.prototype.onOptionChange.call(this, values, indexes);
		// If there's no value selected, select the first item on the list
		if (!values[0] && !this.isEmpty()) {
			if (!this.isEmpty()) {
				this.selectItem(0, false);
			}
			return;
		}
		// Change visibility
		var editor = this.parent.parent;
		var oldValue = editor._achievement.visibility;
		editor._achievement.visibility = values[0] === 'Always Visible' ? 'visible' : values[0].toLowerCase();
		var newValue = editor._achievement.visibility;
		if (!editor._achievement.isUnlocked()) {
			if (editor._achievement.visibility === 'secret') {
				editor._achievement.turnSecret();
			} else if (editor._achievement.visibility === 'hidden') {
				editor._achievement.turnHidden();
			} else {
				editor._achievement.reveal();
			}
		}
		// Adding action to "See Changes"
		if (oldValue !== newValue) {
			let vis1 = ['Always Visible', 'Secret', 'Hidden'];
			let vis2 = ['visible', 'secret', 'hidden'];
			oldValue = vis1[vis2.indexOf(oldValue)];
			newValue = vis1[vis2.indexOf(newValue)];
			var action = {
				id: editor._achievement.id,
				type: 'VISIBILITY',
				old: oldValue,
				new: newValue
			};
			editor.addAction(action);
		}
		// Refresh achievs list if the sort button is set to "Visibility"
		if (editor._sortAchievButton.currentValue() === 'Visibility') {
			let selected = editor._achievsList.getSelectedItemsTexts()[0];
			editor.refreshAchievsList();
			let index = editor._achievsList.getIndexByString(selected);
			editor._achievsList.selectItem(index, false, false);
		}
		editor.refreshAchievementsWindow();
	};
	this._rightMenuBase.addChild(this._visibilitySelect);

	drawText('LOCK/UNLOCK', x2, 55, 120, 15);
	var lockButtonData = {
		text: 'Lock',
		textAlign: 'center',
		description: 'Lock or Unlock this achievement',
		x: x2,
		y: 70,
		width: 87,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		onClick: (() => this.lockSwitch()).bind(this)
	};
	this._lockButton = new SButton_Confirm(lockButtonData);
	this._rightMenuBase.addChild(this._lockButton);

	var moreButtonData = {
		text: 'MORE',
		textAlign: 'center',
		description: "Shows more options",
		x: x2 + 107,
		y: 70,
		width: 87,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		onClick: (() => this.switchMoreOptions()).bind(this)
	};
	this._moreButton = new SButton_Confirm(moreButtonData);
	this._rightMenuBase.addChild(this._moreButton);

	drawText('DESCRIPTION', x1, 100, 68, 15);
	var descData = {
		description: "Change your achievement's description (maximun of 200 chars)",
		x: x1,
		y: 115,
		width: 410,
		height: 56,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		maxLines: 3,
		design: 'round-rect',
		maxDigits: 200
	};
	this._descriptionInput = new SButton_Text(descData);
	this._descriptionInput.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		var editor = this.parent.parent;
		var oldValue = editor._achievement._description;
		editor._achievement.description = this.value;
		var newValue = editor._achievement._description;
		if (oldValue !== newValue) {
			var action = {
				id: editor._achievement.id,
				type: 'DESCRIPTION',
				old: oldValue,
				new: newValue
			};
			editor.addAction(action);
		}
		editor.redrawAchievOnWindow();
	};
	this._descriptionInput.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this._rightMenuBase.addChild(this._descriptionInput);

	//>>>>> IMAGES -> Drawing the BACKGROUND and POP UP buttons <<<<
	drawText('BACKGROUND', x1, 191, 62, 15);
	var backgroundData = {
		description: "Choose an image (png) as this achievement's background",
		textAlign: 'center',
		x: x1,
		y: 206,
		width: 195,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		onClick: (() => this.startImageSelector(this._backgroundButton)).bind(this)
	};
	this._backgroundButton = new SButton_Confirm(backgroundData);
	this._backgroundButton.onImageSelected = function(imageName) {
		var editor = this.parent.parent;
		var oldValue = this.text;
		this.text = imageName;
		imageName = imageName === '<none>' ? '' : imageName;
		if (editor._achievement.backgroundImage === imageName) return;
		editor._achievement.backgroundImage = imageName;
		var newValue = this.text;
		if (oldValue !== newValue) {
			var action = {
				id: editor._achievement.id,
				type: 'BACKGROUND',
				old: oldValue,
				new: newValue
			};
			editor.addAction(action);
		}
		editor.redrawAchievOnWindow();
	};
	this._rightMenuBase.addChild(this._backgroundButton);

	drawText('POP UP', x2, 191, 38, 15);
	var backgroundData = {
		description: "Choose an image (png) to be shown on the pop up when this achievement is unlocked",
		textAlign: 'center',
		x: x2,
		y: 206,
		width: 195,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		onClick: (() => this.startImageSelector(this._popUpButton)).bind(this)
	};
	this._popUpButton = new SButton_Confirm(backgroundData);
	this._popUpButton.onImageSelected = function(imageName) {
		var editor = this.parent.parent;
		var oldValue = this.text;
		this.text = imageName;
		editor._achievement.popUpImage = imageName !== '<none>' ? imageName : '';
		var newValue = this.text;
		if (oldValue !== newValue) {
			var action = {
				id: editor._achievement.id,
				type: 'POP UP',
				old: oldValue,
				new: newValue
			};
			editor.addAction(action);
		}
	};
	this._rightMenuBase.addChild(this._popUpButton);

	//>>>>> ICONS -> Drawing LOCKED, UNLOCKED and SECRET <<<<
	//Each one may be switched between "Choose Icon", "No Icon", "Default", so there are 9 buttons
	this._iconButtons = [[], [], [], []];
	drawText('ICON - LOCKED', x1, 246, 78, 15);
	var iconIdData = {
		x: x1,
		y: 261,
		width: 104,
		height: 38,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		textOffset: [36, 0],
		hideSelect: true,
		onClick: (() => this.startIconSelector(0, this._iconButtons[0][0].text)).bind(this)
	};
	this._iconButtons[0][0] = new SButton_Confirm(iconIdData);
	this._iconButtons[0][0].onIconSelected = function(iconIndex) {
		var editor = this.parent.parent;
		this.text = String(iconIndex);
		editor._achievement.icon.locked = iconIndex;
		editor.redrawAchievOnWindow();
	};
	this._iconButtons[0][0].drawMyText = function() {
		SButton_Confirm.prototype.drawMyText.call(this);
		if (this.text) {
			var iconIndex = Number(this.text);
			var bitmap = ImageManager.loadSystem('IconSet');
			var pw = Window_Base._iconWidth;
			var ph = Window_Base._iconHeight;
			var sx = iconIndex % 16 * pw;
			var sy = Math.floor(iconIndex / 16) * ph;
			this.txtChild.bitmap.blt(bitmap, sx, sy, pw, ph, 3, 3);
		}
	};
	this._rightMenuBase.addChild(this._iconButtons[0][0]);

	var iconNoIconData = {
		text: 'No Icon',
		textAlign: 'center',
		x: iconIdData.x + iconIdData.width + 19,
		y: iconIdData.y,
		width: iconIdData.width,
		height: 38,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		hideSelect: true,
		onClick: (() => this.selectIconButton(0, 1)).bind(this)
	};
	this._iconButtons[0][1] = new SButton_Confirm(iconNoIconData);
	this._rightMenuBase.addChild(this._iconButtons[0][1]);

	var iconDefaultData = {
		x: iconNoIconData.x + iconNoIconData.width + 19,
		y: iconNoIconData.y,
		width: iconNoIconData.width + 60,
		height: 38,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		hideSelect: true,
		onClick: (() => this.selectIconButton(0, 2)).bind(this)
	};
	this._iconButtons[0][2] = new SButton_Confirm(iconDefaultData);
	this._iconButtons[0][2].drawMyText = function() {
		var isIcon = SMO.AM.Icons.locked > -1;
		if (isIcon) {
			this._data.text = SMO.AM.Icons.locked.toString() + ' (Default)';
			this._data.textAlign = 'left';
			this._data.textOffset = [36, 0];
			var iconIndex = SMO.AM.Icons.locked;
			var bitmap = ImageManager.loadSystem('IconSet');
			var pw = Window_Base._iconWidth;
			var ph = Window_Base._iconHeight;
			var sx = iconIndex % 16 * pw;
			var sy = Math.floor(iconIndex / 16) * ph;
			this.txtChild.bitmap.blt(bitmap, sx, sy, pw, ph, 3, 3);
		} else {
			this._data.text = 'No Icon (Default)';
			this._data.textAlign = 'center';
			this._data.textOffset = [0, 0];
		}
		SButton_Confirm.prototype.drawMyText.call(this);
	};
	this._iconButtons[0][2].redrawMyText();
	this._rightMenuBase.addChild(this._iconButtons[0][2]);
	drawLine(304)

	drawText('ICON - UNLOCKED', x1, 309, 90, 15);
	iconIdData.y = 324;
	iconIdData.onClick = (() => this.startIconSelector(1, this._iconButtons[1][0].text)).bind(this);
	this._iconButtons[1][0] = new SButton_Confirm(iconIdData);
	this._iconButtons[1][0].onIconSelected = function(iconIndex) {
		var editor = this.parent.parent;
		this.text = String(iconIndex);
		editor._achievement.icon.unlocked = iconIndex;
		editor.redrawAchievOnWindow();
	};
	this._iconButtons[1][0].drawMyText = function() {
		SButton_Confirm.prototype.drawMyText.call(this);
		if (this.text) {
			var iconIndex = Number(this.text);
			var bitmap = ImageManager.loadSystem('IconSet');
			var pw = Window_Base._iconWidth;
			var ph = Window_Base._iconHeight;
			var sx = iconIndex % 16 * pw;
			var sy = Math.floor(iconIndex / 16) * ph;
			this.txtChild.bitmap.blt(bitmap, sx, sy, pw, ph, 3, 3);
		}
	};
	this._rightMenuBase.addChild(this._iconButtons[1][0]);

	iconNoIconData.y = 324;
	iconNoIconData.onClick = (() => this.selectIconButton(1, 1)).bind(this);
	this._iconButtons[1][1] = new SButton_Confirm(iconNoIconData);
	this._rightMenuBase.addChild(this._iconButtons[1][1]);

	iconDefaultData.y = 324;
	iconDefaultData.onClick = (() => this.selectIconButton(1, 2)).bind(this);
	this._iconButtons[1][2] = new SButton_Confirm(iconDefaultData);
	this._iconButtons[1][2].drawMyText = function() {
		var isIcon = SMO.AM.Icons.unlocked > -1;
		if (isIcon) {
			this._data.text = SMO.AM.Icons.unlocked.toString() + ' (Default)';
			this._data.textAlign = 'left';
			this._data.textOffset = [36, 0];
			var iconIndex = SMO.AM.Icons.unlocked;
			var bitmap = ImageManager.loadSystem('IconSet');
			var pw = Window_Base._iconWidth;
			var ph = Window_Base._iconHeight;
			var sx = iconIndex % 16 * pw;
			var sy = Math.floor(iconIndex / 16) * ph;
			this.txtChild.bitmap.blt(bitmap, sx, sy, pw, ph, 3, 3);
		} else {
			this._data.text = 'No Icon (Default)';
			this._data.textAlign = 'center';
			this._data.textOffset = [0, 0];
		}
		SButton_Confirm.prototype.drawMyText.call(this);
	};
	this._iconButtons[1][2].redrawMyText();
	this._rightMenuBase.addChild(this._iconButtons[1][2]);
	drawLine(367)

	drawText('ICON - SECRET', x1, 372, 78, 15);
	iconIdData.y = 387;
	iconIdData.onClick = (() => this.startIconSelector(2, this._iconButtons[2][0].text)).bind(this);
	this._iconButtons[2][0] = new SButton_Confirm(iconIdData);
	this._iconButtons[2][0].onIconSelected = function(iconIndex) {
		var editor = this.parent.parent;
		this.text = String(iconIndex);
		editor._achievement.icon.secret = iconIndex;
		editor.redrawAchievOnWindow();
	};
	this._iconButtons[2][0].drawMyText = function() {
		SButton_Confirm.prototype.drawMyText.call(this);
		if (this.text) {
			var iconIndex = Number(this.text);
			var bitmap = ImageManager.loadSystem('IconSet');
			var pw = Window_Base._iconWidth;
			var ph = Window_Base._iconHeight;
			var sx = iconIndex % 16 * pw;
			var sy = Math.floor(iconIndex / 16) * ph;
			this.txtChild.bitmap.blt(bitmap, sx, sy, pw, ph, 3, 3);
		}
	};
	this._rightMenuBase.addChild(this._iconButtons[2][0]);

	iconNoIconData.y = 387;
	iconNoIconData.onClick = (() => this.selectIconButton(2, 1)).bind(this);
	this._iconButtons[2][1] = new SButton_Confirm(iconNoIconData);
	this._rightMenuBase.addChild(this._iconButtons[2][1]);

	iconDefaultData.y = 387;
	iconDefaultData.onClick = (() => this.selectIconButton(2, 2)).bind(this);
	this._iconButtons[2][2] = new SButton_Confirm(iconDefaultData);
	this._iconButtons[2][2].drawMyText = function() {
		var isIcon = SMO.AM.Icons.secret > -1;
		if (isIcon) {
			this._data.text = SMO.AM.Icons.secret.toString() + ' (Default)';
			this._data.textAlign = 'left';
			this._data.textOffset = [36, 0];
			var iconIndex = SMO.AM.Icons.secret;
			var bitmap = ImageManager.loadSystem('IconSet');
			var pw = Window_Base._iconWidth;
			var ph = Window_Base._iconHeight;
			var sx = iconIndex % 16 * pw;
			var sy = Math.floor(iconIndex / 16) * ph;
			this.txtChild.bitmap.blt(bitmap, sx, sy, pw, ph, 3, 3);
		} else {
			this._data.text = 'No Icon (Default)';
			this._data.textAlign = 'center';
			this._data.textOffset = [0, 0];
		}
		SButton_Confirm.prototype.drawMyText.call(this);
	};
	this._iconButtons[2][2].redrawMyText();
	this._rightMenuBase.addChild(this._iconButtons[2][2]);

	var editReqAndRewData = {
		text: 'Requirements',
		textAlign: 'center',
		x: x1,
		y: 445,
		width: 195,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		onClick: (() => this._reqRewBase.show('requirements')).bind(this)
	};
	this._editReqButton = new SButton_Confirm(editReqAndRewData);
	this._rightMenuBase.addChild(this._editReqButton);

	editReqAndRewData.text = 'Rewards';
	editReqAndRewData.x = x2;
	editReqAndRewData.onClick = (() => this._reqRewBase.show('rewards')).bind(this)
	this._editRewButton = new SButton_Confirm(editReqAndRewData);
	this._rightMenuBase.addChild(this._editRewButton);

	//>>>>> DELETE -> Drawing the DELETE button at the bottom of the editor <<<<
	var deleteData = {
		description: 'Delete this achievement, reducing the IDs of the next ones [DEL]',
		text: 'DELETE ACHIEVEMENT',
		textAlign: 'center',
		x: 123,
		y: 485,
		width: 200,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#aa0000',
		design: 'round-rect',
		onClick: this.confirmBeforeDeleting.bind(this)
	};
	this._deleteButton = new SButton_Confirm(deleteData);
	this._rightMenuBase.addChild(this._deleteButton);

	this._rightMenuBase.visible = false;
	this.addChild(this._rightMenuBase);
};

Editor_Achievement.prototype.initMoreOptions = function() {
	this._moreOptBase = new Sprite(new Bitmap(this._rightMenuBase.width, this._rightMenuBase.height));
	this._moreOptBase.visible = false;
	this._moreOptBase.bitmap.fontSize = 12;
	this._moreOptBase.x = 155;
	this._moreOptBase.y = 44;
	var maxWidth = this._rightMenuBase.width-26;
	this._moreOptBase.bitmap.drawRoundedRect(10, 5, maxWidth, 172, 10, '#3b3b3b');
	this._moreOptBase.bitmap.drawText('SHOWING MORE OPTIONS', 17, 5, maxWidth, 15, 'center');
	//Hiding the background text "< Select or create..."
	var tx = this._rightMenuBase.x;
	var ty = Math.floor(this._rightMenuBase.height/2 - 10);
	this._moreOptBase.bitmap.fillRect(tx, ty, this.width - tx - 160, 20, '#222222');

	var goBackButtonData = {
		text: 'BACK',
		textAlign: 'center',
		description: "Shows the previous options",
		x: 233,
		y: 70,
		width: 195,
		height: 20,
		fontSize: 15,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		onClick: (() => this.switchMoreOptions()).bind(this)
	};
	this._goBackButton = new SButton_Confirm(goBackButtonData);
	this._moreOptBase.addChild(this._goBackButton);

	this._moreOptBase.bitmap.drawText('HIDE PROGRESS', 17, 55, 195, 15);
	var hideProgressBtnData = {
		textAlign: 'center',
		description: "If set to YES, this specific achievement's progress bar and text will be hidden",
		x: 17,
		y: 70,
		width: 195,
		height: 20,
		fontSize: 15,
		borderSize: 1,
		backColor: '#111111',
		onClick: (() => this.onHideProgress()).bind(this)
	};
	this._hideProgressButton = new SButton_Confirm(hideProgressBtnData);
	this._moreOptBase.addChild(this._hideProgressButton);

	this._moreOptBase.bitmap.drawText('POP UP DESCRIPTION', 17, 100, 195, 15);
	var descData = {
		description: "Change your achievement's pop up description (maximun of 200 chars)",
		x: 17,
		y: 115,
		width: 410,
		height: 56,
		fontSize: 15,
		borderSize: 1,
		backColor: '#111111',
		maxLines: 3,
		design: 'round-rect',
		maxDigits: 200
	};
	this._popUpDescEntry = new SButton_Text(descData);
	this._popUpDescEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		var editor = this.parent.parent;
		var oldValue = editor._achievement.popUpDesc;
		editor._achievement.popUpDesc = this.value;
		var newValue = editor._achievement.popUpDesc;
		if (oldValue !== newValue) {
			var action = {
				id: editor._achievement.id,
				type: 'POP UP DESCRIPTION',
				old: oldValue,
				new: newValue
			};
			editor.addAction(action);
		}
		editor.redrawAchievOnWindow();
	};
	this._popUpDescEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this._moreOptBase.addChild(this._popUpDescEntry);

	this.addChild(this._moreOptBase);
};

Editor_Achievement.prototype.initReqRewMenu = function() {
	this._reqRewBase = new Sprite(new Bitmap(this._rightMenuBase.width, this._rightMenuBase.height));
	this._reqRewBase._target = '';
	this._reqRewBase.visible = false;
	this._reqRewBase.bitmap.fontSize = 18;
	this._reqRewBase.x = 155;
	this._reqRewBase.y = 44;
	this._reqRewBase.show = function(target) {
		this.setTarget(target);
		this.parent._currentMenu = target;
		this.parent._rightMenuBase.visible = false;
		if (target === 'rewards') {
			if (!this.parent._rewLoaded) {
				this.parent.redrawAchievementInfo(0, true);
			}
		} else {
			if (!this.parent._reqLoaded) {
				this.parent.redrawAchievementInfo(0, true);
			}
		}
		this.visible = true;
	};
	this._reqRewBase.hide = function() {
		this.parent._currentMenu = 'main';
		this.parent._rightMenuBase.visible = true;
		if (!this.parent._mainLoaded) {
			this.parent.redrawAchievementInfo(0, true);
		}
		this.visible = false;
	};
	this._reqRewBase.setTarget = function(target) {
		if (this._target === target) return;
		this.parent._currentMenu = target;
		this._target = target;
		this.bitmap.clearRect(0, 10, 450, 20);
		if (target === 'rewards') {
			this.parent._switchTarget.text = 'Requirements >';
			this.bitmap.drawText('REWARDS', 0, 10, 450, 20, 'center');
			this.parent.redrawAchievementInfo(0, true);
		} else {
			this.parent._switchTarget.text = 'Rewards >';
			this.bitmap.drawText('REQUIREMENTS', 0, 10, 450, 20, 'center');
			this.parent.redrawAchievementInfo(0, true);
		}
	};
	this._reqRewBase.switchTarget = function() {
		this.setTarget(this._target === 'rewards' ? 'requirements' : 'rewards');
	};

	var fontSize = this.txtChild.bitmap.fontSize - 1;
	var menuNavigationData = {
		text: '< Main',
		textAlign: 'center',
		x: 20,
		y: 10,
		width: 120,
		height: 20,
		backColor: '#111111',
		fontSize: fontSize,
		design: 'round-rect',
		onClick: this._reqRewBase.hide.bind(this._reqRewBase)
	};
	this._backToMainButton = new SButton_Confirm(menuNavigationData);
	this._reqRewBase.addChild(this._backToMainButton);

	menuNavigationData.text = 'Rewards >';
	menuNavigationData.x = 450 - menuNavigationData.x - menuNavigationData.width;
	menuNavigationData.onClick = this._reqRewBase.switchTarget.bind(this._reqRewBase)
	this._switchTarget = new SButton_Confirm(menuNavigationData);
	this._reqRewBase.addChild(this._switchTarget);

	var font = { size: 14, face: this.fontFace };
	var initialText = 'Choose an item below to edit it or';	
	var newReqRewData = {
		text: 'CREATE A NEW ONE',
		textAlign: 'center',
		description: 'Create a new requirement or reward',
		x: SMO.AM.textWidthEx(initialText, font, true) + 35,
		y: 40,
		width: 140,
		height: 20,
		backColor: '#004400',
		fontSize: font.size,
		fontFace: font.face,
		design: 'round-rect',
		onClick: this.createNewReqRew.bind(this)
	};
	this._newReqRewButton = new SButton_Confirm(newReqRewData);
	this._reqRewBase.addChild(this._newReqRewButton);

	var reqRewListData = {
		x: 20,
		y: 67,
		width: 409,
		height: 66,
		itemHeight: 32,
		backColor: '#111111',
		fontSize: fontSize,
		hideSelect: true
	};
	this._reqRewList = new Sprite_ItemList(reqRewListData, 2);
	this._reqRewList.onItemSelected = function(index) {
		Sprite_ItemList.prototype.onItemSelected.call(this, index);
		var editor = this.parent.parent;
		editor._reqRewSmallSelector._skipExtraChanges = true;
		editor.onReqOrRewSelected(index);
		editor._reqRewSmallSelector._skipExtraChanges = false;
	};
	this._reqRewList.onItemDeselected = function(indexes) {
		if (!this.isAnyItemSelected()) {
			this.parent.parent._reqRewInfoBase.visible = false;
		}
	};
	this._reqRewBase.addChild(this._reqRewList);

	this._reqRewInfoBase = new Sprite(new Bitmap(450, 372));
	this._reqRewInfoBase.bitmap.fontSize = fontSize;
	this._reqRewInfoBase.x = 0;
	this._reqRewInfoBase.y = 146;
	this._reqRewInfoBase.visible = false;
	this._reqRewBase.addChild(this._reqRewInfoBase);

	var typeListData = {
		textAlign: 'center',
		x: 15,
		y: 15,
		width: 415,
		height: 76,
		itemHeight: 18,
		backColor: '#111111',
		fontSize: fontSize-2,
		borderSize: 1,
		listLimit: 10,
		hideSelect: true
	};
	this._reqRewTypeList = new Sprite_ItemList(typeListData, 4);
	this._reqRewTypeList.onItemSelected = function(index) {
		Sprite_ItemList.prototype.onItemSelected.call(this, index);
		this.parent.parent.parent.refreshReqRewInfo();
	};
	this._reqRewTypeList.deselectItem = function() {};
	this._reqRewInfoBase.addChild(this._reqRewTypeList);

	var customSelectorData = {
		x: 200,
		y: 185,
		width: 45,
		height: 25,
		fontSize: 20,
		listLimit: 6,
		backColor: '#111111',
		textOffset: [2, 0],
		options: ['==', '>', '>=', '<', '<=', '!=']
	};
	this._reqRewCustomSelector = new SButton_Select(customSelectorData);
	this._reqRewCustomSelector.visible = false;
	this._reqRewInfoBase.addChild(this._reqRewCustomSelector);

	var selectorData = {
		width: 70,
		height: 20,
		fontSize: fontSize,
		backColor: '#111111',
		textOffset: [2, 0],
		listLimit: 12
	};
	this._reqRewSmallSelector = new SButton_Select(selectorData);
	this._reqRewSmallSelector.visible = false;
	this._reqRewSmallSelector.onOptionChange = function(values, indexes, skipSound) {
		if (!indexes.length && this._options.items().length > 0) return this.selectItem(0, false, false);
		SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
		var editor = this.parent.parent.parent;
		if (editor._currentMenu !== 'requirements') return;
		if (this._skipExtraChanges) return;
		if (['ON', 'OFF'].contains(values[0])) {
			editor._requiredValueEntry.value = values[0] === 'ON' ? 'true' : 'false';
			return;
		}
		if (['is', 'is not'].contains(values[0])) {
			editor._requiredValueEntry.value = values[0] === 'is' ? 'true' : 'false';
			var defA = SMO.AM.DefaultAlias.Requirement['party memberA'];
			var defB = SMO.AM.DefaultAlias.Requirement['party memberB'];
			var value = editor._aliasEntry.value;
			editor._aliasEntry.value = value === defA ? defB : value === defB ? defA : value;
			return;
		}
		var comparisons = ['==', '>', '>=', '<', '<=', '!='];
		editor.redrawComparisonSymbol(comparisons[indexes[0]] || '>=');
	};
	this._reqRewInfoBase.addChild(this._reqRewSmallSelector);

	selectorData.width = 150;
	selectorData.height = 20;
	selectorData.drawIds = true;
	selectorData.fontSize = fontSize;
	this._reqRewBigSelector = new SButton_Select(selectorData);
	this._reqRewBigSelector.visible = false;
	this._reqRewBigSelector.onOptionChange = function(values, indexes, skipSound) {
		if (!indexes.length && this._options.items().length > 0) return this.selectItem(0, false, false);
		var cv = this.currentValue();
		var oldItemId = this._options.getIndexByString(cv) + 1;
		var newItemId = indexes[0] + 1;
		SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
		if (!cv) return;
		if (this.parent.parent.parent._currentMenu === 'rewards') {
			this.refreshReward(oldItemId, newItemId);
		} else {
			this.refreshRequirement(oldItemId, newItemId);
		}
	};
	this._reqRewBigSelector.refreshReward = function(oldItemId, newItemId) {
		var editor = this.parent.parent.parent;
		var type = editor._reqRewTypeList.selectedItemText();
		if (['Item', 'Weapon', 'Armor'].contains(type)) {
			editor._iconButtons[3][2].redrawMyText();
		}
	};
	this._reqRewBigSelector.refreshRequirement = function(oldItemId, newItemId) {
		var editor = this.parent.parent.parent;
		var requirement = editor.requirement();
		var type = editor._reqRewTypeList.selectedItemText();
		switch(type) {
		case 'Variable':
			editor._currentValueEntry.value = `$gameVariables.value(${newItemId})`;
			break;
		case 'Switch':
			editor._currentValueEntry.value = `$gameSwitches.value(${newItemId})`;
			break;
		case 'Item':
		case 'Weapon':
		case 'Armor':
			var objName = type === 'Item' ? '$dataItems' : type === 'Weapon' ? '$dataWeapons' : '$dataArmors';
			editor._currentValueEntry.value = `$gameParty.numItems(${objName}[${newItemId}])`;
			editor._iconButtons[3][2].redrawMyText();
			break;
		case 'Party Member':
			editor._currentValueEntry.value = `$gameParty._actors.indexOf(${newItemId}) > -1`;
			break;
		case 'Party Level':
			editor._currentValueEntry.value = 
				newItemId <= 1 ? 'Math.min.apply(null, $gameParty.members().map(a => a.level))' :
				newItemId === 2 ? '$gameParty.members().lenth > 0 ? Math.round($gameParty.members().reduce((a, v) => a.level + v.level)/$gameParty.members().length) : 0' :
				newItemId === 3 ? 'Math.max.apply(null, $gameParty.members().map(a => a.level))' :
				'$gameParty.members().reduce((a, v) => a.level + v.level)';
			break;
		}
	};
	this._reqRewInfoBase.addChild(this._reqRewBigSelector);

	var entry;
	var entryData = {
		width: 40,
		height: 20,
		fontSize: fontSize,
		backColor: '#111111',
		design: 'round-rect',
		textOffset: [0, -2]
	};
	this._reqRewEntries = [];
	for (var a = 0; a < 3; a++) {
		entry = new SButton_Text(entryData);
		entry.visible = false;
		entry.onDeselect = function() {
			SButton_Text.prototype.onDeselect.call(this);
			this.refreshRequirement();
		};
		entry.refreshRequirement = function() {
			var editor = this.parent.parent.parent;
			if (editor._reqRewTypeList.selectedItemText() === 'Playtime') {
				var value = editor._reqRewEntries[0].value * 3600;
				value += editor._reqRewEntries[1].value * 60;
				value += editor._reqRewEntries[2].value * 1; //just to make it a number
				editor._requiredValueEntry.value = String(value);
			} else {
				editor._requiredValueEntry.value = this.value;
			}
		};
		entry.onOkTriggered = function() {
			SButton_Text.prototype.onOkTriggered.call(this);
			SceneManager._scene.selectButton(null);
		};
		this._reqRewEntries.push(entry);
		this._reqRewInfoBase.addChild(entry);
	}

	entryData.x = 15;
	entryData.y = 185;
	entryData.width = 180;
	entryData.height = 25;
	entryData.textOffset = [0, 1];
	this._currentValueEntry = new SButton_Text(entryData);
	this._currentValueEntry.onAction = function() {
		SButton_Text.prototype.onAction.call(this);
		var selector = this.parent.parent.parent._reqRewTypeList;
		if (selector.selectedItemText() !== 'Custom') {
			selector._keepCustomValues = true;
			selector.selectItemByName('Custom');
			selector._keepCustomValues = false;
		}
	};
	this._reqRewInfoBase.addChild(this._currentValueEntry);

	entryData.x = this._reqRewInfoBase.width - entryData.width - 20;
	this._requiredValueEntry = new SButton_Text(entryData);
	this._requiredValueEntry.onAction = function() {
		SButton_Text.prototype.onAction.call(this);
		var editor = this.parent.parent.parent;
		var selector = editor._reqRewTypeList;
		if (selector.selectedItemText() !== 'Custom') {
			//Selecting the current comparison symbol, or the first symbol on the custom selector
			var startSymbol = editor._reqRewSmallSelector._options._items[0].text;
			var index = startSymbol !== '=' ? 0 : editor._reqRewSmallSelector.selectedIndexes()[0];
			editor._reqRewCustomSelector.selectItem(index, false, false);
			//Redefining the type of the requirement to custom
			selector._keepCustomValues = true;
			selector.selectItemByName('Custom');
			selector._keepCustomValues = false;
		}
	};
	this._reqRewInfoBase.addChild(this._requiredValueEntry);

	var customRewardData = {
		x: 15,
		y: 170,
		width: 415,
		height: 40,
		fontSize: fontSize,
		backColor: '#111111',
		design: 'round-rect',
		maxLines: 5
	};
	this._customRewardEntry = new SButton_Text(customRewardData);
	this._customRewardEntry.visible = false;
	this._reqRewInfoBase.addChild(this._customRewardEntry);

	entryData.x = 15;
	entryData.y = 242;
	entryData.width = 415;
	this._aliasEntry = new SButton_Text(entryData);
	this._reqRewInfoBase.addChild(this._aliasEntry);

	var iconData = {
		x: 15,
		y: 287,
		width: 104,
		height: 38,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		textOffset: [36, 0],
		hideSelect: true,
		onClick: (() => this.startIconSelector(3, this._iconButtons[3][0].text)).bind(this)
	};
	this._iconButtons[3][0] = new SButton_Confirm(iconData);
	this._iconButtons[3][0].onIconSelected = function(iconIndex) {
		this.text = String(iconIndex);
	};
	this._iconButtons[3][0].drawMyText = function() {
		SButton_Confirm.prototype.drawMyText.call(this);
		if (this.text) {
			var iconIndex = Number(this.text);
			var bitmap = ImageManager.loadSystem('IconSet');
			var pw = Window_Base._iconWidth;
			var ph = Window_Base._iconHeight;
			var sx = iconIndex % 16 * pw;
			var sy = Math.floor(iconIndex / 16) * ph;
			this.txtChild.bitmap.blt(bitmap, sx, sy, pw, ph, 3, 3);
		}
	};
	this._reqRewInfoBase.addChild(this._iconButtons[3][0]);

	iconData.text = 'No Icon';
	iconData.textAlign = 'center';
	iconData.x += iconData.width + 19;
	iconData.textOffset = [0, 0];
	iconData.onClick = (() => this.selectIconButton(3, 1)).bind(this);
	this._iconButtons[3][1] = new SButton_Confirm(iconData);
	this._reqRewInfoBase.addChild(this._iconButtons[3][1]);

	var special = ['Item', 'Weapon', 'Armor', 'Gold', 'Gold Gained', 'Gold Spent'];
	iconData.x += iconData.width + 19;
	iconData.width += 60;
	iconData.enableMethod = (() => special.contains(this._reqRewTypeList.selectedItemText())).bind(this);
	iconData.onClick = (() => this.selectIconButton(3, 2)).bind(this);
	this._iconButtons[3][2] = new SButton_Confirm(iconData);
	this._iconButtons[3][2].drawMyText = function() {
		if (!this.parent) return;
		var special = ['Item', 'Weapon', 'Armor', 'Gold', 'Gold Gained', 'Gold Spent'];
		var editor = this.parent.parent.parent;
		var value = editor._reqRewTypeList.selectedItemText();
		var isIcon = special.contains(value);
		var iconIndex = -1;
		if (isIcon) {
			value += 's';
			var id = editor._reqRewBigSelector.selectedIndexes()[0] + 1;
			var isGold = ['Golds', 'Gold Gaineds', 'Gold Spents'].contains(value);
			iconIndex = isGold ? SMO.AM.Icons.gold : window['$data'+value][id] ? window['$data'+value][id].iconIndex : -1;
			if (iconIndex > -1) {
				this._data.text = iconIndex.toString() + ' (Default)';
				this._data.textAlign = 'left';
				this._data.textOffset = [36, 0];
				var bitmap = ImageManager.loadSystem('IconSet');
				var pw = Window_Base._iconWidth;
				var ph = Window_Base._iconHeight;
				var sx = iconIndex % 16 * pw;
				var sy = Math.floor(iconIndex / 16) * ph;
				this.txtChild.bitmap.blt(bitmap, sx, sy, pw, ph, 3, 3);
			}
		}
		if (!isIcon || iconIndex === -1) {
			this._data.text = 'No Icon (Default)';
			this._data.textAlign = 'center';
			this._data.textOffset = [0, 0];
		}
		SButton_Confirm.prototype.drawMyText.call(this);
	};
	this._iconButtons[3][2].redrawMyText();
	this._reqRewInfoBase.addChild(this._iconButtons[3][2]);

	var deleteButtonData = {
		text: 'DELETE',
		textAlign: 'center',
		description: 'Delete this requirement/reward',
		x: 67,
		y: 333,
		width: 100,
		height: 22,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#aa0000',
		design: 'round-rect',
		onClick: this.confirmBeforeDeleting.bind(this)
	};
	this._reqRewDelete = new SButton_Confirm(deleteButtonData);
	this._reqRewInfoBase.addChild(this._reqRewDelete);

	var commandButtonData = {
		text: 'APPLY',
		textAlign: 'center',
		description: 'Apply the changes you made so that you can see them in action',
		x: this._reqRewInfoBase.width - 100,
		y: deleteButtonData.y,
		width: 80,
		height: 22,
		backColor: '#43d643',
		borderColor: '#78ff78',
		disabledTone: 0,
		hideSelect: true,
		fontSize: fontSize,
		onClick: this.applyReqRewInfo.bind(this)
	};
	this._reqRewApplyButton = new SButton_Confirm(commandButtonData);
	this._reqRewApplyButton.update = function() {
		SButton_Confirm.prototype.update.call(this);
		if (this._msgDelay > 0) {
			if (--this._msgDelay < 1) {
				this.text = 'APPLY';
			}
		}
	};
	this._reqRewInfoBase.addChild(this._reqRewApplyButton);

	commandButtonData.x -= 110;
	commandButtonData.text = 'CANCEL';
	commandButtonData.backColor = '#d64343';
	commandButtonData.borderColor = '#ff7878';
	commandButtonData.description = 'Cancel the changes you made, returning the visible fields to ';
	commandButtonData.description += 'their original values';
	commandButtonData.onClick = (function() {
		this.onReqOrRewSelected(this._reqRewList._selectedIndexes[0]);
	}).bind(this);
	this._reqRewCancel = new SButton_Confirm(commandButtonData);
	this._reqRewInfoBase.addChild(this._reqRewCancel);

	this.drawReqRewBackground();
	this.addChild(this._reqRewBase);
};

Editor_Achievement.prototype.initConfirmMenu = function() {
	var data = {
		x: 0,
		y: 0,
		width: this.width,
		height: this.height,
		backColor: this.backColor,
		borderColor: this.borderColor,
		design: this.design,
		fontSize: this.txtChild.bitmap.fontSize,
		hideSelect: true
	};

	this._confirmMenu = new SButton_Confirm(data);
	var drawBackground = (function(x, y, width, height, color) {
		this.drawRoundedRect(x, y, width, height, 10, color);
	}).bind(this._confirmMenu.bitmap);

	drawBackground(95, 15, this.width-190, 532, '#0b0b0b');
	drawBackground(100, 50, this.width-200, 492, '#191919');

	this._confirmMenu.visible = false;
	this._confirmMenu._fixedTone = true;
	this._confirmMenu.showMessage = function(title, message, ok, cancel) {
		var cancelButton = this.parent._cmCancelButton;
		this.parent._changesList.visible = false;
		this.txtChild.bitmap.clear();
		this.parent._cmConfirmButton.text = ok || 'OK';
		cancelButton.text = cancel || 'CANCEL';
		if (this._showingChanges) {
			if (cancelButton.backColor !== '#43d643') {
				var onClick = this.saveChanges.bind(this);
				cancelButton.redefine({ backColor:'#43d643', borderColor:'#78ff78', onClick }, true);
			}
		} else {
			if (cancelButton.backColor !== '#d64343') {
				var onClick = (() => this.visible = false).bind(this);
				cancelButton.redefine({ backColor:'#d64343', borderColor:'#ff7878', onClick }, true);
			}
		}

		var fontSize = this.txtChild.bitmap.fontSize;
		this.txtChild.bitmap.fontSize += 2;
		this.txtChild.bitmap.drawText(title, 0, 25, this.width, fontSize + 4, 'center');
		this.txtChild.bitmap.fontSize -= 2;
		var font = {
			size: this.txtChild.bitmap.fontSize,
			face: this.txtChild.bitmap.fontface
		};

		var lines, k = 0;
		if (message) {
			var texts = message.split('\n');
			for (var t = 0; t < texts.length; t++) {
				lines = SMO.AM.wrapText(texts[t], 380, font, true).split('\n');
				for (var i = 0; i < lines.length; i++) {
					this.txtChild.bitmap.drawText(lines[i], 110, 60 +  k * (fontSize + 4), 380, fontSize);
					k++;
				}
			}
		}
		this.visible = true;
		SceneManager._scene.selectButton(this);
	};
	this._confirmMenu.saveChanges = function() {
		this.parent.saveData();
		this.parent._changesList.setItemList([]);
		this.visible = false;
	};
	this._confirmMenu.showChanges = function() {
		this._showingChanges = true;
		this.showMessage('Changes since last save', null, null, 'SAVE');
		this._showingChanges = false;
		var list = [];
		var actions = SMO.AM.AchievsEditorActions;
		var id, t, k, keys, action, name;
		var achievColor = '#111122';
		var typeColor = '#22222a';
		var ident = String.fromCharCode(13);
		var sortOrder = ['CREATE', 'NAME', 'CATEGORY', 'VISIBILITY', 'DESCRIPTION', 'BACKGROUND', 'POP UP',
					'ALIAS ICON (LOCKED)', 'ALIAS ICON (UNLOCKED)', 'ALIAS ICON (SECRET)', 'REQUIREMENT', 'REWARD'];
		for (id in actions) {
			action = actions[id];
			if (id[0] === 'd') {
				name = `${ident}ACHIEVEMENT "${action.name}" DELETED `;
				list.push({name, iconIndex: -2, color: achievColor, align: 'center', topColor: true});
				continue;
			}
			keys = Object.keys(action);
			keys.delete('name');
			keys.sort(function(a, b) {
				return sortOrder.indexOf(a) - sortOrder.indexOf(b);
			});
			name = `${ident}ACHIEVEMENT ${id} (${action.name}) `;
			list.push({name, iconIndex: -2, color: achievColor, align: 'center', topColor: true});
			for (t = 0; t < keys.length; t++) {
				k = keys[t];
				if (k === 'DESCRIPTION') {
					list.push({name: 'OLD DESCRIPTION', iconIndex: -2, color: typeColor, align: 'center'});
					var lines = action[k].old.split('\n');
					for (var l = 0; l < lines.length; l++) {
						list.push({name: ` • ${lines[l]}`, iconIndex: -2});
					}
					list.push({name: 'NEW DESCRIPTION', iconIndex: -2, color: typeColor, align: 'center'});
					lines = action[k].new.split('\n');
					for (var l = 0; l < lines.length; l++) {
						list.push({name: ` • ${lines[l]}`, iconIndex: -2});
					}
				} else if (k === 'CREATE') {
					list.push({name: 'ACHIEVEMENT CREATED!', iconIndex: -2, align: 'center'});
				} else if (k === 'REWARD' || k === 'REQUIREMENT') {
					list.push({name: k + 'S', color: typeColor, align: 'center'});
					for (var j in action[k]) {
						if (j[0] === 'd') {
							list.push({name: ` • ${k} "${action[k][j]}" DELETED`, color: typeColor});
							continue;
						}
						list.push({name: ` • ${k} ${j}`, color: typeColor});
						for (var m in action[k][j]) {
							if (m === 'CREATE') {
								list.push({name: ' • • CREATED!'});
							} else {
								list.push({name: ` • • ${m}: ${action[k][j][m].old} -> ${action[k][j][m].new}`});
							}
						}
					}
				} else {
					list.push({name: k.toUpperCase(), color: typeColor, align: 'center'});
					list.push({name: `${action[k].old} -> ${action[k].new}`, iconIndex: -2, align: 'center'});
				}
			}
		}
		this.parent._changesList.setItemList(list);
		this.parent._changesList.visible = true;
	};
	this._confirmMenu.update = function() {
		SButton_Confirm.prototype.update.call(this);
		if (this.visible && Input.isTriggered('ok')) {
			this.parent._cmConfirmButton.onClickSuccess();
		}
	};

	var listData = {
		x: 110,
		y: 60,
		width: this.width-220,
		height: 445,
		itemHeight: 25,
		backColor: '#000000',
		itemColors: ['#3e3e3e', '#3e3e3e'],
		fontSize: 16,
		borderSize: 1,
		hideSelect: true,
		disabledTone: 0
	};
	this._changesList = new Sprite_ItemList(listData, 1);
	this._changesList.visible = false;
	this._confirmMenu.addChild(this._changesList);

	var cancelData = {
		text: 'CANCEL',
		textAlign: 'center',
		x: 105,
		y: 515,
		width: 60,
		height: 22,
		backColor: '#d64343',
		borderColor: '#ff7878',
		disabledTone: 0,
		hideSelect: true,
		fontSize: this.txtChild.bitmap.fontSize,
		onClick: (() => this._confirmMenu.visible = false).bind(this)
	};
	this._cmCancelButton = new SButton_Confirm(cancelData);
	this._confirmMenu.addChild(this._cmCancelButton);

	var confirmCata = {
		text: 'OK',
		textAlign: 'center',
		x: this.width - 165,
		y: 515,
		width: 60,
		height: 22,
		backColor: '#43d643',
		borderColor: '#78ff78',
		disabledTone: 0,
		hideSelect: true,
		fontSize: this.txtChild.bitmap.fontSize
	};
	this._cmConfirmButton = new SButton_Confirm(confirmCata);
	this._confirmMenu.addChild(this._cmConfirmButton);

	this.addChild(this._confirmMenu);
};

//========================================
// Achievement Editor - Update

Editor_Achievement.prototype.update = function() {
	this.updateTriggers();
	SWindow_Base.prototype.update.call(this);
};

Editor_Achievement.prototype.updateTriggers = function() {
	if (!this.visible) return;
	if (this.isAnimating()) return;
	if (SceneManager._scene.isSelecting()) return;
	if (SceneManager._scene.isTextInputSelected()) return;
	if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
		this.onCancelled();
	} else if (Input.isTriggered('delete') && this._achievement) {
		this._confirmMenu.parentFocus();
		this.confirmBeforeDeleting();
	} else if (Input.isTriggered('s') && Input.isPressed('control')) {
		if (this._saveButton.enabled) {
			this.saveData();
		}
	}
};

Editor_Achievement.prototype.onCancelled = function() {
	if (this._confirmMenu.visible) {
		this._confirmMenu.visible = false;
	} else {
		this.close();
	}
};

//========================================
// Achievement Editor - Selectors

Editor_Achievement.prototype.startImageSelector = function(caller) {
	var imageName = caller.text;
	this._isSelectorOpen = true;
	this.close();
	if (!SceneManager._scene._imageSelector) {
		SceneManager._scene._imageSelector = new ImageSelector();
		SceneManager._scene.addChild(SceneManager._scene._imageSelector);
	}
	var ImgSelector = SceneManager._scene._imageSelector;
	ImgSelector._editor = this;
	ImgSelector._callerButton = caller;
	if (ImgSelector._dirpath !== 'img/achievements') {
		ImgSelector._dirpath = 'img/achievements';
		ImgSelector.refreshImageNames();
	}
	if (imageName) {
		ImgSelector.selectImage(imageName);
	}
	ImgSelector.open();
	this._isSelectorOpen = true;
};

Editor_Achievement.prototype.onImageSelectorConfirmed = function() {
	var caller = SceneManager._scene._imageSelector._callerButton;
	if (caller && caller.onImageSelected) {
		caller.onImageSelected(SceneManager._scene._imageSelector.imageName);
	}
};

Editor_Achievement.prototype.startIconSelector = function(callerIndex, iconIndex) {
	var deactivatedColor = '#555555';
	var callerButton = this._iconButtons[callerIndex][0];
	if (callerButton.borderColor === deactivatedColor && callerButton.text) {
		this.selectIconButton(callerIndex, 0);
		if (callerIndex < 3) {
			let icons = ['locked', 'unlocked', 'secret'];
			let iconType = icons[callerIndex];
			var oldValue = this._achievement.icon[iconType];
			this._achievement.icon[iconType] = Number(callerButton.text);
			var newValue = Number(callerButton.text);
			if (oldValue !== newValue) {
				let action = {
					id: this._achievement.id,
					type: 'ALIAS ICON (' + iconType.toUpperCase() + ')',
					old: oldValue,
					new: newValue
				};
				this.addAction(action);
			}
		}
		this.redrawAchievOnWindow();
		return;
	}
	this.selectIconButton(callerIndex, 0);
	this._isSelectorOpen = true;
	this.close();
	if (!SceneManager._iconSelector) {
		SceneManager._iconSelector = new IconSelector();
		SceneManager._iconSelector.close = function() {
			IconSelector.prototype.close.call(this);
			var callerButton = this._editor._iconButtons[this._callerIndex][0];
			if (this.iconIndex === -1 && !callerButton.text) {
				let icons = ['locked', 'unlocked', 'secret'];
				if (this._callerIndex < 3) {
					var iconIndex = this._editor._achievement.icon[icons[this._callerIndex]];
				} else {
					let obj = this._editor.requirement() || this._editor.reward();
					let icon = obj.getIcon();
					var iconIndex = icon > 0 ? -2 : -1;
				}
				this._editor.selectIconButton(this._callerIndex, -iconIndex);
			}
			this._editor.open();
		};
		SceneManager._scene.addChild(SceneManager._iconSelector);
	}
	if (SceneManager._iconSelector._editor !== this) {
		SceneManager._iconSelector._editor = this;
		SceneManager._iconSelector.onConfirm = function() {
			IconSelector.prototype.onConfirm.call(this);
			if (this.iconIndex > -1) {
				this._editor.onIconSelectorConfirmed();
			}
		};
	};
	SceneManager._iconSelector._callerIndex = callerIndex;
	SceneManager._iconSelector.selectIcon(iconIndex ? Number(iconIndex) : null);
	SceneManager._iconSelector.open();
	this._isSelectorOpen = true;
};

Editor_Achievement.prototype.onIconSelectorConfirmed = function() {
	var icons = ['locked', 'unlocked', 'secret'];
	var selector = SceneManager._iconSelector;
	var iconButton = this._iconButtons[selector._callerIndex][0];
	var oldValue = this._achievement.icon[icons[selector._callerIndex]];
	iconButton.onIconSelected(selector.iconIndex);
	if (selector._callerIndex < 3) {
		var newValue = selector.iconIndex;
		if (oldValue !== newValue) {
			let action = {
				id: this._achievement.id,
				type: 'ALIAS ICON (' + icons[selector._callerIndex].toUpperCase() + ')',
				old: oldValue,
				new: newValue
			};
			this.addAction(action);
		}
	}
};

//========================================
// Achievement Editor - Draw

Editor_Achievement.prototype.drawMyText = function() {
	var lineColor = '#555555';
	this.txtChild.bitmap.drawText('ACHIEVEMENTS', 2, 24, 150, 20, 'center');
	this.txtChild.bitmap.fillRect(2, 44, 601, 1, lineColor); //horz line
	this.txtChild.bitmap.fillRect(152, 24, 1, 398, lineColor); //vertical line
	var selectText = '< Select or create a new achievement to start editing';
	this.txtChild.bitmap.drawText(selectText, 155, 44, this.width - 155, this.height - 44, 'center');
};

Editor_Achievement.prototype.drawMainBackground = function() {
	//Hiding the background text "< Select or create..."
	var tx = this._rightMenuBase.x;
	var ty = Math.floor(this._rightMenuBase.height/2 - 10);
	this._rightMenuBase.bitmap.fillRect(tx, ty, this.width - tx - 160, 20, '#222222');
	//Drawing the background
	var drawBackground = (function(y, height, color) {
		color = color || '#3b3b3b';
		this.drawRoundedRect(10, y, this.width-26, height, 10, color);
	}).bind(this._rightMenuBase.bitmap);
	drawBackground(5, 172);
	drawBackground(186, 45);
	drawBackground(241, 189);
	drawBackground(440, 30);
	drawBackground(480, 30, '#7b3b3b');
};

Editor_Achievement.prototype.drawReqRewBackground = function() {
	//Drawing the lighter background
	this._reqRewBase.bitmap.drawRoundedRect(5, 35, 435, 106, 10, '#3b3b3b');
	this._reqRewBase.bitmap.drawRoundedRect(5, 150, 435, 356, 10, '#3b3b3b');

	//Drawing the darker background
	var y = 176;
	this._reqRewBase.bitmap.drawRoundedRect(9, 156, 428, 87, 10, '#111111');
	this._reqRewBase.bitmap.drawRoundedRect(9, y + 73, 428, 45, 10, '#111111');
	this._reqRewBase.bitmap.drawRoundedRect(9, y + 125, 428, 61, 10, '#111111');
	this._reqRewBase.bitmap.drawRoundedRect(9, y + 192, 428, 107, 10, '#111111');
	this._reqRewBase.bitmap.drawRoundedRect(9, y + 301, 211, 27, 10, '#7b3b3b');
	this._reqRewBase.bitmap.drawRoundedRect(230, y + 301, 207, 27, 10, '#111111');

	//Drawing texts
	var originalFontSize = this._reqRewBase.bitmap.fontSize;
	this._reqRewBase.bitmap.fontSize = 14;
	this._reqRewBase.bitmap.drawText('Choose an item below to edit it or', 30, 40, 430, 20);
	this._reqRewBase.bitmap.fontSize = originalFontSize;

	var bitmap = this._reqRewInfoBase.bitmap;
	originalFontSize = bitmap.fontSize;
	bitmap.fontSize = 12;
	y = 55;
	bitmap.drawText('ADVANCED', 0, y + 103, 450, 12, 'center');
	bitmap.drawText('<CURRENT VALUE>', 15, y + 118, 90, 12);
	bitmap.drawText('<REQUIRED VALUE>', this._requiredValueEntry.x, y + 118, 96, 12);
	bitmap.drawText('ALIAS', 15, y + 175, 96, 12);
	bitmap.drawText('ICON', 15, y + 220, 24, 12);
	bitmap.fontSize = originalFontSize;
};

Editor_Achievement.prototype.redrawAchievOnWindow = function() {
	var ItemWindow = SceneManager._scene._achievementsWindow;
	if (ItemWindow && ItemWindow._data) {
		var index = ItemWindow._data.indexOf(this._achievement);
		var initialIndex = ItemWindow.topIndex();
		var finalIndex = initialIndex + ItemWindow.maxPageItems() - 1;
		if (index > -1 && index >= initialIndex && index <= finalIndex) {
			ItemWindow.redrawItem(index);
		}
	}
};

Editor_Achievement.prototype.redrawAchievementInfo = function(itemName, keepAchievement) {
	var isTitle = itemName && itemName.charCodeAt(0) === 13;
	if (isTitle) {
		this._moreOptBase.visible = false;
		this.currentMenu().visible = false;
		this._achievement = null;
		return;
	}
	if (keepAchievement) {
		var achiev = this._achievement;
	} else {
		var id = Number(itemName.substring(0, itemName.indexOf('.')));
		var achiev = $dataAchievements[id-1];
		this._achievement = achiev;
	}
	if (!achiev) {
		console.warn('Achievement not found! (ID: "' + id + '", Name: "' + itemName + '")')
		return;
	}

	if (this._currentMenu === 'requirements') return this.redrawRequirementInfo();
	if (this._currentMenu === 'rewards') return this.redrawRewardInfo();
	//<MAIN>
	//NAME
	this._nameInput.value = achiev._name;
	//CATEGORY
	this._categorySelect.deselectAllItems();
	if (achiev.categories.length) {
		this._categorySelect._skipExtraChanges = true;
		for (var c = 0; c < achiev.categories.length; c++) {
			this._categorySelect.selectItemByName(achiev.categories[c], true);
		}
		this._categorySelect._skipExtraChanges = false;
	} else {
		this._categorySelect.refreshValues(true);
	}
	//VISIBILITY
	var v = achiev.visibility;
	var visibility = v === 'secret' ? 'Secret' : v === 'hidden' ? 'Hidden' : 'Always Visible';
	this._visibilitySelect.selectItemByName(visibility);
	//LOCK/UNLOCK
	this._lockButton.text = achiev.isUnlocked() ? 'Lock' : 'Unlock';
	//DESCRIPTION
	this._descriptionInput.value = achiev._description;
	//BACKGROUND
	this._backgroundButton.text = achiev.backgroundImage ? achiev.backgroundImage : '<none>';
	//POP UP
	this._popUpButton.text = achiev.popUpImage ? achiev.popUpImage : '<none>';
	//ICONS (LOCKED, UNLOCKED AND SECRET) ALL 9 POSSIBILITIES
	var iconIndex, selectedIndex;
	for (var i = 0; i < 3; i++) {
		iconIndex = i === 0 ? achiev.icon.locked : i === 1 ? achiev.icon.unlocked : achiev.icon.secret;
		selectedIndex = iconIndex === -2 || iconIndex === -1 ? Math.abs(iconIndex) : 0;
		this.selectIconButton(i, selectedIndex);
		this._iconButtons[i][0].text = iconIndex > -1 ? String(iconIndex) : '';
	}
	//MORE OPTIONS
	//POP UP DESCRIPTION
	this._popUpDescEntry.value = achiev.popUpDesc;
	//HIDE PROGRESS
	this._hideProgressButton.text = achiev.hideProgress ? 'YES' : 'NO';

	this._mainLoaded = true;
};

Editor_Achievement.prototype.redrawRequirementInfo = function() {
	function cb (r) {
		var icon = r.getIcon();
		return { 
			name: r.getText(),
			iconIndex: icon > -1 ? icon : -2 
		};
	}
	var requirements = this._achievement.requirements.map(cb);
	var originalFontSize = this._reqRewInfoBase.bitmap.fontSize;
	var typeList = [
		{name: 'Variable', align:'center'},
		{name: 'Switch', align:'center'},
		{name: 'Item', align:'center'},
		{name: 'Weapon', align:'center'},
		{name: 'Armor', align:'center'},
		{name: 'Gold Gained', align:'center'},
		{name: 'Gold Spent', align:'center'},
		{name: 'Gold', align:'center'},
		{name: 'Steps', align:'center'},
		{name: 'Playtime', align:'center'},
		{name: 'Save Count', align:'center'},
		{name: 'Battle Count', align:'center'},
		{name: 'Win Count', align:'center'},
		{name: 'Escape Count', align:'center'},
		{name: 'Party Member', align:'center'},
		{name: 'Party Level', align:'center'},
		{name: 'Party Size', align:'center'},
		{name: 'Custom', align:'center'}
	];
	this._reqRewTypeList._itemHeight = 34;
	this._reqRewTypeList._data.fontSize = 16;
	this._reqRewTypeList.setItemList(typeList);
	this._reqRewList.setItemList(requirements);
	this._reqRewInfoBase.bitmap.clearRect(15, 84, 425, 40);
	this._reqRewInfoBase.bitmap.fontSize = 12;
	this._reqRewInfoBase.bitmap.drawText(' THIS REQUIREMENT WILL BE MET ONCE THE', 0, 106, 450, 12, 'center');
	this._reqRewInfoBase.bitmap.fontSize = originalFontSize;
	this._reqRewInfoBase.visible = false;
	this._reqLoaded = true;
	this._rewLoaded = false;
};

Editor_Achievement.prototype.redrawRewardInfo = function() {
	function cb (r) {
		var icon = r.getIcon();
		return { 
			name: r.getText(),
			iconIndex: icon > -1 ? icon : -2
		};
	}
	var rewards = this._achievement.rewards.map(cb);
	var typeList = [
		{name: 'Item', align: 'center'},
		{name: 'Weapon', align: 'center'},
		{name: 'Armor', align: 'center'},
		{name: 'Gold', align: 'center'},
		{name: 'Experience', align: 'center'},
		{name: 'Custom', align: 'center'}
	];
	this._reqRewTypeList.setItemList(typeList);
	this._reqRewList.setItemList(rewards);
	this._reqRewInfoBase.bitmap.clearRect(15, 64, 425, 40);
	this._reqRewInfoBase.visible = false;
	this._reqLoaded = false;
	this._rewLoaded = true;
};

Editor_Achievement.prototype.refreshAchievsList = function() {
	var filter = this._sortAchievButton.currentValue();
	var list = $dataAchievements.clone();
	var padding = String(list.length).length;
	if (!list.length) {
		this._achievsList.setItemList([]);
		return;
	}
	switch(filter) {
	case 'A-z':
		list.sort((a, b) => a._name.localeCompare(b._name, 'en', { sensitivity: 'base' }));
		list = list.map(function(a) {
			var name = a.id.padZero(padding) + '. ' + a._name;
			if (name.length > 16) {
				name = name.substr(0, 13) + '...';
			}
			return name;
		});
		break;
	case 'Category':
		var ident = String.fromCharCode(13);
		list.sort((a, b) => a.category.localeCompare(b.category, 'en', { sensitivity: 'base' }));
		var cat = list.last().category;
		for (var i = list.length - 1; i > -1; i--) {
			if (list[i].category !== cat) {
				list.splice(i+1, 0, {name: ident + cat.toUpperCase() + ' ', color:'#111111', topColor: true, align: 'center'});
				cat = list[i].category;
			}
			list[i] = list[i].id.padZero(padding) + '. ' + list[i]._name;
			if (list[i].length > 16) {
				list[i] = list[i].substr(0, 13) + '...';
			}
		}
		list.splice(0, 0, {name: ident + cat.toUpperCase() + ' ', color:'#111111', topColor: true,  align: 'center'});
		break;
	case 'Visibility':
		var ident = String.fromCharCode(13);
		var visibilities = ['hidden', 'secret', 'visible'];
		var names = ['Hidden', 'Secret', 'Always Visible'];
		list.sort((a, b) => visibilities.indexOf(a.visibility) - visibilities.indexOf(b.visibility));
		var vis = 'visible';
		for (var i = list.length - 1; i > -1; i--) {
			if (list[i].visibility !== vis) {
				list.splice(i+1, 0, {
					name: ident + names[visibilities.indexOf(vis)] + ' ',
					color:'#111111',
					topColor: true,
					align: 'center'
				});
				vis = list[i].visibility;
			}
			list[i] = list[i].id.padZero(padding) + '. ' + list[i]._name;
			if (list[i].length > 16) {
				list[i] = list[i].substr(0, 13) + '...';
			}
		}
		list.splice(0, 0, {
			name: ident + names[visibilities.indexOf(vis)] + ' ',
			color:'#111111',
			topColor: true,
			align: 'center'
		});
		break;
	default: //ID
		list = list.map(function(a) {
			var name = a.id.padZero(padding) + '. ' + a._name;
			if (name.length > 16) {
				name = name.substr(0, 13) + '...';
			}
			return name;
		});
		break;
	}
	this._achievsList.setItemList(list);
	this._achievement = null;
	this.currentMenu().visible = false;
};

Editor_Achievement.prototype.refreshReqRewInfo = function() {
	this.resetReqRewTools();
	if (this._currentMenu === 'rewards') {
		this.refreshRewardInfo();
	} else {
		this.refreshRequirementInfo();
	}
};

Editor_Achievement.prototype.drawRewGold = function(x, y, itemId, amount, alias, advanced, icon, font) {
	//Drawing texts and positioning buttons arount them
	x = 128 - Math.floor(SMO.AM.textWidthEx(TextManager.currencyUnit, font.size, true) / 2);
	this._reqRewInfoBase.bitmap.drawText('The party will earn', x, y, 430, 20);
	x += SMO.AM.textWidthEx('The party will earn', font, true) + 5;
	this._reqRewEntries[0].x = x;
	x += this._reqRewEntries[0].width + 6;
	this._reqRewInfoBase.bitmap.drawText(TextManager.currencyUnit, x, y, 430, 20);
	//Providing initial values to other buttons
	this._reqRewEntries[0].y = y;
	this._reqRewEntries[0].value = amount;
	this._reqRewEntries[0].visible = true;
	this._customRewardEntry.value = advanced;
	this._aliasEntry.value = alias;
	this.selectIconReqRew(icon, { iconIndex: SMO.AM.Icons.gold });
};

Editor_Achievement.prototype.drawRewExperience = function(x, y, itemId, amount, alias, advanced, icon, font) {
	//Actors with no name receive the name: ''
	var actors = $dataActors.map(s => s ? s.name || "''" : "''");
	actors.splice(0, 1);
	actors.push('Party Leader', 'All Party');
	itemId = itemId < 0 ? actors.length - 2 + Math.abs(itemId) : itemId;
	//Drawing texts and positioning buttons around them
	x += 35;
	this._reqRewBigSelector.x = x;
	x += this._reqRewBigSelector.width + 6;
	this._reqRewInfoBase.bitmap.drawText('will earn', x, y, 430, 20);
	x += SMO.AM.textWidthEx('will earn', font, true) + 5;
	this._reqRewEntries[0].x = x;
	x += this._reqRewEntries[0].width + 6;
	this._reqRewInfoBase.bitmap.drawText('experience', x, y, 430, 20);
	//Providing initial values to other buttons
	this._reqRewBigSelector.y = y;
	this._reqRewBigSelector.setList(actors);
	this._reqRewBigSelector.selectItem(itemId-1, false);
	this._reqRewBigSelector.visible = true;
	this._reqRewEntries[0].y = y;
	this._reqRewEntries[0].value = amount;
	this._reqRewEntries[0].visible = true;
	this._customRewardEntry.value = advanced;
	this._aliasEntry.value = alias;
	this.selectIconReqRew(icon);
};

Editor_Achievement.prototype.drawRewWeapon = function(x, y, itemId, amount, alias, advanced, icon, font) {
	itemId = { id: itemId, arr: $dataWeapons };
	this.drawRewItem(x, y, itemId, amount, alias, advanced, icon, font);
};

Editor_Achievement.prototype.drawRewArmor = function(x, y, itemId, amount, alias, advanced, icon, font) {
	itemId = { id: itemId, arr: $dataArmors };
	this.drawRewItem(x, y, itemId, amount, alias, advanced, icon, font);
};

Editor_Achievement.prototype.drawRewItem = function(x, y, itemId, amount, alias, advanced, icon, font) {
	if (typeof itemId === 'number') {
		var itemArray = $dataItems;
	} else {
		var itemArray = itemId.arr;
		itemId = itemId.id;
	}
	var item = itemArray[itemId];
	//Drawing texts and positioning buttons around them
	x += 35;
	this._reqRewInfoBase.bitmap.drawText('The party will earn', x, y, 430, 20);
	x += SMO.AM.textWidthEx('The party will earn', font, true) + 5;
	this._reqRewEntries[0].x = x;
	x += this._reqRewEntries[0].width + 6;
	this._reqRewBigSelector.x = x;
	//Providing initial values to other buttons
	this._reqRewEntries[0].y = y;
	this._reqRewEntries[0].value = amount;
	this._reqRewEntries[0].visible = true;
	this._reqRewBigSelector.y = y;
	this._reqRewBigSelector.setList(itemArray);
	this._reqRewBigSelector.selectItem(itemId-1, false);
	this._reqRewBigSelector.visible = true;
	this._customRewardEntry.value = advanced;
	this._aliasEntry.value = alias;
	this.selectIconReqRew(icon, item);
};

Editor_Achievement.prototype.drawRewCustom = function(x, y, itemId, amount, alias, advanced, icon, font) {
	x += 155;
	this._reqRewInfoBase.bitmap.drawText('No basic setup', x, y, 430, 20);
	this._customRewardEntry.value = advanced;
	this._aliasEntry.value = alias;
	this.selectIconReqRew(icon);
};

Editor_Achievement.prototype.refreshRewardInfo = function() {
	var x = 15;
	var y = 115;
	this._reqRewInfoBase.bitmap.clearRect(x, y - 10, 430, 40);
	var type = this._reqRewTypeList.selectedItemText();
	var originalFontSize = this._reqRewInfoBase.bitmap.fontSize;
	var font = { size: originalFontSize, face: this.fontFace };

	var reward = this.reward();
	var itemId = reward.itemId;
	var amount = String(reward.amount);
	var defAlias = type === 'Experience' ? (itemId < 0 ? 'experienceA' : 'experienceB') :
		type === 'Custom' ? 'custom(advanced)' : type.toLowerCase();
	var alias = reward.alias || SMO.AM.DefaultAlias.Reward[defAlias];
	var icon = reward.aliasIcon;
	var advanced = reward.advanced;
	this['drawRew'+type](x, y, itemId, amount, alias, advanced, icon, font);
	this._customRewardEntry.visible = true;
	this._reqRewInfoBase.bitmap.fontSize = originalFontSize;
};

Editor_Achievement.prototype.refreshRequirementInfo = function() {
	var x = 15;
	var y = 123;
	this._reqRewInfoBase.bitmap.clearRect(x, y, 415, 20);
	var originalFontSize = this._reqRewInfoBase.bitmap.fontSize;
	var font = { size:originalFontSize, face:this.fontFace };

	var type = this._reqRewTypeList.selectedItemText();
	var requirement = this.requirement();
	var itemId = requirement.itemId;
	var symbol = requirement.comparison;
	var value = requirement.tvalue();
	var defAlias = type === 'Party Member' ? (value ? 'party memberA' : 'party memberB') :
		type === 'Custom' ? 'custom(advanced)' : type.toLowerCase();
	var alias = requirement.alias || SMO.AM.DefaultAlias.Requirement[defAlias];
	var icon = requirement.aliasIcon;
	this['drawReq'+type.replace(' ', '')](x, y, itemId, symbol, value, alias, icon, font);
	this._currentValueEntry.visible = true;
	this._requiredValueEntry.visible = true;
	this._reqRewInfoBase.bitmap.fontSize = originalFontSize;
};

Editor_Achievement.prototype.drawReqPlaytime = function(x, y, itemId, symbol, value, alias, icon, font) {
	//Drawing texts and positioning buttons around them
	var texts = ['Playtime reaches', 'hours,', 'mins and'];
	for (var t = 0; t < 3; t++) {
		this._reqRewInfoBase.bitmap.drawText(texts[t], x, y, 430, 20);
		x += SMO.AM.textWidthEx(texts[t], font, true) + 5;
		this._reqRewEntries[t].x = x;
		x += this._reqRewEntries[t].width + 6;
		this._reqRewEntries[t].y = y;
		this._reqRewEntries[t].visible = true;
	}
	this._reqRewInfoBase.bitmap.drawText('secs', x, y, 430, 20);
	//Providing initial values to other buttons
	this._reqRewEntries[0].redefine({ filter:'number', maxValue:9999, description:'Hours (max: 9999)' });
	this._reqRewEntries[0].value = String(Math.floor(value/3600));
	this._reqRewEntries[1].redefine({ filter:'number', maxValue:59, description:'Minutes (max: 59)' });
	this._reqRewEntries[1].value = String(Math.floor((value/60) % 60));
	this._reqRewEntries[2].redefine({ filter:'number', maxValue:59, description:'Seconds (max: 59)' });
	this._reqRewEntries[2].value = String(value % 60);
	this._currentValueEntry.value = 'SMO.AM.playtime()';
	this._requiredValueEntry.value = String(value);
	this._aliasEntry.value = alias;
	//Redrawing the comparison and selection an icon button
	this.redrawComparisonSymbol('>=');
	this.selectIconReqRew(icon);
};

Editor_Achievement.prototype.drawReqWeapon = function(x, y, itemId, symbol, value, alias, icon, font) {
	itemId = { item: $dataWeapons[itemId], arr: '$dataWeapons' };
	this.drawReqItem(x, y, itemId, symbol, value, alias, icon, font);
};

Editor_Achievement.prototype.drawReqArmor = function(x, y, itemId, symbol, value, alias, icon, font) {
	itemId = { item: $dataArmors[itemId], arr: '$dataArmors' };
	this.drawReqItem(x, y, itemId, symbol, value, alias, icon, font);
};

Editor_Achievement.prototype.drawReqItem = function(x, y, itemId, symbol, value, alias, icon, font) {
	if (typeof itemId === 'number') {
		var item = $dataItems[itemId];
		var itemArray = '$dataItems';
	} else {
		var item = itemId.item;
		var itemArray = itemId.arr;
		itemId = item.id;
	}
	//Drawing texts and positioning buttons around them
	this._reqRewInfoBase.bitmap.drawText('Number of', x, y, 430, 20);
	x += SMO.AM.textWidthEx('Number of', font, true) + 5;
	this._reqRewBigSelector.x = x;
	x += this._reqRewBigSelector.width + 6;
	this._reqRewInfoBase.bitmap.drawText('owned is', x, y, 430, 20);
	x += SMO.AM.textWidthEx('owned is', font, true) + 5;
	this._reqRewSmallSelector.x = x;
	this._reqRewEntries[0].x = x + 6 + this._reqRewSmallSelector.width;
	//Providing initial values to other buttons
	value = String(value);
	var comparisons = ['=', '>', '≥', '<', '≤', '≠'];
	this._reqRewBigSelector.setList(window[itemArray]);
	this._reqRewBigSelector.selectItem(itemId - 1, false);
	this._reqRewBigSelector.y = y;
	this._reqRewBigSelector.visible = true;
	this._reqRewSmallSelector.setList(comparisons);
	this._reqRewSmallSelector.selectItemByName(symbol);
	this._reqRewSmallSelector.y = y;
	this._reqRewSmallSelector.visible = true;
	this._reqRewEntries[0].y = y;
	this._reqRewEntries[0].redefine({ filter:'number', maxValue:9999, description:'Number of items (max: 9999)' });
	this._reqRewEntries[0].value = value;
	this._reqRewEntries[0].visible = true;
	this._currentValueEntry.value = `$gameParty.numItems(${itemArray}[${item.id}])`;
	this._requiredValueEntry.value = value;
	this._aliasEntry.value = alias;
	var comparisonsB = ['==', '>', '>=', '<', '<=', '!='];
	this.redrawComparisonSymbol(comparisonsB[comparisons.indexOf(symbol)]);
	this.selectIconReqRew(icon, item);
};

Editor_Achievement.prototype.drawReqBattleCount = function(x, y, itemId, symbol, value, alias, icon, font) {
	var extras = { x:112, text:'Battle Count is', current:'$gameSystem.battleCount()', desc: 'Battle Counter' };
	this.drawReqSaveCount(x, y, itemId, symbol, value, alias, icon, font, extras);
};

Editor_Achievement.prototype.drawReqWinCount = function(x, y, itemId, symbol, value, alias, icon, font) {
	var extras = { x:123, text:'Win Count is', current:'$gameSystem.winCount()', desc: 'Win Counter' };
	this.drawReqSaveCount(x, y, itemId, symbol, value, alias, icon, font, extras);
};

Editor_Achievement.prototype.drawReqEscapeCount = function(x, y, itemId, symbol, value, alias, icon, font) {
	var extras = { x:112, text:'Escape Count is', current:'$gameSystem.escapeCount()', desc: 'Escape Counter' };
	this.drawReqSaveCount(x, y, itemId, symbol, value, alias, icon, font, extras);
};

Editor_Achievement.prototype.drawReqGoldGained = function(x, y, itemId, symbol, value, alias, icon, font) {
	var item = { iconIndex: SMO.AM.Icons.gold };
	var extras = { x:88, text:"Party's gold gained is", current:'$gameParty.goldGained()', item, desc: 'Total gold gained' };
	this.drawReqSaveCount(x, y, itemId, symbol, value, alias, icon, font, extras);
};

Editor_Achievement.prototype.drawReqGoldSpent = function(x, y, itemId, symbol, value, alias, icon, font) {
	var item = { iconIndex: SMO.AM.Icons.gold };
	var extras = { x:94, text:"Party's spent gold is", current:'$gameParty.goldSpent()', item, desc: 'Total gold spent' };
	this.drawReqSaveCount(x, y, itemId, symbol, value, alias, icon, font, extras);
};

Editor_Achievement.prototype.drawReqGold = function(x, y, itemId, symbol, value, alias, icon, font) {
	var item = { iconIndex: SMO.AM.Icons.gold };
	var extras = { x:114, text:"Party's gold is", current:'$gameParty.gold()', item, desc: 'Amount of Gold' };
	this.drawReqSaveCount(x, y, itemId, symbol, value, alias, icon, font, extras);
};

Editor_Achievement.prototype.drawReqSteps = function(x, y, itemId, symbol, value, alias, icon, font) {
	var extras = { x:88, text:"Player's step count is", current:'$gameParty.steps()', desc: 'Steps Counter' };
	this.drawReqSaveCount(x, y, itemId, symbol, value, alias, icon, font, extras);
};

Editor_Achievement.prototype.drawReqPartySize = function(x, y, itemId, symbol, value, alias, icon, font) {
	var extras = { x:112, text:"Party's size is", current:'$gameParty.size()', desc: 'Party Members' };
	this.drawReqSaveCount(x, y, itemId, symbol, value, alias, icon, font, extras);
};

Editor_Achievement.prototype.drawReqSaveCount = function(x, y, itemId, symbol, value, alias, icon, font, extras) {
	extras = extras || { x: 119, text: 'Save Count is', current: '$gameSystem.saveCount()', desc: 'Save Counter' };
	//Drawing texts and positioning buttons around them
	this._reqRewInfoBase.bitmap.drawText(extras.text, extras.x, y, 430, 20);
	extras.x += SMO.AM.textWidthEx(extras.text, font, true) + 5;
	this._reqRewSmallSelector.x = extras.x;
	this._reqRewEntries[0].x = extras.x + 5 + this._reqRewSmallSelector.width;
	//Providing initial values to other buttons
	value = String(value);
	var comparisons = ['=', '>', '≥', '<', '≤', '≠'];
	this._reqRewSmallSelector.setList(comparisons);
	this._reqRewSmallSelector.selectItemByName(symbol);
	this._reqRewSmallSelector.y = y;
	this._reqRewSmallSelector.visible = true;
	this._reqRewEntries[0].y = y;
	this._reqRewEntries[0].redefine({ filter:'number', maxValue:99999999, description:extras.desc+' (max: 99999999)' });
	this._reqRewEntries[0].value = value;
	this._reqRewEntries[0].visible = true;
	this._currentValueEntry.value = extras.current;
	this._requiredValueEntry.value = value;
	this._aliasEntry.value = alias;
	var comparisonsB = ['==', '>', '>=', '<', '<=', '!='];
	this.redrawComparisonSymbol(comparisonsB[comparisons.indexOf(symbol)]);
	this.selectIconReqRew(icon, extras.item);
};

Editor_Achievement.prototype.drawReqSwitch = function(x, y, itemId, symbol, value, alias, icon, font) {
	//Switches with no name receive the name: ''
	var switches = $dataSystem.switches.map(s => s || "''");
	switches.splice(0, 1);
	//Drawing texts and positioning buttons around them
	x = 80;
	this._reqRewInfoBase.bitmap.drawText('Switch', x, y, 430, 20);
	x += SMO.AM.textWidthEx('Switch', font, true) + 5;
	this._reqRewBigSelector.x = x;
	x += this._reqRewBigSelector.width + 5;
	this._reqRewInfoBase.bitmap.drawText('is', x, y, 430, 20);
	this._reqRewSmallSelector.x = x + 5 + SMO.AM.textWidthEx('is', font, true);
	//Providing initial values to other buttons
	this._reqRewBigSelector.y = y;
	this._reqRewBigSelector.setList(switches);
	this._reqRewBigSelector.selectItem(itemId - 1, false);
	this._reqRewBigSelector.visible = true;
	this._reqRewSmallSelector.y = y;
	this._reqRewSmallSelector.setList(['ON', 'OFF']);
	this._reqRewSmallSelector.selectItem(value ? 0 : 1, false);
	this._reqRewSmallSelector.visible = true;
	this._currentValueEntry.value = `$gameSwitches.value(${itemId})`;
	this._requiredValueEntry.value = value ? 'true' : 'false';
	this._aliasEntry.value = alias;
	this.redrawComparisonSymbol('==');
	this.selectIconReqRew(icon);
};

Editor_Achievement.prototype.drawReqVariable = function(x, y, itemId, symbol, value, alias, icon, font) {
	//Variables with no name receive the name: ''
	var variables = $dataSystem.variables.map(s => s || "''");
	variables.splice(0, 1);
	//Drawing texts and positioning buttons around them
	x = 40;
	this._reqRewInfoBase.bitmap.drawText('Variable', x, y, 430, 20);
	x += SMO.AM.textWidthEx('Variable', font, true) + 5;
	this._reqRewBigSelector.x = x;
	x += this._reqRewBigSelector.width + 5;
	this._reqRewInfoBase.bitmap.drawText('is', x, y, 430, 20);
	x += SMO.AM.textWidthEx('is', font, true) + 5;
	this._reqRewSmallSelector.x = x;
	this._reqRewEntries[0].x = x + 6 + this._reqRewSmallSelector.width;
	//Providing initial values to other buttons
	value = String(value);
	this._reqRewBigSelector.y = y;
	this._reqRewBigSelector.setList(variables);
	this._reqRewBigSelector.selectItem(itemId - 1, false);
	this._reqRewBigSelector.visible = true;
	var comparisons = ['=', '>', '≥', '<', '≤', '≠'];
	this._reqRewSmallSelector.y = y;
	this._reqRewSmallSelector.setList(comparisons);
	this._reqRewSmallSelector.selectItemByName(symbol);
	this._reqRewSmallSelector.visible = true;
	this._reqRewEntries[0].y = y;
	this._reqRewEntries[0].value = value;
	this._reqRewEntries[0].redefine({ filter:'number', maxValue:99999999, description:"Variable's value (max: 99999999)" });
	this._reqRewEntries[0].visible = true;
	this._currentValueEntry.value = `$gameVariables.value(${itemId})`;
	this._requiredValueEntry.value = value;
	this._aliasEntry.value = alias;
	var comparisonsB = ['==', '>', '>=', '<', '<=', '!='];
	this.redrawComparisonSymbol(comparisonsB[comparisons.indexOf(symbol)]);
	this.selectIconReqRew(icon);
};

Editor_Achievement.prototype.drawReqPartyMember = function(x, y, itemId, symbol, value, alias, icon, font) {
	//Actors with no name receive the name: ''
	var actors = $dataActors.map(s => s ? s.name || "''" : "''");
	actors.splice(0, 1);
	//Drawing texts and positioning buttons around them
	x = 40;
	this._reqRewInfoBase.bitmap.drawText('Actor', x, y, 430, 20);
	x += SMO.AM.textWidthEx('Actor', font, true) + 5;
	this._reqRewBigSelector.x = x;
	x += this._reqRewBigSelector.width + 5;
	this._reqRewSmallSelector.x = x;
	x += this._reqRewSmallSelector.width + 5;
	this._reqRewInfoBase.bitmap.drawText('on the party', x, y, 430, 20);
	//Providing initial values to other buttons
	this._reqRewBigSelector.y = y;
	this._reqRewBigSelector.setList(actors);
	this._reqRewBigSelector.selectItem(itemId - 1, false);
	this._reqRewBigSelector.visible = true;
	this._reqRewSmallSelector.y = y;
	this._reqRewSmallSelector.setList(['is', 'is not']);
	this._reqRewSmallSelector.selectItem(value ? 0 : 1, false);
	this._reqRewSmallSelector.visible = true;
	this._currentValueEntry.value = `$gameParty._actors.indexOf(${itemId}) > -1`;
	this._requiredValueEntry.value = value ? 'true' : 'false';
	this._aliasEntry.value = alias;
	this.redrawComparisonSymbol('==');
	this.selectIconReqRew(icon);
};

Editor_Achievement.prototype.drawReqPartyLevel = function(x, y, itemId, symbol, value, alias, icon, font) {
	var opt = ['Minimun', 'Medium', 'Maximun', 'Total'];
	//Drawing texts and positioning buttons around them
	x = 25;
	this._reqRewInfoBase.bitmap.drawText("Party's", x, y, 430, 20);
	x += SMO.AM.textWidthEx("Party's", font, true) + 5;
	this._reqRewBigSelector.x = x;
	x += this._reqRewBigSelector.width + 5;
	this._reqRewInfoBase.bitmap.drawText('level is', x, y, 430, 20);
	x += SMO.AM.textWidthEx('level is', font, true) + 5;
	this._reqRewSmallSelector.x = x;
	this._reqRewEntries[0].x = x + 5 + this._reqRewSmallSelector.width;
	//Providing initial values to other buttons
	var comparisons = ['=', '>', '≥', '<', '≤', '≠'];
	itemId = (itemId - 1).clamp(0, opt.length - 1);
	this._reqRewBigSelector._options._data.drawIds = false;
	this._reqRewBigSelector.y = y;
	this._reqRewBigSelector.setList(opt);
	this._reqRewBigSelector.selectItem(itemId, false);
	this._reqRewBigSelector.visible = true;
	this._reqRewSmallSelector.y = y;
	this._reqRewSmallSelector.setList(comparisons);
	this._reqRewSmallSelector.selectItemByName(symbol);
	this._reqRewSmallSelector.visible = true;
	this._reqRewEntries[0].y = y;
	this._reqRewEntries[0].redefine({ filter:'number', maxValue:999, description:"Target Level (max: 999)" });
	this._reqRewEntries[0].value = String(value);
	this._reqRewEntries[0].visible = true;
	var comparisonsB = ['==', '>', '>=', '<', '<=', '!='];
	var currentValue = itemId === 0 ? 'Math.min.apply(null, $gameParty.members().map(a => a.level))' :
		itemId === 1 ? '$gameParty.members().lenth > 0 ? Math.round($gameParty.members().reduce((a, v) => a.level + v.level)/$gameParty.members().length) : 0' :
		itemId === 2 ? 'Math.max.apply(null, $gameParty.members().map(a => a.level))' :
		'$gameParty.members().reduce((a, v) => a.level + v.level)';
	this._currentValueEntry.value = currentValue;
	this._requiredValueEntry.value = String(value);
	this._aliasEntry.value = alias;
	this.redrawComparisonSymbol(comparisonsB[comparisons.indexOf(symbol)]);
	this.selectIconReqRew(icon);
};

Editor_Achievement.prototype.drawReqCustom = function(x, y, itemId, symbol, value, alias, icon, font) {
	var comparisons = ['=', '>', '≥', '<', '≤', '≠'];
	this._reqRewInfoBase.bitmap.drawText('Custom conditions become TRUE', x, y, 430, 20, 'center');
	if (!this._reqRewTypeList._keepCustomValues) {
		var requirement = this.requirement();
		this._currentValueEntry.value = requirement.currentValue;
		this._requiredValueEntry.value = requirement.targetValueB;
		this._reqRewCustomSelector.selectItem(comparisons.indexOf(symbol), false);
		this._aliasEntry.value = alias;
	}
	this._reqRewCustomSelector.visible = true;
	this.selectIconReqRew(icon);
};

Editor_Achievement.prototype.redrawComparisonSymbol = function(symbol) {
	var originalFontSize = this._reqRewInfoBase.bitmap.fontSize;
	this._reqRewInfoBase.bitmap.clearRect(198, 183, 52, 25);
	this._reqRewInfoBase.bitmap.fontSize = 20;
	this._reqRewInfoBase.bitmap.drawText(symbol, 198, 183, 52, 25, 'center');
	this._reqRewInfoBase.bitmap.fontSize = originalFontSize;
};

Editor_Achievement.prototype.selectIconReqRew = function(iconIndex, item) {
	if (iconIndex > -1) {
		this._iconButtons[3][0].text = iconIndex;
		this.selectIconButton(3, 0);
	} else if (iconIndex === -1 || !item || item.iconIndex === -1) {
		this._iconButtons[3][0].text = '';
		this.selectIconButton(3, 1);
	} else {
		this._iconButtons[3][0].text = '';
		this._iconButtons[3][2].text = item.iconIndex;
		this.selectIconButton(3, 2);
	}
};

//========================================
// Achievement Editor - Item Management
//
// Creating/deleting achievements, rewards and requirements

Editor_Achievement.prototype.newAchievement = function() {
	var id = $dataAchievements.length + 1;
	if (id > 1000) {
		console.warn("You have created too many achievements... good job, but this is the limit.");
		return;
	}
	SMO.AM.AchievementBase['Name'] = 'Achiev ' + id;
	SMO.AM.AchievementBase['Category'] = $dataAchievsCategories.length ? $dataAchievsCategories[0].name : '';
	var achievement = new Achievement_Data(id, SMO.AM.AchievementBase);
	$dataAchievements.push(achievement);
	SMO.AM.DataDynamic.achievs.push({ state:0, date:0 });
	this.refreshAchievsList();
	var name = id + '. ' + achievement._name;
	if (name.length > 16) {
		name = name.substr(0, 13) + '...';
	}
	if (this._currentMenu !== 'main') {
		this._currentMenu = 'main';
	};
	if (this._moreOptBase.visible) {
		this.switchMoreOptions();
	}
	var index = this._achievsList.getIndexByString(name);
	this._achievsList.selectItem(index, false);
	SceneManager._scene.selectButton(this._nameInput);
	var cursor_x = this._nameInput.value.length;
	this._nameInput.setCursorAt(0, cursor_x);
	this._nameInput.setSelection(0, 0, cursor_x, 0);
	this._nameInput._selection.hold = false;
	this.addAction({
		id,
		type: 'CREATE'
	});
};

Editor_Achievement.prototype.confirmBeforeDeleting = function() {
	if (this._currentMenu === 'main') {
		var title = 'Deleting Achievement';
		var message = `Achievement: "${this._achievement._name}" (ID: ${this._achievement.id})\n`;
		message += 'Continue to delete it?';
		this._confirmMenu.showMessage(title, message, 'YES');
		this._cmConfirmButton.onClickSuccess = function() {
			SButton_Confirm.prototype.onClickSuccess.call(this);
			this.parent.parent.deleteAchievement();
			this.parent.visible = false;
		};
	} else {
		var objName = this._currentMenu === 'rewards' ? 'Reward' : 'Requirement';
		var obj = this._achievement[this._currentMenu][this._reqRewList._selectedIndexes[0]];
		var title = 'Deleting ' + objName;
		var message = `Achievement: "${this._achievement._name}" (ID: ${this._achievement.id})\n`;
		message += `${objName}: "${obj.getText()}"\n`;
		message += 'Continue to delete it?';
		this._confirmMenu.showMessage(title, message, 'YES');
		this._cmConfirmButton.onClickSuccess = function() {
			SButton_Confirm.prototype.onClickSuccess.call(this);
			this.parent.parent.deleteReqRew();
			this.parent.visible = false;
		};
	}
};

Editor_Achievement.prototype.deleteAchievement = function() {
	this._achievement.lock();
	this.addAction({
		id: this._achievement.id,
		type: 'DELETE'
	});
	$dataAchievements.delete(this._achievement);
	if (this._achievement.id <= $dataAchievements.length) {
		for (var a = this._achievement.id; a <= $dataAchievements.length; a++) {
			$dataAchievements[a-1].id--;
		}
	}
	SMO.AM.DataDynamic.achievs.splice(this._achievement.id-1, 1);
	this.refreshAchievsList();
};

Editor_Achievement.prototype.createNewReqRew = function() {
	if (this._currentMenu === 'rewards') {
		this.createNewReward();
	} else {
		this.createNewRequirement();
	}
};

Editor_Achievement.prototype.createNewReward = function() {
	if (this._achievement.rewards.length > 99) {
		console.warn("I believe the player has been rewarded enough, please no more rewards.");
		return;
	}
	var Reward = {
		type: 'gold',
		itemId: 1,
		amount: 5,
		advanced: '',
		alias: '',
		aliasIcon: -1
	};
	Reward = this._achievement.getRewardsMethods(Reward);
	this._achievement.rewards.push(Reward);
	function cb (r) {
		var icon = r.getIcon();
		return { 
			name: r.getText(),
			iconIndex: icon > -1 ? icon : -2
		};
	}
	var Rewards = this._achievement.rewards.map(cb);
	this._reqRewList.setItemList(Rewards);
	this._reqRewList.selectItem(this._reqRewList.items().length - 1, false);
	this.addAction({
		id: this._achievement.id,
		type: 'REWARD',
		subId: this._achievement.rewards.length,
		subType: 'CREATE'
	});
};

Editor_Achievement.prototype.createNewRequirement = function() {
	if (this._achievement.requirements.length > 99) {
		console.warn("That's waaay too many requirements buddy, I'll have to stop you there.");
		return;
	}
	var Requirement = {
		type: 'variable',
		itemId: 1, 
		comparison: '≥',
		alias: '',
		aliasIcon: -1,
		currentValue: '',
		targetValueA: '5',
		targetValueB: '',
		name: $dataSystem.variables[1]
	};
	Requirement = this._achievement.getRequirementsMethods(Requirement);
	this._achievement.requirements.push(Requirement);
	function cb (r) {
		var icon = r.getIcon();
		return { 
			name: r.getText(),
			iconIndex: icon > -1 ? icon : -2
		};
	}
	var Requirements = this._achievement.requirements.map(cb);
	this._reqRewList.setItemList(Requirements);
	this._reqRewList.selectItem(this._reqRewList.items().length - 1, false);
	this.addAction({
		id: this._achievement.id,
		type: 'REQUIREMENT',
		subId: this._achievement.requirements.length,
		subType: 'CREATE'
	});
};

Editor_Achievement.prototype.deleteReqRew = function() {
	var index = this._reqRewList._selectedIndexes[0];
	var reqRew = this._achievement[this._currentMenu][index];
	var type = this._currentMenu.toUpperCase().substr(0, this._currentMenu.length - 1); //removing the final "S"
	this._achievement[this._currentMenu].splice(index, 1);
	this._reqRewList.remove(index);
	this.addAction({
		id: this._achievement.id,
		type: type,
		subType: 'DELETE',
		subId: index + 1,
		text: reqRew.getText()
	})
};

//========================================
// Achievement Editor - Others

Editor_Achievement.prototype.currentMenu = function() {
	if (this._currentMenu === 'main') {
		return this._rightMenuBase;
	}
	return this._reqRewBase;
};

Editor_Achievement.prototype.achievement = function() {
	return this._achievement;
};

Editor_Achievement.prototype.requirement = function() {
	if (this._currentMenu !== 'requirements') return null;
	return this.achievement().requirements[this._reqRewList._selectedIndexes[0]];
};

Editor_Achievement.prototype.reward = function() {
	if (this._currentMenu !== 'rewards') return null;
	return this.achievement().rewards[this._reqRewList._selectedIndexes[0]];
};

Editor_Achievement.prototype.selectAchievementById = function(id) {
	var achiev = $gameSystem.achievement(id);
	if (!achiev) return;
	var name = achiev._name;
	var list_length = this._achievsList.items().length;
	var padding = String(list_length).length;
	id = id.padZero(padding);
	if (name.length > 16) {
		name = name.substr(0, 13) + '...';
	}
	var itemName = id + '. ' + name;
	var index = this._achievsList.getIndexByString(itemName);
	if (index !== this._achievsList._selectedIndexes[0]) {
		this._achievsList.selectItem(index, false, false);
	}
};

Editor_Achievement.prototype.undoLastAction = function(action) {
	if (!action) return;
	this._skipAction = true;
	switch(action.type) {
	case 'Name':
		this.selectAchievementById(action.id);
		this.changeAchievNameTo(action.oldValue);
		this._nameInput.value = action.oldValue;
		break;
	case 'Visibility':
		this.selectAchievementById(action.id);
		var index = action.oldValue === 'visible' ? 0 : action.oldValue === 'secret' ? 1 : 2;
		this._visibilitySelect.selectItem(index);
		break;
	}
	this._skipAction = false;
	this._undoneActions.push(action);
};

Editor_Achievement.prototype.addAction = function(action) {
	if (this._skipAction) return;
	this._saveButton.enabled = true;
	this._seeChangesButton.enabled = true;

	if (!SMO.AM.AchievsEditorActions[action.id]) {
		let name = action.type === 'Name' ? action.old : $gameSystem.achievement(action.id)._name;
		SMO.AM.AchievsEditorActions[action.id] = { name };
	}

	if (action.type === 'REWARD' || action.type === 'REQUIREMENT') {
		return this.addReqRewAction(action);
	}

	if (action.type === 'DELETE') { //Achievement deleted
		if ('CREATE' in SMO.AM.AchievsEditorActions[action.id]) { //Created and deleted, just pretend it never happened
			delete SMO.AM.AchievsEditorActions[action.id];
			this.refreshSaveButtonState();
			return;
		}
		let name = SMO.AM.AchievsEditorActions[action.id].name;
		delete SMO.AM.AchievsEditorActions[action.id];
		let keys = Object.keys(SMO.AM.AchievsEditorActions).filter(k => k[0] !== 'd' && k > action.id).sort();
		SMO.AM.AchievsEditorActions[`d${this._deletions}`] = { name }; //deleted tag: d[deleteId]
		this._deletions++;
		//The actions with ID higher than the deleted achievement's must have their ID decreased by 1
		if (keys.length) {
			for (var a = 0; a < keys.length; a++) {
				SMO.AM.AchievsEditorActions[keys[a]-1] = SMO.AM.AchievsEditorActions[keys[a]];
			}
			delete SMO.AM.AchievsEditorActions[keys.last()];
		}
		return;
	}

	var base = SMO.AM.AchievsEditorActions[action.id];
	if (!base[action.type]) {
		base[action.type] = {
			old: action.old,
			new: action.new
		};
		return;
	}

	if (base[action.type].old === action.new) {
		delete base[action.type]; //action reverted, just pretend it never happened
		if (Object.keys(base).length < 2) {
			delete SMO.AM.AchievsEditorActions[action.id];
			this.refreshSaveButtonState();
		}
		return;
	} else {
		base[action.type].new = action.new; //update the new value, but keep the oldest one
	}
};

Editor_Achievement.prototype.addReqRewAction = function(action) {
	var base = SMO.AM.AchievsEditorActions[action.id];
	base[action.type] = base[action.type] || {};
	if (!base[action.type][action.subId]) {
		base[action.type][action.subId] = {};
	}

	if (action.subType === 'DELETE') {
		if (!base[action.type][action.subId]['CREATE']) {
			base[action.type]['d' + this._deletions] = action.text;
			this._deletions++;
		}
		delete base[action.type][action.subId];
		var reqRewKeys = Object.keys(base[action.type]);
		if (reqRewKeys.length < 1) {
			delete base[action.type];
			if (Object.keys(base).length < 2) {
				delete SMO.AM.AchievsEditorActions[action.id];
				this.refreshSaveButtonState();
			}
		} else {
			reqRewKeys = reqRewKeys.filter(k => k[0] !== 'd' && k > action.subId);
			if (reqRewKeys.length) {
				for (var a = 0; a < reqRewKeys.length; a++) {
					base[action.type][reqRewKeys[a]-1] = base[action.type][reqRewKeys[a]];
				}
				delete base[action.type][reqRewKeys.last()];
			}
		}
		return;
	}

	if (!base[action.type][action.subId][action.subType]) {
		if (action.subType === 'CREATE') {
			base[action.type][action.subId]['CREATE'] = 1;
		} else {
			base[action.type][action.subId][action.subType] = {old: action.old, new: action.new};
		}
	}

	if (action.subType === 'CREATE') {
		base[action.type][action.subId]['CREATE'] = 1;
		return;
	}

	if (base[action.type][action.subId][action.subType].old === action.new) {
		delete base[action.type][action.subId][action.subType];
		if (Object.keys(base[action.type][action.subId]).length < 1) {
			delete base[action.type][action.subId];
			if (Object.keys(base[action.type]).length < 1) {
				delete base[action.type];
				if (Object.keys(base).length < 2) {
					delete SMO.AM.AchievsEditorActions[action.id];
					this.refreshSaveButtonState();
				}
			}
		}
		return;
	} else {
		//Update the new value but keep the oldest one for this property
		base[action.type][action.subId][action.subType].new = action.new;
	}
};

Editor_Achievement.prototype.refreshSaveButtonState = function() {
	if (Object.keys(SMO.AM.AchievsEditorActions).length < 1) {
		this._saveButton.enabled = false;
		this._seeChangesButton.enabled = false;
	} else {
		this._saveButton.enabled = true;
		this._seeChangesButton.enabled = true;
	}
};

Editor_Achievement.prototype.refreshAchievementsWindow = function() {
	if (!SMO.AM.isAchievementsScene()) return;
	if (!this.isCurrentCategoryOpen()) return;
	SceneManager._scene._achievementsWindow.refresh();
};

Editor_Achievement.prototype.isCurrentCategoryOpen = function() {
	return this._achievement.categories.contains(SMO.AM.currentCategory.name);
};

Editor_Achievement.prototype.saveData = function() {
	DataManager.saveAchievsFromEditor();
	this.informCategoryEditor();
	SoundManager.playSave();
	SMO.AM.AchievsEditorActions = {};
	this._deletions = 0;
	this._saveButton.enabled = false;
	this._seeChangesButton.enabled = false;
	this._saveButton.text = 'SAVED!';
	this._saveButton._saveMsgDelay = 90;
};

Editor_Achievement.prototype.informCategoryEditor = function() {
	var catEditor = this._topStack ? this._topStack._categoryEditor : null;
	if (catEditor && catEditor._achievsDataChanged) {
		catEditor._achievsDataChanged = false;
	}
};

Editor_Achievement.prototype.applyReqRewInfo = function() {
	var changed = false;
	if (this._currentMenu === 'rewards') {
		changed = this.applyRewardChanges(this._reqRewList._selectedIndexes[0]);
	} else {
		changed = this.applyRequirementChanges(this._reqRewList._selectedIndexes[0]);
	}
	if (changed) {
		this._reqRewApplyButton.text = 'APPLIED!';
	} else {
		this._reqRewApplyButton.text = 'NO CHANGES';
	}
	this._reqRewApplyButton._msgDelay = 90;
};

//Method - applyRewardChanges
// * Passes the selected values to the current reward and redraws the menu
Editor_Achievement.prototype.applyRewardChanges = function(index) {
	var achievement = this._achievement;
	var rew = achievement.rewards[index];
	var type = this._reqRewTypeList.selectedItemText();
	var DefAlias = SMO.AM.DefaultAlias.Reward;
	var aliasText = this._aliasEntry.value;
	var anyIconSelected = this._iconButtons[3][0].borderColor === '#ffffff';
	var noIconSelected = this._iconButtons[3][1].borderColor === '#ffffff';
	var defIconSelected = this._iconButtons[3][2].borderColor === '#ffffff';
	var aliasIconText = anyIconSelected ? this._iconButtons[3][0].text : noIconSelected ? -1 : -2;

	var itemId = rew.itemId;
	var amount = rew.amount;
	var advanced = rew.advanced;
	var alias = rew.alias;
	var aliasIcon = rew.aliasIcon;
	switch(type) {
	case 'Gold':
		amount = this._reqRewEntries[0].value;
		advanced = this._customRewardEntry.value;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Item':
	case 'Weapon':
	case 'Armor':
		itemId = this._reqRewBigSelector.selectedIndexes()[0] + 1;
		amount = this._reqRewEntries[0].value;
		advanced = this._customRewardEntry.value;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Experience':
		var newItemId = this._reqRewBigSelector.selectedIndexes()[0] + 1;
		var aliasType = 'experienceA';
		if ($dataActors.length - 1 < newItemId) {
			newItemId = $dataActors.length - newItemId - 1; //Party Leader, All Party
			aliasType = 'experienceB';
		}
		itemId = newItemId;
		amount = this._reqRewEntries[0].value;
		advanced = this._customRewardEntry.value;
		alias = aliasText === DefAlias[aliasType] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Custom':
		type = 'custom(advanced)';
		advanced = this._customRewardEntry.value;
		alias = aliasText === DefAlias[type] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	}
	type = type.toLowerCase();
	itemId = Number(itemId);
	amount = Number(amount);
	aliasIcon = Number(aliasIcon);
	var isChanged = false;
	if (rew.type !== type) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REWARD',
			subId: index + 1,
			subType: 'TYPE',
			old: rew.type,
			new: type
		});
	}
	if (rew.itemId !== itemId) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REWARD',
			subId: index + 1,
			subType: 'ITEM ID',
			old: rew.itemId,
			new: itemId
		});
	}
	if (rew.amount !== amount) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REWARD',
			subId: index + 1,
			subType: 'AMOUNT',
			old: rew.amount,
			new: amount
		});
	}
	if (rew.advanced !== advanced) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REWARD',
			subId: index + 1,
			subType: 'ADVANCED',
			old: rew.advanced,
			new: advanced
		});
	}
	if (rew.alias !== alias) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REWARD',
			subId: index + 1,
			subType: 'ALIAS',
			old: rew.alias,
			new: alias
		});
	}
	if (rew.aliasIcon !== aliasIcon) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REWARD',
			subId: index + 1,
			subType: 'ALIAS ICON',
			old: rew.aliasIcon,
			new: aliasIcon
		});
	}
	if (!isChanged) return false;
	var Reward = {
		type,
		itemId,
		amount,
		advanced,
		alias,
		aliasIcon
	};
	Reward = achievement.getRewardsMethods(Reward);
	achievement.rewards.splice(index, 1, Reward);
	var icon = Reward.getIcon();
	this._reqRewList._items.splice(index, 1, {text: Reward.getText(), iconIndex: icon > -1 ? icon : -2});
	this._reqRewList.redrawItem(index);
	this.resetReqRewTools();
	this.refreshRewardInfo();
	return true;
};

//Method - applyRequirementChanges
// * Passes the selected values to the current requirement and redraws the menu
Editor_Achievement.prototype.applyRequirementChanges = function(index) {
	var achievement = this._achievement;
	var req = achievement.requirements[index];
	var type = this._reqRewTypeList.selectedItemText();
	var DefAlias = SMO.AM.DefaultAlias.Requirement;
	var aliasText = this._aliasEntry.value;
	var anyIconSelected = this._iconButtons[3][0].borderColor === '#ffffff';
	var noIconSelected = this._iconButtons[3][1].borderColor === '#ffffff';
	var defIconSelected = this._iconButtons[3][2].borderColor === '#ffffff';
	var aliasIconText = anyIconSelected ? this._iconButtons[3][0].text : noIconSelected ? -1 : -2;

	var itemId = req.itemId;
	var comparison = req.comparison;
	var alias = req.alias;
	var aliasIcon = req.aliasIcon;
	var currentValue = req.currentValue; //advanced
	var targetValueA = req.targetValueA;
	var targetValueB = req.targetValueB; //advanced
	switch(type) {
	case 'Variable':
		itemId = this._reqRewBigSelector.selectedIndexes()[0] + 1;
		comparison = this._reqRewSmallSelector.currentValue();
		targetValueA = this._reqRewEntries[0].value;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Switch':
		itemId = this._reqRewBigSelector.selectedIndexes()[0] + 1;
		comparison = '=';
		targetValueA = this._reqRewSmallSelector.currentValue() === 'ON' ? true : false;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Item':
	case 'Weapon':
	case 'Armor':
		itemId = this._reqRewBigSelector.selectedIndexes()[0] + 1;
		comparison = this._reqRewSmallSelector.currentValue();
		targetValueA = this._reqRewEntries[0].value;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Gold Gained':
	case 'Gold Spent':
	case 'Gold':
		comparison = this._reqRewSmallSelector.currentValue();
		targetValueA = this._reqRewEntries[0].value;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Steps':
		comparison = this._reqRewSmallSelector.currentValue();
		targetValueA = this._reqRewEntries[0].value;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Playtime':
		comparison = '≥';
		var hours = this._reqRewEntries[0].value * 3600;
		var mins = this._reqRewEntries[1].value * 60;
		targetValueA = Number(this._reqRewEntries[2].value) + mins + hours;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Save Count':
	case 'Battle Count':
	case 'Win Count':
	case 'Escape Count':
	case 'Party Size':
		comparison = this._reqRewSmallSelector.currentValue();
		targetValueA = this._reqRewEntries[0].value;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Party Member':
		itemId = this._reqRewBigSelector.selectedIndexes()[0] + 1;
		comparison = '=';
		targetValueA = this._reqRewSmallSelector.currentValue() === 'is' ? true : false;
		alias = aliasText === DefAlias[targetValueA ? 'party memberA' : 'party memberB'] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Party Level':
		itemId = this._reqRewBigSelector.selectedIndexes()[0] + 1;
		comparison = this._reqRewSmallSelector.currentValue();
		targetValueA = this._reqRewEntries[0].value;
		alias = aliasText === DefAlias[type.toLowerCase()] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	case 'Custom':
		var comparisonsA = ['=', '>', '≥', '<', '≤', '≠'];
		var comparisonsB = ['==', '>', '>=', '<', '<=', '!='];
		type = 'custom(advanced)';
		currentValue = this._currentValueEntry.value;
		comparison = comparisonsA[comparisonsB.indexOf(this._reqRewCustomSelector.currentValue())];
		targetValueB = this._requiredValueEntry.value;
		alias = aliasText === DefAlias['custom(advanced)'] ? '' : aliasText;
		aliasIcon = aliasIconText;
		break;
	}
	type = type.toLowerCase();
	itemId = Number(itemId);
	aliasIcon = Number(aliasIcon);
	var isChanged = false;
	if (req.type !== type) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REQUIREMENT',
			subId: index + 1,
			subType: 'TYPE',
			old: req.type,
			new: type
		});
	}
	if (req.itemId !== itemId) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REQUIREMENT',
			subId: index + 1,
			subType: 'ITEM ID',
			old: req.itemId,
			new: itemId
		});
	}
	if (req.comparison !== comparison) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REQUIREMENT',
			subId: index + 1,
			subType: 'COMPARISON',
			old: req.comparison,
			new: comparison
		});
	}
	if (req.alias !== alias) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REQUIREMENT',
			subId: index + 1,
			subType: 'ALIAS',
			old: req.alias,
			new: alias
		});
	}
	if (req.aliasIcon !== aliasIcon) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REQUIREMENT',
			subId: index + 1,
			subType: 'ALIAS ICON',
			old: req.aliasIcon,
			new: aliasIcon
		});
	}
	if (req.currentValue !== currentValue) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REQUIREMENT',
			subId: index + 1,
			subType: 'CURRENT VALUE',
			old: req.currentValue,
			new: currentValue
		});
	}
	if (req.targetValueA !== targetValueA) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REQUIREMENT',
			subId: index + 1,
			subType: 'TARGET VALUE',
			old: req.targetValueA,
			new: targetValueA
		});
	}
	if (req.targetValueB !== targetValueB) {
		isChanged = true;
		this.addAction({
			id: this._achievement.id,
			type: 'REQUIREMENT',
			subId: index + 1,
			subType: 'REQUIRED VALUE',
			old: req.targetValueB,
			new: targetValueB
		});
	}
	if (!isChanged) return false;
	var Requirement = {
		type: type.toLowerCase(),
		itemId: Number(itemId),
		comparison,
		alias,
		aliasIcon: Number(aliasIcon),
		currentValue,
		targetValueA,
		targetValueB,
		name: ''
	}
	Requirement = this._achievement.getRequirementsMethods(Requirement);

	achievement.requirements.splice(index, 1, Requirement);
	var icon = Requirement.getIcon();
	this._reqRewList._items.splice(index, 1, {text: Requirement.getText(), iconIndex: icon > -1 ? icon : -2});
	this._reqRewList.redrawItem(index);
	this.resetReqRewTools();
	this.refreshRequirementInfo();
	return true;
};

Editor_Achievement.prototype.onReqOrRewSelected = function(index) {
	var achiev = this._achievement;
	var redraw = true;
	var currentType = this._reqRewTypeList.selectedItemText();
	var obj = this._currentMenu === 'rewards' ? achiev.rewards[index] : achiev.requirements[index];
	if (obj.type === 'custom(advanced)') {
		if (currentType !== 'Custom') {
			this._reqRewTypeList.selectItemByName('custom');
			redraw = false;
		}
	} else {
		if (!currentType || currentType.toLowerCase() !== obj.type) {
			this._reqRewTypeList.selectItemByName(obj.type);
			redraw = false;
		}
	}
	this._reqRewInfoBase.visible = true;
	if (redraw) {
		this.refreshReqRewInfo();
	}
};

//Method - changeAchievNameTo
// * Changes the name of the currently selected achievement
// * String: name -> the achievement's new name
Editor_Achievement.prototype.changeAchievNameTo = function(name) {
	var achievement = this._achievement;
	if (achievement._name === name) return;
	var oldValue = achievement._name;
	achievement.name = name;
	if (this._sortAchievButton.currentValue() === 'A-z') {
		this.refreshAchievsList();
		this._achievement = achievement;
		var padding = String($dataAchievements.length).length;
		var realName = String(achievement.id).padZero(padding) + '. ' + name;
		if (realName.length > 16) {
			realName = realName.substr(0, 13) + '...';
		}
		this._achievsList.selectItem(this._achievsList.getIndexByString(realName), false, false);
	} else {
		var padding = String($dataAchievements.length).length;
		var realName = String(achievement.id).padZero(padding) + '. ' + name;
		if (realName.length > 16) {
			realName = realName.substr(0, 13) + '...';
		}
		var index = this._achievsList._selectedIndexes[0];
		this._achievsList._items[index].text = realName;
		this._achievsList.redrawItem(index);
	}
	var action = {
		id: this._achievement.id,
		type: 'NAME',
		old: oldValue,
		new: this._achievement._name
	};
	this.addAction(action);
	this.redrawAchievOnWindow();
};

//Method - lockSwitch
// * If the current achievement is locked -> unlock it or vice-versa
Editor_Achievement.prototype.lockSwitch = function() {
	var achievement = this._achievement;
	if (achievement.isUnlocked()) {
		achievement.lock();
		this._lockButton.text = 'Unlock';
	} else {
		achievement.unlock();
		this._lockButton.text = 'Lock';
	}
};

Editor_Achievement.prototype.switchMoreOptions = function() {
	if (this._moreOptBase.visible) {
		this._moreOptBase.visible = false;
		this._rightMenuBase.visible = true;
	} else {
		this._moreOptBase.visible = true;
		this._rightMenuBase.visible = false;
	}
};

Editor_Achievement.prototype.onHideProgress = function() {
	var oldValue = this._achievement.hideProgress;
	var newValue = !oldValue;
	this._achievement.hideProgress = newValue;
	this._hideProgressButton.text = newValue ? 'YES' : 'NO';
	this.addAction({
		id: this._achievement.id,
		type: 'HIDE PROGRESS',
		old: oldValue,
		new: newValue
	});
	this.redrawAchievOnWindow();
};

//Method - resetReqRewTools
// * Sets common buttons used on the requirements/rewards menu to their default state
// * preparing them to be realocated
Editor_Achievement.prototype.resetReqRewTools = function() {
	this._customRewardEntry.visible = false;
	this._reqRewSmallSelector.visible = false;
	this._reqRewCustomSelector.visible = false;
	this._currentValueEntry.visible = false;
	this._requiredValueEntry.visible = false;
	this._reqRewBigSelector.visible = false;
	this._reqRewBigSelector._options._data.drawIds = true;
	this._reqRewEntries.forEach(function(t) {
		t.visible = false;
		t._data.filter = '';
		t._data.maxValue = 0;
		t._data.maxDigits = 0;
		t._data.description = '';
	});
	this._iconButtons[3][2].text = '';
};

Editor_Achievement.prototype.refreshCategories = function() {
	var refreshSelectedCategories = function() {
		if (!this._mainLoaded) return;
		var selectedItems = this._categorySelect._options.getSelectedItemsTexts();
		if (!this._achievement.categories.equals(selectedItems)) {
			this._categorySelect.deselectAllItems();
			this._categorySelect._skipExtraChanges = true;
			for (var c = 0; c < this._achievement.categories.length; c++) {
				this._categorySelect.selectItemByName(this._achievement.categories[c], true);
			}
			this._categorySelect._skipExtraChanges = false
		}
	}.bind(this);

	var categories = $dataAchievsCategories.map(a => a.name);
	if (categories.equals(this._categories)) {
		refreshSelectedCategories();
	} else {
		this._categories = categories;
		this._categorySelect.setList(categories);
		if (this._sortAchievButton.currentValue() === 'Category') {
			this.refreshAchievsList();
		} else {
			refreshSelectedCategories();
		}
	}
};

Editor_Achievement.prototype.open = function() {
	SWindow_Base.prototype.open.call(this);
	this.refreshCategories();
	this.refreshSaveButtonState();
	if (this._isSelectorOpen) {
		this._isSelectorOpen = false;
		return;
	}
};

Editor_Achievement.prototype.close = function() {
	SWindow_Base.prototype.close.call(this);
	if (!this._isSelectorOpen && this._topStack) {
		this._topStack.open();
		this._topStack._isSelectorOpen = false;
	}
};

//Method - selectIconButton
// * Within an array, 1 botton is activated while the other two are deactivated
// * E.G. If you select the "No Icon" button, the "Select icon" and the "Default" buttons will be deact.
Editor_Achievement.prototype.selectIconButton = function(index1, index2) {
	var activeColor = '#ffffff';
	var deactivatedColor = '#555555';
	var icons = ['locked', 'unlocked', 'secret'];
	for (var i = 0; i < 3; i++) {
		if (i === index2) {
			this._iconButtons[index1][i].borderColor = activeColor;
			this._iconButtons[index1][i].textColor = activeColor;
			if (index2 && index1 < 3) {
				var oldValue = this._achievement.icon[icons[index1]];
				this._achievement.icon[icons[index1]] = -index2;
				var newValue = -index2;
				if (oldValue !== newValue) {
					let action = {
						id: this._achievement.id,
						type: 'ALIAS ICON (' + icons[index1].toUpperCase() + ')',
						old: oldValue,
						new: newValue
					};
					this.addAction(action);
				}
				this.redrawAchievOnWindow();
			}
		} else {
			this._iconButtons[index1][i].borderColor = deactivatedColor;
			this._iconButtons[index1][i].textColor = deactivatedColor;
		}
	}
};

//==========================================================================================
// Menu Editor - Create
//==========================================================================================
function Editor_AchievsMenu() {
	this.initialize.apply(this, arguments);
}

Editor_AchievsMenu.prototype = Object.create(SWindow_Base.prototype);
Editor_AchievsMenu.prototype.constructor = Editor_AchievsMenu;

//========================================
// Menu Editor - Initialize

Editor_AchievsMenu.prototype.initialize = function() {
	var width = 400;
	var height = 480;
	var data = {
		title: 'Menu Editor',
		titleBackground: '#1a1a33',
		x: Math.ceil((Graphics.width - width)/2),
		y: Math.ceil((Graphics.height - height)/2),
		width: width,
		height: height,
		backColor: '#222244',
		hideSelect: true,
		fontSize: 16
	};
	SWindow_Base.prototype.initialize.call(this, data);
};

Editor_AchievsMenu.prototype.initValues = function(data) {
	SWindow_Base.prototype.initValues.call(this, data);
	this._isSelectorOpen = false;
	this._fixedTone = true;
	this._windows = null;
	this._selectedWindow = null;
	this._selectorCaller = '';
	this._hidden = false;
};

Editor_AchievsMenu.prototype.initTools = function() {
	SWindow_Base.prototype.initTools.call(this);
	this.initTopButtons();
	this.initMainButtons();
	this.drawMainTextsAndBackground();
};

Editor_AchievsMenu.prototype.initTopButtons = function() {
	var buttonData = {
		text: '2',
		textAlign: 'center',
		fontSize: 12,
		x: 3,
		y: 3,
		width: 19,
		height: 19,
		backColor: '#333370',
		borderColor: '#dddddd',
		borderSize: 3,
		hideSelect: true,
		cursorStyle: 'pointer',
		onClick: this.switchHideWindowSelector.bind(this)
	};
	buttonData.description =  "Change the state of the window selector\n";
	buttonData.description += "1 -> Deactivated    |    2 -> Blinking \n";
	buttonData.description += "3 -> Normal                            ";
	this._hideButton = new SButton_Confirm(buttonData);
	this.addChild(this._hideButton);
};

Editor_AchievsMenu.prototype.switchHideWindowSelector = function(type) {
	if (type && type === this._hideButton.text) return;
	var condition1 = type ? type === '2' : this._hideButton.text === '1';
	var condition2 = type ? type === '3' : this._hideButton.text === '2';
	if (condition1) {
		this._hideButton.text = '2';
		this._hideButton.borderColor = '#dddddd';
		SceneManager._scene._windowSelector.visible = true;
		SceneManager._scene._windowSelector.hidding = false;
		SceneManager._scene._windowSelector.toneFixed = false;
	} else if (condition2) {
		this._hideButton.text = '3';
		this._hideButton.borderColor = '#ffffff';
		SceneManager._scene._windowSelector.visible = true;
		SceneManager._scene._windowSelector.hidding = false;
		SceneManager._scene._windowSelector.toneFixed = true;
	} else {
		this._hideButton.text = '1';
		this._hideButton.borderColor = '#777777';
		SceneManager._scene._windowSelector.visible = false;
		SceneManager._scene._windowSelector.hidding = true;
		SceneManager._scene._windowSelector.toneFixed = false;
	}
};

Editor_AchievsMenu.prototype.initMainButtons = function() {
	var chooseWindowData = {
		x: 10,
		y: 45,
		width: this.width - 20,
		height: 44,
		itemHeight: 20,
		fontSize: 15,
		backColor: '#111122',
		hideSelect: true,
		itemColors: ['#222255', '#292977']
	};
	this._windowSelectList = new Sprite_ItemList(chooseWindowData, 4);
	this._windowSelectList.onItemSelected = function(index) {
		Sprite_ItemList.prototype.onItemSelected.call(this, index);
		this.parent.selectWindow(this._items[index].text.replace(' ', ''));
	};
	this._windowSelectList.selectItemAbove = function() {};
	this._windowSelectList.selectNextItem = function() {};
	this._windowSelectList.selectItemBeneath = function() {};
	this._windowSelectList.selectPreviousItem = function() {};
	this.addChild(this._windowSelectList);

	var entryData = {
		description: 'X Coordinate',
		x: 30,
		y: 116,
		width: 160,
		height: 20,
		fontSize: 15,
		backColor: '#111122',
		design: 'round-rect',
		textOffset: [0, -2]
	};
	this._xEntry = new SButton_Text(entryData);
	this._xEntry.formatValue = function() {
		try {
			var value = this.value;
			var n = Number(eval(value));
			if (isNaN(n)) {
				console.warn('The script for the X coordinate should result on a number.');
				console.warn('Script: ' + value);
				console.warn('Evaluation: ' + n);
				this.value = '0';
			}
		} catch(e) {
			console.error('Error on the script for the X coordinate: ' + value);
			console.error(e);
			this.value = '0';
		}
	};
	this._xEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		var value = this.value;
		$dataAchievsMenu[this.parent._selectedWindow._name].x = value;
		SceneManager._scene._windowSelector.x = eval(value);
		this.parent._selectedWindow.defineSetting('x', value, true);
	};
	this._xEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this.addChild(this._xEntry);

	entryData.y = 144;
	entryData.description = 'Y Coordinate';
	this._yEntry = new SButton_Text(entryData);
	this._yEntry.formatValue = function() {
		try {
			var value = this.value;
			if (!value) return this.value = '0';

			var n = Number(eval(value));
			if (isNaN(n)) {
				console.warn('The script for the Y coordinate should result on a number.');
				console.warn('Script: ' + value);
				console.warn('Evaluation: ' + n);
				this.value = '0';
			}
		} catch(e) {
			console.error('Error on the script for the Y coordinate: ' + value);
			console.error(e);
			this.value = '0';
		}
	};
	this._yEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		var value = this.value;
		$dataAchievsMenu[this.parent._selectedWindow._name].y = value;
		SceneManager._scene._windowSelector.y = eval(value);
		this.parent._selectedWindow.defineSetting('y', value, true);
	};
	this._yEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this.addChild(this._yEntry);

	entryData.x = 225;
	entryData.y = 116;
	entryData.description = 'Width';
	this._wEntry = new SButton_Text(entryData);
	this._wEntry.formatValue = function() {
		var value = this.value;
		if (!value) return this.value = '0';
		try {
			var n = Number(eval(value));
			if (isNaN(n)) {
				console.warn('The script for the width should result on a number.');
				console.warn('Script: ' + value);
				console.warn('Evaluation: ' + n);
				this.value = '0';
			}
		} catch(e) {
			console.error('Error on the script for the width: ' + value);
			console.error(e);
			this.value = '0';
		}
	};
	this._wEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		var value = this.value;
		var evalValue = eval(value);
		this.parent._selectedWindow.defineSetting('width', value, true);
		if (evalValue != SceneManager._scene._windowSelector.width) {
			SceneManager._scene._windowSelector.width = evalValue;
			SceneManager._scene._windowSelector.redraw();
			SceneManager._scene._windowSelector.refreshDefaultSize();
		}
	};
	this._wEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this.addChild(this._wEntry);

	entryData.y = 144;
	entryData.description = 'Height';
	this._hEntry = new SButton_Text(entryData);
	this._hEntry.formatValue = function() {
		try {
			var value = this.value;
			if (!value) return this.value = '10';
			
			var n = Number(eval(value));
			if (isNaN(n)) {
				console.warn('The script for the height should result on a number.');
				console.warn('Script: ' + value);
				console.warn('Evaluation: ' + n);
				this.value = '10';
			}
		} catch(e) {
			console.error('Error on the script for the height: ' + value);
			console.error(e);
			this.value = '10';
		}
	};
	this._hEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		var value = this.value;
		var evalValue = eval(value);
		this.parent._selectedWindow.defineSetting('height', value, true);
		if (evalValue != SceneManager._scene._windowSelector.height) {
			SceneManager._scene._windowSelector.height = evalValue;
			SceneManager._scene._windowSelector.redraw();
			SceneManager._scene._windowSelector.refreshDefaultSize();
		}
	};
	this._hEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this.addChild(this._hEntry);

	entryData.x = 30;
	entryData.y = 196;
	entryData.description = 'Font Face';
	this._ffEntry = new SButton_Text(entryData);
	this._ffEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent._selectedWindow.defineSetting('fontFace', this.value, true);
	};
	this._ffEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this.addChild(this._ffEntry);

	entryData.y = 224;
	entryData.width = 150;
	entryData.description = 'Font Size';
	entryData.filter = 'number';
	this._fsEntry = new SButton_Text(entryData);
	this._fsEntry._arrows[0]._data.cursorStyle = 'pointer';
	this._fsEntry._arrows[1]._data.cursorStyle = 'pointer';
	this._fsEntry.onUpArrowClick = function() {
		SButton_Text.prototype.onUpArrowClick.call(this);
		this.parent._selectedWindow.defineSetting('fontSize', Number(this.value), true);
	};
	this._fsEntry.onDownArrowClick = function() {
		SButton_Text.prototype.onDownArrowClick.call(this);
		this.parent._selectedWindow.defineSetting('fontSize', Number(this.value), true);
	};
	this._fsEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent._selectedWindow.defineSetting('fontSize', Number(this.value), true);
	};
	this._fsEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this.addChild(this._fsEntry);

	var buttonData = {
		textAlign: 'center',
		description: 'Window Skin (loaded from img/system)',
		x: 225,
		y: 196,
		width: 160,
		height: 20,
		fontSize: 14,
		backColor: '#151560',
		design: 'round-rect',
		onClick: (() => this.startImageSelector(this._wskinEntry, 'img/system')).bind(this)
	};
	this._wskinEntry = new SButton_Confirm(buttonData);
	this._wskinEntry.onImageSelected = function(imageName) {
		this.text = imageName;
		imageName = imageName !== '<none>' ? imageName : '';
		this.parent._selectedWindow.defineSetting('windowSkin', imageName, true);
	};
	this.addChild(this._wskinEntry);

	entryData.x = 225;
	entryData.y = 224;
	entryData.description = 'Opacity';
	entryData.filter = 'number';
	entryData.maxValue = 255;
	this._opacityEntry = new SButton_Text(entryData);
	this._opacityEntry._arrows[0]._data.cursorStyle = 'pointer';
	this._opacityEntry._arrows[1]._data.cursorStyle = 'pointer';
	this._opacityEntry.onUpArrowClick = function() {
		SButton_Text.prototype.onUpArrowClick.call(this);
		this.parent._selectedWindow.defineSetting('opacity', Number(this.value), true);
	};
	this._opacityEntry.onDownArrowClick = function() {
		SButton_Text.prototype.onDownArrowClick.call(this);
		this.parent._selectedWindow.defineSetting('opacity', Number(this.value), true);
	};
	this._opacityEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent._selectedWindow.defineSetting('opacity', Number(this.value), true);
	};
	this._opacityEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this.addChild(this._opacityEntry);

	//Custom Base -> used to draw buttons that may or may not be used by different windows
	this._customBaseSprite = new Sprite(new Bitmap(this.width, 175));
	this._customBaseSprite.bitmap.fontSize = 12;
	this._customBaseSprite.y = 259;
	this.addChild(this._customBaseSprite);
	//Common buttons
	var btn;
	this._customButtons = [];
	buttonData.width = 175;
	buttonData.description = null;
	buttonData.onClick = null;
	for (var a = 0; a < 7; a++) {
		btn = new SButton_Confirm(buttonData);
		btn.visible = false;
		this._customBaseSprite.addChild(btn);
		this._customButtons.push(btn);
	}
	buttonData.cursorStyle = 'pointer';
	this._colorCustomButtons = [];
	for (var a = 0; a < 5; a++) {
		btn = new SButton_Confirm(buttonData);
		btn._data.onClick = this.startColorSelector.bind(this, btn);
		btn.setColor = function(color) {
			this.text = color;
			this.backColor = color;
		};
		btn.setPosition = function(row, col, center) {
			this.x = this.parent.parent.getButtonX(col, center);
			this.y = this.parent.parent.getButtonY(row) + 12;
		};
		btn.visible = false;
		this._customBaseSprite.addChild(btn);
		this._colorCustomButtons.push(btn);
	}
	this._getPgButtons = [];
	buttonData.cursorStyle = null;
	buttonData.width = 110;
	for (var a = 0; a < 3; a++) {
		btn = new SButton_Confirm(buttonData);
		btn.x = 15 + (buttonData.width + 20) * a;
		btn.y = 156;
		btn.visible = false;
		this._customBaseSprite.addChild(btn);
		this._getPgButtons.push(btn);
	}
	buttonData.width = 175;
	//Common selectors
	var selector;
	buttonData.itemColors = ['#222255', '#292977'];
	this._customSelectors = [];
	for (var a = 0; a < 7; a++) {
		selector = new SButton_Select(buttonData);
		selector.visible = false;
		this._customBaseSprite.addChild(selector);
		this._customSelectors.push(selector);
	}
	//Common entries
	var entry;
	this._customEntries = [];
	entryData.width = 175;
	entryData.filter = null;
	entryData.maxValue = null;
	entryData.description = null;
	for (var a = 0; a < 8; a ++) {
		entry = new SButton_Text(entryData);
		entry.visible = false;
		entry.onDeselect = function() {
			SButton_Text.prototype.onDeselect.call(this);
			if (this._deselectMethod) {
				this._deselectMethod();
			}
		};
		entry.onOkTriggered = function() {
			SButton_Text.prototype.onOkTriggered.call(this);
			SceneManager._scene.selectButton(null);
		};
		this._customBaseSprite.addChild(entry);
		this._customEntries.push(entry);
	}

	entryData.height *= 2;
	entryData.maxLines = 10;
	entryData.width = 370;
	this._bigEntry = new SButton_Text(entryData);
	this._bigEntry.visible = false;
	this._bigEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		if (this._deselectMethod) {
			this._deselectMethod();
		}
	};
	this._bigEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this._customBaseSprite.addChild(this._bigEntry);

	this._bigEntry2 = new SButton_Text(entryData);
	this._bigEntry2.visible = false;
	this._bigEntry2.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		if (this._deselectMethod) {
			this._deselectMethod();
		}
	};
	this._bigEntry2.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this._customBaseSprite.addChild(this._bigEntry2);

	var saveButtonData = {
		text: '💾 SAVE  ',
		textAlign: 'center',
		description: 'Save all your changes',
		fontSize: 14,
		x: 10,
		y: this.height - 289,
		width: Math.floor(this.width/2) - 20,
		height: 20,
		backColor: '#333399',
		design: 'round-rect',
		onClick: this.saveData.bind(this)
	};
	this._saveButton = new SButton_Confirm(saveButtonData);
	this._saveButton._saveMsgDelay = 0;
	this._saveButton.update = function() {
		SButton_Confirm.prototype.update.call(this);
		if (this._saveMsgDelay > 0) {
			if (--this._saveMsgDelay < 1) {
				this.text = 'SAVE';
			}
		}
	};
	this._customBaseSprite.addChild(this._saveButton);

	var saveButtonData = {
		text: '💾 SAVE  ',
		textAlign: 'center',
		description: 'Save all your changes',
		fontSize: 14,
		x: 10,
		y: this.height - 289,
		width: Math.floor(this.width/2) - 20,
		height: 20,
		backColor: '#333399',
		design: 'round-rect',
		onClick: this.saveData.bind(this)
	};
	saveButtonData.text = 'Menu BG: ' + (SMO.AM.Images.menu || '<none>');
	saveButtonData.description = 'Menu Background';
	saveButtonData.x = Math.floor(this.width/2) + 10;
	saveButtonData.onClick = (() => this.startImageSelector(this._backgroundMenu, null, true)).bind(this);
	this._backgroundMenu = new SButton_Confirm(saveButtonData);
	this._backgroundMenu.onImageSelected = function(imageName) {
		this.text = 'Menu BG: ' + imageName;
		imageName = imageName !== '<none>' ? imageName : '';
		SMO.AM.Images.menu = imageName;
		$dataAchievsMenu.MenuImage = SMO.AM.Images.menu;
		var editor = this.parent.parent;
		if (editor.isMenuBackground()) {
			SceneManager._scene.setBackground(imageName);
		}
	};
	this._customBaseSprite.addChild(this._backgroundMenu);
};

Editor_AchievsMenu.prototype.isMenuBackground = function() {
	return !SMO.AM.currentCategory.id || SMO.AM.currentCategory.menuImg;
};

//========================================
// Menu Editor - Update

Editor_AchievsMenu.prototype.update = function() {
	this.updateTriggers();
	SWindow_Base.prototype.update.call(this);
};

Editor_AchievsMenu.prototype.updateTriggers = function() {
	if (!this.visible) {
		if (this._hidden) {
			if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
				this._hidden = false;
				this.visible = true;
			} else {
				this.updateSpecialInputs();
			}
		}
		return;
	}
	if (this.isAnimating()) return;
	if (SceneManager._scene.isSelecting()) return;
	if (SceneManager._scene.isTextInputSelected()) return;
	if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
		this.onCancelled();
	} else if (Input.isTriggered('s') && Input.isPressed('control')) {
		this.saveData();
	} else {
		this.updateSpecialInputs();
	}
};

Editor_AchievsMenu.prototype.updateSpecialInputs = function() {
	if (Input.isTriggered('h')) {
		this._hidden = !this._hidden;
		this.visible = !this.visible;
	} else if (Input.isTriggered('1')) {
		this.switchHideWindowSelector('1');
	} else if (Input.isTriggered('2')) {
		this.switchHideWindowSelector('2');
	} else if (Input.isTriggered('3')) {
		this.switchHideWindowSelector('3');
	}
};

Editor_AchievsMenu.prototype.onCancelled = function() {
	this.close();
};

//========================================
// Menu Editor - Draw

Editor_AchievsMenu.prototype.drawMainTextsAndBackground = function() {
	var bitmap = this.txtChild.bitmap;
	var y_base1 = this._xEntry._data.y - 17;
	var y_base2 = this._ffEntry._data.y - 17;
	//Drawing Backgrounds
	bitmap.drawRoundedRect(6, y_base1, this.width - 12, 70, 10, '#333399');
	bitmap.fillRect(199, y_base1 + 5, 1, 60, '#222266');
	bitmap.drawRoundedRect(6, y_base2, this.width - 12, 70, 10, '#333399');
	bitmap.fillRect(199, y_base2 + 5, 1, 60, '#222266');
	bitmap.drawRoundedRect(6, y_base2 + 80, this.width - 12, 180, 10, '#333399');

	//Drawing texts
	var originalFontSize = bitmap.fontSize;
	bitmap.fontSize = 12;
	bitmap.drawText('WINDOW', 0, 33, 400, 12, 'center');
	bitmap.drawText('POSITION', 10, y_base1, 180, 15, 'center');
	bitmap.drawText('SIZE', 205, this._wEntry._data.y - 17, 180, 15, 'center');
	bitmap.drawText('FONT', 10, y_base2, 180, 15, 'center');
	bitmap.drawText('SKIN', 205, this._wskinEntry._data.y - 17, 180, 15, 'center');
	bitmap.fontSize = 14;
	bitmap.drawText('X:', 10, this._xEntry._data.y, 20, 20, 'center');
	bitmap.drawText('Y:', 10, this._yEntry._data.y, 20, 20, 'center');
	bitmap.drawText('W:', 205, this._wEntry._data.y, 20, 20, 'center');
	bitmap.drawText('H:', 205, this._hEntry._data.y, 20, 20, 'center');
	bitmap.drawText('F:', 10, this._ffEntry._data.y, 20, 20, 'center');
	bitmap.drawText('S:', 10, this._fsEntry._data.y, 20, 20, 'center');
	bitmap.drawText('S:', 205, this._wskinEntry._data.y, 20, 20, 'center');
	bitmap.drawText('O:', 205, this._opacityEntry._data.y, 20, 20, 'center');

	bitmap.fontSize = originalFontSize;
};

//========================================
// Menu Editor - On actions

Editor_AchievsMenu.prototype.saveData = function() {
	DataManager.saveMenuFromEditor();
	this._saveButton.text = 'CHANGES SAVED!';
	this._saveButton._saveMsgDelay = 90;
};

//========================================
// Menu Editor - Selectors

Editor_AchievsMenu.prototype.startImageSelector = function(button, dirpath, mainBackground) {
	dirpath = dirpath || 'img/achievements';
	var imageName = mainBackground ? button.text.substring('Menu BG: '.length) : button.text;
	this._isSelectorOpen = true;
	this._selectorCaller = button;
	this.close();
	if (!SceneManager._scene._imageSelector) {
		SceneManager._scene._imageSelector = new ImageSelector(dirpath);
		SceneManager._scene.addChild(SceneManager._scene._imageSelector);
	}
	var ImgSelector = SceneManager._scene._imageSelector;
	ImgSelector._editor = this;
	if (ImgSelector._dirpath !== dirpath) {
		ImgSelector._dirpath = dirpath;
		ImgSelector.refreshImageNames();
	}
	if (imageName) {
		ImgSelector.selectImage(imageName);
	}
	ImgSelector.open();
	this._isSelectorOpen = true;
};

Editor_AchievsMenu.prototype.onImageSelectorConfirmed = function() {
	if (this._selectorCaller && this._selectorCaller.onImageSelected) {
		this._selectorCaller.onImageSelected(SceneManager._scene._imageSelector.imageName);
	}
};

Editor_AchievsMenu.prototype.startColorSelector = function(button) {
	var color = button.text;
	this._isSelectorOpen = true;
	this._selectorCaller = button;
	this.close();
	if (!SceneManager._scene._colorSelector) {
		SceneManager._scene._colorSelector = new ColorSelector();
		SceneManager._scene.addChild(SceneManager._scene._colorSelector);
	}
	var CSelector = SceneManager._scene._colorSelector;
	CSelector._editor = this;
	if (color) {
		CSelector.setColor(color);
	}
	CSelector.open();
	this._isSelectorOpen = true;
};

Editor_AchievsMenu.prototype.onColorSelectorConfirmed = function() {
	if (this._selectorCaller && this._selectorCaller.onColorSelected) {
		this._selectorCaller.onColorSelected(SceneManager._scene._colorSelector.color);
	}
};

//========================================
// Menu Editor - Others

Editor_AchievsMenu.prototype.redrawWindowInfo = function() {
	this.resetCustomButtons();
	this._customBaseSprite.bitmap.clear();
	var selected = this._selectedWindow;
	this.redrawPositionAndSizeInfo();
	this.redrawFontAndVisualInfo();
	this.redrawCustomInfo();
};

Editor_AchievsMenu.prototype.resetCustomButtons = function() {
	function resetMyData(button) {
		button.visible = false;
		button.description = '';
	}
	this._customButtons.forEach(resetMyData);
	this._getPgButtons.forEach(resetMyData);
	this._colorCustomButtons.forEach(resetMyData);
	this._customSelectors.forEach(function(b) {
		b.visible = false;
		b.description = '';
		b.onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
		};
	});
	this._customEntries.forEach(function(entry) {
		entry.visible = false;
		entry.description = '';
		entry._data.filter = null;
		entry._data.minValue = 0;
		entry._data.maxValue = 0;
	});
	this._bigEntry.description = '';
	this._bigEntry.visible = false;
	this._bigEntry2.description = '';
	this._bigEntry2.visible = false;
	this._getPgButtons[1].description = '';
};

Editor_AchievsMenu.prototype.redrawPositionAndSizeInfo = function() {
	var windowName = this._selectedWindow._name;
	this._xEntry.value = $dataAchievsMenu[windowName].x;
	this._yEntry.value = $dataAchievsMenu[windowName].y;
	this._wEntry.value = $dataAchievsMenu[windowName].width;
	this._hEntry.value = $dataAchievsMenu[windowName].height;
};

Editor_AchievsMenu.prototype.redrawFontAndVisualInfo = function() {
	var windowName = this._selectedWindow._name;
	this._fsEntry.value = $dataAchievsMenu[windowName].fontSize;
	this._ffEntry.value = $dataAchievsMenu[windowName].fontFace;
	this._opacityEntry.value = $dataAchievsMenu[windowName].opacity;
	this._opacityEntry.enabled = true;
	this._wskinEntry.text = $dataAchievsMenu[windowName].windowSkin || '<none>';
	this._wskinEntry.enabled = true;
};

Editor_AchievsMenu.prototype.getButtonY = function(row) {
	return 10 + 42 * row;
};

Editor_AchievsMenu.prototype.getButtonX = function(column, center) {
	if (center) return 112;
	return column ? 210 : 15;
};

Editor_AchievsMenu.prototype.getPageSceneName = function() {
	//Button to customize title
	this._customBaseSprite.bitmap.drawText('TITLE', 15, 52, 160, 12);
	this._customEntries[0].description = 'Default title for the menu';
	this._customEntries[0].x = 15;
	this._customEntries[0].y = 64;
	this._customEntries[0].value = $dataAchievsMenu.SceneName.title;
	this._customEntries[0].visible = true;
	this._customEntries[0]._deselectMethod = function() {
		$dataAchievsMenu.SceneName.title = this.value;
		this.parent.parent._selectedWindow.refresh();
	};
	//Button to customize title's color
	this._customBaseSprite.bitmap.drawText('TEXT COLOR', 210, 52, 120, 12);
	this._colorCustomButtons[0].description = 'Color used to draw the title when no AutoColor is active';
	this._colorCustomButtons[0].x = 210;
	this._colorCustomButtons[0].y = 64;
	this._colorCustomButtons[0].setColor($dataAchievsMenu.SceneName.textColor || '#ffffff');
	this._colorCustomButtons[0].onColorSelected = function(color) {
		this.setColor(color);
		$dataAchievsMenu.SceneName.textColor = color;
		this.parent.parent._selectedWindow.refresh();
	};
	this._colorCustomButtons[0].visible = true;
};

Editor_AchievsMenu.prototype.getPageCategories = function(pageName) {
	var x1 = this.getButtonX(0), x2 = this.getButtonX(1);
	var y1 = this.getButtonY(0), y2 = this.getButtonY(1), y3 = this.getButtonY(2);
	this.resetCustomButtons();
	this._customBaseSprite.bitmap.clear();
	this._getPgButtons[1].visible = true;
	this._getPgButtons[1].onClick = (() => this.getPageCategories(this._getPgButtons[1].text)).bind(this);
	if (pageName === 'COLORS') {
		function onColorSelected (color) {
			this.setColor(color);
			$dataAchievsMenu.Categories[this._prop] = color;
			this.parent.parent._selectedWindow.refresh();
		}
		//Categories - Default text color
		this._customBaseSprite.bitmap.drawText('TEXT COLOR', x1, y1, 175, 12);
		this._colorCustomButtons[0].description = 'The color used to draw texts when no AutoColor is selected';
		this._colorCustomButtons[0]._prop = 'textColor';
		this._colorCustomButtons[0].setPosition(0, 0);
		this._colorCustomButtons[0].setColor($dataAchievsMenu.Categories.textColor || '#ffffff');
		this._colorCustomButtons[0].onColorSelected = onColorSelected;
		this._colorCustomButtons[0].visible = true;
		//Categories - Rectangle's border color
		this._customBaseSprite.bitmap.drawText('BORDER COLOR', x2, y1, 175, 12);
		this._colorCustomButtons[1].description = "Color used to draw the items rectangle's borders";
		this._colorCustomButtons[1]._prop = 'rectBorderColor';
		this._colorCustomButtons[1].setPosition(0, 1);
		this._colorCustomButtons[1].setColor($dataAchievsMenu.Categories.rectBorderColor || '#ffffff');
		this._colorCustomButtons[1].onColorSelected = onColorSelected;
		this._colorCustomButtons[1].visible = true;
		//Categories - Rectangle's background color
		this._customBaseSprite.bitmap.drawText('BACKGROUND COLOR', x1, y2, 175, 12);
		this._colorCustomButtons[2]._prop = 'rectBackColor';
		this._colorCustomButtons[2].description = "Color used to draw the items rectangle's background";
		this._colorCustomButtons[2].setPosition(1, 0);
		this._colorCustomButtons[2].setColor($dataAchievsMenu.Categories.rectBackColor || '#ffffff');
		this._colorCustomButtons[2].onColorSelected = onColorSelected;
		this._colorCustomButtons[2].visible = true;

		this._getPgButtons[1].text = 'ITEMS';
	} else {
		//Categories - Draw rectangle
		this._customBaseSprite.bitmap.drawText('DRAW RECTANGLE?', x1, y1, 175, 12);
		this._customButtons[0].description = 'Do you want to draw a rectangle for each item?';
		this._customButtons[0].x = x1;
		this._customButtons[0].y = y1 + 12;
		this._customButtons[0].text = $dataAchievsMenu.Categories.drawRectangle ? 'YES' : 'NO';
		this._customButtons[0].onClick = function() {
			if ($dataAchievsMenu.Categories.drawRectangle) {
				this.text = 'NO';
				$dataAchievsMenu.Categories.drawRectangle = false;
				this.parent.parent._selectedWindow.refresh();
			} else {
				this.text = 'YES';
				$dataAchievsMenu.Categories.drawRectangle = true;
				this.parent.parent._selectedWindow.refresh();
			}
		};
		this._customButtons[0].visible = true;
		//Categories - Name format
		this._customBaseSprite.bitmap.drawText('NAME FORMAT', x2, y1, 175, 12);
		this._customEntries[0].description = 'How should each category name be drawn?\n';
		this._customEntries[0].description += "Check out some tags and it's replacement values below\n";
		this._customEntries[0].description += "<name> -> the category's name                                                     \n";
		this._customEntries[0].description += "<locked> -> number of achievs on this category that are locked                    \n";
		this._customEntries[0].description += "<unlocked> -> number of achievs on this category that are unlocked                \n";
		this._customEntries[0].description += "<secret> -> number of achievs on this category that are secret                    \n";
		this._customEntries[0].description += "<recent> -> number of achievs on this category that were recently unlocked        \n";
		this._customEntries[0].description += "<collectable> -> number of achievs on this category which have collectable rewards\n";
		this._customEntries[0].description += "<all> -> the total number of achievs on this category                             \n";
		this._customEntries[0].description += "<percent> -> percentage of unlocked achievs on this category                      ";
		this._customEntries[0].x = x2;
		this._customEntries[0].y = y1 + 12;
		this._customEntries[0].value = $dataAchievsMenu.Categories.text;
		this._customEntries[0]._deselectMethod = function() {
			$dataAchievsMenu.Categories.text = this.value;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[0].visible = true;
		//Categories - Rectangle's border size
		this._customBaseSprite.bitmap.drawText('BORDER SIZE', x1, y2, 175, 12);
		this._customEntries[1].description = "The thickness of the items rectangle's borders";
		this._customEntries[1]._data.filter = 'number';
		this._customEntries[1]._data.maxValue = 20;
		this._customEntries[1].x = x1;
		this._customEntries[1].y = y2 + 12;
		this._customEntries[1].value = $dataAchievsMenu.Categories.rectBorderSize;
		this._customEntries[1]._deselectMethod = function() {
			$dataAchievsMenu.Categories.rectBorderSize = Number(this.value) || 0;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[1].visible = true;
		//Categories - Item height
		this._customBaseSprite.bitmap.drawText('ITEM HEIGHT', x2, y2, 160, 12);
		this._customEntries[2].description = 'The height of each item';
		this._customEntries[2].redefine({ filter:'number', minValue:5, maxValue:500 });
		this._customEntries[2].x = x2;
		this._customEntries[2].y = y2 + 12;
		this._customEntries[2].value = $dataAchievsMenu.Categories.itemHeight;
		this._customEntries[2]._deselectMethod = function() {
			$dataAchievsMenu.Categories.itemHeight = Number(this.value) || 5;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[2].visible = true;
		//Categories - Columns
		this._customBaseSprite.bitmap.drawText('MAX COLUMNS', x1, y3, 160, 12);
		this._customEntries[3].description = 'The maximun amount of columns';
		this._customEntries[3].redefine({ filter:'number', minValue:1, maxValue:12 });
		this._customEntries[3].x = x1;
		this._customEntries[3].y = y3 + 12;
		this._customEntries[3].value = String($dataAchievsMenu.Categories.columns);
		this._customEntries[3]._deselectMethod = function() {
			$dataAchievsMenu.Categories.columns = Number(this.value) || 1;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[3].visible = true;
		//Categories - Text Align
		this._customBaseSprite.bitmap.drawText('TEXT ALIGN', x2, y3, 175, 12);
		this._customSelectors[0].description = "Define the alignment for all the categories' texts";
		this._customSelectors[0].x = x2;
		this._customSelectors[0].y = y3 + 12;
		this._customSelectors[0].setList(['Left', 'Center', 'Right']);
		this._customSelectors[0].selectItem(['left', 'center', 'right'].indexOf($dataAchievsMenu.Categories.textAlign));
		this._customSelectors[0].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.Categories.textAlign = values[0].toLowerCase();
			this.parent.parent._selectedWindow.refresh();
		};
		this._customSelectors[0].visible = true;

		this._getPgButtons[1].text = 'COLORS';
	}
};

Editor_AchievsMenu.prototype.getPageTrophies = function(pageName) {
	var x1 = this.getButtonX(0), x2 = this.getButtonX(1);
	var y1 = this.getButtonY(0), y2 = this.getButtonY(1), y3 = this.getButtonY(2);
	this.resetCustomButtons();
	this._customBaseSprite.bitmap.clear();
	this._getPgButtons[0].visible = true;
	this._getPgButtons[1].visible = true;
	this._getPgButtons[2].visible = true;
	this._getPgButtons[0].onClick = (() => this.getPageTrophies(this._getPgButtons[0].text)).bind(this);
	this._getPgButtons[1].onClick = (() => this.getPageTrophies(this._getPgButtons[1].text)).bind(this);
	this._getPgButtons[2].onClick = (() => this.getPageTrophies(this._getPgButtons[2].text)).bind(this);
	if (pageName === 'PLACEMENT') {
		function formatMyText(value, name) {
			if (!value) return false;
			try {
				var n = Number(eval(value));
				if (isNaN(n)) {
					console.warn('The script for the '+name+' should result on a number.');
					console.warn('Script: ' + value);
					console.warn('Evaluation: ' + n);
					return false;
				}
			} catch(e) {
				console.error('Error on the script for the '+name+': ' + value);
				console.error(e);
				return false;
			}
			return true;
		}
		//Trophies - Big Trophy Y
		this._customBaseSprite.bitmap.drawText('BIG TROPHY Y', x1, y1, 175, 12);
		this._customEntries[0].description = "Define the Y coordinate for the big trophy (you can use JS here)";
		this._customEntries[0].x = x1;
		this._customEntries[0].y = y1 + 12;
		this._customEntries[0].value = $dataAchievsMenu.Trophies.bigTrophyY;
		this._customEntries[0]._deselectMethod = function() {
			var value = this.value;
			if (!formatMyText(value)) {
				this.value = '140';
				value = '140';
			}
			$dataAchievsMenu.Trophies.bigTrophyY = value;
			var trophiesWindow = this.parent.parent._selectedWindow;
			if (trophiesWindow._trophies[0]) {
				var oldY = trophiesWindow._big_trophy.y;
				var newY = eval(value);
				trophiesWindow._big_trophy.y = newY;
				trophiesWindow.refresh();
			}
		};
		this._customEntries[0].visible = true;
		//Trophies - Progress Y
		this._customBaseSprite.bitmap.drawText('PROGRESS Y', x2, y1, 175, 12);
		this._customEntries[1].description = "Define the Y coordinate for the progress bar (you can use JS here)";
		this._customEntries[1].x = x2;
		this._customEntries[1].y = y1 + 12;
		this._customEntries[1].value = $dataAchievsMenu.Trophies.progressBarY;
		this._customEntries[1]._deselectMethod = function() {
			var value = this.value;
			if (!formatMyText(value)) {
				this.value = '428';
				value = '428';
			}
			$dataAchievsMenu.Trophies.progressBarY = value;
			this.parent.parent._selectedWindow._progress = null;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[1].visible = true;
		//Trophies - Big Trophy Height
		this._customBaseSprite.bitmap.drawText('BIG TROPHY HEIGHT', x1, y2, 175, 12);
		this._customEntries[2].description = "Define the height of the big trophy (you can use JS here)";
		this._customEntries[2].x = x1;
		this._customEntries[2].y = y2 + 12;
		this._customEntries[2].value = $dataAchievsMenu.Trophies.bigTrophyHeight;
		this._customEntries[2]._deselectMethod = function() {
			var value = this.value;
			if (!formatMyText(value)) {
				this.value = '250';
				value = '250';
			}
			$dataAchievsMenu.Trophies.bigTrophyHeight = value;
			var TW = this.parent.parent._selectedWindow;
			var BT = TW._big_trophy;
			TW.contents.clearRect(BT.x, BT.y, BT.width, BT.height);
			TW._big_trophy.height = eval(value);
			TW._trophy_h = Math.floor((TW._big_trophy.height - TW._gap * (TW._maxLines - 1)) / TW._maxLines);
			TW.removeTrophies();
			TW.createTrophies();
			TW.redrawTrophies();
			var selected = TW._selected;
			if (selected !== 0) {
				TW.swapChildren(TW._trophies[0], TW._trophies[selected]);
			}
		};
		this._customEntries[2].visible = true;
		//Trophies - Progress Text Position
		var list = ['Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Middle Center', 'Middle Right',
			'Bottom Left', 'Bottom Center', 'Bottom Right'];
		this._customBaseSprite.bitmap.drawText('PROGRESS TEXT POSITION', x2, y2, 175, 12);
		this._customSelectors[0].description = "Define the position of the progress text around the progress bar";
		this._customSelectors[0].x = x2;
		this._customSelectors[0].y = y2 + 12;
		this._customSelectors[0].setList(list);
		this._customSelectors[0].selectItem(list.indexOf($dataAchievsMenu.Trophies.progressTextPosition));
		this._customSelectors[0].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.Trophies.progressTextPosition = values[0];
			this.parent.parent._selectedWindow.refresh();
		};
		this._customSelectors[0].visible = true;

		this._getPgButtons[0].text = 'ITEMS';
		this._getPgButtons[1].text = 'COLORS';
		this._getPgButtons[2].text = 'TEXTS';
	} else if (pageName === 'COLORS') {
		function onColorSelected (color) {
			this.setColor(color);
			$dataAchievsMenu.Trophies[this._prop] = color;
			if (this._prop.indexOf('progress') > -1) {
				this.parent.parent._selectedWindow.redrawTotalProgressGauge();
			} else {
				this.parent.parent._selectedWindow.refresh();
			}
		}
		//Trophies - Default text color
		this._customBaseSprite.bitmap.drawText('TEXT COLOR', x1, y1, 175, 12);
		this._colorCustomButtons[0].description = 'The color used to draw texts';
		this._colorCustomButtons[0]._prop = 'textColor';
		this._colorCustomButtons[0].setPosition(0, 0);
		this._colorCustomButtons[0].setColor($dataAchievsMenu.Trophies.textColor || '#ffffff');
		this._colorCustomButtons[0].onColorSelected = onColorSelected;
		this._colorCustomButtons[0].visible = true;
		//Trophies - Progress gauge color 1
		this._customBaseSprite.bitmap.drawText('PROGRESS BAR C1', x2, y1, 175, 12);
		this._colorCustomButtons[1].description = 'The first top color used to draw the progress bar';
		this._colorCustomButtons[1]._prop = 'progressGaugeC1';
		this._colorCustomButtons[1].setPosition(0, 1);
		this._colorCustomButtons[1].setColor($dataAchievsMenu.Trophies.progressGaugeC1 || '#ffffff');
		this._colorCustomButtons[1].onColorSelected = onColorSelected;
		this._colorCustomButtons[1].visible = true;
		//Trophies - Selector color
		this._customBaseSprite.bitmap.drawText('SELECTOR COLOR', x1, y2, 175, 12);
		this._colorCustomButtons[2].description = "If the selector type is set to 'Cursor' the selector will be draw with this color";
		this._colorCustomButtons[2]._prop = 'selectorColor';
		this._colorCustomButtons[2].setPosition(1, 0);
		this._colorCustomButtons[2].setColor($dataAchievsMenu.Trophies.selectorColor || '#ffffff');
		this._colorCustomButtons[2].onColorSelected = onColorSelected;
		this._colorCustomButtons[2].visible = true;
		//Trophies - Progress gauge color 1
		this._customBaseSprite.bitmap.drawText('PROGRESS BAR C2', x2, y2, 175, 12);
		this._colorCustomButtons[3].description = 'The second top color used to draw the progress bar';
		this._colorCustomButtons[3]._prop = 'progressGaugeC2';
		this._colorCustomButtons[3].setPosition(1, 1);
		this._colorCustomButtons[3].setColor($dataAchievsMenu.Trophies.progressGaugeC2 || '#ffffff');
		this._colorCustomButtons[3].onColorSelected = onColorSelected;
		this._colorCustomButtons[3].visible = true;
		//Trophies - Progress gauge color 1
		this._customBaseSprite.bitmap.drawText('PROGRESS BAR BG', x2, y3, 175, 12);
		this._colorCustomButtons[4].description = 'The background color used to draw the progress bar';
		this._colorCustomButtons[4]._prop = 'progressGaugeBG';
		this._colorCustomButtons[4].setPosition(2, 1);
		this._colorCustomButtons[4].setColor($dataAchievsMenu.Trophies.progressGaugeBG || '#202040');
		this._colorCustomButtons[4].onColorSelected = onColorSelected;
		this._colorCustomButtons[4].visible = true;

		this._getPgButtons[0].text = 'TEXTS';
		this._getPgButtons[1].text = 'PLACEMENT';
		this._getPgButtons[2].text = 'TEXTS';
	} else if (pageName === 'ITEMS') {
		//Trophies - State
		this._customBaseSprite.bitmap.drawText('DATA TYPE', x1, y1, 175, 12);
		this._customSelectors[0].description = "What kind of data should the trophies' window show?\n";
		this._customSelectors[0].description += "Trophies -> The default trophies;\n";
		this._customSelectors[0].description += "Recent -> Recently unlocked achievements;\n";
		this._customSelectors[0].description += "Progress -> The achievements closest to being unlocked;"
		this._customSelectors[0].x = x1;
		this._customSelectors[0].y = y1 + 12;
		this._customSelectors[0].setList(['Trophies', 'Recent', 'Progress']);
		this._customSelectors[0].selectItem(['trophies', 'recent', 'progress'].indexOf($dataAchievsMenu.Trophies.type));
		this._customSelectors[0].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.Trophies.type = values[0].toLowerCase();
			var trophiesWindow = this.parent.parent._selectedWindow;
			trophiesWindow.getData();
			trophiesWindow.removeTrophies();
			trophiesWindow.createTrophies();
			trophiesWindow.redrawTrophies();
			var selected = trophiesWindow._selected;
			if (selected !== 0) {
				trophiesWindow.swapChildren(trophiesWindow._trophies[0], trophiesWindow._trophies[selected]);
			}
		};
		this._customSelectors[0].visible = true;
		//Trophies - Selector type
		this._customBaseSprite.bitmap.drawText('SELECTOR TYPE', x2, y1, 175, 12);
		this._customSelectors[1].description = 'Select a type of selector for your trophies';
		this._customSelectors[1].x = x2;
		this._customSelectors[1].y = y1 + 12;
		this._customSelectors[1].setList(['Cursor', 'Grow']);
		this._customSelectors[1].selectItem($dataAchievsMenu.Trophies.selector === 'grow' ? 1 : 0);
		this._customSelectors[1].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.Trophies.selector = values[0].toLowerCase();
			var trophiesWindow = this.parent.parent._selectedWindow;
			trophiesWindow.removeTrophies();
			trophiesWindow.createTrophies();
			trophiesWindow.redrawTrophies();
			trophiesWindow.refreshSelector(true);
			var selected = trophiesWindow._selected;
			if (selected !== 0) {
				trophiesWindow.swapChildren(trophiesWindow._trophies[0], trophiesWindow._trophies[selected]);
			}
		};
		this._customSelectors[1].visible = true;
		//Trophies - Number of lines
		this._customBaseSprite.bitmap.drawText('LINES', x1, y2, 175, 12);
		this._customSelectors[2].description = 'Maximun number of lines for trophies';
		this._customSelectors[2].x = x1;
		this._customSelectors[2].y = y2 + 12;
		this._customSelectors[2].setList(['1', '2', '3', '4']);
		this._customSelectors[2].selectItem($dataAchievsMenu.Trophies.lines - 1);
		this._customSelectors[2].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			this.parent.parent._selectedWindow.defineSetting('lines', values[0], true);
		};
		this._customSelectors[2].visible = true;
		//Trophies - Cursor image
		this._customBaseSprite.bitmap.drawText('CURSOR IMAGE', x2, y2, 175, 12);
		this._customButtons[1].description = "If the selector type is set to 'Cursor' it'll be drawn using this image";
		this._customButtons[1].x = x2;
		this._customButtons[1].y = y2 + 12;
		this._customButtons[1].text = $dataAchievsMenu.Trophies.selectorImage || '<none>';
		this._customButtons[1].onClick = (() => this.startImageSelector(this._customButtons[1])).bind(this);
		this._customButtons[1].onImageSelected = function(imageName) {
			this.text = imageName;
			imageName = imageName !== '<none>' ? imageName : '';
			$dataAchievsMenu.Trophies.selectorImage = imageName;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customButtons[1].visible = true;
		//Trophies - Number of columns
		this._customBaseSprite.bitmap.drawText('COLUMNS', x1, y3, 175, 12);
		this._customSelectors[3].description = 'Maximun number of columns for trophies';
		this._customSelectors[3].x = x1;
		this._customSelectors[3].y = y3 + 12;
		this._customSelectors[3].setList(['1', '2', '3', '4']);
		this._customSelectors[3].selectItem($dataAchievsMenu.Trophies.columns - 1);
		this._customSelectors[3].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			this.parent.parent._selectedWindow.defineSetting('columns', values[0], true);
		};
		this._customSelectors[3].visible = true;
		//Trophies - Border size
		this._customBaseSprite.bitmap.drawText('BORDER SIZE', x2, y3, 175, 12);
		this._customEntries[0].description = "The thickness of the trophies' borders";
		this._customEntries[0].redefine({ filter:'number', maxValue:20 });
		this._customEntries[0].x = x2;
		this._customEntries[0].y = y3 + 12;
		this._customEntries[0].value = $dataAchievsMenu.Trophies.borderSize;
		this._customEntries[0]._deselectMethod = function() {
			$dataAchievsMenu.Trophies.borderSize = this.value;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[0].visible = true;

		this._getPgButtons[0].text = 'COLORS';
		this._getPgButtons[1].text = 'PLACEMENT';
		this._getPgButtons[2].text = 'TEXTS';
	} else {
		//Trophies - Title
		this._customBaseSprite.bitmap.drawText('TITLE', x1, y1, 175, 12);
		this._customEntries[0].description = "This text is drawn at the top of the trophies' window";
		this._customEntries[0].x = x1;
		this._customEntries[0].y = y1 + 12;
		this._customEntries[0].value = $dataAchievsMenu.Trophies.title;
		this._customEntries[0]._deselectMethod = function() {
			$dataAchievsMenu.Trophies.title = this.value;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[0].visible = true;
		//Trophies - Locked text
		this._customBaseSprite.bitmap.drawText('LOCKED TEXT', x2, y1, 175, 12);
		this._customEntries[1].description = "Text drawn inside the 'Big Trophy' when the selected trophy is locked";
		this._customEntries[1].x = x2;
		this._customEntries[1].y = y1 + 12;
		this._customEntries[1].value = $dataAchievsMenu.Trophies.locked;
		this._customEntries[1]._deselectMethod = function() {
			$dataAchievsMenu.Trophies.locked = this.value;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[1].visible = true;
		//Trophies - Total progress text
		this._customBaseSprite.bitmap.drawText('TOTAL PROGRESS', x1, y2, 175, 12);
		this._customEntries[2].description = "Text drawn next to the total progress bar\n";
		this._customEntries[2].description += "Check out some tags and it's replacement values below\n";
		this._customEntries[2].description += "<locked> -> number of locked achievements                  \n";
		this._customEntries[2].description += "<unlocked> -> number of unlocked achievements              \n";
		this._customEntries[2].description += "<secret> -> number of secret achievements                  \n";
		this._customEntries[2].description += "<recent> -> number of recently unlocked achievements       \n";
		this._customEntries[2].description += "<collectable> -> number of achievs with collectable rewards\n";
		this._customEntries[2].description += "<all> -> total number of achievements                      \n";
		this._customEntries[2].description += "<percent> -> percentage of unlocked achievements           ";
		this._customEntries[2].x = x1;
		this._customEntries[2].y = y2 + 12;
		this._customEntries[2].value = $dataAchievsMenu.Trophies.totalProgress;
		this._customEntries[2]._deselectMethod = function() {
			$dataAchievsMenu.Trophies.totalProgress = this.value;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[2].visible = true;
		//Trophies - Locked sign
		this._customBaseSprite.bitmap.drawText('LOCKED SIGN', x2, y2, 175, 12);
		this._customEntries[3].description = 'Text draw at the center of locked trophies';
		this._customEntries[3].x = x2;
		this._customEntries[3].y = y2 + 12;
		this._customEntries[3].value = $dataAchievsMenu.Trophies.lockedSign;
		this._customEntries[3]._deselectMethod = function() {
			$dataAchievsMenu.Trophies.lockedSign = this.value;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[3].visible = true;
		//Trophies - Description
		this._customBaseSprite.bitmap.drawText('DESCRIPTION', x1, y3, 175, 12);
		this._bigEntry.description = "Text drawn right below the trophies' title";
		this._bigEntry.x = x1;
		this._bigEntry.y = y3 + 12;
		this._bigEntry.value = $dataAchievsMenu.Trophies.description;
		this._bigEntry._deselectMethod = function() {
			$dataAchievsMenu.Trophies.description = this.value;
			this.parent.parent._selectedWindow.refresh();
		};
		this._bigEntry.visible = true;

		this._getPgButtons[0].text = 'COLORS';
		this._getPgButtons[1].text = 'PLACEMENT';
		this._getPgButtons[2].text = 'ITEMS';
	}
};

Editor_AchievsMenu.prototype.getPageAchievements = function(pageName) {
	var x1 = this.getButtonX(0), x2 = this.getButtonX(1);
	var y1 = this.getButtonY(0), y2 = this.getButtonY(1), y3 = this.getButtonY(2);
	this.resetCustomButtons();
	this._customBaseSprite.bitmap.clear();
	this._getPgButtons[0].visible = true;
	this._getPgButtons[0].onClick = (() => this.getPageAchievements(this._getPgButtons[0].text)).bind(this);
	this._getPgButtons[2].visible = true;
	this._getPgButtons[2].onClick = (() => this.getPageAchievements(this._getPgButtons[2].text)).bind(this);
	if (pageName === 'COLORS') {
		function onColorSelected (color) {
			this.setColor(color);
			$dataAchievsMenu.Achievements[this._prop] = color;
			this.parent.parent._selectedWindow.refresh();
		}
		//Achievements - Default text color
		this._customBaseSprite.bitmap.drawText('TEXT COLOR', x1, y1, 175, 12);
		this._colorCustomButtons[0].description = 'The color used to draw texts when no AutoColor is selected';
		this._colorCustomButtons[0]._prop = 'textColor';
		this._colorCustomButtons[0].setPosition(0, 0);
		this._colorCustomButtons[0].setColor($dataAchievsMenu.Achievements.textColor || '#ffffff');
		this._colorCustomButtons[0].onColorSelected = onColorSelected;
		this._colorCustomButtons[0].visible = true;
		//Achievements - Progress gauge color 1
		this._customBaseSprite.bitmap.drawText('PROGRESS BAR C1', x2, y1, 175, 12);
		this._colorCustomButtons[1].description = 'The first top color used to draw the progress bar';
		this._colorCustomButtons[1]._prop = 'progressGaugeC1';
		this._colorCustomButtons[1].setPosition(0, 1);
		this._colorCustomButtons[1].setColor($dataAchievsMenu.Achievements.progressGaugeC1 || '#ffffff');
		this._colorCustomButtons[1].onColorSelected = onColorSelected;
		this._colorCustomButtons[1].visible = true;
		//Achievements - Progress gauge color 2
		this._customBaseSprite.bitmap.drawText('PROGRESS BAR BG', x1, y2, 175, 12);
		this._colorCustomButtons[2].description = 'The background color used to draw the progress bar';
		this._colorCustomButtons[2]._prop = 'progressGaugeBG';
		this._colorCustomButtons[2].setPosition(1, 0);
		this._colorCustomButtons[2].setColor($dataAchievsMenu.Achievements.progressGaugeBG || '#202040');
		this._colorCustomButtons[2].onColorSelected = onColorSelected;
		this._colorCustomButtons[2].visible = true;
		//Achievements - Progress gauge color 2
		this._customBaseSprite.bitmap.drawText('PROGRESS BAR C2', x2, y2, 175, 12);
		this._colorCustomButtons[3].description = 'The second top color used to draw the progress bar';
		this._colorCustomButtons[3]._prop = 'progressGaugeC2';
		this._colorCustomButtons[3].setPosition(1, 1);
		this._colorCustomButtons[3].setColor($dataAchievsMenu.Achievements.progressGaugeC2 || '#ffffff');
		this._colorCustomButtons[3].onColorSelected = onColorSelected;
		this._colorCustomButtons[3].visible = true;

		this._getPgButtons[0].text = 'ITEMS';
		this._getPgButtons[2].text = 'PROGRESS';
	} else if (pageName === 'PROGRESS') {
		//Achievements - Hide progress
		this._customBaseSprite.bitmap.drawText('HIDE PROGRESS', x1, y1, 175, 12);
		this._customButtons[0].description = 'Do you wish to hide the progress bar and text for all achievements?';
		this._customButtons[0].x = x1;
		this._customButtons[0].y = y1 + 12;
		this._customButtons[0].text = $dataAchievsMenu.Achievements.hideProgress ? 'YES' : 'NO';
		this._customButtons[0].onClick = function() {
			var state = this.text === 'YES' ? false : true;
			this.text = state ? 'YES' : 'NO';
			$dataAchievsMenu.Achievements.hideProgress = state;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customButtons[0].visible = true;
		//Achievements - Progress text align
		this._customBaseSprite.bitmap.drawText('TEXT ALIGN', x2, y1, 175, 12);
		this._customSelectors[0].description = 'Define the alignment for the progress text';
		this._customSelectors[0].x = x2;
		this._customSelectors[0].y = y1 + 12;
		this._customSelectors[0].setList(['Left', 'Center', 'Right']);
		var index = ['left', 'center', 'right'].indexOf($dataAchievsMenu.Achievements.progressAlign);
		this._customSelectors[0].selectItem(index);
		this._customSelectors[0].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.Achievements.progressAlign = values[0] ? values[0].toLowerCase() : 'center';
			this.parent.parent._selectedWindow.refresh();
		};
		this._customSelectors[0].visible = true;
		//Achievements - Progress bar height
		this._customBaseSprite.bitmap.drawText('GAUGE HEIGHT', x1, y2, 175, 12);
		this._customEntries[0].description = 'Define the height of the progress bar';
		this._customEntries[0].redefine({ filter:'number', minValue:1, maxValue:40 });
		this._customEntries[0].x = x1;
		this._customEntries[0].y = y2 + 12;
		this._customEntries[0].value = $dataAchievsMenu.Achievements.progressGaugeHeight;
		this._customEntries[0]._deselectMethod = function() {
			$dataAchievsMenu.Achievements.progressGaugeHeight = Number(this.value) || 1;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[0].visible = true;
		//Achievements - Progress style
		this._customBaseSprite.bitmap.drawText('PROGRESS STYLE', x2, y2, 175, 12);
		this._customSelectors[1].description = 'Choose the style of the progress text, Flat (1/10) or Percent (10%)';
		this._customSelectors[1].x = x2;
		this._customSelectors[1].y = y2 + 12;
		this._customSelectors[1].setList(['Percent', 'Flat']);
		var index = ['Percent', 'Flat'].indexOf($dataAchievsMenu.Achievements.progressStyle);
		this._customSelectors[1].selectItem(index);
		this._customSelectors[1].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.Achievements.progressStyle = values[0] || 'Percent';
			this.parent.parent._selectedWindow.refresh();
		};
		this._customSelectors[1].visible = true;

		this._getPgButtons[0].text = 'ITEMS';
		this._getPgButtons[2].text = 'COLORS';
	} else {
		//Achievements - Border size
		this._customBaseSprite.bitmap.drawText('BORDER SIZE', x1, y1, 175, 12);
		this._customEntries[0].description = 'Define the thickness of the borders for all achievements';
		this._customEntries[0].redefine({ filter:'number', maxValue:20 });
		this._customEntries[0].x = x1;
		this._customEntries[0].y = y1 + 12;
		this._customEntries[0].value = $dataAchievsMenu.Achievements.borderSize;
		this._customEntries[0]._deselectMethod = function() {
			$dataAchievsMenu.Achievements.borderSize = Number(this.value);
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[0].visible = true;
		//Achievements - Columns
		this._customBaseSprite.bitmap.drawText('COLUMNS', x2, y1, 175, 12);
		this._customEntries[1].description = 'Maximun amount of columns for achievements, you can use JS ';
		this._customEntries[1].description += 'or just write a number here';
		this._customEntries[1].x = x2;
		this._customEntries[1].y = y1 + 12;
		this._customEntries[1].value = $dataAchievsMenu.Achievements.columns;
		this._customEntries[1]._deselectMethod = function() {
			var value = this.value;
			try {
				var n = Number(eval(value));
				if (isNaN(n)) {
					console.warn('The script for the columns should result on a number.');
					console.warn('Script: ' + value);
					console.warn('Evaluation: ' + n);
					this.value = '3';
				}
			} catch(e) {
				console.error('Error on the script for the achievs columns: ' + value);
				console.error(e);
				this.value = '3';
			}
			$dataAchievsMenu.Achievements.columns = this.value;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[1].visible = true;
		//Achievements - Item height
		this._customBaseSprite.bitmap.drawText('ITEM HEIGHT', x1, y2, 160, 12);
		this._customEntries[2].description = 'Define the height for all achievements';
		this._customEntries[2].redefine({ filter:'number', minValue:5, maxValue:500 });
		this._customEntries[2].x = x1;
		this._customEntries[2].y = y2 + 12;
		this._customEntries[2].value = $dataAchievsMenu.Achievements.itemHeight;
		this._customEntries[2]._deselectMethod = function() {
			$dataAchievsMenu.Achievements.itemHeight = Number(this.value) || 5;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[2].visible = true;
		//Achievements - Corner radius
		this._customBaseSprite.bitmap.drawText('CORNER RADIUS', x2, y2, 160, 12);
		this._customEntries[3].description = "Define radius for the achievements' corners, zero will draw a square (max: 12)";
		this._customEntries[3].redefine({ filter:'number', minValue:0, maxValue:12 });
		this._customEntries[3].x = x2;
		this._customEntries[3].y = y2 + 12;
		this._customEntries[3].value = $dataAchievsMenu.Achievements.cornerRadius;
		this._customEntries[3]._deselectMethod = function() {
			$dataAchievsMenu.Achievements.cornerRadius = Number(this.value) || 0;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[3].visible = true;
		//Achievements - Description lines
		this._customBaseSprite.bitmap.drawText('DESCRIPTION LINES', x1, y3, 160, 12);
		this._customEntries[4].description = "The maximun amount of lines for descriptions\n";
		this._customEntries[4].description += "Achievs with no progress bar automatically gain 1 extra line";
		this._customEntries[4].redefine({ filter:'number', minValue:1, maxValue:20 });
		this._customEntries[4].x = x1;
		this._customEntries[4].y = y3 + 12;
		this._customEntries[4].value = $dataAchievsMenu.Achievements.descriptionLines;
		this._customEntries[4]._deselectMethod = function() {
			$dataAchievsMenu.Achievements.descriptionLines = Number(this.value) || 0;
			this.parent.parent._selectedWindow.refresh();
		};
		this._customEntries[4].visible = true;

		this._getPgButtons[0].text = 'COLORS';
		this._getPgButtons[2].text = 'PROGRESS';
	}
};

Editor_AchievsMenu.prototype.getPageAchievsInfo = function(pageName) {
	var x1 = this.getButtonX(0), x2 = this.getButtonX(1);
	var y1 = this.getButtonY(0), y2 = this.getButtonY(1), y3 = this.getButtonY(2);
	this.resetCustomButtons();
	this._customBaseSprite.bitmap.clear();
	this._getPgButtons[0].visible = true;
	this._getPgButtons[0].onClick = (() => this.getPageAchievsInfo(this._getPgButtons[0].text)).bind(this);
	this._getPgButtons[1].visible = true;
	this._getPgButtons[1].onClick = (() => this.getPageAchievsInfo(this._getPgButtons[1].text)).bind(this);
	this._getPgButtons[2].visible = true;
	this._getPgButtons[2].onClick = (() => this.getPageAchievsInfo(this._getPgButtons[2].text)).bind(this);
	if (pageName === 'COLORS') {
		function onColorSelected (color) {
			this.setColor(color);
			$dataAchievsMenu.AchievsInfo[this._prop] = color;
			var index = this._prop === 'scrollColor1' ? 0 : 1;
			this.parent.parent._selectedWindow._requirementsList._data.scrollColors[index] = color;
			this.parent.parent._selectedWindow._requirementsList.redraw();
			if (this.parent.parent._selectedWindow._rewardsList) {
				this.parent.parent._selectedWindow._rewardsList._data.scrollColors[index] = color;
				this.parent.parent._selectedWindow._rewardsList.redraw();
			}
		}
		//AchievsInfo - Text color
		this._customBaseSprite.bitmap.drawText('TEXT COLOR', x1, y1, 175, 12);
		this._colorCustomButtons[0].description = 'The default color used to draw texts';
		this._colorCustomButtons[0]._prop = 'textColor';
		this._colorCustomButtons[0].setPosition(0, 0);
		this._colorCustomButtons[0].setColor($dataAchievsMenu.AchievsInfo.textColor || '#ffffff');
		this._colorCustomButtons[0].onColorSelected = function(color) {
			this.setColor(color);
			this.parent.parent._selectedWindow.defineSetting('textColor', color, true);
		};
		this._colorCustomButtons[0].visible = true;
		//AchievsInfo - Scroll color 1
		this._customBaseSprite.bitmap.drawText('SCROLL COLOR 1', x2, y1, 175, 12);
		this._colorCustomButtons[1].description = "The color used to draw the scroll bar's background";
		this._colorCustomButtons[1]._prop = 'scrollColor1';
		this._colorCustomButtons[1].setPosition(0, 1);
		this._colorCustomButtons[1].setColor($dataAchievsMenu.AchievsInfo.scrollColor1 || '#ffffff');
		this._colorCustomButtons[1].onColorSelected = onColorSelected;
		this._colorCustomButtons[1].visible = true;
		//AchievsInfo - Collect color
		this._customBaseSprite.bitmap.drawText('COLLECT COLOR', x1, y2, 175, 12);
		this._colorCustomButtons[2].description = 'The primary color used for the collect button';
		this._colorCustomButtons[2].setPosition(1, 0);
		this._colorCustomButtons[2].setColor($dataAchievsMenu.AchievsInfo.collectColor || '#ffffff');
		this._colorCustomButtons[2].onColorSelected = function(color) {
			this.setColor(color);
			$dataAchievsMenu.AchievsInfo.collectColor = color;
			this.parent.parent._selectedWindow.reinitCollectButton();
		};
		this._colorCustomButtons[2].visible = true;
		//AchievsInfo - Scroll color 2
		this._customBaseSprite.bitmap.drawText('SCROLL COLOR 2', x2, y2, 175, 12);
		this._colorCustomButtons[3].description = "The color used to draw the scroll bar's scroller";
		this._colorCustomButtons[3]._prop = 'scrollColor2';
		this._colorCustomButtons[3].setPosition(1, 1);
		this._colorCustomButtons[3].setColor($dataAchievsMenu.AchievsInfo.scrollColor2 || '#ffffff');
		this._colorCustomButtons[3].onColorSelected = onColorSelected;
		this._colorCustomButtons[3].visible = true;

		this._getPgButtons[0].text = 'COLLECT 1';
		this._getPgButtons[1].text = 'COLLECT 2';
		this._getPgButtons[2].text = 'MAIN';
	} else if (pageName === 'COLLECT 1') {
		//AchievsInfo - Collect X
		this._customBaseSprite.bitmap.drawText('COLLECT\'S X', x1, y1, 175, 12);
		this._customEntries[0].description = 'The X coordinate for the collect button';
		this._customEntries[0].x = x1;
		this._customEntries[0].y = y1 + 12;
		this._customEntries[0].value = $dataAchievsMenu.AchievsInfo.collectX;
		this._customEntries[0].visible = true;
		this._customEntries[0]._deselectMethod = function() {
			$dataAchievsMenu.AchievsInfo.collectX = this.value;
			var selected = this.parent.parent._selectedWindow;
			if (selected._collectButton) {
				selected._collectButton.x = $dataAchievsMenu.AchievsInfo.collectX;
			} else {
				selected.initCollectButton();
			}
		};
		//AchievsInfo - Collect width
		this._customBaseSprite.bitmap.drawText('COLLECT\'S WIDTH', x2, y1, 175, 12);
		this._customEntries[1].description = "The collect button's width";
		this._customEntries[1].x = x2;
		this._customEntries[1].y = y1 + 12;
		this._customEntries[1].value = $dataAchievsMenu.AchievsInfo.collectWidth;
		this._customEntries[1]._deselectMethod = function() {
			$dataAchievsMenu.AchievsInfo.collectWidth = this.value;
			var selected = this.parent.parent._selectedWindow;
			selected._collectButton ? selected.reinitCollectButton() : selected.initCollectButton();
		};
		this._customEntries[1].visible = true;
		//AchievsInfo - Collect Y
		this._customBaseSprite.bitmap.drawText('COLLECT\'S Y', x1, y2, 175, 12);
		this._customEntries[2].description = 'The Y coordinate for the collect button';
		this._customEntries[2].x = x1;
		this._customEntries[2].y = y2 + 12;
		this._customEntries[2].value = $dataAchievsMenu.AchievsInfo.collectY;
		this._customEntries[2]._deselectMethod = function() {
			$dataAchievsMenu.AchievsInfo.collectY = this.value;
			var selected = this.parent.parent._selectedWindow;
			if (selected._collectButton) {
				selected._collectButton.y = $dataAchievsMenu.AchievsInfo.collectY;
			} else {
				selected.initCollectButton();
			}
		};
		this._customEntries[2].visible = true;
		//AchievsInfo - Collect height
		this._customBaseSprite.bitmap.drawText('COLLECT\'S HEIGHT', x2, y2, 175, 12);
		this._customEntries[3].description = "The collect button's height";
		this._customEntries[3].x = x2;
		this._customEntries[3].y = y2 + 12;
		this._customEntries[3].value = $dataAchievsMenu.AchievsInfo.collectHeight;
		this._customEntries[3]._deselectMethod = function() {
			$dataAchievsMenu.AchievsInfo.collectHeight = this.value;
			var selected = this.parent.parent._selectedWindow;
			selected._collectButton ? selected.reinitCollectButton() : selected.initCollectButton();
		};
		this._customEntries[3].visible = true;

		this._getPgButtons[0].text = 'MAIN';
		this._getPgButtons[1].text = 'COLLECT 2';
		this._getPgButtons[2].text = 'COLORS';
	} else if (pageName === 'COLLECT 2') {
		//AchievsInfo - Collect text
		this._customBaseSprite.bitmap.drawText('COLLECT TEXT', x1, y1, 175, 12);
		this._customEntries[0].description = "The text drawn on the collect button when the reward is available";
		this._customEntries[0].x = x1;
		this._customEntries[0].y = y1 + 12;
		this._customEntries[0].value = $dataAchievsMenu.AchievsInfo.collect;
		this._customEntries[0]._deselectMethod = function() {
			var value = this.value;
			$dataAchievsMenu.AchievsInfo.collect = value;
			var selected = this.parent.parent._selectedWindow;
			if (selected._collectButton) {
				selected._collectButton.text = value;
			} else {
				selected.initCollectButton();
			}
		};
		this._customEntries[0].visible = true;
		//AchievsInfo's Rewards
		this._customBaseSprite.bitmap.drawText('COLLECTED TEXT', x2, y1, 175, 12);
		this._customEntries[1].description = "The text drawn on the collect button when the reward's already been collected";
		this._customEntries[1].x = x2;
		this._customEntries[1].y = y1 + 12;
		this._customEntries[1].value = $dataAchievsMenu.AchievsInfo.collected;
		this._customEntries[1]._deselectMethod = function() {
			var value = this.value;
			$dataAchievsMenu.AchievsInfo.collected = value;
			var selected = this.parent.parent._selectedWindow;
			if (selected._collectButton) {
				selected._collectButton.text = value;
			} else {
				selected.initCollectButton();
			}
		};
		this._customEntries[1].visible = true;
		//AchievsInfo - Collect image
		this._customBaseSprite.bitmap.drawText('COLLECT IMAGE', x1, y2, 175, 12);
		this._customButtons[0].description = "This image will be drawn as the collect button's background";
		this._customButtons[0].x = x1;
		this._customButtons[0].y = y2 + 12;
		this._customButtons[0].text = $dataAchievsMenu.AchievsInfo.collectImage || '<none>';
		this._customButtons[0].onClick = (() => this.startImageSelector(this._customButtons[0])).bind(this);
		this._customButtons[0].onImageSelected = function(imageName) {
			this.text = imageName;
			imageName = imageName !== '<none>' ? imageName : '';
			$dataAchievsMenu.AchievsInfo.collectImage = imageName;
			var selected = this.parent.parent._selectedWindow;
			if (selected._collectButton) {
				selected._collectButton._data.img = imageName ? 'achievements/' + imageName : null;
				selected._collectButton.redrawBackground();
			} else {
				selected.initCollectButton();
			}
		};
		this._customButtons[0].visible = true;
		//AchievsInfo - Collect border size
		this._customBaseSprite.bitmap.drawText('COLLECT BORDER SIZE', x2, y2, 175, 12);
		this._customEntries[4].description = "The thickness of the collect button's borders";
		this._customEntries[4].x = x2;
		this._customEntries[4].y = y2 + 12;
		this._customEntries[4].maxValue = 20;
		this._customEntries[4].value = $dataAchievsMenu.AchievsInfo.collectBorderSize;
		this._customEntries[4]._deselectMethod = function() {
			var value = Number(this.value);
			$dataAchievsMenu.AchievsInfo.collectBorderSize = value;
			var selected = this.parent.parent._selectedWindow;
			if (selected._collectButton) {
				selected.reinitCollectButton();
			} else {
				selected.initCollectButton();
			}
		};
		this._customEntries[4].visible = true;

		this._getPgButtons[0].text = 'MAIN';
		this._getPgButtons[1].text = 'COLLECT 1';
		this._getPgButtons[2].text = 'COLORS';
	} else {
		//AchievsInfo - Enabled
		this._customBaseSprite.bitmap.drawText('WINDOW STATE', x1, y1, 175, 12);
		this._customButtons[0].description = "If DISABLED, the info window won't appear when you select an achievement";
		this._customButtons[0].x = x1;
		this._customButtons[0].y = y1 + 12;
		this._customButtons[0].text = $dataAchievsMenu.AchievsInfo.enabled ? 'ENABLED' : 'DISABLED';
		this._customButtons[0].onClick = function() {
			var state = this.text === 'ENABLED' ? false : true;
			this.text = state ? 'ENABLED' : 'DISABLED';
			$dataAchievsMenu.AchievsInfo.enabled = state;
		};
		this._customButtons[0].visible = true;
		//AchievsInfo - Requirement
		this._customBaseSprite.bitmap.drawText('REQUIREMENT', x2, y1, 175, 12);
		this._customEntries[1].description = "The requirements' title";
		this._customEntries[1].x = x2;
		this._customEntries[1].y = y1 + 12;
		this._customEntries[1].value = $dataAchievsMenu.AchievsInfo.requirements;
		this._customEntries[1]._deselectMethod = function() {
			var value = this.value;
			var infoWindow = this.parent.parent._selectedWindow;
			if ($dataAchievsMenu.AchievsInfo.requirements && !value) {
				infoWindow._requirementsList.y -= 28;
				if (infoWindow._rewardsList) {
					infoWindow._rewardsList.y -= 28;
				}
			} else if (!$dataAchievsMenu.AchievsInfo.requirements && value) {
				infoWindow._requirementsList.y += 28;
				if (infoWindow._rewardsList) {
					infoWindow._rewardsList.y += 28;
				}
			}
			$dataAchievsMenu.AchievsInfo.requirements = value;
			infoWindow.refresh();
		};
		this._customEntries[1].visible = true;
		//AchievsInfo - None
		this._customBaseSprite.bitmap.drawText('NONE', x1, y2, 175, 12);
		this._customEntries[2].description = "The text drawn when there's no requirements/rewards";
		this._customEntries[2].x = x1;
		this._customEntries[2].y = y2 + 12;
		this._customEntries[2].value = $dataAchievsMenu.AchievsInfo.none;
		this._customEntries[2]._deselectMethod = function() {
			var value = this.value;
			$dataAchievsMenu.AchievsInfo.none = value;
			var infoWindow = this.parent.parent._selectedWindow;
			var achievement = infoWindow._data;
			if (achievement) {
				if (!achievement.requirements.length) {
					infoWindow._requirementsList._items[0].text = value;
					infoWindow._requirementsList.redrawItem(0);
				}
				if (!achievement.rewards.length && infoWindow._rewardsList) {
					infoWindow._rewardsList._items[0].text = value;
					infoWindow._rewardsList.redrawItem(0);
				}
			}
		};
		this._customEntries[2].visible = true;
		//AchievsInfo - Rewards
		this._customBaseSprite.bitmap.drawText('REWARDS', x2, y2, 175, 12);
		this._customEntries[3].description = "The rewards' title";
		this._customEntries[3].x = x2;
		this._customEntries[3].y = y2 + 12;
		this._customEntries[3].value = $dataAchievsMenu.AchievsInfo.rewards;
		this._customEntries[3]._deselectMethod = function() {
			var value = this.value;
			var infoWindow = this.parent.parent._selectedWindow;
			if ($dataAchievsMenu.AchievsInfo.rewards && !value) {
				if (infoWindow._rewardsList) {
					infoWindow._rewardsList.y -= 28;
				}
			} else if (!$dataAchievsMenu.AchievsInfo.rewards && value) {
				if (infoWindow._rewardsList) {
					infoWindow._rewardsList.y += 28;
				}
			}
			$dataAchievsMenu.AchievsInfo.rewards = value;
			infoWindow.refresh();
		};
		this._customEntries[3].visible = true;
		//AchievsInfo - Unlocked ON
		this._customBaseSprite.bitmap.drawText('UNLOCKED ON', x1, y3, 175, 12);
		this._customEntries[0].description = "Text showing the achievement's unlocked date\n";
		this._customEntries[0].description += "Check out the plugin's help section to see replaceable tags";
		this._customEntries[0].x = x1;
		this._customEntries[0].y = y3 + 12;
		this._customEntries[0].value = $dataAchievsMenu.AchievsInfo.unlockedOn;
		this._customEntries[0].visible = true;
		this._customEntries[0]._deselectMethod = function() {
			$dataAchievsMenu.AchievsInfo.unlockedOn = this.value;
			this.parent.parent._selectedWindow.refresh();
		};
		//AchievsInfo - Achievement On Window
		this._customBaseSprite.bitmap.drawText('ACHIEVEMENT', x2, y3, 175, 12);
		this._customSelectors[0].description = "Change the currently drawn achievement";
		this._customSelectors[0].x = x2;
		this._customSelectors[0].y = y3 + 12;
		this._customSelectors[0].setList($dataAchievements.map(a => a.id + '. ' + a.name));
		var index = SceneManager._scene._infoWindow._data ? SceneManager._scene._infoWindow._data.id - 1 : 0;
		this._customSelectors[0].selectItem(index);
		this._customSelectors[0].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			var id = values[0] ? Number(values[0].split('.')[0]) : null;
			this.parent.parent._selectedWindow.setData($gameSystem.achievement(id));
			this.parent.parent._selectedWindow.refresh();
		};
		this._customSelectors[0].visible = true;

		this._getPgButtons[0].text = 'COLLECT 1';
		this._getPgButtons[1].text = 'COLLECT 2';
		this._getPgButtons[2].text = 'COLORS';
	}
};

Editor_AchievsMenu.prototype.getPageSortOption = function(pageName) {
	var x1 = this.getButtonX(0), x2 = this.getButtonX(1);
	var y1 = this.getButtonY(0), y2 = this.getButtonY(1), y3 = this.getButtonY(2);
	this.resetCustomButtons();
	this._customBaseSprite.bitmap.clear();
	this._wskinEntry.enabled = false;
	this._getPgButtons[1].visible = true;
	this._getPgButtons[1].onClick = (() => this.getPageSortOption(this._getPgButtons[1].text)).bind(this);
	if (pageName === 'OPTIONS') {
		//SortOption - New option
		this._customBaseSprite.bitmap.drawText('NEW SORT OPTION', x1, y1, 175, 12);
		this._customButtons[0].description = 'Create a new sort option';
		this._customButtons[0].x = x1;
		this._customButtons[0].y = y1 + 12;
		this._customButtons[0].text = 'NEW';
		this._customButtons[0].onClick = function() {
			var symbol = 'Opt ' + $dataAchievsMenu.SortOption.options.length;
			var script = 'main = unlocked.concat(locked);\n';
			script += "main.sort((a, b) => a._name.localeCompare(b._name, 'en', { sensitivity: 'base' }));";
			var option = { symbol, script };
			$dataAchievsMenu.SortOption.options.push(option);
			var itemList = $dataAchievsMenu.SortOption.options.map(a => a.symbol);
			this.parent.parent._customSelectors[0].add(symbol);
			this.parent.parent._customSelectors[0].selectItem(itemList.length-1);
			this.parent.parent._selectedWindow.add(symbol);
			if (itemList.length === 1) {
				this.parent.parent._selectedWindow.selectItem(0);
			}
		};
		this._customButtons[0].visible = true;
		//SortOption - Delete option
		this._customBaseSprite.bitmap.drawText('DELETE SORT OPTION', x2, y1, 175, 12);
		this._customButtons[1].description = 'Delete the selected sort option';
		this._customButtons[1].x = x2;
		this._customButtons[1].y = y1 + 12;
		this._customButtons[1].text = 'DELETE';
		this._customButtons[1].onClick = function() {
			var index = this.parent.parent._customSelectors[0].selectedIndexes()[0];
			if (index != null) {
				$dataAchievsMenu.SortOption.options.splice(index, 1);
				this.parent.parent._customSelectors[0].remove(index);
				this.parent.parent._selectedWindow.remove(index);
				if (this.parent.parent._customSelectors[0].isEmpty()) {
					this.parent.parent._customSelectors[0]._data.value = [];
					this.parent.parent._customSelectors[0].redrawMyText();
					this.parent.parent._selectedWindow._data.value = [];
					this.parent.parent._selectedWindow.redrawMyText();
					this.parent.parent._customEntries[0].value = '';
					this.parent.parent._bigEntry.value = '';
					this.parent.parent._selectedWindow.enabled = false;
					$dataAchievsMenu.SortOption.enabled = false;
				} else {
					this.parent.parent._customSelectors[0].selectItem(0);
					this.parent.parent._selectedWindow.selectItem(0);
				}
			}
		};
		this._customButtons[1].visible = true;
		//SortOption - Options list
		var isList = $dataAchievsMenu.SortOption.options.length;
		var itemList = [];
		if (isList) {
			itemList = $dataAchievsMenu.SortOption.options.map(a => a.symbol);
		}
		this._customBaseSprite.bitmap.drawText('OPTIONS', x1, y2, 175, 12);
		this._customSelectors[0].description = 'Select a sort option to edit it';
		this._customSelectors[0].x = x1;
		this._customSelectors[0].y = y2 + 12;
		this._customSelectors[0].setList(itemList);
		this._customSelectors[0].selectItem(0);
		this._customSelectors[0].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			var index = indexes[0];
			if (index == null) {
				this.parent.parent._customEntries[0].value = '';
				this.parent.parent._bigEntry.value = '';
			} else {
				var symbol = $dataAchievsMenu.SortOption.options[index].symbol;
				var script = $dataAchievsMenu.SortOption.options[index].script;
				this.parent.parent._customEntries[0].value = symbol;
				this.parent.parent._bigEntry.value = script;
			}
		};
		this._customSelectors[0].visible = true;
		//SortOption - Option name
		this._customBaseSprite.bitmap.drawText('OPTION NAME', x2, y2, 175, 12);
		this._customEntries[0].description = "Change the selected sort option's name";
		this._customEntries[0].x = x2;
		this._customEntries[0].y = y2 + 12;
		this._customEntries[0].value = isList ? $dataAchievsMenu.SortOption.options[0].symbol : '';
		this._customEntries[0]._deselectMethod = function() {
			var index = this.parent.parent._customSelectors[0].selectedIndexes()[0];
			if (index != null) {
				var value = this.value || 'Opt ' + index;
				$dataAchievsMenu.SortOption.options[index].symbol = value;
				this.parent.parent._customSelectors[0]._options._items[index].text = value;
				this.parent.parent._customSelectors[0]._options.redrawItem(index);
				this.parent.parent._customSelectors[0]._data.value = [value];
				this.parent.parent._customSelectors[0].redraw();
				this.parent.parent._selectedWindow._options._items[index].text = value;
				this.parent.parent._selectedWindow._options.redrawItem(index);
				if (this.parent.parent._selectedWindow.selectedIndexes()[0] === index) {
					this.parent.parent._selectedWindow._data.value = [value];
					this.parent.parent._selectedWindow.redraw();
				}
			}
		};
		this._customEntries[0].visible = true;
		//SortOption - Option script
		this._customBaseSprite.bitmap.drawText('OPTION SCRIPT', x1, y3, 175, 12);
		this._bigEntry.description = "Create/edit a script using JS, this script will be called when this option is selected\n";
		this._bigEntry.description += "Check out the plugin's help section for instructions";
		this._bigEntry.x = x1;
		this._bigEntry.y = y3 + 12;
		this._bigEntry.value = isList ? $dataAchievsMenu.SortOption.options[0].script : '';
		this._bigEntry._deselectMethod = function() {
			var index = this.parent.parent._customSelectors[0].selectedIndexes()[0];
			if (index != null) {
				var value = this.value;
				$dataAchievsMenu.SortOption.options[index].script = value;
			}
		};
		this._bigEntry.visible = true;

		this._getPgButtons[1].text = 'MAIN';
	} else {
		function onColorSelected (color) {
			this.setColor(color);
			$dataAchievsMenu.SortOption[this._prop] = color;
			var prop = this._prop === 'backgroundColor' ? 'backColor' : this._prop;
			this.parent.parent._selectedWindow[prop] = color;
		};
		//SortOption - State
		this._customBaseSprite.bitmap.drawText('SORT OPTION STATE', x1, y1, 175, 12);
		this._customButtons[0].description = "If DISABLED, the sort option won't be created on the menu,\n";
		this._customButtons[0].description += "unless you're playtesting with the editor";
		this._customButtons[0].x = x1;
		this._customButtons[0].y = y1 + 12;
		this._customButtons[0].text = $dataAchievsMenu.SortOption.enabled ? 'ENABLED' : 'DISABLED';
		this._customButtons[0].onClick = function() {
			if (!$dataAchievsMenu.SortOption.options.length) return;
			var state = this.text === 'ENABLED' ? false : true;
			this.text = state ? 'ENABLED' : 'DISABLED';
			$dataAchievsMenu.SortOption.enabled = state;
			this.parent.parent._selectedWindow.enabled = state;
		};
		this._customButtons[0].visible = true;
		//SortOption - Text color
		this._customBaseSprite.bitmap.drawText('TEXT COLOR', x2, y1, 175, 12);
		this._colorCustomButtons[0].description = 'The default color used to draw texts';
		this._colorCustomButtons[0]._prop = 'textColor';
		this._colorCustomButtons[0].setPosition(0, 1);
		this._colorCustomButtons[0].setColor($dataAchievsMenu.SortOption.textColor || '#ffffff');
		this._colorCustomButtons[0].onColorSelected = onColorSelected;
		this._colorCustomButtons[0].visible = true;
		//SortOption - Border color
		this._customBaseSprite.bitmap.drawText('BORDER COLOR', x1, y2, 175, 12);
		this._colorCustomButtons[1].description = "The color used to draw the sort option's borders";
		this._colorCustomButtons[1]._prop = 'borderColor';
		this._colorCustomButtons[1].setPosition(1, 0);
		this._colorCustomButtons[1].setColor($dataAchievsMenu.SortOption.borderColor || '#ffffff');
		this._colorCustomButtons[1].onColorSelected = onColorSelected;
		this._colorCustomButtons[1].visible = true;
		//SortOption - Background color
		this._customBaseSprite.bitmap.drawText('BACKGROUND COLOR', x2, y2, 175, 12);
		this._colorCustomButtons[2].description = "The color used to draw the sort option's background";
		this._colorCustomButtons[2]._prop = 'backgroundColor';
		this._colorCustomButtons[2].setPosition(1, 1);
		this._colorCustomButtons[2].setColor($dataAchievsMenu.SortOption.backgroundColor || '#ffffff');
		this._colorCustomButtons[2].onColorSelected = onColorSelected;
		this._colorCustomButtons[2].visible = true;
		//SortOption - Border size
		this._customBaseSprite.bitmap.drawText('BORDER SIZE', 15, 94, 175, 12);
		this._customEntries[0].description = "The thickness of the sort option's borders";
		this._customEntries[0].x = 15;
		this._customEntries[0].y = 106;
		this._customEntries[0].redefine({ filter:'number', minValue:0, maxValue:20 });
		this._customEntries[0].value = $dataAchievsMenu.SortOption.borderSize;
		this._customEntries[0]._deselectMethod = function() {
			var size = Number(this.value);
			$dataAchievsMenu.SortOption.borderSize = size;
			this.parent.parent._selectedWindow.borderSize = size;
		};
		this._customEntries[0].visible = true;

		this._getPgButtons[1].text = 'OPTIONS';
	}
};

Editor_AchievsMenu.prototype.getPagePopUp = function(pageName) {
	var x1 = this.getButtonX(0), x2 = this.getButtonX(1);
	var y1 = this.getButtonY(0), y2 = this.getButtonY(1), y3 = this.getButtonY(2);
	this.resetCustomButtons();
	this._customBaseSprite.bitmap.clear();
	this._getPgButtons[0].visible = true;
	this._getPgButtons[0].onClick = (() => this.getPagePopUp(this._getPgButtons[0].text)).bind(this);
	this._getPgButtons[1].description = "See how would it be to unlock the first achievement";
	this._getPgButtons[1].visible = true;
	this._getPgButtons[1].text = 'TEST UNLOCK';
	this._getPgButtons[1].onClick = function() {
			if (!$dataAchievements.length) return;
			this._testCount = 0;
			this.parent.parent._selectedWindow.update = function() {
				Achievement_PopUp.prototype.update.call(this);
				if (this._testCount > 0) {
					if (--this._testCount  < 1) {
						this.opacity = 255;
					}
				}
			};
			this.parent.parent._selectedWindow.clear();
			this.parent.parent._selectedWindow._testing = true;
			this.parent.parent._selectedWindow.onAnimationOver = function() {
				var isOver = this._isOutAnim;
				Achievement_PopUp.prototype.onAnimationOver.call(this);
				if (isOver) {
					this._testCount = 30;
				}
			};
			// $dataAchievements[0].lock();
			// $dataAchievements[0].unlock();
			SMO.AM.addToPopUpQueue(1);
		};
	this._getPgButtons[2].visible = true;
	this._getPgButtons[2].onClick = (() => this.getPagePopUp(this._getPgButtons[2].text)).bind(this);
	this._opacityEntry.enabled = false;
	this._selectedWindow.opacity = 255;
	this._wskinEntry.enabled = false;
	if (pageName === 'CUSTOM EASING') {
		//PopUp - Custom easing in
		this._customBaseSprite.bitmap.drawText('CUSTOM EASING ON POP', x1, y1, 175, 12);
		this._bigEntry.description = 'Write a custom easing formula using JS for when the pop up appears\n';
		this._bigEntry.description += "The easing type must be 'Custom' (Check out the 'Animation' tab)";
		this._bigEntry.x = x1;
		this._bigEntry.y = y1 + 12;
		this._bigEntry.value = $dataAchievsMenu.PopUp.customEasingIn;
		this._bigEntry._deselectMethod = function() {
			$dataAchievsMenu.PopUp.customEasingIn = this.value;
		};
		this._bigEntry.visible = true;
		//PopUp - Custom easing out
		this._customBaseSprite.bitmap.drawText('CUSTOM EASING ON HIDE', x1, 72, 175, 12);
		this._bigEntry2.description = 'Write a custom easing formula using JS for when the pop up disappears\n';
		this._bigEntry2.description += "The easing type must be 'Custom' (Check out the 'Animation' tab)";
		this._bigEntry2.x = x1;
		this._bigEntry2.y = 84;
		this._bigEntry2.value = $dataAchievsMenu.PopUp.customEasingOut;
		this._bigEntry2._deselectMethod = function() {
			$dataAchievsMenu.PopUp.customEasingOut = this.value;
		};
		this._bigEntry2.visible = true;

		this._getPgButtons[0].text = 'ANIMATION';
		this._getPgButtons[2].text = 'MAIN';
	} else if (pageName === 'ANIMATION') {
		//PopUp - Move in
		var itemList = ['None', 'Upwards', 'Rightwards', 'Downwards', 'Leftwards'];
		var index = itemList.indexOf($dataAchievsMenu.PopUp.moveIn);
		this._customBaseSprite.bitmap.drawText('MOVE IN', x1, y1, 175, 12);
		this._customSelectors[0].description = 'Choose a direction to which the pop up will go when it appears';
		this._customSelectors[0].x = x1;
		this._customSelectors[0].y = y1 + 12;
		this._customSelectors[0].setList(itemList);
		this._customSelectors[0].selectItem(index);
		this._customSelectors[0].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.PopUp.moveIn = values[0] || 'None';
		};
		this._customSelectors[0].visible = true;
		//PopUp - Size in
		var itemList = ['No size change', 'Size increase', 'Size decrease'];
		var index = itemList.indexOf($dataAchievsMenu.PopUp.sizeIn);
		this._customBaseSprite.bitmap.drawText('SIZE IN', x2, y1, 175, 12);
		this._customSelectors[1].description = "Choose the pop up's size change when it appears";
		this._customSelectors[1].x = x2;
		this._customSelectors[1].y = y1 + 12;
		this._customSelectors[1].setList(itemList);
		this._customSelectors[1].selectItem(index);
		this._customSelectors[1].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.PopUp.sizeIn = values[0] || 'None';
		};
		this._customSelectors[1].visible = true;
		//PopUp - Move out
		var itemList = ['None', 'Upwards', 'Rightwards', 'Downwards', 'Leftwards'];
		var index = itemList.indexOf($dataAchievsMenu.PopUp.moveOut);
		this._customBaseSprite.bitmap.drawText('MOVE OUT', x1, y2, 175, 12);
		this._customSelectors[2].description = 'Choose a direction to which the pop up will go when it disappears';
		this._customSelectors[2].x = x1;
		this._customSelectors[2].y = y2 + 12;
		this._customSelectors[2].setList(itemList);
		this._customSelectors[2].selectItem(index);
		this._customSelectors[2].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.PopUp.moveOut = values[0] || 'None';
		};
		this._customSelectors[2].visible = true;
		//PopUp's size out
		var itemList = ['No size change', 'Size increase', 'Size decrease'];
		var index = itemList.indexOf($dataAchievsMenu.PopUp.sizeOut);
		this._customBaseSprite.bitmap.drawText('SIZE OUT', x2, y2, 175, 12);
		this._customSelectors[3].description = "Choose the pop up's size change when it disappears";
		this._customSelectors[3].x = x2;
		this._customSelectors[3].y = y2 + 12;
		this._customSelectors[3].setList(itemList);
		this._customSelectors[3].selectItem(index);
		this._customSelectors[3].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.PopUp.sizeOut = values[0] || 'None';
		};
		this._customSelectors[3].visible = true;
		//PopUp's fading
		var itemList = ['None', 'Fade In', 'Fade Out', 'Fade In and Out'];
		var index = itemList.indexOf($dataAchievsMenu.PopUp.fading);
		this._customBaseSprite.bitmap.drawText('FADING', x1, y3, 175, 12);
		this._customSelectors[4].description = 'Choose between fading the pop up when it appears, when it disappears,\n';
		this._customSelectors[4].description += 'on both situations or in none';
		this._customSelectors[4].x = x1;
		this._customSelectors[4].y = y3 + 12;
		this._customSelectors[4].setList(itemList);
		this._customSelectors[4].selectItem(index);
		this._customSelectors[4].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.PopUp.fading = values[0] || 'None';
		};
		this._customSelectors[4].visible = true;
		//PopUp's easing
		var itemList = ['None', 'Quadratic', 'Cubic', 'Back', 'Custom'];
		var index = itemList.indexOf($dataAchievsMenu.PopUp.easing);
		this._customBaseSprite.bitmap.drawText('EASING', x2, y3, 175, 12);
		this._customSelectors[5].description = "Choose an easing formula or select 'Custom' to enable the custom easing";
		this._customSelectors[5].x = x2;
		this._customSelectors[5].y = y3 + 12;
		this._customSelectors[5].setList(itemList);
		this._customSelectors[5].selectItem(index);
		this._customSelectors[5].onOptionChange = function(values, indexes, skipSound) {
			SButton_Select.prototype.onOptionChange.call(this, values, indexes, skipSound);
			$dataAchievsMenu.PopUp.easing = values[0];
		};
		this._customSelectors[5].visible = true;

		this._getPgButtons[0].text = 'MAIN';
		this._getPgButtons[2].text = 'CUSTOM EASING';
	} else {
		//PopUp - State
		this._customBaseSprite.bitmap.drawText('POP UP STATE', x1, y1, 175, 12);
		this._customButtons[0].description = "If DISABLED, the pop up won't be created in any scene,\n";
		this._customButtons[0].description += "unless you're playtesting with the editor";
		this._customButtons[0].x = x1;
		this._customButtons[0].y = y1 + 12;
		this._customButtons[0].text = $dataAchievsMenu.PopUp.enabled ? 'ENABLED' : 'DISABLED';
		this._customButtons[0].onClick = function() {
			var state = this.text === 'ENABLED' ? false : true;
			this.text = state ? 'ENABLED' : 'DISABLED';
			$dataAchievsMenu.PopUp.enabled = state;
		};
		this._customButtons[0].visible = true;
		//PopUp - Border color
		this._customBaseSprite.bitmap.drawText('BORDER COLOR', x2, y1, 175, 12);
		this._colorCustomButtons[0].description = "The color of the pop up's borders when no AutoColor is active";
		this._colorCustomButtons[0]._prop = 'textColor';
		this._colorCustomButtons[0].setPosition(0, 1);
		this._colorCustomButtons[0].setColor($dataAchievsMenu.PopUp.borderColor || '#ffffff');
		this._colorCustomButtons[0].onColorSelected = function(color) {
			this.text = color;
			this.backColor = color;
			$dataAchievsMenu.PopUp.borderColor = color;
			this.parent.parent._selectedWindow.drawMe(1);
		};
		this._colorCustomButtons[0].visible = true;
		//PopUp - Is button
		this._customBaseSprite.bitmap.drawText('SHOULD THE POP UP BE A BUTTON?', x1, y2, 175, 12);
		this._customButtons[1].description = 'If active, the pop up will become a button while on the map scene';
		this._customButtons[1].x = x1;
		this._customButtons[1].y = y2 + 12;
		this._customButtons[1].text = $dataAchievsMenu.PopUp.button ? 'YEAH' : 'NO WAY';
		this._customButtons[1].onClick = function() {
			var state = this.text === 'YEAH' ? false : true;
			this.text = state ? 'YEAH' : 'NO WAY';
			$dataAchievsMenu.PopUp.button = state;
		};
		this._customButtons[1].visible = true;
		//PopUp - Border size
		this._customBaseSprite.bitmap.drawText('BORDER SIZE', x2, y2, 175, 12);
		this._customEntries[0].description = "The thickness of the pop up's borders";
		this._customEntries[0].x = x2;
		this._customEntries[0].y = y2 + 12;
		this._customEntries[0].redefine({ filter:'number', minValue:0, maxValue:20 });
		this._customEntries[0].value = $dataAchievsMenu.PopUp.borderSize;
		this._customEntries[0]._deselectMethod = function() {
			$dataAchievsMenu.PopUp.borderSize = this.value;
			this.parent.parent._selectedWindow.drawMe(1);
		};
		this._customEntries[0].visible = true;
		//PopUp - Text format
		var popUpText = $dataAchievsMenu.PopUp.text;
		this._customBaseSprite.bitmap.drawText('TEXT FORMAT', x1, y3, 175, 12);
		this._bigEntry.description = "The pop up's text\n";
		this._bigEntry.description += "Check out some tags and their replaced values below\n";
		this._bigEntry.description += "<AchievName> -> The unlocked achievement's name            \n";
		this._bigEntry.description += "<AchievID> -> The unlocked achievement's ID                \n";
		this._bigEntry.description += "<AchievIcon> -> Draws the unlocked achievement's icon      \n";
		this._bigEntry.description += "<AchievCategory:n> -> The achievement's n-th category      \n";
		this._bigEntry.description += "<center> -> centralizes this line                          \n";
		this._bigEntry.description += "<right> -> aligns this line to the right side of the pop up";
		this._bigEntry.x = x1;
		this._bigEntry.y = y3 + 12;
		this._bigEntry.value = SMO.AM.translationEngine.on ? JSON.parse(popUpText) : popUpText;
		this._bigEntry._deselectMethod = function() {
			$dataAchievsMenu.PopUp.text = SMO.AM.translationEngine.on ? JSON.stringify(this.value) : this.value;
			this.parent.parent._selectedWindow.drawMe(1);
		};
		this._bigEntry.visible = true;

		this._getPgButtons[0].text = 'ANIMATION';
		this._getPgButtons[2].text = 'CUSTOM EASING';
	}
};

Editor_AchievsMenu.prototype.redrawCustomInfo = function() {
	this['getPage' + this._selectedWindow._name]();
};

Editor_AchievsMenu.prototype.selectWindow = function(windowName) {
	var scene = SceneManager._scene;
	var oldSelection = this._selectedWindow;
	if (oldSelection) {
		switch(oldSelection._name) {
		case 'Achievements':
			oldSelection.hide();
			scene.setCurrentCategory(null);
			break;
		case 'AchievsInfo':
			oldSelection.close();
			break;
		case 'SortOption':
			oldSelection.visible = false;
			break;
		case 'PopUp':
			oldSelection.opacity = 0;
			SceneManager._scene._windowSelector.borders.x = 0;
			SceneManager._scene._windowSelector.borders.y = 0;
			break;
		}
	}
	var newSelection = this._windows[windowName];
	if (!newSelection) {
		this._selectedWindow = null;
		SceneManager._scene.deselectWindow();
		return;
	}
	newSelection._name = windowName;
	scene.selectWindow(newSelection, windowName);
	switch(windowName) {
	case 'Achievements':
		scene._achievementsWindow._scrollY = 0;
		scene._achievementsWindow.show();
		if ($dataAchievsCategories.length) {
			var index = scene._categoriesWindow.index();
			var item = scene._categoriesWindow._data[index] || $dataAchievsCategories[0].name;
			scene.setCurrentCategory(item);
			if (!scene._achievementsWindow._catLoaded) {
				scene._achievementsWindow.refresh();
				scene._achievementsWindow._catLoaded = true;
			}
		}
		break;
	case 'AchievsInfo':
		newSelection.open($dataAchievements[0]);
		break;
	case 'SortOption':
		newSelection.visible = true;
		break;
	case 'PopUp':
		newSelection.opacity = 255;
		var selector = SceneManager._scene._windowSelector;
		selector.x = newSelection.x - Math.floor(newSelection.width / 2);
		selector.y = newSelection.y - Math.floor(newSelection.height / 2);
		if ($dataAchievements.length) {
			newSelection.drawMe(1);
		}
		break;
	}
	this._selectedWindow = newSelection;
	this.redrawWindowInfo();
};

Editor_AchievsMenu.prototype.open = function() {
	SWindow_Base.prototype.open.call(this);
	if (this._isSelectorOpen) {
		this._isSelectorOpen = false;
		return;
	}
	var scene = SceneManager._scene;
	this._windows = {
		'SceneName': scene._titleWindow,
		'Categories': scene._categoriesWindow,
		'Trophies': scene._trophiesWindow,
		'Achievements': scene._achievementsWindow,
		'AchievsInfo': scene._infoWindow,
		'PopUp': scene._achievsPopUp,
		'SortOption': scene._sortOption
	};

	var list = [
		{ name: 'Scene Name', align: 'center' },
		{ name: 'Categories', align: 'center' },
		{ name: 'Trophies', align: 'center' },
		{ name: 'Achievements', align: 'center' },
		{ name: 'Achievs Info', align: 'center' },
		{ name: 'Sort Option', align: 'center' },
		{ name: 'Pop Up', align: 'center' }
	];
	this._windowSelectList.setItemList(list);

	this._windowSelectList.selectItem(0);
};

Editor_AchievsMenu.prototype.close = function() {
	SWindow_Base.prototype.close.call(this);
	SceneManager._scene._achievementsWindow._catLoaded = false;
	if (this._selectedWindow && !this._isSelectorOpen) {
		this.selectWindow(null);
		this._windowSelectList.deselectAllItems();
		this._windowSelectList._data.value = [];
	}
	if (!this._isSelectorOpen && this._topStack) {
		this._topStack.open();
		this._topStack._isSelectorOpen = false;
	}
};

//==========================================================================================
// Category Editor - Create
//==========================================================================================
function Editor_AchievsCategories() {
	this.initialize.apply(this, arguments);
}

Editor_AchievsCategories.prototype = Object.create(SWindow_Base.prototype);
Editor_AchievsCategories.prototype.constructor = Editor_AchievsCategories;

//========================================
// Category Editor - Initialize

Editor_AchievsCategories.prototype.initialize = function() {
	var width = 605;
	var height = 584;
	var data = {
		title: 'Category Editor',
		titleBackground: '#1a1a1a',
		x: Math.ceil((Graphics.width - width)/2),
		y: Math.ceil((Graphics.height - height)/2),
		width: width,
		height: height,
		backColor: '#222222',
		hideSelect: true,
		fontSize: 16
	};
	SWindow_Base.prototype.initialize.call(this, data);
	this.refreshCategsList();
};

Editor_AchievsCategories.prototype.initValues = function(data) {
	SWindow_Base.prototype.initValues.call(this, data);
	this._fixedTone = true;
	this._isSelectorOpen = false;
	this._category = null;
	this._achievsDataChanged = false;
};

Editor_AchievsCategories.prototype.initTools = function(data) {
	SWindow_Base.prototype.initTools.call(this);
	this.initTopMenu();
	this.initLeftMenu();
	this.initRightMenu();
	this.initConfirmMenu();
};

Editor_AchievsCategories.prototype.initTopMenu = function() {
	this._topMenu = new Sprite();
	this._topMenu.x = 154;
	this._topMenu.y = 25;
	this.addChild(this._topMenu);

	var saveData = {
		text: '💾 SAVE  ',
		textAlign: 'center',
		description: 'Save all your changes in "/data/AchievsCategories.json"',
		x: 0,
		y: 0,
		width: 222,
		height: 18,
		fontSize: 14,
		backColor: '#55ff55',
		borderColor: '#99ff99',
		design: 'round-rect',
		hideSelect: true,
		onClick: this.saveData.bind(this)
	};
	this._saveButton = new SButton_Confirm(saveData);
	this._saveButton._saveMsgDelay = 0;
	this._saveButton.update = function() {
		SButton_Confirm.prototype.update.call(this);
		if (this._saveMsgDelay > 0) {
			if (--this._saveMsgDelay < 1) {
				this.text = '💾 SAVE  ';
			}
		}
	};
	this._topMenu.addChild(this._saveButton);

	var settingsData = {
		text: '⚙️ Settings  ',
		textAlign: 'center',
		description: "See the editor's settings (coming soon)",
		x: this.width - 380,
		y: 0,
		width: 222,
		height: 18,
		fontSize: 14,
		backColor: '#111111',
		design: 'round-rect',
		hideSelect: true,
		enabled: false
	};
	this._settingsButton = new SButton_Confirm(settingsData);
	this._topMenu.addChild(this._settingsButton);
};

Editor_AchievsCategories.prototype.initLeftMenu = function() {
	var sortData = {
		value: ['ID'],
		description: 'Sort your categories',
		x: 2,
		y: 44,
		width: 150,
		height: 22,
		backColor: '#000000',
		options: ['ID', 'A-z'],
		itemColors: ['#000000', '#000000'],
		fontSize: 16,
		borderSize: 1,
		textOffset: [3, 0],
		hideSelect: true,
		disabledTone: 0
	};
	this._sortCategButton = new SButton_Select(sortData);
	this._sortCategButton.onOptionChange = function(values, indexes) {
		SButton_Select.prototype.onOptionChange.call(this, values, indexes);
		this.parent.refreshCategsList();
	};
	this.addChild(this._sortCategButton);

	var newData = {
		text: 'NEW',
		textAlign: 'center',
		description: 'Create a new category',
		x: 2,
		y: 66,
		width: 150,
		height: 22,
		backColor: '#004400',
		fontSize: 16,
		borderSize: 1,
		hideSelect: true,
		disabledTone: 0,
		onClick: this.newCategory.bind(this)
	};
	this._newCategButton = new SButton_Confirm(newData);
	this.addChild(this._newCategButton);

	var listData = {
		x: 2,
		y: 88,
		width: 150,
		height: this.height-90,
		itemHeight: 25,
		backColor: '#000000',
		itemColors: ['#3e3e3e', '#555555'],
		fontSize: 16,
		borderSize: 1,
		hideSelect: true,
		disabledTone: 0
	};
	this._categsList = new Sprite_ItemList(listData, 1);
	this._categsList.onCancelled = function() {};
	this._categsList.isSelected = function() {
		var sceneBusy = SceneManager._scene.isSelecting() || SceneManager._scene.isTextInputSelected();
		var parentBusy = this.parent.isAnimating() || this.parent._confirmMenu.visible;
		return !sceneBusy && !parentBusy && this.parent.visible;
	};
	this._categsList.onItemSelected = function(index) {
		Sprite_ItemList.prototype.onItemSelected.call(this, index);
		this.parent._rightMenuBase.visible = true;
		this.parent.redrawCategoryInfo(this._items[index].text);
	};
	this._categsList.onItemDeselected = function(indexes) {
		if (!this.isAnyItemSelected()) {
			this.parent._rightMenuBase.visible = false;
			this.parent._moreOptBase.visible = false;
		}
	};
	this._categsList.selectItemAbove = function(ctrl, shift, preventLoop) {
		Sprite_ItemList.prototype.selectItemAbove.call(this, ctrl, shift);
		var itemName = this.getSelectedItemsTexts()[0];
		if (itemName.charCodeAt(0) === 13 && !preventLoop) {
			return this.selectItemAbove(ctrl, shift, true);
		}
	};
	this._categsList.selectNextItem = function(ctrl, shift, preventLoop) {
		Sprite_ItemList.prototype.selectNextItem.call(this, ctrl, shift);
		var itemName = this.getSelectedItemsTexts()[0];
		if (itemName.charCodeAt(0) === 13 && !preventLoop) {
			return this.selectNextItem(ctrl, shift, true);
		}
	};
	this._categsList.selectItemBeneath = function(ctrl, shift, preventLoop) {
		Sprite_ItemList.prototype.selectItemBeneath.call(this, ctrl, shift);
		var itemName = this.getSelectedItemsTexts()[0];
		if (itemName.charCodeAt(0) === 13 && !preventLoop) {
			return this.selectItemBeneath(ctrl, shift, true);
		}
	};
	this._categsList.selectPreviousItem = function(ctrl, shift, preventLoop) {
		Sprite_ItemList.prototype.selectPreviousItem.call(this, ctrl, shift);
		var itemName = this.getSelectedItemsTexts()[0];
		if (itemName.charCodeAt(0) === 13 && !preventLoop) {
			return this.selectPreviousItem(ctrl, shift, true);
		}
	};
	this.addChild(this._categsList);
};

Editor_AchievsCategories.prototype.initRightMenu = function() {
	this._rightMenuBase = new Sprite(new Bitmap(this.width - 155, this.height - 44));
	this._rightMenuBase.bitmap.fontSize = 12;
	this._rightMenuBase.x = 155;
	this._rightMenuBase.y = 44;
	var fontSize = this.txtChild.bitmap.fontSize-1;
	var drawText = this._rightMenuBase.bitmap.drawText.bind(this._rightMenuBase.bitmap);
	var drawLine = (function(y) {
						this.fillRect(20, y, this.width-40, 1, '#111111');
					}).bind(this._rightMenuBase.bitmap);
	this.drawMainBackground();

	drawText('CATEGORY NAME', 20, 10, 195, 15);
	var entryData = {
		description: 'Change the name of your category (maximun of 30 chars)',
		x: 20,
		y: 25,
		width: 195,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		maxDigits: 30,
		textOffset: [0, -1]
	};
	this._cNameEntry = new SButton_Text(entryData);
	this._cNameEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent.parent.changeCategNameTo(this.value);
	};
	this._cNameEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this._rightMenuBase.addChild(this._cNameEntry);

	drawText('SCENE NAME', 235, 10, 195, 15);
	entryData.x = 235;
	entryData.description = 'The scene name will change to this one while this category is open';
	this._mNameEntry = new SButton_Text(entryData);
	this._mNameEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent.parent._category.sceneName = this.value;
		this.parent.parent.refreshSceneTitle();
	};
	this._mNameEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this._rightMenuBase.addChild(this._mNameEntry);

	drawText('GLOBAL CATEGORY', 20, 55, 195, 15);
	var buttonData = {
		textAlign: 'center',
		x: 20,
		y: 70,
		width: 195,
		height: 20,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111'
	};
	buttonData.description = "The global category will be automatically added to all achievements.\n";
	buttonData.description += "Only one category may be global. Deactivating a global category will\n";
	buttonData.description += "automatically remove it from all achievements."
	buttonData.design = 'round-rect';
	buttonData.onClick = function() {
		if (this._globalCategoryButton.text === 'Global') {
			this._globalCategoryButton.text = 'Not Global';
			var name = this._category.name;
			if (SMO.AM.globalCategoryName === this._category.name) {
				SMO.AM.globalCategoryName = '';
				$dataAchievements.forEach(function(achievement) {
					var index = achievement.categories.indexOf(name);
					if (index > -1) { //remove the old global category
						var oldValue = achievement.categories.join(',');
						achievement.categories.splice(index, 1);
						var newValue = achievement.categories.join(',');
						this.addAchievAction(achievement, oldValue, newValue);
					}
					if (achievement.category === originalName) {
						achievement.category = achievement.categories[0] || '';
					}
				}.bind(this));
			}
		} else {
			this._globalCategoryButton.text = 'Global';
			var originalName = SMO.AM.globalCategoryName;
			var newName = this._category.name;
			//Replace the original global category with the new one
			if (originalName !== newName) {
				SMO.AM.globalCategoryName = newName;
				$dataAchievements.forEach(function(achievement) {
					var index = achievement.categories.indexOf(originalName);
					var oldValue = achievement.categories.join(',');
					var newValue = 0;
					if (index > -1) { //remove the old global category
						achievement.categories.splice(index, 1);
						newValue = achievement.categories.join(',');
					}
					if (achievement.categories.indexOf(newName) === -1) {
						achievement.categories.push(newName); //add the new global category
						newValue = achievement.categories.join(',');
					}
					if (newValue !== 0) {
						this.addAchievAction(achievement, oldValue, newValue);
					}
					if (achievement.category === originalName) {
						achievement.category = newName;
					}
				}.bind(this));
			}
		}
	}.bind(this);
	this._globalCategoryButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._globalCategoryButton);

	drawText('DELETE CATEGORY', 235, 55, 195, 15);
	buttonData.text = 'DELETE';
	buttonData.description = "By deleting this category you'll automatically\n";
	buttonData.description += "remove it from all achievements [DEL]";
	buttonData.onClick = this.confirmBeforeDeleting.bind(this);
	buttonData.x = 235;
	buttonData.y = 70;
	buttonData.backColor = '#aa0000';
	this._deleteButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._deleteButton);

	drawText('CATEGORY BACKGROUND', 20, 110, 195, 15);
	buttonData.text = null;
	buttonData.description = "This image will appear behind the category's name\nwhen selecting a category";
	buttonData.onClick = (() => this.startImageSelector(this._catBackgroundButton)).bind(this);
	buttonData.x = 20;
	buttonData.y = 125;
	buttonData.design = 'rect';
	buttonData.backColor = '#111111';
	this._catBackgroundButton = new SButton_Confirm(buttonData);
	this._catBackgroundButton.onImageSelected = function(imageName) {
		var editor = this.parent.parent;
		this.text = imageName;
		editor._category.img = imageName !== '<none>' ? imageName : '';
		editor.refreshCategoryOnWindow();
	};
	this._rightMenuBase.addChild(this._catBackgroundButton);

	drawText('SCENE BACKGROUND', 235, 110, 195, 15);
	buttonData.description = "The menu's background will change to this one\nwhile this category is open";
	buttonData.x = 235;
	buttonData.onClick = (() => this.startImageSelector(this._menuBackgroundButton)).bind(this);
	this._menuBackgroundButton = new SButton_Confirm(buttonData);
	this._menuBackgroundButton.onImageSelected = function(imageName) {
		var editor = this.parent.parent;
		this.text = imageName;
		editor._category.menuImg = imageName !== '<none>' ? imageName : '';
		this.parent.parent.refreshMenuBackground();
	};
	this._rightMenuBase.addChild(this._menuBackgroundButton);

	drawText('LOCKED ACHIEV BACKGROUND', 20, 155, 195, 15);
	buttonData.description = "The default image for locked achievements on this category";
	buttonData.design = null;
	buttonData.x = 20;
	buttonData.y = 170;
	buttonData.onClick = (() => this.startImageSelector(this._lockedAchievButton)).bind(this);
	this._lockedAchievButton = new SButton_Confirm(buttonData);
	this._lockedAchievButton.onImageSelected = function(imageName) {
		var editor = this.parent.parent;
		this.text = imageName;
		editor._category.lockedAchievImg = imageName !== '<none>' ? imageName : '';
		editor.refreshAchievementsWindow();
	};
	this._rightMenuBase.addChild(this._lockedAchievButton);

	drawText('SECRET ACHIEV BACKGROUND', 235, 155, 195, 15);
	buttonData.description = "The default image for secret achievements on this category";
	buttonData.x = 235;
	buttonData.y = 170;
	buttonData.onClick = (() => this.startImageSelector(this._secretAchievButton)).bind(this);
	this._secretAchievButton = new SButton_Confirm(buttonData);
	this._secretAchievButton.onImageSelected = function(imageName) {
		var editor = this.parent.parent;
		this.text = imageName;
		editor._category.secretAchievImg = imageName !== '<none>' ? imageName : '';
		editor.refreshAchievementsWindow();
	};
	this._rightMenuBase.addChild(this._secretAchievButton);

	drawText('AUTO COLOR', 20, 210, 195, 15);
	buttonData.description = "Choose a color to represent this category/trophy.";
	buttonData.x = 20;
	buttonData.y = 225;
	buttonData.cursorStyle = 'pointer';
	buttonData.design = 'round-rect';
	buttonData.onClick = (() => this.startColorSelector(this._autoColorButton)).bind(this);
	this._autoColorButton = new SButton_Confirm(buttonData);
	this._autoColorButton.onColorSelected = function(color) {
		var editor = this.parent.parent;
		this.text = color;
		this.backColor = color;
		editor._category.autoColor = editor._category.autoColor || {};
		editor._category.autoColor.color = color;
	};
	this._rightMenuBase.addChild(this._autoColorButton);

	drawText('CATEGORY', 235, 210, 92, 15);
	buttonData.description = "If set to 'Auto Color', the category's name on the\n";
	buttonData.description += "achievements menu will be drawn using the auto color.";
	buttonData.x = 235;
	buttonData.y = 225;
	buttonData.width = 92;
	buttonData.cursorStyle = null;
	buttonData.onClick = (function() {
		if (this._acCategoryButton.text === 'Default') {
			this._acCategoryButton.text = 'Auto Color';
			this._category.autoColor.category = true;
		} else {
			this._acCategoryButton.text = 'Default';
			this._category.autoColor.category = false;
		}
		this.refreshCategoryOnWindow();
	}).bind(this);
	this._acCategoryButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._acCategoryButton);

	drawText('ACHIEVS', 338, 210, 92, 15);
	buttonData.description = "If set to 'Auto Color', the achievements' names on the\n";
	buttonData.description += "achievements menu will be drawn using the auto color.";
	buttonData.x = 338;
	buttonData.onClick = (function() {
		if (this._acAchievsButton.text === 'Default') {
			this._acAchievsButton.text = 'Auto Color';
			this._category.autoColor.achievs = true;
		} else {
			this._acAchievsButton.text = 'Default';
			this._category.autoColor.achievs = false;
		}
		this.refreshAchievementsWindow();
	}).bind(this);
	this._acAchievsButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._acAchievsButton);

	drawText('SCENE NAME', 20, 255, 92, 15);
	buttonData.description = "If set to 'Auto Color', the scene's name on the\n";
	buttonData.description += "achievements menu will be drawn using the auto color,\n";
	buttonData.description += "but only when this category is open.";
	buttonData.x = 20;
	buttonData.y = 270;
	buttonData.onClick = (function() {
		if (this._acSceneNameButton.text === 'Default') {
			this._acSceneNameButton.text = 'Auto Color';
			this._category.autoColor.scene = true;
		} else {
			this._acSceneNameButton.text = 'Default';
			this._category.autoColor.scene = false;
		}
		this.refreshSceneTitle();
	}).bind(this);
	this._acSceneNameButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._acSceneNameButton);

	drawText('POP UP ACHIEV', 123, 255, 92, 15);
	buttonData.description = "If set to 'Auto Color', the achievement's name on the\n";
	buttonData.description += "pop up will be drawn using the auto color.";
	buttonData.x = 123;
	buttonData.onClick = (function() {
		if (this._acPupAchievButton.text === 'Default') {
			this._acPupAchievButton.text = 'Auto Color';
			this._category.autoColor.popUpAchiev = true;
		} else {
			this._acPupAchievButton.text = 'Default';
			this._category.autoColor.popUpAchiev = false;
		}
	}).bind(this);
	this._acPupAchievButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._acPupAchievButton);

	drawText('POP UP DESC', 235, 255, 92, 15);
	buttonData.description = "If set to 'Auto Color', the pop up's description\n";
	buttonData.description += "will be drawn using the auto color.";
	buttonData.x = 235;
	buttonData.onClick = (function() {
		if (this._acPupCatButton.text === 'Default') {
			this._acPupCatButton.text = 'Auto Color';
			this._category.autoColor.popUpDesc = true;
		} else {
			this._acPupCatButton.text = 'Default';
			this._category.autoColor.popUpDesc = false;
		}
	}).bind(this);
	this._acPupCatButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._acPupCatButton);

	drawText('POP UP BORDERS', 338, 255, 92, 15);
	buttonData.description = "If set to 'Auto Color', the pop up's borders\n";
	buttonData.description += "will be drawn using the auto color when one of\n";
	buttonData.description += "the achievements on this category is unlocked.";
	buttonData.x = 338;
	buttonData.onClick = (function() {
		if (this._acPupBordersButton.text === 'Default') {
			this._acPupBordersButton.text = 'Auto Color';
			this._category.autoColor.popUpBorders = true;
		} else {
			this._acPupBordersButton.text = 'Default';
			this._category.autoColor.popUpBorders = false;
		}
	}).bind(this);
	this._acPupBordersButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._acPupBordersButton);

	drawText("TROPHY'S MAIN IMAGE", 20, 310, 195, 15);
	buttonData.description = "This image will be shown on the menu when this trophy is unlocked.";
	buttonData.description += "\nbut it can still be unlocked.";
	buttonData.borderSize = 1;
	buttonData.cursorStyle = null;
	buttonData.x = 20;
	buttonData.y = 325;
	buttonData.width = 195;
	buttonData.height = 20;
	buttonData.design = 'rect';
	buttonData.onClick = (() => this.startImageSelector(this._trophyImageButton)).bind(this);
	this._trophyImageButton = new SButton_Confirm(buttonData);
	this._trophyImageButton.onImageSelected = function(imageName) {
		var editor = this.parent.parent;
		this.text = imageName;
		editor._category.Trophy.img = imageName !== '<none>' ? imageName : '';
		editor.refreshTrophiesWindow();
	};
	this._rightMenuBase.addChild(this._trophyImageButton);

	drawText('HIDE TROPHY?', 235, 310, 195, 15);
	buttonData.description = "If hidden, the player won't see it on the menu,";
	buttonData.x = 235;
	buttonData.design = 'round-rect';
	buttonData.onClick = (function() {
		if (this._hideTrophyButton.text === 'Yes') {
			this._hideTrophyButton.text = 'No';
			this._category.Trophy.hidden = false;
		} else {
			this._hideTrophyButton.text = 'Yes';
			this._category.Trophy.hidden = true;
		}
		this.refreshTrophiesWindow(true);
	}).bind(this);
	this._hideTrophyButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._hideTrophyButton);

	drawText("TROPHY'S LOCKED IMAGE", 20, 355, 195, 15);
	buttonData.description = "This image will be shown on the menu only while this trophy is locked.";
	buttonData.x = 20;
	buttonData.y = 370;
	buttonData.design = 'rect';
	buttonData.onClick = (() => this.startImageSelector(this._trophyLkImageButton)).bind(this);
	this._trophyLkImageButton = new SButton_Confirm(buttonData);
	this._trophyLkImageButton.onImageSelected = function(imageName) {
		var editor = this.parent.parent;
		this.text = imageName;
		editor._category.Trophy.lockedImg = imageName !== '<none>' ? imageName : '';
		editor.refreshTrophiesWindow();
	};
	this._rightMenuBase.addChild(this._trophyLkImageButton);

	drawText('PLAYTEST LOCK/UNLOCK', 235, 355, 195, 15);
	buttonData.description = "Test locking/unlocking this trophy.";
	buttonData.x = 235;
	buttonData.design = 'round-rect';
	buttonData.onClick = function() {
		if (this._unLockTestButton.text === 'Lock') {
			this._unLockTestButton.text = 'Unlock';
			SMO.AM.lockTrophy(this._category.id);
		} else {
			this._unLockTestButton.text = 'Lock';
			SMO.AM.unlockTrophy(this._category.id);
		}
		this.refreshTrophiesWindow();
	}.bind(this);
	this._unLockTestButton = new SButton_Confirm(buttonData);
	this._rightMenuBase.addChild(this._unLockTestButton);

	drawText("TROPHY'S DESCRIPTION", 20, 400, 410, 15);
	var bigEntryData = {
		x: 20,
		y: 415,
		width: 410,
		height: 42,
		fontSize: fontSize,
		borderSize: 1,
		backColor: '#111111',
		design: 'round-rect',
		maxLines: 10
	};
	bigEntryData.description = 'The description will be shown on the menu after the\n';
	bigEntryData.description += 'trophy is unlocked, and only when selected';
	this._descriptionEntry = new SButton_Text(bigEntryData);
	this._descriptionEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent.parent._category.Trophy.description = this.value;
	};
	this._descriptionEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this._rightMenuBase.addChild(this._descriptionEntry);

	drawText("ON UNLOCK SCRIPT", 20, 467, 410, 15);
	bigEntryData.description = 'Use Java Script to write a code to be called once this\n';
	bigEntryData.description += 'trophy is unlocked';
	bigEntryData.y = 482;
	this._onUnlockEntry = new SButton_Text(bigEntryData);
	this._onUnlockEntry.onDeselect = function() {
		SButton_Text.prototype.onDeselect.call(this);
		this.parent.parent._category.Trophy.onUnlock = this.value;
	};
	this._onUnlockEntry.onOkTriggered = function() {
		SButton_Text.prototype.onOkTriggered.call(this);
		SceneManager._scene.selectButton(null);
	};
	this._rightMenuBase.addChild(this._onUnlockEntry);

	this._rightMenuBase.visible = false;
	this.addChild(this._rightMenuBase);
};

Editor_AchievsCategories.prototype.initConfirmMenu = function() {
	var data = {
		x: 0,
		y: 0,
		width: this.width,
		height: this.height,
		backColor: this.backColor,
		borderColor: this.borderColor,
		design: this.design,
		fontSize: this.txtChild.bitmap.fontSize,
		hideSelect: true
	};

	this._confirmMenu = new SButton_Confirm(data);
	var drawBackground = (function(x, y, width, height, color) {
		this.drawRoundedRect(x, y, width, height, 10, color);
	}).bind(this._confirmMenu.bitmap);

	drawBackground(95, 15, this.width-190, 532, '#0b0b0b');
	drawBackground(100, 50, this.width-200, 492, '#191919');

	this._confirmMenu.visible = false;
	this._confirmMenu._fixedTone = true;
	this._confirmMenu.showMessage = function(title, message, ok, cancel) {
		this.parent._cmCancelButton.visible = true;
		this.txtChild.bitmap.clear();
		this.parent._cmConfirmButton.text = ok || 'OK';
		this.parent._cmCancelButton.text = cancel || 'CANCEL';

		var fontSize = this.txtChild.bitmap.fontSize;
		this.txtChild.bitmap.fontSize += 2;
		this.txtChild.bitmap.drawText(title, 0, 25, this.width, fontSize + 4, 'center');
		this.txtChild.bitmap.fontSize -= 2;
		var font = {
			size: this.txtChild.bitmap.fontSize,
			face: this.txtChild.bitmap.fontface
		};

		var lines, k = 0;
		if (message) {
			var texts = message.split('\n');
			for (var t = 0; t < texts.length; t++) {
				lines = SMO.AM.wrapText(texts[t], 380, font, true).split('\n');
				for (var i = 0; i < lines.length; i++) {
					this.txtChild.bitmap.drawText(lines[i], 110, 60 +  k * (fontSize + 4), 380, fontSize);
					k++;
				}
			}
		}
		this.visible = true;
		SceneManager._scene.selectButton(this);
	};

	this._confirmMenu.update = function() {
		SButton_Confirm.prototype.update.call(this);
		if (this.visible) {
			if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
				this.visible = false;
			} else if (Input.isTriggered('ok')) {
				this.parent._cmConfirmButton.onClickSuccess();
			}
		}
	};

	var cancelData = {
		text: 'CANCEL',
		textAlign: 'center',
		x: 105,
		y: 515,
		width: 60,
		height: 22,
		backColor: '#d64343',
		borderColor: '#ff7878',
		disabledTone: 0,
		hideSelect: true,
		fontSize: this.txtChild.bitmap.fontSize,
		onClick: (() => this._confirmMenu.visible = false).bind(this)
	};
	this._cmCancelButton = new SButton_Confirm(cancelData);
	this._confirmMenu.addChild(this._cmCancelButton);

	var confirmCata = {
		text: 'OK',
		textAlign: 'center',
		x: this.width - 165,
		y: 515,
		width: 60,
		height: 22,
		backColor: '#43d643',
		borderColor: '#78ff78',
		disabledTone: 0,
		hideSelect: true,
		fontSize: this.txtChild.bitmap.fontSize
	};
	this._cmConfirmButton = new SButton_Confirm(confirmCata);
	this._confirmMenu.addChild(this._cmConfirmButton);

	this.addChild(this._confirmMenu);
};

//========================================
// Category Editor - Update

Editor_AchievsCategories.prototype.update = function() {
	this.updateTriggers();
	SWindow_Base.prototype.update.call(this);
};

Editor_AchievsCategories.prototype.updateTriggers = function() {
	if (!this.visible) return;
	if (this.isAnimating()) return;
	if (SceneManager._scene.isSelecting()) return;
	if (SceneManager._scene.isTextInputSelected()) return;
	if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
		this.onCancelled();
	} else if (Input.isTriggered('delete') && this._category) {
		this._confirmMenu.parentFocus();
		this.confirmBeforeDeleting();
	} else if (Input.isTriggered('s') && Input.isPressed('control')) {
		this.saveData();
	}
};

Editor_AchievsCategories.prototype.onCancelled = function() {
	if (this._confirmMenu.visible) {
		this._confirmMenu.visible = false;
	} else {
		this.close();
	}
};

//========================================
// Category Editor - Selectors

Editor_AchievsCategories.prototype.startImageSelector = function(caller) {
	Editor_Achievement.prototype.startImageSelector.call(this, caller);
};

Editor_AchievsCategories.prototype.onImageSelectorConfirmed = function() {
	Editor_Achievement.prototype.onImageSelectorConfirmed.call(this);
};

Editor_AchievsCategories.prototype.startColorSelector = function(caller) {
	Editor_AchievsMenu.prototype.startColorSelector.call(this, caller);
};

Editor_AchievsCategories.prototype.onColorSelectorConfirmed = function() {
	Editor_AchievsMenu.prototype.onColorSelectorConfirmed.call(this);
};

//========================================
// Category Editor - Redraw

Editor_AchievsCategories.prototype.drawMainBackground = function() {
	//Texts
	var lineColor = '#555555';
	this.txtChild.bitmap.drawText('CATEGORIES', 2, 24, 150, 20, 'center');
	this.txtChild.bitmap.fillRect(2, 44, 601, 1, lineColor); //horz line
	this.txtChild.bitmap.fillRect(152, 24, 1, 398, lineColor); //vertical line
	var selectText = '< Select or create a new category to start editing';
	this.txtChild.bitmap.drawText(selectText, 155, 44, this.width - 155, this.height - 44, 'center');
	//Background
	var drawBackground = (function(y, height, color) {
		color = color || '#3b3b3b';
		this.drawRoundedRect(12, y, this.width-24, height, 10, color);
	}).bind(this._rightMenuBase.bitmap);
	drawBackground(5, 90);
	drawBackground(105, 90);
	drawBackground(205, 90);
	drawBackground(305, 224);
};

Editor_AchievsCategories.prototype.redrawCategoryInfo = function(itemName) {
	var isTitle = itemName && itemName.charCodeAt(0) === 13;
	if (isTitle) {
		this._rightMenuBase.visible = false;
		this._category = null;
		return;
	}
	var id = Number(itemName.substring(0, itemName.indexOf('.')));
	var category = $dataAchievsCategories[id-1];
	category.autoColor = category.autoColor || {};
	this._category = category;
	this._cNameEntry.value = category.name;
	this._mNameEntry.value = category.sceneName;
	this._catBackgroundButton.text = category.img || '<none>';
	this._menuBackgroundButton.text = category.menuImg || '<none>';
	this._globalCategoryButton.text = SMO.AM.globalCategoryName === category.name ? 'Global' : 'Not Global';
	this._unLockTestButton.text = category.Trophy.isUnlocked() ? 'Lock' : 'Unlock';
	this._lockedAchievButton.text = category.lockedAchievImg || '<none>';
	this._secretAchievButton.text = category.secretAchievImg || '<none>';
	this._autoColorButton.text = category.autoColor.color || '';
	this._autoColorButton.backColor = this._autoColorButton.text || '#111111';
	this._acCategoryButton.text = category.autoColor.category ? 'Auto Color' : 'Default';
	this._acAchievsButton.text = category.autoColor.achievs ? 'Auto Color' : 'Default';
	this._acSceneNameButton.text = category.autoColor.scene ? 'Auto Color' : 'Default';
	this._acPupAchievButton.text = category.autoColor.popUpAchiev ? 'Auto Color' : 'Default';
	this._acPupCatButton.text = category.autoColor.popUpDesc ? 'Auto Color' : 'Default';
	this._acPupBordersButton.text = category.autoColor.popUpBorders ? 'Auto Color' : 'Default';
	this._trophyImageButton.text = category.Trophy.img || '<none>';
	this._hideTrophyButton.text = category.Trophy.hidden ? 'Yes' : 'No';
	this._trophyLkImageButton.text = category.Trophy.lockedImg || '<none>';
	this._descriptionEntry.value = category.Trophy.description;
	this._onUnlockEntry.value = category.Trophy.onUnlock;
};

//========================================
// Category Editor - Refresh

Editor_AchievsCategories.prototype.refreshCategsList = function() {
	this._rightMenuBase.visible = false;
	var filter = this._sortCategButton.currentValue();
	var list = $dataAchievsCategories.clone();
	if (!list.length) {
		this._categsList.setItemList([]);
		return;
	}
	var padding = String(list.length).length;
	switch(filter) {
	case 'A-z':
		list.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
		list = list.map(function(a) {
			var name = a.id.padZero(padding) + '. ' + a.name;
			if (name.length > 16) {
				name = name.substr(0, 13) + '...';
			}
			return name;
		});
		break;
	default: //ID
		list = list.map(function(a) {
			var name = a.id.padZero(padding) + '. ' + a.name;
			if (name.length > 16) {
				name = name.substr(0, 13) + '...';
			}
			return name;
		});
		break;
	}
	this._categsList.setItemList(list);
	this._category = null;
};

//========================================
// Category Editor - Others

Editor_AchievsCategories.prototype.recreateTrophies = function() {
	var trophiesWindow = SceneManager._scene._trophiesWindow;
	if (!trophiesWindow) return;
	if ($dataAchievsMenu.Trophies.type !== 'trophies') return;
	//Refreshing the data
	trophiesWindow.getData();
	//Refreshing the maximun amount of pages and load the first one
	trophiesWindow._maxPages = Math.ceil(trophiesWindow._data.length / trophiesWindow._maxItems);
	trophiesWindow._page = 0;
	//Removing the childs and recreating them
	trophiesWindow.removeTrophies();
	trophiesWindow.createTrophies();
	trophiesWindow.redrawTrophies();
	//Redrawing the arrows and the number of pages
	var a0 = trophiesWindow._arrows[0];
	trophiesWindow.contents.clearRect(a0.x, a0.y-20, 50, a0.height);
	trophiesWindow.drawArrows();
	if (!trophiesWindow._trophies.length) return;
	//Making sure the selected trophy's sprite is above the others
	var selected = trophiesWindow._selected;
	if (selected !== 0) {
		trophiesWindow.swapChildren(trophiesWindow._trophies[0], trophiesWindow._trophies[selected]);
	}
};

Editor_AchievsCategories.prototype.newCategory = function() {
	var id = $dataAchievsCategories.length + 1;
	var name = 'Cat ' + id;
	var padding = String(id).length;
	var listName = id.padZero(padding) + '. ' + name;
	var scene = SceneManager._scene;
	if (listName.length > 16) {
		listName = name.substr(0, 13) + '...';
	}
	var category = {
		id: id,
		img: '',
		menuImg: '',
		lockedAchievImg: '',
		secretAchievImg: '',
		name: name,
		sceneName: '',
		globalCategory: false,
		autoColor: {
			color: '',
			category: false,
			scene: false,
			achievs: false,
			popUpAchiev: false,
			popUpDesc: false,
			popUpBorders: false

		},
		Trophy: {
			id: id,
			img: '',
			lockedImg: '',
			description: 'This is a description',
			hidden: false,
			onUnlock: '',
			isUnlocked: function() {
				return SMO.AM.DataDynamic.trophies[this.id-1];
			},
			imageName: function() {
				return this.isUnlocked() ? this.img : this.lockedImg || SMO.AM.Images.lockedTrophy;
			}
		}
	};
	SMO.AM.DataDynamic.trophies.push(0);
	$dataAchievsCategories.push(category);
	DataManager.saveGlobalAchievements();
	this.refreshCategsList();
	var index = this._categsList.getIndexByString(listName);
	this._categsList.selectItem(index, false);
	scene.selectButton(this._cNameEntry);
	this._cNameEntry.setCursorAt(0, name.length);
	this._cNameEntry.setSelection(0, 0, name.length, 0);
	this._cNameEntry._selection.hold = false;
	if (scene._categoriesWindow) {
		scene._categoriesWindow.refresh();
	}
	this.recreateTrophies();
};

Editor_AchievsCategories.prototype.confirmBeforeDeleting = function() {
	var title = 'Deleting Category';
	var message = `Category: "${this._category.name}" (ID: ${this._category.id})\n`;
	message += 'Continue to delete it?';
	this._confirmMenu.showMessage(title, message, 'YES');
	this._cmConfirmButton.onClickSuccess = function() {
		SButton_Confirm.prototype.onClickSuccess.call(this);
		this.parent.parent.deleteCategory();
		this.parent.visible = false;
	};
};

Editor_AchievsCategories.prototype.deleteCategory = function() {
	var scene = SceneManager._scene;
	var category = this._category;
	var catName = category.name;
	var catIndex = category.id - 1;
	//reduce the ID's of categories with higher ID
	for (var c = $dataAchievsCategories.length - 1; c > catIndex; c--) {
		$dataAchievsCategories[c].id--;
		$dataAchievsCategories[c].Trophy.id--;
	}
	//delete category
	$dataAchievsCategories.splice(catIndex, 1);
	//remove the deleted category from the dynamic data
	SMO.AM.DataDynamic.trophies.splice(catIndex);
	//remove this category from all achievements
	$dataAchievements.forEach(function(achievement) {
		let index = achievement.categories.indexOf(catName);
		if (index > -1) {
			var oldValue = achievement.categories.join(',');
			achievement.categories.splice(index, 1);
			var newValue = achievement.categories.join(',');
			this.addAchievAction(achievement, oldValue, newValue);
		}
		if (achievement.category === catName) {
			achievement.category = achievement.categories[0] || '';
		}
	}.bind(this));

	if (scene._categoriesWindow) {
		scene._categoriesWindow.refresh();
	}
	DataManager.saveGlobalAchievements();
	this.refreshCategsList();
	this.recreateTrophies();
};

Editor_AchievsCategories.prototype.addAchievAction = function(achievement, oldValue, newValue) {
	if (!SMO.AM.AchievsEditorActions[achievement.id]) {
		SMO.AM.AchievsEditorActions[achievement.id] = { name: achievement._name };
	}
	var base = SMO.AM.AchievsEditorActions[achievement.id];
	if (!base['CATEGORY']) {
		base['CATEGORY'] = { old: oldValue, new: newValue };
	} else if (base['CATEGORY'].old === newValue) {
		delete base['CATEGORY'];
		if (Object.keys(base).length < 2) { delete SMO.AM.AchievsEditorActions[achievement.id];	}
	} else {
		base['CATEGORY'].new = newValue; //update the new value, but keep the oldest one
	}
	this._achievsDataChanged = true;
};

Editor_AchievsCategories.prototype.changeCategNameTo = function(customName) {
	var category = this._category;
	if (category.name === customName) return;
	var originalName = category.name;
	if ($dataAchievsCategories.some(c => c.name === customName)) { //make sure no other category has the same name
		var loop = 1;
		var baseName = customName;
		while (category.name !== customName && $dataAchievsCategories.some(c => c.name === customName)) {
			customName = baseName + ' (' + loop + ')';
			if (++loop > 100) {
				this._cNameEntry.value = originalName;
				return;
			}
		}
		if (category.name === customName) return;
	}
	category.name = customName;
	if (this._sortCategButton.currentValue() === 'A-z') {
		this.refreshAchievsList();
		this._category = category;
		var padding = String($dataAchievsCategories.length).length;
		var listName = String(category.id).padZero(padding) + '. ' + customName;
		if (listName.length > 16) {
			listName = listName.substr(0, 13) + '...';
		}
		this._categsList.selectItem(this._categsList.getIndexByString(listName), false, false);
	} else {
		var padding = String($dataAchievsCategories.length).length;
		var listName = String(category.id).padZero(padding) + '. ' + customName;
		if (listName.length > 16) {
			listName = listName.substr(0, 13) + '...';
		}
		var index = this._categsList._selectedIndexes[0];
		this._categsList._items[index].text = listName;
		this._categsList.redrawItem(index);
	}
	//Change this category's names on achievements
	var achievs = SMO.AM.getAchievsByCategory(originalName);
	achievs.forEach(function(achiev) {
		achiev.categories.splice(achiev.categories.indexOf(originalName), 1, customName);
		if (achiev.category === originalName) {
			achiev.category = customName;
		}
	});
	if (SMO.AM.globalCategoryName === originalName) {
		SMO.AM.globalCategoryName = customName;
	}
	this.refreshCategoryOnWindow(originalName);
};

Editor_AchievsCategories.prototype.isCurrentCategoryOpen = function() {
	return SMO.AM.currentCategory.id === this._category.id;
};

Editor_AchievsCategories.prototype.refreshTrophiesWindow = function(isNewData) {
	if (!SMO.AM.isAchievementsScene()) return;
	var trophiesWindow = SceneManager._scene._trophiesWindow;
	if (isNewData) {
		trophiesWindow.getData();
		trophiesWindow.selectSlot(0);
	}
	trophiesWindow.refresh();
};

Editor_AchievsCategories.prototype.refreshAchievementsWindow = function() {
	if (!SMO.AM.isAchievementsScene()) return;
	if (!this.isCurrentCategoryOpen()) return;
	SceneManager._scene._achievementsWindow.refresh();
};

Editor_AchievsCategories.prototype.refreshMenuBackground = function() {
	if (!SMO.AM.isAchievementsScene()) return;
	if (!this.isCurrentCategoryOpen()) return;
	SceneManager._scene.setBackground(this._category.menuImg || SMO.AM.Images.menu);
};

Editor_AchievsCategories.prototype.refreshSceneTitle = function() {
	if (!SMO.AM.isAchievementsScene()) return;
	if (!this.isCurrentCategoryOpen()) return;
	var scene = SceneManager._scene;
	if (scene._titleWindow) {
		scene._titleWindow.refresh();
	}
};

Editor_AchievsCategories.prototype.refreshCategoryOnWindow = function(categoryName) {
	if (!SMO.AM.isAchievementsScene()) return;
	categoryName = categoryName || this._category.name;
	var scene = SceneManager._scene;
	var index = scene._categoriesWindow._data.indexOf(categoryName);
	if (index > -1) {
		if (scene._categoriesWindow._data[index] !== this._category.name) {
			scene._categoriesWindow._data.splice(index, 1, this._category.name);
		}
		scene._categoriesWindow.redrawItem(index);
	}
};

Editor_AchievsCategories.prototype.saveData = function() {
	if (this._achievsDataChanged) {
		var title = 'Achievs change detected';
		var message = 'One of the changes you made to the categories may have also modified the achievements. ';
		message += 'Do you wish to save the achievements too?';
		this._confirmMenu.showMessage(title, message, 'YES', 'NO');
		this._cmConfirmButton.onClickSuccess = function() {
			SButton_Confirm.prototype.onClickSuccess.call(this);
			DataManager.saveAchievsFromEditor();
			SMO.AM.AchievsEditorActions = {};
			this.parent.visible = false;
		};
		this._achievsDataChanged = false;
	}
	DataManager.saveCategoriesFromEditor();
	this._saveButton.text = 'SAVED!';
	this._saveButton._saveMsgDelay = 90;
};

Editor_AchievsCategories.prototype.open = function() {
	SWindow_Base.prototype.open.call(this);
	if (this._isSelectorOpen) {
		this._isSelectorOpen = false;
		return;
	}
};

Editor_AchievsCategories.prototype.close = function() {
	SWindow_Base.prototype.close.call(this);
	if (!this._isSelectorOpen && this._topStack) {
		this._topStack.open();
		this._topStack._isSelectorOpen = false;
	}
};

//==========================================================================================
// Sort Option  - Create
//==========================================================================================
function Sort_Option() {
	this.initialize.apply(this, arguments);
}

Sort_Option.prototype = Object.create(SButton_Select.prototype);
Sort_Option.prototype.constructor = Sort_Option;

//========================================
// Sort Option - Initialize

Sort_Option.prototype.initBitmaps = function() {
	/*var settings = $dataAchievsMenu.SortOption;
	var width = eval(settings.width);
	var height = eval(settings.height);
	this.bitmap = new Bitmap(width, height);
	this.txtChild = new Sprite(new Bitmap(width, height));
	this.txtChild.bitmap.fontSize = this.fontSize;
	this.txtChild.bitmap.textColor = this.textColor;
	this.borders = new Sprite(new Bitmap(width, height));
	this.addChild(this.txtChild);
	this.addChild(this.borders);*/
	SButton_Select.prototype.initBitmaps.call(this);
};
//========================================
// Sort Option - Update

Sort_Option.prototype.update = function() {
	var parentFocused = this._parentFocused;
	SButton_Select.prototype.update.call(this);
	this.updateOpenTrigger(parentFocused);
};

Sort_Option.prototype.updateOpenTrigger = function(parentFocused) {
	if (!this.visible) return;
	if (!Input.isTriggered('shift')) return;
	if (parentFocused) return;
	var scene = SceneManager._scene;
	var isInfoClosed = !scene._infoWindow || scene._infoWindow._openness === 0;
	if (!isInfoClosed) return;
	if (!this.isOpen()) {
		return this.onClick();
	}
	this._options.close();
	var achievsWindow = scene._achievementsWindow;
	if (achievsWindow) {
		achievsWindow.easyRefresh();
		achievsWindow.activate();
	}
};

//========================================
// Sort Option - Refresh

Sort_Option.prototype.refresh = function() {
	this.opacity = $dataAchievsMenu.SortOption.opacity;
	this.redraw();
};

//========================================
// Sort Option - Settings

Sort_Option.prototype.defineSetting = function(parameter, value, refresh) {
	if (value == null) return;
	if ($dataAchievsMenu.SortOption[parameter] == null) return;
	$dataAchievsMenu.SortOption[parameter] = value;
	if (refresh) {
		if (this[parameter] != null) {
			this[parameter] = value;
			if (this._data[parameter] != null) {
				this._data[parameter] = value;
			}
		} else if (this._data[parameter] != null) {
			this._data[parameter] = value;
			this.refresh();
		} else {
			this.refresh();
		}
	}
};

Sort_Option.prototype.onResize = function() {
	this.initBitmaps();
	this.redraw(true);
};

//========================================
// Sort Option - On Action

Sort_Option.prototype.onClickSuccess = function() {
	var scene = SceneManager._scene;
	if (scene.isEditing && scene.isEditing()) {
		this._preventClickSE = true;
		this._preventClickBlink = true;
		return;
	}
	SButton_Select.prototype.onClickSuccess.call(this);
	if (scene._achievementsWindow) {
		scene._achievementsWindow.deactivate();
	}
};

Sort_Option.prototype.onOptionChange = function(values, indexes) {
	SButton_Select.prototype.onOptionChange.call(this, values, indexes);
	if (indexes[0] == null) return;
	var achievsWindow = SceneManager._scene._achievementsWindow;
	if (achievsWindow) {
		$gameSystem.achievsSortType = indexes[0];
		achievsWindow._sortType = indexes[0];
		achievsWindow.refresh();
		achievsWindow.activate();
	}
};

Sort_Option.prototype.onOptionKeep = function() {
	SButton_Select.prototype.onOptionKeep.call(this);
	var achievsWindow = SceneManager._scene._achievementsWindow;
	if (achievsWindow) {
		achievsWindow.easyRefresh();
		achievsWindow.activate();
	}
};

//========================================
// Sort Option - Other

Sort_Option.prototype.parentFocus = function() {};

Sort_Option.prototype.show = function() {
	SButton_Select.prototype.show.call(this);
	this.refresh();
;};

//==========================================================================================
// Achievenator - Create
//==========================================================================================
function Achievenator() {
	this.initialize.apply(this, arguments);
}

Achievenator.prototype = Object.create(SWindow_Base.prototype);
Achievenator.prototype.constructor = Achievenator;

//========================================
// Achievenator - Initialize

Achievenator.prototype.initialize = function() {
	var width = 200;
	var height = 250;
	var data = {
		x: Math.floor((Graphics.width - width) / 2),
		y: Math.floor((Graphics.height - height) / 2),
		width: width,
		height: height,
		backColor: '#222222',
		title: 'ACHIEVENATOR',
		titleBackground: '#1a1a1a',
		hideSelect: true
	};
	SWindow_Base.prototype.initialize.call(this, data);
	this.visible = false;
};

Achievenator.prototype.initValues = function(data) {
	SWindow_Base.prototype.initValues.call(this, data);
	this.getBackgroundImages();
	this._achievementEditor = null;
	this._categoryEditor = null;
	this._menuEditor = null;
	this._selectedWindow = null;
	this._undoData = [];
	this._redoData = [];
	this._page = '';
	this._dataName = '';
	this._fixedTone = true;
};

Achievenator.prototype.initTools = function() {
	SWindow_Base.prototype.initTools.call(this);
	this.initMainButtons();
};

Achievenator.prototype.initMainButtons = function() {
	//EMOJIS FROM: EmojiTerra (emojiterra.com)
	// Achievs editor
	var achievsButton = {
		id: 'achievs',
		design: 'round-rect',
		text: '1  Achievements   ',
		description: 'Create, delete and edit your achievements [1]',
		x: 25,
		y: 55,
		width: 150,
		height: 23,
		textAlign: 'center',
		fontSize: 14,
		backColor: '#229922',
		onClick: this.startAchievementEditor.bind(this)
	};
	this._achievsButton = new SButton_Confirm(achievsButton);
	this.addChild(this._achievsButton);

	// Categs editor
	var catButton = {
		id: 'cat',
		text: '2   Categories    ',
		textAlign: 'center',
		description: 'Change your categories and trophies [2]',
		x: 25,
		y: achievsButton.y + achievsButton.height + 8,
		width: 150,
		height: 23,
		design: 'round-rect',
		fontSize: 14,
		backColor: '#fff225',
		onClick: this.startCategoryEditor.bind(this)
	};
	this._categsButton = new SButton_Confirm(catButton);
	this.addChild(this._categsButton);

	// Menu editor
	var menuButton = {
		id: 'menu',
		design: 'round-rect',
		text: '3      Menu       ',
		description: 'Customize the menu [3]',
		x: 25,
		y: catButton.y + catButton.height + 8,
		width: 150,
		height: 23,
		textAlign: 'center',
		fontSize: 14,
		backColor: '#333399',
		onClick: this.startMenuEditor.bind(this)
	};
	this._menuButton = new SButton_Confirm(menuButton);
	this.addChild(this._menuButton);
};

//========================================
// Achievenator - Update

Achievenator.prototype.update = function() {
	this.updateTriggers();
	SWindow_Base.prototype.update.call(this);
};

Achievenator.prototype.updateTriggers = function() {
	if (!this.visible) return;
	if (this.isAnimating()) return;
	if (SceneManager._scene.isSelecting()) return;
	if (SceneManager._scene.isTextInputSelected()) return;
	if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
		this.onCancelled();
	} else if (Input.isTriggered('1')) {
		this.startAchievementEditor();
	} else if (Input.isTriggered('2')) {
		this.startCategoryEditor();
	} else if (Input.isTriggered('3')) {
		this.startMenuEditor();
	}
};

Achievenator.prototype.onCancelled = function() {
	this.close();
};

//========================================
// Achievenator - Editors

Achievenator.prototype.startAchievementEditor = function() {
	this._isSelectorOpen = true;
	this.close();
	if (!this._achievementEditor) {
		var editor = new Editor_Achievement();
		SceneManager._scene.addChild(editor);
		this._achievementEditor = editor;
	}
	this._achievementEditor._topStack = this;
	this._achievementEditor.open();
};

Achievenator.prototype.startCategoryEditor = function() {
	this._isSelectorOpen = true;
	this.close();
	if (!this._categoryEditor) {
		var editor = new Editor_AchievsCategories();
		SceneManager._scene.addChild(editor);
		this._categoryEditor = editor;
	}
	this._categoryEditor._topStack = this;
	this._categoryEditor.open();
};

Achievenator.prototype.startMenuEditor = function() {
	var scene = SceneManager._scene;
	this._isSelectorOpen = true;
	this.close();
	if (!this._menuEditor) {
		var editor = new Editor_AchievsMenu();
		scene.addChild(editor);
		this._menuEditor = editor;
	}
	this._menuEditor._topStack = this;
	this._menuEditor.open();
	if (SMO.AM.currentCategory.id) {
		if (scene._infoWindow._openness > 0) {
			scene._infoWindow.close();
		}
		scene.onAchievementCancel();
		scene._categoriesWindow.deactivate();
	} else if (!$dataAchievsCategories.length && scene._achievementsWindow.visible) {
		if (scene._infoWindow._openness > 0) {
			scene._infoWindow.close();
		}
		scene._achievementsWindow.deactivate();
		scene._achievementsWindow.visible = false;
	}
};

//------------------------------------------------------------------------------------------
// Achievements Editor - On Action

Achievenator.prototype.onBackgroundChanged = function(values, indexes) {
	SceneManager._scene._backgroundSprite.bitmap = ImageManager.loadAchievement(values[0]);
};

//------------------------------------------------------------------------------------------
// Achievements Editor - Others

Achievenator.prototype.isCategoriesList = function() {
	return !SMO.AM.currentCategory.id && $dataAchievsCategories.length;
};

Achievenator.prototype.isRefreshingImgNames = function() {
	return this._refreshingImgNames;
};

Achievenator.prototype.getBackgroundImages = function() {
	DataManager.getAchievsImgNames();
	this._refreshingImgNames = true;
};

Achievenator.prototype.isClickOnWindow = function(w) {
	if (this.isClickOnMyGrabBox()) return false;
	if (w) {
		var x = TouchInput._x;
		var y = TouchInput._y;
		if (x >= w.x && x < w.x + w.width && y >= w.y && y < w.y + w.height) {
			return true;
		}
	}
	return false;
};

Achievenator.prototype.setButtonAttribute = function(buttonId, prop, value, redraw) {
	var Button = SceneManager._scene.getButtonById(buttonId);
	if (Button) {
		Button._data[prop] = value;
		if (redraw) {
			Button.redraw(true);
		}
	}
};

Achievenator.prototype.open = function() {
	SWindow_Base.prototype.open.call(this);
	var scene = SceneManager._scene;

	//Closing Sort option
	if (scene._sortOption && scene._sortOption.visible && scene._sortOption._open) {
		scene._sortOption.onClick(scene._sortOption._selected);
	}

	//Starting edit mode
	scene._editMode = true;

	//Deactivating Item Window
	if (this.isCategoriesList()) {
		scene._categoriesWindow.active = false;
	} else {
		scene._achievementsWindow.active = false;
	}

	if (scene._achievsPopUp) {
		scene._achievsPopUp.clear();
	}

	this.visible = true;
};

Achievenator.prototype.close = function() {
	SWindow_Base.prototype.close.call(this);
	if (!this._isSelectorOpen) {
		SceneManager._scene._editorStartButton.visible = this._startButtonState;
		this.clearSelectedStuff();
	}
};

Achievenator.prototype.clearSelectedStuff = function() {
	var scene = SceneManager._scene;
	//Ending edit mode
	scene._editMode = false;
	this._selectedWindow = null;

	//Changing the windows' opacity
	if (scene._infoWindow.isOpen()) {
		scene._infoWindow.close();
	}
	if (this.isCategoriesList()) {
		scene._categoriesWindow.active = true;
	} else {
		scene._achievementsWindow.active = true;
		scene._achievementsWindow.show();
	}
};

//==========================================================================================
// Game Interpreter
// Plugin commands
//==========================================================================================
SMO.AM._GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	SMO.AM._GameInterpreter_pluginCommand.call(this, command, args);
	var lowerCommand = command.toLowerCase();
	if (lowerCommand === 'showachievements') {
		SMO.AM.showAchievements(args[0]);
	} else if (lowerCommand === 'refreshachievements') {
		SMO.AM.refreshAchievements();
	} else if (lowerCommand === 'resetachievementsdata') {
		SMO.AM.resetDynamicData();
	}
};

//==========================================================================================
// END
//==========================================================================================

(function() {
  function ensureAchievStruct() {
    if (!$gameSystem) return;
    // 若插件自带的初始化可用，则直接调用
    if (!$gameSystem.achievPopUp || !$gameSystem.achievPopUp.queue == null) {
      if (typeof $gameSystem.setupAchievs === 'function') {
        $gameSystem.setupAchievs(); // 会创建 achievPopUp 与动态数据
      } else {
        // 极端兜底（基本不会走到）
        $gameSystem.achievPopUp = {
          opacity: 0, animCount: -1, isOutAnim: false, timer: 0, queue: []
        };
      }
    } else {
      // 补齐缺失字段，防止旧档结构半缺失
      var p = $gameSystem.achievPopUp;
      if (!Array.isArray(p.queue)) p.queue = [];
      if (p.animCount == null) p.animCount = -1;
      if (p.isOutAnim == null) p.isOutAnim = false;
      if (p.opacity == null) p.opacity = 0;
      if (p.timer == null) p.timer = 0;
    }
  }

  // ① 读档把内容解包后立刻补齐（早于 Scene_Load.onLoadSuccess）
  const _extract = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    _extract.call(this, contents);
    ensureAchievStruct();
  };

  // ② 保险：进入地图前（onLoadSuccess）再补一次，避免其他插件顺序带来的空值
  const _onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
  Scene_Load.prototype.onLoadSuccess = function() {
    ensureAchievStruct();        // 在 SMO_Achievements 的逻辑执行前先补齐
    _onLoadSuccess.call(this);   // 再交给原有流程
  };
})();