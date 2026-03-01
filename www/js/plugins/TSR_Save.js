//==========================================================================================
var h=/=== TSR_Save === A Plugin by The Northern Frog ============== file id: 145935001 ===/
//==========================================================================================

var TSR = TSR || {};
TSR.Save = TSR.Save || {};
TSR.Save.version = 1.47;
TSR.Save.fileId = 145935001;

var Imported = Imported || {};
Imported.TSR_Save = true;

//==========================================================================================
/*:
 * @plugindesc v1.4.7 Revamp the looks of the Save and Load scenes.
 * @author TSR, The Northern Frog, 2020      
 * @help 
 * =========================================================================================
 * == About this Plugin ====================================================================
 * =========================================================================================
 * This Plugin provides options for customizing the Save/Load screen and   
 * altering the game saving system. Below is a short explanation of the 
 * main features. It is followed by more detailed informations on some of
 * the more intricate features. At the end, you'll find a description for
 * each parameter.
 *
 *
 * Saving system options
 * ===================== 
 *
 *      START FROM LOADING SCREEN:
 *         An optional command that allow to start a New Game from the
 *         Load Screen when selecting an empty file slot.
 *
 *      SINGLE SLOT SYSTEM:
 *         With this option, the players can't select other slots when
 *         saving during the game. Saving always overwrite the current 
 *         file.
 *
 *      AUTO SAVE:
 *         The Plugin provide an optional Auto Saving system. When enabled,
 *         it will save on the currently used file, each times the player
 *         enter a map. This can be managed through Plugin Commands and
 *         parameters.
 *
 *         AUTO SAVE WINDOW:
 *           The Auto Save comes with an optional Auto Save Window. If
 *           enabled, it will pop out each times an Auto Save occurs.
 *     
 *      REGION MAP NAME
 *           Since the Plugin allow to display the Map Name in the save
 *           slots, it provide a system for changing the Map displayed
 *           name according to regions.
 *
 *
 * Customize the Save/Load scenes
 * ==============================    
 * 
 *       FILE WINDOW:
 *         This is the main window where the information from the saved 
 *         files are displayed. You can customize some of its aspects like
 *         its dimension and the number of file slots it contains. 
 *
 *         The file slots are separated in 3 sections. You can decide which
 *         sections you want to display, and in what order. There's also
 *         numerous options to set the datas you want to display in each
 *         sections. Bellow, you'll find furthers explanations on this.
 *         
 *         CUSTOM CURSOR
 *           The Plugin allow to import a custom image to use as a cursor
 *           for the file window. There's a few animation options for your
 *           custom cursor, and the default blinking cursor can be disabled
 *           if desired.
 *
 * 
 *      COMMAND WINDOW:
 *         The command window appears when you select a file slot. It can
 *         provide the following commands:
 *
 *                           -Load   (upload a saved game file)
 *                           -Save   (save or overwrite a file)
 *                           -Delete (erase a file)
 *                           -Start  (new game)
 *                           -Cancel (go back)
 *
 *         The available commands depends on the scene your in (Load or
 *         Save), the selected slot (valid game file or empty slot), and
 *         some of your parameter settings. Each commands can also be 
 *         renamed the way you want.
 *
 * 
 *      HELP WINDOW:
 *         The help window fades in when entering the Load or Save Screen.
 *         It remains on screen a few seconds then fades out. It will keep
 *         popping back out periodically if no input from the player occurs.
 *         You can also set it to stay on screen all the time as does the 
 *         default help window. You can also disable it.
 *         
 * 
 *      CONFIRM WINDOW:  
 *         This optional window appears after a command has been selected
 *         from the command window. The player get to confirm his choice by
 *         selecting Yes or No. You can set the Confirm Text that is shown
 *         in the help window for each commands.
 *         
 *
 *
 * =======================================================================================
 * == File Window Sections ===============================================================
 * =======================================================================================
 * The file window can display 3 sections:
 *
 *          -General Section
 *             Display infos such as Saved File ID and Playing Time.
 *
 *          -Status Section
 *             Display party members images, names and status gauges.
 *
 *          -Progress Section
 *             This is where you can display icons, variables and other
 *             datas related to the game progression. 
 *
 * While the 'general' section is always shown, the 2 others are optionals.
 * The overall look of the slots depends on how many sections is shown, but
 * also depends on the File Window dimension settings.
 *
 *
 * Number of Visible Slots
 * =======================
 * There's a parameter to change to number of visible slots in the file
 * window. This define the available space to show stuff in each slots.
 *
 * Let's say the file window is set to the size of the whole screen. If you 
 * set the number of visible slots to 1, that means each slots will take 
 * the whole screen. Set it to 2 and the slots will be 2 fat rectangles, 
 * each taking about half the screen. The default Plugin setting is 3, which
 * gives 3 rectangle slots, taking about 1/3 of the screen each. The more
 * visible slots you add, the thiner the rectangles becomes, and less space
 * is available for showing datas.
 *
 * 
 * Auto Adjusting
 * ==============
 * Most elements like fontSize, icons and images will scales themselves to
 * fit the available space in their respective sections. Bellow are some
 * examples on how things will position themselves in the slots, depending
 * on different 'sections' settings.
 *
 *    Only general section: 
 *       As said before, the 'general' section is always present. If it is
 *       the only section you show, it's data will be spread in 2 columns,
 *       taking the whole slot space.
 *
 *                 *********************************************
 *                 *                                           *
 *                 *     general                general        *
 *                 *     general                general        *
 *                 *                                           *
 *                 *********************************************
 *
 *    General + section A: 
 *       If you add one optional section (Status or Progress), the general
 *       section datas will form one column taking about 1/3 of the left
 *       part of the slot. The optional section taking the remaining space.
 *
 *                 *********************************************
 *                 *    general    |                           *
 *                 *    general    |         Section A         *
 *                 *    general    |                           *
 *                 *    general    |                           *
 *                 *********************************************
 *
 *    General + sections A and B: 
 *       When showing 2 optional sections, the general section will take
 *       about 1/4 of the left part of the slot. The optional sections
 *       will both be taking half of the remaining space.
 *
 *                 *********************************************
 *                 *  general  |               |               *
 *                 *  general  |   Section A   |   Section B   *
 *                 *  general  |               |               *
 *                 *  general  |               |               *
 *                 *********************************************
 *
 *
 *     As discussed previously, if you set the number of visible slots to 1,
 *     the slots will be taking to whole window. The Plugin have a special
 *     setting for this situation as the slot will have more or less the shape
 *     of a square rather than a rectangle. The disposition of sections in
 *     this case would be as follow:
 *
 *       Only general         1 optional sections        2 optional sections
 *    *******************      *******************       ********************
 *    *                 *      *                 *       * gene |           *
 *    * general general *      * general general *       * ral  | Section A *
 *    * general general *      *-----------------*       *------------------*
 *    * general general *      *                 *       *                  *
 *    * general general *      *   Section A     *       *     Section B    *
 *    *                 *      *                 *       *                  *
 *    *******************      *******************       ********************
 *
 *               *Sections A and B represent the optional 'status' and
 *                'Progress' sections. which one is A and which one is B 
 *                depends on the order of their entry in the 'Sections 
 *                List' parameter. (see Parameters Description bellow)
 *
 *
 *
 * =======================================================================================
 * == Notes On Using Eval Script Lines === ***Read carefully*** ==========================
 * =======================================================================================
 * Some parameters allow the use of script lines. Using script, you can
 * call any data from the saved files and show anything you want. You can  
 * also make things appears conditionnaly.
 *
 * Extracting data
 * ===============
 * Since it's going to extract data from each saved game files in order 
 * to display them in their respective slots, you need to use a special
 * script syntax.
 *
 *           ***All game objects are stored by their lowercase  
 *              names in the object 'game'.
 *
 *              Example:  $gamePlayer === game.player
 *
 * 
 *           ***Once you call a game object as a property of 'game', 
 *              you can use any function from that game object as
 *              you would normally use.
 *
 *              Example: 
 *         $gameActors.actor(1).name() === game.actors.actor(1).name()
 *                         
 *
 *           ***All game objects can be extracted the same way. Here's
 *              a reference list:
 *
 *                     $gameSystem   ===  game.system
 *                     $gameScreen   ===  game.screen
 *                      $gameTimer   ===  game.timer
 *                   $gameSwitches   ===  game.switches
 *                  $gameVariables   ===  game.variables;
 *               $gameSelfSwitches   ===  game.selfswitches
 *                     $gameActors   ===  game.actors
 *                      $gameParty   ===  game.party
 *                        $gameMap   ===  game.map
 *                     $gamePlayer   ===  game.player    
 *
 *
 *           ***And here's some additional examples of commonly used
 *              script call, so you'll get the point.
 *
 *                    $gameParty.gold() === game.party.gold()           
 *
 *               $gameSwitches.value(X) === game.switches.value(X)
 *
 *   $gameParty.numItems($dataItems[X]) === game.party.numItems($dataItems[X])
 *
 *                     $gameMap.mapId() === game.map.mapId();
 *
 *                        $gamePlayer.x === game.player.x
 *
 *              $gameVariables.value(X) === game.variables.value(X)**
 *
 *          **this last one may appear very useful, but in fact the 
 *            'progress' section allow a more user friendly way of 
 *            showing variables value using text escape code \v[X]. 
 *            See Below.
 *
 *
 *
 * =======================================================================================
 * == Map Name Window (REGION NAMES) =====================================================
 * =======================================================================================
 * The Plugin allow you to set different Display Map Names for different 
 * Map Region Id. To use this feature, simply enter each names in the
 * Display Name entry of the Map Properties, separated by a SEMI COLON.
 * And associate (with ':') each name with a list of region Id, separated
 * by commas.
 *
 *        Example:
 *           Kingdom A: 1,2,5; Kingdom B: 3,4, Great Forest: 6
 *
 *           In this example, the Map Name will be 'Kingdom A' when
 *           in regions 1, 2 and 5. If player is in region 3 or 4,
 *           the Map Name will be 'Kingdom B'; and 'Great Forest'
 *           will be the displayed name when in region 6.**
 *
 *         **The dislayed name is what will be display in the Location
 *           entry of the General Section of the File Window (see bellow).
 *           It is also the name that will be displayed in the Map Name
 *           Window. The Map Name Window will pop out (if it is enabled)
 *           each time the Player steps in a region that have a different 
 *           name than the previous region.
 *
 *       
 *
 * =======================================================================================
 * == Parameters Description =============================================================
 * =======================================================================================
 *
 * SAVING SYSTEM 
 * =======================================================================================
 *
 * Start From Load Screen
 * ======================
 *    Allow to start a new game from the Load screen when an empty
 *    file slot is selected. 
 *
 *
 * Enable Single Slot
 * ==================
 *    When this parameter is enabled, any attempt to manually save
 *    the game during gameplay will automatically prompt the player
 *    to overwrite the current playing file. This doesn't work well
 *    with the 'Lock Auto Save' feature. See bellow.
 *
 *
 * Enable Map Auto Save
 * ====================
 *    If this is enabled, the game will auto save each time the player
 *    enter a map. 
 *
 *   **Note that there will be no auto save when you enter the first map
 *     after loading or starting a new game. Auto save is also disabled
 *     if an autorun event is triggered on the map. This is to prevent
 *     the game from auto saving during cut scenes that use multiple maps.
 *
 *   **The Auto Save system can also be managed by Plugin Commands.
 *     See the 'Auto Save Plugin Commands' sections at the end.
 *
 *
 * Lock Auto Save
 * ====================
 *    When this parameter is set to 'true', the first slot of the Save
 *    File Window become dedicated exclusively to auto saving. The game
 *    will always auto save on the fist slot, rather than saving on the
 *    last selected slot; and in-game manual saving on the first slot 
 *    will be disabled. Turn Off the 'Enable Single Slot' parameter if
 *    you're using this feature.
 *
 *
 * Show Auto Save Window
 * =====================
 *    When enabled, the auto save window fades in each time an auto 
 *    save occurs. It stay on screen around 2 seconds and fades out.
 *
 *
 *
 * AUTO SAVE WINDOW 
 * =======================================================================================
 *
 * Auto Save Window Text
 * =====================
 *    You can set the text that will appear in the Auto Save window. By 
 *    default, three dots will appear one after the other following the 
 *    Auto Save window Text. If you want to keep that effect, replace 
 *    the text before the '...'; otherwise, remove it to disable this 
 *    text effect.
 *
 *
 * Auto Save Window X
 * ==================
 *    You can set the horizontal position of the auto save window with
 *    this parameter.
 *
 *
 * Auto Save Window Y
 * ==================
 *    You can set the vertical position of the auto save window with
 *    this parameter.
 *
 *
 * Auto Save Width
 * ===============
 *    This is for setting the width in pixels of the Auto Save window.
 *    Set it accordingly to the Auto Save Window Text.
 *
 *
 * Auto Save Font Size
 * ===================
 *    Change the fontSize of the text displayed in the Auto Save window.
 *
 *
 * Auto Save Color1
 * ================
 *    The Auto Save Window has a gradient colored background. This 
 *    is the main color of the gradient. Enter rgba values separated
 *    by commas.
 *
 *        Example: enter 12, 255, 80, 0.5 for rgba(12, 255, 80, 0.5)
 *
 *
 * Auto Save Color2
 * ================
 *    The Auto Save Window has a gradient colored background. This is
 *    the second color of the gradient. Enter rgba values separated
 *    by commas.
 *
 *        Example: enter 0, 160, 40, 0.5 for rgba(0, 160, 40, 0.5)
 *
 *
 *
 * FILE WINDOW 
 * =======================================================================================
 *
 * Window Margin
 * =============
 *    This parameter sets the size of the margin (in pixels) around the
 *    File Window. This way you can reduce the size of the File Window
 *    while keeping its proportions. Set it to 0 and the File Window will
 *    be full screen.
 *
 *
 * File Window X
 * =============
 *    This is to set the horizontal position of the File Window. It has
 *    no effect if the window doesn't have a margin (full screen).
 *
 *
 * File Window Y
 * =============
 *    This is to set the vertical position of the File Window. It has
 *    no effect if the window doesn't have a margin (full screen).
 *
 *
 * File Window BG Type
 * ===================
 *    You can set the background type of the File Window to:
 *                    0: normal
 *                    1: dim
 *                    2: transparent
 *
 *
 * Window Max Rows  ***NUMBER OF VISIBLE ROWS***
 * ===============
 *    This parameter sets the number of slots visible in the File window.
 *    See explanations in the 'File Window Sections' instructions above.
 *
 *
 * Window Max Files
 * ================
 *    This is the maximum file slots the File Window contains.     
 *
 *
 * Window X Padding 
 * ================
 *    You can add a little horizontal padding inside the File window. It
 *    will affect all sections. 
 *
 *
 * Window Y Padding
 * ================
 *    You can add a little vertical padding inside the File window. It
 *    will affect all sections.
 *
 *
 *
 * COMMAND WINDOW
 * =======================================================================================
 *
 * Command Window Type
 * ===================
 *    Choose between a vertical or horizontal menu.
 *
 *
 * Command Window X
 * ================
 *    Set the horizontal position of the Command Window. 
 *
 *
 * Command Window Y
 * ================
 *    Set the vertical position of the Command Window. You can use the 
 *    keyword 'slot' to set the vertical position of the window to be  
 *    relatives to the currently selected slot in the File Window. An   
 *    offset can be add to the keyword 'slot' or you can just enter a 
 *    fix value. 
 *
 *     examples:
 *         -Command Window Y = slot (y of window is equal to y 
 *                                   of currently selected slot)
 *
 *         -Command Window Y = slot + 24 (y of window is equal to y of
 *                                        currently selected slot + 24px)
 *
 *         -Command Window Y = 300 (y of window is always 300px)
 *
 *
 * Command Window Width
 * ====================
 *    This parameter set the width of the Command Window. If you use a
 *    horizontal menu, this will be the width of one command. 
 *
 *
 * Command Window BG Type
 * ======================
 *    You can set the background type of the Command Window to:
 *                    0: normal
 *                    1: dim
 *                    2: transparent
 *
 *
 * Load Command Name
 * =================
 *    Set the name for the 'Load' command.  
 * 
 *
 * Save Command Name
 * =================
 *    Set the name for the 'Save' command.
 *
 *
 * Delete Command Name
 * ===================
 *    Set the name for the 'Delete' command.
 *
 *
 * Start Command Name
 * ==================
 *    Set the name for the 'Start' command.
 *
 *
 * Cancel Command Name
 * ===================
 *    Set the name for the 'Cancel' command.
 *
 *
 *
 * HELP WINDOW
 * =======================================================================================
 *
 * Show Help Window
 * ================
 *    You can choose between these 3 options:
 *
 *       -intermittent
 *          The Help Window fades in and stay a few frames (depending 
 *          on the text length) and fades out. It will keep poping back
 *          out every ~3 sec if no input from the player is made.
 *
 *       -always
 *          The Help Window fades stays always on screen.
 *
 *       -never
 *          The Help Window never appears.
 *
 *
 * Help Window Font Size
 * =====================
 *    Change the fontSize of the text displayed in the Help window.
 *
 *
 * Help Window Color1
 * ==================
 *    The Help Window has a gradient colored background. This is
 *    the main color of the gradient. Enter rgba values separated
 *    by commas.
 *
 *        Example: enter 12, 255, 80, 0.5 for rgba(12, 255, 80, 0.5)
 *
 *
 * Help Window Color2
 * ==================
 *    The Help Window has a gradient colored background. This is
 *    the second color of the gradient. Enter rgba values separated
 *    by commas.
 *
 *        Example: enter 0, 160, 40, 0.5 for rgba(0, 160, 40, 0.5)
 *
 *
 * Help Window X 
 * =============
 *    The horizontal position of the Help Window. Doesn't affect the
 *    Confirm Help Window.
 *
 *
 * Help Window Y
 * =============
 *    The vertical position of the Help Window. Doesn't affect the
 *    Confirm Help Window.
 *
 *
 * Load Screen Help Text
 * =====================
 *    The text that is displayed when waiting for selecting a slot in
 *    the Load screen.
 *
 *
 * Save Screen Help Text
 * =====================
 *    The text that is displayed when waiting for selecting a slot in
 *    the Save screen.
 *
 *     *** Tips: if you set the alpha value (the last one) of both 
 *               colors to 0, and leave both Help Text blank, the  
 *               Help Window won't show. 
 *
 *
 *
 * CONFIRM WINDOW
 * =======================================================================================
 *
 * Enable Confirm Window
 * =====================
 *    Turn this parameter On if you want a window to confirm command
 *    selection.
 *
 *
 * Load File Confirm Text
 * ======================
 *    This is the text that appears in the Help Window when the Confirm
 *    Window opens after selecting the Load command.
 *
 *
 * Delete File Confirm Text
 * ========================
 *    This is the text that appears in the Help Window when the Confirm
 *    Window opens after selecting the Delete command.
 *
 *
 * Save File Confirm Text
 * ======================
 *    This is the text that appears in the Help Window when the Confirm
 *    Window opens after selecting the Save command. Note that the Save
 *    command needs confirmation only when overwriting a file.
 *
 *
 * New File Confirm Text
 * =====================
 *    This is the text that appears in the Help Window when the Confirm
 *    Window opens after selecting the Start (New Game) command.
 *
 *
 *
 * BACKGROUNDS
 * =======================================================================================
 * 
 * Screen background Image
 * =======================
 *    This parameter allow to display an image in the background of the
 *    screen (It will be behind all windows, but over the previous scene
 *    in the background). The image must be imported in /img/parallaxes 
 *    in your game folder. Enter the file name without extension.
 *
 *
 * Screen Frame Image
 * ==================
 *    This parameter allow to display an image drawn from /img/titles2 in
 *    your game folder. It will be behind the windows but over the Screen
 *    background Image (if any), and what's behind it. It is mainly meant
 *    to add some 'frame' image around the screen like the default images
 *    in this folder.
 *
 *
 * Saved Files Image
 * =================
 *    This is to draw an image as the background for your slots in the File
 *    Window. The image must be imported in /img/pictures in the game folder.
 *    Enter the file name without extension.
 *
 *    **The image will be behind all the slot contents, but over the default
 *      Blinking Cursor. You migh consider using a Custom Cursor if you plan
 *      to use this feature.
 *
 *    **The image will be scaled to fit the slots size. Try to have an image
 *      that has similar proportion with your slots to avoid distorsion.
 *
 *    **This parameter concern only the background image of slots containing
 *      valid game file. Empty slots will have no images unless you set one
 *      with the next parameter.
 *
 *
 * Empty Files Image
 * =================
 *    This parameter allow to set an image for Empty file Slots. See previous
 *    parameter instructions.
 *   
 *
 * CURSORS
 * =======================================================================================
 *
 * Show Default Cursor
 * ===================
 *    Enable/disable the Default Blinking Cursor with this parameter.
 *
 *
 * Custom Cursor Name
 * ==================
 *    Enter your custom cursor image file name without extension here.
 *    Image must be in /img/pictures in your game folder. By entering
 *    a file name in this parameter, it turn On the custom cursor and
 *    the following parameters becomes available. Erase the name if 
 *    you want to disable the custom cursor.
 *
 *    **Frame Cursor: the custom cursor is meant to behave as a frame
 *                    around the slots. It means it will be scaled to 
 *                    the size of the slots. Try to have an image about
 *                    the same proportions than your slots. You can make
 *                    some part of the image offset the slots with the
 *                    Widht and Height Offset parameters bellow.                   
 *
 *
 * Custom Cursor X Offset
 * ======================
 *    This is the horizontal offset of the custom cursor to adjust it
 *    with the File Window slots.
 *
 *
 * Custom Cursor Y Offset
 * ======================
 *    This is the vertical offset of the custom cursor to adjust it
 *    with the File Window slots.
 *
 *
 * Custom Cursor Width Offset
 * ==========================
 *    Your custom cursor image will be scaled to fit the width of the 
 *    slots. If you have some part of the image that are meant to be
 *    offset with the slots, this parameter tell the Plugin which part 
 *    of the image width should not be considered for scaling calculation.
 *
 *       Example: Your image is 400px of width. But it represent a
 *                frame with spikes each side. You want your image
 *                to be framing around the slots, but the spikes
 *                should remains outside. If the spikes are 50px
 *                long on both side of the image, you would set 
 *                this parameter to -100* to cut 100px of the image
 *                width. The 'Custom Cursor X Offset' might need 
 *                to be adjusted again.
 *
 *                *use negative values to offset part of the cursor
 *                 outside of the slots. Positive values will offset
 *                 the image inside the slots (it shrink the image).
 *
 *
 * Custom Cursor Height Offset
 * ===========================
 *    Your custom cursor image will be scaled to fit the height of the 
 *    slots. If you have some part of the image that are meant to be
 *    offset with the slots, cut the part of the image height that is
 *    not to be considered for scaling calculation.
 *
 *       Example: Your image is 200px of height. But it represent a
 *                frame with spikes on top. You want your image to 
 *                be framing around the slots, but the spikes should 
 *                remains outside. If the spikes are 50px long, you
 *                would set this parameter to -50* to cut 50px of the
 *                image height. The 'Custom Cursor Y Offset' might 
 *                need to be adjusted again.
 *                
 *                *Here again we use a negative value, because we want
 *                 the spikes to be outside of the slots, on top.
 *
 *
 * Cursor Blinking
 * ===============
 *    The custom cursor can be animated with a blinking effect. Turn
 *    it in On and Off with this parameter.
 *
 *
 * Cursor Smooth Move
 * ==================
 *    If this is turn On, the custom cursor will smooth move in between
 *    each slots. The time it take to reach the next slot depends on the
 *    'Cursor Move Speed' parameter. No new input can be made while the 
 *    cursor is moving.
 *
 *
 * Cursor Move Speed
 * =================
 *    This is the 'Speed' of the cursor when smooth moving. It is the
 *    number of pixels by frame so the actual speed depends on screen 
 *    resolution.
 *
 *
 * Cursor Moving Sound
 * ===================
 *    When the cursor is smooth moving, it will make this sound. Enter
 *    a SE name.
 *
 *
 * Cursor OnSlot Sound
 * ===================
 *    When the cursor reach a slot, it will make this sound. Enter a
 *    SE name. 
 *
 *
 *
 * CUSTOM ICONS SHEET
 * =======================================================================================
 * You can import a custom icons sprite sheet in /img/pictures in
 * your game folder. Use it to display specific icons set for your 
 * Load and Save scenes, using escape code '\i[X]'.
 *
 * If you're using TSR_TextColorAddOn.js and have a custom icons
 * sheet set with it, that icons sheet will be disabled while in
 * the Save or Load scenes if you have also set a custom icons 
 * sheet with this Plugin. If you want to use your custom icons
 * from TSR_textColorAddOn in the Save and Load scenes, don't set 
 * a custom icons sheet with this Plugin.
 *
 *
 * Save Scene Icons Sheet Name
 * ===========================
 *    The file name of the sprite sheet in /img/pictures without
 *    file extension. Entering a file name here will turn On the
 *    custom icons sheet and the following parameters becomes
 *    available. Erase the name to disable the custom sprite sheet.
 *
 *
 * Save Scene Icons Start Index
 * ============================
 *    This is the starting icon code for your icon sprite sheet.
 *    Default Plugin value is 500. If you leave it that way, the
 *    icon codes for your custom sprite sheet will start at 500.
 *    That mean writing \I[500] will show the first index of your
 *    sprite sheet, that is the upper left corner frame (index 0).
 *   
 *    If you set the starting index to 0, it will overide all the
 *    default icons, so unless that's what you want, I recommend 
 *    leaving it to 500, or any number that won't overlap with your
 *    main icon set in /img/system.
 *
 *
 * Save Scene Icons Frame Size
 * ===========================
 *    This is the size of one frame in your sprite sheet. The default
 *    icon set is 32x32 pixels icons, but you can use any size you
 *    want. Enter the number in pixels of the size of one frame in your 
 *    custom sheet.
 *
 *
 * Save Scene Icons SpriteByRows
 * =============================
 *    This is to tell the Plugin how many frame (images) are in one
 *    row of the custom sheet. As an example, the default icon sheet
 *    have 16 frames (icons) by rows.
 *
 *
 * Save Scene Icons Auto Scale
 * ===========================
 *    In most cases, when using the icon code '\i[x]' with this Plugin,
 *    icons will auto scale themselves according to the font size, so 
 *    they always look in place and aligned with text. If for any reason,
 *    you need your custom icons to appear in their actual dimension, turn
 *    that parameter OFF.
 *
 *     Example 
 *         We'll use a Battler Sprite sheet as example:
 *
 *              Icons Sheet Name:      Actor1_1        
 *              Sheet Starting Index:  500 (default) 
 *              Sheet Frame Size:      64             
 *              Sheet SpritePerRows:   9
 *              Icons Auto Scale:      true
 *
 *        Now using code \i[500] in a text string will make Harold appear as
 *        an icon scaled to the text. Since Battlers sheet are 9 columns by
 *        6 rows, we can use icon codes from 500 to 553 for the whole sheet.
 *        Using \i[552] for instance will show a very dead Harold icon. 
 *        Turning the Auto scale to false would make Harold icons appear 
 *        as 64x64 pixels images that would most likely clash with the text...
 *
 *
 *    ***Again, the custom icons sprite sheet uploaded with this Plugin  
 *       works only for the Save and Load scenes. But my other Plugin 
 *       TSR_TextColorAddOn allow to set a custom icons sheet that works
 *       for the entire game. If you set both Plugins with a custom icons
 *       sheet, the one from this Plugin will overide those from 
 *       TSR_TextColorAddOn while in the Save or Load scenes, but icons
 *       from TSR_TextColorAddOn will be valid in every other scenes.
 *
 *
 *
 * GENERAL SECTION
 * =======================================================================================
 *
 * Show File Id
 * ============
 *    The saved file Id are displayed in the top left corner of the
 *    slots. You can hide it by turning Off this parameter.
 *
 *
 * General List
 * ============
 *    This is where you tell the Plugin what info you want to show in
 *    the general section, and in what order. Each info is represented
 *    by a specific keyword explained below. Note that all keywords
 *    are case insensitive.
 *
 *          'Playtime': show the time played so far.   
 *
 *          'Location': show the Display Name of the game map where
 *                      the save occurs.
 *        
 *              'Date': show the date* when the file was saved.
 *
 *              'Time': show the time* when the file was saved.
 *
 *           'SavedOn': show both 'Date' and 'Time' on the same line.
 *
 *            'Custom': show the text entered in the 'Custom Text'
 *                      parameter below.
 *
 *                  *Date and Time format vary depending on your
 *                   region/browser.
 *
 *    For each info you want to show, enter the corresponding keyword
 *    in the 'General List' and separate each by a SEMICOLON. 
 *
 *          Example: Location; savedOn; Playtime
 *
 *  LINE BREAKS
 *    The general info list form a column in the left part of the slots
 *    with each entry forming a line (row). FontSize and lineHeight will
 *    decrease slightly as you add more info (lines). Anything between 2
 *    semicolons that isn't a keyword will result in adding line breaks,
 *    and thus, reducing the fontSize. 
 *
 *          Example: Location; none; savedOn; none; Playtime 
 *
 *    In the example above, I used 'none', but it could be anything except
 *    one of the keywords. This will result in adding an empty line between
 *    'Location' and 'savedOn', and between 'savedOn' and 'Playtime'. It will
 *    also adjust the fontSize considering the info is now spread throughout
 *    5 rows.  
 *
 *  TITLES
 *    You can also add titles to each info by linking the keywords to some
 *    text string with an equal '=' sign.
 *
 *          Example: Playtime
 *     
 *             This will just show the play time as '00:00:00'
 *
 *          Example: Play Time: = Playtime
 *
 *             Now this will show: 'Play Time: 00:00:00'
 *
 *    You can add a title this way to each keywords in your 'General List'.
 *    So taking back the first example above, we could write:
 *
 *     Location: = Location; Saved On: = savedon; Played Time: = Playtime
 *
 *  TEXT COLOR CODES
 *    You can also use Text Escape Codes to add text colors. Text colors
 *    codes can be added to titles and keywords separately if needed. Note 
 *    that after each lines, colors are reset
 *    
 *
 *          Example: 
 *   \C[6]location; none; \C[4]Save Time: = time; Play Time: = \C[10]playtime
 *
 *       Now lets say the game was saved at 16:24 on the map called 'map 1'
 *       and after 2 minutes of gameplay, the general section will look like 
 *       this:
 *                            **************************
 *                            * map 1    
 *                            *
 *                            * Saved Time:   16:24
 *                            * Played Time:  00:02:00
 *                            *****************************
 *                
 *       Only 'map 1' appears in the first line because no title has been
 *       assigned to it. It's text would be colored with color 6, while the
 *       following line would have color 4. The 'Play Time' title would be
 *       white, because colors are reset after each lines, but the playtime 
 *       value itself would be color 10. Note the line break induced by  
 *       adding 'none'. 
 *
 *
 * Text X
 * ======
 *    You can use this parameter to offset a bit the horizontal position
 *    of the lines of the general infos text.
 *
 *
 * Text Y
 * ======
 *    You can use this parameter to offset a bit the vertical position
 *    of the first line of the general info's text.
 *
 * Custom Text
 * ===========
 *    Set the text that will appear when using the 'custom' keyword in 
 *    the 'General List' parameter. You can use text color codes '\c[X] 
 *    and script lines with the 'eval:' keyword. 
 *
 *           Example: \C[12]eval: game.actors.actor(1).name()*
 *
 *                      *special syntax for extracting data'ss from
 *                       saved files is explained in the previous
 *                       section.
 *
 *    The example above will show the name of the first actor colored
 *    with color 12. Of course, in order to appear in the general info
 *    section, the keyword 'custom' must be includes in the 'General 
 *    List' parameter.
 *
 *          Example: we'll use the previous example of 'General List'...
 *
 * \C[6]location; custom; \C[4]Save Time: = time; Play Time: = \C[10]playtime     
 *                            
 *     The line break 'none' has been replaced by 'custom' which refer 
 *     to the 'Custom Text' parameter that we have set to first actor
 *     name above. General section would look like this:
 *
 *                         **************************
 *                         * map 1                     (color 6)
 *                         * Harold                    (color 12)
 *                         * Saved Time:   16:24       (color 4)
 *                         * Played Time:  00:02:00    (color 4 and 10)
 *                         *****************************
 *
 *
 * General Section Dim Sprite
 * ==========================
 *    This is to turn On and Off the dimmed gradient colored background
 *    behind text boxes. This affect the whole general section. 
 *
 *
 * General Section Width Offset
 * ============================
 *    This parameter is added to the General Section width. Using positive
 *    value will expend the width of the section, while negative values will
 *    reduce the width. This parameter allow the General Section to overlap 
 *    with the next section, so make your settings accordingly.
 *
 *
 *
 * SECTIONS
 * =======================================================================================
 *
 * Sections List
 * =============
 *    This parameter can be left blank if you just want to show the
 *    general section. Use the keywords 'status' and 'progress' to
 *    add optional sections separated by a SEMICOLON.
 *
 *       Example: status; progress
 *    
 *       The slots arrangement would looks like that:
 *
 *                 *********************************************
 *                 *           |               |               *
 *                 *  General  |    Status     |   Progress    *
 *                 *           |               |               *
 *                 *           |               |               *
 *                 *********************************************
 * 
 *    Refer to the 'File Window Sections' instructions above for
 *    more details on slots sections arrangement.
 *
 *
 * Dim Background Color1
 * =====================
 *    This is to set the main color of the gradient colored background
 *    dimmer sprite in all sections. It can be toggle On/Off in each 
 *    sections. Enter rgba values separated by commas.
 *
 *        Example: enter 12, 255, 80, 0.5 for rgba(12, 255, 80, 0.5)
 *
 *
 * Dim Background Color2
 * =====================
 *    This is to set the second color of the gradient colored background
 *    dimmer sprite in all sections. It can be toggle On/Off in each 
 *    sections. Enter rgba values separated by commas.
 *
 *        Example: enter 0, 160, 40, 0.5 for rgba(0, 160, 40, 0.5)
 *
 *
 *
 * STATUS SECTION
 * =======================================================================================
 *
 * Party Max Size
 * ==============
 * The Status section will be split by this value. If it is set to 1,
 * the section contents will be centered. 
 *
 *
 * Display Party Members
 * =====================
 *    You can show party members images by choosing either:
 *
 *                     'none': disable this feature
 *               'Characters': show party members character sprites
 *                    'Faces': show party members face images
 *                 'Battlers': show party members battlers sprites**
 *
 *               **Battlers sprite changes accordingly to the party
 *                 member status. It will appear as either 'normal',
 *                 'HP crisis' or 'dead'.
 *
 *
 * Display Status Gauges
 * =====================
 *    Display party members names and levels, along with HP gauges,
 *    MP gauges (if present) and TP gauges (if present). Toggle it
 *    On or Off with this parameter.
 *
 *
 * Display Battleback
 * ==================
 *    Display the Battleback1 image of the game map where the save occurs.
 *    If the map doesn't have a specified Battleback1, the Plugin will check
 *    if there's a specified Battleback2. If no Battlebacks is specified, 
 *    nothing will appears.
 *
 *    YEP_RegionBattlebacks
 *    =====================
 *    If you're using Yanfly's YEP_RegionBattlebacks, the Plugin will first
 *    check for region Battleback1 specified by Yanfly's Plugin. Then check
 *    for a region Battleback2; and then check for default Battlebacks.
 *
 *
 * Status Section Dim Sprite
 * =========================
 *    This is to turn On and Off the dimmed gradient colored background
 *    behind text boxes. This affect the whole status section
 *
 *
 * Status Section X Offset
 * =======================
 *    This parameter is added to the horizontal position of the Status
 *    section. Using positive values will move the section to the right
 *    while negative values will move it to the left. This parameter
 *    all the Status section to overlap with other sections, so make
 *    your settings accordingly.
 *
 *
 *
 * PROGRESS SECTION
 * =======================================================================================
 * The Progress section is where you can display icons, variable values
 * and other datas extracted from the saved files.
 *
 *
 *   DISPLAY OBJECT
 *      The following parameters allows to set how things will appears in 
 *      the Progress section of the slots. But the actual datas you want 
 *      to show must be entered in the 'Display Objects' parameter below.
 *      All you need to know about how to fill the 'Display Object' is 
 *      detailed in the 'TEXT OBJECTS' parameters section at the end. 
 *
 *   PROGRESS OBJECT 
 *      The Plugin has an embedded Game Progression Ratio calculation
 *      system. It will appears as a percent value of the total game
 *      progression that you can base on one or more variables defined 
 *      in the 'Progress Object'. All you need to know about how to fill  
 *      the 'Progress Object' is detailed in the 'TEXT OBJECTS' parameters  
 *      section at the end.
 *
 *
 * Progress Name
 * =============
 *    This is the name (title) that is displayed aside the Progress Ratio
 *    value. Default name is 'Progress', but you could call it 'Total',
 *    'Story Completion' or whatever what fit your game concept. Leave it 
 *    blank to disable it.
 *
 *
 * Progress Name X
 * ===============
 *    This is to set the horizontal position of the Progress Name in the
 *    slots. The position is relatives to the Progress section in the slot.
 *    This means that entering a value of 100 will position the text at
 *    100 px from the left border of the Progress section, and not from the 
 *    left border of the screen.
 *
 *
 * Progress Name Y
 * ===============
 *    This is to set the vertical position of the Progress Name in the
 *    slots. The position is relatives to the the slot itself. This means
 *    that entering a value of 100 will position the text at 100 px from
 *    the top border of the slot, and not from the top of the screen.
 *     
 *
 * Progress Name Font Size
 * =======================
 *    Set the fontSize for the Progres Name text.
 *
 *
 * Progress Ratio X
 * ================
 *    This is to set the horizontal position of the Progress Ratio in the
 *    slots. Like 'Progress Name X', the position is relatives to the slots  
 *    and is not absolute on the screen.
 *
 *
 * Progress Ratio Y
 * ================
 *    This is to set the vertical position of the Progress Ratio in the
 *    slots. Like 'Progress Name Y', the position is relatives to the slots  
 *    and is not absolute on the screen.
 *
 *
 * Progress Ratio Font Size
 * ========================
 *    Set the fontSize for the Progres Ratio text.
 *
 *
 * Progress Section Dim Sprite
 * ===========================
 *    Toggle On and Off the gradient colored background dimmer sprite
 *    for the Progress section.
 *
 *
 *    PROGRESS ICONS & DATAS
 *       In the Progress section, you will most likely display pairs of
 *       Icons/Values that you have set in the 'Display Object'. These
 *       datas will appears in the slots in a columns/rows arrangement.
 *       The following parameters allows to set the position of the first
 *       entry and the space between columns and rows. Everything else
 *       will auto adjust itself.
 *
 *
 * Progress Icons X
 * ================
 *    The horizontal position of the first data in the 'Display Object'. 
 *
 *
 * Progress Icons Y
 * ================
 *    The vertical position of the first data in the 'Display Object'.
 *
 *
 * Progress Icons Font Size
 * ========================
 *    The icons size is adjusted relatively to the current fontSize. This
 *    parameter will help you set the size of the icons and values of the
 *    'Display Object'. (see bellow)
 *
 *
 * Progress Icons Columns Number
 * =============================
 *    Set how many Icons/Values is to be displayed on one row. The data's
 *    from the 'Display Object' will fill the first row up to that number,
 *    then fill the second row and so on. The number of row will be equal 
 *    to the number of entry in the 'Display Object' divided by the number
 *    of Columns set with this parameter.
 *
 *      Example: 
 *        Lets say the 'Display Object' contains 8 values. If you set this 
 *        parameter to 3 columns. The values will appears as such:
 *
 *                    ****************************************
 *                              value 1   value 2   value 3  *
 *                              value 4   value 5   value 6  *
 *                              value 7   value 8            *
 *                                                           *
 *                           *********************************
 *
 *
 * Progress Icons Inter Column Space
 * =================================
 *    This is to set the distance in pixels between each columns of Icons/
 *    Values.
 *
 *
 * Progress Icons Inter Row Space
 * ==============================
 *    This is to set the distance in pixels between each rows of Icons/
 *    Values. This one might need some trials to find the right value
 *    depending on the slots dimension and the number of rows. If you
 *    use the dimmer sprite, some extra adjusting might also be required
 *    to make sure everythings is correctly aligned.
 *
 *
 *
 * TEXT OBJECTS (Progress)
 * =======================================================================================
 * The 2 notebox parameters bellow are where you can set the stuff you
 * want to show in the Progress section. The first one has to be filled
 * if you want anything to appear in the section. The second concern the
 * optional Progress Ratio Calculation system.
 *
 *
 * Display Object
 * ==============
 *    This is a notebox where you can link pairs of property:values
 *    separated by commas. Both properties and values will appears
 *    side by side on screen, in a columns/rows arrangement.
 *
 *       Example: 
 *          Entering this in the Display Object:
 *             potatoe: carrot, Cheeze: Milk, Harold: noob
 *
 *          Will show like this in the slots:
 *             potatoe carrot     Cheeze Milk     Harold noob  
 *
 *    The notebox accept text codes with escape characters, so you might
 *    have guess that the main purpose of this isn't to list vegetables
 *    and dairies, but rather to use pairs of Icons:Values. 
 *  
 *       Example:  
 *          Entering this in the Display Object:
 *             \i[X]: \v[Y]
 *
 *          Will show icon X alongside variable Y value.
 * 
 *    The notebox can be filled both horizontally or vertically, and
 *    whites spaces doesn't matter. Just be sure to separate each pairs
 *    of Icons:Values with comas.
 *
 *       Example:
 *          Data's can be entered like this:
 *                \i[1]:\v[1], \i[2]:\v[2], \i[3]:\v[3]
 *
 *          Or like this:
 *                \i[1]:\v[1],
 *                \i[2]:\v[2],
 *                \i[3]:\v[3]
 *
 *          Or like this:
 *                \i[1]:\v[1], \i[2]:\v[2],
 *                \i[3]:\v[3]         
 *
 *    The actual arrangement of the notebox doesn't change the way things
 *    will appears in the slots. Only the order of the entries is important.
 *    Remember that in the slots, the pairs of Icons:Values will be shown 
 *    in a columns/rows arrangement that is defined by the Progress section 
 *    parameters above.
 *
 *    You can put as many entries as you want, but keep in mind that the 
 *    more stuff you put, smaller the font and icons will be. And depending  
 *    on the actual slot dimemsions, things just might appears too small and
 *    uneasthetic.
 *
 *    This feature is mostly made for showing pairs of Icons:Values, but
 *    you can show anything you want. Here's a few tips:
 *
 *       Show only icons with no values
 *
 *                      \i[1]: , \i[2]: , \i[3]: 
 *
 *       Show a colored text before the variable value. Notice the second
 *       double dot added so there will be a double dot between the text
 *       and the value on screen.
 *
 *            \c[4]some text\C:: \v[1], \c[6]some other text\C:: \v[2]
 *
 *       You can mix text and icons           
 *
 *        \i[1]\c[4]some text\C:: \v[1], \i[2]\c[6]some other text\C:: \v[2]
 *
 *            **you can use long text string but the 'Progress Icons Inter 
 *              Column Space' parameter should be set accordingly, otherwise
 *              some stuff might overlap.
 *
 *            **If you use TSR_TextColorAddOn, don't use text color gradient
 *              codes in the 'Display Object' notebox. The comma inside the
 *              square brackets of the gradient code will mess your Display 
 *              Object.
 *
 *
 *    USING SCRIPT IN THE DISPLAY OBJECT
 *       You can use script lines to show other datas from the saved files 
 *       in the Progress section. The special syntax required to extract 
 *       data's is explained in previous intructions above. Only the values, 
 *       not the properties, can be assigned some script in your Display 
 *       Object. Use the keyword 'eval:'  to add script.
 *
 *          Example:  Total steps:: eval: game.party.steps(),
 *                    \i[370]: eval: game.party.gold()
 *
 *       In the example above, the Display Object is filled with 2 entry.
 *       In the first one, the text 'Total Steps:' is assigned to the total
 *       steps made by the party in the saved file. In the second entry, 
 *       icon 370 is assigned to the party gold.
 *
 *       You can use conditionnal branch too.
 *
 *          Example: 
 *             \c[6]Currency:: eval: if (game.switches.value(1) == true) {
 *                                       game.variables.value(10)
 *                                    } else {
 *                                       game.variables.value(11) },
 *             Total steps:: eval: game.party.steps(),
 *             \i[370]: eval: game.party.gold()
 *
 *       In this example above, the colored text 'Currency:' is assigned
 *       to variable 10 value if game switch 1 is On. Otherwise it'll be
 *       assigned to variable 11. The Display Object also contains the 2
 *       entries from the previous example. The 3 pairs of property/value
 *       are separated by commas.
 *
 *
 *    BOOLEANS
 *       No matter the script you use, it will return a 'value', most likely
 *       a text string or a numeric value. But if the returning value is a
 *       boolean (true or false), it will tell the Plugin to either show or
 *       hide the object propety name.
 *
 *          Example:
 *             \i[200]: eval: game.switches.value(2)
 *
 *       This way, icon 200 will appear if game switch 2 is ON. Otherwise,
 *       nothing will be shown.
 *
 *
 *    NOTE ON EMPTY VALUES
 *       If you show variables values by using the text code '\v[x]' in the
 *       Display Object and the variable is equal to zero, no value will be
 *       shown. Only the icon will appear. But if you show the variable value
 *       using 'eval: game.variables.value(x)', nothing will be shown if the
 *       variable equal zero because javascript will interpret it as boolean
 *       'false'.
 *
 *       If you really need to show the zero value along with the icon, use
 *       a conditional branch.
 *
 *          Example:
 *             \i[200]: eval: if (game.variables.value(3)) {
 *                              game.variables.value(3)
 *                            } else {
 *                               '0'
 *                            }, 
 *
 *       In the example above, icon 200 will always appears and the value
 *       will show 0 if the variable is unassigned.        
 *
 *
 *
 * Progress Object
 * ===============
 *    This text Object serves for the Progress Ratio Calculation system.
 *    If you do not wish to use this feature, simply leave the notebox
 *    empty. 
 *
 *    It is working in synergy with the 'Display Object', thus it will
 *    be assumed, in the following instructions, that you are already 
 *    familiar with its functionning.
 *
 *    In the Progress Object, you can enter some properties of the 'Display
 *    Object' and assign them a maximum value. The Progress Ratio will be
 *    calculated as the ratio of the sums of all 'Progress' variables on
 *    the sums of all their corresponding maximum values. Now this sound
 *    more complicated than it is. A few examples will illustrate better
 *    the concept.
 *
 *       Example:
 *          Lets say the Display Object is filled like this:
 *
 *             Display Object: \i[1]:\v[1], \i[2]:\v[2], \i[3]:\v[3]
 *    
 *          This will show icon 1 with variable 1 value, icon 2 with
 *          variables 2... We already talked about that previously.
 *
 *          Now, let's say we want to use variable 3 for displaying a 
 *          completion ratio. For simplicity, we'll assign it a max
 *          value of 100. The Progress Object would look like this:
 *
 *             Progress Object: \i[3]: 100
 *
 *          As you can see, variable 3 is assigned a maximum value of
 *          100 in the Progress Object by refering to its property
 *          name in the Display Object, which in this case is '\i[3]'.
 *          With this setting, the Progress Ratio will be calculated
 *          as (variable 3 value / 100). Meaning that if variable 3
 *          has a value of 50, a Progress Ratio of 50% will show. The
 *          maximum being 100, the Progress Ratio would be 100% even
 *          if variable 3 would have a value of 3000.
 *
 *
 *       Example:
 *         Now lets includes all entries of the Display Object above
 *         in the Progress Object and assign them different maximum
 *         values:
 *
 *            Progress Object: \i[1]: 200, \i[2]: 50, \i[3]: 100
 *
 *         This time, if variable 3 would have a value of 3000, it 
 *         would only account for 28.6% of the Progress Ratio. The
 *         maximum value assign to variable 3 is 100, so even if it
 *         has a value of 3000, only 100 will be taken in account.
 *         The sums of all maximum values in the Progress Object is
 *         (200 + 50 + 100 = 350), and (100 / 350 = 0.286).
 *         
 *
 *    So, we saw that in order to be includes in the Progress Ratio, a
 *    variable value from the Display Object must be assigned a maximum
 *    value in the Progress Object. The variable value and its maximum
 *    value are linked together by giving them the same property name
 *    in both Text Objects.
 *
 *    That means that any value you want to be part of the Progress Ratio
 *    Calculation, must be included in the Display Object. But what if you
 *    don't want the actual variable(s) used for displaying the Progress 
 *    Ratio percent value to appears in the slots?
 *
 *
 *    HIDDING VALUES  
 *       We know that the Display Object serves to show pairs of property/
 *       value, most likely Icons/Variables pairs, in the Progress section
 *       of the slots. If a property name includes the keyword 'progress',
 *       the paired value will never be shown.
 *
 *          Example:
 *             Lets say the Display Object is filled like this:
 *
 *             Display Object: \i[1]:\v[1], \i[2]:\v[2], progress1:\v[3]
 *
 *       In the above example, only variable value 1 and 2 will appears in
 *       the slot alongside their paired icons. Variable 3 is paired with
 *       a property name that contains 'progress'. It will remains hidden.
 *
 *       Now, we could assign a maximum value to variable 3 by using the 
 *       same 'progress1' property name in the Progress Object. That way,
 *       the variable 3 value is used for Progress Ratio Calculation, but
 *       don't appears with other pairs of Icons/Values of the Display
 *       Object. 
 *
 *       Note that I used 'progress1' as the property name. But anything
 *       that includes the characters sequence p-r-o-g-r-e-s-s would do.
 *       Best way is to use numeric or alphabetic ordination like: progress1,
 *       progress2, progress3, or progressA, Bprogress...
 *
 *       You can use any combination of displayed and/or hidden variables
 *       values for your Progress Ratio Calculation.
 *
 *
 *
 * =======================================================================================
 * == Auto Save Plugin Commands ==========================================================
 * =======================================================================================
 * The Plugin provide the following commands to manage the Auto Save
 * system.
 *
 *    AutoSaveON
 *       This turn ON the auto save when player enter a map. It overide
 *       the Plugin parameter 'Enable Map Auto Save'.
 *
 *    AutoSaveOFF
 *       This turn OFF the auto save when player enter a map. It overide
 *       the Plugin parameter 'Enable Map Auto Save'.
 *
 *    SaveWindowON
 *       This turn ON the auto save window. It overide the Plugin parameter
 *       'Show Auto Save Window'.
 *      
 *    SaveWindowOFF
 *       This turn OFF the auto save window. It overide the Plugin parameter
 *       'Show Auto Save Window'.
 *
 *    SaveNow
 *       This command will immediately save the game on the currently used 
 *       file. The auto save window will show if it is enabled.
 *
 *
 *
 * =======================================================================================
 * == Terms of usage =====================================================================
 * =======================================================================================
 * Use in any independant RPG Maker MV projects, including commercials.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 *
 * Editing of the script is allowed, but it won't relieve from crediting
 * obligations. Remember that changing the name of functions and variables,
 * or even manually retyping the entire script, doesn't make you the author
 * of the Plugin.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itchi.io account: 
 * https://the-northern-frog.itch.io/
 *
 * SPECIAL THANKS
 * Thanks to ShadowDragon for having helped with numerous suggestions and
 * ideas; and for testing and debugging.
 *
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 2020/05/05 Initial works, v0.0.0
 * 2020/05/11 Prototype version completed, v0.1.0
 * 2020/05/15 Added smooth cursor move and bouncing effect, v0.1.1
 * 2020/05/17 Added custom icons sheet options, v0.1.2
 * 2020/05/18 Added Plugin's main parameters, v0.1.3
 * 2020/05/30 More parameters, fixes and structs v0.1.6
 * 2020/05/31 Added Auto save system with more parameters v0.2.0
 * 2020/06/13 Added Help and Confirm windows v0.3.0
 * 2020/06/14 Minor fixes and added Command Names parameters v0.4.0
 * 2020/06/23 Parameters and Plugin's intructions, some fixes v0.5.0
 * 2020/06/27 Plugin completed v1.0.0
 * 2020/06/30 Bugs fix following testing v1.0.1
 * 2020/07/03 More bugs fix v1.0.2
 * 2020/07/06 Add more auto save window parameters and fix the autosave bug v1.1.4
 * 2020/07/10 Linked the save command with the Change Save Access Event command bug v1.1.5
 * 2020/07/12 Updated cursor smoothmove and fix general section color codes v1.1.7
 * 2020/07/14 Bind status section battleback to YEP_RegionBattlebacks if imported v1.1.8
 * 2020/07/17 Add a region Map name system for General Section Location entry v1.1.9
 * 2020/07/19 Fix bug with the Window_MapName when using region name v1.2
 * 2020/07/19 Add onAfterLoad function to the onLoadSuccess method v1.2.1
 * 2020/08/22 Small fixes following bugs reports v1.2.2
 * 2020/09/04 Add Auto saving locked on file 1 option v1.3.2
 * 2020/09/13 Add more parameters for sections setup, and some minor fixes v1.4.3
 * 2021/01/30 Fix a bug with confirm window when canceling load game v1.4.4
 * 2021/02/21 Fix a bug with switches eval in progress section v1.4.5
 * 2022/04/10 Fix a bug reported by user v1.4.6
 * 2022/11/23 Fix a bug reported by user v1.4.7
 *
 * Compatible with Yanfly Engine Plugins Library (except YEP_SaveCore for obvious reasons).
 * Place it at top of your Plugins Manager, bellow YEP_CoreEngine.
 * 
 * If you use TSR_TextColorAddOn, this Plugin must be placed bellow it.
 *
 *
 * =======================================================================================
 * == END ================================================================================                                             
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 *
 *
 *@param ---Saving System---
 *
 * @param Start From Load Screen
 * @parent ---Saving System---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Start a new game from empty slot on load screen?
 * OFF - false  ON - true
 * @default false
 *
 * @param Enable Single Slot
 * @parent ---Saving System---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable the single slot system for saving file?
 * OFF - false  ON - true
 * @default false
 *
 * @param Enable Map Auto Save
 * @parent ---Saving System---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable auto save when entering new maps?
 * OFF - false  ON - true
 * @default false
 *
 * @param Lock Auto Save
 * @parent ---Saving System---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Reserve the first slot for auto saving?
 * OFF - false  ON - true
 * @default false
 *
 * @param Show Auto Save Window
 * @parent ---Saving System---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show the auto save window when auto saving?
 * OFF - false  ON - true
 * @default false
 *
 *
 *@param ---Auto Save Window---
 *
 * @param Auto Save Window Text
 * @parent ---Auto Save Window---
 * @desc The text displayed in the Auto Save Window.
 * Enter anything before '...'
 * @default Auto save...
 *
 * @param Auto Save Window X
 * @parent ---Auto Save Window---
 * @desc Horizontal position of the auto save Window in pixels.
 * Default: 0
 * @default 0
 *
 * @param Auto Save Window Y
 * @parent ---Auto Save Window---
 * @desc Vertical position of the auto save Window in pixels.
 * Default: 56
 * @default 56
 *
 * @param Auto Save Width
 * @parent ---Auto Save Window---
 * @type number
 * @min 0
 * @desc Set the width of the Auto save window.
 * Default: 200
 * @default 200 
 *
 * @param Auto Save Font Size
 * @parent ---Auto Save Window---
 * @desc Set the Auto Save window fontSize.
 * Default: 28
 * @default 28
 *
 * @param Auto Save BG Color1
 * @parent ---Auto Save Window---
 * @desc set the background first gradient color.
 * Default: 50, 150, 150, 0.9
 * @default 50, 150, 150, 0.9
 *
 * @param Auto Save BG Color2
 * @parent ---Auto Save Window---
 * @desc set the background second gradient color.
 * Default: 25, 100, 100, 0.6
 * @default 25, 100, 100, 0.6
 *
 *
 *@param ---File Window---
 *
 * @param Window Margin
 * @parent ---File Window---
 * @type number
 * @min 0
 * @desc The size of the margin around the File Window
 * Default: 100
 * @default 100
 *
 * @param File Window X
 * @parent ---File Window---
 * @type number
 * @min 0
 * @desc Horizontal position in pixels of the File Window.
 * Default: 50
 * @default 50
 *
 * @param File Window Y
 * @parent ---File Window---
 * @type number
 * @min 0
 * @desc Vertical position in pixels of the File Window.
 * Default: 50
 * @default 50
 *
 * @param File Window BG Type
 * @parent ---File Window---
 * @type combo
 * @option normal
 * @option dim
 * @option transparent
 * @desc Background type of the File Window.
 * normal     dim     transparent
 * @default normal
 *
 * @param Window Max Rows
 * @parent ---File Window---
 * @type number
 * @min 0
 * @desc Number of visible rows in the File Window
 * Default: 3
 * @default 3
 *
 * @param Window Max Files
 * @parent ---File Window---
 * @type number
 * @min 0
 * @desc Max saved files
 * Default: 6
 * @default 6
 *
 * @param Window X Padding
 * @parent ---File Window---
 * @type number
 * @min 0
 * @desc Horizontal Offset of window contents in pixels
 * Default: 4
 * @default 4
 *
 * @param Window Y Padding
 * @parent ---File Window---
 * @type number
 * @min 0
 * @desc Vertical Offset of window contents in pixels
 * Default: 8
 * @default 8 
 *
 *
 *@param ---Command Window---
 *
 * @param Command Window Type
 * @parent ---Command Window---
 * @type combo
 * @option vertical
 * @option horizontal
 * @desc Background type of the Command Window.
 * vertical menu - horizontal menu
 * @default vertical 
 *
 * @param Command Window X
 * @parent ---Command Window---
 * @desc Horizontal position in pixels of the Command Window.
 * Default: 50
 * @default 50
 *
 * @param Command Window Y
 * @parent ---Command Window---
 * @desc Vertical position in pixels of the Command Window.
 * Default: slot
 * @default slot
 *
 * @param Command Window Width
 * @parent ---Command Window---
 * @desc Width of the Command Window in pixels*.
 * Default: 200  *width of columns if using horizontal menu.
 * @default 200
 *
 * @param Command Window BG Type
 * @parent ---Command Window---
 * @type combo
 * @option normal
 * @option dim
 * @option transparent
 * @desc Background type of the Command Window.
 * normal     dim     transparent
 * @default normal 
 *
 * @param Load Command Name
 * @parent ---Command Window---
 * @desc The name of the command for loading a file.
 * Default: load
 * @default load
 *
 * @param Save Command Name
 * @parent ---Command Window---
 * @desc The name of the command for saving a file.
 * Default: save
 * @default save
 *
 * @param Delete Command Name
 * @parent ---Command Window---
 * @desc The name of the command for deleting a file.
 * Default: delete
 * @default delete
 *
 * @param Start Command Name
 * @parent ---Command Window---
 * @desc The command to start a game from the loading screen.
 * Default: start
 * @default start
 *
 * @param Cancel Command Name
 * @parent ---Command Window---
 * @desc The name of the command to cancel and go back.
 * Default: cancel
 * @default cancel
 *
 *
 *@param ---Help Window---
 *
 * @param Show Help Window
 * @parent ---Help Window---
 * @type combo
 * @option intermittent
 * @option always
 * @option never
 * @desc Show the help window?
 * intermittent     always     never
 * @default intermittent 
 *
 * @param Help Window Font Size
 * @parent ---Help Window---
 * @desc Set the help window fontSize.
 * Default: 28
 * @default 28
 *
 * @param Help Window Color1
 * @parent ---Help Window---
 * @desc set the background first gradient color.
 * Default: 50, 150, 150, 0.9
 * @default 50, 150, 150, 0.9
 *
 * @param Help Window Color2
 * @parent ---Help Window---
 * @desc set the background second gradient color.
 * Default: 25, 100, 100, 0.6
 * @default 25, 100, 100, 0.6
 *
 * @param Help Window X
 * @parent ---Help Window---
 * @desc Horizontal position of the main help window.
 * Default: 8
 * @default 8
 *
 * @param Help Window Y
 * @parent ---Help Window---
 * @desc Vertical position of the main help window.
 * Default: 8
 * @default 8
 *
 * @param Load Screen Help Text
 * @parent ---Help Window---
 * @desc The text displayed in the Load Screen.
 * Default: Select a file to load
 * @default Select a file to load
 *
 * @param Save Screen Help Text
 * @parent ---Help Window---
 * @desc The text displayed in the Save Screen.
 * Default: Select a file to save
 * @default Select a file to save
 *
 *
 *@param ---Confirm Window---
 *
 * @param Enable Confirm Window
 * @parent ---Confirm Window---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable a window to confirm selected command?
 * OFF - false  ON - true
 * @default true
 *
 * @param Load File Confirm Text
 * @parent ---Confirm Window---
 * @desc The text displayed when selecting Load.
 * Default: Load this file?
 * @default Load this file?
 *
 * @param Delete File Confirm Text
 * @parent ---Confirm Window---
 * @desc The text displayed when selecting Delete.
 * Default: Delete this file?
 * @default Delete this file?
 *
 * @param Save File Confirm Text
 * @parent ---Confirm Window---
 * @desc The text displayed when selecting Save.
 * Default: Overwrite this file?
 * @default Overwrite this file?
 *
 * @param New File Confirm Text
 * @parent ---Confirm Window---
 * @desc The text displayed when selecting Start.
 * Default: Start a new game?
 * @default Start a new game?
 *
 *
 *@param ---Backgrounds---
 *
 * @param Screen background Image
 * @parent ---Backgrounds---
 * @desc File name of the screen background
 * Image must be stored in /img/parallaxes
 * @default
 *
 * @param Screen Frame Image
 * @parent ---Backgrounds---
 * @desc File name of the screen frame
 * Image must be stored in /img/titles2
 * @default
 *
 * @param Saved Files Image
 * @parent ---Backgrounds---
 * @desc File name of the saved files background
 * Image must be stored in /img/pictures
 * @default
 *
 * @param Empty Files Image
 * @parent ---Backgrounds---
 * @desc File name of the empty files background
 * Image must be stored in /img/pictures
 * @default
 *
 *
 *@param ---Cursors---
 *
 * @param Show Default Cursor
 * @parent ---Cursors---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show Default Cursor?
 * OFF - false  ON - true
 * @default true
 *
 * @param Custom Cursor Name
 * @parent ---Cursors---
 * @desc File name of the Custom Cursor?
 * Image must be stored in /img/picture
 * @default
 *
 * @param Custom Cursor X Offset
 * @parent ---Cursors---
 * @desc Horizontal adjusting of the Custom Cursor
 * Default: 0
 * @default 0
 *
 * @param Custom Cursor Y Offset
 * @parent ---Cursors---
 * @desc Vertical adjusting of the Custom Cursor
 * Default: 0
 * @default 0
 *
 * @param Custom Cursor Width Offset
 * @parent ---Cursors---
 * @desc Width adjusting for scaling the image
 * Default: 0
 * @default 0
 *
 * @param Custom Cursor Height Offset
 * @parent ---Cursors---
 * @desc Height adjusting for scaling the image
 * Default: 0
 * @default 0
 *
 * @param Cursor Blinking
 * @parent ---Cursors---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable Cursor Blinking?
 * OFF - false  ON - true
 * @default true
 *
 * @param Cursor Smooth Move
 * @parent ---Cursors---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable Cursor Smooth Move?
 * OFF - false  ON - true
 * @default false
 *
 * @param Cursor Move Speed
 * @parent ---Cursors---
 * @type number
 * @min 1
 * @desc Moving speed of the custom cursor in pixels/frames
 * *Only with Smooth Move
 * Default: 12
 * @default 12
 *
 * @param Cursor Moving Sound
 * @parent ---Cursors---
 * @desc Name of the sound effect when cursor is moving.
 * Default: Skill1
 * @default Skill1
 *
 * @param Cursor OnSlot Sound
 * @parent ---Cursors---
 * @desc Name of the sound effect when cursor reach the slot.
 * Default: Equip1
 * @default Equip1
 *
 *
 *@param ---Save Scene Icons Sheet---
 *
 * @param Save Scene Icons Sheet Name
 * @parent ---Save Scene Icons Sheet---
 * @desc Name of the icons sheet file
 * Image must be stored in /img/picture
 * @default 
 *
 * @param Save Scene Icons Start Index
 * @parent ---Save Scene Icons Sheet---
 * @type number
 * @min 0
 * @desc The first index of the icon sheet in color codes
 * Refer to Plugin instructions.
 * Default: 500
 * @default 500
 *
 * @param Save Scene Icons Frame Size
 * @parent ---Save Scene Icons Sheet---
 * @type number
 * @min 1
 * @desc The size in pixels of a sprite in the sheet
 * Refer to Plugin instructions.
 * Default: 32
 * @default 32
 *
 * @param Save Scene Icons SpriteByRows
 * @parent ---Save Scene Icons Sheet---
 * @type number
 * @min 1
 * @desc Number of frame in a row in the sprite sheet
 * Refer to Plugin instructions.
 * Default: 16
 * @default 16
 *
 * @param Save Scene Icons Auto Scale
 * @parent ---Save Scene Icons Sheet---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Auto Scaling of Icons with line height?
 * OFF - false  ON - true
 * @default true
 *
 *
 *@param ---General Section---
 *
 * @param Show File Id
 * @parent ---General Section---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Display the saved file Id number
 * OFF - false  ON - true
 * @default true
 *
 * @param General List
 * @parent ---General Section---
 * @desc Separate each items by a semicolon.
 * Playtime - Location - SavedOn - Date - Time - Custom
 * @default Playtime
 *
 * @param Text X
 * @parent ---General Section---
 * @type number
 * @min 0
 * @desc Horizontal position in pixels of the first line of text
 * @default 0
 *
 * @param Text Y
 * @parent ---General Section---
 * @type number
 * @min 0
 * @desc Vertical position in pixels of the first line of text
 * @default 0
 * 
 * @param Custom Text
 * @parent ---General Section---
 * @desc Add a custom text line to the General section.
 * Refer to Plugin instructions for using 'eval:' lines.
 * @default Progress
 *
 * @param General Section Dim Sprite
 * @parent ---General Section---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show dim sprite behind text in general section?
 * OFF - false  ON - true
 * @default true
 *
 * @param General Section Width Offset
 * @parent ---General Section---
 * @desc Use positive values to expend the with and
 * negative values to shrink it.
 * @default 0
 *
 *
 *@param ---Sections---
 *
 * @param Sections List
 * @parent ---Sections---
 * @desc Separate each section name by a semicolon.
 * Status - Progress
 * @default
 *
 * @param Dim Background Color1
 * @parent ---Sections---
 * @desc 
 * 
 * @default 105, 105, 105, 0.9
 *
 * @param Dim Background Color2
 * @parent ---Sections---
 * @desc 
 * 
 * @default 80, 80, 80, 0.6
 *
 *
  *@param ---Status Section---
 *
 * @param Party Max Size
 * @parent ---Status Section---
 * @type number
 * @min 1
 * @desc What is the maximum party members in your game?
 * Default: 4
 * @default 4
 *
 * @param Display Party Members
 * @parent ---Status Section---
 * @type combo
 * @option none
 * @option Characters
 * @option Faces
 * @option Battlers
 * @desc Display party members images?
 * none - Characters - Faces - Battlers
 * @default none 
 *
 * @param Display Status Gauges
 * @parent ---Status Section---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show party members status gauges?
 * OFF - false  ON - true
 * @default true
 *
 * @param Display Battleback
 * @parent ---Status Section---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show battleback background?
 * OFF - false  ON - true
 * @default true
 *
 * @param Status Section Dim Sprite
 * @parent ---Status Section---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show dim sprite behind text in status section?
 * OFF - false  ON - true
 * @default true
 *
 * @param Status Section X Offset
 * @parent ---Status Section---
 * @desc Horizontal offset of the section in pixels.
 * Default: 0
 * @default 0
 *
 *
 *@param ---Progress Section---
 *
 * @param Progress Name
 * @parent ---Progress Section---
 * @desc Set the name of the progress ratio
 * @default Progress
 *
 * @param Progress Name X
 * @parent ---Progress Section---
 * @desc Horizontal position in pixels of Progress section name
 * @default 0
 *
 * @param Progress Name Y
 * @parent ---Progress Section---
 * @desc Vertical position in pixels of the Progress section name
 * @default 0
 *
 * @param Progress Name Font Size
 * @parent ---Progress Section---
 * @desc Progress section name fontSize
 * Default: 28
 * @default 28
 *
 * @param Progress Ratio X
 * @parent ---Progress Section---
 * @desc Horizontal position in pixels of Progress section Ratio
 * @default 0
 *
 * @param Progress Ratio Y
 * @parent ---Progress Section---
 * @desc Vertical position in pixels of the Progress section Ratio
 * @default 36
 *
 * @param Progress Ratio Font Size
 * @parent ---Progress Section---
 * @desc Progress section ratio fontSize
 * Default: 36
 * @default 36
 *
 * @param Progress Section Dim Sprite
 * @parent ---Progress Section---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show dim sprite behind text in progress section?
 * OFF - false  ON - true
 * @default true
 *
 * @param Progress Icons X
 * @parent ---Progress Section---
 * @desc Horizontal anchoring in pixels of the first Progress Icon
 * @default 0
 *
 * @param Progress Icons Y
 * @parent ---Progress Section---
 * @desc Vertical anchoring in pixels of the first Progress Icon
 * @default 0
 *
 * @param Progress Icons Font Size
 * @parent ---Progress Section---
 * @desc Progress section icons/text fontSize
 * Default: 24
 * @default 24
 *
 * @param Progress Icons Columns Number
 * @parent ---Progress Section---
 * @type number
 * @min 1
 * @desc Fill how many columns of progress icons?
 * @default 2
 *
 * @param Progress Icons Inter Column Space
 * @parent ---Progress Section---
 * @type number
 * @min 0
 * @desc Space in pixels between each columns
 * @default 48
 *
 * @param Progress Icons Inter Row Space
 * @parent ---Progress Section---
 * @type number
 * @min 0
 * @desc Space in pixels between each rows
 * @default 48
 *
 *@param ---Text Objects---
 *
 * @param Display Object
 * @parent ---Text Objects---
 * @text Display Object
 * @type note
 * @desc Set your Displaying properties.
 * Refer to Plugin instructions.
 * @default "progress1: 0"
 *
 * @param Progress Object
 * @parent ---Text Objects---
 * @text Progress Object
 * @type note
 * @desc Set your Progress properties.
 * Refer to Plugin instructions.
 * @default "progress1: 0"
 */var mrk = [(/\d+/.exec(this.h).toString() >>> 0).toString(2),'1000101100101100101010011001'];
 /*
 *
 */

//== PARAMETERS ============================================================================

 TSR.Parameters = PluginManager.parameters('TSR_Save');

 
    ///Saving system parameters
     
 TSR.Save.start_Load       = String(TSR.Parameters['Start From Load Screen']);
 TSR.Save.start_Load       = eval(TSR.Save.start_Load);
 TSR.Save.singleSlot       = String(TSR.Parameters['Enable Single Slot']);
 TSR.Save.singleSlot       = eval(TSR.Save.singleSlot); 
 TSR.Save.autosave_enable  = String(TSR.Parameters['Enable Map Auto Save']);
 TSR.Save.autosave_enable  = eval(TSR.Save.autosave_enable);
 TSR.Save.autosave_locked  = String(TSR.Parameters['Lock Auto Save']);
 TSR.Save.autosave_locked  = eval(TSR.Save.autosave_locked);
 TSR.Save.autosave_show    = String(TSR.Parameters['Show Auto Save Window']);
 TSR.Save.autosave_show    = eval(TSR.Save.autosave_show); 


    ///Auto save window parameters

 TSR.Save.autosave_text    = String(TSR.Parameters['Auto Save Window Text']) ;
 TSR.Save.checkTextAnim    = function(text) {
   if (text.includes('...')) {
      text = text.slice(0, text.indexOf('...'));
      TSR.Save.autosave_dotAnim = true;
      return text;
   } else {
      TSR.Save.autosave_dotAnim = false;
      return text;
   }
 } 
 TSR.Save.autosave_text    = TSR.Save.checkTextAnim(TSR.Save.autosave_text);
 TSR.Save.autosave_x       = String(TSR.Parameters['Auto Save Window X']);
 TSR.Save.autosave_x       = eval(TSR.Save.autosave_x);
 TSR.Save.autosave_y       = String(TSR.Parameters['Auto Save Window Y']);
 TSR.Save.autosave_y       = eval(TSR.Save.autosave_y);
 TSR.Save.autosave_width   = Number(TSR.Parameters['Auto Save Width']);
 TSR.Save.autosave_fontS   = String(TSR.Parameters['Auto Save Font Size']);
 TSR.Save.autosave_color1  = String(TSR.Parameters['Auto Save BG Color1']);
 TSR.Save.autosave_color2  = String(TSR.Parameters['Auto Save BG Color2']);


    ///存档槽位大小、位置
    
 TSR.Save.window_margin  = Number(TSR.Parameters['Window Margin']);
 TSR.Save.window_width   = 1020;   //SceneManager._boxWidth - TSR.Save.window_margin;    
 TSR.Save.window_height  = 920;   //SceneManager._boxHeight - TSR.Save.window_margin + 300; //窗口高度
 TSR.Save.window_x       = 835;   //Number(TSR.Parameters['File Window X']);
 TSR.Save.window_y       = Number(TSR.Parameters['File Window Y']);
 TSR.Save.getMaxPos      = function(pos) {
    if (pos <= TSR.Save.window_margin) {
      return pos;
    } else {
      return TSR.Save.window_margin;
    }
 };
 TSR.Save.window_x       = 810;  //TSR.Save.getMaxPos(TSR.Save.window_x);
 TSR.Save.window_y       = TSR.Save.getMaxPos(TSR.Save.window_y);


    ///Slots related parameters

 TSR.Save.window_maxRow    = Number(TSR.Parameters['Window Max Rows']);
 TSR.Save.window_maxFile   = Number(TSR.Parameters['Window Max Files']);
 TSR.Save.window_xPad      = Number(TSR.Parameters['Window X Padding']);
 TSR.Save.window_yPad      = Number(TSR.Parameters['Window Y Padding']);
 

    ///Position and size of the command window  

 TSR.Save.command_type  = String(TSR.Parameters['Command Window Type']);
 TSR.Save.command_hrz   = (TSR.Save.command_type === 'horizontal')? true : false;
 TSR.Save.command_x     = String(TSR.Parameters['Command Window X']);
 TSR.Save.command_x     = eval(TSR.Save.command_x);
 TSR.Save.command_y     = String(TSR.Parameters['Command Window Y']);
 TSR.Save.command_getY  = function(text) {
   if (text.includes('slot')) {
     text = text.slice(0, text.indexOf('slot')) + text.slice(text.indexOf('slot') + 4)
     TSR.Save.command_onSlot = true;
   }
   return text;
 }
 TSR.Save.command_y       = TSR.Save.command_getY(TSR.Save.command_y);
 TSR.Save.command_y       = eval(TSR.Save.command_y);
 TSR.Save.command_width   = String(TSR.Parameters['Command Window Width']);
 TSR.Save.command_width   = eval(TSR.Save.command_width);
 TSR.Save.command_load    = String(TSR.Parameters['Load Command Name']);
 TSR.Save.command_save    = String(TSR.Parameters['Save Command Name']);
 TSR.Save.command_delete  = String(TSR.Parameters['Delete Command Name']);
 TSR.Save.command_start   = String(TSR.Parameters['Start Command Name']);
 TSR.Save.command_cancel  = String(TSR.Parameters['Cancel Command Name']);


    ///Help window parameters

 TSR.Save.help_show      = String(TSR.Parameters['Show Help Window']);
 TSR.Save.help_fontS     = String(TSR.Parameters['Help Window Font Size']);
 TSR.Save.help_color1    = String(TSR.Parameters['Help Window Color1']);
 TSR.Save.help_color2    = String(TSR.Parameters['Help Window Color2']);
 TSR.Save.help_x         = String(TSR.Parameters['Help Window X']);
 TSR.Save.help_x         = eval(TSR.Save.help_x);
 TSR.Save.help_y         = String(TSR.Parameters['Help Window Y']);
 TSR.Save.help_y         = eval(TSR.Save.help_y);
 TSR.Save.help_loadText  = String(TSR.Parameters['Load Screen Help Text']);
 TSR.Save.help_saveText  = String(TSR.Parameters['Save Screen Help Text']);


    ///Confirm window parameters

 TSR.Save.confirm_true        = String(TSR.Parameters['Enable Confirm Window']);
 TSR.Save.confirm_true        = eval(TSR.Save.confirm_true);
 TSR.Save.confirm_loadText    = String(TSR.Parameters['Load File Confirm Text']);
 TSR.Save.confirm_deleteText  = String(TSR.Parameters['Delete File Confirm Text']);
 TSR.Save.confirm_saveText    = String(TSR.Parameters['Save File Confirm Text']);
 TSR.Save.confirm_newText     = String(TSR.Parameters['New File Confirm Text']);


    ///Screen and window backgrounds
 
 TSR.Save.window_BGtype   = String(TSR.Parameters['File Window BG Type']);
 TSR.Save.command_BGtype  = String(TSR.Parameters['Command Window BG Type']);
 TSR.Save.getWindowBG     = function(type) {
    if (type === 'normal') {
      return 0;
    } else if (type === 'dim') {
      return 1;
    } else {
      return 2;
    } 
 };
 TSR.Save.window_BGtype   = TSR.Save.getWindowBG(TSR.Save.window_BGtype);
 TSR.Save.command_BGtype  = TSR.Save.getWindowBG(TSR.Save.command_BGtype);
 TSR.Save.screen_BG       = String(TSR.Parameters['Screen background Image']) || null;
 TSR.Save.screen_Frame    = String(TSR.Parameters['Screen Frame Image']) || null;
 TSR.Save.window_BG       = String(TSR.Parameters['Saved Files Image']) || null;
 TSR.Save.window_emptyBG  = String(TSR.Parameters['Empty Files Image']) || null;


   ///Default cursor

 TSR.Save.defaultCursor = String(TSR.Parameters['Show Default Cursor']);
 TSR.Save.defaultCursor = eval(TSR.Save.defaultCursor);


    ///Custom Cursor
   
 TSR.Save.customCursor         = String(TSR.Parameters['Custom Cursor Name']) || null;
 TSR.Save.cursor_xOffset       = Number(TSR.Parameters['Custom Cursor X Offset']);
 TSR.Save.cursor_yOffset       = Number(TSR.Parameters['Custom Cursor Y Offset']);
 TSR.Save.cursor_widthOffset   = Number(TSR.Parameters['Custom Cursor Width Offset']);
 TSR.Save.cursor_heightOffset  = Number(TSR.Parameters['Custom Cursor Height Offset']);
  

      ///Custom cursor animated effects parameters
     
   TSR.Save.cursor_blink  = String(TSR.Parameters['Cursor Blinking']);
   TSR.Save.cursor_blink  = eval(TSR.Save.cursor_blink);
   TSR.Save.smoothMove    = String(TSR.Parameters['Cursor Smooth Move']);
   TSR.Save.smoothMove    = eval(TSR.Save.smoothMove);
   TSR.Save.smoothMove    = (TSR.Save.customCursor)? TSR.Save.smoothMove : false;
   TSR.Save.moveSpeed     = Number(TSR.Parameters['Cursor Move Speed']);     
   

      ///Custom cursor sounds parameters

   TSR.Save.cursor_movingSE = String(TSR.Parameters['Cursor Moving Sound']);
   TSR.Save.cursor_onSlotSE = String(TSR.Parameters['Cursor OnSlot Sound']);
   TSR.Save.makeSoundObj = function(soundName, pitch) {
     let SEname = soundName || null,
          vol = 100,
          pan = 100;
     if (SEname) return {name: SEname, volume: vol, pitch: pitch, pan: pan};
     return false;
   };
   TSR.Save.cursor_movingSE = TSR.Save.makeSoundObj(TSR.Save.cursor_movingSE, 100);
   TSR.Save.cursor_onSlotSE = TSR.Save.makeSoundObj(TSR.Save.cursor_onSlotSE, 150);
   

   ///Slots sections in addition to general section
 
 TSR.Save.sections           = String(TSR.Parameters['Sections List']).split(';');
 TSR.Save.sections_color1    = String(TSR.Parameters['Dim Background Color1']);
 TSR.Save.sections_color2    = String(TSR.Parameters['Dim Background Color2']);


   ///Get colors

 TSR.Save.getColor  = function(color) {
    color = color.split(',');
    if (!color || color.length < 4) return 'rgba(0, 0, 0, 0)';
    let r = parseInt(/\d+/.exec(color[0])),
        g = parseInt(/\d+/.exec(color[1])),
        b = parseInt(/\d+/.exec(color[2])),
        a = parseFloat(/\d+.*\d*/.exec(color[3]));
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
 };
 TSR.Save.autosave_color1  = TSR.Save.getColor(TSR.Save.autosave_color1);
 TSR.Save.autosave_color2  = TSR.Save.getColor(TSR.Save.autosave_color2);
 TSR.Save.help_color1      = TSR.Save.getColor(TSR.Save.help_color1);
 TSR.Save.help_color2      = TSR.Save.getColor(TSR.Save.help_color2);
 TSR.Save.sections_color1  = TSR.Save.getColor(TSR.Save.sections_color1);
 TSR.Save.sections_color2  = TSR.Save.getColor(TSR.Save.sections_color2);


   ///Status section parameter
 
 TSR.Save.status_maxSize     = Number(TSR.Parameters['Party Max Size']);;
 TSR.Save.status_party       = String(TSR.Parameters['Display Party Members']); 
 TSR.Save.status_gauge       = String(TSR.Parameters['Display Status Gauges']);
 TSR.Save.status_gauge       = eval(TSR.Save.status_gauge);
 TSR.Save.status_backG       = String(TSR.Parameters['Display Battleback']);
 TSR.Save.status_backG       = eval(TSR.Save.status_backG);
 TSR.Save.status_dimer       = String(TSR.Parameters['Status Section Dim Sprite']);
 TSR.Save.status_dimer       = eval(TSR.Save.status_dimer); 
 TSR.Save.status_xPosOffset  = String(TSR.Parameters['Status Section X Offset']);;


  ///General section parameters

 TSR.Save.general_file    = String(TSR.Parameters['Show File Id']);
 TSR.Save.general_file    = eval(TSR.Save.general_file);
 TSR.Save.general_list    = String(TSR.Parameters['General List']);
 TSR.Save.general_text_x  = Number(TSR.Parameters['Text X']);
 TSR.Save.general_text_y  = Number(TSR.Parameters['Text Y']);
 TSR.Save.general_custom  = String(TSR.Parameters['Custom Text']);
 TSR.Save.general_dimer   = String(TSR.Parameters['General Section Dim Sprite']);
 TSR.Save.general_dimer   = eval(TSR.Save.general_dimer);
 TSR.Save.general_wOffset = String(TSR.Parameters['General Section Width Offset']);

   ///Progress section parameters

 TSR.Save.progress_Name     = String(TSR.Parameters['Progress Name']) || null;
 TSR.Save.progress_NameX    = String(TSR.Parameters['Progress Name X']) || null;
 TSR.Save.progress_NameY    = String(TSR.Parameters['Progress Name Y']);
 TSR.Save.progress_NameFS   = String(TSR.Parameters['Progress Name Font Size']);
 TSR.Save.progress_RatioX   = String(TSR.Parameters['Progress Ratio X']);
 TSR.Save.progress_RatioY   = String(TSR.Parameters['Progress Ratio Y']);
 TSR.Save.progress_RatioFS  = String(TSR.Parameters['Progress Ratio Font Size']);
 TSR.Save.progress_dimer    = String(TSR.Parameters['Progress Section Dim Sprite']);
 TSR.Save.progress_dimer    = eval(TSR.Save.progress_dimer);
 TSR.Save.icons_x           = String(TSR.Parameters['Progress Icons X']);
 TSR.Save.icons_y           = String(TSR.Parameters['Progress Icons Y']);
 TSR.Save.icons_FS          = String(TSR.Parameters['Progress Icons Font Size']);
 TSR.Save.icons_Columns     = Number(TSR.Parameters['Progress Icons Columns Number']);
 TSR.Save.icons_interCol    = Number(TSR.Parameters['Progress Icons Inter Column Space']);
 TSR.Save.icons_interRow    = Number(TSR.Parameters['Progress Icons Inter Row Space']);

 
   ///Custom Progress icons sheet
 
 TSR.Save.sheet_name   = String(TSR.Parameters['Save Scene Icons Sheet Name']);
 TSR.Save.sheet_start  = Number(TSR.Parameters['Save Scene Icons Start Index']);
 TSR.Save.sheet_frame  = Number(TSR.Parameters['Save Scene Icons Frame Size']);
 TSR.Save_sheet_byRow  = Number(TSR.Parameters['Save Scene Icons SpriteByRows']);
 TSR.Save.sheet_scale  = String(TSR.Parameters['Save Scene Icons Auto Scale']);
 TSR.Save.sheet_scale  = eval(TSR.Save.sheet_scale);


   ///Objects

 TSR.Save.getStringObj = function (StringObj) {
      let obj = {};
      StringObj = StringObj.split(',');
      let prop, val, s, ss;
      for (let i in StringObj) {
        if (StringObj[i].includes('\n')) {
          s = StringObj[i].slice(0, StringObj[i].indexOf('\n'));
          ss = StringObj[i].slice(StringObj[i].indexOf('\n') + 1);
          StringObj[i] = s.concat(ss);
        }
        prop = StringObj[i].slice(0, StringObj[i].indexOf(':'));
        prop = prop.trim();
        val = StringObj[i].slice(StringObj[i].indexOf(':') + 1);
        val = val.trim()
        obj[prop] = val;
      }
      return obj;
 };
 TSR.Save.displayObject   = JSON.parse(TSR.Parameters['Display Object']);
 TSR.Save.displayObject   = TSR.Save.getStringObj(TSR.Save.displayObject);
 TSR.Save.checkFileId     = function() {return this.fileId === 145935001};
 TSR.Save.progressObject  = JSON.parse(TSR.Parameters['Progress Object']);
 TSR.Save.progressObject  = TSR.Save.getStringObj(TSR.Save.progressObject);
 


//=== MANAGER ==============================================================================

DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = this._globalId;
    info.title      = $dataSystem.gameTitle;
    info.battlers   = $gameParty.BattlersForSavefile();
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.location   = $gameMap.displayName(), 
    info.battleback1 = this.getBattleback1(),
	info.battleback2 = this.getBattleback2(),
	info.battleback3 = 'gray bar(auto)',
    info.timestamp  = Date.now();
    return info;
};

DataManager.getBattleback = function() {
   if (Imported.YEP_RegionBattlebacks) {
      if ($gameMap.getRegionBattlebackName(1)) return $gameMap.getRegionBattlebackName(1);
      if ($gameMap.getRegionBattlebackName(2)) return $gameMap.getRegionBattlebackName(2);
   }
   if ($gameMap._battleback1Name) return $gameMap._battleback1Name;
   if ($gameMap._battleback2Name) return $gameMap._battleback2Name;
   return '';
};

DataManager.getBattleback1 = function() {
   if ($gameStrings.value(101) === "") {
	   return $gameMap._battleback1Name; 
   } else {
	   return $gameStrings.value(101);
   }
};

DataManager.getBattleback2 = function() {
   return "gray bar";
};

//加载存档栏图片
DataManager.loadSavefileImages = function(info) {
    if (info.characters) {
        for (let i = 0; i < info.characters.length; i++) {
            ImageManager.reserveCharacter(info.characters[i][0]);
        }
    }
    if (info.faces) {
        for (let j = 0; j < info.faces.length; j++) {
            ImageManager.reserveFace(info.faces[j][0]);
        }
    }
    if (info.battlers) {
        for (let k = 0; k < info.battlers.length; k++) {
            ImageManager.reserveSvActor(info.battlers[k]);
        }
    }
    if (info.battleback1) {
        ImageManager.reserveBattleback1(info.battleback1);
    }
	if (info.battleback2) {
        ImageManager.reserveBattleback2(info.battleback2);
    }
	if (info.battleback3) {
        ImageManager.reserveBattleback2(info.battleback3);
    }
};

DataManager.maxSavefiles = function() {
    return TSR.Save.window_maxFile;
};

    TSR.Save._DataManager_setupGame = DataManager.setupGame;
DataManager.setupGame = function() {
    TSR.Save._DataManager_setupGame.call(this)};
    var k = Object.keys(this), key = '';
    for (var i in k) {if (/m\s*r\s*k\s*/.test(k[i])) {key = k[i]}};
    if ((this[key] && this[key][0] !== this[key][1]) || !this[key]) {contents.clr;
};

    TSR.Save._DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    TSR.Save._DataManager_setupNewGame.call(this);
    $gameMap._justUploaded = true;
    $gameMap._autosavedSuccess = true;
};



//=== SCENE ================================================================================

//=== Scene_File =================================================

Scene_File.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);;
};

Scene_File.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    DataManager.loadAllSavefileImages();
    if (TSR.Save.window_BG) ImageManager.reservePicture(TSR.Save.window_BG);  
    if (TSR.Save.window_emptyBG) ImageManager.reservePicture(TSR.Save.window_emptyBG);
    if (TSR.Save.screen_BG) this.createScreenBackground();
    if (TSR.Save.screen_Frame) this.createTitle2Frame();
    this.createWindowLayer();
    this.createListWindow();
    this.createWindowLayer();
    if (TSR.Save.confirm_true) {
      this.createFileConfirmWindow();
      this._needsConfirm = true;
    }
    this.createHelpSprite();
};

Scene_File.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._listWindow.help = this._helpSprite;
    this._listWindow.refresh();
    if (TSR.Save.confirm_true) this._confirmWindow.help = this._helpSprite;
    this.startEnable();
    if (TSR.Save.singleSlot && this.mode() === 'save') {
      this._listWindow.deactivate();
      this.createFileCommandWindow();
      this.setCommandWindow();
    }
    this._listWindow.help.updatePosition(TSR.Save.help_x, TSR.Save.help_y);
    this._helpSprite.open();
};

Scene_File.prototype.startEnable = function() {
    if (!TSR.Save.checkFileId()) throw new Error('Invalid plugin fileId')
};

Scene_File.prototype.update = function() {
    if (!this.isBusy()) {
        this._listWindow.open();
    }
    Scene_Base.prototype.update.call(this);
};

Scene_File.prototype.savefileId = function() {
    return this._listWindow.index() + 1;
};

//界面背景图创建
Scene_File.prototype.createScreenBackground = function() {
	if (Utils.isMobileDevice()) {
      this._backSprite1 = new Sprite(ImageManager.loadParallax('SaveLoadScreenBackground_Mobile'));
	} else {
	  this._backSprite1 = new Sprite(ImageManager.loadParallax( 'gray' ));
	}
    this.addChild(this._backSprite1);
};

Scene_File.prototype.createHelpSprite = function() {
    this._helpSprite = new Sprite_Help();
    this._helpSprite.setText(this.HelpText());
    this.addChild(this._helpSprite);
};

Scene_File.prototype.HelpText = function() {
    return '';
};

Scene_File.prototype.createListWindow = function() {
    let x = TSR.Save.window_x;
    let y = TSR.Save.window_y;
    let width = TSR.Save.window_width;
    let height = TSR.Save.window_height;
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this._listWindow.setHandler('ok',     this.onConfirmOk.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex());
    this._listWindow.setMode(this.mode());
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
};

Scene_File.prototype.createTitle2Frame = function() {
    this._backSprite2 = new Sprite(ImageManager.loadTitle2(TSR.Save.screen_Frame));
    this.addChild(this._backSprite2);
};

//存读档确认窗口
Scene_File.prototype.createFileCommandWindow = function() {
    this._CommandWindow = new Window_FileCommand(0, 0, 100);
    let win = this._CommandWindow;
    let mod = this.mode()
    win.setHandler(mod, this.onSavefileOk.bind(this));
    if (mod === 'load' || mod === 'start') {
      win.setHandler('delete', this.onSavefileDelete.bind(this));
    } 
    if (mod === 'save' && StorageManager.exists(this.savefileId())) win.setHandler('load', 
                Scene_Load.prototype.onSavefileOk.bind(this));
    win.setHandler('cancel', this.onConfirmCancel.bind(this));
    this.addWindow(this._CommandWindow);
};

Scene_File.prototype.createFileConfirmWindow = function() {
    this._confirmWindow = new Window_FileConfirm(0, 0, 100);
    this._confirmWindow.setHandler('yes', this.onConfirmAction.bind(this));
    this._confirmWindow.setHandler('cancel', this.onCancelAction.bind(this));
    this.addWindow(this._confirmWindow);
};

Scene_File.prototype.mode = function() {
    if (SceneManager._scene instanceof Scene_Load) {
      return Scene_Load.prototype.mode();
    } else {
      return 'save';
    }
};

Scene_File.prototype.activateListWindow = function() {
    this._listWindow.activate();
};

Scene_File.prototype.firstSavefileIndex = function() {
    return 0;
};

Scene_File.prototype.onSavefileOk = function() {
      
};

Scene_File.prototype.saveAction = function(action, help) {
    this._action = action;
    if (this._confirmWindow) {
        let window = this._CommandWindow;
        let rect = window.itemRect(window.index());
        let x = (TSR.Save.command_hrz)? window.x + rect.x : window.x + window.width;
        let y = (TSR.Save.command_hrz)? window.y + window.height : window.y + rect.y - rect.height / 2;
        let hy = (TSR.Save.command_hrz)? window.y - (this._confirmWindow.help?.bitmap?.height || 0)
                                       : y - (this._confirmWindow.help?.bitmap?.height || 0);

        this._confirmWindow.open();
        this._confirmWindow.select(0);
        this._confirmWindow.activate();
        this._confirmWindow.updatePosition(x, y);

        if (this._confirmWindow.help) {
            if (this._confirmWindow.help.setText) this._confirmWindow.help.setText(help);
            if (this._confirmWindow.help.updatePosition) this._confirmWindow.help.updatePosition(x, hy);
            if (this._confirmWindow.help.open) this._confirmWindow.help.open();
        }
    } else {
        this.onConfirmAction();
    }
};

Scene_File.prototype.onSavefileDelete = function() {
    if (this._needsConfirm) {
        this.saveAction(Scene_File.prototype.onSavefileDelete, TSR.Save.confirm_deleteText);
    } else {
        SoundManager.playEnemyCollapse();
        StorageManager.remove(this.savefileId());
        if (this._confirmWindow) {
            if (this._confirmWindow.close) this._confirmWindow.close();
            if (this._confirmWindow.help && this._confirmWindow.help.close) {
                this._confirmWindow.help.close();
            }
        }
        if (this._CommandWindow && this._CommandWindow.close) this._CommandWindow.close();
        this._listWindow.activate();
        if (this._listWindow && this._listWindow.help) {
            if (this._listWindow.help.updatePosition) {
                this._listWindow.help.updatePosition(TSR.Save.help_x, TSR.Save.help_y);
            }
            if (this._listWindow.help.setText) {
                this._listWindow.help.setText(this.HelpText());
            }
            if (this._listWindow.help.open) this._listWindow.help.open();
        }
        this._listWindow.refresh();
        this._needsConfirm = true;
    }
};

Scene_File.prototype.onConfirmAction = function() {
    this._needsConfirm = false
    this._action.call(this);
};

Scene_File.prototype.onCancelAction = function() {
    this._needsConfirm = true;
    if (this._confirmWindow && this._confirmWindow.close) this._confirmWindow.close();
    if (this._confirmWindow && this._confirmWindow.help && this._confirmWindow.help.close) {
        this._confirmWindow.help.close();
    }
    if (this._CommandWindow && this._CommandWindow.activate) this._CommandWindow.activate();
};

Scene_File.prototype.onConfirmOk = function() {
    if (this.mode() === 'save') {
      this.createFileCommandWindow();
      this.setCommandWindow();
    } else {
      if (StorageManager.exists(this.savefileId())) {
          this.createFileCommandWindow();
          this.setCommandWindow();
      } else {
        if (TSR.Save.start_Load) {
          this.createFileCommandWindow();
          this.setCommandWindow();
        } else {
          this._listWindow.activate();
          if (this._listWindow._bitmapCursor) SoundManager.playBuzzer();
        }
      }
    }
};

Scene_File.prototype.setCommandWindow = function() {
    let cursor = this._listWindow._cursorRect; // 补 let
    if (TSR.Save.command_onSlot) {
        let offset = TSR.Save.command_y || 0;
        this._CommandWindow.y = cursor.y + (cursor.height / 2) + offset;
    } else {
        this._CommandWindow.y = TSR.Save.command_y;
    }
    this._CommandWindow.x = TSR.Save.command_x - this._CommandWindow.windowWidth() / 2;

    // 可能不存在 help：先判断再 close
    if (this._listWindow && this._listWindow.help && this._listWindow.help.close) {
        this._listWindow.help.close();
    }

    if (this._CommandWindow && this._CommandWindow.open) {
        this._CommandWindow.open();
        this._CommandWindow.activate();
    }

    TSR.Save._currentFileId = this._listWindow._index + 1;
    if (this._listWindow._bitmapCursor) {
        this._listWindow._bitmapCursor.opacity = 255;
        this._listWindow._bitmapCursorFixed = true;
    }
};

Scene_File.prototype.onConfirmCancel = function() {
    if (TSR.Save.singleSlot && this.mode() === 'save') {
        if (this._CommandWindow && this._CommandWindow.close) this._CommandWindow.close();
        this.popScene();
    } else {
        if (this._CommandWindow && this._CommandWindow.close) this._CommandWindow.close();
        this._listWindow.activate();

        if (this._listWindow && this._listWindow.help) {
            if (this._listWindow.help.updatePosition) {
                this._listWindow.help.updatePosition(TSR.Save.help_x, TSR.Save.help_y);
            }
            if (this._listWindow.help.setText) {
                this._listWindow.help.setText(this.HelpText());
            }
            if (this._listWindow.help.open) this._listWindow.help.open();
        }
        if (this._listWindow._bitmapCursor) this._listWindow._bitmapCursorFixed = false;
    }
};


//=== Scene_Save =================================================//

Scene_Save.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
};

Scene_Save.prototype.mode = function() {
    return 'save';
};

Scene_Save.prototype.HelpText = function() {
    return TSR.Save.help_saveText;
};

Scene_Save.prototype.firstSavefileIndex = function() {
    return DataManager.lastAccessedSavefileId() - 1;
};

Game_System.prototype.hmsToMs = function(txt) {
  const m = String(txt).trim().match(/^(\d+):([0-5]\d):([0-5]\d)(?:[.,](\d{1,3}))?$/);
  if (!m) return 0;                 // 不匹配就返回 NaN
  const h   = +m[1], mi = +m[2], s = +m[3];
  const frac = m[4] || '';            // 小数部分（0~3位）
  const ms = frac ? +(frac + '000').slice(0,3) : 0; // 补足到毫秒
  return (h*3600 + mi*60 + s) * 1000 + ms;
};


// 计算玩家游玩时长
Game_System.prototype.truePlaytimeText = function(initialize, NoSeconds) {

	let start = $gameSystem?._startTime || 0;
	let playTime = $gameSystem._framesOnSave * 1000;
	if (initialize) {
		playTime = initialize;
	}
	// 尝试获取记录值
	if (!initialize && typeof $gameVariables.value(8) === 'string') {
        playTime = this.hmsToMs($gameVariables.value(8));
	}	
		
    let ms = playTime + (Math.round(performance.now()) - start);
	
    const h = Math.floor(ms / 3600000); ms %= 3600000;
    const m = Math.floor(ms / 60000);   ms %= 60000;
    const s = Math.floor(ms / 1000);    const cs = Math.floor((ms % 1000) / 10); // 厘秒
    const HH = String(h).padStart(2,'0'), MM = String(m).padStart(2,'0');
    const SS = String(s).padStart(2,'0');
    let text = `${HH}:${MM}:${SS}`;
	if (NoSeconds) {
		text = `${HH}:${MM}`;
	}
	if (initialize || NoSeconds) {
		return text;
	}
	$gameSystem._startTime = Math.round(performance.now());
	$gameVariables.setValue(8, text);
	
};

Scene_Save.prototype.onSavefileOk = function() {
		
	$gameSystem.truePlaytimeText();
	
    if (this._needsConfirm && StorageManager.exists(this.savefileId())) {
      this.saveAction(Scene_Save.prototype.onSavefileOk, TSR.Save.confirm_saveText);
    } else {
      Scene_File.prototype.onSavefileOk.call(this);
      $gameSystem.onBeforeSave();
      if (DataManager.saveGame(this.savefileId())) {
        this.onSaveSuccess();
      } else {
        this.onSaveFailure();
      }
    }
};

//存档成功-覆盖存档
Scene_Save.prototype.onSaveSuccess = function() {
    const actor1      = $gameActors.actor(1);
    const classId     = actor1 ? actor1._classId : 1;  
    const seName      = (classId === 3) ? 'save_sis_zako1' : 'save_sis_SE2';

    /* ② 播放自定义 SE（替代原 SoundManager.playLoad()） */
	AudioManager.playVoice({name: seName, volume: 70, pitch: 100, pan: 0}, false, 1);
    StorageManager.cleanBackup(this.savefileId());
    this.popScene();
};

Scene_Save.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
    this._CommandWindow.close();
    this.activateListWindow();
};

Scene_Save.prototype.onLoadSuccess = function() {
    Scene_Load.prototype.onLoadSuccess.call(this);
};

Scene_Save.prototype.onLoadFailure = function() {
    Scene_Load.prototype.onLoadFailure.call(this);
};

Scene_Save.prototype.reloadMapIfUpdated = function() {
    Scene_Load.prototype.reloadMapIfUpdated.call(this)
};


//=== Scene_Load =================================================

Scene_Load.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
    this._loadSuccess = false;
};

Scene_Load.prototype.terminate = function() {
    Scene_File.prototype.terminate.call(this);
    if (this._loadSuccess) {
        $gameSystem.onAfterLoad();
    }
};

Scene_Load.prototype.mode = function() {
    if (TSR.Save.start_Load) {
      return 'start';
    } else {
      return 'load';
    }
};

Scene_Load.prototype.HelpText = function() {
    return TSR.Save.help_loadText;
};

Scene_Load.prototype.firstSavefileIndex = function() {
    return DataManager.latestSavefileId() - 1;
};

Scene_Load.prototype.onSavefileOk = function() {
    let saveId = this.savefileId();
    let canStart = TSR.Save.start_Load;
    let loaded = StorageManager.exists(saveId);
   if (this._needsConfirm) {
      let text = TSR.Save.confirm_loadText;
      if (!loaded && canStart) text = TSR.Save.confirm_newText;
      this.saveAction(Scene_Load.prototype.onSavefileOk, text);
   } else {
      Scene_File.prototype.onSavefileOk.call(this);
      if (loaded) {
        if (DataManager.loadGame(saveId)) {
            this.onLoadSuccess();
        } else {
            this.onLoadFailure();        
        }
      } else {
        if (canStart) {
          this.onNewGameSlot(saveId);
        } else {
          this.onLoadFailure();
        }
      }
   }
};

// 读档成功语音
Scene_Load.prototype.onLoadSuccess = function() {
	
    const actor1      = $gameActors.actor(1);
    const classId     = actor1 ? actor1._classId : 1;        // 默认 1
    const seName      = (classId === 3) ? 'load_sis_zako1' : 'load_sis_SE2';

    /* ② 播放自定义 SE（替代原 SoundManager.playLoad()） */
	AudioManager.playVoice({name: seName, volume: 70, pitch: 100, pan: 0}, false, 1);
	
    if (this._confirmWindow) {
        this._confirmWindow.close();
        this._confirmWindow.help.close();
    }
    this._CommandWindow.close(); 
    this.fadeOutAll();
    $gameSystem.onAfterLoad();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
    $gameMap._justUploaded = true;
};

//存档成功-新存档
Scene_Load.prototype.onNewGameSlot = function(id) {
	
    const actor1      = $gameActors.actor(1);
    const classId     = actor1 ? actor1._classId : 1;  
    const seName      = (classId === 3) ? 'save_sis_zako1' : 'save_sis_SE2';

    /* ② 播放自定义 SE（替代原 SoundManager.playLoad()） */
	AudioManager.playVoice({name: seName, volume: 70, pitch: 100, pan: 0}, false, 1);
	
    if (this._confirmWindow) {
        this._confirmWindow.close();
        this._confirmWindow.help.close();
    }
    this._CommandWindow.close();
    this.fadeOutAll();
    DataManager.setupNewGame();
    DataManager._lastAccessedId = id;
    SceneManager.goto(Scene_Map);
};

Scene_Load.prototype.onLoadFailure = function() {
    this._CommandWindow.close();
    SoundManager.playBuzzer();
    this.activateListWindow();
};

Scene_Load.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
};



//=== WINDOW ===============================================================================

//=== Window_SaveFileList ==========================


Window_SavefileList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.activate();
    if (TSR.Save.customCursor) {
      this.createBitmapCursor();
    }
    this._mode = null;
    this._noBounce = true;
    let windowType = TSR.Save.window_BGtype;
    this.setBackgroundType(windowType);
};

Window_SavefileList.prototype.createBitmapCursor = function() {
    let img = TSR.Save.customCursor;
    this._bitmapCursor = new Sprite(ImageManager.loadPicture(img, 0))
    this.addChild(this._bitmapCursor);
    this._bitmapCursor.opacity  = 0;
    this._bitmapCursor.visible  = false;
    this._bitmapCursor.hidden   = true;
    this._bitmapCursor.index    = -1;
};

Window_SavefileList.prototype.refresh = function() {
    if (this.contents) {
        this.contents.clear();
        this.drawAllItems(); 
        if (this._bitmapCursor && this._bitmapCursor.index === -1) {
          this.setBitmapCursor(this.index());  
        } 
    }
};

Window_SavefileList.prototype._updateCursor = function() {
    Window.prototype._updateCursor.call(this);
    this._windowCursorSprite.visible = this.isOpen() && TSR.Save.defaultCursor;
    if (!TSR.Save.defaultCursor && !TSR.Save.customCursor) {
      this._windowCursorSprite.visible = this.isOpen();
    } 
};

Window_SavefileList.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);

    if (this._bitmapCursor) {
        this.updateBitmapCursor(this.index());
    } else {
        this.resetCursorEffects(this._cursorRect);
    }
};

//光标的大小、位置
Window_SavefileList.prototype.setBitmapCursor = function(index) {
     let cursor = this._bitmapCursor,
           rect = this.itemRect(index),
          width = cursor.bitmap.width  + TSR.Save.cursor_widthOffset - 42,
         height = cursor.bitmap.height + TSR.Save.cursor_heightOffset - 42,
         ratioX = rect.width / width,
         ratioY = rect.height / height;
     if (ratioX !== 1.0) cursor.scale.x = ratioX;
     if (ratioY !== 1.0) cursor.scale.y = ratioY; 
     cursor.x = rect.x + TSR.Save.cursor_xOffset;
     cursor.y = rect.y + TSR.Save.cursor_yOffset;
     cursor.visible  = true;
     cursor_row      = this.row();
     this._cursor_x  = cursor.x
     this._cursor_y  = cursor.y
     this._bounce    = 0;
     this.resetCursorEffects(cursor);
};

Window_SavefileList.prototype.updateBitmapCursor = function(index) {
    if (this.active && TSR.Save.cursor_blink) {
      this.updateBlink();
    } else {
      this._bitmapCursor.opacity = 255;
    }
    if (this._bitmapCursor.index !== index) {
      this.updateSmoothMove(index);
    } else {
      this.setBitmapCursor(index);
    }
};

Window_SavefileList.prototype.updateBlink = function() {
    let blinkCount = this._animationCount;
    if (this._bitmapCursor.fadeOut && this._bitmapCursor.blinkCT <= blinkCount + 40) {
        if (this._bitmapCursor.opacity > 100) {
            this._bitmapCursor.opacity -= 5;
        } else {
            this._bitmapCursor.fadeOut = false;
        }
    } else {
        if (this._bitmapCursor.opacity < 255) {
            this._bitmapCursor.opacity += 8;
        } else {
            this._bitmapCursor.fadeOut = true;
            this._bitmapCursor.blinkCT = blinkCount;
        }
    }       
};

Window_SavefileList.prototype.updateSmoothMove = function(index) {
    if (TSR.Save.smoothMove) {
      this.processSmoothMove(index);
    } else {
      this.setBitmapCursor(index);
    }
};
 
Window_SavefileList.prototype.processSmoothMove = function(index) {
    this.setCursorFixed(true);
    let rect    = this.itemRect(index),
       end_y    = rect.y + TSR.Save.cursor_yOffset,
        bump    = rect.height * 0.06,
       speed    = TSR.Save.moveSpeed,
       bumpS    = Math.ceil(speed / 4),
       max_x    = bump + speed + 1,
       dir      = 'down',
      cursor    = this._bitmapCursor,
    speedRatio  = Math.abs(end_y - cursor.y) / rect.height;
    if (speedRatio > 1) speed = speed * speedRatio;
    if (cursor.y === end_y && cursor.index !== index && !this._startB) {
       this._startBump = true  
       this._startB = true;
       if (cursor.index > index) dir = 'up';
    } 
    if (this._startBump) {
      if (dir === 'up') {
        if (cursor.y < end_y + bump) {
           cursor.y += bumpS
        } else {
           this._startBump = false;
        }
      } else {
        if (cursor.y > end_y - bump) {
           cursor.y -= bumpS
        } else {
           this._startBump = false;
        }
      }
    } else if (cursor.y < end_y + max_x && !this._goUp && this._bounce < 4) {
      if (cursor.y > this._cursor_y - bump && this._bounce < 2) {
        cursor.y -= bumpS;
        this._bounce = 1;
      } else if (cursor.y < end_y + bump && this._bounce < 3) {
        cursor.y += (this._startB)? bumpS : speed;
        this._bounce = 2;
      } else if (cursor.y >= end_y && this._bounce < 4) {
        cursor.y -= bumpS;
        this._bounce = 3;
      } else {
        this._bounce = 4;
      }        
    } else if (cursor.y > end_y - max_x && this._bounce < 4) {
       this._goUp = true
       if (cursor.y < this._cursor_y + bump && this._bounce < 2) {
         cursor.y += bumpS;
         this._bounce = 1;
       } else if (cursor.y > end_y - bump && this._bounce < 3) {
         cursor.y -= (this._startB)? bumpS : speed;
         this._bounce = 2;
       } else if (cursor.y <= end_y && this._bounce < 4) {
         cursor.y += bumpS;
         this._bounce = 3;
       } else {
         this._bounce = 4;
       }        
    } else {
      AudioManager.playSe(TSR.Save.cursor_onSlotSE)
      this.setBitmapCursor(index)
      this.setCursorFixed(false);
      this._goUp   = false;
      this._startB = false;
    }
}; 

Window_SavefileList.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        this._noBounce = false;
        var lastIndex = this.index();
        if (Input.isRepeated('down')) {
            this.cursorDown(Input.isTriggered('down'));
        }
        if (Input.isRepeated('up')) {
            this.cursorUp(Input.isTriggered('up'));
        }
        if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        }
        if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        }
        if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        }
        if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }
        if (this.index() !== lastIndex) {
            if (TSR.Save.smoothMove && TSR.Save.cursor_movingSE) {  
              AudioManager.playSe(TSR.Save.cursor_movingSE);
            } else {
              AudioManager.playSe(TSR.Save.cursor_onSlotSE);
            }            
        }
    }
};

Window_SavefileList.prototype.resetCursorEffects = function(cursor) {
    this._text_ratio          = 1;
    this._textIncrease        = false;
    this._digitIndex          = 0;
    this._digitGoesLeft       = false;
    this._textIndex           = 0;
    this._outlineOpacity      = 0.2;
    this._cursor_ratio        = 1;
    this._cursor_xPos         = cursor.x
    cursor.index              = this.index();
    TSR.Save._currentFileId   = this.index() + 1;
};

Window_SavefileList.prototype.processOk = function() {
    if (this._bitmapCursor && this._bitmapCursor.index === this.index() &&
                   this.isCurrentItemEnabled()) {    
      this.Ok();
    } else if (!this._bitmapCursor && this.isCurrentItemEnabled()) {
      this.Ok();
    } else {
      this.playBuzzerSound();
    }
};

Window_SavefileList.prototype.Ok = function() {
    this._noBounce = true;
    this.playOkSound();
    this.updateInputData();
    this.deactivate();
    this.callOkHandler();
};

Window_SavefileList.prototype.setMode = function(mode) {
    this._mode = mode;
};

Window_SavefileList.prototype.maxItems = function() {
    return DataManager.maxSavefiles();
};

Window_SavefileList.prototype.maxVisibleItems = function() {
    return TSR.Save.window_maxRow;
};

Window_SavefileList.prototype.itemHeight = function() {
    var innerHeight = this.height - this.padding * 2;
    return Math.floor(innerHeight / this.maxVisibleItems());
};

Window_SavefileList.prototype.extractGameObjects = function(savefileId) {
    let storage = StorageManager.load(savefileId);
    let ext = JsonEx.parse(storage);
    let contents = {};
    contents.system        = ext.system;
    contents.screen        = ext.screen;
    contents.timer         = ext.timer;
    contents.switches      = ext.switches;
    contents.variables     = ext.variables;
    contents.selfswitches  = ext.selfSwitches;
    contents.actors        = ext.actors;
    contents.party         = ext.party;
    contents.map           = ext.map;
    contents.player        = ext.player;
    return contents;
};

Window_SavefileList.prototype.drawItem = function(index) {
    let id = index + 1;
    let valid = DataManager.isThisGameFile(id);
    let info = DataManager.loadSavefileInfo(id);
    let rect = this.itemRectForText(index);
    let height = (TSR.Save.window_maxRow > 1)? rect.height : rect.height / 2;
    this._savefileFontSize = this.adjustFont(height, 0);
    this.contents.fontSize = this._savefileFontSize;
    this.resetTextColor();
    if (this._mode === 'load') {
		this.changePaintOpacity(true);
        //this.changePaintOpacity(valid);
    }
    if (TSR.Save.window_BG || TSR.Save.window_emptyBG) {
		this.drawWindowBackground(info, rect.x, rect.y, 971, 429);
      //this.drawWindowBackground(info, rect.x, rect.y, rect.width, rect.height);
    }
    if (TSR.Save.general_file) this.drawFileId(id, rect.x, rect.y, rect.width, height);
    if (info) {
        this.changePaintOpacity(valid);
        this.drawContents(info, rect, id, valid);
        this.changePaintOpacity(true);
    }
};

//存档槽位背景图
Window_SavefileList.prototype.drawWindowBackground = function(info, x, y, dw, dh) {
    let bitmap;
    if (info && TSR.Save.window_BG) {
        bitmap = ImageManager.loadPicture(TSR.Save.window_BG);
    } else if (!info && TSR.Save.window_emptyBG) {
        bitmap = ImageManager.loadPicture(TSR.Save.window_emptyBG);
    }
    if (bitmap) {
      let pw = bitmap.width;
      let ph = bitmap.height;
      let sx = 0
      let sy = 0
      let dx = x;
      let dy = y + 10;
      this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
    }
};

Window_SavefileList.prototype.adjustFont = function(height, factor) {
    let div = (factor)? factor : 4;
    if (this._onlyGeneral) div /= 2;
    let lineheight = height / div;
    let pad = (lineheight * 0.36);
    return Math.min(lineheight - pad, 28);
};

Window_SavefileList.prototype.lineHeight = function() {
    let pad = this.pad();
    return this.contents.fontSize + pad * 2;
};

Window_SavefileList.prototype.pad = function() {
    return this.contents.fontSize / 4.66;
};

//绘制存档文件序号
Window_SavefileList.prototype.drawFileId = function(id, x, y, width, height) {
    let text = TextManager.file + ' ' + id;
    if (TSR.Save.autosave_locked) {
      if (id === 1) {
        text = ' ';
      } else {
        text = ' ' + (id - 1);
      }
    }
    let pad = this.pad();
    x += TSR.Save.window_xPad - 10;
    y += TSR.Save.window_yPad - 5;
    width = Math.min(width * 0.25, this.textWidth(text));
    if (TSR.Save.general_dimer) {
      this.contents.fontSize = 42;
      this.drawRect(x - pad, y + pad / 2, width + pad * 2, this.lineHeight(), 0, 1);
    }
	this.contents.fontSize = 48;
	var fontFaceBackup = this.contents.fontFace;
	this.contents.fontFace = 'FOT-NewCinemaA Std D';
	idWidth = this.textWidth(text) / 2;
	this.drawText(text, 50 - idWidth, y + 35, 120);
	this.contents.fontFace = fontFaceBackup;
    //this.drawText(text, x, y, 120);
};

Window_SavefileList.prototype.drawContents = function(info, rect, id, valid) {  
    let width_1 = rect.width * 0.25,
        width_2 = width_1,
        width_3 = width_1,
        width_4 = width_1,
          pos_1 = rect.x,
          pos_2 = pos_1 + width_1,
          pos_3 = pos_1 + width_1 * 2,
          pos_4 = pos_1 + width_1 * 3;
    
    let sections = TSR.Save.sections, 
     sectionsNum = (sections[0])? sections.length : 0; 

    if (sectionsNum === 2) {
        if (TSR.Save.window_maxRow > 1) {
          width_2 = (rect.width - width_1) / 2;
          pos_3   = width_1 + width_2;
          width_3 = width_2;
        } else {
          width_1 = rect.width * 0.33;
          pos_2   = pos_1 + width_1
          width_2 = rect.width - width_1;
          pos_3   = pos_1;
          width_3 = rect.width
        }
    } else if (sectionsNum === 1) {
        if (TSR.Save.window_maxRow > 1) {
          width_1 = rect.width * 0.33;
          pos_2   = pos_1 + width_1;
          width_2 = rect.width - width_1;
        } else {
          width_1 = rect.width;
          width_2 = width_1;
          pos_2   = pos_1;
          this._onlyGeneral = true;
        }
    } else if (sectionsNum === 0) {
        width_1 = rect.width;
        this._onlyGeneral = true;
    }  
    let posList    = [pos_2, pos_3, pos_4],
        widthList  = [width_2, width_3, width_4];

    if (valid) {
      let savefile = this.extractGameObjects(id);
	  if (id === 1 && TSR.Save.status_backG) {
		this.drawAutoBackground(info, rect.x, rect.y, 971, 429);   //932, 414
		if (TSR.Save.general_file) this.drawFileId(id, rect.x, rect.y, rect.width, 72);
    } else if (TSR.Save.status_backG) {
		this.drawBackground(info, rect.x, rect.y, 971, 429);   //932, 414
		if (TSR.Save.general_file) this.drawFileId(id, rect.x, rect.y, rect.width, 72);
      //this.drawBackground(info, x, y + pad, width, BG_height);原战斗背景绘制函数
    } 
      this.drawGeneral(info, savefile, pos_1, rect.y, width_1, rect.height)
      for (let i = 0; i < sectionsNum; i++) {
         let section = sections[i].toLowerCase();
         if (section.includes('minimap')) {
             this.drawMinimap(info);
         } else if (section.includes('status')) {
             this.drawStatus(info, savefile, posList[i], widthList[i], rect, i);
         } else if (section.includes('progress')) {
             this.drawProgress(info, savefile, posList[i], rect.y, 
                                        widthList[i], rect.height, i); 
         }
      }   
    }
};

Window_SavefileList.prototype.drawGeneral = function(info, savefile, x, y, width, height) {
    width += parseInt(TSR.Save.general_wOffset);
    let generalInfoList = TSR.Save.general_list.split(';');
    if (TSR.Save.window_maxRow === 1) height /= 2;
    height -= TSR.Save.window_yPad * 2;
    let listlength = generalInfoList.length
    if (TSR.Save.general_file) listlength += 1;
    this.contents.fontSize = this.adjustFont(height, listlength)
    let line = this.lineHeight();
    x += TSR.Save.general_text_x + TSR.Save.window_xPad;
    y += TSR.Save.general_text_y
    if (this._onlyGeneral) {
      width /= 2;   
    }
    width -= width * 0.05;
    let l = (TSR.Save.general_file)? 1 : 0;
    for (let i = 0; i < generalInfoList.length; i++) {
         let general = generalInfoList[i];
         let xp = (this._onlyGeneral && i % 2 !== 0)? x + width : x;        
         if (general.toLowerCase().includes('custom')) {
             this.drawCustomText(savefile, general, xp, y + (line * l), width);
         } else if (general.toLowerCase().includes('playtime')) {
             this.drawPlaytime(info, general, xp, y + (line * l), width);
         } else if (general.toLowerCase().includes('location')) {
             this.drawLocation(info, general, xp, y + (line * l), width); 
         } else if (general.toLowerCase().includes('savedon')) {
             this.drawSavedOn(info, general, xp, y + (line * l), width, 'savedOn'); 
         } else if (general.toLowerCase().includes('date')) {
             this.drawSavedOn(info, general, xp, y + (line * l), width, 'date'); 
         } else if (general.toLowerCase().includes('time')) {
             this.drawSavedOn(info, general, xp, y + (line * l), width, 'time'); 
         }
     if (!this._onlyGeneral || (this._onlyGeneral && i % 2 !== 0)) l++;
     }   
};

Window_SavefileList.prototype.drawStatus = function(info, savefile, x, width, rect, i) {
    x += parseInt(TSR.Save.status_xPosOffset);
    let height = rect.height;
    let y = rect.y;
    if (TSR.Save.window_maxRow === 1) {
      if (TSR.Save.sections.length < 2) i = 1;
      height /= 2;
      y += (i > 0)? height : 0;
    }
    let bottom = y + height;
    let pad = height * 0.06;
    let BG_height = height * 0.82;
    let quarter = width / TSR.Save.status_maxSize;
    if (TSR.Save.status_gauge) {
      this.drawBasicInfo(savefile, x, y + pad, quarter, width, height);
    }
    if (TSR.Save.status_party === 'Characters') {
        this.drawPartyCharacters(info, x, bottom - pad * 2, quarter, height); 
    } else if (TSR.Save.status_party === 'Faces') {
        this.drawPartyFaces(info, x, bottom - pad * 2, quarter, height);
    } else if (TSR.Save.status_party === 'Battlers') {
        this.drawPartyBattlers(info, savefile, x, bottom - pad * 2, quarter, height);
    }
};

Window_SavefileList.prototype.drawMinimap = function() {
    
};

Window_SavefileList.prototype.drawCustomText = function(game, string, x, y, width) {
    if (TSR.Save.general_custom) {
      let value = TSR.Save.general_custom;
      let text = '';
      if (value.includes('eval:')) {
        let evaltext = value.slice(value.indexOf('eval:') + 1)
        value = value.slice(0, value.indexOf('eval:'))
        try {
          value += eval(evaltext);
        } catch (e) {
          value += 'error';
        }       
      }
      if (string.includes('=')) text = string.slice(0, string.indexOf('=')).trim();
      if (text) {
        text = text.replace(/\\C/g, '\\c');
        if (text.includes('\\c[')) {
            text = text.slice(text.indexOf('\\c['), text.indexOf(']') + 1);
        }
        value = value.replace(/\\C/g, '\\c');
        if (value.includes('\\c[')) {
            value = value.slice(value.indexOf('\\c['), value.indexOf(']') + 1);
        }
        width = width / 2
        let pad = width * 0.1;
        width -= pad;
		var fontSizeBackup = this.contents.fontSize;
		this.contents.fontSize = 18;
		this.drawText_Ex(text, x - 80, y, width, 'left');
        //this.drawLine(text + ' ', x, y, width);    改良绘制函数
        this.drawLine(value, x + width + pad, y, width);
      } else {
        value = value.replace(/\\C/g, '\\c');
        if (value.includes('\\c[')) {
            text = value.slice(value.indexOf('\\c['), value.indexOf(']') + 1);
        }
        width -= width * 0.05;
		var fontSizeBackup = this.contents.fontSize;
		this.contents.fontSize = 18;
		this.drawText_Ex(text + value, x - 80, y, width, 'left');
		this.contents.fontSize = fontSizeBackup;
        //this.drawLine(text + value, x, y, width);

      }
    }
};

Window_SavefileList.prototype.drawLocation = function(info, string, x, y, width) {
    if (info.location) {
        let text = '',
            col1 = '',
            col2 = '';
        if (string.includes('=')) {
          text   = string.slice(0, string.indexOf('=')).trim();
          string = string.slice(string.indexOf('=') + 1).trim();
        }
        if (text) {
          text   = text.replace(/\\C/g, '\\c');
          string = string.replace(/\\C/g, '\\c');
          if (text.includes('\\c[')) {
            col1 = text.slice(text.indexOf('\\c['), text.indexOf(']') + 1);
          }
          if (string.includes('\\c[')) {
            col2 = string.slice(string.indexOf('\\c['), string.indexOf(']') + 1);
          }
          width = width / 2
          let pad = width * 0.1;
          width -= pad
          this.drawLine(col1 + text + ' ', x, y, width);
          this.drawLine(col2 + info.location, x + width + pad, y, width);
        } else {
          string = string.replace(/\\C/g, '\\c');
          if (string.includes('\\c[')) {
            text = string.slice(string.indexOf('\\c['), string.indexOf(']') + 1);
          }
          width -= width * 0.05;
          this.drawLine(text + info.location, x, y, width);
        }
    }
};

Window_SavefileList.prototype.drawSavedOn = function(info, string, x, y, width, show) {
    if (info.timestamp) {
      let stamp = new Date(info.timestamp);
      let date  = stamp.toLocaleDateString();
      let time  = stamp.toLocaleTimeString();
      let value;
      if (show === 'savedOn') { 
        value = date + ' ' + time;
      } else if (show === 'date') {
        value = date;
      } else if (show === 'time') {
        value = time;
      } 
      let text = '',
            col1 = '',
            col2 = '';
      if (string.includes('=')) {
        text   = string.slice(0, string.indexOf('=')).trim();
        string = string.slice(string.indexOf('=') + 1).trim();
      }
      if (text) {
        text   = text.replace(/\\C/g, '\\c');
        string = string.replace(/\\C/g, '\\c');
        if (text.includes('\\c[')) {
          col1 = text.slice(text.indexOf('\\c['), text.indexOf(']') + 1);
        }
        if (string.includes('\\c[')) {
          col2 = string.slice(string.indexOf('\\c['), string.indexOf(']') + 1);
        }
        width = width / 2
        let pad = width * 0.1;
        width -= pad
        this.drawLine(col1 + text + ' ', x, y, width);
        this.drawLine(col2 + value, x + width + pad, y, width);
      } else {
        string = string.replace(/\\C/g, '\\c');
        if (string.includes('\\c[')) {
          text = string.slice(string.indexOf('\\c['), string.indexOf(']') + 1);
        }
        width -= width * 0.05;
        this.drawLine(value, x, y, width);
      }
    }
};

Window_SavefileList.prototype.drawPlaytime = function(info, string, x, y, width) {
    if (info.playtime) {
        let text = '',
            col1 = '',
            col2 = '';
        if (string.includes('=')) {
          text   = string.slice(0, string.indexOf('=')).trim();
          string = string.slice(string.indexOf('=') + 1).trim();
        }
        if (text) {
          text   = text.replace(/\\C/g, '\\c');
          string = string.replace(/\\C/g, '\\c');
          if (text.includes('\\c[')) {
            col1 = text.slice(text.indexOf('\\c['), text.indexOf(']') + 1);
          }
          if (string.includes('\\c[')) {
            col2 = string.slice(string.indexOf('\\c['), string.indexOf(']') + 1);
          }
          width = width / 2 
          let pad = width * 0.1;
          width -= pad
          this.drawLine(col1 + text, x, y, width);
          this.drawLine(col2 + info.playtime, x + width + pad, y, width);
        } else {
          string = string.replace(/\\C/g, '\\c');
          if (string.includes('\\c[')) {
            text = string.slice(string.indexOf('\\c['), string.indexOf(']') + 1);
          }
          width -= width * 0.05;
          this.drawLine(text + info.playtime, x, y, width);
      }
    }
};

Window_SavefileList.prototype.drawLine = function(text, x, y, maxWidth, align) {
    if (TSR.Save.general_dimer) {
      this.drawRect(x - this.pad(), y, maxWidth, this.lineHeight(), 0, 1);
    }
    this.contents.drawText(text, x, y, maxWidth - this.pad() * 2, this.lineHeight(), align);
    this.resetTextColor();
};

// 不启用滚动条
Window_SavefileList.prototype.drill_MSB_scrollBarEnabled = function() {
	return false;
}

Window_SavefileList.prototype.drawProgress = function(info, data, x, y, width, height, i) {
    let game = data
    if (TSR.Save.window_maxRow === 1) {
      if (TSR.Save.sections.length < 2) i = 1;
      height /= 2; 
      y += (i > 0)? height : 0;
    }
    let display = TSR.Save.displayObject; 
    width -= width * 0.1;
    x += TSR.Save.window_xPad;
    this.resetTextColor();
    let x_name = x + parseInt(TSR.Save.progress_NameX),
        y_name = y + parseInt(TSR.Save.progress_NameY),
       x_ratio = x + parseInt(TSR.Save.progress_RatioX),
       y_ratio = y + parseInt(TSR.Save.progress_RatioY);
    this.contents.fontSize = parseInt(TSR.Save.progress_NameFS);
    this.drawProgressName(x_name, y_name, width);
    this.contents.fontSize = parseInt(TSR.Save.progress_RatioFS);
    this.drawProgressRatio(display, x_ratio, y_ratio, width, game);
    x += parseInt(TSR.Save.icons_x);
    y += parseInt(TSR.Save.icons_y);
    let index = 1,
         line = 0,
          col = 1,
       maxCol = TSR.Save.icons_Columns,
     interCol = TSR.Save.icons_interCol || (width / maxCol),
     interRow = TSR.Save.icons_interRow || this.lineHeight(),
     proplist = Object.keys(display),
     lineNumb = proplist.length;
    for (i in proplist) {
        if (proplist[i].includes('progress')) lineNumb--;
    }    
    lineNumb /= maxCol;
    this._iconFS = parseInt(TSR.Save.icons_FS);
    this._iconW = this._iconFS + (this._iconFS / 4.66 * 2);
    this.contents.fontSize = this._iconFS
    if (TSR.Save.progress_dimer) this.drawRect(x, y, interCol * maxCol, this._iconW, interRow, lineNumb);
    for (let i in display) {
      if (!Object.keys(display)[index - 1].includes('progress')) {
        let id = index - 1;
        let xp = (col === 1)? x : x + interCol * (col - 1);
        let value = Object.values(display)[id]; 
        if (value.includes('eval:')) {
		 let evaltext = value.slice(value.indexOf('eval:') + 'eval:'.length);
           //let pretext = value.slice(0, value.indexOf('eval:'))
           //let evaltext = value.slice(value.indexOf('eval:') + 1);
           try {
             value = eval(evaltext);
           } catch (e) {
             value = 'error';
           }
           if (!value) value = 'hide';
		     else value = value;
           //else value = pretext + value;
        } else {
          if (parseInt(this.convertEscapeCharacters(value, game)) === 0) {
            value = ' ';
          }
        }
        if (value === 'true') value = '';
        value = this.convertEscapeCharacters(String(value), game);
		let text = value;
        //let text = Object.keys(display)[id] + value;
        if (value === 'hide') text = '';
        if (Imported.TSR_TextColorAddOn) {
			this.drawText_Ex(text, 20, y + 28 * line + 60, width, 'left');
          //this.drawText_Ex(text, xp, y + interRow * line, width, 'left');  绘制额外变量
        } else {
			this.drawText_Ex(text, 20, y + 28 * line + 60, width, 'left');
			//this.drawText_Ex(text, 20, y + 28 * line + 60, width, 'left');
          //this.drawTextEx(text, xp, y + interRow * line, width, 'left');
        }
        if (col < maxCol) {
          col++;
        } else {
          col = 1
          line++
        }  
        index++
        }
      }
        this.contents.fontSize = this._savefileFontSize;
		this.contents.fontSize = fontSizeBackup;
	  	var fontSizeBackup = this.contents.fontSize; //备份字体大小
		var fontFaceBackup = this.contents.fontFace; //备份字体类型
		this.contents.fontSize = 18;
		// 显示持有金
		this.drawText_Ex(game.party.gold() + 'G', 25, y + 112, width, 'left');
		this.contents.fontFace = 'FOT-NewCinemaA Std D';
		// 显示游玩时长
		/*
		if ( typeof game.variables.value(8) === 'string' ) {
			this.contents.fontSize = 32;	
			this.contents.fontFace = 'Coral Pixels';	
			this.drawText_Ex(game.variables.value(8), 350, y + 28 * line - 90, width, 'right');
		} else {
			console.log(game.system);
			let time = game.system._framesOnSave * 700;
			time = $gameSystem.truePlaytimeText(time);
		    this.contents.fontSize = 32;	
		    this.contents.fontFace = 'Coral Pixels';	
		    this.drawText_Ex(time, 350, y + 28 * line - 90, width, 'right');			
		}
		*/
		this.contents.fontSize = 24;
		this.contents.fontFace = 'FOT-NewCinemaA Std D';
		this.drawVerticalText(game.actors.actor(1).currentClass().name, x - 382, y + 150); //绘制竖排文字
		this.contents.fontSize = fontSizeBackup;
		this.contents.fontFace = fontFaceBackup;
};

Window_SavefileList.prototype.drawRect = function(x, y, width, height, rowSpace, number) {
  for (let i = 0; i < number; i++) { 
    let rect = new Rectangle();
    rect.width = width;
    rect.height = height * 0.9;
    rect.x = x;
    rect.y = y + (i * rowSpace);
    this.drawRectFill(rect.x, rect.y, rect.width, rect.height)
  }
};

Window_SavefileList.prototype.drawRectFill = function(x, y, width, height) {
    let  w = Math.ceil(width / 2),
    color1 = TSR.Save.sections_color1,
    color2 = TSR.Save.sections_color2;
    this.contents.gradientFillRect(x, y, w, height, color2, color1);
    this.contents.gradientFillRect(x + w, y, w, height, color1, color2);
};

Window_SavefileList.prototype.drawProgressName = function(x, y, width) {
    if (TSR.Save.progress_Name) {
      let nameWidth = Math.min(this.textWidth(TSR.Save.progress_Name), width)
      let pad = this.pad()
      if (TSR.Save.progress_dimer) {
        this.drawRect(x - pad, y + pad / 2, nameWidth + pad * 2, this.lineHeight(), 0, 1);
      }
      this.drawText(TSR.Save.progress_Name, x, y, width);
    }
};

Window_SavefileList.prototype.drawProgressRatio = function(obj, x, y, width, game) {
    let progObj = TSR.Save.progressObject;
    let progArr = Object.keys(progObj);
    let valArr = Object.values(progObj);
    let prog = 0;
    let maxProg = 0; 
    let val = 0;
    for (let k = 0; k < progArr.length; k++) {
      if (obj[progArr[k]]) {
        val = parseInt(this.convertEscapeCharacters(obj[progArr[k]], game));
      }
      if (val < valArr[k]) {
        prog += val;
      } else {
        prog += parseInt(valArr[k]);
      } 
      maxProg += parseInt(valArr[k]);
    }
    if (maxProg) {
      prog = this.formatProgRatio(prog / maxProg);
      x -= this.textWidth(prog) / 2;
      let pad = this.pad()
      let ratioWidth = Math.min(this.textWidth(prog), width);
      if (TSR.Save.progress_dimer) {
        this.drawRect(x - pad, y + pad / 2, ratioWidth + pad  * 2, this.lineHeight(), 0, 1);
      }
      this.drawText(prog, x, y, width);
    }
};

Window_SavefileList.prototype.formatProgRatio = function(ratio) {
    if (ratio === 0) {
      return '0%';
    } else if (ratio >= 1) {
      return '100%';
    } else {
      return (ratio * 100).toFixed(2) + '%';
    }
};

Window_SavefileList.prototype.convertEscapeCharacters = function(text, game) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return game.variables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return game.variables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        let n = parseInt(arguments[1]);
        let actor = n >= 1 ? game.actors.actor(n) : null;
        return actor ? actor.name() : '';
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        let n = parseInt(arguments[1]);
        let actor = n >= 1 ? game.party.members()[n - 1] : null;
        return actor ? actor.name() : '';
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text; 
};

if (TSR.Save.sheet_name) {
   Window_SavefileList.prototype.drawIcon = function(iconIndex, x, y) {
     let bitmap = ImageManager.loadSystem('IconSet');
     let perRow = 16;
     let pw = Window_Base._iconWidth;
     let ph = Window_Base._iconHeight;
     let iconwidth = this._iconW;      
     let dw = (TSR.Save.sheet_scale)? iconwidth : pw;
     let dh = (TSR.Save.sheet_scale)? iconwidth : ph;
     y -= (TSR.Save.sheet_scale)? this._iconW * 0.1 : 0;
     let index = iconIndex;
     let sx = index % perRow * pw;
     let sy = Math.floor(index / perRow) * ph;
     if (index >= TSR.Save.sheet_start) {
       bitmap = ImageManager.loadPicture(TSR.Save.sheet_name);
       perRow = TSR.Save_sheet_byRow;
       pw = TSR.Save.sheet_frame;
       ph = TSR.Save.sheet_frame;  
       dw = (TSR.Save.sheet_scale)? iconwidth : pw;
       dh = (TSR.Save.sheet_scale)? iconwidth : ph;
       index -= TSR.Save.sheet_start;
       sx = index % perRow * pw;
       sy = Math.floor(index / perRow) * ph;
     }  
     this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
   };  
   Window_SavefileList.prototype.drawText_Ex = Window_Base.prototype.drawTextEx;
   Window_SavefileList.prototype.resetFontSettings = function() {
    this.contents.fontFace = this.standardFontFace();
    this.contents.fontSize = this._iconFS;
    this.resetTextColor();
   };
   Window_SavefileList.prototype.processDrawIcon = function(iconIndex, textState) {
    this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
    textState.x += this._iconW + 4;
   };
   Window_SavefileList.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'C':
        if (Imported.TSR_TextColorAddOn) {
          this.contents.obtainColorsParam(textState);
        } else {
          this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));
        }
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
    }
  };
} else {
  Window_SavefileList.prototype.drawText_Ex = Window_Base.prototype.drawText;
}

//战斗背景图绘制
Window_SavefileList.prototype.drawBackground = function(info, x, y, dw, dh) {
	
    if (info.battleback1 && info.battleback2) {
        let bitmap1 = ImageManager.loadBattleback1(info.battleback1);
        let bitmap2 = ImageManager.loadBattleback2(info.battleback2);

        let pw = bitmap1.width;
        let ph = bitmap1.height;

        // 创建一个新的Bitmap对象，大小为背景图的尺寸
        let combinedBitmap = new Bitmap(pw, ph);

        // 将两张背景图绘制到新的Bitmap上
        combinedBitmap.blt(bitmap1, 0, 0, pw, ph, 0, 0);
        combinedBitmap.blt(bitmap2, 0, 0, pw, ph, 0, 0);

        // 绘制新的Bitmap到窗口内容上
        this.contents.blt(combinedBitmap, 0, 0, pw, ph, x, y + 10, dw, dh);
	}
};

Window_SavefileList.prototype.drawAutoBackground = function(info, x, y, dw, dh) {
	
    if (info.battleback1) {
        let bitmap1 = ImageManager.loadBattleback1(info.battleback1);
        let bitmap3 = ImageManager.loadBattleback2(info.battleback3);

        let pw = bitmap1.width;
        let ph = bitmap1.height;

        // 创建一个新的Bitmap对象，大小为背景图的尺寸
        let combinedBitmap = new Bitmap(pw, ph);

        // 将两张背景图绘制到新的Bitmap上
        combinedBitmap.blt(bitmap1, 0, 0, pw, ph, 0, 0);
        combinedBitmap.blt(bitmap3, 0, 0, pw, ph, 0, 0);

        // 绘制新的Bitmap到窗口内容上
        this.contents.blt(combinedBitmap, 0, 0, pw, ph, x, y + 10, dw, dh);
	}
};

Window_SavefileList.prototype.drawBasicInfo = function(data, x, y, quarter, SecW, height) {
    let Actors = data.actors;
    let Party  = data.party;
    let members = Party.battleMembers();
    let lineTP = Imported.YEP_CoreEngine && Yanfly.Param.MenuTpGauge;
    let maxHeight = (TSR.Save.status_party !== 'none')? height * 0.4 : height * 0.75;
    let fontHeight = (TSR.Save.window_maxRow === 1)? maxHeight / 2 : maxHeight;
    this.resetTextColor();
    let pad = this.pad();
    if (TSR.Save.status_maxSize === 1) quarter = Math.min(quarter, maxHeight * 2);
    let width = quarter - pad * 2;
    let xw = width - pad * 2;
    x += pad * 2
    y += pad
    let xpos = (TSR.Save.status_maxSize === 1)? (width + pad * 2) / 2 : width + pad * 2;    
    for (let i = 0; i < members.length; i++) {
        let actor = Actors.actor(members[i].actorId());
        let row = (lineTP)? 5 : 4;
        if (Imported.YEP_SkillCore) row = this.adjustRows(actor, row);
        this.contents.fontSize = this.adjustFont(fontHeight, row);
        let lineHeight = this.lineHeight();
        if (TSR.Save.status_maxSize === 1) i = 1;
        if (TSR.Save.status_dimer) {
          this.drawRect((x - pad) + i * xpos, y, width, maxHeight, 0, 1);
        }
        this.drawActorName(actor, x + i * xpos, y, xw);
        this.drawActorLevel(actor, x + i * xpos, y + lineHeight, xw);
        this.drawActorHp(actor, x + i * xpos, y + lineHeight * 2, xw);
        this.drawActorMp(actor, x + i * xpos, y + lineHeight * 3, xw);
        if (lineTP) {
          this.drawActorTp(actor, x + i * xpos, y + lineHeight * 4, xw);
        }
    }
    this.contents.fontSize = this._savefileFontSize;
};

Window_SavefileList.prototype.adjustRows = function(actor, row) {
    if (actor.currentClass().gauge1.toUpperCase() === 'NULL' ||
        actor.currentClass().gauge1.toUpperCase() === 'NOTHING') row--;
    if (actor.currentClass().gauge2.toUpperCase() === 'NULL' ||
        actor.currentClass().gauge2.toUpperCase() === 'NOTHING') row--;
    if (actor.currentClass().gauge3.toUpperCase() === 'NULL' ||
       actor.currentClass().gauge3.toUpperCase() === 'NOTHING') row--;
    return row;
};

Window_SavefileList.prototype.drawActorLevel = function(actor, x, y, width) {
    let text = TextManager.levelA;
    textWidth = this.textWidth(text);
    width -= textWidth;
    this.changeTextColor(this.systemColor());
    this.drawText(text, x, y, textWidth, 'left');
    text = actor.level;
    this.resetTextColor();
    this.drawText(text, x + textWidth, y, width, 'right');
};


Window_SavefileList.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    let fillW = Math.floor(width * rate);
    let pad = this.lineHeight() / 6 * 2.5;
    let gaugeY = y + pad / 2;
    let height = this.lineHeight() - pad;
    this.contents.fillRect(x, gaugeY, width, height, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, height, color1, color2);
};

Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y, quarter, height) {
    if (info.characters) {
        let maxHeight = (TSR.Save.status_gauge)? height * 0.40 : height * 0.9;
        let dh = Math.min(quarter, maxHeight);
        let dw = dh; 
        for (var i = 0; i < info.characters.length; i++) {
          let filename = info.characters[i][0];
          let index = info.characters[i][1];
          let bitmap = ImageManager.loadCharacter(filename);
          let big = ImageManager.isBigCharacter(filename);
          let pw = bitmap.width / (big ? 3 : 12);
          let ph = bitmap.height / (big ? 4 : 8);
          let dx = x + (quarter - dw) / 2;
          let dy = y - dh; 
          let sx = (index % 4 * 3 + 1) * pw;
          let sy = (Math.floor(index / 4) * 4) * ph; 
          this.contents.blt(bitmap, sx, sy, pw, ph, dx + i * quarter, dy, dw, dh);  
        }
    }
};

Window_SavefileList.prototype.drawPartyFaces = function(info, x, y, quarter, height) {
    if (info.faces) {
        let maxHeight = (TSR.Save.status_gauge)? height * 0.40 : height * 0.9;
        let dh = Math.min(quarter, maxHeight);
        let dw = dh; 
        for (let i = 0; i < info.faces.length; i++) {
          let filename = info.faces[i][0];
          let faceIndex = info.faces[i][1];
          let bitmap = ImageManager.loadFace(filename);
          let pw = Window_Base._faceWidth;
          let ph = Window_Base._faceHeight;
          let dx = x + (quarter - dw) / 2;
          let dy = y - dh; 
          let sx = faceIndex % 4 * pw;
          let sy = Math.floor(faceIndex / 4) * ph; 
          this.contents.blt(bitmap, sx, sy, pw, ph, dx + i * quarter, dy, dw, dh);
        }
    }
};

Window_SavefileList.prototype.drawPartyBattlers = function(info, game, x, y, quarter, height) {
    if (info.battlers) {
        let members = game.party.battleMembers();
        let maxHeight = (TSR.Save.status_gauge)? height * 0.40 : height * 0.9;
        let dh = Math.min(quarter, maxHeight);
        for (let i = 0; i < info.battlers.length; i++) {
            let name = info.battlers[i];
            let actor = game.actors.actor(members[i].actorId())
            let bitmap = ImageManager.loadSvActor(name);
            let pw = bitmap.width / 9;
            let ph = bitmap.height / 6;
            let sx = 0
            let sy = 0
            if (actor.isDead()) {
              sx = 6 * pw;
              sy = 5 * ph;
            } else if (actor.isDying()) {
              sx = 6 * pw;
              sy = 2 * ph;
            }            
            let dy = y - dh; 
            let dw = dh
            let dx = x + (quarter - dw) / 2;
            this.contents.blt(bitmap, sx, sy, pw, ph, dx + i * quarter, dy, dw, dh);
        }
    }
};

Window_SavefileList.prototype.playOkSound = function() {
};


//=== Window_FileCommand ==========================

if (TSR.Save.command_hrz) {
  TSR.Save.command_prototype = Window_HorzCommand.prototype;
} else {
  TSR.Save.command_prototype = Window_Command.prototype;
}

function Window_FileCommand() {
    this.initialize.apply(this, arguments);
};

Window_FileCommand.prototype = Object.create(TSR.Save.command_prototype);
Window_FileCommand.prototype.constructor = Window_FileCommand;

Window_FileCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 10, 0);
    this._mode = null;
    this.openness = 0;
    let windowType = TSR.Save.command_BGtype;
    this.setBackgroundType(windowType);	
	this.createBackgroundSprite();
	this.createCursorSprite();
};

Window_FileCommand.prototype.createBackgroundSprite = function() {
    this._backgroundSprite = new Sprite();
    let com = this.mode();

    let lang           = ConfigManager.language;
	let allowed        = window?.LANG_LOCALE?.[lang]?.saveLoadConfirm;
	if (!allowed) lang = 2;
	
    if (com === 'save') {
		let imgName = 'saveCommand' + lang;
		if (lang == 0 && ConfigManager.needsTC) imgName = 'saveCommand' + lang + "tcn";
        this._backgroundSprite.bitmap = ImageManager.loadBitmap('img/system/multilingualUI/', imgName, 0, false);
    } else if (com === 'load') {
		let imgName = 'loadCommand' + lang;
		if (lang == 0 && ConfigManager.needsTC) imgName = 'loadCommand' + lang + "tcn";
        this._backgroundSprite.bitmap = ImageManager.loadBitmap('img/system/multilingualUI/', imgName, 0, false);
    } else {
		let imgName = 'saveCommand' + lang;
		if (lang == 0 && ConfigManager.needsTC) imgName = 'saveCommand' + lang + "tcn";
        this._backgroundSprite.bitmap = ImageManager.loadBitmap('img/system/multilingualUI/', imgName, 0, false);
    }
    this._backgroundSprite.x = -110; 
    this._backgroundSprite.y = -105; 
    this.addChildToBack(this._backgroundSprite); 
};


Window_FileCommand.prototype.createCursorSprite = function() {
    this._cursorSprite = new Sprite();
    this._cursorSprite.bitmap = ImageManager.loadSystem('save&load cursor'); // 指定指针图片
    this._cursorSprite.visible = false; 
    this.addChild(this._cursorSprite);
};

Window_FileCommand.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    this.updateCursorSprite(); 
};

Window_FileCommand.prototype.updateCursorSprite = function() {
    if (this._cursorSprite) {
        const rect = this.itemRect(this.index());
        this._cursorSprite.x = rect.x;
        // 动态移动的效果
        const sway = Math.sin(Graphics.frameCount / 60) * 3; 
        this._cursorSprite.x += sway; // 添加摆动效果
        this._cursorSprite.y = 32;
        this._cursorSprite.visible = this.active;
    }
};

Window_FileCommand.prototype.select = function(index) {
    Window_Command.prototype.select.call(this, index);
    this.updateCursorSprite(); // 更新指针位置
};

Window_FileCommand.prototype.windowWidth = function() {
    if (TSR.Save.command_hrz) {
      return TSR.Save.command_width * this._list.length;
    } else {
      return TSR.Save.command_width;
    }
};

Window_FileCommand.prototype.numVisibleRows = function() {
    return (TSR.Save.command_hrz)? 1 : this._list.length;
};

Window_FileCommand.prototype.maxCols = function() {
    return (TSR.Save.command_hrz)? this._list.length : 1;
};

Window_FileCommand.prototype.makeCommandList = function() {
    let com = this.mode();
    if (com === 'start' && this.savedSlot()) com = 'load';
    if (this.mode() === 'save') {
       this.addCommand(this.getCommandName(com), this.mode(), this.isSaveEnabled());
    } else {
       this.addCommand(this.getCommandName(com), this.mode());
    }
	
    this.addCommand(this.getCommandName('cancel'), 'cancel');
};


// 打开窗口时出现妹妹语音
  const _open = Window_FileCommand.prototype.open;
  Window_FileCommand.prototype.open = function () {
    _open.call(this);                               

    if (this.mode() === 'load') {
      let classId = 1;          

      if (this.savedSlot()) {
        try {
          const id   = TSR.Save._currentFileId;
          const data = JsonEx.parse(StorageManager.load(id));
          classId    = data.actors.actor(1)._classId || 1;
        } catch (_) { /* 忽略异常，保持默认 */ }
      }

      const se = (classId === 3) ? 'load_sis_zako0' : 'load_sis_SE';
      AudioManager.playVoice({ name: se, volume: 70, pitch: 100, pan: 0 }, false, 1);

    } else if (this.mode() === 'save') {
      const actor   = $gameActors.actor(1);
      const classId = actor ? actor._classId : 1;
      const se      = (classId === 3) ? 'save_sis_zako0' : 'save_sis_SE';

      AudioManager.playVoice({ name: se, volume: 70, pitch: 100, pan: 0 }, false, 1);
    }
  };


Window_FileCommand.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) {
        if (this.currentData().symbol === 'cancel') {
          this.processCancel();
        } else {
          this.playOkSound();
        }
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
};

Window_FileCommand.prototype.isSaveEnabled = function() {
    let saveEnable = $gameSystem._saveEnabled;
    if (TSR.Save.autosave_locked && TSR.Save._currentFileId === 1) saveEnable = false;
    return saveEnable;
};

Window_FileCommand.prototype.mode = function() {
    return Scene_File.prototype.mode();
};

Window_FileCommand.prototype.getCommandName = function(command) {
   switch (command) {
      case 'load': command = TSR.Save.command_load; break;
      case 'save': command = TSR.Save.command_save; break;
      case 'delete': command = TSR.Save.command_delete; break;
      case 'start': command = TSR.Save.command_start; break;
      case 'cancel': command = TSR.Save.command_cancel; break;
      default: command = command; break;
   }
   return command
};

Window_FileCommand.prototype.savedSlot = function() {
    return StorageManager.exists(TSR.Save._currentFileId);
};

Window_FileCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_FileCommand.prototype.windowHeight = function() {
    return (TSR.Save.command_hrz)? this.fittingHeight(1) :    
                   this.fittingHeight(this._list.length);
};

Window_FileCommand.prototype.itemRect = function(index) {
    let rect = Window_Selectable.prototype.itemRect.call(this, index);
    return rect;
};

//=== Window_FileConfirm ==========================

function Window_FileConfirm() {
    this.initialize.apply(this, arguments);
};

Window_FileConfirm.prototype = Object.create(TSR.Save.command_prototype);
Window_FileConfirm.prototype.constructor = Window_FileConfirm;

Window_FileConfirm.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this._mode = null;
    this.openness = 0;
    let windowType = TSR.Save.command_BGtype;
    this.setBackgroundType(windowType);
	this.windowskin = ImageManager.loadSystem('Window_full');
};

Window_FileConfirm.prototype.windowWidth = function() {
    if (TSR.Save.command_hrz) {
      return 200;
    } else {
      return 100;
    }
};

Window_FileConfirm.prototype.numVisibleRows = function() {
    return (TSR.Save.command_hrz)? 1 : 2;
};

Window_FileConfirm.prototype.maxCols = function() {
    return (TSR.Save.command_hrz)? 2 : 1;
};

Window_FileConfirm.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this.help._helpCount >= 200 && 
             this._stayCount >= 200 &&
             this.isOpenAndActive()) this.help.open();
};

Window_FileConfirm.prototype.updatePosition = function(x, y) {
    this.x = x;
    this.y = y;
};

Window_FileConfirm.prototype.makeCommandList = function() {
    this.addCommand('yes', 'yes');
    this.addCommand('no', 'cancel');
};

Window_FileConfirm.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) {
        if (this.currentData().symbol === 'cancel') {
          this.processCancel();
        } else {
          this.playOkSound();
        }
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
};

Window_FileConfirm.prototype.mode = function() {
    return Scene_File.prototype.mode();
};

Window_FileConfirm.prototype.savedSlot = function() {
    return StorageManager.exists(TSR.Save._currentFileId);
};

Window_FileConfirm.prototype.itemTextAlign = function() {
    return 'center';
};

Window_FileConfirm.prototype.windowHeight = function() {
    return (TSR.Save.command_hrz)? this.fittingHeight(1) : this.fittingHeight(2);
};

Window_FileConfirm.prototype.itemRect = function(index) {
    let rect = Window_Selectable.prototype.itemRect.call(this, index);
    return rect;
};

//=== SPRITE ==============================================================================

//=== Sprite_Help ========================

function Sprite_Help() {
    this.initialize.apply(this, arguments);
}

Sprite_Help.prototype = Object.create(Sprite.prototype);
Sprite_Help.prototype.constructor = Sprite_Help;

Sprite_Help.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.createBitmap();
    this._showCount = 0;
    this._helpCount = 0
    this.opacity = 0;
    this.width = 0;
    this._isOpened = false;
    if (TSR.Save.help_show === 'never') this.visible = false;
    this.update();
};

Sprite_Help.prototype.createBitmap = function() {
    let fontSize = parseInt(TSR.Save.help_fontS),
             pad = fontSize / 4.66,
          height = fontSize + pad * 2;
    this.bitmap  = new Bitmap(Graphics.boxWidth, height);
    this.bitmap.fontSize = fontSize;
    this.bitmap.pad      = pad;
};

Sprite_Help.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (!this._isOpened) this._helpCount++;
    this.updateBitmap();
};

Sprite_Help.prototype.helpCount = function() {
    return this._helpCount;
};

Sprite_Help.prototype.updateBitmap = function() {
    if (TSR.Save.help_show === 'always' && !this._closed) this._showCount = 100
    if (this._showCount > 0) {
        this.updateFadeIn();
        this._showCount--;
    } else {
        if (this.opacity > 0) {
          this.updateFadeOut();
        } else {
          this._isOpened = false;
        }
    }
};

Sprite_Help.prototype.updateFadeIn = function() {
    this.opacity += 16;
    if (this.width <= this._width + 16) this.width += 16;
};

Sprite_Help.prototype.updateFadeOut = function() {
    this.opacity -= 16;
    this.width -= 16;   
};

Sprite_Help.prototype.open = function() {
    this._showCount = this._timeByString || 100;
    this._helpCount = 0;
    this._closed = false;
    this._isOpened = true;
   
};

Sprite_Help.prototype.close = function() {
    this._showCount = 0;
    this._closed = true;
};

Sprite_Help.prototype.redraw = function() {
    let text = this._text,
         pad = this.bitmap.pad,
       width = this.bitmap.measureTextWidth(text),
      height = this.bitmap.height;
    this.bitmap.clear();
    this._width = width;
    this._timeByString = text.length * 5.5;
    this.drawBackground(0, 0, width + pad * 2, height);
    this.bitmap.drawText(text, pad, 0, width, height, 'left');
};

Sprite_Help.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.redraw();
    }
};

Sprite_Help.prototype.updatePosition = function(x, y) {
    this.x = x;
    this.y = y;
};

Sprite_Help.prototype.drawBackground = function(x, y, width, height) {
    var color1 = TSR.Save.help_color1;
    var color2 = TSR.Save.help_color2;
    this.bitmap.gradientFillRect(x, y, width / 2, height, color2, color1);
    this.bitmap.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
};



//=== AUTO SAVE =======================================================================

//=== Window_Autosave ============================

function Window_Autosave() {
    this.initialize.apply(this, arguments);
}

Window_Autosave.prototype = Object.create(Window_Base.prototype);
Window_Autosave.prototype.constructor = Window_Autosave;

Window_Autosave.prototype.initialize = function() {
    let x  = TSR.Save.autosave_x,
        y  = TSR.Save.autosave_y,
    width  = this.windowWidth(),
    height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
    this.refresh();
};

Window_Autosave.prototype.windowWidth = function() {
    return TSR.Save.autosave_width;
};

Window_Autosave.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_Autosave.prototype.lineHeight = function() {
    let fs = parseInt(TSR.Save.autosave_fontS);
    return fs + fs / 4.66 * 2; 
};

Window_Autosave.prototype.standardPadding = function() {
    let pad = parseInt(TSR.Save.autosave_fontS) / 4.66;
    return pad;
};

Window_Autosave.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if ($gameMap._justUploaded && $gameMap._autosavedSuccess) $gameMap._justUploaded = false;
    if (this._showCount > 0) {
        this.updateFadeIn();
        this.updateText();
        this._showCount--;
    } else {
        this.updateFadeOut();
    }
};

Window_Autosave.prototype.updateText = function() {
    this.contents.clear();
    if (this._showCount % 30 === 0 && 
           this._showCount !== 120 && 
           TSR.Save.autosave_dotAnim) {
      this._winText += '.'
    }
    this.refresh();
    this.contents.paintOpacity = this.setPaintOpacity(this.contents.paintOpacity);
    
};

Window_Autosave.prototype.setPaintOpacity = function(opacity) {
    if (this._outLopUp) {
       if (opacity < 255) {
         opacity += 8
       } else {
         this._outLopUp = false;
       }
    } else {
       if (opacity > 100) {
         opacity -= 8
       } else {
         this._outLopUp = true;
       }
    }
    return opacity;
};

Window_Autosave.prototype.updateFadeIn = function() {
    this.contentsOpacity += 16;
};

Window_Autosave.prototype.updateFadeOut = function() {
    this.contentsOpacity -= 16;
    this._winText = null;
};

Window_Autosave.prototype.open = function() {
    this.refresh();
    this._showCount = 100;
};

Window_Autosave.prototype.close = function() {
    this._showCount = 0;
};

Window_Autosave.prototype.refresh = function() {
    this.contents.clear();
    let text = ($gameMap._autosavedSuccess)? TSR.Save.autosave_text : '';
    if ($gameMap._autosavedSuccess === 'failed') text = 'Auto save failed'; 
    let width = this.width
    this.contents.fontSize = parseInt(TSR.Save.autosave_fontS);
    let pad = this.contents.fontSize / 4.66;
    this.drawBackground(0, 0, width, this.height);
    if (!this._winText) this._winText = text;
    this.drawText(this._winText, pad * 2, 0, width, 'left');
};

Window_Autosave.prototype.drawBackground = function(x, y, width, height) {
    let color1 = TSR.Save.autosave_color1;
    let color2 = TSR.Save.autosave_color2;
    this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
};


//=== Scene_Map ===================

  TSR.Save._Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    TSR.Save._Scene_Map_createDisplayObjects.call(this);
    this.createSaveWindow();
};

Scene_Map.prototype.createSaveWindow = function() {
    this._autosaveWindow = new Window_Autosave();
    this.addChild(this._autosaveWindow);
};

  TSR.Save._Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  TSR.Save._Scene_Map_update.call(this);
  if ($gameMap.changedRegionName()) this._mapNameWindow.open(); ;
};

Scene_Map.prototype.updateSaveWindow = function() {
    if (TSR.Save.autosave_show) {
      this._autosaveWindow.open();
    }
};

  TSR.Save._Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    TSR.Save._Scene_Map_start.call(this);
    $gameMap._autosavedSuccess = true;
    if (this._transfer && !SceneManager.isPreviousScene(Scene_Title)) {
      if ($gameMap.isAutoSaveEnabled()) $gameMap.autosave();
      if (TSR.Save.autosave_show &&
          $gameMap.isAutoSaveEnabled()) this._autosaveWindow.open();
    }
};


//=== Game_Map ===================

Game_Map.prototype.autosave = function() {
    let file = (TSR.Save.autosave_locked)? 1 : DataManager.lastAccessedSavefileId()
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(file)) {
        this.onAutoSaveSuccess(file);
    } else {
        this.onAutoSaveFailure(file);
    }
};

Game_Map.prototype.onAutoSaveSuccess = function(file) {
    StorageManager.cleanBackup(file);
    this._autosavedSuccess = true;
};

Game_Map.prototype.onAutoSaveFailure = function(file) {
    this._autosavedSuccess = 'failed';
};

Game_Map.prototype.isAutoSaveEnabled = function() {
     if (!this._justUploaded       && 
         !this.isAnyAutorunEvent() &&
         TSR.Save.autosave_enable) return true;
};

Game_Map.prototype.isAnyAutorunEvent = function() {
    return this.events().some(function(event) {
        return event.checkEventAutorun();
    });
};

Game_Map.prototype.displayName = function() {
    let regionId = this.regionId($gamePlayer.x, $gamePlayer.y)
    if (!$dataMap.displayName.includes(';')) return $dataMap.displayName;
    let list = $dataMap.displayName.split(';');
    let mapNameObj = {}
    for (let i in list) {
       let prop = list[i].slice(0, list[i].indexOf(':')).trim()
       let val  = list[i].slice(list[i].indexOf(':') + 1)
       val = val.split(',');
       mapNameObj[prop] = val;
    }
    let nameList = Object.keys(mapNameObj);
    let p = 0;
    for (i in mapNameObj) {
      let mapName = mapNameObj[i]
      for (let t in mapName) {
        let id = parseInt(mapName[t]);
        if (id === regionId) return nameList[p];
      }
      p++;
    }
};

Game_Map.prototype.changedRegionName = function() {
    let rx = $gamePlayer.x;
    let ry = $gamePlayer.y;
    let region = this.tileId(rx, ry, 5)
    if (TSR.Save._lastDisplayedMapId !== region) {
      TSR.Save._lastDisplayedMapId = region
      if (TSR.Save._lastDisplayedMapName !== this.displayName()) {
        TSR.Save._lastDisplayedMapName = this.displayName();
        return true;
      }
    }
    return false;
};


//=== Game_Party ============================================

Game_Party.prototype.BattlersForSavefile = function(index) {
    return this.battleMembers().map(function(actor) {
        return actor.battlerName();
    });
};


//=== Game_Event ===================

Game_Event.prototype.checkEventAutorun = function() {
    if (this._trigger === 3) {
        return true;
    }
};


//=== Game_Interpreter ===================

    TSR.Save._Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    TSR.Save._Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'SaveNow' && !$gameMap._justUploaded) {
	  QJ.MPMZ.deleteProjectile('imoutoUtil');
      $gameMap.autosave();
      this.refreshSaveWindow();
    }
    if (command === 'AutoSaveON')    TSR.Save.autosave_enable  = true;
    if (command === 'AutoSaveOFF')   TSR.Save.autosave_enable  = false;
    if (command === 'SaveWindowON')  TSR.Save.autosave_show    = true;
    if (command === 'SaveWindowOFF') TSR.Save.autosave_show    = false;
};

Game_Interpreter.prototype.refreshSaveWindow = function() {
    if ($gameParty.inBattle()) return;
    if (SceneManager._scene instanceof Scene_Map) {
       SceneManager._scene.updateSaveWindow();
    }
};


//=== End ==================================================================================
//==========================================================================================


//解决返回按钮不显示的补丁

(() => {
  if (!Imported.Drill_MenuBackButton || !Imported.TSR_Save) return;

  /* ---------- 工具：把按钮层抬到最上 ---------- */
  function liftBtnLayer(scene) {
    const fg = scene && scene._foregroundSprite;
    if (fg && scene.children.includes(fg)) {
      scene.removeChild(fg);
      scene.addChild(fg);
    }
  }

  /* ---------- Scene_File.create：一次性跑 MenuBase.update ---------- */
  const _SceneFile_create = Scene_File.prototype.create;
  Scene_File.prototype.create = function () {
    _SceneFile_create.call(this);

    /* 仅此一次：让 Drill 的初始化在这里执行 */
    Scene_MenuBase.prototype.update.call(this);

    /* 标记完成，防止重复 create */
    this._drill_MBB_created_local = true;

    /* 抬最上，防止被窗口遮挡 */
    liftBtnLayer(this);
  };

  /* ---------- Scene_File.update：只刷新按钮自身 ---------- */
  const _SceneFile_update = Scene_File.prototype.update;
  Scene_File.prototype.update = function () {
    _SceneFile_update.call(this);               // TSR_Save 自己的逻辑

    if (this._drill_MBB_created_local && this.drill_MBB_update) {
      this.drill_MBB_update();                  // 仅处理按钮动画/点击
    }
  };

  /* ---------- Scene_File.addWindow：新窗口后再抬一次 ---------- */
  const _SceneFile_addWindow = Scene_File.prototype.addWindow;
  Scene_File.prototype.addWindow = function (win) {
    _SceneFile_addWindow.call(this, win);
    liftBtnLayer(this);
  };
})();


(function() {
  'use strict';

  const CFG = {
    // 打开存档文件夹按钮
    openBtn: {
      img:  'openFolder',  // img/system/open_save_btn.png；留空则用文字按钮
      x:    32,              // 中心 X
      y:    980,              // 中心 Y
      opa:  200,              // 普通透明度
      opaH: 255               // 悬停透明度
    },
    // 云存档按钮
    cloudBtn: {
      img:  'cloudDownload', 
      x:    120,              
      y:    975,
      opa:  200,
      opaH: 255
    }

  };
  // ===================================================

  function isNW() { return Utils.isNwjs && Utils.isNwjs(); }

  function resolveSaveDir() {
    const path = require('path');
    const base = path.dirname(process.mainModule.filename); // 指向 www
    return path.join(base, 'save');
  }

  function openDirAbs(abs) {
    const { exec } = require('child_process');
    let cmd;
    if (process.platform === 'win32') cmd = 'explorer "' + abs.replace(/\//g,'\\') + '"';
    else if (process.platform === 'darwin') cmd = 'open "' + abs + '"';
    else cmd = 'xdg-open "' + abs + '"';
    exec(cmd);
  }

  function makeTextButton(label, w, h) {
    const bmp = new Bitmap(w, h);
    bmp.fillAll('rgba(0,0,0,0.6)');
    bmp.gradientFillRect(1,1,w-2,h-2,'#3a3a3a','#2a2a2a',true);
    bmp.drawText(label, 0, 0, w, h, 'center');
    return bmp;
  }

  function createButton(scene, cfg, label, onClick) {
    const layer = scene._qjBtnLayer || new Sprite();
    if (!scene._qjBtnLayer) {
      scene.addChild(layer);
      scene._qjBtnLayer = layer;
    }

    const spr = new Sprite();
    spr.anchor.set(0, 0);
    spr.x = cfg.x;
    spr.y = cfg.y;
    spr.opacity = cfg.opa;

    if (cfg.img) spr.bitmap = ImageManager.loadSystem(cfg.img);
    else spr.bitmap = makeTextButton(label, 240, 48);

    layer.addChild(spr);
    return { spr, cfg, onClick };
  }

  function isPointInSprite(sprite, px, py) {
    if (!sprite || !sprite.bitmap || !sprite.bitmap.isReady() || !sprite.visible) return false;
    const w = sprite.bitmap.width;
    const h = sprite.bitmap.height;
    const x = sprite.x - w * sprite.anchor.x;
    const y = sprite.y - h * sprite.anchor.y;
    return (px >= x && px <= x + w && py >= y && py <= y + h);
  }

  // --- 注入到存/读档共用场景 ---
  const _create = Scene_File.prototype.create;
  Scene_File.prototype.create = function() {
    _create.call(this);

    this._qjBtns = [];

    // ② 下载云存档
    this._qjBtns.push(createButton(
      this,
      CFG.cloudBtn,
      'Download Cloud Save',
      () => {
        SoundManager.playOk();
		    //SceneManager.push(Scene_GoogleDrive);
        SceneManager.push(Scene_PatreonVerify);
      }
    ));

    // ① 打开存档文件夹
    this._qjBtns.push(createButton(
      this,
      CFG.openBtn,
      'Open Save Folder',
      () => {
        try {
		  // 安卓版临时方案
		  if (Utils.isMobileDevice()) {
             let textArray = [ "The Android version doesn’t support quick access to the save directory for now",
                               "due to sensitive permission issues. ",
							   "Please go to the '/storage/emuloted/0/Documents/sister_save' path yourself",
                               "to check the save files! You’re free to transfer save data from other devices or ",
							   "the PC version to inherit your progress." ];

             switch (ConfigManager.language) {
                  case 0:
                  textArray = [ "安卓版本因为权限敏感问题，暂不支持快捷打开存档目录！",
                               "请自行前往检查/storage/emuloted/0/Documents/sister_save路径检查存档文件！",
                               "你可以自由转移来自其他设备或PC版本的存档继承数据。" ];
                  break;
                  case 1:
                  textArray = [ "権限の都合により、Android版ではセーブフォルダを直接開く機能は利用できません！",
                               "/storage/emuloted/0/Documents/sister_save フォルダにご自身でアクセスしてセーブデータをご確認ください。",
                               "また、他の端末やPC版からセーブデータを自由に移行して引き継ぐことも可能です。" ];
                  break;
              }
		    let text = textArray.join("\n");
	        alert(text);
			SoundManager.playBuzzer();
         	return;	  
		  }
						
          if (!isNW()) return; 
          const path = require('path');
          SoundManager.playOk();
		  
	      let tipsArray = ["Do you want to transfer save data from an older version?",
                           "The current game is compatible with save files from version 0.22A and above."];
             switch (ConfigManager.language) {
                  case 0:
                  tipsArray = ["你要转移来自其他旧版本的存档吗？",
                               "当前游戏可兼容来自0.22A以上版本的存档数据"];
                  break;
                  case 1:
                  tipsArray = ["古いバージョンからセーブデータを移行しますか？",
                               "現在のゲームは、バージョン0.22A以降のセーブデータに対応しています。"];
                  break;
              }		  
		  let tips = tipsArray.join("\n");
		  const ask = confirm(tips);
          if (!ask) {
			 openDirAbs(path.resolve(resolveSaveDir()));
			 return;
		  }
		  
	      let selectText = "Please select the old version’s “save” folder (or the game’s root directory), then click “Select Folder.”";
             switch (ConfigManager.language) {
                  case 0:
                  selectText = "请选择旧版本的 “save” 文件夹（或游戏根目录），然后点 “选择文件夹”";
                  break;
                  case 1:
                  selectText = "旧バージョンの「save」フォルダ（またはゲームのルートディレクトリ）を選択し、「フォルダーを選択」をクリックしてください。";
                  break;
              }		  
		  setTimeout(()=> chahuiUtil.importOldSaves({ startIn: require('path').dirname(process.execPath), hint:selectText }), 500);
		  
        } catch (e) { console.error(e); }
      }
    ));

	
  };

  const _update = Scene_File.prototype.update;
  Scene_File.prototype.update = function() {
    _update.call(this);
    if (!this._qjBtns) return;

    const mx = TouchInput.x, my = TouchInput.y;

    for (const b of this._qjBtns) {
      if (!b || !b.spr) continue;
      const hover = isPointInSprite(b.spr, mx, my);
	  const wasHover = !!b._hover;
      b.spr.opacity = hover ? b.cfg.opaH : b.cfg.opa;
	  // 只在“进入悬停”的瞬间播一次
      if (hover && !wasHover) {
        SoundManager.playCursor();
      }
      b._hover = hover;
    }

    if (TouchInput.isTriggered()) {
      for (const b of this._qjBtns) {
        if (b && b.spr && isPointInSprite(b.spr, mx, my) && typeof b.onClick === 'function') {
          b.onClick();
          break;
        }
      }
    }
  };

})();





// 主动上传存档文件进行转移
(function(){
  if (!Utils.isNwjs()) return;
  window.chahuiUtil = window.chahuiUtil || {};

  // 提示条文本
  function showHint(text) {
    if (!text) return null;
    const bar = document.createElement('div');
    bar.textContent = text;
    bar.style.cssText =
      'position:fixed;left:50%;top:12px;transform:translateX(-50%);' +
      'background:#263238;color:#fff;padding:8px 14px;border-radius:8px;' +
      'box-shadow:0 6px 16px rgba(0,0,0,.25);z-index:99999;font-size:14px;' +
      'max-width:80%;text-align:center;';
    document.body.appendChild(bar);
    return bar;
  }

// 选择文件夹窗口：优先用 input.files[*].path，备用解析 input.value
function pickDirectory(opts = {}) {
  const { hint, startIn } = opts;
  return new Promise((resolve) => {
    // 提示文本
    const hintEl = (function showHint(text){
      if (!text) return null;
      const el = document.createElement('div');
      el.textContent = text;
      el.style.cssText =
        'position:fixed;left:50%;top:24px;transform:translateX(-50%);' +
        'background:#ff95b8;color:#fff;padding:12px 14px;border-radius:12px;' +
        'box-shadow:0 6px 16px rgba(0,0,0,.25);z-index:99999;font-size:24px;';
      document.body.appendChild(el);
      setTimeout(()=> el.remove(), 8000);
      return el;
    })(hint);

    const input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('nwdirectory', 'nwdirectory');
    input.setAttribute('webkitdirectory', 'webkitdirectory');
    if (startIn) input.setAttribute('nwworkingdir', startIn);
    input.style.position = 'fixed';
    input.style.left = '-10000px';
    document.body.appendChild(input);

    input.addEventListener('change', () => {
      const path = require('path');
      let dir = '';

      // 1) 首选：从 files[*].path 推导目录（最可靠）
      const files = input.files ? Array.from(input.files) : [];
      const firstPath = files.find(f => f && f.path)?.path;
      if (firstPath) {
        dir = path.dirname(firstPath);
      } else {
        // 2) 备用：解析 value；有些 NW 会给到“分号分隔的多个路径”
        let v = input.value || '';
        if (v.includes(';')) v = v.split(';')[0];      // 取第一个
        v = v.replace(/^"+|"+$/g, '');                 // 去首尾引号
        dir = v;
      }

      document.body.removeChild(input);
      if (hintEl) hintEl.remove();
      resolve(dir || '');
    });

    input.click();
  });
}


  // 带 hint/startIn 的导入
  chahuiUtil.importOldSaves = async function(opts={}) {
    const path = require('path');
    const fs = require('fs');
    const fsp = fs.promises;

    // 你可以传入 opts.hint / opts.startIn
    const srcDir = await pickDirectory({
      hint: opts.hint || 'Please select the old version’s “save” folder (or the game’s root directory), then click “Select Folder.”',
      startIn: opts.startIn   // 例如：StorageManager.localFileDirectoryPath()
    });
    if (!srcDir) { SoundManager.playBuzzer(); return; }

    let from = srcDir;
    const baseName = path.basename(srcDir).toLowerCase();
    if (baseName !== 'save' && fs.existsSync(path.join(srcDir, 'save'))) {
      from = path.join(srcDir, 'save');
    }

    // …以下保持你原来的拷贝逻辑 …
    const allow = /\.(rpgsave|rmmzsave|json|png)$/i;
    const ents = await fsp.readdir(from, { withFileTypes: true }).catch(()=>[]);
    const files = ents.filter(e=>e.isFile() && allow.test(e.name))
                      .map(e=>({ name:e.name, abs:path.join(from,e.name) }));
    if (!files.length) { 
	let failed = `No save files found to import!`;
             switch (ConfigManager.language) {
                  case 0:
                  failed = `未发现可导入的存档文件！`;
                  break;
                  case 1:
                  failed = `インポートできるセーブデータが見つかりません！`;
                  break;
              }	
    alert(failed);	
	return; 
	}

    const to = StorageManager.localFileDirectoryPath ? StorageManager.localFileDirectoryPath()
                                                     : path.join(process.cwd(), 'save');
    await fsp.mkdir(to, { recursive: true });

    let ok=0, fail=0;
    for (const f of files) {
      const dst = path.join(to, f.name);
      try {
        try { await fsp.access(dst, fs.constants.F_OK); await fsp.rename(dst, dst+'.bak'); } catch(_) {}
        if (fsp.copyFile) await fsp.copyFile(f.abs, dst);
        else await new Promise((res, rej)=> fs.createReadStream(f.abs).pipe(fs.createWriteStream(dst)).on('finish',res).on('error',rej));
        ok++;
      } catch(e){ console.error('copy failed:', f.abs, e); fail++; }
    }
	
	let succeed = `Save import successful! ${ok} files have been imported!`;
             switch (ConfigManager.language) {
                  case 0:
                  succeed = `导入存档成功！已成功导入${ok}个文件！`;
                  break;
                  case 1:
                  succeed = `セーブデータの導入に成功しました！${ok}個のファイルをインポートしました！`;
                  break;
              }	
    alert(succeed);
	SceneManager.goto(Scene_Title);
  };
})();

(function() {

  // ====== 可调参数 ======
  const TIP_FLASH_TIMES = 8; // 淡出到0算一次
  const TIP_SPEED = 0.02;    // alpha 每帧变化
  // ======================

  // --- 通用：给 sprite 初始化 tip 状态 ---
  function initTipState(spr) {
    spr.alpha = 1.0;
    spr._tsrTip = {
      cnt: 0,
      dir: -1,     // -1淡出, +1淡入
      active: true
    };
  }

  // --- 通用：同一套 update，驱动闪烁与移除；返回 true 表示还活着 ---
  function updateTipSprite(spr) {
    if (!spr || !spr._tsrTip || !spr._tsrTip.active) return false;

    var st = spr._tsrTip;

    // 闪烁阶段
    if (st.cnt < TIP_FLASH_TIMES) {
      spr.alpha += st.dir * TIP_SPEED;

      if (st.dir < 0 && spr.alpha <= 0) {
        spr.alpha = 0;
        st.cnt += 1;
        st.dir = +1;
      } else if (st.dir > 0 && spr.alpha >= 1) {
        spr.alpha = 1;
        st.dir = -1;
      }
      return true;
    }

    // 收尾：淡出并结束
    spr.alpha -= TIP_SPEED;
    if (spr.alpha <= 0) {
      spr.alpha = 0;
      st.active = false;
      if (spr.parent) spr.parent.removeChild(spr);
      return false;
    }
    return true;
  }

  // --- 创建“图片 tip” ---
  function makeImageTip(sceneFile) {
    let spr = new Sprite();

    let lang = ConfigManager.language;
    let allowed = window?.LANG_LOCALE?.[lang]?.saveLoadTips;
    if (!allowed) lang = 2;

    let imgName = 'multilingualUI/RightClickTips' + lang;
    if (Utils.isMobileDevice()) {
      if (lang > 2) lang = 2;
      imgName = 'multilingualUI/RightClickTips_Mobile' + lang;
      spr.bitmap = ImageManager.loadSystem(imgName);
      spr.x = 300;
      spr.y = 680;
    } else {
      spr.bitmap = ImageManager.loadSystem(imgName);
      spr.x = 1750;
      spr.y = 960;
    }

    initTipState(spr);
    return spr;
  }

  // --- 创建“文字 tip” ---
  // text: 要显示的文字
  // x,y: 位置
  function makeTextTip(text, x, y) {
    // 你可以按需要改宽高
    let w = 600;
    let h = 200;
    let bmp = new Bitmap(w, h);
    // 字体样式
    bmp.fontSize = 30;
    bmp.fontFace = DrillUp.g_DFF_fontFace;
    bmp.textColor = "#ffffff";
    //bmp.outlineColor = "rgba(255, 194, 79, 0.8)";
    //bmp.outlineWidth = 4;

    // 居中画字
    bmp.drawText(text, 0, 0, w, h, "left");

    let spr = new Sprite(bmp);
    spr.x = x;
    spr.y = y;
    if (PIXI.filters && PIXI.filters.GlowFilter) {
      spr.filters = [
        new PIXI.filters.GlowFilter(15, 1, 0, 0xf3a64a, 0.8)
      ];
    }
    initTipState(spr);
    return spr;
  }

  // --- Scene_File：创建 & 更新 ---
  const _Scene_File_create = Scene_File.prototype.create;
  Scene_File.prototype.create = function() {
    _Scene_File_create.call(this);

    // 多 tip 容器
    this._tsrTips = [];

    // 图片 tip
    let imgTip = makeImageTip(this);
    this._windowLayer.addChild(imgTip);
    this._tsrTips.push(imgTip);

    // 文字 tip
    let textArray = window.systemFeatureText.memberMenu["shortHint"];
    if (!textArray) textArray = " Can now enable cloud saves & major auto updates";
    let txt = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
    txt = "☚" + txt;    
    let textTip = makeTextTip(txt, 215, 910);
    this._windowLayer.addChild(textTip);
    this._tsrTips.push(textTip);
  };

  const _Scene_File_update = Scene_File.prototype.update;
  Scene_File.prototype.update = function() {
    _Scene_File_update.call(this);

    if (this._tsrTips && this._tsrTips.length > 0) {
      // 遍历更新，顺便清掉结束的
      for (let i = this._tsrTips.length - 1; i >= 0; i--) {
        let spr = this._tsrTips[i];
        let alive = updateTipSprite(spr);
        if (!alive) this._tsrTips.splice(i, 1);
      }
    }
  };

  const _Scene_File_terminate = Scene_File.prototype.terminate;
  Scene_File.prototype.terminate = function() {
    if (this._tsrTips) {
      for (let i = 0; i < this._tsrTips.length; i++) {
        let spr = this._tsrTips[i];
        if (spr) {
          // 清滤镜
          spr.filters = null;
          if (spr.parent) spr.parent.removeChild(spr);
        }
      }
      this._tsrTips = null;
    }
    _Scene_File_terminate.call(this);
  };


})();
